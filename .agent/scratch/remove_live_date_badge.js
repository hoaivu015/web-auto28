const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../../');

// 1. Remove HTML badge from index.html & src/components/hero_showroom.html
const htmlFiles = [
  path.join(rootDir, 'index.html'),
  path.join(rootDir, 'src/components/hero_showroom.html')
];

htmlFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Regex to match the badge div wrapper and following <br>
    const badgeRegex = /<div style="background:\s*rgba\(37,\s*99,\s*235,\s*0\.1\);[\s\S]*?id="showroom-live-date-badge"[\s\S]*?<\/div>\s*(\n|\r\n)?\s*(<br\s*\/?>)?/g;
    if (badgeRegex.test(content)) {
      content = content.replace(badgeRegex, '');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Successfully removed date badge HTML from: ${filePath}`);
    } else {
      console.log(`Badge HTML pattern not found in: ${filePath}`);
    }
  }
});

// 2. Remove JS logic referencing showroom-live-date-badge
const jsFiles = [
  path.join(rootDir, 'index.html'),
  path.join(rootDir, 'scripts/build_full_landing_pages.js'),
  path.join(rootDir, 'server.js')
];

jsFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Regex to match the JS block for dateBadge
    const jsRegex = /\/\/\s*Live Date Badge\s*\n\s*const dateBadge = document\.getElementById\('showroom-live-date-badge'\);\s*\n\s*if\s*\(dateBadge\)\s*\{\s*[\s\S]*?\}\n?/g;
    const jsRegexFallback = /const dateBadge = document\.getElementById\('showroom-live-date-badge'\);\s*\n\s*if\s*\(dateBadge\)\s*\{\s*[\s\S]*?\}\n?/g;
    
    if (jsRegex.test(content)) {
      content = content.replace(jsRegex, '');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Successfully removed date badge JS logic from: ${filePath}`);
    } else if (jsRegexFallback.test(content)) {
      content = content.replace(jsRegexFallback, '');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Successfully removed date badge JS logic (fallback) from: ${filePath}`);
    } else {
      console.log(`Badge JS pattern not found in: ${filePath}`);
    }
  }
});
