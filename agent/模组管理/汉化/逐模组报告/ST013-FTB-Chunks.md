# ST013 FTB Chunks

日期：2026-10-17。包内文件：`ftb-chunks-forge-2001.3.8.jar`。

英文282键、原中文268键；本轮新增14键、修正已有9键。全部标准语言条目初筛，未做全类硬编码审计或游戏验证。

## 上游复查

- [官方1.20.1固定提交](https://github.com/FTBTeam/FTB-Chunks/tree/9103b7a5d4ee48d43d20fdac14109c7f982df25a)；检查`common/src/main/resources/assets/ftbchunks/lang/`中的英文与中文。
- [官方1.21.1固定提交](https://github.com/FTBTeam/FTB-Chunks/tree/a90e58e431879f5213629373ea9cde7001ebef45)；检查`common/src/main/resources/assets/ftbchunks/lang/`中的英文与中文。

针对三仓库的中文翻译PR进行了公开搜索，结果未能可靠定位具体中文PR；不能据此认定不存在，完整PR状态检查仍待补。

当前分支中文与包内一致；1.21.1中文仅43键，不能覆盖替换当前268键。新增14个队伍默认属性沿用对应已有设置的术语。修正缩小／缩放方向、白名单同时受黑名单约束、全员离线触发条件、活塞保护针对领地而非方块本身、尚未实现状态及网络开销遗漏。

潜在问题保留：百分号转义（英文10%%与中文10%）需沿实际提示框调用验证，未机械替换；长期“占领／领地”术语保留，不把本次补缺扩大为全模组风格重写。

## 十条代表性实际改动

| 英文 | 已应用 |
| --- | --- |
| Team Property Defaults | 队伍属性默认值 |
| Allow Fake Players by ID | 按玩家ID允许假玩家 |
| Allow PvP Combat | 允许PvP战斗 |
| Non-living Entity Attack Mode | 非生物实体攻击模式 |
| Claim Visibility | 领地可见性 |
| Max zoom-out limited due to memory constraints | 受内存限制，地图无法继续缩小 |
| Whitelist for dimension ID's where chunks may be claimed. If non-empty, dimension *must* be in this list (and also not in "Dimension Blacklist".<br>Same syntax as for "Dimension Blacklist" | 允许占领的维度ID白名单。列表非空时，维度必须在此列表中，且不在“禁止占领的维度”列表中，才可占领。<br>语法同“禁止占领的维度”。 |
| If no team member logs in for this many days, the team's claims will be released.<br>Setting this to 0 disables auto-unclaiming. | 若连续此天数没有任何队伍成员登录，队伍领地将被释放。<br>设为0可禁用自动取消占领。 |
| If true, pistons may not push/pull blocks across claims owned by different teams (unless the block is entering/leaving a claim with block edit mode set to Public)<br>If 'disable_protection' is set to true, this setting is ignored. | 启用时，活塞不能跨不同队伍的领地推拉方块，除非方块进入或离开的领地已将方块编辑模式设为公开。<br>启用“禁用领地保护”后，此设置被忽略。 |
| Age in days to keep logs of prevented fake player access<br>Note: not fully implemented feature; will be used in future to display & control access by fake players to your claims | 保留假玩家访问拦截日志的天数。<br>此功能尚未完整实现，未来将用于显示和控制假玩家对领地的访问。 |

## 完整改动

| 键 | 原中文 | 已应用 |
| --- | --- | --- |
| `ftbchunks.team_prop_defaults` | （缺失） | 队伍属性默认值 |
| `ftbchunks.team_prop_defaults.def_fake_players` | （缺失） | 允许所有假玩家 |
| `ftbchunks.team_prop_defaults.def_fake_player_ids` | （缺失） | 按玩家ID允许假玩家 |
| `ftbchunks.team_prop_defaults.def_named_fake_players` | （缺失） | 指定假玩家名称 |
| `ftbchunks.team_prop_defaults.def_allow_explosions` | （缺失） | 允许爆炸破坏 |
| `ftbchunks.team_prop_defaults.def_pvp` | （缺失） | 允许PvP战斗 |
| `ftbchunks.team_prop_defaults.def_mob_griefing` | （缺失） | 允许怪物破坏行为 |
| `ftbchunks.team_prop_defaults.def_block_edit_interact` | （缺失） | 方块编辑/交互模式 |
| `ftbchunks.team_prop_defaults.def_block_edit` | （缺失） | 方块编辑模式 |
| `ftbchunks.team_prop_defaults.def_block_interact` | （缺失） | 方块交互模式 |
| `ftbchunks.team_prop_defaults.def_entity_interact` | （缺失） | 实体交互模式 |
| `ftbchunks.team_prop_defaults.def_entity_attack` | （缺失） | 非生物实体攻击模式 |
| `ftbchunks.team_prop_defaults.def_player_visibility` | （缺失） | 位置可见性 |
| `ftbchunks.team_prop_defaults.def_claim_visibility` | （缺失） | 领地可见性 |
| `ftbchunks.zoom_warning` | 由于内存限制，最大缩放受限 | 受内存限制，地图无法继续缩小 |
| `ftbchunks.advanced.memory.max_zoom_constraint` | 限制地图最大缩放 | 限制地图缩小范围 |
| `ftbchunks.advanced.memory.max_zoom_constraint.tooltip` | 若启用，地图最大缩放将根据已探索区域和可用内存自动限制<br>若造成困扰，可设为关闭 | 启用时，根据已探索区域数和可用内存限制地图缩小范围。<br>如有不便，可关闭此项。 |
| `ftbchunks.claim_dimension_whitelist.tooltip` | 允许占领的维度ID列表（若不为空，则仅列表内维度可占领）<br>语法同“禁止占领的维度” | 允许占领的维度ID白名单。列表非空时，维度必须在此列表中，且不在“禁止占领的维度”列表中，才可占领。<br>语法同“禁止占领的维度”。 |
| `ftbchunks.max_idle_days_before_unclaim.tooltip` | 若队伍成员超过此天数未登录，领地自动释放<br>设为 0 禁用 | 若连续此天数没有任何队伍成员登录，队伍领地将被释放。<br>设为0可禁用自动取消占领。 |
| `ftbchunks.max_idle_days_before_unforce.tooltip` | 若队伍成员超过此天数未登录，强制加载的区块自动释放<br>设为 0 禁用 | 若连续此天数没有任何队伍成员登录，将取消所有区块的强制加载。<br>设为0可禁用自动取消强制加载。 |
| `ftbchunks.piston_protection.tooltip` | 若开启，活塞无法跨不同队伍的领地推拉方块（除非目标方块为公开编辑模式）<br>若“禁用领地保护”开启，此设置失效 | 启用时，活塞不能跨不同队伍的领地推拉方块，除非方块进入或离开的领地已将方块编辑模式设为公开。<br>启用“禁用领地保护”后，此设置被忽略。 |
| `ftbchunks.max_prevented_log_age.tooltip` | 保留拦截假玩家访问日志的天数<br>（未来将用于显示和控制假玩家访问） | 保留假玩家访问拦截日志的天数。<br>此功能尚未完整实现，未来将用于显示和控制假玩家对领地的访问。 |
| `ftbchunks.long_range_tracker_interval.tooltip` | 更新客户端长距离追踪数据的间隔（刻）<br>数值越低更新越频繁，但增加服务器负载<br>设为 0 禁用 | 向客户端发送远距离玩家追踪数据的间隔，以刻为单位。<br>数值越低更新越频繁，但服务器负载和网络流量也越高，繁忙服务器尤其需要注意。<br>设为0可禁用远距离追踪。 |

验证：JSON解析、键存在性、有效缺键清单、占位符和颜色代码检查通过（TeamArgument源文修复有独立例外证据）。未运行游戏、未部署、未提交。
