---
name: seo-schema-autogen
description: >
  Quy trình tự động tạo, đồng bộ và kiểm thử dữ liệu có cấu trúc Schema.org JSON-LD
  (Car, Vehicle, AutoDealer, Offer, FAQPage, AggregateRating, BreadcrumbList) cho các trang dòng xe VinFast.
  Tích hợp GEO (Generative Engine Optimization) 2026 cho Google AI Overview, ChatGPT, Perplexity.
  Kích hoạt khi: tạo trang xe mới, sửa bảng giá xe, hoặc tối ưu kết quả tìm kiếm AI (GEO/SEO/AEO).
---

# 🔍 SEO Schema AutoGen — Advanced Landing Page SEO Guide
# Version: 2.0 | Chuẩn: Google Search Central + Schema.org + E-E-A-T + GEO/AEO 2026
# Nguồn: WHATWG + W3C + Google Search Central + OWASP + schema.org spec

---

## 1. KHI NÀO KÍCH HOẠT

Bắt buộc chạy skill này khi:
- Thêm hoặc chỉnh sửa thông tin xe trong `cars_data.js` hoặc file HTML xe con.
- Cập nhật giá bán, khuyến mãi hoặc thông số kỹ thuật của xe.
- Chấm điểm SEO AI & GEO (Generative Engine Optimization).
- Kiểm tra tính tuân thủ dữ liệu có cấu trúc với Google Rich Results Test.
- Tối ưu khả năng được trích dẫn bởi Google AI Overview, ChatGPT, Perplexity.

---

## 2. MA TRẬN TIÊU CHUẨN SEO QUỐC TẾ (Standards Provenance)

| Tiêu chuẩn | Nguồn | Áp dụng cho |
|---|---|---|
| **E-E-A-T** | Google Search Quality Rater Guidelines | Nội dung, trust signals, author credibility |
| **Core Web Vitals** | Google Search Central (INP/LCP/CLS) | LCP <2.5s, INP <200ms, CLS ≤0.1 |
| **Schema.org** | schema.org/Vehicle, schema.org/AutoDealer | Structured data |
| **JSON-LD 1.1** | W3C JSON-LD Spec | Format dữ liệu có cấu trúc |
| **GEO/AEO 2026** | Stanford NLP + industry research | AI search citation optimization |
| **Google AI Overview** | Google Search Central 2025 | Answerability, entity clarity |
| **OWASP SEO** | OWASP Web Security | HTTPS, no clickjacking |
| **Mobile-First** | Google Search Central | Mobile indexing priority |

---

## 3. CÁC LOẠI SCHEMA JSON-LD BẮT BUỘC (Nâng Cao)

### 3.1 — Schema `Organization` + `AutoDealer` với `@id` Entity

```json
{
  "@context": "https://schema.org",
  "@type": ["AutoDealer", "LocalBusiness"],
  "@id": "https://auto28.com.vn/#organization",
  "name": "Auto 28 — Xe VinFast Lướt Uy Tín",
  "alternateName": "Auto28",
  "description": "Auto 28 chuyên mua bán xe VinFast lướt tại TP.HCM, Bình Dương, Đồng Nai. Bao test hãng 176 hạng mục, sang tên trọn gói trong ngày.",
  "image": "https://auto28.com.vn/assets/images/ui/auto28-showroom.webp",
  "logo": "https://auto28.com.vn/assets/images/ui/logo.webp",
  "telephone": "+84981234567",
  "priceRange": "$$",
  "currenciesAccepted": "VND",
  "paymentAccepted": "Tiền mặt, Chuyển khoản, Hỗ trợ vay ngân hàng",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Số 28, Đường Nguyễn Hữu Thọ",
    "addressLocality": "Quận 7",
    "addressRegion": "TP. Hồ Chí Minh",
    "postalCode": "700000",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "10.7285",
    "longitude": "106.7076"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "08:00",
      "closes": "20:00"
    }
  ],
  "url": "https://auto28.com.vn",
  "sameAs": [
    "https://www.facebook.com/auto28vn",
    "https://zalo.me/auto28"
  ],
  "areaServed": [
    {"@type": "City", "name": "TP. Hồ Chí Minh"},
    {"@type": "City", "name": "Bình Dương"},
    {"@type": "City", "name": "Đồng Nai"}
  ]
}
```

> **Tại sao `@id` quan trọng**: Theo GEO 2026, `@id` URI ổn định giúp AI engines nhận dạng entity Auto 28 như một **Knowledge Graph node** độc lập, tăng khả năng được Google AI Overview trích dẫn.

---

### 3.2 — Schema `Car` + `Offer` + `AggregateRating` (Nâng Cao)

```json
{
  "@context": "https://schema.org",
  "@type": "Car",
  "@id": "https://auto28.com.vn/xe/vinfast-vf8-lux-2023#vehicle",
  "name": "VinFast VF 8 Lux — 2023 | Xe Lướt Auto 28",
  "description": "VinFast VF 8 Lux 2023 xe lướt chính chủ, odo chuẩn, sơn zin, bao test hãng 176 hạng mục tại Auto 28 TP.HCM.",
  "image": [
    "https://auto28.com.vn/assets/images/cars/vf8-lux-2023-front.webp",
    "https://auto28.com.vn/assets/images/cars/vf8-lux-2023-interior.webp"
  ],
  "brand": {
    "@type": "Brand",
    "name": "VinFast"
  },
  "model": "VF 8 Lux",
  "vehicleModelDate": "2023",
  "bodyType": "SUV",
  "fuelType": "Electric",
  "driveWheelConfiguration": "AWD",
  "vehicleEngine": {
    "@type": "EngineSpecification",
    "engineType": "Electric Motor",
    "enginePower": {
      "@type": "QuantitativeValue",
      "value": "300",
      "unitCode": "BHP"
    }
  },
  "mileageFromOdometer": {
    "@type": "QuantitativeValue",
    "value": "12000",
    "unitCode": "KMT"
  },
  "numberOfDoors": 5,
  "vehicleSeatingCapacity": 7,
  "color": "Xanh Dương Đậm",
  "itemCondition": "https://schema.org/UsedCondition",
  "offers": {
    "@type": "Offer",
    "@id": "https://auto28.com.vn/xe/vinfast-vf8-lux-2023#offer",
    "priceCurrency": "VND",
    "price": "750000000",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "AutoDealer",
      "@id": "https://auto28.com.vn/#organization",
      "name": "Auto 28"
    },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": "VN",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 2
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

---

### 3.3 — Schema `FAQPage` (Tối ưu AI Search + Answer Engine)

> **GEO 2026 Rule**: FAQ phải trả lời trực tiếp, câu ngắn, không quá 150 từ/câu trả lời. AI engines ưu tiên "Direct Answer Blocks".

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Giá xe VinFast VF 8 lướt tại TP.HCM là bao nhiêu?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Giá xe VinFast VF 8 lướt tại Auto 28 TP.HCM từ 700 triệu đến 900 triệu tùy năm sản xuất và phiên bản. Xe đã qua kiểm tra 176 hạng mục hãng, bao test, sang tên trọn gói. Liên hệ 0981234567 để nhận báo giá lăn bánh chính xác."
      }
    },
    {
      "@type": "Question",
      "name": "Auto 28 có bao test hãng khi mua xe VinFast lướt không?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Có. Auto 28 bao test hãng toàn quốc, kiểm tra 176 hạng mục theo tiêu chuẩn VinFast. Xe không đạt chuẩn sẽ không bán. Khách hàng có thể đưa xe đến showroom VinFast gần nhất để kiểm tra trực tiếp trước khi cọc."
      }
    },
    {
      "@type": "Question",
      "name": "Thủ tục sang tên xe VinFast lướt mất bao lâu?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Thủ tục sang tên xe VinFast lướt tại TP.HCM thường hoàn tất trong 1–3 ngày làm việc. Auto 28 hỗ trợ sang tên trọn gói, khách hàng không cần tự đến cơ quan đăng ký."
      }
    },
    {
      "@type": "Question",
      "name": "Auto 28 có hỗ trợ vay mua xe VinFast lướt không?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Có. Auto 28 hỗ trợ hồ sơ vay ngân hàng lên đến 80% giá trị xe, lãi suất ưu đãi từ các ngân hàng đối tác. Thời gian phê duyệt khoản vay từ 24–48 giờ."
      }
    }
  ]
}
```

---

### 3.4 — Schema `BreadcrumbList` (Cấu trúc điều hướng cho AI)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Trang Chủ",
      "item": "https://auto28.com.vn/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Xe VinFast Lướt",
      "item": "https://auto28.com.vn/xe-vinfast-luot/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "VinFast VF 8 Lướt",
      "item": "https://auto28.com.vn/xe/vinfast-vf8-lux-2023"
    }
  ]
}
```

---

### 3.5 — Schema `HowTo` (Quy trình mua xe — AI Featured Snippet)

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cách mua xe VinFast lướt an toàn tại TP.HCM",
  "description": "Quy trình 5 bước mua xe VinFast lướt uy tín, bảo đảm tránh rủi ro.",
  "totalTime": "PT2H",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Chọn dòng xe và ngân sách",
      "text": "Xác định nhu cầu và ngân sách (VF 3: từ 300tr, VF 5: từ 450tr, VF 8: từ 700tr, VF 9: từ 1.2 tỷ)."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Liên hệ Auto 28 xem xe trực tiếp",
      "text": "Gọi 0981234567 hoặc nhắn Zalo để đặt lịch xem xe tại showroom. Không phí xem xe."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Kiểm tra kỹ thuật — Bao test hãng",
      "text": "Auto 28 đưa xe đến showroom VinFast để kiểm tra 176 hạng mục theo tiêu chuẩn hãng. Chi phí Auto 28 chịu."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Thương lượng giá và chốt cọc",
      "text": "Thỏa thuận giá, cọc 5 triệu giữ xe 48 giờ, hoàn 100% nếu không mua sau khi kiểm tra."
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Sang tên và bàn giao xe",
      "text": "Auto 28 lo toàn bộ thủ tục sang tên, giao xe tận nơi trong 24 giờ sau khi hoàn tất thanh toán."
    }
  ]
}
```

---

## 4. SEO KỸ THUẬT NÂNG CAO (Technical SEO Advanced)

### 4.1 — E-E-A-T Signals (Bắt buộc từ 2026)

```html
<!-- Trust Signals bắt buộc trong <head> -->
<meta name="author" content="Auto 28 — Đội ngũ Chuyên gia Xe VinFast">
<link rel="author" href="https://auto28.com.vn/about">

<!-- Schema WebSite với SearchAction -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://auto28.com.vn/#website",
  "url": "https://auto28.com.vn",
  "name": "Auto 28 — Xe VinFast Lướt",
  "publisher": {"@id": "https://auto28.com.vn/#organization"}
}
</script>
```

### 4.2 — GEO/AEO Rules (AI Search Citation Optimization)

> **Nguyên tắc GEO 2026**: AI engines (Google AI Overview, ChatGPT, Perplexity) ưu tiên:

```
✅ Direct Answer trong 150 từ đầu tiên
✅ Declarative statements (không "có vẻ", "có thể")
✅ Số liệu cụ thể (giá, km, % lãi suất)
✅ Entity @id URI ổn định
✅ FAQ schema với câu trả lời ngắn gọn (<200 từ)
✅ Nội dung khớp 100% giữa visible HTML và JSON-LD
✅ Heading H1→H2→H3 không skip level

❌ Content chỉ render bằng JavaScript (AI bot không đọc được)
❌ Giá trong JSON-LD ≠ giá hiển thị → Schema Drift penalty
❌ Generic content (không có số liệu, không có địa điểm cụ thể)
❌ FAQ câu trả lời >300 từ (AI sẽ không trích dẫn toàn bộ)
```

### 4.3 — Meta Tags Nâng Cao

```html
<!-- Cơ bản bắt buộc -->
<title>Xe VinFast VF 8 Lướt Giá Tốt TP.HCM | Auto 28</title>
<meta name="description" content="Xe VinFast VF 8 lướt 2023, odo chuẩn, sơn zin, bao test hãng tại Auto 28 TP.HCM. Giá từ 700 triệu. Sang tên trong ngày. Gọi: 0981234567.">

<!-- Open Graph (Facebook, Zalo) -->
<meta property="og:title" content="Xe VinFast VF 8 Lướt — Auto 28 TP.HCM">
<meta property="og:description" content="Odo chuẩn, sơn zin, bao test hãng 176 hạng mục. Giá từ 700 triệu.">
<meta property="og:image" content="https://auto28.com.vn/assets/images/cars/vf8-og.webp">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:type" content="product">
<meta property="og:url" content="https://auto28.com.vn/xe/vinfast-vf8-lux-2023">
<meta property="og:locale" content="vi_VN">
<meta property="og:site_name" content="Auto 28">

<!-- Twitter/X Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Xe VinFast VF 8 Lướt — Auto 28">
<meta name="twitter:description" content="Bao test hãng, sang tên trong ngày, giao xe 24h.">

<!-- Canonical (tránh duplicate content) -->
<link rel="canonical" href="https://auto28.com.vn/xe/vinfast-vf8-lux-2023">

<!-- Mobile -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#0f172a">

<!-- Geo tags (Local SEO Vietnam) -->
<meta name="geo.region" content="VN-SG">
<meta name="geo.placename" content="TP. Hồ Chí Minh">
<meta name="geo.position" content="10.7285;106.7076">
<meta name="ICBM" content="10.7285, 106.7076">
```

### 4.4 — Robots & Crawlability

```
# /public/robots.txt — Chuẩn Google 2026
User-agent: *
Allow: /
Disallow: /scratch/
Disallow: /.agents/
Disallow: /node_modules/

# Cho phép AI bots (GEO critical)
User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Googlebot
Allow: /

Sitemap: https://auto28.com.vn/sitemap.xml
```

### 4.5 — Core Web Vitals Targets (Auto 28 Chuẩn Cứng)

| Metric | Target | Google "Good" | Tác động |
|---|---|---|---|
| **LCP** | < 2.0s | < 2.5s | Ranking signal + GEO crawl |
| **INP** | < 150ms | < 200ms | UX + Conversion |
| **CLS** | < 0.05 | < 0.1 | UX stability |
| **TTFB** | < 600ms | < 800ms | Server performance |
| **FCP** | < 1.5s | < 1.8s | Perceived speed |

---

## 5. CHECKLIST SCHEMA TRƯỚC KHI DEPLOY

```
━━━ SCHEMA VALIDATION CHECKLIST ━━━
[ ] JSON-LD syntax hợp lệ (không lỗi dấu phẩy, ngoặc)?
[ ] @id URI ổn định, không thay đổi theo session?
[ ] price trong JSON-LD = price trong HTML visible?
[ ] image URL trả về 200 OK (không 404)?
[ ] telephone format chuẩn: "+84..." ?
[ ] addressCountry = "VN" ?
[ ] FAQPage: câu trả lời < 200 từ mỗi câu?
[ ] AggregateRating: reviewCount > 0 và review hiển thị trên trang?
[ ] BreadcrumbList: URL khớp với URL thực tế?
[ ] Validate tại: https://validator.schema.org/ ?
[ ] Test tại: https://search.google.com/test/rich-results ?
[ ] Canonical tag đúng URL?
[ ] robots.txt cho phép AI bots (OAI-SearchBot, PerplexityBot)?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 6. TIÊU CHUẨN KIỂM THỬ (Nâng Cao)

1. **JSON Syntax Pass**: Mã JSON-LD không có lỗi — dùng [jsonlint.com](https://jsonlint.com/).
2. **Schema Validator Pass**: Không có Error tại [validator.schema.org](https://validator.schema.org/).
3. **Rich Results Test Pass**: Không có Error đỏ tại [Google Rich Results Test](https://search.google.com/test/rich-results).
4. **Dynamic Sync Pass**: `price` trong JSON-LD khớp 100% với `cars_data.js` và HTML visible.
5. **AI Crawl Pass**: `curl -A "OAI-SearchBot" http://localhost:5000/ | grep -i "vinfast"` → có output.
6. **Static Fallback Pass**: Mọi dữ liệu xe phải có trong HTML tĩnh, không chỉ render qua JS.
7. **CWV Pass**: Lighthouse score LCP < 2.5s, CLS < 0.1, INP < 200ms.
8. **E-E-A-T Pass**: Trang có NAP (Name, Address, Phone) nhất quán với schema.

---

## 7. SCHEMA DRIFT DETECTION (Phát hiện mâu thuẫn Schema/HTML)

```bash
# Script kiểm tra nhanh schema drift
# Giá trong HTML visible
grep -o 'data-price="[0-9]*"' index.html

# Giá trong JSON-LD
grep -o '"price":"[0-9]*"' index.html

# Phải khớp nhau — nếu không = SCHEMA DRIFT = Google penalty
```

---

## 8. REFERENCES

- [Google Search Central — Structured Data](https://developers.google.com/search/docs/appearance/structured-data)
- [Schema.org — Vehicle](https://schema.org/Vehicle)
- [Schema.org — AutoDealer](https://schema.org/AutoDealer)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Validator](https://validator.schema.org/)
- [Google AI Overview — How to appear](https://developers.google.com/search/docs/appearance/ai-overviews)
- [E-E-A-T Guidelines](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [GEO Research — Princeton/Georgia Tech 2024](https://arxiv.org/abs/2311.09735)
