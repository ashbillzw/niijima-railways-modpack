# ST029 Carry-On

日期：2026-10-17。包内版本：`carryon-forge-1.20.1-2.1.2.7.jar`。

当前12条英文已全部补齐。采用官方1.21.1的12条中文，当前1.20分支无中文文件；键集合完全匹配。抱起／搬运分别用于动作和快捷键分类；模型覆盖、黑白名单保持上游表达。该模组没有既有中文需修改。

来源：[官方1.21.1中文](https://github.com/Tschipp/CarryOn/blob/9f1cf66c8fe4c4192f62b0b15da30b5f6e845f9a/Common/src/main/resources/assets/carryon/lang/zh_cn.json)。1.20核查提交41af4218d3d1ad86f9e9e1d3491529e205cbfcb3。沿用项目LGPL-3.0来源，不改模组程序。未穷尽翻译PR或硬编码配置注释。

## 应用明细

| 键 | 原中文／英文 | 已应用 |
| --- | --- | --- |
| `carryon.category.settings` | Settings | 设置 |
| `carryon.category.blacklist` | Blacklist | 黑名单 |
| `carryon.category.modeloverrides` | Model Overrides (Advanced) | 模型覆盖（高级设置） |
| `carryon.category.custompickupconditions` | Custom Pickup Conditions (Advanced) | 自定义抱起条件（高级设置） |
| `carryon.category.whitelist` | Whitelist | 白名单 |
| `carryon.general.modeloverrides.modeloverrides` | Model Overrides | 模型覆盖 |
| `carryon.general.blacklist.forbiddenentities` | Entities that the Player cannot pick up | 玩家不能抱起的实体 |
| `carryon.general.blacklist.forbiddentiles` | Blocks that the Player cannot pick up | 玩家不能抱起的方块 |
| `carryon.category.custompickupconditions.custompickupconditionsblocks` | Custom Block Pickup Conditions | 自定义抱起方块条件 |
| `carryon.category.custompickupconditions.custompickupconditionsentities` | Custom Entity Pickup Conditions | 自定义抱起实体条件 |
| `key.carry.desc` | Carry | 抱起 |
| `key.carry.category` | Carry On | 搬运 |

所有修改已列出；Carry On仅配置分类／按键等12条，不为凑10个不同类型而杜撰例子。JSON、键覆盖和按参数编号比对通过。字节码证据在本机lang-audit，未游戏内验证，未复制运行实例、未打包、未提交或部署。未全类扫描硬编码。
