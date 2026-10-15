// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

// Parse markdown files to count tags
const blogDir = path.join(process.cwd(), 'src/content/blog');
const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
const tagCounts = {};

blogFiles.forEach(file => {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
  // quick regex to find tags: ["...", "..."]
  const match = content.match(/tags:\s*\[(.*?)\]/);
  if (match) {
    const tagsStr = match[1];
    const tags = tagsStr.split(',').map(t => t.replace(/["']/g, '').trim()).filter(Boolean);
    tags.forEach(t => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
  }
});

const validTagsForSitemap = Object.entries(tagCounts)
  .filter(([tag, count]) => count >= 3)
  .map(([tag]) => encodeURI(tag));

// Nav whitelisted tags MUST be in sitemap regardless of post count
const navWhitelist = ['clash', 'sing-box', 'troubleshooting', 'proxy-protocols', 'network-diagnostics', 'ai-tools', 'chatgpt', 'claude', 'vpn'];

// https://astro.build/config
export default defineConfig({
  site: 'https://www.clashwiki.blog',
  integrations: [sitemap({
    filter: (page) => {
      if (page.includes('/go/') || page.includes('/404') || page.includes('/search')) return false;
      
      const redirects = [
        '/tag/tutorials/', '/tag/config-tutorial/', '/tag/android-tutorials/', '/tag/apple-tutorials/',
        '/tag/ai-programming/', '/tag/ai-search/', '/tag/network-diagnostics/', '/tag/privacy/',
        '/tag/2026-airport-review/', '/tag/budget-airports/', '/tag/vpn-recommendation/',
        '/tag/value-for-money/', '/tag/airport-recommendation/', '/tag/network-optimization/',
        '/tag/network-tools/', '/tag/config-files/', '/tag/json/'
      ];
      if (redirects.some(r => page.includes(r))) return false;
      
      return true;
    }
  })],
  build: {
    assets: 'assets'
  },
  vite: {
    plugins: [tailwindcss()]
  }
});