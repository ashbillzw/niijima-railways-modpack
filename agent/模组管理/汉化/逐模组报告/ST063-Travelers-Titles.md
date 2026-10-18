# ST063 Traveler’s Titles 筛查与补译报告

日期：2026-10-18。基线 TravelersTitles-1.20-Forge-4.0.2.jar，标准英文257键、中文235键。全量通读，本轮新增11个标题键，修正90个已有值（含原样英文配置说明）。11个缺失的 `.color` 键是十六进制色值，继续英文回退，不计作待翻译文本，不改色彩。

## 上游参考与适配

官方仓库 https://github.com/YUNG-GANG/Travelers-Titles 。核对1.20分支 `cc74b646f910ebaf9c6298b858d737fd37e77598` 中文235键，1.21.1分支 `0392596cdc0add895d586426524d582cf61cc42b` 中文259键，路径均为 `Common/src/main/resources/assets/travelerstitles/lang/zh_cn.json`。新版补齐了缺失标题和配置译文，本轮适配新版翻译，不引入新版专属键。未穷尽历史PR。

把新版配置前缀 `fabric-1_21` 对应到当前JAR实际保留的 `fabric-1_20`。这些是Forge JAR内附带的Fabric配置文本，翻译存在不代表Forge配置界面一定使用它们。保留现有“文本X轴偏移／文本Y轴偏移／居中标题”等表述；新版“维度黑名单”误复制成生物群系已纠正；最近群系缓存记录的是列表，不仅是数量，已调整说明。

## 明确修正

- 真菌洞穴与花岗岩洞穴的点号别名错位，复用已有斜杠别名译文。
- “只有在天花板下显示生物群落的标题”与英文条件相反，改为有天空光照时显示；“生物群落”统一为已有“生物群系”。
- 维度文本淡出时间原值误写成英文 Text Display Time，改为文本淡出时间。
- Lobby挖矿维度沿用包内已有“挖矿维度”，不另起采矿维度。

## 代表性译文（10项）

| 原文 | 译文 |
|---|---|
| Prisoners’ Quarters | 被囚者的牢房 |
| Insufferable Crypt | 作呕地窖 |
| Eden Ring | 伊甸星环 |
| Otherside | 幽冥 |
| Aether | 天境 |
| Backrooms | 后室 |
| Number of Most Recent Biomes Saved | 最近生物群系记录数量 |
| Only Show Biome Titles When Exposed To Skylight | 仅在有天空光照时显示生物群系标题 |
| Blacklisted Dimensions | 维度黑名单 |
| Dimension Sound Effect Pitch | 维度音效音高 |

## 完整变更

| 键 | 原值 | 应用值 |
|---|---|---|
| `travelerstitles.lobby.fishing_dimension` | Fishing Dimension | 垂钓维度 |
| `travelerstitles.lobby.gaming_dimension` | Gaming Dimension | 游戏维度 |
| `travelerstitles.lobby.lobby_dimension` | Lobby | 大厅 |
| `travelerstitles.lobby.mining_dimension` | Mining Dimension | 挖矿维度 |
| `travelerstitles.lobby.void_dimension` | Void Dimension | 虚空维度 |
| `travelerstitles.minecells.prison` | 缺失 | 被囚者的牢房 |
| `travelerstitles.minecells.insufferable_crypt` | 缺失 | 作呕地窖 |
| `travelerstitles.edenring.edenring` | 缺失 | 伊甸星环 |
| `travelerstitles.deeperdarker.otherside` | 缺失 | 幽冥 |
| `travelerstitles.the_aether.the_aether` | 缺失 | 天境 |
| `travelerstitles.aether.the_aether` | 缺失 | 天境 |
| `travelerstitles.truebackrooms.level_0` | 缺失 | 后室 |
| `travelerstitles.truebackrooms.level_1` | 缺失 | 后室 |
| `travelerstitles.truebackrooms.level_2` | 缺失 | 后室 |
| `travelerstitles.voidz.void` | 缺失 | 虚空 |
| `travelerstitles.atlantis.atlantis` | 缺失 | 亚特兰蒂斯 |
| `text.autoconfig.travelerstitles-fabric-1_20.title` | Traveler's Titles | 旅人标题 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.sound.@Tooltip[1]` | These will only be used if you add custom sounds via a resource pack. | 这些设置仅当你通过资源包添加了自定义音效时才有效。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.sound.@Tooltip[2]` | For information on how to do this, visit the CurseForge page. | 请查看本模组的 CurseForge 页面以获得更多信息。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.textFadeInTime.@Tooltip[0]` | How long the fade-in text effect lasts, in ticks. | 文本淡入特效持续的刻数。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.textFadeInTime.@Tooltip[1]` | 20 ticks = 1 second. | 20 刻 = 1 秒 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.textDisplayTime.@Tooltip[0]` | How long the text displays, in ticks. | 文本显示的刻数。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.textDisplayTime.@Tooltip[1]` | 20 ticks = 1 second. | 20 刻 = 1 秒 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.textFadeOutTime.@Tooltip[0]` | How long the fade-out text effect lasts, in ticks. | 文本淡出特效持续的刻数。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.textFadeOutTime.@Tooltip[1]` | 20 ticks = 1 second. | 20 刻 = 1 秒 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.textCooldownTime.@Tooltip[0]` | The minimum amount of time in ticks that must pass after a biome title | 前一个群系标题展示后，展示下一个群系标题 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.textCooldownTime.@Tooltip[1]` | is displayed before another can be displayed. | 需要间隔的最短时长，单位为游戏刻。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.textCooldownTime.@Tooltip[2]` | Useful for preventing the player from being spammed if they are traveling quickly. | 调整此项以免玩家在多个群系间迅速穿行时被频繁弹出的标题烦扰。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.textCooldownTime.@Tooltip[3]` | 20 ticks = 1 second. | 20 刻 = 1 秒 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.textColor.@Tooltip` | The text's default RGB color. | 文本默认的 RGB 格式颜色。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.textSize.@Tooltip` | The text's scale. | 文本的默认尺寸。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.renderShadow.@Tooltip` | If enabled, will render a shadow below the text making it easier to read. | 启用时会在文本后叠加阴影，以便阅读。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.textYOffset.@Tooltip[0]` | The text's vertical position on the screen. | 文本在屏幕上渲染的纵坐标。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.textYOffset.@Tooltip[1]` | If Horizontally Center Title is enabled, this number is relative to the center of the screen. | 若启用了“居中标题”，则此项坐标轴的原点将位于屏幕正中心。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.textYOffset.@Tooltip[2]` | If Horizontally Center Title is disabled, this number is relative to the top of the screen. | 若禁用了“居中标题”，则此项坐标轴的原点将位于屏幕顶端。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.textXOffset.@Tooltip[0]` | The text's horizontal position on the screen. | 文本在屏幕上渲染的横坐标。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.textXOffset.@Tooltip[1]` | If Horizontally Center Title is enabled, this number is relative to the center of the screen. | 若启用了“居中标题”，则此项坐标轴的原点将位于屏幕正中心。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.textXOffset.@Tooltip[2]` | If Horizontally Center Title is disabled, this number is relative to the left side of the screen. | 若禁用了“居中标题”，则此项坐标轴的原点将位于屏幕左侧。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.biomeBlacklist.@Tooltip[0]` | Biomes that should not have any title displayed when the player enters them. | 玩家进入时不显示任何标题的生物群系列表。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.biomeBlacklist.@Tooltip[1]` | Example: "[minecraft:plains, minecraft:desert]". | 样例：“[minecraft:plains, minecraft:desert]”。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.recentBiomeCacheSize` | Number of Most Recent Biomes Saved | 最近生物群系记录数量 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.recentBiomeCacheSize.@Tooltip[0]` | Traveler's Titles tracks a list of biomes the player most recently visited in order to | 本模组会记录玩家最近造访过的生物群系列表， |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.recentBiomeCacheSize.@Tooltip[1]` | prevent the player from being spammed with titles when they move between the same few biomes. | 以免玩家在其中反复穿行时受频繁弹出的标题烦扰。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.recentBiomeCacheSize.@Tooltip[2]` | This is the size of that list. | 本选项是列表内容的具体数量。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.recentBiomeCacheSize.@Tooltip[3]` | For example, if this value is 5, then your 5 most recent biomes will be saved. | 若此项设为 5，则本模组将会保存玩家最近造访过的 5 个群系。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.centerText.@Tooltip[0]` | Whether or not the biome text should be centered on the screen. | 标题是否在屏幕正中心显示。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.centerText.@Tooltip[1]` | The Text X Offset and Text Y Offset options are relative | 启用此项时，“文本Y轴偏移”和“文本X轴偏移” |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.centerText.@Tooltip[2]` | to the center of the screen if this is enabled. | 的坐标轴原点将设为屏幕正中心。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.resetBiomeCacheOnDimensionChange.@Tooltip[0]` | Traveler's Titles tracks a list of biomes the player most recently visited in order to | 本模组会记录玩家最近造访过的生物群系列表， |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.resetBiomeCacheOnDimensionChange.@Tooltip[1]` | prevent the player from being spammed with titles when they move between the same few biomes. | 以免玩家在其中反复穿行时受频繁弹出的标题烦扰。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.resetBiomeCacheOnDimensionChange.@Tooltip[2]` | This option determines whether or not that list should be cleared every time | 本选项用于控制玩家穿越不同维度时 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.resetBiomeCacheOnDimensionChange.@Tooltip[3]` | the player changes dimensions. | 是否清空列表。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.onlyUpdateAtSurface.@Tooltip[0]` | If enabled, dimensions without ceilings (like the Overworld) will only | 启用后，在没有维度顶棚的维度（如主世界）中， |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.onlyUpdateAtSurface.@Tooltip[1]` | display biome titles when the player is exposed to the skylight. | 仅在玩家受到天空光照时显示生物群系标题。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.onlyUpdateAtSurface.@Tooltip[2]` | This prevents biome titles from showing while the player is underground. | 即玩家在地下洞穴中穿行时不会显示群系标题。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.textFadeInTime` | Text Fade-In Time | 文本淡入时间 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.textFadeInTime.@Tooltip[0]` | How long the fade-in text effect lasts, in ticks. | 文本淡入特效持续的刻数。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.textFadeInTime.@Tooltip[1]` | 20 ticks = 1 second. | 20 刻 = 1 秒 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.textDisplayTime` | Text Display Time | 文本显示时间 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.textDisplayTime.@Tooltip[0]` | How long the text displays, in ticks. | 文本显示的刻数。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.textDisplayTime.@Tooltip[1]` | 20 ticks = 1 second. | 20 刻 = 1 秒 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.textFadeOutTime` | Text Display Time | 文本淡出时间 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.textFadeOutTime.@Tooltip[0]` | How long the fade-out text effect lasts, in ticks. | 文本淡出特效持续的刻数。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.textFadeOutTime.@Tooltip[1]` | 20 ticks = 1 second. | 20 刻 = 1 秒 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.textColor` | Text Color | 文本颜色 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.textColor.@Tooltip` | The text's default RGB color. | 文本默认的 RGB 格式颜色。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.textSize` | Text Size | 文本大小 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.textSize.@Tooltip` | The text's scale. | 文本的默认尺寸。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.renderShadow` | Display Text Shadow | 显示文字阴影 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.renderShadow.@Tooltip` | If enabled, will render a shadow below the text making it easier to read. | 启用时会在文本后叠加阴影，以便阅读。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.textYOffset` | Text Y Offset | 文本Y轴偏移 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.textYOffset.@Tooltip[0]` | The text's vertical position on the screen. | 文本在屏幕上渲染的纵坐标。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.textYOffset.@Tooltip[1]` | If Horizontally Center Title is enabled, this number is relative to the center of the screen. | 若启用了“居中标题”，则此项坐标轴的原点将位于屏幕正中心。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.textYOffset.@Tooltip[2]` | If Horizontally Center Title is disabled, this number is relative to the top of the screen. | 若禁用了“居中标题”，则此项坐标轴的原点将位于屏幕顶端。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.textXOffset` | Text X Offset | 文本X轴偏移 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.textXOffset.@Tooltip[0]` | The text's horizontal position on the screen. | 文本在屏幕上渲染的横坐标。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.textXOffset.@Tooltip[1]` | If Horizontally Center Title is enabled, this number is relative to the center of the screen. | 若启用了“居中标题”，则此项坐标轴的原点将位于屏幕正中心。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.textXOffset.@Tooltip[2]` | If Horizontally Center Title is disabled, this number is relative to the left side of the screen. | 若禁用了“居中标题”，则此项坐标轴的原点将位于屏幕左侧。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.dimensionBlacklist` | Blacklisted Dimensions | 维度黑名单 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.dimensionBlacklist.@Tooltip[0]` | Dimensions that should not have any title displayed when the player enters them. | 玩家进入时不显示任何标题的维度列表。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.dimensionBlacklist.@Tooltip[1]` | Example: "[minecraft:overworld, minecraft:the_nether]" | 样例：“[minecraft:overworld, minecraft:the_nether]”。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.centerText` | Center Title | 居中标题 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.centerText.@Tooltip[0]` | Whether or not the dimension text should be centered on the screen. | 标题是否在屏幕正中心显示。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.centerText.@Tooltip[1]` | The Text X Offset and Text Y Offset options are relative | 启用此项时，“文本Y轴偏移”和“文本X轴偏移” |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.centerText.@Tooltip[2]` | to the center of the screen if this is enabled. | 的坐标轴原点将设为屏幕正中心。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.onlyUpdateAtSurface` | Only Show Dimension Titles When Exposed To Skylight | 仅在有天空光照时显示维度标题 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.onlyUpdateAtSurface.@Tooltip[0]` | If enabled, dimensions without ceilings (like the Overworld) will only | 启用后，在没有维度顶棚的维度（如主世界）中， |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.onlyUpdateAtSurface.@Tooltip[1]` | display dimension titles when the player is exposed to the skylight. | 仅在玩家受到天空光照时显示维度标题。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.dimensions.onlyUpdateAtSurface.@Tooltip[2]` | This prevents dimension titles from showing while the player is underground. | 即玩家在地下洞穴中穿行时不会显示维度标题。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.sound.biomeVolume` | Biome Sound Effect Volume | 群系音效音量 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.sound.biomeVolume.@Tooltip` | The volume of the sound that plays when a biome title displays. | 展示群系标题时的音效音量大小。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.sound.biomePitch` | Biome Sound Effect Pitch | 群系音效音高 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.sound.biomePitch.@Tooltip` | The pitch of the sound that plays when a biome title displays. | 展示群系标题时的音效音高大小。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.sound.dimensionVolume` | Dimension Sound Effect Volume | 维度音效音量 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.sound.dimensionVolume.@Tooltip` | The volume of the sound that plays when a dimension title displays. | 展示维度标题时的音效音量大小。 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.sound.dimensionPitch` | Dimension Sound Effect Pitch | 维度音效音高 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.sound.dimensionPitch.@Tooltip` | The pitch of the sound that plays when a dimension title displays. | 展示维度标题时的音效音高大小。 |
| `biome.terralith.cave.fungal_caves` | 花岗岩洞穴 | 真菌洞穴 |
| `biome.terralith.cave.granite_caves` | 受感染的洞穴 | 花岗岩洞穴 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.onlyUpdateAtSurface` | 只有在天花板下显示生物群落的标题 | 仅在有天空光照时显示生物群系标题 |
| `text.autoconfig.travelerstitles-fabric-1_20.option.biomes.resetBiomeCacheOnDimensionChange` | 改变维度时重置生物群落缓存 | 改变维度时重置生物群系缓存 |

## 保留与验证

保留Terralith原有文艺化地名；Mountain Steppe“山地斜坡”、Alpine“阿尔卑斯”等列为需对照地形／Terralith官方译名的候选，未机械替换。全量合成后非颜色的标准英文键均有中文；JSON和占位符静态检查通过。未验证硬编码全量覆盖，未游戏验证、打包、提交或部署。覆盖文件：`pack/overrides/kubejs/assets/travelerstitles/lang/zh_cn.json`。
