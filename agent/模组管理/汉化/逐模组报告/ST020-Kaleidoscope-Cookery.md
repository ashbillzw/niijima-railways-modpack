# ST020 Kaleidoscope Cookery（森罗物语：厨房）

日期：2026-10-17。包内`kaleidoscopecookery-1.6.0-forge+mc1.20.1.jar`。

## 范围与结果

通读577个英文键及576条已有中文；补齐1条生竹筒饭介绍，修正7处旧译。中文本身已经完整覆盖主要功能，不将英文直译当成比中文原作更权威的标准。保留厨娘凳、旋风烤肉塔、猪儿虫及食物风味文案。

## 上游比对

- [官方main固定版本](https://github.com/KaleidoscopeMods/KaleidoscopeCookery/tree/2f4e386ce23f49a385ddf003c67fc6415c55417a/src/main/resources/assets/kaleidoscope_cookery/lang)
- [官方NeoForge 1.21.1固定版本](https://github.com/KaleidoscopeMods/KaleidoscopeCookery/tree/4d39e36cfa749939ba5f9d6d3b715ef9a984cb9c/src/main/resources/assets/kaleidoscope_cookery/lang)

两分支中文均576键，与包内逐键相同，尚未修复本轮问题。公开分支还包括1.20.1／1.21.1 Fabric，本轮没有逐一读取其语言文件，也没有穷尽所有未合并翻译PR。

## 已应用内容

| 键 | 原中文 | 已应用 |
| --- | --- | --- |
| `tooltip.kaleidoscope_cookery.raw_bamboo_tube_rice.maxim` | 缺失 | 以香米、糯米搭配肉菜等食材装入竹筒<br>烹制而成的中国南方传统美食 |
| `tooltip.kaleidoscope_cookery.oil` | 使用菜刀击杀猪、猪灵、疣猪兽获得 | 使用菜刀击杀猪、猪灵、疣猪获得 |
| `tooltip.kaleidoscope_cookery.kitchen_knife` | 击杀猪/猪灵/疣猪兽获得油脂 | 击杀猪/猪灵/疣猪获得油脂 |
| `advancements.kaleidoscope_cookery.oil.description` | 使用菜刀击杀猪、猪灵、疣猪兽来获取油脂 | 使用菜刀击杀猪、猪灵、疣猪来获取油脂 |
| `tooltip.kaleidoscope_cookery.candied_potato.maxim` | 糖丝棉长，满满土豆香 | 糖丝绵长，满满土豆香 |
| `advancements.kaleidoscope_cookery.make_soup.description` | 向锅里添加完食材后盖上锅盖进行煲汤，掀开盖子汤煲好后使用碗来盛出！ | 向锅里添加完食材后盖上锅盖进行煲汤，汤煲好后掀开锅盖，使用碗来盛出！ |
| `kaleidoscope_cookery.ponder.pot.text_5` | 接下来只需等待片刻…… | 充分翻炒后，再等待片刻…… |
| `advancements.kaleidoscope_cookery.baozi.description` | 潜行并抛出一个蒸包击中狼，使其回血 | 潜行并抛出一个包子击中狼，使其回血 |

仅1条新增与7处修正，不凑出10条雷同案例；上表列出全部改动。

## 判断依据

- 生／熟竹筒饭英文介绍相同，直接沿用作者已有熟竹筒饭中文，保持换行及文风。
- 三处Hoglin提示统一原版实体名称“疣猪”，没有改成猪灵，也没有改变掉落逻辑。
- 拔丝土豆“糖丝棉长”改“糖丝绵长”；包子进度中的“蒸包”与实际物品名“包子”统一。
- 汤锅说明原来把“掀开盖子”写在“汤煲好”前，改为煲好后揭盖再盛取，与原英文、现有思索教程一致。
- 炒锅思索补回“充分翻炒”：当前JAR的PotBlockEntity.tickCooking检查stirFryCount，时间结束仍有剩余翻炒次数会产出谜之炒菜，因此“只需等待片刻”容易误导。

## 待核查／保留

- 石磨教程“自动绑定周围的生物”比物品提示的“上方特定生物”宽泛；需要进一步核对绑定距离、实体标签及是否要求骑乘再统一，不凭英文缩改机制。
- 蒸笼提示写“潜行右键”，思索写“封顶”：精确交互条件待游戏核验。
- 菜板Jade的max与中文“需”应依实际参数判断，未擅自改为最大值。
- 苔原／寒带、茶名与英文键名存在差别，以作者中文及实际内容为准，未按barley、oolong键名反推茶名。
- 料理品质“生疏”及各种进度梗保留，不将个人文风喜好判为错误。

验证：新增键集合、JSON及占位符检查通过；未全类扫描硬编码，未游戏验证、提交或部署。本机语言快照与锅类反汇编在独立工作区`lang-audit/st020-*`。
