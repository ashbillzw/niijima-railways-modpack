# ST052 Create Big Cannons

2026-10-18。当前5.8.2-mc.1.20.1-forge；726英文／693中文，全部语言对照已通读。本轮新增33、修正39。只适配当前键，不升级模组或导入新版机制。

## 上游对照

- [官方1.20/dev中文](https://github.com/Cannoneers-of-Create/CreateBigCannons/blob/9d4f8476bc2cb8ced1fc371d6680051f59cb4565/common/src/main/resources/assets/createbigcannons/lang/zh_cn.json)：693键。
- [官方create-v6-1.21.1中文](https://github.com/Cannoneers-of-Create/CreateBigCannons/blob/46a5d2ae9a53c1dc195919500e13f26ba812f2db/src/main/resources/assets/createbigcannons/lang/zh_cn.json)：738键，覆盖本版32/33缺译。[官方更新日志](https://github.com/Cannoneers-of-Create/CreateBigCannons/blob/create-v6-1.21.1/CHANGELOG.md)记录中文贡献；未穷尽翻译PR历史。

缺译主要复用新版，按已有俯仰角／方位角术语适配；补铜锭标签。新版Primed Propellant“已装填”不合当前实体倒计时爆炸行为，改“已点燃”；Wired Fuze 的 in flight 不能缩成“发射时”，译“飞行途中”。原文说额外interface areas，新版局限为动力接口，本轮用“接口区域”。

## 十条代表性译文

| 类型 | 已应用 |
| --- | --- |
| Cannon Mount Extension | 火炮底座延长器 |
| Fixed Cannon Mount | 固定式火炮底座 |
| Damp | 受潮 |
| Pitch Adjustment | 俯仰角调节 |
| Primed Propellant | 已点燃的发射药 |
| Wired Fuze | 有线引信 |
| Autocannon Barrel Flanged（原中文仍英文） | 带法兰的机炮炮管 |
| 投放试迫击炮（弹药名） | 投放式迫击炮弹 |
| 但方向机并不接受输入（错配了抛壳说明） | 弹壳将会从炮闩处排出 |
| 不同种类的弹药具有不同的能力 | 不同种类的弹药具有不同的容纳数量。 |

## 纠错依据及保留

“镙式”系列纠为“螺式”；青铜机炮炮闩毛坯原复制炮管名称；流体弹重复“装装备”、炮弹字幕“开发”、部件写作“原件”均修正。碰炸引信原复制延时碰炸说明，删掉不存在的延时计时，并把base fuze由“基础引信”纠为“弹底引信”；三种相关说明一致。当前ImpactFuzeItem与DelayedImpactFuzeItem字节码、PrimedPropellant倒计时及explode调用已保存于本机lang-audit/st052-*.txt。最大射速一条单位m/s，改炮口初速，避免与每分钟发数混淆。装药杆推的是弹药，不是火炮本体；spent casings为已使用弹壳而非铸件。

保留既有“客制化”、炮筒／炮管和通俗叙述；未整批照搬新版风格。胶刷／胶质刷头、炮胚／毛胚／炮坯、机械臂／动力臂、火炮构建器／套管器仍有术语与形态候选，后续结合模型／代码复核，不凭字面统一。快射炮闩点击侧面还是末端、引信移除面的具体交互、世界边界提示和方向机说明亦需进一步核实。缺键为零不等于全机制验收。

JSON、当前键存在性、全部缺键覆盖、格式占位符及强调标记检查通过。未全类硬编码扫描，未游戏验证、打包、提交或部署。

## 全部修改

| 键 | 原中文 | 已应用 |
| --- | --- | --- |
| `block.createbigcannons.cannon_mount_extension` | （缺失） | 火炮底座延长器 |
| `block.createbigcannons.fixed_cannon_mount` | （缺失） | 固定式火炮底座 |
| `block.createbigcannons.propellant.tooltip.damp` | （缺失） | 受潮 |
| `createbigcannons.fixed_cannon_mount.angle_pitch` | （缺失） | 俯仰角调节 |
| `createbigcannons.fixed_cannon_mount.angle_yaw` | （缺失） | 方位角调节 |
| `createbigcannons.ponder.cannon_mount/upside_down_cannon_mounts.header` | （缺失） | 将火炮底座倒置安装 |
| `createbigcannons.ponder.cannon_mount/upside_down_cannon_mounts.text_1` | （缺失） | 使用扳手右击火炮底座侧面，可将其旋转至面朝下方。 |
| `createbigcannons.ponder.cannon_mount/upside_down_cannon_mounts.text_2` | （缺失） | 火炮底座也可以倒置安装在方块底部。 |
| `createbigcannons.ponder.cannon_mount/using_extensions.header` | （缺失） | 使用火炮底座延长器 |
| `createbigcannons.ponder.cannon_mount/using_extensions.text_1` | （缺失） | 火炮底座延长器为火炮底座提供额外的接口区域。 |
| `createbigcannons.ponder.cannon_mount/using_extensions.text_2` | （缺失） | 它们会连接其侧面箭头指向的方向上的火炮底座。 |
| `createbigcannons.ponder.cannon_mount/using_fixed_cannon_mounts.header` | （缺失） | 使用固定式火炮底座 |
| `createbigcannons.ponder.cannon_mount/using_fixed_cannon_mounts.text_1` | （缺失） | 固定式火炮底座可用于将火炮瞄准同一位置。 |
| `createbigcannons.ponder.cannon_mount/using_fixed_cannon_mounts.text_2` | （缺失） | 它们不接入动力，必须通过侧面的面板调节角度。 |
| `createbigcannons.ponder.cannon_mount/using_fixed_cannon_mounts.text_3` | （缺失） | 与固定式火炮底座交互和与普通火炮底座交互的方式相同，也使用相同的控制面。 |
| `createbigcannons.ponder.cannon_mount/using_fixed_cannon_mounts.text_4` | （缺失） | 加载火炮 |
| `createbigcannons.ponder.cannon_mount/using_fixed_cannon_mounts.text_5` | （缺失） | 开火！ |
| `createbigcannons.ponder.cannon_mount/using_fixed_cannon_mounts.text_6` | （缺失） | 固定式火炮底座不能使用火炮底座延长器。 |
| `createbigcannons.ponder.cannon_mount/using_fixed_cannon_mounts.text_7` | （缺失） | 使用扳手可以旋转固定式火炮底座。 |
| `createbigcannons.ponder.munitions/wet_ammo_storage.header` | （缺失） | 浸水保护弹药及其副作用 |
| `createbigcannons.ponder.munitions/wet_ammo_storage.text_1` | （缺失） | 发射药和炮弹都很脆弱，遇到火焰或其他爆炸时会殉爆。 |
| `createbigcannons.ponder.munitions/wet_ammo_storage.text_2` | （缺失） | 将弹药浸水，可以让弹药块免受火焰和爆炸的伤害。 |
| `createbigcannons.ponder.munitions/wet_ammo_storage.text_3` | （缺失） | 但是，浸水会使发射药受潮。 |
| `createbigcannons.ponder.munitions/wet_ammo_storage.text_4` | （缺失） | 受潮的发射药威力减弱，而且如果放在大炮的第一节发射药位置，将无法点燃。 |
| `createbigcannons.ponder.munitions/wet_ammo_storage.text_5` | （缺失） | 要解决这个问题，必须让受潮的发射药自然晾干，不能像湿海绵那样用熔炉烘干。 |
| `createbigcannons.ponder.munitions/wet_ammo_storage.text_6` | （缺失） | 不过，把发射药放在下界这样的炎热环境中，它们就会像湿海绵一样迅速烘干。 |
| `entity.createbigcannons.primed_propellant` | （缺失） | 已点燃的发射药 |
| `item.createbigcannons.wired_fuze` | （缺失） | 有线引信 |
| `item.createbigcannons.wired_fuze.tooltip` | （缺失） | 有线引信 |
| `item.createbigcannons.wired_fuze.tooltip.behaviour1` | （缺失） | 引信在接收到红石信号时引爆。 |
| `item.createbigcannons.wired_fuze.tooltip.condition1` | （缺失） | 引爆 |
| `item.createbigcannons.wired_fuze.tooltip.summary` | （缺失） | 装有此引信的炮弹方块_接收到红石信号时_引爆。可用于制作_简易爆炸装置_。_飞行途中不会爆炸_。 |
| `tag.createbigcannons.ingot_copper` | （缺失） | 铜锭 |
| `cast_shape.createbigcannons.autocannon_barrel_flanged` | Autocannon Barrel Flanged | 带法兰的机炮炮管 |
| `block.createbigcannons.drop_mortar_shell` | 投放试迫击炮 | 投放式迫击炮弹 |
| `block.createbigcannons.drop_mortar_shell.tooltip` | 投放式迫击炮 | 投放式迫击炮弹 |
| `entity.createbigcannons.drop_mortar_shell` | 投放试迫击炮 | 投放式迫击炮弹 |
| `block.createbigcannons.drop_mortar_shell.tooltip.summary` | 轻型反实体_爆炸型_炮弹，只会对结构造成一点损伤。可通过_空投迫击型_火炮发射，也可用_传统方式发射_ | 轻型反实体_爆炸型_炮弹，只会对结构造成一点损伤。可通过_投入投放式迫击炮型火炮_发射，也可用_传统方式发射_。 |
| `block.createbigcannons.unbored_bronze_autocannon_breech` | 青铜机炮炮管炮胚（未打孔） | 青铜机炮炮闩炮胚（未打孔） |
| `block.createbigcannons.mortar_stone.tooltip.maximumCharges` | 最大射速 | 最大炮口初速 |
| `createbigcannons.ponder.cannon_mount/using_autocannons.text_3` | 但方向机并不接受输入 | 弹壳将会从炮闩处排出 |
| `createbigcannons.ponder.munitions/filling_autocannon_ammo_container.text_3` | 不同种类的弹药具有不同的能力 | 不同种类的弹药具有不同的容纳数量。 |
| `createbigcannons.subtitle.fire_drop_mortar` | 投放式迫击炮开发 | 投放式迫击炮开火 |
| `createbigcannons.subtitle.flak_round_explosion` | 高射炮爆炸 | 高射炮弹爆炸 |
| `item.createbigcannons.timed_fuze.tooltip` | 定时引线 | 定时引信 |
| `item.createbigcannons.impact_fuze.tooltip.behaviour1` | 引信_可能_会受_发射物的触碰_而引爆 | 引信_可能_会在_炮弹发生撞击_时引爆。 |
| `item.createbigcannons.impact_fuze.tooltip.summary` | 当_受到撞击_后，在一个_短暂的时间_后引爆。由于_简单的触发机械结构_，当受到碰撞后并不会百分百的触发记时。只能装配在炮弹_前端_。无法作为_基础引信_ | 炮弹_撞到物体_时引爆。由于触发机制_简单_，碰撞时不一定会引爆。只能安装在炮弹_前端_，不能作为_弹底引信_。 |
| `item.createbigcannons.tracer_tip.tooltip.summary` | 让机炮炮弹发光，使得枪线可见 | 让机炮炮弹发光，使弹道轨迹可见 |
| `item.createbigcannons.ram_rod.tooltip.action1` | 将弹药方块推进火炮更深处，同时如果可以也能将火炮方块推出来 | 将弹药方块推进火炮更深处，条件允许时也能将弹药方块推出火炮。 |
| `tag.createbigcannons.spent_autocannon_casings` | 已使用的机炮铸件 | 已使用的机炮弹壳 |
| `block.createbigcannons.fluid_shell.tooltip.behaviour2` | 这种流体弹只能通过_和安装引信相同的面_填充流体，如果已经装装备了引信，则流体弹_无法被填充_ | 这种流体弹只能通过_和安装引信相同的面_填充流体，如果已经装备了引信，则流体弹_无法被填充_ |
| `block.createbigcannons.incomplete_nethersteel_screw_breech` | 下界钢镙式炮闩（半成品） | 下界钢螺式炮闩（半成品） |
| `block.createbigcannons.incomplete_steel_screw_breech` | 钢制镙式炮闩（半成品） | 钢制螺式炮闩（半成品） |
| `block.createbigcannons.nethersteel_screw_breech` | 下界钢镙式炮闩 | 下界钢螺式炮闩 |
| `block.createbigcannons.screw_breech_cast_mould` | 镙式炮闩铸模 | 螺式炮闩铸模 |
| `block.createbigcannons.steel_screw_breech` | 钢制镙式炮闩 | 钢制螺式炮闩 |
| `block.createbigcannons.unbored_nethersteel_screw_breech` | 下界钢镙式炮闩炮胚（未打孔） | 下界钢螺式炮闩炮胚（未打孔） |
| `block.createbigcannons.unbored_steel_screw_breech` | 钢制镙式炮闩炮胚（未打孔） | 钢制螺式炮闩炮胚（未打孔） |
| `cast_shape.createbigcannons.screw_breech` | 镙式炮闩 | 螺式炮闩 |
| `createbigcannons.ponder.cannon_crafting/cannon_welder.text_3` | 右键两个临近的火炮方块来焊接他们 | 右键两个相邻的火炮方块来焊接它们 |
| `createbigcannons.ponder.cannon_mount/screw_breech.header` | 使用镙式炮闩 | 使用螺式炮闩 |
| `createbigcannons.ponder.cannon_mount/screw_breech.text_1` | 镙式炮闩作为一种坚固的炮尾，不会像楔式炮闩一样在材料强度方面受到影响 | 螺式炮闩作为一种坚固的炮尾，不会像楔式炮闩一样在材料强度方面受到影响 |
| `createbigcannons.ponder.cannon_mount/screw_breech.text_2` | 使用旋转力来为镙式炮闩开锁 | 使用旋转力来为螺式炮闩开锁 |
| `createbigcannons.ponder.cannon_mount/screw_breech.text_3` | 当镙式炮闩被彻底开锁后，可以使用动力结构将它从装弹路径上移开 | 当螺式炮闩被彻底开锁后，可以使用动力结构将它从装弹路径上移开 |
| `createbigcannons.ponder.cannon_mount/screw_breech.text_4` | 装弹完成后，为镙式炮闩闭锁以封闭身管 | 装弹完成后，为螺式炮闩闭锁以封闭身管 |
| `createbigcannons.ponder.munitions/cannon_loads.text_7` | 例如，铸铁材料足以扛得住住两份发射药 | 例如，铸铁材料足以扛得住两份发射药 |
| `death.attack.createbigcannons.machine_gun_fire.in_water` | %s 的被机枪打的千疮百孔，尸体染红了身后的河水 | %s 被机枪打得千疮百孔，尸体染红了身后的河水 |
| `emi.category.createbigcannons.incomplete_cannon_blocks` | 装配半成品原件 | 装配半成品部件 |
| `exception.createbigcannons.cannon_mount.hasIncompleteCannonBlocks` | [%s, %s, %s] 处的火炮原件还未加工完成 | [%s, %s, %s] 处的火炮部件还未加工完成 |
| `item.createbigcannons.delayed_impact_fuze.tooltip.summary` | 当_受到撞击_后，在一个_短暂的时间_后引爆。由于_简单的触发机械结构_，当受到碰撞后并不会百分百的触发记时。只能装配在炮弹_前端_。无法作为_基础引信_ | 当_受到撞击_后，在一个_短暂的时间_后引爆。由于_简单的触发机械结构_，当受到碰撞后并不会百分百的触发计时。只能装配在炮弹_前端_。无法作为_弹底引信_ |
| `item.createbigcannons.proximity_fuze.tooltip.summary` | 当靠近某个方块时引爆。只能装配在炮弹_前端_。无法作为_基础引信_ | 当靠近某个方块时引爆。只能装配在炮弹_前端_。无法作为_弹底引信_ |
| `recipe.createbigcannons.incomplete_cannon_blocks` | 装配半成品原件 | 装配半成品部件 |
