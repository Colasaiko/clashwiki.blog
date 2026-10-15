export const tagSlugMap: Record<string, string> = {
  '机场测评': 'airport-review',
  '机场推荐': 'airport-recommendation',
  '专线': 'premium-routes',
  '流媒体': 'streaming',
  '游戏加速': 'gaming-acceleration',
  '故障排查': 'troubleshooting',
  '网络诊断': 'network-diagnostics',
  '节点排查': 'troubleshooting',
  '网络安全': 'cyber-security',
  '客户端教程': 'client-tutorials',
  '实用教程': 'tutorials',
  '配置教程': 'config-tutorial',
  '安卓教程': 'android-tutorials',
  '苹果教程': 'apple-tutorials',
  'AI 工具': 'ai-tools',
  'AI 编程': 'ai-programming',
  'AI 搜索': 'ai-search',
  'IP查询': 'ip-check',
  '配置文件': 'config-files',
  '配置规则': 'config-rules',
  '分流规则': 'routing-rules',
  '代理协议': 'proxy-protocols',
  '效率工具': 'productivity-tools',
  '基础科普': 'basics',
  'Agent': 'agent',
  '编程': 'programming',
  '生产力': 'productivity',
  '客户端对比': 'client-comparison',
  '网络原理': 'networking',
  '网络优化': 'network-optimization',
  '网络工具': 'network-tools',
  '路由规则': 'routing-rules',
  '梯子怎么选': 'how-to-choose-vpn',
  '翻墙节点': 'proxy-nodes',
  '便宜机场': 'budget-airports',
  '梯子推荐': 'vpn-recommendation',
  '性价比': 'value-for-money',
  '流媒体解锁': 'streaming-unlock',
  '2026机场测评': '2026-airport-review',
  '测速报告': 'speed-test-report',
  '优惠码': 'promo-codes'
};

export function slugifyTag(tag: string): string {
  if (tagSlugMap[tag]) {
    return tagSlugMap[tag];
  }
  if (/^[a-zA-Z0-9\s\.\-]+$/.test(tag)) {
    return tag.toLowerCase().replace(/\s+/g, '-');
  }
  return encodeURIComponent(tag);
}