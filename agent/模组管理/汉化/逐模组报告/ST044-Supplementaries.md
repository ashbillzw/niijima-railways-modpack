# ST044 Supplementaries 锦致装饰

2026-10-17。包内1.20-3.1.18，555键（554中文）。全表文本初筛，本轮新增1、修正3。仅4条变动，全部列出。

## 上游参考

[master中文](https://github.com/MehVahdJukaar/Supplementaries/blob/f6207dba410bf4a5774cbb2cdd97e66b9e9b6daf/common/src/main/resources/assets/supplementaries/lang/zh_cn.json)607条，[1.21.1中文](https://github.com/MehVahdJukaar/Supplementaries/blob/a5dd253c8ee3bfc3357a3566e84e175d982c037f/common/src/main/resources/assets/supplementaries/lang/zh_cn.json)1381条。沿用上游补齐大炮提示、把黑板状态明确为已涂蜡。新版笼子捕获条件和百分号改变不直接移植；当前英文仍含%s%且机制可能不同。未穷尽PR。

## 审查结论与保留

作者保留的“经尽人亡”“近前看其”和进度梗不修成普通书面语。歌曲/作者名称、0占位项和格式模板保留。画名Bombs补为炸弹；registry表示注册表，不是其中的注册项。

玻璃罐tooltip英文单位mBtl、中文瓶存在疑点。当前JarItem字节码直接传入SoftFluidStack.getCount()，未在此处乘除；不能据m前缀就认定1000倍误差，保留待Moonlight底层单位验证。负重等级说明“等级越高…”与英文分别影响跳跃/走速需机制核实，暂不改。大炮操控英文两个%2$s而中文%1$s/%2$s，中文能区分两按键，不照抄英文格式错误。未声称以上疑点已解决。

## 全部变动

| 键 | 原中文或英文 | 本轮中文 |
| --- | --- | --- |
| `message.supplementaries.cannon` | Can shoot anything | 可以发射任何事物 |
| `message.supplementaries.blackboard` | 涂蜡 | 已涂蜡 |
| `painting.supplementaries.bombs.title` | Bombs | 炸弹 |
| `commands.supplementaries.registry.error.unknown_registry` | 未知注册项“%s” | 未知注册表“%s” |

JSON、键归属、变动占位符检查通过。未全类硬编码扫描、游戏验证、打包、提交、部署。
