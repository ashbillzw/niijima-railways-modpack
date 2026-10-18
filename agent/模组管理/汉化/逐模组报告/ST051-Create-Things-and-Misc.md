# ST051 Create: Things and Misc

2026-10-18；当前 create_misc_and_things_ 1.20.1_4.0A.jar（元数据version写1.0.0）。144英文键，无中文。本轮新增141键，3条例外保留。标准文本通读、补译；硬编码提示的后续覆盖见文末；不代表游戏验收通过。

## 上游与语义依据

核对[作者Modrinth页面](https://modrinth.com/mod/create-misc-and-things)及[CurseForge页面](https://www.curseforge.com/minecraft/mc-mods/create-misc-and-things)，所查入口仅提供Discord，未定位可核验的官方源码／新版中文分支，不能声称新版没有中文。未为查语言下载新版完整JAR。

作者说明写卡器用于写入唯一卡片、放大镜读取副手卡片内容，故用“写卡器／写入”，不直译成压卡机。注液枪为喷射流体的武器。木材及坚固板沿用Create及原版术语；木帆新材质按原名对应，不为标志牌猜测未核实的速度或用途。

3条例外：画作标题Create 2 0 2 2、作者Unknown保留；动态模板<BNBT:text:SpeakerText>原样保留，不当普通英文翻译。历史create_addon键仍保留对应译文，不删除模组原键。

## 十条代表译文

| 原文 | 中文 |
| --- | --- |
| Card Inscriber | 写卡器 |
| Mending Rune | 经验修补符文 |
| Copper Sticky Launcher | 铜黏性弹射器 |
| Spout Gun | 注液枪 |
| Diluted Bonemeal | 骨粉溶液 |
| Sturdy Sheet Block | 坚固板块 |
| Magnifying Glass | 放大镜 |
| Incomplete Vibration Mechanism | 振动构件（半成品） |
| Actual message : | 当前消息： |
| announcement_sound | 扬声器：播报 |

## 硬编码缺口与限制

当前JAR物品类发现15处硬编码英文提示（14条去重文本；此前阶段估计16条已更正）：EmptyCard、EmptyTicket、MagnifyingGlass、MendingRune、NeonTube（两行）、Porridge、Radar、六种SpoutGun内容、StickyBoots。标准JSON不能覆盖这些字面Component，待用适当客户端覆盖方式处理，避免重复添加中文而保留英文。本机st051-*.txt保存部分javap证据，来源记录st051-records.json。已确认本包KubeJS存在ItemTooltipEventJS.addAdvanced API，尚未实施脚本或游戏测试。

Sit／座位实体等遗留条目、紫颂巢风帆和烈焰人气球外观仍待模型／运行上下文复核；这里保守按现有名称补译，不宣称全部机制已经验证。JSON和键覆盖静态检查通过；未启动游戏、打包或部署。

## 全部标准键补译

| 键 | 英文 | 中文 |
| --- | --- | --- |
| `block.create_addon.potato_turret` | Potato Turret | 土豆炮塔 |
| `item.create_things_and_misc.mending_rune` | Mending Rune | 经验修补符文 |
| `item.create_things_and_misc.slime_cake` | Slime Cake | 黏液蛋糕 |
| `gui.create_things_and_misc.inscriber_gui.label_card_press` | Card Inscriber | 写卡器 |
| `block.create_things_and_misc.sticky_launcher` | Copper Sticky Launcher | 铜黏性弹射器 |
| `item.create_addon.spout_gun` | Spout Gun | 注液枪 |
| `block.create_things_and_misc.train_stop` | Track Buffer | 轨道止挡 |
| `block.create_things_and_misc.brass_tiles_slab` | Brass Tiles Slab | 黄铜瓦台阶 |
| `block.create_things_and_misc.brass_sticky_launcher` | Brass Sticky Launcher | 黄铜黏性弹射器 |
| `block.create_things_and_misc.crimson_sail` | Crimson Sail | 绯红木风帆 |
| `item.create_things_and_misc.rose_quartz_sheet` | Rose Quartz Sheet | 玫瑰石英板 |
| `fluid.create_things_and_misc.diluted_bonemeal` | Diluted Bonemeal | 骨粉溶液 |
| `item.create_things_and_misc.crushed_magma` | Crushed Magma | 粉碎熔岩块 |
| `block.create_things_and_misc.powdered_obsidian_block` | Powdered Obsidian Block | 黑曜石粉块 |
| `block.create_things_and_misc.neon_tube_block` | Neon Tube Block | 霓虹灯管方块 |
| `item.create_addon.potato_entity_spawn_egg` | Sit Spawn Egg | 座位生成蛋 |
| `block.create_things_and_misc.sturdy_sheet_block` | Sturdy Sheet Block | 坚固板块 |
| `block.create_things_and_misc.card_press` | Card Inscriber | 写卡器 |
| `block.create_things_and_misc.card_reader_on` | Card Reader on | 读卡器（已激活） |
| `item.create_things_and_misc.obsidian_sand_paper` | Obsidian Sand Paper | 黑曜石砂纸 |
| `block.create_things_and_misc.train_sing_yellow_5` | Train Sign | 铁路标志牌 |
| `entity.create_things_and_misc.balloon_blaze` | Balloon Blaze | 烈焰人气球 |
| `block.create_things_and_misc.train_sing_yellow_4` | Train Sign | 铁路标志牌 |
| `block.create_things_and_misc.speed_100` | Train Sign | 铁路标志牌 |
| `item.create_things_and_misc.netherite_portable_whistle` | Netherite Portable Whistle | 下界合金便携汽笛 |
| `item.create_addon.canon_ball` | Canon Ball | 炮弹 |
| `block.create_things_and_misc.blaze_ballon` | Blaze Ballon | 烈焰人气球 |
| `block.create_things_and_misc.copper_casing_trapdoor` | Copper Casing Trapdoor | 铜机壳活板门 |
| `block.create_things_and_misc.slime` | Slime | 黏液 |
| `item.create_things_and_misc.spout_gun_chocolate` | Spout Gun | 注液枪 |
| `gui.create_things_and_misc.brass_speaker_gui.label_brass_speaker` | Brass Speaker | 黄铜扬声器 |
| `item.create_things_and_misc.ticket` | Ticket | 车票 |
| `item.create_things_and_misc.card` | Card | 卡片 |
| `item.create_things_and_misc.incomplete_mending_rune` | Incomplete Mending Rune | 经验修补符文（半成品） |
| `block.create_things_and_misc.brass_casing_trapdoor` | Brass Casing Trapdoor | 黄铜机壳活板门 |
| `block.create_things_and_misc.cherry_sail` | Cherry Sail | 樱花木风帆 |
| `item.create_addon.porridge` | Slime Porridge | 黏液粥 |
| `block.create_things_and_misc.card_reader` | Card Reader | 读卡器 |
| `block.create_addon.shematic_chair` | Schematic Chair | 蓝图座椅 |
| `block.create_things_and_misc.sturdy_sheet_slab` | Sturdy Sheet Slab | 坚固板台阶 |
| `block.create_things_and_misc.sprinkler` | Sprinkler | 洒水器 |
| `item.create_things_and_misc.empty_ticket` | Empty Ticket | 空白车票 |
| `block.create_addon.brass_tiles` | Brass Tiles | 黄铜瓦 |
| `gui.create_things_and_misc.brass_speaker_gui.button_clear` | Clear | 清空 |
| `item.create_addon.portable_vault` | Portable Vault | 便携保险库 |
| `item.create_things_and_misc.spout_gun` | Spout Gun | 注液枪 |
| `block.create_things_and_misc.acacia_sail` | Acacia Sail | 金合欢木风帆 |
| `block.create_things_and_misc.speed_75` | Train Sign | 铁路标志牌 |
| `block.create_things_and_misc.train_sing_yellow_3` | Train Sign | 铁路标志牌 |
| `entity.create_addon.sit` | Sit | 座位 |
| `block.create_addon.brass_brick_stairs` | Brass Bricks Stairs | 黄铜砖楼梯 |
| `block.create_things_and_misc.train_sing_yellow_2` | Train Sign | 铁路标志牌 |
| `block.create_things_and_misc.train_sing_yellow_1` | Train Sign | 铁路标志牌 |
| `gui.create_things_and_misc.inscriber_gui.button_inscribe` | Inscribe | 写入 |
| `item.create_addon.slime_bucket` | Slime Bucket | 黏液桶 |
| `block.create_things_and_misc.chorus_sail` | Chorus Nest Sail | 紫颂巢风帆 |
| `block.create_things_and_misc.sturdy_sheet_slab_stairs` | Sturdy Sheet Stairs | 坚固板楼梯 |
| `subtitles.announcement_sound` | announcement_sound | 扬声器：播报 |
| `item.create_things_and_misc.copper_knife` | Copper Knife | 铜刀 |
| `item.create_things_and_misc.sprinkler_head` | Sprinkler Head | 洒水喷头 |
| `item_group.create_things_and_misc.tab` | Create: Things and Misc | 机械动力：杂项 |
| `block.create_things_and_misc.birch_sail` | Birch Sail | 白桦木风帆 |
| `fluid.create_things_and_misc.slime` | Slime | 黏液 |
| `subtitles.netherite_whistle` | netherite_whistle | 下界合金汽笛：鸣响 |
| `block.create_things_and_misc.redsing_2` | Train Sign | 铁路标志牌 |
| `block.create_things_and_misc.redsing_1` | Train Sign | 铁路标志牌 |
| `block.create_things_and_misc.warped_sail` | Warped Sail | 诡异木风帆 |
| `entity.create_addon.potato_entity` | Sit | 座位 |
| `item.create_addon.sit_spawn_egg` | Sit Spawn Egg | 座位生成蛋 |
| `item.create_things_and_misc.vibration_mechanism` | Vibration Mechanism | 振动构件 |
| `block.create_things_and_misc.spruce_sail` | Spruce Sail | 云杉木风帆 |
| `block.create_things_and_misc.redsing` | Train Sign | 铁路标志牌 |
| `item.create_addon.neon_tube` | Neon Tube | 霓虹灯管 |
| `gui.create_things_and_misc.brass_speaker_gui.button_add` | Add | 添加 |
| `item.create_things_and_misc.sticky_boots_boots` | Sticky Boots | 黏性靴子 |
| `block.create_things_and_misc.speed_50` | Train Sign | 铁路标志牌 |
| `item.create_addon.stoup_gun_water` | Spout Gun | 注液枪 |
| `item.create_addon.glue_packaging` | Glue Packaging | 胶水包装 |
| `item.create_things_and_misc.magnifying_glass` | Magnifying Glass | 放大镜 |
| `item.create_things_and_misc.slime_bucket` | Slime Bucket | 黏液桶 |
| `block.create_things_and_misc.train_sing_5` | Train Sign | 铁路标志牌 |
| `block.create_things_and_misc.train_sing_4` | Train Sign | 铁路标志牌 |
| `item.create_things_and_misc.empty_card` | Empty Card | 空白卡片 |
| `block.create_things_and_misc.mangrove_sail` | Mangrove Sail | 红树木风帆 |
| `block.create_things_and_misc.train_sing_3` | Train Sign | 铁路标志牌 |
| `item.create_things_and_misc.incomplete_vibration_mechanism` | Incomplete Vibration Mechanism | 振动构件（半成品） |
| `block.create_things_and_misc.train_sing_2` | Train Sign | 铁路标志牌 |
| `block.create_addon.slime` | Slime | 黏液 |
| `block.create_things_and_misc.jungle_sail` | Jungle Sail | 丛林木风帆 |
| `block.create_things_and_misc.brass_tiles_stair` | Brass Tiles Stairs | 黄铜瓦楼梯 |
| `item.create_things_and_misc.spout_gun_water` | Spout Gun | 注液枪 |
| `entity.create_things_and_misc.sprinkler_radius` | Sprinkler Radius | 洒水范围 |
| `item.create_things_and_misc.spout_gun_lava` | Spout Gun | 注液枪 |
| `block.create_things_and_misc.oak_sail` | Oak Sail | 橡木风帆 |
| `block.create_addon.brass_bricks` | Brass Bricks | 黄铜砖 |
| `item.create_things_and_misc.portable_whistle` | Portable Whistle | 便携汽笛 |
| `block.create_things_and_misc.brass_brick_slab` | Brass Bricks Slab | 黄铜砖台阶 |
| `fluid.create_addon.slime` | Slime | 黏液 |
| `block.create_addon.sturdy_sheet_block` | Sturdy Sheet Block | 坚固板块 |
| `block.create_things_and_misc.train_buffer` | Train Buffer | 列车缓冲器 |
| `block.create_addon.brass_tiles_slab` | Brass Tiles Slab | 黄铜瓦台阶 |
| `item.create_things_and_misc.neon_tube` | Neon Tube | 霓虹灯管 |
| `block.create_addon.brass_brick_slab` | Brass Bricks Slab | 黄铜砖台阶 |
| `block.create_things_and_misc.sprinkleron` | Sprinkler | 洒水器 |
| `block.create_things_and_misc.dark_oak_sail` | Dark Oak Sail | 深色橡木风帆 |
| `block.create_things_and_misc.green_sing` | Train Sign | 铁路标志牌 |
| `item.create_things_and_misc.spout_gun_honey` | Spout Gun | 注液枪 |
| `block.create_things_and_misc.diluted_bonemeal` | Diluted Bonemeal | 骨粉溶液 |
| `item.create_addon.portable_canon` | Portable Canon | 便携炮 |
| `block.create_things_and_misc.brass_speaker` | Brass Speaker | 黄铜扬声器 |
| `item.create_things_and_misc.spout_gun_slime` | Spout Gun | 注液枪 |
| `block.create_things_and_misc.bamboo_sail` | Bamboo Sail | 竹风帆 |
| `block.create_things_and_misc.green_sing_6` | Train Sign | 铁路标志牌 |
| `block.create_things_and_misc.green_sing_4` | Train Sign | 铁路标志牌 |
| `block.create_things_and_misc.green_sing_5` | Train Sign | 铁路标志牌 |
| `block.create_things_and_misc.green_sing_2` | Train Sign | 铁路标志牌 |
| `block.create_things_and_misc.green_sing_3` | Train Sign | 铁路标志牌 |
| `gui.create_things_and_misc.inscriber_gui.label_inventory` | Inventory | 物品栏 |
| `item.create_things_and_misc.blaze_balloon_fire` | Blaze Balloon Canon | 烈焰人气球炮 |
| `block.create_things_and_misc.brass_tiles` | Brass Tiles | 黄铜瓦 |
| `subtitles.portable_whistle` | portable_whistle | 汽笛：鸣响 |
| `item.create_things_and_misc.experience_sheet` | Experience Sheet | 经验板 |
| `item.create_things_and_misc.brass_knife` | Brass Knife | 黄铜刀 |
| `item.create_addon.spout_gun_lava` | Spout Gun | 注液枪 |
| `block.create_addon.neon_tube_block` | Neon Tube Block | 霓虹灯管方块 |
| `subtitles.klaxon` | klaxon | 喇叭：鸣响 |
| `block.create_things_and_misc.ramboutan_sail` | Ramboutan Sail | 红毛丹木风帆 |
| `block.create_things_and_misc.jaboticaba_sail` | Jaboticaba Sail | 嘉宝果木风帆 |
| `block.create_things_and_misc.brass_brick_stairs` | Brass Bricks Stairs | 黄铜砖楼梯 |
| `gui.create_things_and_misc.brass_speaker_gui.label_actual_message` | Actual message : | 当前消息： |
| `block.create_things_and_misc.brass_bricks` | Brass Bricks | 黄铜砖 |
| `item.create_things_and_misc.radar` | Radar | 雷达 |
| `block.create_things_and_misc.green_sing_1` | Train Sign | 铁路标志牌 |
| `item.create_things_and_misc.zinc_knife` | Zinc Knife | 锌刀 |
| `block.create_things_and_misc.andesite_casing_trapdoor` | Andesite Casing Trapdoor | 安山机壳活板门 |
| `item.create_things_and_misc.glue_packaging` | Glue Packaging | 胶水包装 |
| `entity.create_things_and_misc.sprinkler_head` | Sprinkler Head | 洒水喷头 |
| `itemGroup.tabtab` | Create: Things and Misc | 机械动力：杂项 |
| `block.create_addon.brass_tiles_stair` | Brass Tiles Stairs | 黄铜瓦楼梯 |
| `block.create_things_and_misc.train_sing` | Train Sign | 铁路标志牌 |
| `block.create_things_and_misc.speed_25` | Train Sign | 铁路标志牌 |

## 同日补充：硬编码提示覆盖已实施

新增 client_scripts/misc_tooltip_translations.js，使用当前KubeJS JAR已核对的ItemEvents.tooltip/addAdvanced接口，只匹配create_things_and_misc命名空间内的14条完整原文；原位替换，不追加重复提示、不改变未知行。EmptyCard和EmptyTicket共用同一句，因此为15处、14键。本轮新增量修订为155键（141标准＋14自定义提示键），不是16条。

每条替换为Text.translate组件，英文fallback保留原文，zh_cn提供中文，不强制其他语言显示中文。当前Java回调签名为(ItemStack, boolean, List<Object>)，包装器允许原位替换并经TextWrapper.of重建提示。Node模拟检查全部14条匹配、保留未知行及其他命名空间排除通过；这仅验证脚本逻辑，不等于Rhino／Minecraft实际运行。需游戏检查修补符文、空白卡片、注液枪等提示，以及重载后无重复或报错。尚未覆盖全类潜在硬编码，不宣称穷尽；未部署。
