# ST006-Extended-Bogeys

> **待办维护位置更新（2026-10-24）：** 本文的待办／下一步／候选清单保留为历史与技术依据，不再独立维护状态；有效任务统一见[总 todo](../../../todo-list.md)，炼药锅 mini todo 为例外。功能台账、测试步骤及来源证据仍在本文维护；旧“待实现／待决定”不覆盖总表及mini的最新结论。

日期：2026-10-17。包内文件：`extendedbogeys-0.5.14-1.20.1-0.5.1.f-forge.jar`。

通读55个英文键，54键补译，品牌标题保留原名。尺寸按小型／中型／大型／特大型／巨型区分，轮式数字原样保留；Driver指驱动轮，不译成司机。Unlinked是转向架自身连接状态，不能套用列车车钩“解挂”：包内UnlinkedBogeyBlock及MixinAbstractBogeyBlock存在类型切换和独立link/unlink提示，本轮用未连接／断开连接，未夸大其所有运动行为。

## 上游与边界

[原项目官方分支](https://github.com/Rabbitminers/Extended-Bogeys/tree/6e42227f676a7cf4361faa6553162f54157ed98e)：已检查生成语言与legacy目录，分别28和25个英文键，未见简中；搜索结果有繁中PR #30，不能当作简中成果。包内0.5.14与原项目当前语言集合并不完全一致，当前实际JAR为翻译基准。后续Borked分支的完整译文检索仍待补查，不能宣称所有分支均无中文。

## 十条代表性译文

| 英文 | 中文 |
| --- | --- |
| Extra Large Unlinked Bogey | 特大型未连接转向架 |
| No other sizes | 没有其他尺寸 |
| Updated style and size | 已更新样式与尺寸 |
| This Bogey Is Already Clean! | 此转向架已清洁！ |
| Dyed Bogey  | 已为转向架染色： |
| Linked Bogey! | 已连接转向架！ |
| Rotated Bogey! | 已旋转转向架！ |
| Unlinked Bogey! | 已断开转向架连接！ |
| Pistonless 0-2-0 Driver | 无活塞0-2-0驱动轮 |
| Small 0-2-0 Trailing | 小型0-2-0从轮 |

## 全部补译

| 键 | 中文 |
| --- | --- |
| `block.extendedbogeys.extra_large_bogey` | 特大型转向架 |
| `block.extendedbogeys.extra_large_unlinked_bogey` | 特大型未连接转向架 |
| `block.extendedbogeys.huge_bogey` | 巨型转向架 |
| `block.extendedbogeys.huge_unlinked_bogey` | 巨型未连接转向架 |
| `block.extendedbogeys.large_unlinked_bogey` | 大型未连接转向架 |
| `block.extendedbogeys.medium_bogey` | 中型转向架 |
| `block.extendedbogeys.medium_unlinked_bogey` | 中型未连接转向架 |
| `block.extendedbogeys.small_unlinked_bogey` | 小型未连接转向架 |
| `extendedbogeys.bogey.style.no_other_sizes` | 没有其他尺寸 |
| `extendedbogeys.bogey.style.updated_style` | 已更新样式 |
| `extendedbogeys.bogey.style.updated_style_and_size` | 已更新样式与尺寸 |
| `extendedbogeys.bogeys.bogey` | 列车转向架 |
| `extendedbogeys.bogeys.sizes.extra_large` | 特大型 |
| `extendedbogeys.bogeys.sizes.huge` | 巨型 |
| `extendedbogeys.bogeys.sizes.large` | 大型 |
| `extendedbogeys.bogeys.sizes.medium` | 中型 |
| `extendedbogeys.bogeys.sizes.small` | 小型 |
| `extendedbogeys.bogeys.sizes.text` | 转向架尺寸： |
| `extendedbogeys.tooltips.already_cleaned` | 此转向架已清洁！ |
| `extendedbogeys.tooltips.cleaned` | 已清洁转向架！ |
| `extendedbogeys.tooltips.dyed` | 已为转向架染色： |
| `extendedbogeys.tooltips.link` | 已连接转向架！ |
| `extendedbogeys.tooltips.rotation` | 已旋转转向架！ |
| `extendedbogeys.tooltips.unlink` | 已断开转向架连接！ |
| `extendedbogeys.bogeys.styles.single_axle_trailer` | 小型0-2-0从轮 |
| `extendedbogeys.bogeys.styles.single_axle_standard` | 小型0-2-0标准 |
| `extendedbogeys.bogeys.styles.single_axle_long` | 长型0-2-0驱动轮 |
| `extendedbogeys.bogeys.styles.single_axle_pistonless` | 无活塞0-2-0驱动轮 |
| `extendedbogeys.bogeys.styles.double_axle_scotch_yoke` | 特大型0-4-0标准 |
| `extendedbogeys.bogeys.styles.double_axle_long` | 长型0-4-0驱动轮 |
| `extendedbogeys.bogeys.styles.double_axle_extra_long` | 超长型0-4-0驱动轮 |
| `extendedbogeys.bogeys.styles.double_axle_short` | 短型0-4-0驱动轮 |
| `extendedbogeys.bogeys.styles.double_axle_pistonless` | 无活塞0-4-0驱动轮 |
| `extendedbogeys.bogeys.styles.double_axle_trailer` | 小型0-4-0从轮 |
| `extendedbogeys.bogeys.styles.triple_axle` | 小型三轴 |
| `extendedbogeys.bogeys.styles.triple_axle_scotch_yoke` | 特大型0-6-0标准 |
| `extendedbogeys.bogeys.styles.triple_axle_long` | 长型0-6-0驱动轮 |
| `extendedbogeys.bogeys.styles.triple_axle_short` | 短型0-6-0驱动轮 |
| `extendedbogeys.bogeys.styles.triple_axle_pistonless` | 无活塞0-6-0驱动轮 |
| `extendedbogeys.bogeys.styles.triple_extended_axle_long` | 长型加长0-6-0驱动轮 |
| `extendedbogeys.bogeys.styles.triple_extended_axle_short` | 短型加长0-6-0驱动轮 |
| `extendedbogeys.bogeys.styles.triple_extended_axle_pistonless` | 无活塞加长0-6-0驱动轮 |
| `extendedbogeys.bogeys.styles.triple_axle_trailer` | 小型0-6-0从轮 |
| `extendedbogeys.bogeys.styles.quadruple_axle` | 小型四轴 |
| `extendedbogeys.bogeys.styles.quadruple_axle_scotch_yoke` | 特大型0-8-0标准 |
| `extendedbogeys.bogeys.styles.quadruple_axle_long` | 长型0-8-0驱动轮 |
| `extendedbogeys.bogeys.styles.quadruple_axle_short` | 短型0-8-0驱动轮 |
| `extendedbogeys.bogeys.styles.quadruple_axle_pistonless` | 无活塞0-8-0驱动轮 |
| `extendedbogeys.bogeys.styles.quintuple_axle` | 小型五轴 |
| `extendedbogeys.bogeys.styles.quintuple_axle_long` | 长型0-10-0驱动轮 |
| `extendedbogeys.bogeys.styles.quintuple_axle_short` | 短型0-10-0驱动轮 |
| `extendedbogeys.bogeys.styles.quintuple_axle_pistonless` | 无活塞0-10-0驱动轮 |
| `extendedbogeys.bogeys.styles.sextuple_axle_long` | 长型0-12-0驱动轮 |
| `extendedbogeys.bogeys.styles.sextuple_axle_short` | 短型0-12-0驱动轮 |

验证：JSON解析、键集合、占位符通过。未游戏验证；未完成全类硬编码扫描。未升级模组、未构建或部署。后续上游复查与界面验证仍列为待办。
