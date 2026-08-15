# Session Context — Auto 28 Agent Memory

> File này lưu context quan trọng giữa các session (§19 Memory Protocol).
> Agent PHẢI đọc file này khi bắt đầu task mới để không hỏi lại những gì đã biết.

## Dự án hiện tại (Cố định)
- **Server**: Express.js → PORT 5000 (`node server.js`)
- **Stack**: Vanilla HTML/CSS/JS — KHÔNG phải React/Next.js
- **Data source**: `cars_data.js` — CẤM dùng Supage
- **Design system**: Neural Expressive 2.0 (§14 AGENTS.md)

## Quyết định kiến trúc đã chốt
- CẤM Mobile Sticky Bar (`sticky_footer_mobile.html`)
- CSS/JS paths dùng relative (`./style.css`) không phải absolute (`/style.css`)
- Tái cấu trúc thành công AGENTS.md v3.0 sang kiến trúc Modular (`.agents/modules/`)
- **QUY TẮC THUẬT NGỮ PIN XE ĐIỆN (MANDATORY)**: BẮT BUỘC dùng **"Xe mua pin"** (hoặc "Xe thuê pin"). **CẤM DÙNG** "Xe sở hữu pin" hoặc "Mua đứt pin".
- **RISK ASSESSMENT MATRIX (Section 17 AGENTS.md)**: Trước mọi tác vụ, Agent tự động đánh giá Mức độ rủi ro (Risk Level):
  • 🟢 **LOW RISK** & 🟡 **MEDIUM RISK**: Tự động thực thi ngay ➔ Kiểm tra `healthcheck` ➔ Báo cáo kết quả. KHÔNG HỎI LẠI.
  • 🔴 **HIGH RISK** (Xóa file, sửa `server.js`, đổi luồng tracking, refactor lớn): Dừng lại khai báo rủi ro & xin xác nhận từ người dùng.

## Context từ session gần nhất
- Đã thiết lập Ma trận Đánh giá Rủi ro 3 cấp độ (Low/Medium/High) trong `Section 17 (AGENTS.md)`.
- Đã kiểm tra tính toàn vẹn hệ thống: Healthcheck đạt `✅ 10/10 PASS`.
- **QUY CHUẨN KHOẢNG CÁCH (SECTION SPACING & FOOTER OFFSET)**: Đồng nhất toàn bộ khoảng cách `padding` giữa các section trên toàn bộ Landing Page và khoảng cách với chân trang (footer) về mức cố định chuẩn **`2rem`** (`32px` top/bottom). All agents must respect this 2rem uniform section & footer padding rule.
- **BỐ CỤC THẺ XE MOBILE (VERTICAL STACKED CARD)**: BẮT BUỘC dùng bố cục thẻ dọc (`flex-direction: column`) cho tất cả thẻ xe (`.expressive-car-card`) trên màn hình di động (≤ 639px). Ảnh xe giữ tỷ lệ chuẩn 16:10 (`width: 100%`), đảm bảo thấy trọn vẹn 100% thân xe và nút CTA "Xem Chi Tiết Xe" to rõ không bị tràn/cắt chữ. CẤM dùng bố cục ngang (Horizontal Split 2 cột) trên mobile.

