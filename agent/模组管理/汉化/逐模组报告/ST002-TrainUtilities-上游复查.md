# ST002-TrainUtilities 上游复查

> **待办维护位置更新（2026-10-24）：** 本文的待办／下一步／候选清单保留为历史与技术依据，不再独立维护状态；有效任务统一见[总 todo](../../../todo-list.md)，炼药锅 mini todo 为例外。功能台账、测试步骤及来源证据仍在本文维护；旧“待实现／待决定”不覆盖总表及mini的最新结论。

日期：2026-10-17。状态：已取得分支语言文件及差异候选；逐项采用评估进行中，本报告不代表已替换本地译文。

| 分支 | 文件 | 键数 |
| --- | --- | --- |
| 1.20.1_C6 | [en_us.json · 4417e02f5854](https://raw.githubusercontent.com/ProgrammerLP/Create-Trainutilities/4417e02f58549a9ed06f47f73cdb2da08f86bba7/common/src/main/resources/assets/trainutilities/lang/en_us.json) | 276 |
| 1.20.1_C6 | [zh_cn.json · 4417e02f5854](https://raw.githubusercontent.com/ProgrammerLP/Create-Trainutilities/4417e02f58549a9ed06f47f73cdb2da08f86bba7/common/src/main/resources/assets/trainutilities/lang/zh_cn.json) | 271 |
| 1.20.1.dev | [en_us.json · 5241c6668992](https://raw.githubusercontent.com/ProgrammerLP/Create-Trainutilities/5241c66689924b9aba60bc87bcc5c8c6fe92ec9f/common/src/main/resources/assets/trainutilities/lang/en_us.json) | 271 |
| 1.21.1 | [en_us.json · 5d1d34a2d1b7](https://raw.githubusercontent.com/ProgrammerLP/Create-Trainutilities/5d1d34a2d1b7d5a1acfc744034d88e24ddcf0940/common/src/main/resources/assets/trainutilities/lang/en_us.json) | 276 |
| 1.21.1 | [zh_cn.json · 5d1d34a2d1b7](https://raw.githubusercontent.com/ProgrammerLP/Create-Trainutilities/5d1d34a2d1b7d5a1acfc744034d88e24ddcf0940/common/src/main/resources/assets/trainutilities/lang/zh_cn.json) | 271 |

## 翻译 PR

- [Add Chinese translation.](https://github.com/ProgrammerLP/Create-Trainutilities/pull/30)：合并状态待核实。

JAR元数据链接重定向到 ProgrammerLP/TrainUtilitiesMod_OLD_，旧仓库两个已查分支只有英文。现维护仓库为 ProgrammerLP/Create-Trainutilities，Create 6与1.21.1分支已有271键中文；原1.20.1.dev未找到中文文件。现实车型保留原名的偏好已确认，比较上游时遵循，不擅自音译。

本机完整证据：`C:/mydata/Agents/Codex-CreateTrainResync/lang-audit/` 中对应 `*-upstream-recheck.json` 和分支语言文件。尚未游戏验证；下一步逐项比较英文语义、格式、已确认偏好再决定采用。

## 2026-10-18 差异逐项采用复查

已通读本机导出的上游差异。大多数是空格、括号位置、条纹／色带、音效／声音以及半成品句式，保留本包简洁风格；CIS Amendorf保持用户要求的现实名称，不替换成阿门多夫。上游四个代码调用但英文未列出的声音键与本包补齐结果一致。没有据此新增或修改本包翻译；PR30合并状态仍未重查，不追认。

本次沿用上文已取得并固定到提交的上游文件；没有声称重新查询了最新远端。未游戏验证。
