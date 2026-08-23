const express = require('express');
const path = require('path');
const fs = require('fs');
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
app.get('/llms.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', dynamicStaticCache);
  res.sendFile(path.join(__dirname, 'llms.txt'));
});
app.get('/llms-full.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', dynamicStaticCache);
  res.sendFile(path.join(__dirname, 'llms-full.txt'));
});

const { generateShowroomHtml } = require('./build_landing.js');

let cachedShowroomHtml = null;
let cachedSellHtml = null;

// Real-time component assembly helper for / and /showroom with In-Memory Caching (Production Only)
function getShowroomHtml() {
  if (process.env.NODE_ENV === 'production' && cachedShowroomHtml) return cachedShowroomHtml;
  try {
    cachedShowroomHtml = generateShowroomHtml();
    return cachedShowroomHtml;
  } catch (err) {
    console.error('Error in getShowroomHtml:', err);
    return fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  }
}

// Real-time component assembly helper for /dinh-gia and /sell (Production Only)
function getSellHtml() {
  if (process.env.NODE_ENV === 'production' && cachedSellHtml) return cachedSellHtml;
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
