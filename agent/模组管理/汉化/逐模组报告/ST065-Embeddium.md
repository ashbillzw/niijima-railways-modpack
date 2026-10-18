# ST065 Embeddium 筛查与补译报告

日期：2026-10-18。

## 范围、来源与取舍

官方仓库 https://github.com/embeddedt/embeddium 。20.1/forge 分支 dee0ebde6aea8b158613cd3b8ea5cdf0c1f6a9bf 的 src/main/resources/assets/sodium/lang/zh_cn.json 只有4键，与包内对应旧译一致。21.1/neoforge fc5c69b0b9e39f544bf57792bec3037ae2384b85 同路径404，未取得该分支译文，尚未遍历其他目录及PR。通读72英文／6中文；新增66、修正1，补上原译遗漏的 Oculus 限制。保留模组品牌、驱动版本阈值和原作者支持政策；这不是对当前驱动最新版本的独立建议。

## 应用明细

| 键 | 英文 | 应用中文 |
|---|---|---|
| `embeddium.search_bar_empty` | Search options... | 搜索选项… |
| `embeddium.options.added_by_mod_string` | Added by mod: %s | 由模组添加：%s |
| `embeddium.options.fullscreen.resolution.tooltip` | Controls the resolution of the game in fullscreen mode. | 设置游戏全屏时的分辨率。 |
| `embeddium.options.use_quad_normals_for_lighting.name` | Use Accurate Quad Shading | 精确面着色 |
| `embeddium.options.use_quad_normals_for_lighting.tooltip` | When enabled, Embeddium will apply shading to non-vanilla block faces based on the true direction they are facing, not their axis-aligned direction. This can improve lighting quality when the Forge experimental light pipeline is disabled (which is recommended for best performance).<br><br>It has no effect if the experimental light pipeline is enabled. | 启用后，Embeddium 会根据非原版方块表面的实际朝向进行明暗着色，而不是使用与坐标轴对齐的朝向。关闭 Forge 实验性光照管线时，这可以改善光照质量（为获得最佳性能，建议关闭该管线）。<br><br>启用实验性光照管线时，此选项无效。 |
| `sodium.option_impact.low` | Low | 低 |
| `sodium.option_impact.medium` | Medium | 中 |
| `sodium.option_impact.high` | High | 高 |
| `sodium.option_impact.extreme` | Extreme | 极高 |
| `sodium.option_impact.varies` | Varies | 视情况而定 |
| `sodium.options.pages.quality` | Quality | 画质 |
| `sodium.options.pages.performance` | Performance | 性能 |
| `sodium.options.pages.advanced` | Advanced | 高级 |
| `sodium.options.view_distance.tooltip` | The render distance controls how far away terrain will be rendered. Shorter distances mean that less terrain will be rendered, improving frame rates. | 控制地形的渲染距离。降低距离会减少需要渲染的地形，从而提高帧率。 |
| `sodium.options.simulation_distance.tooltip` | The simulation distance controls how far away terrain and entities will be loaded and ticked. Shorter distances can reduce the internal server's load and may improve frame rates. | 控制地形和实体的加载与更新距离。降低距离可以减轻内部服务器的负担，并可能提高帧率。 |
| `sodium.options.brightness.tooltip` | Controls the brightness (gamma) of the game. | 控制游戏亮度（伽马值）。 |
| `sodium.options.gui_scale.tooltip` | Sets the maximum scale factor to be used for the user interface. If 'auto' is used, then the largest scale factor will always be used. | 设置用户界面的最大缩放倍率。选择“自动”时，始终使用可用的最大倍率。 |
| `sodium.options.fullscreen.tooltip` | If enabled, the game will display in full-screen (if supported). | 启用后，游戏将以全屏模式显示（需设备支持）。 |
| `sodium.options.v_sync.tooltip` | If enabled, the game's frame rate will be synchronized to the monitor's refresh rate, making for a generally smoother experience at the expense of overall input latency. This setting might reduce performance if your system is too slow. | 启用后，游戏帧率将与显示器刷新率同步，通常能让画面更流畅，但会增加输入延迟。系统性能不足时，此设置可能降低性能。 |
| `sodium.options.fps_limit.tooltip` | Limits the maximum number of frames per second. This can help reduce battery usage and general system load when multi-tasking. If VSync is enabled, this option will be ignored unless it is lower than your display's refresh rate. | 限制每秒最大帧数，有助于减少电池消耗和多任务运行时的系统负载。启用垂直同步后，只有低于显示器刷新率的帧率上限才会生效。 |
| `sodium.options.view_bobbing.tooltip` | If enabled, the player's view will sway and bob when moving around. Players who experience motion sickness while playing can benefit from disabling this. | 启用后，玩家视角会在移动时摇晃。游玩时容易眩晕的玩家可以尝试关闭。 |
| `sodium.options.attack_indicator.tooltip` | Controls where the Attack Indicator is displayed on screen. | 控制攻击指示器在屏幕上的显示位置。 |
| `sodium.options.autosave_indicator.tooltip` | If enabled, an indicator will be shown when the game is saving the world to disk. | 启用后，世界保存到磁盘时会显示提示。 |
| `sodium.options.graphics_quality.tooltip` | The default graphics quality controls some legacy options and is necessary for mod compatibility. If the options below are left to "Default", they will use this setting. | 默认画质控制部分旧有选项，也是模组兼容所必需的。下方设为“默认”的选项将采用此设置。 |
| `sodium.options.clouds_quality.tooltip` | Controls the presence of rendered clouds in the sky. | 控制天空中云的显示。 |
| `sodium.options.weather_quality.tooltip` | Controls the quality of rain and snow effects. | 控制雨雪效果的画质。 |
| `sodium.options.leaves_quality.name` | Leaves | 树叶 |
| `sodium.options.leaves_quality.tooltip` | Controls the quality of leaves. | 控制树叶画质。 |
| `sodium.options.particle_quality.tooltip` | Controls the maximum number of particles which can be present on screen at any one time. | 控制同一时刻屏幕上可出现的最大粒子数量。 |
| `sodium.options.smooth_lighting.tooltip` | Controls whether blocks will be smoothly lit and shaded. This slightly increases the amount of time needed to re-build a chunk, but doesn't affect frame rates. | 控制方块是否使用平滑光照与明暗过渡。会略微增加区块重建时间，但不会影响帧率。 |
| `sodium.options.biome_blend.value` | %s block(s) | %s 格 |
| `sodium.options.biome_blend.tooltip` | Controls the range which biomes will be sampled for block colorization. Higher values greatly increase the amount of time it takes to build chunks for diminishing improvements in quality. | 控制为方块着色时采样生物群系的范围。提高此值会显著增加区块构建时间，而画质改善幅度会逐渐减小。 |
| `sodium.options.entity_distance.tooltip` | Controls how far away entities can render from the player. Higher values increase the render distance at the expense of frame rates. | 控制实体的渲染距离。提高此值可以看见更远的实体，但会降低帧率。 |
| `sodium.options.entity_shadows.tooltip` | If enabled, basic shadows will be rendered beneath mobs and other entities. | 启用后，会在生物等实体下方渲染基础阴影。 |
| `sodium.options.vignette.name` | Vignette | 暗角 |
| `sodium.options.vignette.tooltip` | If enabled, a vignette effect will be rendered on the player's view. This is very unlikely to make a difference to frame rates unless you are fill-rate limited. | 启用后，玩家视野边缘会出现暗角效果。除非性能受像素填充率限制，否则它通常不会影响帧率。 |
| `sodium.options.mipmap_levels.tooltip` | Controls the number of mipmaps which will be used for block model textures. Higher values provide better rendering of blocks in the distance, but may adversely affect performance with many animated textures. | 控制方块模型纹理使用的多级渐远纹理级数。较高的值能改善远处方块的显示效果，但动画纹理较多时可能降低性能。 |
| `sodium.options.use_block_face_culling.name` | Use Block Face Culling | 方块面剔除 |
| `sodium.options.use_block_face_culling.tooltip` | If enabled, only the sides of blocks which are facing the camera will be submitted for rendering. This can eliminate a large number of block faces very early in the rendering process, saving memory bandwidth and time on the GPU. Some resource packs may have issues with this option, so try disabling it if you're seeing holes in blocks. | 启用后，仅将面向摄像机的方块表面提交渲染。这能在渲染早期剔除大量表面，节省显存带宽和 GPU 时间。部分资源包可能不兼容；若看到方块出现缺口，请尝试关闭。 |
| `sodium.options.use_fog_occlusion.name` | Use Fog Occlusion | 雾遮挡剔除 |
| `sodium.options.use_fog_occlusion.tooltip` | If enabled, chunks which are determined to be fully hidden by fog effects will not be rendered, helping to improve performance. The improvement can be more dramatic when fog effects are heavier (such as while underwater), but it may cause undesirable visual artifacts between the sky and fog in some scenarios. | 启用后，完全被雾遮挡的区块将不再渲染，有助于提高性能。雾较浓时（例如水下）效果可能更明显，但某些情况下天空与雾的交界处可能出现显示异常。 |
| `sodium.options.use_entity_culling.name` | Use Entity Culling | 实体剔除 |
| `sodium.options.use_entity_culling.tooltip` | If enabled, entities determined not to be in any visible chunks will be skipped during rendering. This can help improve performance by avoiding the rendering of entities located underground or behind walls. | 启用后，不在任何可见区块中的实体将跳过渲染。避免渲染地下或墙后的实体有助于提高性能。 |
| `sodium.options.animate_only_visible_textures.name` | Animate Only Visible Textures | 仅更新可见纹理动画 |
| `sodium.options.animate_only_visible_textures.tooltip` | If enabled, only animated textures determined to be visible will be updated. This can provide a significant boost to frame rates on some hardware, especially with heavier resource packs. If you experience issues with some textures not being animated, try disabling this option. | 启用后，仅更新被判定为可见的纹理动画。在部分硬件上能显著提高帧率，尤其是在使用大型资源包时。若发现纹理动画不播放，请尝试关闭。 |
| `sodium.options.cpu_render_ahead_limit.name` | CPU Render-Ahead Limit | CPU 预渲染帧数上限 |
| `sodium.options.cpu_render_ahead_limit.tooltip` | Specifies the maximum number of frames the CPU can be waiting on the GPU to finish rendering. Very low or high values may create frame rate instability. | 设置 CPU 最多可以提前准备多少帧，等待 GPU 完成渲染。数值过低或过高都可能导致帧率不稳定。 |
| `sodium.options.cpu_render_ahead_limit.value` | %s frame(s) | %s 帧 |
| `sodium.options.performance_impact_string` | Performance Impact: %s | 性能影响：%s |
| `sodium.options.use_persistent_mapping.name` | Use Persistent Mapping | 持久映射 |
| `sodium.options.use_persistent_mapping.tooltip` | If enabled, a small amount of memory will be persistently mapped as a staging buffer for chunk uploading, helping to reduce CPU overhead and frame time instability when loading or updating chunks.<br><br>Requires OpenGL 4.4 or ARB_buffer_storage. | 启用后，将少量内存持久映射为区块上传的暂存缓冲区，减少加载或更新区块时的 CPU 开销及帧时间波动。<br><br>需要 OpenGL 4.4 或 ARB_buffer_storage。 |
| `sodium.options.chunk_update_threads.name` | Chunk Update Threads | 区块更新线程数 |
| `sodium.options.chunk_update_threads.tooltip` | Specifies the number of threads to use for chunk building. Using more threads can speed up chunk loading and update speed, but may negatively impact frame times. | 设置用于构建区块的线程数。增加线程可以加快区块加载和更新，但可能影响帧时间。 |
| `sodium.options.always_defer_chunk_updates.name` | Always Defer Chunk Updates | 始终延后区块更新 |
| `sodium.options.always_defer_chunk_updates.tooltip` | If enabled, rendering will never wait for chunk updates to finish, even if they are important. This can greatly improve frame rates in some scenarios, but it may create significant visual lag in the world. | 启用后，渲染不会等待区块更新完成，即使这些更新很重要。某些场景下可以显著提高帧率，但世界画面的更新可能明显滞后。 |
| `sodium.options.use_no_error_context.name` | Use No Error Context | 无错误检查上下文 |
| `sodium.options.use_no_error_context.tooltip` | If enabled, the OpenGL context will be created with error checking disabled. This may slightly improve performance, but it also increases the risk that the game will crash instead of gracefully handling OpenGL errors. You should disable this option if you are experiencing sudden unexplained crashes. | 启用后，创建 OpenGL 上下文时会关闭错误检查。这可能略微提高性能，但遇到 OpenGL 错误时，游戏更可能直接崩溃而无法妥善处理。若出现原因不明的突然崩溃，请关闭此选项。 |
| `sodium.options.buttons.undo` | Undo | 撤销 |
| `sodium.options.buttons.apply` | Apply | 应用 |
| `sodium.options.buttons.donate` | Support Sodium! | 支持 Sodium！ |
| `sodium.console.game_restart` | The game must be restarted to apply one or more video settings! | 部分视频设置需要重启游戏才能生效！ |
| `sodium.console.broken_nvidia_driver` | Your NVIDIA graphics drivers are out of date!<br>  * This will cause severe performance issues and crashes when Embeddium is installed.<br>  * Please update your graphics drivers to the latest version (version 536.23 or newer.) | 你的 NVIDIA 显卡驱动已过时！<br>  * 安装 Embeddium 时，这会导致严重的性能问题和崩溃。<br>  * 请更新显卡驱动（536.23 或更高版本）。 |
| `sodium.console.pojav_launcher` | PojavLauncher is not supported when using Embeddium.<br>  * You are very likely to run into extreme performance issues, graphical bugs, and crashes.<br>  * You will be on your own if you decide to continue -- we will not help you with any bugs or crashes! | 使用 Embeddium 时不支持 PojavLauncher。<br>  * 极有可能遇到严重的性能问题、画面错误和崩溃。<br>  * 如果仍决定继续使用，你需要自行承担这些问题；我们不会为相关错误或崩溃提供支持！ |
| `sodium.console.core_shaders_error` | The following resource packs are incompatible with Embeddium: | 以下资源包与 Embeddium 不兼容： |
| `sodium.console.core_shaders_warn` | The following resource packs may be incompatible with Embeddium: | 以下资源包可能与 Embeddium 不兼容： |
| `sodium.console.core_shaders_info` | Check the game log for detailed information. | 请查看游戏日志了解详情。 |
| `sodium.options.use_compact_vertex_format.tooltip` | If enabled, a more compact vertex format will be used for rendering chunks. This can reduce graphics memory usage and bandwidth requirements significantly, especially for integrated graphics cards, but can cause z-fighting with some resource packs due to how it reduces the precision of position and texture coordinate attributes. Disabling this has no effect if Oculus is installed. | 启用后，游戏将使用更紧凑的顶点格式来渲染区块。这可以显著减少显存使用和带宽需求，尤其是对于集成显卡而言。但是，由于它降低了位置和纹理坐标属性的精度，可能会导致一些资源包出现深度冲突（z-fighting）的问题。安装 Oculus 时，关闭此选项不会生效。 |

## 验证与限制

JSON解析、当前版本键集合、格式占位符检查通过；按当前语言命名空间写入KubeJS assets覆盖。仅语言资源修改，没有调整图形配置值。未穷尽硬编码界面文本；未游戏验证、打包、提交或部署。实际菜单排版、光影及兼容表现待游戏验证。
