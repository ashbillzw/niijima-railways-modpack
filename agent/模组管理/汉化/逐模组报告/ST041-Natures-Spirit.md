# ST041 Nature’s Spirit 自然之灵

2026-10-17；包内2.2.5-1.20.1。通读897英文对应文本和28中文额外键，检查木材、岩石、花卉、群系、食物系列。本轮新增19、修正10。

## 上游检查

官方仓库由Modrinth项目WBvnqHfV的source_url确认。[1.20.1中文](https://github.com/Team-Hibiscus/NaturesSpirit/blob/279f6403ada1e47b5c50c2ee8e1a91a32b0ecb72/src/main/resources/assets/natures_spirit/lang/zh_cn.json)与[1.21.1中文](https://github.com/Team-Hibiscus/NaturesSpirit/blob/4ee8370736851dc451c1bfb7d468919672978be0/src/main/resources/assets/natures_spirit/lang/zh_cn.json)均906键，在本版英文键范围内与包内中文一致，不能直接补齐缺口；未穷尽PR。

8条披萨配料已有不带命名空间的旧键，将原译“搭配……”迁移至当前英文键；保留旧键，避免破坏其他引用。新材质沿用黑硅岩／洞石砖瓦／紫藤木拼块。没有把全部矿物名称重新改成地质学译名。

明确修正：挖撅→挖掘，叶针→针叶，草从→草丛，紫紫藤去重，按鈕简化；黑色白垩岩补颜色；白杨树叶不再误称枫树；蓝铃花盆栽与蓝铃花对应，不混为另一个blue_bulbs蓝风信子；椰子木活板门和落叶松木告示牌对齐本系列。

## 保留及后续核实

画作作者Aeramisu被译为“白杨”，可能是作者中文署名，缺乏身份依据不擅改。画名及“啮龙花”等特色名先保留。部分群系意译、plank_consistency“木材兼容数据包”需要结合包内容/视觉进一步核实，不据字面硬改。中文额外标签disabled_pizza_toppings“缺失披萨配料”有疑点，待确认实际禁用机制。以上候选不计入已修正。

## 十条代表性变动

| 键 | 原文 | 应用译文 |
| --- | --- | --- |
| `block.natures_spirit.bleached_chalk` | Bleached Chalk | 漂白白垩岩 |
| `block.natures_spirit.cracked_chert_tiles` | Cracked Chert Tiles | 裂纹黑硅岩瓷砖 |
| `block.natures_spirit.wisteria_mosaic` | Wisteria Mosaic | 紫藤木拼块 |
| `block.natures_spirit.pizza.minecraft.cooked_cod` | With Cooked Cod | 搭配熟鳕鱼 |
| `pack.natures_spirit.modified_flower_forest` | Modified Flower Forests | 改版繁花森林 |
| `advancements.adventure.sandy_forage.description` | 沿着沙漠芜菁根块挖撅到沙漠芜菁块。 | 沿着沙漠芜菁根块挖掘到沙漠芜菁块。 |
| `biome.natures_spirit.boreal_taiga` | 凌寒叶针林 | 凌寒针叶林 |
| `block.natures_spirit.potted_bluebell` | 蓝风信子盆栽 | 蓝铃花盆栽 |
| `block.natures_spirit.yellow_aspen_leaves` | 黄叶枫树树叶 | 黄叶白杨树叶 |
| `block.natures_spirit.tall_frigid_grass` | 高寒气草从 | 高寒气草丛 |

## 全部变动

| 键 | 原中文或英文 | 本轮中文 |
| --- | --- | --- |
| `advancements.adventure.sandy_forage.description` | 沿着沙漠芜菁根块挖撅到沙漠芜菁块。 | 沿着沙漠芜菁根块挖掘到沙漠芜菁块。 |
| `biome.natures_spirit.boreal_taiga` | 凌寒叶针林 | 凌寒针叶林 |
| `block.natures_spirit.black_chalk` | 白垩岩 | 黑色白垩岩 |
| `block.natures_spirit.bleached_chalk` | Bleached Chalk | 漂白白垩岩 |
| `block.natures_spirit.bleached_chalk_slab` | Bleached Chalk Slab | 漂白白垩岩台阶 |
| `block.natures_spirit.bleached_chalk_stairs` | Bleached Chalk Stairs | 漂白白垩岩楼梯 |
| `block.natures_spirit.coconut_trapdoor` | 椰木活板门 | 椰子木活板门 |
| `block.natures_spirit.cracked_chert_bricks` | Cracked Chert Bricks | 裂纹黑硅岩砖 |
| `block.natures_spirit.cracked_chert_tiles` | Cracked Chert Tiles | 裂纹黑硅岩瓷砖 |
| `block.natures_spirit.cracked_travertine_bricks` | Cracked Travertine Bricks | 裂纹洞石砖 |
| `block.natures_spirit.cracked_travertine_tiles` | Cracked Travertine Tiles | 裂纹洞石砖瓦 |
| `block.natures_spirit.ghaf_button` | 牧豆木按鈕 | 牧豆木按钮 |
| `block.natures_spirit.larch_sign` | 落叶松告示牌 | 落叶松木告示牌 |
| `block.natures_spirit.pizza.minecraft.beetroot` | With Beetroots | 搭配甜菜根 |
| `block.natures_spirit.pizza.minecraft.brown_mushroom` | With Mushrooms | 搭配蘑菇 |
| `block.natures_spirit.pizza.minecraft.carrot` | With Carrots | 搭配胡萝卜 |
| `block.natures_spirit.pizza.minecraft.cooked_chicken` | With Cooked Chicken | 搭配熟鸡肉 |
| `block.natures_spirit.pizza.minecraft.cooked_cod` | With Cooked Cod | 搭配熟鳕鱼 |
| `block.natures_spirit.pizza.minecraft.cooked_porkchop` | With Cooked Porkchop | 搭配熟猪排 |
| `block.natures_spirit.pizza.minecraft.cooked_rabbit` | With Cooked Rabbit | 搭配熟兔肉 |
| `block.natures_spirit.pizza.natures_spirit.olives` | With Olives | 搭配橄榄 |
| `block.natures_spirit.potted_bluebell` | 蓝风信子盆栽 | 蓝铃花盆栽 |
| `block.natures_spirit.tall_frigid_grass` | 高寒气草从 | 高寒气草丛 |
| `block.natures_spirit.white_wisteria_leaves` | 白花紫紫藤树叶 | 白花紫藤树叶 |
| `block.natures_spirit.wisteria_mosaic` | Wisteria Mosaic | 紫藤木拼块 |
| `block.natures_spirit.wisteria_mosaic_slab` | Wisteria Mosaic Slab | 紫藤木拼块台阶 |
| `block.natures_spirit.wisteria_mosaic_stairs` | Wisteria Mosaic Stairs | 紫藤木拼块楼梯 |
| `block.natures_spirit.yellow_aspen_leaves` | 黄叶枫树树叶 | 黄叶白杨树叶 |
| `pack.natures_spirit.modified_flower_forest` | Modified Flower Forests | 改版繁花森林 |

JSON、键覆盖、占位符静态检查通过。未全类扫描硬编码，未游戏验证、复制实例、打包或部署。

## C17 用户复审确认（2026-10-18）

用户确认保留“白垩岩→黑色白垩岩”：当前版本具有16色白垩岩系列；原中文中 black_chalk_slab、black_chalk_stairs 及 architecture_extensions.grouped_block.natures_spirit.black_chalk 分别已为“黑色白垩岩台阶”“黑色白垩岩楼梯”“黑色白垩岩”，只有完整方块漏掉颜色。此处依据为同一材质及系列命名一致性，不是认定贴图必须呈深黑色，也不推广为按英文颜色词一律改名的通用偏好。

已核对当前JAR方块状态→模型→贴图引用：black_chalk 使用 cube_all，六面均为 natures_spirit:block/black_chalk，原图16×16，外观偏暖中灰。本机提取图为 C:/mydata/Agents/Codex-CreateTrainResync/lang-audit/c17-black-chalk.png；预览 c17-black-chalk-preview.png 仅最近邻放大、未调色。此次仅补充确认依据，未再次修改译文或增加修正计数。
