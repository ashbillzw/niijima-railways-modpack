# ST096 Moonlight 阶段报告

日期：2026-10-18。

当前语言资源9条英文／1686条中文，多数为跨模组木材／树叶兼容名称。官方MehVahdJukaar/Moonlight的1.20分支75aabe3ffb41825678f0fa3aac59240f112e1658，common/src/main/resources/assets/moonlight/lang/zh_cn.json仍为1686条。

本轮检查了本体和包内已知namespace涉及的95条中文，不删除未安装模组的1591条兼容／预留中文。没有应用修改，未计入初筛完成数量。余下条目未逐条审查。

候选：leaves_type.atmospheric.rosewood“花梨木”、grimwood“阴郁木”、leaves_type.natures_spirit.mahogany“桃花心木”可能与树叶类型去掉“木”的命名方式不一致，需先核对实际名称拼接；牧豆／假紫荆等须与已确认ST041词条核对。leaves_type.ulterlands.souldrained=Petrified缺中文，但需要核对是否已有包内覆盖及实际兼容触发，暂不凭键名猜。未改资源、未游戏验证。

## 2026-10-18 全量名称初筛补充

现已通读1686条中文，替代上文“余下1591条未读”的进度。检查范围是中文合理性、同族名称及现有包内对应名；没有逐个下载所有外部兼容模组核实幻想植物设定。新增0／明确纠错1，初筛完成，兼容触发与最终拼接尚未游戏验证。

| 键 | 原文 | 修正 | 证据 |
|---|---|---|---|
| `leaves_type.productivetrees.silver_fir` | 银冷松 | 银冷杉 | 同文件对应wood_type为“银冷杉木”，同族fir均作冷杉；树叶独有“松”为明显不一致 |

保留并记录的候选：

- Atmospheric 的花梨木／阴郁木树叶类型与当前本体“花梨木树叶／阴郁木树叶”完全一致，撤回仅按后缀怀疑其错误的建议。
- Nature’s Spirit 的牧豆、假紫荆与本体一致；桃花心木类型与本体“桃花心树叶”有词形差异，尚未确认最终调用方拼接，不按“所有木字均删除”处理。
- `biomesoplenty.null` 的替换字符可能是作者刻意乱码效果；未安装对应模组，不能擅自修成普通植物名称。
- `productivetrees.tuscarora_crepe_myrtle` 木材／树叶均作“塔斯卡洛拉蔷薇”，与其他crepe_myrtle的“紫薇”不同；未核对原模组设定，列候选，不应用。
- `forestry.tree_mahogany_default`“黄桉”与木材名“桃花心木”不同，但Forestry树种与木材类别不能只按ID猜测一一对应，保留待源模组核对。
- 缺失的 `leaves_type.ulterlands.souldrained` 英文为Petrified，与ID含义不一致；包内覆盖中无该键，当前未安装Ulterlands，保留为兼容缺译待核，不从souldrained直译。

当前JAR LeavesType.getTranslationKey生成类型键，调用方负责最终命名；因此类型片段不等同最终物品名。完整通读记录在工作目录lang-audit/st096-chinese-all.txt，当前上游1686条已比对，未以新版词条覆盖本包确认译文。保留全部未安装模组的预留翻译，不删除。
