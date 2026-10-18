# ST032 JEED

日期：2026-10-17。包内：`jeed-1.20-2.2.6.jar`。本轮新增0、修正9。

200条中英文已通读，原有标准键无缺失。修正明确错字／语病、“力量／虚弱”漏写近战范围，以及Phantom误译为幽灵；将2条<Unknown>明确显示为暂无效果说明，不杜撰未知效果机制；Pacified按其描述“失去敌意”译为安抚。

官方[1.20](https://github.com/MehVahdJukaar/JustEnoughEffectDescriptions/blob/a2f4f3111b5bc4ca842969b8267d8afa1fec86ba/common/src/main/resources/assets/jeed/lang/zh_cn.json)和[1.21](https://github.com/MehVahdJukaar/JustEnoughEffectDescriptions/blob/2efbcb02a5acddc6d88f331fbecded17cc5055a8/common/src/main/resources/assets/jeed/lang/zh_cn.json)均200条，与包内一致，无法靠新版中文解决这些错误。

### 保留与待核查

- 隐身说明声称高等级进一步降低探测范围、知识效果经验倍率、cofh_core.chilled的1.5颗心／1.5点差异：中英文存在机制疑点，相关模组不同版本的实现尚未逐个验证，暂不把英文当最终事实。
- trial_omen、raid_omen等新版兼容说明不代表原版1.20.1拥有这些效果；不因资源存在就删除，也不把原版不祥之兆说明套成1.21机制。
- goodending的当代免疫、Twist专名、Seasonals两种fall_flavor/flavour及部分作者自定义效果：需关联对应Mod版本再定名。当前未扩展安装这些模组。
- Farmer's Delight舒适描述与已核实机制一致，保留。跨模组描述的具体数值、范围、等级公式未全部实测；初筛不等于200项机制验收。

## 全部应用明细

| 键 | 旧译 | 已应用 |
| --- | --- | --- |
| `effect.minecraft.absorption.description` | 给予伤害吸收生命值（不会自然恢复），用于承受的伤害；越高的等级生命值越高。 | 给予不会自然恢复的伤害吸收生命值，用于承受伤害；等级越高，获得的伤害吸收生命值越多。 |
| `effect.minecraft.hero_of_the_village.description` | 在与村民的交易中获得折扣，并让村民会根据自己的职业赠送随机物品‌‌。 | 在与村民交易时获得折扣，并让村民根据自己的职业赠送物品。 |
| `effect.minecraft.speed.description` | 提高移动速度；等级越高，玩家速度越块，视野越宽阔。 | 提高移动速度；等级越高，玩家速度越快，视野越宽阔。 |
| `effect.minecraft.strength.description` | 增加攻击伤害；更高的等级更高的攻击伤害。 | 增加近战伤害；等级越高，伤害增幅越大。 |
| `effect.minecraft.weakness.description` | 降低攻击伤害；等级越高，伤害越小。 | 降低近战伤害；等级越高，伤害降幅越大。 |
| `effect.buzzier_bees.sunny.description` | 模拟阳光。幽灵不会攻击拥有该效果的生物，蜜蜂在拥有该效果时不会睡觉，亡灵生物在拥有该效果时会被灼烧。 | 模拟阳光。幻翼不会攻击拥有该效果的生物，蜜蜂拥有该效果时不会睡觉，亡灵生物拥有该效果时会燃烧。 |
| `effect.tetra.exhausted.description` | <Unknown> | 暂无效果说明 |
| `effect.tetra.steeled.description` | <Unknown> | 暂无效果说明 |
| `effect.xreliquary.pacification` | Pacified | 安抚 |


JSON、占位符和资源路径静态检查；尚未游戏验证、复制实例、打包、提交或部署。未全类排查硬编码，未穷尽上游PR。所有实际修改列于上表；未生成翻译的项目不凑例子。
