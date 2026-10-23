# ST011-Jade

> **待办维护位置更新（2026-10-24）：** 本文的待办／下一步／候选清单保留为历史与技术依据，不再独立维护状态；有效任务统一见[总 todo](../../../todo-list.md)，炼药锅 mini todo 为例外。功能台账、测试步骤及来源证据仍在本文维护；旧“待实现／待决定”不覆盖总表及mini的最新结论。

日期：2026-10-17。包内文件：`Jade-1.20.1-Forge-11.13.3.jar`。

英文282键、原中文282键；本轮新增0键、修改已有条目11键。已通读语言条目并检查占位符；未完成全类硬编码审计或游戏验证。

## 上游比对

[已核对的官方同版本分支中文](https://github.com/Snownee/Jade/blob/d7a9e1d3b782f2ea4c387c66e973cc46b9768270/src/main/resources/assets/jade/lang/zh_cn.json)。当前英文对应键范围内与包内中文无差异，本次未假称新版已修复这些问题。公共API此前限流，本次使用git ls-remote及固定提交raw文件；其他新版分支和翻译PR仍待补查。

## 采用、排除与纠错

已有条目中3条英文界面文本补成中文；其余8处修正屏蔽列表、图标位置、主手镜像、TNT点燃、羊驼力量占位符及物品／能量／流体说明。按键称谓对齐实际“显示细节”。

`gui.jade.configuration.desc1`已被上游中文改作反盗卖声明，desc2留空是配套排版，本轮保留，不以英文逐字覆盖中文作者说明。`*_extra_msg`为搜索辅助词候选，英文别名、作者署名和品牌名未机械汉化；其实际搜索与显示路径仍需专项核实。音符盒乐器沿用包内术语，不为追求专业词汇改名。

## 十条代表性实际改动

| 英文 | 已应用 |
| --- | --- |
| Hide Tooltip | 隐藏提示框 |
| Show in Creative Mode | 在创造模式中显示 |
| Show harvest information in creative or spectator mode as well | 在创造模式或旁观模式下也显示采掘信息 |
| Edit Blocklist in Files... | 在文件中编辑屏蔽列表… |
| Icon Position | 图标位置 |
| Flip Position with Main Hand | 随主手设置镜像提示框位置 |
| Warn player of special TNT that ignites when hit. | 提示玩家此类特殊TNT被击打时会点燃。 |
| Strength: %s | 力量：%s |
| Only show energy info when [Show Details] key is pressed. | 仅在按下[显示细节]键时显示能量信息。 |
| Only show fluid info when [Show Details] key is pressed. | 仅在按下[显示细节]键时显示流体信息。 |

## 完整改动明细

| 键 | 原中文 | 已应用 |
| --- | --- | --- |
| `config.jade.boss_bar_overlap_hide_tooltip` | Hide Tooltip | 隐藏提示框 |
| `config.jade.plugin_minecraft.harvest_tool.creative` | Show in Creative Mode | 在创造模式中显示 |
| `config.jade.plugin_minecraft.harvest_tool.creative_desc` | Show harvest information in creative or spectator mode as well | 在创造模式或旁观模式下也显示采掘信息 |
| `config.jade.edit_blocklist` | 在文件中编辑方块列表… | 在文件中编辑屏蔽列表… |
| `config.jade.display_item` | 显示图标 | 图标位置 |
| `config.jade.flip_main_hand` | 翻转主手 | 随主手设置镜像提示框位置 |
| `config.jade.plugin_minecraft.tnt_stability_desc` | 警告玩家特殊的TNT会在被破坏时爆炸。 | 提示玩家此类特殊TNT被击打时会点燃。 |
| `jade.llamaStrength` | 力量：%d | 力量：%s |
| `config.jade.plugin_minecraft.energy_storage.detailed_desc` | 仅在按下[显示详情]键时显示。 | 仅在按下[显示细节]键时显示能量信息。 |
| `config.jade.plugin_minecraft.fluid_storage.detailed_desc` | 仅在按下[显示详情]键时显示。 | 仅在按下[显示细节]键时显示流体信息。 |
| `config.jade.plugin_minecraft.item_storage.show_name_amount_desc` | 显示项目名称而不仅仅是项目图标的最大项目数量。 | 显示物品名称（而不只显示图标）时允许的最大物品数量。 |

验证：JSON解析、键存在性、格式占位符检查通过。仅本地语言覆盖，未构建、未运行游戏、未部署。
