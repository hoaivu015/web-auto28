const fs = require('fs');
const path = require('path');

// Read all CSS files imported in style.css
const styleCss = fs.readFileSync(path.join(__dirname, '../style.css'), 'utf8');
console.log('--- Checking style.css imports ---');
const imports = styleCss.match(/@import url\('([^']+)'\);/g);
console.log(imports);

// Read modal-360.css
const modal360 = fs.readFileSync(path.join(__dirname, '../styles/modal-360.css'), 'utf8');
console.log('\n--- Checking modal-360.css rules ---');

const visualPanelMatch = modal360.match(/\.modal-visual-panel\s*\{[^}]+\}/s);
console.log('.modal-visual-panel:\n', visualPanelMatch ? visualPanelMatch[0] : 'NOT FOUND');

const wrapperMatch = modal360.match(/\.modal-image-wrapper\s*\{[^}]+\}/s);
console.log('.modal-image-wrapper:\n', wrapperMatch ? wrapperMatch[0] : 'NOT FOUND');

const activeImgMatch = modal360.match(/\.modal-active-img\s*\{[^}]+\}/s);
console.log('.modal-active-img:\n', activeImgMatch ? activeImgMatch[0] : 'NOT FOUND');

// Check if any other CSS file has overrides for modal-visual-panel or modal-image-wrapper or modal-active-img
const stylesDir = path.join(__dirname, '../styles');
const cssFiles = fs.readdirSync(stylesDir).filter(f => f.endsWith('.css'));

cssFiles.forEach(file => {
    const content = fs.readFileSync(path.join(stylesDir, file), 'utf8');
    if (file !== 'modal-360.css') {
        ['modal-visual-panel', 'modal-image-wrapper', 'modal-active-img', 'modal-wrapper', 'modal-content-inner'].forEach(term => {
            if (content.includes(term)) {
                console.log(`\nFound "${term}" in ${file}:`);
                const lines = content.split('\n').filter(l => l.includes(term));
                console.log(lines.join('\n'));
            }
        });
    }
});
