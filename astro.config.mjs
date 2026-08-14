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

// https://astro.build/config
export default defineConfig({
  site: 'https://www.clashwiki.blog',
  integrations: [sitemap({
    filter: (page) => {
      if (page.includes('/go/')) return false;
      
      const tagMatch = page.match(/\/tag\/([^\/]+)\/?$/);
      if (tagMatch) {
        const tagInUrl = tagMatch[1]; 
        // if this encoded tag is not in our valid list, exclude it
        return validTagsForSitemap.includes(tagInUrl) || validTagsForSitemap.includes(decodeURI(tagInUrl));
      }
      
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