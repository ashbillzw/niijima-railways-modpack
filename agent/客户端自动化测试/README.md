# 本机客户端测试

在已配置本地发行目录、有可用 Minecraft 账户的电脑上运行。先按《整合包更新流程》构建并登记测试包，再传入索引里的 **pack-id**。例如 `1.6.test0091` 的 pack-id 是 `88`。

```powershell
$exe = 'D:/mydata/Repositories/PrismLauncher/install-niijima/niijima-launcher.exe'
python ./run.py 88 --launcher $exe --offline-name NiijimaTest --heap-mib 6144 --results D:/temp/niijima-tests
```

首次运行会用启动器的发行包导入任务创建新实例。结果写入每轮独立目录。复用实例时传入 `--reuse 上次的结果目录/installed.json`，仍会新建世界。启动器使用已有账户；可用 `--offline-name NiijimaTest` 请求其离线启动模式。账户需要重新登录时按启动器提示操作。

| 文件 | 用途 |
|---|---|
| `installed.json` | 实际实例 ID、游戏目录、发行版本和已验证的 pack-id |
| `plan.json`、`result.json` | 本轮步骤、已完成数、失败原因、当前界面、实际渲染尺寸和 GUI 缩放 |
| `screenshots/step-N.png` | 第 N 步的游戏帧缓冲截图，步骤从 0 起；失败时另存 `failure.png` |
| `latest.log`、`runner-error.txt` | 游戏日志及启动器或等待过程的错误 |

脚本退出码为 0（通过）、1（游戏内断言失败）或 2（运行环境或超时）。默认整轮游戏超时 600 秒，可用 `--timeout` 调整。实例已有测试时会拒绝第二次运行。如果异常退出后留下 `.niijima-test/runner.lock`，先确认该实例的客户端和脚本均已退出，再移除锁。测试世界和截图留在本机，便于复查。

## 写一个用例

### 在同一客户端逐题测试

复用已安装的专用实例时，运行 `run.py 88 --resident --reuse 上次的结果目录/installed.json`，启动器和内存参数同上。驱动会打印本轮结果目录，创建一个新世界并保持游戏运行。在另一终端用该目录发题：

```powershell
python session.py $session --plan cauldron/F23.json
# 审核本题 result.json、latest.log 及 screenshots 后，再发下一题
python session.py $session --plan cauldron/E32.json
python session.py $session --close
```

每条提交只执行一题，成功及失败都保留当前画面。每题的展开计划、断言结果、当题日志和截图在 `case-N/`。等待命令超时时先看现场和实例中的 `.niijima-test/<会话 ID>/case-N/`；仍在执行的题会挡住新提交。正常关闭会保存世界并释放实例。每次重新启动客户端会重新载入模组，适合修改测试工具后重试。

炼药锅题用 `{"gamemode":"survival","steps":[...]}`（也支持 `creative`）。开始下一题时关闭前一题打开的容器，选中第一个快捷栏、设定模式、清空玩家背包。场地沿 X 轴每题东移 32 格，首题基准 X 为 −32。指令中 `$x`、`$x+3`、`$x-0.5` 在下发前展开，命令方块内的指令也可使用。已有工位保留在原处。普通 JSON 步骤数组按原样执行，可用于就地检查现场。一次性 `run.py --plan` 同样支持这两种格式。

### 测试实例清理

测试完成后，用选项框询问用户是否自动删除所有旧测试实例。按本机实际实例列出拟删除的版本范围（例如 test0091–test0099，有缺号时分段列出），说明哪些实例会保留。取得当次确认后再删除；实例内的测试世界也在删除范围内。

### 单步操作

复制 [smoke.json](smoke.json)，用 `--plan 路径` 指定。每步可传 `timeout`（秒）。客户端一次只执行一步。

| 操作 | 参数与完成条件 |
|---|---|
| `waitScreen` | `screen` 为 FancyMenu 标识、原版 `title` 或游戏 HUD 的 `hud`。可传 `stableMs` 等待界面持续可见。 |
| `clickScreen` | 调用当前游戏界面的鼠标移动、左键按下及松开。`x`、`y` 为相对界面宽高的位置，中心均为 0.5。 |
| `screenshot` | 调用 Minecraft 原生截图；写好 PNG 后继续。 |
| `createWorld` | 用 `seed`（默认 1）创建独立的创造模式、和平难度、允许指令的单人世界。 |
| `waitWorld` | 等本次世界、玩家、所在区块和 HUD 就绪，且玩家已落地。 |
| `command` | 将不带前导斜杠的 `command` 作为玩家指令发送。 |
| `rightClick` | 在本轮世界的 HUD 中按一次「使用」键，由游戏处理当前准星目标。用 `/tp` 指定站位和朝向，用 `expectBlock` 或 `waitScreen` 等待交互结果。 |
| `expectBlock` | 等玩家脚下加 `dx/dy/dz` 偏移处的方块变为指定的 `block`。 |

本机接口使用实例目录中的一次性请求文件。客户端启动时认领该请求，正常手动启动时不注册执行步骤的渲染监听。用例只能在其新建的私有单人世界中执行指令。截图及建图由测试 JAR 处理，炼药锅旧工位仍可沿用 Minescript。

启动器入口是 `--install-test <pack-id> --test-result-dir <已存在的新结果目录>`。[新岛测试](../../helper-mods/niijima-test/) 是本仓库的独立 Forge 工程。修改测试模组后，在该目录执行以下命令。将第一行改为本机装有本包 FancyMenu 的实例目录。

```powershell
$env:NIIJIMA_MODS_DIR = 'D:/实例/minecraft/mods'
.\gradlew.bat build
```

构建需要 Java 17 和 `fancymenu_forge_3.7.0_MC_1.20.1.jar`。Gradle 将重映射后的模组写入工程内的 `dist/niijima-client-test.jar`，与源码一起入仓。日常运行整合包的 `build-test.bat` 直接使用该成品，普通包跳过它。

可选的 `--heap-mib` 限制本次测试的最大堆，省略时沿用启动器设置。遇到启动器的可用内存门槛，测试直接报告原因。驱动在游戏保存并退出、启动器确认同一轮结束后，才释放实例供下一轮复用。

2026-11-24 实测 test0089。新实例以 6144 MiB 堆上限自动启动，9 个步骤通过，包含点击开场、拍摄进服菜单、新建世界及读回金块。菜单与 HUD 原图均为 2560 × 1440。接着复用该实例，在另一新世界把预期改为钻石块，驱动返回 1，结果记录实际的金块并保存失败截图。两轮均未操作桌面。开场点击前后等待的是 FancyMenu 界面，网页内容仍需查看截图判断。

2026-11-25 将执行器迁入 `helper-mods/niijima-test/`，从独立工程构建并登记 test0091。逐类对照迁移前后的 JVM 指令与方法签名，除自身包名外一致。测试包内的 JAR 与工程成品逐字节相同。本次验证覆盖构建与打包，游戏实测见上一次记录。

同日更新专用 test0091 实例的测试 JAR 后，常驻模式在一个客户端、一个世界中依次通过 F23 和 E32，场地的基准 X 分别为 −32、0。审完 F23 开盒截图后才发 E32。随后从第二块场地读回第一块场地的潜影盒，名称和 3 颗钻石均保留。E34 超长指令在下发前被拒绝，拆开后在同一会话重试通过。
