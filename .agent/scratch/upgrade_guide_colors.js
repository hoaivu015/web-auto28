const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../guide.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Thêm Ambient Canvas Ngầm
if (!content.includes('ambient-canvas-base')) {
    content = content.replace(
        '<body class="neural-expressive-body pdf-grid-bg">',
        `<body class="neural-expressive-body pdf-grid-bg">

    <!-- 🔮 AMBIENT LIGHT CANVAS (NEURAL EXPRESSIVE) -->
    <div class="ambient-canvas-base">
        <div class="ambient-light light-1"></div>
        <div class="ambient-light light-2"></div>
        <div class="ambient-light light-3"></div>
    </div>`
    );
}

// 2. Chuẩn hóa Slide 1 (Cover Card)
content = content.replace(
    '<article class="pdf-slide-card" style="text-align: center; border-top: 6px solid #003366;">',
    '<article class="pdf-slide-card" style="text-align: center; border-top: 6px solid #2563eb;">'
);
content = content.replace(
    '<span style="display: inline-block; background: rgba(0, 51, 102, 0.08); color: #003366; font-weight: 800; font-size: 0.85rem; padding: 6px 18px; border-radius: 9999px; margin-bottom: 16px; border: 1px solid rgba(0, 51, 102, 0.2);">📋 HƯỚNG DẪN PHÁP LÝ GIAO DỊCH XE</span>',
    '<span style="display: inline-block; background: rgba(37, 99, 235, 0.08); color: #2563eb; font-weight: 800; font-size: 0.85rem; padding: 6px 18px; border-radius: 9999px; margin-bottom: 16px; border: 1px solid rgba(37, 99, 235, 0.2);">📋 HƯỚNG DẪN PHÁP LÝ GIAO DỊCH XE</span>'
);
content = content.replace(
    '<div style="width: 120px; height: 4px; background: #d97706; margin: 0 auto 20px; border-radius: 2px;"></div>',
    '<div style="width: 120px; height: 4px; background: #2563eb; margin: 0 auto 20px; border-radius: 2px;"></div>'
);

// 3. Chuẩn hóa TL;DR Box & Pre-requisites Box
content = content.replace(
    '<h3 style="font-size: 1.1rem; font-weight: 800; color: #1e40af; margin: 0;">TÓM TẮT NHANH (TL;DR) — DÀNH CHO AI SEARCH & ĐỌC LƯỚT 3 GIÂY</h3>',
    '<h3 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin: 0;">TÓM TẮT NHANH (TL;DR) — DÀNH CHO AI SEARCH & ĐỌC LƯỚT 3 GIÂY</h3>'
);
content = content.replace(
    '<p style="font-size: 0.95rem; color: #1e3a8a; line-height: 1.6; margin: 0;">',
    '<p style="font-size: 0.95rem; color: #334155; line-height: 1.6; margin: 0;">'
);

// 4. Chuẩn hóa Slide 2 (Nhóm 2 Hồ Sơ Bắt Buộc & Thẻ Cảnh Báo)
content = content.replace(
    '<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 16px; padding: 24px;">',
    '<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; box-shadow: 0 4px 12px rgba(0, 32, 64, 0.04);">'
);
content = content.replace(
    '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid #bfdbfe;">',
    '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0;">'
);
content = content.replace(
    '<h3 style="color: #1e3a8a; font-size: 1.3rem; font-weight: 800; margin: 0;">Hồ sơ về Xe</h3>',
    '<h3 style="color: #0f172a; font-size: 1.3rem; font-weight: 800; margin: 0;">Hồ sơ về Xe</h3>'
);
content = content.replace(
    '<div style="background: #f8fafc; border: 2px solid #003366; border-radius: 16px; padding: 24px;">',
    '<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; box-shadow: 0 4px 12px rgba(0, 32, 64, 0.04);">'
);
content = content.replace(
    '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid #cbd5e1;">',
    '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0;">'
);
content = content.replace(
    '<h3 style="color: #003366; font-size: 1.3rem; font-weight: 800; margin: 0;">Hồ sơ về Chủ Xe</h3>',
    '<h3 style="color: #0f172a; font-size: 1.3rem; font-weight: 800; margin: 0;">Hồ sơ về Chủ Xe</h3>'
);
content = content.replaceAll('color: #1e293b;', 'color: #334155;');

// Chuyển thẻ Lưu Ý Đỏ tươi sang chuẩn Semantic Warning nhạt dịu mắt
content = content.replace(
    '<div style="background: #dc2626; color: #ffffff; padding: 18px 24px; border-radius: 12px; display: flex; gap: 16px; align-items: flex-start;">',
    '<div style="background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 12px; padding: 18px 24px; display: flex; gap: 16px; align-items: flex-start; color: #991b1b;">'
);

// 5. Chuẩn hóa Slide 3 (Cà Vẹt)
content = content.replace(
    '<h2 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; color: #003366; margin-bottom: 24px;">Hồ Sơ Xe: Giấy Đăng Ký Xe (Cà Vẹt)</h2>',
    '<h2 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; color: #0f172a; margin-bottom: 24px;">Hồ Sơ Xe: Giấy Đăng Ký Xe (Cà Vẹt)</h2>'
);
content = content.replace(
    '<div style="flex: 1; width: 100%; text-align: center; background: #fffbeb; border: 2px dashed #f59e0b; padding: 24px; border-radius: 16px;">',
    '<div style="flex: 1; width: 100%; text-align: center; background: #f8fafc; border: 1px solid #e2e8f0; padding: 24px; border-radius: 16px;">'
);
content = content.replace(
    '<h4 style="font-weight: 800; color: #78350f; margin-bottom: 12px;">CHỨNG NHẬN ĐĂNG KÝ XE Ô TÔ</h4>',
    '<h4 style="font-weight: 800; color: #0f172a; margin-bottom: 12px;">CHỨNG NHẬN ĐĂNG KÝ XE Ô TÔ</h4>'
);
content = content.replace(
    '<div class="red-stamp-badge">Phải là BẢN GỐC.</div>',
    '<div class="red-stamp-badge" style="border: 2px solid #ef4444; color: #ef4444;">Phải là BẢN GỐC.</div>'
);
content = content.replace(
    '<div style="flex: 1.3; background: #f8fafc; border-left: 4px solid #003366; padding: 24px; border-radius: 12px;">',
    '<div style="flex: 1.3; background: #f8fafc; border-left: 4px solid #2563eb; padding: 24px; border-radius: 12px;">'
);

// 6. Chuẩn hóa Slide 4 (Sổ Đăng Kiểm - Loại bỏ khối tối #002040)
content = content.replace(
    '<h2 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; color: #003366; margin-bottom: 24px;">Hồ Sơ Xe: Sổ Đăng Kiểm</h2>',
    '<h2 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; color: #0f172a; margin-bottom: 24px;">Hồ Sơ Xe: Sổ Đăng Kiểm</h2>'
);
content = content.replace(
    '<div style="background: #002040; color: #ffffff; padding: 28px; border-radius: 16px; font-size: 1.05rem; line-height: 1.7;">',
    '<div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 28px; border-radius: 16px; font-size: 1.05rem; line-height: 1.7; color: #334155;">'
);
content = content.replace(
    '<p style="margin: 0; color: #fca5a5; font-weight: 700;">Xe hết hạn đăng kiểm sẽ không thể hoàn tất thủ tục sang tên hợp pháp.</p>',
    '<p style="margin: 0; color: #991b1b; font-weight: 700;">Xe hết hạn đăng kiểm sẽ không thể hoàn tất thủ tục sang tên hợp pháp.</p>'
);
content = content.replace(
    '<div style="background: #fff1f2; border: 2px solid #f43f5e; padding: 28px; border-radius: 16px; text-align: center;">',
    '<div style="background: #fef2f2; border: 1px solid #fca5a5; padding: 28px; border-radius: 16px; text-align: center;">'
);
content = content.replace(
    '<h4 style="color: #be123c; font-weight: 800; font-size: 1.2rem; margin: 8px 0 12px;">Kiểm tra ngay thời hạn!</h4>',
    '<h4 style="color: #991b1b; font-weight: 800; font-size: 1.2rem; margin: 8px 0 12px;">Kiểm tra ngay thời hạn!</h4>'
);

// 7. Chuẩn hóa Slide 5 (CCCD)
content = content.replace(
    '<h2 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; color: #003366; margin-bottom: 24px;">Hồ Sơ Cá Nhân: Định Danh Chủ Xe</h2>',
    '<h2 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; color: #0f172a; margin-bottom: 24px;">Hồ Sơ Cá Nhân: Định Danh Chủ Xe</h2>'
);
content = content.replace(
    '<div style="flex: 1; width: 100%; background: #eff6ff; border: 2px solid #2563eb; padding: 24px; border-radius: 16px; text-align: center;">',
    '<div style="flex: 1; width: 100%; background: #f8fafc; border: 1px solid #e2e8f0; padding: 24px; border-radius: 16px; text-align: center;">'
);
content = content.replace(
    '<h3 style="font-size: 1.3rem; font-weight: 800; color: #1e3a8a; margin: 12px 0 8px;">CĂN CƯỚC CÔNG DÂN (CCCD)</h3>',
    '<h3 style="font-size: 1.3rem; font-weight: 800; color: #0f172a; margin: 12px 0 8px;">CĂN CƯỚC CÔNG DÂN (CCCD)</h3>'
);

// 8. Chuẩn hóa Slide 6 (Hôn nhân Tree)
content = content.replace(
    '<span style="display: inline-block; background: #003366; color: white; font-weight: 800; padding: 8px 24px; border-radius: 9999px; font-size: 1rem;">👤 Tình trạng hôn nhân hiện tại của chủ xe?</span>',
    '<span style="display: inline-block; background: #2563eb; color: white; font-weight: 800; padding: 8px 24px; border-radius: 9999px; font-size: 1rem;">👤 Tình trạng hôn nhân hiện tại của chủ xe?</span>'
);
content = content.replace(
    '<div class="branch-box-married">',
    '<div class="branch-box-married" style="border: 1px solid #e2e8f0;">'
);
content = content.replace(
    '<div class="branch-header-married">💍 Đã Kết Hôn</div>',
    '<div class="branch-header-married" style="background: #2563eb;">💍 Đã Kết Hôn</div>'
);
content = content.replace(
    '<div class="branch-box-single">',
    '<div class="branch-box-single" style="border: 1px solid #e2e8f0;">'
);
content = content.replace(
    '<div class="branch-header-single">👤 Độc Thân</div>',
    '<div class="branch-header-single" style="background: #2563eb;">👤 Độc Thân</div>'
);

// 9. Chuẩn hóa Slide 7 (Clipboard & Ready Banner - Loại bỏ khối tối #0b1e36)
content = content.replace(
    '<article class="pdf-slide-card" style="border-bottom: 6px solid #003366;">',
    '<article class="pdf-slide-card" style="border-bottom: 6px solid #2563eb;">'
);
content = content.replace(
    '<div class="ready-to-deal-banner">',
    '<div class="ready-to-deal-banner" style="background: #ffffff; border: 1px solid #e1e9f6; box-shadow: 0 10px 30px rgba(37, 99, 235, 0.06); color: #0f172a; padding: 24px 32px; border-radius: 16px; text-align: center; margin-top: 24px;">'
);
content = content.replace(
    '<h3 style="font-family: var(--font-display, sans-serif); font-size: 1.25rem; font-weight: 900; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 8px; color: #60a5fa;">SẮN SÀNG GIAO DỊCH</h3>',
    '<h3 style="font-family: var(--font-display, sans-serif); font-size: 1.25rem; font-weight: 900; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 8px; color: #2563eb;">SẮN SÀNG GIAO DỊCH</h3>'
);
content = content.replace(
    '<p style="font-size: 0.95rem; color: #cbd5e1; margin: 0; line-height: 1.6;">Chuẩn bị đầy đủ 4 hạng mục này đảm bảo quá trình công chứng và sang tên diễn ra suôn sẻ, không độ trễ.</p>',
    '<p style="font-size: 0.95rem; color: #475569; margin: 0; line-height: 1.6;">Chuẩn bị đầy đủ 4 hạng mục này đảm bảo quá trình công chứng và sang tên diễn ra suôn sẻ, không độ trễ.</p>'
);

// 10. Đồng bộ Nút bấm CTA cuối trang sang chuẩn viên thuốc 9999px
content = content.replace(
    '<button type="submit" class="btn-guide-primary-cta" style="border: none; cursor: pointer;">🚗 Định Giá & Thu Mua Ngay</button>',
    '<button type="submit" class="btn-guide-primary-cta" style="border: none; cursor: pointer; background: #2563eb; color: #ffffff; border-radius: 9999px; padding: 14px 28px; font-weight: 800; font-size: 1rem;">🚗 Định Giá & Thu Mua Ngay</button>'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Updated guide.html to Neural Expressive 2.0 Light Mode standards successfully!');
