# Agent 交接与通用维护要求

> 2026-10-31 21:41提交交接：本页各次“未commit”描述保留为当时状态；用户现已要求按功能提交三个仓库，提交结果以Git历史为准。本机交付维持test0010/pack-id9、helper0.1.30、TrainResync1.6.0.m，等待用户测试；未push。

## 2026-10-31 21:38 炼药锅反馈处理与全套本机交付

原始JSON、逐项结果及源码依据见agent/物品整合/炼药锅测试反馈-20261019.md最新节。A15/A17用户通过，已从当前HTML复测题库归档，现123题；A19.1锅沿接触、A20.9果酱转换仍失败，不能标为已修复。helper0.1.30修复Fruits Delight成功交互不挥手，增加每类最多24条接触/配方诊断；未猜测修改热源、配方或接触判据。用户随后补充“好像森罗灶，记得点燃”，源码确认该灶已有farmerdelight热源tag且使用原版LIT；仍需实测日志判断现场条件。HTML已验证旧JSON导入、评论保留及往返导出，导出的版本字段只是页面目标值，不能当成运行检测。

helper构建/既有自检成功，3项新增/现有FDC交互注入静态检查通过；TrainResync1.6.0.m重新build成功（源码语义未变，重构建JAR摘要变为91E8AE3CE99D9B006490E516CA95E6FE2946ED6B901359D9A3E813BBF886F416）。两者已入包，shared TrainResync m引用和服务器启用JSON保持。helper只用于客户端集成服测试，未擅自放入服务器共享层。

build-test.bat/build.bat成功：test0010/pack-id9、普通包1.6.0。Prism维护latest.json与本地镜像已登记9，独立ZIP已复制，旧ID保留。启动器解压计数和取消按钮布局源码已编译、收集到install-niijima，安装器也已更新。本轮所有本机交付已完成；没有上传、push或运行线上更新器。

用户关闭程序后，实际使用的Prism test0007实例仅替换mods：helper0.1.29→0.1.30、TrainResync k→m；未改实例pack-id、配置或存档，因此实例名仍test0007，它是手动换JAR的测试副本。旧EXE/JAR在仓库外备份/cauldron-deploy-20261031。helper SHA256为0159E20E27C70CE6D16513AEB5D023D3B175BF8992CF1139B952EDFAF4078DC5；helper本地Git提交993abf6，三主仓库未新增commit。本轮未启动游戏、未使用computer use。构建日志统一在仓库外prism-build，文件名含cauldron-feedback-20261031。

## 2026-10-31 21:20 配置决定所有环境：TrainResync m / test0009

用户明确取消单人/局域网强制关闭限制。1.6.0.m 在所有服务器环境读取 config/trainresync.json；只有 railwayDataProtection=true 才开启。集成服会登记启用状态及首次初始化快照，仅把预检留给世界加载时的既有读取 Mixin（保证错误界面的加载监听器已建立），读写保护并未豁免。下方21:09的“仅专用服／集成服无条件跳过”已过时；解析规则和默认关闭保持有效。

玩家 pack 不含启用配置，server/shared/config/trainresync.json 保留 true。包内 JAR 与 shared 引用均升为 1.6.0.m（693418字节，SHA256 9F3931FBB8725D1FC18BC4455D3E63B61C22EF6BDD0CC3024BD708AACFCFD36F）；旧 l JAR 备份在仓库外 prism-build。__master__ 仍需包含新 JAR 才能实际分发，未部署服务器或修改现有游戏实例。

gradlew.bat build 成功（13秒）；静态核对配置登记先于集成服延迟检查，既有加载/保存开关保留。未重复运行未改动解析器的14项检查，未运行游戏。build-test.bat 与 build.bat 均成功，test0009/pack-id 8 已登记到 Prism 维护索引及本地镜像，独立 ZIP 已复制，普通包仍1.6.0。定点检查测试包只有 m 版 TrainResync 且无 trainresync.json。启动器未重编译，其既有 UI 修正仍仅源码。本轮未commit/push，未使用computer use，未触碰炼药锅功能总图。

## 2026-10-31 21:09 铁路保护默认关闭：TrainResync l / test0008

用户要求整个TrainResync共用一个JSON。已实现config/trainresync.json，当前键railwayDataProtection（布尔，默认false）。专用服务器且明确true才启用整套铁路数据保护；单人/局域网集成服务器无条件跳过，未启用时加载与保存Mixin均回到原路径。缺文件不自动生成；坏配置/读取失败警告后关闭。配置启动读取，按世界路径保存状态并在停止时清理，无新增依赖/Mixin。详情见TrainResync仓库agent/配置.md。

启用JSON仅在server/shared/config/trainresync.json，两服共享；客户端pack及test0008产物均无该文件。pack/overrides/mods和shared引用已升为1.6.0.l，旧差异层源此前已移除。JAR为693411字节，源及包内SHA256相同：C3001D8F9007AAA271349DB9B95A0FD7DBF56276E18715EDCFD4CAF4FE4A8658。__master__引用仍须对应分支包含新JAR后才可分发，未部署服务器。

gradlew.bat build成功，14项外部配置检查通过；未实际游戏/专用服验证。build-test.bat、build.bat均成功，测试版1.6.test0008/pack-id 7已同步登记并复制到启动器本地packs目录；旧ID与ZIP保留。普通包仍1.6.0。下方k/test0007的客户端保护行为已由本节替代，原新世界判定修复仍用于明确开启的专用服。

未改现有玩家实例、未使用computer use、未重新编译启动器（其解压计数与取消布局修正仍仅源码）。本轮改动未commit/push；其他agent新增的炼药锅功能总图目录未触碰。构建日志在仓库外prism-build，前缀trainresync-config-gate-20261031、pack-trainresync-l-20261031。

## 2026-10-31 20:21 新世界误判修复已交付：TrainResync k / test0007

用户批准按已核对方案修复。TrainResync 1.6.0.k在ServerAboutToStartEvent快照`!server.getWorldData().overworldData().isInitialized()`，替换基于level.dat/目录存在性的误判；保留NEW_WORLDS生命周期缓存，删除不再使用的isNewWorld(Path)。未修改DAT内容校验、临时文件拒绝、原子保存或旧世界缺文件阻断逻辑；没有新增Mixin。

原样gradlew.bat build成功（13秒），外部6项检查验证缺失DAT豁免边界与残留tmp拒绝；测试源码留在仓库外临时测试/railway-new-world-20261031。未实际运行游戏，新建、正常保存后重新进入仍由用户验证；建议先创建全新世界，不将此前创建失败的半成品存档作为首次验收。

pack/overrides/mods已由j替换为k，server/shared/mods引用同步为trainresync-1.6.0.k-all.jar.ablink，内容仍是__master__。两服无额外TrainResync差异源；引用分支需包含新JAR才可线上分发。k版JAR为690895字节，源与包内副本SHA256一致：D945DBDD3F9435F98C62D64A475EC00A92630CF9E17C95CBB213D9D43EAA937B。j版备份在仓库外prism-build/trainresync-1.6.0.j-before-new-world-fix.jar。

build-test.bat与build.bat均成功：最终测试版1.6.test0007，发布pack-id 6；普通包仍1.6.0。启动器latest.json维护源与本地测试副本同步，独立ZIP已就位，保留ID1–5；没有改现有游戏实例、启动器EXE或线上服务器。下方j/test0006和“修正方案尚未实施”均为历史阶段，现由本节替代；实际游戏验收尚未完成。本轮改动尚未提交、未push。构建日志前缀trainresync-new-world-fix-20261031和pack-trainresync-k-20261031，位于仓库外prism-build。

## 2026-10-31 20:15 test0006 新建世界崩溃：TrainResync j 误判

用户创建“新的世界”时客户端崩溃。实例为 %APPDATA%/NiijimaLauncher/instances/新岛铁道 v1.6.test0006/minecraft，报告 crash-reports/crash-2026-10-31_20.15.37-server.txt。根因是 TrainResync 1.6.0.j：RailwayDataGuard.checkLoad → AtomicRailwayFile.checkState 抛出 Existing world is missing railway data（data/create_tracks.dat），随后保护层包装为 Cannot start with unsafe railway data，终止集成服务器启动。

源码中 ServerAboutToStartEvent 调用 isNewWorld；后者只要发现level.dat、level.dat_old、region、data或维度目录就判旧世界。现场level.dat/level.dat_old创建于20:15:35，世界目录起于20:15:34，20:15:36首次读取铁路数据即拒绝；新世界初始化已先写基础文件，这个判据不能可靠区分新旧。此错误是保护机制对新建流程的误判，不是本报告证明铁路DAT真的损坏。报告最大堆32768MiB，异常不是OOM。

2026-10-31 20:18 修正方案核对（尚未实施）：在既有ServerAboutToStartEvent中用 !server.getWorldData().overworldData().isInitialized() 替换目录存在性推断，并保留NEW_WORLDS在本次启动期间缓存结果。Minecraft 1.20.1的Minecraft.doWorldLoad会先saveDataTag，再启动集成服务器；PrimaryLevelData的新建状态为initialized=false，MinecraftServer.createLevels初始化出生点后改为true，因此不能到读取铁路DAT时才重新判断。已用本机Forge 47.2.0编译依赖字节码确认集成服和专用服均在loadLevel之前发ServerAboutToStart。仅豁免首次初始化时的DAT缺失，不跳过已有DAT校验、残留tmp拒绝或原子保存；已初始化旧世界缺文件仍阻断。实际新建/重新进入和旧档保护路径仍需修复后验证。

本轮只定位与记录，未改生产代码、JAR、世界文件或执行GUI操作。上述“编译通过/已入包”不等于新建世界验收通过；j版的新建世界路径已确认失败。修复需使用正确生命周期的新建语义，保留对真实损坏/未完成铁路保存的保护；不能通过任意放行DAT缺失或删除存档文件掩盖问题。

## 2026-10-31 晚间同步、TrainResync j 入包与 test0006

- 三仓库fetch/pull --ff-only均成功且已是最新；没有合并提交或冲突。TrainResync main（201470f）执行原样 gradlew.bat build 成功，产物 TrainResync/build/libs/trainresync-1.6.0.j-all.jar 为691085字节，SHA256 89C06B86357BFBF38C05FDCB557F11DA2EF258B89E9C01DAEB926CF6D9062D1F；无额外Gradle选项，未游戏验证。
- 用户追加授权后，pack/overrides/mods 中的1.6.0.i-all.jar已替换为上述j版，源JAR与包内副本哈希一致，旧i版备份在仓库外prism-build/trainresync-1.6.0.i-before-evening.jar。索引无TrainResync重复条目。本轮初次检查时shared无此模组、两服差异源仍是d/a版；随后用户明确要求统一，已移除这两个旧源，新增server/shared/mods/trainresync-1.6.0.j-all.jar.ablink，内容为__master__，按既有规则引用pack/overrides/mods中的j版。旧源已备份在仓库外prism-build/server-trainresync-before-shared-20261031。引用分支尚需包含新JAR后才可分发；未执行更新器、未部署服务器或替换现有游戏实例。
- build-test.bat与build.bat重新执行成功，最终build/pack-test.zip为1.6.test0006（589371539字节），build/pack.zip为1.6.0（130973653字节）。初次打包的test0005仍含i版；随后按用户要求替换JAR才生成test0006，不复用已分配编号。源包版本保持1.6.0，下一本机测试编号为0007。
- 启动器发布索引维护源及仓库外本地测试副本新增pack-id 4→test0005、5→test0006，两个独立ZIP均保留；当前最新为5。启动器测试EXE及干净NSIS安装器已重建，确切路径和摘要见PrismLauncher/agent/handoff.md。未上传索引或ZIP，未使用computer use，未实际导入游戏测试。
- 本节替代下方“当前包内TrainResync i / 最新test0004”的历史交付状态。JAR替换与交接记录尚未提交；本轮没有自动commit或push。

## 2026-10-31 01:31 test0004与启动器更新测试已交付

- 用户要求编译、打包、分类提交。build-test.bat、build.bat均成功，分别生成build/pack-test.zip（1.6.test0004，589359541字节）与build/pack.zip（1.6.0，130961654字节）；本机build/test-sequence-1.6.txt已由3变4，下次成功测试打包为test0005。源码包版本不变。本轮直接使用已准备的WinPS模块环境，无需重复构建；仅定点读取产物索引确认版本，未全包解压/重复哈希检查。
- **替代下方旧结论：本地测试也需要发布索引，与正式共用代码路径。** PrismLauncher/tools/niijima/deploy/packs/latest.json与仓库外prism-local-test/packs/latest.json已登记ID3→1.6.test0004→新岛铁道 v1.6.test0004.zip；ID2/test0003及其独立ZIP保留。发布ID跨测试/正式只递增，独立于test计数，下一发布ID必须大于3。build-test本身不改发布索引，本轮由agent打包后登记；未上传。
- 新启动器测试EXE及不含测试JSON的NSIS安装器均已构建，3组相关CTest通过；首页每次显示最多灰色加载1秒，后台检查成功发现更大ID则显示更新，点击只新建实例并保留旧实例。详情和确切产物路径见PrismLauncher/agent/handoff.md。实际GUI/游戏测试待用户，未自动安装游戏或改动玩家实例。
- 三仓库已检查：TrainResync无新改动，不无故重建。整合包仅新增本交接记录，功能代码与发布索引在PrismLauncher仓库分类提交。未push、未部署服务端。下方“本地直读ZIP无需索引/旧实例没有更新入口”是历史实现描述，已被本节替代。

## 2026-10-31 图标副本已打包交付

- 用户授权重新打包、编译与分类提交。build-test.bat和build.bat成功：build/pack-test.zip为新岛铁道v1.6.test0003，589359541字节；build/pack.zip仍为v1.6.0，130961654字节。均含根icon.png、overrides/icon.png及原PCL/Logo.png；仅定点读取索引/条目确认版本和路径，没有进行全包完整性或逐文件哈希测试。
- build-test成功后将本机build/test-sequence-1.6.txt从2写为3，失败不递增；下次成功为test0004。计数文件位于被忽略的本地build目录，不是线上发布ID，也不保证跨机连续。源码pack/modrinth.index.json保持1.6.0。
- 启动器的本地niijima-local-test.json仍直接指向build/pack-test.zip，无需注册发布索引；正式分发则需用户上传包并在packs/latest.json新增更大的数字ID及version/file。打包脚本不修改该发布索引，现有启动器对已安装实例也不执行基于该ID的自动升级。本轮未访问或改动服务器。
- 首次打包受父进程PowerShell7模块路径影响，Windows PowerShell5找不到Get-FileHash，未产生成功包/未递增计数。仅在仓库外本次执行脚本中为子进程设置WinPS模块路径后重试成功，未修改项目构建脚本。日志位于C:/mydata/Agents/Codex-CreateTrainResync/prism-build/，前缀pack-icons-20261031及pack-test-icons-20261031。
- 下方“图标兼容副本未重新打包”已是历史状态，本节交付结果替代；实际启动器导入效果待用户测试。
## 2026-10-31 启动器图标兼容副本

按用户要求，保留 `pack/overrides/PCL/Logo.png` 原图及Setup.ini配置，原样复制为 `pack/icon.png` 和 `pack/overrides/icon.png`；三份均21973字节，SHA256核对一致。以后替换Logo时同步这三个位置，避免不同启动器显示不同版本。

根icon.png和overrides/icon.png覆盖当前Prism已有查找约定；PCL仍使用原配置。mrpack官方格式未定义统一图标字段/路径，不宣称所有启动器均支持。新岛首页导入入口未设置default图标key的问题属于启动器源码接线遗漏，放置文件本身不能解决；诊断见PrismLauncher仓库agent/handoff.md。本轮只增加图标副本和记录，未修改启动器、未重新打包、未改现有实例、未提交或部署。
## 2026-10-30 休息前交接

用户明确今晚停止，下次接续TrainResync的CTL／车门碰撞修复，按[核查后的最精简方案](模组管理/CTL-1.0.0代码审计-20261030.md#核查后的最精简方案2026-10-30当前讨论稿)实施，保留最后成功碰撞结果；当前只有分析与方案，未实现或部署。另一份无燃料列车红灯前急停报告也已加入[总todo“列车问题”](todo-list.md#列车问题下次接续2026-10-30-用户指定)，详情和未确定因素保留在DAT专题。不在用户休息期间自行实施或启动后台任务。

## 2026-10-30 三仓库同步核对

- PrismLauncher `develop` 快进至 `0be164a83`，包含本地安装测试、分发地址调整、包标记识别及主按钮字距调整；本轮未重新构建启动器或安装器。
- 整合包 `agent-dev-1.6` 合入上游 `ca7c975`，与本地 `db67901` 的调查文档无文本冲突。上游新增共享终端 v6、`pack/niijima-pack.json` 和测试包递增编号；包标记与启动器均使用数值 `token: 114514`，跨仓库字段一致。
- 共享终端9项单元测试、Python／JavaScript／PowerShell语法及合并diff格式检查通过，无未解决冲突；本轮未重复HTTP/PTY集成测试、未切换当前正式共享终端、未构建ZIP或执行部署。既有v5运行会话不会随Git合并自动更新。
- 本机 `流程文档/整合包更新流程.md` 经比较仅缺少仓库已有章节，无本机独有修改，已同步仓库内容。TrainResync `main` 已包含全部上游提交，无需合并；其保护补丁仍遵循此前“下次更新部署”的决定。

> **待办维护位置更新（2026-10-24）：** 本文的待办／下一步／候选清单保留为历史与技术依据，不再独立维护状态；有效任务统一见[总 todo](todo-list.md)，炼药锅 mini todo 为例外。功能台账、测试步骤及来源证据仍在本文维护；旧“待实现／待决定”不覆盖总表及mini的最新结论。

更新日期：2026-10-11。

本文件记录跨任务通用要求和 general handoff 信息，是新 agent 接手时的入口。当前任务进度与剩余事项维护在 [todo-list.md](todo-list.md)，专题事实、命令与测量数据维护在对应专题文档。

## 远端停服交接（2026-10-29）

- **性能根因仍未知（2026-10-30）**：已解释DAT为何截断，尚未确定导致超过60秒tick的上游根因。用户要求后续评估玩家bug报告时考虑关联可能并区分证据与推测。两份报告已记入[DAT专题](服务端/create_tracks损伤分析-20261029.md#玩家报告初筛及关联线索2026-10-30)：用户确认CTL `quarter_htlb` 满载发生在玩家客户端；[完整JAR审计](模组管理/CTL-1.0.0代码审计-20261030.md)确认重复发包可反复提交整车厢碰撞重算、取消回调不取消计算，另有客户端隔离和空值问题；打印已有TrainResync补丁屏蔽，事故关联及游戏复现仍未证实；无燃料列车红灯前急停报告尚无性能关联证据。未修复或部署。

- **恢复运行（北京时间2026-10-30 01:14）**：用户决定暂缓 TrainResync 1.6.0.j 部署至下次更新，并批准恢复两服及看门狗。两服于01:12:59启动，train-cn 01:13:18、create-cn 01:13:23记录本次 `Done`，25590／25591监听；本次日志检查未见 create_tracks 读取错误。随后01:14:06启动 `mc-watchdog-r2`，三项服务均为 `active/running`。create-cn 使用此前原样回退的27日DAT，未编辑列车；未部署新补丁。以下“保持停止”记录为此前阶段状态，已由本条替代。未进行客户端入服或逐列车验收。

- **本地保护补丁（2026-10-30）**：TrainResync 1.6.0.j已实现铁路DAT原子保存、临时文件／损坏正式DAT启动阻断；Windows隔离28项检查与离线构建通过，Forge实际加载及Linux运行验证未做。产物在 `D:\mydata\Repositories\Create-Train-Resync\TrainResync\build\libs\trainresync-1.6.0.j-all.jar`。已提交至TrainResync `main` 的 `80a91bc`，未部署，留待下次服务器更新；两服及看门狗已按上一条恢复运行。详情见下方DAT专题。外部看门狗重试策略未改。

- **最新修复状态（北京时间2026-10-30 00:00）**：用户批准将 create-cn 的 `create-cn_world/data/create_tracks.dat` 改名为同目录 `.old7`，并从27日原始ZIP原样恢复DAT；已完成，未删除 kiha25 或编辑其他列车。两服 `MainPID=0`、仍保留此前failed状态，看门狗inactive；未启动或进行游戏加载验证。来源、路径和验收见 [DAT损伤分析](服务端/create_tracks损伤分析-20261029.md)。下方“尚未执行修复”是较早停服时的历史状态。

- 用户为准备修复，已批准在 `custom-sz-cn` 先停止 `mc-watchdog-r2`，再停止 `mc-create-cn-r2`、`mc-train-cn-r2`。三项服务于北京时间 17:41:20–17:41:24 停止；本次保持停服，尚未执行修复或重新启动。
- 两服 `logs/latest.log` 均记录 `All dimensions are saved`；17:43 核查无残留 Java 进程。看门狗为 `inactive (dead)`；两服因 screen 主进程退出码 1 标记为 `failed`。train-cn 停止时另有 JLine／stty 输入输出异常，create-cn 有 DH 线程池关闭警告；日志随后均确认存档完成，异常原因尚未诊断。
- 本轮通过共享终端操作。接手先只读核对实时状态；上述记录是本次停服证据，不代表以后仍停服。远端修改继续遵守用户要求的命令说明及选项框审批。
- 同日退出码只读诊断：两服单元均为 `Type=forking`，主进程是 GNU screen 4.09.00；启动脚本仅调用 Java，没有主动 `exit 1`。`ExecStop` 直接使用 Bash 写法 `$'stop\n'`，但 systemd 不经 Bash，`systemctl show` 中参数显示为 `$stop` 加换行；该写法需修正。此外 `screen -X stuff` 只发送输入便返回，没有等待服务退出；实际 `KillMode=control-group`、`KillSignal=15`，按 [systemd ExecStop 文档](https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html#ExecStop=) 会立即向残留进程发送终止信号。journal 显示两服 screen 均在 09:41:20 UTC 以 1 退出，而 Minecraft 至 09:41:23–24 才保存完成，因此 screen 的 1 不能解释为 Java 退出码；与上述停止时序问题一致。建议正确发送 stop 并同步等待退出，不仅用 `SuccessExitStatus=1` 隐藏状态。尚未修改单元或做启动／停止复测，仍保持停服。

- Screen 退出码补充核实（同日）：[GNU Screen 4.9.0 源码（Debian Sources）](https://sources.debian.org/src/screen/4.9.0-4/screen.c/) 将 `SIGTERM` 注册到 `FinitHandler`，该处理函数直接调用 `Finit(1)`，最终 `exit(1)`；不是根据 Minecraft 保存进度或 Java 退出码决定的。当前 systemd 发送 SIGTERM 后 screen 返回 1 符合这条既有代码路径。不能仅凭这个 1 认定 Minecraft 崩溃或必须改造停服流程；本次两服保存完成另有日志证据。没有修改远端。

- 后续决定与实施（同日北京时间 18:11）：用户仅批准接受 screen 退出码 1，不改造启停流程；此决定取代上方此前的改造建议。本轮在 `/etc/systemd/system/mc-create-cn-r2.service`、`/etc/systemd/system/mc-train-cn-r2.service` 的 `[Service]` 中各新增 `SuccessExitStatus=1`，执行 `systemctl daemon-reload`。`systemctl show` 已确认两服加载值为 1（默认 0 仍为成功）；两服及看门狗 `MainPID=0`，保持停止。未重启服务、未做运行复测、未清除历史 failed 标记。此设置会接受 screen 的所有退出码 1，并非仅 SIGTERM 所致的 1。

## 下次对话首先展示（2026-10-16 用户指定）

用户已于 2026-10-16 恢复工作并开始游戏测试，恢复对话时已展示优先清单。后续继续推进时，**主动展示 [todo-list.md 顶部的 Immediate-todo](todo-list.md#immediate-todo下次对话优先展示2026-10-16-用户指定)，并优先于其他待办**：进游戏测试 → 原版炼药锅交互适配（包括滴水石锥）→ 考虑部分基岩版交互 → 调整奶昔工作台产量 → 画整合流程图。奶昔锅最终产量仍待讨论，四瓶只是测试默认值。不要在用户休息期间自行推进这些事项；这不是定时提醒或后台任务。具体清单以 todo 为单一维护位置。

## 新机器首次接手与规则加载

1. 定位实际仓库与独立工作目录，先读 [AGENTS.md](AGENTS.md)、本文件和 [todo-list.md](todo-list.md)。旧 Windows 绝对路径仅是上一台机器的位置，不要求新机器照搬。
2. 检查当前分支、上游、未提交工作及本地独有提交。用户要求同步时，按 AGENTS.md 的“分类提交 → fetch → merge → 逐项讨论冲突”流程；任何 push 和线上部署仍由用户手动执行。
3. 建议将仓库 `agent/AGENTS.md` 复制或合并到 **agent 实际启动的项目工作目录根部**，文件名必须是 `AGENTS.md`。本机使用 `D:\mydata\Agents\Minecraft相关\AGENTS.md`；若直接从仓库根部启动，可在仓库根部放同名副本，已有文件先比较合并，不能覆盖其额外规则。这是接手建议，本次未新增仓库根部副本。
4. **自动读取有目录范围限制。** Codex 在启动时按项目根到当前目录查找规则；仅保存在 `agent/AGENTS.md` 不保证从仓库根启动时会自动加载。若在独立工作目录启动，确认实际加载的是该目录的规则。修改后重新启动相应会话，并让 agent 列出已加载的指令来源核对。普通 ChatGPT 对话不能仅靠磁盘文件存在就保证自动注入。
5. 不要把整份项目规则直接覆盖到用户级 `~/.codex/AGENTS.md`，以免影响无关项目；若确需全局设置，只合并【通用规则】并先核对已有内容。加载行为依据：[OpenAI 官方 AGENTS.md 文档](https://learn.chatgpt.com/docs/agent-configuration/agents-md)（2026-10-11 核对）。
6. 仓库 `agent/AGENTS.md` 是可随 Git 携带的规则副本。长期约定变动时同步当前工作目录副本；不同机器的本地副本不会随着仓库拉取自动更新，需要比较后同步。正文中的 `agent/…` 路径相对于仓库根，不是复制后 AGENTS.md 所在目录。
7. 《整合包更新流程》已收录为仓库 [整合包更新流程.md](整合包更新流程.md)，本机原副本在工作目录 `流程文档/`。以后修改流程同步两份；其他机器只有仓库副本也应能开展工作。

## 2026-10-11 合并交接

- 本机服务端更新器相关工作已分为 `a38bac7`（代码）、`8d253c7`（资源重构）、`9e3c11c`（文档）；合并远端至 `6feead2` 后生成 `430b4fe`。当时未 push；未来接手重新查询远端，不将这条历史状态当作实时结果。
- 冲突裁决：更新器已实现、待真实副本验证；PCL／MCEF 安装启动流程已获用户“无明显问题”反馈。共享结构以 shared／ablink 为准，旧三份实体副本描述仅作为历史。
- 用户再次确认三个重建目录及停服、快照、逐路径确认的前提。文档合并没有执行更新器，也没有部署到服务器。
- 旧 `agent/agent.md` 的全部视频交付规则已合并进 `agent/AGENTS.md`。此前已分配 29（girlslegendu）和 30（cycleofsorrow）；最新编号和部署状态仍以视频专题及实际目录为准。

## 交接信息必须写入文档

之后遇到对未来其他 agent 有帮助的 handoff 信息，应在当前任务结束前写入 `agent/` 中合适的 Markdown 文档，不只留在聊天、临时日志或本机工作目录。

- 长期工作规则写入 [AGENTS.md](AGENTS.md)，接手提示写入本文件；具体主题的排障方法、可复用命令、测量基准和验收结果优先并入现有专题文档；未完成事项与总进度写入 todo。
- 记录日期、适用条件、验证结果及必要的文件位置，区分实测事实、推断、建议和用户已确认的要求。
- 旧结论过时时标明过时范围、日期及替代结论，保留必要历史依据。专题中的建议或构想不自动升级为已承诺实施的任务。
- 核心结论和复用步骤应在仓库文档中自足；本机日志或素材路径可作为补充，不假定未来 agent 仍能访问这些路径。
- 涉及凭据只记录配置和使用方式，不写入 cookies、令牌或其他凭据内容。
- 同一主题优先更新现有文档，避免另建重复的 README 或维护说明；本文件专门承载通用交接要求。

## 共用维护约定

- 维护说明和任务记录统一放在 `agent/`。
- 修改共用 KJS／YSM 时，以包内资源为维护入口，同时检查 server/shared 的 .ablink 来源及两服展开结果，不再维护三处重复实体副本。共用模组更新 shared/mods 的引用或实际文件，单服差异保留在各服目录；实例及世界配置仍按适用范围同步。分支引用尚未合入目标分支时，不视为远端可用。具体路径、同步规则和验证要求见 [服务端配置差异](<服务端/YSM模型与包服差异.md>)。
- 区分“本地处理完成”“验证通过”和“已部署上线”；没有上传或部署证据时，不把本地完成写成线上完成。
- 下载、压制等进程启动后不等于任务完成。交接时注明进程状态、输出位置和剩余检查；结束一轮回复不代表后台任务已经成功，也不代表会自动持续监控。

## 接手入口

### 文档目录（2026-10-16 整理）

顶层只保留五份常用入口：`AGENTS.md`（规则）、`handoff.md`（交接）、`todo-list.md`（当前待办）、`整合包更新流程.md`（操作流程）、`整合包自定义功能.md`（脚本与 OEI 台账）。专题按下表查找；旧日期、决策和验证边界继续保留在专题内。

| 子目录 | 内容 |
| --- | --- |
| `模组管理/` | [已加入模组](模组管理/已加入模组.md)、[待新增模组](模组管理/待新增模组.md)；四份历史 JSON／Excel 放 `历史资料/`，不作为实时安装状态 |
| `服务端/` | [服务端更新器](服务端/服务端更新器.md)、[YSM 模型与包服差异](服务端/YSM模型与包服差异.md) |
| `视频资料/` | [背景视频维护](视频资料/背景视频维护.md)（制作记录与企划分类已合并）、播放器 HTML 参考 |
| `版本发布/` | [1.6 Trailer 策划](版本发布/1.6-trailer策划.md)：版本宣传片、自制功能与整合适配镜头候选、拍摄状态及历史原稿 |
| `版本迁移/` | [迁移初步评估](版本迁移/Minecraft-1.21与Create-6迁移初步评估.md)、[主服 NF1.21.1 模组迁移扫描](版本迁移/主服NF1.21.1模组迁移扫描.md)：路线、工作量假设与逐模组发行分类；2026-10-17 集中归档，原报告正文保留 |
| `玩法与配置/` | [货币与创作奖励构想](玩法与配置/货币获取与创作奖励构想.md)、[默认键位冲突清单](玩法与配置/默认键位冲突清单.md) |
| `物品整合/` | [巧克力整合](物品整合/巧克力链整合计划.md)、[全包初筛](物品整合/重复物品语义初筛-20261016.md)、[完整 ID 清单](物品整合/全包物品ID清单-20261016.md) |
| `tools/` | 可复用维护工具，如只读物品 ID 提取脚本 |

背景视频原“参数分析与压制建议”和“企划分类清单”合并后，制作完成需更新同一文档中的交付记录及分类章节，不再维护两个文件。已加入与待新增模组的业务状态不同，仍按此前约定分开。服务端更新器执行规则与 YSM／包服差异各有用途，也继续分开。

| 内容 | 文档 |
| --- | --- |
| 通用规则、本项目规则及视频交付规则 | [AGENTS.md](AGENTS.md) |
| 模组索引 API、下载、排序及验证流程 | [整合包更新流程](整合包更新流程.md) |
| 服务端引用、删除表及更新器执行 | [服务端更新器](服务端/服务端更新器.md) |
| 当前进度、待办与其他专题入口 | [todo-list.md](todo-list.md) |
| 已加入模组总表、版本、测试与兼容记录 | [模组管理](模组管理/已加入模组.md) |
| 待新增模组表格、选型与暂缓决定 | [待新增模组](模组管理/待新增模组.md) |
| 包服同步、服务器结构与配置差异 | [服务端配置差异](<服务端/YSM模型与包服差异.md>) |
| 背景视频下载、压制和响度统一 | [远端背景视频参数分析与压制建议](视频资料/背景视频维护.md#制作规范与交付记录) |

2026-10-10 视频任务的可复用交接已写入上述视频专题：YouTube 只返回 360p 时经验证有效的 `web_safari` HLS 下载方法、26 个视频的完整响度统计、约 -17 LUFS 的制作基准，以及本次两份成品的验收记录。后续相关工作应先读取该专题的最新章节，避免沿用其历史默认不调音量的命令。

## 2026-10-13 模组文档入口整理

模组管理分成两份 Markdown：[待新增模组](模组管理/待新增模组.md) 与 [已加入模组](模组管理/已加入模组.md)。两页均保持备注在顶部、当前表格紧随其后，日志和历史记录置后。按本次本地收录核对为 14 项候选、2 项待选型需求、118 个已纳入分发源的模组，数量随维护重算，不固化。当前文件范围覆盖索引、overrides 和两服共享／差异源；不代表实时部署。旧 Excel／JSON 仍是历史证据，不据其旧状态把 More Leads 重新列为已加入。Observable 的选型意向与 shared 引用并存，后续需讨论是否移除；本轮仅如实登记。

## 2026-10-16 同步与打包记录（已获用户确认）

> 同日后续合并：办公室本地 `cdbff46`（哆啦A梦合集移出、保留5820）与 `885d809`（新增饮食模组物品扫描待办）合并远端 `94b447e`，无文本冲突。当前包内为73份资源，下列74份及打包产物为另一机器先前状态；此次未重新打包、未运行游戏或更新器。物品扫描按用户要求停止，后续从todo继续。2026-10-16用户仅本次明确授权合并及push，长期远端操作规则不变。

- 已 fetch origin，将 origin/agent-dev-1.6 的 2c4f595（相对本地共同基线新增 6 个提交）通过 merge --no-commit --no-ff 合入本地 a09a89f；自动合并成功，无未解决冲突。已按规则停在提交前审阅；用户随后明确确认创建合并提交，本记录与合并一起入库；未 push。
- 本地更新器收到 y 后再次 checked(ROOT, ...) 的一行修改和边界说明保留；远端 YSM 编号资源、74 份资源台账、三处琴音默认 ID 与视频记录保留。三处默认 ID 均为 0230_藤田ことね.ysm，已确认包内对应文件存在；未执行游戏或服务器更新器。
- 合并后在独立可见 PowerShell 窗口运行原仓库 build.bat，实际命令保持 7z a -tzip -uq0 output\pack.zip .\pack\*。退出码 0，7z 输出 Everything is Ok；产物 C:\mydata\Repositories\niijima-railways-modpack\output\pack.zip，131,358,654 字节。该包对应此轮合并后的 pack 内容；确认后仅更新交接文档并创建合并提交，没有再次修改 pack 或重复打包。
- 遵循新合入的常规 7z 打包规则，以退出码和成功输出验收，没有额外 ZIP 完整性测试、解压比对或逐文件哈希检查。合并 diff 空白检查及冲突标记扫描通过；没有将打包成功当作游戏验证或已部署。
- 本机日志：C:\mydata\Agents\Codex-CreateTrainResync\pack-build-merge-20261016.log；退出状态：同目录 pack-build-merge-20261016-result.json。

## 2026-10-16 遗留构建清单清理与文件位置检查

- 按用户要求删除根目录 mcef-runtime.json：由 c7de2fd 引入，原供 build.py 下载和校验 MCEF 运行库；e52d514 已删除该脚本，清单成为遗留文件。删除前全文搜索未发现当前受跟踪文件引用它；当前 build.bat 仅打包 pack。
- 检查受跟踪路径、根目录、维护文档／脚本／归档及常见日志、备份、临时文件命名，并检查未跟踪与忽略文件。未发现其他明确放错位置的文件；agent 内历史表格和 HTML 参考保留，模组配置附带 README、FancyMenu TXT 与模型 ZIP 不作为临时文件处理。output/pack.zip 已被忽略。
- .gitignore 中旧 MCEF 目录规则已注释，不生效，本次保留。此检查是文件位置与遗留文件检查，不代表逐项验证所有模组配置及资源是否仍被运行时使用。未修改 pack，不需重新构建；2026-10-16 按用户要求将清理与本记录一并提交，未 push。

## 2026-10-16 本机再次同步（已获用户确认）

- 从本机 1030a18 fetch origin 后，远端为 59e256b，双方独有提交分别为 1 与 3。执行 git merge --no-commit --no-ff origin/agent-dev-1.6，自动合并成功，无未解决冲突；用户已确认创建合并提交，本记录随合并提交入库，未 push。
- 保留本机废弃 mcef-runtime.json 删除及检查记录；合入远端哆啦A梦合集暂移出、5820 预留和新增饮食模组物品扫描待办。实查包内 YSM 为 73 份，文档数量一致。扫描待办明确尚未产出结果，不将既有局部 OEI 整理视为全量筛查完成。
- 合并 diff 空白检查、agent 文档冲突标记扫描通过。运行 build.bat 成功，7z 输出 Everything is Ok，移除旧包内 1 个文件；产物 C:\mydata\Repositories\niijima-railways-modpack\output\pack.zip，130,626,342 字节。按约定未追加 ZIP 完整性或哈希验证；未进行游戏验证或部署。

## 2026-10-16 全包重复物品 ID 语义初筛

- 用户将新增饮食模组扫描扩大为全包，但明确只按 ID 语义做浅筛、先写 Markdown 待审阅。已交付 [候选报告](物品整合/重复物品语义初筛-20261016.md)、[完整 ID 清单](物品整合/全包物品ID清单-20261016.md) 和只读提取脚本 [extract_item_ids.py](tools/extract_item_ids.py)。
- 输入是本机 v1.6.0 实例“新的世界”存档 level.dat 的 Forge minecraft:item 注册表，保存时间 2026-10-16 00:39:23（北京时间）。提取 12,946 个唯一 ID、47 个命名空间；109 个索引 mods 文件与实例 SHA-1 一致，overrides TrainResync 也匹配。数据是存档快照，不声称为此刻运行注册表，未启动游戏或下载模组。
- 初筛得到 98 组跨模组同名、22 组词序／词形近名及 20 组人工近义补充；均列完整 ID、已有 OEI 配置线索和待审阅栏。组间有交叉，不能相加当作重复物品数量。抽取脚本复跑的 ID 列表与首次一致；候选 ID 均来自清单。钢线来源 pantographsandwires:steel_wire 在快照中仍不存在。
- 未深查配方、标签、源码、营养、材质或行为；不自动统一任何物品。用户尚未作候选取舍；todo 已更新为审阅阶段。本轮仅文档及提取工具，未改 pack，无需重新打包，未 commit／push。

## 2026-10-16 巧克力链专项计划（历史；后续已实施）

> 同日最新取舍：用户要求保留所有合成入口，OEI 合并条与蛋糕，并将手工条产量 4→1、FD 派注液 500→250 mB。下列删入口建议已过时；奶类物品本轮按奶瓶 250 mB 比较，不能继续沿用桶奶成本结论。已交付三阶段大图，路径与可复现脚本见巧克力专题顶部；尚未实施配方。

- 用户随后选定 chocolate，要求检查 ID 或英文名称并尽量整合到 Create；Yuushya 装饰独立保留。结果和完整 31 项清单见 [巧克力链整合计划](物品整合/巧克力链整合计划.md)，不扩大至其他初筛候选。
- 主要建议：以 Create 条及液体统一原料入口，删除 Neapolitan 原料直合成条配方，重写下游旧条引用并保留特色成品及建筑链；名称不含 chocolate 的 Neapolitan 混合冰淇淋和 Peculiars yucca_fudge 也消耗旧条。两种可食巧克力蛋糕另行决定；FD 派移除工作台入口属于待确认玩法调整。
- 中央厨房 JAR 的 Neapolitan 内置资源方向相反（压块产出 Neapolitan 条），但当前 BuiltinResource 枚举及存档启用包均未列该包；不能把资源或数据生成器当作生效配方。已启用的 Farmer’s Delight 包支持 C&A 蛋糕 7 片闭环和热可可。实施时以最终加载配方复核。
- 本专项仅写计划与文档链接，未修改配方、OEI 或实例，未启动游戏、打包或提交。证据导出在仓库外 chocolate-audit-20261016；关键数量和配方 ID 已落入专题。

## 2026-10-16 巧克力方案实施与整合文档归档

- 用户批准按最终图实施、打包并提交。新增 chocolate.json 两条 OEI 规则及 chocolate_recipe_balance.js 两个精确 ID 数值补丁；保留全部生产入口。先前“尚未实施”和删入口建议仅为历史，当前状态见 [巧克力专题](物品整合/巧克力链整合计划.md) 顶部。
- 用户要求整合计划集中子目录：本轮将巧克力专题、全包初筛与完整 ID 清单放入 agent/物品整合/，修复相对链接；提取脚本仍在 agent/tools/。大图、渲染脚本与诊断中间文件保留在仓库外 chocolate-audit-20261016。
- 脚本语法和基于原 JAR 数据的限定范围补丁检查通过：47 条配方中只有 count 4→1 与 amount 500→250 变化；这是静态/适配器检查，不是实际 KubeJS 游戏加载。未搭建测试实例、未修改用户存档、未部署。
- 已完成的女仆餐厅赠书配置、教程盘点与相关既有分析先独立提交 a8a6118；本轮后续提交覆盖物品初筛、巧克力实施及交接文档。用户已授权本地提交，不执行 push。

打包结果（2026-10-16）：已执行仓库 build.bat，7z 输出 Everything is Ok，退出码 0；产物 output/pack.zip 为 130,627,609 字节。按约定未追加 ZIP 完整性／解压比对；未游戏验证、未部署。

## 世界内切换光影崩溃调查（2026-10-16）

用户报告：世界内更换光影直接崩溃，单人／多人均发生；退出主菜单再切换可以工作。输入证据为本机 `C:\Users\AshBill\Desktop\错误报告-10-16-2026_2.58.56_AM.zip`，含 debug.log、latest.log、hs_err_pid2388.log 等。本轮仅只读检查归档、本机 JAR 字节码及上游 issue，未更改模组、配置、存档或搭建测试实例；未上传日志。

### 已确认的现场

- JVM 为 Microsoft OpenJDK 21.0.7+6；02:58:51 Render thread 发生 `EXCEPTION_ACCESS_VIOLATION (0xc0000005)`，故障帧为 LWJGL `MemoryUtil.memGetFloat(J)F`，读取地址 `0x000002342ea61000`。这是堆外内存读取导致的 JVM 致命崩溃，不是普通可捕获 Java 异常；报告未给出可完整归因的 Java 调用链。
- hs_err 寄存器对象现场出现 `top.leonx.irisflw.vertex.block.ExtendedBlockVertex`；同一时刻 JIT 事件包含 `IrisBlockVertexReaderImpl`、`IrisBlockVertexListUnsafe$Shaded` 和 `ExtendedBlockWriterUnsafe`。这是定位兼容层的强线索，但不能单凭寄存器对象证明具体责任代码行。
- 日志确认加载 Oculus/Flywheel Compat 1.1.4；本机相关组合为 Create 0.5.1.j、Oculus 1.8.0、Embeddium 0.3.31。本机 flywheel-client.toml 为 INSTANCING；它是调查时本机值，不当作归档内配置快照。
- 02:58:50.538 销毁旧 overworld pipeline；50.858 加载 `Sildur's Vibrant Shaders v1.541 Extreme-VL.zip` 并创建新 pipeline；51.631–51.643 区块工作线程重启，随后 JVM 崩溃。
- `BIOME_SWAMP_HILLS` 未知变量是此前的光影 uniform 警告，之后日志仍继续创建／处理渲染资源；不能将它直接认定为这次致命崩溃原因。当前故障帧也不是显卡驱动 DLL，不能仅凭本报告优先归咎显存、驱动或 Java 版本。

### 代码与上游证据

当前兼容模组 `IrisBlockVertexReaderImpl` 以 `base + index * vertexSize + offset` 计算地址，再直接调用 `MemoryUtil.memGetFloat`；vertexSize 来自 Iris TERRAIN 格式。`MixinBlockModel` 根据是否使用扩展顶点格式处理 DrawState 的格式。结合热切换时序，首要假设是旧缓冲／缓存与新格式或资源生命周期不同步，导致无效地址读取；尚未区分越界、释放后访问、格式步长不一致等具体机制，没有证明某个缓存遗漏清理。

相关上游报告：[#188](https://github.com/leon-o/iris-flw-compat/issues/188) 描述带光影进世界正常、在 Create 结构附近开关光影崩溃，并提及 vertex；该报告基于 Fabric，不是当前 Forge 组合的完整同案证明。[#185](https://github.com/leon-o/iris-flw-compat/issues/185) 报告 Oculus 1.8.0 与兼容模组启用光影时崩溃。查询时均 open，未确认当前组合已有可直接应用的修复版本。

### 结论与最小验证

高优先级嫌疑为 Oculus/Flywheel 兼容层在世界仍加载时进行光影热切换的顶点内存问题，具体根因待对照复现确认。退出主菜单会卸载世界渲染状态、重新进入再生成数据，这与用户绕过方法吻合；多人也由本机渲染，故无需服务端发生故障即可触发。此解释为基于证据的推断。

下一步建议只在客户端临时停用 `oculus-flywheel-compat-forge1.20.1+1.1.4.jar` 并重启，保留 Create／Oculus／Embeddium／同一光影，在相同位置测试开关及更换光影；记录原光影和目标光影。未自动执行停用，未改索引。若对照不再崩溃，再决定保留主菜单切换的绕过方法、接受取消兼容层可能带来的 Create 光影渲染性能变化，或进一步定位补丁；若仍崩溃，应收集新的 hs_err 比较，不能坚持单一归因。首轮不同时更换 Java、驱动或多个渲染模组。

### 光影重载代码追踪补充（2026-10-16，保留全部模组）

**取代上节的下一步建议：** 用户要求保留全部模组，先定位缓存清理与重建逻辑；上节“临时停用兼容模组”仅保留为历史方案，本轮不采用。没有修改运行配置、索引或 JAR，没有编译或启动测试实例。

依据实际安装 JAR 的 javap 字节码，检查 Oculus 1.8.0、Oculus/Flywheel Compat 1.1.4、Create 0.5.1.j 及其内嵌 Flywheel 0.6.11-13。仓库外分析副本和字节码文本位于 `C:\mydata\Agents\Codex-CreateTrainResync\shader-audit`；Flywheel JAR 从已有 Create JAR 的 META-INF/jarjar 提取，没有下载新 JAR。未修改 sourceref 目录；Create 参考源码仅辅助阅读，关键路径用安装 JAR 核对。

#### 重载确实存在，不能笼统称为没有清理

1. Oculus `Iris.reload()`：initialize config → destroyEverything → loadShaderpack → 世界非空时 preparePipeline。
2. `destroyEverything()` 先清 currentPack，再销毁旧 pipeline；`PipelineManager.preparePipeline()` 在 WorldRenderingSettings.isReloadRequired() 为 true 时调用 `LevelRenderer.allChanged()`，随后清除该请求标志。
3. Flywheel `LevelRendererMixin` 注入 allChanged，调用 Backend.refresh 并发布 ReloadRenderersEvent。
4. `InstancedRenderDispatcher.onReloadRenderers` 在 backend 开启且世界非空时 resetInstanceWorld；替换 InstanceWorld 并 loadEntities。旧 InstanceWorld.delete 会删除 engine、解除光照监听。
5. Create 的 `ContraptionRenderDispatcher.onRendererReload` 也调用 reset 清理并重建其世界级渲染状态。

以上是静态调用链，不是本次崩溃的完整动态调用追踪；但已足以修正“热切换没有重建 Flywheel”的泛化推断。

#### 更具体的缺陷候选：复用构建器的强制格式标记不复位

- Flywheel `ModelUtil` 使用静态 ThreadLocal<ThreadLocalObjects>，其中 shadedBuilder/unshadedBuilder 是复用 BufferBuilder。ThreadLocalObjects.begin 的顺序为：两个 builder.begin(QUADS, BLOCK)，然后 wrapper.prepare(builder1, builder2)。end 调用 wrapper.clear 再 endAndCombine；wrapper.clear 只清 consumer 引用。
- Compat `MixinShadeSeparatingVertexConsumer.irisflw$prepare` 仅在 `!isUsingExtendedVertexFormat()` 时，对两个 builder 调用 `irisflw$setForceBlockFormat(true)`。开启光影分支没有对称地写 false。
- Compat `MixinBufferBuilder` 中字段 `irisFlw$forceBlockFormat` 仅由上述 setter 写入；检查兼容 JAR 的全部 class 字符串引用，只命中 accessor、该 mixin 和 ShadeSeparating mixin，没有找到重置调用。它的 begin HEAD ModifyVariable（mixin priority 1010）在 forceBlockFormat && isShaderPackInUse 时将 extending 置 false，并返回普通 BLOCK 格式。
- 读取端 `ExtendedBlockVertex.createReader(ByteBuffer, count, unshadedStart)` 只检查当前光影状态。开启时无条件创建 IrisBlockVertexListUnsafe.Shaded，其内部 IrisBlockVertexReaderImpl 以 Iris TERRAIN 的 vertexSize 计算地址，调用 memGetFloat；没有根据该缓冲实际 DrawState 格式选择 reader。
- `BlockModel` 构造器先允许普通 BLOCK 格式，再将缓冲交给全局 Formats.BLOCK.createReader；兼容层替换了 Formats.BLOCK。由此存在“普通格式写入、扩展格式读取”的具体可达风险。模型清理不等于线程局部构建器的自定义标记复位。

归档 latest.log 新补证据：00:34:52 明确 Shaders are disabled；直到 02:58:50 首次出现 Using shaderpack Sildur's。因此这份样本至少是无光影运行后启用光影，恰好符合该残留标记的触发条件；不能直接把该解释推广成任意光影 A→B 都必然同因。

**证据边界：** 单向置 true 且无复位、构建器复用、reader 按全局状态选择，这些均已在安装字节码确认；但没有实际变换后的 BufferBuilder 类和运行时格式日志，Oculus 自身也在 begin HEAD 注入扩展格式，故合并后的实际执行顺序、这次读取对象和容量仍需验证。当前是比“泛泛缓存问题”更具体、更强的根因候选，不宣称已复现或完全确诊。线程局部对象可能跨退世界继续存活，所以不能把“退主菜单就能换”全部解释成这一标记自动清除；也不能排除其他缓存路径共同参与。

#### 修复决策前建议

优先在保留所有模组的前提下，给切换后首次相关模型构建增加小范围诊断：记录实际 DrawState 格式／stride、vertexCount、ByteBuffer.limit、光影状态及 forceBlockFormat，并在进入 unsafe reader 前检查读取格式是否匹配。日志不得逐顶点刷屏；不要故意读越界地址复现 JVM 崩溃。

如果证实该候选，再修正构建器标记更新时机和 reader 格式一致性。**不能只在 wrapper.prepare 加 else=false**：它发生在 builder.begin 之后，对第一次构建可能太迟。也不建议先用全局清缓存掩盖格式错误。补丁注入点、普通／扩展格式策略及失败处理须在实际变换顺序核对后确定。此阶段只记录方案，未加入诊断或修复代码；用户下一步决定是否实施。

## 2026-10-16 agent 文档归类与视频专题合并

- 用户要求去重与减少顶层文件：顶层从 19 个文件整理为 5 个常用入口；目录导航见本页“文档目录”。模组、服务端、视频、玩法专题及历史 JSON／Excel 归入相应子目录，物品整合与 tools 保持原分类。
- 背景视频制作与企划分类合并到 `视频资料/背景视频维护.md`，两份原文正文保留，统一当前维护入口。已加入／待新增模组、服务端更新器／YSM 差异职责不同，保持独立；不因内容相关而混合状态。
- 已重算迁移文件内部及其他文档的相对链接，更新仓库与本机规则副本、更新流程本机副本中的路径；更新器仅修改文件头文档路径，没有改执行逻辑。来源 14 个文件均有迁移／合并归宿，JSON、Excel 与 HTML 字节不变；本轮相对文件链接检查为 0 个失效目标，diff 空白检查通过。
- 操作前完整文档备份：`C:\mydata\Agents\Codex-CreateTrainResync\agent-docs-before-20261016`。保留开工前已有光影调查、规则与菜单配置改动，以及同期其他任务新增的构建相关改动；不回滚或代为提交。本轮未打包、未提交、未 push。

### 临时光影诊断 mod 已构建并入测试包（2026-10-16）

用户授权制作独立、仅日志的诊断 mod；整个工程留在仓库外，仅产出 JAR 临时入包，不上传 Modrinth，不放入 TrainResync。此前“尚未加入诊断”的段落为历史状态，修复代码仍未实施。

- 独立工程：`C:\mydata\Agents\Codex-CreateTrainResync\shader-switch-debug`，含源码、Gradle wrapper、本机编译依赖副本、测试与构建日志；不在整合包仓库内。
- 临时 JAR：`pack/overrides/mods/shader-switch-debug-0.1.0.jar`（11,284 字节）。复制后 SHA-256 与构建产物一致；哈希见本节末尾。不改索引，不提供 shared/两服引用：这是客户端诊断，非服务端功能。
- 针对 Minecraft 1.20.1、Oculus 1.8.0、IrisFlw 1.1.4、Flywheel 0.6.11 系列。Mixin 只列在 client 数组，使用已核对的实际方法名，不需要 MC 重映射；compileOnly 依赖从现有本机库复制，没下载 JAR。独立 Gradle Java 工程使用 `gradlew.bat build`，未添加命令行选项；Java 编译配置禁用注解处理器，因为使用明确 runtime target 且 remap=false，不生成 refmap。
- 记录点：Iris.reload HEAD/RETURN；Flywheel onReloadRenderers HEAD/RETURN；ModelUtil.ThreadLocalObjects.begin 前后（后者已完成 prepare）；BlockModel 两种直接构造器 RETURN。最后一点发生在 reader 对象创建之后、调用方开始读取顶点之前，并非拦截或替换每次 memGetFloat。构造阶段自身异常不保证有该行。
- 内容：光影状态、重载代数、线程、构建器 identity 与 forceBlockFormat、实际格式与 stride、预期 reader 格式、实际 reader 类、vertexCount、unshadedStart、ByteBuffer position/limit/capacity/direct、预期读取字节数；格式错配时附有限调用栈。以 `FORMAT_MISMATCH_BEFORE_VERTEX_READ` 搜索关键结果；`DIAGNOSTIC_ERROR` 表示反射观测失败，不能当成格式正常。
- 日志同时进入实例 `logs/latest.log`（前缀 ShaderSwitchDebug）和独立 `logs/shader-switch-debug.log`。独立文件每行 flush，每次客户端启动保留上次文件为 `shader-switch-debug.previous.log`。每代普通模型最多 12 行、异常模型 20 行、异常栈 3 行，构建前后各 12 行，整个会话最多 1,800 行；达到上限输出 LIMIT 后停止，不逐顶点刷屏。
- 没有 setter 修改、事件取消、缓存清理、格式替换或异常吞掉原渲染调用；诊断自身的反射／写日志失败会被记录。格式错配仍继续原调用，原生崩溃仍可能发生；同步日志可能影响时序，不能把一次未崩溃直接当作修复成功。

验证：可见 PowerShell 中构建成功（最终退出码 0）。纯 Java 诊断自检通过：普通/扩展格式识别、错配判定、SRG 字段/方法别名、缓冲内容和 position/limit 不变、force 标记不变、反射错误记录、每代与全会话限流及日志 flush。自检使用模拟元数据，不证明游戏 Mixin 实际注入；自检日志中 log4j-core 缺失仅触发测试环境 SimpleLogger 回退，运行游戏使用其既有 Log4j。检查 JAR 仅含本 mod 类、mods.toml、mixin 配置和 manifest，不含测试模拟类或编译依赖。

已按当前新 build.bat 流程后台打包：退出码 0，7z 显示 Everything is Ok；产物 `C:\mydata\Repositories\niijima-railways-modpack\build\pack.zip`（130,637,786 字节）。构建前旧 output/ 不存在；未额外解压或执行 ZIP 测试。未在游戏加载验证，未 commit、未 push、未部署服务器，未修改现有本机游戏实例。

用户下一步：安装本轮包（或仅将上述 JAR 加入原实例 mods），完整重启客户端；沿原来的世界内切换步骤复现。收集独立诊断 log、latest.log 和若产生的新 hs_err。若启动失败，也保留启动日志检查注入点。首次测试关注无光影→启用，再区分已启用光影 A→B；无需移除任何原有模组。

清理：测试完成后移除包 overrides 及实际测试实例里的这一个诊断 JAR，再重新打包；不改 TrainResync 或其他模组。不得将临时诊断 JAR 随正式包发布。
产物 SHA-256：`C28305907542D8A234068D01336131977F3C982BF5961B972951EF5EA891EF44`。

补充（2026-10-16）：用户要求执行 build-test.bat，并要求此次首次展开下载在可见 shell 中监督。已在独立 PowerShell 窗口运行成功，退出码 0，7z Everything is Ok；产物 build/pack-test.zip，589,035,846 字节，包含当前 overrides 的临时诊断 JAR。索引文件已由测试构建展开，原项目索引未改；缓存位于 build/cache。未额外测试或解压 ZIP，未游戏验证。首次后台尝试因子 Windows PowerShell 找不到 Get-FileHash 失败；为本次启动设置 Windows PowerShell 的 PSModulePath 后恢复正常，未改系统环境或仓库构建脚本。可见运行脚本、日志和退出码记录位于独立工作目录的 build-test-visible.ps1 / build-test-visible.log / build-test-visible.exit；窗口结束后保留供用户查看。

补充（2026-10-16，资源元数据修正）：用户启动截图出现 shader-switch-debug 无有效 ResourcePackInfo 警告。独立工程原先缺少 pack.mcmeta，现补齐 pack_format=15 的资源元数据；诊断逻辑不变。同名 0.1.0 JAR 已重建成功（build 退出码 0），并确认 JAR 内实际包含 pack.mcmeta，已替换包 overrides。上方旧 JAR 大小、SHA-256 和包大小仅适用于修正前产物，现已过时。游戏启动警告消失与诊断注入仍待用户实测。

### 光影崩溃运行时证据（2026-10-16 04:36，Asia/Shanghai）

用户观察：刚进世界切光影成功，放下矿车和动力辊压机之后切换崩溃。直接读取 PCL2 实例“新岛铁道 v1.6.0”的日志；证据副本保存在仓库外 C:\mydata\Agents\Codex-CreateTrainResync\shader-audit\runtime-20261016-043606，包含 shader-switch-debug.log、latest.log、hs_err_pid18380.log。

- 04:35:24 无光影→开启，04:35:29 开启→关闭，两轮均正常返回，期间诊断未捕获 BlockModel 构建。
- 04:35:56 出现 create:mechanical_press 与 create:shaft 模型；关闭光影时实际/reader stride 都为 32，容量分别为 3712（116 顶点）、768（24 顶点），匹配。
- 04:36:05–06 再次无光影→开启，Flywheel 重建与 Iris reload 均返回；随后两模型触发 FORMAT_MISMATCH_BEFORE_VERTEX_READ。实际仍是普通 BLOCK（stride=32），reader 已为 IrisBlockVertexListUnsafe$Shaded，预期 TERRAIN（stride=52）。辊压机只有 3712 字节，读取布局需要 6032；杆只有 768 字节，读取布局需要 1248。构造完成后、顶点消费前已抓到错配。
- 同秒 JVM Render thread 在 MemoryUtil.memGetFloat 抛原生 EXCEPTION_ACCESS_VIOLATION；hs_err 可见 ExtendedBlockVertex 与 IrisBlockVertexReaderImpl/ExtendedBlockWriterUnsafe 相关证据。运行时格式错配现在已确认，是本次越界崩溃的强证据，替代此前“尚无运行时格式证据”的限定。
- 诊断存在局部缺陷：builders 分支出现 NoSuchMethodException: getVertexSize,m_86020_，因此未取得完整的后续 forceBlockFormat 轨迹。模型分支独立读取 DrawState 成功，不影响上面的错配证据；“force 标记残留导致错配”仍是待验证的上游机制，不能称完全证实。
- 解释用户观察：无相关模型时不触发此读写路径；添加 Create 模型后触发。当前调用栈明确包含 PressInstance 和 SingleRotatingInstance，不能断言矿车必需或它完全无关，也不推广为任何光影 A→B 都同因。
- 下一步建议：先修正 builders 诊断，再在独立测试补丁中验证 builder.begin 前按当前光影状态更新强制格式标记，使写入格式与读取布局一致；不得只在发生于 begin 之后的 prepare 中重置。尚未实施行为修复，未替换用户实例文件。

补充（2026-10-16，诊断 0.1.1）：用户授权进一步诊断。builders 不再把第一个名为 format 的字段直接当作 MC VertexFormat；分别遍历类层级中的 f_85658_ / format，记录声明类、声明类型、实际类型和格式读取结果。单字段解析失败会标注 formatUnavailable，仍输出 forceBlock 和两个 builder，避免整条诊断丢失。用于确认是否同名非 VertexFormat 字段干扰反射，并补齐切换前后强制标记轨迹；尚未有新运行日志，不宣称该原因已确认。模拟非格式字段与真实格式并存的回归自检通过，可见 gradlew.bat build 退出 0；pack.mcmeta 已包含。包 overrides 用 0.1.1 替换 0.1.0，仍仅日志、无行为修复，未改用户实际实例。用户需完整重启加载新版后按原步骤复现，查看 START 0.1.1 及 BUILDERS_BEFORE_BEGIN / BUILDERS_AFTER_BEGIN_AND_PREPARE。旧版本记录保留为历史。
补充（2026-10-16）：用户授权直接更换 PCL2 新岛铁道 v1.6.0 实例中的诊断 helper，现已放入 0.1.1 并移除实例中的 0.1.0；旧 JAR 已备份至独立工程 shader-switch-debug/instance-backup-0.1.0。需完整重启后复现，尚无新版运行验证。helper 后续允许后台 build，规则已同步本机及仓库。

### 0.1.1 复测：强制格式标记残留已观测（2026-10-16 04:49，Asia/Shanghai）

本次 START=0.1.1；证据备份为独立工作目录 shader-audit/runtime-20261016-044913，含诊断日志、latest.log、hs_err_pid29704.log。
- 初始开光影构建成功：shaded builder identity=689940033，unshaded=1603874265；forceBlock=false，实际与 reader stride 均为 52。
- 04:49:11 关闭光影：同两个 builder 在 begin 前 forceBlock=false，begin+prepare 后变 true，实际与 reader stride 均为 32，正常。
- 04:49:13 再开启：同两个 builder 在 begin 前、begin+prepare 后 forceBlock 均残留 true；实际格式仍为 32，reader 却切到 52。辊压机 3712/6032 字节、杆 768/1248 字节的容量/读取需求错配再次出现，随后 Render thread 在 memGetFloat 原生访问违规崩溃。
- 结合既有兼容层字节码，标记跨切换残留→强制普通格式写入→扩展格式读取的机制现有运行时链条支持，替代此前“尚未观测强制标记轨迹”的限定。无需继续为这条路径增加纯诊断轮次，可进入最小修复实验：在这两个 Flywheel 专用 builder.begin 之前按当前扩展格式状态同步 forceBlock，保留日志对照；修复有效性尚未测试，未实施。
- 0.1.0 反射失败原因也确认：BufferBuilder 同时含 MC f_85658_（VertexFormat）与渲染层 format（Sodium VertexFormatDescription）。后者没有 getVertexSize；0.1.1 的 formatUnavailable 仅针对这个旁支字段，真实格式和 forceBlock 已正常记录，不是新的游戏异常。
- 本轮只读取/归档日志并记录结论，未改实例、未构建、未提交。

### helper 0.1.2 最小修复实验（2026-10-16）

用户授权先修 helper，实测确认有效后再整合 TrainResync。此前“仅日志”说明仅适用于 0.1.0/0.1.1；0.1.2 已包含行为修复。复用已在游戏验证的 ModelBuildersMixin、ThreadLocalObjects.begin()V HEAD 注入（remap=false，require=1，allow=1），先记录原状态，再在原方法执行两个 BufferBuilder.begin 之前，按 !IrisFlw.isUsingExtendedVertexFormat() 调用两个构建器现有 irisflw$setForceBlockFormat(boolean) setter。通过反射访问已核对的第三方字段/方法，无新增 shadow；既有 client-only mixin 清单与 manifest MixinConfigs 保持一致，无 refmap 需求。两个 setter 先全部解析再修改；反射失败记录 FIX_FAILED 并抛 Java 异常，不静默继续潜在 unsafe 读取。每代限量记录 FIX_BEFORE_BUFFER_BEGIN，实际模型格式日志保留。

验证：后台 gradlew.bat build 成功（退出 0）；自检覆盖两个标记开/关/开及重复状态同步、不直接修改格式对象、失败不静默，以及原诊断测试。成品 JAR 的 manifest、client mixin 清单、目标 class、pack.mcmeta、0.1.2 元数据均检查通过。尚未游戏验证修复，等待反复开关光影及光影 A/B 切换，检查模型外观与 FORMAT_MISMATCH 是否消失。

用户因实例运行中暂停替换，随后明确告知可以操作，现已将包 overrides 与 PCL2“新岛铁道 v1.6.0”实例中的 0.1.1 替换为 0.1.2（12,518 字节）。实例旧版备份在独立工程 shader-switch-debug/instance-backup-0.1.1。未修改 TrainResync。启动应见 START 0.1.2; pre-begin format fix enabled。临时 helper 不随正式包发布；后续整合 TrainResync 时须移除 helper，避免重复注入。等待用户实测，不宣称修复验证通过。
本轮 build.bat 成功（退出 0），build/pack.zip 已包含 helper 0.1.2；未重跑 build-test，build/pack-test.zip 仍是旧产物。未提交。

### 光影修复迁入 TrainResync，恢复 K（2026-10-16）

用户反馈开关光影不再崩溃，授权日志确认后迁入 TrainResync。实际此次运行 helper 为另一任务加入牛奶探针的 0.1.3；日志四次 reload（两轮关→开），两次开启均明确记录同对 builder forceBlock=true→false，随后辊压机和杆模型实际/reader stride=52；关闭时 false→true 且 stride=32。FORMAT_MISMATCH 与 FIX_FAILED 均为 0。用户无崩溃反馈与状态转换证据相符，修复已在 helper 场景实测；证据副本 shader-audit/runtime-20261016-fixed。

已整合到实际仓库 C:\mydata\Repositories\Create-Train-Resync（main），而非独立工作区的旧源码副本。TrainResync 测试版 1.6.0.h：client.FlywheelShaderReloadMixin 使用已验证的 ThreadLocalObjects.begin()V HEAD、remap=false、require=1、allow=1；@Pseudo 用于可选第三方编译目标。只在 client 清单，插件检查 oculus/irisflw/flywheel 三者存在才应用，不添加硬依赖。FlywheelShaderFormats 通过原 compat setter 同步两 builder，解析两个 setter 后才写入；不改变格式对象、顶点内容或缓存。不复制 helper 的高频诊断。反射失败抛明确异常，避免默默继续原生越界。适用证据仍为 MC1.20.1/Create0.5.1.j/Flywheel0.6.11/Oculus1.8.0/IrisFlw1.1.4，未验证其他组合。

用户确认保留牛奶探针：helper 0.1.4 保留牛奶探针和光影观测，ModelBuildersMixin 不再调用 synchronizeBuilderFormats；START 明示 shader fix delegated to TrainResync。因此生效的修复只有 TrainResync 一处。此前“移除整个 helper”不适用于当前牛奶测试，未来正式发行仍要清理临时 helper。

构建：TrainResync 在可见 PowerShell 中只执行 gradlew.bat build，退出 0；helper 后台同指令退出 0，诊断和牛奶探针自检通过。直接编译生产桥接类的独立自检验证反复状态同步、先解析双方再写入、失败不静默；无 Minecraft 运行环境。成品 -all JAR 检查新 mixin/桥接 class、manifest、mixin 清单、refmap 与 jarjar 元数据均在。TrainResync 集成版尚待游戏复测，不能把 helper 实测自动视为集成 Mixin 已验证。

确认实例未运行后，包 overrides 与 PCL2 新岛铁道 v1.6.0 实例均已换为 trainresync-1.6.0.h-all.jar（673350 字节）和 shader-switch-debug-0.1.4.jar（19489 字节），旧 g/0.1.3 已移出；实例旧 JAR、options.txt 备份在独立工作目录 shader-audit/before-trainresync-h。检查服务器来源只有 train-cn 仍引用旧 a 版，保持已知包服差异；这是客户端光影修复，未升级服务端来源或部署服务器。发布 Modrinth 后改回索引获取的既有待办仍保留。

用户要求恢复 K 光影切换：包与实例 options.txt 的 iris.keybind.toggleShaders 从 unknown 改为 k。修改前两份保存配置均无其他 K 或 Ctrl+K 条目；不覆盖未保存默认键/硬编码输入。保留其他个人设置。build.bat 已成功生成 build/pack.zip（130647299 字节），未运行 build-test，旧 pack-test.zip 不适用于这轮集成测试。源码和包变更未提交，等待用户启动实测 K 开关、多轮切换和牛奶探针。

### TrainResync Mixin 目录整理（2026-10-16）

用户授权应用结构优化。实际 TrainResync 仓库 main 的 mixin 根目录仅保留 TrainResyncMixinPlugin；20 个 Mixin 按 vanilla、create、pantographs、trainlights、simpleplanes、shaders、maid、mcef 分组。迁移 13 个类；PantographBlockEntityAccessor 随受电弓功能放入 pantographs，旧 accessor/client 空目录移除。Mixin JSON 同步新路径并按包/类排序，仍使用一个配置，光影和 MCEF 保持 client-only。

加载插件改为完整功能包前缀匹配与 hasMods 辅助方法，保持现有依赖条件：Create 两项、受电弓五项、女仆六项、车灯 ctl、飞机 simpleplanes+supplementaries、光影 oculus+irisflw+flywheel，以及 MCEF 的 Windows 条件；原版与未知分组保持原 true 回退。包名现在代表功能依赖，新增不同依赖的 Mixin 应使用独立分组。

验证：20 个源码与配置一一对应；与 Git HEAD 比对所有 Mixin 源码，除 package/Accessor import 外实现完全一致，注入方法/优先级/remap 未改。可见 shell 执行原始 gradlew.bat build 成功（退出 0），最终 -all JAR 包含全部 20 个新路径类，无旧路径 Mixin 类残留，vanilla 新路径 refmap 已生成。尚未游戏启动验证。版本仍为 1.6.0.h（仅结构重整）；包 overrides 的同名测试 JAR 已更新，重整前副本位于独立工作目录 shader-audit/trainresync-h-before-reorganization.jar。未替换运行实例，未修改其他任务的 helper 0.1.7 等资源，未提交本轮结构调整。
本轮结构整理后 build.bat 退出 0，build/pack.zip 已更新；build-test 未运行。包按当前工作树构建，包含其他任务既有修改。
补充（2026-10-16）：用户授权将整理版换入实例并提交。确认 PCL2 新岛铁道 v1.6.0 未运行后，实例 trainresync-1.6.0.h-all.jar 已替换为结构整理后的构建，与构建源哈希一致；旧实例 JAR 备份在独立工作目录 shader-audit/instance-before-mixin-reorganization。此前“未替换实例、未提交”仅为上一轮状态。TrainResync 提交 f792c5a（Organize mixins by feature and simplify dependency gates），工作区干净，收尾 fetch 后 main 领先 origin/main 1、落后 0，未 push。游戏复测仍待用户；包及 pack.zip 已在上轮更新，本轮未重复打包。

## 汉化本日暂停交接（2026-10-17）

用户明确要求写完币名待办后收尾，待之后再继续。当前累计初筛49/111、新增2604键／旧译修正508处、偏好调整53处另计；静态结果不等于游戏验收。已应用至ST048（ST005等早期遗留仍待处理），ST049为102键本地草稿，尚未应用，六种币拟改“X元币”但面额未定，见待办及ST049报告；ST050已开始核对，未应用，见阶段报告。不要将ST049/ST050计入完成数。下一次继续从这两项及早期遗留接续，不重跑已有st040–st048-build.py累计写入脚本。后续仍可连续完成，无需十项停一次，但本次用户休息期间停止工作。所有新增语言覆盖仍需游戏复核；本轮未提交或部署，工作树另有其他任务改动，保留并区分。

## 2026-10-18 跨机交接快照

- 本轮按功能提交测试包默认设置、版本迁移报告归档、汉化资源与阶段报告、helper 0.1.17及炼药锅验收表、橙子整合方案。此前段落中未提交／0.1.9或0.1.10等仅表示当时状态；实际包以0.1.17为准，游戏复测仍待进行。橙子方案未实施，ST049币名与ST050审校尚未完成，不能把方案提交视为功能上线。
- 汉化当前49/111初筛，游戏0/111；ST049的102键未应用草稿已入agent/模组管理/汉化/草稿。继续时以进度表与逐模组报告为准，不重跑旧累计写入脚本。
- helper源码在仓库外milk-integration-helper的本地Git，最新提交75fdb61；没有远端。整合包Git只保存测试JAR，另一台机器需额外携带本机 C:/mydata/Agents/Codex-CreateTrainResync/跨机交接-20261018/ 中的bundle和辅助资料。用 git clone milk-integration-helper.bundle milk-integration-helper 恢复源码历史；libs与SRG等编译依赖、Java17和build.gradle中的绝对路径须按新机器核对，不能仅clone后假定可直接编译。
- 辅助资料包保存现有helper libs、ST049/ST050草稿与核对证据；不含凭据、游戏存档或整个Gradle缓存。bundle不通过Git push上传，需手动复制交接目录。
- 测试包默认音乐10%、FOV110、灵敏度50%，世界启动时关闭昼夜/天气循环并设day/clear；只作用于build-test副本，具体规则见整合包更新流程。现有测试世界规则会保存。另一台机器重新构建，build产物和缓存不随Git。

## 2026-10-19 TrainResync 1.6.0.i接触网汉化

已按用户要求把四条PAW硬编码玩家文本接入语言JSON，编译并更新pack/overrides/mods，build/pack.zip打包成功。用户明确选择实例稍后替换；当前本机测试实例仍为h版，未游戏验证。两仓库改动均未提交。实现、成品哈希、备份及待测步骤见[ST003报告](模组管理/汉化/逐模组报告/ST003-Pantographs-and-Wires.md)的2026-10-19章节。其他硬编码模组尚未获此轮实现授权。


## 2026-10-19 收尾交接状态更新

上文“未提交／实例仍为h版”是当时记录，当前状态如下：TrainResync main 的语言修订已在 8739df2，工作区干净且与 origin/main 同步；包内和测试实例已使用1.6.0.i。包内JAR与TrainResync构建产物SHA-256均为 DDA9721124C0ECBDBEE4C4FAD75ACA7A8109CB84CDAA059104878BC27DD57FA4。语言功能仍待游戏验证。

本轮剩余汉化资源、客户端tooltip脚本、配置提示和逐模组报告以WIP保存，未完成的审校／代码层残留继续按汉化报告处理。40个新增或修改JSON的解析与重复键检查、tooltip脚本语法检查通过，不代表游戏内排版及行为验收通过。此次仅整理提交，未重新构建或启动游戏；此前0.1.27的build和build-test均成功。

炼药锅接续[测试反馈mini todo](物品整合/炼药锅测试反馈-20261019.md)：01–04已修待复测，05起继续讨论。helper独立本地仓库为64bf716，无远端；最新完整历史已导出并验证至 `C:/mydata/Agents/Codex-CreateTrainResync/跨机交接-20261019/milk-integration-helper.bundle`。跨机需单独携带该文件；20261018旧bundle不含最新源码。编译依赖、缓存、测试实例和日志不纳入Git，仍按旧交接说明另行准备。


## 2026-10-24 收尾：炼药锅 mini todo 与集中待办

本轮mini todo讨论与实现已完成，01–06、09待用户游戏复测；14留到未来helper迁入TrainResync时精简重构。新版helper 0.1.29已在包内与原PCL测试实例，编译／现有自检及56项Mixin静态检查通过，未宣称游戏验收。最后build.bat成功；build-test未重跑，旧pack-test.zip不能代表0.1.29。

测试HTML按共用路径由149项精简为125项，入口差异和边界分支保留，移出映射及旧记录见全模组兼容排查。149项备份在独立工作区cauldron-test-page/backup-149-before-compact-20261024；旧进度可导入，评论保留，改动步骤重置状态。下次从HTML开始复测。总todo已汇集分散待办，专题旧队列标历史，禁止按旧段落重新实施已完成工作。

helper独立Git main已提交59bfbaa（无远端），完整bundle已导出并verify至 C:/mydata/Agents/Codex-CreateTrainResync/跨机交接-20261024/milk-integration-helper.bundle。此前20261019 bundle已过时，不含0.1.28／0.1.29。TrainResync main无本轮改动。
