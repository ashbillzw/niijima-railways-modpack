# ST008-Bells-and-Whistles

日期：2026-10-17。包内文件：`bellsandwhistles-0.4.3-1.20.x.jar`。

英文38键，包内原中文0键；本轮新增36键。全部英文语言条目通读并比对上游中文，未进行全类硬编码扫描，未游戏验证。

## 上游与适配

[采用的官方中文来源](https://github.com/aesefficio/BellsAndWhistlesMod/blob/e06fb2fc896d9a0a0d4d8a21bd43a76fd117eaa9/src/main/resources/assets/bellsandwhistles/lang/zh_cn.json)。取得文件后对照本包英文；GitHub API遭公共限流后改用git ls-remote核对分支提交与raw文件。分支快照已取得，中文PR合并状态尚未完成核实，不宣称没有其他译文。

采用上游物品译名为基础；Metro译地铁，未将地铁与轻轨混同。Steps／Door Step按部件用途译踏板／车门踏板，不用扶手台阶／站台板；Metal不擅自限定为铁。波纹用于描述板材表面。已有系列材料简称沿用安山、皓蓝等；品牌标题两键保留原名，不杜撰中文品牌。

## 十条代表性译文

| 英文 | 已应用中文 |
| --- | --- |
| Andesite Grab Bars | 安山扶手杆 |
| Brass Steps | 黄铜踏板 |
| Copper Door Step | 铜车门踏板 |
| Headlight | 列车前照灯 |
| Ornate Iron Trapdoor | 华丽铁活板门 |
| Station Platform | 车站站台 |
| Metro Casing | 地铁机壳 |
| Corrugated Metro Panel | 波纹地铁板 |
| Metro Window | 地铁窗户 |
| Metal Pilot | 金属排障器 |

## 全部补译

| 键 | 英文 | 中文 |
| --- | --- | --- |
| `block.bellsandwhistles.andesite_grab_rails` | Andesite Grab Bars | 安山扶手杆 |
| `block.bellsandwhistles.brass_grab_rails` | Brass Grab Bars | 黄铜扶手杆 |
| `block.bellsandwhistles.copper_grab_rails` | Copper Grab Bars | 铜扶手杆 |
| `block.bellsandwhistles.andesite_bogie_steps` | Andesite Steps | 安山踏板 |
| `block.bellsandwhistles.brass_bogie_steps` | Brass Steps | 黄铜踏板 |
| `block.bellsandwhistles.copper_bogie_steps` | Copper Steps | 铜踏板 |
| `block.bellsandwhistles.andesite_door_step` | Andesite Door Step | 安山车门踏板 |
| `block.bellsandwhistles.brass_door_step` | Brass Door Step | 黄铜车门踏板 |
| `block.bellsandwhistles.copper_door_step` | Copper Door Step | 铜车门踏板 |
| `block.bellsandwhistles.headlight` | Headlight | 列车前照灯 |
| `block.bellsandwhistles.ornate_iron_trapdoor` | Ornate Iron Trapdoor | 华丽铁活板门 |
| `block.bellsandwhistles.station_platform` | Station Platform | 车站站台 |
| `block.bellsandwhistles.metro_casing` | Metro Casing | 地铁机壳 |
| `block.bellsandwhistles.corrugated_metro_casing` | Corrugated Metro Casing | 波纹地铁机壳 |
| `block.bellsandwhistles.metro_panel` | Metro Panel | 地铁板 |
| `block.bellsandwhistles.corrugated_metro_panel` | Corrugated Metro Panel | 波纹地铁板 |
| `block.bellsandwhistles.metro_window` | Metro Window | 地铁窗户 |
| `block.bellsandwhistles.metro_trapdoor` | Metro Trapdoor | 地铁活板门 |
| `block.bellsandwhistles.metal_pilot` | Metal Pilot | 金属排障器 |
| `block.bellsandwhistles.andesite_pilot` | Andesite Pilot | 安山排障器 |
| `block.bellsandwhistles.brass_pilot` | Brass Pilot | 黄铜排障器 |
| `block.bellsandwhistles.copper_pilot` | Copper Pilot | 铜排障器 |
| `block.bellsandwhistles.polished_andesite_pilot` | Polished Andesite Pilot | 磨制安山排障器 |
| `block.bellsandwhistles.polished_asurine_pilot` | Polished Asurine Pilot | 磨制皓蓝排障器 |
| `block.bellsandwhistles.polished_calcite_pilot` | Polished Calcite Pilot | 磨制方解石排障器 |
| `block.bellsandwhistles.polished_crimsite_pilot` | Polished Crimsite Pilot | 磨制绯红排障器 |
| `block.bellsandwhistles.polished_deepslate_pilot` | Polished Deepslate Pilot | 磨制深板岩排障器 |
| `block.bellsandwhistles.polished_diorite_pilot` | Polished Diorite Pilot | 磨制闪长岩排障器 |
| `block.bellsandwhistles.polished_dripstone_pilot` | Polished Dripstone Pilot | 磨制滴水石排障器 |
| `block.bellsandwhistles.polished_granite_pilot` | Polished Granite Pilot | 磨制花岗岩排障器 |
| `block.bellsandwhistles.polished_limestone_pilot` | Polished Limestone Pilot | 磨制石灰岩排障器 |
| `block.bellsandwhistles.polished_ochrum_pilot` | Polished Ochrum Pilot | 磨制赭金排障器 |
| `block.bellsandwhistles.polished_scorchia_pilot` | Polished Scorchia Pilot | 磨制黑渣排障器 |
| `block.bellsandwhistles.polished_scoria_pilot` | Polished Scoria Pilot | 磨制熔渣排障器 |
| `block.bellsandwhistles.polished_tuff_pilot` | Polished Tuff Pilot | 磨制凝灰岩排障器 |
| `block.bellsandwhistles.polished_veridium_pilot` | Polished Veridium Pilot | 磨制辉绿排障器 |

验证：JSON解析、键限定在本包英文、格式占位符与成对强调标记检查通过。未升级模组，未构建／部署；游戏中菜单换行、物品提示及实际交互仍待验证。
