# ST003 Pantographs & Wires：补译与筛查

> **待办维护位置更新（2026-10-24）：** 本文的待办／下一步／候选清单保留为历史与技术依据，不再独立维护状态；有效任务统一见[总 todo](../../../todo-list.md)，炼药锅 mini todo 为例外。功能台账、测试步骤及来源证据仍在本文维护；旧“待实现／待决定”不覆盖总表及mini的最新结论。

日期：2026-10-17。`pantographsandwires-forge-1.20.1-beta-0.1.1.jar`，原编号086。本轮语言资源处理完成并停止；**有硬编码英文残留，未游戏验证，不继续ST004**。

## 范围与结果

| 来源 | 英文键 | 本轮新增中文 | 复用已有中文 | 保留／排除 |
| --- | ---: | ---: | ---: | --- |
| Pantographs & Wires本体（含wiresapi提示键） | 122 | 120 | 0 | 2个模组品牌标题保留原名 |
| 内嵌DragonLib 2.2.28 | 70 | 6 | 61 | HSV／RGB／HEX三个缩写保留 |
| 内嵌GeckoLib 4.7 | 31 | 0 | 0 | 开发示例，正常游戏环境不注册 |
| 合计 | 223 | **126** | **61** | **36** |

全部223个英文键已通读并归类；本体上游只有英／德语言，没有原中文。61个已有中文来自ST001创建的共用DragonLib覆盖，本轮核对含义并复用，没有重复计数或重写。新版本`scrollbar.here`英文从Here变为Scroll here，旧中文“滚动到此处”仍准确。

本轮写入[本体语言覆盖](../../../../pack/overrides/kubejs/assets/pantographsandwires/lang/zh_cn.json)120键，并在[DragonLib覆盖](../../../../pack/overrides/kubejs/assets/dragonlib/lang/zh_cn.json)追加6个左右滚动词条；旧译修正0。[全部126条新增译文](ST003-Pantographs-and-Wires-补译明细.md)。未修改模组代码、JAR、配置或索引，未安装至测试实例、未重新打包、未提交。

## 代表性译文

| 英文 | 本轮中文 |
| --- | --- |
| Pantograph | 受电弓 |
| Tensioning Device | 张紧装置 |
| Galvanized Lattice Mast | 镀锌格构支柱 |
| Registration Arm | 定位器 |
| Incomplete Cantilever | 腕臂（半成品） |
| Catenary Headspan Wire | 接触网软横跨线 |
| Iron Rod Bundle | 铁棒束 |
| Pencil | 铅笔 |
| Select a wire type | 请选择导线类型 |
| Too far away from previous connection point. Max. %s blocks. | 距离上一个连接点太远，最多允许%s格。 |

沿用原版铜氧化阶段“斑驳的／锈蚀的／氧化的”，用于金属支柱和支架；混凝土的Weathered、Eroded则采用“风化的／侵蚀的”，不把混凝土写成锈蚀。键名含`_oxidized`的混凝土仍按英文显示值Eroded处理。Iron Rod参考Crafts & Additions现有“铁棒”，半成品参考Create“精密构件（半成品）”。

铁路术语参考设备制造商的[接触网产品目录及吊弦说明](https://bjqcc.com/default/product/433/570)与[定位装置说明](https://www.chuangwit.com/support-positioning/)，采用腕臂、定位器、吊弦、软横跨等词；模组中具体对应关系结合本地类名和操作提示判断，属于本轮翻译选择，不宣称每个模型与现实标准件完全对应。Catenary Wire采用“接触网线”，避免未经结构确认就全部等同于单根接触线或承力索。

## 筛查发现和处理

| ID | 发现 | 本轮处理与状态 |
| --- | --- | --- |
| E-ST003-01 | `item.wiresapi.wire.to_far_away`拼写应为too，但代码调用的就是to | 保留键名；中文表达距离过远。没有通过改键名“纠错”导致翻译失效。 |
| E-ST003-02 | 混凝土键以`_oxidized`结尾，但英文为Eroded | 译为“侵蚀的混凝土柱／立柱”；标识不改，避免仅按ID误译。 |
| C-ST003-01 | V形、U形绝缘子及腕臂的棕／绿变体，上游显示名相同 | 延续同名，未擅自为这些键增加颜色词；普通绝缘子则原本带颜色，照原文翻译。可在用户需要区分时再讨论。 |
| C-ST003-02 | `wire.connection_exists`与`wire.cannot_create`英文完全相同 | 同译“连接已存在，或其中一个连接点无效。”，不凭键名编造不同错误原因。 |
| C-ST003-03 | Sodium／Indium警告仍在Forge主资源里 | 忠实翻译该条件性警告，但它不是对当前Forge整合包安装Indium的建议；本轮不改依赖或安装任何模组。 |

## 仍未翻译的硬编码玩家文本

这部分**无法通过新增lang键生效**，没有伪造键并标记完成，也未擅自制作新补丁JAR。

| ID | 硬编码原文 | 建议中文 | 调用证据／后续 |
| --- | --- | --- | --- |
| H-ST003-01 | Upper Tension Wire height difference | 上部张力线高度差 | `de.mrjulsen.paw.item.CatenaryHeadspanWireItem.createHudInfoText`直接调用`TextUtils.text`构造HUD文字；要生效需代码本地化或受控补丁。具体张力线术语也可结合游戏模型进一步确认。 |
| H-ST003-02 | Top Support Wire height difference | 顶部支撑线高度差 | 同一方法，直接构造HUD文字，处理方式同上。 |

另外发现导线图统计中的`Debug Wire Data`、`Nodes (by block)`、`Edges (by node)`、`Players Watching Chunks`等调试英文，以及配置说明／日志。它们不在本轮语言资源覆盖内；`%s (in: %s, out: %s)`属于碰撞记录`toString()`，不直接当作普通玩家界面缺译。动态拼接和所有调试触发路径未逐一运行验证。

## GeckoLib示例排除依据

内嵌4.7的`software.bernie.example.GeckoLibMod`构造函数仅在`shouldRegisterExamples()`返回true时注册示例实体、物品、方块及标签；该方法要求`!FMLEnvironment.production`且系统属性`geckolib.disable_examples`未开启。正常发布游戏环境不注册，因此肥料、赛车、狼盔甲等31键不作为本包普通玩家补译任务。这个结论只适用于正常发布环境；若未来建立开发实例并启用示例，需另行处理，不能把本项排除推广到所有GeckoLib使用者的内容。

## 验证与交接

- 本地JAR SHA-1：`a27602e492a5856a1de32c6d5b33b5de4bb8642c`，与扫描基线一致；本体英文JSON与初扫导出逐键一致。
- 读取Jar-in-Jar元数据，确认DragonLib2.2.28、GeckoLib4.7、mclib20；没有重新下载模组。
- 对主JAR下`de/`和`net/`的319个类导出字节码，定向筛查静态翻译键及人类可读字符串，另检查GeckoLib示例入口。未发现本轮主资源之外的缺失静态翻译键；这不等于所有运行路径均已覆盖。
- JSON可解析；新增126键非空、占位符数量及顺序、强调标记通过检查；两个高度差消息的两个`%s`均保留，米单位中文化。DragonLib原61键内容完全不变，追加后67键。
- 游戏待验：受电弓／腕臂配置界面、导线类型选择、连接失败提示、绝缘子数量参数、支柱外观与老化阶段、标签长度；两条硬编码HUD英文仍会出现。
- 工作证据在`C:/mydata/Agents/Codex-CreateTrainResync/lang-audit/st003-*`。本报告及完整译文保存于仓库供跨机交接。

## 待决定偏好

P-ST003-01：是否把模组标题统一译成“机械动力：受电弓与接触网”？本轮两个标题保留英文品牌名，未自行采用。

P-ST003-02：是否给上游同名的V／U形绝缘子和腕臂增加颜色区分？本轮未增加；这属于额外命名偏好，不是明确笔误。未确认为长期规则。

## 2026-10-18 硬编码文字可达性复核

核对当前缓存JAR字节码，修正此前仅列两条HUD的范围：

- 两条高度差文字：ModClientEvents.init注册RENDER_HUD，回调遍历双手IWireItemBase并调用createHudInfoText；MultiWireItem转发到已注册的CatenaryHeadspanWireItem。软横跨设置进入相应阶段时显示，无开发环境门槛。属于正常架线操作可见文字，不是已证实的未使用内容。
- `Type:`以及动态拼接`Amount: <数值>m`：MultiWireItem的物品悬浮说明直接添加。该类注册为ModItems.WIRE（wire_coil），进入主创造标签；普通线轴物品可见。Amount值来自getRemainingWire，可拟译“剩余长度：<数值>米”。此前遗漏这两条，不能称整个模组仅有两条硬编码玩家文本。
- `Debug Wire Data`、`Nodes (by block)`、`Edges (by node)`、`Players Watching Chunks`等统计：ModClientEvents的DEBUG_TEXT_LEFT回调首先检查PantographsAndWires.useAdvancedLogging；当前实现直接返回Platform.isDevelopmentEnvironment()。因此正常发布环境不在F3显示，开发环境才可见，不计普通玩家缺译；不是整个代码库绝对无用的死代码。

证据来自本机lang-audit/st003-path.txt对应JAR的javap：ModClientEvents、PantographsAndWires、ModItems、ModWireRegistry、MultiWireItem（含-v拼接模板）及CatenaryHeadspanWireItem。属于静态调用与注册检查，未在游戏实测；未声称穷尽全模组硬编码。补丁实现选择仍待用户决定，本轮未制作补丁。

## 2026-10-19 TrainResync四条接触网文本补丁已构建

用户授权将四条正常玩家可见文字放入TrainResync，而非新增独立模组。仅本次四条获准，KubeJS等其他硬编码处理方案仍待讨论。

- TrainResync版本1.6.0.i；新增客户端Mixin CatenaryHeadspanWireItemMixin与MultiWireItemMixin，沿用现有pantographs模组存在性门控。前者仅将两个精确匹配的高度差标签改为Component.translatable，其他TextUtils.text调用转交原实现；后者替换线轴tooltip中的Type:与Amount:，剩余长度直接取原getRemainingWire数值，不解析显示字符串。未修改架线、计算、配方或调试统计。
- 四个语言键位于TrainResync的assets/trainresync/lang/{zh_cn,en_us}.json：trainresync.paw.upper_tension_height_difference、top_support_height_difference、wire_type、remaining_length。中文为上部张力线高度差、顶部支撑线高度差、类型：、剩余长度：%s米。调整译文可用同namespace语言资源覆盖。新增代码补丁语言4键单列，本阶段此前4117条资源补译统计尚未合并这4键。
- 在可见PowerShell中执行`.\gradlew.bat build`，退出0，BUILD SUCCESSFUL in 36s。成品`C:/mydata/Repositories/Create-Train-Resync/TrainResync/build/libs/trainresync-1.6.0.i-all.jar`已复制到pack/overrides/mods，旧h版已移出并备份到`C:/mydata/Agents/Codex-CreateTrainResync/lang-audit/before-trainresync-i/pack-trainresync-1.6.0.h-all.jar`。
- 编译依赖PAW与此次审查缓存JAR的SHA256相同。检查成品包含两Mixin、客户端注册、中英文4键及占位符一致；MultiWireItemMixin的appendHoverText已生成m_7373_映射。构建源与包内副本SHA256均为f0f95c9fb4014ca97fd0ca66f9eb408a2db9d03b4385ce885c9569cee96400fc。以上是构建与静态验证，不等于Mixin运行时应用或游戏效果通过。
- 按约定运行整合包build.bat，退出0，7z Everything is Ok，产物build/pack.zip，130875605字节。打包包含当前pack内其他未提交汉化资源，未额外做ZIP完整性测试。构建前output目录不存在。
- 实例`C:/mydata/Program Files/Games/Minecraft/PCL2/.minecraft/versions/新岛铁道 v1.6.0`仍在运行，用户选择“先完成包内更新，实例稍后替换”。因此实例仍为原h版，本次未改实例或存档、未进游戏验证、未修改服务端来源、未提交或部署。

后续：用户退出游戏并要求替换后，先核对无对应游戏进程，备份实例实际旧JAR（与包内旧版可能不同），只替换TrainResync，再启动验证：线轴tooltip类型及剩余长度、中英文切换、软横跨两阶段高度差HUD与原数值一致；检查日志是否有Mixin注入失败。不得将“已打包”记为“实例已安装”。
