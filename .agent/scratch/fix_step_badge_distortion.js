const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../guide-ev.html');
let content = fs.readFileSync(filePath, 'utf8');

// Sửa thuộc tính style của 4 badge số tròn (Steps 1, 2, 3, 4)
// Thêm flex-shrink: 0, min-width: 36px, min-height: 36px để giữ nguyên hình tròn 100% không bị móp méo oval
const oldBadgeStyle = 'style="background: #2563eb; color: #fff; font-weight: 900; font-size: 1.1rem; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;"';
const newBadgeStyle = 'style="background: #2563eb; color: #fff; font-weight: 900; font-size: 1.1rem; width: 36px; height: 36px; min-width: 36px; min-height: 36px; flex-shrink: 0; border-radius: 50%; display: flex; align-items: center; justify-content: center;"';

content = content.replaceAll(oldBadgeStyle, newBadgeStyle);

// Cập nhật align-items: flex-start cho header của mỗi bước để khi tiêu đề xuống dòng, hình tròn nằm đẹp cạnh dòng đầu tiên
content = content.replaceAll(
    '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">',
    '<div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 16px;">'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Fixed step badge circle distortion bug (added flex-shrink: 0 & min-width/height) successfully!');
