# ST004 汽鸣铁道（Create: Steam ’n’ Rails）

> **待办维护位置更新（2026-10-24）：** 本文的待办／下一步／候选清单保留为历史与技术依据，不再独立维护状态；有效任务统一见[总 todo](../../../todo-list.md)，炼药锅 mini todo 为例外。功能台账、测试步骤及来源证据仍在本文维护；旧“待实现／待决定”不覆盖总表及mini的最新结论。

日期：2026-10-17。包内版本 `Steam_Rails-1.6.7+forge-mc1.20.1.jar`，SHA-1 `7449e9cbaae6a23a31127a3cf0886899c28639dc`。

语言文件英文1293键，原中文1215键；新增78键，修正38个旧键。覆盖后1293/1293有中文条目（含型号等保留原文），不等于所有代码硬编码已排除或游戏验收通过。

## 检查范围与来源

检查缺键、全部条目的占位符、轨道成品／半成品对应与颜色／材料系列；人工重点审查界面、操作提示、思索说明和上游差异。兼容模组木材名称沿用该版本既有系列，不擅自更名；未逐个运行兼容模组。未进行全类硬编码扫描、游戏渲染与换行验证。

官方仓库：[Layers-of-Railways/Railway](https://github.com/Layers-of-Railways/Railway)。
- `1.20/dev`：[`7441960c2128`](https://github.com/Layers-of-Railways/Railway/blob/7441960c212826e8831da9eccae84a5154de4be4/common/src/main/resources/assets/railways/lang/zh_cn.json)。
- `1.20/next`：[`4ddd416e60a5`](https://github.com/Layers-of-Railways/Railway/blob/4ddd416e60a5c42ef0ef6a3af6af0547cc7009fa/common/src/main/resources/assets/railways/lang/zh_cn.json)。
- `1.20/create-v6`：[`e5947616ee54`](https://github.com/Layers-of-Railways/Railway/blob/e5947616ee54cabea325ea61ce2e9be107f61225/common/src/main/resources/assets/railways/lang/zh_cn.json)。

本次取得开发分支中文2541键、next分支1215键、Create 6分支2541键；主开发中文覆盖本包全部78个缺键，与旧中文36个同键文本不同。新版整份未搬入旧包。英文校对使用本包实际JAR；尝试开发分支 `common/src/main/resources/.../en_us.json` 返回404，不能据此说上游没有英文。

查询到的中文PR：[#25](https://github.com/Layers-of-Railways/Railway/pull/25)于2022-12-15合并；[#42](https://github.com/Layers-of-Railways/Railway/pull/42)于2023-02-03合并。已查各自 `merged_at`，非仅凭closed判断。搜索不是所有Crowdin历史的穷举。

## 用户偏好与采用边界

用户确认 Steam ’n’ Rails 可译“汽鸣铁道”，现实车型保留原名。本包分类原已有“机械动力：汽鸣铁道”，因此保留，无须为此新增覆盖。型号Y25等保持原样。“线路”优先但允许按语义区分；本轮无须批量替换该术语。

新增半成品参考上游并对齐包内成品；TFC红衫木的“衫”改“杉”，同时用于新增半成品。上游幻翼→幻缈、车挡→缓冲器及列车站→列车站点未照搬；涉及既有术语或风格，不凭新版自动覆盖。黄铜颈钢烟筒的上游更名可能混淆颈部材质，暂保留现有系列。

## 明确纠错

修正锅炉／铁块写反、烟箱多余“铁块”、冷衫／红衫错字、无砟／无枕混淆、TFC橡木半成品与白橡木成品不一致、燃油烟筒的物品／方块名称不一致；补锅炉说明的烟箱门及强调格式；修正按住操作、转辙器模式写反、标准轨距漏字、詹式车钩错字、指挥哨漏译列车站。

## 十条有代表性的实际译文

| 原文／用途 | 本次译文 |
| --- | --- |
| Incomplete Ghaf Track | 牧豆木列车轨道（半成品） |
| Black Copper Wrapped Locometal Boiler | 黑色镶铜机车锅炉 |
| _Wrench_ the face of boiler to change it to a _smokebox door_, Sneak while placing to _raise_ the boiler up _half_ a block. | 用_扳手_右击锅炉正面可将其改为_烟箱门_；潜行放置时，锅炉会_上移_约_半格_。 |
| Press and hold the _Open Cycle Menu_ key (default _ALT_) to select variants of this block. Can be dyed by _clicking_ with dye. Wood backboard can be changed by _clicking_ with planks. | 按住_打开轮盘菜单_键（默认_Alt_）来选择该方块的各种样式。用染料_右击_可以染色。用木板_右击_可以更换木质背板。 |
| Radiator Fan | 散热器风扇 |
| Manual & Scheduled Trains | 引导手控及按时刻表运行的列车 |
| Standard Gauge | 标准轨距 |
| Split Knuckle Coupler | 分离詹式车钩 |
| Use on a track or station to summon the bound train! | 对轨道或列车站使用，召唤绑定的列车！ |
| Oilburner Smokestack | 燃油烟筒 |

## 全部改动明细

| 键 | 类型 | 原中文 | 本次采用 |
| --- | --- | --- | --- |
| `block.railways.black_copper_wrapped_locometal` | 纠错 | 黑色镶铜列车铁块 | 黑色镶铜机车铁块 |
| `block.railways.black_copper_wrapped_locometal_boiler` | 纠错 | 黑色镶铜机车铁块 | 黑色镶铜机车锅炉 |
| `block.railways.blue_iron_wrapped_locometal` | 纠错 | 蓝色镶铁机车锅炉 | 蓝色镶铁机车铁块 |
| `block.railways.boiler.tooltip` | 纠错 | BOILER | 锅炉 |
| `block.railways.boiler.tooltip.summary` | 纠错 | 用扳手右击来更换样式，在潜行状态下放置会使锅炉上移半格。 | 用_扳手_右击锅炉正面可将其改为_烟箱门_；潜行放置时，锅炉会_上移_约_半格_。 |
| `block.railways.cyan_locometal_smokebox` | 纠错 | 青色机车铁块烟箱 | 青色机车烟箱 |
| `block.railways.generic_radial.tooltip.summary` | 纠错 | 按下_打开轮盘菜单_键（默认_Alt_）来选择该方块的各种样式。 | 按住_打开轮盘菜单_键（默认_Alt_）来选择该方块的各种样式。 |
| `block.railways.gray_locometal_smokebox` | 纠错 | 灰色机车铁块烟箱 | 灰色机车烟箱 |
| `block.railways.green_locometal_smokebox` | 纠错 | 绿色机车铁块烟箱 | 绿色机车烟箱 |
| `block.railways.headstock.tooltip.summary` | 纠错 | 按下_打开轮盘菜单_键（默认_Alt_）来选择该方块的各种样式。用染料_右击_可以染色。 | 按住_打开轮盘菜单_键（默认_Alt_）来选择该方块的各种样式。用染料_右击_可以染色。 |
| `block.railways.headstock_wood.tooltip.summary` | 纠错 | 按住_打开轮盘菜单_键 (默认 _ALT_) 来选择此块的变体。 可以用染料来染料。木制背板可以用木板来更改。用木板来点击。 | 按住_打开轮盘菜单_键（默认_Alt_）来选择该方块的各种样式。用染料_右击_可以染色。用木板_右击_可以更换木质背板。 |
| `block.railways.light_blue_locometal_smokebox` | 纠错 | 淡蓝色机车铁块烟箱 | 淡蓝色机车烟箱 |
| `block.railways.smokestack_diesel` | 纠错 | 柴油烟筒 | 散热器风扇 |
| `block.railways.track_natures_spirit_fir` | 纠错 | 冷衫木列车轨道 | 冷杉木列车轨道 |
| `block.railways.track_natures_spirit_fir_narrow` | 纠错 | 冷衫木列车窄轨 | 冷杉木列车窄轨 |
| `block.railways.track_natures_spirit_fir_wide` | 纠错 | 冷衫木列车宽轨 | 冷杉木列车宽轨 |
| `block.railways.track_tfc_sequoia` | 纠错 | 红衫木列车轨道 | 红杉木列车轨道 |
| `block.railways.track_tfc_sequoia_narrow` | 纠错 | 红衫木列车窄轨 | 红杉木列车窄轨 |
| `block.railways.track_tfc_sequoia_wide` | 纠错 | 红衫木列车宽轨 | 红杉木列车宽轨 |
| `create.railways.switch.auto_mode.auto` | 纠错 | 引导手控列车 | 引导手控及按时刻表运行的列车 |
| `create.railways.switch.auto_mode.manual_only` | 纠错 | 引导全部列车 | 仅引导手控列车 |
| `item.railways.smokestack_oilburner` | 纠错 | 柴油烟筒 | 燃油烟筒 |
| `item.railways.smokestack_oilburner_brass` | 纠错 | 黄铜柴油烟筒 | 黄铜燃油烟筒 |
| `item.railways.smokestack_oilburner_brass_cap_copper` | 纠错 | 黄铜颈铜柴油烟筒 | 黄铜颈铜燃油烟筒 |
| `item.railways.smokestack_oilburner_brass_cap_steel` | 纠错 | 黄铜颈柴油烟筒 | 黄铜颈燃油烟筒 |
| `item.railways.smokestack_oilburner_copper` | 纠错 | 铜柴油烟筒 | 铜燃油烟筒 |
| `item.railways.smokestack_oilburner_copper_cap_brass` | 纠错 | 铜颈黄铜柴油烟筒 | 铜颈黄铜燃油烟筒 |
| `item.railways.smokestack_oilburner_copper_cap_steel` | 纠错 | 铜颈柴油烟筒 | 铜颈燃油烟筒 |
| `item.railways.split_knuckle_coupler` | 纠错 | 分离詹氏车钩 | 分离詹式车钩 |
| `item.railways.track_incomplete_natures_spirit_ghaf` | 补译 | （缺失） | 牧豆木列车轨道（半成品） |
| `item.railways.track_incomplete_natures_spirit_ghaf_narrow` | 补译 | （缺失） | 牧豆木列车窄轨（半成品） |
| `item.railways.track_incomplete_natures_spirit_ghaf_wide` | 补译 | （缺失） | 牧豆木列车宽轨（半成品） |
| `item.railways.track_incomplete_natures_spirit_joshua` | 补译 | （缺失） | 短叶丝兰木列车轨道（半成品） |
| `item.railways.track_incomplete_natures_spirit_joshua_narrow` | 补译 | （缺失） | 短叶丝兰木列车窄轨（半成品） |
| `item.railways.track_incomplete_natures_spirit_joshua_wide` | 补译 | （缺失） | 短叶丝兰木列车宽轨（半成品） |
| `item.railways.track_incomplete_natures_spirit_maple` | 补译 | （缺失） | 枫木列车轨道（半成品） |
| `item.railways.track_incomplete_natures_spirit_maple_narrow` | 补译 | （缺失） | 枫木列车窄轨（半成品） |
| `item.railways.track_incomplete_natures_spirit_maple_wide` | 补译 | （缺失） | 枫木列车宽轨（半成品） |
| `item.railways.track_incomplete_natures_spirit_olive` | 补译 | （缺失） | 橄榄木列车轨道（半成品） |
| `item.railways.track_incomplete_natures_spirit_olive_narrow` | 补译 | （缺失） | 橄榄木列车窄轨（半成品） |
| `item.railways.track_incomplete_natures_spirit_olive_wide` | 补译 | （缺失） | 橄榄木列车宽轨（半成品） |
| `item.railways.track_incomplete_natures_spirit_palo_verde` | 补译 | （缺失） | 假紫荆木列车轨道（半成品） |
| `item.railways.track_incomplete_natures_spirit_palo_verde_narrow` | 补译 | （缺失） | 假紫荆木列车窄轨（半成品） |
| `item.railways.track_incomplete_natures_spirit_palo_verde_wide` | 补译 | （缺失） | 假紫荆木列车宽轨（半成品） |
| `item.railways.track_incomplete_natures_spirit_redwood` | 补译 | （缺失） | 红杉木列车轨道（半成品） |
| `item.railways.track_incomplete_natures_spirit_redwood_narrow` | 补译 | （缺失） | 红杉木列车窄轨（半成品） |
| `item.railways.track_incomplete_natures_spirit_redwood_wide` | 补译 | （缺失） | 红杉木列车宽轨（半成品） |
| `item.railways.track_incomplete_natures_spirit_sugi` | 补译 | （缺失） | 柳杉木列车轨道（半成品） |
| `item.railways.track_incomplete_natures_spirit_sugi_narrow` | 补译 | （缺失） | 柳杉木列车窄轨（半成品） |
| `item.railways.track_incomplete_natures_spirit_sugi_wide` | 补译 | （缺失） | 柳杉木列车宽轨（半成品） |
| `item.railways.track_incomplete_natures_spirit_willow` | 补译 | （缺失） | 柳木列车轨道（半成品） |
| `item.railways.track_incomplete_natures_spirit_willow_narrow` | 补译 | （缺失） | 柳木列车窄轨（半成品） |
| `item.railways.track_incomplete_natures_spirit_willow_wide` | 补译 | （缺失） | 柳木列车宽轨（半成品） |
| `item.railways.track_incomplete_natures_spirit_wisteria` | 补译 | （缺失） | 紫藤木列车轨道（半成品） |
| `item.railways.track_incomplete_natures_spirit_wisteria_narrow` | 补译 | （缺失） | 紫藤木列车窄轨（半成品） |
| `item.railways.track_incomplete_natures_spirit_wisteria_wide` | 补译 | （缺失） | 紫藤木列车宽轨（半成品） |
| `item.railways.track_incomplete_stripped_bamboo` | 补译 | （缺失） | 去皮竹制列车轨道（半成品） |
| `item.railways.track_incomplete_stripped_bamboo_narrow` | 补译 | （缺失） | 去皮竹制列车窄轨（半成品） |
| `item.railways.track_incomplete_stripped_bamboo_wide` | 补译 | （缺失） | 去皮竹制列车宽轨（半成品） |
| `item.railways.track_incomplete_tfc_ash` | 补译 | （缺失） | 黑梣木列车轨道（半成品） |
| `item.railways.track_incomplete_tfc_ash_narrow` | 补译 | （缺失） | 黑梣木列车窄轨（半成品） |
| `item.railways.track_incomplete_tfc_ash_wide` | 补译 | （缺失） | 黑梣木列车宽轨（半成品） |
| `item.railways.track_incomplete_tfc_aspen` | 补译 | （缺失） | 山杨木列车轨道（半成品） |
| `item.railways.track_incomplete_tfc_aspen_narrow` | 补译 | （缺失） | 山杨木列车窄轨（半成品） |
| `item.railways.track_incomplete_tfc_aspen_wide` | 补译 | （缺失） | 山杨木列车宽轨（半成品） |
| `item.railways.track_incomplete_tfc_blackwood` | 补译 | （缺失） | 黑檀木列车轨道（半成品） |
| `item.railways.track_incomplete_tfc_blackwood_narrow` | 补译 | （缺失） | 黑檀木列车窄轨（半成品） |
| `item.railways.track_incomplete_tfc_blackwood_wide` | 补译 | （缺失） | 黑檀木列车宽轨（半成品） |
| `item.railways.track_incomplete_tfc_chestnut` | 补译 | （缺失） | 栗木列车轨道（半成品） |
| `item.railways.track_incomplete_tfc_chestnut_narrow` | 补译 | （缺失） | 栗木列车窄轨（半成品） |
| `item.railways.track_incomplete_tfc_chestnut_wide` | 补译 | （缺失） | 栗木列车宽轨（半成品） |
| `item.railways.track_incomplete_tfc_douglas_fir` | 补译 | （缺失） | 花旗松木列车轨道（半成品） |
| `item.railways.track_incomplete_tfc_douglas_fir_narrow` | 补译 | （缺失） | 花旗松木列车窄轨（半成品） |
| `item.railways.track_incomplete_tfc_douglas_fir_wide` | 补译 | （缺失） | 花旗松木列车宽轨（半成品） |
| `item.railways.track_incomplete_tfc_hickory` | 补译 | （缺失） | 山核桃木列车轨道（半成品） |
| `item.railways.track_incomplete_tfc_hickory_narrow` | 补译 | （缺失） | 山核桃木列车窄轨（半成品） |
| `item.railways.track_incomplete_tfc_hickory_wide` | 补译 | （缺失） | 山核桃木列车宽轨（半成品） |
| `item.railways.track_incomplete_tfc_kapok` | 补译 | （缺失） | 木棉木列车轨道（半成品） |
| `item.railways.track_incomplete_tfc_kapok_narrow` | 补译 | （缺失） | 木棉木列车窄轨（半成品） |
| `item.railways.track_incomplete_tfc_kapok_wide` | 补译 | （缺失） | 木棉木列车宽轨（半成品） |
| `item.railways.track_incomplete_tfc_maple` | 补译 | （缺失） | 枫木列车轨道（半成品） |
| `item.railways.track_incomplete_tfc_maple_narrow` | 补译 | （缺失） | 枫木列车窄轨（半成品） |
| `item.railways.track_incomplete_tfc_maple_wide` | 补译 | （缺失） | 枫木列车宽轨（半成品） |
| `item.railways.track_incomplete_tfc_oak` | 纠错 | 橡木列车轨道（半成品） | 白橡木列车轨道（半成品） |
| `item.railways.track_incomplete_tfc_oak_narrow` | 纠错 | 橡木列车窄轨（半成品） | 白橡木列车窄轨（半成品） |
| `item.railways.track_incomplete_tfc_oak_wide` | 纠错 | 橡木列车宽轨（半成品） | 白橡木列车宽轨（半成品） |
| `item.railways.track_incomplete_tfc_palm` | 补译 | （缺失） | 棕榈木列车轨道（半成品） |
| `item.railways.track_incomplete_tfc_palm_narrow` | 补译 | （缺失） | 棕榈木列车窄轨（半成品） |
| `item.railways.track_incomplete_tfc_palm_wide` | 补译 | （缺失） | 棕榈木列车宽轨（半成品） |
| `item.railways.track_incomplete_tfc_pine` | 补译 | （缺失） | 松木列车轨道（半成品） |
| `item.railways.track_incomplete_tfc_pine_narrow` | 补译 | （缺失） | 松木列车窄轨（半成品） |
| `item.railways.track_incomplete_tfc_pine_wide` | 补译 | （缺失） | 松木列车宽轨（半成品） |
| `item.railways.track_incomplete_tfc_rosewood` | 补译 | （缺失） | 蔷薇木列车轨道（半成品） |
| `item.railways.track_incomplete_tfc_rosewood_narrow` | 补译 | （缺失） | 蔷薇木列车窄轨（半成品） |
| `item.railways.track_incomplete_tfc_rosewood_wide` | 补译 | （缺失） | 蔷薇木列车宽轨（半成品） |
| `item.railways.track_incomplete_tfc_sequoia` | 补译 | （缺失） | 红杉木列车轨道（半成品） |
| `item.railways.track_incomplete_tfc_sequoia_narrow` | 补译 | （缺失） | 红杉木列车窄轨（半成品） |
| `item.railways.track_incomplete_tfc_sequoia_wide` | 补译 | （缺失） | 红杉木列车宽轨（半成品） |
| `item.railways.track_incomplete_tfc_spruce` | 补译 | （缺失） | 云杉木列车轨道（半成品） |
| `item.railways.track_incomplete_tfc_spruce_narrow` | 补译 | （缺失） | 云杉木列车窄轨（半成品） |
| `item.railways.track_incomplete_tfc_spruce_wide` | 补译 | （缺失） | 云杉木列车宽轨（半成品） |
| `item.railways.track_incomplete_tfc_sycamore` | 补译 | （缺失） | 悬铃木列车轨道（半成品） |
| `item.railways.track_incomplete_tfc_sycamore_narrow` | 补译 | （缺失） | 悬铃木列车窄轨（半成品） |
| `item.railways.track_incomplete_tfc_sycamore_wide` | 补译 | （缺失） | 悬铃木列车宽轨（半成品） |
| `item.railways.track_incomplete_tfc_white_cedar` | 补译 | （缺失） | 香柏木列车轨道（半成品） |
| `item.railways.track_incomplete_tfc_white_cedar_narrow` | 补译 | （缺失） | 香柏木列车窄轨（半成品） |
| `item.railways.track_incomplete_tfc_white_cedar_wide` | 补译 | （缺失） | 香柏木列车宽轨（半成品） |
| `item.railways.track_incomplete_tfc_willow` | 补译 | （缺失） | 柳木列车轨道（半成品） |
| `item.railways.track_incomplete_tfc_willow_narrow` | 补译 | （缺失） | 柳木列车窄轨（半成品） |
| `item.railways.track_incomplete_tfc_willow_wide` | 补译 | （缺失） | 柳木列车宽轨（半成品） |
| `item.railways.track_incomplete_tieless` | 纠错 | 无砟列车轨道（半成品） | 无枕列车轨道（半成品） |
| `item.railways.track_incomplete_tieless_narrow` | 纠错 | 无砟列车窄轨（半成品） | 无枕列车窄轨（半成品） |
| `item.railways.track_incomplete_tieless_wide` | 纠错 | 无砟列车宽轨（半成品） | 无枕列车宽轨（半成品） |
| `item.railways.wooden_headstock_split_knuckle_coupler` | 纠错 | 木质分离詹氏车钩前板 | 木质分离詹式车钩前板 |
| `railways.gui.bogey_menu.standard_gauge` | 纠错 | 标准距 | 标准轨距 |
| `railways.whistle.tool.bound_usage` | 纠错 | 对着轨道使用，绑定的列车将驶向该轨道 | 对轨道或列车站使用，召唤绑定的列车！ |

## 验证与后续

覆盖JSON可解析、键属于当前版本英文表、Java格式占位符及§样式码一致、下划线强调成对。仅最小覆盖文件，原JAR未改；游戏未验证。转向架／车厢间距、远方信号模式与指挥机器人“驾驶／乘坐”等语义疑点保留，待结合代码或实测核实，不在本轮猜改。

本地证据及生成脚本：`C:/mydata/Agents/Codex-CreateTrainResync/lang-audit/st004-*`。剩余缺口为代码／运行上下文复核，不应把本报告理解为零质量问题。
