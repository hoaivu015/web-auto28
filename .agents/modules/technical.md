# Module: Technical Standards — Auto 28 Agent System
# Nguồn: AGENTS.md §5 + §6 + §7
# Load khi: audit kỹ thuật, sửa bug MIME, kiểm tra Core Web Vitals

---

## §5. TIÊU CHUẨN KỸ THUẬT

### Nguồn Dữ Liệu Xe (Car Data Source Mandate)
- **Nguồn duy nhất**: Bắt buộc sử dụng dữ liệu xe từ [cars_data.js](file:///Users/phanvu/Desktop/lading-page/cars_data.js).
- **Cấm Supage**: Tất cả agent KHÔNG ĐƯỢC PHÉP sử dụng dữ liệu từ Supage. Mọi thông tin xe, thông số kỹ thuật, giá bán và cấu hình hiển thị trên landing page PHẢI trích xuất và đồng bộ hoàn toàn từ `cars_data.js`.

### Đường dẫn CSS/JS
```html
<!-- ✅ ĐÚNG — relative paths -->
<link rel="stylesheet" href="./style.css">
<script src="./main.js"></script>

<!-- ❌ SAI — absolute paths, bị SPA intercept trả về HTML -->
<link rel="stylesheet" href="/style.css">
<script src="/main.js"></script>
```

### Form & Conversion Tracking
- `<form>` HTML5 ngữ nghĩa — KHÔNG dùng div giả form
- `<button type="submit">` — KHÔNG dùng onclick div
- `submitBtn.disabled = true` trước fetch → chống double-submit
- `window.dataLayer.push({ event: 'form_lead_success', ... })` sau response thành công

### SEO & GEO/AEO
- JSON-LD: `AutoDealer` + `Car` + `FAQPage` trên mọi trang
- FAQ accordion schema — ưu tiên AI search engine citation
- Cấu trúc nội dung kim tự tháp ngược (Inverted Pyramid)
- Bảng `<table>` thông số kỹ thuật xe — không dùng div grid

### Core Web Vitals 2026 & Page Load Architecture (Chuẩn Công Nghiệp)

| Chỉ số | Target Đạt | Ngưỡng Cảnh Báo | Veto Trigger (Block) | Công cụ đo |
|---|---|---|---|---|
| **LCP** | **< 1.2s** | > 1.8s | **> 2.5s** | Lighthouse / CrUX |
| **INP** | **< 100ms** | > 150ms | **> 200ms** | CrUX / Web Vitals JS |
| **CLS** | **≤ 0.02** | > 0.05 | **> 0.1** | Lighthouse |
| **TTFB** | **< 200ms** | > 350ms | **> 500ms** | Server / Edge Telemetry |
| **FCP** | **< 0.8s** | > 1.2s | **> 1.5s** | Lighthouse |
| **TBT** | **< 100ms** | > 180ms | **> 250ms** | Lighthouse |

#### Quy Tắc Đường Tới Hạn (Critical Rendering Path - CRP Architecture)
1. **LCP Element Optimization**:
   - Thẻ LCP (ảnh Hero/Banner chính) BẮT BUỘC có thuộc tính `fetchpriority="high"`, `loading="eager"`, `decoding="sync"`.
   - BẮT BUỘC preload LCP Image trong `<head>`: `<link rel="preload" as="image" href="..." fetchpriority="high">`.
   - CẤM dùng `loading="lazy"` hoặc JavaScript client-side render cho phần tử LCP.
2. **Inline Critical CSS**:
   - Extract và inline Critical CSS (< 14KB gzipped) trực tiếp trong thẻ `<style>` ở `<head>`.
   - CSS phụ không khẩn cấp tải qua: `<link rel="stylesheet" href="./style.css" media="print" onload="this.media='all'">`.
3. **Script Execution Non-blocking**:
   - 100% thẻ `<script>` trong `<head>` bắt buộc có thuộc tính `defer` hoặc `type="module"`.
   - Tracking Pixels (GA4, Facebook, TikTok) chỉ khởi chạy sau FCP hoặc qua `requestIdleCallback()`.
4. **Asset & Font Architecture**:
   - Phông chữ WOFF2 + `font-display: swap` hoặc `font-display: optional` + Preload + Font metric overrides.
   - Hình ảnh format WebP/AVIF, bắt buộc thuộc tính `width`, `height` hoặc `aspect-ratio` giữ vị trí (CLS = 0).
5. **Edge Caching & Service Worker**:
   - Dynamic HTML: `Cache-Control: public, max-age=0, must-revalidate`.
   - Static Immutable Assets: `Cache-Control: public, max-age=31536000, immutable`.
   - Service Worker (`sw.js`): Cache-First cho static, Stale-While-Revalidate cho data, Route Prefetching khi hover.

### Mobile Standards
- Touch targets ≥ 48px (`min-height: 48px`) — bắt buộc WCAG 2.2
- 8dp spacing giữa các touch targets
- Spacing: bội số 4px / 8px — KHÔNG dùng giá trị lẻ (3px, 7px, 13px)
- Test viewport: 375px (iPhone SE) và 430px (iPhone 15 Pro Max)
- Modal form: Form CTA phải visible above-the-fold ở 375px
- Thumb-reachable zone: CTA chính phải nằm trong vùng 75% dưới màn hình mobile
- No pinch-to-zoom: viewport meta phải có `initial-scale=1` không bị override
- **CẤM TUYỆT ĐỐI Mobile Sticky Bar**: KHÔNG xây dựng, KHÔNG duy trì và KHÔNG khôi phục component `mobile-sticky-bar` (`sticky_footer_mobile.html`)

### WCAG 2.2 Color Contrast (Bắt buộc AA)

| Loại text | Contrast ratio tối thiểu |
|---|---|
| Text thường (< 18px / < 14px bold) | **4.5:1** |
| Text lớn (≥ 18px / ≥ 14px bold) | **3:1** |
| CTA buttons | AA tối thiểu |

- Kiểm tra: https://webaim.org/resources/contrastchecker/
- KHÔNG tuyên bố WCAG pass khi chưa chạy contrast check thực tế

---

## §6. SILENT FAILURE DETECTION

```bash
# Luôn kiểm tra exit code
npm run healthcheck; echo "Exit: $?"
# Exit 0 = PASS | Exit 1 = FAIL
```

**Diagnostic 1-liners:**
```bash
# Kiểm tra MIME type CSS
curl -I http://localhost:5000/style.css | grep content-type

# Kiểm tra server đang chạy
lsof -i :5000 | grep LISTEN

# Kiểm tra AEO content tĩnh
curl -s http://localhost:5000/ | grep -i "vinfast"

# Validate JSON-LD syntax
node -e "const fs=require('fs'); JSON.parse(fs.readFileSync('index.html','utf8').match(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/)[1]); console.log('JSON-LD OK')"
```

- KHÔNG interpret "không có error text" là thành công
- LUÔN print raw output trước khi đưa ra kết luận
- Nếu script crash/timeout → báo cáo lỗi script, KHÔNG báo cáo trang

---

## §7. OBSERVABILITY — Mọi response phải có

```
✅ Commands đã chạy: [liệt kê lệnh]
✅ Healthcheck output: [paste kết quả]
✅ File đã thay đổi: [clickable links file:///...]
✅ Pass/Fail status: [số lượng PASS/FAIL cụ thể]
```

Nếu thiếu bất kỳ mục nào → response chưa đủ tiêu chuẩn.
