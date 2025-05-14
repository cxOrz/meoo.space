---
title: 通过 v2ray 优雅使用校园网
slug: v2ray-in-campus
description: 通过 V2ray 优雅解决校园网限制和不稳定问题，提供 V2ray 服务端配置及 Clash、V2rayN 客户端设置步骤，实现稳定高速的校园网络连接。
keywords: [v2ray, clash, 校园网]
authors: cxOrz
tags: [tech]
---

:::caution 注意
根据《中华人民共和国计算机信息网络国际联网管理暂行规定》，请勿将该技术用于违法搭建“机场”服务，建立非法信道进行国际联网。
:::

自从安卓 12 已经不支持 `L2TP/IPSec PSK` 的 VPN，用 [Softether绕过校园网限制](/blog/campus-netbypass) 已经不行了，安卓 12 的手机无法连接。同时，这种方法使用起来也不稳定，不登陆的情况下连上 Wifi 会多次被踢掉线，掉线就要重新连接WiFi、连接VPN，再加上Windows11的过渡动画是真迟钝，这简直是灾难。所以，这次用 V2ray 来优雅地改善体验。

:::info 前提
服务端能上网！早期不优雅的使用方法，见 [如何绕过校园网验证，在宿舍免费上办公区的网，享受不拥挤的网络](/blog/campus-netbypass)。
:::

## 配置服务端
下载 [v2ray](https://github.com/v2fly/v2ray-core/releases)，我用的是 `v2ray-windows-64` 版本，自行选择合适的包，下载并解压到任意目录下。

解压后，找到 `config.json` ，配置此文件。可以自己写，也可以参考以下写好的：
```json {7,14-20} showLineNumbers
{
  "log": {
    "loglevel": "warning"
  },
  "inbounds": [
    {
      "port": 10492, // 自定义端口号
      "listen": "0.0.0.0",
      "protocol": "vmess",
      "settings": {
        "auth": "noauth",
        "udp": true,
        "ip": "127.0.0.1",
        "clients": [
          {
            "id": "e061dc06-5c6e-4176-aa36-43b034574194",
            "alterId": 0
          }
          // 可以配置多个用户，id不可相同
        ]
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom",
      "settings": {},
      "tag": "direct"
    },
    {
      "protocol": "blackhole",
      "settings": {},
      "tag": "blocked"
    }
  ],
  "routing": {
    "domainStrategy": "IPOnDemand",
    "rules": [
      {
        "type": "field",
        "domain": [
          "geosite:category-ads"
        ],
        "outboundTag": "blocked"
      }
    ]
  }
}
```

在目录下可以用命令来随机生成客户端 uuid，可以用来填入上面配置文件。
```bash
./v2ray.exe uuid
```

## 客户端配置

### Clash
配置文件为 `.yml` 格式，参考：
```yaml showLineNumbers
mixed-port: 7890
allow-lan: true
mode: Global
log-level: info
external-controller: :9090
proxies:
  - name: client1
    server: 10.85.15.30 #填写服务器IP地址
    port: 10492 #服务器配置的端口
    type: vmess
    uuid: e061dc06-5c6e-4176-aa36-43b034574194
    alterId: 0
    cipher: auto
    tls: false
    udp: true
  #...
  #可以根据服务端配置更多节点，注意缩进
proxy-groups: []
rules: null
```
可以将此文件保存为 `xxx.yml` 并托管在 IIS ，或者任意可以访问的地方，将该文件下载链接（订阅链接）导入 Clash，即可看到配置的节点。

### V2rayN
运行 V2rayN ，直接选择添加VMESS服务器，按照前面的服务器配置内容手动进行填写即可。

## 使用
服务端在刚刚的解压目录下执行 `./v2ray.exe run` 命令来运行 V2Ray，然后客户端就可以用 ClashForAndroid / ClashForWindows 或者 V2rayN / V2rayNg。剩下的就是客户端的使用方法了，与文章主题无关，不再细说。

CFW 建议使用 TUN 模式，CFA 直接用全局代理模式即可。