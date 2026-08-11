---
name: geo-personalization
description: >
  Quy trình tự động hóa cá nhân hóa giao diện, Hotline tư vấn và thông tin Showroom
  dựa trên vị trí địa lý (Geo-IP / Region) của khách hàng truy cập Landing Page.
  Kích hoạt khi: bổ sung chi nhánh mới, tối ưu tỷ lệ chuyển đổi vùng miền, 
  hoặc cấu hình dynamic Hotline theo Tỉnh/Thành.
---

# 📍 Geo-Location Personalization Skill

## Khi Nào Kích Hoạt

Bắt buộc chạy skill này khi:
- Cần tự động cập nhật SĐT Hotline và Địa chỉ Showroom phù hợp với tỉnh/thành của khách hàng (ví dụ: Khách Hà Nội thấy Showroom Cầu Giấy, Khách TP.HCM thấy Showroom Tân Bình).
- Tăng trải nghiệm địa phương hóa (Local Trust & CRO Boost).
- Tự động điền sẵn Tỉnh/Thành vào Form đăng ký tư vấn.

---

## Kiến Trúc Xử Lý Geo Personalization Tĩnh

### Bước 1 — Module Xác định Vị trí IP (Client-Side Detection)

Sử dụng IP API nhẹ (hoặc Cloudflare Geo Headers) với cơ chế fallback an toàn:

```javascript
// js/modules/geo_personalization.js
(async function initGeoPersonalization() {
  const DEFAULT_REGION = 'HN'; // Hà Nội là miền mặc định
  let userRegion = localStorage.getItem('auto28_user_region');

  if (!userRegion) {
    try {
      const res = await fetch('https://ipapi.co/json/', { timeout: 2000 });
      if (res.ok) {
        const data = await res.json();
        const city = (data.city || '').toLowerCase();
        if (city.includes('ho chi minh') || city.includes('saigon')) {
          userRegion = 'HCM';
        } else if (city.includes('da nang')) {
          userRegion = 'DN';
        } else {
          userRegion = 'HN';
        }
      }
    } catch (e) {
      userRegion = DEFAULT_REGION;
    }
    localStorage.setItem('auto28_user_region', userRegion);
  }

  applyGeoStylesAndData(userRegion);
})();
```

### Bước 2 — Áp dụng Thông tin Địa phương lên UI

Cập nhật các phần tử HTML mang thuộc tính `data-geo-phone`, `data-geo-address`:

```javascript
function applyGeoStylesAndData(region) {
  const REGION_CONFIG = {
    HN: {
      phone: '0981 234 567',
      phoneCall: 'tel:0981234567',
      address: 'Số 28 Phạm Hùng, Q. Cầu Giấy, Hà Nội',
      showroomName: 'Auto 28 Hà Nội'
    },
    HCM: {
      phone: '0989 888 999',
      phoneCall: 'tel:0989888999',
      address: 'Số 100 Cộng Hòa, Q. Tân Bình, TP. Hồ Chí Minh',
      showroomName: 'Auto 28 TP.HCM'
    }
  };

  const config = REGION_CONFIG[region] || REGION_CONFIG['HN'];

  // 1. Cập nhật các nút gọi điện Hotline
  document.querySelectorAll('[data-geo-phone]').forEach(el => {
    el.innerText = config.phone;
    if (el.tagName === 'A') el.href = config.phoneCall;
  });

  // 2. Cập nhật địa chỉ hiển thị
  document.querySelectorAll('[data-geo-address]').forEach(el => {
    el.innerText = config.address;
  });
}
```

### Bước 3 — Gắn thẻ HTML Ngữ nghĩa

```html
<!-- Nút Hotline trên Header -->
<a href="tel:0981234567" class="btn-hotline" data-geo-phone>0981 234 567</a>

<!-- Chân trang Footer -->
<p class="footer-address">
  Địa chỉ Showroom: <span data-geo-address>Số 28 Phạm Hùng, Cầu Giấy, Hà Nội</span>
</p>
```

---

## Tiêu Chuẩn Nghiệm Thu

1. **Fallback Pass**: Nếu API định vị IP không phản hồi (timeout hoặc bị adblock), trang web tự động dùng thông tin chi nhánh chính Hà Nội mà KHÔNG bị giật lag hay treo trang.
2. **Form Pre-fill Pass**: Selector Tỉnh/Thành trong Form Đăng Ký tự động chọn đúng khu vực tương ứng của người dùng.
3. **Performance Pass**: Script xử lý Geo IP thi hành dưới **150ms** và không ảnh hưởng đến chỉ số LCP.
