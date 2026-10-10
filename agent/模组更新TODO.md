# 模组更新 TODO

## 状态更新（2026-10-09）

- 逐项核对当前索引：下方 25 个目标/当前文件全部存在，维持“已入包、待用户游戏测试”；本次静态核对不勾选任何游戏测试项。
- 本轮新增的鞘翅槽位三件套，以及 OEI 回退不属于这份历史 25 项更新清单；它们的已入包状态见模组清单的状态更新。
- TrainResync 后续修复统一跟随 `1.6.0.g` 发布待办，`f` 切石机验证继续保留；不再另以 `f` 为发布目标。
- 下方旧 FPM 前置记录已标记过时/待复核；NEA 继续保留在包中。文末关于早期 25 项回退的说明保留为历史，不代表当前仍未入包。

## 重点测试：17、19、24（用户指定）

以下汇总旧版之后、清单目标版本以内的 Forge 1.20.1 官方更新说明，查阅于 2026-10-04。不包含目标版本之后的更新，也不将日志中仅限 Fabric 或 1.21.1 的变化计入。三个目标目前均为**已入包、待重新测试**；森罗厨房目标已更新至 1.6.0，下文补充该版本变更。测试清单是针对本整合包的建议，不代表这些问题当前必然存在。

### 17. Kaleidoscope Cookery：1.1.0 → 1.6.0

**重点：配方与物品变更会影响现有厨房、库存和 KJS 脚本。**

- **1.1.1–1.2.1**：重做磨盘的投料、出料和配方，取消配方容器参数；小麦产面粉、种子产油。扩展油罐自动化，调整饭袋效果及消耗机制，新增镰刀和多种菜肴；改善农夫乐事食材、热源兼容，加入机械动力 Ponder 教程。期间修复饭袋与精妙背包刷物品、蒸笼取物和热源检测等问题。[1.1.1](https://modrinth.com/mod/v17FatAc/version/5TvWnxSE)、[1.2.0](https://modrinth.com/mod/v17FatAc/version/WrRGy5Ni)、[1.2.1](https://modrinth.com/mod/v17FatAc/version/Fxxe8gvO)
- **1.3.0–1.4.1**：新增茶壶、茶饮、垃圾桶和食物效果；炒锅、汤锅引入“严格配方优先、灵活配方兜底”，食材数量影响品质、饥饿值和效果。新增拼盘机制，磨盘支持概率副产物及机械动力粉碎轮配方。**移除一批旧食物**，包括驴肉及驴肉汤、部分盖饭、烤鸡串和旧水果拼盘；生煎馒头由方块食物改为物品食物。1.4.1 修复破坏竹筒饭导致服务器崩溃和碗返还问题。[1.3.0](https://modrinth.com/mod/v17FatAc/version/lpJLHWk4)、[1.4.0](https://modrinth.com/mod/v17FatAc/version/oMHbtVQz)、[1.4.1](https://modrinth.com/mod/v17FatAc/version/NXvhd04p)
- **1.5.0–1.5.1**：新增种茶、制茶、竹筛干湿加工，以及八仙桌、长凳等；茶包改用干茶叶，茶壶支持更多自动化和奶茶。修复磨盘与机械动力溜槽、KJS 配方 `carrier` 为空的问题；移除旧版资源包。目标版进一步修复八仙桌与机械动力兼容、茶壶潜在复制漏洞和茶杯崩溃。[1.5.0](https://modrinth.com/mod/v17FatAc/version/i9viz9oI)、[1.5.1](https://modrinth.com/mod/v17FatAc/version/oR27Hgav)
- **1.6.0（本轮补充）**：砧板支持发射器放料及持刀切割，配方支持多输出；新增快刀附魔，调整切割产量及鸡肉/兔肉产物。磨盘驱动实体由白名单改为黑名单，受伤后会脱离；调整镰刀附魔/耐久、草帽护甲和厨刀伤害。饭袋配方改用紫水晶碎片，扩为 24 格，按顺序进食、饱食后停止，并支持按顺序使用存储的药水。[1.6.0](https://modrinth.com/mod/v17FatAc/version/Ghp0qCKY)

建议认真测试：

- [ ] 用旧存档副本核对厨房、容器和玩家库存，检查被删除或改形态的食物如何处理；官方日志未在上述条目说明完整迁移方案。
- [ ] 检查 KJS 自定义配方、物品 ID/标签引用及 JEI 展示，实际制作严格配方、灵活配方并检查产量、品质、容器返还。
- [ ] 实测磨盘、油罐、茶壶、竹筛与漏斗/溜槽等自动化，检查是否丢物或复制物品；补测砧板发射器、多输出配方、磨盘实体受伤脱离及饭袋药水/进食顺序。
- [ ] 测试多人操作厨房、八仙桌/茶杯及女仆取食联动；核对饭袋、饱食护盾和新增效果是否符合服务器玩法。

### 19. Net Music：1.1.8 → 1.5.2

**重点：旧唱片能否继续播放、网络异常会不会卡住，以及女仆播放联动。**

- **1.2.0–1.3.1**：唱机和女仆支持显示歌词，可配置关闭；修复 24-bit FLAC、本地音频循环和歌词解析。加入精妙背包唱片播放器联动，适配女仆 1.4.2+ / 1.5.0 背包，并修复网络不良导致游戏卡死的问题。[1.2.0](https://modrinth.com/mod/gKNuqaQq/version/2JZCOLfk)、[1.2.1](https://modrinth.com/mod/gKNuqaQq/version/RZgTph1D)、[1.3.0](https://modrinth.com/mod/gKNuqaQq/version/jECEBoUk)、[1.3.1](https://modrinth.com/mod/gKNuqaQq/version/yjA4mlcw)
- **1.4.0–1.5.0**：减少音频流重复连接，适配女仆 1.5.2+ AI；网络实现迁移至 HttpClient，播放失败有提示并修正声音/粒子清理。新增 HLS m3u8、ADTS AAC、MP4 AAC，以及支持范围播放、断线重连的广播喇叭和 CNR 预设电台；唱机、电脑、刻录机的材质与配方调整。[1.4.0](https://modrinth.com/mod/gKNuqaQq/version/BVnj7oAA)、[1.5.0](https://modrinth.com/mod/gKNuqaQq/version/7EQN73OL)
- **1.5.1–1.5.2**：改善 MP3/AAC 格式识别、歌词时间戳及 Forge 1.20.1 精妙背包兼容。物理结构上重复广播的修复在日志中明确指向 Create: Aeronautics，不能据此认定本包机械动力列车已验证。[1.5.1](https://modrinth.com/mod/gKNuqaQq/version/PDAxPE1Z)、[1.5.2](https://modrinth.com/mod/gKNuqaQq/version/QbkPicTz)

建议认真测试：

- [ ] 用旧唱片和实际使用的音乐链接测试播放、停止、循环、切歌、歌词与本地音频。
- [ ] 测试失效链接、断网、恢复网络及离开播放范围，观察是否卡住、重复播放或残留声音。
- [ ] 多人测试女仆播放、背包播放（若启用对应联动），以及列车场景中的位置与声音行为。
- [ ] 测试 m3u8 广播范围和重连；核对改动后的唱机、电脑、刻录机配方与现有 KJS 配方。

### 24. Touhou Little Maid：1.4.0 → 1.5.3

**重点：既有女仆数据、背包/饰品、权限，以及与本包附属和 TrainResync 的兼容。**

- **1.4.2–1.4.6**：饰品系统重做，扩展至 30 槽并按好感解锁，加入相关 API/KJS 支持；默认启用女仆实体备份，模型选择支持搜索。修复 YSM 手办/雕像动画，以及熔炉、工作台背包与 JEI 等界面的崩溃。期间曾加入寻路邻居缓存，**1.4.5 已回退**以解决卡住，不能将该优化视为目标版保留的功能。[1.4.2](https://modrinth.com/mod/R0bDWFAW/version/NfrPPLRl)、[1.4.5](https://modrinth.com/mod/R0bDWFAW/version/Qqc2oJtO)、[1.4.6](https://modrinth.com/mod/R0bDWFAW/version/iwdMzV8V)
- **1.5.0**：新增零食柜与女仆摆放、取食行为，联动森罗厨房和农夫乐事；魂符新增主人绑定检查。扩展女仆属性、危险方块寻路/传送黑名单，调整近战攻速、交互距离和饰品操作。更新 YSM 动画/Molang 联动，并修复祭坛 KJS 输出、坐骑召回等问题。[1.5.0](https://modrinth.com/mod/R0bDWFAW/version/tuOQjuRE)
- **1.5.1**：AI 设置集中到面对女仆按 T 打开的界面，旧 GUI 对应页移除；新增服务商、权限认证、工具调用、Skill 和上下文压缩机制。支持精妙背包；修复取食循环、饰品掉落、零食柜内容掉落，以及机械动力座椅朝向和旋转展示台多掉手办的问题。该版日志明确提到 Epistalove 附属存在已知兼容崩溃，不能把“其他附属兼容”的描述当成本包附属已测试。[1.5.1](https://modrinth.com/mod/R0bDWFAW/version/quesqoeZ)
- **1.5.2–1.5.3**：调整 AI 异步工具执行及主线程结果返回，上下文压缩改按 token 判断，增加 Minecraft Wiki 查询工具。修复背包缓存循环引用导致的内存泄漏，加入旅行者背包兼容，并修复 DeepSeek、Fish Audio 接口及部分模型 Molang。[1.5.2](https://modrinth.com/mod/R0bDWFAW/version/YpdxfSC2)、[1.5.3](https://modrinth.com/mod/R0bDWFAW/version/g1SKoGQJ)

建议认真测试：

- [ ] 在旧存档副本中检查现有女仆的主人、好感、任务、模型、背包和饰品；重登、跨区块加载后再次检查。
- [ ] 分别用主人、其他玩家和管理员测试交互权限，特别验证 TrainResync 的管理员访问功能与新 GUI 的关系。
- [ ] 测试 Maid Storage Manager 等包内附属，以及搬运/存取物品、工作台/熔炉背包；检查物品数量和界面是否正常。
- [ ] 联测 YSM 模型动画、Net Music 播放、森罗厨房/农夫乐事取食，以及列车座椅、召回与危险机械附近寻路。
- [ ] 若使用 AI，检查旧配置迁移、新 T 界面权限、服务商连接和工具执行；核对是否会绕过原有管理员控制。

整理日期：2026-10-04。环境：Minecraft 1.20.1 / Forge。

## 范围与状态

- 按 2026-09-30 更新讨论及 2026-10-01 最终确认结果整理：25 项确认更新，35 项确认不更新。
- 2026-10-04 按用户要求重新查询这 25 项的 Minecraft 1.20.1 / Forge 最新版本并实施，包含三个重点模组；35 项历史不更新决策保持不变。最新版本只表示本次查询结果，不表示整包运行兼容性已通过。
- **未入包**：目标版本尚未写入当前索引或加入包内。旧版本已经存在不算完成。
- **已入包**：目标版本已写入索引或加入包内，游戏内功能测试尚未确认完成。
- **已测试正常**：已入包，并经用户在游戏内检查相关功能正常；应填写测试版本、日期和结果。能启动、静态检查通过或已经 commit 都不能代替此步骤。
- 每项先勾选“已入包”，再勾选“已测试正常”，并同步更新状态和备注。

当前核对结果（2026-10-04）：25 项已入包，0 项未入包，0 项确认游戏内功能测试正常。本轮补上三个重点模组，并进一步更新 IMBlocker、ModernFix；纳入本轮提交，等待用户重新测试。

## 确认更新（25 项）

### 1. Maid Storage Manager

- 状态：已入包，待用户测试。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/1.20.1-maid_storage_manager-1.13.14.jar`
- 目标文件：`mods/1.20.1-maid_storage_manager-1.15.6.jar`
- 目标版本来源：[版本页面](https://modrinth.com/mod/5sIJPqAj/version/xTNPlwGP)；PCL。
- 依赖记录：JAR 虽声明 Touhou Little Maid >=1.3.7，但 1.15.6 实际引用旧版 TLM 1.4.0 缺失的 ITool；本轮改搭 TLM 1.5.3，已核对该接口存在，运行兼容性待复测。
- 测试记录：2026-10-04 15:47:33，1.15.6 + TLM 1.4.0 进入单人世界时因 ITool 缺失崩溃（TickServer.onTick）；本轮 TLM 1.5.3 组合尚待复测。
- 备注：2026-10-04 按本清单固定目标写入 index，纳入本轮提交。官方标记为 beta，沿用此前明确选定的版本。

### 2. Barbeque's Delight [Forge/NeoForge]

- 状态：已入包，待用户测试。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/barbequesdelight-1.0.5.jar`
- 目标文件：`mods/barbequesdelight-1.0.6.jar`
- 目标版本来源：[版本页面](https://modrinth.com/mod/rtu7uERF/version/LsvcmS2n)；PCL。
- 依赖记录：必需: Farmer's Delight; 可选: Jade 🔍。
- 测试记录：2026-10-04 已完成索引静态检查；游戏内功能测试待用户执行。
- 备注：2026-10-04 按本清单固定目标写入 index，纳入本轮提交。

### 3. Distant Horizons

- 状态：已入包，待用户测试。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/DistantHorizons-2.3.4-b-1.20.1-fabric-forge.jar.disabled`
- 目标文件：`mods/DistantHorizons-3.3.3-1.20.1-fabric-forge.jar.disabled`
- 目标版本来源：[版本页面](https://modrinth.com/mod/uCdwusMi/version/6UnEfsRQ)；PCL。
- 依赖记录：API 未声明（不等于无依赖）。
- 测试记录：2026-10-04 已完成索引静态检查；游戏内功能测试待用户执行。
- 备注：保持 .disabled 状态；入索引不代表启用，功能测试需另行确认测试方式。2026-10-04 按本清单固定目标写入 index，纳入本轮提交。

### 4. Entity Culling

- 状态：已入包，待用户测试。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/entityculling-forge-1.9.3-mc1.20.1.jar`
- 目标文件：`mods/entityculling-forge-1.11.2-mc1.20.1.jar`
- 目标版本来源：[版本页面](https://modrinth.com/mod/NNAgCjsB/version/HPDH6g5B)；PCL。
- 依赖记录：API 未声明（不等于无依赖）。
- 测试记录：2026-10-04 已完成索引静态检查；游戏内功能测试待用户执行。
- 备注：2026-10-04 按本清单固定目标写入 index，纳入本轮提交。

### 5. Farmer's Delight

- 状态：已入包，待用户测试。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/FarmersDelight-1.20.1-1.2.9.jar`
- 目标文件：`mods/FarmersDelight-1.20.1-1.3.4.jar`
- 目标版本来源：[版本页面](https://modrinth.com/mod/R2OftAxM/version/SiIpcZzM)；PCL。
- 依赖记录：API 未声明（不等于无依赖）。
- 测试记录：2026-10-04 已完成索引静态检查；游戏内功能测试待用户执行。
- 备注：2026-10-04 按本清单固定目标写入 index，纳入本轮提交。

### 6. First-person Model

- 状态：已入包。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/firstperson-forge-2.5.0-mc1.20.1.jar`
- 目标文件：`mods/firstperson-forge-2.7.3-mc1.20.1.jar`
- 目标版本来源：[版本页面](https://modrinth.com/mod/H5XMjpHi/version/kxFDUOmS)；PCL。
- 【过时，保留旧依赖记录；不再作为已确认的强制依赖结论】依赖记录：必需: Not Enough Animations。
- 状态更新（2026-10-09）：模组审查 JSON 保存的 First-person Model 2.7.3 顶层 JAR 声明只列 Minecraft，与上条记录不一致。当前将 NEA 的“必需”结论标为待复核；原参考 JAR 位于本机不可用的 D 盘路径，本轮没有重新取得并验证它。保留两者现有安装，不据此删除 NEA。
- 测试记录：待填写。
- 备注：已与当前索引的目标路径、两种哈希及大小核对一致；对应提交 26084b3。

### 7. Fruit's Delight

- 状态：已入包，待用户测试。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/fruitsdelight-1.1.1.jar`
- 目标文件：`mods/fruitsdelight-1.1.3.jar`
- 目标版本来源：[版本页面](https://www.curseforge.com/minecraft/mc-mods/fruits-delight/files/8304691)；PCL。
- 依赖记录：必需: Farmer's Delight >=1.20.1-1.2.2；L2Harvester >=0.1.2 已内置于目标 JAR。
- 测试记录：2026-10-04 已完成索引静态检查；游戏内功能测试待用户执行。
- 备注：2026-10-04 按本清单固定目标写入 index，纳入本轮提交。两种哈希、大小及依赖已从本地参考 JAR 核对；后续已从官方文件列表确认 1.1.3 为当前最新 Forge 1.20.1 版本。

### 8. FTB Chunks

- 状态：已入包，待用户测试。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/ftb-chunks-forge-2001.3.6.jar`
- 目标文件：`mods/ftb-chunks-forge-2001.3.8.jar`
- 目标版本来源：[版本页面](https://www.curseforge.com/minecraft/mc-mods/ftb-chunks-forge/files/8216874)；PCL。
- 依赖记录：必需: Forge >=47.1.47、Architectury >=9.1.12、FTB Library >=2001.2.9、FTB Teams >=2001.3.1；本包及本轮目标满足声明范围。
- 测试记录：2026-10-04 已完成索引静态检查；游戏内功能测试待用户执行。
- 备注：2026-10-04 按本清单固定目标写入 index，纳入本轮提交。

### 9. FTB Library

- 状态：已入包，待用户测试。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/ftb-library-forge-2001.2.10.jar`
- 目标文件：`mods/ftb-library-forge-2001.2.13.jar`
- 目标版本来源：[版本页面](https://www.curseforge.com/minecraft/mc-mods/ftb-library-forge/files/8226927)；PCL。
- 依赖记录：必需: Forge >=47.3、Architectury >=9.0.8；本包满足声明范围。可选 FTB Quests >=2001.4.8（当前未安装）。
- 测试记录：2026-10-04 已完成索引静态检查；游戏内功能测试待用户执行。
- 备注：2026-10-04 按本清单固定目标写入 index，纳入本轮提交。

### 10. FTB Teams

- 状态：已入包，待用户测试。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/ftb-teams-forge-2001.3.1.jar`
- 目标文件：`mods/ftb-teams-forge-2001.3.2.jar`
- 目标版本来源：[版本页面](https://www.curseforge.com/minecraft/mc-mods/ftb-teams-forge/files/7499810)；PCL。
- 依赖记录：必需: Forge >=47.1.47、Architectury >=9.1.12、FTB Library >=2001.2.0；本包及本轮目标满足声明范围。
- 测试记录：2026-10-04 已完成索引静态检查；游戏内功能测试待用户执行。
- 备注：2026-10-04 按本清单固定目标写入 index，纳入本轮提交。

### 11. IMBlocker

- 状态：已入包，待用户重新测试。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/IMBlocker-5.4.5-forge+1.17-1.20.4.jar`
- 目标文件：`mods/IMBlocker-5.6.2.1-forge+1.17-1.20.4.jar`
- 目标版本来源：[版本页面](https://modrinth.com/mod/WMDesFsZ/version/nRLlzGpB)；2026-10-04 Modrinth API 最新匹配版本。
- 依赖记录：API 未声明（不等于无依赖）。
- 测试记录：2026-10-04 索引静态检查通过；本轮组合的启动、入服与功能测试待用户执行。
- 备注：2026-10-04 按用户要求更新到最新匹配版本，纳入本轮提交。

### 12. Immersive Paintings

- 状态：已入包，待用户测试。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/immersive_paintings-0.6.8+1.20.1-forge.jar`
- 目标文件：`mods/immersive_paintings-0.6.13+1.20.1-forge.jar`
- 目标版本来源：[版本页面](https://modrinth.com/mod/6txNkua3/version/DYpJU8lA)；PCL。
- 依赖记录：API 未声明（不等于无依赖）。
- 测试记录：2026-10-04 已完成索引静态检查；游戏内功能测试待用户执行。
- 备注：2026-10-04 按本清单固定目标写入 index，纳入本轮提交。

### 13. Jade 🔍

- 状态：已入包，待用户测试。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/Jade-1.20.1-Forge-11.13.2.jar`
- 目标文件：`mods/Jade-1.20.1-Forge-11.13.3.jar`
- 目标版本来源：[版本页面](https://modrinth.com/mod/nvQzSEkH/version/xJQHCmWJ)；PCL。
- 依赖记录：可选: Just Enough Items (JEI)。
- 测试记录：2026-10-04 已完成索引静态检查；游戏内功能测试待用户执行。
- 备注：2026-10-04 按本清单固定目标写入 index，纳入本轮提交。

### 14. Just Enough Effect Descriptions (JEED)

- 状态：已入包，待用户测试。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/jeed-1.20-2.2.5.jar`
- 目标文件：`mods/jeed-1.20-2.2.6.jar`
- 目标版本来源：[版本页面](https://modrinth.com/mod/EO27GKs1/version/6zbEptBe)；PCL。
- 依赖记录：可选: Stylish Effects; 可选: Roughly Enough Items (REI); 可选: EMI; 可选: Just Enough Items (JEI)。
- 测试记录：2026-10-04 已完成索引静态检查；游戏内功能测试待用户执行。
- 备注：2026-10-04 按本清单固定目标写入 index，纳入本轮提交。

### 15. Just Enough Items (JEI)

- 状态：从故障目标 15.62.0.217 回退至 15.56.0.205，已写入 index，待用户测试。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常：森罗油脂及普通物品的 R/U 查询、普通配方填充、仓管 JEI 材料请求。
- 讨论时原文件：`mods/jei-1.20.1-forge-15.20.0.116.jar`
- 当前文件：`mods/jei-1.20.1-forge-15.56.0.205.jar`
- 当前版本来源：[Modrinth 15.56.0.205](https://modrinth.com/mod/jei/version/9jqubC9n)；2026-10-04 官方 API 查询记录，Forge 1.20.1，release。
- 依赖记录：该版本 API 元数据未列出依赖；本轮不新增 MezzConfig 或 MezzConfigGUI，不修改顶层 dependencies。
- 失败记录：2026-10-04 使用 JEI 15.62.0.217 + 仓管 1.15.6，对森罗油脂按 R 时崩溃。首个异常为 JEIRecipeTransferHook 找不到 RecipeTransferButton.onClose，随后发生渲染空指针。[同类报告 #52](https://github.com/zxy19/maid_storage_manager/issues/52)。
- 回退依据：15.57.0.207 的[固定书签配方填充变更](https://github.com/mezz/JustEnoughItems/commit/60690aa03f113cb555ecca05d382359620bdfed6)将 onClose 改为 onSuccessfulTransfer，并增加 update 重载；205 对应源码仍保留仓管依赖的字段、旧 UserInput 路径和方法签名。此为源码检查结论，尚非游戏验证。
- 决策记录：217 崩溃后曾暂时恢复 116；用户现决定尝试故障边界之前的 205。
- [ ] **未来升级 JEI 前检查仓管是否已修复此兼容问题**：跟进上述 #52、仓管发行日志和修复代码，确认 onClose、UserInput 路径及 update 注入签名已适配，并确认修复已进入所用 Forge 1.20.1 发布 JAR；修复版仓管与拟升级 JEI 通过上述游戏测试后，再解除 15.56.0.205 暂定版本限制。
- 验证记录：2026-10-04 索引静态检查通过，只有 JEI 条目变化，其余 98 条不变，无新增排序错位；未下载 JAR、未修改测试实例；该回退现纳入本轮提交。

### 16. JustEnoughCharacters

- 状态：已入包，待用户测试。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/jecharacters-1.20.1-forge-4.5.16.jar`
- 目标文件：`mods/jecharacters-1.20.1-forge-4.6.11.jar`
- 目标版本来源：[版本页面](https://modrinth.com/mod/I7k4B65h/version/oUqz8dp4)；PCL。
- 依赖记录：API 未声明（不等于无依赖）。
- 测试记录：2026-10-04 已完成索引静态检查；游戏内功能测试待用户执行。
- 备注：2026-10-04 按本清单固定目标写入 index，纳入本轮提交。

### 17. Kaleidoscope Cookery

**重点测试：见本文顶部更新总结与测试清单。**

- 状态：已入包，待用户重新测试。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/kaleidoscopecookery-1.1.0-forge+mc1.20.1.jar`
- 目标文件：`mods/kaleidoscopecookery-1.6.0-forge+mc1.20.1.jar`
- 目标版本来源：[版本页面](https://modrinth.com/mod/v17FatAc/version/Ghp0qCKY)；2026-10-04 Modrinth API 最新匹配版本。
- 依赖记录：API 未声明（不等于无依赖）。
- 测试记录：2026-10-04 索引静态检查通过；本轮组合的启动、入服与功能测试待用户执行。
- 备注：2026-10-04 按用户要求更新到最新匹配版本，纳入本轮提交。

### 18. ModernFix

- 状态：已入包，待用户重新测试。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/modernfix-forge-5.24.4+mc1.20.1.jar`
- 目标文件：`mods/modernfix-forge-5.27.85+mc1.20.1.jar`
- 目标版本来源：[版本页面](https://modrinth.com/mod/nmDcB62a/version/hHwYTQwa)；2026-10-04 Modrinth API 最新匹配版本。
- 依赖记录：API 未声明（不等于无依赖）。
- 测试记录：2026-10-04 索引静态检查通过；本轮组合的启动、入服与功能测试待用户执行。
- 备注：2026-10-04 按用户要求更新到最新匹配版本，纳入本轮提交。

### 19. Net Music

**重点测试：见本文顶部更新总结与测试清单。**

- 状态：已入包，待用户重新测试。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/netmusic-1.1.8-forge+mc1.20.1.jar`
- 目标文件：`mods/netmusic-1.5.2-forge+mc1.20.1.jar`
- 目标版本来源：[版本页面](https://modrinth.com/mod/gKNuqaQq/version/QbkPicTz)；2026-10-04 Modrinth API 最新匹配版本。
- 依赖记录：API 未声明；本地 JAR 声明可选 Touhou Little Maid >=1.5.2，当前目标 1.5.3 满足范围。
- 测试记录：2026-10-04 索引静态检查通过；本轮组合的启动、入服与功能测试待用户执行。
- 备注：2026-10-04 按用户要求更新到最新匹配版本，纳入本轮提交。

### 20. No Chat Reports

- 状态：已入包，待用户测试。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/NoChatReports-FORGE-1.20.1-v2.2.2.jar`
- 目标文件：`mods/NoChatReports-FORGE-1.20.1-v2.2.3.jar`
- 目标版本来源：[版本页面](https://modrinth.com/mod/qQyHxfxd/version/2XUIKIAa)；Modrinth API。
- 依赖记录：API 未声明（不等于无依赖）。
- 测试记录：2026-10-04 已完成索引静态检查；游戏内功能测试待用户执行。
- 备注：2026-10-04 按本清单固定目标写入 index，纳入本轮提交。

### 21. Not Enough Animations

- 状态：已入包。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/notenoughanimations-forge-1.10.6-mc1.20.1.jar`
- 目标文件：`mods/notenoughanimations-forge-1.12.6-mc1.20.1.jar`
- 目标版本来源：[版本页面](https://modrinth.com/mod/MPCX6s5C/version/kGjMleOz)；PCL。
- 依赖记录：API 未声明（不等于无依赖）。
- 测试记录：待填写。
- 备注：已与当前索引的目标路径、两种哈希及大小核对一致；对应提交 26084b3。

### 22. Packet Fixer

- 状态：已入包，待用户测试。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/packetfixer-3.3.0-1.18-1.20.4-merged.jar`
- 目标文件：`mods/packetfixer-3.3.2-1.18-1.20.4-merged.jar`
- 目标版本来源：[版本页面](https://modrinth.com/mod/c7m1mi73/version/9F4NGhGR)；PCL。
- 依赖记录：API 未声明（不等于无依赖）。
- 测试记录：2026-10-04 已完成索引静态检查；游戏内功能测试待用户执行。
- 备注：2026-10-04 按本清单固定目标写入 index，纳入本轮提交。

### 23. Patchouli

- 状态：已入包，待用户测试。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/Patchouli-1.20.1-84.1-FORGE.jar`
- 目标文件：`mods/Patchouli-1.20.1-85-FORGE.jar`
- 目标版本来源：[版本页面](https://modrinth.com/mod/nU0bVIaL/version/94dtOLgZ)；PCL。
- 依赖记录：API 未声明（不等于无依赖）。
- 测试记录：2026-10-04 已完成索引静态检查；游戏内功能测试待用户执行。
- 备注：2026-10-04 按本清单固定目标写入 index，纳入本轮提交。

### 24. Touhou Little Maid

**重点测试：见本文顶部更新总结与测试清单。**

- 状态：已入包，待用户重新测试。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/touhoulittlemaid-1.4.0-forge+mc1.20.1.jar`
- 目标文件：`mods/touhoulittlemaid-1.5.3-forge+mc1.20.1.jar`
- 目标版本来源：[版本页面](https://modrinth.com/mod/R0bDWFAW/version/g1SKoGQJ)；2026-10-04 Modrinth API 最新匹配版本。
- 依赖记录：API 未声明（不等于无依赖）。
- 测试记录：2026-10-04 索引静态检查通过；本轮组合的启动、入服与功能测试待用户执行。
- 备注：2026-10-04 按用户要求写入 1.5.3，纳入本轮提交。本地目标 JAR 两种哈希和大小核对通过，并确认包含 ITool；用于解决女仆仓储 1.15.6 + TLM 1.4.0 的缺类根因，是否完整恢复需复测。

### 25. Yes Steve Model

- 状态：已入包。
- [x] 已入包（或已写入 index）
- [ ] 已测试正常（游戏内检查功能）
- 讨论时原文件：`mods/ysm-2.5.1-forge+mc1.20.1-release.jar`
- 目标文件：`mods/ysm-2.6.5-forge+mc1.20.1-release.jar`
- 目标版本来源：[版本页面](https://modrinth.com/mod/86xjpqqS/version/Zqooxsd2)；PCL。
- 依赖记录：API 未声明（不等于无依赖）。
- 测试记录：待填写。
- 备注：已与当前索引的目标路径、两种哈希及大小核对一致；对应提交 26084b3。

## 当时确认不更新（35 项）

保留历史决策，以下不计入本轮更新 TODO；如需重开，先重新讨论。

| 模组 | 当时候选版本 | 决策 |
| --- | --- | --- |
| (Sodium) Chloride | 1.8.1-FORGE-1.20.1 | 确认不更新 |
| amendments-1.20-2.2.3.jar | amendments-1.20-2.2.6.jar | 确认不更新 |
| Create | mc1.20.1-6.0.8 | 确认不更新 |
| Create Big Cannons | 5.11.4 | 确认不更新 |
| Create Crafts & Additions | forge-1.20.1-1.3.3 | 确认不更新 |
| Create Deco | 2.0.3-1.20.1-forge | 确认不更新 |
| Create Jetpack | 4.4.6 | 确认不更新 |
| Create Railways Navigator | 1.20.1-beta-0.10.0-C6 | 确认不更新 |
| Create Train Utilities (Create Train Doors) | 3.1.0-C6 | 确认不更新 |
| Create: Bells & Whistles | 0.4.5-1.20.x | 确认不更新 |
| Create: Central Kitchen | 1.5.1 | 确认不更新 |
| Create: Copycats+ | 3.0.10+mc.1.20.1-forge | 确认不更新 |
| Create: Framed | 1.7.1+1.20.1 | 确认不更新 |
| Create: Interiors | interiors-0.5.6+forge-mc1.20.1-local.jar | 确认不更新 |
| Create: Misc and Things | 4.1.0 | 确认不更新 |
| Create: Numismatics | 1.1.0+forge-mc1.20.1 | 确认不更新 |
| Create: Pantographs & Wires | 1.20.1-beta-0.2.3-C6 | 确认不更新 |
| Create: Power Loader | 2.0.3-mc1.20.1 | 确认不更新 |
| Create: Steam 'n' Rails | 1.7.3+forge-mc1.20.1 | 确认不更新 |
| Create: Trading floor | 2.0.5 | 确认不更新 |
| ctl-forge-1.0.0.jar | ctl-forge-1.2.0-C6.jar | 确认不更新 |
| Drippy Loading Screen | 3.1.5-1.20.1-forge | 确认不更新 |
| FancyMenu | 3.9.14-1.20.1-forge | 确认不更新 |
| Inv View Forge/NeoForge | 4.2.1-forge+1.20.1 | 确认不更新 |
| Iris & Oculus Flywheel Compat | 2.0.3 | 确认不更新 |
| Jupiter | 2.3.7-1.20.1-forge | 确认不更新 |
| Kotlin for Forge | 4.12.0 | 确认不更新 |
| KubeJS | 2001.6.5-build.26+forge | 确认不更新 |
| KubeJS Create | 2001.3.0-build.8+forge | 确认不更新 |
| Moonlight Lib | 1.20-2.16.35-forge | 确认不更新 |
| One Enough Item | 1.0.8 | 确认不更新 |
| One Enough Lib | 0.2.4.1 | 确认不更新 |
| Ritchie's Projectile Library | 2.1.1 | 确认不更新 |
| Supplementaries | 1.20-3.1.43-forge | 确认不更新 |
| Yuushya Townscape | 2.3.0 | 确认不更新 |

## 来源与后续维护

- 原始检查目录：`D:\mydata\Agents\Minecraft相关\更新检查\2026-09-30`，以 PCL 确认表为准。
- 最终决策文件：`更新记录/2026-10-01_更新确认/模组更新决策-2026-10-01T12-21-41-009Z.json`（位于上述 Agent 工作目录）。
- 【历史阶段说明，作为当前进度已过时】曾经生成的 25 项完整更新索引已备份，随后按用户要求回退并分批更新；不能据此把 25 项全部标为已入包。
- 【旧发布版本已过时，保留原记录】TrainResync 1.6.0.f 是后续新增任务，保留在 [整合包待办](todo-list.md)，不混入这次历史 25 项清单。
- 实施时逐项更新此文件；测试未通过时保留“已入包”，在测试记录中写明问题，若回退目标版本则恢复“未入包”。
