import fs from 'fs';
import path from 'path';

// 您可以随时在这里更新要推送的 URL
const URLS_TO_SUBMIT = [
  'https://www.clashwiki.blog/',
  'https://www.clashwiki.blog/blog/',
  // 添加新文章链接，例如:
  // 'https://www.clashwiki.blog/blog/new-article/',
];

const HOST = 'www.clashwiki.blog';
// 请在此填入您从 Bing Webmaster Tools 获取的 API 密钥
// 获取方式: https://www.bing.com/indexnow
const KEY = 'YOUR_INDEXNOW_KEY_HERE';

async function submitToIndexNow() {
  if (KEY === 'YOUR_INDEXNOW_KEY_HERE') {
    console.error('❌ 错误: 请先在 scripts/indexnow.js 中填入您的 IndexNow API 密钥。');
    process.exit(1);
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: URLS_TO_SUBMIT
  };

  try {
    console.log(`正在向 IndexNow 推送 ${URLS_TO_SUBMIT.length} 个链接...`);
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'charset': 'utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('✅ 推送成功! 搜索引擎已收到 URL 更新通知。');
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
