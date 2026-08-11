/**
 * .agent/scratch/find_inline_css_conflicts.js
 * Script tự động quét xung đột thuộc tính thị giác (Color / Background)
 * giữa Inline-Style trong tệp HTML và CSS Class trong style.css.
 */

const fs = require('fs');
const path = require('path');

const projectDir = process.cwd();
const cssPath = path.join(projectDir, 'style.css');
const cssContent = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf8') : '';

// Lấy toàn bộ danh sách tệp .html trong thư mục dự án
const htmlFiles = fs.readdirSync(projectDir).filter(f => f.endsWith('.html'));

console.log(`================================================================`);
console.log(`🔍 AUDIT ENGINE: QUÉT XUNG ĐỘT INLINE STYLE VS CSS CLASS`);
console.log(`📂 Tổng số tệp HTML kiểm tra: ${htmlFiles.length}`);
console.log(`================================================================\n`);

const conflicts = [];
const checkedKeys = new Set();

htmlFiles.forEach(file => {
    const filePath = path.join(projectDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    // 1. Quét xung đột đè màu thẻ cha / thẻ con đặc biệt (.red-note)
    lines.forEach((line, idx) => {
        if (line.includes('class="red-note"') && line.includes('style=')) {
            conflicts.push({
                file,
                line: idx + 1,
                severity: 'HIGH (FAIL WCAG)',
                tag: 'div.red-note',
                issue: 'Inline background/color ở div.red-note xung đột đè màu với .red-note p trong style.css',
                snippet: line.trim().substring(0, 100) + '...'
            });
        }
    });

    // 2. Quét toàn bộ phần tử vừa có class trong style.css vừa bị chèn inline color / background
    const elementRegex = /<([a-z0-9]+)\s+[^>]*class="([^"]+)"[^>]*style="([^"]*)"[^>]*>/gi;
    let match;

    while ((match = elementRegex.exec(content)) !== null) {
        const tag = match[1];
        const classAttr = match[2];
        const styleAttr = match[3];

        // Chỉ kiểm tra nếu inline style có can thiệp color hoặc background
        if (/color|background/i.test(styleAttr)) {
            const key = `${file}:${tag}:${classAttr}`;
            if (!checkedKeys.has(key)) {
                checkedKeys.add(key);

                const classes = classAttr.split(/\s+/);
                classes.forEach(cls => {
                    if (cls && cssContent.includes(`.${cls}`)) {
                        // Tính toán dòng xuất hiện trong tệp
                        const lineNum = content.substring(0, match.index).split('\n').length;
                        
                        // Phân loại mức độ nghiêm trọng
                        let severity = 'MEDIUM';
                        if (cls === 'nav-logo') severity = 'LOW';
                        if (cls === 'red-note') severity = 'HIGH (FAIL WCAG)';

                        conflicts.push({
                            file,
                            line: lineNum,
                            severity,
                            tag: `<${tag} class="${classAttr}">`,
                            issue: `Sử dụng inline style [${styleAttr.trim()}] trùng với CSS class .${cls} trong style.css`,
                            snippet: match[0].substring(0, 110) + '...'
                        });
                    }
                });
            }
        }
    }
});

// Hiển thị báo cáo kết quả
if (conflicts.length === 0) {
    console.log(`✅ KHÔNG PHÁT HIỆN XUNG ĐỘT INLINE STYLE VS CSS CLASS. Mã nguồn hoàn toàn sạch!`);
} else {
    console.log(`⚠️ PHÁT HIỆN ${conflicts.length} VỊ TRÍ CÓ XUNG ĐỘT TRONG MÃ NGUỒN:\n`);
    
    conflicts.forEach((item, index) => {
        console.log(`[${index + 1}] 📄 File: ${item.file}:${item.line}`);
        console.log(`    - Mức độ: ${item.severity}`);
        console.log(`    - Thẻ: ${item.tag}`);
        console.log(`    - Mô tả lỗi: ${item.issue}`);
        console.log(`    - Mã nguồn: ${item.snippet}`);
        console.log(`----------------------------------------------------------------`);
    });
}

// Lưu báo cáo JSON ra thư mục tạm
const scratchDir = path.join(projectDir, '.agent', 'scratch');
if (!fs.existsSync(scratchDir)) {
    fs.mkdirSync(scratchDir, { recursive: true });
}
const reportPath = path.join(scratchDir, 'inline_css_conflicts.json');
fs.writeFileSync(reportPath, JSON.stringify(conflicts, null, 2), 'utf8');
console.log(`\n💾 Đã ghi báo cáo chi tiết JSON tại: file://${reportPath}`);
