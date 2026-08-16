const fs = require('fs');
const path = require('path');

function buildLandingPage() {
    console.log("=========================================");
    console.log("Building Auto 28 Landing Page (index.html)...");
    console.log("=========================================");

    const rootDir = __dirname;
    const compDir = path.join(rootDir, 'src', 'components');

    // Read component partials
    const navHtml = fs.readFileSync(path.join(compDir, 'nav.html'), 'utf8');
    const heroHtml = fs.readFileSync(path.join(compDir, 'hero_showroom.html'), 'utf8');
    const commitmentsHtml = fs.readFileSync(path.join(compDir, 'commitments.html'), 'utf8');
    const socialProofHtml = fs.readFileSync(path.join(compDir, 'social_proof.html'), 'utf8');
    const productGridHtml = fs.readFileSync(path.join(compDir, 'product_grid.html'), 'utf8');
    const processHtml = fs.readFileSync(path.join(compDir, 'process.html'), 'utf8');
    const faqAccordionHtml = fs.readFileSync(path.join(compDir, 'faq_accordion.html'), 'utf8');
    const locationMapHtml = fs.readFileSync(path.join(compDir, 'location_map.html'), 'utf8');
    const leadModalHtml = fs.readFileSync(path.join(compDir, 'lead_modal.html'), 'utf8');
    const footerHtml = fs.readFileSync(path.join(compDir, 'footer.html'), 'utf8');

    const indexHtmlContent = `<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auto 28 - Mua Bán Xe VinFast Lướt Uy Tín Tại TP.HCM & Lân Cận</title>
    <meta name="description"
        content="Auto 28 là hệ thống kinh doanh xe VinFast lướt uy tín hàng đầu tại khu vực TP. Hồ Chí Minh và các tỉnh lân cận (Bình Dương, Đồng Nai, Long An...). Định giá AI nhanh chóng, check hãng 176 hạng mục, bàn giao tận nhà.">
    
    <!-- 🌐 CANONICAL & OPEN GRAPH META (SEO 2026) -->
    <link rel="canonical" href="https://www.auto28.com.vn/">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.auto28.com.vn/">
    <meta property="og:title" content="Auto 28 - Mua Bán Xe VinFast Lướt Uy Tín Tại TP.HCM & Lân Cận">
    <meta property="og:description" content="Auto 28 là hệ thống kinh doanh xe VinFast lướt uy tín hàng đầu tại khu vực TP. Hồ Chí Minh và các tỉnh lân cận (Bình Dương, Đồng Nai, Long An...). Định giá AI nhanh chóng, check hãng 176 hạng mục, bàn giao tận nhà.">
    <meta property="og:image" content="https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781709568/inventory/zd6iu9qtpf0jair1jhyx.jpg">
    
    <!-- ⚡ RESOURCE HINTS (CWV 2026) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://res.cloudinary.com" crossorigin>
    <link rel="dns-prefetch" href="https://res.cloudinary.com">
    <link rel="dns-prefetch" href="https://connect.facebook.net">
    <link rel="dns-prefetch" href="https://analytics.tiktok.com">
    <link rel="preload" as="script" href="./cars_data.js?v=2.1.0">
    <link rel="preload" as="script" href="./modules/car-modal.js?v=2.1.0">
    <link rel="modulepreload" href="./main.js?v=2.1.0">
    
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;700;800;900&display=swap">
    <link rel="stylesheet" href="./style.css">
    
    <!-- Google Tag Manager (Optimized non-blocking position) -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-PPKRWBPC');</script>
    <!-- End Google Tag Manager -->
    
    <!-- 🌐 FAVICON -->
    <link rel="icon" type="image/jpeg" href="./assets/logos/logo.jpg">
    
    <!-- 📊 STRUCTURED DATA (SEO & AEO 2026) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "AutoDealer",
          "@id": "https://www.auto28.com.vn/#autodealer",
          "name": "Auto 28 - Hệ Thống Xe VinFast Lướt Uy Tín TP.HCM & Lân Cận",
          "alternateName": "Ô Tô Lướt Sài Gòn Auto 28",
          "description": "Auto 28 là hệ thống chuyên mua bán, ký gửi và định giá xe VinFast lướt uy tín hàng đầu tại TP.HCM và các tỉnh lân cận (Bình Dương, Đồng Nai, Long An...). Định giá AI, check hãng 176 hạng mục, bảo hành pin và giao xe tận nhà.",
          "telephone": "0888813838",
          "url": "https://www.auto28.com.vn",
          "logo": "https://www.auto28.com.vn/assets/logos/logo.jpg",
          "image": "https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781709568/inventory/zd6iu9qtpf0jair1jhyx.jpg",
          "priceRange": "$$",
          "slogan": "Minh Bạch Từng Chi Tiết - Đồng Hành Cùng Xe Điện",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "8F Đường Trịnh Hoài Đức",
            "addressLocality": "Phường Hiệp Phú",
            "addressRegion": "TP. Thủ Đức, TP. Hồ Chí Minh",
            "postalCode": "700000",
            "addressCountry": "VN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "10.8495",
            "longitude": "106.7785"
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "08:00",
              "closes": "19:30"
            }
          ],
          "areaServed": [
            { "@type": "AdministrativeArea", "name": "Thành phố Hồ Chí Minh" },
            { "@type": "AdministrativeArea", "name": "Bình Dương" },
            { "@type": "AdministrativeArea", "name": "Đồng Nai" },
            { "@type": "AdministrativeArea", "name": "Long An" },
            { "@type": "AdministrativeArea", "name": "Tây Ninh" },
            { "@type": "AdministrativeArea", "name": "Bà Rịa - Vũng Tàu" },
            { "@type": "Country", "name": "Việt Nam" }
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://www.auto28.com.vn/#website",
          "url": "https://www.auto28.com.vn",
          "name": "Auto 28 - Mua Bán Xe VinFast Lướt",
          "description": "Nền tảng mua bán, định giá và kiểm định xe VinFast lướt chất lượng cao.",
          "publisher": { "@id": "https://www.auto28.com.vn/#autodealer" },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.auto28.com.vn/?filter={search_term_string}#product-grid-section",
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.auto28.com.vn/#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Trang Chủ",
              "item": "https://www.auto28.com.vn/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Kho Xe VinFast Lướt",
              "item": "https://www.auto28.com.vn/#product-grid-section"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.auto28.com.vn/#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Thủ tục chuyển nhượng hợp đồng pin xe điện có phức tạp không?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Hoàn toàn không phức tạp. Auto 28 phối hợp chặt chẽ trực tiếp với VinFast hỗ trợ trọn gói thủ tục sang tên hợp đồng thuê pin chính chủ trong 24 giờ. Khách hàng chỉ cần ký giấy ủy quyền và nhận bàn giao xe."
              }
            },
            {
              "@type": "Question",
              "name": "Xe đang vay ngân hàng / trả góp có giao dịch được không?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Hoàn toàn được! Auto 28 hỗ trợ nguồn vốn tất toán toàn bộ số tiền vay ngân hàng ngay trong ngày, giải phóng giấy tờ xe bản gốc để tiến hành mua bán đúng luật pháp Việt Nam."
              }
            },
            {
              "@type": "Question",
              "name": "Quy trình kiểm định 176 hạng mục gồm những gì?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Kiểm định toàn diện 4 trụ cột: (1) Thân vỏ & Khung gầm 52 mục không đâm đụng, (2) Pin & Hệ thống điện 44 mục đo SOH thực tế từ BMS, (3) Động cơ điện & Truyền động 42 mục, (4) Quét phần mềm OBD-II & ADAS 38 mục."
              }
            },
            {
              "@type": "Question",
              "name": "Mức định giá AI của Auto 28 được cập nhật thế nào?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Thuật toán định giá của Auto 28 quét dữ liệu giao dịch thực tế từ các sàn xe cũ trên toàn quốc theo thời gian thực để đưa ra khoảng giá mua/bán sát nhất với giá trị thực tế của xe."
              }
            }
          ]
        },
        {
          "@type": "ItemList",
          "@id": "https://www.auto28.com.vn/#inventory",
          "name": "Danh Mục Xe VinFast Lướt Tuyển Chọn Tại Auto 28",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@type": "Car",
                "name": "VinFast VF 3",
                "brand": { "@type": "Brand", "name": "VinFast" },
                "model": "VF 3",
                "vehicleEngine": { "@type": "EngineSpecification", "engineType": "Electric" },
                "fuelType": "Electric",
                "itemCondition": "https://schema.org/UsedCondition",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "VND",
                  "price": "240000000",
                  "itemCondition": "https://schema.org/UsedCondition",
                  "availability": "https://schema.org/InStock",
                  "seller": { "@id": "https://www.auto28.com.vn/#autodealer" }
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@type": "Car",
                "name": "VinFast VF 5 Plus",
                "brand": { "@type": "Brand", "name": "VinFast" },
                "model": "VF 5 Plus",
                "vehicleEngine": { "@type": "EngineSpecification", "engineType": "Electric" },
                "fuelType": "Electric",
                "itemCondition": "https://schema.org/UsedCondition",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "VND",
                  "price": "420000000",
                  "itemCondition": "https://schema.org/UsedCondition",
                  "availability": "https://schema.org/InStock",
                  "seller": { "@id": "https://www.auto28.com.vn/#autodealer" }
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 3,
              "item": {
                "@type": "Car",
                "name": "VinFast VF 6 Plus",
                "brand": { "@type": "Brand", "name": "VinFast" },
                "model": "VF 6 Plus",
                "vehicleEngine": { "@type": "EngineSpecification", "engineType": "Electric" },
                "fuelType": "Electric",
                "itemCondition": "https://schema.org/UsedCondition",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "VND",
                  "price": "630000000",
                  "itemCondition": "https://schema.org/UsedCondition",
                  "availability": "https://schema.org/InStock",
                  "seller": { "@id": "https://www.auto28.com.vn/#autodealer" }
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 4,
              "item": {
                "@type": "Car",
                "name": "VinFast VF 7 Plus",
                "brand": { "@type": "Brand", "name": "VinFast" },
                "model": "VF 7 Plus",
                "vehicleEngine": { "@type": "EngineSpecification", "engineType": "Electric" },
                "fuelType": "Electric",
                "itemCondition": "https://schema.org/UsedCondition",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "VND",
                  "price": "790000000",
                  "itemCondition": "https://schema.org/UsedCondition",
                  "availability": "https://schema.org/InStock",
                  "seller": { "@id": "https://www.auto28.com.vn/#autodealer" }
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 5,
              "item": {
                "@type": "Car",
                "name": "VinFast VF e34",
                "brand": { "@type": "Brand", "name": "VinFast" },
                "model": "VF e34",
                "vehicleEngine": { "@type": "EngineSpecification", "engineType": "Electric" },
                "fuelType": "Electric",
                "itemCondition": "https://schema.org/UsedCondition",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "VND",
                  "price": "440000000",
                  "itemCondition": "https://schema.org/UsedCondition",
                  "availability": "https://schema.org/InStock",
                  "seller": { "@id": "https://www.auto28.com.vn/#autodealer" }
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 6,
              "item": {
                "@type": "Car",
                "name": "VinFast VF 8 Eco / Plus",
                "brand": { "@type": "Brand", "name": "VinFast" },
                "model": "VF 8",
                "vehicleEngine": { "@type": "EngineSpecification", "engineType": "Electric" },
                "fuelType": "Electric",
                "itemCondition": "https://schema.org/UsedCondition",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "VND",
                  "price": "780000000",
                  "itemCondition": "https://schema.org/UsedCondition",
                  "availability": "https://schema.org/InStock",
                  "seller": { "@id": "https://www.auto28.com.vn/#autodealer" }
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 7,
              "item": {
                "@type": "Car",
                "name": "VinFast VF 9 Plus",
                "brand": { "@type": "Brand", "name": "VinFast" },
                "model": "VF 9",
                "vehicleEngine": { "@type": "EngineSpecification", "engineType": "Electric" },
                "fuelType": "Electric",
                "itemCondition": "https://schema.org/UsedCondition",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "VND",
                  "price": "1150000000",
                  "itemCondition": "https://schema.org/UsedCondition",
                  "availability": "https://schema.org/InStock",
                  "seller": { "@id": "https://www.auto28.com.vn/#autodealer" }
                }
              }
            }
          ]
        }
      ]
    }
    </script>
    <!-- ⚡ NON-BLOCKING THIRD-PARTY TRACKING (CWV 2026 TBT OPTIMIZED) -->
    <script>
        function loadThirdPartyPixels() {
            // Facebook Pixel Code
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '537471081061777');
            fbq('track', 'PageView');

            // TikTok Pixel Code
            !function (w, d, t) {
                w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || []; ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"], ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } }; for (var i = 0; i < ttq.methods.length; i++)ttq.setAndDefer(ttq, ttq.methods[i]); ttq.instance = function (t) {
                    for (
                        var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)ttq.setAndDefer(e, ttq.methods[n]); return e;
                };
                ttq.load('D802OM3C77UEKU3Q3HPG');
                ttq.page();
            }(window, document, 'ttq');
        }

        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(loadThirdPartyPixels, { timeout: 2000 });
        } else {
            window.addEventListener('DOMContentLoaded', loadThirdPartyPixels, { passive: true });
        }
    </script>
    <!-- Google tag được quản lý tập trung bởi GTM-PPKRWBPC -->
    <!-- GA4 (G-PM7K9CB73D) và Google Ads (AW-18153153954) cấu hình trong GTM Dashboard -->
</head>

<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PPKRWBPC"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <!-- Facebook Pixel Code (noscript) -->
    <noscript><img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=537471081061777&ev=PageView&noscript=1" /></noscript>

    <!-- 🔮 CANVAS NỀN NGỌC THẠCH SINH HỌC DI CHUYỂN NGẦM (AMBINET CANVAS) -->
    <div class="ambient-canvas-base">
        <div class="ambient-light light-1"></div>
        <div class="ambient-light light-2"></div>
        <div class="ambient-light light-3"></div>
    </div>

${navHtml}

${heroHtml}

${commitmentsHtml}

${socialProofHtml}

${productGridHtml}

${processHtml}

${faqAccordionHtml}

${locationMapHtml}

${leadModalHtml}

${footerHtml}

    <script src="./cars_data.js?v=2.1.0" defer></script>
    <script src="./modules/hero-slideshow.js?v=2.1.0" defer></script>
    <script src="./modules/ai-valuation.js?v=2.1.0" defer></script>
    <script src="./modules/car-filter.js?v=2.1.0" defer></script>
    <script src="./modules/ui-effects.js?v=2.1.0" defer></script>
    <script src="./modules/car-modal.js?v=2.1.0" defer></script>
    <script type="module" src="./main.js?v=2.1.0"></script>
</body>

</html>
`;

    fs.writeFileSync(path.join(rootDir, 'index.html'), indexHtmlContent, 'utf8');
    console.log("✅ index.html assembled successfully from src/components/*.html!");
}

buildLandingPage();
