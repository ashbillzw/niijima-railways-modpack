# ST071 Not-Enough-Animations 筛查报告

日期：2026-10-18。

## 范围与来源

官方tr7zw/NotEnoughAnimations main 8366c7fde7e7e0d1c0a3b3ef7f32b8bd10b28a20，src/main/resources/assets/notenoughanimations/lang/zh_cn.json为84键，未覆盖当前全部新增项。全量117英文及84中文对照，保留3个额外旧键。新增含共享Trender 9键、模组本体26键；品牌Trender不翻译。修复Fixed→固定、爬行与潜行混淆、Pet动词、Easter egg机械直译复活节、x动画以及举起物品的镜头偏移说明。当前MaxNormalAngle提示只在None模式生效，与名字看似冲突但按当前英文保留，待实测。Trender遥测隐私表述转述作者原文，并非独立隐私审计；未改变发送选项。

## 应用明细

| 键 | 原值／英文 | 中文 |
|---|---|---|
| `text.trender.tab.general_options` | Options | 选项 |
| `text.trender.style` | UI Style | 界面风格 |
| `text.trender.style.tooltip` | Changes the UI Style for all of mods by tr7zw. | 更改 tr7zw 制作的所有模组的界面风格。 |
| `text.trender.style.MODERN` | Modern | 现代 |
| `text.trender.style.MODERN_DARK` | Modern Dark | 现代深色 |
| `text.trender.style.VANILLA_OLD` | Old Vanilla | 经典原版 |
| `text.trender.style.VANILLA_MODERN` | Modern Vanilla | 现代原版 |
| `text.trender.sendstacktraces` | Send Stacktraces | 发送堆栈跟踪 |
| `text.trender.sendstacktraces.tooltip` | When enabled, stacktraces in the log or game crashes that contain mod references to mods by tr7zw will be sent to the mod author via Sentry (Sentry.io) to help fix bugs faster. No personal information is collected or sent. (Restart the game after turning it on) | 启用后，日志或游戏崩溃中涉及 tr7zw 模组的堆栈跟踪会通过 Sentry（Sentry.io）发送给模组作者，以便更快修复错误。不会收集或发送个人信息。（开启后需重启游戏） |
| `text.nea.tab.settings` | Settings | 设置 |
| `text.nea.tab.holdup` | Hold Up Items | 举起物品 |
| `text.nea.tab.lantern` | Lanterns | 灯笼 |
| `text.nea.line.legacy` | Unfinished/Deprecated | 未完成／已弃用 |
| `text.nea.line.fun` | Fun | 趣味 |
| `text.nea.line.fixes` | Fixes | 修复 |
| `text.nea.line.holdup` | Hold Up | 举起物品 |
| `text.nea.line.rotation` | Rotation | 旋转 |
| `text.nea.line.smoothing` | Smoothing | 平滑 |
| `text.nea.line.animations` | Animations | 动画 |
| `text.nea.line.rotationAngle` | Rotation Angle | 旋转角度 |
| `text.nea.enable.enableHorseLegAnimation` | Horse Riding Leg Animation | 骑马腿部动画 |
| `text.nea.enable.enableHorseLegAnimation.tooltip` | Animates the player's legs in a different pose when riding a horse | 骑马时，让玩家腿部采用不同的姿势。 |
| `text.nea.holdUpItemsMode.CONFIG_INVERTED` | Not Config Items | 设置中未列出的物品 |
| `text.nea.enable.clampCrossbowAnimations` | Clamp Crossbow Animations | 限制弩动画幅度 |
| `text.nea.enable.clampCrossbowAnimations.tooltip` | Clamps the animations | 限制动画幅度。 |
| `text.nea.enable.customBowRotationLock` | Custom Bow Rotation Lock | 自定义弓动画旋转锁定 |
| `text.nea.enable.customBowRotationLock.tooltip` | Puts the body at an angle while using the custom bow animation | 使用自定义弓动画时，让身体保持一定角度。 |
| `text.nea.animateLanterns` | Animate Lanterns | 灯笼动画 |
| `text.nea.animateLanterns.tooltip` | Adds a swinging animation to lanterns while held | 为手持灯笼添加摇摆动画。 |
| `text.nea.enable.applyRotationLockToEveryone` | Apply Rotation Lock To Everyone | 对所有玩家应用旋转锁定 |
| `text.nea.enable.applyRotationLockToEveryone.tooltip` | Apply rotation lock to everyone and not just the player | 对所有玩家应用旋转锁定，而非仅对自己应用。 |
| `text.nea.maxNormalAngle` | Normal Angle | 普通角度 |
| `text.nea.maxNormalAngle.tooltip` | Set your normal rotation lock angle. Only works in None mode. | 设置普通状态下的旋转锁定角度。仅在“无”模式下生效。 |
| `text.nea.maxBlockingAngle` | Blocking Angle | 格挡角度 |
| `text.nea.maxBlockingAngle.tooltip` | Set your blocking rotation lock angle. Only works in None mode. | 设置格挡时的旋转锁定角度。仅在“无”模式下生效。 |
| `text.nea.enable.animationsmoothing.tooltip` | 平滑手臂和腿部的动画，让它们看起来还更自然 | 平滑手臂和腿部的动画，让动作更自然、减少突变。 |
| `text.nea.enable.rotationlocking` | x动画 | 动画旋转锁定 |
| `text.nea.rotationlock.FIXED` | 修复 | 固定 |
| `text.nea.enable.crawling` | 潜行动画 | 爬行动画 |
| `text.nea.enable.crawling.tooltip` | 新增潜行的动画，取代原版的“爬行”（游泳）动画 | 添加爬行动画，替换原版的“爬行”（游泳）动画。 |
| `text.nea.enable.petAnimation` | 宠物猫、狼 | 抚摸狼和猫 |
| `text.nea.enable.narutoRunning.tooltip` | 新增火影忍者风格的跑步动画（复活节彩蛋） | 新增火影忍者风格的跑步动画（彩蛋） |
| `text.nea.holdUpTarget` | 举起物品 | 举起物品的指向目标 |
| `text.nea.holdUpTarget.CAMERA` | 摄像头 | 镜头 |
| `text.nea.holdUpCameraOffset` | 举起摄像头偏移 | 朝向镜头举起时的偏移 |
| `text.nea.holdUpCameraOffset.tooltip` | 修改在摄像头模式下举起物品时手臂向两侧的偏移量 | 在镜头模式下举起物品时，调整手臂向两侧的偏移量。 |
| `text.nea.enable.holdUpOnlySelf` | 仅玩家 | 仅对自己应用 |
| `text.nea.ladderAnimationAmplifier` | 爬梯手臂放大 | 爬梯手臂摆动幅度 |

## 验证

JSON、当前版本键与占位符检查通过。上游取最新主分支中文，未穷尽其他分支和历史PR。仅语言修改；未穷尽硬编码，未游戏验证、打包、提交或部署。
