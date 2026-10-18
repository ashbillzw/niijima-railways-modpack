# ST077 Drippy-Loading-Screen 筛查报告

日期：2026-10-18。

## 范围与结论

41个英文标准键全量补译；沿用FancyMenu的界面、元素、布局、纹理术语。保留%n%、%%n%%、%s及原有§x等控制串。不修改布局或加载行为。此模组规模较小，本轮据包内英文翻译，未完成新版上游中文对照。

新增补译41键，修正已有中文0键。

## 应用明细

| 键 | 原值／英文 | 中文 |
|---|---|---|
| `drippyloadingscreen.edit_loading_screen.desc` | Customize Loading Screen<br><br>This button is bound to FancyMenu's menu bar.<br>You can hide it by hiding the menu bar. | 自定义加载界面<br><br>此按钮依附于FancyMenu的菜单栏。<br>隐藏菜单栏即可隐藏此按钮。 |
| `drippyloadingscreen.deepcustomization.overlay.logo.display_name` | Mojang Logo | Mojang标志 |
| `drippyloadingscreen.deepcustomization.overlay.logo.original_size_pos_calc.on` | Vanilla Size & Position Calculation: §aOn | 原版尺寸与位置计算：§a开启 |
| `drippyloadingscreen.deepcustomization.overlay.logo.original_size_pos_calc.off` | Vanilla Size & Position Calculation: §cOff | 原版尺寸与位置计算：§c关闭 |
| `drippyloadingscreen.deepcustomization.overlay.logo.original_size_pos_calc.desc` | If the logo's original size and position<br>calculation should be used.<br><br>§cTurning this OFF will enable you to<br>§cmanually move and resize the element. | 是否使用标志原有的尺寸和位置计算方式。<br><br>§c关闭此项后，你可以手动移动元素并调整其大小。 |
| `drippyloadingscreen.deepcustomization.overlay.progress_bar.display_name` | Vanilla Progress Bar | 原版进度条 |
| `drippyloadingscreen.deepcustomization.overlay.progress_bar.original_size_pos_calc.on` | Vanilla Size & Position Calculation: §aOn | 原版尺寸与位置计算：§a开启 |
| `drippyloadingscreen.deepcustomization.overlay.progress_bar.original_size_pos_calc.off` | Vanilla Size & Position Calculation: §cOff | 原版尺寸与位置计算：§c关闭 |
| `drippyloadingscreen.deepcustomization.overlay.progress_bar.original_size_pos_calc.desc` | If the bar's original size and position<br>calculation should be used.<br><br>§cTurning this OFF will enable you to<br>§cmanually move and resize the element. | 是否使用进度条原有的尺寸和位置计算方式。<br><br>§c关闭此项后，你可以手动移动元素并调整其大小。 |
| `drippyloadingscreen.deepcustomization.overlay.progress_bar.set_color` | Color [HEX] | 颜色 [HEX] |
| `drippyloadingscreen.deepcustomization.overlay.progress_bar.set_color.desc` | Set the color of the loading bar.<br>It has to be a valid HEX color.<br><br>§cClear the value to reset the%n%§ccolor back to the default one. | 设置加载条的颜色。<br>必须填写有效的十六进制颜色值。<br><br>§c清空此值即可将%n%§c颜色重置为默认值。 |
| `drippyloadingscreen.deepcustomization.overlay.background.set_color` | Background Color [HEX] | 背景颜色 [HEX] |
| `drippyloadingscreen.deepcustomization.overlay.background.set_color.desc` | Set the color of the loading screen<br>background.<br>It has to be a valid HEX color.<br><br>§cClear the value to reset the<br>§ccolor back to the default one. | 设置加载界面的背景颜色。<br>必须填写有效的十六进制颜色值。<br><br>§c清空此值即可将<br>§c颜色重置为默认值。 |
| `drippyloadingscreen.placeholders.general.loading_progress_percent` | Loading Progress [Percent] | 加载进度 [百分比] |
| `drippyloadingscreen.placeholders.general.loading_progress_percent.desc` | Gets the current game loading<br>progress in percent. | 获取当前游戏加载进度的百分比。 |
| `drippyloadingscreen.customization.msg.customizations_force_enabled` | You can't disable customizations<br>for this menu. | 无法禁用此界面的自定义效果。 |
| `drippyloadingscreen.config` | Drippy Loading Screen Settings | Drippy Loading Screen设置 |
| `drippyloadingscreen.config.button` | Configure Drippy | 配置Drippy |
| `drippyloadingscreen.config.button.desc` | Lets you configure Drippy Loading Screen. | 配置Drippy Loading Screen。 |
| `drippyloadingscreen.config.categories.general` | GENERAL | 常规 |
| `drippyloadingscreen.config.allow_universal_layouts` | Allow Universal Layouts | 允许通用布局 |
| `drippyloadingscreen.config.allow_universal_layouts.desc` | If universal layouts should get%%n%%applied to the loading screen. | 是否将通用布局%%n%%应用于加载界面。 |
| `drippyloadingscreen.config.early_fade_out_elements` | Early Fade-Out Elements | 元素提前淡出 |
| `drippyloadingscreen.config.early_fade_out_elements.desc` | If elements should start fading out earlier%%n%%than the loading screen background. | 是否让元素比加载界面的背景%%n%%更早开始淡出。 |
| `drippyloadingscreen.background.color` | Color [HEX] | 颜色 [HEX] |
| `drippyloadingscreen.background.color.desc` | A simple HEX color background. | 使用十六进制颜色值设置的纯色背景。 |
| `drippyloadingscreen.background.color.config` | Configure Color Background | 配置纯色背景 |
| `drippyloadingscreen.background.color.config.color` | HEX Color: | 十六进制颜色值： |
| `drippyloadingscreen.background.color.config.invalid_color` | §xYou need to input a valid HEX color first! | §x请先输入有效的十六进制颜色值！ |
| `drippyloadingscreen.elements.vanilla_bar` | Vanilla-Like Game Loading Bar [Drippy] | 仿原版游戏加载条 [Drippy] |
| `drippyloadingscreen.elements.vanilla_bar.desc` | This is a Vanilla-like game loading progress bar.<br>It will only display an actual progress<br>when used in a Drippy layout. | 仿原版的游戏加载进度条。<br>只有在Drippy布局中使用时，<br>才会显示实际进度。 |
| `drippyloadingscreen.elements.vanilla_bar.color` | Color [HEX] | 颜色 [HEX] |
| `drippyloadingscreen.settings.allow_universal` | Allow Universal Layouts: %s | 允许通用布局：%s |
| `drippyloadingscreen.settings.allow_universal.desc` | If universal layouts should get<br>applied to the loading screen. | 是否将通用布局<br>应用于加载界面。 |
| `drippyloadingscreen.settings.early_fade_out_elements` | Early Fade-Out Elements: %s | 元素提前淡出：%s |
| `drippyloadingscreen.settings.early_fade_out_elements.desc` | If loading screen elements should<br>start fading out before the background. | 是否让加载界面的元素<br>比背景更早开始淡出。 |
| `drippyloadingscreen.settings.wait_for_textures_in_loading` | Wait For Textures in Loading: %s | 加载时等待纹理：%s |
| `drippyloadingscreen.settings.wait_for_textures_in_loading.desc` | If the mod should wait for textures<br> in the loading screen to prevent them from<br>flickering while reloading resources.<br><br>Disable this if you experience freezes. | 是否等待加载界面中的纹理就绪，<br>以避免资源重载时出现闪烁。<br><br>如果出现卡死，请禁用此项。 |
| `drippyloadingscreen.settings.fade_out_loading_screen` | Fade-Out Loading Screen: %s | 加载界面淡出：%s |
| `drippyloadingscreen.settings.fade_out_loading_screen.desc` | If the loading screen should fade out. | 是否让加载界面淡出。 |
| `drippyloadingscreen.settings.customize_loading_screen` | Customize Loading Screen | 自定义加载界面 |

## 十项代表译文

- `drippyloadingscreen.edit_loading_screen.desc`：自定义加载界面 /  / 此按钮依附于FancyMenu的菜单栏。 / 隐藏菜单栏即可隐藏此按钮。
- `drippyloadingscreen.deepcustomization.overlay.logo.display_name`：Mojang标志
- `drippyloadingscreen.deepcustomization.overlay.progress_bar.display_name`：原版进度条
- `drippyloadingscreen.deepcustomization.overlay.progress_bar.set_color.desc`：设置加载条的颜色。 / 必须填写有效的十六进制颜色值。 /  / §c清空此值即可将%n%§c颜色重置为默认值。
- `drippyloadingscreen.placeholders.general.loading_progress_percent`：加载进度 [百分比]
- `drippyloadingscreen.customization.msg.customizations_force_enabled`：无法禁用此界面的自定义效果。
- `drippyloadingscreen.config.allow_universal_layouts`：允许通用布局
- `drippyloadingscreen.config.early_fade_out_elements`：元素提前淡出
- `drippyloadingscreen.background.color.config.invalid_color`：§x请先输入有效的十六进制颜色值！
- `drippyloadingscreen.settings.wait_for_textures_in_loading.desc`：是否等待加载界面中的纹理就绪， / 以避免资源重载时出现闪烁。 /  / 如果出现卡死，请禁用此项。

## 验证与限制

JSON解析、当前英文键对应及%s／%d参数检查通过；未进行游戏验证。标准键已逐条检查，不代表穷尽所有硬编码文本。未提交、打包或部署。
