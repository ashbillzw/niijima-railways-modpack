# ST015 FTB Library

日期：2026-10-17。包内文件：`ftb-library-forge-2001.2.13.jar`。

英文99键、原中文53键；本轮新增43键、修正已有6键。全部标准语言条目初筛，未做全类硬编码审计或游戏验证。

## 上游复查

- [官方1.20.1固定提交](https://github.com/FTBTeam/FTB-Library/tree/a5e77c17763c56b1fda75a11e24849f9fee92fb1)；检查`common/src/main/resources/assets/ftblibrary/lang/`中的英文与中文。
- [官方1.21.1固定提交](https://github.com/FTBTeam/FTB-Library/tree/ba8962d4b4dcff22041824c792fe07ae21fe28d5)；检查`common/src/main/resources/assets/ftblibrary/lang/`中的英文与中文。

针对三仓库的中文翻译PR进行了公开搜索，结果未能可靠定位具体中文PR；不能据此认定不存在，完整PR状态检查仍待补。

1.20.1中文与包内一致；1.21.1有113条中文，按当前键范围复用缺失项，不添加新版无对应的功能。另补旧版侧栏分组。JEI、REI、Hyperbox保留专名，不计补译。

未盲用新版中的“关键参考”：包内KeyReferenceScreen证明是按键说明，译为“按键参考”。修正搜索占位提示、已保存／已加载状态、服务器强制值被误写成强制加载、列表模式，并补回NBT左右键说明与颜色代码。NBT列表数量用条目而非误导为物品堆叠。

潜在问题保留：Set Size（当前“设置大小”）和Capabilities（当前“编辑功能”）需继续核对动态键的实际控件上下文，本轮未猜测改写。

## 十条代表性实际改动

| 英文 | 已应用 |
| --- | --- |
| Saved | 已保存 |
| Search... | 搜索…… |
| Server Forced: %s | 服务器强制值：%s |
| Edit NBT<br>§7Left-click: quick string editor<br>§7Right-click: interactive NBT editor | 编辑NBT<br>§7左键：快捷文本编辑器<br>§7右键：交互式NBT编辑器 |
| Key Reference | 按键参考 |
| Scanning for images: this could take a few seconds... | 正在扫描图像：这可能需要几秒钟… |
| Right-click on a tank to empty the container | 右击储罐以清空容器 |
| NBT copied to clipboard | NBT已复制到剪贴板 |
| Discard unsaved changes? | 放弃未保存的更改？ |
| Show Mod Name in Item Select GUI | 在物品选择界面显示模组名称 |

## 完整改动

| 键 | 原中文 | 已应用 |
| --- | --- | --- |
| `ftblibrary.select_fluid.list_mode.all` | （缺失） | 所有流体 |
| `ftblibrary.select_image.scanning` | （缺失） | 正在扫描图像：这可能需要几秒钟… |
| `ftblibrary.select_image.rescan` | （缺失） | 重新扫描图像 |
| `ftblibrary.select_image.all_images` | （缺失） | 所有图像 |
| `ftblibrary.unsaved_changes` | （缺失） | 放弃未保存的更改？ |
| `item.ftblibrary.fluid_container` | （缺失） | 流体容器 |
| `item.ftblibrary.fluid_container.use` | （缺失） | 右击储罐以清空容器 |
| `ftblibrary.mb` | （缺失） | %d mB / %s |
| `ftblibrary.empty` | （缺失） | 空 |
| `ftblibrary.gui.listSize1` | （缺失） | 1个条目 |
| `ftblibrary.gui.listSize` | （缺失） | %d个条目 |
| `ftblibrary.gui.error` | （缺失） | 错误！ |
| `ftblibrary.gui.nbt_copied` | （缺失） | NBT已复制到剪贴板 |
| `ftblibrary.gui.edit_tag_name` | （缺失） | 编辑标签名称 |
| `ftblibrary.gui.edit_tag_value` | （缺失） | 编辑标签值 |
| `ftblibrary.gui.no_selection` | （缺失） | 未选择任何内容 |
| `ftblibrary.gui.key_reference` | （缺失） | 按键参考 |
| `ftblibrary.client_settings` | （缺失） | 客户端配置 |
| `ftblibrary.client_settings.tooltips.item_modname` | （缺失） | 在物品选择界面显示模组名称 |
| `ftblibrary.client_settings.tooltips.fluid_modname` | （缺失） | 在流体选择界面显示模组名称 |
| `ftblibrary.client_settings.tooltips.image_modname` | （缺失） | 在图像选择界面显示模组名称 |
| `ftblibrary.palette.chat` | （缺失） | 聊天颜色 |
| `ftblibrary.palette.dye` | （缺失） | 染料颜色 |
| `ftblibrary.palette.nord` | （缺失） | Nord主题 |
| `ftblibrary.palette.reds` | （缺失） | 红色 |
| `ftblibrary.palette.greens` | （缺失） | 绿色 |
| `ftblibrary.palette.blues` | （缺失） | 蓝色 |
| `ftblibrary.palette.recent` | （缺失） | 最近使用的颜色 |
| `ftblibrary.panel.position.top_left` | （缺失） | 左上 |
| `ftblibrary.panel.position.top` | （缺失） | 上 |
| `ftblibrary.panel.position.top_right` | （缺失） | 右上 |
| `ftblibrary.panel.position.left` | （缺失） | 左 |
| `ftblibrary.panel.position.right` | （缺失） | 右 |
| `ftblibrary.panel.position.bottom_left` | （缺失） | 左下 |
| `ftblibrary.panel.position.bottom` | （缺失） | 下 |
| `ftblibrary.panel.position.bottom_right` | （缺失） | 右下 |
| `dimension.minecraft.overworld` | （缺失） | 主世界 |
| `dimension.minecraft.the_nether` | （缺失） | 下界 |
| `dimension.minecraft.the_end` | （缺失） | 末地 |
| `dimension.ae2.spatial_storage` | （缺失） | AE2空间存储 |
| `sidebar_group.ftblibrary.info` | （缺失） | FTB Library — 信息 |
| `sidebar_group.ftblibrary.cheat` | （缺失） | FTB Library — 作弊 |
| `sidebar_group.ftblibrary.util` | （缺失） | FTB Library — 工具 |
| `gui.saved` | 保存 | 已保存 |
| `gui.loaded` | 加载 | 已加载 |
| `gui.search_box` | 搜索中... | 搜索…… |
| `gui.server_forced` | 服务器强制加载: %s | 服务器强制值：%s |
| `ftblibrary.select_item.list_mode` | 列出模式 | 列表模式 |
| `ftblibrary.select_item.nbt` | 编辑NBT | 编辑NBT<br>§7左键：快捷文本编辑器<br>§7右键：交互式NBT编辑器 |

验证：JSON解析、键存在性、有效缺键清单、占位符和颜色代码检查通过（TeamArgument源文修复有独立例外证据）。未运行游戏、未部署、未提交。
