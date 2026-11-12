# ST035 Just-Enough-Characters

日期：2026-10-17。包内：`jecharacters-1.20.1-forge-4.6.11.jar`。本轮新增0、修正0。

5条中英文已通读，命令语法与日志路径应保留，暂无缺译。

原中文写入失败消息含“卧槽”，属于作者口吻，与英文Oops不同但没有功能含义错误。本轮不擅自删改，也不把它推广为整合包偏好。用户已于2026-10-17确认保留作者口吻，明确错误才修正；本条保留，并记录为长期翻译偏好。

未执行profile命令，未更改拼音检索规则。此项未做上游全面比对，无语言覆盖文件生成。

JSON、占位符和资源路径静态检查；尚未游戏验证、复制实例、打包、提交或部署。未全类排查硬编码，未穷尽上游PR。所有实际修改列于上表；未生成翻译的项目不凑例子。

## 2026-11-13 · 拼音与英文物品名并搜

核对 test0040 的模组及包配置。JECharacters 4.6.11 给 JEI 注册拼音检索，没有同时索引第二语言的选项。JEI 15.56.0.205 的物品别名检索已开启，可在客户端用 registerIngredientAliases 为普通物品注册 en_us 名称；注册名搜索单独由 ResourceLocationSearchMode 控制，包中为 DISABLED。药水等按物品栈生成的名称需另行处理。[PolyglotTooltip](https://www.curseforge.com/minecraft/mc-mods/polyglottooltip) 已提供 Forge 1.20.1 客户端版并支持 JEI 多语言搜索，同时会提供多语言物品提示。以上为配置、接口和上游资料核查，未在包中安装或实测。

同日补查默认创造栏放大镜。test0040 日志确认 ModernFix 选用 JEI 搜索树，JECharacters 通过 JechJeiPlugin.registerAdvancedSearch 替换 JEI 搜索存储。ModernFix 的 JEIBackedSearchTree.searchJEI 把查询交给 IngredientFilter。因此这个实例可优先验证一次自动注册英文别名能否同时覆盖两个入口。英文名应从客户端资源按物品栈自动解析。独立的原版路径中，JECharacters 的 Forge coremod 在 PlainTextSearchTree.create 与 ResourceLocationSearchTree.create 内把 SuffixArray 替换为 FakeArray。上述结论来自 JAR 与启动日志，双语命中尚未实测。

2026-11-13 实施更新。TrainResync 1.6.0.aj 在 JEI 注册别名时从客户端当前资源包加载 en_us，按 JEI 已收录的物品栈生成英文显示名别名。包中的 JEI 15.56.0.205 会在公开原料管理器可用前调用该接口，插件使用该版本传入的 IngredientManagerBuilder 读取已登记的变体。JEI 资源 ID 搜索设为 REQUIRE_PREFIX（&）。普通包和 1.6.test0041 已打包，本地启动器 pack-id 40。已核对成品中的 JAR 与配置，待在创造栏放大镜和 JEI 分别检查中文、拼音、英文药水名及带 & 的完整 ID。

2026-11-13 搜索前缀更新。TrainResync 1.6.0.ak 在 JEI 和创造栏放大镜的搜索框获得焦点且内容恰为 `?` 时显示六个前缀的帮助。JEI 客户端配置的 `CreativeTabSearchMode` 和 `ResourceLocationSearchMode` 均为 `REQUIRE_PREFIX`。已编译并核对普通包、1.6.test0042 及本地启动器登记（pack-id 41），尚未进游戏验收。此测试版沿用双方已确认的共用文案；其中 `# 物品提示` 对 JEI 正确，创造栏自身会先把开头的 `#` 交给标签搜索，ModernFix 再以 `$` 转给 JEI。创造栏对应帮助文案另待确认。

2026-11-13 后续更新（取代上段待定项）。TrainResync 1.6.0.am 让使用 ModernFix 的 JEI 搜索树的创造栏将完整查询交给 JEI。两个搜索框现在都用 `#` 搜物品提示、`$` 搜标签；此前的 `?` 帮助文案可共用。客户端仅在开头出现 `#` 时检查当前页的名称搜索树，也识别 ModernFix 的延迟加载包装；其他后端保留原有处理。已编译，对照本机 Forge 47.4.6 核对注入点，已打普通包并登记 1.6.test0044（pack-id 43）。尚未在游戏中对照两框结果。可分别输入 `#` 加一段已知提示文字和 `$minecraft:logs` 验证。
