export const MAIN_NAV = [
  { label: '首页', href: '/' },
  { 
    label: '新手入门', 
    href: '/topics/beginners/',
    children: [
      { label: '网络工具基础', href: '/blog/airport-acceleration-principles/' },
      { label: 'Clash', href: '/tag/clash/' },
      { label: 'sing-box', href: '/tag/sing-box/' },
      { label: '常见问题', href: '/tag/troubleshooting/' }
    ]
  },
  { 
    label: '网络工具', 
    href: '/topics/clients/',
    children: [
      { label: '客户端', href: '/topics/clients/' },
      { label: '协议', href: '/tag/proxy-protocols/' },
      { label: 'DNS', href: '/blog/sing-box-dns-guide/' },
      { label: '网络诊断', href: '/tag/network-diagnostics/' }
    ]
  },
  {
    label: '服务评测',
    href: '/brands/',
    children: [
      { label: '品牌评测', href: '/brands/' },
      { label: '价格对比', href: '/compare/' },
      { label: '测试数据', href: '/data/' }
    ]
  },
  { 
    label: 'AI 工具', 
    href: '/tag/ai-tools/',
    children: [
      { label: 'ChatGPT', href: '/tag/chatgpt/' },
      { label: 'Claude', href: '/tag/claude/' },
      { label: 'Cursor', href: '/blog/cursor-ai-programming-guide/' },
      { label: 'Perplexity', href: '/blog/perplexity-ai-search-tutorial/' }
    ]
  },
  { 
    label: '工具', 
    href: '/tools/',
    children: [
      { label: 'IP 查询', href: '/tools/ip/' },
      { label: 'DNS Leak', href: '/tools/dns-leak/' },
      { label: 'Ping', href: '/tools/ping/' },
      { label: 'WebRTC', href: '/tools/webrtc/' }
    ]
  }
];

export const FOOTER_NAV = {
  categories: [
    { label: '新手入门', href: '/topics/beginners/' },
    { label: '网络工具', href: '/topics/clients/' },
    { label: '服务评测', href: '/brands/' },
    { label: 'AI 工具', href: '/tag/ai-tools/' },
  ],
  important: [
    { label: '横评对比', href: '/compare/' },
    { label: '测试数据', href: '/data/' },
    { label: '评测标准', href: '/methodology/' },
    { label: '在线工具', href: '/tools/' },
    { label: '关于我们', href: '/about/' },
  ],
  legal: [
    { label: '免责声明', href: '/disclaimer/' },
    { label: '隐私政策', href: '/privacy/' },
  ]
};
