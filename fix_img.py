import os, glob, re

files = glob.glob('src/content/**/*.md', recursive=True)
md_img_pattern = re.compile(r'!\[([^\]]*)\]\(([^)]+)\)')

def replace_md_img(match):
    alt = match.group(1)
    src = match.group(2)
    return f'<img src="{src}" alt="{alt}" width="1200" height="675" class="w-full h-auto rounded-xl shadow-md my-6" />'

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace markdown images
    new_content = md_img_pattern.sub(replace_md_img, content)
    
    # Also fix existing HTML img tags missing width/height
    def fix_html_img(match):
        img_tag = match.group(0)
        if 'width=' not in img_tag:
            img_tag = img_tag.replace('<img ', '<img width="1200" height="675" ')
        return img_tag
    
    new_content = re.sub(r'<img [^>]+>', fix_html_img, new_content)
    
    if new_content != content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
