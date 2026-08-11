// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.clashwiki.blog',
  integrations: [sitemap({
    filter: (page) => !page.includes('/go/')
  })],
  build: {
    assets: 'assets'
  },
  vite: {
    plugins: [tailwindcss()]
  }
});