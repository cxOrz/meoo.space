---
title: 第三方软件源 & opkg
slug: openwrt-thirdparty
tags: [openwrt]
---

可直接访问手动下载的软件库： https://op.supes.top

其实在 GitHub 有很多第三方的软件源的，里面的安装包都非常丰富，里面的插件也非常的全。不能写出来，得自己去发现。

各种软件源的下载方式（官方英文）：

| 方式 | 描述 |
|-|-|
| src-bzr |	Data is downloaded from the source path/URL using bzr |
| src-cpy |	Data is copied from the source path. The path can be specified as either relative to OpenWrt repository root or absolute. |
| src-darcs |	Data is downloaded from the source path/URL using darcs |
| src-git |	Data is downloaded from the source path/URL using git as a shallow (depth of 1) clone |
| src-git-full | Data is downloaded from the source path/URL using git as a full clone |
| src-gitsvn | Bidirectional operation between a Subversion repository and git |
| src-hg | Data is downloaded from the source path/URL using hg |
| src-link | A symlink to the source path is created. The path must be absolute. |
| src-svn |	Data is downloaded from the source path/URL using svn

## 修改官方源
打开默认的源配置文件

```bash
vim /etc/opkg/distfeeds.conf
```

修改为清华软件源
```
src/gz openwrt_base https://mirror.sjtu.edu.cn/openwrt/releases/packages-21.02/mipsel_24kc/base
src/gz openwrt_luci https://mirror.sjtu.edu.cn/openwrt/releases/packages-21.02/mipsel_24kc/luci
src/gz openwrt_packages https://mirror.sjtu.edu.cn/openwrt/releases/packages-21.02/mipsel_24kc/packages
src/gz openwrt_routing https://mirror.sjtu.edu.cn/openwrt/releases/packages-21.02/mipsel_24kc/routing
```

## 添加自定义源

```bash
vim /etc/opkg/customfeeds.conf
```
在此文件中添加自定义源
```
src/gz kuoruan_packages http://openwrt.kuoruan.net/packages/releases/mipsel_24kc
src/gz kuoruan_universal http://openwrt.kuoruan.net/packages/releases/all
src/gz openwrt_kiddin9 https://op.supes.top/packages/mipsel_24kc
```

## 关闭签名检查

如果添加自定义的源时，不添加密钥就需要关闭签名检查。
```bash
vim /etc/opkg.conf
```

将 `option check_signature` 行使用 # 注释掉。

对软件源配置文件进行完修改后，更新软件列表 `opkg update`

## opkg 的基本使用
下面的例子应该可以比较直观地看出来，一些基本的使用命令：
```bash
opkg update	#更新可用软件包列表
opkg upgrade 软件包名1 软件包名2 #升级软件包
opkg install dnsmasq #安装软件
opkg install http://downloads.openwrt.org/snapshots/trunk/ar71xx/packages/hiawatha_7.7-2_ar71xx.ipk # 安装软件
opkg install /tmp/hiawatha_7.7-2_ar71xx.ipk #安装软件
opkg remove 软件包名 #删除软件
opkg list #列出可用软件包
opkg list-installed #列出已安装软件包
opkg list-upgradable #列出可升级的已安装软件包
```