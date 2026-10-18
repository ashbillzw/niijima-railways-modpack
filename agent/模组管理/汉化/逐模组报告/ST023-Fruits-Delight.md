# ST023 Fruits Delight（果园乐事）

日期：2026-10-17。包内`fruitsdelight-1.1.3.jar`。

## 范围与结果

通读394个英文键及397个中文键，中文无缺译；修正7处错字、效果名及遗漏的饮用说明。多出的3个属性名称键原样保留。本轮未新增译文，以下列出全部修正，不凑10个类似名称。

| 键 | 原中文 | 已应用 |
| --- | --- | --- |
| `effect.fruitsdelight.brightening.description` | 免疫致盲和失明 | 免疫失明和黑暗 |
| `effect.fruitsdelight.appetizing.description` | 饱食度满时仍然可以吃东西 | 饱食度满时仍然可以吃东西和饮用饮品 |
| `effect.fruitsdelight.lozenge.description` | 吃东西更快 | 吃东西和饮用饮品更快 |
| `effect.fruitsdelight.heal_aura.description` | 对周围的生物施加瞬间恢复 | 对周围的生物施加瞬间治疗 |
| `effect.fruitsdelight.sweetening.description` | 免疫减速 | 免疫缓慢 |
| `fruitsdelight.tooltip.allow_jelly` | 获得做为原料的果酱的效果 | 获得作为原料的果酱的效果 |
| `item.fruitsdelight.pineapple_marinated_pork` | 菠萝咕唠肉 | 菠萝咕噜肉 |

## 上游与判断依据

- [官方1.20中文](https://github.com/Minecraft-LightLand/FruitsDelight/blob/fc274ff5932330dfcc71dc787217207d87ef9f33/src/main/resources/assets/fruitsdelight/lang/zh_cn.json)394键，与当前对应中文全部一致。
- [官方1.21中文](https://github.com/Minecraft-LightLand/FruitsDelight/blob/f9ec48a2e05399495e8b7a34fe35bd1861b2446b/src/main/resources/assets/fruitsdelight/lang/zh_cn.json)418键，与当前共有302键，全部一致。未直接覆盖不同版本的键集合，未穷尽所有中文PR。
- brightening原英文明确是blindness与darkness，不能把两个效果都描述成失明；heal_aura和sweetening统一原版状态效果名“瞬间治疗”“缓慢”。
- Appetizing与Lozenge原英文均写eat and drink，补回原中文遗漏的饮用用途。
- “做为”改“作为”，“菠萝咕唠肉”改“菠萝咕噜肉”。

## 保留和潜在问题

- **黄柠檬／黄柠檬片为模组原译**，保留；用户此前仅询问来源，没有授权将所有柠檬名称统一加黄或去黄。
- 橘子、白桃乌龙茶、山竹糕、芒果鲜奶等保留作者中文，不按Orange／Peach Tea／Cake／Milkshake字面逐一重译。
- 甜浆果在本模组中常简称“浆果”，与通用水果类别可能混淆，列为术语候选，未批量改动。
- 冰棒／棒冰，饼干／曲奇有风格差别；当前没有造成对象误认，本轮不擅自统一。
- 果冻块提示英文还提到黏性方块，中文只写相同果冻／果酱块；应核实活塞黏连逻辑后再补，不能仅凭英文决定。
- 哈密瓜冰沙是否更应叫刨冰、柠檬蛋挞是否确有蛋挞配方，需配方／贴图语境，不把食品文化命名差异直接归为错误。

验证：JSON解析及7个修改键存在检查通过，均无占位符。尚未全类扫描硬编码或做游戏内效果验证；未提交、部署。本机上游比对文件位于独立工作区`lang-audit/st023-*`。
