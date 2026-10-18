# ST050 Create Crafts & Additions — 阶段记录

日期：2026-10-17。当前版本 createaddition-1.20.1-1.2.5.jar；259 个并集键（英文254／中文246），缺13。已通读语言对照，尚未应用任何本轮修改，不计为初筛完成。

本机证据目录：`C:/mydata/Agents/Codex-CreateTrainResync/lang-audit/`，包括 createaddition-review.json、createaddition-pairs.txt、createaddition-1.21.1-zh.json 和 st050-LargeConnectorBlockEntity.txt。

已发现待实施修正：琥珀金护身符提示误作“电子护身符”；线缆“已选择连接器”误作“已连接”；大型连接器提示最多8条，而当前字节码 getNodeCount 返回6，应按当前版本修正；蓄电池提示下划线不配对。其他候选需继续核对上下文。保留轧机与动力冲压机的区别；Push/Pull 方向未核实，不能盲目对调。

官方上游 https://raw.githubusercontent.com/mrh0/createaddition/1.21.1/src/main/resources/assets/createaddition/lang/zh_cn.json 于本日读取260键（可变分支快照，未固定提交）。新版仍含部分误译，不能直接覆盖；不整体采用连接器→接线器等纯风格更名。GitHub API 本次触发限流，原始文件仍可访问，不重复请求受限接口。

用户要求当天收尾；下次从此项继续核对、补齐缺键及留明细。未应用、未游戏验证、未打包、未提交。
