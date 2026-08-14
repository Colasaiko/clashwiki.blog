import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'src/content/topics');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const fp = path.join(dir, file);
  let content = fs.readFileSync(fp, 'utf-8');
  content = content.replace(/^# /gm, '## ');
  fs.writeFileSync(fp, content, 'utf-8');
}
