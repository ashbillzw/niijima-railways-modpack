# ST057 Trading-Floor

2026-10-18；当前JAR：`trading_floor-1.1.9+forge-1.20.1.jar`。新增3、修正0。

## 审校结果

39键已通读，补齐3条缺译；两条显示源名称直接复用同文件已有长键的中文，不另起名称。保留贝索斯等进度梗和“交易站点”模组名。两个置物台共享内容条件中的“其中一个为空”究竟指过滤槽还是置物台，需代码进一步核实；未凭猜测改写。本轮未额外查询上游。

## 本轮明细

| 键 | 原值 | 已应用 |
| --- | --- | --- |
| `block.trading_floor.trading_depot.tooltip.summary` | （缺失） | 与村民交易；注意村民_只会在白天正常的工作时间内交易_。 |
| `trading_floor.display_source.trade_completed_count` | （缺失） | 已完成的交易计数 |
| `trading_floor.display_source.trade_product_sum` | （缺失） | 交易物品总数 |

改动JSON、键存在性及占位符检查通过（无改动项目只作资源审查）。少量或同系列内容直接列全表，不凑10个重复例子。未全类硬编码扫描、未游戏验证、打包或部署。
