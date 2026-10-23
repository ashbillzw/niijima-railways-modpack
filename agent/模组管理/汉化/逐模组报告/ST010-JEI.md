# ST010-JEI

> **待办维护位置更新（2026-10-24）：** 本文的待办／下一步／候选清单保留为历史与技术依据，不再独立维护状态；有效任务统一见[总 todo](../../../todo-list.md)，炼药锅 mini todo 为例外。功能台账、测试步骤及来源证据仍在本文维护；旧“待实现／待决定”不覆盖总表及mini的最新结论。

日期：2026-10-17。包内文件：`jei-1.20.1-forge-15.56.0.205.jar`。

英文340键、原中文330键；本轮新增10键、修改已有条目8键。已通读语言条目并检查占位符；未完成全类硬编码审计或游戏验证。

## 上游比对

[已核对的官方同版本分支中文](https://github.com/mezz/JustEnoughItems/blob/95fe13052ab3a0eeb0bd371420a996c948eba0a5/Common/src/main/resources/assets/jei/lang/zh_cn.json)。当前英文对应键范围内与包内中文无差异，本次未假称新版已修复这些问题。公共API此前限流，本次使用git ls-remote及固定提交raw文件；其他新版分支和翻译PR仍待补查。

## 采用与纠错

补译配方前进、同步警告、翻页按钮和崩溃测试设置。后者仅翻译文字，不启用调试或崩溃功能。旧译把可配置按键写死为Shift，漏掉导航滚动条，漏译书签列表宽度，并混淆标签配方与配方原料标签；按本版英文纠正。旧键名含holdShift仍保留，不更改API键名。

## 十条代表性实际改动

| 英文 | 已应用 |
| --- | --- |
| Next Recipe | 下一配方 |
| Recipe Sync Warning | 配方同步警告 |
| Show a chat warning when the server doesn't provide synced recipes to JEI (e.g. vanilla servers, or servers without JEI installed). | 服务器未向JEI提供同步配方时，在聊天栏显示警告（例如原版服务器或未安装JEI的服务器）。 |
| Navigation Visibility | 翻页按钮可见性 |
| Visibility of the top page buttons. Use AUTO_HIDE to only show it when there are multiple pages. | 顶部翻页按钮的可见性。设为AUTO_HIDE时，仅在有多页内容时显示。 |
| Enable Crashing Test Items | 启用崩溃测试物品 |
| Adds ingredients to JEI that intentionally crash, to help debug JEI. | 向JEI添加会故意触发崩溃的原料，用于调试JEI。 |
| JEI is missing recipes. Please install JEI on the server to sync recipes to the client. | JEI缺少配方。请在服务器上安装JEI，将配方同步到客户端。 |
| Keybind for Bookmarks Tooltips | 显示书签提示框的按键 |
| Log Search Tree Statistics | 记录搜索树统计信息 |

## 完整改动明细

| 键 | 原中文 | 已应用 |
| --- | --- | --- |
| `key.jei.recipeForward` | （缺失） | 下一配方 |
| `jei.config.client.advanced.recipeSyncWarningEnabled` | （缺失） | 配方同步警告 |
| `jei.config.client.advanced.recipeSyncWarningEnabled.description` | （缺失） | 服务器未向JEI提供同步配方时，在聊天栏显示警告（例如原版服务器或未安装JEI的服务器）。 |
| `jei.config.client.ingredientList.buttonNavigationVisibility` | （缺失） | 翻页按钮可见性 |
| `jei.config.client.ingredientList.buttonNavigationVisibility.description` | （缺失） | 顶部翻页按钮的可见性。设为AUTO_HIDE时，仅在有多页内容时显示。 |
| `jei.config.client.bookmarkList.buttonNavigationVisibility` | （缺失） | 翻页按钮可见性 |
| `jei.config.client.bookmarkList.buttonNavigationVisibility.description` | （缺失） | 顶部翻页按钮的可见性。设为AUTO_HIDE时，仅在有多页内容时显示。 |
| `jei.config.debug.debug.crashingTestItemsEnabled` | （缺失） | 启用崩溃测试物品 |
| `jei.config.debug.debug.crashingTestItemsEnabled.description` | （缺失） | 向JEI添加会故意触发崩溃的原料，用于调试JEI。 |
| `jei.message.missing.recipes.from.server` | （缺失） | JEI缺少配方。请在服务器上安装JEI，将配方同步到客户端。 |
| `jei.tooltip.cheat.mode.how.to.disable.hover.config.button.hotkey` | “%s”此处以切换。 | 在此处按“%s”以切换。 |
| `jei.config.client.tooltips.holdShiftToShowBookmarkTooltipFeatures` | Shift显示书签提示框 | 显示书签提示框的按键 |
| `jei.config.client.tooltips.holdShiftToShowBookmarkTooltipFeatures.description` | 按住Shift以显示书签提示框。 | 按住设置的按键以显示书签提示框功能。 |
| `jei.config.client.cheating.showTagRecipesEnabled.description` | 显示配方原料的标签（例如物品标签、方块标签）。 | 显示物品标签、方块标签等原料标签的配方。 |
| `jei.config.client.ingredientList.navigationVisibility.description` | 顶部翻页按钮的可见性。AUTO_HIDE：仅在存在多页时显示按钮。 | 翻页按钮、滚动条等导航控件的可见性。设为AUTO_HIDE时，仅在列表内容超出显示区域时显示。 |
| `jei.config.client.bookmarkList.navigationVisibility.description` | 顶部翻页按钮的可见性。AUTO_HIDE：仅在存在多页时显示按钮。 | 翻页按钮、滚动条等导航控件的可见性。设为AUTO_HIDE时，仅在列表内容超出显示区域时显示。 |
| `jei.config.client.advanced.maxColumns.description` | 输入物品列表的最大宽度。 | 原料列表和书签列表叠加层的最大宽度。 |
| `jei.config.debug.debug.logSuffixTreeStats` | 日志搜索树统计信息 | 记录搜索树统计信息 |

验证：JSON解析、键存在性、格式占位符检查通过。仅本地语言覆盖，未构建、未运行游戏、未部署。
