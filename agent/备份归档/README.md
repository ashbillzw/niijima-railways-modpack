# Minecraft 备份归档

2026-10-25：已完成本地开发及 18 项测试，并通过共享终端正式部署。两服共 10 份硬链接已建立；远端已切换 prune，timer enabled/active/waiting，每小时执行、Persistent=yes。首轮正式运行成功，无删除候选。没有修改 SimpleBackups、原 ZIP 内容、两服或看门狗；原有手动备份不纳入管理。

## 职责与目录

SimpleBackups 继续每 2880 分钟备份、最多保留 7 份；此前目录容量上限为 create-cn 140 GB、train-cn 70 GB，容量限制可能让实际数量少于 7。归档脚本不调整模组配置，不参与生成备份。

NAS 已有目录（历史依据：2026-10-25 本机迁移记录，部署前重新核对）：

```text
/synology/MCShare/minecraft/simplebackups/
├── create-cn/
│   ├── automatic/  # 模组拥有，脚本只读并作为硬链接来源
│   └── archive/    # 拟新建，脚本独占管理
└── train-cn/
    ├── automatic/
    └── archive/
```

上层现有手动备份、legacy-moved 和网页引用不变。归档保留文件原名，例如 `create-cn_world_2026-10-25_00-06-00.zip`。时间从文件名读取，按 UTC 解释，不能用创建硬链接时刻作为备份时间。部署前核对 JVM 命名时区；服务器系统时区不等于已经证实 JVM 时区。

`archive/` 必须从空目录开始，且只能放该程序管理的备份。没有数据库或持久化清单；符合配置命名规则的文件即归其管理。不要向其中手工添加同名格式文件，人工归档继续放原有上层目录。遇到不认识的文件、子目录、符号链接，程序报错停止该服本轮处理，不自动清理杂物。

硬链接共享同一份内容，不是独立损坏隔离副本；模组删除原名字后归档名字仍有效。最后一个硬链接删除时才释放数据空间。归档链接不重复复制 ZIP，但跨日期 ZIP 仍各占全量空间。NAS 快照等机制也可能继续占用已删除文件的空间。

## 保留算法

以秒计算，1 日 = 86400 秒。月/年只是讨论时的 30 日/月、360 日/年近似显示，不参与算法。

```text
允许合并间隔 = min(max(7 日，较新侧年龄 × 0.3)，180 日)
```

按时间排列相邻三份 C（旧）、B（候选）、A（新）；只有 A-C 的间隔不超过上述阈值，才可删除 B。多个候选按“合并间隔/允许间隔”最小优先，并列时删除较旧候选。删除后重新计算，直到没有候选。采用精确分数比较，避免阈值浮点误差。

- 保护所有仍存在于 automatic/ 的归档，数量由模组决定，不在脚本中硬编码 7。
- 保护最早及最新的归档端点；不设最长历史年限。
- 延后归档或未完成的 ZIP 不作为淘汰所依赖的时间点。
- 180 日是删除后空档上限，不是固定每半年一份；无法修补停服/备份失败原本造成的空档。
- 按每两日成功备份、最近七份保护、每小时清理模拟，100/200/500/1000 日分别保留 17/21/26/30 份。此前延伸模拟 5 年（1800 日）39 份、10 年（3600 日）58 份；较老部分形成约 96 日间隔，合并为 192 日超过上限，所以不会继续合并。

## 完成判据与写入前提

脚本对新发现的 ZIP 检查：mtime 至少一小时前、中央目录可读且非空、检查前后设备/inode/大小/mtime 不变，并且对应 Forge 日志存在匹配的成功开始/结束区间。只读 ZIP 中央目录，不解压、不扫描全文件 CRC 或哈希。新文件通常需要等约 1–2 小时才会归档；这不影响模组的备份频率。

成功记录读取该备份日期前后一天的 `YYYY-MM-DD-*.log.gz` 以及 latest.log，识别 `[25Oct2026 00:05:59.542] [SimpleBackups/INFO]` 日期格式。文件名时间必须处于开始和成功结束之间，mtime 也需匹配（最多允许结束后两秒的取整误差）。错误或重叠任务不作为成功依据。ZIP 有效但找不到对应成功记录时，该服整轮处理失败，不建链接、不淘汰；不会静默跳过失败备份再删除其他备份。仅检查待新增的文件，不重复扫描已归档文件的旧日志。模组版本、日志格式或语言改变时需要重新核实。

**这些检查并不能独自证明文件永远不会再被写入。** 部署前必须核对 SimpleBackups 1.20.1-3.1.16 的写入/关闭/轮换顺序，确认有效 ZIP 关闭后内容不再原地改写，核对部分文件命名及失败处理。示例配置 `completion_contract_verified=false` 会阻止两种写入模式；只有完成核实后才可改为 true。不能把“mtime 一小时没变”冒充模组完成信号。如核查发现中央目录生成后还会修改内容，应先调整实现，而不是仅解除开关。

已归档文件不每小时重读中央目录。硬链接使源与归档共享内容，生产者关闭后的不可变性是前提。

## 运行方式

Python 3.10+ 标准库，无第三方 Python 依赖。Linux 需要 findmnt、系统时区库及 systemd。Windows 可运行算法和临时文件测试，但不能代替 NAS/systemd 验收。

```text
python archive.py --config config.example.json --mode dry-run
python archive.py --config config.example.json --mode link-only
python archive.py --config config.example.json --mode prune
```

默认 dry-run：不创建目录、不建链接、不删除文件；输出拟建链接、拟删除文件及预计剩余数量。目录必须已存在。

link-only：创建缺少的硬链接，显示淘汰建议但不删除。

prune：先建链接，再按规则淘汰。写入前验证 NAS 是指定 NFS 挂载、目录位于该挂载下、无目录符号链接且处于同一文件系统。同名文件不是同一 inode 或发生变化时拒绝覆盖。建链接失败时不进入淘汰。

每次删除前重新核对挂载、automatic/ 清单及全部剩余归档的元数据。源目录发生轮换、新增或修改时停止本轮删除，下一小时重新计算。单次 unlink/link 是独立操作；中途退出可能留下部分已完成的安全步骤，下次重新扫描，无恢复清单、无额外备份副本。

这不是跨进程文件系统事务：最后一次检查和 unlink 之间仍存在竞态窗口。因此 archive/ 必须只由本服务写入，模组必须遵守完成 ZIP 不可变约定；不允许其他脚本同时整理归档。两服分别处理，一服失败会记录错误并继续处理另一服，整体退出码为非零。

## systemd 部署设计

| 仓库文件 | 拟安装路径 |
| --- | --- |
| archive.py | /usr/local/libexec/mc-backup-archive.py |
| config.example.json | /etc/mc-backup-archive.json |
| mc-backup-archive.service | /etc/systemd/system/mc-backup-archive.service |
| mc-backup-archive.timer | /etc/systemd/system/mc-backup-archive.timer |

样例 service 默认 dry-run。systemd 以 root 启动系统自带 setpriv，由 setpriv 在执行 Python 前切换到 NAS 文件所有者的数字 UID 1024/GID 100，并清除附加组；归档 Python 不以 root 运行，也不创建系统账号。2026-10-25 首次部署发现本机 systemd 249 使用直接 User=1024 会以 217/USER 失败，因为该 UID 没有本地账号记录；因此准备改用 setpriv。ProtectHome=read-only 允许读取原实例日志。源/归档目录不做单独的只读 bind mount，避免跨挂载视图影响硬链接。

timer 每小时触发一次，Persistent=true 在停机错过日历触发后补执行一次，不重放全部错过的小时。安装后需显式 enable timer 才会随开机恢复。

同一个 oneshot service 运行期间不会并发启动第二个实例；不实现锁文件。所有手动写入也必须通过同一个 `systemctl start mc-backup-archive.service`，不要直接运行第二个 Python 进程。直接 Python 命令仅用于理解接口、本地测试或确认没有活动服务时的只读预览。

TimeoutStartSec=15min 约束常规运行，KillMode=control-group 处理进程组。**hard NFS 的不可中断内核 I/O 不保证能被超时立即杀死**；遇此情况需恢复 NAS，不能把超时称为可靠的故障隔离。脚本不停止或启动 Minecraft；但共享 NAS 故障本身也可能影响模组，这不由归档脚本消除。

日志进入 journal；失败以非零退出报告，没有另外部署通知服务。停止 timer 可暂停后续归档，但不自动终止当前运行；如需停止当前运行需另行停止 service。模组本身继续管理 automatic/。

## 部署验收边界

当前只有本地开发授权。以下阶段尚未执行，远端写入前需向用户展示确切命令、路径并通过选项框批准：

1. 只读确认模组完成判据、命名/时区、挂载、现有文件和运行用户权限条件。
2. 批准后创建隔离小文件验证 NFS 硬链接/权限，清理测试文件；创建空 archive/ 并安装上述四份文件。通过 `systemd-analyze verify` 检查实际系统兼容性。
3. 用真实文件做 dry-run 审阅，再获准运行 link-only；检查 inode、链接数及模组轮换后归档仍可读取，不为测试删除真实源文件。
4. 审阅淘汰名单后获准将 service 改成 prune 并启用 timer；确认首次及定时运行日志。无需改 SimpleBackups 或重启两服。

源码和示例可随仓库同步；没有提供一键安装脚本，也没有自动执行部署。调整稀疏系数只能影响仍存在的备份，不能找回已淘汰日期。

## 本地验证

在本目录执行：

```text
python -B -m unittest -v test_archive
python -B simulate.py --days 100 200 500 1000
```

2026-10-25 Windows Python 3.13：18 项测试通过，使用少量临时 ZIP 验证真实 NTFS 硬链接；涵盖源文件保护、最早端点、逐次间隔上限、重复运行、删除源名字后内容仍可读、同名不同 inode 拒绝覆盖、不完整/新 ZIP 延后、空源目录、不识别文件、并发变化、链接失败不淘汰、错误挂载及写入门槛，以及缺失/失败/压缩轮换日志。模拟回归包含四个时间点数量与 1000 日完整保留名单。

首次受限沙箱执行因 Windows 临时目录权限失败；在获准的本地工具环境重跑通过，不是远端权限测试。NAS 硬链接、Linux systemd 运行及真实 ZIP 淘汰仍未验收。

## 2026-10-25 远端只读部署核查

- 共享终端仍连接 custom-sz-cn，两服及 mc-watchdog-r2 均 active；Python 3.10.12、systemd 249。NFS 挂载与示例配置一致；两服 archive/ 及四份安装目标当时不存在。
- 两服已安装 JAR SHA-1 均为 `4c4ea50c26839bdd207211330ff09f78b586d41f`，与 Modrinth 官方 1.20.1-3.1.16 文件一致。在本机用 javap 查看同一 JAR 字节码，确认关闭 ZIP 后才记录完成；结合[对应修复源码](https://github.com/ChaoticTrials/SimpleBackups/blob/869cb2655101b96c991ed83c2baffd901532ed54/src/main/java/de/melanx/simplebackups/BackupThread.java)核对计数清理在备份前、容量清理在备份后、使用可用新文件名、不回写既有完成 ZIP。异常收尾可留下可打开的部分 ZIP，所以增加成功日志检查。
- 原配置 FULL_BACKUPS、2880 分钟、7 份、useTickCounter=false。JVM 参数未设 timezone，系统 Etc/UTC；日志完整日期、文件名与 mtime 对照也符合 UTC。
- 在远端内存执行相同的只读检查：create-cn 4 份、train-cn 6 份全部中央目录通过并匹配成功日志。样例配置的写入门槛仍默认 false，安装时才按上述证据启用；这是模组完成信号核验，不是逐内容 CRC 或世界恢复验证。

## 2026-10-25 首次部署结果（尚未完成）

用户批准隔离硬链接测试、安装四文件及仅为 automatic/ 建立归档，明确不碰原有手动备份。两服隔离小文件测试均通过，测试目录已清理；两个空 archive/ 和四份安装文件已创建。UID 1024/GID 100 下直接 dry-run 两服均成功，4+6 份符合归档条件，当前无淘汰候选。

systemd 启动因上述 217/USER 失败，Python 未执行，两个 archive/ 仍为空。timer disabled，未启动定时清理；两服及看门狗仍 active。systemd-analyze verify 同时提示已有 xray/v2ray nobody 用户及 snapd RestartMode 配置警告，这些不是归档服务失败原因，本次未修改它们。

本地已准备 setpriv 启动方式修正；远端尚未应用，等用户批准。无需重装其他三个文件、重建目录或重做 NAS 探针。

## 2026-10-25 16:16 北京时间：第一阶段完成

用户随后批准 setpriv 修正。远端仅改 service 启动方式并重新加载 systemd，08:16:58–08:16:59 UTC 运行成功（替代上节尚未应用的状态）。create-cn 建立 4 份、train-cn 建立 6 份硬链接，逐份 samefile/inode 验证通过；本轮 eligible_deletions=0。未触碰上层手动备份或 legacy-moved。

脚本 `/usr/local/libexec/mc-backup-archive.py`、配置 `/etc/mc-backup-archive.json`、service/timer 已安装。配置 completion_contract_verified=true；service 使用 setpriv 后以 UID 1024/GID 100 执行，模式 link-only。timer disabled，自动淘汰尚未启用；需要另行批准将模式切到 prune 并 enable --now timer。仓库 unit 仍保留安全的 dry-run 默认值，不能把模板直接覆盖到已启用的运行配置而不核对模式。

## 2026-10-25 16:21 北京时间：正式启用

用户另行明确批准正式启用。已将远端 service 的 link-only 改为 prune，daemon-reload 后先手动运行成功，再 enable --now mc-backup-archive.timer，创建 timers.target.wants 开机链接。08:21:53 UTC 两服均 additions=0、eligible_deletions=0，归档分别保留 4/6 份；Result=success、ExecMainStatus=0。

随后只读确认 timer enabled、active/waiting、Persistent=yes，下一计划触发为 2026-10-25 09:00 UTC（北京时间 17:00）。mc-create-cn-r2、mc-train-cn-r2、mc-watchdog-r2 均 active。正式工作范围只有两服 automatic/ 和新 archive/，不包含上层原有手动备份。

这次已验证手动触发的正式模式和timer配置，尚未等待首个整点触发，也未等待模组生成新备份/自然轮换，因此不能宣称这些未来事件已实测。未设置聊天监控或额外通知服务。开机后由 systemd 恢复日历任务，错过的触发补执行一次。

## 2026-10-25 网页入口部署及验收

用户审阅方案后明确指定两服同步使用以下文案。已修改 `/var/www/minecraft-backup/备份.html`，每服只更正一处旧链接文案并新增一行归档入口，其他 HTML（包括原有手动备份链接）保持不变：

| 分区 | 文案 | 相对链接 |
| --- | --- | --- |
| create-cn | 全自动短期备份列表（原“全自动频繁备份列表”） | /create-cn-simple-backups |
| create-cn | 全自动长期备份列表（新增） | /create-cn-archive/ |
| train-cn | 全自动短期备份列表（原“全自动频繁备份列表”） | /train-cn-simple-backups |
| train-cn | 全自动长期备份列表（新增） | /train-cn-archive/ |

在 `/etc/nginx/conf.d/minecraft-backup.conf` 的 HTTPS 25572 server 中新增两服 archive 路由：`location ^~ /各服-archive/` 映射 `/synology/MCShare/minecraft/simplebackups/各服/archive/`，启用 autoindex，autoindex_exact_size off；精确匹配不带末尾斜线的入口并 301 到带斜线版本。原短期路由不变，25443 HTTP server 未增加路由。适用域名为现有 server_name 中的 mc1.ashbill.com 和 mc.yake.wang。

部署前核对两份原文件 SHA-256，防止覆盖同期编辑；写入前后 `nginx -t` 均通过，平滑 reload 成功，未重启 Minecraft。这两份远端文件是现有站点文件，仓库仅保留本节的入口说明和验收结论，不收录一次性审阅 diff、整个站点或无关 Nginx 配置。

验收：服务器经 127.0.0.1、正确域名/SNI 和证书校验，对两个域名的四个目录均检查入口重定向、列表、所有 ZIP 的 HEAD 大小与 Range 0–63 内容。create-cn 短期/长期各 4 份，train-cn 各 6 份，全部通过。网页 HTTP 内容哈希与本地审阅候选完全一致。另从本机访问公网 mc1.ashbill.com:25572 的备份页面及四个列表，全部返回 HTTPS 200，短期/长期文案各出现两次。未整份下载 ZIP，也未修改归档内容。
