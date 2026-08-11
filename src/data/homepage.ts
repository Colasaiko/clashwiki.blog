export const HOMEPAGE_DATA = {
  hero: {
    title: '寻找最适合您的科学上网工具',
    subtitle: '专业的机场评测、稳定节点推荐与全平台客户端教程，助您畅游国际互联网。',
    primaryCta: { label: '查看机场推荐', href: '/category/airports/' },
    secondaryCta: { label: '新手入门教程', href: '/category/tutorials/' }
  },
  stats: [
    { label: '评测维度', value: '10+' },
    { label: '收录品牌', value: '50+' },
    { label: '更新频率', value: '每周' },
    { label: '覆盖分类', value: '8大类' }
  ],
  features: [
    { title: '教程指南', description: '全平台客户端使用图文教程，小白也能轻松上手', icon: 'book', href: '/category/tutorials/' },
    { title: '客观评测', description: '多维度晚高峰实测，为您提供真实的速度与延迟数据', icon: 'chart', href: '/category/airports/' },
    { title: '深度对比', description: '专线与中转、不同价格区间的详尽参数横向对比', icon: 'scale', href: '/compare/' },
    { title: '品牌库', description: '收录各大主流老牌及高性价比新锐机场，快速直达', icon: 'shield', href: '/brands/' },
    { title: '长尾问题', description: '从节点解析到流媒体解锁，全面解答您的疑问', icon: 'search', href: '/blog/' },
    { title: '常见解答', description: '遇到连接失败、流量耗尽？在这里找解决方案', icon: 'question', href: '/#faqs' }
  ],
  faqs: [
    { question: '机场推荐应该看哪些因素？', answer: '主要看稳定性、晚高峰速度、线路类型（IPLC/IEPL 专线或中转）、流媒体解锁能力、以及性价比。我们建议优先选择有专线且口碑良好的老牌服务商。' },
    { question: '机场和 VPN 有什么区别？', answer: '传统的 VPN 主要用于数据加密和企业内网穿透，特征明显易被封锁。而机场采用 SSR/V2Ray/Trojan/Shadowsocks 等代理协议，伪装性更强，专为科学上网设计，速度和突破封锁能力远好于传统 VPN。' },
    { question: '便宜机场靠谱吗？', answer: '低价往往意味着超售或线路质量差（如直连线），在晚高峰极易卡顿或断流，甚至面临跑路风险。建议选择价格在合理区间（如月付 20-40 元）的高性价比机场，避免贪图绝对低价。' },
    { question: '机场能解锁 Netflix / ChatGPT 吗？', answer: '大部分中高端机场都提供流媒体解锁和 AI 工具（如 ChatGPT、Claude）解锁服务，主要是通过特定地区的 DNS 解锁或原生 IP 节点实现。购买前可查看其套餐说明。' },
    { question: 'Clash 机场推荐怎么选？', answer: '目前绝大多数机场都支持 Clash（包括 Clash Verge, Mihomo 等）。如果是 Clash 用户，只需关注机场的线路质量和一键导入订阅的体验即可，本站推荐的机场均完美支持。' }
  ]
};
