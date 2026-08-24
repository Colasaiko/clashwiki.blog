---
title: "sing-box 常见配置报错诊断与深度修复教程 | 网络排查 - ClashWiki"
description: "启动 sing-box 时遇到令人头疼的 JSON 语法错误？ClashWiki 整理了最全面的核心报错日志分析与对应解决方案，点击查收这份专业的代理客户端排障自救手册。"
pubDate: "2026-08-13"
category: "tutorials"
tags: ["sing-box", "配置文件", "节点排查", "实用教程"]
image: "/images/blog-default.jpg"
author: "Clash Wiki 编辑组"
updatedDate: 2026-08-13
keywords: "配置报错,日志分析,代理客户端排障,网络排查"
---

对于刚刚从 Clash 迁移到 sing-box 的用户来说，面对庞大的 `config.json` 往往会感到无从下手。sing-box 的强项在于它的高自由度，但代价则是极其严格的 JSON 语法规范。

本文整理了新手配置 sing-box 时最容易踩坑的几个“名场面”，并教你如何一步步进行节点排查。

---

## 1. 最致命的错误：JSON 语法错误 (Syntax Error)

sing-box 使用标准的 JSON 格式作为配置文件。不同于 YAML（Clash 使用的格式），JSON 对符号的要求非常严苛。

### 常见症状
客户端直接无法启动，或者在日志 (Logs) 中报错：
`FATAL: decode config: unexpected end of JSON input` 或 `invalid character '}' looking for beginning of object key string`。

### 踩坑分析
* **多余的逗号**：JSON 中，数组或对象的**最后一个元素后面相对不能有逗号**。这是最常见的错误！
* **缺少引号**：JSON 的所有 Key（键名）都必须用双引号 `""` 包裹，单引号 `''` 是不被允许的。
* **括号不匹配**：缺少了对应的 `{}` 或 `[]`。

### 解决办法
强烈建议使用带有语法高亮和错误提示的编辑器（如 VS Code）来修改 `config.json`，或者在保存前，将内容复制到网上的 [JSON 校验工具](https://jsonlint.com/) 中进行一次 Format 检查。

---

## 2. 节点连不上：DNS 解析失败 (DNS Resolution Failed)

配置完全通过了语法检查，客户端也成功跑起来了，但是所有的网站都打不开。

### 常见症状
日志中疯狂刷出红色的错误：
`[Error] [outbound] dial proxy: dial tcp: lookup xxx.com: no such host`

### 踩坑分析
这说明 sing-box 在尝试连接远端节点时，无法解析节点服务器的域名。通常是因为 `dns` 模块没有配置正确的服务器，或者 DNS 请求被本地网络劫持。

### 解决办法
在您的 `config.json` 的 `dns` 模块中，确保至少有一个可靠的直连 DNS 服务器，用于解析节点的真实 IP。

```json
{
  "dns": {
    "servers": [
      {
        "tag": "dns-direct",
        "address": "223.5.5.5", // 阿里云公共 DNS
        "detour": "direct" // 强制走直连，不走代理
      },
      {
        "tag": "dns-remote",
        "address": "https://8.8.8.8/dns-query",
        "detour": "proxy"
      }
    ],
    "rules": [
      {
        "outbound": "any",
        "server": "dns-direct"
      }
    ]
  }
}
```

---

## 3. 路由失效：国内外流量全部走代理 (Global Proxy)

本意是想国内直连、国外代理，结果发现连国内网站（如百度、淘宝）也变得奇慢无比，IP 变成了海外 IP。

### 常见症状
使用 [IP查询](/tools/ip/) 测试，发现无论访问什么网站，都显示海外节点 IP。

### 踩坑分析
sing-box 的路由 `route` 模块是**按顺序匹配**的。如果你的默认出站 (Default Outbound) 是代理节点，且前面没有针对国内 IP 或域名的直连规则，那么所有流量都会默认被代理接管。

### 解决办法
在 `route` -> `rules` 数组的最前面，添加对国内流量的直连放行规则。推荐使用 `geosite` 和 `geoip` 数据。

```json
{
  "route": {
    "rules": [
      {
        "geosite": "cn",
        "geoip": ["cn", "private"],
        "outbound": "direct" // 国内域名和 IP 走直连
      }
    ],
    "auto_detect_interface": true
  }
}
```

---

## 4. 总结与建议

排查 sing-box 问题的第一准则是：**永远去看 Log (日志)！** 
遇到问题不要盲目修改配置，打开客户端的日志面板，报错信息往往会直接告诉你错在第几行、哪一个模块。掌握了这一点，你就能彻底驾驭这款强大的网络引擎。
