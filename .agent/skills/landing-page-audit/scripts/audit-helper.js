/**
 * scripts/audit-helper.js
 * NodeJS script tự động quét và chấm điểm Landing Page dựa trên các tiêu chí kỹ thuật:
 * - HTML5 Semantic & SEO
 * - Tối ưu hiệu năng Core Web Vitals
 * - Đo lường chuyển đổi (Conversions Tracking / DataLayer)
 * - Tối ưu hóa SEO AI (GEO/AEO)
 * - Kiểm định Visual Viewport Boundary & Touch Target Mobile (WCAG 2.2)
 * Quét TOÀN BỘ các trang HTML và CSS trong dự án.
 */

const fs = require('fs');
const path = require('path');

function auditSingleHtml(htmlPath, htmlContent, trackingCode, styleCssContent) {
    const fileName = path.basename(htmlPath);
    const checks = [];
    let warnings = [];
    let suggestions = [];

    // 1. Semantic & SEO (25 pts)
    let semanticScore = 25;
    if (htmlContent.includes('<form') && htmlContent.includes('</form>')) {
        checks.push({ name: 'Thẻ <form> ngữ nghĩa', status: 'PASS', points: 10 });
    } else {
        semanticScore -= 10;
        checks.push({ name: 'Thẻ <form> ngữ nghĩa', status: 'FAIL', points: 0 });
        warnings.push(`File ${fileName}: Không sử dụng thẻ <form> chuẩn HTML5. Cần thay thế các div bọc ngoài bằng <form>.`);
    }

    if (htmlContent.includes('application/ld+json')) {
        checks.push({ name: 'Dữ liệu cấu trúc JSON-LD', status: 'PASS', points: 10 });
    } else {
        semanticScore -= 10;
        checks.push({ name: 'Dữ liệu cấu trúc JSON-LD', status: 'FAIL', points: 0 });
        warnings.push(`File ${fileName}: Thiếu thẻ Schema Markup JSON-LD hỗ trợ SEO và tìm kiếm thực thể.`);
    }

    if (htmlContent.includes('name="viewport"')) {
        checks.push({ name: 'Meta Viewport di động', status: 'PASS', points: 5 });
    } else {
        semanticScore -= 5;
        checks.push({ name: 'Meta Viewport di động', status: 'FAIL', points: 0 });
        warnings.push(`File ${fileName}: Thiếu thẻ meta viewport responsive.`);
    }

    // 2. Performance (25 pts)
    let performanceScore = 25;
    const hasImages = htmlContent.includes('<img');
    if (!hasImages || htmlContent.includes('loading="lazy"')) {
        checks.push({ name: 'Tối ưu Lazy Loading cho ảnh', status: 'PASS', points: 10 });
    } else {
        performanceScore -= 10;
        checks.push({ name: 'Tối ưu Lazy Loading cho ảnh', status: 'FAIL', points: 0 });
        suggestions.push(`File ${fileName}: Thiếu loading="lazy" cho các thẻ <img> below-the-fold.`);
    }

    if (htmlContent.includes('rel="preconnect"') || htmlContent.includes('rel="dns-prefetch"')) {
        checks.push({ name: 'Thiết lập Preconnect kết nối', status: 'PASS', points: 10 });
    } else {
        performanceScore -= 10;
        checks.push({ name: 'Thiết lập Preconnect kết nối', status: 'FAIL', points: 0 });
        suggestions.push(`File ${fileName}: Thiếu <link rel="preconnect"> đến CDN bên ngoài.`);
    }

    const hasUncompressedImages = htmlContent.match(/src="[^"]+\.(png|jpg|jpeg)"/gi);
    if (!hasUncompressedImages || hasUncompressedImages.length < 3) {
        checks.push({ name: 'Sử dụng định dạng ảnh WebP/AVIF', status: 'PASS', points: 5 });
    } else {
        performanceScore -= 5;
        checks.push({ name: 'Sử dụng định dạng ảnh WebP/AVIF', status: 'WARNING', points: 2.5 });
        suggestions.push(`File ${fileName}: Phát hiện ${hasUncompressedImages.length} ảnh sử dụng định dạng cũ (.png, .jpg).`);
    }

    // 3. Conversion Tracking (25 pts)
    let trackingScore = 25;
    if (trackingCode.includes('dataLayer.push')) {
        checks.push({ name: 'DataLayer Push khi thành công', status: 'PASS', points: 15 });
    } else {
        trackingScore -= 15;
        checks.push({ name: 'DataLayer Push khi thành công', status: 'FAIL', points: 0 });
        warnings.push(`File ${fileName}: Thiếu mã dataLayer.push() đo lường chuyển đổi.`);
    }

    if (trackingCode.includes('.disabled =') || trackingCode.includes('disabled')) {
        checks.push({ name: 'Chống Double-Click gửi form', status: 'PASS', points: 10 });
    } else {
        trackingScore -= 10;
        checks.push({ name: 'Chống Double-Click gửi form', status: 'FAIL', points: 0 });
        warnings.push(`File ${fileName}: Chưa khóa nút submit khi click gửi.`);
    }

    // 4. GEO / AI Search (10 pts)
    let aiSeoScore = 10;
    if (htmlContent.includes('<table') || htmlContent.includes('<ul') || htmlContent.includes('<ol')) {
        checks.push({ name: 'Cấu trúc bảng/danh sách cho AI Bot', status: 'PASS', points: 5 });
    } else {
        aiSeoScore -= 5;
        checks.push({ name: 'Cấu trúc bảng/danh sách cho AI Bot', status: 'FAIL', points: 0 });
        suggestions.push(`File ${fileName}: Nên bổ sung <table> hoặc <ul> để AI Bot dễ trích xuất.`);
    }

    if (htmlContent.includes('faq') || htmlContent.includes('accordion')) {
        checks.push({ name: 'Khối câu hỏi FAQ', status: 'PASS', points: 5 });
    } else {
        aiSeoScore -= 5;
        checks.push({ name: 'Khối câu hỏi FAQ', status: 'FAIL', points: 0 });
        suggestions.push(`File ${fileName}: Nên bổ sung khối FAQ trả lời câu hỏi đàm thoại.`);
    }

    // 5. Visual Viewport & Touch Target Boundary (WCAG 2.2 Reflow) (15 pts)
    let visualLayoutScore = 15;
    if (styleCssContent.includes('min-height: 48px') || styleCssContent.includes('min-height:48px') || styleCssContent.includes('min-height: 48px;')) {
        checks.push({ name: 'Touch Target tối thiểu 48px di động (WCAG 2.2)', status: 'PASS', points: 8 });
    } else {
        visualLayoutScore -= 8;
        checks.push({ name: 'Touch Target tối thiểu 48px di động (WCAG 2.2)', status: 'FAIL', points: 0 });
        warnings.push(`Thiếu quy định min-height: 48px cho nút bấm di động trong style.css.`);
    }

    if (styleCssContent.includes('max-height') && styleCssContent.includes('overflow-y')) {
        checks.push({ name: 'Chống vỡ khung Modal Reflow (WCAG 2.2 SC 1.4.10)', status: 'PASS', points: 7 });
    } else {
        visualLayoutScore -= 7;
        checks.push({ name: 'Chống vỡ khung Modal Reflow (WCAG 2.2 SC 1.4.10)', status: 'FAIL', points: 0 });
        warnings.push(`Thiếu thuộc tính max-height và overflow-y chống tràn khung di động.`);
    }

    const score = semanticScore + performanceScore + trackingScore + aiSeoScore + visualLayoutScore;
    return { fileName, score, checks, warnings, suggestions };
}

function runAudit(workspacePath) {
    let landingPath = workspacePath;
    if (!fs.existsSync(path.join(landingPath, 'index.html')) && fs.existsSync(path.join(workspacePath, 'lading-page', 'index.html'))) {
        landingPath = path.join(workspacePath, 'lading-page');
    }

    const mainJsPath = path.join(landingPath, 'main.js');
    const leadsJsPath = path.join(landingPath, 'js/leads.js');
    const styleCssPath = path.join(landingPath, 'style.css');

    let mainJsContent = fs.existsSync(mainJsPath) ? fs.readFileSync(mainJsPath, 'utf8') : '';
    let leadsJsContent = fs.existsSync(leadsJsPath) ? fs.readFileSync(leadsJsPath, 'utf8') : '';
    let styleCssContent = fs.existsSync(styleCssPath) ? fs.readFileSync(styleCssPath, 'utf8') : '';

    let modulesJsContent = '';
    const modulesDirPath = path.join(landingPath, 'js/modules');
    if (fs.existsSync(modulesDirPath)) {
        const moduleFiles = fs.readdirSync(modulesDirPath).filter(f => f.endsWith('.js'));
        moduleFiles.forEach(f => {
            modulesJsContent += fs.readFileSync(path.join(modulesDirPath, f), 'utf8') + '\n';
        });
    }

    const trackingCode = mainJsContent + leadsJsContent + modulesJsContent;

    const htmlFiles = fs.readdirSync(landingPath).filter(f => f.endsWith('.html'));

    if (htmlFiles.length === 0) {
        return { error: 'Không tìm thấy file HTML nào tại ' + landingPath };
    }

    const pageReports = [];
    let totalScore = 0;
    let allWarnings = [];
    let allSuggestions = [];

    htmlFiles.forEach(file => {
        const filePath = path.join(landingPath, file);
        const htmlContent = fs.readFileSync(filePath, 'utf8');
        const res = auditSingleHtml(filePath, htmlContent, trackingCode, styleCssContent);
        pageReports.push(res);
        totalScore += res.score;
        allWarnings = allWarnings.concat(res.warnings);
        allSuggestions = allSuggestions.concat(res.suggestions);
    });

    const averageScore = Math.round(totalScore / htmlFiles.length);

    return {
        score: averageScore,
        totalPages: htmlFiles.length,
        pages: pageReports,
        warnings: allWarnings,
        suggestions: allSuggestions
    };
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
    console.log(`[TOTAL AUDIT SCORE: ${res.score}/100 across ${res.totalPages} pages] Warnings: ${res.warnings.length} | Details saved to: ${reportPath}`);
} else {
    console.log(JSON.stringify(res, null, 2));
}
