---
name: cro-ab-testing-engine
description: >
  Quy trình thiết lập, quản lý và kiểm thử biến thể A/B/n Testing (Hero Banner, Nút CTA,
  Tiêu đề, Form Layout) cho Landing Page tĩnh (Vanilla HTML/JS).
  Kích hoạt khi: thiết kế chiến dịch A/B testing, thử nghiệm tiêu đề/nút bấm mới, 
  đo lường tỷ lệ chuyển đổi (CRO) hoặc tối ưu hành trình khách hàng.
---

# 🎯 CRO A/B Testing Engine Skill

## Khi Nào Kích Hoạt

Bắt buộc áp dụng skill này khi:
- Cần thử nghiệm biến thể giao diện (Hero Banner, tiêu đề `<h1>`, màu nút CTA, layout Form).
- Đánh giá hiệu quả tỷ lệ chuyển đổi (Conversion Rate Optimization - CRO).
- Thêm mã định danh chiến dịch A/B testing vào DataLayer và Google Analytics 4 (GA4).
- Yêu cầu ngăn chặn hiện tượng nhấp nháy giao diện (Flicker Mitigation) khi tải trang.

---

## Quy Trình Thực Thi A/B Testing Tĩnh

### Bước 1 — Khai báo thuộc tính Variant trong HTML

Gắn thuộc tính `data-ab-test` và `data-ab-variant` vào các phần tử cần thử nghiệm:

```html
<!-- Ví dụ: Thử nghiệm Nút CTA chính -->
<button 
  type="submit" 
  class="btn btn-primary cta-btn"
  data-ab-test="cta_button_color"
  data-ab-variant-a="Báo Giá Ngay (Màu Xanh)"
  data-ab-variant-b="Nhận Ưu Đãi Ngay (Màu Cam Glow)"
>
  Nhận Báo Giá Ngay
</button>
```

### Bước 2 — Tích hợp Script Điều phối Variant (Flicker-Free Engine)

Đảm bảo script phân chia Variant được thực thi sớm nhất trong `<head>` để chống Flicker:

```javascript
(function() {
  // 1. Kiểm tra Query Param ?variant=b hoặc LocalStorage
  const urlParams = new URLSearchParams(window.location.search);
  let variant = urlParams.get('variant');
  
  if (!variant) {
    variant = localStorage.getItem('auto28_ab_cta_color') || (Math.random() < 0.5 ? 'a' : 'b');
  }
  localStorage.setItem('auto28_ab_cta_color', variant);
  
  // 2. Gán class Variant vào <html>
  document.documentElement.classList.add('ab-variant-' + variant);
  
  // 3. Push Event Exposure tới DataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'ab_test_exposure',
    test_id: 'cta_button_color',
    variant_id: variant
  });
})();
```

### Bước 3 — Định nghĩa CSS Styling cho từng Variant

```css
/* Style mặc định: Variant A */
html.ab-variant-a .cta-btn {
  background: var(--color-primary, #0056b3);
}

/* Style thử nghiệm: Variant B */
html.ab-variant-b .cta-btn {
  background: linear-gradient(135deg, #ff6b00 0%, #ff8800 100%);
  box-shadow: 0 4px 20px rgba(255, 107, 0, 0.4);
}
```

### Bước 4 — Đo lường Tỷ lệ Chuyển đổi (Conversion Tracking)

Khi người dùng thực hiện hành động chuyển đổi (bấm submit form hoặc gọi điện), gửi kèm `variant_id`:

```javascript
window.dataLayer.push({
  event: 'form_lead_success',
  ab_test_id: 'cta_button_color',
  ab_variant_id: localStorage.getItem('auto28_ab_cta_color') || 'a'
});
```

---

## Tiêu Chuẩn Kiểm Thử & Nghiệm Thu

1. **Flicker-Free Pass**: Màn hình KHÔNG bị giật/nháy từ Variant A sang Variant B khi nạp trang.
2. **Persistence Pass**: Khi F5 hoặc chuyển trang con, khách hàng giữ nguyên Variant ban đầu.
3. **Analytics Sync Pass**: Sự kiện `ab_test_exposure` xuất hiện trong DataLayer ngay khi tải trang.
