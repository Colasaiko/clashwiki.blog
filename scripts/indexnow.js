import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = 'www.clashwiki.blog';
// 自动生成的专属 Key
const KEY = 'clashwiki-indexnow-key-v2';

async function submitToIndexNow() {
  const sitemapPath = path.join(__dirname, '../dist/sitemap-0.xml');
  
  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ 错误: 找不到 dist/sitemap-0.xml，请先运行 npm run build 打包网站。');
    process.exit(1);
  }

  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
  // 提取所有 <loc> 标签中的 URL
  const urls = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = regex.exec(sitemapContent)) !== null) {
    urls.push(match[1]);
  }

  if (urls.length === 0) {
    console.error('❌ 错误: 在 Sitemap 中未找到任何 URL。');
    process.exit(1);
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls
  };

  try {
    console.log(`📡 正在自动从 Sitemap 中提取 URL... 共发现 ${urls.length} 个页面`);
    console.log(`🚀 正在向 Bing IndexNow 推送全站链接...`);
    
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'charset': 'utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('✅ 推送成功! 搜索引擎已收到您的全站 URL 更新通知。');
      console.log('提示：这会自动解决 Webmaster Tools 中的 "未提交 IndexNow" 错误。');
    } else {
      console.error(`❌ 推送失败: HTTP 状态码 ${response.status}`);
      const text = await response.text();
      console.error(text);
    }
  } catch (error) {
    console.error('❌ 推送异常:', error);
  }
}

submitToIndexNow();
