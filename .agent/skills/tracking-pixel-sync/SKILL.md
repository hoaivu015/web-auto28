---
name: tracking-pixel-sync
description: >
  Kiểm tra và đảm bảo tracking pixels (Google Ads, GA4, Facebook, TikTok) 
  được đồng bộ đầy đủ ở TẤT CẢ entry points của dự án Auto 28 trước khi deploy.
  Kích hoạt khi: thêm pixel mới, sửa tag ID, cấu hình GTM, hoặc thêm trang HTML mới.
---

# Tracking Pixel Sync Skill

## Khi Nào Kích Hoạt

Bắt buộc chạy skill này khi:
- Thêm tracking pixel mới (Google Ads, GA4, Facebook, TikTok...)
- Sửa tag ID hoặc cấu hình GTM
- Tạo trang HTML mới (`*.html`)
- Nhận thông báo "Tag not found" / "Pixel not active" từ bất kỳ platform nào

## Quy Trình Thực Thi

### Bước 1 — Xác định tất cả entry points

```bash
# Tìm tất cả file HTML trong dự án
find /Users/phanvu/Desktop/auto-28 -name "*.html" \
  -not -path "*/node_modules/*" \
  -not -path "*/.git/*" \
  -not -path "*/dist/*"
```

**Entry points hiện tại của Auto 28:**
- `/index.html` — Vite root (www.auto28.com.vn)
- `/lading-page/index.html` — Landing page tĩnh
- `/lading-page/sell.html` — Trang bán xe

### Bước 2 — Kiểm tra từng file có đầy đủ pixel không

```bash
# Kiểm tra GTM
grep -l "GTM-PPKRWBPC" /Users/phanvu/Desktop/auto-28/*.html \
  /Users/phanvu/Desktop/auto-28/lading-page/*.html

# Kiểm tra Google Ads
grep -l "AW-18153153954" /Users/phanvu/Desktop/auto-28/*.html \
  /Users/phanvu/Desktop/auto-28/lading-page/*.html

# Kiểm tra GA4
grep -l "G-PM7K9CB73D" /Users/phanvu/Desktop/auto-28/*.html \
  /Users/phanvu/Desktop/auto-28/lading-page/*.html

# Kiểm tra Facebook
grep -l "537471081061777" /Users/phanvu/Desktop/auto-28/*.html \
  /Users/phanvu/Desktop/auto-28/lading-page/*.html
```

Nếu bất kỳ file nào thiếu → thêm pixel còn thiếu vào file đó.

### Bước 3 — Cấu trúc pixel chuẩn

Thứ tự bắt buộc trong `<head>`:

```html
<!-- 1. GTM (LUÔN ĐẦU TIÊN) -->
<script>(function(w,d,s,l,i){...GTM snippet...})(window,document,'script','dataLayer','GTM-PPKRWBPC');</script>

<!-- 2. Google Ads + GA4 (NGAY SAU GTM) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-18153153954"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-18153153954');
  gtag('config', 'G-PM7K9CB73D');
</script>

<!-- 3. Facebook Pixel -->
<script>fbq('init', '537471081061777');...</script>

<!-- 4. TikTok Pixel -->
<script>ttq.load('D802OM3C77UEKU3Q3HPG');...</script>
```

### Bước 4 — Verify trên production sau deploy

```bash
# Verify tất cả pixel tại root URL
curl -s https://www.auto28.com.vn | grep -E "GTM-PPKRWBPC|AW-18153153954|G-PM7K9CB73D|537471081061777|D802OM3C77UEKU3Q3HPG"

# Phải thấy đủ 5 ID trong output
```

### Bước 5 — Cập nhật bảng inventory

Sau khi thêm pixel mới, cập nhật bảng trong:
`/Users/phanvu/Desktop/auto-28/guides/TRACKING_PIXELS_RULE.md`

## Lý Do Quan Trọng

Auto 28 có dual-app architecture:
- **App 1** (Vite/React): Được phục vụ tại `www.auto28.com.vn` (root)
- **App 2** (Static HTML): Được phục vụ qua Vercel rewrite `/:path*` → `/lading-page/:path*`

Google, Facebook, TikTok scanner luôn quét ROOT URL trước.
Nếu root không có tag → platform báo "not installed" dù landing page có tag.

**Tham chiếu chi tiết:** `/Users/phanvu/Desktop/auto-28/guides/TRACKING_PIXELS_RULE.md`
