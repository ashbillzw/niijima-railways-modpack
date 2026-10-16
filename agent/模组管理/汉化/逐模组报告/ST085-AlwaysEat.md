# ST085 AlwaysEat：筛查报告

> 2026-10-16 编号迁移：原 002 → ST085。正文历史三位编号与问题 ID 保留原义；当前队列以进度表为准。

日期：2026-10-16。状态：**静态筛查完成；没有生成翻译，没有修改此模组或其配置。**

## 范围与结论

- 文件 `AlwaysEat-5.2.jar`，mod ID `salwayseat`，SHA-1 `250cafb62c3f73cce919a56899ebd94424036735`。读取本机已核对索引的缓存。
- 没有标准 en_us／zh_cn 语言文件，没有物品、方块或书本资源。原进度表“0 键”属实，但不代表没有可读英文。
- 用 `javap -p -c -constants` 检查全部 5 个 class：AlwaysEat、Config、Config$Mode、ServerEvents、SyncSettings。代码主要处理满饱食度进食、黑白名单及服务端配置同步；未发现自建界面、物品注册、聊天文本组件构造或提示发送调用。
- 找到 **6 条不同的英文配置注释（7 次使用）**，以及 Mod 元数据中的 **1 条英文简介**。无已有中文可做错字／译名一致性检查。
- 这是字节码与资源静态检查，不是游戏验证；通过 Configured 等工具展示的实际配置界面仍需单独核对。

## 可读英文与处理建议

| 位置 | 当前英文 | 性质与建议 |
| --- | --- | --- |
| Config：分类注释 | `Eatable settings` | 配置说明，表示进食设置。未生成可直接覆盖的翻译键。 |
| Config：两处列表注释 | `List of items` | 重复使用的配置说明；不是两个独立语言键。 |
| Config：item_list 说明 | `Depending on the mode only these items will be made eatable (WHITELIST) or these items will keep their vanilla behaviour (BLACKLIST)` | 说明白名单允许列表内食物在饱食时食用，黑名单使列表内食物保持原本行为。不能误解为黑名单中的物品一律禁食。 |
| Config：规则回退说明 | `If an item is not affected according to the rules above they will keep their vanilla behaviour` | 不受规则影响的物品保留原行为。英文略生硬，但没有发现现有中文误译，因为没有中文。 |
| Config：uneatable_list 说明 | `These items will be made uneatable while full (Overrides vanilla behaviour)` | 明确限定“饱食时”不能吃；不能翻成无条件禁止食用。此列表在字节码逻辑中优先检查。 |
| Config：模式说明 | `Mode as explained in other settings` | 指向上面的黑白名单说明；管理员配置文本。 |
| META-INF/mods.toml：description | `Makes all food eatable even when you are full` | Mod 列表英文简介，概括主要功能但没有列出配置例外；不属于普通语言文件。 |

## 不应直接翻译的标识

`eatable`、`item_list`、`uneatable_list`、`mode` 是配置路径；`BLACKLIST`、`WHITELIST` 是枚举值。不能把 TOML 键或持久化枚举值改为中文来实现汉化，否则会改变配置读取语义。AlwaysEat 为项目名，可保留。

字节码中还有编译器生成的 `Invalid lambda deserialization` 异常字符串，不是通常面对玩家的界面文案，不列入补译。

## 是否需要现在补译

建议此项暂不生成语言资源：没有缺失的普通玩家物品／界面语言键。若以后希望汉化管理配置界面，应先核对包内 Configured 对这些 ForgeConfigSpec 字段、注释与枚举的实际显示和翻译查找机制，再决定覆盖方式。只新增猜测的 zh_cn 键并不能保证生效；不为这几个注释直接改 JAR。

本轮没有新增偏好问题，也没有认定“所有无标准语言文件的模组都无需汉化”。这一结论仅针对当前 AlwaysEat 5.2 的已检查实现。

## 交接与停靠点

- 资源清点、全部 5 个类反汇编和字符串／调用核对完成；未启动游戏。
- 本轮补译 0，旧译修正 0；普通文本审查完成，配置界面汉化仍为可选后续项。
- 原始证据：`C:/mydata/Agents/Codex-CreateTrainResync/lang-audit/002-classnames.txt`、`002-javap.txt`。核心发现和原文已保存在本报告。
- 当前停在 002；003 Amendments 尚未开始。
