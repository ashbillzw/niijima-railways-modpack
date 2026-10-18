# ST021 Neapolitan

日期：2026-10-17。包内`neapolitan-1.20.1-5.1.0.jar`。

## 结果

通读276个英文键、150个中文键（并集304）。补译149键，5个专名保留英文；修正12条黑猩猩相关名称。原有13条冰淇淋覆盖完整保留，未重新计入本轮修正。包内多出的28个中文旧键保留，不误判成新版本内容。

## 上游审查与取舍

比对[官方1.20.x](https://github.com/team-abnormals/neapolitan/tree/d4d0593ee258c3c36008a5e4e33b013070fad17b/src/main/resources/assets/neapolitan/lang)和[官方1.21.x](https://github.com/team-abnormals/neapolitan/tree/39fbe97c6c80a307752e3a2f83c621edc46e5a56/src/main/resources/assets/neapolitan/lang)中英文文件。1.20新版中文已达276键，覆盖154个包内英文缺译键，但另有52条既有键变化；不直接替换整份文件。未穷尽未合并PR。

本轮独立编写缺译、复用包内既有名称并迁移旧键，没有批量导入新版中文文件；上游作为核对材料。上游仓库的Abnormals License不等同于宽松开源许可证，未来不得把参考比对当成整份新版语言文件的转载许可。

上游发现的问题／未采纳变化：

- `vanilla_pudding`出现“香草补丁”，保留包内正确的“香草布丁”。
- 绘画作者`five`译成“五”，应保留作者署名；4条author不加中文覆盖。
- 香草进度仍写“不使用剪刀”，与当前英文及JAR触发条件相反。VanillaVineBlock主手匹配Forge剪刀标签时跳过效果云，并触发VANILLA_POISON；本轮写“使用剪刀……避免释放有害气体”。
- 白草莓说明写死Y>256；实际StrawberryBushBlock.isWhite读取whiteStrawberryMinHeight配置并检查维度，边界不是简单固定>256，因此本轮保留英文的“高处”概述。
- 盆栽香草藤被写成“盆栽香草荚”；按植株修正为“香草藤盆栽”。
- 新版“冰激凌”不覆盖包内已经确认的“冰淇淋”。
- 新版把蕉叶改香蕉叶、蛋糕移除“味”、筐改箱，本轮沿用已有名称，避免新旧变体不一致。

## 10条代表译文

| 英文／用途 | 已应用 |
| --- | --- |
| Chimpanzee Head | 黑猩猩头颅 |
| Cake with Candle（草莓） | 插上蜡烛的草莓味蛋糕 |
| Milkshake Cauldron（薄荷） | 薄荷味奶昔炼药锅 |
| Potted Vanilla Vine | 香草藤盆栽 |
| Magic Beans | 魔豆 |
| Reflection Pottery Sherd | 映照纹样陶片 |
| Cone（绘画） | 甜筒 |
| Primal Armor Trim | 原始盔甲纹饰 |
| Killer Vanilla进度说明 | 使用剪刀破坏香草，避免释放有害气体 |
| Banana Bunch opens字幕 | 香蕉串：拆开 |

## 已有中文修正

Chimpanzee为黑猩猩，原文“猴子／猴”与进度标题“同猩协力”不一致。统一实体、刷怪蛋、旗帜说明、进度描述和字幕12键；新旗帜颜色变体及头颅也使用同名。

| 键 | 原中文 | 已应用 |
| --- | --- | --- |
| `item.neapolitan.chimpanzee_spawn_egg` | 猴子刷怪蛋 | 黑猩猩刷怪蛋 |
| `entity.neapolitan.chimpanzee` | 猴子 | 黑猩猩 |
| `advancements.neapolitan.adventure.chimpanzee_attack.description` | 用香蕉箭引诱猴子追逐其他生物 | 用香蕉箭引诱黑猩猩追逐其他生物 |
| `subtitles.neapolitan.entity.chimpanzee.scream` | 猴子：尖叫 | 黑猩猩：尖叫 |
| `subtitles.neapolitan.entity.chimpanzee.death` | 猴子：死亡 | 黑猩猩：死亡 |
| `subtitles.neapolitan.entity.chimpanzee.eat` | 猴子：进食 | 黑猩猩：进食 |
| `subtitles.neapolitan.entity.chimpanzee.howl` | 猴子：嚎叫 | 黑猩猩：嚎叫 |
| `subtitles.neapolitan.entity.chimpanzee.hurt` | 猴子：受伤 | 黑猩猩：受伤 |
| `subtitles.neapolitan.entity.chimpanzee.ambient` | 猴子：哦哦哦啊啊啊~ | 黑猩猩：哦哦哦啊啊啊~ |
| `subtitles.neapolitan.entity.chimpanzee.step` | 猴子：阔步行走 | 黑猩猩：阔步行走 |
| `subtitles.neapolitan.entity.chimpanzee.swing` | 猴子：转动 | 黑猩猩：转动 |
| `item.neapolitan.chimpanzee_banner_pattern.desc` | 猴 | 黑猩猩 |

## 全部新增键

| 键 | 中文 |
| --- | --- |
| `block.neapolitan.adzuki_candle_cake` | 插上蜡烛的红豆味蛋糕 |
| `block.neapolitan.adzuki_milkshake_cauldron` | 红豆味奶昔炼药锅 |
| `block.neapolitan.black_adzuki_candle_cake` | 插上黑色蜡烛的红豆味蛋糕 |
| `block.neapolitan.blue_adzuki_candle_cake` | 插上蓝色蜡烛的红豆味蛋糕 |
| `block.neapolitan.brown_adzuki_candle_cake` | 插上棕色蜡烛的红豆味蛋糕 |
| `block.neapolitan.cyan_adzuki_candle_cake` | 插上青色蜡烛的红豆味蛋糕 |
| `block.neapolitan.gray_adzuki_candle_cake` | 插上灰色蜡烛的红豆味蛋糕 |
| `block.neapolitan.green_adzuki_candle_cake` | 插上绿色蜡烛的红豆味蛋糕 |
| `block.neapolitan.light_blue_adzuki_candle_cake` | 插上淡蓝色蜡烛的红豆味蛋糕 |
| `block.neapolitan.light_gray_adzuki_candle_cake` | 插上淡灰色蜡烛的红豆味蛋糕 |
| `block.neapolitan.lime_adzuki_candle_cake` | 插上黄绿色蜡烛的红豆味蛋糕 |
| `block.neapolitan.magenta_adzuki_candle_cake` | 插上品红色蜡烛的红豆味蛋糕 |
| `block.neapolitan.orange_adzuki_candle_cake` | 插上橙色蜡烛的红豆味蛋糕 |
| `block.neapolitan.pink_adzuki_candle_cake` | 插上粉红色蜡烛的红豆味蛋糕 |
| `block.neapolitan.purple_adzuki_candle_cake` | 插上紫色蜡烛的红豆味蛋糕 |
| `block.neapolitan.red_adzuki_candle_cake` | 插上红色蜡烛的红豆味蛋糕 |
| `block.neapolitan.white_adzuki_candle_cake` | 插上白色蜡烛的红豆味蛋糕 |
| `block.neapolitan.yellow_adzuki_candle_cake` | 插上黄色蜡烛的红豆味蛋糕 |
| `block.neapolitan.banana_candle_cake` | 插上蜡烛的香蕉味蛋糕 |
| `block.neapolitan.banana_milkshake_cauldron` | 香蕉味奶昔炼药锅 |
| `block.neapolitan.black_banana_candle_cake` | 插上黑色蜡烛的香蕉味蛋糕 |
| `block.neapolitan.blue_banana_candle_cake` | 插上蓝色蜡烛的香蕉味蛋糕 |
| `block.neapolitan.brown_banana_candle_cake` | 插上棕色蜡烛的香蕉味蛋糕 |
| `block.neapolitan.cyan_banana_candle_cake` | 插上青色蜡烛的香蕉味蛋糕 |
| `block.neapolitan.gray_banana_candle_cake` | 插上灰色蜡烛的香蕉味蛋糕 |
| `block.neapolitan.green_banana_candle_cake` | 插上绿色蜡烛的香蕉味蛋糕 |
| `block.neapolitan.light_blue_banana_candle_cake` | 插上淡蓝色蜡烛的香蕉味蛋糕 |
| `block.neapolitan.light_gray_banana_candle_cake` | 插上淡灰色蜡烛的香蕉味蛋糕 |
| `block.neapolitan.lime_banana_candle_cake` | 插上黄绿色蜡烛的香蕉味蛋糕 |
| `block.neapolitan.magenta_banana_candle_cake` | 插上品红色蜡烛的香蕉味蛋糕 |
| `block.neapolitan.orange_banana_candle_cake` | 插上橙色蜡烛的香蕉味蛋糕 |
| `block.neapolitan.pink_banana_candle_cake` | 插上粉红色蜡烛的香蕉味蛋糕 |
| `block.neapolitan.purple_banana_candle_cake` | 插上紫色蜡烛的香蕉味蛋糕 |
| `block.neapolitan.red_banana_candle_cake` | 插上红色蜡烛的香蕉味蛋糕 |
| `block.neapolitan.white_banana_candle_cake` | 插上白色蜡烛的香蕉味蛋糕 |
| `block.neapolitan.yellow_banana_candle_cake` | 插上黄色蜡烛的香蕉味蛋糕 |
| `block.neapolitan.chocolate_candle_cake` | 插上蜡烛的巧克力味蛋糕 |
| `block.neapolitan.chocolate_milkshake_cauldron` | 巧克力味奶昔炼药锅 |
| `block.neapolitan.black_chocolate_candle_cake` | 插上黑色蜡烛的巧克力味蛋糕 |
| `block.neapolitan.blue_chocolate_candle_cake` | 插上蓝色蜡烛的巧克力味蛋糕 |
| `block.neapolitan.brown_chocolate_candle_cake` | 插上棕色蜡烛的巧克力味蛋糕 |
| `block.neapolitan.cyan_chocolate_candle_cake` | 插上青色蜡烛的巧克力味蛋糕 |
| `block.neapolitan.gray_chocolate_candle_cake` | 插上灰色蜡烛的巧克力味蛋糕 |
| `block.neapolitan.green_chocolate_candle_cake` | 插上绿色蜡烛的巧克力味蛋糕 |
| `block.neapolitan.light_blue_chocolate_candle_cake` | 插上淡蓝色蜡烛的巧克力味蛋糕 |
| `block.neapolitan.light_gray_chocolate_candle_cake` | 插上淡灰色蜡烛的巧克力味蛋糕 |
| `block.neapolitan.lime_chocolate_candle_cake` | 插上黄绿色蜡烛的巧克力味蛋糕 |
| `block.neapolitan.magenta_chocolate_candle_cake` | 插上品红色蜡烛的巧克力味蛋糕 |
| `block.neapolitan.orange_chocolate_candle_cake` | 插上橙色蜡烛的巧克力味蛋糕 |
| `block.neapolitan.pink_chocolate_candle_cake` | 插上粉红色蜡烛的巧克力味蛋糕 |
| `block.neapolitan.purple_chocolate_candle_cake` | 插上紫色蜡烛的巧克力味蛋糕 |
| `block.neapolitan.red_chocolate_candle_cake` | 插上红色蜡烛的巧克力味蛋糕 |
| `block.neapolitan.white_chocolate_candle_cake` | 插上白色蜡烛的巧克力味蛋糕 |
| `block.neapolitan.yellow_chocolate_candle_cake` | 插上黄色蜡烛的巧克力味蛋糕 |
| `block.neapolitan.mint_candle_cake` | 插上蜡烛的薄荷味蛋糕 |
| `block.neapolitan.mint_milkshake_cauldron` | 薄荷味奶昔炼药锅 |
| `block.neapolitan.black_mint_candle_cake` | 插上黑色蜡烛的薄荷味蛋糕 |
| `block.neapolitan.blue_mint_candle_cake` | 插上蓝色蜡烛的薄荷味蛋糕 |
| `block.neapolitan.brown_mint_candle_cake` | 插上棕色蜡烛的薄荷味蛋糕 |
| `block.neapolitan.cyan_mint_candle_cake` | 插上青色蜡烛的薄荷味蛋糕 |
| `block.neapolitan.gray_mint_candle_cake` | 插上灰色蜡烛的薄荷味蛋糕 |
| `block.neapolitan.green_mint_candle_cake` | 插上绿色蜡烛的薄荷味蛋糕 |
| `block.neapolitan.light_blue_mint_candle_cake` | 插上淡蓝色蜡烛的薄荷味蛋糕 |
| `block.neapolitan.light_gray_mint_candle_cake` | 插上淡灰色蜡烛的薄荷味蛋糕 |
| `block.neapolitan.lime_mint_candle_cake` | 插上黄绿色蜡烛的薄荷味蛋糕 |
| `block.neapolitan.magenta_mint_candle_cake` | 插上品红色蜡烛的薄荷味蛋糕 |
| `block.neapolitan.orange_mint_candle_cake` | 插上橙色蜡烛的薄荷味蛋糕 |
| `block.neapolitan.pink_mint_candle_cake` | 插上粉红色蜡烛的薄荷味蛋糕 |
| `block.neapolitan.purple_mint_candle_cake` | 插上紫色蜡烛的薄荷味蛋糕 |
| `block.neapolitan.red_mint_candle_cake` | 插上红色蜡烛的薄荷味蛋糕 |
| `block.neapolitan.white_mint_candle_cake` | 插上白色蜡烛的薄荷味蛋糕 |
| `block.neapolitan.yellow_mint_candle_cake` | 插上黄色蜡烛的薄荷味蛋糕 |
| `block.neapolitan.strawberry_candle_cake` | 插上蜡烛的草莓味蛋糕 |
| `block.neapolitan.strawberry_milkshake_cauldron` | 草莓味奶昔炼药锅 |
| `block.neapolitan.black_strawberry_candle_cake` | 插上黑色蜡烛的草莓味蛋糕 |
| `block.neapolitan.blue_strawberry_candle_cake` | 插上蓝色蜡烛的草莓味蛋糕 |
| `block.neapolitan.brown_strawberry_candle_cake` | 插上棕色蜡烛的草莓味蛋糕 |
| `block.neapolitan.cyan_strawberry_candle_cake` | 插上青色蜡烛的草莓味蛋糕 |
| `block.neapolitan.gray_strawberry_candle_cake` | 插上灰色蜡烛的草莓味蛋糕 |
| `block.neapolitan.green_strawberry_candle_cake` | 插上绿色蜡烛的草莓味蛋糕 |
| `block.neapolitan.light_blue_strawberry_candle_cake` | 插上淡蓝色蜡烛的草莓味蛋糕 |
| `block.neapolitan.light_gray_strawberry_candle_cake` | 插上淡灰色蜡烛的草莓味蛋糕 |
| `block.neapolitan.lime_strawberry_candle_cake` | 插上黄绿色蜡烛的草莓味蛋糕 |
| `block.neapolitan.magenta_strawberry_candle_cake` | 插上品红色蜡烛的草莓味蛋糕 |
| `block.neapolitan.orange_strawberry_candle_cake` | 插上橙色蜡烛的草莓味蛋糕 |
| `block.neapolitan.pink_strawberry_candle_cake` | 插上粉红色蜡烛的草莓味蛋糕 |
| `block.neapolitan.purple_strawberry_candle_cake` | 插上紫色蜡烛的草莓味蛋糕 |
| `block.neapolitan.red_strawberry_candle_cake` | 插上红色蜡烛的草莓味蛋糕 |
| `block.neapolitan.white_strawberry_candle_cake` | 插上白色蜡烛的草莓味蛋糕 |
| `block.neapolitan.yellow_strawberry_candle_cake` | 插上黄色蜡烛的草莓味蛋糕 |
| `block.neapolitan.vanilla_candle_cake` | 插上蜡烛的香草蛋糕 |
| `block.neapolitan.vanilla_milkshake_cauldron` | 香草奶昔炼药锅 |
| `block.neapolitan.black_vanilla_candle_cake` | 插上黑色蜡烛的香草蛋糕 |
| `block.neapolitan.blue_vanilla_candle_cake` | 插上蓝色蜡烛的香草蛋糕 |
| `block.neapolitan.brown_vanilla_candle_cake` | 插上棕色蜡烛的香草蛋糕 |
| `block.neapolitan.cyan_vanilla_candle_cake` | 插上青色蜡烛的香草蛋糕 |
| `block.neapolitan.gray_vanilla_candle_cake` | 插上灰色蜡烛的香草蛋糕 |
| `block.neapolitan.green_vanilla_candle_cake` | 插上绿色蜡烛的香草蛋糕 |
| `block.neapolitan.light_blue_vanilla_candle_cake` | 插上淡蓝色蜡烛的香草蛋糕 |
| `block.neapolitan.light_gray_vanilla_candle_cake` | 插上淡灰色蜡烛的香草蛋糕 |
| `block.neapolitan.lime_vanilla_candle_cake` | 插上黄绿色蜡烛的香草蛋糕 |
| `block.neapolitan.magenta_vanilla_candle_cake` | 插上品红色蜡烛的香草蛋糕 |
| `block.neapolitan.orange_vanilla_candle_cake` | 插上橙色蜡烛的香草蛋糕 |
| `block.neapolitan.pink_vanilla_candle_cake` | 插上粉红色蜡烛的香草蛋糕 |
| `block.neapolitan.purple_vanilla_candle_cake` | 插上紫色蜡烛的香草蛋糕 |
| `block.neapolitan.red_vanilla_candle_cake` | 插上红色蜡烛的香草蛋糕 |
| `block.neapolitan.white_vanilla_candle_cake` | 插上白色蜡烛的香草蛋糕 |
| `block.neapolitan.yellow_vanilla_candle_cake` | 插上黄色蜡烛的香草蛋糕 |
| `block.minecraft.banner.neapolitan.chimpanzee.black` | 黑色黑猩猩 |
| `block.minecraft.banner.neapolitan.chimpanzee.blue` | 蓝色黑猩猩 |
| `block.minecraft.banner.neapolitan.chimpanzee.brown` | 棕色黑猩猩 |
| `block.minecraft.banner.neapolitan.chimpanzee.cyan` | 青色黑猩猩 |
| `block.minecraft.banner.neapolitan.chimpanzee.gray` | 灰色黑猩猩 |
| `block.minecraft.banner.neapolitan.chimpanzee.green` | 绿色黑猩猩 |
| `block.minecraft.banner.neapolitan.chimpanzee.light_blue` | 淡蓝色黑猩猩 |
| `block.minecraft.banner.neapolitan.chimpanzee.light_gray` | 淡灰色黑猩猩 |
| `block.minecraft.banner.neapolitan.chimpanzee.lime` | 黄绿色黑猩猩 |
| `block.minecraft.banner.neapolitan.chimpanzee.magenta` | 品红色黑猩猩 |
| `block.minecraft.banner.neapolitan.chimpanzee.orange` | 橙色黑猩猩 |
| `block.minecraft.banner.neapolitan.chimpanzee.pink` | 粉红色黑猩猩 |
| `block.minecraft.banner.neapolitan.chimpanzee.purple` | 紫色黑猩猩 |
| `block.minecraft.banner.neapolitan.chimpanzee.red` | 红色黑猩猩 |
| `block.minecraft.banner.neapolitan.chimpanzee.white` | 白色黑猩猩 |
| `block.minecraft.banner.neapolitan.chimpanzee.yellow` | 黄色黑猩猩 |
| `advancements.neapolitan.husbandry.creeper_heal.description` | 让草莓丛中的苦力怕爆炸，为你恢复生命值 |
| `advancements.neapolitan.husbandry.creeper_heal.title` | 糖衣炸弹 |
| `advancements.neapolitan.husbandry.harvest_white_strawberries.description` | 在高处种植草莓丛，收获白草莓 |
| `advancements.neapolitan.husbandry.harvest_white_strawberries.title` | 云中野餐 |
| `advancements.neapolitan.husbandry.place_all_chocolate_blocks.description` | 放置每一种巧克力方块 |
| `advancements.neapolitan.husbandry.place_all_chocolate_blocks.title` | 褐石建筑 |
| `advancements.neapolitan.husbandry.vanilla_poison.description` | 使用剪刀破坏香草，避免释放有害气体 |
| `advancements.neapolitan.husbandry.vanilla_poison.title` | 杀手香草 |
| `biome.neapolitan.strawberry_fields` | 草莓原野 |
| `block.neapolitan.chimpanzee_head` | 黑猩猩头颅 |
| `block.neapolitan.magic_beans` | 魔豆 |
| `block.neapolitan.potted_banana_frond` | 蕉叶盆栽 |
| `block.neapolitan.potted_mint` | 薄荷盆栽 |
| `block.neapolitan.potted_vanilla_vine` | 香草藤盆栽 |
| `item.neapolitan.banana_frond` | 蕉叶 |
| `item.neapolitan.reflection_pottery_sherd` | 映照纹样陶片 |
| `item.neapolitan.scream_pottery_sherd` | 尖叫纹样陶片 |
| `item.neapolitan.snack_pottery_sherd` | 点心纹样陶片 |
| `item.neapolitan.spider_pottery_sherd` | 蜘蛛纹样陶片 |
| `painting.neapolitan.cone.title` | 甜筒 |
| `painting.neapolitan.dawn.title` | 黎明 |
| `painting.neapolitan.scream.title` | 呐喊 |
| `subtitles.neapolitan.item.banana_bunch.open` | 香蕉串：拆开 |
| `subtitles.neapolitan.item.ice_cream.eat` | 冰淇淋：进食 |
| `trim_pattern.neapolitan.primal` | 原始盔甲纹饰 |

## 保留项与验证

- `Neapoleon`绘画标题是Neapolitan／Napoleon双关，本轮保留原名，不采用“那拿破仑”；与4个five作者键一起列为5项专名例外。音乐唱片RENREN - Hullabaloo同样保留。
- 已查看包内Cone及Neapoleon画作，前者画的是冰淇淋甜筒，不采用上游“圆锥”。
- 原字幕swing的“转动”是否应为荡动，需结合动画继续核对；本轮只统一实体名称。
- 配置、全类硬编码及实际显示仍未全面审查。JSON、缺译集合／例外和占位符检查通过，旧13条覆盖逐项保留；未游戏验证、提交或部署。
- 本机上游快照、画作查看副本及反汇编位于独立工作区`lang-audit/st021-*`。
