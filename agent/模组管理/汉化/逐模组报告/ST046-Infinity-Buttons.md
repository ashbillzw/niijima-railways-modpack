# ST046 Infinity Buttons 无限按钮

2026-10-17。4.0.7，412键全部有zh条目，但大量仍是英文。全表初筛，新增键0、已有值修正228（其中英文补译211条，其余纠错/对齐）。有意空白配置分隔行2条保留，不填重复内容。

## 上游与兼容材质

[官方master中文](https://github.com/LarsMans64/InfinityButtons/blob/ed1468fc77d7024b079145943e62d7976eb6ab8c/src/main/resources/assets/infinitybuttons/lang/zh_cn.json)290键，103条与当前已有值不同；1.20.4分支d6b64ad35b5736752d9f472b42c9194fe5d203f7无中文文件。参考而非整文件覆盖，未穷尽PR。

依据当前JAR配方追溯材料；Create材质使用包内同名方块译文，例如玫瑰石英瓦/细瓦、皓蓝石小砖块，修正上游“小型切制…”与主模组不一致之处。Quark喇叭木/苍白木、Endergetic幽仪木/幽幕砖、Upgrade Aquatic桑木/齿砖参考各自官方中文文件：

- [Quark](https://github.com/VazkiiMods/Quark/blob/master/src/main/resources/assets/quark/lang/zh_cn.json)
- [Endergetic](https://github.com/team-abnormals/endergetic/blob/1.20.x/src/main/resources/assets/endergetic/lang/zh_cn.json)
- [Upgrade Aquatic](https://github.com/team-abnormals/upgrade-aquatic/blob/1.20.x/src/main/resources/assets/upgrade_aquatic/lang/zh_cn.json)

这些是本机已保存快照的可变分支参考，不声称固定提交；未安装兼容模组。Savage and Ravage参考路径返回404，阴郁瓦等少数材料按英文和系列补译，后续安装对应兼容模组时宜复核。

## 明确问题及适配

- 钻石大按钮误写海晶，丛林误写从林，凝灰岩名首多空格；已修。
- 滴水石按钮配方使用minecraft:dripstone_block，不是滴水石锥；改滴水石。
- StickyCopperButton与WaxedCopperButton是不同类；黏性按钮用于保持开关状态，不能与涂蜡按钮同名。统一黏性，tooltip中的杠杆改为游戏内拉杆。
- 新版上游把Sneak写成“轻轻”，已改潜行；Hold Shift改按住。LetterButton含CHARACTER属性，使用字符按钮，保留进度“给我写封信”的双关。
- 灯笼红石位置明确为最顶端锁链，含水不再描述为“可能会被水淹没”。
- 配置保留枚举值RANGE/GLOBAL便于对应界面，中文解释区块单位和服务端配置范围。彩色按钮格式、作者“有钱银，羡慕不？”保留。

## 十条代表性变动

| 英文 | 本轮中文 |
| --- | --- |
| Sticky Copper Button | 黏性铜质按钮 |
| Letter Button | 字符按钮 |
| Rose Quartz Tile Secret Button | 玫瑰石英瓦隐蔽按钮 |
| River Bookshelf Secret Button | 桑木书架隐蔽按钮 |
| Sneak to open and close | 潜行以打开或关闭 |
| Emits a redstone signal at the top most chain above the lantern | 在灯笼上方最顶端的锁链处发出红石信号 |
| This button can be waterlogged | 这个按钮可以含水 |
| Gotta press them all! | 按！快来按！ |
| The distance in chunks in which the alarm is heard when 'Alarm Type' is set to 'RANGE' | 警报类型为 RANGE 时可听见警报的距离，以区块为单位 |
| Whether a server should force clients to hide secret buttons when using Jade | 服务器是否强制客户端在使用 Jade 时隐藏隐蔽按钮 |

## 全部应用明细

| 键 | 原值 | 本轮中文 |
| --- | --- | --- |
| `block.infinitybuttons.waxed_copper_button` | Waxed Copper Button | 涂蜡铜质按钮 |
| `block.infinitybuttons.waxed_exposed_copper_button` | Waxed Exposed Copper Button | 涂蜡斑驳的铜质按钮 |
| `block.infinitybuttons.waxed_weathered_copper_button` | Waxed Weathered Copper Button | 涂蜡锈蚀的铜质按钮 |
| `block.infinitybuttons.waxed_oxidized_copper_button` | Waxed Oxidized Copper Button | 涂蜡氧化的铜质按钮 |
| `block.infinitybuttons.sticky_copper_button` | 涂蜡铜质按钮 | 黏性铜质按钮 |
| `block.infinitybuttons.sticky_exposed_copper_button` | 涂蜡斑驳的铜质按钮 | 黏性斑驳的铜质按钮 |
| `block.infinitybuttons.sticky_weathered_copper_button` | 涂蜡锈蚀的铜质按钮 | 黏性锈蚀的铜质按钮 |
| `block.infinitybuttons.sticky_oxidized_copper_button` | 涂蜡氧化的铜质按钮 | 黏性氧化的铜质按钮 |
| `block.infinitybuttons.waxed_copper_large_button` | Waxed Copper Large Button | 涂蜡铜质大按钮 |
| `block.infinitybuttons.waxed_exposed_copper_large_button` | Waxed Exposed Copper Large Button | 涂蜡斑驳的铜质大按钮 |
| `block.infinitybuttons.waxed_weathered_copper_large_button` | Waxed Weathered Copper Large Button | 涂蜡锈蚀的铜质大按钮 |
| `block.infinitybuttons.waxed_oxidized_copper_large_button` | Waxed Oxidized Copper Large Button | 涂蜡氧化的铜质大按钮 |
| `block.infinitybuttons.sticky_copper_large_button` | 涂蜡铜质大按钮 | 黏性铜质大按钮 |
| `block.infinitybuttons.sticky_exposed_copper_large_button` | 涂蜡斑驳的铜质大按钮 | 黏性斑驳的铜质大按钮 |
| `block.infinitybuttons.sticky_weathered_copper_large_button` | 涂蜡锈蚀的铜质大按钮 | 黏性锈蚀的铜质大按钮 |
| `block.infinitybuttons.sticky_oxidized_copper_large_button` | 涂蜡氧化的铜质大按钮 | 黏性氧化的铜质大按钮 |
| `block.infinitybuttons.diamond_large_button` | 海晶大按钮 | 钻石大按钮 |
| `block.infinitybuttons.purpur_block_secret_button` | Purpur Block Secret Button | 紫珀块隐蔽按钮 |
| `block.infinitybuttons.rose_quartz_tile_secret_button` | Rose Quartz Tile Secret Button | 玫瑰石英瓦隐蔽按钮 |
| `block.infinitybuttons.small_rose_quartz_tile_secret_button` | Small Rose Quartz Tile Secret Button | 玫瑰石英细瓦隐蔽按钮 |
| `block.infinitybuttons.cut_granite_brick_secret_button` | Cut Granite Brick Secret Button | 切制花岗岩砖块隐蔽按钮 |
| `block.infinitybuttons.small_granite_brick_secret_button` | Small Granite Brick Secret Button | 花岗岩小砖块隐蔽按钮 |
| `block.infinitybuttons.cut_diorite_brick_secret_button` | Cut Diorite Brick Secret Button | 切制闪长岩砖块隐蔽按钮 |
| `block.infinitybuttons.small_diorite_brick_secret_button` | Small Diorite Brick Secret Button | 闪长岩小砖块隐蔽按钮 |
| `block.infinitybuttons.cut_andesite_brick_secret_button` | Cut Andesite Brick Secret Button | 切制安山岩砖块隐蔽按钮 |
| `block.infinitybuttons.small_andesite_brick_secret_button` | Small Andesite Brick Secret Button | 安山岩小砖块隐蔽按钮 |
| `block.infinitybuttons.cut_calcite_brick_secret_button` | Cut Calcite Brick Secret Button | 切制方解石砖块隐蔽按钮 |
| `block.infinitybuttons.small_calcite_brick_secret_button` | Small Calcite Brick Secret Button | 方解石小砖块隐蔽按钮 |
| `block.infinitybuttons.cut_dripstone_brick_secret_button` | Cut Dripstone Brick Secret Button | 切制滴水石砖块隐蔽按钮 |
| `block.infinitybuttons.small_dripstone_brick_secret_button` | Small Dripstone Brick Secret Button | 滴水石小砖块隐蔽按钮 |
| `block.infinitybuttons.cut_deepslate_brick_secret_button` | Cut Deepslate Brick Secret Button | 切制深板岩砖块隐蔽按钮 |
| `block.infinitybuttons.small_deepslate_brick_secret_button` | Small Deepslate Brick Secret Button | 深板岩小砖块隐蔽按钮 |
| `block.infinitybuttons.cut_tuff_brick_secret_button` | Cut Tuff Brick Secret Button | 切制凝灰岩砖块隐蔽按钮 |
| `block.infinitybuttons.small_tuff_brick_secret_button` | Small Tuff Brick Secret Button | 凝灰岩小砖块隐蔽按钮 |
| `block.infinitybuttons.cut_asurine_brick_secret_button` | Cut Asurine Brick Secret Button | 切制皓蓝石砖块隐蔽按钮 |
| `block.infinitybuttons.small_asurine_brick_secret_button` | Small Asurine Brick Secret Button | 皓蓝石小砖块隐蔽按钮 |
| `block.infinitybuttons.cut_crimsite_brick_secret_button` | Cut Crimsite Brick Secret Button | 切制绯红岩砖块隐蔽按钮 |
| `block.infinitybuttons.small_crimsite_brick_secret_button` | Small Crimsite Brick Secret Button | 绯红岩小砖块隐蔽按钮 |
| `block.infinitybuttons.cut_limestone_brick_secret_button` | Cut Limestone Brick Secret Button | 切制石灰岩砖块隐蔽按钮 |
| `block.infinitybuttons.small_limestone_brick_secret_button` | Small Limestone Brick Secret Button | 石灰岩小砖块隐蔽按钮 |
| `block.infinitybuttons.cut_ochrum_brick_secret_button` | Cut Ochrum Brick Secret Button | 切制赭金砂砖块隐蔽按钮 |
| `block.infinitybuttons.small_ochrum_brick_secret_button` | Small Ochrum Brick Secret Button | 赭金砂小砖块隐蔽按钮 |
| `block.infinitybuttons.cut_scoria_brick_secret_button` | Cut Scoria Brick Secret Button | 切制熔渣砖块隐蔽按钮 |
| `block.infinitybuttons.small_scoria_brick_secret_button` | Small Scoria Brick Secret Button | 熔渣小砖块隐蔽按钮 |
| `block.infinitybuttons.cut_scorchia_brick_secret_button` | Cut Scorchia Brick Secret Button | 切制焦黑熔渣砖块隐蔽按钮 |
| `block.infinitybuttons.small_scorchia_brick_secret_button` | Small Scorchia Brick Secret Button | 焦黑熔渣小砖块隐蔽按钮 |
| `block.infinitybuttons.cut_veridium_brick_secret_button` | Cut Veridium Brick Secret Button | 切制辉绿岩砖块隐蔽按钮 |
| `block.infinitybuttons.small_veridium_brick_secret_button` | Small Veridium Brick Secret Button | 辉绿岩小砖块隐蔽按钮 |
| `block.infinitybuttons.lamp_lever` | Lamp Toggle Button | 灯具切换按钮 |
| `block.infinitybuttons.letter_button` | Letter Button | 字符按钮 |
| `block.infinitybuttons.letter_lever` | Letter Toggle Button | 字符切换按钮 |
| `block.infinitybuttons.hoglin_mount_button` | Hoglin Trophy Button | 疣猪兽挂饰按钮 |
| `block.infinitybuttons.lantern_button` | Lantern Button | 灯笼按钮 |
| `block.infinitybuttons.lantern_lever` | Lantern Lever | 灯笼拉杆 |
| `block.infinitybuttons.soul_lantern_button` | Soul Lantern Button | 灵魂灯笼按钮 |
| `block.infinitybuttons.soul_lantern_lever` | Soul Lantern Lever | 灵魂灯笼拉杆 |
| `block.infinitybuttons.small_console_button` | Small Console Button | 小型控制器按钮 |
| `block.infinitybuttons.small_console_lever` | Small Console Toggle Button | 切换式小型控制器按钮 |
| `block.infinitybuttons.console_button` | Console Button | 控制器按钮 |
| `block.infinitybuttons.console_lever` | Console Toggle Button | 切换式控制器按钮 |
| `block.infinitybuttons.large_console_button` | Large Console Button | 大型控制器按钮 |
| `block.infinitybuttons.large_console_lever` | Large Console Toggle Button | 切换式大型控制器按钮 |
| `block.infinitybuttons.big_console_button` | Big Console Button | 巨型控制器按钮 |
| `block.infinitybuttons.big_console_lever` | Big Console Toggle Button | 切换式巨型控制器按钮 |
| `block.infinitybuttons.propelplant_torch_button` | Propelplant Torch Button | 枪药草火炬按钮 |
| `block.infinitybuttons.propelplant_torch_lever` | Propelplant Torch Lever | 枪药草火炬拉杆 |
| `infinitybuttons.tooltip.safe_emergency_button` | Sneak to open and close | 潜行以打开或关闭 |
| `infinitybuttons.tooltip.letter_button` | Sneak-click to change the character | 潜行点击以切换字符 |
| `infinitybuttons.tooltip.lantern_button` | Emits a redstone signal at the top most chain above the lantern | 在灯笼上方最顶端的锁链处发出红石信号 |
| `infinitybuttons.actionbar.closed_safety_button` | Sneak to open and close | 潜行以打开或关闭 |
| `advancement.infinitybuttons.root` | Infinity Buttons | 无限按钮 |
| `advancement.infinitybuttons.root.desc` | Gotta press them all! | 按！快来按！ |
| `advancement.infinitybuttons.first_button` | First Button | 第一个按钮 |
| `advancement.infinitybuttons.first_button.desc` | Obtain your first button | 获得第一个按钮 |
| `advancement.infinitybuttons.emergency` | Emergency! | 警报！警报！ |
| `advancement.infinitybuttons.emergency.desc` | Press the emergency button! | 按下紧急按钮 |
| `advancement.infinitybuttons.ding_dong` | Ding Dong! | 叮咚！ |
| `advancement.infinitybuttons.ding_dong.desc` | Ring the doorbell | 按下门铃 |
| `advancement.infinitybuttons.secret_button` | Shhh... it's a secret! | 嘘...这可是秘密 |
| `advancement.infinitybuttons.secret_button.desc` | Hide a secret button in a wall | 将一个隐蔽按钮安置在墙上 |
| `advancement.infinitybuttons.safety_button` | Stylish! | 时尚！ |
| `advancement.infinitybuttons.safety_button.desc` | Wear a Safety Button on your head | 在你的头上顶一个安全按钮 |
| `advancement.infinitybuttons.letter_button` | Write Me a Letter | 给我写封信 |
| `advancement.infinitybuttons.letter_button.desc` | Express yourself with a Letter Button | 用字符按钮表达自己 |
| `advancement.infinitybuttons.sticky` | Sticky! | 黏糊糊的! |
| `advancement.infinitybuttons.sticky.desc` | Create a Sticky Copper Button by pouring honey over a Waxed Copper Button | 在涂蜡铜质按钮上浇上蜂蜜，制作黏性铜质按钮 |
| `tag.item.infinitybuttons.bookshelf_secret_buttons` | Bookshelf Secret Buttons | 书架隐蔽按钮 |
| `tag.item.infinitybuttons.concrete_powder_buttons` | Concrete Powder Buttons | 混凝土粉末按钮 |
| `tag.item.infinitybuttons.concrete_powder_large_buttons` | Concrete Powder Large Buttons | 混凝土粉末大按钮 |
| `tag.item.infinitybuttons.console_buttons` | Console Buttons | 控制器按钮 |
| `tag.item.infinitybuttons.copper_buttons` | Copper Buttons | 铜质按钮 |
| `tag.item.infinitybuttons.copper_large_buttons` | Copper Large Buttons | 铜质大按钮 |
| `tag.item.infinitybuttons.emergency_buttons` | Emergency Buttons | 紧急按钮 |
| `tag.item.infinitybuttons.lantern_buttons` | Lantern Buttons | 灯笼按钮 |
| `tag.item.infinitybuttons.large_buttons` | Large Buttons | 大按钮 |
| `tag.item.infinitybuttons.safe_emergency_buttons` | Safe Emergency Buttons | 安全按钮 |
| `tag.item.infinitybuttons.secret_buttons` | Secret Buttons | 隐蔽按钮 |
| `tag.item.infinitybuttons.torch_buttons` | Torch Buttons | 火把按钮 |
| `tag.item.infinitybuttons.wooden_large_buttons` | Wooden Large Buttons | 木制大按钮 |
| `tag.item.infinitybuttons.wooden_secret_buttons` | Wooden Secret Buttons | 木制隐蔽按钮 |
| `config.jade.plugin_infinitybuttons.hide_secret_buttons` | Hide Secret Buttons | 隐藏隐蔽按钮 |
| `config.jade.plugin_infinitybuttons.hide_torch_buttons` | Hide Torch Buttons | 隐藏火把按钮 |
| `config.jade.plugin_infinitybuttons.hide_lantern_buttons` | Hide Lantern Buttons | 隐藏灯笼按钮 |
| `block.infinitybuttons.arid_sand_button` | Arid Sand Button | 干燥沙子按钮 |
| `block.infinitybuttons.red_arid_sand_button` | Red Arid Sand Button | 干燥红沙按钮 |
| `block.infinitybuttons.mangrove_bookshelf_secret_button` | Mangrove Bookshelf Secret Button | 红树木书架隐蔽按钮 |
| `block.infinitybuttons.cherry_bookshelf_secret_button` | Cherry Bookshelf Secret Button | 樱花木书架隐蔽按钮 |
| `block.infinitybuttons.bamboo_bookshelf_secret_button` | Bamboo Bookshelf Secret Button | 竹书架隐蔽按钮 |
| `block.infinitybuttons.blossom_bookshelf_secret_button` | Trumpet Bookshelf Secret Button | 喇叭木书架隐蔽按钮 |
| `block.infinitybuttons.azalea_bookshelf_secret_button` | Azalea Bookshelf Secret Button | 杜鹃木书架隐蔽按钮 |
| `block.infinitybuttons.ancient_bookshelf_secret_button` | Ashen Bookshelf Secret Button | 苍白木书架隐蔽按钮 |
| `block.infinitybuttons.poise_bookshelf_secret_button` | Poise Bookshelf Secret Button | 幽仪木书架隐蔽按钮 |
| `block.infinitybuttons.rosewood_bookshelf_secret_button` | Rosewood Bookshelf Secret Button | 花梨木书架隐蔽按钮 |
| `block.infinitybuttons.morado_bookshelf_secret_button` | Morado Bookshelf Secret Button | 酸枝木书架隐蔽按钮 |
| `block.infinitybuttons.yucca_bookshelf_secret_button` | Yucca Bookshelf Secret Button | 丝兰木书架隐蔽按钮 |
| `block.infinitybuttons.laurel_bookshelf_secret_button` | Laurel Bookshelf Secret Button | 月桂木书架隐蔽按钮 |
| `block.infinitybuttons.aspen_bookshelf_secret_button` | Aspen Bookshelf Secret Button | 白杨木书架隐蔽按钮 |
| `block.infinitybuttons.kousa_bookshelf_secret_button` | Kousa Bookshelf Secret Button | 梾木书架隐蔽按钮 |
| `block.infinitybuttons.grimwood_bookshelf_secret_button` | Grimwood Bookshelf Secret Button | 阴郁木书架隐蔽按钮 |
| `block.infinitybuttons.driftwood_bookshelf_secret_button` | Driftwood Bookshelf Secret Button | 浮木书架隐蔽按钮 |
| `block.infinitybuttons.river_bookshelf_secret_button` | River Bookshelf Secret Button | 桑木书架隐蔽按钮 |
| `block.infinitybuttons.cherry_plank_secret_button` | Cherry Plank Secret Button | 樱花木板隐蔽按钮 |
| `block.infinitybuttons.ender_lantern_button` | Ender Lantern Button | 末影灯笼按钮 |
| `block.infinitybuttons.chiseled_end_stone_brick_secret_button` | Chiseled End Stone Brick Secret Button | 錾制末地石砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_eumus_brick_secret_button` | Chiseled Eumus Brick Secret Button | 錾制幽幕砖块隐蔽按钮 |
| `block.infinitybuttons.cracked_end_stone_brick_secret_button` | Cracked End Stone Brick Secret Button | 裂纹末地石砖隐蔽按钮 |
| `block.infinitybuttons.cracked_eumus_brick_secret_button` | Cracked Eumus Brick Secret Button | 裂纹幽幕砖块隐蔽按钮 |
| `block.infinitybuttons.eumus_brick_secret_button` | Eumus Brick Secret Button | 幽幕砖块隐蔽按钮 |
| `block.infinitybuttons.chiseled_chocolate_brick_secret_button` | Chiseled Chocolate Brick Secret Button | 錾制巧克力砖块隐蔽按钮 |
| `block.infinitybuttons.chiseled_tooth_brick_secret_button` | Chiseled Tooth Brick Secret Button | 錾制齿砖隐蔽按钮 |
| `block.infinitybuttons.permafrost_brick_secret_button` | Permafrost Brick Secret Button | 永冻石砖隐蔽按钮 |
| `block.infinitybuttons.blue_nether_brick_secret_button` | Blue Nether Brick Secret Button | 蓝色下界砖隐蔽按钮 |
| `block.infinitybuttons.polished_granite_brick_secret_button` | Polished Granite Brick Secret Button | 花岗岩砖隐蔽按钮 |
| `block.infinitybuttons.polished_diorite_brick_secret_button` | Polished Diorite Brick Secret Button | 闪长岩砖隐蔽按钮 |
| `block.infinitybuttons.polished_andesite_brick_secret_button` | Polished Andesite Brick Secret Button | 安山岩砖隐蔽按钮 |
| `block.infinitybuttons.polished_calcite_brick_secret_button` | Polished Calcite Brick Secret Button | 方解石砖隐蔽按钮 |
| `block.infinitybuttons.polished_dripstone_brick_secret_button` | Polished Dripstone Brick Secret Button | 滴水石砖隐蔽按钮 |
| `block.infinitybuttons.polished_tuff_brick_secret_button` | Polished Tuff Brick Secret Button | 凝灰岩砖隐蔽按钮 |
| `block.infinitybuttons.polished_limestone_brick_secret_button` | Polished Limestone Brick Secret Button | 石灰石砖隐蔽按钮 |
| `block.infinitybuttons.polished_jasper_brick_secret_button` | Polished Jasper Brick Secret Button | 碧玉石砖隐蔽按钮 |
| `block.infinitybuttons.polished_shale_brick_secret_button` | Polished Shale Brick Secret Button | 页岩砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_polished_granite_brick_secret_button` | Chiseled Polished Granite Brick Secret Button | 雕纹花岗岩砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_polished_diorite_brick_secret_button` | Chiseled Polished Diorite Brick Secret Button | 雕纹闪长岩砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_polished_andesite_brick_secret_button` | Chiseled Polished Andesite Brick Secret Button | 雕纹安山岩砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_polished_calcite_brick_secret_button` | Chiseled Polished Calcite Brick Secret Button | 雕纹方解石砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_polished_dripstone_brick_secret_button` | Chiseled Polished Dripstone Brick Secret Button | 雕纹滴水石砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_polished_tuff_brick_secret_button` | Chiseled Polished Tuff Brick Secret Button | 雕纹凝灰岩砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_polished_limestone_brick_secret_button` | Chiseled Polished Limestone Brick Secret Button | 雕纹石灰石砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_polished_jasper_brick_secret_button` | Chiseled Polished Jasper Brick Secret Button | 雕纹碧玉石砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_polished_shale_brick_secret_button` | Chiseled Polished Shale Brick Secret Button | 雕纹页岩砖隐蔽按钮 |
| `block.infinitybuttons.ender_lantern_lever` | Ender Lantern Lever | 末影灯笼拉杆 |
| `block.infinitybuttons.ender_torch_button` | Ender Torch Button | 末影火把按钮 |
| `block.infinitybuttons.ender_torch_lever` | Ender Torch Lever | 末影火把拉杆 |
| `infinitybuttons.tooltip.hold_shift` | [按下 Shift 键] | [按住 Shift 键] |
| `infinitybuttons.tooltip.sticky_copper_button` | 这个按钮的作用类似杠杆 | 这个按钮的作用类似拉杆 |
| `infinitybuttons.tooltip.prismarine_button` | 这个按钮可能会被水淹没 | 这个按钮可以含水 |
| `text.autoconfig.infinitybuttons.title` | 无限按钮 Config | 无限按钮配置 |
| `block.infinitybuttons.tuff_button` |  凝灰岩按钮 | 凝灰岩按钮 |
| `block.infinitybuttons.dripstone_button` | 滴水石锥按钮 | 滴水石按钮 |
| `block.infinitybuttons.dripstone_large_button` | 滴水石锥大按钮 | 滴水石大按钮 |
| `block.infinitybuttons.jungle_plank_secret_button` | 从林木板隐蔽按钮 | 丛林木板隐蔽按钮 |
| `text.autoconfig.infinitybuttons.option.muteAlarmSound` | Mute Alarms | 警报静音 |
| `text.autoconfig.infinitybuttons.option.alarmSoundType` | Alarm Type | 警报类型 |
| `text.autoconfig.infinitybuttons.option.alarmSoundType.@Tooltip[0]` | The way in which Emergency Buttons produce an alarm | 紧急按钮发出警报的方式 |
| `text.autoconfig.infinitybuttons.option.alarmSoundType.@Tooltip[1]` | RANGE: Alarms are audible up to a certain radius | RANGE：警报仅在一定半径内可听见 |
| `text.autoconfig.infinitybuttons.option.alarmSoundType.@Tooltip[2]` | GLOBAL: Alarms are audible from anywhere in the world | GLOBAL：世界中任何位置都能听见警报 |
| `text.autoconfig.infinitybuttons.option.alarmSoundType.@Tooltip[4]` | §cChanging this client-side has no effect on a server, | §c在客户端修改此项不会影响服务器， |
| `text.autoconfig.infinitybuttons.option.alarmSoundType.@Tooltip[5]` | §cit has to be changed in the server's config | §c必须修改服务器配置 |
| `text.autoconfig.infinitybuttons.option.alarmSoundRange` | Alarm Range | 警报范围 |
| `text.autoconfig.infinitybuttons.option.alarmSoundRange.@Tooltip` | The distance in chunks in which the alarm is heard when 'Alarm Type' is set to 'RANGE' | 警报类型为 RANGE 时可听见警报的距离，以区块为单位 |
| `text.autoconfig.infinitybuttons.option.alarmVillagerPanic` | Villager Panic | 村民惊慌 |
| `text.autoconfig.infinitybuttons.option.alarmVillagerPanic.@Tooltip` | Makes villagers run to their beds when hearing an alarm | 使村民听到警报时跑向自己的床 |
| `text.autoconfig.infinitybuttons.option.forceJadeHiding` | Force Hiding In Jade | 强制在 Jade 中隐藏 |
| `text.autoconfig.infinitybuttons.option.forceJadeHiding.@Tooltip[0]` | Whether a server should force clients to hide secret buttons when using Jade | 服务器是否强制客户端在使用 Jade 时隐藏隐蔽按钮 |
| `text.autoconfig.infinitybuttons.option.forceJadeHiding.@Tooltip[2]` | §cChanging this client-side has no effect on a server, | §c在客户端修改此项不会影响服务器， |
| `text.autoconfig.infinitybuttons.option.forceJadeHiding.@Tooltip[3]` | §cit has to be changed in the server's config | §c必须修改服务器配置 |
| `block.infinitybuttons.cherry_large_button` | Cherry Large Button | 樱花木大按钮 |
| `block.infinitybuttons.bamboo_large_button` | Bamboo Large Button | 竹大按钮 |
| `block.infinitybuttons.arid_sand_large_button` | Arid Sand Large Button | 干燥沙子大按钮 |
| `block.infinitybuttons.red_arid_sand_large_button` | Red Arid Sand Large Button | 干燥红沙大按钮 |
| `block.infinitybuttons.chiseled_brick_secret_button` | Chiseled Brick Secret Button | 雕纹砖块隐蔽按钮 |
| `block.infinitybuttons.chiseled_mud_brick_secret_button` | Chiseled Mud Brick Secret Button | 雕纹泥砖隐蔽按钮 |
| `block.infinitybuttons.honeycomb_brick_secret_button` | Honeycomb Brick Secret Button | 蜜脾砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_honeycomb_brick_secret_button` | Chiseled Honeycomb Brick Secret Button | 雕纹蜜脾砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_gloomy_tile_secret_button` | Chiseled Gloomy Tile Secret Button | 雕纹阴郁瓦隐蔽按钮 |
| `block.infinitybuttons.kelpy_stone_brick_secret_button` | Kelpy Stone Brick Secret Button | 覆海带石砖隐蔽按钮 |
| `block.infinitybuttons.willow_bookshelf_secret_button` | Willow Bookshelf Secret Button | 柳木书架隐蔽按钮 |
| `block.infinitybuttons.pine_bookshelf_secret_button` | Pine Bookshelf Secret Button | 松木书架隐蔽按钮 |
| `block.infinitybuttons.plum_bookshelf_secret_button` | Plum Bookshelf Secret Button | 梅木书架隐蔽按钮 |
| `block.infinitybuttons.wisteria_bookshelf_secret_button` | Wisteria Bookshelf Secret Button | 紫藤木书架隐蔽按钮 |
| `block.infinitybuttons.maple_bookshelf_secret_button` | Maple Bookshelf Secret Button | 枫木书架隐蔽按钮 |
| `block.infinitybuttons.woodworks_mangrove_bookshelf_secret_button` | Mangrove Bookshelf Secret Button | 红树木书架隐蔽按钮 |
| `block.infinitybuttons.woodworks_cherry_bookshelf_secret_button` | Cherry Bookshelf Secret Button | 樱花木书架隐蔽按钮 |
| `block.infinitybuttons.woodworks_bamboo_bookshelf_secret_button` | Bamboo Bookshelf Secret Button | 竹书架隐蔽按钮 |
| `block.infinitybuttons.terracotta_brick_secret_button` | Terracotta Brick Secret Button | 陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_terracotta_brick_secret_button` | Chiseled Terracotta Brick Secret Button | 雕纹陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.white_terracotta_brick_secret_button` | White Terracotta Brick Secret Button | 白色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_white_terracotta_brick_secret_button` | Chiseled White Terracotta Brick Secret Button | 雕纹白色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.light_gray_terracotta_brick_secret_button` | Light Gray Terracotta Brick Secret Button | 淡灰色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_light_gray_terracotta_brick_secret_button` | Chiseled Light Gray Terracotta Brick Secret Button | 雕纹淡灰色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.gray_terracotta_brick_secret_button` | Gray Terracotta Brick Secret Button | 灰色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_gray_terracotta_brick_secret_button` | Chiseled Gray Terracotta Brick Secret Button | 雕纹灰色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.black_terracotta_brick_secret_button` | Black Terracotta Brick Secret Button | 黑色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_black_terracotta_brick_secret_button` | Chiseled Black Terracotta Brick Secret Button | 雕纹黑色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.brown_terracotta_brick_secret_button` | Brown Terracotta Brick Secret Button | 棕色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_brown_terracotta_brick_secret_button` | Chiseled Brown Terracotta Brick Secret Button | 雕纹棕色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.red_terracotta_brick_secret_button` | Red Terracotta Brick Secret Button | 红色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_red_terracotta_brick_secret_button` | Chiseled Red Terracotta Brick Secret Button | 雕纹红色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.orange_terracotta_brick_secret_button` | Orange Terracotta Brick Secret Button | 橙色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_orange_terracotta_brick_secret_button` | Chiseled Orange Terracotta Brick Secret Button | 雕纹橙色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.yellow_terracotta_brick_secret_button` | Yellow Terracotta Brick Secret Button | 黄色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_yellow_terracotta_brick_secret_button` | Chiseled Yellow Terracotta Brick Secret Button | 雕纹黄色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.lime_terracotta_brick_secret_button` | Lime Terracotta Brick Secret Button | 黄绿色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_lime_terracotta_brick_secret_button` | Chiseled Lime Terracotta Brick Secret Button | 雕纹黄绿色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.green_terracotta_brick_secret_button` | Green Terracotta Brick Secret Button | 绿色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_green_terracotta_brick_secret_button` | Chiseled Green Terracotta Brick Secret Button | 雕纹绿色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.cyan_terracotta_brick_secret_button` | Cyan Terracotta Brick Secret Button | 青色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_cyan_terracotta_brick_secret_button` | Chiseled Cyan Terracotta Brick Secret Button | 雕纹青色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.light_blue_terracotta_brick_secret_button` | Light Blue Terracotta Brick Secret Button | 淡蓝色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_light_blue_terracotta_brick_secret_button` | Chiseled Light Blue Terracotta Brick Secret Button | 雕纹淡蓝色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.blue_terracotta_brick_secret_button` | Blue Terracotta Brick Secret Button | 蓝色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_blue_terracotta_brick_secret_button` | Chiseled Blue Terracotta Brick Secret Button | 雕纹蓝色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.purple_terracotta_brick_secret_button` | Purple Terracotta Brick Secret Button | 紫色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_purple_terracotta_brick_secret_button` | Chiseled Purple Terracotta Brick Secret Button | 雕纹紫色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.magenta_terracotta_brick_secret_button` | Magenta Terracotta Brick Secret Button | 品红色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_magenta_terracotta_brick_secret_button` | Chiseled Magenta Terracotta Brick Secret Button | 雕纹品红色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.pink_terracotta_brick_secret_button` | Pink Terracotta Brick Secret Button | 粉红色陶瓦砖隐蔽按钮 |
| `block.infinitybuttons.chiseled_pink_terracotta_brick_secret_button` | Chiseled Pink Terracotta Brick Secret Button | 雕纹粉红色陶瓦砖隐蔽按钮 |

键覆盖、JSON、占位符检查通过。未游戏验证布局/全部按钮行为、未全类扫描硬编码。未打包、提交、部署。兼容内容语言键存在不代表已安装其对应模组。
