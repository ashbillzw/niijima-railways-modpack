# ST016 东方女仆（Touhou Little Maid）

日期：2026-10-17。包内版本：`touhoulittlemaid-1.5.3-forge+mc1.20.1.jar`。

## 结论与来源

**模组自带完整中文，1172/1172标准英文键均有中文对应。不是缺失中文的模组。** 本轮通读1172条中英文，只校对原中文；新增0键，修正已有27键。原作者的中文表达、梗和角色口吻不按英文逐字重写。

核对三个官方固定提交的zh_cn.json，均为1172键，且与本包中文完全一致：
- [1.20分支](https://github.com/TartaricAcid/TouhouLittleMaid/tree/8a3ac5e9eacf0c6d63adf8832949f3ce81484fe6)
- [1.21分支](https://github.com/TartaricAcid/TouhouLittleMaid/tree/207647c85740b1d0971de6040d6dd57cea62528c)
- [l10n_1.20翻译分支](https://github.com/TartaricAcid/TouhouLittleMaid/tree/96c8e610a2d2d7e56fe1fd8d62d412bb945916b1)

## 本轮明确修正

密钥、语音合成／识别、Blockbench、赘述、偷的、抵御等错字或漏字；远程攻击不应写成范围攻击；权重不能直接写成概率；两条物品配置说明补回注册名与#标签输入格式。手册同一资源的Power值／Power道具统一为主界面已有P点，保留链接和格式。

ItemKappaCompass当前字节码确认：`maid_dimension_check`比较女仆维度，`diff_dimension`比较玩家维度。后者原中文复制了前者，现改为“你当前所处的维度”，不改前者。

## 用户追问与保留项

曾询问英文梗标题风格，用户指出作者为中国人并询问是否自带中文；已澄清完整中文的事实。**这不是用户选择了某项风格，不记为全局英文梗偏好。** Good Apple、Construction Complete、Cosplay及三条Never Gonna…标题本来就在zh_cn.json中，保留原作者选择；无需让用户为本项重选。品牌、署名、URL和格式模板也不以“不含汉字”认定缺译。

## 潜在问题与后续验证

- “椅子／坐垫”、女仆妖精／妖精女仆以及Home模式保留作者用语，是否属于统一显示对象需结合模型与旧版本沿革再判断。
- 热门搜索提示中的“纳希坦”与英文Nahida、极速附魔倍数、史莱姆进度是否同时计入岩浆怪，需进一步对照实际数据和代码，不只凭英文改写。
- 野餐篮说明写到野餐垫、手册局部省略说明、祭坛取物是否需要潜行等记录为上下文复核项；未将英文当作绝对正确原文。
- 语音／命令颜色代码中英存在差异，本轮保持原中文格式；不机械套用英文配色。
- 已检查标准语言内嵌的Patchouli手册文案；独立模型包、第三方声音包、全类硬编码及游戏界面仍未全面验收。翻译PR完整历史未查完。

## 十条代表性实际修正

| 原中文 | 已应用 |
| --- | --- |
| 没有可用的语言合成（TTS）站点，请检查是否配置了相关站点 | 没有可用的语音合成（TTS）站点，请检查是否配置了相关站点 |
| 秘钥（Secret Key） | 密钥（Secret Key） |
| 这本书真不是偷得啦 | 这本书真不是偷的啦 |
| 让女仆能够抵药水伤害。 | 让女仆能够抵御药水伤害。 |
| 记录的维度与当前女仆所处的维度不相同 | 记录的维度与你当前所处的维度不相同 |
| 图片表情包的会被选择的几率 | 图片表情包被选中的权重 |
| 女仆范围攻击模式忽略实体 | 女仆远程攻击忽略实体 |
| 这个物品可以右击女仆进行驯服 | 用于右击驯服女仆的物品。<br>直接填写物品注册名，或以#开头填写物品标签。 |
| 制作一个自定义模型包非常简单，你只需要Blockbech。Blockbench是一个免费开源的软件，而且非常易于上手。$(br2)自定义模型也支持基岩版动画，并且提供了大量molang参数可用。 | 制作一个自定义模型包非常简单，你只需要Blockbench。Blockbench是一个免费开源的软件，而且非常易于上手。$(br2)自定义模型也支持基岩版动画，并且提供了大量molang参数可用。 |
| Power道具 | P点 |

## 全部修改

| 键 | 原中文 | 已应用 |
| --- | --- | --- |
| `ai.touhou_little_maid.chat.tts.empty` | 没有可用的语言合成（TTS）站点，请检查是否配置了相关站点 | 没有可用的语音合成（TTS）站点，请检查是否配置了相关站点 |
| `ai.touhou_little_maid.chat.stt.empty` | 没有可用的语言识别（STT）站点，请检查是否配置了相关站点 | 没有可用的语音识别（STT）站点，请检查是否配置了相关站点 |
| `ai.touhou_little_maid.chat.settings.hub.site.tts` | 语言合成（TTS） | 语音合成（TTS） |
| `ai.touhou_little_maid.chat.settings.hub.secret_id` | 秘钥 Id（Secret ID） | 密钥 Id（Secret ID） |
| `ai.touhou_little_maid.chat.settings.hub.secret_key` | 秘钥（Secret Key） | 密钥（Secret Key） |
| `ai.touhou_little_maid.chat.settings.hub.secret_id_is_empty` | 秘钥 ID 不能为空 | 密钥 ID 不能为空 |
| `ai.touhou_little_maid.chat.settings.hub.secret_key_is_empty` | 秘钥不能为空 | 密钥不能为空 |
| `config.touhou_little_maid.global_ai.stt_microphone` | 语言识别使用的麦克风 | 语音识别使用的麦克风 |
| `patchouli.touhou_little_maid.book.entries.maid.spawn_maid.pages.1.text` | 蛋糕盒右击即可打开，你需要右击三次触发不同的打开阶段，最后蛋糕盒会消失。$(br2)你需要一块蛋糕才能驯服女仆。驯服的物品可在配置文件中进行更改，此处不再累述。$(br2)驯服的女仆和原版宠物行为几乎一致，你可以右击打开她的GUI。 | 蛋糕盒右击即可打开，你需要右击三次触发不同的打开阶段，最后蛋糕盒会消失。$(br2)你需要一块蛋糕才能驯服女仆。驯服的物品可在配置文件中进行更改，此处不再赘述。$(br2)驯服的女仆和原版宠物行为几乎一致，你可以右击打开她的GUI。 |
| `patchouli.touhou_little_maid.book.entries.overview.make_custom_model.pages.0.text` | 制作一个自定义模型包非常简单，你只需要Blockbech。Blockbench是一个免费开源的软件，而且非常易于上手。$(br2)自定义模型也支持基岩版动画，并且提供了大量molang参数可用。 | 制作一个自定义模型包非常简单，你只需要Blockbench。Blockbench是一个免费开源的软件，而且非常易于上手。$(br2)自定义模型也支持基岩版动画，并且提供了大量molang参数可用。 |
| `key.touhou_little_maid.stt_chat.desc` | 女仆AI语言对话 | 女仆AI语音对话 |
| `advancements.touhou_little_maid.challenge.maid_fishing_enchanted_book.title` | 这本书真不是偷得啦 | 这本书真不是偷的啦 |
| `item.touhou_little_maid.magic_protect_bauble.tip` | 让女仆能够抵药水伤害。 | 让女仆能够抵御药水伤害。 |
| `message.touhou_little_maid.kappa_compass.diff_dimension` | 记录的维度与当前女仆所处的维度不相同 | 记录的维度与你当前所处的维度不相同 |
| `config.touhou_little_maid.maid.image_emoji_weight.tooltip` | 图片表情包的会被选择的几率 | 图片表情包被选中的权重 |
| `config.touhou_little_maid.maid.kaomoji_emoji_weight.tooltip` | 颜文字会被选择的几率 | 颜文字被选中的权重 |
| `config.touhou_little_maid.maid.maid_ranged_attack_ignore` | 女仆范围攻击模式忽略实体 | 女仆远程攻击忽略实体 |
| `config.touhou_little_maid.maid.maid_ranged_attack_ignore.tooltip` | 在范围攻击下，应当忽略的实体 | 女仆进行远程攻击时应当忽略的实体 |
| `button.touhou_little_maid.maid.mode.range_attack` | 范围攻击 | 远程攻击 |
| `subtitle.touhou_little_maid.maid.mode.range_attack` | 女仆：范围攻击 | 女仆：远程攻击 |
| `config.touhou_little_maid.maid.maid_tamed_item.tooltip` | 这个物品可以右击女仆进行驯服 | 用于右击驯服女仆的物品。<br>直接填写物品注册名，或以#开头填写物品标签。 |
| `config.touhou_little_maid.maid.maid_temptation_item.tooltip` | 这个物品能够吸引女仆 | 能够吸引女仆的物品。<br>直接填写物品注册名，或以#开头填写物品标签。 |
| `patchouli.touhou_little_maid.book.entries.overview.multiblocks_altar.pages.0.text` | 祭坛是本模组用于合成所必需的多方块结构。$(br2)祭坛的合成表可以通过JEI获取，合成同时还需要玩家的$(l:overview/power_point)Power值$()。 | 祭坛是本模组用于合成所必需的多方块结构。$(br2)祭坛的合成表可以通过JEI获取，合成同时还需要玩家的$(l:overview/power_point)P点$()。 |
| `patchouli.touhou_little_maid.book.entries.overview.multiblocks_altar.pages.3.text` | 你可以右击六个橡木柱子的顶端来放置物品。通过空手Shift右击来移除物品。$(br2)当物品完全放置且玩家的Power值足够，祭坛就能触发合成。$(br2)因为缺少Power而导致的合成中断，在获取足够Power以后，再次右击可以重新触发合成。 | 你可以右击六个橡木柱子的顶端来放置物品。通过空手Shift右击来移除物品。$(br2)当物品完全放置且玩家的P点足够，祭坛就能触发合成。$(br2)因为缺少P点而导致的合成中断，在获取足够P点以后，再次右击可以重新触发合成。 |
| `patchouli.touhou_little_maid.book.entries.overview.power_point.name` | Power道具 | P点 |
| `patchouli.touhou_little_maid.book.entries.overview.power_point.pages.0.text` | Power道具是本模组重要的资源，通过杀死$(l:overview/world_spawn#fairy)女仆妖精$()来获取。$(br2)能够用于$(l:overview/multiblocks_altar)祭坛$()合成。 | P点是本模组重要的资源，通过杀死$(l:overview/world_spawn#fairy)女仆妖精$()来获取。$(br2)能够用于$(l:overview/multiblocks_altar)祭坛$()合成。 |
| `patchouli.touhou_little_maid.book.entries.overview.power_point.pages.1.text` | 当你手持$(l:overview/gohei_and_danmaku)御币$()时，在游戏屏幕的左上角就能看到Power值。$(br2)Power值最大为5，超过此数值不再增长。$(br2)女仆能够拾取P点，并会修复其背包内所有拥有$(5)经验修补$()魔咒的物品。 | 当你手持$(l:overview/gohei_and_danmaku)御币$()时，在游戏屏幕的左上角就能看到P点。$(br2)P点最大为5，超过此数值不再增长。$(br2)女仆能够拾取P点，并会修复其背包内所有拥有$(5)经验修补$()魔咒的物品。 |

验证：JSON解析、改动键与原文核对、格式占位符、§颜色代码及Patchouli链接／格式标签保持检查通过。未启动游戏；未提交或部署。
