export const HOMEPAGE_DATA = {
  hero: {
    title: '构建客观专业的网络工具百科',
    subtitle: '基于深度的资料整理、详尽的体验数据与全平台教程，打造客观的网络与 AI 工具资料库。',
    primaryCta: { label: '查看评测数据', href: '/brands/' },
    secondaryCta: { label: '工具配置指南', href: '/category/beginners/' }
  },
  stats: [
    { label: '已深度收录', value: '25+ 家' },
    { label: '深度教程', value: '50+ 篇' },
    { label: '知识库 FAQ', value: '50+ 项' },
    { label: '评测维度', value: '10+ 项' }
  ],
  networkTools: [
    { title: 'Clash 专区', description: 'Windows / Mac / Android / iOS 客户端下载与使用指南', icon: 'shield', href: '/tag/Clash/' },
    { title: 'sing-box', description: '新一代通用网络内核配置解析', icon: 'scale', href: '/blog/' },
    { title: 'Shadowrocket', description: 'iOS 平台最受欢迎的工具教程', icon: 'book', href: '/tag/Shadowrocket/' },
    { title: 'v2rayN', description: '经典 Windows 客户端入门', icon: 'chart', href: '/tag/V2Ray/' },
  ],
  diagnostics: [
    { title: 'IP 查询', description: '检测当前出口 IP 地址、归属地与欺诈分', icon: 'search', href: '/features/' },
    { title: 'DNS 泄露测试', description: '验证您的 DNS 请求是否被运营商劫持', icon: 'question', href: '/features/' },
    { title: '全球公开数据评估', description: '网络带宽吞吐与真实延迟自动化测试', icon: 'chart', href: '/methodology/' },
  ],
  aiTools: [
    { title: 'ChatGPT 使用指南', description: '网络连接、账号环境与常见问题排查', icon: 'shield', href: '/tag/ai-tools/' },
    { title: 'Claude 使用指南', description: 'Claude 网络连接与使用环境指南', icon: 'book', href: '/tag/ai-tools/' },
    { title: 'AI 编程', description: 'AI 辅助编程工具网络优化方案', icon: 'scale', href: '/tag/ai-tools/' },
  ],
  faqs: [
    { question: '选择网络服务商应该看哪些因素？', answer: '主要看稳定性、晚高峰综合评估速度、线路类型（企业级专线或 BGP 中转）、流媒体解锁能力，以及数据透明度。我们建议优先选择提供详细 SLA 且口碑良好的老牌服务商。' },
    { question: '现代网络优化工具和企业 VPN 有什么区别？', answer: '传统的 VPN 主要用于数据加密和企业内网穿透。而现代的网络优化工具在底层架构上更注重混淆与路由优化，其跨国抗干扰能力和速度表现通常优于传统 VPN。' },
    { question: '极低价的网络套餐靠谱吗？', answer: '相对低价往往意味着严重的超售或采用劣质公网线路，在晚高峰极易面临高延迟与丢包，甚至存在随时停止运营的风险。为了稳定的网络体验，建议选择价格在合理区间的高性价比服务。' },
    { question: '服务能解锁特定区域的流媒体与 AI 吗？', answer: '大部分中高端服务商通过配置特定地区的 DNS 解锁或直接提供原生家庭宽带 IP 来实现解锁（如 Netflix, ChatGPT, Claude）。购买前可仔细查看本站的解锁测试报告。' },
    { question: '支持现代协议的服务商怎么选？', answer: '目前绝大多数现代服务商均提供主流的订阅格式。您只需关注其线路质量、节点覆盖区域，以及本站提供的晚高峰客观表现参考数据即可。' }
  ]
};
