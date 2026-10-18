# ST095 Patchouli 筛查报告

日期：2026-10-18。

## 结论

90英文／89中文逐条对照。官方VazkiiMods/Patchouli的1.20.x（f5611094b5a6495e6024584b8c6f0f7537631384）及1.21.x（df6bde4ca0cd496188c914a22c25d751a098687d）Xplat/src/main/resources/assets/patchouli/lang/zh_cn.json均为89键，缺口仍在。补齐指南书实际键（原中文误挂旧.name键）、切换测试用页头；纠正“可解锁进度的书”为“通过进度解锁内容的书”。保留作者测试书和巨大界面的幽默。

新增2、修正1。标准语言范围与特殊资源检查完成；有硬编码者见上述待办，不能视为全量汉化。

## 应用明细

| 键 | 中文 |
|---|---|
| `item.patchouli.guide_book` | 指南书 |
| `patchouli.gui.lexicon.button.toggle_mock_header` | 切换测试用页头 |
| `item.patchouli:intro_book.landing` | 安装 $(item)Patchouli$() 后，模组和整合包作者可以制作易于阅读、通过进度解锁内容的$(thing)书籍$()了！ |

## 验证与限制

资源语法及当前键、格式参数检查通过（适用时）。硬编码通过类常量候选筛查，不保证穷尽；未游戏验证、提交、打包或部署。
