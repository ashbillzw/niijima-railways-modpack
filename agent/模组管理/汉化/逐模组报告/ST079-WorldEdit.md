# ST079 WorldEdit 筛查报告

日期：2026-10-18。当前包worldedit-mod-7.2.15.jar。

## 范围与应用

标准assets扫描为0键，但独立lang/strings.json有417条英文，内嵌lang/i18n.zip的zh-CN/strings.json有413条中文。本轮逐条对照这417条；新增4、纠错28。仍可能存在命令注解等硬编码英文，未宣称所有输出已汉化。

外部覆盖：pack/overrides/config/worldedit/lang/zh-CN/strings.json，仅放32个变化键。javap核对ForgeWorldEdit的工作目录为config/worldedit；ForgeResourceLoader继承WorldEditResourceLoader.getLocalResource；TranslationManager先加载内嵌语言、再外部ZIP、最后外部平铺语言文件。这是WorldEdit独立配置路径，zh-CN大小写是其语言标记，不适用KubeJS assets的小写路径规则。未修改JAR、worldedit.properties或语言默认值。

远程服务器执行命令时，通常由服务器WorldEdit负责译文；仅发客户端整合包不代表服务器已采用这些覆盖。本轮未改server目录、未部署。

## 上游复查

官方EngineHub/WorldEdit master 6e148b7ce0a47c83b9a250e1ee549632bf825c30，version/7.2.x b490447f9343f8374bd4271ac70eb7b88e175754。官方仓库仅维护英文源，中文由Crowdin语言包分发。master的gradle/libs.versions.toml指定7.4.4／2233；尝试读取[官方语言包](https://repo.enginehub.org/language-files/com/sk89q/worldedit/worldedit-lang/7.4.4/worldedit-lang-7.4.4-2233.zip)收到HTTP403，未重试，也未将未取得的新版当作参考证据。若用户另行获取，可放本机lang-audit/worldedit-lang-7.4.4-2233.zip继续对照。

## 遗留候选

- 圆柱调整限制中的“水平坐标(y)”明显可疑，但“even”具体是对称调整还是偶数增量需进一步核对区域代码；本轮保留并记录，不凭猜测修正。椭球体“保持比例”同样待查。
- schematic、Extent、session的中文风格尚未统一；保留原译，避免将领域概念混为普通选区。
- 仅统计独立系统的417条；命令说明等其他硬编码文本未穷尽。

## 修改明细

| 键 | 原值／英文 | 中文 |
|---|---|---|
| `worldedit.biomeinfo.not-locatable` | Command sender must be present in the world to use the -p flag. | 使用-p参数的命令发送者必须位于世界中。 |
| `worldedit.setbiome.not-locatable` | Command sender must be present in the world to use the -p flag. | 使用-p参数的命令发送者必须位于世界中。 |
| `worldedit.raytrace.require-player` | Raytracing commands require a player! | 射线检测命令必须由玩家执行！ |
| `worldedit.bukkit.no-edit-without-adapter` | Editing on unsupported versions is disabled. | 不受支持的版本已禁用编辑功能。 |
| `worldedit.biomeinfo.lineofsight` | 视野指向处的生态群系: {0} | 视线指向处的生物群系：{0} |
| `worldedit.brush.cylinder.equip` | 已装载柱型笔刷（{0}，被 {1}）。 | 已装备圆柱形笔刷（{0} × {1}）。 |
| `worldedit.brush.heightmap.equip` | 已装备高地笔刷 ({0})。 | 已装备高度图笔刷（{0}）。 |
| `worldedit.brush.heightmap.unknown` | 未知的高地笔刷: {0}。 | 未知的高度图笔刷：{0}。 |
| `worldedit.drawsel.enabled` | 服务器CUI已经被启用，这仅可以支持最大为{0}x{1}x{2}的立方体区域 | 已启用服务器CUI。它仅支持长方体选区，最大尺寸为{0}×{1}×{2}。 |
| `worldedit.toggleplace.player` | 现在，请摆在您站着的方块。 | 现在以你站立的方块位置作为放置位置。 |
| `worldedit.distr.no-previous` | 无既有分配。 | 没有之前的方块分布统计。 |
| `worldedit.chunkinfo.mcregion-filename` | McRegion: 区域/{0} | McRegion：region/{0} |
| `worldedit.line.invalid-type` | //line 只适用于长方体或凸多边形的选区 | //line仅适用于长方体或凸多面体选区 |
| `worldedit.curve.invalid-type` | //curve 仅适用于凸多边形选区 | //curve仅适用于凸多面体选区 |
| `worldedit.tool.superpickaxe.disabled` | 已停用超级斧头。 | 已停用超级镐。 |
| `worldedit.error.disabled` | 此功能已禁用(见WorldEdition 配置)。 | 此功能已禁用（见WorldEdit配置）。 |
| `worldedit.error.parser.negate-nothing` | 不能不否定任何东西！ | 取反操作缺少对象！ |
| `worldedit.error.world-unloaded` | 世界已经停止加载过了！ | 世界已卸载！ |
| `worldedit.selection.intersection.error.cannot-expand` | 无法扩展区域交叉点。 | 无法扩展选区的交集。 |
| `worldedit.selection.intersection.error.cannot-contract` | 无法收缩区域交叉点。 | 无法收缩选区的交集。 |
| `worldedit.sideeffect.neighbors.description` | 告知附近的已变更方块 | 将变更通知给相邻方块 |
| `worldedit.sideeffect.validation.description` | 验证并修复非连续的世界状态 (例如断断续续的方块) | 检查并修复不一致的世界状态，例如本应相连却断开的方块 |
| `worldedit.sideeffect.events.description` | 若可能的话， 请将此更改告知其他的模组/插件 | 在适用时将这些变更通知给其他模组或插件 |
| `worldedit.sideeffect.state.delayed` | 遭遇了延迟 | 延后执行 |
| `worldedit.tool.selwand.equip` | 选取魔法棒工具已系结至 {0}。 | 选择法杖已绑定至{0}。 |
| `worldedit.paste.pasted` | 成功将剪贴簿的内容粘贴至坐标{0} | 已将剪贴板的内容粘贴至{0} |
| `worldedit.version.bukkit.unsupported-adapter` | 当前WorldEdit版本不能完全支持您的Bukkit版本。实体方块(例如箱子)中将不会有物品，方块属性(例如朝向)将会遗失，以及很多其他特性可能均已经失效。请更新WorldEdit以恢复这些功能：<br>{0} | 当前WorldEdit版本不能完全支持您的Bukkit版本。方块实体(例如箱子)中将不会有物品，方块属性(例如朝向)将会遗失，以及很多其他特性可能均已经失效。请更新WorldEdit以恢复这些功能：<br>{0} |
| `worldedit.watchdog.no-hook` | 当前选择的平台不存在watchdog hook。 | 此平台没有看门狗挂钩。 |
| `worldedit.watchdog.active.already` | Watchdog hook已经激活了！ | 看门狗挂钩已处于启用状态。 |
| `worldedit.watchdog.inactive.already` | Watchdog hook已经停用了！ | 看门狗挂钩已处于停用状态。 |
| `worldedit.watchdog.active` | Watchdog hook已激活。 | 已启用看门狗挂钩。 |
| `worldedit.watchdog.inactive` | Watchdog hook已停用。 | 已停用看门狗挂钩。 |

## 验证

JSON解析、全部当前键存在及{0}/{1}参数集合核对通过；加载顺序已核对当前JAR字节码。未进游戏验证，未提交、打包或部署。
