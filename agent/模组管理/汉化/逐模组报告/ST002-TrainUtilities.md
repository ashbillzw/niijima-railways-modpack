# ST002 Create: TrainUtilities：补译与筛查

日期：2026-10-17。版本：`trainutilities-forge-3.0.0.jar`；原编号103。**本轮完成并停止，不继续ST003。**

## 这是哪个模组

它是机械动力的车门与站台建筑附属模组，作者 ProgrammerLP。包内版本包含多种现实铁路款式车门、可选开关门音效、德／荷／瑞式站台方块、车体条纹方块、隔音墙和无框玻璃，以及用于制作车门的零件和半成品。门的提示说明可用于列车或电梯；主手空手按住Shift右击可打开音效选择界面。功能描述依据本地JAR的`META-INF/mods.toml`、语言资源及界面代码，不以最新版介绍代替本包功能。

## 结果与交付

- 通读英文资源 **271键**；上游没有`zh_cn.json`，包内现有语言覆盖也未发现TrainUtilities译文，所以没有可审查的旧中文，不把“0条旧译”描述成质量审查合格。
- 新增 **274个中文覆盖键**：原资源中270键＋代码实际调用但英文资源遗漏的4键。创造模式主标签`Create: TrainUtilities`保留品牌原名，使用英文回退，不添加同值覆盖。
- 原有译文修正0；只增加语言资源，不改JAR、物品ID、配方、索引或功能代码。
- [语言覆盖](../../../../pack/overrides/kubejs/assets/trainutilities/lang/zh_cn.json)；[全部274条对照](ST002-TrainUtilities-补译明细.md)。
- 静态检查通过；未安装进测试实例、未进游戏，显示宽度和操作效果待验收。本轮未提交。

## 代表性翻译

| 原文 | 本轮译文 | 采用依据 |
| --- | --- | --- |
| Frameless Glass Pane | 无框玻璃板 | 沿用原版玻璃板与Create玻璃类命名结构 |
| Noise Isolation Wall | 隔音墙 | 简洁功能名 |
| German Platform Block | 德式站台方块 | 与荷式、瑞士式站台保持同一结构 |
| Andesite Alloy Door (Window) | 带窗安山合金门 | 材料名加功能修饰，不扩写成长句 |
| Speaker Membrane | 扬声器振膜 | 零件名称 |
| Incomplete Processing Unit | 处理单元（半成品） | 对齐Create“精密构件（半成品）” |
| London Overground door opens | 伦敦地上铁车门开启 | 声音字幕采用“对象＋动作” |
| A first Draft! | 初稿出炉！ | 保留进度标题的轻松语气 |
| It squeaks and jams. | 它吱呀作响，还总是卡住。 | 保留原型门说明的幽默表达 |
| Opens a menu to _change_ the _door sound_. | 打开菜单以_更改_门的_音效_。 | 保留Create强调标记与操作意图 |

车型／运营商代号DB、IC(E)、PKP Intercity、Desiro、Stadler Flirt、CIS Amendorf、MÁV、ÖBB Railjet、Talent等保留原名；没有为陌生车型自行编造中文名。地名采用纽约、伦敦、华沙、科隆等常用译名。`Line Block`按车体条纹装饰译为“条纹方块”，不与导航模组的线路概念混用。上／下、左／右保留原文方向，不擅自解释为车厢上下层。

## 发现的上游问题与处理

| ID | 问题 | 证据与本轮处理 |
| --- | --- | --- |
| E-ST002-01 | 四个音效提示键缺失 | `ToolTipUtils`调用`gui.trainutilities.tooltip.class_350_sound`、`class_390_sound`、`class_450_sound`、`1996_stock_sound`；英文资源只提供无`_sound`后缀的对应键。新增四个实际调用键，与原键使用同一中文；保留原键供兼容，不改代码。 |
| E-ST002-02 | 键名拼写错误 | `gui.trainutilities.tooltip.london_1973_stock_soud`中的`soud`被代码实际引用；`advancement.trainutilities.door_ingrediants`也属资源标识。保留键名，不误改为`sound`或`ingredients`造成失效。 |
| E-ST002-03 | 英文值笔误与多余空格 | 包括`London oveground`、`subway/tram subway door closes`重复词、绿色下条纹方块名开头多余空格。中文按明确语义翻译，不照搬错误；未修改英文上游文件。 |

## 术语偏好与后续选择

这些是本轮译法及可讨论处，不自动登记为用户已确认的长期偏好：

- **P-ST002-01**：保留车型／运营商代号，中文化门、材质、颜色、方向和用途。用户若希望使用更详细的中文车型名，可逐组确认，避免随意音译。
- **P-ST002-02**：创造标签保留`Create: TrainUtilities`，门标签为`Create: TrainUtilities - 门`。若要给模组统一中文标题，可讨论“机械动力：列车实用设施”等名称；当前没有自行采用中文模组名。
- **C-ST002-01**：`Sliding Door Prototype`目前为“滑动门原型”；可按整包习惯改为“移门原型”，属于命名风格选择。未把“移门”强加为长期术语。
- **C-ST002-02**：`CIS Amendorf`、`Budapest block`保留型号／地点信息，没有额外猜测车系；物品外观匹配及上／下门的实际布置仍待游戏验收。

## 检查方法、证据与限制

1. 本地JAR SHA-1实测为`9bf401a501d7ce699576cf91f45c509cc5f9f5ca`，与初扫基线一致；直接读取JAR的英文JSON，与初扫导出逐键一致。
2. 检查上游五种语言资源列表（英语、德语、捷克语、西班牙语、俄语），没有简体中文；读取原版与Create既有中文，参考“去皮云杉原木”“边框玻璃”“精密构件（半成品）”等命名。
3. 对本模组`net.adeptstack`下全部46个类导出`javap -p -c -constants`，筛查静态语言键与字符串；重点核对音效菜单、站台菜单和ToolTipUtils。JAR另有一个Architectury生成的桥接类，不计为模组界面类。此为字节码定向文本审查，不等于完整运行覆盖或对所有动态生成文本的证明。
4. `sounds.json`全部字幕键均有英文基线，新增中文覆盖所有这些字幕；四个语言资源外的静态界面键已补齐。主品牌名以外，没有遗漏本轮发现的标准显示键。
5. JSON解析、键集合、非空值、占位符、Create强调下划线数量检查通过；四个兼容键与对应原键译文一致。重复门说明使用相同中文模板，避免同组措辞漂移。
6. A–F等站台符号、纹理资源名、注册ID、NBT键和模组元数据不当作普通缺译。未修改贴图内文字；字符是否过长、选择菜单与声音字幕是否正确生效需游戏验证。
7. 尝试读取JAR所指的GitHub项目页时返回缓存读取失败，因此本轮功能结论以本地资源和代码为依据，没有把未取得的网页内容用作证据。

仓库外证据：`C:/mydata/Agents/Codex-CreateTrainResync/lang-audit/st002-*`，包括英文271键、46类字节码、译文草稿和生成验证脚本。可交接的译文及发现已完整写入本报告与补译明细。
