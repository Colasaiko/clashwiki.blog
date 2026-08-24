---
title: "sing-box TUN 虚拟网卡接管模式进阶教程 | 代理进阶 - ClashWiki"
description: "普通系统代理无法覆盖游戏客户端或命令行工具？ClashWiki 手把手教您开启 sing-box 的 TUN 真全局模式，解决所有网络穿透难题，点击阅读权威操作指南。"
pubDate: "2026-08-13"
category: "tutorials"
tags: ["sing-box", "游戏加速", "实用教程", "Windows", "macOS"]
image: "/images/blog-default.jpg"
author: "Clash Wiki 编辑组"
updatedDate: 2026-08-13
keywords: "TUN模式,虚拟网卡接管,真全局代理,进阶教程"
---

对于经常打跨服游戏、或者需要使用 Windows UWP 微软商店应用的用户来说，普通的 System Proxy (系统代理) 往往无法接管这部分流量。此时，您需要开启 sing-box 的“杀手锏”功能：**TUN 模式**。

---

## 什么是 TUN 模式？

TUN (Network TUNnel) 模式的核心原理是在操作系统中创建一张**虚拟网卡**。
开启 TUN 后，sing-box 会通过修改系统路由表，将设备上**所有**软件发出的网络请求强制引流到这张虚拟网卡中。这意味着，无论是不遵守系统代理设置的命令行工具、老旧应用、甚至是外服游戏客户端，流量都会被强制接管并进行代理。

## 如何在配置文件中开启 TUN？

在 sing-box 的 `config.json` 中，入站 (inbounds) 模块负责接收流量。您需要在这里添加一个类型为 `tun` 的入站配置。

### 核心 JSON 配置段

```json
{
  "inbounds": [
    {
      "type": "tun",
      "tag": "tun-in",
      "interface_name": "singbox-tun", // 虚拟网卡的名称
      "inet4_address": "172.19.0.1/30",
      "auto_route": true, // 核心：自动配置系统路由表
      "strict_route": true,
      "stack": "system", // 在 Windows 上推荐设为 system 或 gvisor
      "sniff": true,
      "sniff_override_destination": true
    }
  ]
}
```

### Windows 系统特别注意事项
在 Windows 系统下，开启 TUN 模式**必须赋予 sing-box 管理员权限**。
如果您使用的是图形化客户端（如 Hiddify 或 sing-box for Windows 官方客户端），通常可以在界面的设置中找到 `Enable TUN` 的开关。点击开启后，系统会弹出 UAC 用户账户控制窗口，请务必点击“允许”。

### macOS 系统特别注意事项
在 macOS 下，开启 TUN 同样需要 Root 权限。如果您使用的是命令行启动，请务必在命令前加上 `sudo`，例如：
`sudo sing-box run -c config.json`。

如果您使用的是基于内核的 GUI 客户端，系统同样会提示您输入开机密码以授权安装系统扩展或修改网络设置。

## TUN 模式与游戏加速

开启 TUN 后，sing-box 就实质上变成了一个“游戏加速器”。
为了获得最佳的游戏体验，建议您在路由 (Route) 模块中配合 `process_name` 规则，将游戏进程的流量精准导向专线节点，从而实现最低延迟：

```json
{
  "route": {
    "rules": [
      {
        "process_name": [
          "csgo.exe",
          "dota2.exe",
          "ApexLegends.exe"
        ],
        "outbound": "iplc-node" // 导向低延迟的 IPLC 专线节点
      }
    ]
  }
}
```

通过巧妙地搭配 TUN 模式与进程分流，您完全可以抛弃传统的高价游戏加速器，享受更自由、更快速的跨国网络体验。
