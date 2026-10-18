# ST047 Create: Copycats+

2026-10-17。包内2.2.2+mc.1.20.1-forge，67键全有中文，已通读文本。新增0、修正2。

## 上游对照

官方仓库copycats-plus/copycats的三个分支中文均67键，均与当前包一致：

- [1.20.1/multiloader](https://github.com/copycats-plus/copycats/blob/68028333fce6a8c40eed60a4541298a08133ad6d/common/src/main/resources/assets/copycats/lang/zh_cn.json)
- [multiloader](https://github.com/copycats-plus/copycats/blob/60923e001d931ccbc2c6b21b0e911a248375186f/common/src/main/resources/assets/copycats/lang/zh_cn.json)
- [l10n_multiloader](https://github.com/copycats-plus/copycats/blob/b466853f3c7075ae979de8df0be798a4eee4360b/common/src/main/resources/assets/copycats/lang/zh_cn.json)

未穷尽PR。没有缺键不代表功能说明没有歧义。

## 全部变动

| 键 | 原中文 | 本轮中文 |
| --- | --- | --- |
| `item.copycats.copycat_catwalk` | 伪装狭道 | 伪装检修走道 |
| `tooltip.copycats.characteristics.functional.description` | 与其对应伪装的方块_作用相同_。 | 与对应的非伪装方块_用法相同_。 |

Catwalk对齐Design n Decor/Create Deco已经采用的检修走道。功能说明明确对应非伪装版本，避免误解为继承贴上去的材质方块功能。保留强调下划线、%s填充按键、右击猫的趣味说明和各种形状既有译名。“伪装基类”疑似内部方块，未确认实际入口，不擅自改名。

两处静态检查通过，未游戏验证形状与显示宽度，未全类硬编码扫描，未打包、提交或部署。只改两条，不凑10个例子。
