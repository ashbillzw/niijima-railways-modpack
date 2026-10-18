# ST050 Create Crafts & Additions — 阶段记录

日期：2026-10-17。当前版本 createaddition-1.20.1-1.2.5.jar；259 个并集键（英文254／中文246），缺13。已通读语言对照，尚未应用任何本轮修改，不计为初筛完成。

本机证据目录：`C:/mydata/Agents/Codex-CreateTrainResync/lang-audit/`，包括 createaddition-review.json、createaddition-pairs.txt、createaddition-1.21.1-zh.json 和 st050-LargeConnectorBlockEntity.txt。

已发现待实施修正：琥珀金护身符提示误作“电子护身符”；线缆“已选择连接器”误作“已连接”；大型连接器提示最多8条，而当前字节码 getNodeCount 返回6，应按当前版本修正；蓄电池提示下划线不配对。其他候选需继续核对上下文。保留轧机与动力冲压机的区别；Push/Pull 方向未核实，不能盲目对调。

官方上游 https://raw.githubusercontent.com/mrh0/createaddition/1.21.1/src/main/resources/assets/createaddition/lang/zh_cn.json 于本日读取260键（可变分支快照，未固定提交）。新版仍含部分误译，不能直接覆盖；不整体采用连接器→接线器等纯风格更名。GitHub API 本次触发限流，原始文件仍可访问，不重复请求受限接口。

用户要求当天收尾；下次从此项继续核对、补齐缺键及留明细。未应用、未游戏验证、未打包、未提交。

## 2026-10-18 继续审校并应用

此前“未应用”为暂停时状态。本轮新增13键、修正8个已有值；254个英文对应条目及5个中文额外键已通读，13个缺键补齐。累计计入初筛，不代表全部硬编码或游戏验收完成。

沿用已取得的官方新版译文作为参考；保留当前“连接器”体系，不照搬新版仍有的护身符误译和8连接数量。大型连接器6个节点由当前 getNodeCount 字节码确认；数字适配器的 Speedometer 对齐 Create 转速表。保留作者高脚杯的口语口吻，仅纠正 bottle 被写为另一只高脚杯。

### 代表性译文（10条）

| 用途 | 已应用 |
| --- | --- |
| `item.createaddition.diamond_grit_sandpaper.tooltip.summary` | 用来_打磨_物品的砂纸。可以用机械手来实现自动化。 |
| `item.createaddition.diamond_grit_sandpaper.tooltip.behaviour1` | 打磨_副手_中的物品，或_准星所指_的_地面_物品。 |
| `item.createaddition.spool.tooltip.behaviour1` | 解除它们之间的线缆连接，并返还对应的_线轴_。 |
| `itemGroup.createaddition.main` | 机械动力：创想附加 |
| `createaddition.subtitle.little_zap` | 特斯拉线圈：迸出火花 |
| `item.createaddition.electrum_amulet.tooltip` | 琥珀金护身符 |
| `statusbar.createaddition.wire.connect` | 已选择线缆连接器 |
| `block.createaddition.accumulator.tooltip.summary` | 存储电力。_已被弃用，可能会从未来版本中移除_。 |
| `item.createaddition.gold_goblet.tooltip.summary` | 用这个_高脚杯_喝水好像比用普通瓶子喝水更舒服。 |
| `block.createaddition.large_connector.tooltip.behaviour2` | 手持_金线轴_或_琥珀金线轴_时，可与最多 6 个其他_大型连接器_建立_线缆连接_。 |

### 全部改动

| 键 | 原中文 | 已应用 |
| --- | --- | --- |
| `item.createaddition.diamond_grit_sandpaper.tooltip.summary` | （缺失） | 用来_打磨_物品的砂纸。可以用机械手来实现自动化。 |
| `item.createaddition.diamond_grit_sandpaper.tooltip.condition1` | （缺失） | 使用时 |
| `item.createaddition.diamond_grit_sandpaper.tooltip.behaviour1` | （缺失） | 打磨_副手_中的物品，或_准星所指_的_地面_物品。 |
| `item.createaddition.spool.tooltip.condition1` | （缺失） | 右击两个已连接的连接器时 |
| `item.createaddition.spool.tooltip.behaviour1` | （缺失） | 解除它们之间的线缆连接，并返还对应的_线轴_。 |
| `itemGroup.createaddition.main` | （缺失） | 机械动力：创想附加 |
| `createaddition.subtitle.loud_zap` | （缺失） | 特斯拉线圈：电击 |
| `createaddition.subtitle.little_zap` | （缺失） | 特斯拉线圈：迸出火花 |
| `item.createaddition.electrum_amulet.tooltip` | 电子护身符 | 琥珀金护身符 |
| `statusbar.createaddition.wire.connect` | 线缆已连接 | 已选择线缆连接器 |
| `block.createaddition.accumulator.tooltip.summary` | 存储电力._已被弃用，_可能会从未来版本中移除_。 | 存储电力。_已被弃用，可能会从未来版本中移除_。 |
| `item.createaddition.gold_goblet.tooltip.summary` | 用这个_高脚杯_喝水好像比用普通高脚杯喝水更舒服。 | 用这个_高脚杯_喝水好像比用普通瓶子喝水更舒服。 |
| `item.createaddition.gold_goblet.tooltip` | 金高脚杯 | 奢华高脚杯 |
| `item.createaddition.copper_spool.tooltip.summary` | （缺失） | 用于存储线缆。 |
| `item.createaddition.festive_spool.tooltip.summary` | （缺失） | 用于存储线缆。 |
| `item.createaddition.gold_spool.tooltip.summary` | （缺失） | 用于存储线缆。 |
| `item.createaddition.electrum_spool.tooltip.summary` | （缺失） | 用于存储线缆。 |
| `item.createaddition.spool.tooltip.summary` | （缺失） | 用于存储线缆。 |
| `block.createaddition.large_connector.tooltip.behaviour2` | 手持_金线轴_或_琥珀金线轴_时，可与最多 8 个其他_大型连接器_建立_线缆连接_。 | 手持_金线轴_或_琥珀金线轴_时，可与最多 6 个其他_大型连接器_建立_线缆连接_。 |
| `createaddition.ponder.electric_motor.text_2` | 在背面上滚动鼠标滑轮可改变电动马达的转速输出 | 在背面上滚动鼠标滚轮可改变电动马达的转速输出 |
| `block.createaddition.digital_adapter.tooltip.summary` | 一种_计算机外围设备_，提供了控制_翻牌显示器_、_速度表_、_应力表_、_绳索滑轮_、_软管滑轮_，_升降机滑轮_，_动力活塞_、_动力轴承_和_转速控制器_的接口。 | 一种_计算机外围设备_，提供了控制_翻牌显示器_、_转速表_、_应力表_、_绳索滑轮_、_软管滑轮_，_升降机滑轮_，_动力活塞_、_动力轴承_和_转速控制器_的接口。 |

### 保留与验证限制

Push/Pull 的输入输出方向需结合网络视角，不仅根据英文词面翻转；本轮保留。能耗／发电量两条是否为速率尚需核对调用，未擅改。5个中文额外旧键保留；不改轧机名称。JSON、当前键存在性、全部缺键覆盖、占位符和强调标记检查通过，尚未游戏验证、打包或部署。
