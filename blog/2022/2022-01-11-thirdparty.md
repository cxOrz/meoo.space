---
title: Openwrt 第三方软件源与 opkg 的使用
slug: openwrt-thirdparty
description: 在 OpenWrt 上配置第三方软件源，使用 opkg 命令管理软件包。本文涵盖了 opkg 的更新、安装、卸载等基本操作，以及修改默认软件源、添加自定义软件源、关闭签名检查的方法。
keywords: [openwrt, 自定义, 第三方, 软件源, opkg]
authors: cxOrz
tags: [openwrt]
---

:::info 来自网络的第三方软件库
- https://op.dllkids.xyz
- https://dl.openwrt.ai
:::

## opkg 的基本使用

一些基本的使用举例：

```bash
opkg update           # 更新可用软件包列表
opkg upgrade dnsmasq  # 升级dnsmasq软件包
opkg install dnsmasq  # 通过软件源安装dnsmasq软件包
opkg install http://xxxx/packages/dnsmasq.ipk   # 下载安装dnsmasq软件包
opkg install /tmp/dnsmasq.ipk   # 本地安装dnsmasq软件包
opkg remove dnsmasq   # 卸载dnsmasq软件包
opkg list             # 列出可用软件包
opkg list-installed   # 列出已安装软件包
opkg list-upgradable  # 列出可升级的已安装软件包
```

## 修改默认源

一般不改，可在自行编译固件时加入所需软件包。如需升级，就构建新固件。

默认的源配置文件：`/etc/opkg/distfeeds.conf`。

```bash
# 类比如下格式修改
src/gz immortalwrt_base https://mirrors.vsean.net/openwrt/releases/23.05.4/packages/aarch64_cortex-a53/base
src/gz immortalwrt_luci https://mirrors.vsean.net/openwrt/releases/23.05.4/packages/aarch64_cortex-a53/luci
src/gz immortalwrt_packages https://mirrors.vsean.net/openwrt/releases/23.05.4/packages/aarch64_cortex-a53/packages
src/gz immortalwrt_routing https://mirrors.vsean.net/openwrt/releases/23.05.4/packages/aarch64_cortex-a53/routing
src/gz immortalwrt_telephony https://mirrors.vsean.net/openwrt/releases/23.05.4/packages/aarch64_cortex-a53/telephony
```

## 添加自定义源

自定义源配置文件：`/etc/opkg/customfeeds.conf`

```bash
# 添加自定义源
# src/gz example_feed_name http://www.example.com/path/to/files
src/gz kenzo https://op.dllkids.xyz/packages/aarch64_cortex-a53
```

如果添加自定义的源时，不添加密钥就需要关闭签名检查，在 `/etc/opkg.conf` 修改。

将 `option check_signature` 行使用 `#` 注释掉。

对软件源配置文件进行完修改后，更新软件列表 `opkg update`。
