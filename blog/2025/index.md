---
slug: grub-manually-add-windows-menuentry
title: Grub 添加 Windows 启动项
authors: cxOrz
tags: [linux]
---

电脑最近又出现 `no bootable device` 了，每次这样都可以通过重新设置一下 UEFI 模式恢复。

好处是能正常用了，坏处是 grub 引导会丢失。每次都要弯下我的老腰，插上 Linux 启动盘，然后 chroot 到系统里重新安装引导、生成配置。

偶然间在软件包更新后，生成配置出错了，等修复不知道要猴年马月，那就手动写配置吧...

在 `/boot/grub/custom.cfg` 中添加：

```bash
menuentry "Windows 11" {
  set root=(hd1,3)
  chainloader /EFI/Microsoft/Boot/bootmgfw.efi
  boot
}
```

这部分配置，在 grub 中添加了一个标题为 "Windows 11" 的启动项：

1. 在引导时，当选择了 Windows 11，就将 `root` 变量设置为引导分区的位置。`(hd1,3)` 表示第 2 个硬盘的第 3 个分区。
2. `chainloader` 用来链式加载系统，后面跟着被链式加载的 `.efi` 文件。
3. 最后启动。

这是 UEFI BIOS 可用的配置，而不是 Legacy BIOS 的，现在几乎所有电脑都是 UEFI 了。

参考:

- [[Workaround]os-prober segmentation fault. GRUB new update mess!](https://bbs.archlinux.org/viewtopic.php?id=303725)
- [GNU GRUB Manual 2.12](https://www.gnu.org/software/grub/manual/grub/html_node/index.html)
- [GRUB - ArchWiki](https://wiki.archlinux.org/title/GRUB)