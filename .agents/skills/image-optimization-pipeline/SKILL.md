---
name: image-optimization-pipeline
description: >
  Quy trình tự động hóa chuyển đổi, nén và chuẩn hóa hiển thị hình ảnh Landing Page
  đạt chuẩn LCP < 2.5s và Core Web Vitals (WebP, AVIF, responsive srcset).
  Kích hoạt khi: thêm ảnh sản phẩm xe mới, tối ưu tốc độ trang, hoặc khi LCP > 2.5s.
---

# 🖼️ Image Optimization Pipeline Skill

## Khi Nào Kích Hoạt

Bắt buộc chạy skill này khi:
- Thêm hình ảnh xe mới vào thư mục `images/` hoặc `assets/`.
- Chỉ số **LCP (Largest Contentful Paint)** vượt quá **2.5s**.
- Chấm điểm Lighthouse báo lỗi "Unoptimized Images" / "Properly size images".
- Cần tối ưu dung lượng trang web tĩnh phục vụ di động 3G/4G.

---

## Quy Trình Xử Lý Ảnh Chuẩn Công Nghiệp

### 1. Tiêu chuẩn Dung lượng & Định dạng

- **Định dạng ưu tiên**: WebP (`.webp`) cho ảnh sản phẩm/banner, AVIF (`.avif`) cho thiết bị hỗ trợ.
- **Kích thước file tối đa**:
  - Ảnh Hero Banner: `< 250KB`.
  - Ảnh ngoại thất / nội thất xe: `< 120KB`.
  - Icon / Thumbnail / Logo: `< 30KB`.

### 2. Quy trình Nén & Convert Ảnh Tự Động (Node.js Script)

Sử dụng script nén ảnh bằng Node.js / Sharp (hoặc `cwebp` CLI):

```javascript
// scripts/optimize_images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processImage(inputPath, outputPath, width) {
  await sharp(inputPath)
    .resize({ width: width, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(outputPath);
}
```

### 3. Cấu trúc HTML Thẻ `<picture>` Responsive Chuẩn

Áp dụng thẻ `<picture>` đa độ phân giải cho Hero Image và hình xe chính:

```html
<picture class="hero-picture">
  <!-- Màn hình di động (Width < 768px) -->
  <source 
    srcset="images/vf8-hero-mobile.webp 390w, images/vf8-hero-mobile-2x.webp 780w" 
    media="(max-width: 767px)" 
    type="image/webp"
  >
  <!-- Màn hình Máy tính (Width >= 768px) -->
  <source 
    srcset="images/vf8-hero-desktop.webp 1200w, images/vf8-hero-desktop-2x.webp 2400w" 
    media="(min-width: 768px)" 
    type="image/webp"
  >
  <!-- Fallback ảnh gốc -->
  <img 
    src="images/vf8-hero-desktop.jpg" 
    alt="VinFast VF8 Lux - Mẫu Xe Điện Thông Minh" 
    width="1200" 
    height="675" 
    fetchpriority="high"
    decoding="async"
    class="hero-img"
  >
</picture>
```

---

## Tiêu Chuẩn Nâng Cao Cho LCP & CLS

1. **High Priority cho Hero Image**:
   - Ảnh nằm trên màn hình đầu tiên (Above-the-Fold) **BẮT BUỘC** có `fetchpriority="high"` và `decoding="async"`.
   - **CẤM** đặt `loading="lazy"` cho ảnh Hero.
2. **Lazy Loading cho Nội dung phía dưới**:
   - Tất cả ảnh từ phần xe chi tiết, thông số, thư viện ảnh bên dưới **BẮT BUỘC** có `loading="lazy"`.
3. **Triệt tiêu CLS (Layout Shift)**:
   - Tất cả thẻ `<img>` phải khai báo rõ thuộc tính `width` và `height` gốc để trình duyệt giữ khoảng trống trước khi nạp xong ảnh.
