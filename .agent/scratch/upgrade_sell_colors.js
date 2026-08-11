const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../sell.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Badge Urgency Hero (Line 138)
content = content.replace(
    'background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.25); color: #dc2626; padding: 6px 18px; border-radius: 99px; font-weight: 700; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 8px; margin-bottom: 12px; box-shadow: 0 2px 10px rgba(239, 68, 68, 0.1);',
    'background: rgba(37, 99, 235, 0.08); border: 1px solid rgba(37, 99, 235, 0.2); color: #2563eb; padding: 6px 18px; border-radius: 9999px; font-weight: 700; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 8px; margin-bottom: 12px; box-shadow: 0 2px 10px rgba(37, 99, 235, 0.08);'
);

// 2. Hotline Button in Hero Form (Line 204)
content = content.replace(
    '<a href="tel:0888813838" class="btn-sell-valuation-submit" style="background: #1e293b; color: #ffffff; text-decoration: none;">',
    '<a href="tel:0888813838" class="btn-sell-valuation-submit" style="background: rgba(37, 99, 235, 0.08); color: #2563eb; border: 1px solid rgba(37, 99, 235, 0.2); text-decoration: none;">'
);

// 3. Pain Points Cards Accent Borders (Lines 231, 237, 243)
content = content.replace(
    'border-left: 4px solid #ef4444;',
    'border-left: 4px solid #2563eb;'
);
content = content.replace(
    'border-left: 4px solid #f59e0b;',
    'border-left: 4px solid #2563eb;'
);
content = content.replace(
    'border-left: 4px solid #3b82f6;',
    'border-left: 4px solid #2563eb;'
);

// 4. Section 3 Price Anchoring Table - Convert Auto28 Dark Card to Premium Light Glass Card (Line 316)
content = content.replace(
    '<div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 28px; border-radius: 20px; color: #ffffff; box-shadow: 0 16px 36px rgba(37, 99, 235, 0.2); border: 2px solid #2563eb; position: relative;">',
    '<div style="background: #ffffff; padding: 28px; border-radius: 20px; color: #0f172a; box-shadow: 0 16px 36px rgba(37, 99, 235, 0.12); border: 2px solid #2563eb; position: relative;">'
);
content = content.replace(
    '<h3 style="font-size: 1.25rem; font-weight: 800; color: #ffffff; margin-bottom: 16px; text-align: center;">Auto28 Showroom VinFast</h3>',
    '<h3 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin-bottom: 16px; text-align: center;">Auto28 Showroom VinFast</h3>'
);
content = content.replace(
    '<ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; font-size: 0.95rem; color: #e2e8f0;">',
    '<ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; font-size: 0.95rem; color: #334155;">'
);

// 5. Testimonials Avatar Badges Uniformity (Lines 441, 452)
content = content.replace(
    '<div style="width: 40px; height: 40px; background: #10b981; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800;">M</div>',
    '<div style="width: 40px; height: 40px; background: #2563eb; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800;">M</div>'
);
content = content.replace(
    '<div style="width: 40px; height: 40px; background: #8b5cf6; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800;">D</div>',
    '<div style="width: 40px; height: 40px; background: #2563eb; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800;">D</div>'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Updated sell.html to Neural Expressive 2.0 Light Mode standards successfully!');
