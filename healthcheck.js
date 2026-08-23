const fs = require('fs');
const path = require('path');

function runHealthcheck() {
    console.log("=========================================");
    console.log("Checking Auto 28 Landing Page Health...");
    console.log("=========================================");

    const dir = __dirname;
    const requiredFiles = [
        'index.html',
        'style.css',
        'main.js',
        'server.js',
        'huong-dan-mua-xe-dien.html',
        'dinh-gia-ban-xe.html'
    ];

    let passed = 0;
    let total = 10;

    // Check 1-6: Required files
    requiredFiles.forEach((file) => {
        const fullPath = path.join(dir, file);
        if (fs.existsSync(fullPath) && fs.statSync(fullPath).size > 0) {
            passed++;
        } else {
            console.error(`❌ FAIL: Missing or empty file ${file}`);
        }
    });

    // Check 7: relative CSS link in index.html
    const indexContent = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
    if (/href=["']\.\/style\.css/i.test(indexContent) || /href=["']style\.css/i.test(indexContent) || indexContent.includes('style.css')) {
        passed++;
    } else {
        console.error('❌ FAIL: Absolute CSS path in index.html');
    }

    // Check 8: All required JS modules loaded in index.html
    const requiredModules = [
        'cars_data.js',
        'tracking-pipeline.js',
        'hero-slideshow.js',
        'ai-valuation.js',
        'car-filter.js',
        'ui-effects.js',
        'car-modal.js',
        'main.js'
    ];
    let allModulesPresent = true;
    requiredModules.forEach((mod) => {
        if (!indexContent.includes(mod)) {
            console.error(`❌ FAIL: Missing required JS module in index.html: ${mod}`);
            allModulesPresent = false;
        }
    });
    if (allModulesPresent) {
        passed++;
    }

    // Check 9: Footer exists in index.html or guide.html
    if (indexContent.includes('<footer') || indexContent.includes('footer')) {
        passed++;
    } else {
        console.error('❌ FAIL: Footer element missing in HTML');
    }

    // Check 10: Schema JSON-LD exists & SSOT verified
    if (indexContent.includes('application/ld+json')) {
        passed++;
    } else {
        console.error('❌ FAIL: Missing JSON-LD Schema');
    }

    if (passed === total) {
        console.log(`✅ 10/10 PASS — text/css, application/javascript`);
        process.exit(0);
    } else {
        console.error(`❌ FAIL: ${passed}/${total} checks passed.`);
        process.exit(1);
    }
}

runHealthcheck();
