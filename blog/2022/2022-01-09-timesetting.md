---
title: 与 Windows 系统时间不同步
slug: manjaro-time-adjust
tags: [linux]
---

Windows 将本地硬件时间作为设定时区（如 UTC+8）的区时，而 Linux 默认将其作为 (UTC+0) 时间。每次进入Linux，系统会读取BIOS时间，然后+8，作为本地时间显示出来。每次进入Windows，系统会读取BIOS时间，直接作为本地时间显示。

两种方式，二选一，个人倾向于在Windows中修改设置，将硬件时间识别为UTC。

## 在 Linux 修改设置

使用以下命令关闭UTC时间
```bash
sudo timedatectl set-local-rtc 1
```

## 在 Windows 修改设置

```bash
Reg add HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation /v RealTimeIsUniversal /t REG_DWORD /d 1
```