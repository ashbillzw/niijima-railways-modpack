# create_tracks.dat 损伤分析（2026-10-29）

## 结论

**未解决的问题与关联调查要求（2026-10-30 用户明确要求）：60秒以上单tick卡顿的上游 root cause 仍未知。已定位的是文件截断机制及内置看门狗触发链，不等于已解释为何卡住；原子保存补丁也不解决该性能问题。后续分析玩家bug报告时，应考虑其与本次卡顿／内存压力的关联可能，分别记录支持、反对及缺失证据；不能因均涉及列车就直接归因。**

**当前状态（北京时间2026-10-30 01:14，提交记录随后补充）：create-cn已使用27日原始DAT恢复运行，两服均出现本次启动Done且端口监听，看门狗随后启动，三项服务active/running；未进行入服及逐列车验收。TrainResync 1.6.0.j补丁已在独立仓库提交为 `80a91bc`，用户决定留待下次更新部署。以下停服和未实施描述保留为各调查阶段的历史。**

**根因调查更新（2026-10-30）：远端崩溃栈、旧DAT修改时间及随后启动日志，高置信度支持“SavedData直接覆盖写盘期间，Minecraft内置ServerWatchdog因单tick超过60秒触发强制退出，留下截断文件”。第一次ZLIB EOF发生于北京时间10月29日03:04，早于08:06备份。堆内存接近耗尽可能促成卡顿，但没有GC日志可锁定具体慢因或泄漏模组。见文末根因调查；本次调查保持停服，没有修改远端。**

**最新实施状态（北京时间2026-10-30 00:00）：用户最终选择27日原文件直接回退，不编辑列车。已将 create-cn 正式 DAT 改名为同目录 `create_tracks.dat.old7`，并从27日原始ZIP提取 DAT 到正式位置。两服与看门狗保持停止，未做游戏加载验证。此决定取代下文拼接及删除 kiha25 的讨论方案，详情见文末。**

**当日补充：已对比 10 月 25、27、29 日备份及未带日期原件。25、27 日两份的 Gzip／NBT 结构完整；29 日备份已经截断，且与未带日期原件逐字节相同。最近确认结构完整的备份为 27 日，详见文末“备份时间线对比”。以下局部恢复结论仅针对损坏原件本身，不代表目前已无完整旧备份。**

本次桌面副本发生尾部截断：Gzip 流未正常结束，且解压后的 NBT 在列车记录内部中断，并非只缺压缩文件尾。可以保留全部已完整解析的轨道网络、信号分组、维度表和 146 列列车；不能仅凭此文件无损恢复全部 151 列列车。

仅完成静态分析与内存重构验证。没有改动输入，没有生成部署用修复 dat，没有启动或操作服务器。当前服务器实际版本及读取异常日志尚未提供，读取逻辑参考本机 Create 0.5.1.j JAR。

## 输入与直接证据

- 输入：`C:\Users\ashbill\Desktop\create_tracks.dat`。
- 大小：4,683,103 字节。
- SHA-256：`2e7161dcac97d2f20738cb68ca1a5789fd02e86c6a2a70d98b1f4ae3b9dce3ea`。
- Gzip 头正常，以 `1f8b08` 开始；完整解压报 `EOFError: Compressed file ended before the end-of-stream marker was reached`。
- zlib 能连续解出 52,902,894 字节，未报中段 Deflate 错误，但 `eof=False`；缺少有效流结束及可用的完整性尾部校验，因此不能据此保证每个业务数值正确。
- NBT `DataVersion=3465`，根字段为 `DataVersion` 和 `data`。
- 截断路径（索引从 0 起）：`data.Trains[146].Carriages[2].Entity.Contraption.Actors[17].RelativeMotion[0]`。
- 最后一个 double 始于解压字节偏移 52,902,887，需 8 字节，仅剩 7 字节。其后仍应有其他记录，并不是补这 1 字节即可修复。

## 已存在的信息

| 内容 | 本次解析结果 |
|---|---|
| RailGraphs | 声明的 301 项全部完整解析 |
| SignalBlocks | 声明的 83,948 项全部完整解析；这是信号分组数，不是实体信号灯数量 |
| DimensionPalette | 2 项完整：主世界、下界 |
| Trains | 声明 151 项，前 146 项完整，包含 381 节车厢 |
| 第 147 列列车 | 声明 4 节车厢；前 2 节完整，第 3 节中断，第 4 节未到达 |
| 第 148–151 列列车 | 在现有可解压数据中没有到达其记录 |

完整的 146 列列车 UUID 均唯一，所有已写入的 Graph 引用都能在保留的 RailGraphs 中找到。没有进行全部轨道节点／边／模组语义校验，不把完整 NBT 结构等同游戏运行验证。

第 147 列列车可从前两节车厢的 `Entity.TrainId` 得到共同 UUID：`16fde0a4-8a16-4604-a735-c7aa46a15686`。列车级 Name、Owner、运行图等字段位于截断后，当前无法读取；第 3 节的 Blocks 复合标签已完整出现，可作为后续车体抢救素材，但不代表该车厢的行为、库存和控制信息完整。

其第一节车厢 `EntityPositioning` 在维度索引 0，PositionAnchor 约为 `(-1867.85, 71, -3632.5)`。`Entity.Pos` 另存了不同坐标，可能是缓存状态，不能未经游戏核对就把任一坐标认作实时位置。

## 为什么服务器读不了

Minecraft 需要先把压缩 NBT 读成完整结构，Create 才能从 `RailGraphs`、`SignalBlocks`、`Trains`、`DimensionPalette` 读取各对象。完整文件读取阶段遇到 EOF 即会失败，不会自动返回已经读完的 146 列列车。

已反汇编本机映射版 Create 0.5.1.j 的 RailwaySavedData，确认它保存和读取上述四类字段，并逐项调用 Train.read。没有证据表明本次必须通过升级模组或修改 TrainResync 来解决；当前文件的物理截断本身已足以解释读取失败。尚未取得服务器堆栈，不宣称已排除其他同时存在的问题。

## 修复可行性与边界

### 保留完整部分：可行

在内存中保留解压前缀 `[0, 52513178)`（即第 147 列开始之前），把偏移 13,161,875 处的 Trains 列表长度从 151 改为 146，并补上 data/root 两个 Compound 的结束标签。得到 52,513,180 字节的完整 NBT。

独立的 nbtlib 成功解析该内存候选并恰好读到文件末尾，上述计数和 Graph 引用检查通过。正式制作时可将该字节串重新 Gzip 压缩；完整记录按原字节保留，不通过通用 JSON 重写，以免改变标签类型／字符串编码／附属模组数据。

这会让最后 5 列列车不进入重构后的 Trains 列表，其中 1 列还有部分可抢救数据。不是无损恢复方案，也尚未在游戏副本中验证。不要把局部修复直接覆盖正式世界。

### 尽量恢复全部：需要外部材料

优先核对服务器原文件与桌面副本的大小及哈希，排除下载截断。如果服务器原文件完整，重新获取即可。

若服务器原文件也损坏，优先寻找损坏前 snapshot 中同一世界的 `data/create_tracks.dat`，以及实际存在的 `.dat_old`／其他备份（不假定 Minecraft 自动为该文件保留旧版）。可以按 UUID 比对完整列车，并以 `16fde0a4-8a16-4604-a735-c7aa46a15686` 定位残缺列车。后四列身份可通过备份与现存 146 列对比进一步缩小，但不能把旧备份所有差异直接认作本次丢失。

2026-10-29 晚间核对本机 Create 0.5.1.j 字节码后修正：`CarriageContraptionEntity.shouldBeSaved()` 返回 false，标准 Create 车厢实体不作为另一套持久实体保存在 `entities/*.mca`；其恢复入口是列车记录中的序列化车厢。不能把区块实体文件当作常规车厢恢复来源。其他模组若修改此行为，需要另行核对。

单凭此文件无法确定是写入时异常退出／强制终止、磁盘写入失败、复制时尚未写完，还是传输中断。需要对应时间的服务端日志、退出记录及原文件比较；不要由这份截断证据直接认定硬盘损坏。

## 证据文件与后续使用

分析目录：`D:\mydata\Agents\Minecraft相关\临时分析\create-tracks-20261029`。

- `partial.nbt`：从输入连续解出的前缀，不是可直接投入服务器的文件。
- `inspect_nbt.py`、`nbt-analysis.json`：结构定位与完整记录边界。
- `check_recovery.py`、`recovery-feasibility.json`：内存候选验证、146 列完整列车名称／UUID清单，以及残缺列车前两节的身份／定位字段。
- `RailwaySavedData.javap.txt`、`Train.javap.txt`：本机 0.5.1.j 字节码证据。

耗时日志位于仓库外 `日志/任务耗时/create-tracks-20261029-174905.jsonl`。本次只判断可修复性，实际选用旧备份、生成修复文件和部署均未执行。

## 备份时间线对比（2026-10-29 晚间补充）

本次只读检查桌面的四份 DAT：完整 Gzip 解压（含格式自身的结束／校验检查），随后用 nbtlib 解析 NBT，并比较解析位置与解压数据长度。没有修改原件、生成修复 DAT、恢复世界或操作服务器。

| 文件 | 文件字节数 | Gzip／NBT 结果 | RailGraphs | SignalBlocks | Trains |
|---|---:|---|---:|---:|---:|
| `create_tracks_2026-10-25.dat` | 4,686,721 | 完整；NBT 恰好读完 53,335,949 字节 | 302 | 83,943 | 150 |
| `create_tracks_2026-10-27.dat` | 4,717,984 | 完整；NBT 恰好读完 53,489,926 字节 | 302 | 83,948 | 151 |
| `create_tracks_2026-10-29.dat` | 4,683,103 | Gzip 报 EOF，压缩流未到正常结束标记 | — | — | — |
| `create_tracks.dat` | 4,683,103 | 与 29 日文件逐字节完全相同，同样报 EOF | — | — | — |

25、27 日完整文件的维度表均有 2 项。表中坏文件不重复进行部分 NBT 解析；其原件的截断定位见上文。

**现有样本中的首次损坏出现在 29 日备份，27 日仍完整。** 对于这次持续到当前原件的截断，现有快照将变化范围限定在 27 日、29 日两次备份之间；仅凭这些文件无法确定具体损坏时刻或原因。文件名日期沿用原备份命名，不将下载后的本机文件时间当作损坏时间。结构完整不等于已完成所有模组语义或游戏加载验证。

本次结构对比证据保存于仓库外 `临时分析/create-tracks-20261029/backup-comparison.json`，阶段耗时见 `日志/任务耗时/track-dat对比-20261029-232349.jsonl`。未选择或实施回滚。

## 27／29 日合并与重复列车风险（2026-10-29 晚间）

本阶段只分析方案，没有输出修复 DAT、改动四份输入或操作服务器。代码依据为本机映射版 Create `1.20.1-0.5.1.j`；未据此宣称实际服务器及附属模组的加载行为已通过验证。

### 身份与恢复候选

27 日有 151 列；29 日的 146 条完整记录中，145 个 UUID 与 27 日相同，另有 1 个新 UUID。因此，27 日有 6 条记录不在29 日的完整前缀中，但29 日只缺少 5 条完整记录。不能把这 6 条全部补回，简单合并会得到 152 列。

共同的 145 列没有发现名称、车厢数量或车厢实体 UUID 变化；这不等于位置、库存、运行图等内容未变。29 日完整前缀中的新列车为 `221d3c5b-0e6b-4a76-9cd4-7191ea40ff73`，名称“未命名列车”，2 节车厢。

| 27 日候选名称 | 列车 UUID | 车厢数 | 建议 |
|---|---|---:|---|
| E233-2001 | `16fde0a4-8a16-4604-a735-c7aa46a15686` | 4 | 身份已直接确认：29 日截断中的列车，前两节车厢实体 UUID 也与27 日一致 |
| 未命名列车 | `a1cfd8a3-277b-46f5-9c92-2b51fc88285e` | 1 | 尾部恢复候选，29 日对应记录完全缺失，身份尚属推断 |
| XHD2-02 | `faf03340-db6b-43a8-94bb-bd22be8fa89e` | 4 | 同上 |
| Split off from: Unnamed Train | `da6fbc2f-2f2c-4525-927d-5a08fd2238e2` | 2 | 同上 |
| 0号机车 | `6ad54491-4697-4313-b231-2949badfa59b` | 1 | 同上 |
| kiha25-0001 | `1862d166-e4da-47f7-9204-3b5ea3bde57c` | 2 | 排除，不能当作尾部截断丢失记录补回 |

排除 kiha25 的依据：`RailwaySavedData` 从 HashMap 保存列车列表。29 日已知的 147 个 UUID（146 条完整记录加残缺列车身份）符合容量 256 的 HashMap 桶遍历顺序；在所测容量 256 至 1,048,576 中只有此容量符合。kiha25 的桶号为178，截断列车 E233 的桶号为243；它若仍在该映射中，应在完整前缀内出现，而不是位于丢失的尾部。其余4列候选的桶号为247、251、252、252，与尾部位置相容。这是基于已核对标准实现和实际序列的强证据，不能进一步断言 kiha25 是被拆解、重组还是通过其他操作移除。

**后4列身份仍非直接证实**：缺失尾部可能包含27日后新建或重组的列车。候选数量恰好补到151，不足以证明它们一定就是原来的最后4条记录。需结合用户对期间列车操作的确认，或额外备份／日志证据决定是否补回。

### 避免直接合并造成重复的方法

- 以列车 UUID 为主键，保留29 日全部完整记录；仅补经确认的缺失 UUID，不生成新 UUID，不按名称去重。
- 保留并检查每节车厢的 `Entity.UUID`、`Entity.TrainId` 和 `CarriageIndex`。上表排除 kiha25 后的5列共12节车厢，实体 UUID 互不重复，与29 日完整146列也无冲突，TrainId／车厢索引一致。
- 本机 Create 字节码中，列车按 UUID 写入映射，车厢从记录重建并绑定列车；`shouldBeSaved()` 返回 false。因此标准实现不存在“区块中又保存了一套相同列车，读取 DAT 再生成一套”的常规双重来源。此结论不能代替对其他模组或既有异常实体的实际运行检查。
- 不复活已移除或重组后换了 UUID 的旧列车。仅 UUID 不重叠不能排除“旧车被拆成方块／重组为新车，又补回旧车”的复制风险。
- 旧记录恢复意味着相应车厢状态可能退回27 日，仍有位置冲突、旧库存／乘客／运行图回滚风险；去重不等于这些状态自动一致。

### 轨道引用与建议制作范围

保留29 日的301个轨道网络、83,948个信号分组和维度表，不把27 日旧网络整体并入。两份维度表一致。

27 日旧网络 `fd769074-beed-4384-8d25-112cff8cbb1e` 的9,512个节点，与29 日新网络 `9d4e231d-d9ff-45f6-82f9-bf872202b979` 的节点集合完全对应。E233-2001 和0号机车所用的全部转向架轨道边在新网络存在，恢复时需要定向映射旧 Graph 引用；另外3列候选所用的轨道边仍在原 Graph 中。节点与边存在不代表完整路径、信号占用和运行图等语义已全部验证。

建议制作时保留29 日146条完整记录的原始 NBT 字节，以27 日的完整列车记录补充经确认的候选。E233 前两节和第3节部分数据虽可读取，但不能未经一致性检查就把不同时刻的车厢位置与运行状态拼成一列。若需要保留其中较新的车体／库存，应单独比较并明确采用范围。当前尚未决定或实施这种字段级拼接。

证据位于仓库外 `临时分析/create-tracks-20261029/compare_recovery_candidates.py`、`reconstruction-candidate-comparison.json`，以及 `CarriageContraptionEntity.javap.txt`、`DimensionalCarriageEntity.javap.txt`。下一步先确认4列尾部候选的恢复取舍，再生成单独的候选文件并针对列车身份、轨道引用及加载进行验证；不覆盖正式世界。

### 后续讨论：统一回退27日（2026-10-29）

用户无法确认4列尾部候选的期间操作，提出使用27日整份 DAT 并移除 kiha25-0001，以避免混合27／29日列车位置。本方案仍在评估，尚未获执行指令；上文146＋5的拼接方案不是已决定的实施方案。

这一方向能让保留下来的列车使用同一快照的车厢、位置和运行状态，避免只让部分列车回到27日。但27日原有151列，删除 kiha25 后是150列；29日完整前缀中独有的两节“未命名列车”（UUID `221d3c5b-0e6b-4a76-9cd4-7191ea40ff73`）不会恢复，尾部如另有新增／重组列车也不会恢复。

数量不能唯一证明尾部4列的身份：删除另一列旧车、同时新增一列新车仍可维持151列。统一回退也没有消除这一不确定性。只回退 DAT 时，世界中的轨道、车站、拆解后的方块和外部库存仍处在当前状态，旧轨道网络可能不匹配，旧列车／库存也可能重新出现。因此该方案提供列车快照内部的一致性，不等同整个世界的一致回档，也不能据此保证零复制风险。后续若决定制作，应先明确接受范围，再针对当前轨道与旧列车落点检查，不自动补入29日新增列车。

## 远端原样回退已执行（北京时间2026-10-30 00:00）

用户明确选择“27日原文件直接替换，暂不编辑列车”，随后通过选项批准改名及原样回退。通过共享终端的 `custom-sz-cn` SSH 会话执行；未修改列车NBT，kiha25仍在27日原始记录中。

- 正式路径：`/home/ashbill/minecraft-server/create-cn/create-cn_world/data/create_tracks.dat`。
- 原损坏文件已改名为同目录 `create_tracks.dat.old7`，4,683,103字节；沿用已有 `.old`、`.old2` 至 `.old6` 命名，不覆盖已有文件。
- 来源：`/synology/MCShare/minecraft/simplebackups/create-cn/automatic/create-cn_world_2026-10-27_00-06-00.zip` 中的 `create-cn_world/data/create_tracks.dat`。此前单独提取的远端DAT已不存在，因此使用原始ZIP直接提取该成员，未解压整个世界或改动ZIP。
- 新正式文件4,717,984字节；新旧两份权限均为664，属主均为 `ashbill:ashbill`。
- 执行前检查两服及看门狗 `MainPID=0`，无Java进程；目标不是符号链接，`.old7`不存在。命令在任一步失败时停止。改名后以禁止覆盖方式执行 `unzip -p`，恢复原权限，检查预期大小并输出 `RESTORE_OK`。
- 完成时两服仍为此前留下的 `failed` 状态、`MainPID=0`，看门狗 `inactive`、`MainPID=0`。本次没有启动服务、清除失败标记、修改train-cn世界或执行其他修复。
- 验证止于提取成功、文件大小／权限／属主和服务停止状态。27日原件的Gzip／NBT完整性已在此前本地分析确认，本次未重复哈希或全量解析，未完成实际游戏加载验证。

执行命令留在仓库外 `临时工作区/shared-terminal/tracks-restore-approved-command.txt`，阶段耗时见 `日志/任务耗时/track-dat远端回退-20261029-235210.jsonl`。后续接手先核对实时服务状态，不把本记录当作以后仍停服的证明。

## 根因调查：保存过程被内置看门狗中断（2026-10-30）

用户要求不重启，远端检查全为只读；两服及外部 `mc-watchdog-r2` 均保持停止。本地 TrainResync 源码按用户要求假设与服务器一致。以下结论区分直接破坏机制和更上游的性能诱因。

### 时间线证据

服务器日志与文件时间为UTC，下表统一换算为北京时间（UTC+8），均为2026年10月29日。

| 北京时间 | 证据 |
|---|---|
| 02:58:22.413 | `2026-10-28-2.log.gz:708`：Server Watchdog报告单tick 61.05秒；下一行明确宣布强制关闭。`server.properties`实际为 `max-tick-time=60000`。日志中的0.05秒是目标tick时长，不是本服触发看门狗的阈值。 |
| 02:58:32 | 崩溃文件 `crash-2026-10-28_18.58.32-server.txt`，类型 `Watching Server`；采样主线程处于NBT序列化／压缩写盘调用链。 |
| 02:58:35.857 | 同一运行日志2491行确认崩溃报告已保存；35.859出现其他模组shutdown hook关闭日志。 |
| 02:58:45.180809069 | 损坏原件（现 `.old7`）mtime，4,683,103字节。此时间接近报告保存后10秒强制退出窗口末尾；改名只更新ctime，没有把mtime变成回退时间。 |
| 03:04:34.267 | 重启后的 `2026-10-28-1.log.gz:770`：`Error loading saved data: create_tracks`；820行原因是 `EOFException: Unexpected end of ZLIB input stream`，下方栈处于 `readDouble`。与本地定位到double中途截断相符。不要混淆344行网络SSL产生的另一条EOF。 |
| 08:06:00.268–08:10:54.340 | `latest.log:4–5`：SimpleBackups开始并完成29日备份。文件在此前启动时已经损坏，排除“只有备份副本因并发复制而截断”的解释。 |

崩溃栈关键调用链为 `MinecraftServer` 保存 → `ServerLevel` → `DimensionDataStorage` → `SavedData.save` → `NbtIo.writeCompressed` → `CompoundTag/ListTag.write`。线程状态RUNNABLE。栈没有携带当前文件名，结合DAT最后写入时间、随后针对create_tracks的EOF及原始截断形态，构成高置信度因果判断；不是逐次文件写入系统调用追踪。

### 源码解释

本机 `Create` checkout实际为MC1.21.1／Create6.0.10，不能直接当作本服0.5.1.j源码。此处使用此前核对的0.5.1.j `RailwaySavedData` 字节码、TrainResync本地源码，以及MC1.20.1源码，并用本机Forge47.4.6映射JAR再次核对写入和退出实现；崩溃报告显示服务器Forge47.4.6、Java21.0.5。

1. Create的 `RailwaySavedData` 生成NBT并使用Minecraft `SavedData` 持久化；`SavedData.save(File)` 调用 `NbtIo.writeCompressed`。
2. `NbtIo.writeCompressed(CompoundTag, File)` 直接 `new FileOutputStream(file)` 打开正式文件，旧内容先被截掉，再通过Gzip流写入新NBT。该路径没有“写完临时文件后再替换正式文件”的步骤。
3. 内置 `ServerWatchdog` 超时后生成报告，调用 `System.exit(1)`，并安排10秒后 `Runtime.halt(1)` 兜底。进程强制结束时，正在其他线程进行的写入不能依靠try-with-resources保证补完NBT／Gzip尾部。
4. 因而正式文件可停留在已写出的前缀。当前样本同时缺NBT后续内容和Gzip结束标记，正符合这一失败模式。mtime与退出窗口吻合，但不能仅凭mtime断言最后一刻一定走了halt而不是其他退出分支。

导致损坏的机制是**非原子覆盖写入与强制退出相遇**。本次明确记录的退出触发者是Minecraft内置 `ServerWatchdog`；它与外部systemd服务 `mc-watchdog-r2` 是两个不同机制。此前手动停服及screen退出码1发生在损坏后，不能解释这次首次截断。

### 上游卡顿原因及限制

- 崩溃报告的Java堆为16,384 MiB，空闲仅约54 MiB（57,203,192字节），使用率约99.7%；参数 `-Xmx16G -Xms4G`。这是显著内存压力证据，GC压力是合理候选，但快照空闲量不等同GC后的存活对象量，也不能单凭它证明内存泄漏。
- 已查对应运行的普通／debug日志，未找到 `OutOfMemoryError`、`GC overhead`、`Could not save data`、`No space left` 或 `Input/output error`。没有这些消息不能排除GC停顿或主机级I/O问题。
- 前一分钟已有多次2–3秒落后警告。采样时处在写盘路径，不意味着整个61.05秒都耗在这一份DAT上；缺少当时的GC／性能记录，不能把全部耗时归给序列化、压缩或磁盘中的某一项。
- 正式DAT位于本机NVMe的ext4文件系统；NAS存放备份。当前磁盘仍有86GiB可用，但当前余量不能当作事故时历史余量。
- 实例目录两层内未找到GC日志或堆转储；已有两份hs_err分别来自4月及7月，不能当作本次证据。系统／内核journal普通用户不可读，`sudo -n`提示需要密码，所以本轮未取得相关系统日志，也不能声称已排除内核OOM或硬件错误。
- TrainResync相关 `CarriageMixin` 写入的是额外旋转及受电弓NBT字段，没有接管文件输出或执行截断；没有证据表明本次由其主动截断。未做堆剖析，不能据此排除任何模组对总体内存压力的间接影响。

### 后续修复方向（未实施）

防止再次损坏应优先考虑该SavedData保存路径的临时文件写入与同文件系统原子替换：完整写成并关闭后再替换正式文件，保存被中断时保留上一份正式内容。另行调查高内存压力及保存卡顿。单纯提高或关闭看门狗阈值只能改变超时触发条件，不能解决非原子写入风险；本轮不修改阈值、源码、服务或任何远端文件。

原始摘录和本地源码证据均在仓库外 `临时分析/create-tracks-20261029/`：`rootcause-remote-crash-excerpt.txt`、`rootcause-remote-timeline.txt`、`rootcause-memory-evidence.txt`、`rootcause-final-evidence.txt`、`SavedData.java`、`NbtIo.java`、`ServerWatchdog.java`、`save-watchdog-47.4.6.javap.txt`。报告中的源码结论优先于上方此前“未取得服务端堆栈”的历史限制。

## TrainResync原子保存Mixin评估（2026-10-30，未实施）

用户仅要求评估，保持停服。TrainResync仓库 `main` 在检查时干净，现有Mixin／MixinExtras依赖齐全；本轮没有修改其代码、构建、部署或操作远端。

- **可行，改动可控**：建议1个Mixin、1个小型文件写入辅助类、Mixin JSON增加1项；发布时再改版本号和说明。现有插件已能按 `create.*` 分组检查Create是否存在，无需新增依赖或服务。
- **注入位置**：文件保存方法实际继承自Minecraft的 `SavedData.save(File)`，应在此方法针对 `RailwaySavedData` 实例及 `create_tracks.dat` 定向处理，其他SavedData走原流程。可采用带范围判断的可取消HEAD注入，无需全局替换 `NbtIo` 或 `@Overwrite`。继续调用原有铁路NBT生成逻辑，保留 `data` 包装与DataVersion，不改列车UUID、数据结构、位置或运行图。
- **流程**：生成NBT → 正式文件同目录创建本次临时文件 → 使用既有NBT/Gzip写法完整写入并关闭 → 原子替换正式DAT → 清除dirty标记。原文件在替换成功前保持完整，不每次另增 `.oldN`。
- **失败语义不可漏掉**：原版SavedData在捕获IOException后仍执行 `setDirty(false)`；因此不能只替换一个写入调用就宣称完成。补丁需仅在提交成功后清dirty，失败记录错误并保留dirty供后续正常保存重试；不静默退回非原子覆盖。异常退出残留的临时文件不能被当作正式存档自动加载。
- **文件系统边界**：临时文件必须同目录，不能放系统临时目录或NAS。现服目标为本机ext4，适合此方案，但Java原子替换既有目标的行为仍需在目标Linux/JVM环境验证。Java规范说明 `ATOMIC_MOVE` 下其他选项被忽略，既有目标能否替换取决于实现，不可声称加上 `REPLACE_EXISTING` 就保证所有平台成功；不支持时应保留旧文件并报错。依据：[Java17 Files.move](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/nio/file/Files.html#move(java.nio.file.Path,java.nio.file.Path,java.nio.file.CopyOption...))。
- **风险与成本**：正常路径仍只生成、压缩一次NBT，额外成本主要是创建临时文件、属性处理和rename，峰值多占一份压缩DAT（当前约4.7MB），不需要在内存中再复制整份压缩数据。要保留现有属主／组／权限，避免临时文件默认权限改变正式文件可访问性；其他模组如同样接管SavedData保存，也需要确认注入兼容性。
- **保护范围**：针对JVM被watchdog／强制终止时，正式文件保持上一份完整内容或新完整内容；可能损失尚未成功提交的进度，不解决内存压力、卡顿或所有世界文件的一致快照。原子可见性不等于断电持久性，后者涉及文件与目录同步，不能无条件承诺。
- **验证重点**：隔离目录中的正常写入与替换、写入／替换失败保留旧文件及dirty、写入过程中结束独立测试子进程、下次重试、权限保持；再在隔离Forge实例验证Mixin命中与其他SavedData不受影响。开发机Windows通过不能代替Linux原子替换验证。当前仅评估，未执行这些测试。

结论：这是小型补丁，范围风险较低；因接触正式存档持久化，验证要求高于普通显示或交互修复。建议优先限制到铁路DAT，故障保护验证通过后再讨论部署，不顺带扩大到所有世界文件或引入异步保存。

### 用户后续决定与当前保存间隔（2026-10-30）

用户决定暂不实施原子保存Mixin，优先调查导致保存卡顿的根本问题。该Mixin仍只是评估方案，没有开发或部署。

只读核对远端 `/home/ashbill/minecraft-server/create-cn/config/servercore/config.yml`：`features.autosave-interval: 6000`，配置说明为 `/save-on` 有效时两次自动保存之间的tick数。正常20 TPS对应300秒，即约5分钟；TPS降低时实际墙钟间隔延长，不能理解为固定每5分钟成功落盘。

本机Create0.5.1.j字节码确认 `Train.tick(Level)` 首先调用 `Create.RAILWAYS.markTracksDirty()`，后者在已有savedData时调用 `setDirty()`。这是内存中的待保存标记；由世界保存流程进入 `SavedData.save(File)` 后，dirty数据才进行完整NBT／Gzip文件重写，并非每tick写盘或增量追加。正常停服和显式保存也属于额外保存触发；6000tick与SimpleBackups每两天生成ZIP的间隔是不同机制。

本轮状态检查两服 `MainPID=0`，外部看门狗inactive；未改配置或启动服务。新增字节码取证位于仓库外 `临时分析/create-tracks-20261029/GlobalRailwayManager.javap.txt`，列车tick证据仍见同目录 `Train.javap.txt`。

### 后续讨论：原子保存与启动阻断配合（2026-10-30，未实施）

用户提出重新考虑原子保存，并要求保存被打断或正式DAT损坏时直接阻止服务器启动，避免玩家在异常铁路状态下继续游玩；随后明确为同时检查正式DAT和临时DAT是否存在。本次仍为方案讨论，没有修改代码或部署。

- 临时文件本身可作未完成保存标记，无需另设标记文件。应在开始本次铁路保存前创建，完整写入并关闭后原子替换正式DAT；提交成功时临时路径随rename消失。
- 启动时发现临时文件，即按上次保存未完成／未提交处理，阻止启动并保留现场；即便临时文件能解析，也不自动提升为正式文件。不应在失败处理或下次启动时自动清理它来绕过阻断。这项要求优先于仅保留dirty并后台继续重试的早期方案，运行期间明确保存失败后的停服策略仍需一并设计。
- 无临时文件时，检查正式文件完整Gzip流（包括尾部校验）、NBT结构及必要的铁路字段／身份引用。已管理世界正式DAT缺失也应阻断；合法新世界初始化需区分处理。结构验证无法识别所有仍能解析的逻辑错误或合法旧版本替换，更不能单独证明DAT与世界区块完全一致。
- 本地MC1.20.1源码及Forge47.4.6字节码确认：`DimensionDataStorage.readSavedData`捕获Exception、记录错误并返回null；`computeIfAbsent`随后可创建新数据。因此致命启动失败不能被该通用catch吞掉，也不能先创建空铁路数据再停服。应在允许玩家进入及Create接受异常数据之前阻断，并确保退出过程不把空数据写回。
- 正常20TPS且每轮保存成功时，丢失进度大致为一个保存周期加上当次保存耗时；6000tick并非严格5分钟墙钟上限。低TPS、长保存或此前连续失败都会扩大间隔。启动阻断限制故障后的继续游玩，不是多文件事务回滚。
- 外部看门狗／自动重启需要识别这种明确的数据故障，避免反复重启掩盖问题；仅评估，未修改当前服务配置。

新增证据：仓库外 `临时分析/create-tracks-20261029/DimensionDataStorage-47.4.6.javap.txt`。服务器本轮未操作，继续沿用停服要求。

## TrainResync实现完成，尚未部署（2026-10-30）

用户随后明确授权实现原子保存及异常启动阻断，取代此前“暂不开发”的决定。代码位于 `D:\mydata\Repositories\Create-Train-Resync` 的 `main` 分支，版本1.6.0.j；随后已提交为 `80a91bc`，尚未部署。

- 新增 `create.RailwaySavedDataMixin`、`create.RailwayDataStorageMixin`，分别定向接管铁路DAT保存和严格读取；其他SavedData保持原路径。
- `AtomicRailwayFile` 在生成NBT前创建同目录 `create_tracks.dat.trainresync.tmp`，保留文件访问属性、完整写入关闭并同步文件后执行原子替换，不降级为普通覆盖。失败保留临时文件；仅成功后清dirty。
- `RailwayDataGuard` 检查启动文件状态，验证完整Gzip及必要NBT／身份引用，解码异常不再被原版吞掉并回退为空铁路数据。运行时明确保存失败会请求正常停服，并阻止退出期间再次覆盖铁路DAT。不会自动恢复、删除临时文件或生成连续.old备份。
- 通过启动前的世界目录状态识别新世界；已有level.dat、level.dat_old、region、data或维度目录不能借缺失DAT自动初始化。专用服可在AboutToStart阶段拦截明显文件状态异常；集成服等到进度监听器建立后由严格读取入口拦截，避免过早失败卡住客户端等待过程。真实Forge启动效果尚未实测。
- 构建命令：`gradlew --offline build railwaySafetyTest -PtracksFixture=<27日DAT> -PdamagedTracksFixture=<29日DAT>`。最后一轮28项隔离检查全部通过，涵盖正常原子替换、写入／提交失败、强制终止测试子进程、临时文件和缺失DAT阻断、新世界边界、Gzip尾部／校验错误、必要NBT字段及重复身份／悬空轨道引用。真实27日健康样本通过，29日损坏样本被拒绝；输入原件全程只读。
- 首轮真实样本测试发现维度表实际为Compound列表，已按Create0.5.1.j格式修正并回归通过。当前仍有原有两条Pantographs Mixin目标写法警告，无新增编译错误。
- 分发产物：`TrainResync/build/libs/trainresync-1.6.0.j-all.jar`，691,049字节；包含MixinExtras0.5.0。新增Mixin及生产refmap已核对。普通不带all的JAR不是本次推荐交付件。
- **验证范围**：Windows／Java17辅助类及文件系统隔离测试、编译／重混淆／打包检查完成；没有启动Minecraft实例验证实际Mixin应用，没有Linux运行验证。远端服务器、看门狗、模组文件和配置本轮均未操作，仍要求保持停止。未修改外部看门狗的重试策略。

补丁仍不解决内存／卡顿根因，也不提供整个世界的一致事务或无条件断电保证。若磁盘已不可写，可能连临时标记也无法创建；此时会报错并请求停服，但不能承诺故障标记已经持久化。详细恢复步骤与测试入口见TrainResync仓库README。

## 玩家报告初筛及关联线索（2026-10-30）

本节为用户提供的两张聊天截图的事实整理和有限本地代码检查，不是游戏复现或已确认根因。未操作远端、未修改模组、未部署；不另建平行待办清单。图片原件为本机桌面 `1.jpg`、`2.jpg`；截图不含可播放的视频文件，不能声称已观看第二张中的视频。

### 报告一：CTL车灯随列车运动产生高CPU负载

- 截图日期显示10/20、10/21；玩家先估计开车1分钟后CPU满载10分钟，随后更正为约5分钟，表示等5分钟负载才恢复。后续控制变量反馈为“拆掉后问题解决”“装上后车只要动就满载”。这些均为玩家陈述，尚非助手独立复现。
- 物品提示可明确识别为 Create Train Lights 的 `Quarter Head- Tail Light`，ID `ctl:quarter_htlb`。截图中后续有人说已全部拆除，不能据此认定所有列车或事故当天均已移除。
- 用户后续确认：满载发生在玩家客户端。是否同时有服务端负载问题仍可能有关，但未证实；灯数量、列车规模、实际版本、发生时TPS／MSPT和采样栈仍未提供。不能将客户端满载直接当作服务器tick超时证据。
- 有限字节码检查使用本地10月7日服务端备份中的 `ctl-forge-1.0.0.jar` 和 `create-1.20.1-0.5.1.j.jar`，没有本轮核对玩家实际JAR，亦未使用Create6版本代替。
- `HeadTailLightMovementBehaviour.tick` 在运动方向等条件通过后执行 `System.out.println(context.localPos)`；方向分支设置 `LIGHT_MODE` 并调用 `AbstractContraptionEntity.setBlock`，未见该分支先比较旧／新模式是否相同。不是每tick执行16次更新，而是按方向进入对应分支；静止等情况会提前返回。灯的开关状态另有 `shouldUpdate` 检查，不能混为方向分支已去重。
- Create0.5.1.j的上述 `setBlock` 更新方块Map后直接向跟踪实体的客户端发送 `ContraptionBlockChangedPacket`，没有在此入口检查状态是否相同。因此存在持续运动时反复更新／发包及打印日志的具体性能嫌疑，负载可能随灯数及观察者增加；CPU占用、网络量和渲染代价尚未实测。
- **与60秒tick的关系：保留为候选线索，尚无直接因果证据。** 若发生在服务器侧，反复更新／日志／发包可成为额外负担；是否足以造成该次停顿或内存压力仍需当时的运行证据。那次崩溃采样在NBT保存路径，不能用本报告替换已确认的采样事实，也不能据此排除更早累积负载的可能。

完整后续审计见 [CTL 1.0.0代码审计](../模组管理/CTL-1.0.0代码审计-20261030.md)：已定位重复方向更新包触发客户端整车厢碰撞重算、取消结果回调未取消计算的积压机制；另有逻辑端隔离及未加载车厢空值缺陷。上述坐标打印已被本地TrainResync既有Mixin屏蔽（玩家实际部署是否生效未核对），不应继续作为当前主因。游戏性能复现及与60秒tick的实际因果关系仍未确认。

### 报告二：无燃料／离开电化区间后在红灯前急停

**2026-10-31 用户澄清（取代下方此前对急停性质的未定判断）：** 自动状态列车按规则必须在红灯前刹停，即便运动不符合通常物理减速度，因此急停本身不是本次bug。当前调查方向是燃油判定可能影响这一强制制停行为；用户还指出“貌似不对进路预定生效”，具体指向和代码路径待核实，不据此断言已复现闯红灯。后续分别检查普通红灯与进路预定路径。下方原始反馈及初筛保留为历史证据，任务状态见总todo。

- 最初测试设想：前方区间被占用或强制红灯，后方只架一部分接触网；无燃料列车先获得动力，再脱离电化区间滑行，观察是否越过红灯。聊天中也明确提到需确认燃料限制配置，不能假定当时已启用。
- 玩家反馈为“无论什么速度车都会在信号机前笔尖刹停”，并称一辆无燃料列车也停住；并没有在这段报告中复现闯红灯。所谓任意速度是其测试描述，不等同覆盖所有速度和场景。
- 当前可记录的现象是突然制停；是否属于预期安全限制、缺少提前减速或真正的电化兼容缺陷，尚不能仅凭聊天确定。原视频未提供，运行模式、速度曲线和信号距离未核实。
- 本地TrainResync现有 `mixin/pantographs/TrainMixin.java` 的 `earlyTick` 注入在服务端有电且 `fuelTicks < 5` 时设置为25；该方法本身不取消信号判定或处理制动。离开接触网并不在这个注入中立即清零燃料计数。此局部检查不能替代Create／Steam 'n' Rails完整控制路径分析，也未证明玩家实际版本相同。
- **与60秒tick的关系：目前没有直接性能证据。** 急停是运动行为现象，不能等同主线程卡住60秒；若以后出现同步卡顿、错误刷屏、反复信号扫描或异常采样栈，再与本次性能事件交叉判断。

本轮字节码摘录与局部放大截图保存在仓库外 `D:\mydata\Agents\Minecraft相关\临时分析\player-reports-20261030\`。本节保留可独立理解的事实和限制，不将临时分析产物或聊天图片纳入仓库。

## 2026-11-04 · 两服停服后的只读核查

北京时间 10:27 正常停看门狗与两服，三项 unit 均为 inactive、MainPID=0、Result=success。根据两服 server.properties 的 level-name 读取正式世界 data/create_tracks.dat。create-cn 文件 4,293,301 字节，修改时间 02:41:40（北京时间），gzip 未正常结束，解出前缀 45,912,747 字节，NBT 在 Trains 内截断。RailGraphs 305/305、SignalBlocks 84,017/84,017、DimensionPalette 2/2、Trains 122/150 条完整。目录还有 .old 至 .old7，未检查其内容。train-cn 文件 1,573,591 字节，修改时间 10:27:20，gzip 与 NBT 均完整，160 列、644 个轨道图、2,113 个信号分组。两目录均未见文件名含 create_tracks 的临时 DAT。未恢复或启动，11 月 4 日这次截断的触发原因待查。

## 2026-11-04 · 从最近完整备份恢复与 1.5 兼容性核查

按 create-cn 的 automatic 与 archive 中 ZIP 文件名时间倒序检查。11-04 00-06-02 备份中的 DAT 同样缺 gzip 尾。11-02 00-06-02 备份成员 create-cn_world/data/create_tracks.dat 通过成员 CRC、gzip、NBT 完整解析和图、列车、车厢引用检查，含 300 个图、83,951 个信号分组、149 列、386 节车厢。经批准只恢复这一份 DAT，保留原文件为 create_tracks.dat.old8（4,293,301 字节）。恢复后 4,670,283 字节，SHA-256 为 675fe02498828c6fe29986938b416df1812d5fb1ec38c6bf37576f2fa1839f10。train-cn 当前 DAT 的图、列车、车厢引用也通过只读核查。恢复后两服及 mc-watchdog-r2 均 inactive；未部署新 JAR 或改配置。

长期归档 timer enabled；北京时间 10:00:03 prune 成功退出 0。日志包含延后、建链及淘汰。两服各有 7 份 automatic、8 份 archive，各自最新 ZIP 在两目录同 inode、链接数 2。归档保留 ZIP 原样，不能据此判断存档内部有效。

核查目标是 test0017 的 TrainResync 1.6.0.o；create-cn 当前启用 1.6.0.d、train-cn 启用 1.6.0.a。两服 Create 0.5.1.j。DAT 保存与加载 Mixin 只检查 Create；服务端启动事件另读 config/trainresync.json，缺文件默认关闭，两服现场均缺。启用 railwayDataProtection 后，已有世界缺 DAT 或存在 .trainresync.tmp 会阻止启动；损坏 gzip/NBT、列车结构或解码失败会在加载阶段阻断。保存异常保留旧 DAT、请求停服；是否能自动重启取决于旧 DAT 是否有效及是否残留临时文件。

线上 1.5 仍满足全部五个炼药锅基础模组门槛。森罗厨房 1.1.0 有 Pot/Stockpot/Steamer 的目标方法及调用点，但不存在 TeapotBlockEntity；当前插件只按 mod ID 选中该组。Mixin 0.8.5 的目标类缺失在非严格模式可跳过，严格目标模式则报错；不可因配置 required 就断言此处必崩，亦不能以此保证完整专服可启动。另已抽查线上 Fruits Delight 1.1.1 与 Farmer’s Delight 1.2.9 的关键注入点。尚无 1.5 全套模组搭配 1.6.0.o 的隔离专服冷启动验收。

## 2026-11-04 · create-cn 卡顿时间线（北京时间）

11 月 4 日 01:57 至 02:35，create-cn 的长延迟约每隔 5–6 分钟出现一次：10.36、10.25、10.36、16.23、17.82、25.11、44.25、47.96 秒。这些是 Can't keep up 的累计落后时间，不是逐次保存耗时。02:41:24 内置 watchdog 报告单 tick 已达 60.41 秒，02:41:31 生成 crash-2026-11-03_18.41.31-server.txt（文件名为 UTC）。主线程 RUNNABLE，栈为世界保存 → DimensionDataStorage → SavedData → NbtIo → GZIPOutputStream → Deflater；栈本身不含 DAT 文件名。02:41:40 正式 DAT 最后写入，02:41:42 unit 退出，02:47:54 重启加载 create_tracks 失败。窗口内未见内核 OOM kill 或磁盘报错。崩溃快照：0 玩家，主世界 Chunks[S] W: 6510，15,613 个方块实体，JVM 堆空闲 44 MiB / 16,384 MiB。

最近 12 份 crash report 中有 11 份 watchdog，其中 8 份主线程在 DimensionDataStorage 保存，8 次报告的堆空闲均为 27–73 MiB。最强工作假设为堆余量极低时，周期保存的分配、序列化和压缩放大停顿。现有日志没有同期 GC 暂停或对象留存证据，不能锁定占用堆的模组、证明内存泄漏或把 60 秒都归给压缩。建议下次受控启动记录滚动 GC/safepoint 日志及 JFR，再对齐保存窗口。只读调查，未修改远端配置、未启动服务。

## 2026-11-04 · 线上兼容候选与部署前验证

TrainResync main eeb912f 实现最多五分钟等待、完整正式 DAT 配合十五分钟 tmp 归档恢复，以及按有效 niijima-pack.json 门控的整套炼药锅代码和内置数据包。缺 pack-id 时不注册炼药锅与标签拴绳扩展；保留切石机索引、CTL 灯态与车厢碰撞优化。14 个炼药锅数据文件内容均与原源文件一致，已核对归档内无默认加载副本。有效标记、缺文件、无有效 ID、Prism 实例父目录与专服目录的本地测试通过。

临时诊断分支 diag/railway-memory-20261104 提交 8788424，trainresync-1.6.0.p-diag-all.jar 的 SHA-256 为 29d504f4e6c8e562cc22c1b0036b603cb3f1c469086f1735b24c9e305e7f3e8d。独立 JFR 记录及铁路保存摘要；归档目录选定为 /synology/MCShare/minecraft/railway-recovery/{create-cn,train-cn}/。本条记录为本地编译与静态验证，生产启动需另记。

## 2026-11-04 · 两服首次线上启动验收（北京时间）

已通过共享 SSH 向 create-cn、train-cn 部署 1.6.0.p-diag（上节 SHA-256），每服在安装前校验摘要，旧 JAR 分别改名为 trainresync-1.6.0.d-all.jar.before-railguard.disabled、trainresync-1.6.0.a-all.jar.before-railguard.disabled。两服 config/trainresync.json 启用保护，railwayTempArchive 分别指向既定的 NAS 子目录。

create-cn 11:41:05 日志确认铁路保护生效，11:41:09 Done、TCP 25591 监听。train-cn 11:42:04 保护生效，11:42:08 Done、TCP 25590 监听。两服 Java 进程均已打开各自的 JFR 录制块。create-cn 启动后有 Radium 分析 Supplementaries CannonBlock 时读取客户端 PoseStack 的警告，未阻止就绪。此为线上启动验收，未人为制造超时、截断或 tmp 恢复。mc-watchdog-r2 仍为 inactive。

11:46:57（北京时间）经批准启动 mc-watchdog-r2；journal 确认启动，看门狗和两服均 active/running，两服 MainPID 与首次验收一致。


## 2026-11-05 · 线上备份、DAT 保护与内存诊断审计

称呼更正（用户 11 月 5 日确认）：create-cn 为主服，train-cn 为次要的创造测试服。此前聊天中把两者叫反；下面数据仍按原服务器 ID 对应，已修正文案。主服从 11 月 4 日部署补丁到本次检查未发现新崩溃，但 GC 后高占用／上升趋势属于主服；约 3.6 GiB 的稳定低位属于测试服，不能用于判断主服内存稳定。

北京时间 19:05–19:17，通过共享 SSH 只读核查。未改配置、未重启游戏或看门狗、未强制 GC／导出新堆转储。两服与 mc-watchdog-r2 均 active/running，线上仍为 1.6.0.p-diag。SSH 在最后一条日志返回后被远端关闭；以下为断线前现场，不代表持续监控。

### 自动备份与长期归档

两服 SimpleBackups 均启用，每 2880 分钟、保留 7 份；目录容量上限 create-cn 140 GB、train-cn 70 GB，DH 数据库排除规则仍在。automatic 符号链接指向 NAS；两服各 7 份 automatic、8 份 archive，每份 automatic 同名归档均同 inode、链接数 2。旧 archive 独有文件链接数 1，未因短期轮换丢失。

| 服务器 | 最新成功 ZIP（文件名时间为 UTC） | 开始时间（北京时间） | 大小 | 日志耗时 |
| --- | --- | --- | --- | --- |
| create-cn | create-cn_world_2026-11-04_00-06-02.zip | 11 月 4 日 08:06 | 9,711,337,165 字节，约 9.04 GiB | 4 分 48 秒 |
| train-cn | train-cn_world_2026-11-03_23-21-52.zip | 11 月 4 日 07:21 | 3,936,750,778 字节，约 3.67 GiB | 1 分 58 秒 |

按两天间隔，下轮预计北京时间 11 月 6 日约 08:06／07:21，目前未逾期。mc-backup-archive.timer active/waiting；11 月 4 日 03:00 UTC 至检查时共 33 次任务，两服均成功，均 additions=0、eligible_deletions=0、archive_count=8。oneshot service 的 inactive/dead、Result=success 属正常完成。本次窗口无新增 ZIP，故未发生新建链或新淘汰，不把无操作成功等同于本轮实际删除验证。

**主服（create-cn）上述最新 ZIP 生成于保护补丁部署前，其中 DAT 已在 11 月 4 日检查确认损坏。** 归档正常不证明 ZIP 内业务数据有效；本次没有重复解压该 ZIP。当前正式 DAT 完整，补丁部署后的下一轮两天备份尚未到期。

### DAT 及保存补丁

当前正式文件各读一次到内存，然后对这份字节快照做完整 gzip 解压及 NBT 结构解析，避免跨保存时点混读。结果：

| 服务器 | DAT 大小 | 文件时间（北京时间） | 列车 | 轨道图 | 信号分组 |
| --- | ---: | --- | ---: | ---: | ---: |
| create-cn | 4,778,067 字节 | 11 月 5 日 19:10:49 | 150/150 | 303/303 | 84,148/84,148 |
| train-cn | 1,572,418 字节 | 11 月 5 日 19:10:32 | 160/160 | 648/648 | 2,117/2,117 |

两服均 gzip/NBT 完整，无 trainresync.tmp，railway-recovery 目录为空。此处核查截断和结构完整性，未再次遍历全部列车身份／轨道语义引用。

从部署后的压缩日志与当前日志统计至 11 月 5 日 19:05，两服分别 377 条 DAT 保存摘要，全部 committed=true：create-cn 0.922–1.418 秒，train-cn 0.721–1.261 秒。未发现新 crash report、保存失败或 tmp 恢复事件；不代表人为超时／故障恢复路径已在生产触发验收。

两服最近一次启动分别为 11 月 5 日 03:00:08、03:30:04，journal 为正常停止后启动；未发现同期异常退出。看门狗文件日志最后一条为 11 月 4 日 11:46:57 启动，此后无 missed／故障重启条目。本轮没有最终定位夜间正常重启的触发者，不断言由 cron 或看门狗发起。

### JFR：已证实的高分配来源与尚未证实的泄漏

分析两份已完成录制：create-cn logs/railway-1793763665547.jfr（北京时间 11 月 5 日 01:33–03:00，约 87 分钟），train-cn logs/railway-1793763724836.jfr（02:16–03:30，约 74 分钟）。256 MiB 上限使实际保留窗口短于最大 2 小时。当前会话目标 JFR 为 0 字节，与诊断代码在结束时输出目标文件的方式一致，不能据此判定未录制；本轮详细统计来自已结束会话，不是实时堆分析。

`jdk.ThreadAllocationStatistics` 的线程累计分配差值显示：

| 线程／服务器 | 保留窗口内累计分配 | 对应采样区间平均速率 |
| --- | ---: | ---: |
| TrackMap watcher / create-cn | 1,347,183,703,704 字节，约 1.23 TiB | 约 260 MiB/s |
| TrackMap watcher / train-cn | 2,036,728,460,544 字节，约 1.85 TiB | 约 454 MiB/s |
| Server thread / create-cn | 1,026,985,405,088 字节 | 约 188 MiB/s |
| Server thread / train-cn | 466,305,729,928 字节 | 约 100 MiB/s |

**这是分配后可以反复被 GC 回收的总量，不是同时占用 1–2 TB 内存，也不是留存量。** TrackMap 线程采样起止略短于完整 JFR 窗口；速率按其实际端点计算。

每份 JFR 顺序读取前 20,000 个 ObjectAllocationSample（仅开头约 80–90 秒，非全时段加权比例），定位到 Create Track Map 的 `littlechasiu.ctm.TrackWatcher`：

- `update` 第 413 行：ArrayList.iterator；
- `ExtensionsKt.getPath` → `TrackNodeLocation.getLocation` → `CreateSignal`：构造 Vec3／信号路径；
- `CreateSignalBlock` → LinkedHashSet／HashSet：构造信号分组集合；测试服（train-cn）另有 Line.divideAt／Vec3.lerp。

两服实际 JAR 均为 create-track-map-ashbill-patch-1.4+mc1.20.1-neoforge.jar。可确认该模组是显著分配来源，尚未进行源码修正或关闭模组的对照实验，不能宣布它是 60 秒 tick 或泄漏的唯一根因。

主服（create-cn） GC 后堆占用的分段低位／中位整体上涨：开头低位约 12,997 MiB，后段中位约 13,655 MiB；停服前 System.gc 触发 Full GC 后降到 11,726 MiB（约 11.45 GiB）。该 Full GC 最长暂停 1.923 秒，整段各 GC sumOfPauses 合计约 23.17 秒，录制区间未见 60 秒 GC 暂停。测试服（train-cn）各段 GC 后低位约 3,718–3,727 MiB（约 3.63–3.64 GiB），未持续上升；暂停合计约 8.97 秒，最长 0.238 秒。**高分配已证实，持续泄漏尚未证实；主服（create-cn）高基线及上升趋势仍需解释，不能把本窗口增量线性外推。**

OldObjectSample 中主服（create-cn）出现 Create `FluidDrainingBehaviour.continueSearch`、`FluidManipulationBehaviour.search` 的 HashSet／HashMap 扩容和队列，另有 BlueMap 图像／网格、Distant Horizons 数据及 Netty 缓冲分配栈。这些是有留存时间的抽样对象线索，没有支配树和 retained size，不能据样本数排列真实内存占用或宣布具体对象泄漏。主服（create-cn） 84,148 个信号分组远多于测试服（train-cn） 2,117 个，也值得在解释 Track Map 遍历成本时考虑，但不能直接证明数据异常。

保存摘要的 heapMiB 前后值同时受其他线程及 GC 影响，不能当作一次 DAT 保存分配量；其中 GC 计数也只涵盖保存窗口。现场主服（create-cn） RSS 约 18.73 GiB、测试服（train-cn）约 9.86 GiB，堆上限分别 16／8 GiB；RSS 包含堆外和 JVM 内存，超出堆上限本身不证明泄漏。

取证脚本与原始终端输出保存在本机仓库外 `D:\mydata\Agents\Minecraft相关\临时分析\*20261105.py`、`临时工作区/shared-terminal/audit-20261105-*.json`。未把原始日志或凭据入库，未新增待办，未部署修复。


### 2026-11-05 19:52：重新连接后的即时数据与进一步审计边界

用户要求查看当前而非历史 JFR。北京时间 19:52:59，create-cn 主服 PID 1544932，RSS 19,699,456 KiB（约 18.79 GiB），进程已运行 16:52:51；train-cn 测试服 PID 1547743，RSS 10,342,324 KiB（约 9.86 GiB），已运行 16:22:55。19:51:55 服务检查三项均 active/running。系统 MemAvailable 16,273 MiB（约 15.89 GiB），Swap 使用 162 MiB。主服最新保存 19:50:49 committed=true、1.290 秒，heapMiB=13822→14604（保存后约 14.26 GiB，上限 16 GiB）；测试服 19:50:32 committed=true、1.055 秒，heapMiB=5815→6476。堆摘要比 RSS 快照早约两分钟，不能将它们当成同一时刻精确分解；保存后数值也不是 Full GC 后的存活量。

普通用户访问 root Java 的 /proc/cwd 被拒，改用 ps 与已有日志完成只读采集；PATH 和当前 JRE bin 未发现 jstat。未提权附加 JVM、强制 GC、生成堆转储、变更诊断配置或重启服务。

关于用户询问的长期占用：HPROF 堆快照配合 Eclipse MAT 的 Dominator Tree／retained size／Paths to GC Roots，可查当前哪些对象与引用链保留了大块 Java 堆；共享对象不能简单按模组重复相加。一次快照用于现状，多时点快照比较及业务语义用于判断持续累积或泄漏。类直方图仅按类统计实例数和对象自身大小，不能解释 byte[]／HashMap 属于哪个缓存；JFR OldObjectSample 配合根引用路径可提供抽样线索，但不是完整占用清单。进程 RSS 还包括 JVM 原生、线程栈、映射等，HPROF 不覆盖全部，必要时另查 OS 映射与 NMT。

Java 21 官方将 GC.class_histogram 和 GC.heap_dump 均列为 High impact；heap_dump 默认请求 Full GC，-all 包含不可达对象且不请求该 Full GC，不能据此视作无暂停。JFR path-to-gc-roots 也有类似 Full GC 的开销。若进一步实施，需另行确认具体命令、输出路径和对游戏停顿／看门狗的影响。本轮仅讨论方法，未授权或执行上述诊断变更，未新增待办。

依据：[Java 21 jcmd](https://docs.oracle.com/en/java/javase/21/docs/specs/man/jcmd.html)、[Java 21 内存泄漏诊断](https://docs.oracle.com/en/java/javase/21/troubleshoot/troubleshooting-memory-leaks.html)、[Eclipse MAT 留存分析](https://help.eclipse.org/latest/topic/org.eclipse.mat.ui.help/reference/findingmemoryleak.html)。


### 2026-11-05 20:00：堆快照工具与停服需求的只读审计

当前 PATH、/etc/java 和标准 JVM 安装目录未找到 jcmd、jmap、jstat；PATH 有 jfr。/etc/java 只有 Eclipse Adoptium Temurin 21.0.5+11-jre 和 19.0.2+7-jre，dpkg 未登记 OpenJDK／Temurin 包。两服实际进程及 start-abs.sh 均指向 /etc/java/jdk-21.0.5+11-jre/bin/java，Java 进程所有者为 root。显式命令行和两个 @参数文件均未见 DisableAttachMechanism；主服 Xmx16G/Xms4G、测试服 Xmx8G/Xms2560M。当前 JRE 未带 lib/libattach.so；外置完整 JDK 可提供客户端诊断工具及依赖，无须把这些文件复制进正在运行的 JRE。

结论：补充独立、匹配的 JDK 21 工具本身不需要停服、替换运行中 Java、重启或新增 TrainResync Mixin。实际 attach 尚未验证，不能仅凭未见禁用参数保证可连接；需要在工具就绪并获准后，以与目标 JVM 相同的有效用户／组验证。未读取进程环境变量中的注入参数、未调用 jcmd 附加 JVM。

两服 server.properties 的 max-tick-time 均为 60000；两服和外部看门狗均 active/running。现有保护只等待 activeSave 对应的 DAT 保存，不为任意诊断暂停延长等待。故“补工具不用停服”不等于“现在可无风险直接取快照”；采集可能长暂停，正式实施仍须安排内置／外部看门狗处理并逐项获准，不能先结束 JVM 后再捕获其原内存。工具缺失本身没有构成必须停服的理由。

服务器本地盘可用约 85 GiB、NAS 可用约 2.3 TiB（df -h）；本轮没有选择或创建输出目录、下载／安装工具、改配置、强制 GC、生成 HPROF 或重启服务。原始输出在仓库外 shared-terminal/audit-20261105-heap-tools.json 与 audit-20261105-heap-attach.json。


### 2026-11-05：堆采集看门狗豁免的源码评估（尚未实现）

用户提出在独立诊断分支用变量／文件标记，临时将看门狗容忍时间增加到最多五分钟，并询问能否复用 DAT 保护路径。本轮核对 diag/railway-memory-20261104（8788424）的 RailwayWatchdogMixin、AtomicRailwayFile 与本机 MC 1.20.1 ServerWatchdog 源码。

既有 Mixin 注入 exit() HEAD：此时原版已经判定超时并生成 crash report；awaitCurrentSave() 只等待当前保存 latch（最多额外五分钟），之后仍进入 exit()，不是“恢复运行”豁免。因此可以复用同一个 Mixin 目标／维护位置，但不能把采集 flag 简单塞入该 latch 后宣称不会退出。采集豁免需要在超时判定之前介入，原 DAT 退出前等待行为保持独立。原版判定后使用同一轮时间值计算 Thread.sleep；实现若仅跳过退出而保留负 sleep 时长，可能导致看门狗线程异常退出，设计与验证必须一并考虑。

变量适合 JVM 内部采集入口；外部 jcmd 采集配合有期限的文件标记更容易控制。实现应考虑标记残留、采集结束后服务器 tick 尚未恢复的时序，以及标记结束后恢复正常监督，不能靠永久存在的标记关闭看门狗。具体限额仍待用户选项回复：总 tick 上限五分钟，还是原有一分钟之外额外五分钟；未擅自选定。未修改代码、分支、服务或创建实际标记。

部署新 Mixin 通常要重启 Java，当前内存现场随之消失，只能保护重启后的采集。五分钟是诊断豁免的逻辑上限，不是在整个 JVM 被暂停时保证准时终止采集的外部硬超时；Java 看门狗自身同样可能暂停。此方案仅涉及内置 Minecraft 看门狗，不自动改变外部 mc-watchdog-r2 的 TCP 检查或 systemd 行为。


### 2026-11-05 20:25：诊断宽限已本地实现，未部署

用户选定快照宽限为单次 tick 总门槛五分钟，并随后澄清两种逻辑独立：快照未超五分钟可以继续运行；真正决定退出后，DAT 原有额外等待仍保留，不把两者强行合并为全流程五分钟硬限制。取代上节“时限待选”的状态。

TrainResync 当前切到 diag/railway-memory-20261104，在原线上 p-diag 基线增加 22 行 RailwayWatchdogMixin，版本 1.6.0.p-diag2；main 不变、后续 q 修复未合入。实例工作目录存在普通文件 trainresync-heap-dump.flag 时，超时判定门槛变为 300000 毫秒；无标记使用原门槛。诊断模式修正超出原60秒后可能出现的负休眠，改为至少一秒后复查；保持正常唤醒节奏，不直接睡满五分钟。DAT 保存和退出前等待代码原样保留。

标记由采集操作创建，确认游戏 tick 恢复后移除；不自动创建／删除／超时过期，残留时后续 tick 仍使用五分钟门槛，不能作为常驻配置分发。需要先部署并重启才能生效，会丢失当前运行内存现场。没有安装远端 JDK、创建标记、采集堆快照、改配置或重启服务器。

离线 build 成功、27 项隔离断言通过，验证生产方法的标记切换／五分钟边界／负休眠，并核对 Forge 47.2.0、47.4.6 注入字节码及生产 refmap；未真实游戏加载验证。首次构建缺本机 NIIJIMA_MODS_DIR，设置为既有 test0016/minecraft/mods 后成功，无下载。测试与日志在仓库外 临时测试/TrainResync-堆快照看门狗/。产物位于 TrainResync/build/libs/trainresync-1.6.0.p-diag2-all.jar，833345 字节，SHA-256 f686f9ac10af85cb909d87e558ea2f7d70f66242cb31f068d5fe56cd3bec5e05；尚未提交、入包或部署。操作语义见诊断分支 agent/配置.md 最新节。

### 2026-11-05 23:10：局域网连接、停服后导航数据只读取证

用户携本机返回服务器所在房间，要求核查“列车不产生预先进路／走错轨道”，补充现象应该今天才出现，暂不清楚具体列车和道岔。共享终端已连接 192.168.1.222:22，沿用原 SSH 别名身份和已信任主机密钥；未改 SSH 配置。以下时间统一北京时间（UTC+08:00），除明确标注的 ZIP 文件名和成员时间。

**服务仍停止。** mc-create-cn-r2、mc-train-cn-r2、mc-watchdog-r2 均 inactive/dead、MainPID=0，退出活动状态时间为 20:37:30。两服随后完成正常停服保存：主服最后 DAT 保存 20:37:35.575，committed=true、1094 ms，20:37:35.989 所有维度保存完成；测试服 DAT 保存 20:37:32.748，committed=true、982 ms，所有维度随后保存完成。本轮未恢复文件、未启动服务、未部署 p-diag2。

#### 当前 DAT：未发现再次截断，尚未定位走错轨道的根因

| 停服后文件 | 字节数 | 列车／车厢 | 轨道图 | SignalBlocks |
| --- | ---: | ---: | ---: | ---: |
| create-cn 主服 | 4,717,543 | 150／391 | 303 | 84,152 |
| train-cn 测试服 | 1,572,608 | 160／340 | 648 | 2,117 |

两份文件均完整 gzip 解压、通过 CRC，并将 NBT 解析到末尾；无残留临时 DAT。当前主服正式文件修改时间为 20:37:35.559，测试服为 20:37:32.735。主服 17,414 个图节点、34,566 条有向边，无重复列车／图／信号组 ID、越界连接目标、非对称图边，未发现列车引用不存在的轨道图。41 列有导航目的地，8 列有 ReservedSignalBlocks，0 列 Derailed；这些是停服快照，不能证明故障时所有车辆工作正常，也不能据“部分无预留”断言全服不能预留。导航目的地、阻挡信号、已保存 Path 边及转向架所在边均能在各列车轨道图中找到，列车占用／预留的信号组引用存在。

查到 206 条边引用的信号组不在全局表中、3 个信号侧的组引用缺失，但相同 206 条的计数及抽样 UUID 在 10/27、11/02 已存在；当前这 3 个信号亦见于两份旧 DAT（两份旧 DAT 各为 4 个）。需结合 Create fallback／无效侧等语义解释，不能将此检查结果直接标成今天新增损坏。当前缺组信号侧均保存为 INVALID。

只读检查 DAT 指向的世界方块：涵盖 338 站台记录、1446 信号机端点及其他边缘点，共读取约 1028 个区块。发现主世界 (101,77,861)、(219,77,857) 两信号机及 (561,64,-760) 的 Track Station 仍在 DAT 内，但对应世界位置已是空气；**11/02 同一完整 ZIP 内的 DAT 和 region 文件就有完全相同的三个不一致**，故不能作为此次回档后新损坏的证据。已覆盖区块中另有 3 个世界站台／信号机 UUID 未列入 DAT，尚未证明属于有效绑定或本次故障位置；不是全世界反向扫描。初筛耦合器出现的 UUID 不同不能直接当异常：抽查显示其合法 SecondaryId 对应第二个图边缘点，故排除该粗判作为损坏证据。

当前日志两服各有 153 条成功 DAT 保存摘要。没有新的 DAT 保存失败、OOM 或可直接指认此次走错轨道的异常堆栈；主服最新 crash report 仍为 UTC 11/03 18:41（保护部署前）。主服 TrackMap 的 ConcurrentModificationException 是其后台地图更新循环异常，不能凭它认定导航数据被改坏。停服时 stty/JLine 错误之后，游戏线程仍完成 DAT 和全部区块保存。

代码依据使用本机 Create 0.5.1.j 实际 JAR 的 javap，另对线上 Navigation.class 和 TrackTargetingBehaviour.class 做 SHA-256 比对，两者均一致；本机 Create checkout 为 6.0.10/MC1.21.1，未将其当线上版本。Navigation.navigateOptions() 在 currentPath 为空，或下一条规划边不在本次候选边中时，返回 options.get(0)，没有在该分支强制停车或记录错误。这是“规划／现场分岔不匹配时可能走入别的轨道”的代码机制，**本次尚无故障列车、道岔与运行时路径证据，不能把该机制宣称为已确认 root cause**。正常剩余路线没有分岔也可有空 Path，不能仅凭空列表判坏。TrackTargetingBehaviour 加载时优先按 UUID 取现有图边缘点，并非无条件根据世界重新生成铁路图。因此文件结构完整不保证地图与运行状态完全一致；局部 DAT 回退导致世界时间线不一致仍是待验证解释，现有证据不足以要求再次回档或全服回档。

#### 两次实际 DAT 回档时间（只操作 create-cn）

| 实际操作时间（北京时间） | 恢复来源 ZIP（名称时间为 UTC） | 对应备份开始时间（北京时间） | 原现场保留文件 |
| --- | --- | --- | --- |
| 2026-10-30 00:00:32（步骤窗口 00:00:18–00:00:39） | create-cn_world_2026-10-27_00-06-00.zip | 2026-10-27 08:06:00 | create_tracks.dat.old7，4,683,103 字节 |
| 2026-11-04 10:33:23 | create-cn_world_2026-11-02_00-06-02.zip | 2026-11-02 08:06:02 | create_tracks.dat.old8，4,293,301 字节 |

目标均为 /home/ashbill/minecraft-server/create-cn/create-cn_world/data/create_tracks.dat；均原样提取 ZIP 中的同名正式 DAT，不改列车 NBT、不做部分合并、不恢复 region／玩家数据。两次恢复后的文件分别为 4,717,984 字节／151 列、4,670,283 字节／149 列。第一次未执行此前讨论的删除 kiha25；第二次跳过了已确认 DAT 损坏的 11/04 ZIP。train-cn 没有执行 DAT 回档。

## 2026-11-06 · p-diag3 调试指令已部署，恢复运行

用户批准部署并开两服和狗，旧 p-diag 在两服 mods 中均改名为 `.jar.disabled`；未执行新回档、改配置或修改游戏内铁路状态。北京时间 create-cn 00:32:57 Done、train-cn 00:34:47 Done，mc-watchdog-r2 00:37:10 启动，三服务 active/running。铁路保护与 JFR 保留；主服 00:38:07 自动保存 committed=true、1112 ms。

新指令的当前内存引用检查：主服 150 列／0 finding，测试服 160 列／0 finding。抽查 E233Y02 已有规划与预留，但这不能排除其他列车或特定道岔异常。主服完成八入口基本验收，短 trace 到期结束；未复现走错轨道，未采集动态 FORK/NAV。详细产物、命令和验收边界见[列车调试指令](列车调试指令方案-20261105.md)。共享终端已接入主服 screen；用户要求自行设置复现、再提供列车名，目前停止继续发游戏内指令，不更改方块／轨道／时刻表。

时间依据：old7 的 ctime 为 UTC 10/29 16:00:32.950，与本地任务日志窗口一致；old8 的 ctime 为 UTC 11/04 02:33:23.383，与本地 10:30:41–10:36:54 恢复记录一致。第二次脚本实际以硬链接保留旧文件，再原子替换正式路径，结果是原文件保留在 old8。两个 ZIP 内 DAT 成员的记录时间分别为 UTC 10/27 00:06:22、11/02 00:06:26（北京时间 08:06:22、08:06:26）；这里列为 ZIP 元数据，不将其混同为整个世界所有数据的同一保存瞬间。

原始脚本和输出保存在仓库外 临时分析/railway-navigation-20261105/ 与 临时工作区/shared-terminal/nav-*-output*.json。本次只读调查，不新增待办。后续定位仍缺一列故障车辆及具体分岔／车站例子；用户目前无法提供，不擅自开服复现。
