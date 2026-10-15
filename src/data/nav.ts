export const MAIN_NAV = [
  { label: '首页', href: '/' },
  { 
    label: '机场推荐 💰', 
    href: '/topics/airport-recommendation/',
    children: [
      { label: '🔥 优惠码', href: '/brands/offer/', highlight: true },
      { label: '🚀 2026 机场推荐', href: '/topics/airport-recommendation/' },
      { label: '📊 服务商深度评测', href: '/brands/' },
      { label: '⚖️ 机场对比中心', href: '/compare/' },
    ]
  },
  { 
    label: '代理客户端', 
    href: '/category/clients/',
    children: [
      { label: 'Clash 系列', href: '/tag/clash/' },
      { label: 'sing-box', href: '/tag/sing-box/' },
      { label: 'V2Ray / v2rayN', href: '/tag/v2rayn/' },
      { label: '软件下载', href: '/downloads/' }
    ]
  },
  {
    label: '梯子/VPN',
    href: '/guides/',
    children: [
      { label: '翻墙新手入门', href: '/guides/' },
      { label: 'VPN 与安全', href: '/tag/vpn/' },
      { label: '网络排障与测速', href: '/category/troubleshooting/' }
    ]
  },
  { 
    label: 'AI 工具', 
    href: '/category/ai-tools/',
    children: [
      { label: 'ChatGPT', href: '/tag/chatgpt/' },
      { label: 'Claude', href: '/tag/claude/' },
      { label: 'AI 编程与生产力', href: '/tag/ai-tools/' }
    ]
  },
  { 
    label: '工具箱', 
    href: '/tools/',
    children: [
      { label: 'Clash 配置检测', href: '/tools/clash-checker/' },
      { label: 'IP 与网络查询', href: '/tools/ip/' },
      { label: 'DNS 泄露测试', href: '/tools/dns-leak/' },
      { label: 'WebRTC 检测', href: '/tools/webrtc/' }
    ]
  },
  { label: '所有文章', href: '/blog/' },
  { label: '常见问题', href: '/faq/' }
];

export const FOOTER_NAV = {
  categories: [
    { label: '机场推荐 💰', href: '/topics/airport-recommendation/' },
    { label: '服务商评测 💰', href: '/brands/' },
    { label: '梯子 / 翻墙', href: '/guides/' },
    { label: 'VPN 安全', href: '/tag/vpn/' },
    { label: '网络排障', href: '/category/troubleshooting/' },
    { label: 'AI 工具', href: '/category/ai-tools/' },
  ],
  important: [
    { label: 'Clash', href: '/tag/clash/' },
    { label: 'sing-box', href: '/tag/sing-box/' },
    { label: 'V2Ray / v2rayN', href: '/tag/v2rayn/' },
    { label: '工具箱', href: '/tools/' },
    { label: '最新优惠码', href: '/brands/offer/' },
    { label: '透明数据看板', href: '/data/' },
    { label: '常见问题', href: '/faq/' },
    { label: '所有文章', href: '/blog/' },
    { label: '外部参考资料', href: '/resources/' },
  ],
  legal: [
    { label: '评测方法论 (Methodology)', href: '/methodology/' },
    { label: '免责声明 (Disclaimer)', href: '/disclaimer/' },
    { label: '隐私政策 (Privacy)', href: '/privacy/' },
    { label: '联系我们 (Contact Us)', href: '/contact/' },
  ]
};
