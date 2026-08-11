const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../guide-ev.html');
let content = fs.readFileSync(filePath, 'utf8');

// Chuyển border-radius của các nút bấm CTA sang 9999px (Chuẩn viên thuốc Pill Button)
content = content.replace(
    'style="grid-column: 1 / -1; background: #2563eb; color: #fff; font-weight: 900; padding: 16px; border-radius: 12px; border: none; cursor: pointer; font-size: 1.05rem; transition: background 0.2s;"',
    'style="grid-column: 1 / -1; background: #2563eb; color: #fff; font-weight: 900; padding: 16px 28px; border-radius: 9999px; border: none; cursor: pointer; font-size: 1.05rem; transition: background 0.2s, transform 0.2s;"'
);

content = content.replace(
    'style="background: #2563eb; color: #fff; padding: 16px 32px; font-weight: 800; border-radius: 12px; text-decoration: none; font-size: 1rem;"',
    'style="background: #2563eb; color: #fff; padding: 16px 32px; font-weight: 800; border-radius: 9999px; text-decoration: none; font-size: 1rem;"'
);

content = content.replace(
    'style="background: #0284c7; color: #fff; padding: 16px 28px; font-weight: 800; border-radius: 12px; text-decoration: none; font-size: 1rem;"',
    'style="background: #0284c7; color: #fff; padding: 16px 28px; font-weight: 800; border-radius: 9999px; text-decoration: none; font-size: 1rem;"'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Converted CTA buttons to pill shape (border-radius: 9999px) successfully!');
