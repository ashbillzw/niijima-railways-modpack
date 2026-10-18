# ST028 OneEnoughItem

日期：2026-10-17。包内`OneEnoughItem-Forge-1.0.5.1.jar`。

## 结果

161条中英文通读，无缺译；品牌名保留。修正两条Web编辑器启动消息的语序，保留%s地址参数：

| 键后缀 | 已应用 |
| --- | --- |
| `webeditor.open_browser` | Web编辑器已在 %s 启动，正在尝试通过系统命令打开浏览器 |
| `webeditor.open_browser_manual` | Web编辑器已在 %s 启动，请手动用浏览器访问 |

## 上下文核查与保留

- `object.element_up/down`英文为Element Up／Down，中文均为对象元素但保留▲／▼。当前JAR的ObjectDropdownController.buildDropdownButtonText按布尔状态选标签并附当前对象索引；这是下拉按钮状态，不是已证实的“上移／下移元素”命令，不能误改成移动操作。
- OneEnoughItem品牌标题和快捷键分类名不计作漏译。
- ModernFix／现代化修复混用、匹配项／匹配物品、选择／选取均列为一致性候选，目前未造成操作含义错误，保留。
- 配方去重结果消息中“已经移除”可能实际只生成脚本，需核对完整执行顺序及/reload条件，未单凭字面改状态。
- 没有执行规则编辑器、删除脚本、配方去重、修改ModernFix或/reload；本轮仅语言资源审校。

## 上游与验证限制

公开搜索未定位到可确认的官方源码仓库；根据作者名探测的Mafuyu404/OneEnoughItem返回404，不能据此断言项目没有源码或新版中文。本轮以实际JAR为依据，上游比对未完成。

JSON及161条占位符检查通过。未全类扫描硬编码及游戏内验证，未提交、部署。两条修正全部列出，没有10条新增译文。本机语言快照及下拉控制器反汇编在`lang-audit/st028-*`。
