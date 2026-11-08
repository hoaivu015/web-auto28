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
- Tái cấu trúc thành công AGENTS.md v3.1 sang kiến trúc Modular (`.agents/modules/`), xóa bỏ hoàn toàn thư mục `.agent/` cũ (triệt tiêu Split-Brain), và gộp 2 agent CRO (`cro_specialist` + `automotive_cro_architect`) thành 1 agent duy nhất `automotive_cro_architect` (Tổng cộng **13 Subagents** tinh nhuệ).
- **QUY TẮC THUẬT NGỮ PIN XE ĐIỆN (MANDATORY)**: BẮT BUỘC dùng **"Xe mua pin"** (hoặc "Xe thuê pin"). **CẤM DÙNG** "Xe sở hữu pin" hoặc "Mua đứt pin".
- **RISK ASSESSMENT MATRIX (Section 17 AGENTS.md)**: Trước mọi tác vụ, Agent tự động đánh giá Mức độ rủi ro (Risk Level):
  • 🟢 **LOW RISK** & 🟡 **MEDIUM RISK**: Tự động thực thi ngay ➔ Kiểm tra `healthcheck` ➔ Báo cáo kết quả. KHÔNG HỎI LẠI.
  • 🔴 **HIGH RISK** (Xóa file, sửa `server.js`, đổi luồng tracking, refactor lớn): Dừng lại khai báo rủi ro & xin xác nhận từ người dùng.

## Context từ session gần nhất
- Đã thiết lập Ma trận Đánh giá Rủi ro 3 cấp độ (Low/Medium/High) trong `Section 17 (AGENTS.md)`.
- Đã kiểm tra tính toàn vẹn hệ thống: Healthcheck đạt `✅ 10/10 PASS`.
- **QUY CHUẨN KHOẢNG CÁCH (SECTION SPACING & FOOTER OFFSET)**: Đồng nhất toàn bộ khoảng cách `padding` giữa các section trên toàn bộ Landing Page và khoảng cách với chân trang (footer) về mức cố định chuẩn **`2rem`** (`32px` top/bottom). All agents must respect this 2rem uniform section & footer padding rule.
- **BỐ CỤC THẺ XE MOBILE (VERTICAL STACKED CARD)**: BẮT BUỘC dùng bố cục thẻ dọc (`flex-direction: column`) cho tất cả thẻ xe (`.expressive-car-card`) trên màn hình di động (≤ 639px). Ảnh xe giữ tỷ lệ chuẩn 16:10 (`width: 100%`), đảm bảo thấy trọn vẹn 100% thân xe và nút CTA "Xem Chi Tiết Xe" to rõ không bị tràn/cắt chữ. CẤM dùng bố cục ngang (Horizontal Split 2 cột) trên mobile.
- **FIX v2.6.0 (MODAL LEAKAGE & SMART NAV)**:
  • Bổ sung class `.nav-hidden` vào CSS và cơ chế tự động ẩn Capsule Nav khi cuộn đáy trang (cách footer ≤ 200px) trong `ui-effects.js`.
  • Tăng opacity nền của Capsule Nav lên `0.98` + `blur(28px)` triệt tiêu hoàn toàn hiện tượng xuyên thấu chữ.
  • Bổ sung fallback shield `.car-modal-backdrop, #car-modal, .expressive-modal:not(.open) { display: none !important; }`.
  • Đồng bộ khối bản đồ showroom sang Light Bento card (`#F8FAFC`, viền `#E1E9F6`).
  • Bump cache version lên `v=2.6.0` trong `package.json`, `build_landing.js`, `sw.js` và tự động re-bundle CSS trong script build.
- **MULTI-MODEL SEO & AEO 2026 ENGINE (12 DÒNG XE VINFAST)**:
  • Hoàn tất 4 giai đoạn nâng cấp kiến trúc "1 Giao Diện — 12 Trang Đích SEO" cho toàn bộ 12 dòng xe (`/vf3`, `/vf5`, `/vf6`, `/vf7`, `/vfe34`, `/vf8`, `/vf9`, `/limo`, `/mpv`, `/lux-a`, `/lux-sa`, `/fadil`).
  • Chuẩn hóa 100% thuật ngữ `"Xe mua pin"` cho xe điện và `""` (`Xăng`) cho xe xăng trong `cars_data.js` & `modules/car-modal.js`.
  • Pre-render tĩnh toàn bộ 38 thẻ xe từ `cars_data.js` trực tiếp vào `#cars-grid` trong `build_landing.js` (SSR Static Fallback cho Googlebot & AI Crawlers), đồng thời tự động cá nhân hóa `Title`, `Canonical`, `Hero H1`, `Direct Answer Block 150 từ`, `H2 Grid Header`, và `BreadcrumbList` 3 cấp cho từng dòng xe.
  • Đồng bộ đầy đủ 12 routes trong `server.js` (200 OK thay vì 302 Redirect), `sitemap.xml`, `src/components/footer.html`, và `llms.txt`.

