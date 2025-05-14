---
slug: arch-hyprland-note
title: Hyprland + Arch 备忘录
description: 涵盖了 Intel + Nvidia 双显卡环境下的 Hyprland 设置、ZSH 环境变量（.zshrc, .zprofile, .zshenv）详解、TLP 电源管理优化、Fcitx5 + Rime 中文输入法配置、Chrome 浏览器在 Wayland/XWayland 的配置以及 GTK 主题设置。
keywords: [archlinux, hyprland, dotfiles, 硬件加速]
authors: cxOrz
tags: [linux, tech]
---

本篇记录 Arch Linux 作为日常使用系统的相关内容。

| 系统       | Compositor | CPU            | GPU            |
| ---------- | ---------- | -------------- | -------------- |
| Arch Linux | Hyprland   | Intel i5-9300H | Nvidia GTX1650 |

## Hyprland

对于 Intel + Nvidia 双显卡还要外接显示器的，确实配置要麻烦一些。通常需要结合 Waybar、Wofi 等程序，实现基本的桌面功能。根据自己的喜好完成自定义，这就是完全属于自己独一无二的桌面环境了。

配置：https://github.com/cxOrz/dotfiles-hyprland

<!-- truncate -->

## 环境变量

用的 ZSH，所以变量基本都配置在 `zsh*` 相关文件里了。

- `.zshrc` 在 zsh 作为交互式 Shell 启动时执行，也就是每次打开终端会执行。
- `.zprofile` 在 zsh 作为登录 Shell 启动时执行，也就是每次在 TTY 登录的时候。
- `.zshenv` 在 zsh 启动时执行，无论什么情况启动，都会执行。

| 文件        | 执行时机            | 用途                           | 举例                          |
| ----------- | ------------------- | ------------------------------ | ----------------------------- |
| `.zshrc`    | 在交互式 Shell 启动 | 启动插件、终端运行环境变量配置 | `source $ZSH/oh-my-zsh.sh`    |
| `.zprofile` | 在登录 Shell 启动   | 用户环境变量配置               | `export NVM_DIR="$HOME/.nvm"` |
| `.zshenv`   | zsh 启动            | 全局环境变量配置               | `export EDITOR=vim`           |

使用 `export` 将变量标记为待导出，子进程从这里启动，将继承其导出的环境变量。例如在 VSCode 点击运行 npm 脚本，会提示 command not found，需在 `.zprofile` 添加环境变量，而不是在 `.zshrc`，因为从 VSCode 点击运行脚本是由它的内部进程启动的，而不是从可交互 Shell 中启动，因此无法继承 `.zshrc` 中的环境变量。

拓展延伸：

- `/etc/profile` 在登录 Shell 时执行，系统级别配置，对任何用户起作用。在 `.zprofile` 前执行。
- `/etc/environment` 并非脚本，而是系统全局的环境变量配置文件，只能使用键值对定义内容。在任何 Shell 启动前读取。

## TLP

必装工具之一，用于设置一些电源管理策略。

例如：机械硬盘空闲一分钟就停止转动、电池充到 80% 就停止充电、接入电源时 CPU 策略为性能模式。

```yaml
# /etc/tlp.conf

# 插电时，硬盘 2 空闲 60s 后停转
DISK_SPINDOWN_TIMEOUT_ON_AC="0 12"
DISK_SPINDOWN_TIMEOUT_ON_BAT="0 12"
```

## Fcitx5 + Rime

用 `fcitx5` + `fcitx-rime` + `rime-ice-git` 作为中文输入法方案，体验比 Google Pinyin 强多了。与 Hyprland 在同一个[仓库](https://github.com/cxOrz/dotfiles-hyprland/tree/main/.config/fcitx5)。

在 `/etc/environment` 中设置：

```bash
XMODIFIERS=@im=fcitx
QT_IM_MODULE=fcitx
```

## Chromium

有些启动参数需要加。Google Chrome、VS Code，理论上其他 Chromium 系应用都支持这些参数。

| 应用            | 配置路径                      |
| --------------- | ----------------------------- |
| `google-chrome` | `~/.config/chrome-flags.conf` |
| `code`          | `~/.config/code-flags.conf`   |

使用 Wayland 渲染，不开硬件加速没问题。如果开硬件加速，可能是英伟达驱动原因，小问题很多，比如闪烁、撕裂、视频无法播放。参数如下：

```bash
--ozone-platform-hint=wayland
--enable-wayland-ime
--enable-gpu-rasterization
--enable-zero-copy
--ignore-gpu-blocklist

# 硬件加速
--use-angle=vulkan
```

使用 XWayland 渲染，体验最佳，硬件加速支持最好。参数如下：

```yaml
--ozone-platform-hint=x11
--enable-gpu-rasterization
--enable-zero-copy
--ignore-gpu-blocklist

# 硬件加速，包含通用选项、VA-API、Vulkan
--enable-features=UseOzonePlatform,AcceleratedVideoDecodeLinuxGL,AcceleratedVideoEncoder,VaapiVideoDecoder,VaapiIgnoreDriverChecks,Vulkan,DefaultANGLEVulkan,VulkanFromANGLE
```

:::note 浏览器
- 在 [chrome://chrome-urls](chrome://chrome-urls/) 查看哪些 Chrome URL。
- 在 [chrome://gpu](chrome://gpu/) 查看 GPU 相关功能启用状态，例如硬件加速是否开启。
:::

## SDDM

`sddm-git` 开箱即用，但外接显示器时只在笔记本屏幕上显示了，因为我笔记本的 HDMI 口走的英伟达显卡。需要设置如下参数：

```yaml
# /usr/share/sddm/scripts/Xsetup
xrandr --setprovideroutputsource modesetting NVIDIA-0
```

## GTK

比较喜欢 `flat-remix-gtk` 这个主题，装上之后需要配置 GTK 应用使用它。

用命令设置一下暗色偏好，再设置一下皮肤：

```bash
gsettings set org.gnome.desktop.interface color-scheme prefer-dark
gsettings set org.gnome.desktop.interface gtk-theme Flat-Remix-GTK-Blue-Darkest
```

