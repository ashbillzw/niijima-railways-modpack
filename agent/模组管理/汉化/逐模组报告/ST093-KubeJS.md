# ST093 KubeJS 筛查报告

日期：2026-10-18。

## 结论

无标准语言键不等于无文本。KubeJSErrorScreen有Open Log File、View Warnings、View Errors，KubeJSCommands有Item in hand、Click to copy等硬编码输出。本轮保留并登记代码层待办；没有添加不会生效的assets语言文件。特别是启动错误界面，依赖普通KubeJS脚本去修补自身启动失败不可靠，需独立实现或上游改动。

## 检查范围与限制

检查当前JAR语言／特殊资源路径及class常量池中的英文短语候选；短词、动态拼接、内嵌依赖和代码路径可能遗漏，不将本筛查视为硬编码穷尽。新增0、修正0。未游戏验证、编译替换JAR、提交或部署。
