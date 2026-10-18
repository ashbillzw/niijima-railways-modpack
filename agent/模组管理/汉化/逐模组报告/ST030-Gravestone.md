# ST030 Gravestone

日期：2026-10-17。包内版本：`gravestone-forge-1.20.1-1.0.35.jar`。

33条英文、32条既有中文已通读。新增Jade墓碑选项1条，修正3条：死亡日期提示不再写成地点式“死在了”；无法放置提示统一方块名“墓碑”；“死亡未找到”明确为未找到死亡记录。

当前JAR GraveStoneBlock右击逻辑通过getTimestamp→GraveUtils.getDate生成第二个参数，确认它是日期。日期格式yyyy/MM/dd HH:mm:ss与ID属于有效格式／标识，不翻译。死亡笔记是既有物品名，未擅自改为讣告；幽灵玩家等原译保留。

官方[outdated/1.20.1](https://github.com/henkelmax/gravestone/blob/cddcb8ab42a790df2ae1b981960fd1d916ab4647/src/main/resources/assets/gravestone/lang/zh_cn.json)和[1.21.1](https://github.com/henkelmax/gravestone/blob/0df93df4e7cae9d4829d8eda8f1c692c61e4d8f4/src/main/resources/assets/gravestone/lang/zh_cn.json)均32条，与包内一致；没有从新版解决这些问题。

## 应用明细

| 键 | 原中文／英文 | 已应用 |
| --- | --- | --- |
| `config.jade.plugin_gravestone.grave` | Grave | 墓碑 |
| `message.gravestone.died` | %s 死在了 %s | %s 死于 %s |
| `message.gravestone.create_grave_failed` | 无法放置坟墓 | 无法放置墓碑 |
| `message.gravestone.death_not_found` | 死亡未找到 | 未找到死亡记录 |

所有修改已列出；Carry On仅配置分类／按键等12条，不为凑10个不同类型而杜撰例子。JSON、键覆盖和按参数编号比对通过。字节码证据在本机lang-audit，未游戏内验证，未复制运行实例、未打包、未提交或部署。未全类扫描硬编码。
