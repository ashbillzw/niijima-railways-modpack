# ST039 Create Deco

日期：2026-10-17。包内createdeco-2.0.2-1.20.1-forge.jar，412条英文、无中文。本轮补译412、旧译修正0。

## 上游适配

[官方1.20-multi](https://github.com/talrey/CreateDeco/tree/b27bc82213282c153684238a28e436d65033d5e5)无zh_cn.json；[1.21-neo固定版本](https://github.com/talrey/CreateDeco/blob/996780bed4549d7b1d0dec65f06d5129e69330ba/common/src/main/resources/assets/createdeco/lang/zh_cn.json)有365条，333条与当前键匹配，另79条按相同砖材／变体系列补齐。未引入新版多出的32条键。该仓库LICENSE为CC0-1.0，译文来源保留在此报告；本机留有原始中文快照。

### 适配修正

- 上游黑色置物“板”与其他颜色置物“牌”、锌栏网与其他材质网栏不一致，统一为置物牌／网栏。
- 上游裂纹焦渣黑砖台阶漏了台阶后缀，补回。
- Catwalk与ST038统一检修走道，配套railing为栏杆；Train Hull用列车外壳，避免火车／列车混用。Window Pane采用窗玻璃板，和完整窗户区分。
- 皓石蓝砖、赭砂黄砖、石灰白砖等保留上游系列名。当前JAR配方分别使用皓蓝石、赭金砂、石灰岩，已核对，不从英文Blue/Dean/Pearl任意另起名称。
- 当前安山金属板配方使用安山合金板标签，与ST038安山岩装饰系列不能机械视为同一材质；此处保留上游安山构件简称。
- Corner系列补为转角砖，与条状／密砌／密铺／裂纹／覆苔对应。具体转角纹理呈现仍待游戏查看，不声称其改变方块碰撞形状。

## 十条代表性译文

| 英文 | 已应用 |
| --- | --- |
| Andesite Catwalk | 安山检修走道 |
| Brass Train Hull | 黄铜列车外壳 |
| Copper Support Wedge | 铜支撑楔 |
| Black Placard | 黑色置物牌 |
| Blue Brass Cage Lamp | 蓝色黄铜笼灯 |
| Corner Pearl Bricks | 转角石灰白砖 |
| Fire Diamond Decal | 危险品菱形贴标 |
| Red Shipping Container | 红色集装箱 |
| Zinc Window Pane | 锌窗玻璃板 |
| Netherite Nugget | 下界合金粒 |

## 验证与限制

412键全覆盖、JSON与占位符静态检查通过。未改配方、材质或模组版本。未全类扫描硬编码，也未游戏内检查显示宽度、全部模型或搜索。未复制实例、打包、提交、部署。未穷尽翻译PR。

## 全部应用明细

| 键 | 英文 | 中文 |
| --- | --- | --- |
| `block.createdeco.andesite_bars` | Andesite Bars | 安山栏杆 |
| `block.createdeco.andesite_bars_overlay` | Andesite Bars Overlay | 安山栏板 |
| `block.createdeco.andesite_catwalk` | Andesite Catwalk | 安山检修走道 |
| `block.createdeco.andesite_catwalk_railing` | Andesite Catwalk Railing | 安山检修走道栏杆 |
| `block.createdeco.andesite_catwalk_stairs` | Andesite Catwalk Stairs | 安山检修走道楼梯 |
| `block.createdeco.andesite_door` | Andesite Door | 安山门 |
| `block.createdeco.andesite_hull` | Andesite Train Hull | 安山列车外壳 |
| `block.createdeco.andesite_mesh_fence` | Andesite Mesh Fence | 安山网栏 |
| `block.createdeco.andesite_sheet_metal` | Andesite Sheet Metal | 安山合金板方块 |
| `block.createdeco.andesite_support` | Andesite Support | 安山支架 |
| `block.createdeco.andesite_support_wedge` | Andesite Support Wedge | 安山支撑楔 |
| `block.createdeco.andesite_trapdoor` | Andesite Trapdoor | 安山活板门 |
| `block.createdeco.andesite_window` | Andesite Window | 安山窗户 |
| `block.createdeco.andesite_window_pane` | Andesite Window Pane | 安山窗玻璃板 |
| `block.createdeco.black_placard` | Black Placard | 黑色置物牌 |
| `block.createdeco.black_shipping_container` | Black Shipping Container | 黑色集装箱 |
| `block.createdeco.blue_andesite_lamp` | Blue Andesite Cage Lamp | 蓝色安山笼灯 |
| `block.createdeco.blue_brass_lamp` | Blue Brass Cage Lamp | 蓝色黄铜笼灯 |
| `block.createdeco.blue_brick_slab` | Blue Brick Slab | 皓石蓝砖台阶 |
| `block.createdeco.blue_brick_stairs` | Blue Brick Stairs | 皓石蓝砖楼梯 |
| `block.createdeco.blue_brick_wall` | Blue Brick Wall | 皓石蓝砖墙 |
| `block.createdeco.blue_bricks` | Blue Bricks | 皓石蓝砖块 |
| `block.createdeco.blue_copper_lamp` | Blue Copper Cage Lamp | 蓝色铜笼灯 |
| `block.createdeco.blue_industrial_iron_lamp` | Blue Industrial Iron Cage Lamp | 蓝色工业铁笼灯 |
| `block.createdeco.blue_iron_lamp` | Blue Iron Cage Lamp | 蓝色铁笼灯 |
| `block.createdeco.blue_placard` | Blue Placard | 蓝色置物牌 |
| `block.createdeco.blue_shipping_container` | Blue Shipping Container | 蓝色集装箱 |
| `block.createdeco.blue_zinc_lamp` | Blue Zinc Cage Lamp | 蓝色锌笼灯 |
| `block.createdeco.brass_bars` | Brass Bars | 黄铜栏杆 |
| `block.createdeco.brass_bars_overlay` | Brass Bars Overlay | 黄铜栏板 |
| `block.createdeco.brass_catwalk` | Brass Catwalk | 黄铜检修走道 |
| `block.createdeco.brass_catwalk_railing` | Brass Catwalk Railing | 黄铜检修走道栏杆 |
| `block.createdeco.brass_catwalk_stairs` | Brass Catwalk Stairs | 黄铜检修走道楼梯 |
| `block.createdeco.brass_coinstack` | BrassCoin Stack Block | 黄铜硬币堆 |
| `block.createdeco.brass_door` | Brass Door | 黄铜门 |
| `block.createdeco.brass_hull` | Brass Train Hull | 黄铜列车外壳 |
| `block.createdeco.brass_mesh_fence` | Brass Mesh Fence | 黄铜网栏 |
| `block.createdeco.brass_sheet_metal` | Brass Sheet Metal | 黄铜板方块 |
| `block.createdeco.brass_support` | Brass Support | 黄铜支架 |
| `block.createdeco.brass_support_wedge` | Brass Support Wedge | 黄铜支撑楔 |
| `block.createdeco.brass_trapdoor` | Brass Trapdoor | 黄铜活板门 |
| `block.createdeco.brass_window` | Brass Window | 黄铜窗户 |
| `block.createdeco.brass_window_pane` | Brass Window Pane | 黄铜窗玻璃板 |
| `block.createdeco.brown_placard` | Brown Placard | 棕色置物牌 |
| `block.createdeco.brown_shipping_container` | Brown Shipping Container | 棕色集装箱 |
| `block.createdeco.copper_bars` | Copper Bars | 铜栏杆 |
| `block.createdeco.copper_bars_overlay` | Copper Bars Overlay | 铜栏板 |
| `block.createdeco.copper_catwalk` | Copper Catwalk | 铜检修走道 |
| `block.createdeco.copper_catwalk_railing` | Copper Catwalk Railing | 铜检修走道栏杆 |
| `block.createdeco.copper_catwalk_stairs` | Copper Catwalk Stairs | 铜检修走道楼梯 |
| `block.createdeco.copper_coinstack` | CopperCoin Stack Block | 铜硬币堆 |
| `block.createdeco.copper_door` | Copper Door | 铜门 |
| `block.createdeco.copper_hull` | Copper Train Hull | 铜列车外壳 |
| `block.createdeco.copper_mesh_fence` | Copper Mesh Fence | 铜网栏 |
| `block.createdeco.copper_sheet_metal` | Copper Sheet Metal | 铜板方块 |
| `block.createdeco.copper_support` | Copper Support | 铜支架 |
| `block.createdeco.copper_support_wedge` | Copper Support Wedge | 铜支撑楔 |
| `block.createdeco.copper_trapdoor` | Copper Trapdoor | 铜活板门 |
| `block.createdeco.copper_window` | Copper Window | 铜窗户 |
| `block.createdeco.copper_window_pane` | Copper Window Pane | 铜窗玻璃板 |
| `block.createdeco.corner_blue_brick_slab` | Corner Blue Brick Slab | 转角皓石蓝砖台阶 |
| `block.createdeco.corner_blue_brick_stairs` | Corner Blue Brick Stairs | 转角皓石蓝砖楼梯 |
| `block.createdeco.corner_blue_brick_wall` | Corner Blue Brick Wall | 转角皓石蓝砖墙 |
| `block.createdeco.corner_blue_bricks` | Corner Blue Bricks | 转角皓石蓝砖 |
| `block.createdeco.corner_dean_brick_slab` | Corner Dean Brick Slab | 转角赭砂黄砖台阶 |
| `block.createdeco.corner_dean_brick_stairs` | Corner Dean Brick Stairs | 转角赭砂黄砖楼梯 |
| `block.createdeco.corner_dean_brick_wall` | Corner Dean Brick Wall | 转角赭砂黄砖墙 |
| `block.createdeco.corner_dean_bricks` | Corner Dean Bricks | 转角赭砂黄砖 |
| `block.createdeco.corner_dusk_brick_slab` | Corner Dusk Brick Slab | 转角焦渣黑砖台阶 |
| `block.createdeco.corner_dusk_brick_stairs` | Corner Dusk Brick Stairs | 转角焦渣黑砖楼梯 |
| `block.createdeco.corner_dusk_brick_wall` | Corner Dusk Brick Wall | 转角焦渣黑砖墙 |
| `block.createdeco.corner_dusk_bricks` | Corner Dusk Bricks | 转角焦渣黑砖 |
| `block.createdeco.corner_pearl_brick_slab` | Corner Pearl Brick Slab | 转角石灰白砖台阶 |
| `block.createdeco.corner_pearl_brick_stairs` | Corner Pearl Brick Stairs | 转角石灰白砖楼梯 |
| `block.createdeco.corner_pearl_brick_wall` | Corner Pearl Brick Wall | 转角石灰白砖墙 |
| `block.createdeco.corner_pearl_bricks` | Corner Pearl Bricks | 转角石灰白砖 |
| `block.createdeco.corner_red_brick_slab` | Corner Red Brick Slab | 转角红砖台阶 |
| `block.createdeco.corner_red_brick_stairs` | Corner Red Brick Stairs | 转角红砖楼梯 |
| `block.createdeco.corner_red_brick_wall` | Corner Red Brick Wall | 转角红砖墙 |
| `block.createdeco.corner_red_bricks` | Corner Red Bricks | 转角红砖 |
| `block.createdeco.corner_scarlet_brick_slab` | Corner Scarlet Brick Slab | 转角绯岩红砖台阶 |
| `block.createdeco.corner_scarlet_brick_stairs` | Corner Scarlet Brick Stairs | 转角绯岩红砖楼梯 |
| `block.createdeco.corner_scarlet_brick_wall` | Corner Scarlet Brick Wall | 转角绯岩红砖墙 |
| `block.createdeco.corner_scarlet_bricks` | Corner Scarlet Bricks | 转角绯岩红砖 |
| `block.createdeco.corner_umber_brick_slab` | Corner Umber Brick Slab | 转角熔渣棕砖台阶 |
| `block.createdeco.corner_umber_brick_stairs` | Corner Umber Brick Stairs | 转角熔渣棕砖楼梯 |
| `block.createdeco.corner_umber_brick_wall` | Corner Umber Brick Wall | 转角熔渣棕砖墙 |
| `block.createdeco.corner_umber_bricks` | Corner Umber Bricks | 转角熔渣棕砖 |
| `block.createdeco.corner_verdant_brick_slab` | Corner Verdant Brick Slab | 转角辉岩绿砖台阶 |
| `block.createdeco.corner_verdant_brick_stairs` | Corner Verdant Brick Stairs | 转角辉岩绿砖楼梯 |
| `block.createdeco.corner_verdant_brick_wall` | Corner Verdant Brick Wall | 转角辉岩绿砖墙 |
| `block.createdeco.corner_verdant_bricks` | Corner Verdant Bricks | 转角辉岩绿砖 |
| `block.createdeco.cracked_blue_brick_slab` | Cracked Blue Brick Slab | 裂纹皓石蓝砖台阶 |
| `block.createdeco.cracked_blue_brick_stairs` | Cracked Blue Brick Stairs | 裂纹皓石蓝砖楼梯 |
| `block.createdeco.cracked_blue_brick_wall` | Cracked Blue Brick Wall | 裂纹皓石蓝砖墙 |
| `block.createdeco.cracked_blue_bricks` | Cracked Blue Bricks | 裂纹皓石蓝砖 |
| `block.createdeco.cracked_dean_brick_slab` | Cracked Dean Brick Slab | 裂纹赭砂黄砖台阶 |
| `block.createdeco.cracked_dean_brick_stairs` | Cracked Dean Brick Stairs | 裂纹赭砂黄砖楼梯 |
| `block.createdeco.cracked_dean_brick_wall` | Cracked Dean Brick Wall | 裂纹赭砂黄砖墙 |
| `block.createdeco.cracked_dean_bricks` | Cracked Dean Bricks | 裂纹赭砂黄砖 |
| `block.createdeco.cracked_dusk_brick_slab` | Cracked Dusk Brick Slab | 裂纹焦渣黑砖台阶 |
| `block.createdeco.cracked_dusk_brick_stairs` | Cracked Dusk Brick Stairs | 裂纹焦渣黑砖楼梯 |
| `block.createdeco.cracked_dusk_brick_wall` | Cracked Dusk Brick Wall | 裂纹焦渣黑砖墙 |
| `block.createdeco.cracked_dusk_bricks` | Cracked Dusk Bricks | 裂纹焦渣黑砖 |
| `block.createdeco.cracked_pearl_brick_slab` | Cracked Pearl Brick Slab | 裂纹石灰白砖台阶 |
| `block.createdeco.cracked_pearl_brick_stairs` | Cracked Pearl Brick Stairs | 裂纹石灰白砖楼梯 |
| `block.createdeco.cracked_pearl_brick_wall` | Cracked Pearl Brick Wall | 裂纹石灰白砖墙 |
| `block.createdeco.cracked_pearl_bricks` | Cracked Pearl Bricks | 裂纹石灰白砖 |
| `block.createdeco.cracked_red_brick_slab` | Cracked Red Brick Slab | 裂纹红砖台阶 |
| `block.createdeco.cracked_red_brick_stairs` | Cracked Red Brick Stairs | 裂纹红砖楼梯 |
| `block.createdeco.cracked_red_brick_wall` | Cracked Red Brick Wall | 裂纹红砖墙 |
| `block.createdeco.cracked_red_bricks` | Cracked Red Bricks | 裂纹红砖 |
| `block.createdeco.cracked_scarlet_brick_slab` | Cracked Scarlet Brick Slab | 裂纹绯岩红砖台阶 |
| `block.createdeco.cracked_scarlet_brick_stairs` | Cracked Scarlet Brick Stairs | 裂纹绯岩红砖楼梯 |
| `block.createdeco.cracked_scarlet_brick_wall` | Cracked Scarlet Brick Wall | 裂纹绯岩红砖墙 |
| `block.createdeco.cracked_scarlet_bricks` | Cracked Scarlet Bricks | 裂纹绯岩红砖 |
| `block.createdeco.cracked_umber_brick_slab` | Cracked Umber Brick Slab | 裂纹熔渣棕砖台阶 |
| `block.createdeco.cracked_umber_brick_stairs` | Cracked Umber Brick Stairs | 裂纹熔渣棕砖楼梯 |
| `block.createdeco.cracked_umber_brick_wall` | Cracked Umber Brick Wall | 裂纹熔渣棕砖墙 |
| `block.createdeco.cracked_umber_bricks` | Cracked Umber Bricks | 裂纹熔渣棕砖 |
| `block.createdeco.cracked_verdant_brick_slab` | Cracked Verdant Brick Slab | 裂纹辉岩绿砖台阶 |
| `block.createdeco.cracked_verdant_brick_stairs` | Cracked Verdant Brick Stairs | 裂纹辉岩绿砖楼梯 |
| `block.createdeco.cracked_verdant_brick_wall` | Cracked Verdant Brick Wall | 裂纹辉岩绿砖墙 |
| `block.createdeco.cracked_verdant_bricks` | Cracked Verdant Bricks | 裂纹辉岩绿砖 |
| `block.createdeco.cyan_placard` | Cyan Placard | 青色置物牌 |
| `block.createdeco.cyan_shipping_container` | Cyan Shipping Container | 青色集装箱 |
| `block.createdeco.dean_brick_slab` | Dean Brick Slab | 赭砂黄砖台阶 |
| `block.createdeco.dean_brick_stairs` | Dean Brick Stairs | 赭砂黄砖楼梯 |
| `block.createdeco.dean_brick_wall` | Dean Brick Wall | 赭砂黄砖墙 |
| `block.createdeco.dean_bricks` | Dean Bricks | 赭砂黄砖块 |
| `block.createdeco.decal_creeper` | Creeper Decal | 苦力怕图案贴标 |
| `block.createdeco.decal_cross` | Cross Decal | 交叉图案贴标 |
| `block.createdeco.decal_down` | Down Arrow Decal | 下箭头图案贴标 |
| `block.createdeco.decal_down_left` | Down Left Arrow Decal | 左下箭头图案贴标 |
| `block.createdeco.decal_down_right` | Down Right Arrow Decal | 右下箭头图案贴标 |
| `block.createdeco.decal_electrical` | Electrical Decal | 带电图案贴标 |
| `block.createdeco.decal_fire` | Fire Decal | 火焰图案贴标 |
| `block.createdeco.decal_fire_diamond` | Fire Diamond Decal | 危险品菱形贴标 |
| `block.createdeco.decal_flow` | Flow Decal | 水浪图案贴标 |
| `block.createdeco.decal_fluid` | Fluid Decal | 流体图案贴标 |
| `block.createdeco.decal_ice` | Ice Decal | 寒冷图案贴标 |
| `block.createdeco.decal_left` | Left Arrow Decal | 左箭头图案贴标 |
| `block.createdeco.decal_no_entry` | No Entry Decal | 禁入图案贴标 |
| `block.createdeco.decal_radioactive` | Radioactive Decal | 辐射图案贴标 |
| `block.createdeco.decal_right` | Right Arrow Decal | 右箭头图案贴标 |
| `block.createdeco.decal_skull` | Skull Decal | 骷髅图案贴标 |
| `block.createdeco.decal_top_left` | Up Left Arrow Decal | 左上箭头图案贴标 |
| `block.createdeco.decal_top_right` | Up Right Arrow Decal | 右上箭头图案贴标 |
| `block.createdeco.decal_up` | Up Arrow Decal | 上箭头图案贴标 |
| `block.createdeco.decal_warning` | Warning Decal | 警告图案贴标 |
| `block.createdeco.dusk_brick_slab` | Dusk Brick Slab | 焦渣黑砖台阶 |
| `block.createdeco.dusk_brick_stairs` | Dusk Brick Stairs | 焦渣黑砖楼梯 |
| `block.createdeco.dusk_brick_wall` | Dusk Brick Wall | 焦渣黑砖墙 |
| `block.createdeco.dusk_bricks` | Dusk Bricks | 焦渣黑砖块 |
| `block.createdeco.gold_coinstack` | GoldCoin Stack Block | 金硬币堆 |
| `block.createdeco.gray_placard` | Gray Placard | 灰色置物牌 |
| `block.createdeco.gray_shipping_container` | Gray Shipping Container | 灰色集装箱 |
| `block.createdeco.green_andesite_lamp` | Green Andesite Cage Lamp | 绿色安山笼灯 |
| `block.createdeco.green_brass_lamp` | Green Brass Cage Lamp | 绿色黄铜笼灯 |
| `block.createdeco.green_copper_lamp` | Green Copper Cage Lamp | 绿色铜笼灯 |
| `block.createdeco.green_industrial_iron_lamp` | Green Industrial Iron Cage Lamp | 绿色工业铁笼灯 |
| `block.createdeco.green_iron_lamp` | Green Iron Cage Lamp | 绿色铁笼灯 |
| `block.createdeco.green_placard` | Green Placard | 绿色置物牌 |
| `block.createdeco.green_shipping_container` | Green Shipping Container | 绿色集装箱 |
| `block.createdeco.green_zinc_lamp` | Green Zinc Cage Lamp | 绿色锌笼灯 |
| `block.createdeco.industrial_iron_bars` | Industrial Iron Bars | 工业铁栏杆 |
| `block.createdeco.industrial_iron_bars_overlay` | Industrial Iron Bars Overlay | 工业铁栏板 |
| `block.createdeco.industrial_iron_catwalk` | Industrial Iron Catwalk | 工业铁检修走道 |
| `block.createdeco.industrial_iron_catwalk_railing` | Industrial Iron Catwalk Railing | 工业铁检修走道栏杆 |
| `block.createdeco.industrial_iron_catwalk_stairs` | Industrial Iron Catwalk Stairs | 工业铁检修走道楼梯 |
| `block.createdeco.industrial_iron_coinstack` | Industrial IronCoin Stack Block | 工业铁硬币堆 |
| `block.createdeco.industrial_iron_door` | Industrial Iron Door | 工业铁门 |
| `block.createdeco.industrial_iron_hull` | Industrial Iron Train Hull | 工业铁列车外壳 |
| `block.createdeco.industrial_iron_ladder` | Industrial Iron Ladder | 工业铁梯子 |
| `block.createdeco.industrial_iron_mesh_fence` | Industrial Iron Mesh Fence | 工业铁网栏 |
| `block.createdeco.industrial_iron_sheet_metal` | Industrial Iron Sheet Metal | 工业铁板方块 |
| `block.createdeco.industrial_iron_support` | Industrial Iron Support | 工业铁支架 |
| `block.createdeco.industrial_iron_support_wedge` | Industrial Iron Support Wedge | 工业铁支撑楔 |
| `block.createdeco.industrial_iron_trapdoor` | Industrial Iron Trapdoor | 工业铁活板门 |
| `block.createdeco.industrial_iron_window` | Industrial Iron Window | 工业铁窗户 |
| `block.createdeco.industrial_iron_window_pane` | Industrial Iron Window Pane | 工业铁窗玻璃板 |
| `block.createdeco.iron_bars_overlay` | Iron Bars Overlay | 铁栏板 |
| `block.createdeco.iron_catwalk` | Iron Catwalk | 铁检修走道 |
| `block.createdeco.iron_catwalk_railing` | Iron Catwalk Railing | 铁检修走道栏杆 |
| `block.createdeco.iron_catwalk_stairs` | Iron Catwalk Stairs | 铁检修走道楼梯 |
| `block.createdeco.iron_coinstack` | IronCoin Stack Block | 铁硬币堆 |
| `block.createdeco.iron_hull` | Iron Train Hull | 铁列车外壳 |
| `block.createdeco.iron_ladder` | Iron Ladder | 铁梯子 |
| `block.createdeco.iron_mesh_fence` | Iron Mesh Fence | 铁网栏 |
| `block.createdeco.iron_sheet_metal` | Iron Sheet Metal | 铁板方块 |
| `block.createdeco.iron_support` | Iron Support | 铁支架 |
| `block.createdeco.iron_support_wedge` | Iron Support Wedge | 铁支撑楔 |
| `block.createdeco.iron_window` | Iron Window | 铁窗户 |
| `block.createdeco.iron_window_pane` | Iron Window Pane | 铁窗玻璃板 |
| `block.createdeco.light_blue_placard` | Light Blue Placard | 淡蓝色置物牌 |
| `block.createdeco.light_blue_shipping_container` | Light blue Shipping Container | 淡蓝色集装箱 |
| `block.createdeco.light_gray_placard` | Light Gray Placard | 淡灰色置物牌 |
| `block.createdeco.light_gray_shipping_container` | Light gray Shipping Container | 淡灰色集装箱 |
| `block.createdeco.lime_placard` | Lime Placard | 黄绿色置物牌 |
| `block.createdeco.lime_shipping_container` | Lime Shipping Container | 黄绿色集装箱 |
| `block.createdeco.locked_andesite_door` | Locked Andesite Door | 上锁的安山门 |
| `block.createdeco.locked_brass_door` | Locked Brass Door | 上锁的黄铜门 |
| `block.createdeco.locked_copper_door` | Locked Copper Door | 上锁的铜门 |
| `block.createdeco.locked_industrial_iron_door` | Locked Industrial Iron Door | 上锁的工业铁门 |
| `block.createdeco.locked_zinc_door` | Locked Zinc Door | 上锁的锌门 |
| `block.createdeco.long_blue_brick_slab` | Long Blue Brick Slab | 条状皓石蓝砖台阶 |
| `block.createdeco.long_blue_brick_stairs` | Long Blue Brick Stairs | 条状皓石蓝砖楼梯 |
| `block.createdeco.long_blue_brick_wall` | Long Blue Brick Wall | 条状皓石蓝砖墙 |
| `block.createdeco.long_blue_bricks` | Long Blue Bricks | 条状皓石蓝砖 |
| `block.createdeco.long_dean_brick_slab` | Long Dean Brick Slab | 条状赭砂黄砖台阶 |
| `block.createdeco.long_dean_brick_stairs` | Long Dean Brick Stairs | 条状赭砂黄砖楼梯 |
| `block.createdeco.long_dean_brick_wall` | Long Dean Brick Wall | 条状赭砂黄砖墙 |
| `block.createdeco.long_dean_bricks` | Long Dean Bricks | 条状赭砂黄砖 |
| `block.createdeco.long_dusk_brick_slab` | Long Dusk Brick Slab | 条状焦渣黑砖台阶 |
| `block.createdeco.long_dusk_brick_stairs` | Long Dusk Brick Stairs | 条状焦渣黑砖楼梯 |
| `block.createdeco.long_dusk_brick_wall` | Long Dusk Brick Wall | 条状焦渣黑砖墙 |
| `block.createdeco.long_dusk_bricks` | Long Dusk Bricks | 条状焦渣黑砖 |
| `block.createdeco.long_pearl_brick_slab` | Long Pearl Brick Slab | 条状石灰白砖台阶 |
| `block.createdeco.long_pearl_brick_stairs` | Long Pearl Brick Stairs | 条状石灰白砖楼梯 |
| `block.createdeco.long_pearl_brick_wall` | Long Pearl Brick Wall | 条状石灰白砖墙 |
| `block.createdeco.long_pearl_bricks` | Long Pearl Bricks | 条状石灰白砖 |
| `block.createdeco.long_red_brick_slab` | Long Red Brick Slab | 条状红砖台阶 |
| `block.createdeco.long_red_brick_stairs` | Long Red Brick Stairs | 条状红砖楼梯 |
| `block.createdeco.long_red_brick_wall` | Long Red Brick Wall | 条状红砖墙 |
| `block.createdeco.long_red_bricks` | Long Red Bricks | 条状红砖 |
| `block.createdeco.long_scarlet_brick_slab` | Long Scarlet Brick Slab | 条状绯岩红砖台阶 |
| `block.createdeco.long_scarlet_brick_stairs` | Long Scarlet Brick Stairs | 条状绯岩红砖楼梯 |
| `block.createdeco.long_scarlet_brick_wall` | Long Scarlet Brick Wall | 条状绯岩红砖墙 |
| `block.createdeco.long_scarlet_bricks` | Long Scarlet Bricks | 条状绯岩红砖 |
| `block.createdeco.long_umber_brick_slab` | Long Umber Brick Slab | 条状熔渣棕砖台阶 |
| `block.createdeco.long_umber_brick_stairs` | Long Umber Brick Stairs | 条状熔渣棕砖楼梯 |
| `block.createdeco.long_umber_brick_wall` | Long Umber Brick Wall | 条状熔渣棕砖墙 |
| `block.createdeco.long_umber_bricks` | Long Umber Bricks | 条状熔渣棕砖 |
| `block.createdeco.long_verdant_brick_slab` | Long Verdant Brick Slab | 条状辉岩绿砖台阶 |
| `block.createdeco.long_verdant_brick_stairs` | Long Verdant Brick Stairs | 条状辉岩绿砖楼梯 |
| `block.createdeco.long_verdant_brick_wall` | Long Verdant Brick Wall | 条状辉岩绿砖墙 |
| `block.createdeco.long_verdant_bricks` | Long Verdant Bricks | 条状辉岩绿砖 |
| `block.createdeco.magenta_placard` | Magenta Placard | 品红色置物牌 |
| `block.createdeco.magenta_shipping_container` | Magenta Shipping Container | 品红色集装箱 |
| `block.createdeco.mossy_blue_brick_slab` | Mossy Blue Brick Slab | 覆苔皓石蓝砖台阶 |
| `block.createdeco.mossy_blue_brick_stairs` | Mossy Blue Brick Stairs | 覆苔皓石蓝砖楼梯 |
| `block.createdeco.mossy_blue_brick_wall` | Mossy Blue Brick Wall | 覆苔皓石蓝砖墙 |
| `block.createdeco.mossy_blue_bricks` | Mossy Blue Bricks | 覆苔皓石蓝砖 |
| `block.createdeco.mossy_dean_brick_slab` | Mossy Dean Brick Slab | 覆苔赭砂黄砖台阶 |
| `block.createdeco.mossy_dean_brick_stairs` | Mossy Dean Brick Stairs | 覆苔赭砂黄砖楼梯 |
| `block.createdeco.mossy_dean_brick_wall` | Mossy Dean Brick Wall | 覆苔赭砂黄砖墙 |
| `block.createdeco.mossy_dean_bricks` | Mossy Dean Bricks | 覆苔赭砂黄砖 |
| `block.createdeco.mossy_dusk_brick_slab` | Mossy Dusk Brick Slab | 覆苔焦渣黑砖台阶 |
| `block.createdeco.mossy_dusk_brick_stairs` | Mossy Dusk Brick Stairs | 覆苔焦渣黑砖楼梯 |
| `block.createdeco.mossy_dusk_brick_wall` | Mossy Dusk Brick Wall | 覆苔焦渣黑砖墙 |
| `block.createdeco.mossy_dusk_bricks` | Mossy Dusk Bricks | 覆苔焦渣黑砖 |
| `block.createdeco.mossy_pearl_brick_slab` | Mossy Pearl Brick Slab | 覆苔石灰白砖台阶 |
| `block.createdeco.mossy_pearl_brick_stairs` | Mossy Pearl Brick Stairs | 覆苔石灰白砖楼梯 |
| `block.createdeco.mossy_pearl_brick_wall` | Mossy Pearl Brick Wall | 覆苔石灰白砖墙 |
| `block.createdeco.mossy_pearl_bricks` | Mossy Pearl Bricks | 覆苔石灰白砖 |
| `block.createdeco.mossy_red_brick_slab` | Mossy Red Brick Slab | 覆苔红砖台阶 |
| `block.createdeco.mossy_red_brick_stairs` | Mossy Red Brick Stairs | 覆苔红砖楼梯 |
| `block.createdeco.mossy_red_brick_wall` | Mossy Red Brick Wall | 覆苔红砖墙 |
| `block.createdeco.mossy_red_bricks` | Mossy Red Bricks | 覆苔红砖 |
| `block.createdeco.mossy_scarlet_brick_slab` | Mossy Scarlet Brick Slab | 覆苔绯岩红砖台阶 |
| `block.createdeco.mossy_scarlet_brick_stairs` | Mossy Scarlet Brick Stairs | 覆苔绯岩红砖楼梯 |
| `block.createdeco.mossy_scarlet_brick_wall` | Mossy Scarlet Brick Wall | 覆苔绯岩红砖墙 |
| `block.createdeco.mossy_scarlet_bricks` | Mossy Scarlet Bricks | 覆苔绯岩红砖 |
| `block.createdeco.mossy_umber_brick_slab` | Mossy Umber Brick Slab | 覆苔熔渣棕砖台阶 |
| `block.createdeco.mossy_umber_brick_stairs` | Mossy Umber Brick Stairs | 覆苔熔渣棕砖楼梯 |
| `block.createdeco.mossy_umber_brick_wall` | Mossy Umber Brick Wall | 覆苔熔渣棕砖墙 |
| `block.createdeco.mossy_umber_bricks` | Mossy Umber Bricks | 覆苔熔渣棕砖 |
| `block.createdeco.mossy_verdant_brick_slab` | Mossy Verdant Brick Slab | 覆苔辉岩绿砖台阶 |
| `block.createdeco.mossy_verdant_brick_stairs` | Mossy Verdant Brick Stairs | 覆苔辉岩绿砖楼梯 |
| `block.createdeco.mossy_verdant_brick_wall` | Mossy Verdant Brick Wall | 覆苔辉岩绿砖墙 |
| `block.createdeco.mossy_verdant_bricks` | Mossy Verdant Bricks | 覆苔辉岩绿砖 |
| `block.createdeco.netherite_coinstack` | NetheriteCoin Stack Block | 下界合金硬币堆 |
| `block.createdeco.orange_placard` | Orange Placard | 橙色置物牌 |
| `block.createdeco.orange_shipping_container` | Orange Shipping Container | 橙色集装箱 |
| `block.createdeco.pearl_brick_slab` | Pearl Brick Slab | 石灰白砖台阶 |
| `block.createdeco.pearl_brick_stairs` | Pearl Brick Stairs | 石灰白砖楼梯 |
| `block.createdeco.pearl_brick_wall` | Pearl Brick Wall | 石灰白砖墙 |
| `block.createdeco.pearl_bricks` | Pearl Bricks | 石灰白砖块 |
| `block.createdeco.pink_placard` | Pink Placard | 粉红色置物牌 |
| `block.createdeco.pink_shipping_container` | Pink Shipping Container | 粉红色集装箱 |
| `block.createdeco.purple_placard` | Purple Placard | 紫色置物牌 |
| `block.createdeco.purple_shipping_container` | Purple Shipping Container | 紫色集装箱 |
| `block.createdeco.red_andesite_lamp` | Red Andesite Cage Lamp | 红色安山笼灯 |
| `block.createdeco.red_brass_lamp` | Red Brass Cage Lamp | 红色黄铜笼灯 |
| `block.createdeco.red_copper_lamp` | Red Copper Cage Lamp | 红色铜笼灯 |
| `block.createdeco.red_industrial_iron_lamp` | Red Industrial Iron Cage Lamp | 红色工业铁笼灯 |
| `block.createdeco.red_iron_lamp` | Red Iron Cage Lamp | 红色铁笼灯 |
| `block.createdeco.red_placard` | Red Placard | 红色置物牌 |
| `block.createdeco.red_shipping_container` | Red Shipping Container | 红色集装箱 |
| `block.createdeco.red_zinc_lamp` | Red Zinc Cage Lamp | 红色锌笼灯 |
| `block.createdeco.scarlet_brick_slab` | Scarlet Brick Slab | 绯岩红砖台阶 |
| `block.createdeco.scarlet_brick_stairs` | Scarlet Brick Stairs | 绯岩红砖楼梯 |
| `block.createdeco.scarlet_brick_wall` | Scarlet Brick Wall | 绯岩红砖墙 |
| `block.createdeco.scarlet_bricks` | Scarlet Bricks | 绯岩红砖块 |
| `block.createdeco.short_blue_brick_slab` | Short Blue Brick Slab | 密砌皓石蓝砖台阶 |
| `block.createdeco.short_blue_brick_stairs` | Short Blue Brick Stairs | 密砌皓石蓝砖楼梯 |
| `block.createdeco.short_blue_brick_wall` | Short Blue Brick Wall | 密砌皓石蓝砖墙 |
| `block.createdeco.short_blue_bricks` | Short Blue Bricks | 密砌皓石蓝砖 |
| `block.createdeco.short_dean_brick_slab` | Short Dean Brick Slab | 密砌赭砂黄砖台阶 |
| `block.createdeco.short_dean_brick_stairs` | Short Dean Brick Stairs | 密砌赭砂黄砖楼梯 |
| `block.createdeco.short_dean_brick_wall` | Short Dean Brick Wall | 密砌赭砂黄砖墙 |
| `block.createdeco.short_dean_bricks` | Short Dean Bricks | 密砌赭砂黄砖 |
| `block.createdeco.short_dusk_brick_slab` | Short Dusk Brick Slab | 密砌焦渣黑砖台阶 |
| `block.createdeco.short_dusk_brick_stairs` | Short Dusk Brick Stairs | 密砌焦渣黑砖楼梯 |
| `block.createdeco.short_dusk_brick_wall` | Short Dusk Brick Wall | 密砌焦渣黑砖墙 |
| `block.createdeco.short_dusk_bricks` | Short Dusk Bricks | 密砌焦渣黑砖 |
| `block.createdeco.short_pearl_brick_slab` | Short Pearl Brick Slab | 密砌石灰白砖台阶 |
| `block.createdeco.short_pearl_brick_stairs` | Short Pearl Brick Stairs | 密砌石灰白砖楼梯 |
| `block.createdeco.short_pearl_brick_wall` | Short Pearl Brick Wall | 密砌石灰白砖墙 |
| `block.createdeco.short_pearl_bricks` | Short Pearl Bricks | 密砌石灰白砖 |
| `block.createdeco.short_red_brick_slab` | Short Red Brick Slab | 密砌红砖台阶 |
| `block.createdeco.short_red_brick_stairs` | Short Red Brick Stairs | 密砌红砖楼梯 |
| `block.createdeco.short_red_brick_wall` | Short Red Brick Wall | 密砌红砖墙 |
| `block.createdeco.short_red_bricks` | Short Red Bricks | 密砌红砖 |
| `block.createdeco.short_scarlet_brick_slab` | Short Scarlet Brick Slab | 密砌绯岩红砖台阶 |
| `block.createdeco.short_scarlet_brick_stairs` | Short Scarlet Brick Stairs | 密砌绯岩红砖楼梯 |
| `block.createdeco.short_scarlet_brick_wall` | Short Scarlet Brick Wall | 密砌绯岩红砖墙 |
| `block.createdeco.short_scarlet_bricks` | Short Scarlet Bricks | 密砌绯岩红砖 |
| `block.createdeco.short_umber_brick_slab` | Short Umber Brick Slab | 密砌熔渣棕砖台阶 |
| `block.createdeco.short_umber_brick_stairs` | Short Umber Brick Stairs | 密砌熔渣棕砖楼梯 |
| `block.createdeco.short_umber_brick_wall` | Short Umber Brick Wall | 密砌熔渣棕砖墙 |
| `block.createdeco.short_umber_bricks` | Short Umber Bricks | 密砌熔渣棕砖 |
| `block.createdeco.short_verdant_brick_slab` | Short Verdant Brick Slab | 密砌辉岩绿砖台阶 |
| `block.createdeco.short_verdant_brick_stairs` | Short Verdant Brick Stairs | 密砌辉岩绿砖楼梯 |
| `block.createdeco.short_verdant_brick_wall` | Short Verdant Brick Wall | 密砌辉岩绿砖墙 |
| `block.createdeco.short_verdant_bricks` | Short Verdant Bricks | 密砌辉岩绿砖 |
| `block.createdeco.tiled_blue_brick_slab` | Tiled Blue Brick Slab | 密铺皓石蓝砖台阶 |
| `block.createdeco.tiled_blue_brick_stairs` | Tiled Blue Brick Stairs | 密铺皓石蓝砖楼梯 |
| `block.createdeco.tiled_blue_brick_wall` | Tiled Blue Brick Wall | 密铺皓石蓝砖墙 |
| `block.createdeco.tiled_blue_bricks` | Tiled Blue Bricks | 密铺皓石蓝砖 |
| `block.createdeco.tiled_dean_brick_slab` | Tiled Dean Brick Slab | 密铺赭砂黄砖台阶 |
| `block.createdeco.tiled_dean_brick_stairs` | Tiled Dean Brick Stairs | 密铺赭砂黄砖楼梯 |
| `block.createdeco.tiled_dean_brick_wall` | Tiled Dean Brick Wall | 密铺赭砂黄砖墙 |
| `block.createdeco.tiled_dean_bricks` | Tiled Dean Bricks | 密铺赭砂黄砖 |
| `block.createdeco.tiled_dusk_brick_slab` | Tiled Dusk Brick Slab | 密铺焦渣黑砖台阶 |
| `block.createdeco.tiled_dusk_brick_stairs` | Tiled Dusk Brick Stairs | 密铺焦渣黑砖楼梯 |
| `block.createdeco.tiled_dusk_brick_wall` | Tiled Dusk Brick Wall | 密铺焦渣黑砖墙 |
| `block.createdeco.tiled_dusk_bricks` | Tiled Dusk Bricks | 密铺焦渣黑砖 |
| `block.createdeco.tiled_pearl_brick_slab` | Tiled Pearl Brick Slab | 密铺石灰白砖台阶 |
| `block.createdeco.tiled_pearl_brick_stairs` | Tiled Pearl Brick Stairs | 密铺石灰白砖楼梯 |
| `block.createdeco.tiled_pearl_brick_wall` | Tiled Pearl Brick Wall | 密铺石灰白砖墙 |
| `block.createdeco.tiled_pearl_bricks` | Tiled Pearl Bricks | 密铺石灰白砖 |
| `block.createdeco.tiled_red_brick_slab` | Tiled Red Brick Slab | 密铺红砖台阶 |
| `block.createdeco.tiled_red_brick_stairs` | Tiled Red Brick Stairs | 密铺红砖楼梯 |
| `block.createdeco.tiled_red_brick_wall` | Tiled Red Brick Wall | 密铺红砖墙 |
| `block.createdeco.tiled_red_bricks` | Tiled Red Bricks | 密铺红砖 |
| `block.createdeco.tiled_scarlet_brick_slab` | Tiled Scarlet Brick Slab | 密铺绯岩红砖台阶 |
| `block.createdeco.tiled_scarlet_brick_stairs` | Tiled Scarlet Brick Stairs | 密铺绯岩红砖楼梯 |
| `block.createdeco.tiled_scarlet_brick_wall` | Tiled Scarlet Brick Wall | 密铺绯岩红砖墙 |
| `block.createdeco.tiled_scarlet_bricks` | Tiled Scarlet Bricks | 密铺绯岩红砖 |
| `block.createdeco.tiled_umber_brick_slab` | Tiled Umber Brick Slab | 密铺熔渣棕砖台阶 |
| `block.createdeco.tiled_umber_brick_stairs` | Tiled Umber Brick Stairs | 密铺熔渣棕砖楼梯 |
| `block.createdeco.tiled_umber_brick_wall` | Tiled Umber Brick Wall | 密铺熔渣棕砖墙 |
| `block.createdeco.tiled_umber_bricks` | Tiled Umber Bricks | 密铺熔渣棕砖 |
| `block.createdeco.tiled_verdant_brick_slab` | Tiled Verdant Brick Slab | 密铺辉岩绿砖台阶 |
| `block.createdeco.tiled_verdant_brick_stairs` | Tiled Verdant Brick Stairs | 密铺辉岩绿砖楼梯 |
| `block.createdeco.tiled_verdant_brick_wall` | Tiled Verdant Brick Wall | 密铺辉岩绿砖墙 |
| `block.createdeco.tiled_verdant_bricks` | Tiled Verdant Bricks | 密铺辉岩绿砖 |
| `block.createdeco.umber_brick_slab` | Umber Brick Slab | 熔渣棕砖台阶 |
| `block.createdeco.umber_brick_stairs` | Umber Brick Stairs | 熔渣棕砖楼梯 |
| `block.createdeco.umber_brick_wall` | Umber Brick Wall | 熔渣棕砖墙 |
| `block.createdeco.umber_bricks` | Umber Bricks | 熔渣棕砖块 |
| `block.createdeco.verdant_brick_slab` | Verdant Brick Slab | 辉岩绿砖台阶 |
| `block.createdeco.verdant_brick_stairs` | Verdant Brick Stairs | 辉岩绿砖楼梯 |
| `block.createdeco.verdant_brick_wall` | Verdant Brick Wall | 辉岩绿砖墙 |
| `block.createdeco.verdant_bricks` | Verdant Bricks | 辉岩绿砖块 |
| `block.createdeco.white_shipping_container` | White Shipping Container | 白色集装箱 |
| `block.createdeco.yellow_andesite_lamp` | Yellow Andesite Cage Lamp | 黄色安山笼灯 |
| `block.createdeco.yellow_brass_lamp` | Yellow Brass Cage Lamp | 黄色黄铜笼灯 |
| `block.createdeco.yellow_copper_lamp` | Yellow Copper Cage Lamp | 黄色铜笼灯 |
| `block.createdeco.yellow_industrial_iron_lamp` | Yellow Industrial Iron Cage Lamp | 黄色工业铁笼灯 |
| `block.createdeco.yellow_iron_lamp` | Yellow Iron Cage Lamp | 黄色铁笼灯 |
| `block.createdeco.yellow_placard` | Yellow Placard | 黄色置物牌 |
| `block.createdeco.yellow_shipping_container` | Yellow Shipping Container | 黄色集装箱 |
| `block.createdeco.yellow_zinc_lamp` | Yellow Zinc Cage Lamp | 黄色锌笼灯 |
| `block.createdeco.zinc_bars` | Zinc Bars | 锌栏杆 |
| `block.createdeco.zinc_bars_overlay` | Zinc Bars Overlay | 锌栏板 |
| `block.createdeco.zinc_catwalk` | Zinc Catwalk | 锌检修走道 |
| `block.createdeco.zinc_catwalk_railing` | Zinc Catwalk Railing | 锌检修走道栏杆 |
| `block.createdeco.zinc_catwalk_stairs` | Zinc Catwalk Stairs | 锌检修走道楼梯 |
| `block.createdeco.zinc_coinstack` | ZincCoin Stack Block | 锌硬币堆 |
| `block.createdeco.zinc_door` | Zinc Door | 锌门 |
| `block.createdeco.zinc_hull` | Zinc Train Hull | 锌列车外壳 |
| `block.createdeco.zinc_ladder` | Zinc Ladder | 锌梯子 |
| `block.createdeco.zinc_mesh_fence` | Zinc Mesh Fence | 锌网栏 |
| `block.createdeco.zinc_sheet_metal` | Zinc Sheet Metal | 锌板方块 |
| `block.createdeco.zinc_support` | Zinc Support | 锌支架 |
| `block.createdeco.zinc_support_wedge` | Zinc Support Wedge | 锌支撑楔 |
| `block.createdeco.zinc_trapdoor` | Zinc Trapdoor | 锌活板门 |
| `block.createdeco.zinc_window` | Zinc Window | 锌窗户 |
| `block.createdeco.zinc_window_pane` | Zinc Window Pane | 锌窗玻璃板 |
| `item.createdeco.andesite_sheet` | Andesite Alloy Sheet | 安山合金板 |
| `item.createdeco.brass_coin` | Brass Coin | 黄铜硬币 |
| `item.createdeco.brass_coinstack` | Brass Coin Stack | 黄铜硬币堆 |
| `item.createdeco.copper_coin` | Copper Coin | 铜硬币 |
| `item.createdeco.copper_coinstack` | Copper Coin Stack | 铜硬币堆 |
| `item.createdeco.gold_coin` | Gold Coin | 金硬币 |
| `item.createdeco.gold_coinstack` | Gold Coin Stack | 金硬币堆 |
| `item.createdeco.industrial_iron_coin` | Industrial Iron Coin | 工业铁硬币 |
| `item.createdeco.industrial_iron_coinstack` | Industrial Iron Coin Stack | 工业铁硬币堆 |
| `item.createdeco.industrial_iron_ingot` | Industrial Iron Ingot | 工业铁锭 |
| `item.createdeco.industrial_iron_nugget` | Industrial Iron Nugget | 工业铁粒 |
| `item.createdeco.industrial_iron_sheet` | Industrial Iron Sheet | 工业铁板 |
| `item.createdeco.iron_coin` | Iron Coin | 铁硬币 |
| `item.createdeco.iron_coinstack` | Iron Coin Stack | 铁硬币堆 |
| `item.createdeco.netherite_coin` | Netherite Coin | 下界合金硬币 |
| `item.createdeco.netherite_coinstack` | Netherite Coin Stack | 下界合金硬币堆 |
| `item.createdeco.netherite_nugget` | Netherite Nugget | 下界合金粒 |
| `item.createdeco.netherite_sheet` | Netherite Sheet | 下界合金板 |
| `item.createdeco.zinc_coin` | Zinc Coin | 锌硬币 |
| `item.createdeco.zinc_coinstack` | Zinc Coin Stack | 锌硬币堆 |
| `item.createdeco.zinc_sheet` | Zinc Sheet | 锌板 |
