import { defineCollection, z } from 'astro:content';

const ALLOWED_TAGS = [
  'Clash', 'Clash Verge', 'ClashX', 'sing-box', 'Shadowrocket', 'V2Ray', 'v2rayN', 'Hiddify',
  'Android', 'iOS', 'Windows', 'macOS', 'Linux',
  'Hysteria 2', 'VLESS', 'Trojan', 'IPLC', 'IEPL', '代理协议',
  '客户端教程', '安卓教程', '苹果教程', '实用教程', '配置文件', '分流规则',
  'IP查询', '网络诊断', '网络安全', '节点排查',
  '机场推荐', '专线', '流媒体', '游戏加速',
  'AI 工具', 'AI 编程', 'AI 搜索', 'ChatGPT', 'Claude'
] as const;

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.any().optional(),
    updatedDate: z.any().optional(),
    category: z.string().optional(),
    tags: z.array(z.enum(ALLOWED_TAGS)).optional(),
    image: z.string().optional(),
  }).catchall(z.any())
});

const brands = defineCollection({
  schema: z.object({
    name: z.string(),
    description: z.string(),
    tags: z.array(z.enum(ALLOWED_TAGS)).optional(),
    updatedDate: z.any().optional(),
    scores: z.object({
      stability: z.number().min(0).max(5),
      latency: z.number().min(0).max(5),
      speed: z.number().min(0).max(5),
      price: z.number().min(0).max(5),
      client_support: z.number().min(0).max(5),
      service: z.number().min(0).max(5),
    }).optional(),
    last_checked: z.object({
      price: z.string().or(z.date()),
      network: z.string().or(z.date()),
      streaming: z.string().or(z.date()),
      ai_support: z.string().or(z.date()),
    }).optional(),
    protocols: z.array(z.string()).optional(),
    node_tests: z.array(z.object({
      region: z.string(),
      latency: z.string(),
      down: z.string(),
      up: z.string(),
      loss: z.string(),
    })).optional(),
    unblock: z.array(z.object({
      name: z.string(),
      supported: z.boolean(),
    })).optional(),
    pros: z.array(z.string()).optional(),
    cons: z.array(z.string()).optional(),
    audience: z.object({
      suitable: z.array(z.string()),
      unsuitable: z.array(z.string()),
    }).optional(),
  }).catchall(z.any())
});

const topics = defineCollection({
  schema: z.object({}).catchall(z.any())
});

export const collections = {
  blog,
  brands,
  topics
};
