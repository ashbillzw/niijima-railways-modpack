# ST087 More-Mob-Griefing-Options 筛查报告

日期：2026-10-18。

## 结论

无标准语言键，但MobGriefingCommand向命令使用者输出“mobGriefing is now/currently set to”等硬编码文字，ConfigOptionArgument还含“Unkown entity:”。这是上游英文笔误；单加语言JSON不会生效，命令输出汉化仍待代码层处理。本轮不改JAR。

## 检查范围与限制

检查当前JAR语言／特殊资源路径及class常量池中的英文短语候选；短词、动态拼接、内嵌依赖和代码路径可能遗漏，不将本筛查视为硬编码穷尽。新增0、修正0。未游戏验证、编译替换JAR、提交或部署。
