# ST068 FancyMenu 筛查与补译报告

日期：2026-10-18。当前 `fancymenu_forge_3.7.0_MC_1.20.1.jar`，英文1800、中文1586键。对照阅读标准文本：补齐214键，修正141个已有值。未游戏验证。

## 上游与适配

官方仓库 https://github.com/Keksuccino/FancyMenu 。1.20.1分支 `9866771a0228f14c0ca7228f90851abb980bdedb`、1.21.1分支 `f5e0fe0fcb568201efdbf28c47d332173213c975` 的 `common/src/main/resources/assets/fancymenu/lang/zh_cn.json` 均3367键。当前版本缺项中160键可参考上游，另54键自行补齐；只写入当前版本存在的键。独立翻译仓库候选未取得结果，已停止等待；未穷尽历史PR。

同步获取当前上游英文3372键进行语义对照。视频时间占位符的新版 `output_as_timestamp` 参数、文件文本占位符的新路径约定不直接移植到旧版。保留当前英文的参数、格式与转义序列。新版旧键599处差异主要包括改写和功能变化，未直接全部覆盖。

## 主要修正与保留

- 101个包含“幕布”的GUI相关旧值统一为“界面”；这批都是Screen／GUI语境，不是影片幕布。保留窗口、屏幕像素等原有其他说法，没有全局替换Screen所有译法。
- 原有英文氧气值、快捷栏与布局错误提示补成中文。
- 白名单说明误写黑名单；多人游戏服务器图标误写世界图标；高级尺寸说明复制坐标说明；终端操作条件误解为操作系统支持命令行：均修正。
- 资源路径 `config/fancymenu/assets` 不翻译；游戏模式、难度及朝向的返回值保留英文标识符并加中文解释。
- 音轨映射示例恢复 `%%:%%`；修复滑块值帮助遗漏的 `§r`；不采用上游把Opacity改为透明度的错误。
- “白天时间”改为“一天内的时间”，避免排除夜间；槽位有物品不等于堆叠已满；检测半径不泛写为范围；凋零状态不写成枯萎。
- 新增文本沿用包内“操作”“显示条件／条件”“纹理”“9切片”；保留原有作者语气，不批量进行您／你改写。

## 10个代表性新增译文

| 原文 | 译文 |
|---|---|
| Edit Timestamp | 编辑时间戳 |
| Grid Snapping | 网格吸附 |
| Template Settings | 模板设置 |
| Video [MCEF] | 视频 [MCEF] |
| Copy Background Identifier | 复制背景标识符 |
| Scoreboard Objective Criteria | 记分项准则 |
| Cell Padding | 单元格内边距 |
| Checkbox | 复选框 |
| Bearer Token | Bearer 令牌 |
| World Save Data | 世界存档数据 |

## 仍需上下文验证的候选

- Ticker旧称“钟表”、游戏介绍（Game Intro）、吸收生命值等保留原译；应结合实际界面与用途再统一。
- 随机文本与JSON解析的旧帮助缺少当前英文新增来源说明，英文自身关于本地路径也有相对路径／ASSETS限制的混用，需核对当前实现后更新。
- Negate Number的说明写明负数保持不变，因此保留“负绝对值”，未仅凭英文标题改为普通取反。
- 音量设置英文标题Track与说明Audio element并存，保留“音频元素音量”，不擅改为单曲音量。
- 新旧缓存警告格式顺序按当前英文保留；未测试自定义颜色§x等在实际菜单中的表现。未穷尽硬编码、特殊配置文件或扩展模组文本。

## 应用与静态检查

覆盖 `pack/overrides/kubejs/assets/fancymenu/lang/zh_cn.json`。JSON可解析，当前版本键集合、格式参数和占位符检查通过，214个缺失标准键已补齐。仅语言修改，不修改菜单布局、HTTP配置或视频设置；未运行任何文案中的命令。未游戏验证、打包、提交或部署。

## 完整变更

| 键 | 原值 | 应用值 |
|---|---|---|
| `fancymenu.elements.animation_controller.keyframe_manager.move_preview_with_arrow_keys` | 缺失 | 方向键移动预览：%s |
| `fancymenu.elements.animation_controller.keyframe_manager.move_preview_with_arrow_keys.desc` | 缺失 | 启用后，方向键会移动<br>预览元素，而不是选中的关键帧。 |
| `fancymenu.elements.animation_controller.keyframe_manager.timestamp_edit` | 缺失 | 编辑时间戳 |
| `fancymenu.elements.animation_controller.keyframe_manager.timestamp_edit.desc` | 缺失 | 让你编辑选中关键帧的时间戳。 |
| `fancymenu.elements.animation_controller.keyframe_manager.timestamp_edit.input` | 缺失 | 选中项的时间戳（毫秒）： |
| `fancymenu.placeholders.last_world_server` | 缺失 | 上次的世界或服务器 |
| `fancymenu.placeholders.last_world_server.desc` | 缺失 | 返回玩家上次加入的世界或服务器。<br>你可以通过 'type' 值控制这个占位符<br>是返回服务器和世界两者，还是只返回其中一个。<br><br>类型：both、world、server<br><br>'full_world_path' 值控制返回完整路径，还是<br>只返回世界名（不含服务器名）。<br>设为 'false' 时只返回世界名。 |
| `fancymenu.elements.button.template_settings` | 缺失 | 模板设置 |
| `fancymenu.elements.button.template_settings.desc` | 缺失 | 当你为自定义按钮启用模板模式时，它会把<br>自己的一些设置应用到当前界面中的所有其他按钮或滑块上。<br><br>模板按钮在编辑器外会是§l不可见§r的。<br><br>当你把模板设为与滑块共享设置时，<br>按钮纹理的设置会变成滑块纹理设置。<br><br>§l会共享的设置有：<br><br>- 按钮/滑块纹理<br>- 按钮点击音效<br>- 按钮/滑块悬停音效<br>- 按钮/滑块位置（如果启用）<br>- 按钮/滑块大小（如果启用）<br>- 按钮/滑块不透明度（如果启用）<br>- 按钮/滑块可见性（如果启用）<br>- 按钮/滑块标签（如果启用） |
| `fancymenu.elements.button.is_template` | 缺失 | 模板模式：%s |
| `fancymenu.elements.button.template_apply_width` | 缺失 | 模板模式下共享宽度：%s |
| `fancymenu.elements.button.template_apply_height` | 缺失 | 模板模式下共享高度：%s |
| `fancymenu.elements.button.template_apply_posx` | 缺失 | 模板模式下共享 X 位置：%s |
| `fancymenu.elements.button.template_apply_posy` | 缺失 | 模板模式下共享 Y 位置：%s |
| `fancymenu.elements.button.template_apply_opacity` | 缺失 | 模板模式下共享不透明度：%s |
| `fancymenu.elements.button.template_apply_visibility` | 缺失 | 模板模式下共享可见性：%s |
| `fancymenu.elements.button.template_apply_label` | 缺失 | 模板模式下共享标签：%s |
| `fancymenu.elements.button.template.share_with` | 缺失 | 共享设置给：%s |
| `fancymenu.elements.button.template.share_with.sliders` | 缺失 | 滑块 |
| `fancymenu.elements.button.template.share_with.buttons` | 缺失 | 按钮 |
| `fancymenu.actions.generic.async_error` | 缺失 | “%s” 操作不能异步执行！ |
| `fancymenu.requirements.is_internet_connection_available` | 缺失 | 是否有可用的互联网连接 |
| `fancymenu.requirements.is_internet_connection_available.desc` | 缺失 | 如果当前有可用且正常工作的互联网连接，则返回 true。 |
| `fancymenu.layout_editor.grid.snapping` | 缺失 | 网格吸附：%s |
| `fancymenu.layout_editor.grid.snapping.desc` | 缺失 | 移动元素时是否吸附到网格线。 |
| `fancymenu.layout_editor.grid.snapping.strength` | 缺失 | 网格吸附强度：%s |
| `fancymenu.layout_editor.grid.snapping.strength.desc` | 缺失 | 控制元素吸附到网格线的强度。<br>数值越低，越需要精确操作。<br>数值越高，离得更远也会吸附。 |
| `fancymenu.layout_editor.grid.snapping.strength.pixel_perfect` | 缺失 | 像素级完美 (0.5) |
| `fancymenu.layout_editor.grid.snapping.strength.high_precision` | 缺失 | 高精度 (0.75) |
| `fancymenu.layout_editor.grid.snapping.strength.standard` | 缺失 | 正常 (1.0) |
| `fancymenu.layout_editor.grid.snapping.strength.moderate` | 缺失 | 中等 (1.5) |
| `fancymenu.layout_editor.grid.snapping.strength.magnetic` | 缺失 | 磁力吸附 (2.0) |
| `fancymenu.layout_editor.grid.snapping.strength.strong_magnetic` | 缺失 | 强力磁吸 (3.0) |
| `fancymenu.layout_editor.grid.snapping.strength.maximum` | 缺失 | 最大 (5.0) |
| `fancymenu.actions.build_action.screen.search_action` | 缺失 | 搜索操作.. |
| `fancymenu.requirements.build_requirement.screen.search_requirement` | 缺失 | 搜索条件.. |
| `fancymenu.placeholders.text_editor.search_placeholder` | 缺失 | 搜索占位符.. |
| `fancymenu.variables.manage_variables.screen.search_variable` | 缺失 | 搜索变量.. |
| `fancymenu.editor.text_editor.single_line_warning` | 缺失 | 目标需要单行文本，这意味着所有行都会<br>合并成一行，并且除第一行之外所有行的前导空格<br>都会在目标的实际输出文本中被移除。 |
| `fancymenu.editor.text_editor.single_line_warning.indicator` | 缺失 | 已启用单行模式！ |
| `fancymenu.editor.menu_bar.unsaved_warning` | 缺失 | * 有未保存的更改！ * |
| `fancymenu.actions.back_to_last_screen` | 缺失 | 返回上一个界面 |
| `fancymenu.actions.back_to_last_screen.desc` | 缺失 | 打开当前界面之前最后打开的界面。 |
| `fancymenu.actions.video.set_video_element_volume` | 缺失 | 设置视频元素音量 |
| `fancymenu.actions.video.set_video_element_volume.desc` | 缺失 | 设置一个 视频 元素的音量。<br>音量必须是介于 0.0（0%%）和 1.0（100%%）之间的有效小数。 |
| `fancymenu.actions.video.set_video_element_volume.value.desc` | 缺失 | 视频元素标识符 + 音量 [ 用 : 分隔 ] |
| `fancymenu.placeholders.video_element_volume` | 缺失 | 视频元素音量 |
| `fancymenu.placeholders.video_element_volume.desc` | 缺失 | 返回 视频 元素的音量。<br>音量是 0.0（0%%）到 1.0（100%%）之间的小数。 |
| `fancymenu.placeholders.categories.video` | 缺失 | 视频 |
| `fancymenu.actions.video.toggle_paused_state` | 缺失 | 切换视频元素暂停状态 |
| `fancymenu.actions.video.toggle_paused_state.desc` | 缺失 | 切换一个 视频 元素的暂停状态。 |
| `fancymenu.actions.video.toggle_paused_state.value.desc` | 缺失 | 视频元素标识符 |
| `fancymenu.placeholders.video_element_duration` | 缺失 | 视频元素时长 |
| `fancymenu.placeholders.video_element_duration.desc` | 缺失 | 返回视频元素的总时长，格式为 MM:SS（例如 '03:45'）。<br>元素尚未就绪或未设置视频时返回 '00:00'。<br><br>必填值：<br>- element_identifier：要获取时长的视频元素 ID |
| `fancymenu.placeholders.video_element_playtime` | 缺失 | 视频元素播放时间 |
| `fancymenu.placeholders.video_element_playtime.desc` | 缺失 | 返回视频元素当前的播放时间（MM:SS 格式）<br>或播放进度百分比（0-100）。<br>元素尚未就绪或未设置视频时返回 '00:00' 或 '0'。<br><br>必填值：<br>- element_identifier：视频元素 ID<br>- show_percentage：设为 'true' 时显示百分比而不是时间 |
| `fancymenu.placeholders.video_paused_state` | 缺失 | 视频元素暂停状态 |
| `fancymenu.placeholders.video_paused_state.desc` | 缺失 | 返回 视频 元素的暂停状态。<br>如果元素已暂停，则返回 'true'，否则返回 'false'。 |
| `fancymenu.actions.video.set_video_background_volume` | 缺失 | 设置视频背景音量 |
| `fancymenu.actions.video.set_video_background_volume.desc` | 缺失 | 按标识符设置一个 视频 菜单背景的音量。<br>音量必须是介于 0.0（0%%）和 1.0（100%%）之间的有效小数。<br><br>要获取背景的标识符，请右键<br>编辑器背景并点击“复制背景标识符”。 |
| `fancymenu.actions.video.set_video_background_volume.value.desc` | 缺失 | 视频背景标识符 + 音量 [ 用 : 分隔 ] |
| `fancymenu.actions.video.background.toggle_paused_state` | 缺失 | 切换视频背景暂停状态 |
| `fancymenu.actions.video.background.toggle_paused_state.desc` | 缺失 | 按标识符切换一个 视频 菜单背景的暂停状态。<br><br>要获取背景的标识符，请右键<br>编辑器背景并点击“复制背景标识符”。 |
| `fancymenu.actions.video.background.toggle_paused_state.value.desc` | 缺失 | 视频背景标识符 |
| `fancymenu.placeholders.video_background_duration` | 缺失 | 视频背景时长 |
| `fancymenu.placeholders.video_background_duration.desc` | 缺失 | 根据标识符返回视频菜单背景的总时长，格式为 MM:SS（例如 '03:45'）。<br>背景尚未就绪或未设置视频时返回 '00:00'。<br><br>右键点击编辑器背景，再点击“复制背景标识符”，<br>即可获取背景标识符。 |
| `fancymenu.placeholders.video_background_paused_state` | 缺失 | 视频背景暂停状态 |
| `fancymenu.placeholders.video_background_paused_state.desc` | 缺失 | 按标识符返回 视频 菜单背景的暂停状态。<br>如果元素已暂停，则返回 'true'，否则返回 'false'。<br><br>要获取背景的标识符，右键编辑器背景，<br>然后点“复制背景标识符”。 |
| `fancymenu.placeholders.video_background_playtime` | 缺失 | 视频背景播放时间 |
| `fancymenu.placeholders.video_background_playtime.desc` | 缺失 | 返回视频菜单背景当前的播放时间（MM:SS 格式）<br>或播放进度百分比（0-100）。<br>背景尚未就绪或未设置视频时返回 '00:00' 或 '0'。<br><br>必填值：<br>- background_identifier：视频背景 ID<br>- show_percentage：设为 'true' 时显示百分比而不是时间<br><br>右键点击编辑器背景，再点击“复制背景标识符”，<br>即可获取背景标识符。 |
| `fancymenu.placeholders.video_background_volume` | 缺失 | 视频背景音量 |
| `fancymenu.placeholders.video_background_volume.desc` | 缺失 | 按标识符返回 视频 菜单背景的音量。<br>音量是 0.0（0%%）到 1.0（100%%）之间的小数。<br><br>要获取背景的标识符，右键编辑器背景，<br>然后点“复制背景标识符”。 |
| `fancymenu.editor.background_options.copy_background_identifier` | 缺失 | 复制背景标识符 |
| `fancymenu.editor.background_options.copy_background_identifier.desc` | 缺失 | 这会把<br>当前菜单背景的标识符复制到剪贴板。<br><br>背景标识符会被操作、占位符<br>以及类似功能用来和背景实例通信。 |
| `fancymenu.editor.buddy.enable` | 缺失 | 启用小宠物：%s |
| `fancymenu.editor.buddy.enable.desc` | 缺失 | 是否要让一个可爱的小宠物生物<br>在编辑器屏幕底部走来走去。 |
| `fancymenu.elements.tooltip` | 缺失 | 提示框 |
| `fancymenu.elements.tooltip.desc` | 缺失 | 在特定位置或鼠标位置渲染提示框。<br>和文本元素类似，支持完整的 Markdown。<br>通过显示条件来控制其可见性。 |
| `fancymenu.elements.tooltip.content` | 缺失 | 提示框文本内容 |
| `fancymenu.elements.tooltip.background` | 缺失 | 提示框背景 |
| `fancymenu.elements.tooltip.background_texture` | 缺失 | 自定义背景纹理 |
| `fancymenu.elements.tooltip.background_texture.desc` | 缺失 | 设置自定义背景纹理。<br>使用9切片来按当前提示框大小缩放纹理。 |
| `fancymenu.elements.tooltip.nine_slice` | 缺失 | 9切片设置 |
| `fancymenu.elements.tooltip.nine_slice.desc` | 缺失 | 你可以在这里设置与<br>自定义提示框背景的9切片逻辑相关的选项。 |
| `fancymenu.elements.tooltip.nine_slice.border.top` | 缺失 | 上边框大小 [像素] |
| `fancymenu.elements.tooltip.nine_slice.border.right` | 缺失 | 右边框大小 [像素] |
| `fancymenu.elements.tooltip.nine_slice.border.bottom` | 缺失 | 下边框大小 [像素] |
| `fancymenu.elements.tooltip.nine_slice.border.left` | 缺失 | 左边框大小 [像素] |
| `fancymenu.elements.tooltip.mouse_following` | 缺失 | 跟随鼠标：%s |
| `fancymenu.elements.tooltip.mouse_following.desc` | 缺失 | 在编辑器外时，提示框是否应当跟随鼠标。 |
| `fancymenu.placeholders.text_char_count` | 缺失 | 文本字符数 |
| `fancymenu.placeholders.text_char_count.desc` | 缺失 | 返回给定文本的字符数量。 |
| `fancymenu.placeholders.text_width` | 缺失 | 文本宽度 |
| `fancymenu.placeholders.text_width.desc` | 缺失 | 返回给定文本的像素宽度。<br>适合根据文本宽度来计算元素位置或大小。 |
| `fancymenu.placeholders.clipboard_content` | 缺失 | 剪贴板内容 |
| `fancymenu.placeholders.clipboard_content.desc` | 缺失 | 返回系统剪贴板当前的文本内容，<br>如果剪贴板里什么都没有，就返回空文本。 |
| `fancymenu.placeholders.categories.scoreboard` | 缺失 | 计分板 |
| `fancymenu.placeholders.world.players_list` | 缺失 | 世界玩家列表 |
| `fancymenu.placeholders.world.players_list.desc` | 缺失 | 返回当前世界中所有玩家的列表。<br>玩家名称按字母顺序排序。<br><br>可选值：<br>- separator：用于分隔玩家名称的文本（默认：', '） |
| `fancymenu.placeholders.replace_text` | 缺失 | 替换文本 |
| `fancymenu.placeholders.replace_text.desc` | 缺失 | 使用字面文本或正则表达式（regex）替换字符串中的文本。<br>支持单次替换和全部替换。<br><br>必填值：<br>- text：要进行替换的输入文本<br>- search：要搜索的文本或正则模式<br><br>可选值：<br>- replacement：替换文本（默认：空字符串）<br>- use_regex：设为 'true' 时使用正则模式（默认：'false'）<br>- replace_all：设为 'true' 时替换所有匹配项，否则只替换第一次匹配（默认：'true'）<br><br>使用正则时，你可以用 $1、$2 之类的捕获组。 |
| `fancymenu.placeholders.nbt_data_get` | 缺失 | 获取 NBT 数据 |
| `fancymenu.placeholders.nbt_data_get.desc` | 缺失 | 获取实体和方块的 NBT 数据（类似“/data get”命令）。<br>返回指定 NBT 路径上的值。<br><br>§l提示：§r在游戏里直接使用“/data get”命令，<br>不填路径，就能轻松查看实体或方块的所有可用 NBT 路径！<br><br>必填值：<br>- source_type：数据源类型（'entity' 或 'block'）<br>- nbt_path：要查询的 NBT 路径（例如 'foodLevel'、'Pos[0]'、'Inventory[0].id'）<br><br>条件值：<br>- entity_selector：当 source_type 为 'entity' 时使用实体选择器<br>  支持：@s（自己）、@p（最近的玩家）、@e（最近的实体）、<br>  UUID，或实体名称<br>- block_pos：当 source_type 为 'block' 时使用方块坐标<br>  格式：'x y z'（例如 '100 64 -200'）<br><br>可选值：<br>- scale：数值缩放因子（默认：1.0）<br>- return_type：返回数据的方式（默认：'value'）<br>  选项：'value'（数值/大小）、'string'（文本值）、<br>  'snbt'（格式化 NBT）、'json'（JSON 格式）<br><br>如果数据无法访问或路径无效，则返回空字符串。 |
| `fancymenu.placeholders.file_text` | 缺失 | 文件文本 |
| `fancymenu.placeholders.file_text.desc` | 缺失 | 从本地文件或远程 URL 读取文本并返回。<br>支持读取全部内容或只读取最后几行。<br><br>内容会被缓存以提升性能：<br>- 本地文件：每 1 秒重新读取一次<br>- URL：每 10 秒重新读取一次<br><br>必填值：<br>- path_or_url：要读取的文件路径或 URL<br>  本地文件：使用相对路径（例如 'config/myfile.txt'）<br>  远程文件：使用 HTTP/HTTPS URL（例如 'https://example.com/data.txt'）<br>  <br><br>可选值：<br>- mode：读取内容的方式（默认：'all'）<br>  选项：'all'（全部内容）、'last'（最后 X 行）<br>- separator：拼接行与行之间的文本（默认：'\n'）<br>  常见选项：'\n'（换行）、' &#124; '、', '、' '<br>- last_lines：在 'last' 模式下返回的行数（默认：1）<br>  仅在 mode 为 'last' 时使用<br><br>注意：当 mode 为 'last' 且 last_lines 设为 1 时，<br>会直接返回单行内容，不带任何分隔符。<br><br>如果源还没缓存、源不存在、<br>无法读取，或者 URL 没有网络连接，则返回空字符串。 |
| `fancymenu.scroll_screen_normalizer` | 缺失 | 显示当前界面的滚动区域内容：%s |
| `fancymenu.scroll_screen_normalizer.desc` | 缺失 | 如果当前界面包含滚动区域，这个功能会尝试从中提取按钮和滑块。<br><br>这对于让选项界面之类的内容可自定义很有用。 |
| `fancymenu.placeholders.uppercase_text` | 缺失 | 大写文本 |
| `fancymenu.placeholders.uppercase_text.desc` | 缺失 | 把输入文本转换成大写字母。<br><br>示例：<br>输入：Hello World<br>输出：HELLO WORLD |
| `fancymenu.placeholders.lowercase_text` | 缺失 | 小写文本 |
| `fancymenu.placeholders.lowercase_text.desc` | 缺失 | 把输入文本转换成小写字母。<br><br>示例：<br>输入：HELLO WORLD<br>输出：hello world |
| `fancymenu.elements.checkbox` | 缺失 | 复选框 |
| `fancymenu.elements.checkbox.desc` | 缺失 | 一个可点击的复选框，切换时可以执行操作。<br><br>在它的操作和显示条件里使用 '$$value' 占位符，<br>就能获取当前复选框状态（true/false）。 |
| `fancymenu.elements.checkbox.textures` | 缺失 | 纹理 |
| `fancymenu.elements.checkbox.background_texture_normal` | 缺失 | 普通背景纹理 |
| `fancymenu.elements.checkbox.background_texture_normal.desc` | 缺失 | 普通状态下的背景纹理。默认纹理为 20x20 像素。 |
| `fancymenu.elements.checkbox.background_texture_hover` | 缺失 | 悬停背景纹理 |
| `fancymenu.elements.checkbox.background_texture_hover.desc` | 缺失 | 悬停时的背景纹理。默认纹理为 20x20 像素。 |
| `fancymenu.elements.checkbox.background_texture_inactive` | 缺失 | 未激活背景纹理 |
| `fancymenu.elements.checkbox.background_texture_inactive.desc` | 缺失 | 未激活时的背景纹理。默认纹理为 20x20 像素。 |
| `fancymenu.elements.checkbox.checkmark_texture` | 缺失 | 勾选标记纹理 |
| `fancymenu.elements.checkbox.checkmark_texture.desc` | 缺失 | 复选框被勾选时显示的纹理。<br>留空则使用默认勾选标记。<br><br>默认勾选标记纹理为 20x20 像素。 |
| `fancymenu.settings.caching.placeholders.set` | 缺失 | 占位符缓存时长 [毫秒] |
| `fancymenu.settings.caching.placeholders.set.desc` | 缺失 | FancyMenu 应该缓存占位符替换文本的时长，<br>单位为毫秒，这样可以降低性能开销。<br><br>设为 0 会禁用缓存。<br><br>§l§x在复杂配置和操作脚本中，缓存可能会导致意料之外的行为！ |
| `fancymenu.settings.caching.requirements.set` | 缺失 | 条件缓存时长 [毫秒] |
| `fancymenu.settings.caching.requirements.set.desc` | 缺失 | FancyMenu 应该缓存条件状态的时长，<br>单位为毫秒，这样可以降低性能开销。<br><br>设为 0 会禁用缓存。<br><br>§l§x在复杂配置和操作脚本中，缓存可能会导致意料之外的行为！ |
| `fancymenu.actions.send_http_request` | 缺失 | 发送 HTTP 请求 |
| `fancymenu.actions.send_http_request.desc` | 缺失 | 向一个网页目标发送带可配置参数的 HTTP 请求。<br><br>这个操作可用于向 REST API、webhook，或任何 HTTP 端点发送数据。<br>支持多种认证方式、自定义请求头和不同的请求类型。 |
| `fancymenu.actions.send_http_request.edit_value` | 缺失 | 编辑 HTTP 请求配置 |
| `fancymenu.actions.send_http_request.edit.url` | 缺失 | 目标 URL |
| `fancymenu.actions.send_http_request.edit.method` | 缺失 | 请求方法：%s |
| `fancymenu.actions.send_http_request.edit.method.title` | 缺失 | 请求方法 |
| `fancymenu.actions.send_http_request.edit.content_type` | 缺失 | 内容类型 |
| `fancymenu.actions.send_http_request.edit.body` | 缺失 | 请求正文 |
| `fancymenu.actions.send_http_request.edit.timeout` | 缺失 | 超时（秒） |
| `fancymenu.actions.send_http_request.edit.log_response` | 缺失 | 记录响应：%s |
| `fancymenu.actions.send_http_request.edit.auth_type` | 缺失 | 认证类型：%s |
| `fancymenu.actions.send_http_request.edit.auth_type.title` | 缺失 | 认证类型 |
| `fancymenu.actions.send_http_request.auth.none` | 缺失 | 无 |
| `fancymenu.actions.send_http_request.auth.basic` | 缺失 | 基础认证 |
| `fancymenu.actions.send_http_request.auth.bearer` | 缺失 | Bearer 令牌 |
| `fancymenu.actions.send_http_request.auth.api_key` | 缺失 | API 密钥 |
| `fancymenu.actions.send_http_request.edit.auth_username` | 缺失 | 用户名 |
| `fancymenu.actions.send_http_request.edit.auth_password` | 缺失 | 密码 |
| `fancymenu.actions.send_http_request.edit.auth_token` | 缺失 | Bearer 令牌 |
| `fancymenu.actions.send_http_request.edit.auth_api_key_header` | 缺失 | API 密钥请求头名 |
| `fancymenu.actions.send_http_request.edit.auth_api_key` | 缺失 | API 密钥值 |
| `fancymenu.actions.send_http_request.edit.headers` | 缺失 | 自定义请求头 |
| `fancymenu.actions.send_http_request.edit.add_header` | 缺失 | 添加请求头 |
| `fancymenu.actions.send_http_request.edit.remove_header` | 缺失 | 移除 |
| `fancymenu.actions.send_http_request.edit.header_key` | 缺失 | 请求头键 |
| `fancymenu.actions.send_http_request.edit.header_value` | 缺失 | 请求头值 |
| `fancymenu.actions.send_http_request.edit.response_variable` | 缺失 | 响应变量名（可选） |
| `fancymenu.actions.send_http_request.edit.response_variable.desc` | 缺失 | 用于保存响应内容的 FancyMenu 变量名称。<br><br>§x此操作异步执行，<br>§x触发操作后，变量值不会立即更新。 |
| `fancymenu.actions.send_http_request.edit.single_line_response` | 缺失 | 将响应以单行形式存入变量：%s |
| `fancymenu.placeholders.world.level_save_names` | 缺失 | 世界存档名称 |
| `fancymenu.placeholders.world.level_save_names.desc` | 缺失 | 返回所有可用本地世界存档名称的列表。<br><br>值：<br>§eseparator§r = 世界名称之间的分隔文本。默认是 ', '。 |
| `fancymenu.placeholders.world.level_save_data` | 缺失 | 世界存档数据 |
| `fancymenu.placeholders.world.level_save_data.desc` | 缺失 | 以单行 JSON 的形式返回某个指定世界存档的完整关卡数据。<br><br>值：<br>§elevel_name§r = 要获取数据的世界存档的准确名称。 |
| `fancymenu.elements.image.restart_animated_on_menu_load` | 缺失 | 打开界面时重启动画纹理：%s |
| `fancymenu.elements.video_mcef` | 缺失 | 视频 [MCEF] |
| `fancymenu.elements.video_mcef.desc` | 缺失 | 由 MCEF 驱动的视频播放器。<br>§x此元素需要 MCEF 模组才能使用！ |
| `fancymenu.elements.video_mcef.set_source` | 缺失 | 视频来源 |
| `fancymenu.elements.video_mcef.loop` | 缺失 | 循环视频：%s |
| `fancymenu.elements.video_mcef.sound_channel` | 缺失 | 声音类别：%s |
| `fancymenu.elements.video_mcef.volume` | 缺失 | 音量 |
| `fancymenu.backgrounds.video_mcef` | 缺失 | 视频 [MCEF] |
| `fancymenu.backgrounds.video_mcef.desc` | 缺失 | 将视频文件作为菜单背景播放。<br>§x此背景需要 MCEF 模组才能使用！ |
| `fancymenu.backgrounds.video_mcef.configure` | 缺失 | 配置视频背景 |
| `fancymenu.backgrounds.video_mcef.configure.no_video` | 缺失 | §x请先选择视频！ |
| `fancymenu.placeholders.player_team` | 缺失 | 计分板玩家队伍 |
| `fancymenu.placeholders.player_team.desc` | 缺失 | 返回指定玩家当前所在的队伍。<br>玩家没有队伍时返回空值。 |
| `fancymenu.placeholders.scoreboard.score` | 缺失 | 计分板分数 |
| `fancymenu.placeholders.scoreboard.score.desc` | 缺失 | 返回玩家在指定记分项中的分数。<br>玩家在该记分项中没有分数时返回空值。<br><br>必填值：<br>- player：要查询的玩家名称<br>- objective：要获取分数的记分项名称 |
| `fancymenu.placeholders.scoreboard.objectives_list` | 缺失 | 计分板记分项列表 |
| `fancymenu.placeholders.scoreboard.objectives_list.desc` | 缺失 | 返回计分板中全部记分项的列表。<br>记分项名称之间使用指定的分隔文本。<br><br>可选值：<br>- separator：记分项之间的分隔文本（默认：', '） |
| `fancymenu.placeholders.scoreboard.tracked_players` | 缺失 | 计分板记录的玩家 |
| `fancymenu.placeholders.scoreboard.tracked_players.desc` | 缺失 | 返回计分板记录的全部玩家。<br>在任意记分项中有分数的玩家都会列出。<br><br>可选值：<br>- separator：玩家名称之间的分隔文本（默认：', '） |
| `fancymenu.placeholders.scoreboard.display_slot` | 缺失 | 计分板显示位置 |
| `fancymenu.placeholders.scoreboard.display_slot.desc` | 缺失 | 返回指定显示位置上的记分项名称。<br>该位置未分配记分项时返回空值。<br><br>必填值：<br>- slot：要查询的显示位置<br>  有效值：sidebar、list、below_name，或队伍颜色对应的位置<br>  （例如 sidebar.team.red、sidebar.team.blue） |
| `fancymenu.placeholders.scoreboard.has_score` | 缺失 | 计分板是否有分数 |
| `fancymenu.placeholders.scoreboard.has_score.desc` | 缺失 | 检查玩家在指定记分项中是否有分数。<br>有分数时返回 'true'，否则返回 'false'。<br><br>必填值：<br>- player：要检查的玩家名称<br>- objective：要检查的记分项名称 |
| `fancymenu.placeholders.scoreboard.objective_display_name` | 缺失 | 记分项显示名称 |
| `fancymenu.placeholders.scoreboard.objective_display_name.desc` | 缺失 | 返回记分项的显示名称。<br>可返回纯文本，或用于高级格式的 JSON。<br><br>必填值：<br>- objective：记分项名称<br><br>可选值：<br>- as_json：设为 'true' 时返回 JSON 格式（默认：'false'） |
| `fancymenu.placeholders.scoreboard.objective_criteria` | 缺失 | 记分项准则 |
| `fancymenu.placeholders.scoreboard.objective_criteria.desc` | 缺失 | 返回记分项的准则类型。<br>常用准则：dummy、trigger、deathCount、playerKillCount、<br>totalKillCount、health、food、air、armor、xp、level 等。<br><br>必填值：<br>- objective：要查询的记分项名称 |
| `fancymenu.placeholders.scoreboard.objective_render_type` | 缺失 | 记分项显示类型 |
| `fancymenu.placeholders.scoreboard.objective_render_type.desc` | 缺失 | 返回记分项分数的显示方式。<br>可能的值：'integer'（普通数字）或 'hearts'（爱心图标）。<br><br>必填值：<br>- objective：要查询的记分项名称 |
| `fancymenu.placeholders.scoreboard.player_scores_list` | 缺失 | 玩家分数列表 |
| `fancymenu.placeholders.scoreboard.player_scores_list.desc` | 缺失 | 返回指定玩家全部分数的格式化列表。<br>可在格式中使用 %%objective%% 和 %%score%% 自定义输出。<br><br>必填值：<br>- player：要列出分数的玩家名称<br><br>可选值：<br>- separator：分数条目之间的分隔文本（默认：', '）<br>- format：每个条目的格式（默认：'%%objective%%: %%score%%'） |
| `fancymenu.placeholders.scoreboard.objective_count` | 缺失 | 记分项数量 |
| `fancymenu.placeholders.scoreboard.objective_count.desc` | 缺失 | 返回计分板中的记分项总数。<br>没有记分项时返回 '0'。 |
| `fancymenu.placeholders.player_has_tag` | 缺失 | 玩家是否有标签 |
| `fancymenu.placeholders.player_has_tag.desc` | 缺失 | 检查指定玩家是否有指定标签，返回 'true' 或 'false'。<br><br>这里指通过 '/tag' 命令添加的标签。 |
| `fancymenu.placeholders.player_tags_list` | 缺失 | 玩家标签列表 |
| `fancymenu.placeholders.player_tags_list.desc` | 缺失 | 返回指定玩家的全部标签，并用指定文本分隔。<br><br>这里指通过 '/tag' 命令添加的标签。 |
| `fancymenu.customization.items.text.markdown.tables` | 缺失 | 表格 |
| `fancymenu.customization.items.text.markdown.tables.desc` | 缺失 | 自定义 Markdown 表格的外观。 |
| `fancymenu.customization.items.text.markdown.tables.show_header` | 缺失 | 显示表头：%s |
| `fancymenu.customization.items.text.markdown.tables.alternate_row_colors` | 缺失 | 交替行颜色：%s |
| `fancymenu.customization.items.text.markdown.tables.line_color` | 缺失 | 表格线颜色 |
| `fancymenu.customization.items.text.markdown.tables.header_background_color` | 缺失 | 表头背景色 |
| `fancymenu.customization.items.text.markdown.tables.row_background_color` | 缺失 | 行背景色 |
| `fancymenu.customization.items.text.markdown.tables.alternate_row_color` | 缺失 | 交替行颜色 |
| `fancymenu.customization.items.text.markdown.tables.alternate_row_color.desc` | 缺失 | 启用“交替行颜色”时，每隔一行使用的颜色。 |
| `fancymenu.customization.items.text.markdown.tables.line_thickness` | 缺失 | 线条粗细 |
| `fancymenu.customization.items.text.markdown.tables.cell_padding` | 缺失 | 单元格内边距 |
| `fancymenu.customization.items.text.markdown.tables.cell_padding.desc` | 缺失 | 单元格内部的留白。<br>增大此值会增加内容与单元格边框之间的距离。 |
| `fancymenu.customization.items.text.markdown.tables.margin` | 缺失 | 表格外边距 |
| `fancymenu.customization.items.text.markdown.tables.margin.desc` | 缺失 | 表格周围的留白。<br>在每个表格上方和下方添加间距。 |
| `fancymenu.editor.elements.checkbox.manage_actions.desc` | 缺失 | 切换复选框状态时执行操作。<br><br>可在操作中使用 '$$value' 占位符<br>获取当前复选框状态（true/false）。 |
| `fancymenu.requirements.is_mcef_loaded` | 缺失 | MCEF 是否已加载 |
| `fancymenu.requirements.is_mcef_loaded.desc` | 缺失 | 检查 MCEF 模组是否已加载。<br><br>浏览器元素，以及视频元素、视频菜单背景等<br>全部视频相关功能都需要此模组。 |
| `fancymenu.background.image.restart_animated_on_menu_load` | 缺失 | 打开界面时重播纹理动画：%s |
| `fancymenu.editor.custombutton.config.actiontype.disconnect.desc` | 离开世界或服务器，<br>并设置随后打开的幕布。 | 离开世界或服务器，<br>并设置随后打开的界面。 |
| `fancymenu.editor.custombutton.config.actiontype.disconnect.desc.value` | 将要打开的幕布ID | 将要打开的界面ID |
| `fancymenu.editor.custombutton.config.actiontype.opengui` | 打开幕布或自定义GUI | 打开界面或自定义GUI |
| `fancymenu.editor.custombutton.config.actiontype.opengui.desc` | 通过ID打开幕布。<br><br>支持原版幕布/模组幕布/FancyMenu<br>自定义GUI。 | 通过ID打开界面。<br><br>支持原版界面/模组界面/FancyMenu<br>自定义GUI。 |
| `fancymenu.editor.custombutton.config.actiontype.opengui.desc.value` | 幕布ID | 界面ID |
| `fancymenu.editor.custombutton.config.actiontype.closegui` | 关闭幕布 | 关闭界面 |
| `fancymenu.editor.custombutton.config.actiontype.closegui.desc` | 关闭已打开的幕布。<br>如果不位于世界中，则打开标题画面。 | 关闭已打开的界面。<br>如果不位于世界中，则打开标题画面。 |
| `fancymenu.editor.items.splash.refresh.on` | 幕布加载时刷新：§y已启用 | 界面加载时刷新：§y已启用 |
| `fancymenu.editor.items.splash.refresh.off` | 幕布加载时刷新：§x已禁用 | 界面加载时刷新：§x已禁用 |
| `fancymenu.editor.items.splash.refresh.desc` | 每当幕布重载或启动时刷新闪烁标语。 | 每当界面重载或启动时刷新闪烁标语。 |
| `fancymenu.fancymenu.editor.layoutoptions.randommode.btn.desc` | 将此布局添加到组中，以便在打开幕布时<br>随机选择该组的布局之一。<br><br>可用于随机化背景和其他元素。 | 将此布局添加到组中，以便在打开界面时<br>随机选择该组的布局之一。<br><br>可用于随机化背景和其他元素。 |
| `fancymenu.fancymenu.editor.layoutoptions.randommode.setgroup.btn.desc` | 设置此布局的组。<br>打开幕布时，每组会选择一个布局。 | 设置此布局的组。<br>打开界面时，每组会选择一个布局。 |
| `fancymenu.fancymenu.editor.layoutoptions.randommode.onlyfirsttime.btn.desc` | 是否每当幕布打开时随机选择该组布局，<br>或仅在首次打开时选择布局。 | 是否每当界面打开时随机选择该组布局，<br>或仅在首次打开时选择布局。 |
| `fancymenu.helper.editor.items.buttons.buttonbackground.slider.highlighted.desc` | 高亮背景用于在幕布中通过<br>方向键/TAB键聚焦滑块。 | 高亮背景用于在界面中通过<br>方向键/TAB键聚焦滑块。 |
| `fancymenu.helper.editor.properties.scale.btn.desc` | 强制此幕布的GUI缩放比例。<br><br>§x仅覆盖目标幕布的比例，而不是所有幕布！ | 强制此界面的GUI缩放比例。<br><br>§x仅覆盖目标界面的比例，而不是所有界面！ |
| `fancymenu.helper.editor.properties.autoscale.btn.desc` | 让FancyMenu处理幕布缩放比例，让您<br>的布局适用于各种缩放比例和分辨率。<br><br>为此，请调整窗口尺寸，直到一切看<br>起来都不错，并且元素彼此之间距离<br>不太远，然后单击此按钮。<br><br>§x这将使文本在某些比例下看起来模糊。<br>§x这是无法修复的，最好的解决方法是<br>§x使用带有背景的图片作为文本元素。 | 让FancyMenu处理界面缩放比例，让您<br>的布局适用于各种缩放比例和分辨率。<br><br>为此，请调整窗口尺寸，直到一切看<br>起来都不错，并且元素彼此之间距离<br>不太远，然后单击此按钮。<br><br>§x这将使文本在某些比例下看起来模糊。<br>§x这是无法修复的，最好的解决方法是<br>§x使用带有背景的图片作为文本元素。 |
| `fancymenu.fancymenu.editor.dynamicvariabletextfield.variables.vanillabuttonlabel.desc` | 获取原版组件/按钮的标签/文本。<br><br>将“some.menu.identifier:505280”替换为目标组件定位符。<br><br>组件定位符指向特定幕布中的特定组件。<br><br>§x您可以右击编辑器中的组件来复制其定位符。 | 获取原版组件/按钮的标签/文本。<br><br>将“some.menu.identifier:505280”替换为目标组件定位符。<br><br>组件定位符指向特定界面中的特定组件。<br><br>§x您可以右击编辑器中的组件来复制其定位符。 |
| `fancymenu.helper.editor.layoutoptions.universal_layout.options.input_menu_identifier` | 输入幕布ID | 输入界面ID |
| `fancymenu.helper.editor.layoutoptions.universal_layout.options.choose_menu_identifier` | 选择幕布ID | 选择界面ID |
| `fancymenu.helper.editor.layoutoptions.universal_layout.options.add_blacklist` | 将幕布加入黑名单 | 将界面加入黑名单 |
| `fancymenu.helper.editor.layoutoptions.universal_layout.options.add_blacklist.desc` | 通过§l幕布ID§r将其添加到黑名单。<br><br>§x布局将忽略黑名单中的幕布，它们<br>§x不会被自定义影响。<br><br>§x您可以在幕布中通过点击§l“自定义”<br>§x§l->“复制当前幕布ID”§r§x来获取ID。 | 通过§l界面ID§r将其添加到黑名单。<br><br>§x布局将忽略黑名单中的界面，它们<br>§x不会被自定义影响。<br><br>§x您可以在界面中通过点击§l“自定义”<br>§x§l->“复制当前界面ID”§r§x来获取ID。 |
| `fancymenu.helper.editor.layoutoptions.universal_layout.options.remove_blacklist` | 将幕布移出黑名单 | 将界面移出黑名单 |
| `fancymenu.helper.editor.layoutoptions.universal_layout.options.add_whitelist` | 将幕布加入白名单 | 将界面加入白名单 |
| `fancymenu.helper.editor.layoutoptions.universal_layout.options.add_whitelist.desc` | 通过§l幕布ID§r将其添加到黑名单。<br><br>§x仅白名单中的幕布会被布局自定义<br>§x影响。其他幕布将被忽略。<br><br>§x您可以在幕布中通过点击§l“自定义”<br>§x§l->“复制当前幕布ID”§r§x来获取ID。 | 通过§l界面ID§r将其添加到白名单。<br><br>§x仅白名单中的界面会被布局自定义<br>§x影响。其他界面将被忽略。<br><br>§x您可以在界面中通过点击§l“自定义”<br>§x§l->“复制当前界面ID”§r§x来获取ID。 |
| `fancymenu.helper.editor.layoutoptions.universal_layout.options.remove_whitelist` | 将幕布移出白名单 | 将界面移出白名单 |
| `fancymenu.helper.editor.items.vanilla_button.copy_locator.desc` | 组件定位符指向特定幕布上的特定组件。<br><br>§z组件定位符可用于“模仿按钮”等操作。 | 组件定位符指向特定界面上的特定组件。<br><br>§z组件定位符可用于“模仿按钮”等操作。 |
| `fancymenu.helper.editor.edit_menu_title` | 自定义幕布标题 | 自定义界面标题 |
| `fancymenu.helper.editor.edit_menu_title.desc` | 允许您使用自定义文本覆盖某些幕布顶部的文本。<br><br>§x此选项对某些幕布可能无效。 | 允许您使用自定义文本覆盖某些界面顶部的文本。<br><br>§x此选项对某些界面可能无效。 |
| `fancymenu.fancymenu.editor.dynamicvariabletextfield.variables.guiwidth` | 幕布宽度 | 界面宽度 |
| `fancymenu.fancymenu.editor.dynamicvariabletextfield.variables.guiwidth.desc` | 当前幕布宽度。 | 当前界面宽度。 |
| `fancymenu.fancymenu.editor.dynamicvariabletextfield.variables.guiheight` | 幕布高度 | 界面高度 |
| `fancymenu.fancymenu.editor.dynamicvariabletextfield.variables.guiheight.desc` | 当前幕布高度。 | 当前界面高度。 |
| `fancymenu.customization.items.ticker.desc` | 允许您在每个游戏刻执行操作。<br><br>支持异步计时和游戏刻延迟。<br><br>支持每次打开幕布时仅执行一次操作。<br><br>§x该元素仅在编辑器中可见。 | 允许您在每个游戏刻执行操作。<br><br>支持异步计时和游戏刻延迟。<br><br>支持每次打开界面时仅执行一次操作。<br><br>§x该元素仅在编辑器中可见。 |
| `fancymenu.customization.items.ticker.tick_mode.on_menu_load` | 计时模式：§z加载幕布时 | 计时模式：§z加载界面时 |
| `fancymenu.customization.items.ticker.tick_mode.desc` | §l普通：§r每个游戏刻都进行计时。<br><br>§l会话：§r每个游戏会话仅计数一次。<br><br>§l加载幕布时：§r每次加载幕布时计数一次。注意，调整游戏窗口尺寸<br>时也将重载幕布。 | §l普通：§r每个游戏刻都进行计时。<br><br>§l会话：§r每个游戏会话仅计数一次。<br><br>§l加载界面时：§r每次加载界面时计数一次。注意，调整游戏窗口尺寸<br>时也将重载界面。 |
| `fancymenu.element.anchor_point.mid_centered` | 幕布中心 | 界面中心 |
| `fancymenu.background.animation.configure.restart_on_load.on` | 幕布加载时重播动画：§y已启用 | 界面加载时重播动画：§y已启用 |
| `fancymenu.background.animation.configure.restart_on_load.off` | 幕布加载时重播动画：§x已禁用 | 界面加载时重播动画：§x已禁用 |
| `fancymenu.menu_background.choose` | 选择幕布背景 | 选择界面背景 |
| `fancymenu.editor.open_audio` | 幕布打开音频 | 界面打开音频 |
| `fancymenu.editor.open_audio.desc` | 打开幕布时播放音频。 | 打开界面时播放音频。 |
| `fancymenu.editor.close_audio` | 幕布关闭音频 | 界面关闭音频 |
| `fancymenu.editor.close_audio.desc` | 关闭幕布时播放音频。 | 关闭界面时播放音频。 |
| `fancymenu.elements.vanilla_button.copyright.unable_to_move` | §c您无法将版权按钮移出幕布！ | §c您无法将版权按钮移出界面！ |
| `fancymenu.overlay.menu_bar.customization.current_customization` | 当前幕布自定义：%s | 当前界面自定义：%s |
| `fancymenu.overlay.menu_bar.customization.copy_current_screen_identifier` | 复制当前幕布ID | 复制当前界面ID |
| `fancymenu.overlay.menu_bar.customization.copy_current_screen_identifier.desc` | 自定义系统中多处用到幕布ID。<br>它用于准确获取幕布中的布局，并且是按钮<br>定位符的一部分。 | 自定义系统中多处用到界面ID。<br>它用于准确获取界面中的布局，并且是按钮<br>定位符的一部分。 |
| `fancymenu.overlay.menu_bar.customization.close_current_screen` | 强制关闭当前幕布 | 强制关闭当前界面 |
| `fancymenu.overlay.menu_bar.customization.settings.play_menu_music` | 在幕布中播放原版音乐：%s | 在界面中播放原版音乐：%s |
| `fancymenu.overlay.menu_bar.customization.settings.singleplayer_screen.world_icons` | 单人游戏幕布世界图标：%s | 单人游戏界面世界图标：%s |
| `fancymenu.overlay.menu_bar.customization.settings.multiplayer_screen.server_icons` | 多人游戏幕布世界图标：%s | 多人游戏界面服务器图标：%s |
| `fancymenu.overlay.menu_bar.customization.custom_guis.desc` | 自定义GUI完全是自制菜单，允许您向<br>游戏添加新幕布，而无需自定义现有幕<br>布。<br>您只需通过操作就能打开自定义幕布。<br><br>§x您也可以使用自定义GUI来覆盖现有原<br>§x版/模组幕布。除非仅通过普通布局无<br>§x法编辑GUI，否则不建议这么做。 | 自定义GUI完全是自制菜单，允许您向<br>游戏添加新界面，而无需自定义现有界面。<br>您只需通过操作就能打开自定义界面。<br><br>§x您也可以使用自定义GUI来覆盖现有原<br>§x版/模组界面。除非仅通过普通布局无<br>§x法编辑GUI，否则不建议这么做。 |
| `fancymenu.overlay.menu_bar.customization.custom_guis.override_current.disabled.tooltip` | §x您需要启用高级自定义模式才能覆盖幕布。 | §x您需要启用高级自定义模式才能覆盖界面。 |
| `fancymenu.overlay.menu_bar.customization.disable_customization_for_all` | 禁用所有幕布自定义 | 禁用所有界面自定义 |
| `fancymenu.overlay.menu_bar.customization.disable_customization_for_all.tooltip` | 这将禁用所有幕布的自定义功能！<br>该操作无法撤销！ | 这将禁用所有界面的自定义功能！<br>该操作无法撤销！ |
| `fancymenu.overlay.menu_bar.customization.disable_customization_for_all.confirm` | §x您确定吗？<br><br>这将禁用所有幕布的自定义功能！<br><br>您想立刻禁用所有幕布的自定义功能吗？ | §x您确定吗？<br><br>这将禁用所有界面的自定义功能！<br><br>您想立刻禁用所有界面的自定义功能吗？ |
| `fancymenu.overlay.menu_bar.customization.layout.new.current` | 对当前幕布 | 对当前界面 |
| `fancymenu.overlay.menu_bar.customization.layout.new.current.disabled.tooltip` | 您需要先启用当前幕布的自定义功能。 | 您需要先启用当前界面的自定义功能。 |
| `fancymenu.overlay.menu_bar.customization.layout.new.universal` | 对所有幕布 [通用] | 对所有界面 [通用] |
| `fancymenu.overlay.menu_bar.customization.layout.manage.current` | 当前幕布布局 | 当前界面布局 |
| `fancymenu.overlay.menu_bar.customization.layout.manage.current.disabled.tooltip` | 您需要先启用当前幕布的自定义功能。 | 您需要先启用当前界面的自定义功能。 |
| `fancymenu.overlay.menu_bar.tools.dummy_screen_instances` | 虚拟幕布实例 | 虚拟界面实例 |
| `fancymenu.overlay.menu_bar.tools.dummy_screen_instances.desc` | 幕布虚拟实例可用于编辑通常会很快关闭<br>的幕布，否则编辑它们的正常实例可能会<br>导致问题。<br><br>您可以通过“自定义”选项卡中的“强制关闭<br>当前幕布”选项来强制关闭虚拟幕布。 | 界面虚拟实例可用于编辑通常会很快关闭<br>的界面，否则编辑它们的正常实例可能会<br>导致问题。<br><br>您可以通过“自定义”选项卡中的“强制关闭<br>当前界面”选项来强制关闭虚拟界面。 |
| `fancymenu.overlay.menu_bar.tools.level_loading_screen` | 世界加载幕布 | 世界加载界面 |
| `fancymenu.overlay.menu_bar.tools.dirt_message_screen` | 泥土信息幕布 | 泥土信息界面 |
| `fancymenu.overlay.menu_bar.tools.dirt_message_screen.desc` | 每当您看到带有泥土背景的简单消息时使用。<br>连接到单人/多人世界时也将使用（除了其他幕布）。 | 每当您看到带有泥土背景的简单消息时使用。<br>连接到单人/多人世界时也将使用（除了其他界面）。 |
| `fancymenu.overlay.menu_bar.tools.progress_screen` | 进度幕布 | 进度界面 |
| `fancymenu.overlay.menu_bar.tools.connect_screen` | 连接幕布 | 连接界面 |
| `fancymenu.overlay.menu_bar.tools.dummy_screen_instances.receiving_level_screen` | 接收世界幕布 | 接收世界界面 |
| `fancymenu.overlay.menu_bar.user_interface` | UI | FancyMenu 界面 |
| `fancymenu.elements.element.stay_on_screen` | 停留于幕布：%s | 保持在屏幕内：%s |
| `fancymenu.elements.element.stay_on_screen.tooltip` | 防止调整窗口尺寸或更改GUI缩放比例时<br>元素超出幕布可见区域。 | 防止调整窗口尺寸或更改GUI缩放比例时<br>元素超出界面可见区域。 |
| `fancymenu.commmands.openguiscreen.unable_to_open_gui` | 无法打开幕布：%s | 无法打开界面：%s |
| `fancymenu.customization.scroll_lists.desc` | 有些幕布具有页眉和页脚。<br>大多数情况下，这些幕布都是可以滚动的，例如<br>单人游戏幕布；但也有一些较新的幕布，例如创<br>建世界幕布，有一个选项卡标题。 | 有些界面具有页眉和页脚。<br>大多数情况下，这些界面都是可以滚动的，例如<br>单人游戏界面；但也有一些较新的界面，例如创<br>建世界界面，有一个选项卡标题。 |
| `fancymenu.editor.loading_requirements.is_menu_title` | 幕布标题？ | 界面标题？ |
| `fancymenu.editor.loading_requirements.is_menu_title.desc` | 检查指定幕布标题。<br>幕布标题是您可以在某些GUI（例如“选项”或“暂停”幕布）中看到的<br>GUI名称。 | 检查指定界面标题。<br>界面标题是您可以在某些GUI（例如“选项”或“暂停”界面）中看到的<br>GUI名称。 |
| `fancymenu.custom_guis.build.title` | 幕布标题（可选）： | 界面标题（可选）： |
| `fancymenu.custom_guis.override.confirm` | 您确定吗？<br><br>覆盖幕布可能会导致意外的游戏行为。<br>您现在真的想覆盖幕布吗？ | 您确定吗？<br><br>覆盖界面可能会导致意外的游戏行为。<br>您现在真的想覆盖界面吗？ |
| `fancymenu.custom_guis.manage_overridden` | 管理已覆盖幕布 | 管理已覆盖界面 |
| `fancymenu.custom_guis.manage_overridden.desc` | 移除原版/模组幕布的覆盖规则。 | 移除原版/模组界面的覆盖规则。 |
| `fancymenu.custom_guis.manage_overridden.screen` | 幕布：%s | 界面：%s |
| `fancymenu.placeholders.world_load_progress.desc` | 在进度幕布中反映世界加载进度。<br>可用于制作进度条等。 | 在进度界面中反映世界加载进度。<br>可用于制作进度条等。<br><br>返回0到100之间的整数百分比。 |
| `fancymenu.editor.auto_scaling.configure.width` | 最佳布局幕布宽度： | 最佳布局界面宽度： |
| `fancymenu.editor.auto_scaling.configure.height` | 最佳布局幕布高度： | 最佳布局界面高度： |
| `fancymenu.editor.auto_scaling.configure.current_screen_width` | 当前幕布宽度：%s | 当前界面宽度：%s |
| `fancymenu.editor.auto_scaling.configure.current_screen_height` | 当前幕布高度：%s | 当前界面高度：%s |
| `fancymenu.overlay.menu_bar.leave_current_menu.desc` | 强制关闭当前幕布并返回标题画面。<br>当您被困在幕布中而无法离开时非常有用。 | 强制关闭当前界面并返回标题画面。<br>当您被困在界面中而无法离开时非常有用。 |
| `fancymenu.actions.update_screen` | 刷新幕布 | 刷新界面 |
| `fancymenu.actions.update_screen.desc` | 刷新当前幕布。<br>如果您需要重建元素（例如图像、自定义按钮等），<br>或在更改GUI缩放比例或其他需要刷新幕布的选项后，<br>该功能非常有用。<br>这与调整窗口尺寸后的刷新效果基本相同。 | 刷新当前界面。<br>如果您需要重建元素（例如图像、自定义按钮等），<br>或在更改GUI缩放比例或其他需要刷新界面的选项后，<br>该功能非常有用。<br>这与调整窗口尺寸后的刷新效果基本相同。 |
| `fancymenu.placeholders.screen_identifier` | 幕布ID | 界面ID |
| `fancymenu.placeholders.screen_identifier.desc` | 获取活跃幕布ID | 获取活跃界面ID |
| `fancymenu.elements.audio.desc` | 音频元素允许您在幕布中播放音频文件。<br>每个元素支持多个音频！ | 音频元素允许您在界面中播放音频文件。<br>每个元素支持多个音频！ |
| `fancymenu.elements.audio.disable_vanilla_music` | 禁用幕布中的原版音乐 | 禁用界面中的原版音乐 |
| `fancymenu.elements.audio.disable_vanilla_music.desc` | 禁用幕布中的原版音乐。<br><br>当您§l不在§r编辑器中时，您可以在每个幕布顶部的<br>FancyMenu菜单栏中禁用幕布中播放的音乐。<br><br>要关闭它，请禁用§z“自定义->设置->在幕布中播放<br>原版音乐”§r。 | 禁用界面中的原版音乐。<br><br>当您§l不在§r编辑器中时，您可以在每个界面顶部的<br>FancyMenu菜单栏中禁用界面中播放的音乐。<br><br>要关闭它，请禁用§z“自定义->设置->在界面中播放<br>原版音乐”§r。 |
| `fancymenu.overlay.debug.toggle.desc` | 调试叠加层显示有关FancyMenu和当前幕布的<br>有用信息。<br>它还可以帮助性能优化。 | 调试叠加层显示有关FancyMenu和当前界面的<br>有用信息。<br>它还可以帮助性能优化。 |
| `fancymenu.overlay.debug.basic_screen_category` | 基本幕布类别：%s | 基本界面类别：%s |
| `fancymenu.overlay.debug.advanced_screen_category` | 高级幕布类别：%s | 高级界面类别：%s |
| `fancymenu.overlay.debug.screen_identifier` | §l当前幕布ID：§r%s§6（点击复制） | §l当前界面ID：§r%s§6（点击复制） |
| `fancymenu.overlay.debug.screen_size` | §l幕布尺寸：§r%1$sx%2$s（宽x高） | §l界面尺寸：§r%1$sx%2$s（宽x高） |
| `fancymenu.overlay.debug.screen_active_layout_count` | §l当前幕布已启用的布局数量：§r%1$s（含%2$s个通用布局） | §l当前界面已启用的布局数量：§r%1$s（含%2$s个通用布局） |
| `fancymenu.overlay.debug.screen_total_layout_count` | §l当前幕布布局总数：§r%1$s（含%2$s个通用布局） | §l当前界面布局总数：§r%1$s（含%2$s个通用布局） |
| `fancymenu.overlay.debug.screen_active_element_count` | §l当前幕布活跃元素数量：§r%s | §l当前界面活跃元素数量：§r%s |
| `fancymenu.placeholders.world.active_hotbar_slot` | Selected Hotbar Slot | 选中的快捷栏槽位 |
| `fancymenu.requirements.world.is_hotbar_slot_active` | Is Hotbar Slot Selected | 快捷栏槽位已选中 |
| `fancymenu.placeholders.world.current_player_oxygen` | Current Player Oxygen Level | 当前玩家氧气值 |
| `fancymenu.placeholders.world.current_player_oxygen.desc` | Returns the current oxygen level of the player.<br>Returns '0.0' when not in a world. | 返回玩家当前的氧气值。<br>如果不在世界里，则返回 '0.0'。 |
| `fancymenu.placeholders.world.max_player_oxygen` | Max Player Oxygen Level | 玩家最大氧气值 |
| `fancymenu.placeholders.world.max_player_oxygen.desc` | Returns the max oxygen level of the player.<br>Returns '0.0' when not in a world. | 返回玩家的最大氧气值。<br>如果不在世界中，则返回“0.0”。 |
| `fancymenu.placeholders.world.current_player_oxygen_percent` | Current Player Oxygen Level (Percent) | 当前玩家氧气值（百分比） |
| `fancymenu.placeholders.world.current_player_oxygen_percent.desc` | Returns the current oxygen level of the player in percent.<br>Returns '0' when not in a world.<br>Possible Values: 0-100 | 返回玩家当前的氧气值百分比。<br>如果不在世界里，则返回 '0'。<br>可能的值：0-100 |
| `fancymenu.commmands.layout.unable_to_set_state` | [FANCYMENU] Unable to set layout state of '%s'! Layout not found! | [FANCYMENU] 无法设置 '%s' 的布局状态！未找到布局！ |
| `fancymenu.commmands.layout.error` | [FANCYMENU] An error happened while trying to set layout state of '%s'! | [FANCYMENU] 尝试设置 '%s' 的布局状态时发生错误！ |
| `fancymenu.markdown.missing_local_image` | [本地图片缺失或不在配置/FANCYMENU/资产中] | [本地图片缺失或不在 config/fancymenu/assets 中] |
| `fancymenu.editor.elements.progress_bar.smoothing` | Smooth Filling Animation: %s | 平滑填充动画：%s |
| `fancymenu.editor.actions.execute_terminal_command.edit.desc.line2` | 该操作仅针对支持命令行的操作系统。 | 只有为当前操作系统设置了命令时，才会执行此操作。 |
| `fancymenu.requirements.world.is_inventory_slot_filled` | 物品栏槽位是否已满 | 物品栏槽位中是否有物品 |
| `fancymenu.elements.element.stay_on_screen.tooltip.disable_sticky` | §x你需要先禁用“粘性锚点”才能使用此功能！ | §x您需要先禁用“固定锚点”才能使用此功能！ |
| `fancymenu.elements.animation_controller.keyframe_manager.sticky` | 粘性锚点：%s | 固定锚点：%s |
| `fancymenu.helper.editor.element.vanilla.deepcustomization.titlescreen.logo` | Minecraft Logo | Minecraft 标志 |
| `fancymenu.customization.items.input_field.type.decimal` | 输入类型：§z仅十进制数 | 输入类型：§z仅小数 |
| `fancymenu.placeholders.world.world_day_time` | 世界白天时间 | 世界一天内的时间 |
| `fancymenu.placeholders.world.world_day_time.desc` | 当前世界的白天时间。<br>这是一天内的时间。<br>如果没有加载世界，将返回 '0'。 | 当前世界的一天内的时间。<br>这是一天内的时间。<br>如果没有加载世界，将返回 '0'。 |
| `fancymenu.placeholders.world.world_day_time_hour` | 世界白天时间（小时） | 世界一天内的时间（小时） |
| `fancymenu.placeholders.world.world_day_time_hour.desc` | 当前世界的白天时间（小时）。<br>这是一天内的时间。<br>如果没有加载世界，将返回 '0'。 | 当前世界的一天内的时间（小时）。<br>这是一天内的时间。<br>如果没有加载世界，将返回 '0'。 |
| `fancymenu.placeholders.world.world_day_time_minute` | 世界白天时间（分钟） | 世界一天内的时间（分钟） |
| `fancymenu.placeholders.world.world_day_time_minute.desc` | 当前小时内的世界白天时间（分钟）。<br>这是一天内的时间。<br>如果没有加载世界，将返回 '0'。 | 当前小时内的世界一天内的时间（分钟）。<br>这是一天内的时间。<br>如果没有加载世界，将返回 '0'。 |
| `fancymenu.placeholders.world.world_game_time.desc` | 当前世界的游戏时间。<br>这是游戏的总时间，而不是白天时间。<br>如果没有加载世界，将返回 '0'。 | 当前世界的游戏时间。<br>这是游戏的总时间，而不是一天内的时间。<br>如果没有加载世界，将返回 '0'。 |
| `fancymenu.helper.placeholder.random_number.desc` | 返回指定范围内的随机数。<br><br>每个游戏刻都将返回不同的数字，因此<br>建议与变量等内容配合使用以控制随机<br>数刷新速度，避免出现重复随机数。 | 返回指定范围内的随机数。<br><br>每个游戏刻都将返回不同的数字，因此<br>建议与变量等内容配合使用以控制随机<br>数刷新速度。 |
| `fancymenu.helper.editor.items.features.advanced_sizing.desc` | §x仅适用于高级用户！<br><br>允许您手动设置元素尺寸。<br><br>高级坐标支持占位符，因此您可以使用计算<br>器占位符计算位置，或获取其他元素位置等。<br><br>许多有用的元素坐标占位符可以在“GUI”和<br>“高级”占位符类别中找到。<br><br>§x您无法调整由高级尺寸覆写的同轴元素尺寸。 | §x仅适用于高级用户！<br><br>允许您手动设置元素尺寸。<br><br>高级尺寸支持占位符，因此您可以使用计算器<br>计算尺寸，或获取其他元素的尺寸等。<br><br>许多实用的尺寸占位符位于“GUI”和“高级”类别中。<br><br>§x由高级尺寸覆盖的轴无法再手动调整尺寸。 |
| `fancymenu.overlay.menu_bar.customization.settings.set_default_gui_scale.tooltip` | 默认GUI缩放比例在用户首次启动游戏时设置。<br><br>这对模组开发人员很有用。 | 默认GUI缩放比例在用户首次启动游戏时设置。<br><br>这对整合包制作者很有用。 |
| `fancymenu.elements.slider.v2.manage_actions.desc` | 该滑块值发生更改时将执行的操作。<br><br>您可以在操作或条件值中使用§x$$value<br>占位符来获取滑块当前值。 | 该滑块值发生更改时将执行的操作。<br><br>您可以在操作或条件值中使用§x$$value§r<br>占位符来获取滑块当前值。 |
| `fancymenu.elements.music_controller.play_world_music.desc` | 这种类型的音乐在加载世界时的菜单中播放。<br>它基本上是世界音乐，<br>会在不会暂停游戏的菜单中继续播放，<br>例如单人游戏中的库存菜单和多人游戏中的所有菜单。 | 这种类型的音乐在已加载世界时打开的菜单中播放。<br>它基本上是世界音乐，<br>会在不会暂停游戏的菜单中继续播放，<br>例如单人游戏中的物品栏界面和多人游戏中的所有菜单。 |
| `fancymenu.placeholders.world.difficulty.desc` | 返回当前世界的难度。<br>如果没有加载世界，将返回空值。<br>可能的值：和平、简单、普通、困难 | 返回当前世界的难度。<br>如果没有加载世界，将返回空值。<br>可能的值：peaceful（和平）、easy（简单）、normal（普通）、hard（困难） |
| `fancymenu.placeholders.world.player_gamemode.desc` | 返回玩家的当前游戏模式。<br>如果没有在世界中，将返回空值。<br>可能的值：生存、创造、冒险、旁观者 | 返回玩家的当前游戏模式。<br>如果没有在世界中，将返回空值。<br>可能的值：survival（生存）、creative（创造）、adventure（冒险）、spectator（旁观） |
| `fancymenu.placeholders.world.player_view_direction.desc` | 返回玩家的视角方向。<br>如果没有在世界中，将返回空值。<br>可能的值：北、东、南、西 | 返回玩家的视角方向。<br>如果没有在世界中，将返回空值。<br>可能的值：north（北）、east（东）、south（南）、west（西） |
| `fancymenu.requirements.world.is_entity_nearby.desc` | 如果玩家附近有实体。<br>使用实体的键和检查范围（以方块为单位）作为值。<br>如果没有加载世界，将返回 false。 | 如果玩家附近有实体。<br>使用实体的键和检测半径（以方块为单位）作为值。<br>如果没有加载世界，将返回 false。 |
| `fancymenu.element.fading.fade_out.desc` | 淡出不会在打开新菜单前淡出元素！<br>它用于在元素通过加载要求改变<br>可见性时使用。 | 淡出不会在打开新菜单前淡出元素！<br>它用于在元素通过显示条件改变<br>可见性时使用。 |
| `fancymenu.placeholders.audio_element_current_track.desc` | 获取当前音频元素正在播放的音轨文件名或显示名称。<br>如果没有播放音轨，则返回“---”。<br>需要提供音频元素的标识符。<br>可选地，支持使用映射为音轨设置自定义名称。<br>映射格式：track1.ogg=>炫酷音乐%:%track2.wav=>另一首歌 | 获取当前音频元素正在播放的音轨文件名或显示名称。<br>如果没有播放音轨，则返回“---”。<br>需要提供音频元素的标识符。<br>可选地，支持使用映射为音轨设置自定义名称。<br>映射格式：track1.ogg=>炫酷音乐%%:%%track2.wav=>另一首歌 |
| `fancymenu.requirements.world.is_player_withered` | 玩家是否枯萎 | 玩家是否凋零 |
| `fancymenu.requirements.world.is_player_withered.desc` | 如果玩家处于凋零状态。<br>在原版中，这会使生命值显示为枯萎的心。<br>如果没有加载世界，将返回 false。 | 如果玩家处于凋零状态。<br>在原版中，这会使生命值显示为凋零爱心。<br>如果没有加载世界，将返回 false。 |
| `fancymenu.requirements.world.is_entity_nearby.value.radius` | 检查范围（方块单位） | 检测半径（方块单位） |
