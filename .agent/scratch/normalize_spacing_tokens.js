const fs = require('fs');
const path = require('path');

const rootDir = __dirname ? path.dirname(__dirname) : process.cwd();

const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log(`Normalizing spacing tokens across ${files.length} HTML files...`);

let totalReplacements = 0;

files.forEach(file => {
    const filePath = path.join(rootDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Normalizations to strict 4px/8px multiples
    content = content.replace(/margin-top:\s*15px;/g, 'margin-top: 16px;');
    content = content.replace(/margin-bottom:\s*6px;/g, 'margin-bottom: 8px;');
    content = content.replace(/gap:\s*6px;/g, 'gap: 8px;');
    content = content.replace(/width:\s*(?:13|14)px;\s*height:\s*(?:13|14)px;/g, 'width: 16px; height: 16px;');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Normalized ${file}`);
        totalReplacements++;
    }
});

console.log(`Done. Updated ${totalReplacements} files.`);
