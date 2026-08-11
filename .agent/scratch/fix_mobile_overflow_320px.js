const fs = require('fs');
const path = require('path');

// 1. Cập nhật guide-ev.html: Đổi tất cả minmax(Xpx, 1fr) -> minmax(min(100%, Xpx), 1fr)
const htmlPath = path.join(__dirname, '../../guide-ev.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

htmlContent = htmlContent.replaceAll('minmax(280px, 1fr)', 'minmax(min(100%, 280px), 1fr)');
htmlContent = htmlContent.replaceAll('minmax(260px, 1fr)', 'minmax(min(100%, 260px), 1fr)');
htmlContent = htmlContent.replaceAll('minmax(240px, 1fr)', 'minmax(min(100%, 240px), 1fr)');
htmlContent = htmlContent.replaceAll('minmax(220px, 1fr)', 'minmax(min(100%, 220px), 1fr)');
htmlContent = htmlContent.replaceAll('minmax(200px, 1fr)', 'minmax(min(100%, 200px), 1fr)');

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log('✅ Updated guide-ev.html grid minmax to fluid min(100%, Npx) successfully!');

// 2. Thêm CSS Responsive Safe Guard vào css/pages/guides.css cho màn hình nhỏ <= 640px
const cssPath = path.join(__dirname, '../../css/pages/guides.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const mobileOverride = `

/* ==========================================================================
   📱 MOBILE RESPONSIVE 320PX-430PX OVERFLOW PREVENTION SAFEGUARD
   ========================================================================== */
@media (max-width: 640px) {
  #main-content {
    padding: 70px 12px 24px 12px !important;
  }

  .pdf-slide-card {
    padding: 20px 14px !important;
    border-radius: 16px !important;
    margin-bottom: 24px !important;
  }

  .pdf-slide-card div[style*="padding: 24px"],
  .pdf-slide-card div[style*="padding: 32px"] {
    padding: 16px 12px !important;
  }

  .pdf-slide-card div[style*="grid-template-columns"] {
    grid-template-columns: 1fr !important;
  }

  .pdf-slide-title {
    font-size: 1.35rem !important;
    line-height: 1.3 !important;
  }
}
`;

if (!cssContent.includes('MOBILE RESPONSIVE 320PX-430PX OVERFLOW PREVENTION SAFEGUARD')) {
    cssContent += mobileOverride;
    fs.writeFileSync(cssPath, cssContent, 'utf8');
    console.log('✅ Appended mobile responsive overflow prevention rules to guides.css!');
}
