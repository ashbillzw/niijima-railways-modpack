# ST049 Create: Numismatics — 阶段记录

日期：2026-10-17。状态：待讨论，尚未应用；不计入完成项或补译数量。

当前 CreateNumismatics-1.0.11+forge-mc1.20.1.jar 有 108 个英文键、无中文。官方 Layers-of-Railways/CreateNumismatics 的 1.20.1/1.0.x（18b06ac5f2c49603ff436002e57b3b24b374a718）及 1.21.1/1.0.x（f1e990607169bd7e1dda541091a4b176882bd951）所查 common/src/main/resources/assets/numismatics/lang/zh_cn.json 均为空对象；不是已有完整中文可直接复用。

## 用户待讨论事项

用户回复：“我觉得这个可以写个todo待讨论，因为我想直接改成X元币这样了（（”。因此暂不采用图案译名或保留英文的二选一；将“X元币”作为待讨论方案。六种币对应面额、计价基础和兑换关系尚未核定，不自行赋值，不调整经济机制。此项只针对当前模组，不推广为其他模组货币的永久偏好。

## 已做与接续

本机 `C:/mydata/Agents/Codex-CreateTrainResync/lang-audit/st049-draft.json` 保存 102 个非币名草稿，生成脚本为同目录 st049-draft.py；尚未写入包内语言覆盖。六种币名 Spur、Bevel、Sprocket、Cog、Crown、Sun 未定稿。草稿不可视为已交付翻译；下次结合币值讨论审校后再应用、验证并输出代表性译文。

已核对当前 VendorBlockEntity 的买卖模式：商户的 BUY/SELL 与顾客交互采用相反方向，不能为追求词面一致直接交换 action 文本。字节码证据保存在同目录 st049-VendorBlockEntity.txt 和 st049-VendorBlockEntity$Mode.class.txt。

用户要求当天停止，未运行游戏、未打包、未提交、未部署。待办见 agent/todo-list.md 的“汉化：Numismatics 币名与面额”。

## 2026-10-18 跨机保留

102键草稿已复制到仓库[未应用草稿](../草稿/ST049-Numismatics-未应用.json)，仅作为待审校资料，不在pack中，不包含六种待定币名。本机生成脚本及字节码证据另外保存在跨机交接资料包；旧本机路径仅供追溯。
