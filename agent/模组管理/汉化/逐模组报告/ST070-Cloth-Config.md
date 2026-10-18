# ST070 Cloth-Config 筛查报告

日期：2026-10-18。

英文49、中文48键全量初筛。新增禁用原因1键；修正4个旧值：保存并退出按钮明确保存行为，红绿蓝通道不再保留英文颜色。Alpha、Cloth品牌、快捷键、开发演示中的格式参数保留。官方元数据链接architectury/ClothConfig查询未及时返回，已停止，不声称上游无译文；本轮以当前JAR对照为准。

## 应用明细

| 键 | 英文 | 中文 |
|---|---|---|
| `text.cloth-config.disabled_tooltip` | Disabled (requirements not met) | 已禁用（未满足条件） |
| `text.cloth-config.save_and_done` | Save & Quit | 保存并退出 |
| `text.cloth-config.error.color.invalid_red` | Not a valid value! (Red) | 不是有效值！（红色通道） |
| `text.cloth-config.error.color.invalid_green` | Not a valid value! (Green) | 不是有效值！（绿色通道） |
| `text.cloth-config.error.color.invalid_blue` | Not a valid value! (Blue) | 不是有效值！（蓝色通道） |

## 验证与剩余事项

当前键集合、JSON和占位符检查通过。标准语言全量初筛；未穷尽硬编码，未游戏验证、打包、提交或部署。保留作者现有口吻，不顺带重写其他模组配置。
