# ST073 Entity-Culling 筛查报告

日期：2026-10-18。

## 范围与来源

官方tr7zw/EntityCulling main 89bdc1d72ade32cab1452c19c9fb6ded9e03fe69，src/main/resources/assets/entityculling/lang/zh_cn.json为27键。37英文／27中文全量对照。共享Trender 9键复用ST071、品牌保留，无本体缺键。修正3处：剔除包围盒、跳过Tick剔除的标题及原本含义相反的帮助。白名单里的实体应继续更新，而非不参与更新。未改变实际剔除配置。

## 应用明细

| 键 | 原值／英文 | 中文 |
|---|---|---|
| `key.entityculling.toggleBoxes` | 显示筛选框 | 显示剔除包围盒 |
| `text.entityculling.tab.tick_culling` | 跳过被剔除的 Tick 更新 | 跳过 Tick 剔除 |
| `text.entityculling.tab.tick_culling.tooltip` | 此选项卡内的实体不参与 Tick 更新。这适用于需要刻更新来实现某些功能的实体，例如实体船。 | 此选项卡中选中的实体即使被剔除，也不会跳过其 Tick 更新。这适用于船等依赖持续更新来正常工作的实体。 |

## 验证

JSON、当前版本键与占位符检查通过。上游取最新主分支中文，未穷尽其他分支和历史PR。仅语言修改；未穷尽硬编码，未游戏验证、打包、提交或部署。
