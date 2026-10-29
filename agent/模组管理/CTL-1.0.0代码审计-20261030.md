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

## 更简洁的候选设计（2026-10-30，后续讨论，未实现）

用户要求brainstorm；此节只比较候选，不建立实施承诺或独立待办。所有路线均先修CTL同状态重复更新及逻辑端错误；纯LIT／LIGHT_MODE变化不应使碰撞缓存失效，但不能将此豁免扩展至方块替换、朝向或未经审查的动态形状。

1. **车厢禁用整车简化缓存，复用原版局部查询。** 当前Create0.5.1.j的ContraptionCollider在Optional缓存为空时调用getPotentiallyCollidedShapes：按实体局部包围盒和运动扩展扫描范围，再查询blocks Map，并过滤传送门隐藏方块；不是每次扫描整车。这可以完全省去整车异步重建及取消机制，是代码量最少、值得先评估的候选。需阻止初始化／读取存档以及失效入口启动该计算，不能只清空结果。开关门直接更新方块状态，由下次查询读取。代价是每次碰撞查询重新取形状和分配列表；实体数量、速度和扫描范围增大可能使持续CPU成本上升。原版回退路径存在不等于适合永久启用；其形状查询上下文与缓存构建不同，复杂形状、转弯／旋转、跨门及跨维度正确性也须确认。不将这种候选称为已经验证安全或更快。
2. **同步、延迟构建简单碰撞盒列表。** 参考1.21.1的官方算法思想，避免全车VoxelShape布尔合并／optimize；变化只标脏，在需要碰撞结果时按最终状态收集盒子。这样不需要异步取消、快照或过期结果发布。同一批更新可自然合并；若两批变化之间已经发生碰撞查询，必须再次更新，不能为了“每tick一次”强行使用过期结果。列表构建仍扫描全车，未合并的盒子更多，旧版碰撞消费者的遍历成本可能增加；官方新版数据结构及消费者不能未经审查直接照搬。作为长期实现方向结构清楚，但在旧版上没有性能保证。
3. **按方块／空间分块增量维护，或静态车体与动态门分层。** 理想情况下只更新变化的门，避免全车处理；但原整车并集无法便宜地移除旧门形状，需要改缓存表示。邻居依赖、方块实体／世界上下文、双半门、跨维度可见性使正确失效复杂，不能普遍假定形状只是BlockState的函数。理论上节省局部变化成本，但首轮补丁维护成本偏高。
4. **保留原算法，做合并及有界异步调度。** 保留合并后的较少碰撞盒，兼容原消费者较直接；仍有快照、取消协作、发布版本和卸载处理复杂度。可作为前三者性能／兼容性不合适时的保守备选，不优先为旧算法建立复杂调度框架。

当前倾向：CTL入口修正是独立的确定性改进；碰撞层先用少量有代表性的场景评估原版局部路径，若日常成本或正确性不合适，再选择同步延迟重建的简单盒子列表。局部查询是最小候选，同步列表是更明确的缓存设计；最终选型需要比较变化时峰值和静止／行驶常态成本，不能只看开门瞬间FPS。此轮没有执行这些测试。

源码依据：仓库外create-source/.../ContraptionCollider.java:123–127,570–587，Contraption.java的gatherBBsOffThread还在初始化及存档加载路径调用。仅在已提取依赖类范围搜索，未宣称审阅所有第三方碰撞消费者。上述讨论未证明服务器60秒tick的根因。

## 用户选定方向与最小实现估算（2026-10-30，仍未实现）

本节替代前两节的推荐顺序与过期结果丢弃建议。用户优先选择改动小、可控：保留原碰撞合并算法，每实例至多一个实际计算任务，每tick至多一次提交，修正CTL重复更新。用户进一步明确：即便计算期间状态已变化，完成的结果仍应采用，直到下一份计算完成；不能持续丢弃已完成结果。

据此采用“保留最后成功结果，串行计算，脏标记合并”：invalidate只设dirty，不清空已有缓存；每tick固定入口先收取已完成任务并更新现有碰撞缓存，然后在dirty且无运行任务时捕获最新输入并启动一个任务。启动时清dirty，期间变化再设dirty。严格串行且在主线程收取结果后才开启下一任务，因此不需要发布版本号、取消重启或完成回调写世界状态。未完成时不可阻塞等待；第一次尚无成功结果才使用原版缺缓存回退。异常不覆盖最后成功结果，且须清理任务占用并留下明确错误，不能永久锁死或无声重试风暴。卸载／重新绑定必须处理任务归属，不能让旧实例结果写入新实体。

这是有意接受碰撞短暂滞后：门视觉改变后可能短时仍用之前开／关形状，不能再宣称始终与当前门状态一致；延迟由任务实际耗时决定，并不保证只落后一tick。保留旧结果可以避免连续变化导致缓存长期不可用。

### 预计文件数与代码量

核对现有TrainResync的头尾灯Mixin、Mixin配置及插件后，建议核心约5个文件，生产Java新增／改动约200–280行（按正常格式含注释、空行粗估，不含测试和文档）：
- 新Contraption碰撞Mixin：约130–180行，集中过期标记、计算输入快照、原算法、future收取及生命周期／失败处理。
- 新窄接口：约8–12行，仅供实体tick调用该Contraption的更新入口。
- 新实体tick Mixin：约20–30行，固定每tick一次调度，限定车厢实例，其他Contraption不改。
- 修改现有HeadTailLightMovementBehaviourMixin：约35–55行，服务端边界、setBlock相同状态去重，保留原方向算法和现有静音补丁。比较应使用车厢Map中的当前状态，不能把已被原方法提前赋值的context.state误当更新前状态。
- trainresync.mixins.json注册条目：数行。

若同时完整落实“CTL纯灯状态变化不要求碰撞重算”，预计额外2个小Mixin（客户端接包过滤、内饰灯服务端失效过滤；头尾灯的服务端失效过滤可放已有Mixin），合计约7文件、250–380行生产Java。纯灯过滤放trainlights可选分组，避免通用Create Mixin硬依赖CTL；沿用现有插件按模组存在性启用，不新增依赖或改Gradle。具体注入匹配可能使估算调整，不是已实现的diff统计。必要的少量调度验证另算，不为压行数省略异常或卸载处理。

最简洁边界：调度状态附着Contraption，不建立全局车厢Map或通用调度框架；沿用现有executor，不新增线程池／定时器／网络协议；将后台任务输入限制为主线程取得的碰撞形状快照，后台只运行原合并／optimize算法。仅浅拷贝blocks Map不足以阻止形状计算访问可变世界。快照采集会将一部分原后台工作移到主线程，这是小范围并发正确性代价，实际耗时须在实现后的针对性验证中确认。本轮只估算，未修改TrainResync代码或执行构建、测试、部署。

## 源码与实际JAR的方案核查（2026-10-30）

用户要求实现前sanity check。本轮未修改运行代码、未构建、未启动游戏、未操作服务器。结论：核心缺陷与串行补算方案有直接字节码依据；此前注入点／完整覆盖范围有遗漏，按下文纠正，不能把前述行数估计视作最终实现清单。

### 基线与方法

- 本地Create checkout实际为mc1.21.1/dev、`ef00481fd`，不能作为0.5.1.j实现依据；只读检查，未切换分支或动其未跟踪.vscode。
- TrainResync/libs与仓库外服务端引用备份中的Create0.5.1.j均为SHA-1 `fab2ae7fcf685b3875ca20022bfecf0d4fdafbf7`，CTL1.0.0均为`8e352daafef988cffd9732824c6661f90ab4bf45`；与当前pack/modrinth.index.json一致。服务端Create .ablink指向对应Modrinth文件。本轮未重新读取远端实际JAR，不将本机哈希一致扩展为线上验收。
- 官方源码取`mc1.20.1/0.5.1`分支固定提交`d39f89983a6c36dcacda6635c2094c826703ed49`，作为可读参考；没有找到并冒认0.5.1.j发布标签。涉及的方法逐项对照实际JAR的javap字节码，以JAR为最终依据，不宣称整个分支与发布JAR完全相同。
- 仓库外证据：`临时分析/ctl-audit-20261030/sanity/`，含14个Create相关类、3个CTL关键类的本轮javap结果，及official-0.5.1下12份官方Java源文件。沿用已确认同哈希JAR的其他CTL反编译文件。未重新运行此前取消语义测试。

### 确认成立

1. Contraption.invalidateColliders确实先清空Optional缓存再立即gather；gather保存的是supplyAsync(...).thenAccept(...)的后继future，下一次cancel(false)和卸载取消都只作用于该后继。supplier实际遍历实时blocks Map，读取ContraptionWorld，依次joinUnoptimized，最后optimize/toAabbs；thenAccept直接写回缓存，没有主线程发布步骤。
2. CTL方向更新16个分支为互斥调用点；没有相同状态判断，且不在服务端判断内。实际虚调用进入CarriageContraptionEntity.setBlock，写入各已存在维度实体的方块Map并发包；这个方法自身不调用invalidateColliders。客户端handleBlockChange无条件invalidate，渲染失效另有状态差异判断。因此“每个setBlock在服务端自动重算”是不准确的，服务端来自行为自身显式失效。
3. 门实际变化才更新；一次toggleDoor写上下两半，完整门路径再显式invalidate一次。客户端每个半门包各自invalidate。合并应限制碰撞任务，不吞掉真实方块状态更新。
4. 普通非传送门情况下，ContraptionCollider有缓存就用，否则走实体局部扫描。保留上一份成功结果无需换碰撞算法；严格串行、在主线程poll完成结果后才提交下一份，按用户要求可以采用落后于最新状态的完成结果，不需版本丢弃。但这是新策略：原版失效时清空缓存，不能说保留旧缓存完全不改变行为。
5. 新任务期间只设dirty是足够的待更新表达；开始任务时清dirty，后续变化重新置true。后台不能直接读变化中的Map／世界，复制Map本身也不够：ContraptionWorld.getBlockState仍读原Contraption.getBlocks。主线程取得形状，后台只做原合并算法的边界有必要。

### 必须修正／补齐

- **保留传送门特殊处理。** CarriageContraption.getSimplifiedEntityColliders在notInPortal时才返回父类缓存，处于传送门时强制Optional.empty；isHiddenInPortal过滤裁剪区域。不得为了“始终使用旧结果”绕过这个getter、直接把缓存喂给碰撞器。用户旧结果策略应适用于原本使用缓存的普通车厢路径；传送门继续按原生实时局部查询。
- **不能只在父类tickStorage注入。** CarriageContraption覆盖tickStorage且不调用super；且实体tick先tickStorage再tickContraption/tickActors。父类storage注入会漏掉目标车厢，在其调用之前提交也收集不到本tick随后产生的门变化。
- **更合适的统一调度位置。** 实际JAR的CommonEvents.onWorldTick在服务端LevelTick END调用ContraptionHandler.tick；ClientEvents.onTick在ClientTick END调用同一入口。ContraptionHandler遍历每世界按entity ID保存的存活Contraption实体，并调用ContraptionCollider.collideEntities。可在这个调用前仅对CarriageContraption收取完成结果、至多启动一次任务；复用既有每tick遍历，不新增全局扫描／事件总线注册。不会拦截门和网络的实际更新，其他类型装置不改。此为静态确认的候选注入点，Mixin匹配仍需实现后验证。
- **初始化不只走invalidate。** fromNBT、onEntityCreated直接调用私有gatherBBsOffThread；必须也改为置dirty，否则原任务和新任务可能并存。fromNBT可发生在entity尚未绑定时，不能在那里无条件取entity.level。既有ContraptionWorld初始化需保留；任务延迟到实例可用的统一调度点。
- **卸载不能照抄取消语义。** onEntityRemoved原逻辑cancel(false)不代表实际计算退出。新的后台任务只持有计算输入、没有写车厢缓存的回调；卸载后不要发布到其他实例。每Contraption实例至多一个任务不等于全服只有一个任务，也不能承诺取消已在执行的旧算法。恢复实体通过NBT创建的路径已核查，不能按逻辑Carriage把不同维度实体共用一个状态。
- **上一轮完整CTL过滤清单漏了手动交互。** HeadTailLightMovingInteraction和InteriorLightMovingInteraction都覆盖updateColliders返回true；父类SimpleBlockMovingInteraction在状态改变后调用该方法决定是否invalidate。只过滤movement与客户端包仍会漏掉手点灯路径。可用一个针对这两个同签名方法的Mixin返回false，或各自一个小Mixin；不要在通用父类全局禁用交互碰撞更新。它不改变灯本身状态同步。
- **跨维度失效传播不能凭空假设。** Carriage.setBlock更新多个实体，但行为显式invalidate的是发起实例；修改时需保留原路径，并核查其他实例在需要缓存时的dirty来源，不能宣称每个setBlock已自动标脏所有维度。传送门实时回退并不等于所有后续缓存都自动更新。本轮未扩展成新的跨维度修复实现。

### 对规模估算的修订

核心调度与CTL去重仍是约5文件量级；tick桥接可改为ContraptionHandler的碰撞调用前注入。若完整包含纯灯状态过滤，应补手动交互入口，估算改为约8文件（交互拆开则9）、约280–430行生产Java；不是保证上限，跨维度dirty传播若需要补充将另计。前一节“完整7文件”的估算漏项，已由本节修正。仍优先保留原算法、避免通用调度框架；不为维持原估算而漏掉入口。

静态证据确认的是缺陷和方案边界，不是玩家现场FPS／服务器60秒tick的已确认归因。具体Mixin是否命中及实际游戏性能仍未验证。

## 核查后的最精简方案（2026-10-30，当前讨论稿）

本节收敛前述候选，作为当前方案。2026-10-30用户已明确安排下次执行，今天停止；任务已登记总todo，当前未实现、未部署。目标固定为Create0.5.1.j／CTL1.0.0，保留原形状合并算法，仅限制车厢碰撞任务及修正CTL更新，不改网络协议或其他类型装置。

1. **状态**：每个CarriageContraption实例一个dirty和一个pending计算future，继续使用Create原缓存。不同客户端／服务端／维度副本各自计算，不按逻辑Carriage共用缓存。任务成功即采用，即便期间有新变化；之后按dirty补算。初始化没有缓存时仍使用原回退。
2. **请求入口**：车厢invalidateColliders只标脏，不清缓存、不提交任务；私有gatherBBsOffThread也拦成只标脏，覆盖fromNBT／onEntityCreated。非车厢保持原版。保留世界与实例初始化，不在尚未绑定实体时取entity.level。
3. **跨维度最小补齐**：车厢显式invalidate时，将同一Carriage各已存在维度实例标脏；通过窄接口直接设置标记，不递归调用invalidate。无Carriage绑定时至少标自身；初始化gather只标自身。不全局改变setBlock含义，也不为此新增跨维度网络同步。此为拟议的小范围传播修正，不是原版已有行为；用于弥补setBlock写多个副本、失效请求只来自发起实例的落差。
4. **唯一调度点**：ContraptionHandler.tick内，调用ContraptionCollider.collideEntities之前，对车厢运行一次维护。主线程先检查已完成future，成功则发布结果并清pending；然后仅在dirty且无pending时取得形状快照、启动任务。后台只做原joinUnoptimized／optimize／toAabbs，使用原有默认执行器。没有while循环、完成回调再提交、新线程池或独立定时器。每实例每次原生tick遍历至多提交一次；只读取isDone后的结果，不阻塞等待。
5. **生命周期**：卸载后不再调度／发布；后台不捕获实体或世界，不主动取消并立刻启动替代任务。重新载入按原创建路径重新标脏。不得将cancel返回或future取消标记当作实际计算已经终止。失败保留最后成功结果、释放任务占用并明确记录，不能每tick无条件自动重试。
6. **原生碰撞语义边界**：不改CarriageContraption.getSimplifiedEntityColliders，传送门中继续返回空并走实时局部裁剪。保留旧结果只影响原本使用整车缓存的普通路径；允许门视觉与碰撞短暂不同步。主线程取形状的成本仍需后续有针对性确认。
7. **CTL**：在已有头尾灯Mixin增加服务端执行限制、基于车厢Map现状态的setBlock去重，保留原方向算法与静音。头尾／内饰灯movement的纯LIT失效调用跳过；两种手动交互的updateColliders返回false；客户端接包仅在同一灯方块且只变LIT／LIGHT_MODE时跳过碰撞失效，其他属性／方块变化照常。灯状态、渲染和发包的真实变化保留。

文件组织约8个：Contraption碰撞Mixin、窄接口、ContraptionHandler调度Mixin、现有头尾灯Mixin、内饰灯movement Mixin、两种灯交互共用Mixin、CTL客户端包过滤Mixin、Mixin JSON。共用交互Mixin若目标校验要求拆开则9个。加上跨维度标脏补齐，正常格式生产Java约300–450行的估算，不含测试文档；不是硬性行数预算。CTL相关注入继续放trainlights可选分组，无新增Gradle依赖。

实现后最小验收范围：同tick多请求合并、跨tick运行不重叠且不丢dirty、完成结果始终接替旧缓存；初始化／卸载／传送门及跨维度副本；CTL模式保持不重复发包，真实灯变化和门变化仍正确同步。只做这些针对性验证，不另搭通用测试框架或扩展为算法替换。本轮未执行上述实现或验证。
