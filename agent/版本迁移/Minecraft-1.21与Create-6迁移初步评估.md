# 新岛铁道迁移至 Minecraft 1.21 与 Create 6：初步评估

> 配套报告：[主服 NF1.21.1 模组迁移扫描](主服NF1.21.1模组迁移扫描.md)，含 107 项分类统计及逐模组证据。本文保留路线、风险与初步工作量假设。

核对日期：2026-10-16。性质：独立分析报告，不是升级实施计划或兼容性验收。

## 结论

**可以研究迁移，但对于新岛铁道，这是一次难度较高的整包迁移，不能按日常更新模组处理。** Create 本体已有目标版本，真正决定可行性的是铁道附属组合、自研 TrainResync、脚本与配置，以及已有世界中的列车和建筑能否完整保留。

本报告暂将用户所说的“1.21”具体化为 **Minecraft 1.21.1 + NeoForge + Create 6.x + Java 21**，作为评估目标，尚未由用户确定实施版本。不能把 1.21、1.21.1 和后续 1.21.x 当作相同兼容环境；Create 的开发文档明确提供了 1.21.1 NeoForge 路线。[Create 开发文档](https://wiki.createmod.net/developers/depend-on-create/neoforge-1.21.1)

| 目标 | 初步难度 | 主要限制 |
| --- | --- | --- |
| 保留 1.20.1／Forge，只升级 Create 6 | 中高 | 仍需更新整套 Create 附属、适配 TrainResync；省去 Minecraft 和加载器迁移，但绝非只换 Create JAR |
| 1.21.1／NeoForge／Create 6，允许替换部分模组、使用新世界 | 高，但较容易划定范围 | 核心功能是否有替代，是否接受第三方移植与功能取舍 |
| 同时完整保留现有模组功能、建筑、列车和服务器存档 | 很高，尚不能保证可行 | 缺失模组、注册 ID／数据迁移、自研补丁和旧列车数据；单个核心缺口就可能阻塞 |

**建议先做核心铁道依赖矩阵，再决定是否立项。** 如果主要想要 Create 6 的功能，优先比较“1.20.1 上升级 Create 6”这条较小范围路线；若确实需要 1.21 内容，再承担跨 Minecraft／加载器迁移成本。这里仅提出路线，不授权替换任何模组。

## 本包的实际起点

本次读取 `pack/modrinth.index.json`、`pack/overrides/`、`agent/整合包自定义功能.md`，以及本机 TrainResync 源码，得到：

- Minecraft **1.20.1**、Forge **47.4.6**，Create **0.5.1.j**。
- 安装索引 **111 个条目**：108 个启用的 `mods/*.jar`、1 个禁用的 Distant Horizons、1 个光影 ZIP、1 个 MCEF 原生库 ZIP。不是 111 个启用模组。
- `pack/overrides/mods/` 另有 **TrainResync 1.6.0.g** 和未跟踪的 `shader-switch-debug-0.1.0.jar`；此为扫描时的历史基线，本次未改动它们。后续已更新为 TrainResync h 与临时 helper 0.1.8；helper 仅供本机测试，不随正式包发布。
- KubeJS 目录实际有 **23 份 JS、37 份 JSON**；涉及配方、掉落、标签、OEI 替换、列车燃料、飞机燃料和本地化。JSON 并非全部是数据包文件，不能全部套用同一种转换规则。
- 铁道核心包含 Steam ’n’ Rails 1.6.7、Railways Navigator beta 0.8.4、Pantographs & Wires beta 0.1.1、Extended Bogeys 0.5.14，以及 CTL、Train Utilities 等；Create 附属还包含 Copycats、Central Kitchen、Numismatics、Big Cannons 等。
- TrainResync 的实际源码目录为 `C:/mydata/Repositories/Create-Train-Resync/TrainResync/`；编译目标为 Minecraft 1.20.1、Forge 47.2.0、Java 17、Create 0.5.1.j。编译 Forge 版本与整合包运行版本不同，不代表此次发现错误。

这里是包内静态基线，**不是线上两服的实际运行清单，也没有读取真实世界数据**。

## 已核对的关键目标版本

以下依据 2026-10-16 实时读取的 Modrinth 公开版本 API；筛选条件为 `game_versions` 包含 `1.21.1` 且 `loaders` 包含 `neoforge`。列出的版本只是该筛选结果首项，**不是已解出依赖交集的推荐安装组合**，未逐项锁定 Create 小版本、前置版本或测试共存。

| 项目 | 查询结果 | 对本包的意义 |
| --- | --- | --- |
| Create | `6.0.10+mc1.21.1`；1.20.1 Forge 另有 `mc1.20.1-6.0.8` | 本体不是缺口；只升 Create 的备选路线真实存在 |
| 官方 Steam ’n’ Rails | 目标组合返回 0 项；1.20.1 Forge 查询首项为 `1.7.3+forge-mc1.20.1` | 本次未找到官方 Modrinth 的 1.21.1 NeoForge 发行，不能直接沿用旧 JAR；这不等于全网不存在开发构建 |
| Steam ’n’ Rails NeoForge 非官方移植 | `0.3.0-beta.2+neoforge-mc1.21.1` | 存在替代候选，但换维护者／分支，须单独验证存档、轨道、车轮、信号和与其他附属的联动 |
| Create Railways Navigator | `1.21.1-beta-0.10.0-C6` | 有目标候选，仍需验证现有车站、显示板和时刻表迁移 |
| Pantographs & Wires | `1.21.1-beta-0.2.3-C6` | 有目标候选，但旧版接触网和 TrainResync 注入点仍要迁移 |
| KubeJS Create | `2101.3.1-build.18` | 存在桥接版本，不代表旧脚本原封不动可运行 |
| Extended Bogeys | 发现独立项目 Blocks & Bogies 的 1.21.1 发行及其旧实现修复说明 | 仅证明有功能候选，未证明可直接继承 `extendedbogeys` 方块、车轮样式和列车数据 |

可复查的 API：[Create](https://api.modrinth.com/v2/project/create/version)、[官方 Steam ’n’ Rails](https://api.modrinth.com/v2/project/create-steam-n-rails/version)、[非官方移植](https://api.modrinth.com/v2/project/create-steam-n-rails-1.21.1/version)、[Navigator](https://api.modrinth.com/v2/project/create-railways-navigator/version)、[Pantographs & Wires](https://api.modrinth.com/v2/project/VzdCnMqW/version)、[KubeJS Create](https://api.modrinth.com/v2/project/kubejs-create/version)。

非官方 Steam ’n’ Rails 页面明确说明自身是 fork，且只积极支持最新 Create；不能据此推定任意 Create 6 版本都兼容。[项目说明](https://modrinth.com/mod/create-steam-n-rails-1.21.1)。Blocks & Bogies 的发行说明也列有已知车轮问题，适合作为调查对象，不应直接认定是无损替代。[发行说明](https://modrinth.com/mod/blocks-bogies/version/1.0.0)

## 最费力的部分

### 1. 铁道系统要作为整体迁移

本站以铁道为核心，不能用“其他大部分模组都支持”证明可迁移。轨道、车轮、组装列车、时刻表、接触网、区块加载和客户端同步互有关联。即使各模组都能单独启动，它们的组合仍可能有功能冲突。

应最先确定 Create、Steam ’n’ Rails、Navigator、Pantographs & Wires、Extended Bogeys／替代项、Train Utilities、CTL、TrainResync 的共同可用组合。对替代模组，应明确旧命名空间和存档读取是否被支持；功能相似不等于旧存档兼容。

### 2. TrainResync 属于源码移植

本机 `gradle.properties`、`build.gradle`、`trainresync.mixins.json` 显示项目使用 ForgeGradle、Java 17，并绑定旧 Create 和若干附属库。Mixin 不只涉及列车，还涉及受电弓、车灯、液体引擎、女仆、实体拴绳和 MCEF。

例如 `TrainMixin.java` 直接面向 Create 的 `Train` 类，并注入 `read`、`earlyTick`。迁移时要核对类路径、方法签名、数据结构及注入语义；原版或上游已修复的逻辑应重新判断是否保留。配置中的开放版本范围 `[0.5.1.j,)` 只是加载约束，**不是已支持 Create 6 的证据**。

跨到 NeoForge 还涉及构建工具、事件／网络注册和依赖声明。此次只抽查了架构和注入位置，没有逐方法评估或试编译，无法给出精确代码修改量。

### 3. 脚本、数据与物品整合需逐项复核

跨越 1.20.5 会遇到物品数据组件变化；1.21 将若干数据包目录从复数改为单数，例如 `recipes → recipe`、`loot_tables → loot_table`、`tags/blocks → tags/block`。本包已有实际命中这些路径的文件，不能只调整 pack_format。[Minecraft 1.20.5 变更](https://www.minecraft.net/fr-ca/article/minecraft-java-edition-1-20-5)、[Minecraft 1.21 目录变更](https://www.minecraft.net/nl-nl/article/minecraft-java-edition-1-21)

KubeJS 也有 1.21／1.21.1 大版本变化。需要逐项核对 Create 配方格式、标签、物品 ID、NBT／组件使用和事件 API。OEI 自定义目录、飞机燃料等模组专用数据格式应按各自目标版本检查，不能机械改名。[KubeJS 7.0 说明](https://kubejs.com/wiki/other/major-updates/7.0)、[7.2 说明](https://kubejs.com/wiki/other/major-updates/7.2)

23 份脚本本身不算巨大；更难的是验证每条配方和映射仍指向正确物品，以及新版本上游是否已改变配方平衡。

### 4. 渲染、菜单和生活内容也需要新的依赖组合

- 现有 Embeddium／Oculus／Flywheel 兼容链不能直接搬到新加载器；需核对目标渲染方案与 Create 的版本交集、光影和列车性能。
- FancyMenu、MCEF、背景视频及原生库路径要复测；MP4 素材通常可复用，实际播放能力取决于新版本客户端链路。
- YSM、Yuushya、东方女仆及附属、森罗系列、OEI、食物系列和地形生成模组，都属于保留本包体验的重要部分。**本次未逐项查询它们是否存在目标版本，不把它们列为已兼容或已缺失。**
- VanillaBackport 等回移植模组应重新判断保留范围，不能以“升到 1.21”就认定全部重复，因为其内容可能来自更晚版本。

### 5. 旧世界与双服迁移风险最高

要验证的不只是能进世界，还包括已有铁路网、列车组装状态、转向架、站台、动力装置、容器物品、玩家背包、FTB 领地、女仆实体和自定义模型。缺失注册 ID 或格式变化可能导致内容丢失，也可能表现为无报错但功能失效。

原版世界升级机制不等于模组世界保证兼容。替换内容模组前应先定义旧 ID 的映射和退路。只能用完整世界副本做迁移试验，回退依靠旧版本整套备份，不尝试把升级保存后的世界直接降级。

两服启动环境、Java 21、NeoForge 安装方式、共享 mods 和 `.ablink` 分发源也需同步调整；仅修改客户端安装索引不构成完成。Java 21 要求见 [NeoForge 官方迁移说明](https://neoforged.net/news/20.5release/)。

## 初步工作量

以下是工程判断，按熟悉本包的人实际投入的人日粗估，不是承诺工期；不包含等待上游移植、重写缺失大型模组或大量手动修复世界。

| 阶段 | 初步投入 | 产出与限制 |
| --- | --- | --- |
| 全包目标版本、依赖与功能取舍审计 | 1～3 人日 | 精确版本矩阵、核心阻塞项；这是下一步最有价值的工作 |
| 最小铁道组合与 TrainResync 移植验证 | 3～10 人日 | 可能更久；前提是核心附属已有可用版本且无需代维护大型 fork |
| 其余模组、KJS／数据／配置、客户端界面迁移 | 3～7 人日 | 允许有限替代时的估算；要求完整保留功能会增大不确定性 |
| 旧世界副本、双服与多人回归 | 3～10 人日 | 依赖世界规模、铁路数量和发现的问题；线上长期稳定还需观察 |

因此，**允许合理取舍的完整迁移可先按约 10～30 人日量级理解**；新世界原型可能更快，但不等于整包完成。若必须原样保留现有世界和全部功能，暂时不应给确定期限；一项关键模组无可行迁移路径就可能使项目等待数月或不得不缩减范围。

## 建议的下一步与停止条件

1. 确定用户目标：主要需要 Create 6，还是必须同时要 1.21.1；旧世界是否必须保留，能否接受非官方移植和少量替代。
2. 只做元数据审计，建立所有启用模组及随包 JAR 的目标版本矩阵；先把核心铁道组合和 TrainResync列为第一优先级。不要按各自最新版直接拼包。
3. 若核心依赖没有交集，或不能接受缺失功能，停在评估阶段，不开始搬整个包。
4. 若核心路线可行，再按仓库规则提交独立测试实例计划，说明来源、路径、磁盘／内存和清理方式，批准后才建立测试实例。
5. 分别通过新世界功能测试与旧世界副本迁移测试，再讨论是否替换正式环境。

本次没有下载模组 JAR、搭建实例、启动游戏、修改安装索引、移植 TrainResync 或操作服务器。现有未提交改动保持原状；只新增本报告。对整个包的兼容百分比、精确工期及旧存档可无损升级，当前证据均不足以作结论。
