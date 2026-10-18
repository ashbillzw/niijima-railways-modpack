# ST058 Immersive-Paintings

2026-10-18；当前JAR：`immersive_paintings-0.6.13+1.20.1-forge.jar`。新增1、修正3。

## 审校结果

79键已通读，补图像载入失败提示，修正丛林木错字及权限报错。删除确认中的“一副画”统一“幅”；不更改删除行为。crimson／hyphae的菌核译名需根据边框纹理核对，暂保留，不只凭英文名称替换材质。本轮未额外查询上游，未实际上传／删除图像。

## 本轮明细

| 键 | 原值 | 已应用 |
| --- | --- | --- |
| `immersive_paintings.error.image_load_failed` | （缺失） | 无法载入图像，请检查日志！ |
| `immersive_paintings.error.no_permission` | 未经许可！ | 没有权限！ |
| `immersive_paintings.material.jungle` | 从林木 | 丛林木 |
| `immersive_paintings.confirm_deletion` | 是否确认删除？删除一副画会让所有已有的这副画变为空白。你可以稍后用相同的画名替换这些已有的画。 | 是否确认删除？删除一幅画会让所有已有的这幅画变为空白。你可以稍后用相同的画名替换这些已有的画。 |

改动JSON、键存在性及占位符检查通过（无改动项目只作资源审查）。少量或同系列内容直接列全表，不凑10个重复例子。未全类硬编码扫描、未游戏验证、打包或部署。
