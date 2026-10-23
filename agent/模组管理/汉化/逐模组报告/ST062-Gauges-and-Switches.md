# ST062 Gauges and Switches 筛查报告

> **待办维护位置更新（2026-10-24）：** 本文的待办／下一步／候选清单保留为历史与技术依据，不再独立维护状态；有效任务统一见[总 todo](../../../todo-list.md)，炼药锅 mini todo 为例外。功能台账、测试步骤及来源证据仍在本文维护；旧“待实现／待决定”不覆盖总表及mini的最新结论。

日期：2026-10-18。当前包 `rsgauges-1.2.22.jar`，命名空间 `rsgauges`。

## 结论与范围

通读对照标准英文／中文各332键。无缺键，本轮新增0键，修正18个已有值（其中4个是保留英文的设备名称与帮助）。保留作者既有“红石测量与开关”及分类式物品命名。初筛完成不等于全部疑点已解决；未游戏验证、打包或部署。

覆盖位置：`pack/overrides/kubejs/assets/rsgauges/lang/zh_cn.json`。语言元数据、格式模板和按键缩写不按缺译处理。

## 上游与实现证据

官方仓库：https://github.com/stfwi/rsgauges 。已查询分支，master为`4acd19ae4833bae558cf16cd6c0bbc13b8854f1a`，develop为`637d9242c93813dd2f12c3bd583aa2d87443fcee`。两分支的常规 `src/main/resources/assets/rsgauges/lang/zh_cn.json` 路径均404，未取得可比对的新译文；不能据此认定上游没有中文或翻译PR。本轮以安装JAR的中英文及定向字节码为依据，上游真实目录与PR复核仍待补做。

当前JAR `ElevatorSwitchBlock extends PulseSwitchBlock`，支持电梯按钮由“双稳态”改为“脉冲”。`SwitchBlock` 左键处理把红石数量乘2写入 `configured_on_time`，支持 pulse time 为持续时间而非脉冲间隔。字节码证据在本机工作目录 `lang-audit/st062-elevator-bytecode.txt`、`st062-switch-bytecode.txt`，原始语言对照在 `st062-records.json`。

## 已应用修改

| 键 | 原译 | 新译 |
|---|---|---|
| `block.rsgauges.glass_interval_timer.help` | §6一种小型玻璃设备，能发出自定义高值和低值时间的方波红石信号。§r<br>自定义的时间能用正面的按钮配置，范围在0.1秒(2 ticks) 到600秒(10分钟)之间。配置时当前时间值越大，按一次改变的的步长也越大，反之亦然。 利用按钮还能配置输出信号强度和倾斜值， 倾斜值能改变红石信号改变的速度。 §e设备被放置时默认是待机模式。右击表面按钮可 设置为运行模式。§r 信号会输出到设备放置的方块上。输出信号切换时不会发出声音。 ${rsgauges.switch.feature.outputconfig.help} 作为开关连接的目标时会将设备在两种模式间切换。 | §6一种小型玻璃设备，能发出自定义高值和低值时间的方波红石信号。§r<br>自定义的时间能用正面的按钮配置，范围在0.1秒(2 ticks) 到600秒(10分钟)之间。配置时当前时间值越大，按一次改变的步长也越大，反之亦然。 利用按钮还能配置输出信号强度和倾斜值， 倾斜值能改变红石信号改变的速度。 §e设备被放置时默认是待机模式。右击表面按钮可 设置为运行模式。§r 信号会输出到设备放置的方块上。输出信号切换时不会发出声音。 ${rsgauges.switch.feature.outputconfig.help} 作为开关连接的目标时会将设备在两种模式间切换。 |
| `block.rsgauges.industrial_interval_timer.help` | §6一种小型设备，能发出自定义高值和低值时间的方波红石信号。§r<br>自定义的时间能用正面的按钮配置，范围在0.1秒(2 ticks) 到600秒(10分钟)之间。配置时当前时间值越大，按一次改变的的步长也越大，反之亦然。 利用按钮还能配置输出信号强度和倾斜值， 倾斜值能改变红石信号改变的速度。 §e设备被放置时默认是待机模式。右击表面按钮可 设置为运行模式。§r 信号会输出到设备放置的方块上。 ${rsgauges.switch.feature.outputconfig.help} 作为开关连接的目标时会将设备在两种模式间切换。 | §6一种小型设备，能发出自定义高值和低值时间的方波红石信号。§r<br>自定义的时间能用正面的按钮配置，范围在0.1秒(2 ticks) 到600秒(10分钟)之间。配置时当前时间值越大，按一次改变的步长也越大，反之亦然。 利用按钮还能配置输出信号强度和倾斜值， 倾斜值能改变红石信号改变的速度。 §e设备被放置时默认是待机模式。右击表面按钮可 设置为运行模式。§r 信号会输出到设备放置的方块上。 ${rsgauges.switch.feature.outputconfig.help} 作为开关连接的目标时会将设备在两种模式间切换。 |
| `block.rsgauges.industrial_lightning_sensor.help` | §6一种小型壁挂式设备，挡在空气中探测到较高的电位时，也就是雷暴时 会发出红石信号。§r<br>正面的按钮能设置输出信号的强度。 信号会输出到设备放置的方块上。 ${rsgauges.switch.feature.outputconfig.help} ${rsgauges.switch.feature.linksource.help} | §6一种小型壁挂式设备，当在空气中探测到较高的电位时，也就是雷暴时 会发出红石信号。§r<br>正面的按钮能设置输出信号的强度。 信号会输出到设备放置的方块上。 ${rsgauges.switch.feature.outputconfig.help} ${rsgauges.switch.feature.linksource.help} |
| `block.rsgauges.industrial_switchlink_cased_receiver.help` | §6一个用完整方块包装的小型工业式双稳态开关设备，专为作为开关连接目标优化。 §r<br>内部的继电器是消音的，因此非常安静。 也能像扳手一样手动开关。 ${rsgauges.switch.feature.outputconfig.help} ${rsgauges.switch.feature.linktarget.help} ${rsgauges.switch.feature.linksource.help} | §6一个用完整方块包装的小型工业式双稳态开关设备，专为作为开关连接目标优化。 §r<br>内部的继电器是消音的，因此非常安静。 也能像拉杆一样手动开关。 ${rsgauges.switch.feature.outputconfig.help} ${rsgauges.switch.feature.linktarget.help} ${rsgauges.switch.feature.linksource.help} |
| `block.rsgauges.industrial_switchlink_receiver.help` | §6一个小型工业式双稳态开关设备，专为作为开关连接目标优化。 §r<br>内部的继电器是消音的，因此非常安静。 也能像扳手一样手动开关。 ${rsgauges.switch.feature.outputconfig.help} ${rsgauges.switch.feature.linktarget.help} ${rsgauges.switch.feature.linksource.help} | §6一个小型工业式双稳态开关设备，专为作为开关连接目标优化。 §r<br>内部的继电器是消音的，因此非常安静。 也能像拉杆一样手动开关。 ${rsgauges.switch.feature.outputconfig.help} ${rsgauges.switch.feature.linktarget.help} ${rsgauges.switch.feature.linksource.help} |
| `block.rsgauges.red_power_plant.help` | §6人造的红色化，看上去非常像虞美人。 当被实体触碰时会向上方方块和底部方块发出红石信号。 §r<br>${rsgauges.switch.feature.outputconfig.help} ${rsgauges.switch.feature.contactmat.offdelay.help} ${rsgauges.switch.feature.linksource.help} | §6人造的红色花，看上去非常像虞美人。 当被实体触碰时会向上方方块和底部方块发出红石信号。 §r<br>${rsgauges.switch.feature.outputconfig.help} ${rsgauges.switch.feature.contactmat.offdelay.help} ${rsgauges.switch.feature.linksource.help} |
| `rsgauges.switch.feature.typebistable.help` | §6一种像扳手一样手动调节状态的开关。<br> | §6一种像拉杆一样手动调节状态的开关。<br> |
| `rsgauges.switchlinking.switchlink_pearl.use.targetgone` | 目标开关已被破环或变更位置 | 目标开关已被破坏或变更位置 |
| `block.rsgauges.elevator_button` | 双稳态红石开关（电梯按钮） | 脉冲红石开关（电梯按钮） |
| `block.rsgauges.industrial_switchlink_receiver_analog` | Industrial Analog Switch Link Receiver | 开关连接模拟接收器 (工业式) |
| `block.rsgauges.industrial_switchlink_receiver_analog.help` | Small device to output analog Redstone signals from received Switch Link signals. Can be used in conjunction with an analog link transmitter, comparator switch, or dimmer.<br>.${rsgauges.switch.feature.linktarget.help} | 一种小型设备，将收到的开关连接信号转换为模拟红石信号输出。可与模拟连接中继器、比较器开关或可调开关配合使用。<br>${rsgauges.switch.feature.linktarget.help} |
| `block.rsgauges.industrial_switchlink_relay_analog` | Industrial Analog Switch Link Transmitter | 开关连接模拟中继器 (工业式) |
| `block.rsgauges.industrial_switchlink_relay_analog.help` | A small device that transmits detected redstone signals wirelessly as analog information to switch link targets. It cannot emit redstone signals itself.<br>${rsgauges.switch.feature.linksource.help} | 一种小型设备，将检测到的红石信号强度无线传输至开关连接目标，自身不能输出红石信号。<br>${rsgauges.switch.feature.linksource.help} |
| `rsgauges.switch.feature.pulsetime.help` | 手持一组红石左键可将脉冲间隔固定在0.1秒(1)到6.4秒(64)之间。 | 手持一组红石左键可将脉冲持续时间固定在0.1秒(1)到6.4秒(64)之间。 |
| `rsgauges.switchconfig.blocksensor.filter.material_clay` | 粘土 | 黏土／陶瓷 |
| `rsgauges.switchconfig.blocksensor.filter.material_water` | 水 | 水／冰 |
| `rsgauges.switch.feature.linksource.help` | 用连接末影珍珠左键此开关来使其成为连接源。 | 用开关连接珍珠左键此开关来使其成为连接源。 |
| `rsgauges.switch.feature.linktarget.help` | 用末影珍珠左键此开关来得到与其连接的连接末影珍珠。 | 用末影珍珠左键此开关来得到与其连接的开关连接珍珠。 |

## 留待核实，未擅改

- 玻璃／工业红外探测器：中文写上下左右前后两格，英文写上下两格、正面及左右为可配置范围。需追踪检测包围盒与朝向后再修正。
- `outputconfig.help`：中文“空手左键”与英文“手持红石火把”不同；当前实现含 wrenched 和配置分支，须结合工具判定和包配置核实完整操作，不仅凭英文替换。
- 两组实体过滤 `mobs` 仍为英文，`objects` 译为掉落物；需核实实际筛选谓词，避免把所有 Mob 误译为怪物或把非生物实体缩窄为掉落物。
- 方块过滤帮助仍有矿物辞典和“除颤延迟”等旧文案，需核对当前过滤实现，再统一清理旧版本机制描述。
- 红／黄色能量植物的输出方向、染色玻璃透明度、工业落物框的“活板门”命名、ESTOP及脚踏按钮名称属于上下文／外形候选，暂留原值。
- 未穷尽硬编码和配置界面文本；本次范围是332个标准语言键及上述定向实现核验。

## 验证

18键均来自当前JAR；JSON可解析，格式占位符和 `${...}` 帮助引用与旧值逐键一致；覆盖路径为小写。尚未在游戏中检查提示排版、资源加载及实际交互。

## 暂停交接

用户要求完成当前模组后暂停，已在ST062后停止。ST063 Traveler’s Titles、ST064 ServerWarashi仅已提取／阅读本机对照，未应用、未计入完成。恢复后从ST063继续；ST049币名仍待讨论。
