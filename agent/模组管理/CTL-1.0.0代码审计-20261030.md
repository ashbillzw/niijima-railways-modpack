# CTL 1.0.0 卡顿与崩溃风险审计

2026-10-30。用户确认玩家报告的CPU满载发生在**客户端**，要求完整检查早期CTL代码，以JAR为准。服务器超过60秒tick的上游根因仍未知，不能将本报告的客户端故障链直接当作该事故的已确认原因。

## 范围与依据

- 目标：`ctl-forge-1.0.0.jar`，622,901字节，SHA-1 `8e352daafef988cffd9732824c6661f90ab4bf45`，与当前 `pack/modrinth.index.json` 完全一致；共享服务端 `.ablink` 也指向1.0.0。不是参考目录里的Create6专用1.2.0版本。
- 原件：`D:\mydata\Agents\Minecraft相关\本地资源\服务端引用结构整理前备份-2026-10-07\create-cn\mods\ctl-forge-1.0.0.jar`。未访问玩家电脑或本轮远端JAR，因此不宣称已核对玩家实际安装二进制。
- 全部33个class：31个顶层源文件，另2个编译器生成的枚举switch辅助类；无内嵌JAR。ForgeFlower反编译CTL无失败标记，关键调用另以javap核实。全部运动、交互、Mixin、方块形状／放置、注册、入口、枚举及平台桥接代码均已审阅；同时检查Mixin配置和相关tag。
- 依赖调用以本地Create0.5.1.j JAR、Forge47.4.6源码包为准。Create选取类反编译有缺少内部类／枚举switch简化警告，未用相关失败位置推导结论，碰撞任务提交另外核对字节码。
- 临时源码、class清单、字节码和小型验证均放仓库外 `D:\mydata\Agents\Minecraft相关\临时分析\ctl-audit-20261030\`。未修改或重打包模组、未启动游戏测试、未部署、未改变远端状态。

## 1. 高优先级：重复灯状态包触发无法有效取消的碰撞重算

**这是最符合“车动就满载，停车后还要等几分钟”报告的明确代码缺陷链。代码链已确认，玩家此次症状的实际归因仍缺性能采样。**

1. `HeadTailLightMovementBehaviour.tick` 在满足运动、方向和灯位置条件时，每tick设置 `LIGHT_MODE` 并调用车厢实体 `setBlock`；未比较当前与目标模式是否相同。16个调用点是互斥方向分支，不是每盏灯每tick执行16次。
2. 实际虚调用落在 `CarriageContraptionEntity.setBlock` 覆盖实现；对该车厢当前存在的各维度实体写方块Map，并给跟踪玩家发送 `ContraptionBlockChangedPacket`。此处也没有同状态去重。此前只引用父类setBlock，结论方向相同，但本次补齐了真实覆盖方法。
3. 客户端包处理经 `AbstractContraptionEntity.handleBlockChange`，即使收到相同状态也调用 `contraption.invalidateColliders()`。渲染失效则有 `oldState != newState` 判断，**不能称每个重复包都会重建渲染**。
4. `invalidateColliders` 并非仅标记脏：它清空缓存并立即调用 `gatherBBsOffThread`，提交异步任务遍历整节车厢的全部方块，取得碰撞形状、移动到局部坐标、执行形状合并及简化。不是只重算那盏灯。
5. Create保存的future是 `supplyAsync(重算).thenAccept(发布结果)` 的后半段。下一次更新的 `cancel(false)` 取消的是结果回调，不是前面的重算supplier。反复更新仍会留下待执行或已执行中的计算；移除实体时同样只取消这个回调。

因此，只要任务产生速度持续超过执行速度，就可能积压大量CPU和内存开销；停止移动／拆灯停止新任务后，旧计算仍需完成，能形成延迟恢复的现象。这是有代码支撑的解释，不是已经测得玩家队列长度或五分钟耗时。

数量示例仅为机制估算：20TPS、4盏均满足方向条件的灯，每秒约80次方向更新；单个观察客户端一分钟可接收约4,800个对应更新并触发同量重算提交。跨维度实体、观测范围、实际TPS、其他补丁都会改变数量；不是实测吞吐量。

### 一个重要放大条件：关灯不等于停止问题路径

`mustTickWhileDisabled()` 返回true；`context.disabled` 只用于 `shouldLIT` 的开关逻辑，后面的方向更新仍继续执行，也未以 `LIT=false` 提前返回。因此控制器关闭车灯不能可靠规避此问题。玩家拆掉方块后有效，与该路径的结构一致。

### 有限验证

仓库外 `CancellationProbe.java` 使用与Create相同的future依赖结构，用单线程executor和latch固定时序：提交12次计算，取消前11个结果回调；结果为 `computations=12, publications=1`。其中首个计算已开始，其余排队，全部仍执行。这仅验证取消语义，没有模拟Minecraft碰撞成本或重现玩家满载。

证据位置（行号属于本轮反编译文件）：CTL `HeadTailLightMovementBehaviour.java:79–134,246`；Create `CarriageContraptionEntity.java:187`、`AbstractContraptionEntity.java:732`、`Contraption.java:1370–1394`。源文件完整包路径保留于上述临时目录的 `source/` 和 `create-source/`。

## 2. 高优先级：客户端方向逻辑调用服务端发包入口

CTL只有 `tickLIT` 被 `!context.world.isClientSide()` 包围，后面的方向计算和 `setBlock` 在逻辑客户端也能执行。Create的车厢tick会在两端调用actor.tick；客户端绑定车厢时也将实体放入该车厢的实体引用集合。

当客户端进入相应方向分支且实体存在时，车厢setBlock调用 `PacketDistributor.TRACKING_ENTITY`，Forge47.4.6的 `trackingEntity` 将实体所在世界的chunk source直接强转为 `ServerChunkCache`；客户端的chunk source不是该类型，存在可达的 `ClassCastException` 路径。检查到的CTL和Create调用链没有在这里捕获该异常。

这属于独立的逻辑端错误，可能导致客户端实体tick异常／崩溃；是否由整合包其他保护逻辑拦截、移除实体或继续运行，不能仅靠这些类确定。玩家本次是长时间满载而非已提供此异常栈，故不将它冒充此次已复现根因。只给方向更新加状态去重也不能代替修正逻辑端边界。

证据：CTL `HeadTailLightMovementBehaviour.tick`；Create `CarriageContraptionEntity.tickContraption/bindCarriage/setBlock`、`Carriage.forEachPresentEntity`；Forge `PacketDistributor.java:224–228`。

## 3. 中优先级：整列灯控未处理未加载车厢

`ContraptionControlsMovingInteractionMixin.customHandlePlayerInteraction` 在门类过滤器匹配时遍历整列车，直接调用 `c.anyAvailableEntity().getContraption()`，没有检查entity或contraption是否为空。

Create `Carriage.anyAvailableEntity()` 在没有加载实体时明确返回null；远处未加载、跨维度等情况下，一节当前可操作车厢不能保证其他所有车厢都存在实体。此时操作控制器可触发NPE，并可能只更新前半列车后中断。异常最终导致断线还是服务端失败取决于外层处理，本次未实测；它不能单独解释匀速行驶持续CPU满载。

`ItemTags.f_13179_` 已通过MC字节码确认为 `minecraft:doors`，而非CTL专用tag；CTL将全部12种灯加入该tag。因此风险也涉及同一路径中其他门类过滤器，不能限定只有quarter灯。

证据：CTL Mixin反编译第44–53行；Create `Carriage.java:348–356`；原始Create交互方法最后return在服务端分支，未把该TAIL注入误写成所有早退点都执行。

## 已有补丁与其他检查结果

- CTL原版运动tick确有 `System.out.println(context.localPos)`。但本地TrainResync已经注册 `trainlights.HeadTailLightMovementBehaviourMixin`，用Redirect屏蔽该调用，历史提交为 `f4279ee`，当前源码也仍存在。若玩家版本包含并成功应用该补丁，日志打印已被规避，**不能继续列为当前主要负载来源**。该补丁没有处理重复setBlock、碰撞任务或客户端隔离。
- 七种内饰灯共用 `InteriorLightMovementBehaviour`；其开关更新有服务端检查及变化判断，没有头尾灯的每tick方向更新链。大量灯同时切换仍可能触发多次碰撞重算，但不等同持续运动时恒定重复触发。
- 五种头尾灯均通过 `htLightBlock()` 注册同一有缺陷的运动行为：`htlb_block`、`panel_htlb`、`halfpanel_htlb`、`vertical_halfpanel_htlb`、`quarter_htlb`。问题不是quarter形状独有。
- 方块形状／放置类使用有限分支和静态VoxelShape，未发现无限循环、递归重入或自行创建后台线程。枚举遍历仅3或5项；入口和注册主要在加载时执行。两种交互行为只切换LIT并要求更新碰撞，未发现自行循环发包；声音临时变量未实际播放属于低影响问题。
- 方向判断还有localXZ为0无对应更新、极小非零垂直速度直接返回等边界，可能使灯色保持旧值；与CPU任务积压不是同一问题，本次不扩大为修复项目。
- 没有发现CTL自定义网络通道或独立定时线程；严重的计算放大来自它对Create更新接口的使用。审阅全部代码不等于穷尽所有模组组合或运行时缺陷。

## 与服务器60秒tick的关系及修复边界

### 大量车门同时开关的关联（用户后续澄清）

Create0.5.1.j的 `SlidingDoorMovementBehaviour.tickOpen` 有变化判断，正常保持开／关不会像CTL方向逻辑那样每tick重复提交。但实际开关时，`toggleDoor` 分别更新门的两半，调用setBlock发包，并在完整门结构路径直接调用 `invalidateColliders`；客户端接收每个更新包也会进入前述碰撞重算链。因此大量门同时开关可以集中产生多次整车厢重算，且原future取消问题同样存在。该车门路径在服务端也主动重算，不能只按CTL的客户端接包路径推断影响范围。

共同点是多次变化没有按车厢合并为一次碰撞重算；区别是车门通常产生一阵任务，CTL行驶方向更新持续制造任务。可疑程度高，但未取得玩家开关车门时的性能采样，不能断言其FPS尖峰全部由此造成；门动画、渲染和其他模组也可能贡献开销。仅修正CTL重复更新不会自动修复多门同时开关的问题。证据保存在仓库外本审计目录的 `doors.javap.txt`。

最强的链条是**服务器不断发更新包 → 客户端异步碰撞任务堆积**。它可以使客户端满载而服务器尚能运行；不能据此倒推专用服务器也在每包执行相同重算。服务器仍承担方向更新、发包及分配成本，但是否导致10月29日的内存压力或超时，没有对应采样证据；原DAT事故的保存栈证据保持不变。

若之后修复，优先在CTL方向更新入口限制服务端执行，并仅在实际模式变化时提交setBlock；同时保证开关状态同步、不因去重漏掉真实变化。若进一步处理Create的碰撞重算，应按实体合并请求并控制实际计算任务，而非仅取消结果回调；这是范围更大的依赖层改动，需要单独评估。控制器另加未加载车厢／contraption空值处理。以上是审计建议，**本次未实施、未部署，也未建立新的并行待办列表**。

## 修复范围评估与上游对照（2026-10-30，仅讨论）

用户明确要求本轮仅分析，不实现。以下为静态源码判断，未构建或运行第三方项目、未部署。

### 三项修复

1. **CTL纯灯状态变化不重建碰撞：低至中等难度。** 本轮审查的灯类几何不依赖LIT／LIGHT_MODE；仅这些属性改变时可以保留渲染和网络同步、跳过碰撞失效。方块替换、朝向及其他几何属性变化不能一概跳过。同时应在CTL入口去掉同状态重复setBlock，并修正客户端调用服务端发包入口的独立错误。仅禁止碰撞任务仍会保留无意义网络更新。
2. **同车厢多门更新合并：中等难度。** 同一tick按同一Contraption实例收集失效请求，在方块更新完后统一提交；门上下半及多扇门都纳入。不同逻辑端／跨维度实体不能错误共享一份缓存。应立即使旧碰撞缓存失效，重算期间可沿用原版getSimplifiedEntityColliders为空时的逐块碰撞回退，不能继续把旧开／关门形状当作有效结果。
3. **限制实际任务并拒绝过期结果：中至较高难度。** CompletableFuture.cancel(true)不提供强制中断supplier的语义，原代码取消的甚至只是thenAccept后继。建议与第2项共用调度：每实例至多一个实际计算，另记录需要按最新状态补算；以版本号拒绝过期结果。若提前取消正在计算的任务，需计算过程协作检查，而非每个方块包无限取消重启；昂贵的单次shape优化未必能即时中断。还需处理输入快照、结果发布和实体卸载。应避免并行读取正在改变的方块Map。第2、3项是同一调度问题，不必各造一套机制。

### 官方发布标签

- MC1.20.1 / Create6.0.8，提交`1a1a9a2819b4f89f78caec41b55ed8cb222fa24b`：Contraption仍使用supplyAsync形状合并与optimize、thenAccept发布、cancel(false)取消后继的结构；该机制未解决。
- MC1.21.1 / Create6.0.10，提交`ac0c444d9828da3453ae8cc65338e8de063286fb`：改为同步遍历方块并收集各碰撞盒到CollisionList，删除原异步合并链；因此上述异步任务积压机制已不存在。但AbstractContraptionEntity.handleBlockChange仍直接invalidateColliders，没有在该入口按车厢合并请求，不能称三项全部修复。也不等于1.20.1可直接使用该JAR；若研究回移，应连同碰撞消费者一起评估，不只复制一个方法。
- 官方源码：[6.0.8 Contraption](https://github.com/Creators-of-Create/Create/blob/1a1a9a2819b4f89f78caec41b55ed8cb222fa24b/src/main/java/com/simibubi/create/content/contraptions/Contraption.java)、[6.0.10 Contraption](https://github.com/Creators-of-Create/Create/blob/ac0c444d9828da3453ae8cc65338e8de063286fb/src/main/java/com/simibubi/create/content/contraptions/Contraption.java)、[6.0.10接包处理](https://github.com/Creators-of-Create/Create/blob/ac0c444d9828da3453ae8cc65338e8de063286fb/src/main/java/com/simibubi/create/content/contraptions/AbstractContraptionEntity.java)。[Java17取消语义](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/CompletableFuture.html#cancel(boolean))。

### CarriageFix参考审查

审查main固定提交`50cf1bf6a720b8779d40219366495f231a163101`，已读全部4个Java源文件、README和构建配置，以本地Create0.5.1.j字节码作基线。不是依据README认定修复有效。

- 实际补丁改写CarriageContraption.getRenderedBlocks并缓存Collection；没有改变CTL更新、invalidateColliders或异步任务调度。它不是上述三项修复的实现。
- 明确逻辑错误：调用getCachedIfValid时将同一个versionLocal同时传作两个比较版本，helper只检查非null和这两个值相等，忽略portalCutoffMin/max等参数；没有其他失效入口。缓存生成后始终通过检查。
- 常态无传送门时原版直接返回blocks.values视图，没有每次复制整车方块列表。补丁的无传送门缓存也为实时视图，因此不能误称所有普通门状态会冻结，但此分支看不到有依据的显著省算。进入传送门后会继续返回整车视图而跳过裁剪；若首次缓存于传送门中，则ArrayList快照不会随边界／状态更新。
- 重写遗漏原版getRenderedBlocks维护specialRenderedBEsOutsidePortal的副作用；后者由getSpecialRenderedBEs在传送门中直接返回。影响特殊方块实体的可见性处理，与上述缓存错误叠加。
- 额外发布兼容风险：ASM字符串硬编码pos、PURPLE_STAINED_GLASS、defaultBlockState等开发名，而目标生产JAR使用SRG名；所读源码未见对应运行时映射。可能在相关分支触发链接错误。未运行打包产物，故不把这一点写成已复现崩溃。
- 有用的参考是“渲染集合分配可能另有优化空间”，需要性能采样证明；该实现不宜直接采用，也不能用它证明玩家车门卡顿已解决。传送门缓存如要做，必须保留原方法副作用并正确失效。
- 源码：[Transformer](https://github.com/iamchenbolong/CarriageFix/blob/50cf1bf6a720b8779d40219366495f231a163101/src/main/java/com/example/carriagefix/CarriageClassTransformer.java)、[CacheHolder](https://github.com/iamchenbolong/CarriageFix/blob/50cf1bf6a720b8779d40219366495f231a163101/src/main/java/com/example/carriagefix/CacheHolder.java)。原始下载保存在仓库外审计目录upstream，字节码核对为CarriageContraption.javap.txt。

本轮fetch发现分支ahead1／behind3，用户已批准仅继续本地记录上述分析，暂不合并；未改任何运行代码。
