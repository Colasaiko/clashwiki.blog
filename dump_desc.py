import os
import glob
import re
import codecs

directories = ['src/content/blog/*.md', 'src/content/brands/*.md', 'src/pages/**/*.astro']

for pattern in directories:
    for path in glob.glob(pattern, recursive=True):
        if not os.path.isfile(path): continue
        with codecs.open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            match = re.search(r'description:\s*[\"\']?(.*?)[\"\']?\n', content)
            if not match:
                match = re.search(r'description=[\"\'](.*?)[\"\']', content)
            if match:
                desc = match.group(1)
                hyperbolic_words = ['完美', '极致', '极速', '最佳', '秒开', '最强', '完美解锁', '极致速度', '极速解锁']
                if any(w in desc for w in hyperbolic_words):
                    print(f'{path}:: {desc}')
