# ST048 Create: Framed 多彩边框

2026-10-17。包内1.5.6，202键通读。31条仍为英文，补齐；另纠正2条浅蓝/淡蓝混用和1条遮光/透光错误。本轮新增键0、已有值修正34。

## 上游对照

[官方1.20.x中文](https://github.com/DakotaPride/create-framed/blob/499fb9631d018134efbd2f2587225856101e3366/src/main/resources/assets/createframed/lang/zh_cn.json)270键，[1.21.x中文](https://github.com/DakotaPride/create-framed/blob/ef33a2388d4a19a166bfbdc6c6bbcf07413bc406/src/main/resources/assets/createframed/lang/zh_cn.json)498键。当前键范围内29条改变相同；适配而不导入新增版本内容。文件含//译者注，比较时仅去整行注释，交付为严格JSON。未穷尽PR。

沿用上游颜色氡灯和缺模组提示，补齐上游尚未翻译的工业铁/绿宝石窗。安山合金保持完整材质名，窗玻璃板与Create Deco对齐。既有玻璃窗板系列保留，不为纯风格改动扩大范围。

## 代表性变动

本模组几乎都是材质/颜色系列，按用户要求不凑10条同格式例子，列6类，全部明细附后。

| 英文或原中文 | 本轮中文 |
| --- | --- |
| Andesite Alloy Window | 安山合金窗户 |
| Industrial Iron Window Pane | 工业铁窗玻璃板 |
| Framed Red Radon Lamp | 红色边框氡灯 |
| Missing mod: Alex's Caves | 缺少模组：Alex的洞穴 |
| 浅蓝色边框玻璃 | 淡蓝色边框玻璃 |
| 透光边框玻璃活板门 | 遮光边框玻璃活板门 |

## 全部明细

| 键 | 原值 | 本轮中文 |
| --- | --- | --- |
| `block.createframed.copper_window` | Copper Window | 铜窗户 |
| `block.createframed.copper_window_pane` | Copper Window Pane | 铜窗玻璃板 |
| `block.createframed.zinc_window` | Zinc Window | 锌窗户 |
| `block.createframed.zinc_window_pane` | Zinc Window Pane | 锌窗玻璃板 |
| `block.createframed.brass_window` | Brass Window | 黄铜窗户 |
| `block.createframed.brass_window_pane` | Brass Window Pane | 黄铜窗玻璃板 |
| `block.createframed.rose_quartz_window` | Rose Quartz Window | 玫瑰石英窗户 |
| `block.createframed.rose_quartz_window_pane` | Rose Quartz Window Pane | 玫瑰石英窗玻璃板 |
| `block.createframed.andesite_alloy_window` | Andesite Alloy Window | 安山合金窗户 |
| `block.createframed.andesite_alloy_window_pane` | Andesite Alloy Window Pane | 安山合金窗玻璃板 |
| `block.createframed.light_blue_stained_framed_glass` | 浅蓝色边框玻璃 | 淡蓝色边框玻璃 |
| `block.createframed.horizontal_light_blue_stained_framed_glass` | 浅蓝色水平边框玻璃 | 淡蓝色水平边框玻璃 |
| `block.createframed.framed_radon_lamp_red` | Framed Red Radon Lamp | 红色边框氡灯 |
| `block.createframed.framed_radon_lamp_orange` | Framed Orange Radon Lamp | 橙色边框氡灯 |
| `block.createframed.framed_radon_lamp_yellow` | Framed Yellow Radon Lamp | 黄色边框氡灯 |
| `block.createframed.framed_radon_lamp_green` | Framed Green Radon Lamp | 绿色边框氡灯 |
| `block.createframed.framed_radon_lamp_lime` | Framed Lime Radon Lamp | 黄绿色边框氡灯 |
| `block.createframed.framed_radon_lamp_blue` | Framed Blue Radon Lamp | 蓝色边框氡灯 |
| `block.createframed.framed_radon_lamp_light_blue` | Framed Light Blue Radon Lamp | 淡蓝色边框氡灯 |
| `block.createframed.framed_radon_lamp_cyan` | Framed Cyan Radon Lamp | 青色边框氡灯 |
| `block.createframed.framed_radon_lamp_purple` | Framed Purple Radon Lamp | 紫色边框氡灯 |
| `block.createframed.framed_radon_lamp_magenta` | Framed Magenta Radon Lamp | 品红色边框氡灯 |
| `block.createframed.framed_radon_lamp_pink` | Framed Pink Radon Lamp | 粉红色边框氡灯 |
| `block.createframed.framed_radon_lamp_black` | Framed Black Radon Lamp | 黑色边框氡灯 |
| `block.createframed.framed_radon_lamp_gray` | Framed Gray Radon Lamp | 灰色边框氡灯 |
| `block.createframed.framed_radon_lamp_light_gray` | Framed Light Gray Radon Lamp | 淡灰色边框氡灯 |
| `block.createframed.framed_radon_lamp_white` | Framed White Radon Lamp | 白色边框氡灯 |
| `block.createframed.framed_radon_lamp_brown` | Framed Brown Radon Lamp | 棕色边框氡灯 |
| `text.createframed.mod_missing.alexs_caves` | Missing mod: Alex's Caves | 缺少模组：Alex的洞穴 |
| `block.createframed.industrial_iron_window` | Industrial Iron Window | 工业铁窗户 |
| `block.createframed.industrial_iron_window_pane` | Industrial Iron Window Pane | 工业铁窗玻璃板 |
| `block.createframed.emerald_window` | Emerald Window | 绿宝石窗户 |
| `block.createframed.emerald_window_pane` | Emerald Window Pane | 绿宝石窗玻璃板 |
| `block.createframed.tinted_framed_glass_trapdoor` | 透光边框玻璃活板门 | 遮光边框玻璃活板门 |

JSON、键覆盖检查通过。未全类扫描硬编码、未游戏验证透光机制或连接纹理；此处纠正名称，不改变方块行为。未打包、提交、部署。
