# ST078 InvView-Forge 筛查报告

日期：2026-10-18。

## 范围与结论

3个标准报错键全部补译，涉及物品栏被占用、缺少依赖、未装备背包；inventory译为物品栏。仅核对标准语言资源，命令框架的其他硬编码输出尚未穷尽。

新增补译3键，修正已有中文0键。

## 应用明细

| 键 | 原值／英文 | 中文 |
|---|---|---|
| `inv_view_forge.command.error.inventory_in_use` | ERROR: This inventory is being used by another player! | 错误：此物品栏正在被另一名玩家使用！ |
| `inv_view_forge.command.error.dependency_not_found` | ERROR: Dependency not found! | 错误：未找到所需依赖！ |
| `inv_view_forge.command.error.player_without_backpack` | ERROR: The player does not have a currently equipped backpack! | 错误：该玩家目前未装备背包！ |

## 验证与限制

JSON解析、当前英文键对应及%s／%d参数检查通过；未进行游戏验证。标准键已逐条检查，不代表穷尽所有硬编码文本。未提交、打包或部署。
