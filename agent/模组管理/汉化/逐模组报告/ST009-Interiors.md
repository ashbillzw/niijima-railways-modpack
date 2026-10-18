# ST009-Interiors

日期：2026-10-17。包内文件：`interiors-0.5.6+forge-mc1.20.1-build.104.jar`。

英文47键，包内原中文0键；本轮新增47键。全部英文语言条目通读并比对上游中文，未进行全类硬编码扫描，未游戏验证。

## 上游与适配

[采用的官方中文来源](https://github.com/aesefficio/CreateInteriorsMod/blob/1df2d53ec052f18ca86c05ddba1ceee62710f8a6/src/main/resources/assets/interiors/lang/zh_cn.json)。取得文件后对照本包英文；GitHub API遭公共限流后改用git ls-remote核对分支提交与raw文件。分支快照已取得，中文PR合并状态尚未完成核实，不宣称没有其他译文。

适配上游65键中文到本包47键；不引入新版软垫等不存在的键。座椅／坐地椅／海带坐垫保留形制区分；靠背Size明确为大小，不笼统称样式；删除上游摘要额外添加的五颜六色宣传句，保留原英文动态结构和家具强调。采用上游中文品牌“机械动力：内饰”，非自行杜撰。

## 十条代表性译文

| 英文 | 已应用中文 |
| --- | --- |
| Black Chair | 黑色座椅 |
| Kelp Floor Chair | 海带坐地椅 |
| Kelp Seat | 海带坐垫 |
| Seatwood Planks | 座椅木板 |
| Wall Mounted Table | 壁挂桌 |
| Sits the player on the _Chair_. Press L-shift to leave the _Chair_. | 玩家将坐到_座椅_上。按下潜行键以离开_座椅_。 |
| Toggles individual _Chair_ armrests. | 切换_座椅_各侧扶手的显示状态。 |
| Toggles _Chair_ back size. | 调整_座椅_靠背的大小。 |
| When Sneak R-Clicked with Wrench | 手持扳手潜行时右击 |
| Sit yourself down and enjoy the ride! Will anchor a player onto a _contraption_. An appealing option for _furniture_ too! | 坐下来享受旅程吧！座椅能将玩家固定在_动态结构_上，也很适合用作_家具_。 |

## 全部补译

| 键 | 英文 | 中文 |
| --- | --- | --- |
| `block.interiors.black_chair` | Black Chair | 黑色座椅 |
| `block.interiors.black_floor_chair` | Black Floor Chair | 黑色坐地椅 |
| `block.interiors.blue_chair` | Blue Chair | 蓝色座椅 |
| `block.interiors.blue_floor_chair` | Blue Floor Chair | 蓝色坐地椅 |
| `block.interiors.brown_chair` | Brown Chair | 棕色座椅 |
| `block.interiors.brown_floor_chair` | Brown Floor Chair | 棕色坐地椅 |
| `block.interiors.chair.tooltip` | CHAIR | 座椅 |
| `block.interiors.chair.tooltip.behaviour1` | Sits the player on the _Chair_. Press L-shift to leave the _Chair_. | 玩家将坐到_座椅_上。按下潜行键以离开_座椅_。 |
| `block.interiors.chair.tooltip.behaviour2` | Toggles individual _Chair_ armrests. | 切换_座椅_各侧扶手的显示状态。 |
| `block.interiors.chair.tooltip.behaviour3` | Toggles _Chair_ back size. | 调整_座椅_靠背的大小。 |
| `block.interiors.chair.tooltip.condition1` | When R-Clicked | 右击时 |
| `block.interiors.chair.tooltip.condition2` | When R-Clicked with Wrench | 手持扳手时右击 |
| `block.interiors.chair.tooltip.condition3` | When Sneak R-Clicked with Wrench | 手持扳手潜行时右击 |
| `block.interiors.chair.tooltip.summary` | Sit yourself down and enjoy the ride! Will anchor a player onto a _contraption_. An appealing option for _furniture_ too! | 坐下来享受旅程吧！座椅能将玩家固定在_动态结构_上，也很适合用作_家具_。 |
| `block.interiors.cyan_chair` | Cyan Chair | 青色座椅 |
| `block.interiors.cyan_floor_chair` | Cyan Floor Chair | 青色坐地椅 |
| `block.interiors.gray_chair` | Gray Chair | 灰色座椅 |
| `block.interiors.gray_floor_chair` | Gray Floor Chair | 灰色坐地椅 |
| `block.interiors.green_chair` | Green Chair | 绿色座椅 |
| `block.interiors.green_floor_chair` | Green Floor Chair | 绿色坐地椅 |
| `block.interiors.kelp_chair` | Kelp Chair | 海带座椅 |
| `block.interiors.kelp_floor_chair` | Kelp Floor Chair | 海带坐地椅 |
| `block.interiors.kelp_seat` | Kelp Seat | 海带坐垫 |
| `block.interiors.light_blue_chair` | Light Blue Chair | 淡蓝色座椅 |
| `block.interiors.light_blue_floor_chair` | Light Blue Floor Chair | 淡蓝色坐地椅 |
| `block.interiors.light_gray_chair` | Light Gray Chair | 淡灰色座椅 |
| `block.interiors.light_gray_floor_chair` | Light Gray Floor Chair | 淡灰色坐地椅 |
| `block.interiors.lime_chair` | Lime Chair | 黄绿色座椅 |
| `block.interiors.lime_floor_chair` | Lime Floor Chair | 黄绿色坐地椅 |
| `block.interiors.magenta_chair` | Magenta Chair | 品红色座椅 |
| `block.interiors.magenta_floor_chair` | Magenta Floor Chair | 品红色坐地椅 |
| `block.interiors.orange_chair` | Orange Chair | 橙色座椅 |
| `block.interiors.orange_floor_chair` | Orange Floor Chair | 橙色坐地椅 |
| `block.interiors.pink_chair` | Pink Chair | 粉红色座椅 |
| `block.interiors.pink_floor_chair` | Pink Floor Chair | 粉红色坐地椅 |
| `block.interiors.purple_chair` | Purple Chair | 紫色座椅 |
| `block.interiors.purple_floor_chair` | Purple Floor Chair | 紫色坐地椅 |
| `block.interiors.red_chair` | Red Chair | 红色座椅 |
| `block.interiors.red_floor_chair` | Red Floor Chair | 红色坐地椅 |
| `block.interiors.seatwood_planks` | Seatwood Planks | 座椅木板 |
| `block.interiors.wall_mounted_table` | Wall Mounted Table | 壁挂桌 |
| `block.interiors.white_chair` | White Chair | 白色座椅 |
| `block.interiors.white_floor_chair` | White Floor Chair | 白色坐地椅 |
| `block.interiors.yellow_chair` | Yellow Chair | 黄色座椅 |
| `block.interiors.yellow_floor_chair` | Yellow Floor Chair | 黄色坐地椅 |
| `entity.interiors.big_seat` | Big Seat | 大型座椅 |
| `itemGroup.interiors` | Create: Interiors | 机械动力：内饰 |

验证：JSON解析、键限定在本包英文、格式占位符与成对强调标记检查通过。未升级模组，未构建／部署；游戏中菜单换行、物品提示及实际交互仍待验证。
