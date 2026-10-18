# ST067 Oculus 筛查与补译报告

日期：2026-10-18。

## 范围、来源与取舍

当前 oculus-mc1.20.1-1.8.0.jar，英文72、中文67，全部通读。本轮新增5、修正2，覆盖光影加载错误、线框模式和色彩空间，并修正OpenGL调试上下文说明及功能列表的“名单”误译。保留既有光影包用语。本轮未额外进行上游新版／PR复查。Rubidium旧依赖错误提示可能属于历史残留，未直接改成Embeddium；需先核查触发路径。Profile“配置文件”可能指光影预设，暂保留待界面上下文复核。

## 应用明细

| 键 | 英文 | 应用中文 |
|---|---|---|
| `iris.load.failure.shader` | The shaderpack failed to load! Please report the error to the shader developer.  | 光影包加载失败！请将错误报告给光影包开发者。  |
| `iris.load.failure.generic` | Oculus encountered an issue trying to load the shader; please report this to Oculus developers.  | Oculus 在尝试加载光影时遇到了问题；请将此问题报告给 Oculus 开发者。  |
| `iris.keybind.wireframe` | Wireframe (SP only) | 线框模式（仅限单人游戏） |
| `options.iris.colorSpace` | Color Space | 色彩空间 |
| `options.iris.colorSpace.sodium_tooltip` | The color space to transform the screen to. Works on top of shader packs. Use SRGB if unsure. | 在光影包渲染结果的基础上，将画面转换到指定色彩空间。不确定时请使用 sRGB。 |
| `iris.shaders.debug.restart` | You do not have a debug context, please restart to enable OpenGL client debugging. | 当前没有调试上下文，请重启以启用 OpenGL 客户端调试。 |
| `iris.unsupported.pack.description` | The shaderpack you are trying to load contains features unsupported by %s. Please try another pack. List %s | 你尝试加载的光影包含 %s 不支持的功能。请尝试其他光影包。列表：%s |

## 验证与限制

JSON解析、当前版本键集合、格式占位符检查通过；按当前语言命名空间写入KubeJS assets覆盖。仅语言资源修改，没有调整图形配置值。未穷尽硬编码界面文本；未游戏验证、打包、提交或部署。实际菜单排版、光影及兼容表现待游戏验证。
