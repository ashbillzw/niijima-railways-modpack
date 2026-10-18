# ST075 No-Chat-Reports 筛查报告

日期：2026-10-18。

## 范围与结论

129英文／127中文全量对照。Ctrl和Cmd为键帽名称，保留英文回退、不计缺译。修正格式标记、动态按键、客户端与服务器主体倒置、颜色及配置名拼写等17处。算法名及作者口吻保留。关于聊天举报与Realms的断言是本版本作者的说明，本轮仅做语言核对，不作为现行平台政策或加密安全保证。

新增补译0键，修正已有中文17键。

## 应用明细

| 键 | 原值／英文 | 中文 |
|---|---|---|
| `gui.nochatreports.verified_server` | §a§l安全的服务器§<br>我们可以确定此服务器安装了No Chat Reports，或者以其他已知方式阻止聊天举报。你可以安全地聊天。 | §a§l安全的服务器§r<br>我们可以确定此服务器安装了No Chat Reports，或者以其他已知方式阻止聊天举报。你可以安全地聊天。 |
| `gui.nochatreports.encryption_config.key_desc` | §l加密密钥§<br>用于加密和解密消息的密钥。它的格式取决于算法；对于AES，它将是128位的Base64编码二进制数据。 | §l加密密钥§r<br>用于加密和解密消息的密钥。它的格式取决于算法；对于AES，它将是128位的Base64编码二进制数据。 |
| `gui.nochatreports.encryption_config.passphrase_desc` | §l加密密码短语§<br>你可以从自己选择的密码中导出一个密钥，而不是生成随机密钥。如果你使用这个-选择一个强大的。并非所有算法都支持密码短语。 | §l加密密码短语§r<br>你可以通过自己选择的密码短语推导出密钥，替代随机生成的密钥。如果使用此功能，请选择强度足够的密码短语。并非所有算法都支持密码短语。 |
| `gui.nochatreports.encryption_tooltip` | §l加密：§r%1$s<br>右击以配置。<br><br>当启用加密时，你可以通过在发送消息时按住Ctrl来暂时关闭。 | §l加密：§r%1$s<br>右击以配置。<br><br>启用加密时，你可以在发送消息时按住%2$s，使本条消息不加密。 |
| `gui.nochatreports.secure_chat` | 此选项被No Chat Reports禁用。 | 此选项无法与No Chat Reports一起使用，因为没有可供验证的签名。 |
| `modmenu.descriptionTranslation.nochatreports` | 从玩家消息中剥离加密签名，使其无法跟踪并与你的Microsoft帐户关联，以及使用聊天举报功能。 | 从玩家消息中剥离加密签名，使其无法被追踪并关联到你的Mojang/Microsoft账户，也无法用于玩家聊天举报功能。 |
| `gui.nochatreports.safety_status.singleplayer` | 你始终可以在单人模式中安全地聊天。 | 在单人模式及自己开放的局域网世界中，你始终可以安全地聊天。 |
| `gui.nochatreports.safety_status.unintrusive` | 此服务器没有安装No Chat Reports，但允许发送不能被举报给Mojang的未签名消息。这意味着你的消息不能被举报，但其他人可以通过打开“仅显示安全的聊天”屏蔽你的消息。 | 此服务器允许你发送无法举报给Mojang的未签名消息。除非服务器安装了阻止聊天举报的插件，否则原版客户端仍会发送带签名的消息，将未签名消息标记为“未验证”，并在聊天选项中启用“仅显示安全的聊天”时将其隐藏。 |
| `gui.nochatreports.safety_status.insecure` | 此服务器要求对所有聊天消息进行签名。所有签名的消息都是潜在的罪证，可能在举报中对你不利。使用聊天加密是一种防止被举报的有效方法。 | 此服务器目前要求所有聊天消息都带有签名。所有带签名的消息都是潜在的罪证，可能在聊天举报中对你不利。 |
| `gui.nochatreports.encryption_warning.contents` | 你可以使用密钥加密消息，只有知道此密钥的人才能解密它们。当提供合适的密钥并启用该功能时，No Chat Reports将自动解密所有加密消息。<br>然而，请注意，加密不是一种万能的解决方案。第三方服务器的所有者可以禁止你发送聊天中看起来乱糟糟的内容。此外，建议你生成自定义加密密钥，并仅通过安全通道将其传递给其他人。单击“了解更多”以了解有关如何以及何时使用加密的更多信息。 | 你可以使用密钥加密消息，只有知道此密钥的人才能解密它们。当提供合适的密钥并启用该功能时，No Chat Reports将自动解密所有加密消息。<br>然而，请注意，加密不是万能的解决方案。第三方服务器的管理员可能因为你发送了在他们看来是乱码的聊天消息而将你禁言或封禁。此外，建议你生成自定义加密密钥，并仅通过安全通道将其传递给其他人。单击“了解更多”以了解应当如何以及何时使用加密。 |
| `algorithm.nochatreports.caesar` | §lCaesar§r<br>数字密码。有了这个，你基本上是希望人们会放弃，甚至不尝试解密你的消息。这在很多情况下可能是正确的，所以使用它的可行性取决于你的威胁模型。<br>Key应该是从1到1024的整数。移位是按字符代码而不是按字母顺序进行的，以确保与任何语言兼容。 | §lCaesar§r<br>玩梗用的密码。用上它，你基本上是在指望别人连尝试解密都懒得做就直接放弃。很多时候这也许确实会发生，所以它是否可用取决于你的威胁模型。<br>密钥应为1到1024之间的整数。移位按字符编码而不是字母顺序进行，以兼容任何语言。 |
| `algorithm.nochatreports.aes_gcm_base64` | §lAES/GCM+Base64R§r<br>更高的安全性，但是消息大小严重增加（12字节用于初始化向量，12字节用于身份验证标签，顶部为Base64编码）。是否选择取决于你是否重视安全而不是其他。 | §lAES/GCM+Base64R§r<br>以大幅增加消息长度换取更高的安全性（初始化向量占12字节，身份验证标签占12字节，还要再进行Base64编码）。如果你把安全放在首位，就选择此项。 |
| `option.NoChatReports.showEncryptionIndicators.tooltip` | 切换加密消息指示符的显示，以紫色条的形式显示在聊天消息的左侧和§5§l(§r§5?§5§l)§r悬停显示在聊天消息的右侧。 | 切换加密消息指示符的显示：聊天消息左侧会显示紫色条，将鼠标悬停在消息上时，右侧会显示§5§l(§r§5ȯ§5§l)§r。 |
| `option.NoChatReports.hideInsecureMessageIndicators.tooltip` | 阻止客户端在聊天消息左侧以红色条的形式显示未验证的消息指示符。 | 阻止客户端在聊天消息左侧以灰色条的形式显示未验证的消息指示符。 |
| `option.NoChatReports.hideModifiedMessageIndicators.tooltip` | 阻止客户端在聊天消息的左侧以黄色条的形式显示修改后的消息指示符，并在聊天消息右侧悬停时显示。 | 阻止客户端显示已修改消息的指示符：聊天消息左侧的灰色条，以及悬停时显示在右侧的§7§l(§r§7?§7§l)§r。 |
| `option.NoChatReports.hideWarningToast.tooltip` | 删除在加入禁用§oenforce-sevure-profile§r的服务器时显示的警告提示。 | 删除在加入禁用§oenforce-secure-profile§r的服务器时显示的警告提示。 |
| `option.NoChatReports.demandOnClientMessage.tooltip` | 当客户端尝试加入未安装No Chat Reports的服务器时，显示在客户端的信息。 | 当未安装No Chat Reports的客户端尝试加入服务器时，向该客户端显示的消息。 |

## 验证与限制

JSON解析、当前英文键对应及%s／%d参数检查通过；未进行游戏验证。标准键已逐条检查，不代表穷尽所有硬编码文本。未提交、打包或部署。
