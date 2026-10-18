# ST055 Create-Jetpack

2026-10-18；当前JAR：`create_jetpack-forge-4.3.2.jar`。新增0、修正2。

## 审校结果

36个标准键含内嵌flightlib已通读，自带中文完整。两条空tooltip在英文也为空，保留；将JUMP从固定“空格键”改“跳跃键”，避免改键后错误提示。G/H/SHIFT同样可能受改键影响，但原文也写死，需进一步核对是否有动态按键替换机制，未猜测修复。品牌、悬浮模式及气压飞行术语保留。本轮未额外查询上游；小模组按当前JAR审校。

## 本轮明细

| 键 | 原值 | 已应用 |
| --- | --- | --- |
| `item.create_jetpack.jetpack.tooltip.control1` | 按住 [空格键] | 按住 [跳跃键] |
| `item.create_jetpack.netherite_jetpack.tooltip.control1` | 按住 [空格键] | 按住 [跳跃键] |

改动JSON、键存在性及占位符检查通过（无改动项目只作资源审查）。少量或同系列内容直接列全表，不凑10个重复例子。未全类硬编码扫描、未游戏验证、打包或部署。
