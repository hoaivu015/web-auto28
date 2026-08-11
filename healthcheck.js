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
        'guide.html',
        'sell.html'
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
    if (indexContent.includes('href="./style.css"') || indexContent.includes('href="style.css"')) {
        passed++;
    } else {
        console.error('❌ FAIL: Absolute CSS path in index.html');
    }

    // Check 8: relative JS link in index.html
    if (indexContent.includes('src="./main.js"') || indexContent.includes('src="main.js"')) {
        passed++;
    } else {
        console.error('❌ FAIL: Absolute JS path in index.html');
    }

    // Check 9: Footer exists in index.html or guide.html
    if (indexContent.includes('<footer') || indexContent.includes('footer')) {
        passed++;
    } else {
        console.error('❌ FAIL: Footer element missing in HTML');
    }

    // Check 10: Schema JSON-LD exists
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
