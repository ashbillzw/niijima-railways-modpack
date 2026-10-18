# ST003-Pantographs-and-Wires 上游复查

日期：2026-10-17。状态：已取得分支语言文件及差异候选；逐项采用评估进行中，本报告不代表已替换本地译文。

| 分支 | 文件 | 键数 |
| --- | --- | --- |
| 1.20.1 | [en_us.json · f57691c3bf6b](https://raw.githubusercontent.com/MisterJulsen/Create-Pantographs-And-Wires/f57691c3bf6b9e969bd9d00800754aacd1f89006/common/src/main/resources/assets/pantographsandwires/lang/en_us.json) | 42 |
| 1.20.1 | [zh_cn.json · f57691c3bf6b](https://raw.githubusercontent.com/MisterJulsen/Create-Pantographs-And-Wires/f57691c3bf6b9e969bd9d00800754aacd1f89006/common/src/main/resources/assets/pantographsandwires/lang/zh_cn.json) | 62 |
| auto-port/46-l10n_crowdin_translations-to-mc-1.20.1-C6-DL3 | [en_us.json · 238257df0540](https://raw.githubusercontent.com/MisterJulsen/Create-Pantographs-And-Wires/238257df05409cb4567670c507f1f8881ec98a77/common/src/main/resources/assets/pantographsandwires/lang/en_us.json) | 154 |
| mc/1.20.1-C5-DL3 | [en_us.json · 0e81920d2533](https://raw.githubusercontent.com/MisterJulsen/Create-Pantographs-And-Wires/0e81920d2533e9bd8b4f2d1a744b591d3a6c62f6/common/src/main/resources/assets/pantographsandwires/lang/en_us.json) | 122 |
| mc/1.20.1-C5 | [en_us.json · e3774b51d4eb](https://raw.githubusercontent.com/MisterJulsen/Create-Pantographs-And-Wires/e3774b51d4eb1a11d875d0aa72175b0532a26527/common/src/main/resources/assets/pantographsandwires/lang/en_us.json) | 122 |
| mc/1.20.1-C5 | [zh_cn.json · e3774b51d4eb](https://raw.githubusercontent.com/MisterJulsen/Create-Pantographs-And-Wires/e3774b51d4eb1a11d875d0aa72175b0532a26527/common/src/main/resources/assets/pantographsandwires/lang/zh_cn.json) | 125 |
| mc/1.20.1-C6-DL3 | [en_us.json · 3e18707bd8dd](https://raw.githubusercontent.com/MisterJulsen/Create-Pantographs-And-Wires/3e18707bd8dd5a3a568563ed84a233c68127f73b/common/src/main/resources/assets/pantographsandwires/lang/en_us.json) | 154 |
| mc/1.20.1-C6 | [en_us.json · 0a7bbbe112ac](https://raw.githubusercontent.com/MisterJulsen/Create-Pantographs-And-Wires/0a7bbbe112ac9462b3a58f53b31ed84f93685b70/common/src/main/resources/assets/pantographsandwires/lang/en_us.json) | 122 |
| mc/1.21.1 | [en_us.json · 8df5b91ab829](https://raw.githubusercontent.com/MisterJulsen/Create-Pantographs-And-Wires/8df5b91ab8296faa4d4b83d29b46cba3751d2e5d/common/src/main/resources/assets/pantographsandwires/lang/en_us.json) | 154 |

## 翻译 PR

- [Add zh_cn translation(checked)](https://github.com/MisterJulsen/Create-Pantographs-and-Wires/pull/16)：已合并：2026-03-07T20:35:32Z。
- [Add zh_cn translation](https://github.com/MisterJulsen/Create-Pantographs-and-Wires/pull/15)：未合并（关闭不等于合并）。

Create 5分支中文125键，与本地有效译文105处不同；新版默认分支树未见zh_cn文件，不等于整个项目无中文。上游把coal coke译为“焦煤”，本地“焦炭”保留；腕臂／接触网架、立柱形制及正反定位等需要技术上下文核实。用户要求先看风格例子，尚未决定专业／直观表达偏好。两条硬编码HUD仍不受语言JSON覆盖。

本机完整证据：`C:/mydata/Agents/Codex-CreateTrainResync/lang-audit/` 中对应 `*-upstream-recheck.json` 和分支语言文件。尚未游戏验证；下一步逐项比较英文语义、格式、已确认偏好再决定采用。

## 2026-10-18 差异逐项采用复查

已通读105条C5分支差异，结合之后已应用的用户偏好，保留接触网支架／安装座、导线张紧配重、接触线吊线、网格状钢支柱，不回退为腕臂等旧称。焦炭不改成焦煤。当前英文one_invalid_decoration_position是“%s个位置中有一处”，上游中文改成“有%s个不适合”错误；cannot_create当前英文确实包含连接已存在或连接点无效，保留本包完整解释。无额外应用；两条硬编码HUD仍是单独待办。

本次沿用上文已取得并固定到提交的上游文件；没有声称重新查询了最新远端。未游戏验证。
