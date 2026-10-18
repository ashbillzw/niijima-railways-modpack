# ST019 Farmer’s Delight（农夫乐事）

日期：2026-10-17。当前包内 `FarmersDelight-1.20.1-1.3.4.jar`。

## 结果与范围

通读429个英文键、479个中文键（并集529）；补齐50个Forge物品标签名称，修正6处旧译。额外100个中文键包含新版c标签／配置文本，本轮保留，不因没有对应英文就删除。标签名称补译不改变标签内容或配方。

## 上游比对

- [官方1.20分支语言目录](https://github.com/vectorwing/FarmersDelight/tree/e854d56d4eea8dc120650d43da0d1472711797ad/src/main/resources/assets/farmersdelight/lang)
- [官方1.21分支语言目录](https://github.com/vectorwing/FarmersDelight/tree/dd8b9b0bfec916a2da88a6d64e3a37f4a02c3259/src/main/resources/assets/farmersdelight/lang)

两分支的479条中文与包内相同，未直接覆盖。新版c标签名称可参考，但不能代替当前Forge标签键。未完成所有未合并中文PR的穷尽检索。

## 机制证据与修正

当前JAR的ComfortEffect包含恢复生命逻辑；原中文免疫饥饿／缓慢／虚弱无法说明该效果，改为对应当前英文的恢复生命描述。HorseFeedEvent按HORSE_FEED_USERS实体标签处理；该标签包含马、骷髅马、僵尸马、驴、骡、羊驼，所以提示中的“马”扩大为“坐骑”。草秆和火腿进度补回英文明确列出的材料／生物范围。带托盘热源与导热体为不同标签，不能混称。

| 键 | 原中文 | 已应用 |
| --- | --- | --- |
| `effect.farmersdelight.comfort.description` | 使你对饥饿、缓慢和虚弱效果免疫。 | 无论饥饿程度如何，都能自然恢复生命值。 |
| `death.attack.farmersdelight.stove` | %1$s被烤的酥脆 | %1$s被烤得酥脆 |
| `tag.block.farmersdelight.tray_heat_sources` | 带托盘的导热体 | 带托盘的热源 |
| `tooltip.farmersdelight.horse_feed.when_feeding` | 喂给已驯服的马时： | 喂给已驯服的坐骑时： |
| `advancements.farmersdelight.harvest_straw.description` | 使用刀割下长草的植物以获取一些草秆 | 使用刀收割草、小麦或水稻，获取草秆 |
| `advancements.farmersdelight.get_ham.description` | 刀可以更精准仔细地切开动物的肉。刀劈有时候能产出更大的肉块！ | 使用刀从猪或疣猪身上获取火腿 |

## 10条代表译文

新增内容全部属于标签名称，选取不同类别，避免仅列肉类或作物变体；另纳入机制修正展示实际差异。

| 英文／用途 | 已应用中文 |
| --- | --- |
| Berries | 浆果 |
| Wheat Dough | 小麦面团 |
| Milk Bottles | 奶瓶 |
| Raw Pasta | 生意面 |
| Salad Ingredients | 沙拉原料 |
| Knives | 刀 |
| Grains | 谷物 |
| Heat Sources with a Tray | 带托盘的热源 |
| When fed to a tamed mount | 喂给已驯服的坐骑时： |
| Comfort效果说明 | 无论饥饿程度如何，都能自然恢复生命值。 |

## 全部新增键

| 键 | 英文 | 中文 |
| --- | --- | --- |
| `tag.item.forge.berries` | Berries | 浆果 |
| `tag.item.forge.bread` | Bread | 面包 |
| `tag.item.forge.bread.wheat` | Wheat Bread | 小麦面包 |
| `tag.item.forge.cooked_bacon` | Cooked Bacon | 熟培根 |
| `tag.item.forge.cooked_beef` | Cooked Beef | 熟牛肉 |
| `tag.item.forge.cooked_chicken` | Cooked Chicken | 熟鸡肉 |
| `tag.item.forge.cooked_eggs` | Cooked Eggs | 熟蛋 |
| `tag.item.forge.cooked_fishes` | Cooked Fishes | 熟鱼 |
| `tag.item.forge.cooked_fishes.cod` | Cooked Cod | 熟鳕鱼 |
| `tag.item.forge.cooked_fishes.salmon` | Cooked Salmon | 熟鲑鱼 |
| `tag.item.forge.cooked_mutton` | Cooked Mutton | 熟羊肉 |
| `tag.item.forge.cooked_pork` | Cooked Pork | 熟猪肉 |
| `tag.item.forge.crops.cabbage` | Cabbage Crops | 卷心菜作物 |
| `tag.item.forge.crops.onion` | Onion Crops | 洋葱作物 |
| `tag.item.forge.crops.rice` | Rice Crops | 稻米作物 |
| `tag.item.forge.crops.tomato` | Tomato Crops | 番茄作物 |
| `tag.item.forge.dough` | Dough | 面团 |
| `tag.item.forge.dough.wheat` | Wheat Dough | 小麦面团 |
| `tag.item.forge.eggs` | Eggs | 蛋 |
| `tag.item.forge.grain` | Grains | 谷物 |
| `tag.item.forge.grain.rice` | Rice Grains | 稻米 |
| `tag.item.forge.grain.wheat` | Wheat Grains | 小麦 |
| `tag.item.forge.milk` | Milk | 牛奶 |
| `tag.item.forge.milk.milk` | Milk Buckets | 牛奶桶 |
| `tag.item.forge.milk.milk_bottle` | Milk Bottles | 奶瓶 |
| `tag.item.forge.pasta` | Pasta | 意面 |
| `tag.item.forge.pasta.raw_pasta` | Raw Pasta | 生意面 |
| `tag.item.forge.raw_meat` | Raw Meat | 生肉 |
| `tag.item.forge.raw_bacon` | Raw Bacon | 生培根 |
| `tag.item.forge.raw_beef` | Raw Beef | 生牛肉 |
| `tag.item.forge.raw_chicken` | Raw Chicken | 生鸡肉 |
| `tag.item.forge.raw_eggs` | Raw Eggs | 生蛋 |
| `tag.item.forge.raw_fishes` | Raw Fishes | 生鱼 |
| `tag.item.forge.raw_fishes.cod` | Raw Cod | 生鳕鱼 |
| `tag.item.forge.raw_fishes.salmon` | Raw Salmon | 生鲑鱼 |
| `tag.item.forge.raw_fishes.tropical_fish` | Tropical Fish | 热带鱼 |
| `tag.item.forge.raw_mutton` | Raw Mutton | 生羊肉 |
| `tag.item.forge.raw_pork` | Raw Pork | 生猪肉 |
| `tag.item.forge.salad_ingredients` | Salad Ingredients | 沙拉原料 |
| `tag.item.forge.salad_ingredients.cabbage` | Cabbage Salad Ingredients | 卷心菜沙拉原料 |
| `tag.item.forge.seeds.cabbage` | Cabbage Seeds | 卷心菜种子 |
| `tag.item.forge.seeds.rice` | Rice Seeds | 稻米种子 |
| `tag.item.forge.seeds.tomato` | Tomato Seeds | 番茄种子 |
| `tag.item.forge.tools.knives` | Knives | 刀 |
| `tag.item.forge.vegetables` | Vegetables | 蔬菜 |
| `tag.item.forge.vegetables.beetroot` | Beetroots | 甜菜根 |
| `tag.item.forge.vegetables.carrot` | Carrots | 胡萝卜 |
| `tag.item.forge.vegetables.onion` | Onions | 洋葱 |
| `tag.item.forge.vegetables.potato` | Potatoes | 马铃薯 |
| `tag.item.forge.vegetables.tomato` | Tomatoes | 番茄 |

## 保留项与验证限制

- 既有菜名、进度双关标题及番茄命中字幕属于风格／语境问题，未批量重命名；例如“倾斜稻根”需结合Dipping Your Roots的双关另行审校。
- 保留包内已有的面团JEI说明及AshBill关于移除配方、使用驴拉磨的注释，不覆盖整合包定制内容。
- “牛肉炖”等食物命名可能不够自然，本轮保持既有命名，避免仅因个人措辞偏好改动。
- 额外中文配置键是否在当前Forge界面出现尚未逐项验证；未认定100个中文独有键都是有效界面覆盖。
- JSON、键集合、占位符检查通过；50个英文缺译键全部覆盖。没有修改JAR、配方或游戏机制。未完成全类硬编码扫描及游戏内验证，未提交、未部署。

本机审查资料：独立工作区`lang-audit/st019-*`，含语言快照及ComfortEffect、HorseFeedItem反汇编；未来以当前JAR和上述固定源码版本重新核验，不依赖临时文件长期存在。
