# 主服 NeoForge 1.21.1／Create 6 模组迁移扫描

> 配套报告：[Minecraft 1.21 与 Create 6 迁移初步评估](Minecraft-1.21与Create-6迁移初步评估.md)，说明迁移路线、风险与初步工作量。本报告补充主服发行可用性，不代表已验证整包兼容。

日期：2026-10-16。目标：主服升级到 Minecraft 1.21.1、NeoForge、Create 6，并尽量保留旧世界。本文是发行可用性扫描，不是可直接安装的锁定清单，也不是存档迁移验收。

## 结论与统计口径

**当前主服分发源的 107 个 JAR 条目中，96 项已找到原项目发布的 NeoForge 1.21.1 版本；不是上百个模组都要自行移植。** 但剩余少数项目恰好涉及列车、车轮、红石装置和本地补丁，且官方发行存在并不保证旧存档无损。

| 分类（互斥计数） | 数量 | 含义 |
| --- | ---: | --- |
| A 原项目有官方目标发行 | 96 | 88 项由 Modrinth API 核对，8 项由原 CurseForge 项目文件页核对 |
| B 有明确非官方移植 | 3 | Steam ’n’ Rails、Infinity Buttons、Gauges & Switches |
| C 有目标功能替代／后继实现，未证明原数据兼容 | 2 | AlwaysEat、Extended Bogeys |
| D 本地代码需自行适配 | 2 | TrainResync、Create Track Map 的 AshBill 补丁；后者可利用已有 fork |
| E 尚未找到目标发行，需要自制迁移／重写或取舍 | 3 | Peculiars、No More Piglin Portal Spawning、Nature’s Spirit–Create Recipe Compat |
| F 上游明确说明不再需要 | 1 | Memory Leak Fix |
| **合计** | **107** | 每个当前 JAR 条目只计一次；不是模组注册 ID 数量 |

基线为本地 `server/shared/mods/` 与 `server/create-cn/mods/`，不是创造服 `train-cn`，不是客户端全部模组。`.ablink` 去掉扩展名作为目标文件名，原生 JAR 同样计入；未下载或展开链接，也未读取线上实例的真实 mods、世界或玩家数据。服务器分发源里存在菜单／客户端辅助项目，本轮为避免遗漏全部登记，不据此认定它们必须安装在专用服务端。

“官方”指当前原项目／发行渠道上的目标版本，不代表对第三方维护史作法律或组织认证。Modrinth 查询逐个版本同时检查 `game_versions` 包含 `1.21.1` 和 `loaders` 包含 `neoforge`，不将“项目同时支持这些标签”误当成一个文件支持它们。保留 alpha／beta 标记。CF 行也核对了具体文件的游戏版本与加载器。

## B：已有非官方移植，不优先从零移植

| 当前主服 JAR | 目标候选与证据 | 保留旧世界时的工作 |
| --- | --- | --- |
| `Steam_Rails-1.6.7+forge-mc1.20.1.jar` | [Steam ’n’ Rails NeoForge](https://modrinth.com/mod/create-steam-n-rails-1.21.1)，`0.3.0-beta.2+neoforge-mc1.21.1`。原项目 API 无目标发行，fork 明确声明 unofficial | 核对轨道、宽窄轨、转向架、列车数据和信号；与 Create 的精确小版本及其他铁道附属联合测试。不能当作原官方项目直接覆盖 |
| `infinitybuttons-1.20.1-4.0.7.jar` | [Infinity Buttons NeoForge](https://www.curseforge.com/minecraft/mc-mods/infinity-buttons-neoforge/files/all)，`5.0.3-1.21.1`，作者明确标注 unofficial | 核对按钮／拉杆注册 ID、状态、红石行为及方块实体；仅文件名相似不足以证明替换无损 |
| `rsgauges-1.2.22.jar` | [Gauges, Switches & Modules](https://modrinth.com/mod/rsgauges)，`1.2.3`。该项目声明基于 Waffle 的 1.20.1 移植，继续移植到 NeoForge | 优先验证仪表和开关状态、无线配对、配方和掉落；这是第三方维护链，版本号不能与旧版按大小比较 |

## C：有替代实现，但不是原模组直接升级

| 当前主服 JAR | 目标候选与证据 | 建议 |
| --- | --- | --- |
| `AlwaysEat-5.2.jar` | 旧项目为 [suppergerrie2 的 AlwaysEat](https://www.curseforge.com/minecraft/mc-mods/alwayseat/files/all)，未见目标版本。另一个作者 ENC_Euphony 发布 [Always Eat](https://modrinth.com/mod/always-eat)，`1.0.0+neoforge`，API 确认 1.21.1 | 属于功能替代，不算官方升级或已确认源码移植。检查是否满足原黑白名单和满饱食度进食规则；也可在自研模组里实现相同需求 |
| `extendedbogeys-0.5.14-1.20.1-0.5.1.f-forge.jar` | [Create: Blocks & Bogies](https://modrinth.com/mod/blocks-bogies)，`1.0.8-1.21.1`，NeoForge，面向 Create 6；发行记录提及旧 Extended Bogeys Borked 实现 | 列车迁移高风险项。未证明沿用原注册 ID、车轮样式 ID 和序列化；必须比较旧／新数据。可能需要自己的兼容层或批量转换，不能仅换 JAR |

## D：确定存在本地适配工作

| 当前主服 JAR | 已有基础 | 我们需要做的部分 |
| --- | --- | --- |
| `trainresync-1.6.0.d-all.jar` | 本机源码最新编译配置为 1.6.0.g，但仍是 1.20.1／Forge／Create 0.5.1.j | 迁移 NeoForge 构建、网络、事件和 Mixins；逐项判断上游是否已修复旧问题。主服分发源 d 与客户端 g 不同，移植基线应按要保留的功能确定，不盲目只搬 d |
| `create-track-map-ashbill-patch-1.4+mc1.20.1-neoforge.jar` | 原 [Create Track Map](https://modrinth.com/mod/create-track-map) 无目标发行，但 [Unofficial Fork](https://modrinth.com/mod/create-track-map-unofficial-fork) 有 `2.1+1.21.1-neoforge`；[Fork Squared](https://modrinth.com/mod/create-track-map-fork-squared) 也有目标版本 | 先对照 AshBill 补丁改了什么，再选择 fork 合并本地功能，不需先从原版重做整套移植。需要恢复补丁源码／diff并检查地图协议、网页定制和配置兼容；本次未完成源码对照 |

两项不能简单合并成“两个完整模组从零移植”：TrainResync 是真正的平台移植，Track Map 更可能是 fork 上的补丁移植。最终工作量仍需读差异源码。

## E：尚未找到目标版本，保留行为时的自制候选

| 当前主服 JAR | 已检查的证据 | 建议工作与风险 |
| --- | --- | --- |
| `peculiars-1.20.1-5.0.0.jar` | [Modrinth 原项目](https://modrinth.com/mod/peculiars) API 无 NF1.21.1，且 [CurseForge 文件列表](https://www.curseforge.com/minecraft/mc-mods/peculiars/files/all) 未见目标发行；搜索未找到可确认的目标 fork | 若必须保留全部食品、放置方块及效果，是优先研究的内容模组源码移植对象。Neapolitan、Atmospheric、Blueprint 已有目标版本，可提供基础。必须核对旧物品／方块 ID 与数据，不能用删模组解决“保留旧档”要求 |
| `nopiglinportals-1.4.jar` | [No More Piglin Portal Spawning](https://www.curseforge.com/minecraft/mc-mods/no-more-piglin-portal-spawning/files/all) 显示至 1.20.1 Forge；搜索未找到可确认的 NF1.21.1 移植 | 需求是阻止传送门生成僵尸猪灵，优先评估在 TrainResync／独立小模组中重新实现；不必为了一个规则维护整个旧项目。无需把这项简单行为改变包装成 DFU 数据转换 |
| `ns-cr-rc-0.0.0.jar` | [Nature’s Spirit–Create Recipe Compat](https://modrinth.com/mod/ns-cr-rc) API 无目标发行；作者说明其为已停止维护的木材加工配方数据包 | 先检查新 Nature’s Spirit／Create 是否已覆盖原配方；缺失部分迁成 KubeJS／数据包。属于配方数据适配，不是 Java 模组移植，也不能未经核对就删掉 |

这里的“未找到”限定于本次原项目 API、CF 发行页面与公开搜索，不等于证明所有 GitHub 分支、私人构建或未来发行都不存在。Peculiars 的平台元数据标为 ARR，而其链接的旧 GitHub 仓库展示 MIT；移植前应核对**实际 5.0.0 对应代码和资源**的许可证及源码来源，不能用旧仓库许可证替整个发行包作结论。[源码仓库](https://github.com/Catscythe-Corner/Peculiars)

## F：不需要为版本升级强行移植

`memoryleakfix-forge-1.17+-1.1.5.jar`：[Memory Leak Fix 上游说明](https://modrinth.com/mod/memoryleakfix)明确表示其修复的泄漏已在 Minecraft 1.20.5+ 修复。这项应从目标方案移除，而不是列入自研移植预算；仍需在目标组合中做独立的性能／内存观察，不意味着其他模组不存在泄漏。

## A：原项目已有 NeoForge 1.21.1 发行的完整清单（96 项）

每个当前文件单独一行；“共享”表示 `server/shared/mods`，“主服”表示 `server/create-cn/mods`。版本为查询时找到的实例，Modrinth 以发布时间倒序首项展示，**不是整体可共存组合，也未承诺最新稳定版**。所有行的“官方有版”均不免除依赖、Create 6 小版本、配置和存档迁移检查。

| 序号 | 模组 | 当前文件 | 层 | NF1.21.1 目标版本实例 | 渠道 |
| ---: | --- | --- | --- | --- | --- |
| 1 | Amendments | `amendments-1.20-2.2.3.jar` | 共享 | [1.21-2.1.11](https://modrinth.com/mod/amendments/version/83ntBcVk) | release |
| 2 | AppleSkin | `appleskin-forge-mc1.20.1-2.5.1.jar` | 共享 | [3.0.9+mc1.21](https://modrinth.com/mod/appleskin/version/uAKA6Laj) | release |
| 3 | Architectury API | `architectury-9.2.14-forge.jar` | 共享 | [13.0.11+neoforge](https://modrinth.com/mod/architectury-api/version/1IiqEQGl) | release |
| 4 | Atmospheric | `atmospheric-1.20.1-6.1.1.jar` | 共享 | [7.0.1](https://modrinth.com/mod/atmospheric/version/XIvPRE4O) | release |
| 5 | Auto Restart | `AutoRestart-1.20.1-2.0.2.jar` | 共享 | [1.21.1-3.0.3](https://modrinth.com/mod/auto-restart/version/33z7jodj) | release |
| 6 | Automobility | `automobility-0.4.2+1.20.1-forge.jar` | 共享 | [0.5.0.h](https://modrinth.com/mod/automobility/version/PHugwn1A) | beta |
| 7 | Barbeque's Delight [Forge/NeoForge] | `barbequesdelight-1.0.6.jar` | 共享 | [1.3.0](https://modrinth.com/mod/barbeques-delight-forge/version/rvUhMw6d) | release |
| 8 | BlueMap | `BlueMap-5.3-forge-1.20.jar` | 主服 | [5.7-neoforge](https://modrinth.com/mod/bluemap/version/8iJcPOHJ) | release |
| 9 | Blueprint | `blueprint-1.20.1-7.1.5.jar` | 共享 | [8.2.0](https://modrinth.com/mod/blueprint/version/FHOjk8Ez) | release |
| 10 | Caelus API | `caelus-forge-3.2.0+1.20.1.jar` | 共享 | [7.0.1+1.21.1](https://modrinth.com/mod/caelus/version/KsfI4QsR) | release |
| 11 | Carry On | `carryon-forge-1.20.1-2.1.2.7.jar` | 共享 | [2.2.6](https://modrinth.com/mod/carry-on/version/PV8oLZ1q) | release |
| 12 | Cloth Config API | `cloth-config-11.1.136-forge.jar` | 共享 | [15.0.140+neoforge](https://modrinth.com/mod/cloth-config/version/izKINKFg) | release |
| 13 | Collective | `collective-1.20.1-7.94.jar` | 共享 | [1.21.1-8.53-fabric+forge+neo](https://modrinth.com/mod/collective/version/nCzFhSap) | release |
| 14 | CoroUtil | `coroutil-forge-1.20.1-1.3.7.jar` | 共享 | [1.21.0-1.3.8](https://modrinth.com/mod/coroutil/version/H2YXCYUY) | release |
| 15 | Create | `create-1.20.1-0.5.1.j.jar` | 共享 | [6.0.10+mc1.21.1](https://modrinth.com/mod/create/version/UjX6dr61) | release |
| 16 | Create Big Cannons | `createbigcannons-5.8.2-mc.1.20.1-forge.jar` | 共享 | [5.11.7](https://modrinth.com/mod/create-big-cannons/version/bOiDu0LS) | release |
| 17 | Create Crafts & Additions | `createaddition-1.20.1-1.2.5.jar` | 共享 | [neoforge-1.21.1-1.7.2](https://modrinth.com/mod/createaddition/version/hsjVajlP) | beta |
| 18 | Create Deco | `createdeco-2.0.2-1.20.1-forge.jar` | 共享 | [2.1.3](https://modrinth.com/mod/create-deco/version/qrcMVoBD) | release |
| 19 | Create Jetpack | `create_jetpack-forge-4.3.2.jar` | 共享 | [5.2.1](https://modrinth.com/mod/create-jetpack/version/sCwiqLqq) | release |
| 20 | Create Railways Navigator | `createrailwaysnavigator-forge-1.20.1-beta-0.8.4.jar` | 共享 | [1.21.1-beta-0.10.0-C6](https://modrinth.com/mod/create-railways-navigator/version/rlsRwxq3) | beta |
| 21 | Create Train Lights | `ctl-forge-1.0.0.jar` | 共享 | [1.2.0](https://modrinth.com/mod/create-train-lights/version/nZ2FO2DF) | release |
| 22 | Create Train Utilities (Create Train Doors) | `trainutilities-forge-3.0.0.jar` | 共享 | [3.1.0](https://modrinth.com/mod/create-trainutilities/version/MeF3ulWd) | release |
| 23 | Create: Bells & Whistles | `bellsandwhistles-0.4.3-1.20.x.jar` | 共享 | [v0.4.7-1.21.1](https://modrinth.com/mod/bellsandwhistles/version/w0mifib8) | release |
| 24 | Create: Central Kitchen | `create_central_kitchen-1.20.1-for-create-0.5.1.j-1.3.13.jar` | 共享 | [2.6.2b](https://modrinth.com/mod/create-central-kitchen/version/qZxkZR8W) | release |
| 25 | Create: Copycats+ | `copycats-2.2.2+mc.1.20.1-forge.jar` | 共享 | [3.0.9+mc.1.21.1-neoforge](https://modrinth.com/mod/copycats/version/bPYeUWZx) | release |
| 26 | Create: Crying Obsidian | `crushed_obsidian-1.0.1-forge-1.20.1.jar` | 共享 | [CB-1.0.1-1.21.1](https://www.curseforge.com/minecraft/mc-mods/create-crying-obsidian) | release |
| 27 | Create: Design n' Decor | `design_decor-0.4.0b-1.20.1.jar` | 共享 | [2.2b](https://modrinth.com/mod/create-design-n-decor/version/uQsIRky8) | release |
| 28 | Create: Dynamic Lights | `create-dyn-light-forge1.20.1+1.0.2.jar` | 共享 | [neoforge-2.0.1](https://modrinth.com/mod/create-dynamic-lights/version/ltFc9AWJ) | beta |
| 29 | Create: Framed | `createframed-1.20.1-1.5.6.jar` | 共享 | [1.8.2+1.21.1](https://modrinth.com/mod/create-framed/version/yioQUGiO) | release |
| 30 | Create: Interiors | `interiors-0.5.6+forge-mc1.20.1-build.104.jar` | 共享 | [0.6.1](https://modrinth.com/mod/interiors/version/gBrfZy6S) | release |
| 31 | Create: Misc and Things | `create_misc_and_things_ 1.20.1_4.0A.jar` | 共享 | [4.1.1](https://modrinth.com/mod/create-misc-and-things/version/zfExofVB) | release |
| 32 | Create: Numismatics | `CreateNumismatics-1.0.11+forge-mc1.20.1.jar` | 共享 | [1.1.0+neoforge-mc1.21.1](https://modrinth.com/mod/numismatics/version/kVi3TESX) | release |
| 33 | Create: Pantographs & Wires | `pantographsandwires-forge-1.20.1-beta-0.1.1.jar` | 共享 | [1.21.1-beta-0.2.3-C6](https://modrinth.com/mod/create-pantographs-and-wires/version/CbRqaEft) | beta |
| 34 | Create: Power Loader | `create_power_loader-1.5.0-mc1.20.1.jar` | 共享 | [2.0.5-mc1.21.1](https://modrinth.com/mod/create-power-loader/version/3Y4r0ItR) | release |
| 35 | Create: SchematicChecker | `CreateSchematicChecker-0.21.12-0.5.1j-forge-1.20.1.jar` | 主服 | [1.21.1-2.27.47-6.0-neoforge](https://modrinth.com/mod/createschematicchecker/version/RFQJoh8W) | release |
| 36 | Create: Trading floor | `trading_floor-1.1.9+forge-1.20.1.jar` | 共享 | [3.0.16](https://modrinth.com/mod/create-trading-floor/version/K3nIvcWT) | release |
| 37 | Cupboard | `cupboard-1.20.1-3.0.jar` | 主服 | [1.21.1-4.2](https://www.curseforge.com/minecraft/mc-mods/cupboard) | release |
| 38 | Curios API | `curios-forge-5.14.1+1.20.1.jar` | 共享 | [9.5.1+1.21.1](https://modrinth.com/mod/curios/version/yohfFbgD) | release |
| 39 | Distant Horizons | `DistantHorizons-3.3.3-1.20.1-fabric-forge.jar` | 主服 | [3.3.3-1.21.1](https://modrinth.com/mod/distanthorizons/version/9w34y8ai) | release |
| 40 | Elytra Slot | `elytraslot-forge-6.4.4+1.20.1.jar` | 共享 | [9.0.2+1.21.1](https://modrinth.com/mod/elytra-slot/version/RX6A02W1) | release |
| 41 | FancyMenu | `fancymenu_forge_3.7.0_MC_1.20.1.jar` | 共享 | [3.9.14-1.21.1-neoforge](https://modrinth.com/mod/fancymenu/version/P9dDosz2) | release |
| 42 | Farmer's Delight | `FarmersDelight-1.20.1-1.3.4.jar` | 共享 | [1.21.1-1.3.4](https://modrinth.com/mod/farmers-delight/version/XTVZDOol) | release |
| 43 | FerriteCore | `ferritecore-6.0.1-forge.jar` | 共享 | [7.0.3-neoforge](https://modrinth.com/mod/ferrite-core/version/x7kQWVju) | release |
| 44 | Fruits Delight | `fruitsdelight-1.1.3.jar` | 共享 | [1.2.14](https://modrinth.com/mod/fruits-delight/version/TWbuEFZt) | release |
| 45 | FTB Chunks | `ftb-chunks-forge-2001.3.8.jar` | 共享 | [2101.1.22](https://www.curseforge.com/minecraft/mc-mods/ftb-chunks-forge) | release |
| 46 | FTB Library | `ftb-library-forge-2001.2.13.jar` | 共享 | [2101.1.37](https://www.curseforge.com/minecraft/mc-mods/ftb-library-forge) | release |
| 47 | FTB Teams | `ftb-teams-forge-2001.3.2.jar` | 共享 | [2101.1.11](https://www.curseforge.com/minecraft/mc-mods/ftb-teams-forge) | release |
| 48 | GraveStone Mod | `gravestone-forge-1.20.1-1.0.35.jar` | 共享 | [neoforge-1.21.1-1.0.40](https://modrinth.com/mod/gravestone-mod/version/rMGJpjaM) | release |
| 49 | Immersive Paintings | `immersive_paintings-0.6.13+1.20.1-forge.jar` | 共享 | [0.7.9+1.21.1](https://modrinth.com/mod/immersive-paintings/version/ItQ1UJGH) | release |
| 50 | Inv View Forge/NeoForge | `inv_view_forge-2.1.0-1.20.1.jar` | 共享 | [4.2.1-neoforge+1.21.1](https://modrinth.com/mod/inv-view-forge/version/3vW6F7M1) | release |
| 51 | Jade 🔍 | `Jade-1.20.1-Forge-11.13.3.jar` | 共享 | [15.10.6+neoforge](https://modrinth.com/mod/jade/version/eYz2YBGT) | release |
| 52 | Jupiter | `Jupiter-2.2.2-forge.jar` | 共享 | [2.3.7-1.21.1-neoforge](https://modrinth.com/mod/jupiter/version/Jpcw76rq) | release |
| 53 | Just Enough Effect Descriptions (JEED) | `jeed-1.20-2.2.6.jar` | 共享 | [1.21-2.3.5](https://modrinth.com/mod/just-enough-effect-descriptions-jeed/version/3dTukOBl) | release |
| 54 | Just Enough Items (JEI) | `jei-1.20.1-forge-15.56.0.205.jar` | 共享 | [19.64.0.454](https://modrinth.com/mod/jei/version/viLBV5kx) | beta |
| 55 | Just Enough Resources (JER) | `JustEnoughResources-1.20.1-1.4.0.247.jar` | 共享 | [1.6.0.17](https://modrinth.com/mod/just-enough-resources-jer/version/TgNFki8j) | alpha |
| 56 | Kaleidoscope Cookery | `kaleidoscopecookery-1.6.0-forge+mc1.20.1.jar` | 共享 | [1.6.0-neoforge+mc1.21.1](https://modrinth.com/mod/kaleidoscope-cookery/version/g8w0b2ly) | release |
| 57 | Kaleidoscope Tavern | `kaleidoscopetavern-1.2.0-forge+mc1.20.1.jar` | 共享 | [1.2.0-neoforge+mc1.21.1](https://modrinth.com/mod/kaleidoscopetavern/version/W9ILsQt7) | release |
| 58 | Konkrete | `konkrete_forge_1.8.0_MC_1.20-1.20.1.jar` | 共享 | [1.9.9-1.21-neoforge](https://modrinth.com/mod/konkrete/version/stJDU839) | release |
| 59 | Kotlin for Forge | `kotlinforforge-4.11.0-all.jar` | 共享 | [5.12.0](https://modrinth.com/mod/kotlin-for-forge/version/uhJhCT7X) | release |
| 60 | KubeJS | `kubejs-forge-2001.6.5-build.16.jar` | 共享 | [2101.7.2-build.377](https://modrinth.com/mod/kubejs/version/THIGFPwf) | release |
| 61 | KubeJS Create | `kubejs-create-forge-2001.2.5-build.2.jar` | 共享 | [2101.3.1-build.18](https://modrinth.com/mod/kubejs-create/version/1qmcLagN) | beta |
| 62 | Limited Chunkloading | `limitedchunks-1.20.1-4.1.jar` | 主服 | [1.21-4.1（页面标注兼容1.21.1）](https://www.curseforge.com/minecraft/mc-mods/limited-chunkloading) | release |
| 63 | Maid Restaurant | `maid_restaurant-0.2.9.jar` | 共享 | [0.2.9](https://modrinth.com/mod/maid-restaurant/version/vEgMAYm3) | release |
| 64 | Maid Storage Manager | `1.20.1-maid_storage_manager-1.15.6.jar` | 共享 | [1.15.6](https://modrinth.com/mod/maid-storage-manager/version/RgLYYPvs) | beta |
| 65 | MaidAddition | `maidaddition-1.1.4-beta-all.jar` | 共享 | [1.21.1-1.0.1-beta](https://www.curseforge.com/minecraft/mc-mods/maidaddition) | beta |
| 66 | Melody | `melody_forge_1.0.3_MC_1.20.1-1.20.4.jar` | 共享 | [1.0.10-1.21-neoforge](https://modrinth.com/mod/melody/version/efcdRVZP) | release |
| 67 | ModernFix | `modernfix-forge-5.27.85+mc1.20.1.jar` | 共享 | [5.27.26+mc1.21.1](https://modrinth.com/mod/modernfix/version/7Jy58lnT) | release |
| 68 | Moonlight Lib | `moonlight-1.20-2.16.15-forge.jar` | 共享 | [1.21.1-3.7.2](https://modrinth.com/mod/moonlight/version/fAIfWX6M) | release |
| 69 | More MobGriefing Options | `MoreMobGriefingOptions-1.20.1-2.0.4.jar` | 共享 | [1.21.1-3.0.2](https://modrinth.com/mod/more-mobgriefing-options/version/ElBlQzD1) | release |
| 70 | Nature's Spirit | `natures_spirit-2.2.5-1.20.1.jar` | 共享 | [2.2.6-1.21.1](https://modrinth.com/mod/natures-spirit/version/7ywS0UWV) | release |
| 71 | Neapolitan | `neapolitan-1.20.1-5.1.0.jar` | 共享 | [6.0.1](https://modrinth.com/mod/neapolitan/version/RQ5qgaUC) | release |
| 72 | Net Music | `netmusic-1.5.2-forge+mc1.20.1.jar` | 共享 | [1.5.2-neoforge+mc1.21.1](https://modrinth.com/mod/net-music/version/ePPjVRpW) | release |
| 73 | No Chat Reports | `NoChatReports-FORGE-1.20.1-v2.2.3.jar` | 共享 | [NeoForge-1.21.1-v2.9.1](https://modrinth.com/mod/no-chat-reports/version/ZV8eL55E) | release |
| 74 | Observable | `observable-4.4.2.jar` | 共享 | [5.4.4+neoforge](https://modrinth.com/mod/observable/version/f8lSH3bs) | beta |
| 75 | One Enough Item | `OneEnoughItem-Forge-1.0.5.1.jar` | 共享 | [1.0.8](https://modrinth.com/mod/one-enough-item/version/1gXNmHrU) | release |
| 76 | Packet Fixer | `packetfixer-3.3.2-1.18-1.20.4-merged.jar` | 共享 | [3.3.1](https://modrinth.com/mod/packet-fixer/version/2C41Q8WX) | release |
| 77 | Patchouli | `Patchouli-1.20.1-85-FORGE.jar` | 共享 | [1.21.1-93-neoforge](https://modrinth.com/mod/patchouli/version/BIogJv2D) | release |
| 78 | Platform | `Platform-forge-1.20.1-1.3.4.jar` | 共享 | [1.3.3](https://modrinth.com/mod/platform/version/v7P0nBi2) | release |
| 79 | Radium | `radium-mc1.20.1-0.12.4+git.26c9d8e.jar` | 主服 | [0.13.1](https://modrinth.com/mod/radium/version/pSBrVnrI) | beta |
| 80 | Rhino | `rhino-forge-2001.2.3-build.10.jar` | 共享 | [2101.2.8-build.91+Rhino-1.21](https://modrinth.com/mod/rhino/version/SqkDvOLG) | beta |
| 81 | Ritchie's Projectile Library | `ritchiesprojectilelib-2.1.0+mc.1.20.1-forge.jar` | 共享 | [2.1.2](https://modrinth.com/mod/rpl/version/hZ6B2Z0x) | release |
| 82 | ServerCore | `servercore-forge-1.5.2+1.20.1.jar` | 主服 | [1.5.19+1.21.1](https://modrinth.com/mod/servercore/version/6N9hXiRa) | release |
| 83 | ServerWarashi | `serverwarashi-1.20.1-2.1.1.3-all.jar` | 共享 | [1.21.1-2.1.0.1（已核对实例，非最新推荐）](https://www.curseforge.com/minecraft/mc-mods/serverwarashi/files/8761706) | alpha |
| 84 | Simple Backups | `SimpleBackups-1.20.1-3.1.16.jar` | 共享 | [1.21-4.0.30](https://modrinth.com/mod/simple-backups/version/tHyCDNNH) | beta |
| 85 | Simple Planes | `simpleplanes-1.20.1-5.3.3.jar` | 共享 | [5.3.9](https://modrinth.com/mod/simple-planes/version/tGW6Zlf9) | release |
| 86 | Supplementaries | `supplementaries-1.20-3.1.18.jar` | 共享 | [1.21.1-4.0.1](https://modrinth.com/mod/supplementaries/version/p6ACSdhd) | release |
| 87 | TerraBlender | `TerraBlender-forge-1.20.1-3.0.1.10.jar` | 共享 | [4.1.0.8](https://modrinth.com/mod/terrablender/version/6e8GCrLb) | beta |
| 88 | Too Fast | `toofast-1.20-0.4.3.5.jar` | 共享 | [0.4.3.5](https://modrinth.com/mod/too-fast/version/pDkjMI8q) | release |
| 89 | Touhou Little Maid | `touhoulittlemaid-1.5.3-forge+mc1.20.1.jar` | 共享 | [1.5.3-neoforge+mc1.21.1](https://modrinth.com/mod/touhou-little-maid/version/tXG1TkGx) | release |
| 90 | Vanilla Backport | `VanillaBackport-forge-1.20.1-1.1.7.10.jar` | 共享 | [1.1.7.10](https://modrinth.com/mod/vanillabackport/version/rUSWdBok) | release |
| 91 | What Are They Up To (Watut) | `watut-forge-1.20.1-1.2.3.jar` | 共享 | [1.21.0-1.2.7](https://modrinth.com/mod/what-are-they-up-to/version/uWr2aTW9) | release |
| 92 | WorldEdit | `worldedit-mod-7.2.15.jar` | 共享 | [7.3.8](https://modrinth.com/mod/worldedit/version/WTAFvuRx) | release |
| 93 | Xaero's World Map | `xaeroworldmap-forge-1.20.1-1.47.0.jar` | 共享 | [neoforge-1.21.1-1.47.0](https://modrinth.com/mod/xaeros-world-map/version/SnQ4SoDe) | release |
| 94 | Yes Steve Model | `ysm-2.6.5-forge+mc1.20.1-release.jar` | 共享 | [2.6.5-neoforge+mc1.21.1](https://modrinth.com/mod/yes-steve-model/version/HZWaR0LY) | release |
| 95 | Yuushya Townscape | `yuushya-1.20.1-forge-2.2.3.jar` | 共享 | [2.3.0](https://modrinth.com/mod/yuushya-townscape/version/L2HpYsbq) | beta |
| 96 | Zombie Proof Doors | `zombieproofdoors-1.20.1-3.5.jar` | 共享 | [1.21.1-3.6-fabric+forge+neo](https://modrinth.com/mod/zombie-proof-doors/version/Sgadr0y8) | release |

## 对 Create 6 和旧世界的进一步约束

1. **当前 96 项数字只回答“发行存在”，不回答“共同可用”。** 部分元数据仅声明依赖 Create 项目，没有完整小版本区间；需要按选定 Create 6 版本再解依赖，并核对 Flywheel、Ponder、Registrate、DragonLib 等新增／变化的前置。不能只搬现有 107 个文件而忽略新依赖。
2. 本轮发现女仆本体、女仆仓管、女仆餐厅、MaidAddition、森罗烹饪／酒馆、YSM、Yuushya、Simple Planes、FTB 三件套均已有目标发行；先前“可能都要自行移植”的宽泛担忧应收窄。
3. **最高优先级依然是 TrainResync + Steam ’n’ Rails fork + Extended Bogeys 旧列车数据迁移。** 后者即使有新车轮模组，也可能要自制读取／映射旧车轮状态的兼容代码。
4. Infinity Buttons 和 RsGauges 涉及既有建筑装置，应比较注册表和方块状态，不仅验证新建世界可以摆放。
5. 内容模组如 Yuushya、Copycats、Nature’s Spirit、Atmospheric 有官方版本，不表示其旧世界迁移已经验证；仍要检查方块实体、实体、玩家背包和区块中的对应数据。
6. 分发源含 AppleSkin、FancyMenu、Xaero World Map 等辅助项目。后续应按目标文件的运行端声明确定主服是否实际需要，不能把它们和存档内容模组赋予相同迁移权重。
7. 本报告不包含客户端独有的 MCEF／渲染／光影整条链；主服方案确定后仍需配套客户端，不能凭主服扫描宣称整个客户端包已兼容。

## 下一步应做什么

- 对三项铁道风险先做源码／数据格式差异审计：TrainResync、Steam ’n’ Rails fork、Extended Bogeys → Blocks & Bogies。明确哪些必须保留的旧 ID、字段和行为无法直接继承。
- 找出 Create Track Map 的 AshBill 补丁源码或补丁提交，确定能否直接移植到现有 NF fork。
- 对 Peculiars 做小范围源码和资源清点；另外两项规则／配方缺口优先考虑在现有自研代码或 KJS 内实现。
- 完成选定版本的依赖交集表后，再申请独立测试实例；只有实际世界副本才能回答哪些 DFU／离线转换真正必要。

**本次没有实施移植、下载完整 JAR、启动测试实例、修改包索引或运行服务器。** 扫描结果比初步估算更乐观地说明了发行覆盖率，但不能据此将数月级旧世界迁移压缩为几天：未知量主要转向少数核心联动和数据兼容。

## 证据与复查

- 本机扫描原始资料：`C:/mydata/Agents/Codex-CreateTrainResync/nf1211-scan/` 内的 `inventory.json`、`results.json`、`search.json`、`extra.json`、`gaps.json`。原始请求只涉及元数据；大型页面正文和日志不入库，本文保留全部条目及可复查链接。
- 主扫描脚本：同工作目录的 `nf1211-scan.ps1`。查询模板：`https://api.modrinth.com/v2/project/{project_id}/version`；按 Minecraft 和 loader 两字段联合过滤。初始映射来自 `.ablink`／索引中的 Modrinth 项目 ID，CF 项目另查原文件名，避免把同名替代项目误列为官方。
- 新增报告不会自动改变当前模组清单；本次保留原有工作区改动，不自动 commit 或 push。