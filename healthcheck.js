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

    const modelSlugs = [
        'vf3', 'vf5', 'vf6', 'vf7',
        'vfe34', 'vf8', 'vf9', 'limo',
        'mpv', 'lux-a', 'lux-sa', 'fadil'
    ];

    let passed = 0;
    let total = 10;

    // Check 1-5: Core required files (index, style, main, server, guide-ev)
    requiredFiles.slice(0, 5).forEach((file) => {
        const fullPath = path.join(dir, file);
        if (fs.existsSync(fullPath) && fs.statSync(fullPath).size > 0) {
            passed++;
        } else {
            console.error(`❌ FAIL: Missing or empty file ${file}`);
        }
    });

    // Check 6: Valuation page + All 12 Model SEO SSR Routes via generateShowroomHtml(slug)
    let allLandingPagesValid = fs.existsSync(path.join(dir, 'dinh-gia-ban-xe.html'));
    try {
        const { generateShowroomHtml } = require('./build_landing.js');
        modelSlugs.forEach((slug) => {
            const html = generateShowroomHtml(slug);
            if (!html || !html.includes(`https://www.auto28.com.vn/${slug}`)) {
                console.error(`❌ FAIL: SSR Model route generation failed for /${slug}`);
                allLandingPagesValid = false;
            }
        });
    } catch (err) {
        console.error(`❌ FAIL: Error testing generateShowroomHtml: ${err.message}`);
        allLandingPagesValid = false;
    }
    if (allLandingPagesValid) {
        passed++;
    }

    // Check 7: Relative CSS link in index.html & Zero Forbidden Battery Terms
    const indexContent = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
    const carsDataContent = fs.readFileSync(path.join(dir, 'cars_data.js'), 'utf8');
    const forbiddenRegex = /Xe sở hữu pin|Mua đứt pin/i;
    const hasRelativeCss = /href=["']\.\/style\.css/i.test(indexContent) || /href=["']style\.css/i.test(indexContent);
    if (hasRelativeCss && !forbiddenRegex.test(indexContent) && !forbiddenRegex.test(carsDataContent)) {
        passed++;
    } else {
        console.error('❌ FAIL: CSS path issue or Forbidden Battery Term ("Xe sở hữu pin" / "Mua đứt pin") detected');
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

    // Check 9: Footer & Pre-rendered Static Cards exist in index.html
    if (indexContent.includes('<footer') && indexContent.includes('expressive-car-card')) {
        passed++;
    } else {
        console.error('❌ FAIL: Footer or pre-rendered car cards missing in index.html');
    }

    // Check 10: Schema JSON-LD exists & passes strict JSON.parse()
    const ldJsonMatches = [...indexContent.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    let jsonLdValid = ldJsonMatches.length > 0;
    ldJsonMatches.forEach((match, idx) => {
        try {
            JSON.parse(match[1]);
        } catch (err) {
            console.error(`❌ FAIL: Invalid JSON-LD syntax in block #${idx + 1}: ${err.message}`);
            jsonLdValid = false;
        }
    });
    if (jsonLdValid) {
        passed++;
    } else if (ldJsonMatches.length === 0) {
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
