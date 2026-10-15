---
title: "sing-box 配置报错？JSON 语法错误排查"
description: "每次改完 sing-box 配置，启动就提示 parse 错误？手把手教你看懂 sing-box 报错日志，并避开最常见的 JSON 语法陷阱，轻松解决各种配置难题。"
pubDate: 2026-08-31
author: "Clash Wiki 极客组"
category: "故障排查"
tags: ['sing-box', '配置规则', '故障排查', '客户端教程']
image: "/og/sing-box-theme.jpg"
---

不同于 [Clash](/tag/clash/) 采用极度宽松、甚至依靠空格缩进的 YAML 语法，**[sing-box](/tag/sing-box/) 采用了极其严格的 JSON 语法**。

很多习惯了 Clash 的极客玩家，第一次手搓 sing-box 配置文件时，都会被满屏的 `[Fatal] failed to parse config` 报错折磨到怀疑人生。

其实，sing-box 的报错不仅不吓人，反而非常精准。只要你掌握了 JSON 的几个“死规定”，99% 的错误都能在 1 分钟内解决。

---

## 常见报错 1：逗号引发的血案 (Trailing Comma)

**错误提示**：
`FATAL [0000] failed to parse config: json: cannot unmarshal string into Go value of type...` 或者直接在编辑器里标红。

**原因分析**：
这是 JSON 语法中最最最常见的错误——**多写了或少写了逗号**。
在 JSON 字典或数组中，最后一个元素**绝对不能有逗号**，而中间的元素**必须有逗号**。

❌ **错误写法**：
```json
"outbounds": [
  {
    "type": "vless",
    "server": "1.1.1.1", // 这里有逗号，是对的
  }, // 错误！这是数组的最后一个元素，不能有逗号！
]
```

✅ **正确写法**：
```json
"outbounds": [
  {
    "type": "vless",
    "server": "1.1.1.1" // 删除了逗号，正确！
  }
]
```

---

## 常见报错 2：括号不匹配

**错误提示**：
`FATAL [0000] failed to parse config: unexpected end of JSON input`

**原因分析**：
你的 `{ }` (大括号/花括号) 或者 `[ ]` (中括号/方括号) 没有成对出现。
通常是因为你在复制粘贴某一段路由规则时，少复制了最后的一个 `]`，导致整个文件结构崩溃。

**解决方案**：
**不要用记事本改代码！不要用记事本改代码！不要用记事本改代码！**
请下载使用免费的 **VS Code** 软件，它会自动为你将大括号匹配上对应的颜色。如果你少了一个括号，整个文件底部都会亮起红色的波浪线。

---

## 常见报错 3：双引号 vs 单引号

**错误提示**：
`FATAL [0000] failed to parse config: invalid character '\'' looking for beginning of object key string`

**原因分析**：
在 JS 或 Python 语言中，单引号 `' '` 和双引号 `" "` 可以混用。
但 **JSON 是一门死板的格式，它只认双引号 `" "`**！所有的 Key（键名）和 String（字符串值）都必须用双引号包裹。

❌ **错误写法**：
```json
{
  'type': 'direct', // 错误！不能用单引号
  tag: "proxy" // 错误！Key (tag) 必须被双引号包裹
}
```

✅ **正确写法**：
```json
{
  "type": "direct",
  "tag": "proxy"
}
```

---

## 常见报错 4：找不到 Outbound (路由规则写飞了)

**错误提示**：
`FATAL [0000] route: default outbound not found` 或 `outbound proxy not found`

**原因分析**：
你的 JSON 语法完全正确，成功骗过了编辑器，但是逻辑错了。
你在 `route` (路由) 规则里写了让某个网站走 `tag: "proxy"` 的出口，但是在你的 `outbounds` (出口) 列表中，根本没有哪一个节点的 tag 叫 `proxy`。

**解决方案**：
检查你的路由规则：
```json
"rules": [
  {
    "domain_suffix": ["youtube.com"],
    "outbound": "my-proxy" 
  }
]
```
确认你的 `outbounds` 里确实存在这个名字：
```json
"outbounds": [
  {
    "type": "vless",
    "tag": "my-proxy", // 名字必须完全匹配大小写！
    "server": "..."
  }
]
```

---

## 终极排错利器

如果你对着几十行代码找不出到底错在哪里，不要折磨自己的眼睛，直接使用自动化工具：

1. **JSON 格式化校验网站**：打开 [JSON Lint](https://jsonlint.com/)，把你的整段配置粘贴进去，点击 `Validate JSON`。它会直接告诉你第几行第几个字符错了。
2. **AI 排错**：把报错信息和你的配置文件直接发给 [ChatGPT](/tag/chatgpt/) 或 [Claude](/tag/claude/)，输入指令：“帮我检查这段 sing-box 配置文件的 JSON 语法错误”，AI 通常能在一秒钟内帮你精准定位并修复代码。
