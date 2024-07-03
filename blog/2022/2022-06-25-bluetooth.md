---
title: 关于蓝牙的问题
slug: bluetooth
tags: [linux]
---

在 ArchLinux 中如何使用蓝牙耳机如何连接到电脑看视频、听歌。

1. 安装 bluez，这个软件包提供蓝牙协议栈。
2. 安装 bluez-utils，这个软件包提供 bluetoothctl 实用程序。
3. 通用蓝牙驱动是 btusb 内核模块。检查模块是否已加载。如果还没有，先加载模块。
4. 启动/启用 bluetooth.service。

命令：
``` bash
yay -S bluez bluez-utils # 安装bluez和bluez-utils

lsmod | grep btusb #检查模块是否加载

modprobe btusb #加载模块

systemctl enable bluetooth #开机自启动蓝牙服务
```

通常这样就可以了，但是如果连不上去，尝试安装 pulseaudio-bluetooth，完成后重启，即可连上。