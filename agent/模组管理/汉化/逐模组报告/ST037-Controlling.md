# ST037 Controlling

日期：2026-10-17。包内Controlling-forge-1.20.1-12.0.2.jar。12条中英文已通读，补译0，修正2。

| 键 | 原译 | 已应用 |
| --- | --- | --- |
| options.toggleFree | 自由切换 | 切换空闲按键列表 |
| options.availableKeys | 可用的快捷键 | 空闲按键 |

当前JAR NewKeyBindsScreen的PRESS_FREE切换showFree，并在FreeKeysList和NewKeyBindsList之间切换；Free指尚未占用的按键，不是自由模式。和“显示未绑定键位”（未分配按键的操作）区分。A→Z/Z→A保留排序标识。

官方[1.20.1](https://github.com/jaredlll08/Controlling/blob/6712e885464ffc58ae34dfb53e983986163beddf/common/src/main/resources/assets/controlling/lang/zh_cn.json)12条与包内一致；[1.21.1](https://github.com/jaredlll08/Controlling/blob/7be58eb38962e9e1e1e932c84d9f57c65719a23c/common/src/main/resources/assets/controlling/lang/zh_cn.json)新增排序键，但仍有同样误译，未直接引入新键。

JSON与占位符检查通过，未游戏内检查按钮宽度；未更改快捷键、复制实例、打包或提交。反汇编位于本机lang-audit/controlling-screen.javap。
