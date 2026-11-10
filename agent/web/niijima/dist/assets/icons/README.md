# 底栏图标

2026-11-10 下载，本地随页面提供，不依赖运行时 CDN。

- `qq.svg`、`bilibili.svg`：Simple Icons，CC0-1.0；来源 https://github.com/simple-icons/simple-icons/tree/develop/icons ，许可 https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md 。品牌商标权仍属于各自权利人。
- `moegirl.ico`：萌娘百科官网 https://zh.moegirl.org.cn/favicon.ico ，用于标识用户指定的个人页链接；未重绘。网站图标不因包含于本项目而改变原有权利。

2026-11-11：用户要求三图标统一无灰阶位图，新增18×18手工像素重绘`qq-pixel.png`、`bilibili-pixel.png`、`moegirl-pixel.png`，像素仅纯黑或透明，无抗锯齿。现底栏引用这三张；旧素材及来源说明保留。品牌标识权利不变。

2026-11-11 纠正：上述手工重绘已废弃，用户要求保持原形。现三个pixel PNG均从原SVG/ICO直接栅格化和透明度二值化，未重新设计轮廓。

2026-11-11 最新决定：取消二值化，恢复qq.svg和bilibili.svg；萌使用原ICO轻微锐化的moegirl-sharp.png，保留抗锯齿。此前pixel素材均不再引用。

2026-11-11 最终采用 moegirl.svg：来自 https://commons.wikimedia.org/wiki/File:Moegirlpedia_favicon.svg （源为萌娘共享大萌字.svg，作者萌娘百科；PD-textlogo，商标权利保留）。按用户要求仅提取绿色主体原path并改黑，去除外围描边。替代ICO锐化及所有pixel/gen版本。
