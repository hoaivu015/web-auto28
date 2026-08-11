/**
 * scripts/audit-helper.js
 * NodeJS script tự động quét và chấm điểm Landing Page dựa trên các tiêu chí kỹ thuật:
 * - HTML5 Semantic & SEO
 * - Tối ưu hiệu năng Core Web Vitals
 * - Đo lường chuyển đổi (Conversions Tracking / DataLayer)
 * - Tối ưu hóa SEO AI (GEO/AEO)
 */

const fs = require('fs');
const path = require('path');

function runAudit(workspacePath) {
    let landingPath = workspacePath;
    if (!fs.existsSync(path.join(landingPath, 'index.html')) && fs.existsSync(path.join(workspacePath, 'lading-page', 'index.html'))) {
        landingPath = path.join(workspacePath, 'lading-page');
    }
    const indexHtmlPath = path.join(landingPath, 'index.html');
    const mainJsPath = path.join(landingPath, 'main.js');
    const leadsJsPath = path.join(landingPath, 'js/leads.js');

    const report = {
        score: 100,
        checks: [],
        warnings: [],
        suggestions: []
    };

    if (!fs.existsSync(indexHtmlPath)) {
        return { error: 'Không tìm thấy file index.html của Landing Page tại ' + indexHtmlPath };
    }

    // 0. KIỂM TRA RUNTIME & CÚ PHÁP AN TOÀN (HYBRID GATE)
    const runtimeCheckerPath = path.join(landingPath, 'scripts', 'runtime_hygiene_check.js');
    let runtimeSafety = { ok: true, errors: [] };
    if (fs.existsSync(runtimeCheckerPath)) {
        const { checkHtmlRuntimeSafety } = require(runtimeCheckerPath);
        runtimeSafety = checkHtmlRuntimeSafety(indexHtmlPath, landingPath);
    }
    if (!runtimeSafety.ok) {
        report.score = 0;
        report.checks.push({ name: 'An toàn Runtime & Cú pháp JS', status: 'FAIL', points: 0 });
        for (const err of runtimeSafety.errors) {
            report.warnings.push(err);
        }
    } else {
        report.checks.push({ name: 'An toàn Runtime & Cú pháp JS', status: 'PASS', points: 20 });
    }

    const htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
    let mainJsContent = '';
    let leadsJsContent = '';

    if (fs.existsSync(mainJsPath)) {
        mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
    }
    if (fs.existsSync(leadsJsPath)) {
        leadsJsContent = fs.readFileSync(leadsJsPath, 'utf8');
    }

    // ==========================================================================
    // 🏗️ KIỂM TRA 1: HTML5 SEMANTIC & SEO TRUYỀN THỐNG (30đ)
    // ==========================================================================
    let semanticScore = 30;
    
    // Check thẻ form
    if (htmlContent.includes('<form') && htmlContent.includes('</form>')) {
        report.checks.push({ name: 'Thẻ <form> ngữ nghĩa', status: 'PASS', points: 10 });
    } else {
        semanticScore -= 10;
        report.checks.push({ name: 'Thẻ <form> ngữ nghĩa', status: 'FAIL', points: 0 });
        report.warnings.push('Landing Page không sử dụng thẻ <form> chuẩn HTML5. Cần thay thế các div bọc ngoài bằng <form>.');
    }

    // Check JSON-LD Structured Data
    if (htmlContent.includes('application/ld+json')) {
        report.checks.push({ name: 'Dữ liệu cấu trúc JSON-LD', status: 'PASS', points: 10 });
    } else {
        semanticScore -= 10;
        report.checks.push({ name: 'Dữ liệu cấu trúc JSON-LD', status: 'FAIL', points: 0 });
        report.warnings.push('Thiếu thẻ Schema Markup JSON-LD hỗ trợ SEO và tìm kiếm thực thể.');
    }

    // Check Viewport
    if (htmlContent.includes('name="viewport"')) {
        report.checks.push({ name: 'Meta Viewport di động', status: 'PASS', points: 10 });
    } else {
        semanticScore -= 10;
        report.checks.push({ name: 'Meta Viewport di động', status: 'FAIL', points: 0 });
        report.warnings.push('Thiếu thẻ meta viewport khiến trang không hiển thị responsive chuẩn trên mobile.');
    }

    // ==========================================================================
    // ⚡ KIỂM TRA 2: CORE WEB VITALS & TỐI ƯU HIỆU NĂNG (30đ)
    // ==========================================================================
    let performanceScore = 30;
    
    // Check Lazy Loading
    if (htmlContent.includes('loading="lazy"')) {
        report.checks.push({ name: 'Tối ưu Lazy Loading cho ảnh', status: 'PASS', points: 10 });
    } else {
        performanceScore -= 10;
        report.checks.push({ name: 'Tối ưu Lazy Loading cho ảnh', status: 'FAIL', points: 0 });
        report.suggestions.push('Nên thêm thuộc tính loading="lazy" vào các thẻ <img> ở dưới màn hình đầu tiên để tăng tốc LCP.');
    }

    // Check preconnect
    if (htmlContent.includes('rel="preconnect"') || htmlContent.includes('rel="dns-prefetch"')) {
        report.checks.push({ name: 'Thiết lập Preconnect tối ưu kết nối', status: 'PASS', points: 10 });
    } else {
        performanceScore -= 10;
        report.checks.push({ name: 'Thiết lập Preconnect tối ưu kết nối', status: 'FAIL', points: 0 });
        report.suggestions.push('Nên thêm thẻ <link rel="preconnect" href="..."> để thiết lập kết nối sớm đến các CDN bên ngoài (Supabase, Google Fonts).');
    }

    // Check nén ảnh thế hệ mới WebP/AVIF
    const hasUncompressedImages = htmlContent.match(/src="[^"]+\.(png|jpg|jpeg)"/g);
    if (!hasUncompressedImages || hasUncompressedImages.length < 3) {
        report.checks.push({ name: 'Sử dụng định dạng ảnh tối ưu WebP/AVIF', status: 'PASS', points: 10 });
    } else {
        performanceScore -= 5;
        report.checks.push({ name: 'Sử dụng định dạng ảnh tối ưu WebP/AVIF', status: 'WARNING', points: 5 });
        report.suggestions.push('Phát hiện một số ảnh sử dụng định dạng cũ (.png, .jpg). Nên chuyển sang .webp để giảm dung lượng file tải.');
    }

    // ==========================================================================
    // 📊 KIỂM TRA 3: ĐO LƯỜNG CHUYỂN ĐỔI & DATALAYER (25đ)
    // ==========================================================================
    let trackingScore = 25;
    const trackingCode = mainJsContent + leadsJsContent;

    // Check DataLayer Push
    if (trackingCode.includes('dataLayer.push')) {
        report.checks.push({ name: 'Bắn sự kiện DataLayer Push khi thành công', status: 'PASS', points: 15 });
    } else {
        trackingScore -= 15;
        report.checks.push({ name: 'Bắn sự kiện DataLayer Push khi thành công', status: 'FAIL', points: 0 });
        report.warnings.push('Không tìm thấy mã dataLayer.push() khi gửi form thành công. Các công cụ như GTM/GA4 sẽ không đo lường được chuyển đổi chính xác.');
    }

    // Check Click Spamming Protection
    if (trackingCode.includes('.disabled =') || trackingCode.includes('disabled', 'true')) {
        report.checks.push({ name: 'Chống Double-Click gửi trùng form', status: 'PASS', points: 10 });
    } else {
        trackingScore -= 10;
        report.checks.push({ name: 'Chống Double-Click gửi trùng form', status: 'FAIL', points: 0 });
        report.warnings.push('Chưa khóa nút submit ngay khi click. Khách hàng có thể nhấn nút gửi nhiều lần liên tục làm lệch số liệu chuyển đổi.');
    }

    // ==========================================================================
    // 🤖 KIỂM TRA 4: TỐI ƯU HÓA SEO AI (GEO/AEO) (15đ)
    // ==========================================================================
    let aiSeoScore = 15;

    // Check Tables & Lists
    if (htmlContent.includes('<table') || htmlContent.includes('<ul') || htmlContent.includes('<ol')) {
        report.checks.push({ name: 'Cấu trúc bảng biểu & danh sách cho AI Bot', status: 'PASS', points: 10 });
    } else {
        aiSeoScore -= 10;
        report.checks.push({ name: 'Cấu trúc bảng biểu & danh sách cho AI Bot', status: 'FAIL', points: 0 });
        report.suggestions.push('Nên bổ sung cấu trúc thẻ <table> hoặc danh sách liệt kê để các công cụ tìm kiếm AI dễ dàng trích xuất thông số.');
    }

    // Check FAQ Section
    if (htmlContent.includes('faq') || htmlContent.includes('accordion')) {
        report.checks.push({ name: 'Khối câu hỏi thường gặp FAQ', status: 'PASS', points: 5 });
    } else {
        aiSeoScore -= 5;
        report.checks.push({ name: 'Khối câu hỏi thường gặp FAQ', status: 'FAIL', points: 0 });
        report.suggestions.push('Nên có khối FAQ để trả lời các câu hỏi hội thoại dài mà người dùng hay hỏi các AI search engines.');
    }

    // Tổng hợp điểm số
    report.score = semanticScore + performanceScore + trackingScore + aiSeoScore;

    return report;
}

// Chạy trực tiếp từ Node CLI
const args = process.argv.slice(2);
const isSummaryMode = args.includes('--summary');
const targetPath = args.find(a => !a.startsWith('--')) || process.cwd();

const res = runAudit(targetPath);

// Offload full report to scratch directory to save context tokens
const scratchDir = path.join(targetPath, '.agent', 'scratch');
if (!fs.existsSync(scratchDir)) {
    fs.mkdirSync(scratchDir, { recursive: true });
}
const reportPath = path.join(scratchDir, 'audit_report.json');
fs.writeFileSync(reportPath, JSON.stringify(res, null, 2), 'utf8');

if (isSummaryMode) {
    const passCount = res.checks.filter(c => c.status === 'PASS').length;
    const failCount = res.checks.filter(c => c.status === 'FAIL').length;
    const warnCount = res.checks.filter(c => c.status === 'WARNING').length;
    console.log(`[AUDIT SCORE: ${res.score}/100] PASS: ${passCount} | WARN: ${warnCount} | FAIL: ${failCount} | Full details saved to: ${reportPath}`);
} else {
    console.log(JSON.stringify(res, null, 2));
}

