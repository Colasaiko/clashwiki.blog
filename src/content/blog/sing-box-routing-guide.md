---
title: "sing-box 复杂路由分流规则编写进阶教程"
description: "想要实现国内外流量精准分流并接管特定 App？ClashWiki 深入解析 sing-box 路由模块匹配逻辑与自定义规则写法，点击定制属于您的极客网络分流方案。"
pubDate: "2026-08-13"
category: "客户端教程"
tags: ['sing-box', '分流规则', '客户端教程']
image: "/og/singbox-theme.jpg"
author: "Clash Wiki 编辑组"
updatedDate: 2026-08-13
keywords: "精准分流,匹配逻辑,自定义规则,进阶教程"
---

对于追求极致网络体验的玩家来说，将所有流量一股脑地塞进代理节点并不是最聪明的做法。这不仅浪费节点流量，还会导致国内网站访问速度下降。

[sing-box](/tag/sing-box/) 提供了全网最强大、最灵活的 `route` (路由) 引擎。本文将教您如何配置 sing-box 的分流规则，打造最完美的网络体验。

---

## 核心概念：Route 模块是如何工作的？

在 `config.json` 中，所有的路由规则都写在 `"route"` 对象内的 `"rules"` 数组中。

**工作原理：从上到下，一旦命中，立刻放行。**

这意味着，**规则的顺序极其重要**！越精细、越特例的规则必须写在越前面；越宽泛的规则必须垫底。

## 经典应用场景：国内外流量分流

最经典的用法是：国内 IP 和域名直连，广告域名拦截，其他所有流量默认走代理。

### 准备工作：配置 rule_set
sing-box 推荐使用 `rule_set` (规则集) 来替代庞大的 `geosite` 或 `geoip` 数据库。这能极大降低内存占用。

```json
{
  "route": {
    "rule_set": [
      {
        "tag": "geosite-cn",
        "type": "remote",
        "format": "binary",
        "url": "https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/geosite-cn.srs",
        "download_detour": "proxy"
      },
      {
        "tag": "geoip-cn",
        "type": "remote",
        "format": "binary",
        "url": "https://raw.githubusercontent.com/SagerNet/sing-geoip/rule-set/geoip-cn.srs",
        "download_detour": "proxy"
      }
    ],
    "rules": [
      // 1. 本地局域网流量直连
      {
        "ip_cidr": ["127.0.0.0/8", "192.168.0.0/16", "10.0.0.0/8", "172.16.0.0/12"],
        "outbound": "direct"
      },
      // 2. 匹配国内域名和 IP，走直连
      {
        "rule_set": ["geosite-cn", "geoip-cn"],
        "outbound": "direct"
      }
    ],
    "auto_detect_interface": true,
    "final": "proxy" // 最终没有被上面规则匹配的，全部走 proxy 节点
  }
}
```

## 高阶玩法：特定 App / 进程分流

在 Windows 和 macOS 的 [TUN 模式](/blog/what-is-proxy-rules-and-tun/)下，sing-box 可以读取发送网络请求的 App 进程名，从而实现“只让某个游戏走代理”，或者“只让某个[流媒体](/tag/streaming/)软件走香港节点”。

```json
{
  "route": {
    "rules": [
      // 匹配进程名，强制走特定节点
      {
        "process_name": [
          "Telegram.exe",
          "Discord.exe"
        ],
        "outbound": "proxy"
      },
      // 屏蔽迅雷等 P2P 软件防止节点被封
      {
        "process_name": [
          "Thunder.exe",
          "BitComet.exe",
          "qBittorrent.exe"
        ],
        "outbound": "direct" // 或者 "block"
      }
    ]
  }
}
```

## 总结

路由配置是 sing-box 的灵魂。只要掌握了 `rules` 数组的**自上而下匹配**原则，并合理利用 `rule_set`，您就能像一名网络工程师一样，精准控制设备上每一字节流量的去向。
