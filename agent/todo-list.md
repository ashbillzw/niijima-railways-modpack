# 整合包待办

模组分批更新进度见 [模组更新 TODO](模组更新TODO.md)：逐项记录未入包、已入包、已测试正常。

- [ ] 同步本地和线上的 YSM 模型，等线上部署时处理。
- [ ] 同步本地和线上的 KJS（KubeJS）：先下载线上文件，与本地对比并调整，确认后上传。
- [ ] 为 YSM 和 KJS 考虑更好的上传、同步方式，例如基于 Git，在服务器部署脚本，从仓库拉取这些文件。具体方案待讨论。
- [ ] 测试 PCL 下载 MCEF ZIP、TrainResync 解压及游戏启动。
- [ ] 处理 Modrinth 版内置 MCEF 运行库。
- [ ] 线上部署时删除三个 YSM 模型：`sirofetz.ysm`、`Dumrnheint_PWKMKI.ysm`、`plaaf-j20s.ysm`。
- [ ] 在其他分支处理已备份的月村手毬模型。
- [ ] 上传 TrainResync 1.6.0.f 至 Modrinth，并将整合包索引更新为该版本。
- [ ] 需要验证：TrainResync 1.6.0.f 的切石机配方编号修复（构建通过、需要游戏内验证、需要上传 Modrinth）。在多人服务器检查 Yuushya stairs_straw_mat_a / stairs_straw_mat_b、stairs_white_concrete 及 block_blueprint 靠后的配方，确认产物、模板消耗和切换选择正常；修复支持索引 0～255。
