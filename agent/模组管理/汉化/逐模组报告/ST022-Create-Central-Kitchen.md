# ST022 Create: Central Kitchen（机械动力：中央厨房）

日期：2026-10-17。包内`create_central_kitchen-1.20.1-for-create-0.5.1.j-1.3.13.jar`。

## 范围与结果

通读180个英文键、110条已有中文；包内另有15条先前冰淇淋覆盖，本轮全部保留。新增55键、修正2处名称／格式一致性。`_`键的致意文本保留，不当作玩家操作提示。没有修改配方、依赖或模组版本。

## 上游比对

- [1.20.1／Create 0.5.1分支](https://github.com/DragonsPlusMinecraft/CreateCentralKitchen/blob/69af6cb7a13e7887437c363c3205958df928d890/src/main/resources/assets/create_central_kitchen/lang/zh_cn.json)中文110键，与当前包内相同。
- [1.21.1／Create 6生成语言文件](https://github.com/DragonsPlusMinecraft/CreateCentralKitchen/blob/df9cc5c46612c46d8946494330fd2c5d9db30d44/src/generated/resources/assets/create_central_kitchen/lang/zh_cn.json)中文63键，与本版180键交集为0。不能用新版文件覆盖旧版；新版翻译源实际位于`src/main/translations/`，不是README缩写中的直接`src/translations/`。
- 未穷尽所有中文PR，未把新版路径404解释为没有中文。

## 翻译取舍

- Neapolitan奶昔名称采用包内的红豆味／香蕉味／巧克力味等既有名称；青柠与此前已有冰淇淋覆盖一致。
- long／strong饮料的英文显示名与普通版一致，中文也保持相同；不擅自增加“加长／强效”前缀，效果时长／等级由实际提示负责。
- 原有15条冰淇淋覆盖不改，避免撤销用户先前确认。两条冰淇淋半成品的“未完成的……”与其他半成品后缀风格不同，留作后续统一候选。
- 未安装兼容模组的专属食材仍补齐静态键，未来启用其来源模组时应核对正式名称；本轮不声称全部55条在当前游戏里可见。

## 10条代表译文

| 英文 | 中文 |
| --- | --- |
| Aloe Gel | 芦荟凝胶 |
| Black Tea | 红茶 |
| Dandelion Tea | 蒲公英茶 |
| Rose Hip Tea | 玫瑰果茶 |
| Gambler’s Tea | 赌徒茶 |
| Mint Limeade | 薄荷青柠汁 |
| Pomegranate Smoothie | 石榴冰沙 |
| Mulberry Jam Bucket | 桑葚果酱桶 |
| Incomplete Portobello Quiche | 波特贝勒菇咸派（半成品） |
| Adzuki Milkshake | 红豆味奶昔 |

## 旧译修正

思索中的“烈焰炉灶”统一“烈焰人炉灶”；玉米乐事数据包名称补回分隔符后的空格。不改厨锅、动力臂等既有术语。

## 全部新增

| 键 | 中文 |
| --- | --- |
| `fluid.create_central_kitchen.adzuki_milkshake` | 红豆味奶昔 |
| `fluid.create_central_kitchen.aloe_gel` | 芦荟凝胶 |
| `fluid.create_central_kitchen.aloe_milkshake` | 芦荟奶昔 |
| `fluid.create_central_kitchen.banana_milkshake` | 香蕉味奶昔 |
| `fluid.create_central_kitchen.berry_limeade` | 浆果青柠汁 |
| `fluid.create_central_kitchen.black_tea` | 红茶 |
| `fluid.create_central_kitchen.chocolate_milkshake` | 巧克力味奶昔 |
| `fluid.create_central_kitchen.coffee` | 咖啡 |
| `fluid.create_central_kitchen.dandelion_tea` | 蒲公英茶 |
| `fluid.create_central_kitchen.gamblers_tea` | 赌徒茶 |
| `fluid.create_central_kitchen.green_tea` | 绿茶 |
| `fluid.create_central_kitchen.lime_green_tea` | 青柠绿茶 |
| `fluid.create_central_kitchen.lime_milkshake` | 青柠奶昔 |
| `fluid.create_central_kitchen.limeade` | 青柠汁 |
| `fluid.create_central_kitchen.long_apple_cider` | 苹果酒 |
| `fluid.create_central_kitchen.long_black_tea` | 红茶 |
| `fluid.create_central_kitchen.long_coffee` | 咖啡 |
| `fluid.create_central_kitchen.long_dandelion_tea` | 蒲公英茶 |
| `fluid.create_central_kitchen.long_gamblers_tea` | 赌徒茶 |
| `fluid.create_central_kitchen.long_green_tea` | 绿茶 |
| `fluid.create_central_kitchen.long_purulent_tea` | 脓液茶 |
| `fluid.create_central_kitchen.long_rose_hip_tea` | 玫瑰果茶 |
| `fluid.create_central_kitchen.long_yellow_tea` | 黄茶 |
| `fluid.create_central_kitchen.mint_limeade` | 薄荷青柠汁 |
| `fluid.create_central_kitchen.mint_milkshake` | 薄荷味奶昔 |
| `fluid.create_central_kitchen.mulberry_jam` | 桑葚果酱 |
| `fluid.create_central_kitchen.passion_fruit_milkshake` | 百香果奶昔 |
| `fluid.create_central_kitchen.pink_limeade` | 粉红青柠汁 |
| `fluid.create_central_kitchen.pomegranate_black_tea` | 石榴红茶 |
| `fluid.create_central_kitchen.pomegranate_milkshake` | 石榴奶昔 |
| `fluid.create_central_kitchen.pomegranate_smoothie` | 石榴冰沙 |
| `fluid.create_central_kitchen.pumpkin_milkshake` | 南瓜奶昔 |
| `fluid.create_central_kitchen.purulent_tea` | 脓液茶 |
| `fluid.create_central_kitchen.rose_hip_tea` | 玫瑰果茶 |
| `fluid.create_central_kitchen.strawberry_milkshake` | 草莓味奶昔 |
| `fluid.create_central_kitchen.strong_apple_cider` | 苹果酒 |
| `fluid.create_central_kitchen.strong_black_tea` | 红茶 |
| `fluid.create_central_kitchen.strong_coffee` | 咖啡 |
| `fluid.create_central_kitchen.strong_gamblers_tea` | 赌徒茶 |
| `fluid.create_central_kitchen.strong_green_tea` | 绿茶 |
| `fluid.create_central_kitchen.strong_hot_cocoa` | 热可可 |
| `fluid.create_central_kitchen.strong_melon_juice` | 西瓜汁 |
| `fluid.create_central_kitchen.strong_purulent_tea` | 脓液茶 |
| `fluid.create_central_kitchen.strong_rose_hip_tea` | 玫瑰果茶 |
| `fluid.create_central_kitchen.strong_yellow_tea` | 黄茶 |
| `fluid.create_central_kitchen.sweet_berry_milkshake` | 甜浆果奶昔 |
| `fluid.create_central_kitchen.vanilla_milkshake` | 香草奶昔 |
| `fluid.create_central_kitchen.yellow_tea` | 黄茶 |
| `fluid.create_central_kitchen.yucca_milkshake` | 丝兰奶昔 |
| `item.create_central_kitchen.aloe_gel_bucket` | 芦荟凝胶桶 |
| `item.create_central_kitchen.incomplete_lime_pie` | 青柠派（半成品） |
| `item.create_central_kitchen.incomplete_portobello_burger` | 波特贝勒菇汉堡（半成品） |
| `item.create_central_kitchen.incomplete_portobello_quiche` | 波特贝勒菇咸派（半成品） |
| `item.create_central_kitchen.incomplete_portobello_wrap` | 波特贝勒菇卷饼（半成品） |
| `item.create_central_kitchen.mulberry_jam_bucket` | 桑葚果酱桶 |

## 验证与待办

JSON、55个缺译集合及原15条覆盖保留检查通过；新文字均无占位符。未全类扫描硬编码或进行游戏验证，未提交／部署。Portobello、Purulent Tea等未安装来源模组专名需在未来加入来源模组时复核；思索里的“超级燃烧”是否应对应Create现版本的具体热量档位，也留待核对枚举与界面。

本机比对快照：独立工作区`lang-audit/st022-*`。
