# ST027 Net Music（网络音乐机）

日期：2026-10-17。包内`netmusic-1.5.2-forge+mc1.20.1.jar`。

105条英文／中文已通读，中文完整。本轮仅修正1处重复措辞：唱片刻录机说明“仅可在中国大陆可用”改“仅在中国大陆可用”，与其.tip说明保持一致。没有修改网络地址、歌词、歌曲、代理、版权歌曲处理或广播配置。

## 上游比对

[1.20固定版本](https://github.com/TartaricAcid/NetMusic/blob/b7cc0dfc33253c056089e87d36d9c6dca8fdc21b/src/main/resources/assets/netmusic/lang/zh_cn.json)与[1.21固定版本](https://github.com/TartaricAcid/NetMusic/blob/b44ee583db5f946229c08371aac99aeae166c31d/src/main/resources/assets/netmusic/lang/zh_cn.json)均105条中文，逐键与包内相同。未穷尽未合并PR。

## 保留及待核查

- 歌手／Artists不强改为艺术家：现有唱片界面主要是歌曲，属措辞取舍。
- 唱片机／播放器歌词颜色等名称略有差异，未改变指向清楚的配置项。
- http/https、mp3/flac、m3u8、VIP、#ARGB保留技术标记，不做机械汉化。
- m3u8后缀限制、VIP播放限制和地区可用性是当前模组提示；本次未联网播放测试，不能据此保证服务的实时可用情况。
- 本轮未扫描全部硬编码或验证网络播放，未提交、部署。JSON和全体占位符检查通过。

仅1处文案修正，无新增译文，不凑10个例子。本机快照在`lang-audit/st027-*`。
