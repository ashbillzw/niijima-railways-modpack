# ST038 Create: Design n’ Decor

日期：2026-10-17。包内design_decor-0.4.0b-1.20.1.jar。488条英文、无内置中文；本轮补译488，既有中文修正0。全部英文名称与生成规则已初筛，未游戏验收。

## 上游与命名依据

官方[1.20.1固定提交](https://github.com/DrMango14/Create-Design-n-Decor/tree/41a95502ad54a06effa6bc14e15bbf44fe7011db)和[1.21.1固定提交](https://github.com/DrMango14/Create-Design-n-Decor/tree/f02279354b2256019e1eb125139600b6aad8cb43)的递归文件树未找到zh_cn.json。本轮自行翻译，不声称穷尽所有PR或社区译文。

- Create材质沿用包内皓蓝石、绯红岩、赭金砂、辉绿岩、熔渣、焦黑熔渣、石灰岩；功能名称沿用粉碎轮、石磨、金属梁、边框玻璃。
- 匠魂兼容材质参考[官方1.20.1中文](https://github.com/SlimeKnights/TinkersConstruct/blob/1.20.1/src/main/resources/assets/tconstruct/lang/zh_cn.json)：黑色科林斯青铜、玛玉灵、生铁、皇后史莱姆、骑士史莱姆；本机保存参考快照。并非为此安装匠魂。
- 材质＋构件直接组成短名，不添加多余“的”。数字牌不照抄英文Letter误称字母牌。
- Bun牌贴图是粉红兔头，译兔子标志牌，不能按面包义直译。American注册ID显示Oil Sign，译石油标志牌；按显示内容与贴图，不机械翻译ID。
- Lamp模型是可贴六面的薄灯，Light模型为完整立方体，分别译贴面灯／灯块；Metal Plate／Sheet保持金属板／金属薄板的名称区别。
- Capitalism系列保留作者资本主义梗，Silly牌为搞怪标志牌。材质和注册ID不改。

## 十条代表性译文

| 英文 | 已应用 |
| --- | --- |
| Asurine Crushing Wheel | 皓蓝石粉碎轮 |
| Brass Catwalk | 黄铜检修走道 |
| Compact Fluid Tank | 紧凑型流体储罐 |
| Diagonal Metal Support | 斜金属支架 |
| Bun Sign | 兔子标志牌 |
| Stepped Lever | 分档拉杆 |
| Ceiling Fan | 吊扇 |
| Horizontal Tinted Framed Glass | 水平遮光边框玻璃 |
| Large Hepatizon Chain | 大型黑色科林斯青铜锁链 |
| Cardboard Sheet | 纸板 |

## 待核查

- Castel按城堡装饰砖／瓦系列处理，具体图案和显示长度待游戏检查。
- 多个boiler_large/structure与special原文本同名，保留同名；不擅自添加未经证实的功能。strong_bronze与bronze原英文也同名，本轮均译青铜，是否需区分兼容材质另核查。
- 材质兼容对象未安装时，名称完成不代表对应物品实际可用。锅炉是否有独立工作能力不从名称推断，未修改说明或程序。
- 所有488项均有中文；JSON键集、占位符、路径大小写检查通过。未复制实例、打包、提交或部署，尚未检查游戏内搜索、按钮/物品提示宽度及全部模型。

## 全部补译明细

| 键 | 英文 | 中文 |
| --- | --- | --- |
| `block.design_decor.0_sign` | 0 Letter Sign | 数字0标志牌 |
| `block.design_decor.1_sign` | 1 Letter Sign | 数字1标志牌 |
| `block.design_decor.2_sign` | 2 Letter Sign | 数字2标志牌 |
| `block.design_decor.3_sign` | 3 Letter Sign | 数字3标志牌 |
| `block.design_decor.4_sign` | 4 Letter Sign | 数字4标志牌 |
| `block.design_decor.5_sign` | 5 Letter Sign | 数字5标志牌 |
| `block.design_decor.6_sign` | 6 Letter Sign | 数字6标志牌 |
| `block.design_decor.7_sign` | 7 Letter Sign | 数字7标志牌 |
| `block.design_decor.8_sign` | 8 Letter Sign | 数字8标志牌 |
| `block.design_decor.9_sign` | 9 Letter Sign | 数字9标志牌 |
| `block.design_decor.a_sign` | A Letter Sign | 字母A标志牌 |
| `block.design_decor.aluminium_boiler` | Aluminium Boiler | 铝锅炉 |
| `block.design_decor.aluminium_boiler_large` | Large Aluminium Boiler | 大型铝锅炉 |
| `block.design_decor.aluminium_boiler_special` | Aluminium Boiler | 铝锅炉 |
| `block.design_decor.aluminium_boiler_structure` | Large Aluminium Boiler | 大型铝锅炉 |
| `block.design_decor.aluminium_large_chain` | Large Aluminium Chain | 大型铝锁链 |
| `block.design_decor.american_sign` | Oil Sign | 石油标志牌 |
| `block.design_decor.andesite_boiler` | Andesite Boiler | 安山岩锅炉 |
| `block.design_decor.andesite_boiler_large` | Large Andesite Boiler | 大型安山岩锅炉 |
| `block.design_decor.andesite_boiler_structure` | Large Andesite Boiler | 大型安山岩锅炉 |
| `block.design_decor.andesite_castel_brick_slab` | Andesite Castel Brick Slab | 安山岩城堡砖台阶 |
| `block.design_decor.andesite_castel_brick_stairs` | Andesite Castel Brick Stairs | 安山岩城堡砖楼梯 |
| `block.design_decor.andesite_castel_brick_wall` | Andesite Castel Brick Wall | 安山岩城堡砖墙 |
| `block.design_decor.andesite_castel_bricks` | Andesite Castel Bricks | 安山岩城堡砖 |
| `block.design_decor.andesite_castel_tile_slab` | Andesite Castel Tile Slab | 安山岩城堡瓦台阶 |
| `block.design_decor.andesite_castel_tile_stairs` | Andesite Castel Tile Stairs | 安山岩城堡瓦楼梯 |
| `block.design_decor.andesite_castel_tile_wall` | Andesite Castel Tile Wall | 安山岩城堡瓦墙 |
| `block.design_decor.andesite_castel_tiles` | Andesite Castel Tiles | 安山岩城堡瓦 |
| `block.design_decor.andesite_floodlight` | Andesite Floodlight | 安山岩泛光灯 |
| `block.design_decor.andesite_large_chain` | Large Andesite Chain | 大型安山岩锁链 |
| `block.design_decor.arrow_down_sign` | Arrow Down Sign | 向下箭头标志牌 |
| `block.design_decor.arrow_left_sign` | Arrow Left Sign | 向左箭头标志牌 |
| `block.design_decor.arrow_right_sign` | Arrow Right Sign | 向右箭头标志牌 |
| `block.design_decor.arrow_up_sign` | Arrow Up Sign | 向上箭头标志牌 |
| `block.design_decor.asurine_castel_brick_slab` | Asurine Castel Brick Slab | 皓蓝石城堡砖台阶 |
| `block.design_decor.asurine_castel_brick_stairs` | Asurine Castel Brick Stairs | 皓蓝石城堡砖楼梯 |
| `block.design_decor.asurine_castel_brick_wall` | Asurine Castel Brick Wall | 皓蓝石城堡砖墙 |
| `block.design_decor.asurine_castel_bricks` | Asurine Castel Bricks | 皓蓝石城堡砖 |
| `block.design_decor.asurine_castel_tile_slab` | Asurine Castel Tile Slab | 皓蓝石城堡瓦台阶 |
| `block.design_decor.asurine_castel_tile_stairs` | Asurine Castel Tile Stairs | 皓蓝石城堡瓦楼梯 |
| `block.design_decor.asurine_castel_tile_wall` | Asurine Castel Tile Wall | 皓蓝石城堡瓦墙 |
| `block.design_decor.asurine_castel_tiles` | Asurine Castel Tiles | 皓蓝石城堡瓦 |
| `block.design_decor.asurine_crushing_wheel` | Asurine Crushing Wheel | 皓蓝石粉碎轮 |
| `block.design_decor.asurine_millstone` | Asurine Millstone | 皓蓝石石磨 |
| `block.design_decor.b_sign` | B Letter Sign | 字母B标志牌 |
| `block.design_decor.biohazard_sign` | Biohazard Sign | 生物危害标志牌 |
| `block.design_decor.black_metal_plate` | Black Metal Plate | 黑色金属板 |
| `block.design_decor.black_metal_plate_slab` | Black Metal Plate Slab | 黑色金属板台阶 |
| `block.design_decor.black_metal_plate_stairs` | Black Metal Plate Stairs | 黑色金属板楼梯 |
| `block.design_decor.black_metal_plate_wall` | Black Metal Plate Wall | 黑色金属板墙 |
| `block.design_decor.black_metal_sheet` | Black Metal Sheet | 黑色金属薄板 |
| `block.design_decor.black_metal_sheet_slab` | Black Metal Sheet Slab | 黑色金属薄板台阶 |
| `block.design_decor.black_metal_sheet_stairs` | Black Metal Sheet Stairs | 黑色金属薄板楼梯 |
| `block.design_decor.black_metal_sheet_wall` | Black Metal Sheet Wall | 黑色金属薄板墙 |
| `block.design_decor.black_wallpaper_wavy` | Black Wavy Wallpaper | 黑色波纹壁纸 |
| `block.design_decor.blank_sign` | Blank Sign | 空白标志牌 |
| `block.design_decor.blue_container` | Blue Container | 蓝色集装箱 |
| `block.design_decor.blue_metal_plate` | Blue Metal Plate | 蓝色金属板 |
| `block.design_decor.blue_metal_plate_slab` | Blue Metal Plate Slab | 蓝色金属板台阶 |
| `block.design_decor.blue_metal_plate_stairs` | Blue Metal Plate Stairs | 蓝色金属板楼梯 |
| `block.design_decor.blue_metal_plate_wall` | Blue Metal Plate Wall | 蓝色金属板墙 |
| `block.design_decor.blue_metal_sheet` | Blue Metal Sheet | 蓝色金属薄板 |
| `block.design_decor.blue_metal_sheet_slab` | Blue Metal Sheet Slab | 蓝色金属薄板台阶 |
| `block.design_decor.blue_metal_sheet_stairs` | Blue Metal Sheet Stairs | 蓝色金属薄板楼梯 |
| `block.design_decor.blue_metal_sheet_wall` | Blue Metal Sheet Wall | 蓝色金属薄板墙 |
| `block.design_decor.blue_wallpaper_wavy` | Blue Wavy Wallpaper | 蓝色波纹壁纸 |
| `block.design_decor.brass_boiler` | Brass Boiler | 黄铜锅炉 |
| `block.design_decor.brass_boiler_large` | Large Brass Boiler | 大型黄铜锅炉 |
| `block.design_decor.brass_boiler_structure` | Large Brass Boiler | 大型黄铜锅炉 |
| `block.design_decor.brass_bolt` | Brass Bolt | 黄铜螺栓 |
| `block.design_decor.brass_catwalk` | Brass Catwalk | 黄铜检修走道 |
| `block.design_decor.brass_floodlight` | Brass Floodlight | 黄铜泛光灯 |
| `block.design_decor.brass_floor` | Brass Floor | 黄铜地板 |
| `block.design_decor.brass_lamp` | Brass Lamp | 黄铜贴面灯 |
| `block.design_decor.brass_large_chain` | Large Brass Chain | 大型黄铜锁链 |
| `block.design_decor.brass_light` | Brass Light | 黄铜灯块 |
| `block.design_decor.brass_railing` | Brass Railing | 黄铜栏杆 |
| `block.design_decor.brass_screw` | Brass Screw | 黄铜螺钉 |
| `block.design_decor.breaker_switch` | Breaker Switch | 断路开关 |
| `block.design_decor.broken_wrench_sign` | Broken Wrench Sign | 断裂扳手标志牌 |
| `block.design_decor.bronze_large_chain` | Large Bronze Chain | 大型青铜锁链 |
| `block.design_decor.brown_metal_plate` | Brown Metal Plate | 棕色金属板 |
| `block.design_decor.brown_metal_plate_slab` | Brown Metal Plate Slab | 棕色金属板台阶 |
| `block.design_decor.brown_metal_plate_stairs` | Brown Metal Plate Stairs | 棕色金属板楼梯 |
| `block.design_decor.brown_metal_plate_wall` | Brown Metal Plate Wall | 棕色金属板墙 |
| `block.design_decor.brown_metal_sheet` | Brown Metal Sheet | 棕色金属薄板 |
| `block.design_decor.brown_metal_sheet_slab` | Brown Metal Sheet Slab | 棕色金属薄板台阶 |
| `block.design_decor.brown_metal_sheet_stairs` | Brown Metal Sheet Stairs | 棕色金属薄板楼梯 |
| `block.design_decor.brown_metal_sheet_wall` | Brown Metal Sheet Wall | 棕色金属薄板墙 |
| `block.design_decor.brown_wallpaper_wavy` | Brown Wavy Wallpaper | 棕色波纹壁纸 |
| `block.design_decor.bun_sign` | Bun Sign | 兔子标志牌 |
| `block.design_decor.c_sign` | C Letter Sign | 字母C标志牌 |
| `block.design_decor.calcite_castel_brick_slab` | Calcite Castel Brick Slab | 方解石城堡砖台阶 |
| `block.design_decor.calcite_castel_brick_stairs` | Calcite Castel Brick Stairs | 方解石城堡砖楼梯 |
| `block.design_decor.calcite_castel_brick_wall` | Calcite Castel Brick Wall | 方解石城堡砖墙 |
| `block.design_decor.calcite_castel_bricks` | Calcite Castel Bricks | 方解石城堡砖 |
| `block.design_decor.calcite_castel_tile_slab` | Calcite Castel Tile Slab | 方解石城堡瓦台阶 |
| `block.design_decor.calcite_castel_tile_stairs` | Calcite Castel Tile Stairs | 方解石城堡瓦楼梯 |
| `block.design_decor.calcite_castel_tile_wall` | Calcite Castel Tile Wall | 方解石城堡瓦墙 |
| `block.design_decor.calcite_castel_tiles` | Calcite Castel Tiles | 方解石城堡瓦 |
| `block.design_decor.calcite_crushing_wheel` | Calcite Crushing Wheel | 方解石粉碎轮 |
| `block.design_decor.calcite_millstone` | Calcite Millstone | 方解石石磨 |
| `block.design_decor.capitalism_block` | Block of Capitalism | 资本主义方块 |
| `block.design_decor.capitalism_boiler` | Capitalism Boiler | 资本主义锅炉 |
| `block.design_decor.capitalism_boiler_large` | Large Capitalism Boiler | 大型资本主义锅炉 |
| `block.design_decor.capitalism_boiler_structure` | Large Capitalism Boiler | 大型资本主义锅炉 |
| `block.design_decor.capitalism_warning_sign` | Capitalism Warning Sign | 资本主义警告牌 |
| `block.design_decor.cardboard_box` | Cardboard Box | 纸箱 |
| `block.design_decor.cast_iron_boiler` | Cast Iron Boiler | 铸铁锅炉 |
| `block.design_decor.cast_iron_boiler_large` | Large Cast Iron Boiler | 大型铸铁锅炉 |
| `block.design_decor.cast_iron_boiler_structure` | Large Cast Iron Boiler | 大型铸铁锅炉 |
| `block.design_decor.cast_iron_large_chain` | Large Cast Iron Chain | 大型铸铁锁链 |
| `block.design_decor.ceiling_fan` | Ceiling Fan | 吊扇 |
| `block.design_decor.cobalt_large_chain` | Large Cobalt Chain | 大型钴锁链 |
| `block.design_decor.copper_boiler` | Copper Boiler | 铜锅炉 |
| `block.design_decor.copper_boiler_large` | Large Copper Boiler | 大型铜锅炉 |
| `block.design_decor.copper_boiler_structure` | Large Copper Boiler | 大型铜锅炉 |
| `block.design_decor.copper_bolt` | Copper Bolt | 铜螺栓 |
| `block.design_decor.copper_catwalk` | Copper Catwalk | 铜检修走道 |
| `block.design_decor.copper_floodlight` | Copper Floodlight | 铜泛光灯 |
| `block.design_decor.copper_floor` | Copper Floor | 铜地板 |
| `block.design_decor.copper_gas_tank` | Compact Fluid Tank | 紧凑型流体储罐 |
| `block.design_decor.copper_lamp` | Copper Lamp | 铜贴面灯 |
| `block.design_decor.copper_large_chain` | Large Copper Chain | 大型铜锁链 |
| `block.design_decor.copper_light` | Copper Light | 铜灯块 |
| `block.design_decor.copper_railing` | Copper Railing | 铜栏杆 |
| `block.design_decor.copper_screw` | Copper Screw | 铜螺钉 |
| `block.design_decor.creeper_sign` | Creeper Sign | 苦力怕标志牌 |
| `block.design_decor.crimsite_castel_brick_slab` | Crimsite Castel Brick Slab | 绯红岩城堡砖台阶 |
| `block.design_decor.crimsite_castel_brick_stairs` | Crimsite Castel Brick Stairs | 绯红岩城堡砖楼梯 |
| `block.design_decor.crimsite_castel_brick_wall` | Crimsite Castel Brick Wall | 绯红岩城堡砖墙 |
| `block.design_decor.crimsite_castel_bricks` | Crimsite Castel Bricks | 绯红岩城堡砖 |
| `block.design_decor.crimsite_castel_tile_slab` | Crimsite Castel Tile Slab | 绯红岩城堡瓦台阶 |
| `block.design_decor.crimsite_castel_tile_stairs` | Crimsite Castel Tile Stairs | 绯红岩城堡瓦楼梯 |
| `block.design_decor.crimsite_castel_tile_wall` | Crimsite Castel Tile Wall | 绯红岩城堡瓦墙 |
| `block.design_decor.crimsite_castel_tiles` | Crimsite Castel Tiles | 绯红岩城堡瓦 |
| `block.design_decor.crimsite_crushing_wheel` | Crimsite Crushing Wheel | 绯红岩粉碎轮 |
| `block.design_decor.crimsite_millstone` | Crimsite Millstone | 绯红岩石磨 |
| `block.design_decor.crushing_wheel_controller` | Crushing Wheel Controller | 粉碎轮控制器 |
| `block.design_decor.cyan_metal_plate` | Cyan Metal Plate | 青色金属板 |
| `block.design_decor.cyan_metal_plate_slab` | Cyan Metal Plate Slab | 青色金属板台阶 |
| `block.design_decor.cyan_metal_plate_stairs` | Cyan Metal Plate Stairs | 青色金属板楼梯 |
| `block.design_decor.cyan_metal_plate_wall` | Cyan Metal Plate Wall | 青色金属板墙 |
| `block.design_decor.cyan_metal_sheet` | Cyan Metal Sheet | 青色金属薄板 |
| `block.design_decor.cyan_metal_sheet_slab` | Cyan Metal Sheet Slab | 青色金属薄板台阶 |
| `block.design_decor.cyan_metal_sheet_stairs` | Cyan Metal Sheet Stairs | 青色金属薄板楼梯 |
| `block.design_decor.cyan_metal_sheet_wall` | Cyan Metal Sheet Wall | 青色金属薄板墙 |
| `block.design_decor.cyan_wallpaper_wavy` | Cyan Wavy Wallpaper | 青色波纹壁纸 |
| `block.design_decor.d_sign` | D Letter Sign | 字母D标志牌 |
| `block.design_decor.deepslate_castel_brick_slab` | Deepslate Castel Brick Slab | 深板岩城堡砖台阶 |
| `block.design_decor.deepslate_castel_brick_stairs` | Deepslate Castel Brick Stairs | 深板岩城堡砖楼梯 |
| `block.design_decor.deepslate_castel_brick_wall` | Deepslate Castel Brick Wall | 深板岩城堡砖墙 |
| `block.design_decor.deepslate_castel_bricks` | Deepslate Castel Bricks | 深板岩城堡砖 |
| `block.design_decor.deepslate_castel_tile_slab` | Deepslate Castel Tile Slab | 深板岩城堡瓦台阶 |
| `block.design_decor.deepslate_castel_tile_stairs` | Deepslate Castel Tile Stairs | 深板岩城堡瓦楼梯 |
| `block.design_decor.deepslate_castel_tile_wall` | Deepslate Castel Tile Wall | 深板岩城堡瓦墙 |
| `block.design_decor.deepslate_castel_tiles` | Deepslate Castel Tiles | 深板岩城堡瓦 |
| `block.design_decor.deepslate_crushing_wheel` | Deepslate Crushing Wheel | 深板岩粉碎轮 |
| `block.design_decor.deepslate_millstone` | Deepslate Millstone | 深板岩石磨 |
| `block.design_decor.diagonal_girder` | Diagonal Girder | 斜金属梁 |
| `block.design_decor.diagonal_metal_support` | Diagonal Metal Support | 斜金属支架 |
| `block.design_decor.diorite_castel_brick_slab` | Diorite Castel Brick Slab | 闪长岩城堡砖台阶 |
| `block.design_decor.diorite_castel_brick_stairs` | Diorite Castel Brick Stairs | 闪长岩城堡砖楼梯 |
| `block.design_decor.diorite_castel_brick_wall` | Diorite Castel Brick Wall | 闪长岩城堡砖墙 |
| `block.design_decor.diorite_castel_bricks` | Diorite Castel Bricks | 闪长岩城堡砖 |
| `block.design_decor.diorite_castel_tile_slab` | Diorite Castel Tile Slab | 闪长岩城堡瓦台阶 |
| `block.design_decor.diorite_castel_tile_stairs` | Diorite Castel Tile Stairs | 闪长岩城堡瓦楼梯 |
| `block.design_decor.diorite_castel_tile_wall` | Diorite Castel Tile Wall | 闪长岩城堡瓦墙 |
| `block.design_decor.diorite_castel_tiles` | Diorite Castel Tiles | 闪长岩城堡瓦 |
| `block.design_decor.diorite_crushing_wheel` | Diorite Crushing Wheel | 闪长岩粉碎轮 |
| `block.design_decor.diorite_millstone` | Diorite Millstone | 闪长岩石磨 |
| `block.design_decor.dripstone_castel_brick_slab` | Dripstone Castel Brick Slab | 滴水石城堡砖台阶 |
| `block.design_decor.dripstone_castel_brick_stairs` | Dripstone Castel Brick Stairs | 滴水石城堡砖楼梯 |
| `block.design_decor.dripstone_castel_brick_wall` | Dripstone Castel Brick Wall | 滴水石城堡砖墙 |
| `block.design_decor.dripstone_castel_bricks` | Dripstone Castel Bricks | 滴水石城堡砖 |
| `block.design_decor.dripstone_castel_tile_slab` | Dripstone Castel Tile Slab | 滴水石城堡瓦台阶 |
| `block.design_decor.dripstone_castel_tile_stairs` | Dripstone Castel Tile Stairs | 滴水石城堡瓦楼梯 |
| `block.design_decor.dripstone_castel_tile_wall` | Dripstone Castel Tile Wall | 滴水石城堡瓦墙 |
| `block.design_decor.dripstone_castel_tiles` | Dripstone Castel Tiles | 滴水石城堡瓦 |
| `block.design_decor.dripstone_crushing_wheel` | Dripstone Crushing Wheel | 滴水石粉碎轮 |
| `block.design_decor.dripstone_millstone` | Dripstone Millstone | 滴水石石磨 |
| `block.design_decor.e_sign` | E Letter Sign | 字母E标志牌 |
| `block.design_decor.electrum_large_chain` | Large Electrum Chain | 大型琥珀金锁链 |
| `block.design_decor.f_sign` | F Letter Sign | 字母F标志牌 |
| `block.design_decor.g_sign` | G Letter Sign | 字母G标志牌 |
| `block.design_decor.gas_tank` | Compact Iron Fluid Tank | 紧凑型铁流体储罐 |
| `block.design_decor.gear_sign` | Gear Sign | 齿轮标志牌 |
| `block.design_decor.glitch_warning_sign` | Glitch Warning Sign | 故障警告牌 |
| `block.design_decor.gold_boiler` | Gold Boiler | 金锅炉 |
| `block.design_decor.gold_boiler_large` | Large Gold Boiler | 大型金锅炉 |
| `block.design_decor.gold_boiler_structure` | Large Gold Boiler | 大型金锅炉 |
| `block.design_decor.gold_large_chain` | Large Gold Chain | 大型金锁链 |
| `block.design_decor.granite_castel_brick_slab` | Granite Castel Brick Slab | 花岗岩城堡砖台阶 |
| `block.design_decor.granite_castel_brick_stairs` | Granite Castel Brick Stairs | 花岗岩城堡砖楼梯 |
| `block.design_decor.granite_castel_brick_wall` | Granite Castel Brick Wall | 花岗岩城堡砖墙 |
| `block.design_decor.granite_castel_bricks` | Granite Castel Bricks | 花岗岩城堡砖 |
| `block.design_decor.granite_castel_tile_slab` | Granite Castel Tile Slab | 花岗岩城堡瓦台阶 |
| `block.design_decor.granite_castel_tile_stairs` | Granite Castel Tile Stairs | 花岗岩城堡瓦楼梯 |
| `block.design_decor.granite_castel_tile_wall` | Granite Castel Tile Wall | 花岗岩城堡瓦墙 |
| `block.design_decor.granite_castel_tiles` | Granite Castel Tiles | 花岗岩城堡瓦 |
| `block.design_decor.granite_crushing_wheel` | Granite Crushing Wheel | 花岗岩粉碎轮 |
| `block.design_decor.granite_millstone` | Granite Millstone | 花岗岩石磨 |
| `block.design_decor.gray_metal_plate` | Gray Metal Plate | 灰色金属板 |
| `block.design_decor.gray_metal_plate_slab` | Gray Metal Plate Slab | 灰色金属板台阶 |
| `block.design_decor.gray_metal_plate_stairs` | Gray Metal Plate Stairs | 灰色金属板楼梯 |
| `block.design_decor.gray_metal_plate_wall` | Gray Metal Plate Wall | 灰色金属板墙 |
| `block.design_decor.gray_metal_sheet` | Gray Metal Sheet | 灰色金属薄板 |
| `block.design_decor.gray_metal_sheet_slab` | Gray Metal Sheet Slab | 灰色金属薄板台阶 |
| `block.design_decor.gray_metal_sheet_stairs` | Gray Metal Sheet Stairs | 灰色金属薄板楼梯 |
| `block.design_decor.gray_metal_sheet_wall` | Gray Metal Sheet Wall | 灰色金属薄板墙 |
| `block.design_decor.gray_wallpaper_wavy` | Gray Wavy Wallpaper | 灰色波纹壁纸 |
| `block.design_decor.green_container` | Green Container | 绿色集装箱 |
| `block.design_decor.green_metal_plate` | Green Metal Plate | 绿色金属板 |
| `block.design_decor.green_metal_plate_slab` | Green Metal Plate Slab | 绿色金属板台阶 |
| `block.design_decor.green_metal_plate_stairs` | Green Metal Plate Stairs | 绿色金属板楼梯 |
| `block.design_decor.green_metal_plate_wall` | Green Metal Plate Wall | 绿色金属板墙 |
| `block.design_decor.green_metal_sheet` | Green Metal Sheet | 绿色金属薄板 |
| `block.design_decor.green_metal_sheet_slab` | Green Metal Sheet Slab | 绿色金属薄板台阶 |
| `block.design_decor.green_metal_sheet_stairs` | Green Metal Sheet Stairs | 绿色金属薄板楼梯 |
| `block.design_decor.green_metal_sheet_wall` | Green Metal Sheet Wall | 绿色金属薄板墙 |
| `block.design_decor.green_wallpaper_wavy` | Green Wavy Wallpaper | 绿色波纹壁纸 |
| `block.design_decor.h_sign` | H Letter Sign | 字母H标志牌 |
| `block.design_decor.hepatizon_large_chain` | Large Hepatizon Chain | 大型黑色科林斯青铜锁链 |
| `block.design_decor.horizontal_tinted_framed_glass` | Horizontal Tinted Framed Glass | 水平遮光边框玻璃 |
| `block.design_decor.i_sign` | I Letter Sign | 字母I标志牌 |
| `block.design_decor.industrial_gear` | Industrial Gear | 工业齿轮 |
| `block.design_decor.industrial_gear_large` | Large Industrial Gear | 大型工业齿轮 |
| `block.design_decor.industrial_gold_block` | Block of Industrial Gold | 工业金块 |
| `block.design_decor.industrial_gold_floor` | Industrial Gold Floor | 工业金地板 |
| `block.design_decor.industrial_iron_boiler` | Industrial Iron Boiler | 工业铁锅炉 |
| `block.design_decor.industrial_iron_boiler_large` | Large Industrial Iron Boiler | 大型工业铁锅炉 |
| `block.design_decor.industrial_iron_boiler_structure` | Large Industrial Iron Boiler | 大型工业铁锅炉 |
| `block.design_decor.industrial_iron_floor` | Industrial Iron Floor | 工业铁地板 |
| `block.design_decor.industrial_iron_large_chain` | Large Industrial Iron Chain | 大型工业铁锁链 |
| `block.design_decor.industrial_plating_block` | Block of Industrial Plating | 工业镀层块 |
| `block.design_decor.invar_large_chain` | Large Invar Chain | 大型殷钢锁链 |
| `block.design_decor.iron_catwalk` | Iron Catwalk | 铁检修走道 |
| `block.design_decor.iron_large_chain` | Large Iron Chain | 大型铁锁链 |
| `block.design_decor.iron_railing` | Iron Railing | 铁栏杆 |
| `block.design_decor.j_sign` | J Letter Sign | 字母J标志牌 |
| `block.design_decor.k_sign` | K Letter Sign | 字母K标志牌 |
| `block.design_decor.knightslime_large_chain` | Large Knightslime Chain | 大型骑士史莱姆锁链 |
| `block.design_decor.l_sign` | L Letter Sign | 字母L标志牌 |
| `block.design_decor.lead_large_chain` | Large Lead Chain | 大型铅锁链 |
| `block.design_decor.letter_sign` | Blank Letter Sign | 空白字母牌 |
| `block.design_decor.light_blue_metal_plate` | Light Blue Metal Plate | 淡蓝色金属板 |
| `block.design_decor.light_blue_metal_plate_slab` | Light Blue Metal Plate Slab | 淡蓝色金属板台阶 |
| `block.design_decor.light_blue_metal_plate_stairs` | Light Blue Metal Plate Stairs | 淡蓝色金属板楼梯 |
| `block.design_decor.light_blue_metal_plate_wall` | Light Blue Metal Plate Wall | 淡蓝色金属板墙 |
| `block.design_decor.light_blue_metal_sheet` | Light Blue Metal Sheet | 淡蓝色金属薄板 |
| `block.design_decor.light_blue_metal_sheet_slab` | Light Blue Metal Sheet Slab | 淡蓝色金属薄板台阶 |
| `block.design_decor.light_blue_metal_sheet_stairs` | Light Blue Metal Sheet Stairs | 淡蓝色金属薄板楼梯 |
| `block.design_decor.light_blue_metal_sheet_wall` | Light Blue Metal Sheet Wall | 淡蓝色金属薄板墙 |
| `block.design_decor.light_blue_wallpaper_wavy` | Light Blue Wavy Wallpaper | 淡蓝色波纹壁纸 |
| `block.design_decor.light_gray_metal_plate` | Light Gray Metal Plate | 淡灰色金属板 |
| `block.design_decor.light_gray_metal_plate_slab` | Light Gray Metal Plate Slab | 淡灰色金属板台阶 |
| `block.design_decor.light_gray_metal_plate_stairs` | Light Gray Metal Plate Stairs | 淡灰色金属板楼梯 |
| `block.design_decor.light_gray_metal_plate_wall` | Light Gray Metal Plate Wall | 淡灰色金属板墙 |
| `block.design_decor.light_gray_metal_sheet` | Light Gray Metal Sheet | 淡灰色金属薄板 |
| `block.design_decor.light_gray_metal_sheet_slab` | Light Gray Metal Sheet Slab | 淡灰色金属薄板台阶 |
| `block.design_decor.light_gray_metal_sheet_stairs` | Light Gray Metal Sheet Stairs | 淡灰色金属薄板楼梯 |
| `block.design_decor.light_gray_metal_sheet_wall` | Light Gray Metal Sheet Wall | 淡灰色金属薄板墙 |
| `block.design_decor.light_gray_wallpaper_wavy` | Light Gray Wavy Wallpaper | 淡灰色波纹壁纸 |
| `block.design_decor.lime_metal_plate` | Lime Metal Plate | 黄绿色金属板 |
| `block.design_decor.lime_metal_plate_slab` | Lime Metal Plate Slab | 黄绿色金属板台阶 |
| `block.design_decor.lime_metal_plate_stairs` | Lime Metal Plate Stairs | 黄绿色金属板楼梯 |
| `block.design_decor.lime_metal_plate_wall` | Lime Metal Plate Wall | 黄绿色金属板墙 |
| `block.design_decor.lime_metal_sheet` | Lime Metal Sheet | 黄绿色金属薄板 |
| `block.design_decor.lime_metal_sheet_slab` | Lime Metal Sheet Slab | 黄绿色金属薄板台阶 |
| `block.design_decor.lime_metal_sheet_stairs` | Lime Metal Sheet Stairs | 黄绿色金属薄板楼梯 |
| `block.design_decor.lime_metal_sheet_wall` | Lime Metal Sheet Wall | 黄绿色金属薄板墙 |
| `block.design_decor.lime_wallpaper_wavy` | Lime Wavy Wallpaper | 黄绿色波纹壁纸 |
| `block.design_decor.limestone_castel_brick_slab` | Limestone Castel Brick Slab | 石灰岩城堡砖台阶 |
| `block.design_decor.limestone_castel_brick_stairs` | Limestone Castel Brick Stairs | 石灰岩城堡砖楼梯 |
| `block.design_decor.limestone_castel_brick_wall` | Limestone Castel Brick Wall | 石灰岩城堡砖墙 |
| `block.design_decor.limestone_castel_bricks` | Limestone Castel Bricks | 石灰岩城堡砖 |
| `block.design_decor.limestone_castel_tile_slab` | Limestone Castel Tile Slab | 石灰岩城堡瓦台阶 |
| `block.design_decor.limestone_castel_tile_stairs` | Limestone Castel Tile Stairs | 石灰岩城堡瓦楼梯 |
| `block.design_decor.limestone_castel_tile_wall` | Limestone Castel Tile Wall | 石灰岩城堡瓦墙 |
| `block.design_decor.limestone_castel_tiles` | Limestone Castel Tiles | 石灰岩城堡瓦 |
| `block.design_decor.limestone_crushing_wheel` | Limestone Crushing Wheel | 石灰岩粉碎轮 |
| `block.design_decor.limestone_millstone` | Limestone Millstone | 石灰岩石磨 |
| `block.design_decor.m_sign` | M Letter Sign | 字母M标志牌 |
| `block.design_decor.magenta_metal_plate` | Magenta Metal Plate | 品红色金属板 |
| `block.design_decor.magenta_metal_plate_slab` | Magenta Metal Plate Slab | 品红色金属板台阶 |
| `block.design_decor.magenta_metal_plate_stairs` | Magenta Metal Plate Stairs | 品红色金属板楼梯 |
| `block.design_decor.magenta_metal_plate_wall` | Magenta Metal Plate Wall | 品红色金属板墙 |
| `block.design_decor.magenta_metal_sheet` | Magenta Metal Sheet | 品红色金属薄板 |
| `block.design_decor.magenta_metal_sheet_slab` | Magenta Metal Sheet Slab | 品红色金属薄板台阶 |
| `block.design_decor.magenta_metal_sheet_stairs` | Magenta Metal Sheet Stairs | 品红色金属薄板楼梯 |
| `block.design_decor.magenta_metal_sheet_wall` | Magenta Metal Sheet Wall | 品红色金属薄板墙 |
| `block.design_decor.magenta_wallpaper_wavy` | Magenta Wavy Wallpaper | 品红色波纹壁纸 |
| `block.design_decor.magnet_sign` | Magnet Sign | 磁铁标志牌 |
| `block.design_decor.manyullyn_large_chain` | Large Manyulln Chain | 大型玛玉灵锁链 |
| `block.design_decor.metal_plate` | Metal Plate | 金属板 |
| `block.design_decor.metal_plate_slab` | Metal Plate Slab | 金属板台阶 |
| `block.design_decor.metal_plate_stairs` | Metal Plate Stairs | 金属板楼梯 |
| `block.design_decor.metal_plate_wall` | Metal Plate Wall | 金属板墙 |
| `block.design_decor.metal_sheet` | Metal Sheet | 金属薄板 |
| `block.design_decor.metal_sheet_slab` | Metal Sheet Slab | 金属薄板台阶 |
| `block.design_decor.metal_sheet_stairs` | Metal Sheet Stairs | 金属薄板楼梯 |
| `block.design_decor.metal_sheet_wall` | Metal Sheet Wall | 金属薄板墙 |
| `block.design_decor.metal_support` | Metal Support | 金属支架 |
| `block.design_decor.mithril_large_chain` | Large Mithril Chain | 大型秘银锁链 |
| `block.design_decor.moyai_sign` | Moyai Sign | 摩艾石像标志牌 |
| `block.design_decor.n_sign` | N Letter Sign | 字母N标志牌 |
| `block.design_decor.netherite_large_chain` | Large Netherite Chain | 大型下界合金锁链 |
| `block.design_decor.nethersteel_large_chain` | Large Nethersteel Chain | 大型下界钢锁链 |
| `block.design_decor.nickel_large_chain` | Large Nickel Chain | 大型镍锁链 |
| `block.design_decor.o_sign` | O Letter Sign | 字母O标志牌 |
| `block.design_decor.ochrum_castel_brick_slab` | Ochrum Castel Brick Slab | 赭金砂城堡砖台阶 |
| `block.design_decor.ochrum_castel_brick_stairs` | Ochrum Castel Brick Stairs | 赭金砂城堡砖楼梯 |
| `block.design_decor.ochrum_castel_brick_wall` | Ochrum Castel Brick Wall | 赭金砂城堡砖墙 |
| `block.design_decor.ochrum_castel_bricks` | Ochrum Castel Bricks | 赭金砂城堡砖 |
| `block.design_decor.ochrum_castel_tile_slab` | Ochrum Castel Tile Slab | 赭金砂城堡瓦台阶 |
| `block.design_decor.ochrum_castel_tile_stairs` | Ochrum Castel Tile Stairs | 赭金砂城堡瓦楼梯 |
| `block.design_decor.ochrum_castel_tile_wall` | Ochrum Castel Tile Wall | 赭金砂城堡瓦墙 |
| `block.design_decor.ochrum_castel_tiles` | Ochrum Castel Tiles | 赭金砂城堡瓦 |
| `block.design_decor.ochrum_crushing_wheel` | Ochrum Crushing Wheel | 赭金砂粉碎轮 |
| `block.design_decor.ochrum_millstone` | Ochrum Millstone | 赭金砂石磨 |
| `block.design_decor.orange_metal_plate` | Orange Metal Plate | 橙色金属板 |
| `block.design_decor.orange_metal_plate_slab` | Orange Metal Plate Slab | 橙色金属板台阶 |
| `block.design_decor.orange_metal_plate_stairs` | Orange Metal Plate Stairs | 橙色金属板楼梯 |
| `block.design_decor.orange_metal_plate_wall` | Orange Metal Plate Wall | 橙色金属板墙 |
| `block.design_decor.orange_metal_sheet` | Orange Metal Sheet | 橙色金属薄板 |
| `block.design_decor.orange_metal_sheet_slab` | Orange Metal Sheet Slab | 橙色金属薄板台阶 |
| `block.design_decor.orange_metal_sheet_stairs` | Orange Metal Sheet Stairs | 橙色金属薄板楼梯 |
| `block.design_decor.orange_metal_sheet_wall` | Orange Metal Sheet Wall | 橙色金属薄板墙 |
| `block.design_decor.orange_wallpaper_wavy` | Orange Wavy Wallpaper | 橙色波纹壁纸 |
| `block.design_decor.ornate_grate` | Ornate Grate | 华丽格栅 |
| `block.design_decor.p_sign` | P Letter Sign | 字母P标志牌 |
| `block.design_decor.pig_iron_large_chain` | Large Pig Iron Chain | 大型生铁锁链 |
| `block.design_decor.pink_metal_plate` | Pink Metal Plate | 粉红色金属板 |
| `block.design_decor.pink_metal_plate_slab` | Pink Metal Plate Slab | 粉红色金属板台阶 |
| `block.design_decor.pink_metal_plate_stairs` | Pink Metal Plate Stairs | 粉红色金属板楼梯 |
| `block.design_decor.pink_metal_plate_wall` | Pink Metal Plate Wall | 粉红色金属板墙 |
| `block.design_decor.pink_metal_sheet` | Pink Metal Sheet | 粉红色金属薄板 |
| `block.design_decor.pink_metal_sheet_slab` | Pink Metal Sheet Slab | 粉红色金属薄板台阶 |
| `block.design_decor.pink_metal_sheet_stairs` | Pink Metal Sheet Stairs | 粉红色金属薄板楼梯 |
| `block.design_decor.pink_metal_sheet_wall` | Pink Metal Sheet Wall | 粉红色金属薄板墙 |
| `block.design_decor.pink_wallpaper_wavy` | Pink Wavy Wallpaper | 粉红色波纹壁纸 |
| `block.design_decor.purple_metal_plate` | Purple Metal Plate | 紫色金属板 |
| `block.design_decor.purple_metal_plate_slab` | Purple Metal Plate Slab | 紫色金属板台阶 |
| `block.design_decor.purple_metal_plate_stairs` | Purple Metal Plate Stairs | 紫色金属板楼梯 |
| `block.design_decor.purple_metal_plate_wall` | Purple Metal Plate Wall | 紫色金属板墙 |
| `block.design_decor.purple_metal_sheet` | Purple Metal Sheet | 紫色金属薄板 |
| `block.design_decor.purple_metal_sheet_slab` | Purple Metal Sheet Slab | 紫色金属薄板台阶 |
| `block.design_decor.purple_metal_sheet_stairs` | Purple Metal Sheet Stairs | 紫色金属薄板楼梯 |
| `block.design_decor.purple_metal_sheet_wall` | Purple Metal Sheet Wall | 紫色金属薄板墙 |
| `block.design_decor.purple_wallpaper_wavy` | Purple Wavy Wallpaper | 紫色波纹壁纸 |
| `block.design_decor.q_sign` | Q Letter Sign | 字母Q标志牌 |
| `block.design_decor.queen_slime_large_chain` | Large Queen Slime Chain | 大型皇后史莱姆锁链 |
| `block.design_decor.r_sign` | R Letter Sign | 字母R标志牌 |
| `block.design_decor.red_container` | Red Container | 红色集装箱 |
| `block.design_decor.red_metal_plate` | Red Metal Plate | 红色金属板 |
| `block.design_decor.red_metal_plate_slab` | Red Metal Plate Slab | 红色金属板台阶 |
| `block.design_decor.red_metal_plate_stairs` | Red Metal Plate Stairs | 红色金属板楼梯 |
| `block.design_decor.red_metal_plate_wall` | Red Metal Plate Wall | 红色金属板墙 |
| `block.design_decor.red_metal_sheet` | Red Metal Sheet | 红色金属薄板 |
| `block.design_decor.red_metal_sheet_slab` | Red Metal Sheet Slab | 红色金属薄板台阶 |
| `block.design_decor.red_metal_sheet_stairs` | Red Metal Sheet Stairs | 红色金属薄板楼梯 |
| `block.design_decor.red_metal_sheet_wall` | Red Metal Sheet Wall | 红色金属薄板墙 |
| `block.design_decor.red_stone_tiles` | Red Deepslate Tiles | 红色深板岩瓦 |
| `block.design_decor.red_wallpaper_wavy` | Red Wavy Wallpaper | 红色波纹壁纸 |
| `block.design_decor.rose_gold_large_chain` | Large Rose Gold Chain | 大型玫瑰金锁链 |
| `block.design_decor.s_sign` | S Letter Sign | 字母S标志牌 |
| `block.design_decor.scorchia_castel_brick_slab` | Scorchia Castel Brick Slab | 焦黑熔渣城堡砖台阶 |
| `block.design_decor.scorchia_castel_brick_stairs` | Scorchia Castel Brick Stairs | 焦黑熔渣城堡砖楼梯 |
| `block.design_decor.scorchia_castel_brick_wall` | Scorchia Castel Brick Wall | 焦黑熔渣城堡砖墙 |
| `block.design_decor.scorchia_castel_bricks` | Scorchia Castel Bricks | 焦黑熔渣城堡砖 |
| `block.design_decor.scorchia_castel_tile_slab` | Scorchia Castel Tile Slab | 焦黑熔渣城堡瓦台阶 |
| `block.design_decor.scorchia_castel_tile_stairs` | Scorchia Castel Tile Stairs | 焦黑熔渣城堡瓦楼梯 |
| `block.design_decor.scorchia_castel_tile_wall` | Scorchia Castel Tile Wall | 焦黑熔渣城堡瓦墙 |
| `block.design_decor.scorchia_castel_tiles` | Scorchia Castel Tiles | 焦黑熔渣城堡瓦 |
| `block.design_decor.scorchia_crushing_wheel` | Scorchia Crushing Wheel | 焦黑熔渣粉碎轮 |
| `block.design_decor.scorchia_millstone` | Scorchia Millstone | 焦黑熔渣石磨 |
| `block.design_decor.scoria_castel_brick_slab` | Scoria Castel Brick Slab | 熔渣城堡砖台阶 |
| `block.design_decor.scoria_castel_brick_stairs` | Scoria Castel Brick Stairs | 熔渣城堡砖楼梯 |
| `block.design_decor.scoria_castel_brick_wall` | Scoria Castel Brick Wall | 熔渣城堡砖墙 |
| `block.design_decor.scoria_castel_bricks` | Scoria Castel Bricks | 熔渣城堡砖 |
| `block.design_decor.scoria_castel_tile_slab` | Scoria Castel Tile Slab | 熔渣城堡瓦台阶 |
| `block.design_decor.scoria_castel_tile_stairs` | Scoria Castel Tile Stairs | 熔渣城堡瓦楼梯 |
| `block.design_decor.scoria_castel_tile_wall` | Scoria Castel Tile Wall | 熔渣城堡瓦墙 |
| `block.design_decor.scoria_castel_tiles` | Scoria Castel Tiles | 熔渣城堡瓦 |
| `block.design_decor.scoria_crushing_wheel` | Scoria Crushing Wheel | 熔渣粉碎轮 |
| `block.design_decor.scoria_millstone` | Scoria Millstone | 熔渣石磨 |
| `block.design_decor.silly_sign` | Silly Sign | 搞怪标志牌 |
| `block.design_decor.silver_large_chain` | Large Silver Chain | 大型银锁链 |
| `block.design_decor.steel_large_chain` | Large Steel Chain | 大型钢锁链 |
| `block.design_decor.stepped_lever` | Stepped Lever | 分档拉杆 |
| `block.design_decor.stone_tiles` | Deepslate Tiles | 深板岩瓦 |
| `block.design_decor.stop_sign` | Stop Sign | 停止标志牌 |
| `block.design_decor.strong_bronze_large_chain` | Large Bronze Chain | 大型青铜锁链 |
| `block.design_decor.t_sign` | T Letter Sign | 字母T标志牌 |
| `block.design_decor.tap_sign` | Tap Sign | 水龙头标志牌 |
| `block.design_decor.tin_large_chain` | Large Tin Chain | 大型锡锁链 |
| `block.design_decor.tinted_framed_glass` | Tinted Framed Glass | 遮光边框玻璃 |
| `block.design_decor.tuff_castel_brick_slab` | Tuff Castel Brick Slab | 凝灰岩城堡砖台阶 |
| `block.design_decor.tuff_castel_brick_stairs` | Tuff Castel Brick Stairs | 凝灰岩城堡砖楼梯 |
| `block.design_decor.tuff_castel_brick_wall` | Tuff Castel Brick Wall | 凝灰岩城堡砖墙 |
| `block.design_decor.tuff_castel_bricks` | Tuff Castel Bricks | 凝灰岩城堡砖 |
| `block.design_decor.tuff_castel_tile_slab` | Tuff Castel Tile Slab | 凝灰岩城堡瓦台阶 |
| `block.design_decor.tuff_castel_tile_stairs` | Tuff Castel Tile Stairs | 凝灰岩城堡瓦楼梯 |
| `block.design_decor.tuff_castel_tile_wall` | Tuff Castel Tile Wall | 凝灰岩城堡瓦墙 |
| `block.design_decor.tuff_castel_tiles` | Tuff Castel Tiles | 凝灰岩城堡瓦 |
| `block.design_decor.tuff_crushing_wheel` | Tuff Crushing Wheel | 凝灰岩粉碎轮 |
| `block.design_decor.tuff_millstone` | Tuff Millstone | 凝灰岩石磨 |
| `block.design_decor.u_sign` | U Letter Sign | 字母U标志牌 |
| `block.design_decor.v_sign` | V Letter Sign | 字母V标志牌 |
| `block.design_decor.veridium_castel_brick_slab` | Veridium Castel Brick Slab | 辉绿岩城堡砖台阶 |
| `block.design_decor.veridium_castel_brick_stairs` | Veridium Castel Brick Stairs | 辉绿岩城堡砖楼梯 |
| `block.design_decor.veridium_castel_brick_wall` | Veridium Castel Brick Wall | 辉绿岩城堡砖墙 |
| `block.design_decor.veridium_castel_bricks` | Veridium Castel Bricks | 辉绿岩城堡砖 |
| `block.design_decor.veridium_castel_tile_slab` | Veridium Castel Tile Slab | 辉绿岩城堡瓦台阶 |
| `block.design_decor.veridium_castel_tile_stairs` | Veridium Castel Tile Stairs | 辉绿岩城堡瓦楼梯 |
| `block.design_decor.veridium_castel_tile_wall` | Veridium Castel Tile Wall | 辉绿岩城堡瓦墙 |
| `block.design_decor.veridium_castel_tiles` | Veridium Castel Tiles | 辉绿岩城堡瓦 |
| `block.design_decor.veridium_crushing_wheel` | Veridium Crushing Wheel | 辉绿岩粉碎轮 |
| `block.design_decor.veridium_millstone` | Veridium Millstone | 辉绿岩石磨 |
| `block.design_decor.vertical_tinted_framed_glass` | Vertical Tinted Framed Glass | 垂直遮光边框玻璃 |
| `block.design_decor.w_sign` | W Letter Sign | 字母W标志牌 |
| `block.design_decor.wallpaper_arrow_black` | Black Arrow Wallpaper | 黑色箭纹壁纸 |
| `block.design_decor.wallpaper_arrow_blue` | Blue Arrow Wallpaper | 蓝色箭纹壁纸 |
| `block.design_decor.wallpaper_arrow_brown` | Brown Arrow Wallpaper | 棕色箭纹壁纸 |
| `block.design_decor.wallpaper_arrow_cyan` | Cyan Arrow Wallpaper | 青色箭纹壁纸 |
| `block.design_decor.wallpaper_arrow_gray` | Gray Arrow Wallpaper | 灰色箭纹壁纸 |
| `block.design_decor.wallpaper_arrow_green` | Green Arrow Wallpaper | 绿色箭纹壁纸 |
| `block.design_decor.wallpaper_arrow_light_blue` | Light Blue Arrow Wallpaper | 淡蓝色箭纹壁纸 |
| `block.design_decor.wallpaper_arrow_light_gray` | Light Gray Arrow Wallpaper | 淡灰色箭纹壁纸 |
| `block.design_decor.wallpaper_arrow_lime` | Lime Arrow Wallpaper | 黄绿色箭纹壁纸 |
| `block.design_decor.wallpaper_arrow_magenta` | Magenta Arrow Wallpaper | 品红色箭纹壁纸 |
| `block.design_decor.wallpaper_arrow_orange` | Orange Arrow Wallpaper | 橙色箭纹壁纸 |
| `block.design_decor.wallpaper_arrow_pink` | Pink Arrow Wallpaper | 粉红色箭纹壁纸 |
| `block.design_decor.wallpaper_arrow_purple` | Purple Arrow Wallpaper | 紫色箭纹壁纸 |
| `block.design_decor.wallpaper_arrow_red` | Red Arrow Wallpaper | 红色箭纹壁纸 |
| `block.design_decor.wallpaper_arrow_white` | White Arrow Wallpaper | 白色箭纹壁纸 |
| `block.design_decor.wallpaper_arrow_yellow` | Yellow Arrow Wallpaper | 黄色箭纹壁纸 |
| `block.design_decor.wallpaper_striped_black` | Black Striped Wallpaper | 黑色条纹壁纸 |
| `block.design_decor.wallpaper_striped_blue` | Blue Striped Wallpaper | 蓝色条纹壁纸 |
| `block.design_decor.wallpaper_striped_brown` | Brown Striped Wallpaper | 棕色条纹壁纸 |
| `block.design_decor.wallpaper_striped_cyan` | Cyan Striped Wallpaper | 青色条纹壁纸 |
| `block.design_decor.wallpaper_striped_gray` | Gray Striped Wallpaper | 灰色条纹壁纸 |
| `block.design_decor.wallpaper_striped_green` | Green Striped Wallpaper | 绿色条纹壁纸 |
| `block.design_decor.wallpaper_striped_light_blue` | Light Blue Striped Wallpaper | 淡蓝色条纹壁纸 |
| `block.design_decor.wallpaper_striped_light_gray` | Light Gray Striped Wallpaper | 淡灰色条纹壁纸 |
| `block.design_decor.wallpaper_striped_lime` | Lime Striped Wallpaper | 黄绿色条纹壁纸 |
| `block.design_decor.wallpaper_striped_magenta` | Magenta Striped Wallpaper | 品红色条纹壁纸 |
| `block.design_decor.wallpaper_striped_orange` | Orange Striped Wallpaper | 橙色条纹壁纸 |
| `block.design_decor.wallpaper_striped_pink` | Pink Striped Wallpaper | 粉红色条纹壁纸 |
| `block.design_decor.wallpaper_striped_purple` | Purple Striped Wallpaper | 紫色条纹壁纸 |
| `block.design_decor.wallpaper_striped_red` | Red Striped Wallpaper | 红色条纹壁纸 |
| `block.design_decor.wallpaper_striped_white` | White Striped Wallpaper | 白色条纹壁纸 |
| `block.design_decor.wallpaper_striped_yellow` | Yellow Striped Wallpaper | 黄色条纹壁纸 |
| `block.design_decor.warning_sign` | Warning Sign | 警告标志牌 |
| `block.design_decor.white_metal_plate` | White Metal Plate | 白色金属板 |
| `block.design_decor.white_metal_plate_slab` | White Metal Plate Slab | 白色金属板台阶 |
| `block.design_decor.white_metal_plate_stairs` | White Metal Plate Stairs | 白色金属板楼梯 |
| `block.design_decor.white_metal_plate_wall` | White Metal Plate Wall | 白色金属板墙 |
| `block.design_decor.white_metal_sheet` | White Metal Sheet | 白色金属薄板 |
| `block.design_decor.white_metal_sheet_slab` | White Metal Sheet Slab | 白色金属薄板台阶 |
| `block.design_decor.white_metal_sheet_stairs` | White Metal Sheet Stairs | 白色金属薄板楼梯 |
| `block.design_decor.white_metal_sheet_wall` | White Metal Sheet Wall | 白色金属薄板墙 |
| `block.design_decor.white_wallpaper_wavy` | White Wavy Wallpaper | 白色波纹壁纸 |
| `block.design_decor.wood_support` | Wooden Support | 木支架 |
| `block.design_decor.x_sign` | X Letter Sign | 字母X标志牌 |
| `block.design_decor.y_sign` | Y Letter Sign | 字母Y标志牌 |
| `block.design_decor.yellow_metal_plate` | Yellow Metal Plate | 黄色金属板 |
| `block.design_decor.yellow_metal_plate_slab` | Yellow Metal Plate Slab | 黄色金属板台阶 |
| `block.design_decor.yellow_metal_plate_stairs` | Yellow Metal Plate Stairs | 黄色金属板楼梯 |
| `block.design_decor.yellow_metal_plate_wall` | Yellow Metal Plate Wall | 黄色金属板墙 |
| `block.design_decor.yellow_metal_sheet` | Yellow Metal Sheet | 黄色金属薄板 |
| `block.design_decor.yellow_metal_sheet_slab` | Yellow Metal Sheet Slab | 黄色金属薄板台阶 |
| `block.design_decor.yellow_metal_sheet_stairs` | Yellow Metal Sheet Stairs | 黄色金属薄板楼梯 |
| `block.design_decor.yellow_metal_sheet_wall` | Yellow Metal Sheet Wall | 黄色金属薄板墙 |
| `block.design_decor.yellow_wallpaper_wavy` | Yellow Wavy Wallpaper | 黄色波纹壁纸 |
| `block.design_decor.z_sign` | Z Letter Sign | 字母Z标志牌 |
| `block.design_decor.zinc_boiler` | Zinc Boiler | 锌锅炉 |
| `block.design_decor.zinc_boiler_large` | Large Zinc Boiler | 大型锌锅炉 |
| `block.design_decor.zinc_boiler_structure` | Large Zinc Boiler | 大型锌锅炉 |
| `block.design_decor.zinc_bolt` | Zinc Bolt | 锌螺栓 |
| `block.design_decor.zinc_catwalk` | Zinc Catwalk | 锌检修走道 |
| `block.design_decor.zinc_floor` | Zinc Floor | 锌地板 |
| `block.design_decor.zinc_lamp` | Zinc Lamp | 锌贴面灯 |
| `block.design_decor.zinc_large_chain` | Large Zinc Chain | 大型锌锁链 |
| `block.design_decor.zinc_light` | Zinc Light | 锌灯块 |
| `block.design_decor.zinc_railing` | Zinc Railing | 锌栏杆 |
| `block.design_decor.zinc_screw` | Zinc Screw | 锌螺钉 |
| `item.design_decor.cardboard_sheet` | Cardboard Sheet | 纸板 |
