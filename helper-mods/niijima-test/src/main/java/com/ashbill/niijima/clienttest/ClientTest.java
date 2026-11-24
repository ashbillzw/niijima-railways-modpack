package com.ashbill.niijima.clienttest;

import com.google.gson.*;
import com.mojang.logging.LogUtils;
import de.keksuccino.fancymenu.customization.customgui.CustomGuiBaseScreen;
import net.minecraft.client.KeyMapping;
import net.minecraft.client.Minecraft;
import net.minecraft.client.Screenshot;
import net.minecraft.client.gui.screens.TitleScreen;
import net.minecraft.core.BlockPos;
import net.minecraft.core.registries.BuiltInRegistries;
import net.minecraft.world.Difficulty;
import net.minecraft.world.level.*;
import net.minecraft.world.level.levelgen.WorldOptions;
import net.minecraft.world.level.levelgen.presets.WorldPresets;
import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.event.TickEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.lifecycle.FMLClientSetupEvent;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Mod("niijima_client_test")
public final class ClientTest {
    @Mod.EventBusSubscriber(modid = "niijima_client_test", value = Dist.CLIENT, bus = Mod.EventBusSubscriber.Bus.MOD)
    public static final class Setup {
        @SubscribeEvent
        public static void setup(FMLClientSetupEvent event) {
            event.enqueueWork(() -> {
                Minecraft mc = Minecraft.getInstance();
                Path folder = mc.gameDirectory.toPath().resolve(".niijima-test");
                Path request = folder.resolve("request.json");
                if (!Files.isRegularFile(request)) return;
                try {
                    JsonObject plan = JsonParser.parseString(Files.readString(request)).getAsJsonObject();
                    UUID id = UUID.fromString(plan.get("run").getAsString());
                    Path run = Files.createDirectory(folder.resolve(id.toString()));
                    Files.move(request, run.resolve("plan.json"));
                    Files.writeString(run.resolve("pid"), Long.toString(ProcessHandle.current().pid()));
                    Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                        try {
                            Files.createFile(run.resolve("stopped"));
                        } catch (IOException e) {
                            LogUtils.getLogger().error("Cannot record client shutdown", e);
                        }
                    }));
                    Session session = new Session(mc, run, plan);
                    MinecraftForge.EVENT_BUS.addListener(session::render);
                } catch (Exception e) {
                    LogUtils.getLogger().error("Cannot start local client test", e);
                }
            });
        }
    }

    private static final class Session {
        private final Minecraft mc;
        private final Path session;
        private final boolean resident;
        private Path run;
        private JsonArray steps;
        private int caseNumber;
        private long nextPoll;
        private final String world;
        private int index;
        private long deadline;
        private long readySince;
        private boolean capturing;
        private boolean executing;
        private boolean finished;
        private String observation = "";

        Session(Minecraft mc, Path run, JsonObject plan) {
            this.mc = mc;
            session = run;
            this.run = run;
            steps = plan.getAsJsonArray("steps");
            resident = plan.has("resident") && plan.get("resident").getAsBoolean();
            world = "niijima-test-" + run.getFileName();
        }

        String screen() {
            if (mc.screen instanceof CustomGuiBaseScreen custom) return custom.getIdentifier();
            if (mc.screen instanceof TitleScreen) return "title";
            return mc.screen == null ? "hud" : mc.screen.getClass().getSimpleName();
        }

        boolean ownWorld() {
            return mc.hasSingleplayerServer() && !mc.getSingleplayerServer().isPublished() && mc.player != null && mc.level != null
                    && world.equals(mc.getSingleplayerServer().getWorldData().getLevelName());
        }

        void render(TickEvent.RenderTickEvent event) {
            if (event.phase != TickEvent.Phase.END || executing) return;
            if (finished) {
                if (resident && !capturing && System.nanoTime() >= nextPoll) {
                    nextPoll = System.nanoTime() + TimeUnit.MILLISECONDS.toNanos(250);
                    pollCase();
                }
                return;
            }
            executing = true;
            try {
                if (index == steps.size()) {
                    finish(null);
                    return;
                }
                JsonObject step = steps.get(index).getAsJsonObject();
                if (deadline == 0) {
                    int timeout = step.has("timeout") ? step.get("timeout").getAsInt() : 120;
                    deadline = System.nanoTime() + TimeUnit.SECONDS.toNanos(timeout);
                    LogUtils.getLogger().info("Client test step {}: {}", index, step);
                }
                if (System.nanoTime() >= deadline) throw new IllegalStateException("Timeout: " + observation);
                if (!capturing && execute(step)) advance();
            } catch (Exception e) {
                finish(e.toString());
            } finally {
                executing = false;
            }
        }

        void pollCase() {
            Path next = session.resolve("case-" + (caseNumber + 1));
            if (!Files.isRegularFile(next.resolve("plan.json"))) return;
            run = next;
            caseNumber++;
            index = 0;
            deadline = readySince = 0;
            observation = "";
            steps = new JsonArray();
            try {
                JsonObject plan = JsonParser.parseString(Files.readString(next.resolve("plan.json"))).getAsJsonObject();
                if (plan.has("close")) {
                    nextPoll = Long.MAX_VALUE;
                    mc.stop();
                    return;
                }
                requireWorld();
                steps = plan.getAsJsonArray("steps");
                finished = false;
            } catch (Exception e) {
                finish(e.toString());
            }
        }

        boolean execute(JsonObject step) throws IOException {
            String op = step.get("op").getAsString();
            if (mc.getCurrentServer() != null || mc.hasSingleplayerServer() && mc.getSingleplayerServer().isPublished())
                throw new IllegalStateException("Expected a private singleplayer client");
            switch (op) {
                case "waitScreen" -> {
                    observation = screen();
                    boolean ready = mc.getOverlay() == null && step.get("screen").getAsString().equals(observation);
                    if (!ready) readySince = 0;
                    else if (readySince == 0) readySince = System.nanoTime();
                    return ready && (!step.has("stableMs") ||
                            System.nanoTime() - readySince >= TimeUnit.MILLISECONDS.toNanos(step.get("stableMs").getAsLong()));
                }
                case "screenshot" -> {
                    String name = "step-" + index + ".png";
                    capturing = true;
                    int shot = index;
                    Screenshot.grab(run.toFile(), name, mc.getMainRenderTarget(), message -> mc.execute(() -> {
                        if (finished || index != shot) return;
                        if (Files.isRegularFile(run.resolve("screenshots").resolve(name))) advance();
                        else finish(message.getString());
                    }));
                    return false;
                }
                case "clickScreen" -> {
                    if (mc.screen == null || mc.getOverlay() != null) throw new IllegalStateException("Expected a ready screen");
                    var screen = mc.screen;
                    double x = screen.width * step.get("x").getAsDouble();
                    double y = screen.height * step.get("y").getAsDouble();
                    screen.mouseMoved(x, y);
                    screen.mouseClicked(x, y, 0);
                    if (mc.screen == screen) screen.mouseReleased(x, y, 0);
                }
                case "createWorld" -> {
                    if (mc.level != null || mc.getOverlay() != null)
                        throw new IllegalStateException("World creation requires a ready menu");
                    LevelSettings settings = new LevelSettings(world, GameType.CREATIVE, false, Difficulty.PEACEFUL,
                            true, new GameRules(), WorldDataConfiguration.DEFAULT);
                    long seed = step.has("seed") ? step.get("seed").getAsLong() : 1;
                    mc.createWorldOpenFlows().createFreshLevel(world, settings, new WorldOptions(seed, true, false),
                            WorldPresets::createNormalWorldDimensions);
                }
                case "waitWorld" -> {
                    observation = screen();
                    return ownWorld() && mc.screen == null && mc.getOverlay() == null
                            && mc.level.hasChunkAt(mc.player.blockPosition()) && mc.player.onGround();
                }
                case "preparePlayer" -> {
                    requireWorld();
                    if (mc.screen != null) mc.player.closeContainer();
                    mc.player.getInventory().selected = 0;
                }
                case "command" -> {
                    requireWorld();
                    mc.player.connection.sendCommand(step.get("command").getAsString());
                }
                case "rightClick" -> {
                    requireWorld();
                    if (mc.screen != null || mc.getOverlay() != null)
                        throw new IllegalStateException("Right click requires the game HUD");
                    KeyMapping.click(mc.options.keyUse.getKey());
                }
                case "expectBlock" -> {
                    requireWorld();
                    BlockPos pos = mc.player.blockPosition().offset(step.get("dx").getAsInt(),
                            step.get("dy").getAsInt(), step.get("dz").getAsInt());
                    observation = BuiltInRegistries.BLOCK.getKey(mc.level.getBlockState(pos).getBlock()).toString();
                    return observation.equals(step.get("block").getAsString());
                }
                default -> throw new IllegalArgumentException("Unknown operation: " + op);
            }
            return true;
        }

        void requireWorld() {
            if (!ownWorld()) throw new IllegalStateException("Expected this run's test world");
        }

        void advance() {
            index++;
            deadline = 0;
            readySince = 0;
            capturing = false;
        }

        void finish(String error) {
            finished = true;
            JsonObject result = new JsonObject();
            result.addProperty("passed", error == null);
            result.addProperty("completed", index);
            result.addProperty("screen", screen());
            result.addProperty("width", mc.getWindow().getWidth());
            result.addProperty("height", mc.getWindow().getHeight());
            result.addProperty("guiScale", mc.getWindow().getGuiScale());
            if (error != null) {
                capturing = true;
                result.addProperty("error", error);
                if (index < steps.size()) result.add("step", steps.get(index));
                Screenshot.grab(run.toFile(), "failure.png", mc.getMainRenderTarget(),
                        message -> mc.execute(() -> publish(result)));
            } else publish(result);
        }

        void publish(JsonObject result) {
            try {
                Files.writeString(run.resolve("result.tmp"), result.toString());
                Files.move(run.resolve("result.tmp"), run.resolve("result.json"), StandardCopyOption.ATOMIC_MOVE);
            } catch (IOException e) {
                LogUtils.getLogger().error("Cannot write client test result", e);
            } finally {
                capturing = false;
                if (!resident) mc.stop();
            }
        }
    }
}
