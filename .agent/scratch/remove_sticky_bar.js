const fs = require('fs');
const path = require('path');

const targetFiles = [
  path.join(__dirname, '../../guide.html'),
  path.join(__dirname, '../../guide-ev.html')
];

targetFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Regex to remove sticky mobile bar div and optional preceding comment
  const regex = /(\s*<!--\s*📱\s*STICKY MOBILE FOOTER BAR\s*-->)?\s*<div class="guide-sticky-mobile-bar">[\s\S]*?<\/div>\n?/g;
  
  if (regex.test(content)) {
    content = content.replace(regex, '');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully removed guide-sticky-mobile-bar from: ${filePath}`);
  } else {
    console.log(`Pattern not found in: ${filePath}`);
  }
});
