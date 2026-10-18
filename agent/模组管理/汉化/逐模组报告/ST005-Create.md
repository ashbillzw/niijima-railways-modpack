# ST005 Create 本体：缺译与明确错误修正

日期：2026-10-17。包内版本 `create-1.20.1-0.5.1.j.jar`，SHA-1 `fab2ae7fcf685b3875ca20022bfecf0d4fdafbf7`。

本轮补译2键、纠错24键。保留原有3条AshBill电气化状态覆盖。英文2882键／原中文2871键；11个缺键中9个英文为空，2个流体名称已补齐。

## 审查范围与限制

完成全语言文件缺键、占位符、格式筛查；比较官方同版本及新版语言文件，新版存在309条英文未变但中文不同的条目。人工重点复核与机械工艺、轨道、界面操作相关的差异。本报告是阶段性审校，不宣称2871条旧译已逐条完成全项人工验收；其余上游差异继续复核。

## 上游证据

- [官方0.5.1分支中文](https://github.com/Creators-of-Create/Create/blob/d39f89983a6c36dcacda6635c2094c826703ed49/src/main/resources/assets/create/lang/zh_cn.json)：2871键。
- [官方1.20.1开发分支中文](https://github.com/Creators-of-Create/Create/blob/588124239141029c5321afd38d20c2eaf872b32b/src/main/resources/assets/create/lang/zh_cn.json)：3635键。
- [官方1.21.1开发分支中文](https://github.com/Creators-of-Create/Create/blob/7ff2760e4924d35d4bc2e22c4b19923f0178cd16/src/main/resources/assets/create/lang/zh_cn.json)：3619键。

已查询翻译PR索引，后续公共GitHub API返回403 rate limit exceeded，未反复重试。历史中文PR的合并细节尚未逐个核实，因此本次以已提交分支文件为引用依据，不将PR候选视为已合并。本机证据：`lang-audit/st005-upstream-recheck.json`、`st005-upstream-diff.txt`。

## 工艺名称与用户纠正

`create:mechanical_press` 为 Mechanical Press，旧中文“动力辊压机”误把冲压写成辊压；本轮名称、配方步骤、进度、思索及声音字幕一并改为冲压。CCA的 `createaddition:rolling_mill` 是另一方块，其当前中文“轧机”及轧制配方保留。不能按词面跨模组替换。

用户指出辊压与冲压不同，这属于技术误译，不应当作“熟悉名称／更准确名称”的偏好问题。此前该选项不视为仍待批准的改名；发条轴承须单独核实功能，当前未修改。

## 明确问题及采用范围

转速提示代码 `KineticBlockEntity.addToTooltip` 在调用 `tooltip.speedRequirement` 时传入长度0的参数数组；旧中文多余 `%1$s` 已删除，与英文及新版一致。轨道平滑曲线提示原错译为最高速度转动；轨道图graph原错译为图表；动力臂移除点数量原被写成点编号；蓝图选区原写成选项。修正重复字、蒸汽用字、显示链接器名称不一致，并补回两种机壳进度中去皮原木及金属材料信息。

尚不照搬新版的进度梗、整套标点／空格和文风改写；无线红石128／256格差异需同时核对包内配置，未仅凭新版自动改。

## 十条代表性实际译文

| 用途 | 本次译文 |
| --- | --- |
| Chocolate | 巧克力 |
| Mechanical Press | 动力冲压机 |
| Process in Press | 进行冲压 |
| Speed Requirement: | 需求转速： |
| Hold %1$s for maximized turn | 按住 %1$s 使列车轨道以最平滑的曲率放置 |
| No station on graph matches '%1$s' | 轨道网络中没有匹配“%1$s”的车站 |
| %1$s selected interaction point(s) removed due to range limitations. | 由于距离限制，%1$s个已选定的交互点已被移除。 |
| Creating a selection | 框选一个区域 |
| Apply Brass Ingots to stripped wood, creating a casing for more sophisticated machines | 对去皮原木使用黄铜锭，为更复杂的机器制作一个机壳 |
| Turn to move Piston/Pulley/Gantry | 驱动活塞／滑轮／起重机 |

## 完整改动

| 键 | 原中文 | 已应用 |
| --- | --- | --- |
| `fluid.create.chocolate` | （缺失） | 巧克力 |
| `fluid.create.honey` | （缺失） | 蜂蜜 |
| `create.tooltip.speedRequirement` | 需求转速：%1$s | 需求转速： |
| `create.track.hold_for_smooth_curve` | 按住 %1$s 使其以最高速度转动 | 按住 %1$s 使列车轨道以最平滑的曲率放置 |
| `create.item_attributes.astralsorcery_perk_gem` | 带有有星能力属性%1$s | 带有星能力属性%1$s |
| `create.mechanical_arm.points_outside_range` | 由于距离限制，选定的交互点%1$s已被移除 | 由于距离限制，%1$s个已选定的交互点已被移除。 |
| `create.train.status.no_match` | 在图表上没有匹配'%1$s'的车站 | 轨道网络中没有匹配“%1$s”的车站 |
| `create.hint.derailed_train.title` | 出轨的列车 | 脱轨的列车 |
| `item.create.schematic_and_quill.tooltip.condition1` | 创建一个选项 | 框选一个区域 |
| `create.ponder.display_board.text_4` | 使用显示连接器显示动态文本 | 使用显示链接器显示动态文本 |
| `create.gui.sequenced_gearshift.instruction.turn_distance.descriptive` | 开始驱动活塞/软管滑轮/起重机 | 驱动活塞／滑轮／起重机 |
| `advancement.create.steam_engine_maxed` | 蒸气充沛 | 蒸汽充沛 |
| `advancement.create.compacting.desc` | 使用动力辊压机与工作盆将多个物品压缩成一个 | 使用动力冲压机与工作盆将多个物品压缩成一个 |
| `advancement.create.mechanical_press.desc` | 使用动力辊压机压扁物品制成板材 | 使用动力冲压机压扁物品制成板材 |
| `advancement.create.track_crafting_factory.desc` | 用同一个动力辊压机制造1000个列车轨道 | 用同一个动力冲压机制造1000个列车轨道 |
| `block.create.mechanical_press` | 动力辊压机 | 动力冲压机 |
| `create.ponder.mechanical_press.header` | 使用动力辊压机处理物品 | 使用动力冲压机处理物品 |
| `create.ponder.mechanical_press.text_1` | 动力辊压机可以处理位于其下方的物品 | 动力冲压机可以处理位于其下方的物品 |
| `create.ponder.mechanical_press.text_4` | 辊压机会使物品停下，然后自动处理这一物品 | 冲压机会使物品停下，然后自动处理这一物品 |
| `create.ponder.mechanical_press_compacting.header` | 使用动力辊压机压缩物品 | 使用动力冲压机压缩物品 |
| `create.ponder.mechanical_press_compacting.text_1` | 对放置于工作盆内的物品进行辊压，可以将这些物品压缩在一起 | 对放置于工作盆内的物品进行冲压，可以将这些物品压缩在一起 |
| `create.recipe.assembly.pressing` | 进行辊压 | 进行冲压 |
| `create.subtitle.mechanical_press_activation` | 辊压机：工作中 | 冲压机：工作中 |
| `create.subtitle.mechanical_press_activation_belt` | 辊压机：撞击传送带 | 冲压机：撞击传送带 |
| `advancement.create.brass_casing.desc` | 用黄铜和木头制作一个黄铜机壳 | 对去皮原木使用黄铜锭，为更复杂的机器制作一个机壳 |
| `advancement.create.copper_casing.desc` | 使用铜和木头制作一个铜机壳 | 对去皮原木使用铜锭，为你的机器制作一个防水的机壳 |

验证：JSON解析、当前版本键存在性、占位符和成对强调标记检查通过。未启动游戏、未构建整包、未部署。当前仍有旧译人工审校待办。
