# ST001 Create Railways Navigator：补译与旧译筛查

日期：2026-10-16。版本：`createrailwaysnavigator-forge-1.20.1-beta-0.8.4.jar`。原编号 030。

本轮完成 **529 个标准键的通读对照、324 个已有中文的初筛、201 条缺译补充**。旧译修正 **4**（E-ST001-01、02、03、05）；其他问题留待用户选择。资源静态检查通过，**未进游戏、未构建整合包、未部署**。停在 ST001，不自动继续 ST002。

## 范围和数量

| 范围 | 英文键 | 原有中文 | 本轮补译 | 未新增覆盖 |
| --- | ---: | ---: | ---: | ---: |
| CRN 主命名空间（含其提供的 Create 单位键） | 465 | 324 | 140 | 1 |
| 内嵌 DragonLib 2.2.24 | 64 | 0 | 61 | 3 |
| 合计 | 529 | 324 | 201 | 4 |

初扫 205 个缺键候选不全部等于需要翻译的普通英文：`gui.dragonlib.colorpicker.hsv`、`.rgb`、`.hex` 保留 HSV／RGB／HEX 通用标记，不添加同值覆盖。`createrailwaysnavigator.moin` 原值为 `moin`，未在主 JAR 类文件发现完整键的直接引用；不能据此证明绝不会动态调用，暂留原文、标为待确认用途。可译候选已处理 201 条，不能把余下四个 JSON 缺键写成“所有键均已有中文”。

DragonLib 是共享依赖，其 61 条补译只存一份；后续检查包含该库的其他宿主时应复用并重新计算有效缺口，不能重复计入新增补译。

## 实际修改与采用风格

- [CRN 语言覆盖](../../../../pack/overrides/kubejs/assets/createrailwaysnavigator/lang/zh_cn.json)：144 键（140 条补译、4 条旧译修正）。
- [DragonLib 语言覆盖](../../../../pack/overrides/kubejs/assets/dragonlib/lang/zh_cn.json)：61 键。
- [完整 201 条中英对照](ST001-Create-Railways-Navigator-补译明细.md)。

首轮只补原来不存在的键；后续按用户确认应用下文四条旧译修正。沿用已有“机械动力：铁路导航、导航仪、车站标签、经停站、列车类别、时刻表区段”等上下文用词；名称和按钮保持简洁。不是把本轮拟词自动升级为用户的长期偏好。

| 英文 | 本轮新增中文 | 类型 |
| --- | --- | --- |
| Navigator | 导航仪 | 物品 |
| Lectern with Navigator | 带导航仪的讲台 | 方块 |
| Do not board! | 请勿上车！ | 站台提示 |
| Transfer Ownership | 转让所有权 | 权限操作 |
| Contains %s Trains | 包含%s列列车 | 动态数量 |
| Minimum X Scale | 最小水平缩放比例 | 排版设置 |
| Prioritized Destination | 优先目的地 | 时刻表指令 |
| Select the station with the fewest signals turned red by Redstone. | 选择路径上被红石强制设为红灯的信号机最少的车站。 | 操作说明 |
| %s excluded | 已排除%s项 | 筛选结果 |
| Color Picker | 拾色器 | 共用工具界面 |

`search_options.train_categories.excluded` 被 `UserSettings` 的多个分支复用，包括保存路线相关分支；因此采用通用量词“项”，没有机械译作“个类别”。`train_separation.description` 的两个参数分别为时间长度和时间来源，下一行显示列车过滤条件；译作“在以下列车发车%s（%s）后出发：”。

## 明确错误或较强证据的旧译问题（应用状态见末尾确认记录）

下表的序号属于 ST001，不与旧报告 E01／P003 等编号混用。建议文本供选择，未获选择的旧译保持原样。

| ID | 完整键 | 当前中文 | 建议 | 证据与影响 |
| --- | --- | --- | --- | --- |
| E-ST001-01 | `gui.createrailwaysnavigator.route_overview.notification.transfer` | 换乘%s→%s，在%s站台乘车 | 换乘%s→%s | 英文只有两个参数，ClientRoute 无站台分支也只传两项；中文版多出第三个占位符，产生不完整通知。带站台的独立键才传三项。 |
| E-ST001-02 | `enum.createrailwaysnavigator.time_display.abs` | 自动区间信号系统 | 绝对时间 | 同组说明明确写 ABS (absolute)，且 ETimeDisplay 为时间显示枚举；不是信号制式。 |
| E-ST001-03 | `gui.createrailwaysnavigator.saved_routes.in_days` | 在%s日内 | %s天后 | SavedRoutesViewer 用今天／明天／相差天数分组，表示具体未来日期，不是截止期限。 |
| E-ST001-04 | `gui.createrailwaysnavigator.advanced_display_settings.show_arrival.description` | 若该功能已激活，或列车将驶入排除区域（无论此项设置是否启用），则均将显示列车到达信息。 | 启用后，将显示在此切换时刻表区段的列车到达信息。若列车随后进入不可导航的区段，或“包含下一个区段的起始”选项已关闭，则忽略此设置。 | 当前中文漏掉切换区段与后一选项条件，把不可导航区段改成“排除区域”。建议忠实于当前英文；“忽略设置”之后具体默认显示行为需游戏验收，不擅自解释为一定隐藏。 |
| E-ST001-05 | `gui.createrailwaysnavigator.saved_routes.in_the_past` | 旧前 | 过去 | 不自然且疑似错字，对应日期分组 In the past。 |
| E-ST001-06 | `block.createrailwaysnavigator.advanced_display.ber.delayed` | 延误。%s | 预计延误%s | 原文 Delay approx. %s；当前句号割裂句子且遗漏约数含义。也可用“大约延误%s”。 |
| E-ST001-07 | `gui.createrailwaysnavigator.global_settings.train_line.description` | 创建列车路线以便将不同列车分组，覆盖其显示名称并调整各路线的其他设置。（仅适用于已在调度中的列车） | 创建列车路线以便将不同列车分组，覆盖其显示名称并调整各路线的其他设置。（只能在时刻表中为列车分配路线） | 英文 Can only be assigned to the trains in the schedule 指分配入口，不是仅限某类“已在调度中”的列车；同时存在区段设置的分配线路选项。 |

## 上下文与一致性候选（应用状态见末尾确认记录）

| ID | 键／范围 | 当前译文 | 建议与不确定性 |
| --- | --- | --- | --- |
| C-ST001-01 | `gui.createrailwaysnavigator.section_settings.usable`；`createrailwaysnavigator.schedule.instruction.travel_section.usable` | 可通行 | 建议“可导航”，对应 Navigable，描述区段是否用于导航，不宜让玩家误以为它决定轨道是否可以通车。确认后两键同步。 |
| C-ST001-02 | `gui.createrailwaysnavigator.train_status.unknown_delay` | 操作延误 | 建议“运营延误”，对应 Delay in operations，并与同组“运营中断”一致。 |
| C-ST001-03 | `gui.createrailwaysnavigator.train_status.priority_other_train` | 另一列车的优先级 | 建议“让行其他列车”，作为延误原因比名词“优先级”更明确；实际触发场景仍待运行确认。 |
| C-ST001-04 | `gui.createrailwaysnavigator.route_overview.notification.schedule_changed` | 您保存的路线时间表已被更改，请检视导航器以了解相关更动。 | 建议“您保存的路线时刻表已更改，请查看导航仪以了解变更。”统一同模组“时刻表／导航仪”，不扩大为全文改写。 |
| C-ST001-05 | `gui.createrailwaysnavigator.route_overview.title` | 路线详情 | 英文 Travel Companion，与另一个 Route Details 标题共用中文。可保留，或区分为“旅途助手”；属于界面命名偏好。 |
| C-ST001-06 | `gui.createrailwaysnavigator.route_details.departure`、`.arrival`、`.next_transfer_time` | 出发时间／抵达／换乘时间 | 英文均为 “… in”，疑为倒计时标签；建议“距发车／距到达／距换乘”。需结合实际布局和单位显示确认，不直接应用。 |
| C-ST001-07 | `gui.createrailwaysnavigator.route_overview.next_connections`；`gui.createrailwaysnavigator.advanced_display_settings.show_connections` | 下一车次／显示下一班次信息 | connections 可能是可换乘车次而非单纯下一班车，需看界面数据来源；可考虑“后续换乘／显示后续换乘信息”。 |
| C-ST001-08 | `gui.createrailwaysnavigator.route_overview.transfers` | %s换乘 | 建议“%s次换乘”，补足次数单位。 |

## 偏好问题（未决定）

| ID | 当前用法 | 可选方向 |
| --- | --- | --- |
| P-ST001-01 | Train Line 多数为“列车路线”，少数为“列车线路”；导航 Route 也译“路线” | 是否统一 Train Line 为“线路”、导航 Route 为“路线”？本轮新增译文未改现有全套术语。 |
| P-ST001-02 | Route Overlay 为“路线覆盖” | 可保留，或改为“路线浮窗／路线悬浮显示”；属于界面易读性选择。 |
| P-ST001-03 | Global/Search Settings 中“设定／设置”、Table 中“表格／列表”，以及部分英文逗号、句号 | 是否统一轻微风格差异？目前保留合理旧译，不为追求统一批量重写。 |

## 验证和剩余范围

1. 本地缓存 JAR SHA-1 实测为 `2011086a8f36be5b88912f92c9c1447e1eeee404`，与扫描基线一致；直接读取主 JAR 英中 JSON 与导出对照，内容一致。
2. 新增文件可以解析，201 个键均来自原英文且不覆盖原中文；无重复键、空译文；`%s` 数量及参数对应、Create `_强调_` 标记检查通过。
3. 原有324键的格式检查发现 E-ST001-01 一处参数不一致；中文使用 `%2$s`／`%1$s` 调换顺序的其他条目属于正常语序调整，不误报。
4. 定向核对 TrainStationClockBlock、TrainSeparationCondition、ClientRoute、SavedRoutesViewer、UserSettings、CustomLanguage、ModTranslatableComponent、ClientWrapper、ETimeDisplay 及到达设置接口的字节码。特别核对通知参数、日期分组、时间枚举和自定义语言加载。
5. 包内 `createrailwaysnavigator-client.toml` 当前 `language = "DEFAULT"`，ClientWrapper 走游戏语言；显式自定义语言分支也使用资源管理器加载。普通语言覆盖在静态路径上适用，仍需资源重载／重启后的游戏验收，尤其自定义语言缓存。
6. 配置文件英文说明、元数据简介，以及服务器错误包的原始字符串未被标准语言 JSON 覆盖。本轮未做所有类的完整硬编码文本审计，也未改配置格式、日志或网络错误消息；**本报告不是“整个模组已无任何英文”的承诺**。后续若要求这些范围也全部本地化，需单列配置与服务端消息工作。
7. 游戏验收应覆盖：导航仪与讲台名称、类别筛选／权限菜单、显示器排版、列车间隔和优先目的地、站台提示、DragonLib 拾色器；检查文字是否溢出及参数实际显示。未搭建测试实例。

临时证据位于 `C:/mydata/Agents/Codex-CreateTrainResync/lang-audit/st001-*`，包括完整中英对照、上下文字节码和本轮验证脚本；可交接的结论与全部新增译文已保存于仓库。本轮停止，等待用户选择旧译问题／偏好；未开始 ST002。

## 2026-10-16 收尾：用户确认应用

用户在交付摘要后确认“apply”，本轮应用摘要明确列出的 E-ST001-01、02、03、05：删除无站台通知的第三个占位符；ABS→绝对时间；在%s日内→%s天后；旧前→过去。其余 E／C 候选及 P 偏好未应用。本轮累计补译201、旧译修正4；全项目累计补译201、旧译修正12。新旧键与参数静态检查通过，游戏验收待用户继续。今日停止，不自动推进 ST002。

收尾 `build.bat` 成功（退出码0），`build/pack.zip` 已含本轮新增译文、四项修正及当前包内 helper 0.1.9，产物130,688,226字节。此结果替代首轮“未构建”状态；未进游戏、未部署。
