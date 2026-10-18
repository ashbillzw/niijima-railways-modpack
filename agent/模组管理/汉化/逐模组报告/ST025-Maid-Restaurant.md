# ST025 Maid Restaurant（女仆餐厅）

日期：2026-10-17。当前本地`maid_restaurant-0.2.9.jar`。

## 范围与结果

通读60个英文／中文键，包括完整Patchouli教程。无实际新增缺译，修正2个跨模组物品名称：教程的“烹饪锅”改“厨锅”，库存列表的森罗厨房“桌子”改“餐桌”。物品保险库与当前Create中文一致，保留，未按记忆改成别名。

## 空页不是漏译

`cook_maid.page_4`与`send_order.page_5`为空字符串，但对应英文内容已分别合并进中文page_3及page_4。当前JAR的书籍结构保留英文4／5页，中文较短，两个空键不应重复补写。空白页本身属于排版改进候选；本轮不更改书籍页面结构。

## 上游比对

- [main中文](https://github.com/MasterMarisa/MaidRestaurant/blob/ea2c949f50b0cef6e77bdd1424f0864a0af425ed/src/main/resources/assets/maid_restaurant/lang/zh_cn.json)60键，与包内一致。
- [forge-1.20.1中文](https://github.com/MasterMarisa/MaidRestaurant/blob/000e5329bd1c56551afe40a84c1b5094cdfc4d50/src/main/resources/assets/maid_restaurant/lang/zh_cn.json)仅28键，侍者说明仍为“功能开发中，暂不可用”；不能仅因分支名字匹配就覆盖当前本地译文。
- 本轮依据本地实际JAR而不是站点文件名推测功能；不升级、降级或调整索引。未穷尽翻译PR。

## 修改证据与候选

- `cooktasks/cooking_pot.json`的图标与多方块映射明确引用`farmersdelight:cooking_pot`，包内显示名为厨锅，因此统一教程名。
- 森罗厨房各木种Table显示为餐桌，库存支持列表同步称餐桌。
- 汤锅无限水条件文案是“超过2个水桶”，实际`>2`还是`>=2`需要代码确认，未按常识改数字。
- 委托数量7／4、半径50格、4层蒸笼、厨娘凳高度等机制说明未逐项运行验证，保留当前中英共同内容。
- 女仆库存是本模组定义的容器统称，不能等同于Maid Storage模组名，也不改成女仆自身背包。

Patchouli格式标记保持不变，JSON解析通过。没有10条新增译文；两项修正已完整列出。未全类扫描硬编码、游戏验收、提交或部署。
