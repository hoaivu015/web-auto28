---
name: landing-page-audit
description: Phân tích, đánh giá, kiểm thử và chấm điểm chất lượng kỹ thuật Landing Page dựa trên các tiêu chuẩn đo lường chuyển đổi (DataLayer), tối ưu SEO truyền thống (Core Web Vitals) và tối ưu hóa SEO AI (GEO/AEO). Use when analyzing landing page code, assessing HTML/CSS/JS form structure, checking SEO elements, validating analytics event tracking, or when user mentions auditing landing pages.
---

# Landing Page Audit Skill

Kỹ năng này giúp AI phân tích mã nguồn thực tế của Landing Page, phát hiện lỗi cấu trúc và chấm điểm dựa trên bộ tiêu chí chuẩn mực cao cấp.

## Quick Start

Để tự động quét và đánh giá mã nguồn Landing Page hiện tại, hãy chạy script NodeJS hỗ trợ:

```bash
node .agent/skills/landing-page-audit/scripts/audit-helper.js
```

## Workflow

AI Agent thực hiện quy trình phân tích Landing Page theo 4 bước chuyên sâu:

### Bước 1: Quét cấu trúc HTML5 & SEO (Semantic Auditing)
*   [ ] Kiểm tra sự tồn tại của cặp thẻ `<form>` ngữ nghĩa và nút bấm `<button type="submit">`.
*   [ ] Xác minh thẻ meta viewport, title, description, và Schema Markup JSON-LD.
*   [ ] Đối chiếu với các quy tắc lỗi tối kỵ trong [REFERENCE.md](REFERENCE.md).

### Bước 2: Đánh giá đo lường chuyển đổi (Analytics Tracking Auditing)
*   [ ] Quét mã nguồn JavaScript để xác minh có gọi `window.dataLayer.push()` khi gửi form thành công.
*   *Quy tắc*: Tuyệt đối không bắt sự kiện click nút bấm thông thường (DOM Scraping) để tránh sai lệch dữ liệu.
*   [ ] Kiểm tra cơ chế khóa nút gửi (`disabled`) để chống Click Spamming.

### Bước 3: Phân tích tối ưu hóa SEO AI (Generative Engine Optimization - GEO)
*   [ ] Đánh giá cấu trúc thông tin xem đã theo mô hình kim tự tháp ngược chưa.
*   [ ] Kiểm tra các thông số xe đã được tối ưu dạng thẻ `<table>`, `<ul>` để AI dễ dàng trích dẫn làm nguồn.
*   [ ] Kiểm tra xem có khối FAQ đàm thoại giải quyết trực diện nỗi sợ của khách hàng không.

### Bước 4: Chạy Script Tự Động & Xuất Báo Cáo Chấm Điểm
*   [ ] Thực thi script `audit-helper.js` để tự động hóa kiểm tra.
*   [ ] Phân loại mức độ hoàn thành:
    *   **90 - 100đ**: Xuất sắc (Ready to Launch).
    *   **75 - 89đ**: Khá (Đồng ý deploy, tinh chỉnh sau).
    *   **Dưới 75đ**: Chưa Đạt (Bắt buộc sửa lại).
