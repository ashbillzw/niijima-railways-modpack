# ST099 Architectury：筛查报告

> 2026-10-16 编号迁移：原 005 → ST099。正文历史三位编号与问题 ID 保留原义；当前队列以进度表为准。

日期：2026-10-16。状态：**静态筛查完成，未发现需要本轮补译的普通玩家文本；未修改任何语言或代码。**

## 范围与证据

- 文件：`architectury-9.2.14-forge.jar`，SHA-1 `a52918a500ff421180a1cbd1a0cabee712134ec4`，本轮重新核对本机缓存。
- 无标准 en_us／zh_cn 语言文件，无已有中文可做错字检查。资源主要为 Mixin 配置、refmap、模组元数据及群系修改器数据；未发现书本语言资源。
- 对全部 382 个 class 生成 `javap -p -c -constants` 输出，筛查字符串、文本组件和发送提示相关调用，并针对命中处检查上下文。这是有针对性的静态审计，不是逐条指令人工证明或完整运行验证。
- 库提供流体、物品、事件、网络及注册接口。发现的文本翻译调用例如 Fluid.getName() 使用调用方提供的 getTranslationKey() 构造组件；翻译责任属于具体内容模组，不应在此添加虚构的 Architectury 物品译名。

## 英文字符串分类

| 类别 | 示例 | 处理结论 |
| --- | --- | --- |
| Mod 列表简介 | `A intermediary api aimed to ease developing multiplatform mods.` | 元数据英文简介，不是普通语言键；本轮保留。 |
| 开发／异常诊断 | `Unable to send packet to a 'null' player!`、`Registry not yet initialized!`、`Cannot register a deferred register twice!` | 参数或调用时序诊断，不是正常玩法界面；异常发生时可能出现在日志／错误信息中，不宣称永不可见。不直接修改库来汉化诊断。 |
| 日志 | `Error while dispensing spawn egg from dispenser at {}`、`Registering S2C receiver with id {}` | 技术日志模板，保留排错标识与格式参数。 |
| API 传入的译名 | 流体的 getTranslationKey() → 文本组件 | 由调用模组提供，不算本库缺键。 |
| 注册与协议标识 | `architectury:network`、`architectury:sync_ids` 等 | 不应翻译。 |

## 结论与交接

本轮没有发现类似 AppleSkin F3 行那样明确的常用界面硬编码英文，也没有既有中文可纠错。建议保持此版本原样，可按简单功能／前置库规则询问用户是否继续 006 Atmospheric；得到确认前不继续。

补译 0，旧译修正 0，游戏验证未进行。证据：`C:/mydata/Agents/Codex-CreateTrainResync/lang-audit/005-classnames.txt`、`005-javap.txt`。结论仅适用于当前版本与已检查范围，不推广为所有前置库都没有玩家文本。
