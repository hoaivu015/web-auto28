const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TARGET_URL = 'http://localhost:5000/dinh-gia';

(async () => {
    console.log(`🔍 Launching Visual & WCAG Color Audit for ${TARGET_URL}...`);
    let browser;
    try {
        browser = await puppeteer.launch({
            executablePath: CHROME_PATH,
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        
        // Mobile Viewport (iPhone 15: 390x844)
        await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
        await page.goto(TARGET_URL, { waitUntil: 'networkidle0', timeout: 15000 });

        const mobileAudit = await evaluatePageColors(page, 'Mobile (390px)');
        
        // Take Screenshot Mobile
        const screenshotMobilePath = path.join(__dirname, 'dinh_gia_mobile.png');
        await page.screenshot({ path: screenshotMobilePath, fullPage: true });

        // Desktop Viewport (1440x900)
        await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2, isMobile: false, hasTouch: false });
        await page.reload({ waitUntil: 'networkidle0' });

        const desktopAudit = await evaluatePageColors(page, 'Desktop (1440px)');

        // Take Screenshot Desktop
        const screenshotDesktopPath = path.join(__dirname, 'dinh_gia_desktop.png');
        await page.screenshot({ path: screenshotDesktopPath, fullPage: true });

        const report = {
            subagent: 'visual_inspector',
            timestamp: new Date().toISOString(),
            targetUrl: TARGET_URL,
            mobile: mobileAudit,
            desktop: desktopAudit,
            screenshots: [screenshotMobilePath, screenshotDesktopPath]
        };

        const reportPath = path.join(__dirname, 'color_audit_report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

        console.log(`✅ Audit complete! Report written to ${reportPath}`);
        console.log(JSON.stringify(report, null, 2));

    } catch (err) {
        console.error('❌ Error during visual audit:', err);
    } finally {
        if (browser) await browser.close();
    }
})();

async function evaluatePageColors(page, viewportName) {
    return await page.evaluate((vpName) => {
        function getLuminance(r, g, b) {
            const a = [r, g, b].map(v => {
                v /= 255;
                return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
            });
            return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
        }

        function parseRGB(colorStr) {
            if (!colorStr) return null;
            const m = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            return m ? [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])] : null;
        }

        const contrastViolations = [];
        const checkedElements = [];
        const textNodes = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, label, button, li, .badge, .pill, [class*="card"], [class*="step"], [class*="hero"], [class*="benefit"], [class*="faq"]'));
        
        textNodes.forEach((el, idx) => {
            if (!el.innerText || !el.innerText.trim()) return;
            // Only check elements with direct text or few children
            if (el.children.length > 4) return;

            const style = window.getComputedStyle(el);
            if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;

            const color = parseRGB(style.color);
            if (!color) return;

            let bgColorStr = style.backgroundColor;
            let parent = el.parentElement;
            while ((!bgColorStr || bgColorStr === 'rgba(0, 0, 0, 0)' || bgColorStr === 'transparent') && parent) {
                bgColorStr = window.getComputedStyle(parent).backgroundColor;
                parent = parent.parentElement;
            }
            if (!bgColorStr || bgColorStr === 'rgba(0, 0, 0, 0)' || bgColorStr === 'transparent') {
                bgColorStr = 'rgb(255, 255, 255)'; // Fallback to white body bg
            }

            const bgColor = parseRGB(bgColorStr);
            if (!bgColor) return;

            const l1 = getLuminance(color[0], color[1], color[2]);
            const l2 = getLuminance(bgColor[0], bgColor[1], bgColor[2]);
            const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

            const fontSize = parseFloat(style.fontSize);
            const fontWeight = parseInt(style.fontWeight) || 400;
            const isLargeText = fontSize >= 24 || (fontSize >= 18.5 && fontWeight >= 700);
            const minRatio = isLargeText ? 3.0 : 4.5;

            const itemInfo = {
                tag: el.tagName.toLowerCase(),
                className: el.className,
                id: el.id,
                text: el.innerText.trim().substring(0, 50),
                fontSize: `${fontSize}px`,
                fontWeight: fontWeight,
                color: style.color,
                bgColor: bgColorStr,
                ratio: parseFloat(ratio.toFixed(2)),
                minRequired: minRatio,
                pass: ratio >= minRatio
            };

            checkedElements.push(itemInfo);

            if (ratio < minRatio) {
                contrastViolations.push(itemInfo);
            }
        });

        // Color Palette Extracted
        const colorPalette = {};
        checkedElements.forEach(item => {
            colorPalette[item.color] = (colorPalette[item.color] || 0) + 1;
            colorPalette[item.bgColor] = (colorPalette[item.bgColor] || 0) + 1;
        });

        // Neural Expressive DNA Audit
        const mainCards = Array.from(document.querySelectorAll('.card, .sell-hero, .sell-step-card, .valuation-form, .hero-card, .advantage-card'));
        const dnaAudit = {
            adn1_liquid_translucency: mainCards.some(c => {
                const s = window.getComputedStyle(c);
                return (s.backdropFilter && s.backdropFilter !== 'none') || (s.webkitBackdropFilter && s.webkitBackdropFilter !== 'none');
            }),
            adn2_super_ellipse_radius: mainCards.length > 0 && mainCards.every(c => {
                const r = parseFloat(window.getComputedStyle(c).borderRadius);
                return !isNaN(r) && r >= 16;
            }),
            adn3_bold_first_typography: Array.from(document.querySelectorAll('h1, h2, h3')).every(h => {
                const w = parseInt(window.getComputedStyle(h).fontWeight) || 400;
                return w >= 700;
            })
        };

        return {
            viewport: vpName,
            totalChecked: checkedElements.length,
            violationsCount: contrastViolations.length,
            violations: contrastViolations,
            colorPaletteUsed: colorPalette,
            dnaAudit
        };
    }, viewportName);
}
