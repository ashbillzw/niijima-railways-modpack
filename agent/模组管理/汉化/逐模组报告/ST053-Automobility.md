# ST053 Automobility

2026-10-18；当前JAR：`automobility-0.4.2+1.20.1-forge.jar`。新增14、修正1。

## 审校结果

170英文对应条目与1个中文额外键已通读。官方FoundationGames/Automobility的1.20（b74616dbd2b3324fd6a1460aee95c3834438894c）及1.21-rewrite（e43f78b12786fd0c490b4fa2356a324b57290994）的common/src/main/resources/assets/automobility/lang/zh_cn.json均157键，与包内译文一致；缺口自行补齐。保留作者“先人佳作”“木几 云力 车”和DaBaby等表达。

用户选择幻想车型先看外形再起名。提取当前rickshaw模型看到窄车头、后排座位与遮篷，采用“篷车”；四种材质同时用于成车和车身名。此前仅依据WheelPos数组长度说“四轮”不严谨：前轮左右位置为±0.1，几乎重合，已撤回“不能是三轮”的判断。命名不再依赖轮数。几何预览在本机lang-audit/st053-rickshaw-geometry.png，近似颜色、不含轮胎／引擎，不是游戏截图。回响款配方使用echo_shard，沿用原版“回响”。

Backhoe／Paver／SaddledBarrel类已提取检查，带鞍木桶继承储物附件并支持乘坐。handling作为车辆属性写“操作”不明确，改“操控性”。Frame的现译“外壳”、allow的“允许”、可换轮名称“敞篷”仍待上下文复核，未为风格统一整批替换。

## 本轮明细

| 键 | 原值 | 已应用 |
| --- | --- | --- |
| `tooltip.block.automobility.dash_panel` | （缺失） | 可放置在斜坡上 |
| `container.automobility.banner_post` | （缺失） | 旗帜 |
| `attachment.rear.automobility.saddled_barrel` | （缺失） | 带鞍木桶 |
| `attachment.rear.automobility.banner_post` | （缺失） | 旗杆 |
| `attachment.rear.automobility.backhoe` | （缺失） | 反铲 |
| `attachment.rear.automobility.paver` | （缺失） | 铺路器 |
| `stat.automobility.automobile.handling` | 操作 | 操控性 |
| `prefab.automobility.amethyst_rickshaw` | （缺失） | 紫水晶篷车 |
| `prefab.automobility.quartz_rickshaw` | （缺失） | 石英篷车 |
| `prefab.automobility.prismarine_rickshaw` | （缺失） | 海晶石篷车 |
| `prefab.automobility.echo_rickshaw` | （缺失） | 回响篷车 |
| `frame.automobility.amethyst_rickshaw` | （缺失） | 紫水晶篷车 |
| `frame.automobility.quartz_rickshaw` | （缺失） | 石英篷车 |
| `frame.automobility.prismarine_rickshaw` | （缺失） | 海晶石篷车 |
| `frame.automobility.echo_rickshaw` | （缺失） | 回响篷车 |

改动JSON、键存在性及占位符检查通过（无改动项目只作资源审查）。少量或同系列内容直接列全表，不凑10个重复例子。未全类硬编码扫描、未游戏验证、打包或部署。
