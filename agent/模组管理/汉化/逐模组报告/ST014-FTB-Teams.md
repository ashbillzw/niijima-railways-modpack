# ST014 FTB Teams

日期：2026-10-17。包内文件：`ftb-teams-forge-2001.3.2.jar`。

英文90键、原中文0键；本轮新增89键、修正已有0键。全部标准语言条目初筛，未做全类硬编码审计或游戏验证。

## 上游复查

- [官方1.20.1固定提交](https://github.com/FTBTeam/FTB-Teams/tree/f7dcaa9c6645ff6d0e0613c48b0836572224c8a6)；检查`common/src/main/resources/assets/ftbteams/lang/`中的英文与中文。
- [官方1.21.1固定提交](https://github.com/FTBTeam/FTB-Teams/tree/47e8c4faa797a19f41a7a351eb78ae89e41b4a26)；检查`common/src/main/resources/assets/ftbteams/lang/`中的英文与中文。

针对三仓库的中文翻译PR进行了公开搜索，结果未能可靠定位具体中文PR；不能据此认定不存在，完整PR状态检查仍待补。

两个官方分支的已知zh_cn.json路径均返回404；包内无中文，未宣称全仓库不存在翻译。保留FTB Teams品牌分类名。用“队长／管理员／成员”表示队内职级，避免将Officer误写为现实军官；个人队伍、组队队伍和服务器队伍保留类型区别。

当前英文`ftbteams.team_already_exists`误写名称太短。包内TeamArgument字节码确认此键传入一个队名参数，较新版英文已为Team %s already exists!；本次中文恢复已存在提示及%s。这是经代码确认的源文错误例外。

`ftbteams.gui.create_party`在当前及新版英文中都是Description，所查当前JAR没有完整键字符串引用，可能为未用旧键／动态构造；暂按英文译“描述”，不凭键名直接改成创建按钮。此项列入运行上下文待办。

## 十条代表性实际改动

| 英文 | 已应用 |
| --- | --- |
| %s is not a member of %s! | %s不是%s的成员！ |
| Team name is too short! (must be >=3 characters) | 队伍“%s”已存在！ |
| You must transfer ownership of the team before you can leave! | 你必须先转让队长，才能离开队伍！ |
| Team data has not been received from the server!<br>FTB Teams will not function correctly.<br>Check server log for errors, and ensure your server is in online mode. | 尚未收到服务器的队伍数据！<br>FTB Teams将无法正常工作。<br>请检查服务端日志中的错误，并确认服务器已启用正版验证（online-mode）。 |
| Message History Maximum Size | 消息历史最大条数 |
| Manage Allies | 管理盟友 |
| Officer | 管理员 |
| Player Team | 个人队伍 |
| %s has invited you to join their party! | %s邀请你加入队伍！ |
| Decline ✘ | 拒绝 ✘ |

## 完整改动

| 键 | 原中文 | 已应用 |
| --- | --- | --- |
| `ftbteams.already_in_party` | （缺失） | 你已经加入队伍了！ |
| `ftbteams.player_already_in_party` | （缺失） | 玩家“%s”已经加入队伍了！ |
| `ftbteams.not_in_party` | （缺失） | 你尚未创建或加入队伍！ |
| `ftbteams.team_not_found` | （缺失） | 找不到队伍“%s”！ |
| `ftbteams.cant_edit` | （缺失） | 你无法编辑%s！ |
| `ftbteams.not_member` | （缺失） | %s不是%s的成员！ |
| `ftbteams.not_officer` | （缺失） | %s不是%s的管理员！ |
| `ftbteams.not_invited` | （缺失） | 你未受邀加入%s！ |
| `ftbteams.name_too_short` | （缺失） | 队伍名称太短！至少需要3个字符。 |
| `ftbteams.team_already_exists` | （缺失） | 队伍“%s”已存在！ |
| `ftbteams.server_permissions_prevent` | （缺失） | 服务器权限不允许你执行此操作。 |
| `ftbteams.info.id` | （缺失） | 完整队伍ID：%s |
| `ftbteams.info.short_id` | （缺失） | 简短队伍ID：%s |
| `ftbteams.info.owner` | （缺失） | 队长：%s |
| `ftbteams.info.owner.none` | （缺失） | 无 |
| `ftbteams.info.members` | （缺失） | 成员： |
| `ftbteams.info.members.none` | （缺失） | 没有成员 |
| `ftbteams.list` | （缺失） | 所有FTB队伍：%s |
| `ftbteams.property_not_found` | （缺失） | 找不到属性ID！ |
| `ftbteams.owner_cant_leave` | （缺失） | 你必须先转让队长，才能离开队伍！ |
| `ftbteams.cant_kick_owner` | （缺失） | 不能踢出队长！ |
| `ftbteams.party_api_only` | （缺失） | 此整合包不允许直接创建队伍！ |
| `ftbteams.api_override` | （缺失） | 此整合包只允许通过物品栏中的“我的队伍”按钮创建队伍！ |
| `ftbteams.missing_data` | （缺失） | 尚未收到服务器的队伍数据！<br>FTB Teams将无法正常工作。<br>请检查服务端日志中的错误，并确认服务器已启用正版验证（online-mode）。 |
| `ftbteams.privacy_mode.allies` | （缺失） | 盟友 |
| `ftbteams.privacy_mode.private` | （缺失） | 私有 |
| `ftbteams.privacy_mode.public` | （缺失） | 公开 |
| `ftbteams.create_party` | （缺失） | 创建队伍 |
| `ftbteams.create_party.info` | （缺失） | 创建队伍，邀请成员一起游玩并共享进度 |
| `ftbteams.gui.kick` | （缺失） | 踢出%s |
| `ftbteams.gui.kick.confirm` | （缺失） | 要踢出玩家%s吗？ |
| `ftbteams.gui.promote` | （缺失） | 提升%s |
| `ftbteams.gui.promote.confirm` | （缺失） | 要提升玩家%s的职位吗？ |
| `ftbteams.gui.demote` | （缺失） | 降职%s |
| `ftbteams.gui.demote.confirm` | （缺失） | 要降低玩家%s的职位吗？ |
| `ftbteams.gui.leave` | （缺失） | 离开队伍 |
| `ftbteams.gui.leave.confirm` | （缺失） | 要离开队伍吗？ |
| `ftbteams.gui.disband` | （缺失） | 解散队伍 |
| `ftbteams.gui.disband.confirm` | （缺失） | 要解散队伍吗？ |
| `ftbteams.gui.transfer_ownership` | （缺失） | 将队长转让给%s |
| `ftbteams.gui.transfer_ownership.confirm` | （缺失） | 要将队长转让给%s吗？ |
| `ftbteams.gui.party_name` | （缺失） | 队伍名称 |
| `ftbteams.gui.party_description` | （缺失） | 描述 |
| `ftbteams.gui.create_party` | （缺失） | 描述 |
| `ftbteams.gui.add_members` | （缺失） | 添加成员 |
| `ftbteams.gui.invite` | （缺失） | 邀请玩家 |
| `ftbteams.gui.manage_allies` | （缺失） | 管理盟友 |
| `ftbteams.gui.no_players` | （缺失） | 没有可选玩家 |
| `ftbteams.gui.send_invite` | （缺失） | 邀请 |
| `ftbteams.gui.add_ally` | （缺失） | 结盟 |
| `ftbteams.gui.remove_ally` | （缺失） | 与%s解除盟友关系 |
| `ftbteams.gui.remove_ally.confirm` | （缺失） | 要移除盟友%s吗？ |
| `ftbteams.ranks.enemy` | （缺失） | 敌对 |
| `ftbteams.ranks.none` | （缺失） | 无 |
| `ftbteams.ranks.ally` | （缺失） | 盟友 |
| `ftbteams.ranks.invited` | （缺失） | 已邀请 |
| `ftbteams.ranks.member` | （缺失） | 成员 |
| `ftbteams.ranks.officer` | （缺失） | 管理员 |
| `ftbteams.ranks.owner` | （缺失） | 队长 |
| `ftbteams.team_type.player` | （缺失） | 个人队伍 |
| `ftbteams.team_type.party` | （缺失） | 组队队伍 |
| `ftbteams.team_type.server` | （缺失） | 服务器队伍 |
| `ftbteams.message.invited` | （缺失） | 已邀请%s |
| `ftbteams.message.invite_sent` | （缺失） | %s邀请你加入队伍！ |
| `ftbteams.message.joined` | （缺失） | %s加入了你的队伍！ |
| `ftbteams.message.declined` | （缺失） | 你已拒绝邀请 |
| `ftbteams.message.kicked` | （缺失） | 已将%s从%s中踢出！ |
| `ftbteams.message.promoted` | （缺失） | 已将%s提升为管理员！ |
| `ftbteams.message.demoted` | （缺失） | 已将%s降为成员！ |
| `ftbteams.message.transfer_owner` | （缺失） | 已将队长转让给%s！ |
| `ftbteams.message.left_party` | （缺失） | 玩家%s离开了你的队伍！ |
| `ftbteams.message.add_ally` | （缺失） | 玩家%s已成为你队伍的盟友！ |
| `ftbteams.message.now_allied` | （缺失） | 你已成为“%s”的盟友！ |
| `ftbteams.message.remove_ally` | （缺失） | 玩家%s不再是你队伍的盟友！ |
| `ftbteams.message.no_longer_allied` | （缺失） | 你不再是“%s”的盟友！ |
| `ftbteams.message.created_server_team` | （缺失） | 已创建服务器队伍“%s”！ |
| `ftbteams.message.deleted_server_team` | （缺失） | 已删除服务器队伍“%s”！ |
| `ftbteams.message.team_disbanded` | （缺失） | 已强制解散组队队伍“%s”（%s）！ |
| `ftbteams.accept` | （缺失） | 接受 ✔ |
| `ftbteams.decline` | （缺失） | 拒绝 ✘ |
| `sidebar_button.ftbteams.my_team` | （缺失） | 我的队伍 |
| `ftbteamsconfig` | （缺失） | 队伍属性 |
| `ftbteamsconfig.ftbteams` | （缺失） | 队伍基本属性 |
| `ftbteamsconfig.ftbteams.display_name` | （缺失） | 显示名称 |
| `ftbteamsconfig.ftbteams.description` | （缺失） | 描述 |
| `ftbteamsconfig.ftbteams.color` | （缺失） | 颜色 |
| `ftbteamsconfig.ftbteams.free_to_join` | （缺失） | 自由加入 |
| `ftbteamsconfig.ftbteams.max_msg_history_size` | （缺失） | 消息历史最大条数 |
| `key.ftbteams.open_gui` | （缺失） | 打开队伍界面 |

验证：JSON解析、键存在性、有效缺键清单、占位符和颜色代码检查通过（TeamArgument源文修复有独立例外证据）。未运行游戏、未部署、未提交。
