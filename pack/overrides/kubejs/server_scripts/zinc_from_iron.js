ServerEvents.recipes(event => {
    event.recipes.touhou_little_maid.altar_crafting(
        Item.of("create:zinc_block").withCount(1).withName("镀锌铁块"),
        ["minecraft:iron_block", "minecraft:iron_block", "minecraft:iron_block", "minecraft:iron_block", "minecraft:iron_block", "create:zinc_ingot"],
        0
    );
});
