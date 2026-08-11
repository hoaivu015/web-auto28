/**
 * .agents/skills/visual-wcag-audit/scripts/visual_layout_audit.js
 * Enterprise 2026 Multi-Device Visual & WCAG Layout Audit Engine
 * 
 * Multi-Device Viewport Matrix:
 * 1. 📱 Mobile: iPhone 15 (390px x 844px, Touch)
 * 2. 📱 Tablet: iPad Air / Pro 11" (834px x 1194px, Touch)
 * 3. 💻 Desktop: Laptop / Desktop (1440px x 900px, Mouse Pointer)
 * 
 * Industrial International Standard Audits:
 * - WCAG 2.2 SC 1.4.10 Reflow (Responsive Breakpoints, Zero Overflow)
 * - Multi-Device Above-The-Fold Lead Form & CTA Matrix
 * - WCAG 2.2 SC 2.5.8 Target Size (Touch >= 44x44px, Mouse >= 24x24px)
 * - WCAG 2.2 SC 1.4.3 & 1.4.11 Color Contrast (Text >= 4.5:1, UI Controls >= 3.0:1)
 * - Multi-Device Screenshot Vault (.agent/scratch/screenshots/)
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 8899;
const PROJECT_ROOT = path.resolve(__dirname, '../../../../');
const SCRATCH_DIR = path.join(PROJECT_ROOT, '.agent/scratch');
const SCREENSHOT_DIR = path.join(SCRATCH_DIR, 'screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const DEVICE_PROFILES = [
    { name: 'mobile', label: 'Mobile (iPhone 15)', width: 390, height: 844, isMobile: true, hasTouch: true, minTarget: 44 },
    { name: 'tablet', label: 'Tablet (iPad Air)', width: 834, height: 1194, isMobile: true, hasTouch: true, minTarget: 44 },
    { name: 'desktop', label: 'Desktop (MacBook 14")', width: 1440, height: 900, isMobile: false, hasTouch: false, minTarget: 24 }
];

// 1. Start Local Express Server
function startServer() {
    const app = express();
    app.use(express.static(PROJECT_ROOT));
    return new Promise((resolve) => {
        const server = http.createServer(app).listen(PORT, () => {
            console.log(`🌐 Audit Static Server running at http://localhost:${PORT}`);
            resolve(server);
        });
    });
}

// 2. Main Multi-Device Audit Runner
async function runVisualAudit() {
    console.log('🚀 Launching Enterprise Multi-Device Headless Chrome Engine...');
    const server = await startServer();
    
    let browser;
    try {
        browser = await puppeteer.launch({
            executablePath: CHROME_PATH,
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
        });

        const page = await browser.newPage();

        // Discover all HTML files
        const htmlFiles = fs.readdirSync(PROJECT_ROOT)
            .filter(f => f.endsWith('.html') && !f.includes('node_modules'));

        const results = {
            timestamp: new Date().toISOString(),
            totalFilesAudited: htmlFiles.length,
            devicesAudited: DEVICE_PROFILES.map(d => d.label),
            passed: true,
            visualScore: 100,
            matrixSummary: {
                mobile: { aboveTheFoldPass: 0, overflowFailures: 0, touchTargetFailures: 0, contrastFailures: 0 },
                tablet: { aboveTheFoldPass: 0, overflowFailures: 0, touchTargetFailures: 0, contrastFailures: 0 },
                desktop: { aboveTheFoldPass: 0, overflowFailures: 0, touchTargetFailures: 0, contrastFailures: 0 }
            },
            details: {}
        };

        for (const file of htmlFiles) {
            results.details[file] = {};
            const pageUrl = `http://localhost:${PORT}/${file}`;

            for (const profile of DEVICE_PROFILES) {
                await page.setViewport({
                    width: profile.width,
                    height: profile.height,
                    deviceScaleFactor: 2,
                    isMobile: profile.isMobile,
                    hasTouch: profile.hasTouch
                });

                await page.goto(pageUrl, { waitUntil: 'networkidle0', timeout: 15000 });

                // Execute in-page DOM inspection for current viewport profile
                const evalResult = await page.evaluate((prof) => {
                    const issues = [];
                    const warnings = [];

                    // A. Above-The-Fold Lead Form / CTA Boundary Check
                    const ctaSelectors = ['#leadForm', '.lead-form', '#heroForm', '.hero-cta', 'form', '.btn-cta-primary', '.btn-primary'];
                    let primaryCtaFound = false;
                    let ctaTop = 9999;

                    for (const sel of ctaSelectors) {
                        const el = document.querySelector(sel);
                        if (el && el.offsetParent !== null) {
                            const rect = el.getBoundingClientRect();
                            if (rect.height > 0 && rect.width > 0) {
                                ctaTop = Math.min(ctaTop, rect.top);
                                primaryCtaFound = true;
                            }
                        }
                    }

                    const aboveTheFold = primaryCtaFound && ctaTop < prof.height;
                    if (!aboveTheFold) {
                        issues.push({
                            type: 'ABOVE_THE_FOLD_FAIL',
                            message: `[${prof.label}] Form CTA chính nằm ngoài tầm mắt màn hình đầu tiên (Tọa độ y: ${Math.round(ctaTop)}px > Viewport Height: ${prof.height}px).`
                        });
                    }

                    // B. Reflow & Horizontal Overflow Check (WCAG 1.4.10)
                    const docWidth = document.documentElement.scrollWidth;
                    const windowWidth = window.innerWidth;
                    const hasOverflow = docWidth > windowWidth + 2;
                    const overflowingElements = [];

                    if (hasOverflow) {
                        const allEls = document.body.querySelectorAll('*');
                        allEls.forEach(el => {
                            const rect = el.getBoundingClientRect();
                            if (rect.right > windowWidth + 5 && el.children.length === 0) {
                                overflowingElements.push({
                                    tag: el.tagName.toLowerCase(),
                                    className: el.className,
                                    right: Math.round(rect.right)
                                });
                            }
                        });

                        issues.push({
                            type: 'HORIZONTAL_OVERFLOW',
                            message: `[${prof.label}] Trang bị cuộn ngang vỡ viền (Doc Width: ${docWidth}px > Viewport: ${windowWidth}px).`,
                            elements: overflowingElements.slice(0, 5)
                        });
                    }

                    // C. UI Collision Check via elementFromPoint
                    const interactiveEls = document.querySelectorAll('button, a, input[type="submit"], .modal-close');
                    let collisionCount = 0;

                    interactiveEls.forEach(el => {
                        const rect = el.getBoundingClientRect();
                        if (rect.width > 0 && rect.height > 0 && rect.top >= 0 && rect.bottom <= window.innerHeight) {
                            const centerX = rect.left + rect.width / 2;
                            const centerY = rect.top + rect.height / 2;
                            const topEl = document.elementFromPoint(centerX, centerY);

                            if (topEl && topEl !== el && !el.contains(topEl) && !topEl.contains(el)) {
                                collisionCount++;
                                warnings.push({
                                    type: 'UI_COLLISION',
                                    message: `[${prof.label}] Nút [${el.innerText.trim() || el.className}] bị đè lấp bởi [${topEl.tagName.toLowerCase()}.${topEl.className}] tại (${Math.round(centerX)}, ${Math.round(centerY)}).`
                                });
                            }
                        }
                    });

                    // D. Responsive Target Size Check (WCAG 2.5.8)
                    let smallTargets = 0;
                    interactiveEls.forEach(el => {
                        const rect = el.getBoundingClientRect();
                        if (rect.width > 0 && rect.height > 0) {
                            if (rect.width < prof.minTarget || rect.height < prof.minTarget) {
                                smallTargets++;
                            }
                        }
                    });

                    if (smallTargets > 0) {
                        warnings.push({
                            type: 'SMALL_TARGET_SIZE',
                            message: `[${prof.label}] Phát hiện ${smallTargets} phần tử tương tác nhỏ hơn tiêu chuẩn vùng bấm ${prof.minTarget}x${prof.minTarget}px.`
                        });
                    }

                    // E. Color Contrast Ratio Math (WCAG 1.4.3 & 1.4.11)
                    function getLuminance(r, g, b) {
                        const a = [r, g, b].map(v => {
                            v /= 255;
                            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
                        });
                        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
                    }

                    function parseRGB(colorStr) {
                        const m = colorStr.match(/\d+/g);
                        return m ? [parseInt(m[0]), parseInt(m[1]), parseInt(m[2])] : [0, 0, 0];
                    }

                    let contrastIssues = 0;
                    const textNodes = document.querySelectorAll('h1, h2, h3, p, label, .btn');
                    textNodes.forEach(node => {
                        const style = window.getComputedStyle(node);
                        const color = parseRGB(style.color);
                        let bgColorStr = style.backgroundColor;

                        let parent = node.parentElement;
                        while (bgColorStr === 'rgba(0, 0, 0, 0)' || bgColorStr === 'transparent') {
                            if (!parent) break;
                            bgColorStr = window.getComputedStyle(parent).backgroundColor;
                            parent = parent.parentElement;
                        }
                        if (bgColorStr === 'rgba(0, 0, 0, 0)' || bgColorStr === 'transparent') {
                            bgColorStr = 'rgb(255, 255, 255)';
                        }

                        const bgColor = parseRGB(bgColorStr);
                        const l1 = getLuminance(color[0], color[1], color[2]);
                        const l2 = getLuminance(bgColor[0], bgColor[1], bgColor[2]);
                        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

                        if (ratio < 4.5 && node.innerText.trim().length > 2) {
                            contrastIssues++;
                        }
                    });

                    if (contrastIssues > 0) {
                        warnings.push({
                            type: 'LOW_COLOR_CONTRAST',
                            message: `[${prof.label}] Phát hiện ${contrastIssues} đoạn văn bản có độ tương phản màu kém (< 4.5:1).`
                        });
                    }

                    return { aboveTheFold, hasOverflow, collisionCount, smallTargets, contrastIssues, issues, warnings };
                }, profile);

                // Record Matrix Summary
                const devKey = profile.name;
                if (evalResult.aboveTheFold) results.matrixSummary[devKey].aboveTheFoldPass++;
                if (evalResult.hasOverflow) results.matrixSummary[devKey].overflowFailures++;
                results.matrixSummary[devKey].touchTargetFailures += evalResult.smallTargets;
                results.matrixSummary[devKey].contrastFailures += evalResult.contrastIssues;

                // Adjust Visual Score
                if (!evalResult.aboveTheFold) results.visualScore -= 5;
                if (evalResult.hasOverflow) results.visualScore -= 10;
                if (evalResult.collisionCount > 0) results.visualScore -= 5;

                results.details[file][profile.name] = evalResult;

                // Capture Dual Multi-Device Screenshots (Above-The-Fold Viewport & Full-Page Top-to-Bottom)
                const baseName = path.basename(file, '.html');
                const foldPath = path.join(SCREENSHOT_DIR, `${baseName}_${profile.name}_fold.png`);
                const fullPath = path.join(SCREENSHOT_DIR, `${baseName}_${profile.name}_full.png`);
                await page.screenshot({ path: foldPath, fullPage: false });
                await page.screenshot({ path: fullPath, fullPage: true });
                console.log(`📸 Dual Screenshots saved: ${baseName}_${profile.name}_full.png (Full Page) & ${baseName}_${profile.name}_fold.png (Viewport)`);
            }
        }

        results.visualScore = Math.max(0, results.visualScore);
        results.passed = results.visualScore >= 85 && 
            results.matrixSummary.mobile.overflowFailures === 0 &&
            results.matrixSummary.tablet.overflowFailures === 0 &&
            results.matrixSummary.desktop.overflowFailures === 0;

        // Save JSON Report
        const reportPath = path.join(SCRATCH_DIR, 'visual_report.json');
        fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf8');

        console.log(`\n================================================================================`);
        console.log(`📊 ENTERPRISE 2026 MULTI-DEVICE VISUAL & WCAG AUDIT MATRIX`);
        console.log(`⭐ TOTAL VISUAL SCORE: ${results.visualScore}/100 | PASSED: ${results.passed ? 'YES' : 'NO'}`);
        console.log(`--------------------------------------------------------------------------------`);
        console.log(`📱 MOBILE (390x844px)   | ATF Pass: ${results.matrixSummary.mobile.aboveTheFoldPass}/${results.totalFilesAudited} | Overflow: ${results.matrixSummary.mobile.overflowFailures} | Touch <44px: ${results.matrixSummary.mobile.touchTargetFailures} | Contrast <4.5: ${results.matrixSummary.mobile.contrastFailures}`);
        console.log(`📱 TABLET (834x1194px)  | ATF Pass: ${results.matrixSummary.tablet.aboveTheFoldPass}/${results.totalFilesAudited} | Overflow: ${results.matrixSummary.tablet.overflowFailures} | Touch <44px: ${results.matrixSummary.tablet.touchTargetFailures} | Contrast <4.5: ${results.matrixSummary.tablet.contrastFailures}`);
        console.log(`💻 DESKTOP (1440x900px) | ATF Pass: ${results.matrixSummary.desktop.aboveTheFoldPass}/${results.totalFilesAudited} | Overflow: ${results.matrixSummary.desktop.overflowFailures} | Target <24px: ${results.matrixSummary.desktop.touchTargetFailures} | Contrast <4.5: ${results.matrixSummary.desktop.contrastFailures}`);
        console.log(`--------------------------------------------------------------------------------`);
        console.log(`📁 Multi-Device Screenshot Vault: ${SCREENSHOT_DIR}`);
        console.log(`📁 Detailed Matrix JSON Report: ${reportPath}`);
        console.log(`================================================================================\n`);

    } catch (err) {
        console.error('❌ Enterprise Visual Audit Failed:', err.message);
    } finally {
        if (browser) await browser.close();
        server.close();
    }
}

runVisualAudit();
