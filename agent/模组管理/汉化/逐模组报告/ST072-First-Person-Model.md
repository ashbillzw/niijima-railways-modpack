# ST072 First-Person-Model 筛查报告

日期：2026-10-18。

## 范围与来源

官方tr7zw/FirstPersonModel main a56226b087e09a029a0b53da45394f3973c8bfb8，src/main/resources/assets/firstperson/lang/zh_cn.json为26键。43英文／26中文全量对照。新增7，修正2；另9个共享Trender键复用ST071，不重复计数；Trender品牌保留。修正箭头／修改过的功能为箭矢／模组效果，并将原版手部模式“手上的物品”明确为“手持物品时”。禁用物品列表是持有时禁用模组，不是禁用物品本身。

## 应用明细

| 键 | 原值／英文 | 中文 |
|---|---|---|
| `key.category.firstperson.keybind` | FirstPerson Mod | 第一人称模型 |
| `text.firstperson.tab.settings` | Settings | 设置 |
| `text.firstperson.tab.autovanillahands` | Auto Vanilla Hands | 自动使用原版手部 |
| `text.firstperson.tab.autovanillahands.tooltip` | Automatically switches to vanilla hands when holding items | 手持物品时自动切换为原版手部显示。 |
| `text.firstperson.tab.disableitems` | Disable Items | 禁用模组的物品 |
| `text.firstperson.tab.disableitems.tooltip` | Disables FirstPerson mod while holding the specified items | 手持指定物品时禁用第一人称模型模组。 |
| `text.firstperson.tab.layers` | Show Layers | 显示图层 |
| `text.firstperson.option.firstperson.renderStuckFeatures.tooltip` | 以第一人称显示箭头、蜂刺或其他修改过的功能 | 在第一人称视角中显示插在身上的箭矢、蜂刺及模组添加的其他效果。 |
| `text.firstperson.option.firstperson.vanillaHandMode.ITEMS` | 手上的物品 | 手持物品时 |

## 验证

JSON、当前版本键与占位符检查通过。上游取最新主分支中文，未穷尽其他分支和历史PR。仅语言修改；未穷尽硬编码，未游戏验证、打包、提交或部署。
