const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const htmlFiles = fs.readdirSync(rootDir).filter(file => file.endsWith('.html'));

let updatedCount = 0;

htmlFiles.forEach(file => {
    const filePath = path.join(rootDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Update expressive-modal wrapper ARIA
    content = content.replace(
        /<div class="expressive-modal" id="car-modal-view">/g,
        '<div class="expressive-modal" id="car-modal-view" role="dialog" aria-modal="true" aria-labelledby="modal-car-title" aria-hidden="true">'
    );

    // 2. Update modal-close button ARIA label
    content = content.replace(
        /<button class="modal-close" id="modal-close-btn">&times;<\/button>/g,
        '<button class="modal-close" id="modal-close-btn" aria-label="Đóng cửa sổ chi tiết xe">&times;</button>'
    );

    // 3. Update modal inputs autocomplete & name attributes
    content = content.replace(
        /<input type="text" id="modal-name" placeholder="Họ và tên của bạn" class="modal-pill-input" required autocomplete="off">/g,
        '<input type="text" id="modal-name" name="fullname" placeholder="Họ và tên của bạn" class="modal-pill-input" required autocomplete="name">'
    );

    content = content.replace(
        /<input type="tel" id="modal-phone" placeholder="Số điện thoại liên hệ" class="modal-tel-input" required autocomplete="off">/g,
        '<input type="tel" id="modal-phone" name="phone" placeholder="Số điện thoại liên hệ" class="modal-tel-input" required autocomplete="tel">'
    );

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated: ${file}`);
        updatedCount++;
    } else {
        console.log(`ℹ️ No changes needed: ${file}`);
    }
});

console.log(`\n🎉 Batch update complete! Total updated files: ${updatedCount}`);
