export const tagSlugMap: Record<string, string> = {
  '机场推荐': 'airport-recommendation',
  '专线': 'premium-routes',
  '流媒体': 'streaming',
  '游戏加速': 'gaming-acceleration',
  '网络诊断': 'network-diagnostics',
  '节点排查': 'troubleshooting',
  '网络安全': 'cyber-security',
  '实用教程': 'tutorials',
  'AI 工具': 'ai-tools',
  'AI 编程': 'ai-programming',
  'AI 搜索': 'ai-search',
  'IP查询': 'ip-check',
  '客户端教程': 'client-tutorials',
  '安卓教程': 'android-tutorials',
  '配置文件': 'config-files',
  '分流规则': 'routing-rules',
  '代理协议': 'proxy-protocols',
  '苹果教程': 'apple-tutorials'
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