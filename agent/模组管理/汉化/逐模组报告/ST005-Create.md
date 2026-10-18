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

## 2026-10-18 第二轮：309条上游差异复查

已逐项读完本机309条同英文／不同中文的上游差异；新增纠错26条，累计本模组新增2／修正50。未将这视为2871条旧中文均已人工验收。大多数空格、标点和进度梗改写不采用；发条轴承改名仍不直接套用。新版train_signal_placement.text_2将“非玩家驾驶的列车”写成“信号机不受玩家控制”，语义偏离，保留旧译。红石有效范围128／256需配置／实现核对，暂不改。

本轮修正显示链接器被写成翻牌显示器、矿车装配站名称、显示列宽被写成列数、固定端接口代理范围、阈值提示、风扇位置，以及建筑工茶饮的物品／流体异名。蓝图加农炮帮助补齐原文替换条件，未更改实际行为。

| 键 | 旧译 | 修正 |
|---|---|---|
| `advancement.create.crushing_wheel.desc` | 制作一些能更快粉碎物品的粉碎轮 | 放置一对粉碎轮并为其供能 |
| `advancement.create.display_link.desc` | 使用翻牌显示器使资讯可视化 | 使用显示链接器使信息可视化 |
| `advancement.create.glass_pipe.desc` | 透过带窗的流体管道观察流体在管道中流淌，使用扳手可打开直线流体管道的窗户 | 对着内含流体的管道使用扳手 |
| `advancement.create.sturdy_sheet.desc` | 用精炼粉碎黑曜石装配坚固板 | 精炼黑曜石粉末以装配成坚固板 |
| `create.block.cart_assembler.invalid` | 请将矿车装配器放置在铁轨上 | 请将矿车装配站放置在铁轨上 |
| `create.contraption.controls.specific_actor_toggle` | %1$s 过滤: %2$s | %1$s 工作状态：%2$s |
| `create.contraption.minecart_contraption_too_big` | 这一矿车结构似乎太大了，无法变为拾捡状态 | 这一矿车结构似乎太大了，无法拾起 |
| `create.display_source.station_summary.platform_column` | 平台列数 | 站点名称列宽 |
| `create.display_source.station_summary.train_name_column` | 列车列数 | 列车名称列宽 |
| `create.gui.schematicannon.option.dontReplaceSolid` | 不要替换方块 | 不替换固体方块 |
| `create.gui.schematicannon.option.dontReplaceSolid.description` | 蓝图加农炮将不会替换工作范围内的任何固体方块 | 蓝图加农炮不会替换工作范围内的固体方块，只会替换非固体方块和空气。 |
| `create.gui.schematicannon.option.replaceWithAny.description` | 蓝图加农炮会使用任何所提供的方块来替换工作区域内的固体方块 | 如果蓝图在相应位置包含方块，蓝图加农炮就会替换工作范围内该位置原有的固体方块。 |
| `create.gui.schematicannon.option.replaceWithSolid.description` | 蓝图加农炮会使用所提供的固体方块来替换工作区域内的其他固体方块 | 只有蓝图在相应位置包含固体方块时，蓝图加农炮才会替换该位置原有的固体方块。 |
| `create.gui.schematicannon.option.replaceWithEmpty.description` | 蓝图加农炮将清理和替换工作区域内所有原本的方块 | 蓝图加农炮会清理并替换工作范围内所有原有方块，包括蓝图中对应为空气的位置。 |
| `create.logistics.filter.requires_item_in_inventory` | 在容器中需要 %1$s | 物品栏中需有%1$s |
| `create.ponder.portable_fluid_interface.text_5` | 接口连接状态下，方块化的接口便会作为整个动态结构流体储罐的代理 | 接口连接时，固定端的接口会代理动态结构上的所有流体储罐 |
| `create.ponder.portable_storage_interface.text_5` | 接口连接状态下，方块化的接口便会作为整个动态结构物品存储的代理 | 接口连接时，固定端的接口会代理动态结构上的所有物品容器 |
| `create.ponder.threshold_switch.text_2` | 当物品栏存量超过上限时…… | 当容器内存量超过设定的上阈值时…… |
| `create.ponder.threshold_switch.text_4` | 信号会在存量达到下限前维持 | 信号会持续输出，直到存量达到下阈值 |
| `create.ponder.train_assembly.text_11` | 可选的第二个允许从车站往两个方向出发 | 也可以添加第二个反向驾驶台，使列车能够从车站向两个方向出发 |
| `create.tooltip.chute.fans_pull_down` | 鼓风机从下方进行吸引 | 下方的鼓风机在吸引 |
| `create.tooltip.chute.fans_pull_up` | 鼓风机从上方进行吸引 | 上方的鼓风机在吸引 |
| `create.tooltip.chute.fans_push_down` | 鼓风机从上方进行推动 | 上方的鼓风机在推动 |
| `create.tooltip.chute.fans_push_up` | 鼓风机从下方进行推动 | 下方的鼓风机在推动 |
| `fluid.create.tea` | 建筑工茶水 | 建筑工茶饮 |
| `item.create.builders_tea` | 建造工茶饮 | 建筑工茶饮 |

JSON与参数校验通过；未游戏验证。

## 2026-10-18 第三轮：全量旧译人工通读

已通读原中文2871键：前两轮50个修正键复核后，剩余2821键逐项对照当前英文。此次追加30处明确纠错，累计新增2／修正80。全量通读不等于所有疑点已解决，更不等于游戏验收。

实现证据：当前JAR的ServerLagger.tick将tickTime直接传给Thread.sleep，因此两条TPS提示实际是每刻额外延迟毫秒。RedstoneLinkNetworkHandler.withinRange读取CLogistics.linkRange；包内defaultconfigs及两服存档配置目前均为256，提示明确标注整合包当前配置，配置改变时须同步此固定文本。反汇编见工作目录lang-audit/st005-killtps.txt、st005-link.txt。

| 键 | 旧译 | 修正 |
|---|---|---|
| `advancement.create.mechanical_arm.desc` | 制作动力臂，选择输入和输出，放置并给予它动力，然后看着它为你完成所有工作 | 看着你的动力臂运输第一个物品 |
| `advancement.create.potato_cannon_collide.desc` | 让两种土豆发射器发射出的弹射物相撞 | 让土豆加农炮发射的不同种类弹射物相撞 |
| `block.create.cut_andesite_brick_slab` | 切制安山岩砖台阶 | 切制安山岩砖块台阶 |
| `create.contraptions.clockwork.hour_first_24` | 24 小时制优先 | 24小时制时针优先 |
| `create.command.killTPSCommand.status.slowed_by.0` | [Create]: 服务器现在的 TPS 速度被降低为 %s ms :o | [Create]: 当前每个游戏刻额外延迟%s毫秒 :o |
| `create.command.killTPSCommand.status.slowed_by.1` | [Create]: 服务器现在的 TPS 速度被降低了 %s ms >:) | [Create]: 已将每个游戏刻的额外延迟设为%s毫秒 >:) |
| `create.gui.terrainzapper.brush.cuboid` | 矩形体 | 长方体 |
| `create.logistics.filter.click_to_replace` | 单击物品以替换 | 手持物品单击以替换 |
| `create.logistics.filter.click_to_set` | 单击物品以设置 | 手持物品单击以设置 |
| `create.minecart_coupling.too_far` | 矿车距离你太远了 | 矿车之间的距离太远了 |
| `create.ponder.cart_assembler.text_1` | 矿车装配站会将它所连接的结构安装到矿车上 | 通入红石信号的矿车装配站会将相连结构安装到经过的矿车上 |
| `create.ponder.cart_assembler_rails.text_1` | 放置在普通轨道上的矿车装配站并不会影响路过的矿车结构 | 放置在普通铁轨上的矿车装配站不会影响经过的矿车的运动 |
| `create.ponder.contraption_controls.text_2` | 动态结构控制器可以在运动时移动控制它们 | 动态结构控制器可以在结构运动时切换这些元件的工作状态 |
| `create.ponder.deployer.text_3` | 放在在它面前的方块不会阻拦它的工作 | 放在它面前的方块不会阻拦它的工作 |
| `create.ponder.depot.text_1` | 置物台可以被当成一个“静止的”传送带原件使用 | 置物台可以被当成一个“静止的”传送带元件使用 |
| `create.ponder.depot.text_4` | ……同时物品也可以被机械手存取 | ……也可以向动力臂提供物品 |
| `create.ponder.funnel_compat.text_2` | 动力锯 | 朝上的动力锯 |
| `create.ponder.large_cogwheel.text_1` | 大齿轮可以从特定的角度相互连接 | 大齿轮可以以直角相互连接 |
| `create.ponder.mechanical_crafter_covers.text_3` | 使用扳手在背面创建的的共享输入也可以跨越有盖的合成器 | 使用扳手在背面创建的共享输入也可以跨越有盖的合成器 |
| `create.ponder.mechanical_harvester.text_2` | 它会采收其路径上的作物，并重置这些作物的生长进度 | 它会采收路径上的成熟作物，并重置这些作物的生长进度 |
| `create.ponder.millstone.text_2` | 在其侧边使用齿轮与其相耦合，方可为其通入动力 | 可以在侧面使用齿轮为其提供动力 |
| `create.ponder.radial_chassis.text_6` | 若有物品与底盘的黏性面相接触…… | 若有方块与底盘的黏性面相邻…… |
| `create.ponder.redstone_link.text_4` | 接收端会发出由传输端发来的信号，有效距离为 128 格 | 接收端会输出范围内传输端发来的红石信号，当前整合包配置的有效距离为256格 |
| `create.ponder.shared.storage_on_contraption` | 与该结构相接的容器，会自动拾取结构遇到的掉落物 | 结构上的容器会自动收集该结构工作时产生的掉落物 |
| `create.ponder.smart_chute.text_3` | 使用面板可以指定被过滤的物品数量 | 使用面板可以指定每次提取的物品数量 |
| `create.ponder.train_signal_signaling.text_5` | 黄铜信号区间通常会产生标准信号 | 黄铜信号机所划分的区间通常通向标准信号机 |
| `create.track_signal.mode_change.entry_signal` | -> 如果区间未闭塞则允许通行 | -> 如果区间未被占用则允许通行 |
| `create.weighted_ejector.stack_size` | 弹射物品堆数量 | 每次弹射的物品数量 |
| `item.create.handheld_worldshaper.tooltip.behaviour2` | _放置_或_替换_目标方块 | 在目标位置应用所选的_塑形类型_和_填充类型_ |
| `item.create.linked_controller.tooltip.condition3` | 右击无线红石信号终端时 | 右击处于接收模式的无线红石信号终端时 |

保留待核对：软管填充高度相对于开口的精确层级；创造烈焰蛋糕热量切换是否存在旧版锁定语义；发条轴承／时钟轴承异名暂不自动推广改名；字母循环缺W同时存在于英文源，不能仅凭中文键修正；控制铁轨说明遗漏信号强度，待实际实现核对。

JSON、参数及强调标记检查通过；未启动游戏。

### 机制核对补充

再修正3处，累计新增2／修正83：

| 键 | 修正 | 依据 |
|---|---|---|
| advancement.create.clockwork_bearing.desc | 在发条轴承上组装结构 | 同一Clockwork Bearing的进度引用统一为包内现有方块名称；不将方块另改名时钟轴承 |
| block.create.controller_rail.tooltip.summary | 一种_单向动力铁轨_，通过输入的_红石信号强度_精细控制矿车的_移动速度_。 | 当前ControllerRailBlock.onMinecartPass读取POWER计算速度，calculatePower读取邻近信号 |
| item.create.creative_blaze_cake.tooltip.behaviour1 | 每次使用都会_切换_烈焰人燃烧室的热量等级 | applyCreativeFuel每次调用nextActiveLevel，不是再次使用后自动循环热量 |

软管高度：FluidFillingBehaviour扩展搜索时明确跳过UP，因此不会向上扩散；英语“layer above the hose end”涉及渲染开口相对rootPos的位置，尚未确认，保留原中文，不凭英文直接加一格。此为候选，不阻止本次全量初筛完成。字母循环的缺W是英中共有源数据，不当作缺译。后续仍需游戏验证、外部硬编码及候选核对。
