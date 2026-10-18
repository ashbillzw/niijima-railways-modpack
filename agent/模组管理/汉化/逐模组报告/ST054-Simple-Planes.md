# ST054 Simple Planes

2026-10-18；当前5.3.3。111并集键，英文108／中文88；通读108对应条目与3个中文额外旧键。新增23、修正23（均为原中文中残留英文的补译）。已有TNT保留；未把原机炮、漂浮垫等已确认中文重新命名。

## 官方上游

[1.20.1中文](https://github.com/przemykomo/simple-planes/blob/08d16554717397c7b67e24bff45f9c65b3662341/src/main/resources/assets/simpleplanes/lang/zh_cn.json)与[master中文](https://github.com/przemykomo/simple-planes/blob/3b1617cbdd6a88c645f9af6fb1ebad6714fbc798/src/main/resources/assets/simpleplanes/lang/zh_cn.json)均88键，当前范围无变化，未能补齐本版缺口。未穷尽PR。

## 十条代表译文

| 英文 | 已应用 |
| --- | --- |
| Liquid Engine | 液体燃料引擎 |
| Solar Panel | 太阳能板 |
| Cargo Plane | 货运飞机 |
| Shooter Upgrade | 机炮升级 |
| Press %s for inventory, %s to shoot | 按 %s 打开物品栏，按 %s 射击 |
| Throttle Up | 增大油门 |
| Plane Yaw Right | 飞机向右偏航 |
| Add Cargo | 添加货物 |
| Pure daisy bundle | 白雏菊束 |
| For controllers, a threshold for the joystick movement of the plane | 使用手柄控制飞机时，摇杆开始响应的移动阈值。 |

## 范围及待核

液体引擎采用“液体燃料引擎”避免误解为液压引擎；shooter对齐现有“机炮”，payload沿用载荷。纯英文配置标题／说明补译，不改变配置值；含旧魔力升级／AutoConfig条目，是否仍有入口待实际验证，不能把语言键存在视为功能启用。现有onboard提示的%2$s／%1$s顺序正确，未改变。降下载荷是否应改“投下载荷”、脱离是否更适合“下机”属后续上下文检查，本轮不凭措辞好恶改写。

3个中文额外键保留。当前索引之外的教程书残留问题仍见既有教程书专题，不以语言补译宣称补回书本。JSON、占位符、缺键覆盖检查通过；未全类硬编码筛查、未游戏验证或部署。

## 全部修改

| 键 | 原值 | 已应用 |
| --- | --- | --- |
| `item.simpleplanes.liquid_engine` | （缺失） | 液体燃料引擎 |
| `item.simpleplanes.solar_panel` | （缺失） | 太阳能板 |
| `item.simpleplanes.shooter` | （缺失） | 机炮升级 |
| `block.simpleplanes.charger_block` | FE charging station | FE充电站 |
| `block.simpleplanes.fueling_block` | plane fueling station | 飞机加油站 |
| `name.simpleplanes.mana_upgrade` | Pure daisy bundle | 白雏菊束 |
| `name.simpleplanes.solar_panel` | （缺失） | 太阳能板 |
| `name.simpleplanes.chest` | （缺失） | 箱子 |
| `name.simpleplanes.payload` | （缺失） | 载荷 |
| `simpleplanes.planes_tab` | （缺失） | 简易飞机 |
| `item.simpleplanes.cargo_plane` | （缺失） | 货运飞机 |
| `text.autoconfig.simpleplanes.category.default` | misc | 杂项 |
| `text.autoconfig.simpleplanes.category.coal` | coal | 煤炭 |
| `text.autoconfig.simpleplanes.category.mana` | mana | 魔力 |
| `text.autoconfig.simpleplanes.category.energy` | energy | 能量 |
| `text.autoconfig.simpleplanes.category.lava` | lava | 熔岩 |
| `text.autoconfig.simpleplanes.option.TURN_THRESHOLD` | Turn Threshold | 转向阈值 |
| `text.autoconfig.simpleplanes.option.TURN_THRESHOLD.@Tooltip` | For controllers, a threshold for the joystick movement of the plane | 使用手柄控制飞机时，摇杆开始响应的移动阈值。 |
| `text.autoconfig.simpleplanes.option.EASY_FLIGHT` | easy flight | 简易飞行 |
| `text.autoconfig.simpleplanes.option.EASY_FLIGHT.@Tooltip` | easier flight mode, disables the extreme movements | 简化飞行操作，禁用极端机动。 |
| `text.autoconfig.simpleplanes.option.PLANE_CRASH` | plane crash | 飞机坠毁 |
| `text.autoconfig.simpleplanes.option.THIEF` | plane heist | 飞机盗窃 |
| `text.autoconfig.simpleplanes.option.THIEF.@Tooltip` | can players steal planes | 是否允许玩家偷走飞机。 |
| `text.autoconfig.simpleplanes.option.FLY_TICKS_PER_COAL` | FLY_TICKS_PER_COAL | 每份煤炭的飞行时长 |
| `text.autoconfig.simpleplanes.option.FLY_TICKS_PER_COAL.@Tooltip` | Ticks of flying per one coal burn time | 每份煤炭燃烧时间对应的飞行时长，单位为游戏刻。 |
| `text.autoconfig.simpleplanes.option.COAL_MAX_FUEL` | coal max fuel | 煤炭燃料上限 |
| `text.autoconfig.simpleplanes.option.COAL_MAX_FUEL.@Tooltip` | Max Fuel For Coal Plane | 煤炭动力飞机可储存的最大燃料量。 |
| `text.autoconfig.simpleplanes.option.MANA_COST` | mana cost | 魔力消耗量 |
| `text.autoconfig.simpleplanes.option.MANA_COST.@Tooltip` | mana amount to use when out | 燃料耗尽时，每次消耗的魔力量。 |
| `text.autoconfig.simpleplanes.option.FLY_TICKS_PER_MANA` | fly ticks per mana | 每次魔力消耗的飞行时长 |
| `text.autoconfig.simpleplanes.option.FLY_TICKS_PER_MANA.@Tooltip` | number of flight ticks per mana usage | 每次消耗魔力可维持的飞行时长，单位为游戏刻。 |
| `simpleplanes:liquid_engine` | （缺失） | 液体燃料引擎 |
| `simpleplanes:solar_panel` | （缺失） | 太阳能板 |
| `simpleplanes.gui.fluid` | （缺失） | %s：%s mB |
| `simpleplanes.press_key` | （缺失） | 在飞行器内按下 %s |
| `simpleplanes.shooter_desc` | （缺失） | 按 %s 打开物品栏，按 %s 射击 |
| `key.plane_throttle_up.desc` | （缺失） | 增大油门 |
| `key.plane_throttle_down.desc` | （缺失） | 减小油门 |
| `key.plane_pitch_up.desc` | （缺失） | 飞机抬头 |
| `key.plane_pitch_down.desc` | （缺失） | 飞机低头 |
| `key.plane_inventory_open.desc` | （缺失） | 打开飞机物品栏 |
| `key.move_heli_up.desc` | （缺失） | 直升机上升 |
| `key.plane_yaw_right.desc` | （缺失） | 飞机向右偏航 |
| `key.plane_yaw_left.desc` | （缺失） | 飞机向左偏航 |
| `simpleplanes.add_upgrades` | （缺失） | 添加升级 |
| `simpleplanes.add_cargo` | （缺失） | 添加货物 |
