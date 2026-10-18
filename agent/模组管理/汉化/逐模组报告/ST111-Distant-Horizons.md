# ST111 Distant Horizons 筛查报告

日期：2026-10-18。DistantHorizons-3.3.3-1.20.1-fabric-forge.jar.disabled。

## 范围与应用

500英文键含本体489及内嵌Fabric共享库11，已有6条中文位于共享库。本体新增485、Fabric注册表同步报错新增5，合计490。保留Distant Horizons、OpenGL、Blaze3D专名及空白分隔项，不把它们视为缺译。已有6中文及其参数正确，未改。

保持JAR的.disabled状态，未启用模组，也未开启任何自动更新、世界生成、LOD渲染或数据压缩选项。语言覆盖本体485键，另有fabric-registry-sync-v0共享5键；不修改模组文件。

## 上游核对

官方主仓库distant-horizons-team/distant-horizons，main 2206fe7a4c496a97641b31c58e126754316d291f。translations.md说明翻译由Crowdin维护；crowdin.yml将资源指向coreSubProjects/core/src/main/resources/assets/distanthorizons/lang，.gitmodules指向jeseibel/distant-horizons-core。实际读取core主分支目录只有en_us.json与en_pt.json，未找到zh_cn／zh_CN；不代表Crowdin没有中文，也没有取得Crowdin译文。新版英文490键与当前本体489键不完全相同，本轮严格以当前JAR为基线自行补译，不按新版键表覆盖。

## 技术核对和已处理源文问题

- disableFrustumCulling的英文末句“Disable this...”与开关名易造成歧义。javap核对当前RenderBufferHandler：布尔值取反后才用于启用剔除，故中文明确写“设为真以关闭视锥剔除”。阴影选项同理。
- blocksToIgnore帮助中的§NONE、§NON_COLLIDING不是有效Minecraft颜色码，改为§6加枚举名，保留§r复位。
- 保留资源ID、CSV英文逗号、配置字段、公式、阈值与警告。数据库安全性等陈述是作者的当前帮助说明，不是本轮新增的可靠性保证。
- CPU最高档保留作者玩笑：“整颗CPU都是我花钱买的”。

## 十项代表译文

- `distanthorizons.general.apiOverride`：API锁定
- `distanthorizons.config.client.qualityPresetSetting`：画质预设
- `distanthorizons.config.client.advanced.graphics.quality.lodChunkRenderDistanceRadius`：LOD渲染半径（区块）
- `distanthorizons.config.client.advanced.graphics.genericRendering.enableMultiLayerClouds`：启用多层云
- `distanthorizons.config.client.advanced.graphics.fog.heightFog.heightFogMixMode`：高度雾混合模式
- `distanthorizons.config.client.advanced.graphics.culling.overdrawPrevention`：避免重复绘制
- `distanthorizons.config.client.advanced.graphics.culling.disableFrustumCulling.@tooltip`：设为假时，不绘制镜头视野之外的LOD，可改善GPU性能。 /  / 设为真时，所有LOD都会绘制，包括镜头后方的LOD，会降低GPU性能。 /  / 如果视野边缘的LOD异常消失，可将此项设为真以关闭视锥剔除。
- `distanthorizons.config.client.advanced.autoUpdater.enableSilentUpdates.@tooltip`：有可用更新时自动更新模组
- `distanthorizons.config.common.lodBuilding.databaseSyncMode`：数据库同步模式
- `distanthorizons.config.enum.EDhApiThreadPreset.I_PAID_FOR_THE_WHOLE_CPU`：5. 整颗CPU都是我花钱买的

## 待游戏复核

需在独立获准的测试环境中检查长帮助文本换行、镜头／阴影剔除选项的交互和服务端反馈。当前是禁用模组，不为验收而擅自启用。代码中的日志、生成警告等硬编码输出未穷尽。

## 验证

490个新增值均对应当前英文键；JSON解析、%s／%d格式参数数量核对通过。唯一§控制码差异为上述源文错误修正。未游戏验证、打包、提交或部署。
