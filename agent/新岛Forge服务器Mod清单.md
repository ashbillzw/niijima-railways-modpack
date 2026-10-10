# 新岛 Forge 模组清单与审查记录

## 状态更新（2026-10-09）

> **下方正文及配套 JSON 原字段保留为 2026-10-04 审查快照，其中“当前索引”、OEI/OELib 状态、Curios/Caelus/Elytra Slot 未入包等描述已过时。** 历史版本及原始单元格记录不删除、不改写为今天的版本。

- 当前 `pack/modrinth.index.json` 共 101 项：99 个模组文件（包括默认停用的 DH）及 2 个非模组资源；旧快照为 99 项、97 个模组。
- OEI 已从 `1.0.6` 回退到 `1.0.5.1`，独立 `OELib-forge-0.0.5.jar` 已移除。旧文“删除库并降级尚未落实”已过时；新版表述应区分“移除独立 JAR”与“OEI 不依赖内嵌库”。
- Curios `5.14.1+1.20.1`、Caelus `3.2.0+1.20.1`、Elytra Slot `6.4.4+1.20.1` 已进入包索引及两服目录。修订 Excel 的第 131～133 行已记录入包，JSON/本文下方仍保留旧快照；新增状态见 JSON 的 `status_updates`。
- 除上述移除、回退和新增项外，旧 JSON 中仍存在于索引的文件路径和哈希均与本次核对一致。
- 两服目录现已纳入仓库，可以核查本地部署副本：主服 96 个启用 JAR，创造服 89 个；不据此声称远端已部署。TrainResync 包 `e`、主服 `d`、创造服 `a`，统一发布目标为 `g`。
- 原始依赖恢复候选仍保留为待确认。FPM 的 NEA 必需依赖描述与审查快照中的 JAR 声明不一致，见模组更新 TODO 的状态更新；本轮不据此移除任何模组。

依据：当前包索引、两服本地文件及 SHA-1 比对、提交 `0372110`、`40e7866`、`3c21860`。没有新增游戏测试或远端验证。

## 历史审查快照（部分状态过时）

审查日期：2026-10-04。Minecraft 1.20.1 / Forge 47.4.6。

> 本文是原始 Excel 历史登记与当前整合包 index 的对照，**不是服务器实装清单**。未修改原始 Excel、index 或任何模组；未执行启动/入服测试。

结构化数据见 [新岛Forge服务器Mod清单.json](新岛Forge服务器Mod清单.json)；实际分发文件以 [modrinth.index.json](../pack/modrinth.index.json) 为准，更新决策见 [模组更新 TODO](模组更新TODO.md)。

## 审查结果

- 原表有 116 个模组条目，另有 `Xaero?` 占位。当前 index 的 97 个模组全部能与原表对应，其中 Distant Horizons 文件带 `.disabled`。
- 19 个原表模组不在当前客户端 index 中；其中有服务端用途、历史停用或尚未入包的条目，不能据此判定缺装。
- 当前 index 另含 2 个非模组资源文件，单列在本文末尾。
- 当前版本从精确文件名读取，原 C 列保留为“原表版本”；原 H/I/J 历史备注完整保留在 JSON 和下方备注区。

| 问题 | 证据位置 | 结论与处理 |
| --- | --- | --- |
| 已确认 | D50、D58、D68、D114、D122 | 5 个前置单元格实际存成 Excel 日期，不能当作有效依赖编号。按月/日推测依次为 4,8；4,29；4,17；4,29；8,29，但这些只是恢复候选，原意仍需确认。 |
| 已确认 | D13、E2 | Zombie Proof Doors 的前置 1 指向表头；Collective 在第 2 行，且 E2 明写 ZPD 前置。转换版将 Collective 作为原表内部证据支持的修正，未用实际服务端 JAR 验证。 |
| 已确认 | D98、E97 | First-person Model 的 101 指向 One Enough Lib，不符合当前 2.7.3 JAR 声明：除 Minecraft 外无强制依赖。第 97 行称 Not Enough Animations 是 FPM 前置，也不能当作当前版本的硬依赖；可保留为历史搭配建议。 |
| 推测待确认 | D133 | Elytra Slot 使用 -2, -1，而其余编号按绝对行号解释。按相对偏移推测是 Curios API 与 Caelus API；转换版保留候选，不冒充已验证依赖。 |
| 已确认 | D79、D87、D91、D115 | 当前哈希匹配的本地 JAR 声明显示：JER 必需 JEI；Controlling 必需 Searchables；MaidAddition 必需 Touhou Little Maid；Extended Bogeys 必需 Steam ’n’ Rails。这些前置在原表对应 D 列缺失。这里只校正有证据的关系，不代表已完成全包依赖求解。 |
| 已确认 | D44 | Fruits Delight 1.1.3 未声明 Create 为强制依赖；声明 Farmer’s Delight 与 L2 Harvester。后者已通过 Jar-in-Jar 内置，不需要据此新增外部 JAR。 |
| 已确认 | D33、I33、J101 | I33 记载 One Enough Item 新增 One Enough Lib 前置，但 D33 未同步；J101 提议删除库并降级 OEI，当前 index 仍是 OEI 1.0.6 + OELib 0.0.5。保留为未落实的历史提议，不自动执行删除或降级。 |
| 已确认 | G28、F112、F6、I6 | 原表的本包部署选择与技术支持混在“需装”列里。Inv View 的 Modrinth 项目标为客户端 unsupported，JEED 标为服务端 unsupported，原表却写可选；TrainResync F6 为服务端不装，I6 又记服务端需装。保留原策略并标待核对，不据此自动生成服务端分发清单。 |
| 已确认 | C48、C49、C53、C54、C62、C74 | 6 个模组未填历史版本。已匹配 index 的条目另附精确文件名；Simple Backups 不在该客户端 index，实际服务端版本仍未知。 |
| 待核对 | C46、C50、C68、C108、C118 | 原表 Numismatics 1.10.11、Jetpack 4.4.2、Flywheel Compat 2.0.3、Supplementaries 3.1.41、Misc & Things 1.0.0 与当前 index 文件分别体现的 1.0.11、4.3.2、1.1.4、3.1.18、4.0A 不一致。Numismatics 疑似笔误；其余可能是历史版本/候选版本混用，不能只凭差异认定为错字。 |
| 已确认 | A130:G130、J130、A137 | More Leads 多个单元格有删除线，J130 备注没有删除线：保留为划除条目与未解决测试备注，不视为当前已安装。Xaero? 没有指明项目/版本，是待办占位而非已确认模组。Curios、Caelus、Elytra Slot 也尚未出现在当前 index。 |
| 已确认 | H1、A44、A49、A54、A63、A76、A78、A83、A88、A90、A92、A97、A103、A105、A118、A121 | 统一展示名称大小写、冒号空格及 H1 括号；原值仍完整保留。工作表实际内容到第 137 行，但格式范围达到 A1:AB1004，且没有筛选、冻结、结构化表，维护时容易误读行号和状态。 |
| 待核对 | E26、E63 | “崩溃自动重启”不能仅凭安装 Auto Restart 保证，进程崩溃后的拉起机制需结合外部启动脚本确认；No Chat Reports 用途宜中性描述为聊天签名/举报相关处理，原表关于验证故障的评价保留作历史备注，不作技术结论。 |
| 已确认 | C1、H1、I1、J1 | 这是跨版本演进记录，不是服务器当前实装清单。C 列与各版更新备注应分开；当前 index 是整合包分发快照，不证明服务器实装，也不证明已通过测试。97 个 index 模组均已匹配；19 个原表模组未在 index 中出现，不一律视为遗漏。 |

## 结构与维护约定

用户已确认：本表同时登记客户端与服务器模组。仅服务器需装的模组可能只存在于远端，不在 index 中属于正常情况，不据此判为遗漏或要求补入。

将“模组身份、原表版本、当前索引、部署策略、前置、历史备注、审查问题”拆开记录。JSON 使用持久 `id` 关联前置，Excel 行号只保留用于追溯；名称按官方项目或当前本地 JAR 统一，原始名称不丢弃。

“服/客”是原表的部署选择，尚未重新确认；不能与 Modrinth 项目级 `required / optional / unsupported` 等同。表中“索引未收录”只描述当前整合包。库可能内置于其他 JAR，不能看见依赖名就要求独立安装。

前置栏的“原表”表示尚未完整验证；“候选”表示日期/相对行号恢复推测；“校正”只针对本次有证据的关系。完整的强制/可选、版本范围与侧别见 JSON 的 `matching_jar_evidence.dependencies`；证据为 null 不等于无依赖。

JSON 保存全部 126 行非空原始单元格值、日期类型、格式及删除线，且记录源文件 SHA-256。它是审查快照，后续修改 index 后应重新核对；不要直接用本表生成服务器包。

## 全部模组对照


### 初始条目（原表未标版本）

| 原行 | 模组 | 原表版本 | 当前 index 文件 / 状态 | 原表服 / 客 | 前置关系（非完整图） |
| --- | --- | --- | --- | --- | --- |
| 2 | Collective | 7.94 | 索引未收录 | 需装 / - | 原表：未填 / 未列 |
| 3 | Create: Power Loader | 1.5.0 | `create_power_loader-1.5.0-mc1.20.1.jar` | 需装 / 需装 | 原表：Create |
| 4 | Create | 0.5.1.j | `create-1.20.1-0.5.1.j.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 5 | Create Track Map (AshBill补丁) | 1.4 | 索引未收录 | 需装 / - | 原表：Create、Kotlin for Forge |
| 6 | Create Train Resync | 1.0.0 | `trainresync-1.6.0.e-all.jar` | - / 可选 | 原表：Create |
| 7 | Just Enough Items (JEI) | 15.20.0.106 | `jei-1.20.1-forge-15.56.0.205.jar` | 可选 / 可选 | 原表：未填 / 未列 |
| 8 | Kotlin for Forge | 4.11.0 | `kotlinforforge-4.11.0-all.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 9 | Create: Steam 'n' Rails | 1.6.7 | `Steam_Rails-1.6.7+forge-mc1.20.1.jar` | 需装 / 需装 | 原表：Create |
| 10 | Too Fast | 0.4.3.5 | 索引未收录 | 需装 / - | 原表：未填 / 未列 |
| 11 | WorldEdit | 7.2.15 | `worldedit-mod-7.2.15.jar` | 需装 / 可选 | 原表：未填 / 未列 |
| 12 | YuZuUI | 1.0.0 | 索引未收录 | - / 可选 | 原表：未填 / 未列 |
| 13 | Zombie Proof Doors | 3.5 | 索引未收录 | 需装 / - | 校正：Collective |

### 光影加载器・适配器

| 原行 | 模组 | 原表版本 | 当前 index 文件 / 状态 | 原表服 / 客 | 前置关系（非完整图） |
| --- | --- | --- | --- | --- | --- |
| 16 | Embeddium | 0.3.31 | `embeddium-0.3.31+mc1.20.1.jar` | - / 可选 | 原表：未填 / 未列 |
| 17 | Oculus | 1.8.0 | `oculus-mc1.20.1-1.8.0.jar` | - / 可选 | 原表：Embeddium |

### v1.2 装饰板更新

| 原行 | 模组 | 原表版本 | 当前 index 文件 / 状态 | 原表服 / 客 | 前置关系（非完整图） |
| --- | --- | --- | --- | --- | --- |
| 20 | Jade 🔍 | 11.13.2 | `Jade-1.20.1-Forge-11.13.3.jar` | 可选 / 可选 | 原表：未填 / 未列 |
| 21 | Create: Copycats+ | 2.2.2 | `copycats-2.2.2+mc.1.20.1-forge.jar` | 需装 / 需装 | 原表：Create |
| 22 | Immersive Paintings | 0.6.8 | `immersive_paintings-0.6.13+1.20.1-forge.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 23 | Net Music | 1.1.8 | `netmusic-1.5.2-forge+mc1.20.1.jar` | 需装 / 需装 | 原表：未填 / 未列 |

### v1.3 电力更新

| 原行 | 模组 | 原表版本 | 当前 index 文件 / 状态 | 原表服 / 客 | 前置关系（非完整图） |
| --- | --- | --- | --- | --- | --- |
| 26 | Auto Restart | 2.0.2 | 索引未收录 | 需装 / - | 原表：未填 / 未列 |
| 27 | More MobGriefing Options | 2.0.4 | `MoreMobGriefingOptions-1.20.1-2.0.4.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 28 | Inv View Forge/NeoForge | 2.1.0 | `inv_view_forge-2.1.0-1.20.1.jar` | 需装 / 可选 | 原表：未填 / 未列 |
| 29 | Architectury API | 9.2.14 | `architectury-9.2.14-forge.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 30 | Rhino | 2001.2.3 | `rhino-forge-2001.2.3-build.10.jar` | 需装 / 可选 | 原表：未填 / 未列 |
| 31 | KubeJS | 2001.6.5 | `kubejs-forge-2001.6.5-build.16.jar` | 需装 / 可选 | 原表：Architectury API、Rhino |
| 32 | Jupiter | 2.2.2 | `Jupiter-2.2.2-forge.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 33 | One Enough Item | 1.0.5 | `OneEnoughItem-1.0.6.jar` | 需装 / 需装 | 校正：Architectury API、Jupiter、One Enough Lib |
| 34 | Distant Horizons | 2.3.4-b | `DistantHorizons-3.3.3-1.20.1-fabric-forge.jar.disabled` | 可选 / 可选 | 原表：未填 / 未列 |
| 35 | FTB Library | 2001.2.10 | `ftb-library-forge-2001.2.13.jar` | 需装 / 需装 | 原表：Architectury API |
| 36 | FTB Teams | 2001.3.1 | `ftb-teams-forge-2001.3.2.jar` | 需装 / 需装 | 原表：Architectury API、FTB Library |
| 37 | FTB Chunks | 2001.3.6 | `ftb-chunks-forge-2001.3.8.jar` | 需装 / 可选 | 原表：Architectury API、FTB Library、FTB Teams |
| 38 | CoroUtil | 1.3.7 | `coroutil-forge-1.20.1-1.3.7.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 39 | What Are They Up To (Watut) | 1.2.3 | `watut-forge-1.20.1-1.2.3.jar` | 需装 / 需装 | 原表：CoroUtil |
| 40 | TerraBlender | 3.0.1.10 | `TerraBlender-forge-1.20.1-3.0.1.10.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 41 | Nature's Spirit | 2.2.4 | `natures_spirit-2.2.5-1.20.1.jar` | 需装 / 需装 | 原表：TerraBlender |
| 42 | Nature's Spirit - Create Recipe Compat | 0.0.0 | `ns-cr-rc-0.0.0.jar` | 需装 / 需装 | 原表：Create、Nature's Spirit |
| 43 | Farmer's Delight | 1.2.9 | `FarmersDelight-1.20.1-1.3.4.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 44 | Fruits Delight | 1.0.19 | `fruitsdelight-1.1.3.jar` | 需装 / 需装 | 校正：Farmer's Delight |
| 45 | Create Crafts & Additions | 1.2.5 | `createaddition-1.20.1-1.2.5.jar` | 需装 / 需装 | 原表：Create |
| 46 | Create: Numismatics | 1.10.11 | `CreateNumismatics-1.0.11+forge-mc1.20.1.jar` | 需装 / 需装 | 原表：Create |
| 47 | Create Railways Navigator | 0.8.4 | `createrailwaysnavigator-forge-1.20.1-beta-0.8.4.jar` | 需装 / 需装 | 原表：Create |
| 48 | Ritchie's Projectile Library | 未填 | `ritchiesprojectilelib-2.1.0+mc.1.20.1-forge.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 49 | Create Big Cannons | 未填 | `createbigcannons-5.8.2-mc.1.20.1-forge.jar` | 需装 / 需装 | 原表：Create、Ritchie's Projectile Library |
| 50 | Create Jetpack | 4.4.2 | `create_jetpack-forge-4.3.2.jar` | 需装 / 需装 | 候选：Create、Kotlin for Forge |
| 51 | Create: Pantographs & Wires | 0.0.4 | `pantographsandwires-forge-1.20.1-beta-0.1.1.jar` | 需装 / 需装 | 原表：Create |
| 52 | Create: Framed | 1.5.6 | `createframed-1.20.1-1.5.6.jar` | 需装 / 需装 | 原表：Create |
| 53 | Cloth Config API | 未填 | `cloth-config-11.1.136-forge.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 54 | Infinity Buttons | 未填 | `infinitybuttons-1.20.1-4.0.7.jar` | 需装 / 需装 | 原表：Cloth Config API |
| 55 | Create Deco | 2.0.2 | `createdeco-2.0.2-1.20.1-forge.jar` | 需装 / 需装 | 原表：Create |
| 56 | Create: Design n' Decor | 0.4.0b | `design_decor-0.4.0b-1.20.1.jar` | 需装 / 需装 | 原表：Create |
| 57 | Create: Bells & Whistles | 0.4.3 | `bellsandwhistles-0.4.3-1.20.x.jar` | 需装 / 需装 | 原表：Create |
| 58 | Create Train Utilities (Create Train Doors) | 3.0.0 | `trainutilities-forge-3.0.0.jar` | 需装 / 需装 | 候选：Create、Architectury API |
| 59 | Create: Interiors | 0.5.6 | `interiors-0.5.6+forge-mc1.20.1-build.104.jar` | 需装 / 需装 | 原表：Create |

### v1.4 车万女仆更新

| 原行 | 模组 | 原表版本 | 当前 index 文件 / 状态 | 原表服 / 客 | 前置关系（非完整图） |
| --- | --- | --- | --- | --- | --- |
| 62 | Simple Backups | 未填 | 索引未收录 | 需装 / - | 原表：未填 / 未列 |
| 63 | No Chat Reports | 2.2.2 | `NoChatReports-FORGE-1.20.1-v2.2.3.jar` | 可选 / 可选 | 原表：未填 / 未列 |
| 64 | Entity Culling | 1.8.2 | `entityculling-forge-1.11.2-mc1.20.1.jar` | - / 可选 | 原表：未填 / 未列 |
| 65 | Packet Fixer | 3.3.0 | `packetfixer-3.3.2-1.18-1.20.4-merged.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 66 | ModernFix | 5.24.4 | `modernfix-forge-5.27.85+mc1.20.1.jar` | 可选 / 可选 | 原表：未填 / 未列 |
| 67 | FerriteCore | 6.0.1 | `ferritecore-6.0.1-forge.jar` | 可选 / 可选 | 原表：未填 / 未列 |
| 68 | Iris & Oculus Flywheel Compat | 2.0.3 | `oculus-flywheel-compat-forge1.20.1+1.1.4.jar` | - / 可选 | 候选：Create、Oculus |
| 69 | (Sodium) Chloride | 1.7.2 | `chloride-FORGE-mc1.20.1-v1.7.2.jar` | - / 可选 | 原表：Embeddium |
| 70 | Rubidium Dynamic Lights | 1.6.0 | `dynamiclightsreforged-1.20.1_v1.6.0.jar` | - / 可选 | 原表：未填 / 未列 |
| 71 | Create: Dynamic Lights | 1.0.2 | `create-dyn-light-forge1.20.1+1.0.2.jar` | 可选 / 可选 | 原表：Create |
| 72 | Melody | 1.0.3 | `melody_forge_1.0.3_MC_1.20.1-1.20.4.jar` | 可选 / 可选 | 原表：未填 / 未列 |
| 73 | Konkrete | 1.8.0 | `konkrete_forge_1.8.0_MC_1.20-1.20.1.jar` | 可选 / 可选 | 原表：未填 / 未列 |
| 74 | MCEF (Minecraft Chromium Embedded Framework) | 未填 | `mcef-forge-2.1.6-1.20.1.jar` | - / 可选 | 原表：未填 / 未列 |
| 75 | FancyMenu | 3.7.0 | `fancymenu_forge_3.7.0_MC_1.20.1.jar` | 可选 / 可选 | 原表：Melody、Konkrete |
| 76 | Drippy Loading Screen | 3.0.12 | `drippyloadingscreen_forge_3.0.12_MC_1.20.1.jar` | - / 可选 | 原表：Konkrete、FancyMenu |
| 77 | Yes Steve Model | 2.4.1 | `ysm-2.6.5-forge+mc1.20.1-release.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 78 | Carry On | 2.1.2.7 | `carryon-forge-1.20.1-2.1.2.7.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 79 | Just Enough Resources | 1.4.0.247 | `JustEnoughResources-1.20.1-1.4.0.247.jar` | 可选 / 需装 | 校正：Just Enough Items (JEI) |
| 80 | YUNG's API | 4.0.6 | `YungsApi-1.20-Forge-4.0.6.jar` | - / 可选 | 原表：未填 / 未列 |
| 81 | Traveler's Titles | 4.0.2 | `TravelersTitles-1.20-Forge-4.0.2.jar` | - / 可选 | 原表：YUNG's API |
| 82 | IMBlocker | 5.4.3.1 | `IMBlocker-5.6.2.1-forge+1.17-1.20.4.jar` | - / 可选 | 原表：未填 / 未列 |
| 83 | JustEnoughCharacters | 4.5.16 | `jecharacters-1.20.1-forge-4.6.11.jar` | - / 可选 | 原表：未填 / 未列 |
| 84 | AlwaysEat | 5.2 | `AlwaysEat-5.2.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 85 | AppleSkin | 2.5.1 | `appleskin-forge-mc1.20.1-2.5.1.jar` | 可选 / 可选 | 原表：未填 / 未列 |
| 86 | Searchables | 1.0.3 | `Searchables-forge-1.20.1-1.0.3.jar` | - / 可选 | 原表：未填 / 未列 |
| 87 | Controlling | 12.0.2 | `Controlling-forge-1.20.1-12.0.2.jar` | - / 可选 | 校正：Searchables |
| 88 | Yuushya Townscape | 2.2.3 | `yuushya-1.20.1-forge-2.2.3.jar` | 需装 / 需装 | 原表：Architectury API |
| 89 | Patchouli | 84.1 | `Patchouli-1.20.1-85-FORGE.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 90 | Touhou Little Maid | 1.4.0 | `touhoulittlemaid-1.5.3-forge+mc1.20.1.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 91 | Maid Addition | 1.1.4 | `maidaddition-1.1.4-beta-all.jar` | 需装 / 需装 | 校正：Touhou Little Maid |
| 92 | Maid Storage Manager | 1.13.5 | `1.20.1-maid_storage_manager-1.15.6.jar` | 需装 / 需装 | 原表：Touhou Little Maid |

### v1.4.4 更新

| 原行 | 模组 | 原表版本 | 当前 index 文件 / 状态 | 原表服 / 客 | 前置关系（非完整图） |
| --- | --- | --- | --- | --- | --- |
| 95 | BlueMap | 5.3 | 索引未收录 | 需装 / 可选 | 原表：未填 / 未列 |
| 96 | Configured | 2.2.3 | `configured-forge-1.20.1-2.2.3.jar` | 可选 / 可选 | 原表：未填 / 未列 |
| 97 | Not Enough Animations | 1.10.2 | `notenoughanimations-forge-1.12.6-mc1.20.1.jar` | - / 可选 | 原表：未填 / 未列 |
| 98 | First-person Model | 2.5.0 | `firstperson-forge-2.7.3-mc1.20.1.jar` | - / 可选 | 校正：未列其他模组强制前置 |

### v1.5 森罗更新

| 原行 | 模组 | 原表版本 | 当前 index 文件 / 状态 | 原表服 / 客 | 前置关系（非完整图） |
| --- | --- | --- | --- | --- | --- |
| 101 | One Enough Lib | 0.0.5 | `OELib-forge-0.0.5.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 102 | KubeJS Create | 2001.2.5 | `kubejs-create-forge-2001.2.5-build.2.jar` | 需装 / 需装 | 原表：Create、KubeJS |
| 103 | Kaleidoscope Cookery | 1.1.0 | `kaleidoscopecookery-1.6.0-forge+mc1.20.1.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 104 | Barbeque's Delight [Forge/NeoForge] | 1.0.5 | `barbequesdelight-1.0.6.jar` | 需装 / 需装 | 原表：Farmer's Delight |
| 105 | Simple Planes | 5.3.3 | `simpleplanes-1.20.1-5.3.3.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 106 | Automobility | 0.4.2 | `automobility-0.4.2+1.20.1-forge.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 107 | Moonlight Lib | 2.16.15 | `moonlight-1.20-2.16.15-forge.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 108 | Supplementaries | 3.1.41 | `supplementaries-1.20-3.1.18.jar` | 需装 / 需装 | 原表：Moonlight Lib |
| 109 | Amendments | 2.2.3 | `amendments-1.20-2.2.3.jar` | 需装 / 需装 | 原表：Moonlight Lib |
| 110 | Gravestone Mod | 1.0.35 | `gravestone-forge-1.20.1-1.0.35.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 111 | crushed_obsidian | 1.0.1 | `crushed_obsidian-1.0.1-forge-1.20.1.jar` | 需装 / 需装 | 原表：Create |
| 112 | Just Enough Effect Descriptions (JEED) | 2.2.5 | `jeed-1.20-2.2.6.jar` | 可选 / 可选 | 原表：Just Enough Items (JEI) |
| 113 | Gauges and Switches | 1.2.22 | `rsgauges-1.2.22.jar` | 需装 / 需装 | 原表：未填 / 未列 |
| 114 | Create Train Lights | 1.0.0 | `ctl-forge-1.0.0.jar` | 需装 / 需装 | 候选：Create、Architectury API |
| 115 | Extended Bogeys | 0.5.14 | `extendedbogeys-0.5.14-1.20.1-0.5.1.f-forge.jar` | 需装 / 需装 | 校正：Create、Create: Steam 'n' Rails |
| 116 | Create: Trading floor | 1.1.9 | `trading_floor-1.1.9+forge-1.20.1.jar` | 需装 / 需装 | 原表：Create |
| 117 | Create: Central Kitchen | 1.3.13 | `create_central_kitchen-1.20.1-for-create-0.5.1.j-1.3.13.jar` | 需装 / 需装 | 原表：Create |
| 118 | Create: Misc & Things | 1.0.0 | `create_misc_and_things_ 1.20.1_4.0A.jar` | 需装 / 需装 | 原表：Create |

### v1.5.1 更新

| 原行 | 模组 | 原表版本 | 当前 index 文件 / 状态 | 原表服 / 客 | 前置关系（非完整图） |
| --- | --- | --- | --- | --- | --- |
| 121 | Create: Schematic Checker | 0.21.12 | 索引未收录 | 需装 / 可选 | 原表：Create |
| 122 | Observable | 4.4.2 | 索引未收录 | 需装 / 可选 | 候选：Kotlin for Forge、Architectury API |
| 123 | Memory Leak Fix | 1.1.5 | 索引未收录 | 需装 / 可选 | 原表：未填 / 未列 |
| 124 | Radium | 0.12.4 | 索引未收录 | 需装 / - | 原表：未填 / 未列 |
| 125 | ServerCore | 1.5.2 | 索引未收录 | 需装 / - | 原表：未填 / 未列 |
| 126 | Cupboard | 1.3.0 | 索引未收录 | 需装 / - | 原表：未填 / 未列 |
| 127 | Limited Chunkloading | 1.4.1 | 索引未收录 | 需装 / - | 原表：Cupboard |

### v1.6 鸽一年更新

| 原行 | 模组 | 原表版本 | 当前 index 文件 / 状态 | 原表服 / 客 | 前置关系（非完整图） |
| --- | --- | --- | --- | --- | --- |
| 130 | More Leads | 1.3.0 | 索引未收录；原表已划除 | 需装 / 需装 | 原表：未填 / 未列 |
| 131 | Curios API | 5.14.1 | 索引未收录 | 需装 / 需装 | 原表：未填 / 未列 |
| 132 | Caelus API | 3.2.0 | 索引未收录 | 需装 / 需装 | 原表：未填 / 未列 |
| 133 | Elytra Slot | 6.4.4 | 索引未收录 | 需装 / 需装 | 候选：Curios API、Caelus API |

## 原表用途与更新备注

下列文字为原表历史记录，保留其语气与未落实提议，**不代表本次新增决策或已确认事实**。C 列与更新备注中的版本不互相覆盖。

- **v1.3 电力更新（原分组备注）**：H=更新Forge至47.4.6、更新TrainResync至1.2.27
- **v1.4 车万女仆更新（原分组备注）**：H=更新FTB区块交互白名单、更新TrainResync至1.3.5
- **v1.4.4 更新（原分组备注）**：H=FM加入网络播放、地图界面、更新小镇至修改版1.4.4

- **Collective（原行 2）**：用途：ZPD前置
- **Create: Power Loader（原行 3）**：用途：机械动力风格的区块加载器
- **Create（原行 4）**：用途：机械动力
- **Create Track Map (AshBill补丁)（原行 5）**：用途：实时铁道地图网页
- **Create Train Resync（原行 6）**：用途：修复列车车厢消失；v1.4 备注：更新至1.3.5；v1.5 备注：更新至1.5.0.d（新前置：51、105・服务端需装）；v1.6 备注：更新至1.6.0.b
- **Just Enough Items (JEI)（原行 7）**：用途：查看配方等；v1.5 备注：更新至15.20.0.116
- **Kotlin for Forge（原行 8）**：用途：CTM等前置
- **Create: Steam 'n' Rails（原行 9）**：用途：宽轨窄轨、枕木材料等铁道额外内容
- **Too Fast（原行 10）**：用途：防止网络连接不佳时“闪回”
- **WorldEdit（原行 11）**：用途：小木斧（结构复制粘贴、批量编辑）
- **YuZuUI（原行 12）**：用途：Ciallo～(∠·ω< )⌒★；v1.4 备注：默认不再安装
- **Zombie Proof Doors（原行 13）**：用途：防止僵尸/猪人破坏门（站台屏蔽门）
- **Embeddium（原行 16）**：用途：性能优化・Oculus前置
- **Oculus（原行 17）**：用途：Iris光影加载器・适配器
- **Jade 🔍（原行 20）**：用途：各类辅助功能（显示方块名、实体名等）
- **Create: Copycats+（原行 21）**：用途：更多装饰板！
- **Immersive Paintings（原行 22）**：用途：展示自定义图片（如铁道线路图）
- **Net Music（原行 23）**：用途：播放自定义音乐
- **Auto Restart（原行 26）**：用途：服务器崩溃时自动重启
- **More MobGriefing Options（原行 27）**：用途：禁用末影人移动方块
- **Inv View Forge/NeoForge（原行 28）**：用途：管理员工具
- **Architectury API（原行 29）**：用途：OEI・方块小镇等前置
- **Rhino（原行 30）**：用途：KJS前置
- **KubeJS（原行 31）**：用途：自定义合成
- **Jupiter（原行 32）**：用途：OEI前置
- **One Enough Item（原行 33）**：用途：统一重复物品；v1.5 备注：更新至1.0.6（新前置：101）
- **Distant Horizons（原行 34）**：用途：无限渲染距离；v1.4 备注：客户端默认不开启 \| 服务端仅生存服
- **FTB Library（原行 35）**：用途：FTB系列前置
- **FTB Teams（原行 36）**：用途：FTB区块前置・玩家组队功能
- **FTB Chunks（原行 37）**：用途：领地保护功能；v1.4 备注：修改版0.0.2；v1.5 备注：停用修改版0.0.2、改用数据包修改
- **CoroUtil（原行 38）**：用途：Watut前置
- **What Are They Up To (Watut)（原行 39）**：用途：UI相关动作沉浸感增强
- **TerraBlender（原行 40）**：用途：NS前置
- **Nature's Spirit（原行 41）**：用途：更多地形・群系・装饰方块；v1.5 备注：更新至2.2.5
- **Nature's Spirit - Create Recipe Compat（原行 42）**：用途：NS原木支持机械动力加工
- **Farmer's Delight（原行 43）**：用途：各种耕种・烹饪相关内容
- **Fruits Delight（原行 44）**：用途：水果相关内容；v1.5 备注：更新至1.1.1
- **Create Crafts & Additions（原行 45）**：用途：发电机、电动机、电线！
- **Create: Numismatics（原行 46）**：用途：货币系统
- **Create Railways Navigator（原行 47）**：用途：车站及车内信息显示・乘换案内APP
- **Ritchie's Projectile Library（原行 48）**：用途：CBC前置
- **Create Big Cannons（原行 49）**：用途：火炮！
- **Create Jetpack（原行 50）**：用途：喷气背包！
- **Create: Pantographs & Wires（原行 51）**：用途：受电弓・架线等装饰方块；v1.5 备注：更新至0.1.1
- **Create: Framed（原行 52）**：用途：各种玻璃装饰方块
- **Cloth Config API（原行 53）**：用途：IB前置
- **Infinity Buttons（原行 54）**：用途：各种按钮装饰方块
- **Create Deco（原行 55）**：用途：各种砖墙・金属类等装饰方块
- **Create: Design n' Decor（原行 56）**：用途：各种机械动力部件相关装饰方块
- **Create: Bells & Whistles（原行 57）**：用途：各种蒸汽机车相关装饰方块
- **Create Train Utilities (Create Train Doors)（原行 58）**：用途：各种写实列车门装饰方块
- **Create: Interiors（原行 59）**：用途：各种座椅装饰方块
- **Simple Backups（原行 62）**：用途：服务器自动滚动备份
- **No Chat Reports（原行 63）**：用途：Mojang和微软聊天验证有bug、关了不用
- **Entity Culling（原行 64）**：用途：优化渲染、提升帧率；v1.5 备注：更新至1.9.3
- **Packet Fixer（原行 65）**：用途：优化网络传输、修复数据包异常
- **ModernFix（原行 66）**：用途：优化游戏启动速度
- **FerriteCore（原行 67）**：用途：优化内存占用
- **Iris & Oculus Flywheel Compat（原行 68）**：用途：机械动力光影兼容、修复转向架渲染
- **(Sodium) Chloride（原行 69）**：用途：更多优化选项、修复语言切换加载缓慢
- **Rubidium Dynamic Lights（原行 70）**：用途：移动光源
- **Create: Dynamic Lights（原行 71）**：用途：机械动力移动光源兼容
- **Melody（原行 72）**：用途：FM前置
- **Konkrete（原行 73）**：用途：FM前置
- **MCEF (Minecraft Chromium Embedded Framework)（原行 74）**：用途：渲染网页・视频
- **FancyMenu（原行 75）**：用途：自定义UI菜单
- **Drippy Loading Screen（原行 76）**：用途：自定义启动画面
- **Yes Steve Model（原行 77）**：用途：使用自定义玩家模型；v1.5 备注：更新至2.5.1
- **Carry On（原行 78）**：用途：方便搬运实体和方块实体
- **Just Enough Resources（原行 79）**：用途：增加资源获取途径信息至JEI
- **YUNG's API（原行 80）**：用途：旅人标题前置
- **Traveler's Titles（原行 81）**：用途：显示群系名称
- **IMBlocker（原行 82）**：用途：修复日中韩输入法导致无法移动；v1.5 备注：更新至5.4.5
- **JustEnoughCharacters（原行 83）**：用途：增加中文拼音物品搜索
- **AlwaysEat（原行 84）**：用途：允许在饱食度满时继续进食
- **AppleSkin（原行 85）**：用途：同时显示饱食度・饱和度
- **Searchables（原行 86）**：用途：Controlling前置
- **Controlling（原行 87）**：用途：便于查找键位、解决键位冲突
- **Yuushya Townscape（原行 88）**：用途：丰富的各种建筑装饰方块；v1.4 备注：修改版1.4.0；v1.5 备注：停用修改版1.4.4、改用数据包修改
- **Patchouli（原行 89）**：用途：女仆相关模组指南
- **Touhou Little Maid（原行 90）**：用途：酒狐、去给我炒两个菜。。
- **Maid Addition（原行 91）**：用途：女仆996手摇曲柄
- **Maid Storage Manager（原行 92）**：用途：湿件AE平替；v1.5 备注：更新至1.13.14
- **BlueMap（原行 95）**：用途：全服大地图；v1.4 备注：客户端默认不安装
- **Configured（原行 96）**：用途：方便修改JEI配置；v1.4 备注：服务端默认不安装
- **Not Enough Animations（原行 97）**：用途：FPM前置；v1.5 备注：更新至1.10.6
- **First-person Model（原行 98）**：用途：搭配YSM使用
- **One Enough Lib（原行 101）**：用途：OEI前置；v1.6 备注：删除此前置、降级OEI
- **KubeJS Create（原行 102）**：用途：KJS机械动力兼容
- **Kaleidoscope Cookery（原行 103）**：用途：更丰富的菜谱
- **Barbeque's Delight [Forge/NeoForge]（原行 104）**：用途：烤串！
- **Simple Planes（原行 105）**：用途：飞机・直升机
- **Automobility（原行 106）**：用途：小汽车
- **Moonlight Lib（原行 107）**：用途：锦致装饰前置
- **Supplementaries（原行 108）**：用途：各种装饰品・额外功能等；v1.5 备注：部分红石、功能性组件等因与机械动力冲突不启用
- **Amendments（原行 109）**：用途：各种小改良
- **Gravestone Mod（原行 110）**：用途：落地成盒
- **crushed_obsidian（原行 111）**：用途：哭泣黑曜石产线
- **Just Enough Effect Descriptions (JEED)（原行 112）**：用途：便于查询料理效果细节
- **Gauges and Switches（原行 113）**：用途：更多仪表・按钮
- **Create Train Lights（原行 114）**：用途：自动换端列车灯
- **Extended Bogeys（原行 115）**：用途：更多转向架类型
- **Create: Trading floor（原行 116）**：用途：自动化村民交易
- **Create: Central Kitchen（原行 117）**：用途：自动化料理
- **Create: Misc & Things（原行 118）**：用途：写票・检票等功能
- **Create: Schematic Checker（原行 121）**：用途：蓝图校验
- **Observable（原行 122）**：用途：检查卡顿成因
- **Memory Leak Fix（原行 123）**：用途：缓解内存问题
- **Radium（原行 124）**：用途：缓解卡顿
- **ServerCore（原行 125）**：用途：减少模拟距离等缓解卡顿
- **Cupboard（原行 126）**：用途：Limited Chunkloading前置
- **Limited Chunkloading（原行 127）**：用途：监测加载器使用情况
- **More Leads（原行 130）**：用途：增强拴绳功能；v1.6 备注：需要测试backport是否能用，是否能用于村民
- **Curios API（原行 131）**：用途：鞘翅槽位前置
- **Caelus API（原行 132）**：用途：鞘翅槽位前置
- **Elytra Slot（原行 133）**：用途：使鞘翅和喷气背包可以同时装备

## 索引未收录与未定项

以下只列出差集；服务器实装版本、是否继续保留，需以服务器目录或后续明确决策确认。

Collective、Create Track Map (AshBill补丁)、Too Fast、YuZuUI、Zombie Proof Doors、Auto Restart、Simple Backups、BlueMap、Create: Schematic Checker、Observable、Memory Leak Fix、Radium、ServerCore、Cupboard、Limited Chunkloading、More Leads、Curios API、Caelus API、Elytra Slot。

`Xaero?`（A137）尚未区分小地图、世界地图或其他项目，未并入 116 个已具名模组。

## 非模组资源

- `shaderpacks/Sildur's Vibrant Shaders v1.541 Extreme-VL.zip`
- `AshBill/免下载MCEF/mcef-libraries.zip`

## 核对依据与边界

- 原始工作簿：`D:\mydata\Agents\Minecraft相关\本地资源\用户导入文件\新岛Forge服务器Mod列表.xlsx`；工作表 `Sheet1`。
- 原始工作簿 SHA-256：`8a67ed7c2327c27b13493023f8e79ab11cfec23df69e14df7b8f171981edb00c`。
- index 快照 SHA-256：`883ea0ca3d74c445b24f7ac230c76bb7345cab257e6c0851a786f1c3294954bf`。
- 项目名称与支持侧别：Modrinth 官方 API；JSON 每个项目保留 ID、slug、源码/问题地址，可按 `https://api.modrinth.com/v2/project/{id}` 复查。项目级元数据不能替代特定版本的依赖声明。
- 56 个 index 模组取得 SHA-1 匹配的本地 JAR 元数据，来源路径及声明已保存；其余依赖未经本次完整核验。没有为此下载新的 JAR。
- JEI 当前回退至 15.56.0.205，仓管与新版 JEI 的兼容性复查沿用既有模组更新 TODO；本次没有调整版本。
