import fs from 'fs';
import path from 'path';

const brandsData = {
  'breeze.md': `protocols:
  - IPLC
  - 游戏专线
node_tests:
  - region: 香港 IPLC
    latency: 28ms
    down: 850Mbps
    up: 200Mbps
    loss: 0%
  - region: 日本 IEPL
    latency: 35ms
    down: 620Mbps
    up: 150Mbps
    loss: 0%
  - region: 美国 优化
    latency: 125ms
    down: 450Mbps
    up: 100Mbps
    loss: 0.1%
unblock:
  - name: Netflix
    supported: true
  - name: Disney+
    supported: true
  - name: YouTube
    supported: true
  - name: ChatGPT
    supported: true
  - name: Claude
    supported: true
  - name: Gemini
    supported: true
pros:
  - 极品游戏专线，晚高峰 0 丢包
  - 速度跑满带宽，无视晚高峰
  - 解锁极其全面，原生节点多
cons:
  - 价格门槛较高，无廉价套餐
  - 严格限制同时在线设备数
audience:
  - suitable:
    - 追求极致延迟的硬核游戏玩家
    - 预算充足的 4K 发烧友
    - 无法忍受任何断流的高端用户
  - unsuitable:
    - 只需要偶尔看网页的轻度用户
    - 追求便宜大碗的白嫖党`,
  
  'firefly.md': `protocols:
  - IEPL
  - 流媒体解锁
node_tests:
  - region: 新加坡 原生
    latency: 48ms
    down: 550Mbps
    up: 100Mbps
    loss: 0.2%
  - region: 台湾 优化
    latency: 55ms
    down: 480Mbps
    up: 80Mbps
    loss: 0.5%
  - region: 英国 流媒体
    latency: 160ms
    down: 350Mbps
    up: 60Mbps
    loss: 0.2%
unblock:
  - name: Netflix
    supported: true
  - name: Disney+
    supported: true
  - name: Hulu
    supported: true
  - name: HBO Max
    supported: true
  - name: ChatGPT
    supported: true
  - name: Claude
    supported: false
pros:
  - 专门针对全球 20+ 流媒体平台优化
  - DNS 解锁技术过硬，几乎不断连
  - 价格适中，提供家庭共享套餐
cons:
  - 游戏延迟优化不如 IPLC 专线
  - 对部分冷门 AI 平台支持一般
audience:
  - suitable:
    - Netflix/Disney+ 重度追剧狂人
    - 需要多地区影视资源的影视解说
  - unsuitable:
    - 对延迟要求苛刻的电竞玩家`,

  'flashleap.md': `protocols:
  - IEPL
  - 原生 IP
node_tests:
  - region: 美国 AI原生
    latency: 130ms
    down: 680Mbps
    up: 120Mbps
    loss: 0.1%
  - region: 英国 跨境专线
    latency: 155ms
    down: 540Mbps
    up: 100Mbps
    loss: 0%
  - region: 香港 优化
    latency: 38ms
    down: 450Mbps
    up: 80Mbps
    loss: 0.2%
unblock:
  - name: ChatGPT
    supported: true
  - name: Claude
    supported: true
  - name: Midjourney
    supported: true
  - name: Perplexity
    supported: true
  - name: Netflix
    supported: true
  - name: Disney+
    supported: false
pros:
  - 拥有大量高纯净度原生住宅 IP
  - 完美绕过 Claude 和 ChatGPT 风控
  - 跨国传输大文件速度极快
cons:
  - 亚太流媒体节点较少
  - 价格属于中高档
audience:
  - suitable:
    - AI 工具重度依赖者及开发者
    - 需要干净 IP 进行跨境电商的人士
  - unsuitable:
    - 纯粹的亚太区追剧党`,

  'civet.md': `protocols:
  - BGP
  - 优化直连
node_tests:
  - region: 日本 BGP
    latency: 85ms
    down: 210Mbps
    up: 50Mbps
    loss: 1.2%
  - region: 美国 优化
    latency: 165ms
    down: 180Mbps
    up: 40Mbps
    loss: 1.5%
  - region: 香港 BGP
    latency: 65ms
    down: 250Mbps
    up: 60Mbps
    loss: 0.8%
unblock:
  - name: YouTube
    supported: true
  - name: ChatGPT
    supported: true
  - name: Netflix
    supported: false
  - name: Disney+
    supported: false
  - name: Claude
    supported: false
  - name: Hulu
    supported: false
pros:
  - 价格极度亲民，常年 9.9 元/月起
  - 流量给得极大，动辄 500GB+
  - 刷网页和看 YouTube 1080P 毫无压力
cons:
  - 晚高峰丢包率和延迟明显升高
  - 流媒体解锁随缘，不保证原生 IP
audience:
  - suitable:
    - 预算极其有限的学生党
    - 只需要刷刷推特、查查资料的轻度用户
  - unsuitable:
    - 晚高峰需要打游戏或看 4K 视频的用户`,

  'worryfree.md': `protocols:
  - IEPL
  - BGP 混合
node_tests:
  - region: 香港 IEPL
    latency: 36ms
    down: 420Mbps
    up: 80Mbps
    loss: 0.5%
  - region: 日本 优化
    latency: 55ms
    down: 380Mbps
    up: 70Mbps
    loss: 0.8%
  - region: 美国 专线
    latency: 145ms
    down: 320Mbps
    up: 60Mbps
    loss: 0.5%
unblock:
  - name: Netflix
    supported: true
  - name: Disney+
    supported: true
  - name: YouTube
    supported: true
  - name: ChatGPT
    supported: true
  - name: Claude
    supported: false
  - name: Gemini
    supported: true
pros:
  - 各项指标均衡，没有明显的短板
  - 节点存活率高，有备用的防失联机制
  - 价格处于行业平均水平，性价比较高
cons:
  - 缺乏极其拔尖的“测速起飞”节点
  - 部分冷门国家节点较少
audience:
  - suitable:
    - 寻求省心、不需要折腾的普通用户
    - 需要一个靠谱主力或优质备用的用户
  - unsuitable:
    - 对某些特定小众需求有极高要求的极客`,

  'kuajie.md': `protocols:
  - 直连
  - BGP
node_tests:
  - region: 香港 BGP
    latency: 55ms
    down: 150Mbps
    up: 30Mbps
    loss: 2.5%
  - region: 台湾 直连
    latency: 68ms
    down: 120Mbps
    up: 20Mbps
    loss: 3.0%
  - region: 狮城 优化
    latency: 85ms
    down: 100Mbps
    up: 20Mbps
    loss: 2.8%
unblock:
  - name: YouTube
    supported: true
  - name: Google
    supported: true
  - name: Netflix
    supported: false
  - name: ChatGPT
    supported: false
  - name: Disney+
    supported: false
  - name: Claude
    supported: false
pros:
  - 拥有极低门槛的“年付保号”套餐
  - 流量池庞大，适合做下载备用
  - 注册简单，支持多种廉价支付方式
cons:
  - 晚高峰测速惨不忍睹，丢包严重
  - 几乎没有任何流媒体解锁保证
audience:
  - suitable:
    - 已经有主力机场，需要一个极廉价备用站的用户
    - 纯粹的“大流量下载”垃圾佬
  - unsuitable:
    - 把它当做唯一主力使用的任何人`
};

// Also I want to change scores to match their profile.
const scoreData = {
  'breeze.md': { stability: 9.8, peak_speed: 9.9, latency: 9.8, packet_loss: 9.9, streaming: 9.5, ai_support: 9.0, price: 6.0 },
  'firefly.md': { stability: 9.0, peak_speed: 8.5, latency: 8.0, packet_loss: 8.5, streaming: 9.9, ai_support: 7.5, price: 8.0 },
  'flashleap.md': { stability: 9.2, peak_speed: 9.5, latency: 8.5, packet_loss: 9.0, streaming: 7.5, ai_support: 9.9, price: 7.0 },
  'civet.md': { stability: 6.5, peak_speed: 7.0, latency: 6.0, packet_loss: 6.0, streaming: 5.0, ai_support: 7.0, price: 9.8 },
  'worryfree.md': { stability: 8.5, peak_speed: 8.0, latency: 8.5, packet_loss: 8.5, streaming: 8.5, ai_support: 8.5, price: 8.5 },
  'kuajie.md': { stability: 5.5, peak_speed: 6.0, latency: 5.0, packet_loss: 4.5, streaming: 4.0, ai_support: 5.0, price: 9.5 },
};

const dir = path.join(process.cwd(), 'src/content/brands');

for (const [filename, specificFrontmatter] of Object.entries(brandsData)) {
  const fp = path.join(dir, filename);
  let content = fs.readFileSync(fp, 'utf-8');
  
  // Strip out old protocols, node_tests, unblock, pros, cons, audience
  // We can just use a regex to replace everything from "protocols:" onwards up to the final "---"
  content = content.replace(/protocols:[\s\S]*?(?=\n---)/, specificFrontmatter.trim());
  
  // Replace scores
  const scores = scoreData[filename];
  const newScoresYaml = "scores:\\n" +
  "  stability: " + scores.stability + "\\n" +
  "  peak_speed: " + scores.peak_speed + "\\n" +
  "  latency: " + scores.latency + "\\n" +
  "  packet_loss: " + scores.packet_loss + "\\n" +
  "  streaming: " + scores.streaming + "\\n" +
  "  ai_support: " + scores.ai_support + "\\n" +
  "  price: " + scores.price;
  
  content = content.replace(/scores:[\s\S]*?(?=last_checked:)/, newScoresYaml + '\\n');
  
  fs.writeFileSync(fp, content, 'utf-8');
  console.log('Updated ' + filename);
}
