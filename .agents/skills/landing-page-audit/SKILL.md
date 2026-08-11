---
name: landing-page-audit
description: Phân tích, đánh giá, kiểm thử và chấm điểm chất lượng kỹ thuật Landing Page theo Tiêu chuẩn Công nghiệp Quốc tế 2026. Bao gồm Core Web Vitals (LCP, INP, CLS), Hybrid Conversion Tracking (DataLayer & Meta CAPI Event Deduplication), Generative Engine Optimization (GEO/AI Search), WCAG 2.2 Accessibility và Mobile UX 8pt Grid Spacing System. Use when analyzing landing page code, assessing HTML/CSS/JS form structure, checking SEO elements, validating analytics event tracking, or when user mentions auditing landing pages.
---

# Landing Page Audit Skill (International Standard 2026)

Kỹ năng này giúp AI phân tích mã nguồn thực tế của Landing Page, phát hiện lỗi cấu trúc và chấm điểm dựa trên bộ tiêu chuẩn công nghiệp quốc tế mới nhất 2026.

## Quick Start

Để tự động quét và đánh giá mã nguồn Landing Page hiện tại, hãy chạy script NodeJS hỗ trợ:

```bash
node .agent/skills/landing-page-audit/scripts/audit-helper.js
```

## Workflow 5 Bước Chuyên Sâu

AI Agent thực hiện quy trình phân tích Landing Page theo 5 bước tiêu chuẩn quốc tế:

### Bước 1: Quét cấu trúc Semantic HTML5 & SEO Thực Thể (Semantic & Entity Auditing)
*   [ ] Kiểm tra cặp thẻ `<form>` ngữ nghĩa, nút bấm `<button type="submit">`, và thuộc tính `autocomplete`.
*   [ ] Xác minh thẻ meta viewport, title, meta description độc bản, và Schema Markup JSON-LD (`AutoDealer`, `Car`, `FAQPage`, `Offer`).
*   [ ] Đối chiếu với các quy tắc kiểm thử chi tiết trong [REFERENCE.md](REFERENCE.md).

### Bước 2: Kiểm tra Hiệu năng & Core Web Vitals 2026 (CWV & INP Auditing)
*   [ ] **LCP < 2.5s**: Tải ảnh Hero nhanh, hỗ trợ `fetchpriority="high"`, định dạng WebP/AVIF (< 250KB) và `loading="lazy"` cho ảnh Below the fold.
*   [ ] **INP < 200ms**: Phản hồi tương tác tức thì, kiểm tra chống nghẽn Main-thread JS do 3rd-party scripts.
*   [ ] **CLS < 0.1**: Bố cục ổn định tuyệt đối, dùng aspect-ratio container cho tất cả media.
*   [ ] **Resource Hints**: Khai báo `<link rel="preconnect">` và `dns-prefetch` giảm độ trễ kết nối.

### Bước 3: Đánh giá Đo lường Chuyển đổi & Meta CAPI (Hybrid Conversion Tracking)
*   [ ] Quét mã nguồn JavaScript để xác minh có gọi `window.dataLayer.push()` khi API máy chủ trả về thành công.
*   [ ] **CAPI Deduplication**: Kiểm tra sự tồn tại của `event_id` duy nhất (duy trì tính khử trùng lặp giữa Browser Pixel và Server CAPI).
*   [ ] **Anti-Spam & User Feedback**: Kiểm tra cơ chế vô hiệu hóa nút gửi (`submitBtn.disabled = true`) tránh Click Spamming và phản hồi trạng thái `:user-valid` / `:user-invalid` sau khi người dùng tương tác.

### Bước 4: Phân tích Tối ưu hóa SEO AI (Generative Engine Optimization - GEO)
*   [ ] **Machine Readability**: Đảm bảo nội dung hiển thị chuẩn trên HTML tĩnh / SSR mà không phụ thuộc vào JS Client-Side render phức tạp.
*   [ ] **Inverted Pyramid**: Thông tin cốt lõi (giá xe, ưu đãi, thông số) nằm ở 200 từ đầu tiên.
*   [ ] **Trích dẫn AI**: Cấu trúc thông số kỹ thuật qua thẻ `<table>`, quy trình qua `<ul>`/`<ol>` và khối FAQ đàm thoại (Conversational FAQ) hỗ trợ các mô hình AI Search (ChatGPT, Gemini, Perplexity).

### Bước 5: Kiểm định Mobile UX/UI & WCAG 2.2 Accessibility (Visual & Viewport Auditing)
*   [ ] Touch target tối thiểu `48x48px` cho tất cả các nút tương tác và liên hệ.
*   [ ] Mobile Sticky CTA Bar cố định cuộc gọi / chat ở đáy màn hình.
*   [ ] Spacing System chuẩn bội số 4px / 8px (triệt tiêu Spacing số lẻ và Ghost Spacing).
*   [ ] Đảm bảo độ tương phản màu sắc WCAG Level AA (tỷ lệ tương phản >= 4.5:1).
*   [ ] **Visual Viewport Boundary & Reflow (WCAG 2.2 SC 1.4.10)**: Kiểm tra trực quan không bị che khuất/cắt cụt Form CTA (Button & Inputs) ở màn hình di động dọc (Mobile Viewport Clipping).
*   [ ] **Non-Overlapping Element Placement**: Đảm bảo các nút điều khiển (Close Button `X`, Navigation Arrows) không bị chèn đè lên vùng hình ảnh/nội dung sản phẩm gây xung đột thị giác.

## Tiêu Chí Chấm Điểm & Đánh Giá (Scoring Integrity)
*   **Nguyên tắc thành thật & Khắt khe**: Đánh giá dựa 100% trên bằng chứng thực tế từ mã nguồn và script kiểm thử tự động. Tuyệt đối không nâng điểm ảo, không bỏ qua các lỗi tiềm ẩn.
*   **90 - 100đ**: Xuất sắc (Ready to Launch).
*   **75 - 89đ**: Khá (Đồng ý deploy, tinh chỉnh thêm).
*   **Dưới 75đ**: Chưa Đạt (Bắt buộc sửa lại trước khi ra mắt).

