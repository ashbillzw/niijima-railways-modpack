# ST040 Yuushya 方块小镇

日期：2026-10-17。包内2.2.3，英中并集2348键。通读按英中值去重的1810组文本，核对工具说明、模板、材质系列与结构警告。原中文2305键，保留作者趣味命名与中文专有描述。

## 上游与判断依据

官方[master中文](https://github.com/XiLaiTL/Yuushya-Townscape/blob/817b148712feca477ce864d1d737b8abed2ae33f/common/src/main/resources/assets/yuushya/lang/zh_cn.json)2192键；[Multiple_versions中文](https://github.com/XiLaiTL/Yuushya-Townscape/blob/7bf7517e1ff69492c757132af5c36fd64cb2ab79/common/src/main/resources/assets/yuushya/lang/zh_cn.json)48键。两份均不能填补本版缺键，不用旧版文件覆盖本版中文，未穷尽PR。

旋转工具line1、line2及switch均明确旋转，line3误写偏移值，修正。红色双开窗框补系列编号0；苔石石砖删除重复字。屋顶upper使用up_tiles_fx模型，与lower区分，改顶部。

石栏杆英文写3种形态，中文2种；当前blockstate仅form=0/1，因此保留中文2，不追随英文错误。形态扳手line3有意留空，其说明已经写入line2，不重复填充；最初缺/空候选44包含这一项，实际缺键43。

## 暂保留与限制

西服猫（英文Calico）、画板/画架、日光灯/白炽灯、同名贴顶藤蔓暂保留：不能仅凭英文断言模型材质和作者中文错了。后续游戏视觉复核，不冒充已验证。新增粗木顶面按英文Top直译，具体外观待游戏确认。品牌、元语言信息、end标记、故意空说明不强译。未进行全类硬编码扫描、游戏显示或模型验收，未打包、部署、提交。

## 应用明细

| 键 | 原中文或英文 | 本轮中文 |
| --- | --- | --- |
| `item.yuushya.side_slab_blueprint.line1` | §9[Prototype] §6(Crafting material for Stonecutter) | §9[合成蓝图] §6(用于在切石机内合成) |
| `item.yuushya.slab_blueprint.line1` | §9[Prototype] §6(Crafting material for Stonecutter) | §9[合成蓝图] §6(用于在切石机内合成) |
| `item.yuushya.ridge_blueprint.line1` | §9[Prototype] §6(Crafting material for Stonecutter) | §9[合成蓝图] §6(用于在切石机内合成) |
| `item.yuushya.layer_blueprint.line1` | §9[Prototype] §6(Crafting material for Stonecutter) | §9[合成蓝图] §6(用于在切石机内合成) |
| `item.yuushya.column_blueprint.line1` | §9[Prototype] §6(Crafting material for Stonecutter) | §9[合成蓝图] §6(用于在切石机内合成) |
| `item.yuushya.crossbeam_blueprint.line1` | §9[Prototype] §6(Crafting material for Stonecutter) | §9[合成蓝图] §6(用于在切石机内合成) |
| `item.yuushya.frame_stuff_blueprint.line1` | §9[Prototype] §6(Crafting material for Stonecutter) | §9[合成蓝图] §6(用于在切石机内合成) |
| `block.yuushya.leafparticleblock` | Falling Leaves | 落叶 |
| `block.yuushya.leafparticleblock.line1` | §9[Particle Generator] | §9[粒子生成器] |
| `block.yuushya.modelframe.line1` | §8Unavailable | §8不可用 |
| `block.yuushya.showblock.line1` | §8Unavailable | §8不可用 |
| `block.yuushya.mixedblock.line1` | §8Unavailable | §8不可用 |
| `item.yuushya.skateboard_shelf` | Skateboard Shelf Template | 滑板架 模板 |
| `item.yuushya.skateboard_shelf.line1` | §9[Template]§a(Right Click to use) | §9[模板]§a(可右键打开使用) |
| `block.yuushya.raw_crimson_wood_top` | Raw Crimson Wood Top | 绯红树粗木顶面 |
| `block.yuushya.raw_spruce_wood_top` | Raw Spruce Wood Top | 云杉粗木顶面 |
| `block.yuushya.raw_warped_wood_top` | Raw Warped Wood Top | 诡异粗木顶面 |
| `block.yuushya.raw_crimson_wood_top.line1` | §9[Template Assets] | §9[模板材料] |
| `block.yuushya.raw_spruce_wood_top.line1` | §9[Template Assets] | §9[模板材料] |
| `block.yuushya.raw_warped_wood_top.line1` | §9[Template Assets] | §9[模板材料] |
| `block.yuushya.sea_salt_milk` | Sea Salt Milk | 海盐牛奶 |
| `block.yuushya.straw_mat_a.line1` | §9[Template Assets] | §9[模板材料] |
| `block.yuushya.straw_mat_b.line1` | §9[Template Assets] | §9[模板材料] |
| `item.yuushya.sakura_tree.line1` | §9Please ensure there's enough space for this structure, because this change can't be undone! | §9请预留足够空间,此操作不可撤销! |
| `item.yuushya.maple_tree.line1` | §9Please ensure there's enough space for this structure, because this change can't be undone! | §9请预留足够空间,此操作不可撤销! |
| `item.yuushya.oak_tree.line1` | §9Please ensure there's enough space for this structure, because this change can't be undone! | §9请预留足够空间,此操作不可撤销! |
| `item.yuushya.pink_blooming_tree.line1` | §9Please ensure there's enough space for this structure, because this change can't be undone! | §9请预留足够空间,此操作不可撤销! |
| `item.yuushya.white_blooming_tree.line1` | §9Please ensure there's enough space for this structure, because this change can't be undone! | §9请预留足够空间,此操作不可撤销! |
| `item.yuushya.yellow_blooming_tree.line1` | §9Please ensure there's enough space for this structure, because this change can't be undone! | §9请预留足够空间,此操作不可撤销! |
| `item.yuushya.cozy_interior_0.line1` | §9Please ensure there's enough space for this structure, because this change can't be undone! | §9请预留足够空间,此操作不可撤销! |
| `item.yuushya.cozy_interior_1.line1` | §9Please ensure there's enough space for this structure, because this change can't be undone! | §9请预留足够空间,此操作不可撤销! |
| `item.yuushya.model_building_0.line1` | §9Please ensure there's enough space for this structure, because this change can't be undone! | §9请预留足够空间,此操作不可撤销! |
| `item.yuushya.model_building_1.line1` | §9Please ensure there's enough space for this structure, because this change can't be undone! | §9请预留足够空间,此操作不可撤销! |
| `item.yuushya.grand_building.line1` | §9Please ensure there's enough space for this structure, because this change can't be undone! | §9请预留足够空间,此操作不可撤销! |
| `item.yuushya.shop_sign_examples.line1` | §9Please ensure there's enough space for this structure, because this change can't be undone! | §9请预留足够空间,此操作不可撤销! |
| `item.yuushya.department.line1` | §9Please ensure there's enough space for this structure, because this change can't be undone! | §9请预留足够空间,此操作不可撤销! |
| `item.yuushya.dining_truck.line1` | §9Please ensure there's enough space for this structure, because this change can't be undone! | §9请预留足够空间,此操作不可撤销! |
| `item.yuushya.normal_truck.line1` | §9Please ensure there's enough space for this structure, because this change can't be undone! | §9请预留足够空间,此操作不可撤销! |
| `item.yuushya.villa_0.line1` | §9Please ensure there's enough space for this structure, because this change can't be undone! | §9请预留足够空间,此操作不可撤销! |
| `block.yuushya.goods_shelf_frying_pan.line1` | §a(Use [Form Wrench] to switch)§9[Available Form:2(Bottom)] | §a(可用形态扳手变换)§9[可变形态:2(基座)] |
| `block.yuushya.gray_tile_upper.line1` | §a(Use [Form Wrench] to switch)§9[Available Form:2(Fill the Gap)] | §a(可用形态扳手变换)§9[可变形态:2(填补缝隙)] |
| `block.yuushya.colornote1.line1` | §9#Blue | §9#蓝色 |
| `block.yuushya.colornote2.line1` | §6#Yellow | §6#黄色 |
| `item.yuushya.rot_trans_item.line3` | §9可调整的数值为[层]的XYZ偏移值 | §9可调整的数值为[层]的XYZ旋转角度 |
| `block.yuushya.red_windows_deviated_0` | 红色双开窗框 | 红色双开窗框 0 |
| `block.yuushya.mossy_bricks` | 苔石石砖 | 苔石砖 |
| `block.yuushya.tiles_fix_upper` | 瓦片屋顶底部缝隙填充 | 瓦片屋顶顶部缝隙填充 |

本轮新增43、修正4。JSON、键归属与格式占位符静态检查通过；有意空行1项单独排除。
