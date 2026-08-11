---
name: Visual Layout & WCAG Audit (0-Token Headless Engine)
description: Quy trình kiểm thử thị giác di động, máy tính bảng và máy tính (Mobile, Tablet, Desktop), đo đạc WCAG 2.2 Color Contrast và Target Size tự động bằng Headless Chrome không tiêu tốn token Vision. Kích hoạt khi cần đánh giá giao diện đa thiết bị, kiểm tra nút bấm, độ tương phản màu sắc hoặc khi người dùng báo Landing Page hiển thị kém trên điện thoại, iPad hoặc PC.
---

# Visual Layout & WCAG Audit Skill (Enterprise Multi-Device Standard 2026)

Kỹ năng này cung cấp quy trình và công cụ kiểm thử **thị giác đa thiết bị (Multi-Device Viewport Matrix: Mobile, Tablet, Desktop)** và **độ truy cập WCAG 2.2** tự động 100% bằng môi trường trình duyệt thật Headless Chrome.

Khác với các công cụ linter tĩnh chỉ đọc chuỗi text trong file HTML/CSS, kỹ năng này thực thi kiểm thử bằng cách đo đạc tọa độ Pixels thực tế (`getBoundingClientRect`, `elementFromPoint`, `axe-core/contrast math`) và xuất kết quả dạng JSON siêu nhẹ giúp **triệt tiêu 100% chi phí token hình ảnh (Vision Tokens)**.

---

## 📐 Ma Trận Màn Hình Đa Thiết Bị (Multi-Device Viewport Matrix)

Engine tự động mô phỏng và kiểm thử song song 3 chuẩn màn hình công nghiệp quốc tế:

| Thiết bị | Kích thước Viewport | Chế độ tương tác | Tiêu chuẩn Vùng bấm (Target Size) |
| :--- | :--- | :--- | :--- |
| 📱 **Mobile (iPhone 15)** | `390px x 844px` | Touch Input | Tối thiểu **44px x 44px** (WCAG SC 2.5.8) |
| 📱 **Tablet (iPad Air / Pro)** | `834px x 1194px` | Touch / Stylus | Tối thiểu **44px x 44px** (WCAG SC 2.5.8) |
| 💻 **Desktop (Laptop 14")** | `1440px x 900px` | Mouse Pointer | Tối thiểu **24px x 24px** (WCAG SC 2.5.8) |

---

## ⚡ Quick Start

Để khởi chạy engine kiểm thử thị giác đa thiết bị tự động trên toàn bộ các trang Landing Page:

```bash
npm run audit:visual
# Hoặc chạy trực tiếp script của skill:
node .agents/skills/visual-wcag-audit/scripts/visual_layout_audit.js
```

Muốn chạy đồng thời cả **Static Code Audit** + **Multi-Device Visual Layout Audit**:

```bash
npm run audit:all
```

---

## 🎯 5 Hạng Mục Kiểm Thử Thị Giác Thực Tế Quốc Tế (5 Core Visual Checks)

### 1. 📱 Multi-Device Above-The-Fold Lead Form & CTA Matrix
- **Tiêu chuẩn**: Form đăng ký hoặc nút CTA chính (`#leadForm`, `.lead-form`, `#heroForm`, `.btn-cta-primary`, `.btn-primary`) bắt buộc phải xuất hiện trọn vẹn trong màn hình đầu tiên của từng loại thiết bị:
  - Mobile: `y < 844px`
  - Tablet: `y < 1194px`
  - Desktop: `y < 900px`

### 2. ↔️ Cross-Viewport Reflow & Horizontal Overflow (WCAG 1.4.10)
- **Tiêu chuẩn**: `document.documentElement.scrollWidth <= window.innerWidth` ở mọi kích thước màn hình.
- **Lý do**: Triệt tiêu lỗi cuộn ngang vỡ viền di động và máy tính bảng, giữ chỉ số CLS ~ 0.

### 3. 💥 UI Collision & Element Overlap Check (Chống Đè Nút Bấm)
- **Tiêu chuẩn**: Gọi `document.elementFromPoint(centerX, centerY)` tại trung tâm của mọi phần tử tương tác (Nút Đóng Modal `X`, Nút Submit, Nút Gọi Điện) ở cả 3 giao diện.
- **Lý do**: Ngăn chặn lớp Overlay, hình ảnh hoặc thanh Navigation đè lấp nút bấm trên Mobile/Tablet/Desktop.

### 4. 👆 Adaptive Target Size Compliance (WCAG 2.2 SC 2.5.8)
- **Thiết bị Cảm ứng (Mobile / Tablet)**: Vùng bấm tối thiểu **44px x 44px** (khuyên dùng 48px).
- **Thiết bị Con trỏ (Desktop)**: Vùng bấm tối thiểu **24px x 24px**, kiểm tra hiệu ứng Hover và `:focus-visible`.

### 5. 🎨 Color Contrast Ratio Math (WCAG 2.2 SC 1.4.3 & 1.4.11)
- **Văn bản thường**: Tỷ lệ tương phản chữ/nền tối thiểu **4.5 : 1**.
- **Tiêu đề lớn / Điều khiển UI**: Tỷ lệ tương phản tối thiểu **3.0 : 1**.

---

## 📸 Multi-Device Screenshot Vault (Dual Mode: Full-Page & Viewport)

Script tự động lưu bộ ảnh giao diện thực tế 2 chế độ chụp cho tất cả các trang HTML (`index.html`, `vf6.html`, `vf8.html`...):
1. **Full-Page (Chụp từ đỉnh xuống chân trang)**:
   - `[page]_[device]_full.png` (Ví dụ: `index_mobile_full.png`, `index_desktop_full.png`)
2. **Above-The-Fold Viewport (Khung nhìn màn hình đầu tiên)**:
   - `[page]_[device]_fold.png` (Ví dụ: `index_mobile_fold.png`, `index_desktop_fold.png`)

📁 Đường dẫn lưu tệp:
`file:///Users/phanvu/Desktop/lading-page/.agent/scratch/screenshots/`

---

## 📑 Báo Cáo JSON & Tiêu Chí Nghiệm Thu (Scoring Thresholds)

- Báo cáo Ma trận chi tiết được lưu tại: `.agent/scratch/visual_report.json`
- **Tiêu chí nghiệm thu (PASSED)**:
  - **Visual Score >= 85 / 100 điểm**.
  - **Horizontal Overflow Failures = 0** trên cả Mobile, Tablet và Desktop.
  - **Above-The-Fold Pass Rate = 100%** trên toàn bộ 3 loại thiết bị.
