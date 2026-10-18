# ST066 Chloride 筛查与补译报告

日期：2026-10-18。

## 范围、来源与取舍

官方仓库 https://github.com/SrRapero720/chloride 。当前1.20.1分支 31d7e89d7a931cfd927150f4a2aaeb2491eb426e 与1.21.1-neo分支 0ed94c967243c01f6890fda3251b84690da4904b 的 src/main/resources/assets/chloride/lang/zh_cn.json 均165键。全量对照当前154英文，选取153可见文本键，排除 cloud.height 的译者 __COMMENT，不引入新版额外键。当前JAR无中文，全部计为新增。上游文本中旧箱子／床限制、无边框帧率锁定、15秒平均值等与当前英文不符，按当前英文适配；F11三种模式完整说明。挖掘粒子与裂纹叠层区分，不将粒子开关写成裂纹开关。保留作者幽默语气及当前英文已有的快乐恶魂前瞻性说明，不因MC1.20.1没有该实体就擅自删除。实体更新限制、FPS平均窗口及资源包前置要求尚未逐条运行验证；代码机制与英文是否过时仍需实际确认。

## 应用明细

| 键 | 英文 | 应用中文 |
|---|---|---|
| `chloride.performance.fastchest.title` | Fast Chests | 快速箱子 |
| `chloride.performance.fastchest.desc` | Replaces chests model with a solid block models with no animations.<br><br>This option has no effect when EBE and Flywheel is installed in favor of their own optimizations. | 用没有动画的静态方块模型替换箱子模型。<br><br>安装 EBE 和 Flywheel 时，此选项不生效，改用它们提供的优化。 |
| `chloride.performance.fastbeds.title` | Fast Beds | 快速床 |
| `chloride.performance.fastbeds.desc` | Replaces bed models with solid block models. Might break modded beds | 用静态方块模型替换床的模型。可能导致模组添加的床显示异常。 |
| `chloride.general.screen.desc` | WINDOWED - Game is shown in a window.<br>BORDERLESS - Game is shown in "Windowed" mode without borders and expanded to max screen size without readjust resolution. <br>FULLSCREEN - the game will display in native fullscreen mode, readjusting screen resolution to game settings | 窗口化：在窗口中显示游戏。<br>无边框：将无边框窗口铺满屏幕，不调整屏幕分辨率。<br>全屏：使用原生全屏模式，并按游戏设置调整屏幕分辨率。 |
| `chloride.general.screen.fullscreen` | Fullscreen | 全屏 |
| `chloride.general.screen.borderless` | Borderless | 无边框 |
| `chloride.general.screen.windowed` | Windowed | 窗口化 |
| `chloride.interface` | Interface | 界面 |
| `chloride.interface.fps.title` | Show FPS | 显示帧率 |
| `chloride.interface.fps.desc` | Shows the FPS overlay. Advanced mode shows minimum FPS, as well as 30 second average FPS, useful for judging performance. | 显示帧率信息。高级模式还显示最低帧率和30秒平均帧率，便于评估性能。 |
| `chloride.interface.fps.mode.off` | OFF | 关 |
| `chloride.interface.fps.mode.simple` | Simple | 简易 |
| `chloride.interface.fps.mode.advanced` | Advanced | 高级 |
| `chloride.interface.fps.system.title` | Show System Stats | 显示系统资源 |
| `chloride.interface.fps.system.desc` | Shows RAM and GPU usage next to the FPS counter | 在帧率计数器旁边，显示内存和显卡的使用量。 |
| `chloride.interface.fps.system.off` | OFF | 关 |
| `chloride.interface.fps.system.gpu_only` | GPU Only | 仅显卡 |
| `chloride.interface.fps.system.ram_only` | RAM Only | 仅内存 |
| `chloride.interface.fps.system.all` | ALL | 显示全部 |
| `chloride.interface.fps` | FPS | FPS |
| `chloride.interface.fps.min` | MIN | 最低 |
| `chloride.interface.fps.avg` | AVG | 平均 |
| `chloride.interface.fps.gpu` | GPU | 显卡 |
| `chloride.interface.fps.mem` | MEM | 内存 |
| `chloride.interface.fps.align_x.title` | Fps Horizontal Alignment | 帧率信息水平排列 |
| `chloride.interface.fps.align_x.desc` | Horizontal position of the FPS display | 显示帧率信息的水平位置 |
| `chloride.interface.fps.align_x.left` | Left | 左 |
| `chloride.interface.fps.align_x.center` | Center | 中 |
| `chloride.interface.fps.align_x.right` | Right | 右 |
| `chloride.interface.fps.align_y.title` | Fps Vertical Alignment | 帧率信息垂直排列 |
| `chloride.interface.fps.align_y.desc` | Vertical position of the FPS display | 显示帧率信息的垂直位置 |
| `chloride.interface.fps.align_y.top` | Top | 顶 |
| `chloride.interface.fps.align_y.center` | Center | 中 |
| `chloride.interface.fps.align_y.bottom` | Bottom | 底 |
| `chloride.interface.fps.margin_x.title` | Fps Horizontal Margin | 帧率信息水平偏移 |
| `chloride.interface.fps.margin_x.desc` | Horizontal offset of the FPS display | 显示帧率信息的水平偏移 |
| `chloride.interface.fps.margin_y.title` | Fps Vertical Margin | 帧率信息垂直偏移 |
| `chloride.interface.fps.margin_y.desc` | Vertical offset of the FPS display | 显示帧率信息的垂直偏移 |
| `chloride.interface.fps.shadow.title` | Fps Shadow Box | 帧率信息阴影框 |
| `chloride.interface.fps.shadow.desc` | Add a Shadow box into the FPS text, at the pure style of F3 text | 给帧率信息加上阴影框背景，阴影是纯粹的F3风格。 |
| `chloride.interface.language.fast_reload.title` | Fast Language Reload | 快速语言重载 |
| `chloride.interface.language.fast_reload.desc` | Language updates only reload language instead of all resources, a 99.9% extra of speed | 启用后，改变语言只会重载语言，不再重载所有资源，速度提高99.9%。 |
| `chloride.interface.borderless.f11.title` | Borderless on F11 | 为F11添加无边框 |
| `chloride.interface.borderless.f11.desc` | ATTACH - Adds borderless in the cycle<br>REPLACE - Replaces Fullscreen with Borderless Fullscreen<br>OFF - Doesn't add borderless to the cycle | 附加：将无边框模式加入切换循环。<br>替换：用无边框全屏替换全屏模式。<br>关：不将无边框模式加入切换循环。 |
| `chloride.interface.borderless.f11.attach` | Attach | 附加 |
| `chloride.interface.borderless.f11.replace` | Replace | 替换 |
| `chloride.interface.borderless.f11.off` | OFF | 关 |
| `chloride.interface.font.shadow.title` | Font Shadows | 字体阴影 |
| `chloride.interface.font.shadow.desc` | If disabled, text will stop rendering shadows giving a flat style.<br>Increases FPS depending of how much text is on the screen, specially with BetterF3 mods | 禁用后，文本将停止渲染阴影，显得扁平化。<br>FPS能提高多少，取决于屏幕上有多少文本，特别是安装了更好的F3（BetterF3）模组后。 |
| `chloride.interface.jei.title` | Hide JEI/REI/EMI until Searching | 不在搜索时隐藏JEI/REI/EMI |
| `chloride.interface.jei.desc` | Hides JEI/REI/EMI item list unless you search something. Type space to show it without searching | 启用后，会隐藏JEI/REI/EMI物品列表中的物品，直到你搜索了某些内容，输入空格可以搜索到所有内容。 |
| `chloride.jei.message` | Search to show items | 搜索以显示物品 |
| `chloride.world` | World | 世界 |
| `chloride.world.blueband.title` | Sky Blue band | 天空条带 |
| `chloride.world.blueband.desc` | If disabled, removed the Blue Band effect in all dimensions | 如果禁用，则为所有维度的天空移除条带视觉效果。 |
| `chloride.world.fog.title` | Sky Fog | 迷雾 |
| `chloride.world.fog.desc` | If disabled, removed fog effect only in the overworld | 如果禁用，仅为主世界维度禁用迷雾视觉效果。 |
| `chloride.world.custom_fog.title` | Custom Fog | 自定义迷雾 |
| `chloride.world.custom_fog.desc` | Enables custom fog values | 自定义迷雾选项 |
| `chloride.world.custom_fog.start.title` | Custom Fog Start | 自定义迷雾起点 |
| `chloride.world.custom_fog.start.desc` | Configure the start of the fog | 配置自定义迷雾起点 |
| `chloride.world.custom_fog.end.title` | Custom Fog End | 自定义迷雾终点 |
| `chloride.world.custom_fog.end.desc` | Configure the end of the fog | 配置自定义迷雾终点 |
| `chloride.world.custom_fog.shape.title` | Custom Fog Shape | 自定义迷雾形状 |
| `chloride.world.custom_fog.shape.desc` | Configure the shape of the fog | 配置自定义迷雾形状 |
| `chloride.world.custom_fog.shape.cylinder` | Cylinder | 圆柱 |
| `chloride.world.custom_fog.shape.sphere` | Sphere | 球体 |
| `chloride.world.clouds.height.title` | Cloud Height | 云层高度 |
| `chloride.world.clouds.height.desc` | Raises cloud height.<br>Configure the height of the clouds, has no effect for happy ghasts | 调整云层高度。对快乐恶魂无效。 |
| `chloride.world.leaves_culling.title` | Leaves Culling | 树叶剔除 |
| `chloride.world.leaves_culling.desc` | Reduces the number of leaves visible faces of the same type, Controls the depth of the culling | 减少同种树叶的可见面数，还可控制剔除深度。 |
| `chloride.world.leaves_culling.all` | ALL | 全部 |
| `chloride.world.leaves_culling.lot` | Lot | 大量 |
| `chloride.world.leaves_culling.half` | Half | 一半 |
| `chloride.world.leaves_culling.less` | Less | 少量 |
| `chloride.world.leaves_culling.off` | OFF | 关 |
| `chloride.world.fade.title` | Chunk Fade in | 区块淡入 |
| `chloride.world.fade.desc` | If enabled, chunks will fade in when loading. | 如果启用，区块将在加载时拥有淡入视觉效果。 |
| `chloride.darkness` | Darkness | 黑暗 |
| `chloride.darkness.level.title` | Darkness Level | 黑暗等级 |
| `chloride.darkness.level.desc` | Makes darkness more darker, making darkness attenuation more intense. | 使黑暗更黑暗，使黑暗衰减更强烈。 |
| `chloride.darkness.level.blackness` | Blackness | 漆黑 |
| `chloride.darkness.level.black` | Black | 黑 |
| `chloride.darkness.level.darkness` | Darkness | 黑暗 |
| `chloride.darkness.level.dark` | Dark | 暗 |
| `chloride.darkness.level.dim` | Dim | 暗淡 |
| `chloride.darkness.level.vanilla` | Vanilla | 原版 |
| `chloride.darkness.others.title` | Enable in Other dimensions | 在其它维度启用 |
| `chloride.darkness.others.desc` | True darkness will be applied in other dimensions<br><br>[WARNING] This option will be removed in a near future in favor of a blacklist | 启用后，真实黑暗会在其他维度生效。<br><br>[警告]此项将在不久之后被移除，由黑名单取而代之。 |
| `chloride.darkness.overworld.title` | Enable on Overworld | 主世界 |
| `chloride.darkness.overworld.desc` | If enabled, true darkness will be applied in the Overworld. | 启用后，真实黑暗会在主世界生效。 |
| `chloride.darkness.noskylight.title` | Enable on SkyLess dimensions | 无天空光照维度 |
| `chloride.darkness.noskylight.desc` | If enabled, true darkness will be applied on dimensions without skylight | 启用后，真实黑暗会在没有天空光照的维度生效。 |
| `chloride.darkness.nether.title` | Enable on Nether | 下界 |
| `chloride.darkness.nether.desc` | If enabled, true darkness will be applied in the Nether. | 启用后，真实黑暗会在下界生效。 |
| `chloride.darkness.nether.brightness.title` | Nether Fog Brightness | 下界迷雾亮度 |
| `chloride.darkness.nether.brightness.desc` | Configure fog brightness in the Nether when darkness is enabled. | 启用下界的真实黑暗后，可在此配置下界的迷雾亮度。 |
| `chloride.darkness.end.title` | Enable on End | 末地 |
| `chloride.darkness.end.desc` | If enabled, true darkness will be applied in the End. | 启用后，真实黑暗会在末地生效。 |
| `chloride.darkness.end.brightness.title` | End Fog Brightness | 末地迷雾亮度 |
| `chloride.darkness.end.brightness.desc` | Configure fog brightness in the End when darkness is enabled. | 启用末地的真实黑暗后，可在此配置末地的迷雾亮度。 |
| `chloride.darkness.blocklightonly.title` | Block light only | 仅限方块光照 |
| `chloride.darkness.blocklightonly.desc` | If enabled, Disables sky, fog and moon brightness, making blocks as a only source of light | 启用后，会禁用天空、迷雾和月亮的亮度，使方块成为唯一的光源。 |
| `chloride.darkness.moonphase.title` | Use Moon Phases | 使用月相 |
| `chloride.darkness.moonphase.desc` | If enabled, Darkness will be affected by Moon Phases | 启用后，真实黑暗会受月相影响。 |
| `chloride.darkness.moonphase.fresh.title` | New Moon Bright (min) | 新月亮度（最小） |
| `chloride.darkness.moonphase.fresh.desc` | Configure brightness on a new moon, or minimal bright level on black moon phase | 配置新月的亮度，或者黑月的最小亮度等级。 |
| `chloride.darkness.moonphase.full.title` | Full Moon Bright (max) | 满月亮度（最大） |
| `chloride.darkness.moonphase.full.desc` | Configure brightness on a full moon, or maximum bright level on black moon phase | 配置满月的亮度，或者黑月的最大亮度等级。 |
| `chloride.particles` | Particles | 粒子效果 |
| `chloride.particles.rain.title` | Rain Particles | 雨水效果 |
| `chloride.particles.rain.desc` | Enables the water falling particles when raining | 启用下雨时的雨水效果。 |
| `chloride.particles.rain.drop.title` | Rain Drop Particles | 雨滴效果 |
| `chloride.particles.rain.drop.desc` | Enables the water drop in floor particles of the rain | 启用雨水落地后的水滴效果。 |
| `chloride.particles.block.cracking.title` | Block Cracking Particles | 方块挖掘粒子 |
| `chloride.particles.block.cracking.desc` | Enables the block cracking particles when breaking blocks | 启用挖掘方块时产生的碎屑粒子。 |
| `chloride.particles.block.destroy.title` | Block Breaking Particles | 方块破坏粒子 |
| `chloride.particles.block.destroy.desc` | Enables the block breaking particles when breaking blocks | 启用破坏方块后产生的方块粒子。 |
| `chloride.particles.provider.unknown` | Unknown | 未知 |
| `chloride.particles.provider` | Particle provided by: §6§l%s | 由§6§l%s提供的粒子效果。 |
| `chloride.entities` | Entities | 实体 |
| `chloride.entities.nametag.players.title` | Nametag on Players | 玩家名称标签 |
| `chloride.entities.nametag.players.desc` | Disable it prevents nametag rendering for all Players | 禁用后，阻止为玩家呈现名称标签。 |
| `chloride.entities.nametag.entities.title` | Nametag on Entities | 实体名称标签 |
| `chloride.entities.nametag.entities.desc` | Disable it prevents nametag rendering for all Entities | 禁用后，阻止为实体呈现名称标签。 |
| `chloride.entities.nametag.items.title` | Nametag on Item Frames | 物品展示框名称标签 |
| `chloride.entities.nametag.items.desc` | Disable it prevents nametag rendering for Items, including items inside item frames | 禁用后，不再渲染物品的名称标签，包括物品展示框中的物品。 |
| `chloride.entities.culling.vseureka.warning` | VSEureka detected, vertical distance (raw) is ignored and uses instead horizontal distance (squared) | 检测到VSEureka，垂直距离（原始）被忽略，改用水平距离（平方） |
| `chloride.entities.culling.title` | Max Entity Distance | 最大实体距离 |
| `chloride.entities.culling.desc` | If enabled, Entities will be hidden based on configured distance limit | 启用后，游戏将会基于所配置的最大距离进行实体的隐藏。 |
| `chloride.entities.culling.distance.horizontal.title` | Entities Max Distance (Horizontal) | 实体最大渲染距离（水平） |
| `chloride.entities.culling.distance.horizontal.desc` | Hides and does not tick entities beyond this many blocks. Huge performance increase, especially around modded farms. | 隐藏并停止更新超过此范围的实体。大幅提高性能，尤其是在模组刷怪塔周围时。 |
| `chloride.entities.culling.distance.vertical.title` | Entities Max Distance (Vertical) | 实体最大渲染距离（垂直） |
| `chloride.entities.culling.distance.vertical.desc` | Hides and does not tick entities underneath this many blocks, improving performance above caves. This should ideally be set lower than the horizontal distance. | 隐藏并停止更新此范围下方的实体，提高位于洞穴上方时的性能。理想情况下，该值应低于水平距离。 |
| `chloride.entities.culling.monster.title` | Max Monster Distance | 使用怪物最大渲染距离 |
| `chloride.entities.culling.monster.desc` | If enabled, Monsters (hostile entities) will be hidden based on configured distance limit | 启用后，游戏将会基于所配置的最大距离进行怪物（敌对实体）的隐藏。 |
| `chloride.entities.culling.monster.distance.horizontal.title` | Monsters Max Distance (Horizontal) | 怪物最大渲染距离（水平） |
| `chloride.entities.culling.monster.distance.horizontal.desc` | Hides and does not tick monsters beyond this many blocks. Huge performance increase, especially around XP farms. | 隐藏并停止更新超过此范围的怪物。大幅提高性能，尤其是在经验刷怪塔周围时。 |
| `chloride.entities.culling.monster.distance.vertical.title` | Monsters Max Distance (Vertical) | 怪物最大渲染距离（垂直） |
| `chloride.entities.culling.monster.distance.vertical.desc` | Hides and does not tick monsters underneath this many blocks, improving performance above caves. This should ideally be set lower than the horizontal distance. | 隐藏并停止更新此范围下方的怪物，提高位于洞穴上方时的性能。理想情况下，该值应低于水平距离。 |
| `chloride.entities.culling.tiles.title` | Max Block Entity Distance | 使用方块实体最大渲染距离 |
| `chloride.entities.culling.tiles.desc` | If enabled, Block Entities will be hidden based on configured distance limit | 启用后，游戏将会基于所配置的最大距离进行方块实体的隐藏。 |
| `chloride.entities.culling.tile.distance.horizontal.title` | Block Entities Max Distance (Horizontal) | 方块实体最大渲染距离（水平） |
| `chloride.entities.culling.tile.distance.horizontal.desc` | Hides block entities beyond this many blocks. Huge performance increase, especially around lots of modded machines. | 隐藏超过此范围的方块实体。大幅提高性能，尤其是在大量模组机器周围时。 |
| `chloride.entities.culling.tile.distance.vertical.title` | Block Entities Max Distance (Vertical) | 方块实体最大渲染距离（垂直） |
| `chloride.entities.culling.tile.distance.vertical.desc` | Hides block entities underneath this many blocks, improving performance above caves (if you have your machines in caves, for some reason). This should ideally be set lower than the horizontal distance. | 隐藏此范围下方的方块实体，提高位于洞穴（哦，出于某种原因，你把机器放在洞穴里了）上方时的性能。理想情况下，该值应低于水平距离。 |
| `chloride.zoom` | Zoom | 缩放 |
| `chloride.zoom.title` | Enable Zoom | 启用缩放 |
| `chloride.zoom.desc` | Turns on Zoom feature, can be activated by pressing | 启用缩放功能，可按下绑定的键位激活。 |
| `chloride.zoom.forbidden` | JustZoom or Zume detected, chloride zoom its now disabled | 检测到JustZoom或Zume，Chloride缩放现已禁用。 |
| `chloride.zoom.max.title` | Max Zoom | 最大缩放程度 |
| `chloride.zoom.max.desc` | Sets maximum zoom possible using mouse wheel | 设置使用鼠标滚轮缩放时可达到的最大倍率。 |

## 验证与限制

JSON解析、当前版本键集合、格式占位符检查通过；按当前语言命名空间写入KubeJS assets覆盖。仅语言资源修改，没有调整图形配置值。未穷尽硬编码界面文本；未游戏验证、打包、提交或部署。实际菜单排版、光影及兼容表现待游戏验证。
