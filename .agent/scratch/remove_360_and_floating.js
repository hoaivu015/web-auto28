const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
console.log('=== BẮT ĐẦU LOẠI BỎ TÍNH NĂNG STT 1 (360° VIEW) VÀ STT 10 (FLOATING HOTLINE & ZALO) ===');

// 1. Gỡ bỏ 360° View trong tất cả các tệp HTML
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    const filePath = path.join(rootDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Pattern xóa khối view-360-pill-container
    const pattern360 = /<!-- 360° View Pill Container[\s\S]*?<\/div>/g;
    content = content.replace(pattern360, '');

    // Pattern xóa comment 360 View gallery nếu có
    content = content.replace(/<!-- Left side: 360 View image gallery -->/g, '<!-- Left side: Vehicle image gallery -->');
    content = content.replace(/MODAL CHI TIẾT XE VỚI KÉN XOAY 360 ĐỘ \(360° VIEW\)/g, 'MODAL CHI TIẾT XE');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ [STT 1 Removed] Đã xóa khối 360° View khỏi HTML: ${file}`);
    }
});

// 2. Gỡ bỏ Logic 360° View trong main.js
const mainJsPath = path.join(rootDir, 'main.js');
if (fs.existsSync(mainJsPath)) {
    let mainContent = fs.readFileSync(mainJsPath, 'utf8');
    let originalJs = mainContent;

    // Pattern xóa block JS 360 control
    const jsBlock360Pattern = /\/\/ Simulated 360° View interactive slider rotation[\s\S]*?\}\s*\}\s*\}/g;
    mainContent = mainContent.replace(jsBlock360Pattern, '');

    // Nếu không khớp regex chính xác, xóa theo dòng
    if (mainContent.includes('slider-360-control')) {
        const lines = mainContent.split('\n');
        const filteredLines = lines.filter(line => 
            !line.includes('slider-360-control') && 
            !line.includes('label-360-instruction') &&
            !line.includes('Góc 1: Ba phần tư trước') &&
            !line.includes('Góc 5: Đuôi xe 360°')
        );
        mainContent = filteredLines.join('\n');
    }

    if (mainContent !== originalJs) {
        fs.writeFileSync(mainJsPath, mainContent, 'utf8');
        console.log('✅ [STT 1 Removed] Đã xóa logic điều khiển xoay 360° khỏi main.js');
    }
}

// 3. Gỡ bỏ CSS STT 1 (360° View) và STT 10 (Floating Hotline & Zalo Sticky Bar) trong style.css
const styleCssPath = path.join(rootDir, 'style.css');
if (fs.existsSync(styleCssPath)) {
    let cssContent = fs.readFileSync(styleCssPath, 'utf8');
    let originalCss = cssContent;

    // Gỡ 360 view CSS
    cssContent = cssContent.replace(/\/\* 360° View Pill Container[\s\S]*?\.label-360-instruction \{[\s\S]*?\}/g, '');
    cssContent = cssContent.replace(/\.view-360-pill-container[\s\S]*?\}\n/g, '');
    cssContent = cssContent.replace(/\.badge-360[\s\S]*?\}\n/g, '');
    cssContent = cssContent.replace(/\.slider-360[\s\S]*?\}\n/g, '');

    // Gỡ Sticky Footer & Floating Zalo CSS (STT 10)
    cssContent = cssContent.replace(/\/\* =+ \n\s*📱 STICKY FOOTER[\s\S]*?\.btn-bottom-cta \{[\s\S]*?\}/g, '');
    cssContent = cssContent.replace(/\.sticky-footer[\s\S]*?\}\n/g, '');
    cssContent = cssContent.replace(/\.btn-zalo[\s\S]*?\}\n/g, '');
    cssContent = cssContent.replace(/\.btn-sticky[\s\S]*?\}\n/g, '');

    if (cssContent !== originalCss) {
        fs.writeFileSync(styleCssPath, cssContent, 'utf8');
        console.log('✅ [STT 1 & 10 Removed] Đã xóa CSS 360° View và Floating Hotline & Zalo khỏi style.css');
    }
}

console.log('=== HOÀN TẤT LOẠI BỎ STT 1 VÀ STT 10 ===');
