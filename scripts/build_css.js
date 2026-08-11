const fs = require('fs');
const path = require('path');

function bundleCss() {
    console.log("Building bundled style.css (Zero-Waterfall)...");
    const rootDir = path.join(__dirname, '..');
    const stylesDir = path.join(rootDir, 'styles');

    const cssFiles = [
        'tokens.css',
        'base.css',
        'nav.css',
        'hero.css',
        'cards-vehicle.css',
        'cards-bento.css',
        'valuation.css',
        'modal-gallery.css',
        'modal-form.css',
        'sections.css',
        'footer.css',
        'responsive.css',
        'guide.css'
    ];

    let bundledContent = `/* ==========================================================================
   NEURAL EXPRESSIVE DESIGN SYSTEM — Auto 28 VinFast Used Cars
   Bundled Master CSS (Zero-Waterfall High Performance Edition)
   ========================================================================== */\n\n`;

    cssFiles.forEach(file => {
        const filePath = path.join(stylesDir, file);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            bundledContent += `/* --- File: ${file} --- */\n` + content + '\n\n';
        } else {
            console.warn(`Warning: Style file ${file} not found in styles directory.`);
        }
    });

    const targetPath = path.join(rootDir, 'style.css');
    fs.writeFileSync(targetPath, bundledContent, 'utf8');
    console.log(`✅ Successfully bundled ${cssFiles.length} stylesheets into style.css (${(bundledContent.length / 1024).toFixed(1)} KB)`);
}

bundleCss();
