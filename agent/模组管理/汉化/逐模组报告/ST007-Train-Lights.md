# ST007-Train-Lights

日期：2026-10-17。包内文件：`ctl-forge-1.0.0.jar`。

通读15个英文键，14键补译，品牌标题保留原名。Head-Tail保留双用途为头尾灯，不缩成只有前照灯；Panel、Halfpanel、Vertical、Quarter逐项保留形制差异；半成品采用既有“名称（半成品）”格式。

## 上游与边界

[官方仓库](https://github.com/ProgrammerLP/Create-Train-Lights)，通过git ls-remote核对1.20.1C6提交fc6d96e12e8b8b4d3686342b36004a2469954128和1.21.1提交e23656c1932e54ac3b353d0e1e94809a0a4095fd。尝试common/src/main/resources/assets/ctl/lang/zh_cn.json返回404；公共API此前限流，未穷举其他路径及PR，不把访问范围不足写为无上游中文。

## 十条代表性译文

| 英文 | 中文 |
| --- | --- |
| Grid Interior Light | 网格车内灯 |
| Sloped Interior Light | 斜面车内灯 |
| Interior Light Panel | 车内灯面板 |
| Interior Light Halfpanel | 半幅车内灯面板 |
| Vertical Interior Light Halfpanel | 竖向半幅车内灯面板 |
| Quarter Interior Light | 四分之一车内灯 |
| Head- Tail Light Panel | 头尾灯面板 |
| Interior Light Block | 车内灯方块 |
| Incomplete Head- Tail Light | 头尾灯（半成品） |
| Incomplete Interior Light | 车内灯（半成品） |

本模组只有灯具和半成品名称，代表例按形制及用途区分；没有虚构配置／操作提示凑数。

## 全部补译

| 键 | 中文 |
| --- | --- |
| `block.ctl.grid_ilb` | 网格车内灯 |
| `block.ctl.sloped_ilb` | 斜面车内灯 |
| `block.ctl.panel_ilb` | 车内灯面板 |
| `block.ctl.halfpanel_ilb` | 半幅车内灯面板 |
| `block.ctl.vertical_halfpanel_ilb` | 竖向半幅车内灯面板 |
| `block.ctl.quarter_ilb` | 四分之一车内灯 |
| `block.ctl.panel_htlb` | 头尾灯面板 |
| `block.ctl.halfpanel_htlb` | 半幅头尾灯面板 |
| `block.ctl.vertical_halfpanel_htlb` | 竖向半幅头尾灯面板 |
| `block.ctl.quarter_htlb` | 四分之一头尾灯 |
| `block.ctl.ilb_block` | 车内灯方块 |
| `block.ctl.htlb_block` | 头尾灯方块 |
| `item.ctl.ic_htlb_block` | 头尾灯（半成品） |
| `item.ctl.ic_ilb_block` | 车内灯（半成品） |

验证：JSON解析、键集合、占位符通过。未游戏验证；未完成全类硬编码扫描。未升级模组、未构建或部署。后续上游复查与界面验证仍列为待办。
