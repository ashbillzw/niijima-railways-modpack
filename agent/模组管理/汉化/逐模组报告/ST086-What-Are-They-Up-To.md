# ST086 What-Are-They-Up-To 筛查报告

日期：2026-10-18。

## 结论

无标准语言键。聊天输入状态由watut-client.toml的screenTypingMultiplePlayersText和screenTypingText提供，分别补成“多人正在输入”和“ 正在输入”（保留拼接分隔空格）。另外有ConfigClient/Server设置描述和重载命令硬编码输出未补译；不是零文本模组。

## 检查范围与限制

检查当前JAR语言／特殊资源路径及class常量池中的英文短语候选；短词、动态拼接、内嵌依赖和代码路径可能遗漏，不将本筛查视为硬编码穷尽。新增2条配置值译文，旧译修正0。未游戏验证、编译替换JAR、提交或部署。
