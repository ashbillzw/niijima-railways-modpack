# ST001-Create-Railways-Navigator 上游复查

> **待办维护位置更新（2026-10-24）：** 本文的待办／下一步／候选清单保留为历史与技术依据，不再独立维护状态；有效任务统一见[总 todo](../../../todo-list.md)，炼药锅 mini todo 为例外。功能台账、测试步骤及来源证据仍在本文维护；旧“待实现／待决定”不覆盖总表及mini的最新结论。

日期：2026-10-17。状态：已取得分支语言文件及差异候选；逐项采用评估进行中，本报告不代表已替换本地译文。

| 分支 | 文件 | 键数 |
| --- | --- | --- |
| mc/1.20.1-C5-DL3 | [en_us.json · 829ba01c3277](https://raw.githubusercontent.com/MisterJulsen/Create-Train-Navigator/829ba01c32776a4ee84773c86e39959247aac520/common/src/main/resources/assets/createrailwaysnavigator/lang/en_us.json) | 465 |
| mc/1.20.1-C5-DL3 | [zh_cn.json · 829ba01c3277](https://raw.githubusercontent.com/MisterJulsen/Create-Train-Navigator/829ba01c32776a4ee84773c86e39959247aac520/common/src/main/resources/assets/createrailwaysnavigator/lang/zh_cn.json) | 324 |
| mc/1.20.1-C5 | [en_us.json · 8d5fd7d7a9a4](https://raw.githubusercontent.com/MisterJulsen/Create-Train-Navigator/8d5fd7d7a9a4db911ccc45370b9e3d26b31ba239/common/src/main/resources/assets/createrailwaysnavigator/lang/en_us.json) | 465 |
| mc/1.20.1-C5 | [zh_cn.json · 8d5fd7d7a9a4](https://raw.githubusercontent.com/MisterJulsen/Create-Train-Navigator/8d5fd7d7a9a4db911ccc45370b9e3d26b31ba239/common/src/main/resources/assets/createrailwaysnavigator/lang/zh_cn.json) | 324 |
| mc/1.20.1-C6-DL3 | [en_us.json · c5a1df150fb9](https://raw.githubusercontent.com/MisterJulsen/Create-Train-Navigator/c5a1df150fb9bafc9289f6da3ea4d85737da35be/common/src/main/resources/assets/createrailwaysnavigator/lang/en_us.json) | 469 |
| mc/1.20.1-C6-DL3 | [zh_cn.json · c5a1df150fb9](https://raw.githubusercontent.com/MisterJulsen/Create-Train-Navigator/c5a1df150fb9bafc9289f6da3ea4d85737da35be/common/src/main/resources/assets/createrailwaysnavigator/lang/zh_cn.json) | 469 |
| mc/1.20.1-C6 | [en_us.json · 12d6e43eddc2](https://raw.githubusercontent.com/MisterJulsen/Create-Train-Navigator/12d6e43eddc20c8fc6ef3765586c578a41a77eed/common/src/main/resources/assets/createrailwaysnavigator/lang/en_us.json) | 465 |
| mc/1.20.1-C6 | [zh_cn.json · 12d6e43eddc2](https://raw.githubusercontent.com/MisterJulsen/Create-Train-Navigator/12d6e43eddc20c8fc6ef3765586c578a41a77eed/common/src/main/resources/assets/createrailwaysnavigator/lang/zh_cn.json) | 464 |
| mc/1.21.1-DL3 | [en_us.json · d9aa171aab58](https://raw.githubusercontent.com/MisterJulsen/Create-Train-Navigator/d9aa171aab5898f291c9c078a0bbc1c4e6beb1ce/common/src/main/resources/assets/createrailwaysnavigator/lang/en_us.json) | 528 |
| mc/1.21.1-DL3 | [zh_cn.json · d9aa171aab58](https://raw.githubusercontent.com/MisterJulsen/Create-Train-Navigator/d9aa171aab5898f291c9c078a0bbc1c4e6beb1ce/common/src/main/resources/assets/createrailwaysnavigator/lang/zh_cn.json) | 469 |
| mc/1.21.1 | [en_us.json · 6003b3919769](https://raw.githubusercontent.com/MisterJulsen/Create-Train-Navigator/6003b39197691ddc19964162560712362cd3edf9/common/src/main/resources/assets/createrailwaysnavigator/lang/en_us.json) | 465 |
| mc/1.21.1 | [zh_cn.json · 6003b3919769](https://raw.githubusercontent.com/MisterJulsen/Create-Train-Navigator/6003b39197691ddc19964162560712362cd3edf9/common/src/main/resources/assets/createrailwaysnavigator/lang/zh_cn.json) | 464 |

## 翻译 PR

- [update zh_cn.json for 1.20.1](https://github.com/MisterJulsen/Create-Train-Navigator/pull/125)：已合并：2025-11-15T11:52:49Z。
- [More correct Simplified Chinese translation](https://github.com/MisterJulsen/Create-Train-Navigator/pull/19)：已合并：2024-06-03T08:04:53Z。

Create 5分支与本地已合并中文仅4处差异，正是此前用户确认的4项修正，不回退。新默认分支有205处不同文本；其中含重排占位符和措辞差异，不按同键直接覆盖。用户偏好“线路”优先，允许按功能区分；具体术语应用仍在复查。

本机完整证据：`C:/mydata/Agents/Codex-CreateTrainResync/lang-audit/` 中对应 `*-upstream-recheck.json` 和分支语言文件。尚未游戏验证；下一步逐项比较英文语义、格式、已确认偏好再决定采用。

## 2026-10-18 差异逐项采用复查

已读完导出的205条新版差异，核对当前英文后应用5条：Navigable两处改为“可导航”；%s Transfers补“次”；Delay approx. %s恢复“约”；Delay in operations改为“运行延误”。累计本模组原文纠错9（此前4＋本次5），不改已确认线路偏好。新版transfer_with_platform重排了无索引%s、priority_pos把列表位置写成坐标、比例下限说明及四项历史修正均不直接覆盖。只补空格、改句式及进度梗不采用；新版本行为差异保留当前版本译文。

本次沿用上文已取得并固定到提交的上游文件；没有声称重新查询了最新远端。未游戏验证。
