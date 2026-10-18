# ST042 Atmospheric

2026-10-17。608键（583已有中文），全表文本初筛；新增23，修正4条原值仍为英文的画作标题。缺口25中两条作者署名five保留原名，不制造“中文人名”。

## 上游证据

JAR元数据指向官方team-abnormals/atmospheric。[1.20.x](https://github.com/team-abnormals/atmospheric/blob/43a01f1bc1a9cbc4bdf6e70b5c4d12ae35603b61/src/main/resources/assets/atmospheric/lang/zh_cn.json)与[1.21.x](https://github.com/team-abnormals/atmospheric/blob/d5ae802b4a3dafe2bcd201f686cde7f57f05682b/src/main/resources/assets/atmospheric/lang/zh_cn.json)均583条，与当前中文相同。未穷尽PR。

[官方内容说明](https://www.teamabnormals.com/blog/new-content-updates)确认Tetra为可装桶的雨林鱼类，Arid Glass由干燥沙子烧成。玻璃沿用干燥沙子/砂岩的系列名；灯鱼变种采用简洁标签，不把标签冒充生物分类学名称，具体配色待游戏核对。字幕沿用“胭脂虫：死亡”等现有格式。

## 已有译文筛查

木材、石材系列与药水、死亡消息已通读；编号占位符保持不变。四条未译画名补中文，Not So Still Life保留“不静的静物”双关。作者署名和药水等级X保持不变。鲁多维科科技等典故标题及粗玄岩/藏红石灰华的专业名称暂保留，缺乏本版纹理或典故证据不扩大改名。

## 十条代表性译文

| 英文 | 中文 |
| --- | --- |
| Arid Glass | 干燥玻璃 |
| Tetra | 灯鱼 |
| Bucket of Tetra | 灯鱼桶 |
| Canyon | 峡谷 |
| Currant pops | 醋栗：被摘下 |
| Cochineal grabs | 胭脂虫：抓握 |
| Neon | 霓虹 |
| Carmine Material | 胭脂材料 |
| Not So Still Life | 不太静的静物 |
| Fateful Outing | 命运之行 |

## 全部变动

| 键 | 原文 | 本轮中文 |
| --- | --- | --- |
| `block.atmospheric.arid_glass` | Arid Glass | 干燥玻璃 |
| `block.atmospheric.arid_glass_pane` | Arid Glass Pane | 干燥玻璃板 |
| `entity.atmospheric.tetra` | Tetra | 灯鱼 |
| `item.atmospheric.tetra_bucket` | Bucket of Tetra | 灯鱼桶 |
| `item.atmospheric.tetra_spawn_egg` | Tetra Spawn Egg | 灯鱼刷怪蛋 |
| `painting.atmospheric.canyon.title` | Canyon | 峡谷 |
| `painting.atmospheric.lost.title` | Lost | 迷失 |
| `subtitles.atmospheric.block.hanging_currant.pick_currant` | Currant pops | 醋栗：被摘下 |
| `subtitles.atmospheric.entity.cochineal.bounce` | Cochineal bounces | 胭脂虫：弹跳 |
| `subtitles.atmospheric.entity.cochineal.grab` | Cochineal grabs | 胭脂虫：抓握 |
| `subtitles.atmospheric.entity.tetra.death` | Tetra dies | 灯鱼：死亡 |
| `subtitles.atmospheric.entity.tetra.flop` | Tetra flops | 灯鱼：扑腾 |
| `subtitles.atmospheric.entity.tetra.hurt` | Tetra hurts | 灯鱼：受伤 |
| `trim_material.atmospheric.carmine` | Carmine Material | 胭脂材料 |
| `tetra_variant.atmospheric.beacon` | Beacon | 灯标 |
| `tetra_variant.atmospheric.cardinal` | Cardinal | 红莲 |
| `tetra_variant.atmospheric.diamond` | Diamond | 钻石 |
| `tetra_variant.atmospheric.emperor` | Emperor | 帝王 |
| `tetra_variant.atmospheric.flame` | Flame | 火焰 |
| `tetra_variant.atmospheric.jewel` | Jewel | 宝石 |
| `tetra_variant.atmospheric.neon` | Neon | 霓虹 |
| `tetra_variant.atmospheric.ornate` | Ornate | 华丽 |
| `tetra_variant.atmospheric.royal` | Royal | 皇家 |
| `painting.atmospheric.fateful_outing.title` | Fateful Outing | 命运之行 |
| `painting.atmospheric.monsoon.title` | Monsoon | 季风 |
| `painting.atmospheric.not_so_still_life.title` | Not So Still Life | 不太静的静物 |
| `painting.atmospheric.wayward.title` | Wayward | 迷途 |

JSON、占位符和键覆盖静态检查通过；2条缺键是原名署名例外。未进行全类硬编码扫描、游戏验证、打包、提交或部署。
