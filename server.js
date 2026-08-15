const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable gzip compression for better performance (CWV LCP optimization)
app.use(compression());

// Serve assets and static files with caching (stale-while-revalidate standard)
const immutableCache = 'public, max-age=31536000, stale-while-revalidate=86400, immutable';
const dynamicStaticCache = 'public, max-age=86400, stale-while-revalidate=604800';

app.use('/assets', express.static(path.join(__dirname, 'assets'), { maxAge: immutableCache }));
app.use('/modules', express.static(path.join(__dirname, 'modules'), { maxAge: immutableCache }));

// Serve core static files with proper caching headers
app.get('/style.css', (req, res) => {
  res.setHeader('Cache-Control', dynamicStaticCache);
  res.sendFile(path.join(__dirname, 'style.css'));
});
app.get('/style_guide.css', (req, res) => {
  res.setHeader('Cache-Control', dynamicStaticCache);
  res.sendFile(path.join(__dirname, 'style_guide.css'));
});
app.get('/main.js', (req, res) => {
  res.setHeader('Cache-Control', dynamicStaticCache);
  res.sendFile(path.join(__dirname, 'main.js'));
});
app.get('/cars_data.js', (req, res) => {
  res.setHeader('Cache-Control', dynamicStaticCache);
  res.sendFile(path.join(__dirname, 'cars_data.js'));
});
app.get('/sw.js', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, must-revalidate');
  res.sendFile(path.join(__dirname, 'sw.js'));
});
app.get('/sitemap.xml', (req, res) => res.sendFile(path.join(__dirname, 'sitemap.xml')));
app.get('/robots.txt', (req, res) => res.sendFile(path.join(__dirname, 'robots.txt')));

const fs = require('fs');

let cachedShowroomHtml = null;
let cachedSellHtml = null;

// Real-time component assembly helper for / and /showroom with In-Memory Caching
function getShowroomHtml() {
  if (cachedShowroomHtml) return cachedShowroomHtml;
  try {
    const navHtml = fs.readFileSync(path.join(__dirname, 'src/components/nav.html'), 'utf8');
    const heroShowroomHtml = fs.readFileSync(path.join(__dirname, 'src/components/hero_showroom.html'), 'utf8');
    const commitmentsHtml = fs.readFileSync(path.join(__dirname, 'src/components/commitments.html'), 'utf8');
    const socialProofHtml = fs.readFileSync(path.join(__dirname, 'src/components/social_proof.html'), 'utf8');
    const productGridHtml = fs.readFileSync(path.join(__dirname, 'src/components/product_grid.html'), 'utf8');
    const advantagesHtml = fs.readFileSync(path.join(__dirname, 'src/components/advantages.html'), 'utf8');
    const faqAccordionHtml = fs.readFileSync(path.join(__dirname, 'src/components/faq_accordion.html'), 'utf8');
    const locationMapHtml = fs.readFileSync(path.join(__dirname, 'src/components/location_map.html'), 'utf8');
    const footerHtml = fs.readFileSync(path.join(__dirname, 'src/components/footer.html'), 'utf8');
    const leadModalHtml = fs.readFileSync(path.join(__dirname, 'src/components/lead_modal.html'), 'utf8');
    const exitModalHtml = fs.readFileSync(path.join(__dirname, 'src/components/exit_modal.html'), 'utf8');

    cachedShowroomHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auto 28 - Mua Bán Xe VinFast Lướt Uy Tín Tại TP.HCM & Lân Cận</title>
    <meta name="description" content="Auto 28 là hệ thống kinh doanh xe VinFast lướt uy tín hàng đầu tại khu vực TP. Hồ Chí Minh và các tỉnh lân cận (Bình Dương, Đồng Nai, Long An...). Định giá AI nhanh chóng, check hãng 176 hạng mục, bàn giao tận nhà.">
    <link rel="canonical" href="https://www.auto28.com.vn">
    
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
    
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-PPKRWBPC');</script>
    <!-- End Google Tag Manager -->
    
    <link class="favicon-tag" rel="icon" type="image/jpeg" href="https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781182289/logos/whznez2lfw4qnu2tsd9g.jpg">
</head>
<body class="neural-expressive-body">
    <div class="ambient-canvas-base">
        <div class="ambient-light light-1"></div>
        <div class="ambient-light light-2"></div>
        <div class="ambient-light light-3"></div>
    </div>

    ${navHtml}

    <main>
        ${heroShowroomHtml}
        ${commitmentsHtml}
        ${socialProofHtml}
        ${productGridHtml}
        ${advantagesHtml}
        ${faqAccordionHtml}
        ${locationMapHtml}
    </main>

    ${footerHtml}
    ${leadModalHtml}
    ${exitModalHtml}

    <script src="./cars_data.js?v=2.1.0" defer></script>
    <script src="./modules/hero-slideshow.js?v=2.1.0" defer></script>
    <script src="./modules/ai-valuation.js?v=2.1.0" defer></script>
    <script src="./modules/car-filter.js?v=2.1.0" defer></script>
    <script src="./modules/ui-effects.js?v=2.1.0" defer></script>
    <script src="./modules/car-modal.js?v=2.1.0" defer></script>
    <script type="module" src="./main.js?v=2.1.0"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const dateBadge = document.getElementById('promo-date-badge');
            if (dateBadge) {
                const now = new Date();
                const dateStr = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
                dateBadge.textContent = 'Hôm nay (' + dateStr + '): Còn 3 suất ưu đãi trả góp 70% + Tặng 1 năm bảo dưỡng';
            }
            const exitModal = document.getElementById('showroom-exit-modal');
            const closeBtn = document.getElementById('close-showroom-exit-modal');
            const exitForm = document.getElementById('showroom-exit-form');
            let hasShownExit = false;
            const showExitModal = () => {
                if (hasShownExit || localStorage.getItem('auto28_showroom_exit_dismissed')) return;
                hasShownExit = true;
                if (exitModal) exitModal.style.display = 'flex';
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({'event': 'cro_showroom_exit_trigger'});
            };
            document.addEventListener('mouseleave', (e) => {
                if (e.clientY <= 0) showExitModal();
            });
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    if (exitModal) exitModal.style.display = 'none';
                    try { localStorage.setItem('auto28_showroom_exit_dismissed', '1'); } catch (e) {}
                });
            }
            if (exitForm) {
                exitForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const phone = document.getElementById('showroom-exit-phone')?.value || '';
                    const cleanPhone = phone.replace(/\\D/g, '');
                    if (!cleanPhone || cleanPhone.length < 10) {
                        alert('Vui lòng nhập chính xác số điện thoại (10 chữ số)!');
                        return;
                    }
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        'event': 'lead_form_submitted',
                        'form_id': 'showroom-exit-form',
                        'form_type': 'showroom_exit_lead',
                        'phone': cleanPhone,
                        'timestamp': new Date().toISOString()
                    });
                    window.dataLayer.push({'event': 'form_lead_success', 'cro_event': 'showroom_exit_lead', 'phone': cleanPhone});
                    alert('🎉 Cảm ơn bạn! Auto28 đã ghi nhận SĐT ' + phone + ' để gửi bảng giá lăn bánh ưu đãi và Voucher +5 Triệu qua Zalo!');
                    if (exitModal) exitModal.style.display = 'none';
                    try { localStorage.setItem('auto28_showroom_exit_dismissed', '1'); } catch (e) {}
                });
            }
        });
    </script>
</body>
</html>`;
    return cachedShowroomHtml;
  } catch (err) {
    return fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  }
}

// Real-time component assembly helper for /dinh-gia and /sell
function getSellHtml() {
  if (cachedSellHtml) return cachedSellHtml;
  try {
    const navHtml = fs.readFileSync(path.join(__dirname, 'src/components/nav.html'), 'utf8');
    const heroSellHtml = fs.readFileSync(path.join(__dirname, 'src/components/sell/hero_sell.html'), 'utf8');
    const valuesHtml = fs.readFileSync(path.join(__dirname, 'src/components/sell/values.html'), 'utf8');
    const socialProofHtml = fs.readFileSync(path.join(__dirname, 'src/components/social_proof.html'), 'utf8');
    const processSellHtml = fs.readFileSync(path.join(__dirname, 'src/components/sell/process_sell.html'), 'utf8');
    const faqSellHtml = fs.readFileSync(path.join(__dirname, 'src/components/sell/faq_sell.html'), 'utf8');
    const bottomCtaHtml = fs.readFileSync(path.join(__dirname, 'src/components/sell/bottom_cta.html'), 'utf8');
    const locationMapHtml = fs.readFileSync(path.join(__dirname, 'src/components/location_map.html'), 'utf8');
    const footerHtml = fs.readFileSync(path.join(__dirname, 'src/components/footer.html'), 'utf8');

    cachedSellHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thu Mua Xe VinFast Lướt Giá Cao Tại TP.HCM & Lân Cận | Auto 28</title>
    <meta name="description" content="Auto 28 chuyên thu mua xe VinFast lướt tận nhà giá cao nhất tại khu vực TP. Hồ Chí Minh và các tỉnh lân cận (Bình Dương, Đồng Nai, Long An...). Định giá AI nhanh, nhận tiền trong 30 phút.">
    <link rel="canonical" href="https://www.auto28.com.vn/dinh-gia">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://res.cloudinary.com" crossorigin>
    <link rel="dns-prefetch" href="https://res.cloudinary.com">
    <link rel="dns-prefetch" href="https://connect.facebook.net">
    <link rel="dns-prefetch" href="https://analytics.tiktok.com">
    <link rel="modulepreload" href="./main.js?v=2.1.0">
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./style.css">
    <link rel="icon" type="image/jpeg" href="./assets/logos/logo.jpg">
</head>
<body class="neural-expressive-body">
    <div class="ambient-canvas-base">
        <div class="ambient-light light-1"></div>
        <div class="ambient-light light-2"></div>
        <div class="ambient-light light-3"></div>
    </div>

    ${navHtml}

    <main>
        ${heroSellHtml}
        ${valuesHtml}
        ${socialProofHtml}
        ${processSellHtml}
        ${faqSellHtml}
        ${bottomCtaHtml}
        ${locationMapHtml}
    </main>

    ${footerHtml}

    <script src="./cars_data.js?v=2.1.0" defer></script>
    <script src="./modules/hero-slideshow.js?v=2.1.0" defer></script>
    <script src="./modules/ai-valuation.js?v=2.1.0" defer></script>
    <script src="./modules/car-filter.js?v=2.1.0" defer></script>
    <script src="./modules/ui-effects.js?v=2.1.0" defer></script>
    <script src="./modules/car-modal.js?v=2.1.0" defer></script>
    <script type="module" src="./main.js?v=2.1.0"></script>
</body>
</html>`;
    return cachedSellHtml;
  } catch (err) {
    return fs.readFileSync(path.join(__dirname, 'sell.html'), 'utf8');
  }
}

// Pretty URLs mapping
app.get('/', (req, res) => res.send(getShowroomHtml()));
app.get('/index.html', (req, res) => res.send(getShowroomHtml()));
app.get('/showroom', (req, res) => res.send(getShowroomHtml()));
app.get('/dinh-gia', (req, res) => res.send(getSellHtml()));
app.get('/dinh-gia-ban-xe', (req, res) => res.send(getSellHtml()));
app.get('/sell', (req, res) => res.send(getSellHtml()));
app.get('/huong-dan', (req, res) => res.sendFile(path.join(__dirname, 'huong-dan-phap-ly.html')));
app.get('/huong-dan-phap-ly', (req, res) => res.sendFile(path.join(__dirname, 'huong-dan-phap-ly.html')));
app.get('/huong-dan-mua-xe-dien', (req, res) => res.sendFile(path.join(__dirname, 'huong-dan-mua-xe-dien.html')));
app.get('/studio', (req, res) => res.sendFile(path.join(__dirname, 'auto28-studio.html')));
app.get('/auto28-studio', (req, res) => res.sendFile(path.join(__dirname, 'auto28-studio.html')));

// Dynamic car pages routing -> Redirect to main index inventory filter
const carsList = ['vf3', 'vf5', 'vf6', 'vf7', 'vf8', 'vf9', 'vfe34', 'lux-a', 'lux-sa', 'fadil'];
carsList.forEach(car => {
  app.get(`/${car}`, (req, res) => res.redirect(`/index.html?filter=${car}#product-grid-section`));
});

// Fallback all other static files with optimized Cache-Control headers
app.use(express.static(__dirname, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    } else if (filePath.endsWith('.css') || filePath.endsWith('.js')) {
      res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
    } else if (filePath.match(/\.(jpg|jpeg|png|gif|svg|webp|avif|woff2)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, stale-while-revalidate=86400, immutable');
    }
  }
}));

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`=========================================`);
  console.log(`🚀 Landing Page server running at:`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`=========================================`);
});
