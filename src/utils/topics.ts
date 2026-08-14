export const TOPIC_TAG_MAPPING: Record<string, string[]> = {
  'beginners': ['客户端教程', '安卓教程', '苹果教程', '实用教程'],
  'streaming': ['流媒体'],
  'budget': ['机场推荐', '便宜机场推荐'],
  'clients': [
    'Clash', 'Clash Verge', 'ClashX', 'sing-box', 'Shadowrocket', 
    'V2Ray', 'v2rayN', 'Hiddify', 'Windows', 'macOS', 'Android', 'iOS', 'Linux'
  ],
  'scam-avoidance': ['网络诊断', '节点排查', '网络安全'],
  'advanced': ['配置文件', '分流规则', '代理协议', 'IPLC', 'IEPL']
};

export function getPostsForTopic(slug: string, allPosts: any[]) {
  const targetTags = TOPIC_TAG_MAPPING[slug] || [];
  
  if (targetTags.length === 0) {
    return [];
  }

  return allPosts.filter(post => {
    const postTags = post.data.tags || [];
    // If the post has at least one tag that matches the topic's mapped tags
    return postTags.some((tag: string) => targetTags.includes(tag));
  });
}
