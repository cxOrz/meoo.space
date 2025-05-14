---
title: Linux 风扇转速管理
slug: fan-speed-control
description: 使用 nbfc-linux 工具为 Acer Nitro AN515-54 等型号笔记本配置风扇控制策略，告别风扇噪音、风扇不转的问题，提升 Linux 使用体验。
keywords: [linux, fancontrol, acer, nbfc]
authors: cxOrz
tags: [linux]
---

这个问题真是困扰了多年，始终没解决。在使用 Manjaro、ChromeOS、Ubuntu 等系统时，都因为风扇转速太疯狂而回到 Windows。一直也没找到合适的解决方法，起初以为是双显卡的问题，以为是 Nvidia 显卡驱动没装好或者是一直在使用独显，今天终于知道是风扇控制策略的问题。每一个温度区间对应一个适合的风扇转速，而这些转速在 Linux 中默认设置的不太合适。

## 解决
安装 `nbfc-linux`，这是一个参考 `nbfc` 并改用C语言写的风扇管理程序。

|What|NBFC Mono|NBFC Linux|
|-|-|-|
|Portability| Crossplatform|Linux|
|Configuration files| XML (956KB)| JSON (840KB)|
|Runtime|Mono|Native|
|Memory consumption (ps\_mem)|~50MB|~350KB|
|Package size (pkg.tar.gz)|448K| 100K|
|Service control rights|Any user|Only root|
|IPC Concept|TCP/IP|Files|
|IPC Protocol|Binary|JSON|

安装该程序，然后可在 /usr/share/nbfc/configs/ 目录下，找到所有提供的配置文件。
```bash
yay -S nbfc-linux
```
选择一个最符合我笔记本的型号，我的电脑是AN515-54，在同类型笔记本中发现，AN715-51和我的配置相同。可以将 `Acer Nitro AN715-51.json` 作为我的配置。

在终端中运行以下命令：
```bash
# 设置该型号为当前配置
sudo nbfc config --set "Acer Nitro AN715-51"
# 启动风扇管理
sudo nbfc start
# 开机自动运行风扇管理服务
sudo systemctl enable nbfc_service
```

当启动风扇管理后，可以明显听到风扇的变化，问题解决。