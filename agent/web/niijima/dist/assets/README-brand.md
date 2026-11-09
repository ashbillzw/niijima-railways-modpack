# 品牌资源来源

2026-11-06。按用户要求复用已有品牌素材，不生成替代图标。

- `niijima-logo.jpg`：原始 600×600 群头像，来自用户指定的 `https://p.qlogo.cn/gh/549428882/549428882/0`；本机既有源为独立工作目录 `本地资源/启动器图标/2026-10-29/qq-group-source`。文件原样复制，显示时由 CSS 裁为圆角矩形。
- `niijima-wordmark.svg`：来自 PrismLauncher 仓库 `launcher/resources/niijima/home-title.svg`，四字为 Zen Maru Gothic Bold 的轮廓，原资产已移除「鉄」右部竖笔出头。网页只将白色填充改为 `#263a31` 并更新无障碍名称为「新島鉃道」；未重新绘制笔画，不依赖浏览器字体是否含该字。
- 字体衍生字标的 SIL OFL 许可随附于 `vendor/ZenMaruGothic-OFL.txt`；原字标来源与复现步骤见 PrismLauncher 的 `launcher/resources/niijima/README-home-title.md`。
- `feedback-banner.svg` 为启动器活动按钮原图，884×324，比例 221:81；原图没有圆角，按钮容器在渲染时裁圆角。2026-11-10 首页初稿曾使用此图，用户反馈后改为HTML横幅，复用活动页既有背景、邮票、丝带和第四版角色图；启动器原图不改。
