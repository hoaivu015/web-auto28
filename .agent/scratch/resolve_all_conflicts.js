const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

console.log('=== BẮT ĐẦU GIẢI QUYẾT XUNG ĐỘT TIỀM ẨN ===');

// 1. Cập nhật style.css để đảm bảo có đầy đủ class thay thế cho Inline Styles
const stylePath = path.join(rootDir, 'style.css');
if (fs.existsSync(stylePath)) {
    let cssContent = fs.readFileSync(stylePath, 'utf8');

    // Bổ sung Z-Index Layering chuẩn và các utility classes nếu chưa có
    const additionalCSS = `

/* ==========================================================================
   UPDATED SYSTEM UTILITY CLASSES & MODAL Z-INDEX LAYERING (CONFLICT FIX)
   ========================================================================== */

/* Z-Index Hierarchy Standardization */
.car-modal {
    z-index: 9000 !important;
}

.consultation-modal,
#consultation-modal {
    z-index: 10000 !important;
}

.modal-close,
.car-modal-close {
    z-index: 10010 !important;
}

/* Layout Utilities Replacing Inline Styles */
.hero__content--centered {
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 60rem;
    margin: 0 auto;
    gap: 1.5rem;
    position: relative;
    z-index: 10;
}

.hero__text--centered {
    max-width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.hero__headline--fluid {
    font-size: clamp(2.25rem, 5vw, 3.25rem);
    line-height: 1.15;
    text-align: center;
    letter-spacing: -0.04em;
}

.hero__sub--centered {
    text-align: center;
    max-width: 46rem;
    margin-bottom: 1rem;
    font-size: 16px;
}

.hero__trust-badge--spaced {
    margin-bottom: 0.5rem;
}

.modal-specs-list--clean {
    list-style: none;
    padding: 0;
}

.action-box-title--centered {
    text-align: center;
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
}

.lead-form--fluid {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    width: 100%;
}
`;

    if (!cssContent.includes('UPDATED SYSTEM UTILITY CLASSES')) {
        cssContent += additionalCSS;
        fs.writeFileSync(stylePath, cssContent, 'utf8');
        console.log('✅ Đã cập nhật style.css với Z-Index Hierarchy & Utility Classes.');
    }
}

// 2. Quét và cập nhật tất cả file HTML
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    const filePath = path.join(rootDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // A. Chuẩn hóa Routing Logo links: href="/showroom" hoặc href="/" -> href="./index.html"
    if (content.includes('href="/showroom"') || content.includes('href="/"')) {
        content = content.replace(/href="\/showroom"/g, 'href="./index.html"');
        content = content.replace(/href="\/"/g, 'href="./index.html"');
        modified = true;
        console.log(`  - [Routing Fix] ${file}: Đã cập nhật Logo href về ./index.html`);
    }

    // B. Thay thế các inline style cản trở Responsive trong Hero Section
    if (content.includes('style="flex-direction: column; align-items: center; text-align: center; max-width: 60rem; margin: 0 auto; gap: 1.5rem; position: relative; z-index: 10;"')) {
        content = content.replace(
            'style="flex-direction: column; align-items: center; text-align: center; max-width: 60rem; margin: 0 auto; gap: 1.5rem; position: relative; z-index: 10;"',
            'class="hero__content hero__content--centered"'
        );
        modified = true;
    }

    if (content.includes('style="max-width: 100%; text-align: center; display: flex; flex-direction: column; align-items: center;"')) {
        content = content.replace(
            'style="max-width: 100%; text-align: center; display: flex; flex-direction: column; align-items: center;"',
            'class="hero__text hero__text--centered"'
        );
        modified = true;
    }

    if (content.includes('style="font-size: clamp(2.25rem, 5vw, 3.25rem); line-height: 1.15; text-align: center; letter-spacing: -0.04em;"')) {
        content = content.replace(
            'style="font-size: clamp(2.25rem, 5vw, 3.25rem); line-height: 1.15; text-align: center; letter-spacing: -0.04em;"',
            'class="hero__headline hero__headline--fluid"'
        );
        modified = true;
    }

    if (content.includes('style="list-style: none; padding: 0;"')) {
        content = content.replace(
            'style="list-style: none; padding: 0;"',
            'class="modal-specs-list modal-specs-list--clean"'
        );
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Đã xử lý xung đột trong file HTML: ${file}`);
    }
});

// 3. Cập nhật main.js để chống trùng lặp Event Listener submit form
const mainJsPath = path.join(rootDir, 'main.js');
if (fs.existsSync(mainJsPath)) {
    let mainContent = fs.readFileSync(mainJsPath, 'utf8');

    // Chèn kiểm tra Guard Flag trước addeventlistener nếu chưa có
    if (!mainContent.includes('dataset.listenerAttached')) {
        mainContent = mainContent.replace(
            /const leadForm = document\.getElementById\(['"]lead-form['"]\);/g,
            `const leadForm = document.getElementById('lead-form');
if (leadForm && leadForm.dataset.listenerAttached) return;
if (leadForm) leadForm.dataset.listenerAttached = 'true';`
        );
        fs.writeFileSync(mainJsPath, mainContent, 'utf8');
        console.log('✅ Đã thêm Guard Flag chống trùng lặp Event Listener cho main.js');
    }
}

// 4. Xóa tệp style_guide.css dư thừa nếu tồn tại
const styleGuidePath = path.join(rootDir, 'style_guide.css');
if (fs.existsSync(styleGuidePath)) {
    fs.unlinkSync(styleGuidePath);
    console.log('✅ Đã dọn dẹp tệp dư thừa: style_guide.css');
}

console.log('=== HOÀN TẤT GIẢI QUYẾT XUNG ĐỘT TIỀM ẨN ===');
