export const MAIN_NAV = [
  { label: '首页', href: '/' },
  { 
    label: '客户端', 
    href: '/tag/Clash/',
    children: [
      { label: 'Clash', href: '/tag/Clash/' },
      { label: 'Clash Verge', href: '/blog/clash-verge-vs-clash-for-windows/' },
      { label: 'sing-box', href: '/tag/sing-box/' },
      { label: 'Shadowrocket', href: '/tag/Shadowrocket/' },
      { label: 'v2rayN', href: '/tag/v2rayN/' }
    ]
  },
  { 
    label: '网络工具', 
    href: '/tools/',
    children: [
      { label: 'IP & ASN 查询', href: '/tools/ip/' },
      { label: 'DNS 泄漏测试', href: '/tools/dns-leak/' },
      { label: 'WebRTC 探测', href: '/tools/webrtc/' },
      { label: '全球公开数据评估', href: '/tools/ping/' }
    ]
  },
  { 
    label: 'AI 工具', 
    href: '/tag/ai-tools/',
    children: [
      { label: 'ChatGPT 解锁', href: '/tag/chatgpt/' },
      { label: 'Claude 注册', href: '/tag/claude/' },
      { label: 'AI 编程', href: '/tag/ai-programming/' },
      { label: 'AI 搜索', href: '/tag/ai-search/' }
    ]
  },
  {
    label: '教程',
    href: '/category/tutorials/',
    children: [
      { label: 'Windows', href: '/blog/clash-for-windows-tutorial/' },
      { label: 'macOS', href: '/blog/clash-for-mac-tutorial/' },
      { label: 'Android', href: '/blog/clash-for-android-tutorial/' },
      { label: 'iOS', href: '/blog/clash-for-ios-tutorial/' },
      { label: 'Linux', href: '/tag/Linux/' }
    ]
  },
  {
    label: '服务评测',
    href: '/brands/',
    children: [
      { label: '横向对比库', href: '/compare/' },
      { label: '测试数据', href: '/data/' },
      { label: '评测标准', href: '/methodology/' },
      { label: '品牌库', href: '/brands/' },
      { label: '机场推荐榜', href: '/blog/2026-airport-recommendation-guide/' }
    ]
  },
  { label: '内容中心', href: '/topics/' }
];

export const FOOTER_NAV = {
  categories: [
    { label: '机场推荐', href: '/category/airports/' },
    { label: '教程指南', href: '/category/tutorials/' },
    { label: '软件下载', href: '/downloads/' },
  ],
  important: [
    { label: '测试数据', href: '/data/' },
    { label: '产品对比', href: '/compare/' },
    { label: '评测标准', href: '/methodology/' },
    { label: '更新日志', href: '/changelog/' },
    { label: '关于我们', href: '/about/' },
  ],
  legal: [
    { label: '免责声明', href: '/disclaimer/' },
    { label: '隐私政策', href: '/privacy/' },
  ]
};
