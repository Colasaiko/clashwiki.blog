---
title: "sing-box DNS 配置教程：彻底解决 DNS 泄露与污染"
description: "sing-box 的 DNS 模块是其最强大的核心之一。本文将教您如何配置 fakeip、远程 DNS 解析以及防泄露规则，优化网络请求速度。"
pubDate: "2026-08-13"
category: "tutorials"
tags: ["sing-box", "配置文件", "网络安全", "实用教程"]
image: "/images/blog-default.jpg"
author: "Clash Wiki 编辑组"
updatedDate: 2026-08-13
---

在跨境网络的过程中，**DNS 泄露**（DNS Leak）和**DNS 污染**是导致网页打不开、加载缓慢、甚至 IP 封锁的罪魁祸首。

sing-box 拥有一套比 Clash 更灵活但配置稍显复杂的 DNS 引擎。在这篇教程中，我们将彻底拆解 `dns` 模块，为您提供一份能兼顾速度与安全的工业级配置清单。

---

## 为什么需要配置 DNS 分流？

当我们访问 `google.com` 时，浏览器首先需要将域名转换为 IP 地址。
- 如果通过国内的 DNS（如 114.114.114.114）解析被墙域名，会得到一个错误的 IP（DNS 污染），导致无法访问。
- 如果将国内网站也交由国外的 DNS 解析，由于 CDN 调度机制，您可能会被分配到一个位于海外的服务器 IP，导致访问国内网站变得极慢。

因此，**完美的状态是：国内域名用国内 DNS 解析，海外域名用海外 DNS 解析。**

## 标准配置模板 (含 FakeIP)

目前主流且高效的玩法是采用 **FakeIP (伪装 IP)** 技术。使用 FakeIP，客户端不需要等待真实的 DNS 响应，而是直接返回一个内网虚拟 IP 骗过本地系统，然后由远端代理服务器去进行真实的 DNS 解析。这能极大缩短首字节加载时间。

以下是一份可以直接抄作业的强力配置：

```json
{
  "dns": {
    "servers": [
      {
        "tag": "dns-local",
        "address": "223.5.5.5", // 阿里 DNS
        "detour": "direct"
      },
      {
        "tag": "dns-remote",
        "address": "https://8.8.8.8/dns-query", // 谷歌 DoH
        "detour": "proxy"
      },
      {
        "tag": "dns-fakeip",
        "address": "fakeip"
      }
    ],
    "rules": [
      {
        "outbound": "any",
        "server": "dns-local"
      },
      {
        "rule_set": ["geosite-cn"],
        "server": "dns-local"
      },
      {
        "query_type": ["A", "AAAA"],
        "server": "dns-fakeip"
      }
    ],
    "final": "dns-remote",
    "strategy": "ipv4_only", // 根据需要可开启 ipv4_only 提升速度
    "independent_cache": true
  }
}
```

## 解析规则剖析

上面的 `"rules"` 数组依然遵循**从上到下**的匹配原则：

1. `{"outbound": "any", "server": "dns-local"}`：代理节点自身的域名解析必须走本地直连 DNS，否则会陷入死循环（连不上节点就无法解析，无法解析就连不上节点）。
2. `{"rule_set": ["geosite-cn"], "server": "dns-local"}`：明确为国内的网站使用 223.5.5.5 进行解析，获取国内最近的 CDN 节点。
3. `{"query_type": ["A", "AAAA"], "server": "dns-fakeip"}`：剩余的所有正常域名请求，直接返回 FakeIP 快速建立连接。

## 测试防泄露

配置完成后，您可以前往我们提供的 [DNS 泄露检测工具](/tools/dns-leak/) 进行综合评估。只要您在结果中没有看到属于您本地运营商 (如公开资料汇总/公开资料汇总) 的 DNS 服务器 IP，就说明您的隐私得到了完美的保护！
