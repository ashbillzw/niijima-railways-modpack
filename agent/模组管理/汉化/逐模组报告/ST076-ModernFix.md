# ST076 ModernFix 筛查报告

日期：2026-10-18。

## 范围与结论

155英文／134中文全量对照，含空帮助键和额外旧键。官方embeddedt/ModernFix分支1.20（1df6471ba9ff98c8b031c8978f56ba38baa0c931）及1.21.1（1957e7798d9b0c51dfacec1cd39a74c58b4dd2b5）的src/main/resources/assets/modernfix/lang/zh_cn.json均为134键，22个当前缺键仍未覆盖，因此自行补译。修正线程池、出生点区块常加载等6处明确问题。保留仅针对其他MC版本的历史说明；未调整优化选项。已有巨型生物群系注释、中文wiki有效性及部分技术术语需代码或链接复查，不凭英文差异直接全改。

新增补译22键，修正已有中文6键。

## 应用明细

| 键 | 原值／英文 | 中文 |
|---|---|---|
| `modernfix.redirector_installed` | ModernFix detected that Redirector is installed. Redirector is known to cause many strange and hard-to-debug issues, and removing it is strongly recommended. | 现代化修复检测到已安装Redirector。已知Redirector会导致许多难以调试的奇怪问题，强烈建议将其移除。 |
| `modernfix.option.mixin.perf.dynamic_resources.ldlib` | LDLib compatibility patch for dynamic resources | 动态资源功能的兼容性补丁，用于LDLib。 |
| `modernfix.option.mixin.perf.compress_unihex_font` | Stores the glyphs for the Unicode font more efficiently. Kudos to @AnAwesomGuy for the trick. | 以更高效的方式存储Unicode字体的字形。感谢@AnAwesomGuy提供这一技巧。 |
| `modernfix.option.mixin.bugfix.restore_old_dragon_movement` | Fixes MC-272431, which tracks the ender dragon being unable to dive to the portal as it did in 1.13 and older. This causes the dragon to fly quite a bit differently from what modern players are used to and also patches out one-cycling, so it's not enabled by default. Thanks to Jukitsu for identifying the regression in the vanilla code. | 修复MC-272431：末影龙无法像1.13及更早版本那样俯冲到传送门。修复后末影龙的飞行方式与玩家习惯的较新版本有较大差异，也会使一轮击杀打法失效，因此默认不启用。感谢Jukitsu发现原版代码中的这一回归问题。 |
| `modernfix.option.mixin.bugfix.missing_block_entities` | Hypixel sends chunks to the client that are missing some block entity data, which makes chests etc. appear invisible. This 'fixes' the problem by creating the needed data on the client. Has no effect for properly behaved servers or in singleplayer. | Hypixel发送给客户端的区块有时缺少部分方块实体数据，使箱子等方块无法显示。此项通过在客户端创建所需数据来“修复”该问题。对行为正常的服务器及单人游戏无影响。 |
| `modernfix.option.mixin.bugfix.buffer_builder_leak` | Attempts to work around mods constructing BufferBuilder objects that leak memory. This can cause the JVM to crash with an hs_err_pid file in some rare cases. If you experience this type of crash, try disabling this option. | 尝试规避模组创建BufferBuilder对象时产生的内存泄漏。在极少数情况下，此类泄漏会导致JVM崩溃并生成hs_err_pid文件。如果遇到这类崩溃，请尝试禁用此项。 |
| `modernfix.option.mixin.bugfix.extra_experimental_screen` | Fixes the experimental feature warning being shown still being shown the first time you reopen a world that was created as experimental. | 修复实验性世界首次重新打开时仍然显示实验性功能警告的问题。 |
| `modernfix.option.mixin.bugfix.forge_at_inject_error` | Fixes a major oversight in Forge's early error handling code that causes some parts of mods to load, but not others, which usually results in the game crashing rather than displaying the intended error screen. This issue was fixed in NeoForge, and eventually fixed in new enough versions of Forge. | 修复Forge早期错误处理代码中的严重疏漏：它会使模组的部分内容加载、另一部分却未加载，通常导致游戏崩溃，而不是显示预期的错误界面。NeoForge已修复此问题，较新版本的Forge后来也进行了修复。 |
| `modernfix.option.mixin.bugfix.world_screen_skipped` | Fixes MC-251068, where deleting the last world takes you back to an empty world list. | 修复MC-251068：删除最后一个世界后仍然返回空的世界列表。 |
| `modernfix.option.mixin.feature.blockentity_incorrect_thread` | **This is a debug option and should not be enabled for regular gameplay.** Attempts to detect mods interacting with block entities on the wrong thread and crash the game with more information, rather than an unclear ConcurrentModificationException | §l此选项仅用于调试，不应在正常游玩时启用。§r尝试检测模组在错误线程中操作方块实体的情况，并使游戏崩溃以提供更详细的信息，而不是只给出含义不明的ConcurrentModificationException。 |
| `modernfix.option.mixin.feature.cause_lag_by_disabling_threads` | Disables the game's use of worker threads for the server and for chunk rendering. **This will make performance worse on almost all hardware**, and should only be enabled on a client, when you know exactly what you are doing, and probably only on hardware with very few (2 or less) physical CPU cores. In those rare cases, it can reduce lag spikes since there is less contention over the limited cores. | 禁止游戏为服务端及区块渲染使用工作线程。§l这会使几乎所有硬件上的性能变差§r，只有明确知道自己在做什么时才应在客户端启用，而且通常只适合物理CPU核心极少（2个及以下）的硬件。在这些少见情况下，由于有限核心上的竞争减少，它可能缓解瞬间卡顿。 |
| `modernfix.option.mixin.feature.registry_event_progress` | Runs the Forge loading screen on a background thread for part of the loading process, to allow progress to be shown while content is being registered. May have compatibility issues with some GPU drivers (e.g. macOS), so do not enable it by default in a modpack. | 在部分加载过程中，将Forge加载界面放到后台线程运行，使其能够在内容注册时显示进度。可能与某些显卡驱动（例如macOS上的驱动）存在兼容问题，因此不要在整合包中默认启用。 |
| `modernfix.option.mixin.feature.remove_chat_signing` | Prevents the Minecraft client from obtaining the keypair for chat signing. This disables the client's ability to sign chat messages (like No Chat Reports, but in a simpler, albeit less user-friendly way). | 阻止Minecraft客户端获取聊天签名密钥对，使客户端无法为聊天消息签名（类似No Chat Reports，但实现更简单，使用起来也没那么方便）。 |
| `modernfix.option.mixin.feature.remove_telemetry` | Prevents the Minecraft client from sending telemetry to Mojang. The telemetry is generally not relevant to them anyway for a modded instance. | 阻止Minecraft客户端向Mojang发送遥测数据。模组实例的这些遥测数据通常对他们也没什么参考价值。 |
| `modernfix.option.mixin.perf.chunk_meshing` | Implements some minor optimizations to the vanilla chunk meshing logic (they will have no effect with a mod that replaces chunk rendering entirely). | 对原版区块网格构建逻辑进行一些小幅优化（若某个模组完全替换了区块渲染，则这些优化不会生效）。 |
| `modernfix.option.mixin.perf.faster_structure_location` | Improves the speed at which structures like buried treasure can be located. | 加快定位埋藏的宝藏等结构的速度。 |
| `modernfix.option.mixin.perf.forge_registry_alloc` | Fixes more oversights in Forge that lead to excessive allocation in hot registry methods. | 修复Forge注册系统中的更多疏漏，减少高频调用方法中过量的内存分配。 |
| `modernfix.option.mixin.perf.memoize_creative_tab_build` | Improves on vanilla's existing caching for creative tab contents in a way that is compatible with the timing requirements of mods like JEI/EMI. This can reduce the lag spike when opening the creative inventory for the first time in a modpack. | 改进原版对创造模式物品栏内容的缓存，并兼容JEI/EMI等模组的时序要求。可以缓解整合包中首次打开创造模式物品栏时的瞬间卡顿。 |
| `modernfix.option.mixin.perf.potential_spawns_alloc` | Optimizes the Forge event for finding potential mobs that can spawn. This reduces allocations and the overhead of rebuilding a weighted list when no mods modify the potential spawns. | 优化Forge查询潜在可生成生物的事件。当没有模组修改候选生物列表时，减少内存分配以及重建加权列表的开销。 |
| `modernfix.option.mixin.perf.ticking_chunk_alloc` | Optimizes chunk ticking in vanilla to reduce allocations. | 优化原版区块更新，减少内存分配。 |
| `modernfix.option.mixin.perf.worldgen_allocation` | Optimizes some world generation logic in vanilla to reduce object allocations. | 优化原版的部分世界生成逻辑，减少对象分配。 |
| `modernfix.option.mixin.feature.suppress_narrator_stacktrace` | Prevents the game from logging a very long stacktrace when the narrator fails to load on Linux (usually caused by not having libflite installed). | 在Linux上无法加载旁白时（通常因为未安装libflite），阻止游戏记录冗长的堆栈跟踪。 |
| `modernfix.option.mixin.perf.dedicated_reload_executor` | 全版本共有。将资源包和数据包的重载任务转移到一个专门的工作线程上，而不是使用默认的主工作线程。这让流畅加载（Smooth Boot）模组在运行时仍然可能提高单人游戏的性能，同时不会因为线程数量限制减慢启动速度。 | 全版本共有。将资源包和数据包的重载任务转移到专用工作线程池上，而不是使用默认的Worker-Main线程。这让流畅加载（Smooth Boot）模组在运行时仍然可能提高单人游戏的性能，同时不会因为线程数量限制减慢启动速度。 |
| `modernfix.option.mixin.perf.rewrite_registry` | 全版本共有。§l目前处于半残状态。§r非常暴力地使用更快地版本替换了Forge注册系统的一些内部结构，但目前在加载一些整合包时会导致冻结。默认关闭，原因显而易见。 | 全版本共有。§l目前处于半残状态。§r非常暴力地使用更快的版本替换了Forge注册系统的一些内部结构，但目前在加载一些整合包时会导致冻结。默认关闭，原因显而易见。 |
| `modernfix.option.mixin.bugfix.refinedstorage.te_bug` | 如果安装了精致存储模组，会修复它的一些问题，比如，外部存储总线偶尔无法显示抽屉内容。这是精致存储PR #3435的向后移植，仅适用于1.18及更高版本。 | 修复精致存储的外部存储方块在加载时偶尔无法显示抽屉等容器内容的问题。向后移植了精致存储PR #3435中的修复，该修复原本仅应用于1.18及更高版本。 |
| `modernfix.option.mixin.bugfix.starlight_emptiness` | 修复了星光偶尔崩溃的问题，崩溃元凶是空地图未初始化。这是星光（Starlight）1.18.x中相同修复的向后移植。 | 修复星光因空区段映射未初始化而偶尔崩溃的问题。这是星光（Starlight）1.18.x中相同修复的向后移植。 |
| `modernfix.option.mixin.perf.remove_spawn_chunks` | 从游戏中完全删除出生点区块（spawn chunks）。它们彻底不再加载了，这点与Ksyxis不同。 | 彻底移除游戏中出生点区块常加载的机制。这些区块将不再因位于出生点附近而加载，与Ksyxis不同。 |
| `modernfix.option.mixin.perf.patchouli_deduplicate_books` | 针对帕秋莉手册模组，修复其书籍会存储许多带有NBT标签的空条目的问题，减少了内存占用。 | 修复帕秋莉手册的书籍存储许多带有NBT标签的空物品堆叠的问题，减少内存占用。 |

## 十项代表译文

- `modernfix.redirector_installed`：现代化修复检测到已安装Redirector。已知Redirector会导致许多难以调试的奇怪问题，强烈建议将其移除。
- `modernfix.option.mixin.perf.dynamic_resources.ldlib`：动态资源功能的兼容性补丁，用于LDLib。
- `modernfix.option.mixin.perf.compress_unihex_font`：以更高效的方式存储Unicode字体的字形。感谢@AnAwesomGuy提供这一技巧。
- `modernfix.option.mixin.bugfix.restore_old_dragon_movement`：修复MC-272431：末影龙无法像1.13及更早版本那样俯冲到传送门。修复后末影龙的飞行方式与玩家习惯的较新版本有较大差异，也会使一轮击杀打法失效，因此默认不启用。感谢Jukitsu发现原版代码中的这一回归问题。
- `modernfix.option.mixin.bugfix.missing_block_entities`：Hypixel发送给客户端的区块有时缺少部分方块实体数据，使箱子等方块无法显示。此项通过在客户端创建所需数据来“修复”该问题。对行为正常的服务器及单人游戏无影响。
- `modernfix.option.mixin.bugfix.buffer_builder_leak`：尝试规避模组创建BufferBuilder对象时产生的内存泄漏。在极少数情况下，此类泄漏会导致JVM崩溃并生成hs_err_pid文件。如果遇到这类崩溃，请尝试禁用此项。
- `modernfix.option.mixin.bugfix.extra_experimental_screen`：修复实验性世界首次重新打开时仍然显示实验性功能警告的问题。
- `modernfix.option.mixin.bugfix.forge_at_inject_error`：修复Forge早期错误处理代码中的严重疏漏：它会使模组的部分内容加载、另一部分却未加载，通常导致游戏崩溃，而不是显示预期的错误界面。NeoForge已修复此问题，较新版本的Forge后来也进行了修复。
- `modernfix.option.mixin.bugfix.world_screen_skipped`：修复MC-251068：删除最后一个世界后仍然返回空的世界列表。
- `modernfix.option.mixin.feature.blockentity_incorrect_thread`：§l此选项仅用于调试，不应在正常游玩时启用。§r尝试检测模组在错误线程中操作方块实体的情况，并使游戏崩溃以提供更详细的信息，而不是只给出含义不明的ConcurrentModificationException。

## 验证与限制

JSON解析、当前英文键对应及%s／%d参数检查通过；未进行游戏验证。标准键已逐条检查，不代表穷尽所有硬编码文本。未提交、打包或部署。
