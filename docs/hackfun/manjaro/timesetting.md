---
sidebar_position: 2
title: 与 Windows 系统时间不同步
slug: /manjaro-time-adjust
---

Windows 将本地硬件时间作为设定时区（如 UTC+8）的区时，而 Linux 默认将其作为 (UTC+0) 时间。

使用以下命令将硬件时间作为本地时间
```bash
sudo timedatectl set-local-rtc 1
```