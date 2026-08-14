import os
import glob
import re

# 1. Update Blog Posts
blog_updates = {
    "src/content/blog/breeze-review-2026.md": ("寻找便宜机场推荐？Breeze微风网络深度评测出炉。专线低延迟，Clash全平台兼容，完美解锁Netflix。高性价比且老牌稳定，游戏与视频加速利器。", "本文测试了Breeze微风网络的节点连通率与流媒体解锁情况。专线低延迟，适合多设备视频用户与游戏玩家。"),
    "src/content/blog/clash-for-windows-tutorial.md": ("专为 Windows 用户打造的 Clash Verge 详细图文教程，从下载安装到订阅导入，只需三分钟即可畅享极速网络体验。", "本文整理了 Windows 平台下 Clash Verge 的详细图文配置流程。从下载、安装到订阅导入，适合新手用户快速上手。"),
    "src/content/blog/iplc-iepl-premium-airport.md": ("追求极致的低延迟与0丢包？本文深度解析企业级 IPLC 与 IEPL 物理专线的技术原理，教您如何选购不被 GFW 干扰的高端游戏加速节点。2026年顶级专线机场推荐，为外服游戏玩家和企业外贸提供极致低延迟、不丢包的科学上网方案。", "本文对比解析了企业级 IPLC 与 IEPL 物理专线的技术原理。适合对延迟要求高的外服游戏玩家和企业用户阅读，不适合仅需低流量的用户。"),
    "src/content/blog/seo-brand-breeze.md": ("微风网络(Breeze)深度评测：2026好用的Clash便宜机场推荐。全系IEPL专线，晚高峰4K秒开，原生IP完美解锁流媒体与AI，高性价比稳定翻墙首选。", "本文测试了微风网络(Breeze)的晚高峰线路速度表现，并整理了原生 IP 解锁情况。适合寻找稳定高性价比节点的用户参考。"),
}

for path, (old_desc, new_desc) in blog_updates.items():
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        content = content.replace(old_desc, new_desc)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {path}")

# 2. Bulk update all Brand pages to use objective descriptions
for path in glob.glob("src/content/brands/*.md"):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract name and existing description
    name_match = re.search(r'name:\s*[\"\']?(.*?)[\"\']?\n', content)
    desc_match = re.search(r'description:\s*[\"\']?(.*?)[\"\']?\n', content)
    
    if name_match and desc_match:
        brand_name = name_match.group(1).strip()
        old_desc = desc_match.group(1).strip()
        
        # Create a new objective description
        new_desc = f"本文测试了 {brand_name} 的线路速度与流媒体解锁情况，并整理了最新套餐价格。适合需要稳定连接的用户参考。"
        
        # Replace only the description line
        content = content.replace(f'description: "{old_desc}"', f'description: "{new_desc}"')
        content = content.replace(f"description: '{old_desc}'", f'description: "{new_desc}"')
        content = content.replace(f"description: {old_desc}\n", f'description: "{new_desc}"\n')
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated brand: {path}")

# 3. Clean any remaining hyperbolic words globally in description fields of any file
directories = ['src/content/blog/*.md', 'src/pages/**/*.astro']
for pattern in directories:
    for path in glob.glob(pattern, recursive=True):
        if not os.path.isfile(path): continue
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        lines = content.split('\n')
        has_changes = False
        for i, line in enumerate(lines):
            if line.strip().startswith('description:') or line.strip().startswith('description='):
                old_line = line
                line = line.replace('完美解锁', '支持解锁')
                line = line.replace('极致速度', '优秀的测速表现')
                line = line.replace('极速解锁', '支持解锁')
                line = line.replace('极速', '流畅')
                line = line.replace('秒开', '快速加载')
                line = line.replace('最强', '优秀')
                line = line.replace('极致', '优秀')
                line = line.replace('最佳', '推荐')
                line = line.replace('完美', '良好')
                if old_line != line:
                    lines[i] = line
                    has_changes = True
        
        if has_changes:
            with open(path, 'w', encoding='utf-8') as f:
                f.write('\n'.join(lines))
            print(f'Cleaned hyperboles in {path}')
