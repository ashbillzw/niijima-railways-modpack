# ST043 VanillaBackport

2026-10-17。版本1.1.7.10。237键，144条模组自带中文；通读237条英文及最终可用中文，补译4、修正1。仅5条变动，全部列出，不凑10条同类例子。

## 覆盖关系及上游

缺口不能只按JAR计算：本机MC1.20.1资源索引5中的中文资源对象`daf8df119618b33ad7476a6be4ac2eadc802fd93`已包含新增原版内容的中文，原93缺键中89键由其提供。本报告适用于该已核验语言资源；使用旧缓存的其他机器需重新核查，不能保证旧语言对象同样覆盖。原版资源不是本轮新增译文。

[上游1.20.1](https://github.com/ItsBlackGear/VanillaBackport/blob/c69c9f674ba91d3181b8ccdc90ae8dab9133ca39/common/src/main/resources/assets/vanillabackport/lang/zh_cn.json)及[1.21.1](https://github.com/ItsBlackGear/VanillaBackport/blob/e789b3f1def7a68600ff8e770a14fc822613c03e/common/src/main/resources/assets/vanillabackport/lang/zh_cn.json)均144键，与当前中文相同，不能补缺。未穷尽PR。

沿用原版“硫方怪”，不另造硫磺方块怪等名称。苍白苔藓块误用了苍白垂须的名称，按原版中文修正；其他字幕措辞微差保持原状。唱片作者与曲名、画作署名和Dennis保留原名。

Armored Paws及Chaos Cubed为内容分页名，本轮使用简洁意译“披甲伙伴／混乱立方”，不声称是官方中文更新名。[官方中文页面](https://www.minecraft.net/zh-hans/updates/chaos-cubed-drop)仍用Chaos Cubed。

## 全部变动

| 键 | 原中文或英文 | 本轮中文 |
| --- | --- | --- |
| `fieldguide.name.minecraft.pale_oak_sapling` | Pale Oak Tree | 苍白橡树 |
| `bundled_tab.armored_paws.title` | Armored Paws | 披甲伙伴 |
| `bundled_tab.chaos_cubed.title` | Chaos Cubed | 混乱立方 |
| `entity.minecraft.sulfur_cube.explosion_disabled` | Sulfur Cube explosions are disabled | 硫方怪爆炸已禁用 |
| `block.minecraft.pale_moss_block` | 苍白垂须 | 苍白苔藓块 |

JSON、键归属及最终键覆盖静态检查通过。翻译键所属namespace与资源文件所在namespace可以不同，沿用本模组语言文件位置。未游戏验证资源优先级、分页宽度或硫方怪机制；未全类扫描硬编码、打包、部署、提交。
