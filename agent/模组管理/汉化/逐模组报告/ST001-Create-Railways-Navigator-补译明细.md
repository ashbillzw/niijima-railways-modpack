# ST001 补译明细

2026-10-16。201 条新增语言覆盖，旧中文未修改；游戏未验证。源文件版本、例外和待讨论项见 [筛查报告](ST001-Create-Railways-Navigator.md)。

| 命名空间 | 键 | 英文原文 | 新增中文 |
| --- | --- | --- | --- |
| dragonlib | `dragonlib.time_format.m` | %s min. | %s分钟 |
| dragonlib | `dragonlib.time_format.hm` | %s hrs. %s min. | %s小时%s分钟 |
| dragonlib | `dragonlib.time_format.dhm` | %s days %s hrs. %s min. | %s天%s小时%s分钟 |
| dragonlib | `dragonlib.time_format.ticks` | Ticks | 游戏刻 |
| dragonlib | `dragonlib.time_format.hours_24` | 24 hours format | 24小时制 |
| dragonlib | `dragonlib.time_format.hours_12` | 12 hours format | 12小时制 |
| dragonlib | `enum.dragonlib.time_format.description` | Defines in which format the time should be displayed. | 决定时间的显示格式。 |
| dragonlib | `enum.dragonlib.time_format.ticks` | Ticks | 游戏刻 |
| dragonlib | `enum.dragonlib.time_format.info.ticks` | Time in minecraft game ticks between 0 and 24000. | 以 Minecraft 游戏刻表示时间，范围为0至24000。 |
| dragonlib | `enum.dragonlib.time_format.hours_12` | 12 hours format | 12小时制 |
| dragonlib | `enum.dragonlib.time_format.info.hours_12` | Time in the 12 hours format. | 以12小时制显示时间。 |
| dragonlib | `enum.dragonlib.time_format.hours_24` | 24 hours format | 24小时制 |
| dragonlib | `enum.dragonlib.time_format.info.hours_24` | Time in the 24 hours format. | 以24小时制显示时间。 |
| dragonlib | `enum.dragonlib.alignment.description` | The orientation on a horizontal plane. | 水平方向上的对齐方式。 |
| dragonlib | `enum.dragonlib.alignment.left` | Left | 左对齐 |
| dragonlib | `enum.dragonlib.alignment.info.left` | The element is located at the left border of the defined area. | 元素位于指定区域的左侧边缘。 |
| dragonlib | `enum.dragonlib.alignment.center` | Center | 居中 |
| dragonlib | `enum.dragonlib.alignment.info.center` | The element is located in the center of the defined area. | 元素位于指定区域的中央。 |
| dragonlib | `enum.dragonlib.alignment.right` | Right | 右对齐 |
| dragonlib | `enum.dragonlib.alignment.info.right` | The element is located at the right border of the defined area. | 元素位于指定区域的右侧边缘。 |
| dragonlib | `text.dragonlib.dragon` | Dragon | 龙 |
| dragonlib | `text.dragonlib.next` | Next | 下一项 |
| dragonlib | `text.dragonlib.previous` | Previous | 上一项 |
| dragonlib | `text.dragonlib.go_back` | Go back | 返回 |
| dragonlib | `text.dragonlib.go_forth` | Go forth | 前进 |
| dragonlib | `text.dragonlib.go_down` | Go down | 向下 |
| dragonlib | `text.dragonlib.go_up` | Go up | 向上 |
| dragonlib | `text.dragonlib.go_right` | Go right | 向右 |
| dragonlib | `text.dragonlib.go_left` | Go left | 向左 |
| dragonlib | `text.dragonlib.go_to_top` | Go to top | 跳转到顶部 |
| dragonlib | `text.dragonlib.go_to_bottom` | Go to bottom | 跳转到底部 |
| dragonlib | `text.dragonlib.reset_defaults` | Reset defaults | 恢复默认设置 |
| dragonlib | `text.dragonlib.expand` | Expand | 展开 |
| dragonlib | `text.dragonlib.collapse` | Collapse | 折叠 |
| dragonlib | `text.dragonlib.count` | Count | 数量 |
| dragonlib | `text.dragonlib.true` | True | 真 |
| dragonlib | `text.dragonlib.false` | False | 假 |
| dragonlib | `text.dragonlib.close` | Close | 关闭 |
| dragonlib | `text.dragonlib.show` | Show | 显示 |
| dragonlib | `text.dragonlib.hide` | Hide | 隐藏 |
| dragonlib | `text.dragonlib.search` | Search | 搜索 |
| dragonlib | `text.dragonlib.refresh` | Refresh | 刷新 |
| dragonlib | `text.dragonlib.reload` | Reload | 重新加载 |
| dragonlib | `gui.dragonlib.colorpicker.title` | Color Picker | 拾色器 |
| dragonlib | `gui.dragonlib.menu.cut` | Cut | 剪切 |
| dragonlib | `gui.dragonlib.menu.copy` | Copy | 复制 |
| dragonlib | `gui.dragonlib.menu.paste` | Paste | 粘贴 |
| dragonlib | `gui.dragonlib.menu.delete` | Delete | 删除 |
| dragonlib | `gui.dragonlib.menu.select_all` | Select all | 全选 |
| dragonlib | `gui.dragonlib.menu.decrement` | Decrement | 减少 |
| dragonlib | `gui.dragonlib.menu.increment` | Increment | 增加 |
| dragonlib | `gui.dragonlib.scrollbar.here` | Here | 滚动到此处 |
| dragonlib | `gui.dragonlib.scrollbar.top` | Top | 顶部 |
| dragonlib | `gui.dragonlib.scrollbar.bottom` | Down | 底部 |
| dragonlib | `gui.dragonlib.scrollbar.page_up` | Page up | 向上翻页 |
| dragonlib | `gui.dragonlib.scrollbar.page_down` | Page down | 向下翻页 |
| dragonlib | `gui.dragonlib.scrollbar.step_up` | Scroll up | 向上滚动 |
| dragonlib | `gui.dragonlib.scrollbar.step_down` | Scroll down | 向下滚动 |
| dragonlib | `compat.dragonlib.click_to_open_modpage` | Click to open mod page | 点击打开模组页面 |
| dragonlib | `compat.dragonlib.sodium_warn` | You are using %s. To avoid visual glitches with colored blocks, please also install %s. | 您正在使用%s。为避免彩色方块出现显示异常，请同时安装%s。 |
| dragonlib | `block.dragonlib.dragon` | Dragon | 龙 |
| createrailwaysnavigator | `itemGroup.createrailwaysnavigator.tab` | Create Railways Navigator | 机械动力：铁路导航 |
| createrailwaysnavigator | `item.createrailwaysnavigator.navigator` | Navigator | 导航仪 |
| createrailwaysnavigator | `block.createrailwaysnavigator.train_station_clock.tooltip.summary` | Shows the _current time_. | 显示_当前时间_。 |
| createrailwaysnavigator | `block.createrailwaysnavigator.train_station_clock.tooltip.condition1` | When R-Clicked | 右击时 |
| createrailwaysnavigator | `block.createrailwaysnavigator.train_station_clock.tooltip.behaviour1` | Displays the _current time_ above the _hotbar_. | 在_快捷栏_上方显示_当前时间_。 |
| createrailwaysnavigator | `block.createrailwaysnavigator.train_station_clock.tooltip.condition2` | When R-Clicked on another Train Station Clock | 右击另一个车站时钟时 |
| createrailwaysnavigator | `block.createrailwaysnavigator.train_station_clock.tooltip.behaviour2` | Changes the clock to display the time on _all four sides_. | 将时钟改为_四面_显示时间。 |
| createrailwaysnavigator | `block.createrailwaysnavigator.navigator_lectern` | Lectern with Navigator | 带导航仪的讲台 |
| createrailwaysnavigator | `block.createrailwaysnavigator.advanced_display.ber.do_not_board` | Do not board! | 请勿上车！ |
| createrailwaysnavigator | `block.createrailwaysnavigator.advanced_display.ber.this_train_terminates_there` | This train terminates there! | 本次列车将在该站终到！ |
| createrailwaysnavigator | `block.createrailwaysnavigator.advanced_display.ber.train_terminates` | Train terminates here! | 本次列车已到终点站！ |
| createrailwaysnavigator | `block.createrailwaysnavigator.advanced_display.ber.passengers_leave_train` | Please all change here. | 请所有乘客在此下车换乘。 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.common.remove` | Remove | 移除 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.common.new` | New | 新建 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.common.clear_all` | Clear all | 全部清空 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.common.clear` | Clear | 清空 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.common.loading` | Loading... | 正在加载… |
| createrailwaysnavigator | `gui.createrailwaysnavigator.common.last_edited` | Last edited: %s, %s | 最后编辑：%s，%s |
| createrailwaysnavigator | `gui.createrailwaysnavigator.common.unknown` | (Unknown) | （未知） |
| createrailwaysnavigator | `gui.createrailwaysnavigator.common.read_only` | (Read Only) | （只读） |
| createrailwaysnavigator | `gui.createrailwaysnavigator.common.server` | Server | 服务器 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.common.are_you_sure` | Are you sure? | 确定吗？ |
| createrailwaysnavigator | `gui.createrailwaysnavigator.navigator.recently_searched` | Recently searched | 最近搜索 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.lock.permissions` | Modification Permissions | 修改权限 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.lock.state` | State: %s | 状态：%s |
| createrailwaysnavigator | `gui.createrailwaysnavigator.lock.owner` | Owner: %s | 所有者：%s |
| createrailwaysnavigator | `gui.createrailwaysnavigator.lock.right_click_options` | Right-Click for more options | 右击查看更多选项 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.lock.no_owner` | None | 无 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.lock.trusted_players` | Trusted Players | 受信任玩家 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.lock.transfer_ownership` | Transfer Ownership | 转让所有权 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.lock.transfer_ownership.warning` | This process cannot be reversed! You will be entered as a trusted player during the transfer, but you have no possibilities to change the permissions yourself. | 此操作不可撤销！转让后您将被列为受信任玩家，但无法再自行修改权限。 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.global_settings.train_category.title` | Train Category | 列车类别 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.global_settings.train_category.description` | Create train categories to organize all trains (e.g. regional services, long-distance services, ...). Users can decide which train categories they want to use. | 创建列车类别以管理所有列车（例如区域列车、长途列车等）。用户可以选择要乘坐的列车类别。 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.station_tags.add` | Create new Entry | 新建条目 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.station_tags.delete_tag` | Delete Tag | 删除标签 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.station_tags.delete_station` | Remove Station | 移除车站 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.station_tags.modify_platform` | Click to change | 点击修改 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.station_tags.add_station` | Add Station | 添加车站 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.train_category_settings.title` | Train Category Settings | 列车类别设置 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.train_category_settings.summary` | Contains %s Trains | 包含%s列列车 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.train_category_settings.delete_alias.tooltip` | Delete Category | 删除类别 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.train_category_settings.delete_station.tooltip` | Remove Train | 移除列车 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.train_category_settings.add_station.tooltip` | Add Train | 添加列车 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.search_settings.train_categories` | Train Category Filter | 列车类别筛选 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.search_settings.train_categories.description` | Decide which trains from which train categories you want to use. | 选择要乘坐哪些类别的列车。 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.search_settings.train_categories.overview` | %s categories selected | 已选择%s个类别 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.search_settings.train_categories.overview.all` | All | 全部 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.search_settings.train_categories.overview.none` | No | 零 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.search_settings.train_categories.tooltip.reset` | Reset filter | 重置筛选 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.show_do_not_board_text` | Show 'Do not board' text | 显示“请勿上车”提示 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.show_do_not_board_text.description` | If activated, the text 'Do not board' is displayed if the trains changes the schedule section. If the train then continues into a non-navigable section or the option 'Include start of next section' is deactivated, this option is ignored. | 启用后，若列车在此切换时刻表区段，将显示“请勿上车”。若列车随后进入不可导航的区段，或“包含下一个区段的起始”选项已关闭，则忽略此设置。 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.train_name_width` | Train Name Width | 列车名称宽度 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.train_name_width_next` | Train Name Width (Next departure) | 列车名称宽度（下一班次） |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.train_name_width_table` | Train Name Width (Following trains) | 列车名称宽度（后续车次） |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.train_name_width.description` | in block pixels | 单位：方块像素 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.platform_width` | Platform Width | 站台栏宽度 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.platform_width_next` | Platform Width (Next departure) | 站台栏宽度（下一班次） |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.platform_width_table` | Platform Width (Following trains) | 站台栏宽度（后续车次） |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.platform_width.description` | in block pixels | 单位：方块像素 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.info_width` | Info Section Width | 信息区域宽度 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.info_width.description` | in percent of the remaining screen width | 占屏幕剩余宽度的百分比 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.stopovers_width` | Stopovers Section Width | 经停站区域宽度 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.stopovers_width.description` | in percent of the remaining screen width | 占屏幕剩余宽度的百分比 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.static_text` | Displayed Text | 显示文本 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.static_text.description` | plain text or the text component format can be used. | 可使用纯文本或文本组件格式。 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.text_pos_x` | X Position | X坐标 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.text_pos_x.description` | in block pixels | 单位：方块像素 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.text_pos_y` | Y Position | Y坐标 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.text_pos_y.description` | in block pixels | 单位：方块像素 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.text_left_aligned` | Left Aligned Text | 文本左对齐 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.text_centered` | Centered Text | 文本居中 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.text_right_aligned` | Right Aligned Text | 文本右对齐 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.text_min_x_scale` | Minimum X Scale | 最小水平缩放比例 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.text_min_x_scale.description` | If the text is too wide, it is first scaled to this value before it is cut off or begins to scroll. | 文本过宽时，会先缩小至此比例，再截断或开始滚动。 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.text_x_scale` | X Scale | 水平缩放比例 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.text_x_scale.description` | in percent | 单位：百分比 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.text_y_scale` | Y Scale | 垂直缩放比例 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.text_y_scale.description` | in percent | 单位：百分比 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.text_max_width` | Text Max Width | 文本最大宽度 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.text_max_width.description` | The maximum width (in block pixels) that is available for the text. This value is limited by the display bounds! | 文本可占用的最大宽度（单位：方块像素）。此值受显示器边界限制！ |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.label_background_color` | Label Background Color | 标签背景颜色 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.background_color_full_size` | Full Size | 填满区域 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.advanced_display_settings.background_color_full_size.description` | Whether the entire area of the text field should be filled or only the text. | 决定背景色填满整个文本框，还是仅覆盖文字所在区域。 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.display_type.static_text` | Static Text | 静态文本 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.display_type.info.static_text` | Displays user-defined text. | 显示自定义文本。 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.train_filter.same_category` | Same Category | 相同类别 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.train_filter.info.same_category` | Only trains with the same train category are taken into account. | 只考虑相同类别的列车。 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.train_filter.same_name` | Same Name | 相同名称 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.train_filter.info.same_name` | Only trains with the same name are taken into account. | 只考虑名称相同的列车。 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.time_source` | Time Source | 时间来源 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.time_source.description` | The source from which the time should be calculated. | 用于计算时间的来源。 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.time_source.real_life` | Real Life | 现实时间 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.time_source.info.real_life` | The real time system | 现实时间系统 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.time_source.in_game` | In-Game | 游戏时间 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.time_source.info.in_game` | The in-game time system | 游戏内时间系统 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.lock_state.unlocked` | Unlocked | 未锁定 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.lock_state.info.unlocked` | Everyone has access. | 所有人均可访问。 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.lock_state.trusted` | Trusted | 受信任 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.lock_state.info.trusted` | Only trusted players have access. | 仅受信任玩家可访问。 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.lock_state.locked` | Locked | 已锁定 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.lock_state.info.locked` | Only you have access. | 仅您可以访问。 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.text_scale_bounds` | Boundary behavior | 超出边界时 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.text_scale_bounds.description` | The behavior of the text when the length exceeds the available space. | 文本长度超出可用空间时的处理方式。 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.text_scale_bounds.cut_off` | Cut Off | 截断 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.text_scale_bounds.scale_scroll` | Scale/Scroll | 缩放／滚动 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.text_scale_bounds.scroll` | Always Scroll | 始终滚动 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.departure_board_train_filter` | Filter | 筛选 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.departure_board_train_filter.arrival_and_departure` | All | 全部 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.departure_board_train_filter.arrival_only` | Arrivals only | 仅到达列车 |
| createrailwaysnavigator | `enum.createrailwaysnavigator.departure_board_train_filter.departure_only` | Departures only | 仅出发列车 |
| createrailwaysnavigator | `create.display_target.advanced_display.component` | Component %s | 组件%s |
| createrailwaysnavigator | `gui.createrailwaysnavigator.section_settings.train_categories` | Assign Train Category | 分配列车类别 |
| createrailwaysnavigator | `createrailwaysnavigator.schedule.condition.dynamic_delay.at_least` | but at least %s | 但至少%s |
| createrailwaysnavigator | `createrailwaysnavigator.schedule.condition.train_separation.description` | Departure %s (%s) after: | 在以下列车发车%s（%s）后出发： |
| createrailwaysnavigator | `createrailwaysnavigator.schedule.instruction.travel_section.train_category` |  - Set Train Category:  |  - 设定列车类别：  |
| createrailwaysnavigator | `createrailwaysnavigator.schedule.instruction.prioritized_destination_instruction` | Prioritized Destination | 优先目的地 |
| createrailwaysnavigator | `createrailwaysnavigator.schedule.instruction.prioritized_destination_instruction.summary` | Next stop priority list: | 下一站优先级列表： |
| createrailwaysnavigator | `createrailwaysnavigator.schedule.instruction.prioritized_destination_instruction.empty` | (None) | （无） |
| createrailwaysnavigator | `createrailwaysnavigator.schedule.instruction.prioritized_destination_instruction.primary` | (Primary) | （首选） |
| createrailwaysnavigator | `createrailwaysnavigator.schedule.instruction.prioritized_destination_instruction.settings` | Prioritized Destination Instruction Settings | 优先目的地指令设置 |
| createrailwaysnavigator | `createrailwaysnavigator.schedule.instruction.prioritized_destination_instruction.settings.drag_and_drop` | Drag this entry to change the order | 拖动此条目以调整顺序 |
| createrailwaysnavigator | `createrailwaysnavigator.schedule.instruction.prioritized_destination_instruction.settings.priorities` | Elements higher up have a higher priority and are selected first. | 越靠上的条目优先级越高，会优先选择。 |
| createrailwaysnavigator | `createrailwaysnavigator.schedule.instruction.prioritized_destination_instruction.settings.priority_pos` | Position: %s | 位置：%s |
| createrailwaysnavigator | `createrailwaysnavigator.schedule.instruction.prioritized_destination_instruction.settings.avoid_signals` | Avoid Red Signals | 避开红灯信号 |
| createrailwaysnavigator | `createrailwaysnavigator.schedule.instruction.prioritized_destination_instruction.settings.avoid_signals_description` | Select the station with the fewest signals turned red by Redstone. | 选择路径上被红石强制设为红灯的信号机最少的车站。 |
| createrailwaysnavigator | `createrailwaysnavigator.schedule.instruction.prioritized_destination_instruction.settings.avoid_trains` | Avoid Other Trains | 避开其他列车 |
| createrailwaysnavigator | `createrailwaysnavigator.schedule.instruction.prioritized_destination_instruction.settings.avoid_trains_description` | Selects the station with the fewest trains on the route. | 选择路径上列车最少的车站。 |
| createrailwaysnavigator | `goggles.createrailwaysnavigator.train_listener.departures.category` | Departures by Train Category: | 按列车类别查看发车记录： |
| createrailwaysnavigator | `goggles.createrailwaysnavigator.train_listener.departures.name` | Departures by Train Name: | 按列车名称查看发车记录： |
| createrailwaysnavigator | `goggles.createrailwaysnavigator.train_listener.departures.press_shift_for_in_game_time` | Press SHIFT to show as In-Game time | 按住SHIFT显示游戏时间 |
| createrailwaysnavigator | `display.createrailwaysnavigator.static_text.simple_text` | Simple Text | 简单文本 |
| createrailwaysnavigator | `display.createrailwaysnavigator.static_text.rich_text` | Rich Text | 富文本 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.search_options.train_categories` | Train Category | 列车类别 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.search_options.train_categories.all` | All | 全部 |
| createrailwaysnavigator | `gui.createrailwaysnavigator.search_options.train_categories.excluded` | %s excluded | 已排除%s项 |
| createrailwaysnavigator | `block.createrailwaysnavigator.advanced_display.ber.information_about_train` | Information about %s | 关于%s的信息 |
| createrailwaysnavigator | `block.createrailwaysnavigator.advanced_display.ber.platform_changed` | Today from platform %s | 今日从%s号站台出发 |
| createrailwaysnavigator | `block.createrailwaysnavigator.advanced_display.ber.platform_and_station_changed` | Today at %s from platform %s | 今日在%s从%s号站台出发 |
| createrailwaysnavigator | `create.generic.unit.days` | Days | 天 |
| createrailwaysnavigator | `create.generic.unit.hours` | Hours | 小时 |
