import os
import glob
import re
import json

directories = ['src/content/blog/*.md', 'src/content/brands/*.md']

results = {}

for pattern in directories:
    for path in glob.glob(pattern, recursive=True):
        if not os.path.isfile(path): continue
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            match = re.search(r'description:\s*(.*?)\n', content)
            if match:
                desc = match.group(1).strip('\"\'')
                hyperbolic_words = ['完美', '极致', '极速', '最佳', '秒开', '最强']
                if any(w in desc for w in hyperbolic_words):
                    results[path] = desc

with open('descriptions_to_fix.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
