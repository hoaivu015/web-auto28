const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../guide-ev.html');
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

// 2. Chuyển BƯỚC 1 về Light Mode
content = content.replace(
    '<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 20px; padding: 24px; margin-bottom: 24px;">',
    '<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 24px; margin-bottom: 24px; box-shadow: 0 8px 24px rgba(0, 32, 64, 0.04);">'
);
content = content.replace(
    '<h3 style="color: #1e3a8a; font-size: 1.25rem; font-weight: 800; margin: 0;">BƯỚC 1: Kiểm Tra Chất Lượng Xe & Sức Khỏe Pin</h3>',
    '<h3 style="color: #0f172a; font-size: 1.25rem; font-weight: 800; margin: 0;">BƯỚC 1: Kiểm Tra Chất Lượng Xe & Sức Khỏe Pin</h3>'
);
content = content.replace(
    '<div style="background: #ffffff; padding: 16px; border-radius: 12px; border: 1px solid #bfdbfe;">',
    '<div style="background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0;">'
);
content = content.replace(
    '<div style="background: #ffffff; padding: 16px; border-radius: 12px; border: 1px solid #bfdbfe;">',
    '<div style="background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0;">'
);
content = content.replace(
    '<div style="background: #ffffff; padding: 16px; border-radius: 12px; border: 1px solid #93c5fd;">',
    '<div style="background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0;">'
);
content = content.replaceAll('<h4 style="color: #1e40af;', '<h4 style="color: #0f172a;');
content = content.replaceAll('color: #1e3a8a;', 'color: #334155;');

// 3. Chuyển BƯỚC 2 về Light Mode
content = content.replace(
    '<div style="background: #fffbeb; border: 2px solid #f59e0b; border-radius: 20px; padding: 24px; margin-bottom: 24px;">',
    '<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 24px; margin-bottom: 24px; box-shadow: 0 8px 24px rgba(0, 32, 64, 0.04);">'
);
content = content.replace(
    '<span style="background: #d97706; color: #fff; font-weight: 900; font-size: 1.1rem; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">2</span>',
    '<span style="background: #2563eb; color: #fff; font-weight: 900; font-size: 1.1rem; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">2</span>'
);
content = content.replace(
    '<h3 style="color: #78350f; font-size: 1.25rem; font-weight: 800; margin: 0;">BƯỚC 2: Kiểm Tra Giấy Tờ Xe & Hợp Đồng Thuê Pin</h3>',
    '<h3 style="color: #0f172a; font-size: 1.25rem; font-weight: 800; margin: 0;">BƯỚC 2: Kiểm Tra Giấy Tờ Xe & Hợp Đồng Thuê Pin</h3>'
);
content = content.replace(
    '<span style="color: #d97706; font-size: 0.85rem; font-weight: 700;">Rõ ràng pháp lý chính chủ & hình thức sở hữu pin</span>',
    '<span style="color: #2563eb; font-size: 0.85rem; font-weight: 700;">Rõ ràng pháp lý chính chủ & hình thức sở hữu pin</span>'
);
content = content.replaceAll(
    '<div style="background: #ffffff; padding: 14px; border-radius: 12px; border: 1px solid #fde68a; font-size: 0.88rem; color: #78350f;">',
    '<div style="background: #f8fafc; padding: 14px; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 0.88rem; color: #334155;">'
);
content = content.replace(
    '<div style="background: #ffffff; padding: 16px; border-radius: 12px; border: 1px solid #fcd34d;">',
    '<div style="background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0;">'
);
content = content.replace(
    '<h4 style="color: #92400e; font-size: 0.95rem; font-weight: 800; margin-top: 0; margin-bottom: 8px;">📋 Phân Loại 3 Hình Thức Thuê / Mua Pin VinFast</h4>',
    '<h4 style="color: #0f172a; font-size: 0.95rem; font-weight: 800; margin-top: 0; margin-bottom: 8px;">📋 Phân Loại 3 Hình Thức Thuê / Mua Pin VinFast</h4>'
);
content = content.replaceAll(
    '<div style="background: #fef3c7; padding: 10px; border-radius: 8px;">',
    '<div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 10px; border-radius: 8px; color: #334155;">'
);
content = content.replace('color: #78350f;', 'color: #334155;');
content = content.replace(
    '<p style="font-size: 0.85rem; color: #b45309; font-weight: 700; margin: 10px 0 0 0;">💡 Lưu ý: Yêu cầu bên bán cung cấp Hợp đồng thuê pin gốc để xác minh loại gói cước đang áp dụng.</p>',
    '<p style="font-size: 0.85rem; color: #475569; font-weight: 600; margin: 10px 0 0 0;">💡 Lưu ý: Yêu cầu bên bán cung cấp Hợp đồng thuê pin gốc để xác minh loại gói cước đang áp dụng.</p>'
);

// 4. Chuyển BƯỚC 3 về Light Mode
content = content.replace(
    '<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 20px; padding: 24px; margin-bottom: 24px;">',
    '<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 24px; margin-bottom: 24px; box-shadow: 0 8px 24px rgba(0, 32, 64, 0.04);">'
);
content = content.replace(
    '<span style="background: #16a34a; color: #fff; font-weight: 900; font-size: 1.1rem; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">3</span>',
    '<span style="background: #2563eb; color: #fff; font-weight: 900; font-size: 1.1rem; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">3</span>'
);
content = content.replace(
    '<h3 style="color: #14532d; font-size: 1.25rem; font-weight: 800; margin: 0;">BƯỚC 3: Sang Tên Trọn Gói (Rút Hồ Sơ & Đóng Thuế 2%)</h3>',
    '<h3 style="color: #0f172a; font-size: 1.25rem; font-weight: 800; margin: 0;">BƯỚC 3: Sang Tên Trọn Gói (Rút Hồ Sơ & Đóng Thuế 2%)</h3>'
);
content = content.replace(
    '<span style="color: #16a34a; font-size: 0.85rem; font-weight: 700;">Thủ tục nhanh gọn theo quy định VNeID Mức 2</span>',
    '<span style="color: #2563eb; font-size: 0.85rem; font-weight: 700;">Thủ tục nhanh gọn theo quy định VNeID Mức 2</span>'
);
content = content.replaceAll(
    '<div style="background: #ffffff; padding: 14px; border-radius: 12px; border: 1px solid #bbf7d0; font-size: 0.88rem; color: #14532d;">',
    '<div style="background: #f8fafc; padding: 14px; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 0.88rem; color: #334155;">'
);

// 5. Chuyển BƯỚC 4 về Light Mode
content = content.replace(
    '<div style="background: #faf5ff; border: 2px solid #a855f7; border-radius: 20px; padding: 24px;">',
    '<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 24px; box-shadow: 0 8px 24px rgba(0, 32, 64, 0.04);">'
);
content = content.replace(
    '<span style="background: #9333ea; color: #fff; font-weight: 900; font-size: 1.1rem; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">4</span>',
    '<span style="background: #2563eb; color: #fff; font-weight: 900; font-size: 1.1rem; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">4</span>'
);
content = content.replace(
    '<h3 style="color: #581c87; font-size: 1.25rem; font-weight: 800; margin: 0;">BƯỚC 4: Kích Hoạt App VinFast Chính Chủ & Bảo Hành Hãng</h3>',
    '<h3 style="color: #0f172a; font-size: 1.25rem; font-weight: 800; margin: 0;">BƯỚC 4: Kích Hoạt App VinFast Chính Chủ & Bảo Hành Hãng</h3>'
);
content = content.replace(
    '<span style="color: #9333ea; font-size: 0.85rem; font-weight: 700;">Chuyển giao quyền điều khiển ứng dụng & bảo hành chính hãng 7-10 năm</span>',
    '<span style="color: #2563eb; font-size: 0.85rem; font-weight: 700;">Chuyển giao quyền điều khiển ứng dụng & bảo hành chính hãng 7-10 năm</span>'
);
content = content.replaceAll(
    '<div style="background: #ffffff; padding: 16px; border-radius: 12px; border: 1px solid #e9d5ff; font-size: 0.88rem; color: #581c87;">',
    '<div style="background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 0.88rem; color: #334155;">'
);
content = content.replaceAll('color: #7e22ce;', 'color: #0f172a;');

// 6. Chuyển SECTION 3 (Form Lead) về Light Mode
content = content.replace(
    '<section class="pdf-slide-card" style="margin-top: 32px; padding: 32px 24px; background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); color: #ffffff; border: none;">',
    '<section class="pdf-slide-card" style="margin-top: 32px; padding: 36px 28px; background: #ffffff; border: 1px solid #e1e9f6; box-shadow: 0 20px 40px rgba(37, 99, 235, 0.08); text-align: center;">'
);
content = content.replace(
    '<span style="background: rgba(59, 130, 246, 0.2); color: #60a5fa; font-weight: 800; font-size: 0.8rem; padding: 4px 14px; border-radius: 9999px; border: 1px solid rgba(96, 165, 250, 0.3);">⚡ TƯ VẤN TRỰC TIẾP TỪ SHOWROOM AUTO28</span>',
    '<span style="background: rgba(37, 99, 235, 0.08); color: #2563eb; font-weight: 800; font-size: 0.8rem; padding: 4px 14px; border-radius: 9999px; border: 1px solid rgba(37, 99, 235, 0.2);">⚡ TƯ VẤN TRỰC TIẾP TỪ SHOWROOM AUTO28</span>'
);
content = content.replace(
    '<h2 style="font-size: 1.6rem; font-weight: 900; margin: 12px 0 8px; color: #ffffff;">Nhận Báo Giá Lăn Bánh Xe Điện Lướt & Đặt Lịch Kiểm Tra SoH</h2>',
    '<h2 style="font-size: 1.6rem; font-weight: 900; margin: 12px 0 8px; color: #0f172a;">Nhận Báo Giá Lăn Bánh Xe Điện Lướt & Đặt Lịch Kiểm Tra SoH</h2>'
);
content = content.replace(
    '<p style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 24px;">Nhập SĐT để nhận ngay bảng giá các dòng VinFast VF3, VF5, VF6, VF7, VF8, VF9 lướt sẵn có tại Showroom kèm Voucher +5 Triệu.</p>',
    '<p style="color: #475569; font-size: 0.95rem; margin-bottom: 24px;">Nhập SĐT để nhận ngay bảng giá các dòng VinFast VF3, VF5, VF6, VF7, VF8, VF9 lướt sẵn có tại Showroom kèm Voucher +5 Triệu.</p>'
);
content = content.replaceAll(
    'style="padding: 14px 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.1); color: #fff; font-size: 0.95rem; outline: none;"',
    'style="padding: 14px 16px; border-radius: 12px; border: 1px solid #cbd5e1; background: #f8fafc; color: #0f172a; font-size: 0.95rem; outline: none;"'
);
content = content.replace(
    '<div style="font-size: 0.82rem; color: #cbd5e1; display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">',
    '<div style="font-size: 0.82rem; color: #64748b; display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">'
);

// 7. Đồng bộ tiêu đề Bảng tóm tắt
content = content.replace('color: #78350f; margin-bottom: 8px;">BƯỚC 2: KIỂM TRA GIẤY TỜ', 'color: #0f172a; margin-bottom: 8px;">BƯỚC 2: KIỂM TRA GIẤY TỜ');
content = content.replace('color: #14532d; margin-bottom: 8px;">BƯỚC 3: SANG TÊN THUẾ 2%', 'color: #0f172a; margin-bottom: 8px;">BƯỚC 3: SANG TÊN THUẾ 2%');
content = content.replace('color: #581c87; margin-bottom: 8px;">BƯỚC 4: KÍCH HOẠT APP & BẢO HÀNH', 'color: #0f172a; margin-bottom: 8px;">BƯỚC 4: KÍCH HOẠT APP & BẢO HÀNH');

// 8. Đồng bộ Nút bấm CTA cuối trang
content = content.replace(
    '<a href="./index.html#inventory" class="btn-guide-primary-cta" style="background: #1e3a8a; color: #fff; padding: 16px 32px; font-weight: 800; border-radius: 12px; text-decoration: none; font-size: 1rem;">⚡ Xem Danh Sách Xe VinFast Sẵn Có</a>',
    '<a href="./index.html#inventory" class="btn-guide-primary-cta" style="background: #2563eb; color: #fff; padding: 16px 32px; font-weight: 800; border-radius: 12px; text-decoration: none; font-size: 1rem;">⚡ Xem Danh Sách Xe VinFast Sẵn Có</a>'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Updated guide-ev.html to Neural Expressive 2.0 Light Mode standards successfully!');
