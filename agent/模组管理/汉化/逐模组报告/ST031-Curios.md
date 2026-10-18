# ST031 Curios

日期：2026-10-17。包内版本：`curios-forge-5.14.1+1.20.1.jar`。

48条英文、43条既有中文已通读。补5条、修5条。旧add/remove译文把英文%d、%s参数顺序反转；当前CuriosCommand字节码确认参数为数量、类型、玩家。新译使用显式参数编号保证中文语序正确，set同样明确类型、数量、玩家。head指头部栏位，原“首饰”范围过宽，改头饰并同步属性标题。

CosmeticButton绑定CuriosContainerV2.isViewingCosmetics，是切换查看装饰品栏，不是隐藏全部饰品模型。其他装备类型沿用项链、戒指、胸饰、手饰等旧名，未统一改成身体部位；这轮纠正head的指向，不推广为新命名偏好。

官方[1.20.x](https://github.com/TheIllusiveC4/Curios/blob/a91da6ba2396f6ed9042c8a47a471ca5efc97da8/src/main/resources/assets/curios/lang/zh_cn.json)43条与包内一致；[1.21.1](https://github.com/TheIllusiveC4/Curios/blob/6b122c8a7e2b514fd94197459ade11f19a0bfb09/common/src/main/resources/assets/curios/lang/zh_cn.json)41条，仅有4个新结构的属性键，不直接搬入旧版。未穷尽未合并PR。

## 应用明细

| 键 | 原中文／英文 | 已应用 |
| --- | --- | --- |
| `commands.curios.drop.success` | Dropped items in slot %s for %s | 已丢出 %2$s 的 %1$s 栏位中的物品 |
| `commands.curios.dropAll.success` | Dropped items in all slots for %s | 已丢出 %s 的所有栏位中的物品 |
| `commands.curios.replace.success` | Replaced slot %s for %s with %s | 已将 %2$s 的 %1$s 栏位中的物品替换为 %3$s |
| `gui.curios.toggle.cosmetics` | Toggle Cosmetics | 切换装饰品栏 |
| `gui.curios.page` | Page %d / %d | 第 %d / %d 页 |
| `commands.curios.set.success` | 类型%s的%d栏位已设置为到%s中 | 已为 %3$s 将 %1$s 类型的栏位数量设为 %2$d |
| `commands.curios.add.success` | 类型%s的%d栏位已添加到%s中 | 已为 %3$s 添加 %1$d 个 %2$s 类型的栏位 |
| `commands.curios.remove.success` | 类型%s的%d栏位已从%s中移除 | 已为 %3$s 移除 %1$d 个 %2$s 类型的栏位 |
| `curios.identifier.head` | 首饰 | 头饰 |
| `curios.modifiers.head` | 佩戴首饰时： | 佩戴头饰时： |

所有修改已列出；Carry On仅配置分类／按键等12条，不为凑10个不同类型而杜撰例子。JSON、键覆盖和按参数编号比对通过。字节码证据在本机lang-audit，未游戏内验证，未复制运行实例、未打包、未提交或部署。未全类扫描硬编码。
