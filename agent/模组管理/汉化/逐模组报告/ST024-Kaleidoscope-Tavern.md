# ST024 Kaleidoscope Tavern（森罗物语：酒馆）

日期：2026-10-17。包内`kaleidoscopetavern-1.2.0-forge+mc1.20.1.jar`。

## 筛查结论

286个英文／中文键已通读，中文键完整；本轮无新增、无修改。现有名称、操作说明、占位符及品质颜色代码未发现足以直接修正的明确错误。以下候选仍需上下文，不代表整模组已经游戏验收。

## 上游比对

- [main中文](https://github.com/KaleidoscopeMods/KaleidoscopeTavern/blob/c4ec1880bd44cf3139d3ba744ab30bb379cf1416/src/main/resources/assets/kaleidoscope_tavern/lang/zh_cn.json)
- [1.21.1中文](https://github.com/KaleidoscopeMods/KaleidoscopeTavern/blob/a1afba34981a00e89d57130d3dc8f1e64f1820a2/src/main/resources/assets/kaleidoscope_tavern/lang/zh_cn.json)

两者均286键，与包内逐键相同。没有穷尽未合并PR或26.1.2分支。

## 潜在问题／保留项

| 项目 | 现状 | 本轮决定 |
| --- | --- | --- |
| `tooltip.kaleidoscope_tavern.unknown_painting` | 中文仍为Unknown | 当前JAR把unknown_painting注册为独立画作，与YSBB／酒石酸菌／CR019等画作并列，不是已证实的缺省错误消息；保留。人物或作品专名的确切来源尚未确认，不声称已证实作者名。 |
| CR019、药水棒冰、酒石酸菌、摸里傻 | 人物／创作者画作名字 | 保留作者设定，不把昵称按英文直译。 |
| 小灯串（粉色） | 与沙发／高脚凳粉红色不完全一致 | 同义风格差别，未作为typo修改。 |
| 酒架“只能将酒类物品……” | 英文为drinks，模组又含水瓶／药水瓶 | 需核对酒架实际接收物品标签，不能只凭英文扩大到所有饮品。 |
| 龙头／水龙头 | 物品名与教程称呼略有差异 | 指代明确，保留。 |
| 品质／下一阶段 | 同一酿造流程中用于当前品质和下一次变化 | 未强制统一成同一词。 |
| 青提葡萄、圆周酒架、果盆 | 较特别的作者命名 | 未因个人偏好修改。 |

占位符索引、%s／%d与§格式代码检查随本轮语言静态复核进行；`%s x%d`是显示格式，不能当作缺译。没有生成翻译，因此不列10条新译示例。

未进行全类硬编码扫描／游戏内交互验证，未提交或部署。上游快照及ModBlocks／ModItems反汇编在独立工作区`lang-audit/st024-*`。
