---
title: "sing-box JSON 配置文件编写教程：从零掌握路由与出入站"
description: "硬核极客专属。深度解析 sing-box 配置文件结构，手把手教您编写 inbounds, outbounds 和 routing 规则，彻底掌握自定义分流。"
pubDate: "2026-08-13"
category: "tutorials"
tags: ["sing-box", "配置文件", "分流规则"]
image: "/images/blog-default.jpg"
author: "Clash Wiki 编辑组"
updatedDate: 2026-08-13
---

如果您对网络代理的理解还停留在“一键导入订阅链接”，那么 sing-box 可能会让您望而生畏。但如果您是一名追求极致控制权的极客，渴望精准掌控每一条网络请求的流向，那么 sing-box 的 JSON 配置文件将为您打开一扇新世界的大门。

与 Clash 人类可读性极强的 YAML 格式不同，sing-box 采用了更严谨、更适合程序解析的 JSON 格式。这篇文章将带您拆解 sing-box 配置文件的五脏六腑。

---

## 核心架构：四大组件

一个完整的 sing-box 配置文件，主要由四大块组成。理解了这四块，您就理解了 sing-box 的灵魂：

1. **`log` (日志)**：负责记录运行状态，排错必备。
2. **`inbounds` (入站)**：负责接收流量。流量怎么进入 sing-box？是通过 HTTP 代理、SOCKS5，还是 TUN 虚拟网卡？
3. **`outbounds` (出站)**：负责发送流量。流量怎么发出去？是直连 (direct)、拦截 (block)，还是通过代理节点 (如 vless, hysteria2) 发送？
4. **`route` (路由)**：核心大脑。负责决定从 `inbounds` 进来的流量，应该匹配哪条规则，最终交给哪个 `outbounds`。

---

## 骨架代码概览

以下是一个最基础的配置文件骨架：

```json
{
  "log": {
    "disabled": false,
    "level": "info",
    "timestamp": true
  },
  "inbounds": [
    {
      "type": "mixed",
      "tag": "mixed-in",
      "listen": "127.0.0.1",
      "listen_port": 2080
    }
  ],
  "outbounds": [
    {
      "type": "vless",
      "tag": "proxy",
      "server": "server.example.com",
      "server_port": 443,
      "uuid": "your-uuid-here"
    },
    {
      "type": "direct",
      "tag": "direct"
    }
  ],
  "route": {
    "rules": [
      {
        "domain_suffix": [".cn"],
        "geoip": ["cn"],
        "outbound": "direct"
      }
    ],
    "auto_detect_interface": true
  }
}
```

---

## 逐点拆解与高阶技巧

### 1. Inbounds (入站)
推荐使用 `mixed` 类型，它同时兼容 HTTP 和 SOCKS5 代理。
如果您想接管系统所有流量（包括不走代理的软件和游戏），必须配置 `tun` 入站。

### 2. Outbounds (出站)
这是您填写机场节点信息的地方。不同协议（`shadowsocks`, `vless`, `hysteria2`）的配置项完全不同，请严格参考官方文档。
> **提示**：目前大多数人不会手动写每一个出站节点。通常是使用 GUI 客户端（如 GUI.for.SingBox）或订阅转换工具，将机场的订阅链接自动转换为 outbounds 列表。

### 3. Route (路由分流)
这部分取代了 Clash 中的 `rules`。它的逻辑是自上而下匹配。
例如上面的例子：
- 如果域名后缀是 `.cn` 或者 IP 属于中国大陆 (`geoip: cn`)，流量就会被送往 `direct`（直连出站）。
- 如果没有匹配到任何规则，流量默认会走 `outbounds` 列表里的**第一个**出站节点（在这个例子中就是 `proxy`）。

## 结语

手搓 JSON 是一项非常考验耐心（和视力，特别是漏写逗号时）的工作。对于日常使用，我们强烈建议搭配图形化客户端使用，仅在需要微调特定分流规则时，再去动这底层的 JSON 结构。
