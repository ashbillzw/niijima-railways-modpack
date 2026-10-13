# YSM统计（旧 服务端配置差异）

## 备注

2026-10-13 按用户要求更名。顶部维护现有 YSM 统计与待购买表，下方保留原服务端配置差异、维护规则和历史记录。

记录日期：2026-10-05，目录结构更新于 2026-10-07。主服独立配置保存在 `server/create-cn/`，创造服独立配置保存在 `server/train-cn/`。以下路径均相对于展开后的各服目录。本文不表示改动已经部署到远端。

2026-10-07 起，KubeJS、YSM 共同内容改由 `server/shared/` 中内容为 `__master__` 的 `.ablink` 引用 master 分支客户端包；月村手毬额外模型保存于 shared。两服共同模组放入 `shared/mods/`，差异留在各服 `mods/`，以 `文件名.ablink` 保存下载直链或直接保留 JAR；更新器不解析包索引。`server/create-cn/`、`server/train-cn/` 不再是完整可直接部署的副本。结构、删除范围与使用方式见 [服务端更新器](服务端更新器.md)。以下早期同步记录描述展开后的内容，不代表未合并到 master 的包内容已经可供线上引用。

目录布局按实际实例相对路径整理：配置放在 `config/`，模组放在 `mods/`，原 `kjs/` 已更名为 `kubejs/`，YSM 模型保留在 `config/yes_steve_model/custom/`。根据用户导入的 `server.properties`，主服 `level-name=create-cn_world`，创造服 `level-name=train-cn_world`；配置已分别放入 `create-cn_world/serverconfig/` 与 `train-cn_world/serverconfig/`。下文简写的 `serverconfig/` 均指对应存档中的目录。只纳入这些配置，不包含世界运行数据。

## 现有 YSM 角色与模型（按作品系列，2026-10-13 核对）

以当前本地分发源为准：包内 `pack/overrides/config/yes_steve_model/custom/` 共 **42 个资源文件**，均未停用；停用的 J-10 已于 2026-10-13 移出包外备份。服务器共享层另有月村手毬 1 个文件。将当前包内容与共享层合并后，每服预期 43 个资源文件，均未停用。ZIP 合集按一个资源文件计数，不能将文件数直接当作角色数。这里未检查线上实例，也不表示 `__master__` 已包含当前开发分支资源。

| 作品／系列 | 现有角色或模型 | 资源文件 | 范围／备注 |
| --- | --- | --- | --- |
| 赛马娘 Pretty Derby | 爱丽速子、北部玄驹、黄金船、无声铃鹿、里见光钻、春乌拉拉、重炮 | `アグネスタキオン.ysm`、`キタサンブラック.ysm`、`ゴールドシップ.zip`、`サイレンススズカ.ysm`、`サトノダイヤモンド.ysm`、`ハルウララ.ysm`、`マヤノトップガン.ysm` | 包内共用，7 个文件 |
| 偶像大师／学园偶像大师 | 藤田琴音、篠泽广、月村手毬 | `藤田ことね.ysm`、`篠澤広.ysm`；`tsukimura_temari.ysm` | 前两项包内共用；月村手毬仅在 `server/shared/config/yes_steve_model/custom/`。默认模型为 `藤田ことね.ysm`，材质 `ktn` |
| 偶像大师／闪耀色彩 | 樋口圆香 | `樋口円香.zip` | 包内共用 |
| BanG Dream!／Ave Mujica | 三角初华 | `三角初華.ysm` | 包内共用 |
| BanG Dream!／梦限大 MewType | 千石由乃、藤都子 | `千石ユノ.ysm`、`藤都子.ysm` | 包内共用；2026-10-02 用户已确认角色出处 |
| Love Live! Sunshine!!／Aqours | 渡边曜 | `渡辺曜.zip` | 包内共用；既有包内元数据记录为 HAPPY PARTY TRAIN 服装 |
| 孤独摇滚！ | 后藤一里 | `後藤ひとり.ysm` | 包内共用 |
| 东方 Project | 芙兰朵露·斯卡蕾特、古明地恋 | `フランドール・スカーレット.ysm`、`古明地こいし.ysm` | 包内共用 |
| 蔚蓝档案 | 霞泽美游 | `霞沢ミユ.ysm` | 包内共用；模型作者：伊洛是哥斯拉嘛_Gesila；动画修改：星屑海螺。视频文案已更正为 `霞沢ミユ` |
| 舰队 Collection | 雪风 | `雪風.ysm` | 包内共用 |
| 千恋＊万花 | 丛雨 | `ムラサメ.ysm` | 包内共用；沿用已应用的命名确认记录 |
| Alice in Cradle | 诺艾儿·科尔涅尔 | `ノエル・コルネール.ysm` | 包内共用；重复的旧版已移出，保留现有指定版本 |
| 犹格索托斯的庭院 | 特莉波卡 | `特莉波卡.ysm` | 包内共用；沿用确认的中文名 |
| 光之美少女／名探偵プリキュア！ | 森亚露露卡（森亜るるか） | `森亜るるか.ysm` | 包内共用；角色所属作品经东映官方剧情页核对，具体模型造型未另行验收 |
| 虚拟歌手／初音未来 | 初音未来 | `初音ミク.ysm` | 包内共用 |
| 虚拟歌手／洛天依 | 洛天依 | `洛天依.ysm` | 包内共用；旧记录为“世末系列”造型 |
| 虚拟歌手／重音 Teto | 重音 Teto | `重音テト.ysm` | 包内共用；旧记录归入 UTAU，不据文件名推定具体音源或服装版本 |
| hololive | 凑阿库娅 | `湊あくあ.ysm` | 包内共用 |
| Helltaker | Cerberus（三头犬） | `Helltaker_Cerberus.zip` | 包内共用；沿用命名确认记录 |
| HELLDIVERS | 绝地潜兵士兵外观 | `Helldivers.ysm` | 包内共用；未指定具名角色或装备款式 |
| 哆啦A梦／哆啦A梦七小子 | Doraemons 多角色合集 | `群友自制_Doraemons.zip` | 包内共用；群友自制。旧清点记录为 ZIP 内含 8 个 YSM，不等于 8 个不同角色 |
| 生物进化系列 | 小螈、幻嬷嬷、悦米粒、骨骨、魂乐乐、鱿鱿 | `生物进化系列_小螈.ysm`、`生物进化系列_幻嬷嬷.ysm`、`生物进化系列_悦米粒.ysm`、`生物进化系列_骨骨.ysm`、`生物进化系列_魂乐乐.ysm`、`生物进化系列_鱿鱿.ysm` | 包内共用，6 个文件；保留既有系列名 |
| 小猫女仆／出处待补充 | 村村 fumo | `小猫女仆_村村_fumo.ysm` | 包内共用；现有记录未确认所属作品，不强行归类 |
| 机械与 Minecraft 主题模型 | 动力臂、烈焰人燃烧室、群友蒸汽机车头 | `动力臂.ysm`、`烈焰人燃烧室.ysm`、`群友自制_蒸汽机车头.zip` | 包内共用；主题分类，不视作同一作品系列 |
| 现实载具／军事 | OTO Melara R3、J-20S | `OTO_Melara_R3.ysm`、`J-20S.ysm` | 均启用；停用的 J-10 已移出包外备份 |

## YSM 待购买表（2026-10-13）

购买流程已开始准备；原始下载文件接收目录为独立工作目录下的 `D:\mydata\Agents\Minecraft相关\本地资源\YSM模型\待导入\原始文件\`。2026-10-13 按用户澄清从仓库 `agent/` 移出，原有素材与只读参考目录保持原状。用户自行通过 B 站工房购买下载，保留原文件名，ZIP 无需提前解压；agent 在用户通知后检查角色、作者说明及哈希，并更新本表的购买、接收、导入与测试状态。接收不等于入包或部署，目前尚未确认任何一项已购买。

作者分组：**伊洛是哥斯拉吗**（用户原称；已核对其投稿账号写作“伊洛是哥斯拉嘛”，现有美游模型内署名为“伊洛是哥斯拉嘛_Gesila”）。以下按用户提供的清单登记，未购买、未导入；带问号的条目仍为待确认候选。价格按用户 2026-10-13 提供的报价登记，单位沿用 r；在售状态和组合包所含模型尚未核对。

| 编号 | 作品／系列 | 待购买项目 | 价格（r） | 状态／备注 |
| --- | --- | --- | --- | --- |
| 1 | Minecraft 生物拟人 | 凋零娘 | 70 | 待购买；价格由用户于 2026-10-13 提供 |
| 2 | Minecraft 生物拟人 | 坚守者娘 | 40 | 待购买；价格由用户于 2026-10-13 提供 |
| 3 | Minecraft 生物拟人 | 远古守卫者娘 | 30 | 待购买；价格由用户于 2026-10-13 提供 |
| 4 | Minecraft 生物拟人 | 末影龙娘 | 45 | 待购买；价格由用户于 2026-10-13 提供 |
| 5 | maimai／舞萌・天界地区 | 百合咲ミカ（百合咲美香） | 36 | 待购买；价格由用户于 2026-10-13 提供；日语：ゆりさき ミカ，Yurisaki Mika |
| 6 | 作品待核实 | 菲琳 | 15 | 待购买；价格由用户于 2026-10-13 提供 |
| 7 | hololive | 古拉 | 2 | 待购买；价格由用户于 2026-10-13 提供 |
| 8 | 魔法少女的魔女审判 | 二阶堂希罗 | 0.5 | 待购买；价格由用户于 2026-10-13 提供 |
| 9 | 魔法少女的魔女审判 | 橘雪莉 | 0.5 | 待购买；用户 2026-10-13 报价；作者归属待核，见下方 |
| 10 | 魔法少女的魔女审判 | 樱羽艾玛 | 0.5 | 待购买；用户 2026-10-13 更正报价，并非完全免费 |
| 11 | 牧场一家系列 | 牧场一家系列 | 33 | 待购买；价格由用户于 2026-10-13 提供 |
| 12 | 超辉夜姬（用户补充） | 超辉夜姬组合包 | 0.5 | 待购买；用户 2026-10-13 补充报价；此前未定位入口，包内角色待核 |
| 13 | Girls Band Cry（GBC） | 小智 | 15 | 待购买；价格由用户于 2026-10-13 提供 |
| 14 | Girls Band Cry（GBC） | 安和卯（原记 486） | 15 | 待购买；价格由用户于 2026-10-13 提供 |
| 15 | 作品待核实 | 诗歌剧 | 20 | 待购买；价格由用户于 2026-10-13 提供 |
| 16 | 蔚蓝档案 | 小鸟游星野 | 78 | 待购买；价格由用户于 2026-10-13 提供 |
| 17 | 蔚蓝档案 | 小春（原记“下头小春”） | 25 | 待购买；价格由用户于 2026-10-13 提供 |
| 18 | 蔚蓝档案 | 伊吕波 | 20 | 待购买；价格由用户于 2026-10-13 提供 |
| 19 | 蔚蓝档案 | 铁道双子 | 35 | 待购买；价格由用户于 2026-10-13 提供 |
| 20 | 蔚蓝档案 | 伊洛玛丽 | 15 | 待购买；价格由用户于 2026-10-13 提供 |
| 21 | 蔚蓝档案 | 圣园未花（聖園ミカ） | 13 | 待购买；用户 2026-10-13 报价；CV：东山奈央 |
| 22 | 蔚蓝档案 | 杏山和纱 | 15 | 待购买；用户 2026-10-13 报价 |
| 23 | Minecraft | 苦力怕 | 12 | 待购买；用户 2026-10-13 报价，具体造型待核 |
| 24 | 蔚蓝档案 | 笑面教授（ニヤニヤ教授／niyaniya教授） | 0.5 | 待购买；用户 2026-10-13 补充角色身份，作品归属已核对；报价 0.5 r |
| 25 | Neuro-sama | Neuro-sama | 0.5 | 待购买；用户 2026-10-13 报价 |

现有 25 项候选，用户已全部报价，合计 537 r。伊吹不是单独模型，按用户 2026-10-13 指示移出待购买表。价格登记不代表已购买。

百合咲的查证依据：作者本人发布的 [《MC×舞萌：可以 cos 百合咲ミカ赛博出勤的模型？》](https://www.bilibili.com/video/BV1PeqpYzEDr/) 明确给出角色名和舞萌 DX，并说明模型与“完全凍結ALL”合作完成；[SEGA 官方天界地区页面](https://maimai.sega.jp/area/heaven/) 列有该角色。日语读音参考 [CHUNITHM 社区角色资料](https://wikiwiki.jp/chunithmwiki/%E7%99%BE%E5%90%88%E5%92%B2%E3%83%9F%E3%82%AB)。

### 魔女审判模型检索（2026-10-13）

按[游戏官网](https://manosaba.com/)的主角群口径，共 **13 名魔女候补少女**；不等于全作只有 13 个登场人物。中文名单按[官方中文角色 PV 合集](https://www.bilibili.com/video/BV1PYTDzEEcR/)：樱羽艾玛、二阶堂希罗、夏目安安、莲见蕾雅、城崎诺亚、冰上梅露露、宝生玛格、黑部奈叶香、紫藤亚里沙、橘雪莉、远野汉娜、佐伯米莉亚、泽渡可可。此处不涉及剧情身份剧透。

本次公开检索确认两个独立投稿，另发现一个作者合集线索；不能据此宣称是作者完整目录，也不代表已取得模型。

| 角色 | 伊洛是哥斯拉嘛的 YSM 证据 | 当前处理 |
| --- | --- | --- |
| 二阶堂希罗 | 作者独立投稿：[魔审 YSM 模型发布](https://www.bilibili.com/video/BV1r8SjB6EeT/)，2025-11-28 | 已在待购买表，用户报价 0.5 r |
| 樱羽艾玛 | 作者独立投稿：[YSM 模型发布](https://www.bilibili.com/video/BV1oMWvzTEtn/)，2025-10-16；历史说明称免费模型，可经爱发电或小店获取 | 用户 2026-10-13 更正实际报价为 0.5 r，并非完全免费；当前价格以用户反馈为准 |
| 远野汉娜 | 作者[作品合集所在视频页](https://www.bilibili.com/video/BV1EHDSYzErF/)的公开索引列有《[魔审YSM模型]远野汉娜——发布》 | 找到发布线索，尚未取得独立投稿／商品链接及价格；未擅自加入待购买表 |
| 橘雪莉 | 本次未找到伊洛版本的可靠发布证据；找到[终焉机动喵的投稿](https://www.bilibili.com/video/BV1LMHCzpE4E/)及[墨染逝羽／Arekya 的免费配布](https://ifdian.net/album/9ddce310fbc411ed9a6e52540025c377) | 保留用户候选，但作者归属待核；不能把其他作者作品记在伊洛名下 |
| 其余 9 名魔女候补 | 本次未找到可核实的该作者发布证据 | 未检索到不等于不存在，不自动列入购买计划 |

### 东山奈央角色核对（2026-10-13）

现有模型中的 **森亜るるか**（[东映官方配音表](https://www.toei-anim.co.jp/tv/precure/about/)）与待购买的 **圣园未花／聖園ミカ**（[Yostar Pictures 官方 PV 制作信息](https://yostar-pictures.co.jp/news/detail/3035/)）均由东山奈央配音。按“已有＋待购买”口径，至少有这两位；未花尚未购买／入包，不将它写成已有模型。本条不表示已完整审计全部模型的声优。

## 现有统计的分类依据与维护

- 2026-10-13 只读核对 `霞沢ミユ.ysm` 内 `main.json` 的 `minecraft:geometry[0].description.ysm_extra_info`：`authors` 为“模型作者:伊洛是哥斯拉嘛_Gesila”和“动画修改:星屑海螺”，`license` 声明为 `CC BY-NC-SA 4.0`，`tips` 注明免费分享、请勿商用。文件 SHA-256 为 `c67a48b994e7be09afd01752d04bbab7b9d7b6c3b54965fde520386cc41504f4`，检查未修改模型。此前 [1.6 更新视频文案](1.6更新视频-change-list.md) 第 7 节“可选展示”的误写已同步更正。
- 当前文件与启停状态直接核对包内目录和 `server/shared/`；不包含仓库外备份、待导入及已移除模型。维护时按实际文件重算数量。
- 角色出处和命名沿用 2026-10-02 本机 `本地资源/YSM模型/命名整理-2026-10-02/outputs/ysm-review/已应用原名对照.json`、`补入记录.json` 及同目录上两级的 `待办.md`。早期 CSV 中的“待确认”状态由后续已应用记录与用户确认更新；旧待办中“J-20S 不导入”已由 2026-10-05 恢复启用决定替代。当前清单与关键差异已完整收录在本表，未来无需依赖本机文件才能接手。
- 森亜るるか的作品归属见 [东映官方第 15 集剧情页](https://www.toei-anim.co.jp/tv/precure/episode/15/)；梦限大角色参考 [武士道官方资料](https://bushiroad.co.jp/media/afa78959fa824001)；丛雨参考 [柚子社官方角色曲视频](https://www.youtube.com/watch?v=oPZsyVc7l58)。这些来源支持角色归属，不代替模型文件的外观验收。
- 共用模型维护入口、服务器额外模型保留及线上删除要求仍按下文执行；分类整理未修改模型内容；随后按用户要求移出停用的 J-10，见下方记录，未执行线上部署。

### 2026-10-13：停用 J-10 移出包外备份

- 按用户要求，将包内唯一停用的 YSM 文件 `pack/overrides/config/yes_steve_model/custom/J-10.ysm.disabled` 移至 `D:\mydata\Agents\Minecraft相关\本地资源\YSM模型\停用模型备份-2026-10-13\J-10.ysm.disabled`，保留原文件名和内容。
- 文件大小 402131 字节；移动前后 SHA-256 一致：`2a9fd99ff694bfa50bc9fdf67e1aaf3871f2338fd2f7fe18a0297ea3380522f5`。包内源文件已不存在，剩余 42 个资源文件。
- 服务器共享层没有独立的 J-10 副本；后续更新器须使用已包含本次移除的引用分支，重建模型目录后不再分发 J-10。线上尚未执行，旧记录中的“J-10 保持停用”不再表示继续携带该文件。
- 本次未重新打包，已有 ZIP 产物不视为已更新；未 commit、未部署。

## 2026-10-12：用户提供的服务器快照与包内 KJS 对比

### common.properties 默认值复核（2026-10-12，后续补充）

直接从主服快照的 `mods/kubejs-forge-2001.6.5-build.16.jar` 提取 `CommonProperties.class`，使用 javap 只读检查构造方法及 save 方法，没有运行模组。确认下节列出的全部 11 项都等于该版本内置默认值；文件缺失时使用默认值并保存生成 common.properties。

结论：这份文件没有需要保留的自定义设置，当前无需复制到包或 shared；同版本下可以让 KubeJS 重新生成。未来修改这些值或升级 KubeJS 时重新评估。本次未删除快照文件，也未执行部署。

> 下节“尚未核实默认值”和“部署前仍需确认是否纳管”的判断已由本次实际 JAR 检查更新，不再作为当前阻塞项；原比较记录保留。


范围：本机 `C:\mydata\Agents\Codex-CreateTrainResync\远端快照20261010\create-cn\kubejs`、同级 `train-cn\kubejs`，对比本仓库 `pack/overrides/kubejs`（agent-dev-1.6 工作区）。目录名表示用户保存的快照批次；未访问服务器，不据此认定线上实时状态。未改动快照、脚本或配置。

| 对比 | 文件数 | 字节相同 | 仅换行不同 | 其他差异 |
| --- | --- | --- | --- | --- |
| 包 → 主服快照 | 76 → 79 | 69 | 7 | 主服多 3 个文件，共有文件无内容差异 |
| 包 → 创造服快照 | 76 → 79 | 69 | 7 | 创造服多同样 3 个文件，共有文件无内容差异 |
| 主服 → 创造服快照 | 79 → 79 | 78 | 0 | common.properties 仅时间注释不同 |

比较遍历全部文件（含隐藏文件），按大小写敏感的相对路径匹配，以 SHA-256 比较字节；文本差异只归一化 CRLF/CR/LF，不忽略其他空白。包内没有两服缺失的文件。

两服共有但包内没有的文件：

- `README.txt`：目录使用说明，两服字节相同。
- `startup_scripts/example.js`：仅调用 `console.info('Hello, World! (Loaded startup scripts)')`，两服字节相同。
- `config/common.properties`：两服 11 项配置值相同，仅生成时间注释不同（主服 `Sat Nov 01 03:28:45 UTC 2025`，创造服 `Sat Nov 01 04:25:13 UTC 2025`）。配置值为 allowAsyncStreams=true、announceReload=true、creativeModeTabIcon=minecraft:purple_dye、hideServerScriptErrors=false、ignoreCustomUniqueRecipeIds=false、matchJsonRecipes=true、packmode=空、saveDevPropertiesInConfig=false、serverOnly=false、startupErrorGUI=true、startupErrorReportUrl=空。没有将这些值推定为当前版本默认值。

包与每份快照仅换行不同的 7 个路径：

- `data/copycats/recipes/crafting/copycat_vertical_stairs_from_conversion.json`
- `data/ftbchunks/tags/entity_types/entity_interact_whitelist.json`
- `data/oei/replacements/iron_copper_wires.json`
- `data/oei/replacements/iron_rod.json`
- `data/oei/replacements/zinc_sheet.json`
- `server_scripts/delete_duplicate_tomato_seed_recipe.js`
- `server_scripts/path_from_other_dirts.js`

结论：共用脚本与资源内容一致，整个 kubejs 目录并非完全一致。无需从这份快照补回缺失的业务脚本；部署时仍需明确是否纳管 common.properties，不能仅凭本次比较断言删除后生成的配置完全相同。当前 shared/kubejs.ablink 为 `__master__`，两服差异层无 KJS 覆盖；本次比较的是本地包，不是远端 master 展开结果，未执行更新器。

> **旧记录适用范围更新：** 下方历史“三处各 76 个文件”和“5 个换行差异”描述的是此前仓库整理副本，不代表本次用户提供的真实服务器快照。针对本批快照，以本节 76/79/79 及 7 个换行差异为准，旧记录保留。

## 一、目录结构与构建范围

`server/` 保存共享层、两服差异层和删除表，由 `updater/update.py` 下载、展开后部署；脚本已实现，实际服务器副本验证及上线仍待完成。仓库根目录 `build.bat` 只将 `pack/` 打包为 `output/pack.zip`，不会执行服务端更新器。

```text
pack/overrides/                     共用 KJS／YSM 的维护入口
server/
  delete.json                      更新器删除表
  shared/
    kubejs.ablink                  引用 master 的包内 KJS
    config/yes_steve_model.ablink   引用 master 的包内 YSM
    config/yes_steve_model/custom/tsukimura_temari.ysm
    mods/                          共同模组引用或实际 JAR
  create-cn/                       主服差异层（config、mods、server.properties）
    create-cn_world/serverconfig/  主服现有世界配置
  train-cn/                        创造服差异层（config、mods、server.properties）
    train-cn_world/serverconfig/   创造服现有世界配置
updater/update.py                  人工执行的更新器
```

两处 world 目录只收录 `serverconfig/`，不是完整存档。包内 `kubejs/data/` 是受维护的数据包资源。展开顺序、引用和执行要求见 [服务端更新器](服务端更新器.md)。

## 二、同步与验证规则

| 修改对象 | 同一次改动应检查和更新的位置 | 规则 |
| --- | --- | --- |
| 共用 KJS 脚本、配方、标签、语言资源 | `pack/overrides/kubejs/`、`server/shared/kubejs.ablink` 和适用的差异层 | 共用内容在包内维护，核对引用分支及两服展开结果；线上导回内容先比较、合并。新增、删除、重命名均检查部署结果；单服例外明确记录，不恢复三份重复副本。 |
| 共用 YSM 模型与命名 | 包内模型、`server/shared/config/yes_steve_model.ablink`、shared 额外模型及两服默认模型配置 | 同步共有模型的内容、文件名和启停状态；记录旧名称清理。保留已确认的服务器额外模型、跨分支来源与停用差异，不将整个目录强制镜像成包内目录。 |
| 共用实例配置 | `pack/overrides/config/` 与两服的 `config/` | 按配置项同步；先核对有意保留的差异，不用包配置整体覆盖两服配置。 |
| 世界级配置 | 包内适用的 `defaultconfigs/` 与两服各自实际存档下的 `serverconfig/` | 改默认配置不等于更新已有世界。需要统一的配置项必须同时落到两服实际世界目录。 |
| 包服共用模组 | `pack/modrinth.index.json`、适用包内文件、`server/shared/mods/` 和两服差异层 `mods/` | 更新器不解析包索引；更新索引时必须同步服务器下载引用或实际 JAR。按侧别、依赖和确认版本更新适用副本，移除被替换旧版本，核对文件大小与哈希。客户端专用模组不加入服务器；服务器专用模组不因包索引没有记录而删除。 |
| 单服配置或专用模组 | 对应 `server/<服名>/` | 只更新适用实例，同时在本文记录原因。 |

### 本地验证与部署边界（2026-10-10）

- **重构前快照，2026-10-11 标注**：原实查三处 KJS 各 76 个文件，相对路径集合一致，统一 CRLF/LF 后内容一致；主服 96 个启用 JAR，创造服 89 个，两处 world 目录只收录 serverconfig 配置。当前源目录已改为 shared／ablink，不能将此记录理解为仍保有三处完整副本；本地展开核对与待验证边界见更新器文档。
- 每次同步后检查新增、修改、删除、重命名：KJS 核对相对路径和统一换行后的内容，模型与 JAR 核对原始文件哈希。按变更验证配置语法、依赖及游戏功能。
- 线上同步前先取得远端现状并比较、合并有效修改。分别记录本地副本更新、游戏测试、远端部署的完成情况。
- 本次只核查本地结构并整理规则，没有执行远端部署。用户已确认更新模组及 Elytra Slot 和前置没有明显问题，最新测试及发布进度见 [总待办](todo-list.md)。

## 三、已确认与待确认的配置差异

| 配置 | 主服 | 创造服 | 说明 |
| --- | --- | --- | --- |
| `config/create-track-map.json` | 端口 3881；初始下界；位置 (-90, -90)；缩放 2 | 端口 3880；初始主世界；位置 (-300, -500)；缩放 1 | 独立服务与地图视图，保留差异。 |
| `config/simplebackups-common.toml` | 最大 50 GB；排除 `data/DistantHorizons.sqlite` | 最大 25 GB；无上述排除 | 创造服不安装 DH；当前导入的创造服 mods 中也没有 DH。 |
| `serverconfig/auto_restart-server.toml` 的定时重启 | `19:00` | `19:30` | 保留配置中的时间字符串；实际时区由服务器运行环境决定。 |
| `serverconfig/railways-server.toml` 的 `realisticTrains` | `true` | `false` | 主服要求列车燃料，创造服不要求。 |
| `server.properties` 的 `gamemode` | `spectator`（旁观） | `adventure`（冒险） | 有意限制新玩家，避免不认识的玩家加入后立即造成破坏。玩家须先加入讨论群组、联系管理员，由管理员调整对应游戏模式；不要按服务器玩法名称自动改成生存或创造。 |

### 2026-10-05 已统一的设置（保留实施记录）

- WorldEdit `nav-wand-item`：包、主服和创造服均统一为 `minecraft:bedrock`（基岩），用于导航工具的快捷传送，2026-10-05 用户确认。

- 包与两服的锦致装饰 `redstone.spring_launcher.enabled` 均为 `false`；2026-10-05 按用户选择关闭包内弹簧发射器。

- 女仆附属 `ChunksLoadingRadius`：两服均为 `0`。
- 包内 `ChunksLoadingRadius = 8`，两服为 `0`，此包服差异为 intended。服务器设为 0 是出于性能考虑；未来若实现更好的女仆区块加载批量管理工具，再讨论是否调整。不要自动将包内值同步到服务器。
- `config/oei/common.json`：创造服完整采用主服版本。
- 客户端包 OEI 已从 `1.0.6` 回退至两服使用的 `1.0.5.1`，移除独立的 OELib `0.0.5` 索引项。旧版 OEI 内嵌 OELib `0.0.4-beta`，不是完全不依赖该库。版本元数据来自 Modrinth `7pCNymxz/TkHRus8b`；包内 OEI 配置已与主服一致。索引静态检查通过，待游戏验证；历史模组登记表快照尚未同步此回退。
- FTB Chunks `party_limit_mode`：包内 `defaultconfigs/ftbchunks-world.snbt` 与两服均为 `sum`。
- YSM 默认模型：包与两服均为 `藤田ことね.ysm`、材质 `ktn`；两服对应模型文件已按包内名称重命名。
- 生物破坏控制：包与两服共有条目没有取值冲突，均将 `minecraft:enderman` 设为 `FALSE`。两服另外列出 37 个实体条目，全部为 `DEFAULT`；本次保持这些条目，不将条目数量差异当作玩法冲突。
- 自动重启 `low_tps_restart`：两服均开启，`minium_tps_level = 10.0`、`delay = "20s"`。创造服原值为关闭、0 TPS、1 分钟；采用主服完整设置。
- TLM `[vanilla]` 下 `ReplaceSlimeModel`、`ReplaceXPTexture`、`ReplaceTotemTexture`、`ReplaceXPBottleTexture`：两服均为 `false`。重新检查时，主服导入副本为 `true`，创造服和 `pack/overrides` 为 `false`；本次关闭主服副本，未连接远端确认实时状态。

### 保留但尚未认定为 intended 的差异

- 自动重启脚本路径：主服 `/home/ashbill/minecraft-server/create-cn/restart-r2.sh`，创造服 `/home/ashbill/minecraft-server/train-cn/restart-r2.sh`。目前保留，部署前应确认实际实例路径。
- TrainResync 目标统一为 `1.6.0.g`，但用户要求暂不构建，仅记录发布待办。主服暂留 `1.6.0.d`，创造服暂留 `1.6.0.a`，包索引仍为 `1.6.0.e`。
- `packetfixer.properties` 仅生成时间注释不同；WorldEdit 配置也有时间注释差异，不作为部署行为差异。

## 四、部署规则与历史记录

- 本地副本同步不代表线上完成；远端部署状态统一在 [总待办](todo-list.md) 跟踪。
- Git 工作副本与运行实例分开；不对整个 `config` 或存档做不区分管理范围的删除同步，保留运行数据、玩家文件和备份。**已确认的重建例外（2026-10-11 合并复核）**：按 `server/delete.json`，两服均删除并重建 `mods`、`kubejs`、`config/yes_steve_model/custom`。执行前停服并完成整服 snapshot，核对服务器专用模组和额外资源已纳入共享层或差异层；三个目录中的未纳管额外文件也会被删除。更新器先准备好全部所选实例的新文件，再逐路径显示完整目标并询问删除确认；其他路径仅覆盖更新。具体限制及无自动回滚说明见 [服务端更新器](服务端更新器.md)。
- 更新实际存档的 serverconfig；跨分支模型明确固定来源。更新器已实现；修改共用内容需核对包内源、引用分支及两服展开结果，尚未完成下载、真实服务器副本和上线验证。

> 下列 2026-10-05 记录保留操作和来源依据。**“三处实体副本”和“更新脚本尚未实现”已过时（2026-10-11 合并校正）**：现采用 shared／ablink 和已实现的更新器，详见第二节；实际部署验证及上线仍未完成。**涉及三件套总体测试待办的表述已部分过时**：用户在 2026-10-10 确认没有明显问题；远端部署、具体槽位配置与专用服务器验证仍未单独确认。

<details>
<summary>展开共用资源整理及两服模组同步历史</summary>

## 共用内容与部署讨论

- 两服的 `kubejs/` 各有 76 个文件，内容全部相同；目录中的 `data/` 是数据包资源，不是应清理的运行数据。
- YSM 同步前，两服 `config/yes_steve_model/custom/` 各有 44 个文件且完全一致。2026-10-05 已按包内命名重命名 34 个模型，新增 6 个模型、替换烈焰人燃烧室，移出 `sirofetz.ysm`、`Dumrnheint_PWKMKI.ysm`；保留跨分支模型 `tsukimura_temari.ysm`。按用户更正，J-10 在包与两服均保持 `.disabled`；原 `plaaf-j20s.ysm` 恢复并以模型元数据名称 `J-20S.ysm` 同步到三边、保持启用。`AliceinCradle_Noel-Corehl.ysm.old` 和 Crimson、GaloLuise、Maid 三个停用模型均移出两服目录备份。备份位置：`D:\mydata\Agents\Minecraft相关\本地资源\YSM同步前备份-2026-10-05`。远端尚未部署。
- KubeJS 可共用 `pack/overrides/kubejs/`。重新逐项核对确认：包内也是 76 个文件、路径集合相同，以下 5 个文件仅存在换行符差异（服务器 LF，包内 CRLF），统一换行后全部内容一致，没有逻辑差异。当前按两服独立目录保留副本；未来可由打包脚本从共用来源生成：
  - `data/copycats/recipes/crafting/copycat_vertical_stairs_from_conversion.json`
  - `data/ftbchunks/tags/entity_types/entity_interact_whitelist.json`
  - `data/oei/replacements/iron_rod.json`
  - `server_scripts/delete_duplicate_tomato_seed_recipe.js`
  - `server_scripts/path_from_other_dirts.js`
- 更新脚本尚未实现。建议 Git checkout 与运行实例分开；按目标服组合共用文件和差异配置，再同步至实例。
- `serverconfig/` 应部署至该实例实际存档的 `serverconfig/`；不能只更新 `defaultconfigs/`。
- 配置更新只覆盖明确管理的文件，不对实例 `config/` 整体执行删除同步。上次已部署的文件清单可用于识别确实需要删除的旧文件。
- 模组更新应明确旧版本移除策略；运行数据、玩家文件及备份不由 Git 部署清理。
- 跨分支共享模型需要固定来源分支或独立资源来源；同仓库同名目录不会自动跨分支共享。

## 2026-10-05 两服模组同步

- 使用本机 PCL 测试实例已有的 JAR，按当前包索引中的固定版本更新；未下载模组、未追逐更新版本。用于替换的源文件大小及 SHA-1 与索引一致。
- 两服各替换 19 个共用模组，新增 Elytra Slot `6.4.4+1.20.1`、Curios `5.14.1+1.20.1`、Caelus `3.2.0+1.20.1`。OEI 保持 `1.0.5.1`，不新增独立 OELib；JEI 固定为 `15.56.0.205`。
- 主服 DH 从 `2.3.4-b` 更新为 `3.3.3`，保留启用状态（文件后缀为 `.jar`）；创造服不装 DH。这是用户确认的 intended 差异，不能照搬包中的 `.disabled` 状态。
- 主服原有 9 个 `.old` / `.disabled` 文件已移出项目，与被替换的旧 JAR 一起保存在 `D:\mydata\Agents\Minecraft相关\本地资源\两服模组更新前备份-2026-10-05`。
- 两服原有服务端专有模组保持原版本及适用范围；没有添加包内独有的客户端视觉模组。两服当前启用 JAR 数量为主服 96、创造服 89。
- 完整文件级操作清单：`D:\mydata\Agents\Minecraft相关\更新记录\2026-10-05_两服模组同步\plan.json`。
- 已递归检查内嵌 JAR 的声明：没有发现缺失的服务端必需依赖或重复的顶层模组 ID。这不是完整版本范围解析或实际启动验证；仍待专用服务器测试。
- TrainResync `g` 尚待构建、发布、更新索引并替换两服文件，见整合包待办。
- 2026-10-05 已将包内 `config/curios-common.toml` 同步到两服：头部、腰带、背部各 1 格，均使用 `operation=SET`。三份文件内容一致，TOML 解析通过；待部署后验证实际槽位。

</details>
