---
name: Design System Code Guide (Auto 28 Edition)
description: Hướng dẫn lập trình và áp dụng ngôn ngữ thiết kế Neural Expressive 2.0 (Liquid Glassmorphism, Spring Physics Cubic-Bezier, Vertical Mobile Car Cards và Uniform 2rem Section Spacing) cho dự án Auto 28 Landing Page (Vanilla HTML5/CSS3/ES2025).
---

# 🎨 NEURAL EXPRESSIVE & LIQUID GLASS 2.0 — CODE GUIDE (VANILLA WEB EDITION)

> **Quy tắc tối thượng:** Dự án Auto 28 Landing Page sử dụng **Vanilla HTML5 / CSS3 / ES2025** (KHÔNG dùng React/Tailwind). Mọi thành phần giao diện phải tuân thủ hệ thống biến CSS trong `styles/` (được đóng gói sang `style.css` qua `npm run build`).
> 1. **BOLD-FIRST (Quy tắc 2 Giây):** Đẩy độ tương phản cao vào tiêu đề và giá bán (`font-weight: 900`), giúp khách hàng mua xe quét thông tin trong 2 giây.
> 2. **BO GÓC CỰC ĐẠI (Super Ellipse):** Thẻ lớn bo góc `32px` (`2rem`) trên Desktop và `24px` (`1.5rem`) trên Mobile; nút bấm bo tròn `9999px`.
> 3. **VẬT LIỆU KÍNH MỜ LIGHT BENTO (Liquid Translucency):** Sử dụng nền kính sáng `rgba(255, 255, 255, 0.88)` + `backdrop-filter: blur(24px)` + viền `#E1E9F6`, đảm bảo độ tương phản WCAG 2.2 AA (`≥ 4.5:1`).
> 4. **KHOẢNG CÁCH ĐỒNG NHẤT 2REM (Uniform Section Offset):** Toàn bộ khoảng cách `padding` giữa các section và khoảng cách với chân trang (footer) cố định ở mức **`2rem` (`32px`)**.

---

## ═══ I. HỆ THỐNG TOKENS THIẾT KẾ CỐT LÕI (CSS CUSTOM PROPERTIES) ═══

### 1. Phân Lớp Màu Sắc & Chiều Sâu (Light Bento Surface Hierarchy)

| Tầng lớp (Layer) | Giá trị CSS Chuẩn | Ứng dụng thực tế |
| :--- | :--- | :--- |
| **Layer 0 (Canvas BG)** | `#F3F6FC` | Nền tổng thể của trang Landing Page |
| **Layer 1 (Bento Card)** | `rgba(255, 255, 255, 0.88)` + `backdrop-filter: blur(24px)` + `border: 1px solid #E1E9F6` | Thẻ xe `.expressive-car-card`, khối E-E-A-T, Bản đồ Showroom |
| **Layer 2 (Capsule Nav)** | `rgba(255, 255, 255, 0.98)` + `backdrop-filter: blur(28px)` | Thanh điều hướng nổi (tự động thêm `.nav-hidden` khi cách footer `≤ 200px`) |
| **Layer 3 (Text Primary)** | `#020B14` | Tiêu đề H1, H2, H3, tên xe, giá bán (Contrast > 15:1) |
| **Layer 4 (Text Secondary)** | `#1E293B` / `#475569` | Thông số Odo, năm sản xuất, mô tả chi tiết (Contrast > 7:1) |

### 2. Quy Chuẩn Khoảng Cách (8pt Grid & Uniform 2rem Section Rule)
- **Section & Footer Spacing**: Mọi `<section>` và khoảng cách trước `<footer>` bắt buộc dùng `padding-top: 2rem; padding-bottom: 2rem;` (`32px`).
- **Grid & Card Spacing**: Dùng bội số của `4px` / `8px` (`0.5rem`, `1rem`, `1.5rem`, `2rem`). Nghiêm cấm số lẻ (`3px`, `5px`, `7px`, `13px`).
- **Touch Target**: Mọi nút bấm CTA, pill lọc dòng xe phải đạt `min-height: 48px` (WCAG 2.2 AA).

---

## ═══ II. BỐ CỤC THẺ XE CHUẨN (VANILLA HTML5 & CSS3 ANATOMY) ═══

### 1. Quy tắc Bắt buộc trên Mobile (`≤ 639px`): Thẻ Dọc 100% (Vertical Stacked Card)
> [!IMPORTANT]
> **CẤM TUYỆT ĐỐI** dùng bố cục ngang (`flex-direction: row`) cho thẻ xe trên màn hình di động. Bắt buộc xếp dọc (`flex-direction: column`), ảnh xe tỷ lệ `16:10` rộng `100%` để hiển thị trọn vẹn dáng xe và nút CTA **"Xem Chi Tiết Xe"** không bị tràn chữ.

```css
/* Desktop & Base Card */
.expressive-car-card {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid #E1E9F6;
  border-radius: 2rem; /* 32px */
  padding: 1.5rem;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.expressive-car-card:hover {
  transform: translateY(-6px) scale(1.01);
}

/* Mobile Layout (<= 639px): Vertical Stacked */
@media (max-width: 639px) {
  .expressive-car-card {
    flex-direction: column;
    padding: 1rem;
    border-radius: 1.5rem; /* 24px */
  }
  .card-img-container {
    width: 100%;
    aspect-ratio: 16 / 10;
    border-radius: 1rem;
    overflow: hidden;
  }
}
```

### 2. Rào chắn Modal & Smart Capsule Navigation
```css
/* Ngăn chặn rò rỉ Modal khi chưa mở */
.car-modal-backdrop,
#car-modal,
.expressive-modal:not(.open) {
  display: none !important;
}

/* Tự động ẩn Capsule Nav khi cuộn xuống gần Footer (<= 200px) */
.capsule-nav.nav-hidden {
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -24px);
}
```

---

## ═══ III. CHECKLIST QUY CHUẨN TRƯỚC KHI SUBMIT UI ═══

- [ ] **Thuật ngữ Pin chuẩn**: Chỉ dùng `"Xe mua pin"` hoặc `"Xe thuê pin"` (CẤM `"Xe sở hữu pin"`, `"Mua đứt pin"`).
- [ ] **Không có Ảnh 360° & Không có Mobile Sticky Bar**: Đảm bảo trang nhẹ, cuộn mượt 60fps.
- [ ] **Mobile Vertical Card**: Kiểm tra ở viewport `375px` và `430px` — thẻ xe xếp dọc, ảnh `16:10`, nút CTA không gãy dòng.
- [ ] **Section Spacing 2rem**: Khoảng cách giữa các section và trước footer đồng nhất `2rem` (`32px`).
- [ ] **Build & Healthcheck**: Luôn chạy `npm run build && npm run healthcheck` sau khi sửa CSS trong `styles/` hoặc component trong `src/components/`.
