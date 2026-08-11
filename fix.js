const fs = require('fs');
const path = './src/content/brands';
fs.readdirSync(path).forEach(f => {
  let fp = path + '/' + f;
  let content = fs.readFileSync(fp);
  let text = content.toString('utf16le');
  if(!text.includes('description:')) text = content.toString('utf8');
  let lines = text.replace(/\r/g, '').split('\n');
  let newLines = [];
  for(let line of lines) {
    if(line.startsWith('image: " /images')) continue;
    newLines.push(line);
  }
  // Also remove extra --- at top and bottom if there are 4 of them
  let dashes = newLines.filter(l => l === '---').length;
  if (dashes > 2) {
      if (newLines[0] === '---' && newLines[1] === '---') newLines.shift();
      if (newLines[newLines.length-1] === '---' && newLines[newLines.length-2] === '---') newLines.pop();
  }
  fs.writeFileSync(fp, newLines.join('\n'), 'utf8');
});
