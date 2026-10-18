# ST033 JER

日期：2026-10-17。包内：`JustEnoughResources-1.20.1-1.4.0.247.jar`。本轮新增0、修正27。

144条英文、146条中文已通读，包含2条仅中文旧键，保留。已有中文键中整段英文也作为旧译修正计数，不记为新增缺键。

官方[1.20.1](https://github.com/way2muchnoise/JustEnoughResources/blob/62cbeaf4375e11701e2533f9f4fffc4040570351/Common/src/main/resources/assets/jeresources/lang/zh_cn.json)146条与包内一致；[master](https://github.com/way2muchnoise/JustEnoughResources/blob/efa4323f1eadcb988549d16cb7d467af9f4241c8/Common/src/main/resources/assets/jeresources/lang/zh_cn.json)144条，有5条更新。参考其POI“工作站点方块”；pack devs按语境译整合包制作者，不沿用新版“资源包开发者”。选项卡ID必须保留英文供配置填写。

当前JAR Conditional确认before/past、below/above为成对条件，旧译世界时间方向相反、抢夺上下界均写“大于”，本轮纠正。Day time不等于生存天数，改为一天中的时间；燃烧状态不等于死因为燃烧。没有修改条件代码或边界计算，具体边界包含关系仍待运行核查。

村庄房屋及堡垒遗迹标签统一生物群系／结构名称，Hoglin与前文已确认的疣猪对齐，不保留音译霍格林或扩成马厩。附魔Looting统一抢夺。蛾眉月修正错字。

### 待核查与保留

- 小／大岩浆怪说明与实际掉落大小规则，以及power/世界难度条件的具体含义仍需游戏／调用方核查。
- 古城冰盒、地牢资源、矿物生成等旧称先保留；不在本轮顺带重命名整个分类。
- _comment、格式模板和技术标识不计漏译。两条仅中文旧键不主动删除。

## 全部应用明细

| 键 | 旧译 | 已应用 |
| --- | --- | --- |
| `jer.config.diyData.description` | The build in compat code will not load and jsons will be loaded （需要重启Minecraft） | 不加载内置兼容代码，改为加载 JSON 数据文件（需要重启 Minecraft） |
| `jer.config.dimensionsBlacklist.description` | 来自于JEI分析扫描的黑名单维度 | 从 JEI 分析扫描中排除列入黑名单的维度 |
| `jer.config.showDevData.title` | Show extra information | 显示额外信息 |
| `jer.config.showDevData.description` | Mainly for pack devs. Features include but not limited to avg. blocks per chuck, entity ids, ... | 主要供整合包制作者使用，显示每个区块的平均方块数、实体 ID 等额外信息。 |
| `jer.config.hiddenTabs.title` | Hide tabs added by JER | 隐藏 JER 添加的选项卡 |
| `jer.config.hiddenTabs.description` | Tabs added by JER are 'dungeon', 'enchantment', 'mob', 'villager', worldgen' and 'plant' | JER 添加的选项卡标识为 'dungeon'、'enchantment'、'mob'、'villager'、'worldgen' 和 'plant'。 |
| `jer.dungeon.village_temple` | 村庙 | 村庄神殿 |
| `jer.dungeon.village_desert_house` | 乡村沙漠之家 | 沙漠村庄房屋 |
| `jer.dungeon.village_plains_house` | 乡村平原别墅 | 平原村庄房屋 |
| `jer.dungeon.village_taiga_house` | 村针叶林屋 | 针叶林村庄房屋 |
| `jer.dungeon.village_snowy_house` | 乡村雪屋 | 雪原村庄房屋 |
| `jer.dungeon.village_savanna_house` | 萨凡纳乡村别墅 | 热带草原村庄房屋 |
| `jer.dungeon.bastion_treasure` | 堡垒藏宝 | 堡垒遗迹藏宝室 |
| `jer.dungeon.bastion_other` | 堡垒其他 | 堡垒遗迹其他区域 |
| `jer.dungeon.bastion_bridge` | 堡垒桥 | 堡垒遗迹桥梁 |
| `jer.dungeon.bastion_hoglin_stable` | 堡垒霍格林马厩 | 堡垒遗迹疣猪棚 |
| `jer.worldgen.dimensions` | 有效生物群系 | 有效维度 |
| `jer.villager.poi` | Point of Interest | 工作站点方块 |
| `jer.burning.text` | 掉落条件：燃烧致死 | 掉落条件：处于燃烧状态 |
| `jer.notBurning.text` | 掉落条件：未燃烧致死 | 掉落条件：未处于燃烧状态 |
| `jer.pastTime.text` | 掉落条件：生存天数多于%s | 掉落条件：一天中的时间晚于%s |
| `jer.beforeTime.text` | 掉落条件：生存天数少于%s | 掉落条件：一天中的时间早于%s |
| `jer.pastWorldTime.text` | 掉落条件：时间在%s之前 | 掉落条件：世界时间晚于%s |
| `jer.beforeWorldTime.text` | 掉落条件：时间在%s之后 | 掉落条件：世界时间早于%s |
| `jer.aboveLooting.text` | 掉落条件：掠夺附魔等级大于%s | 掉落条件：抢夺附魔等级大于%s |
| `jer.belowLooting.text` | 掉落条件：掠夺附魔等级大于%s | 掉落条件：抢夺附魔等级小于%s |
| `jer.waxing_crescent.moon` | 娥眉月 | 蛾眉月 |


JSON、占位符和资源路径静态检查；尚未游戏验证、复制实例、打包、提交或部署。未全类排查硬编码，未穷尽上游PR。所有实际修改列于上表；未生成翻译的项目不凑例子。
