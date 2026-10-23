# ST097 Blueprint 筛查报告

> **待办维护位置更新（2026-10-24）：** 本文的待办／下一步／候选清单保留为历史与技术依据，不再独立维护状态；有效任务统一见[总 todo](../../../todo-list.md)，炼药锅 mini todo 为例外。功能台账、测试步骤及来源证据仍在本文维护；旧“待实现／待决定”不覆盖总表及mini的最新结论。

日期：2026-10-18。

## 结论

19英文键补齐。Slabfish是赞助者帽子的专名，当前包缺少其所属生物的已确认译名，本轮保留英文专名，译出帽子、毛衣、背包、赞助等级等功能。运输船与原版名称一致。

新增19、修正0。标准语言范围与特殊资源检查完成；有硬编码者见上述待办，不能视为全量汉化。

## 应用明细

| 键 | 中文 |
|---|---|
| `blueprint.config.screen_shake_scale` | 屏幕晃动幅度 |
| `blueprint.config.max_screen_shakers` | 最大屏幕晃动源数量 |
| `blueprint.config.disable_experimental_settings_screen` | 禁用实验性设置提示界面 |
| `blueprint.config.slabfish_hat.enabled` | Slabfish帽子 |
| `blueprint.config.slabfish_hat.enabled.tooltip` | 切换Slabfish帽子的显示。二级及以上赞助者可用。 |
| `blueprint.config.slabfish_hat.sweater` | 毛衣 |
| `blueprint.config.slabfish_hat.sweater.tooltip` | 切换Slabfish帽子上的毛衣。二级及以上赞助者可用。 |
| `blueprint.config.slabfish_hat.backpack` | 背包 |
| `blueprint.config.slabfish_hat.backpack.tooltip` | 切换Slabfish帽子上的背包。三级及以上赞助者可用。 |
| `blueprint.config.slabfish_hat.type` | 类型 |
| `blueprint.config.slabfish_hat.type.tooltip` | 切换Slabfish帽子的类型。四级及以上赞助者可用。 |
| `blueprint.screen.slabfish_settings` | Slabfish帽子设置…… |
| `blueprint.screen.slabfish_settings.title` | Slabfish帽子设置 |
| `blueprint.screen.slabfish_settings.tooltip` | 设置Team Abnormals赞助者的Slabfish帽子。在%s成为赞助者。 |
| `blueprint.message.redirect` | 正在跳转 |
| `biome.blueprint.original_source_marker` | 原始来源标记 |
| `entity.blueprint.boat` | 船 |
| `entity.blueprint.chest_boat` | 运输船 |
| `entity.blueprint.falling_block` | 下落的方块 |

## 十项代表译文

- `blueprint.config.screen_shake_scale`：屏幕晃动幅度
- `blueprint.config.max_screen_shakers`：最大屏幕晃动源数量
- `blueprint.config.disable_experimental_settings_screen`：禁用实验性设置提示界面
- `blueprint.config.slabfish_hat.enabled`：Slabfish帽子
- `blueprint.config.slabfish_hat.sweater`：毛衣
- `blueprint.config.slabfish_hat.backpack`：背包
- `blueprint.config.slabfish_hat.type`：类型
- `blueprint.screen.slabfish_settings.tooltip`：设置Team Abnormals赞助者的Slabfish帽子。在%s成为赞助者。
- `blueprint.message.redirect`：正在跳转
- `entity.blueprint.chest_boat`：运输船

## 验证与限制

资源语法及当前键、格式参数检查通过（适用时）。硬编码通过类常量候选筛查，不保证穷尽；未游戏验证、提交、打包或部署。
