# ST101 Konkrete 筛查报告

日期：2026-10-18。

## 结论

独立.local系统14条全部补译。javap确认Konkrete.initLocals将4种内置语言复制至config/konkrete/locals后读取该目录全部.local，故新增zh_cn.local可被发现，不会由4种内置文件的复制覆盖。Locals按首个=拆分键值。仍有文件选择器／配置界面的硬编码文本候选，独立14条完成不代表全部代码文本完成。

新增14、修正0。标准语言范围与特殊资源检查完成；有硬编码者见上述待办，不能视为全量汉化。

## 应用明细

| 键 | 中文 |
|---|---|
| `general.width` | 宽度 |
| `general.height` | 高度 |
| `general.on` | 开启 |
| `general.off` | 关闭 |
| `popup.done` | 完成 |
| `popup.yesno.confirm` | 确认 |
| `popup.yesno.cancel` | 取消 |
| `popup.notification.accept` | 接受 |
| `popup.choosefile.back` | 返回 |
| `popup.choosefile.title` | 选择文件 |
| `popup.choosefile.choose` | 选择 |
| `popup.choosefile.supported` | 支持的文件类型： |
| `configscreen.boolean.enabled` | 已启用 |
| `configscreen.boolean.disabled` | 已禁用 |

## 十项代表译文

- `general.width`：宽度
- `general.height`：高度
- `general.on`：开启
- `popup.done`：完成
- `popup.yesno.confirm`：确认
- `popup.yesno.cancel`：取消
- `popup.notification.accept`：接受
- `popup.choosefile.title`：选择文件
- `popup.choosefile.choose`：选择
- `popup.choosefile.supported`：支持的文件类型：

## 验证与限制

资源语法及当前键、格式参数检查通过（适用时）。硬编码通过类常量候选筛查，不保证穷尽；未游戏验证、提交、打包或部署。
