# 1.5.1 方块小镇盲道与石材配方核查

2026-11-16。正式发布提交 `68cdfe8` 的 `pack/modrinth.index.json` 与 10 月 10 日 create-cn 主服快照中的 `yuushya-1.20.1-forge-2.2.3.jar` SHA-1 相同，均为 `6b0b56d34c8466afd76097a7002f7ab18bd96b1c`。本次没有现场读取运行中服务器的 RecipeManager。

## 注册与实际产物

JAR 的 `data/yuushya/register/texture.json` 将下列七个方块的 `auto_generated.recipe` 设为 `false`。按物品 ID 对照产物，七项在模组内均无独立配方。相同标记还出现在有手写配方的条目上，所以仅用标记判断会误报。两种盲道都有自身的挖掘掉落表；它只能回收已经存在的方块。

| 中文名 | 物品 ID（命名空间均为 `yuushya`） |
|---|---|
| 盲道 | `tactile_paving` |
| 点状盲道 | `tactile_paving_spot` |
| 镶框砖块 B | `framed_bricks_alt` |
| 红色花砖 | `red_bricks` |
| 黑色花砖 | `black_bricks` |
| 杏色花砖 | `pale_bricks` |
| 平滑大理石砖瓦 | `smooth_marble` |

范围为 Yuushya 注册数据中明确关闭自动配方、且没有以自身 ID 为产物的项目。另查主服快照各模组的 JSON 配方／战利品表、快照 KubeJS 和 1.5.1 发布树，未找到给这些 ID 补配方的内容。镶框砖块 A 有工作台配方；石灰砖 0–3 使用独立的带编号 ID，也都有配方。

两种盲道属基础设施组。如需补配方，可参照同组铝制防盗网的 `data/yuushya/recipes/block/burglar_mesh.json`，由「蓝图-设施」在切石机制作。1.5.1 已有该蓝图的兑换入口。此条仅为修复参照，本次未更改玩法或部署。

## 11 月 16 日双服修复

两种盲道在切石机用 1 张「蓝图-设施」制作，每次得到 4 块。另五种石材用 1 张「蓝图-石材」，各得 4 块。七个独立配方位于 `pack/overrides/kubejs/data/niijima/recipes/yuushya/`，已用两服 1.5.1 快照的实际 JAR 校对输入、产物与分组。

现场修复前，两个运行实例的 KubeJS data、server_scripts、startup_scripts 各有 72 个文件，逐路径比较和换行归一化后内容一致。开发分支更新源的 108 个 shared 条目也均无单服差异层覆盖。两服差异层同一目标有 68 项相同，另有 7 项内容不同；其中 Packet Fixer 和 WorldEdit 的 properties 仅注释或格式不同。其余涉及重启、地图服务、备份、列车燃料及服务器角色。此比较不覆盖每个线上模组的运行时设置。

两服通过同一个 `server/shared/kubejs.ablink` 分发 KubeJS，共用配方应同批上线；单服例外须有明确原因。更新器会删除重建 kubejs，务必在下一次运行前确认引用来源 `__master__` 已包含这七个文件。开发分支文件和线上手动热修不能替代该步骤。

### 现场结果（北京时间 21:55）

create-cn 与 train-cn 分别写入 7 个文件，两套内容逐字节与本地配方一致。通过同一条内网 SSH 在两服各自的 Minecraft 控制台执行一次 reload。两服 KubeJS 的 Found 均从 15069 增至 15076，既有失败数均维持 4，未见指向此次配方 ID 的错误。两服随后均加载 6706 项进度，服务状态为 active。此为服务端文件和重载日志验证，未在玩家端打开 JEI 或实际操作切石机。

线上补查发现，共用的 Yuushya、KubeJS、TrainResync JAR 在两服分别同哈希。与既有共用配置约定有出入的线上值（主服／创造服）为 WorldEdit 导航工具基岩／指南针、女仆区块加载半径 0／8、东方女仆四项原版模型／贴图替换 true／false。另有 OEI 的 Clear_Food_Properties 为 true／false，重写模式与目录规则也有配置差异，缺字段的运行时默认未核实。上述差异此轮只读核对；TrainResync 铁路恢复目录按服名分开属预期。

### 2026-11-16 22:09 双服配置跟进（线上 1.5.1）

创造服已将女仆区块加载半径从 8 调至 0、WorldEdit 导航工具从指南针调至基岩；OEI common.json 已完整采用主服文件并逐字节回读。主服三项原已符合要求。创造服 WorldEdit 独立重载返回 Configuration reloaded!。服务器未重启；女仆加载行为在类初始化时缓存半径，创造服下次正常重启后按新半径运行。OEI 仅验证配置落盘，未验证当前进程是否热读。原文件位于主机 /home/ashbill/niijima-config-backups/train-cn-20261116T140941270831Z。

东方女仆四项外观替换现场仍为主服 true、创造服 false，本轮仅核实。1.4.0 的客户端 EntityYukkuriSlimeRender.render 读取 ReplaceSlimeModel，关闭时调用原版 SlimeRenderer。包内客户端默认关闭，玩家报告在主服看到原版史莱姆，与此吻合。

22:27 后续：按 AshBill 要求关闭主服上述四项外观替换。两服线上配置已回读为全部 false，与开发分支内玩家包及两服更新器一致。主服备份在 /home/ashbill/niijima-config-backups/create-cn-20261116T142736575459Z/config/touhou_little_maid-common.toml。
