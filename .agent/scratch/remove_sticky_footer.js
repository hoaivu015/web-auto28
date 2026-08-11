const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..');
const htmlFiles = fs.readdirSync(projectDir).filter(f => f.endsWith('.html'));

let totalModified = 0;

htmlFiles.forEach(file => {
    const filePath = path.join(projectDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Regex matching comments and sticky-footer div block
    const stickyPattern = /\s*<!--\s*📱?\s*STICKY FOOTER MOBILE\s*-->\s*<div class="sticky-footer" id="sticky-cta">[\s\S]*?<\/div>/g;
    const stickyDivOnly = /\s*<div class="sticky-footer" id="sticky-cta">[\s\S]*?<\/div>/g;

    let updated = content.replace(stickyPattern, '');
    updated = updated.replace(stickyDivOnly, '');

    if (updated !== content) {
        fs.writeFileSync(filePath, updated, 'utf8');
        console.log(`✅ Removed sticky footer from: ${file}`);
        totalModified++;
    } else {
        console.log(`ℹ️ No sticky footer found in: ${file}`);
    }
});

console.log(`\n🎉 Total HTML files updated: ${totalModified}`);
