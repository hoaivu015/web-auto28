# Module: Content & CRO — Auto 28 Agent System
# Nguồn: AGENTS.md §9 + §10
# Load khi: viết content, SEO/schema, tối ưu CTA, A/B test

---

## §9. AEO 2026 — ANSWER ENGINE OPTIMIZATION

> Chuẩn 2026: AI search engines (Google AI Overview, ChatGPT, Perplexity) dùng schema + structure để trích dẫn.

### Entity-First JSON-LD
- Dùng `@id` URIs ổn định: `"@id": "https://auto28.vn/#organization"`
- `sameAs`: liên kết tới Facebook, Google Business, Zalo Official
- JSON-LD phải khớp **HOÀN TOÀN** với visible text — không được mâu thuẫn
- Validate sau mỗi thay đổi: https://validator.schema.org/
- Schema priority stack: `AutoDealer` → `Car` → `FAQPage` → `HowTo`

### Direct Answer Block (Bắt buộc)
- **150 words đầu tiên** phải chứa core value proposition
- Dùng declarative statements — KHÔNG dùng: "có vẻ", "có thể", "nên"
- Ví dụ đúng: *"Auto 28 cung cấp xe VinFast lướt tại TP.HCM, Bình Dương, Đồng Nai với giá từ 350 triệu. Bảo hành chính hãng. Giao xe trong 24h."*
- Cấu trúc H1 → H2 → H3 — KHÔNG skip level

### JavaScript Accessibility cho AI Crawlers
- Critical content (tên xe, giá, địa chỉ, hotline) KHÔNG render thuần bằng JS
- Phải có fallback HTML tĩnh cho mọi nội dung quan trọng
- Kiểm tra: `curl -s http://localhost:5000/ | grep -i "vinfast"` phải có output
- KHÔNG deploy trang có JSON-LD lỗi syntax

### Schema Semantic Consistency
- `name`, `address`, `telephone` trong JSON-LD = giá trị visible trên trang
- Nếu giá thay đổi → cập nhật cả schema lẫn HTML cùng lúc

---

## §10. CRO RULES — CONVERSION RATE OPTIMIZATION

### Single-Objective Rule
- 1 landing page = 1 mục tiêu = 1 primary CTA
- KHÔNG thêm navigation links, mega-menu, footer links
- KHÔNG thêm social media icons (phân tâm = giảm CVR)
- Mỗi section phải dẫn về 1 hành động: điền form / gọi hotline

### Form Design (Cứng)
- Tối đa **3 fields**: Họ tên + Số điện thoại + (optional) Ghi chú
- KHÔNG thêm field khi chưa có A/B test chứng minh cần thiết
- `submitBtn.disabled = true` trước fetch → chống double-submit
- Form phải visible above-the-fold trên mobile 375px
- Placeholder: `"Nhập số điện thoại (VD: 0901 234 567)"`

### Message Match
- Headline phải phản ánh nguồn traffic (Ad copy → Page headline)
- Ví dụ: Ad *"Xe VinFast lướt giá tốt"* → H1 *"Xe VinFast Lướt — Giá Tốt Nhất TP.HCM"*
- KHÔNG dùng headline chung chung: "Chào mừng đến Auto 28"

---

## Từ Điển Ngôn Ngữ Mua Bán Xe — Tra Cứu Nhanh

| ❌ CẤM DÙNG | ✅ BẮT BUỘC DÙNG |
|---|---|
| "Mua đứt pin", "Xe sở hữu pin" | "Xe mua pin" |
| "Coi gầm", "Check gầm" | "Kiểm tra khung gầm" |
| "Đòi chủ cũ" | "Yêu cầu bên bán cung cấp" |
| "Ngon", "Khá hời" | "Đạt tiêu chuẩn tối ưu", "Lựa chọn kinh tế tối ưu" |
| "Siêu phẩm", "Đỉnh cao", "Tuyệt phẩm" | Mô tả thực tế, cụ thể |
| "Hãy đến với chúng tôi" | Tên showroom + địa chỉ cụ thể |
| "Đăng ký ngay", "Click vào đây" | "Nhận Báo Giá Lăn Bánh", "Xem Xe Trực Tiếp" |

### Từ Ngữ Thực Chiến Chuẩn

**Chất lượng xe:**
> "Xe lướt", "Odo chuẩn", "Bao test hãng", "Sơn zin", "Sổ bảo hành hãng", "Chính chủ", "Cam kết không đâm đụng / ngập nước"

**Giao dịch & Giá cả:**
> "Chốt cọc", "Giữ xe", "Báo giá lăn bánh", "Sang tên trọn gói", "Thương lượng nhẹ", "Hỗ trợ vay 80%", "Giao xe 24h"

**CTA thực chiến:**
> "Nhận Báo Giá Lăn Bánh" | "Xem Xe Trực Tiếp" | "Chốt Cọc Giữ Xe" | "Bao Test Hãng"

**Micro-copy giảm lo âu (bắt buộc gắn dưới CTA):**
> "Bao test hãng toàn quốc" | "Cọc trước 5tr giữ xe 48h - Hoàn 100% nếu không mua" | "Thủ tục sang tên trong ngày"
