/**
 * scripts/fix_tiktok_pixel.js
 * Auto 28 Landing Page - Fix Broken TikTok Pixel Snippet across all HTML pages
 * 
 * Root Cause: The ttq.load function definition was missing from the TikTok snippet,
 * causing "Uncaught TypeError: ttq.load is not a function".
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '../');
const htmlFiles = fs.readdirSync(projectRoot).filter(f => f.endsWith('.html'));

const fixedSnippet = `<script>
        !function (w, d, t) {
            w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || []; ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"], ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } }; for (var i = 0; i < ttq.methods.length; i++)ttq.setAndDefer(ttq, ttq.methods[i]); ttq.instance = function (t) { for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)ttq.setAndDefer(e, ttq.methods[n]); return e }; ttq.load = function (e, n) { var r = "https://analytics.tiktok.com/i18n/pixel/events.js", o = n && n.partner; ttq._i = ttq._i || {}, ttq._i[e] = [], ttq._i[e]._u = r, ttq._t = ttq._t || {}, ttq._t[e] = +new Date, ttq._o = ttq._o || {}, ttq._o[e] = n || {}; var a = document.createElement("script"); a.type = "text/javascript", a.async = !0, a.src = r + "?sdkid=" + e + "&lib=" + t; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(a, s) };
            ttq.load('D802OM3C77UEKU3Q3HPG');
            ttq.page();
        }(window, document, 'ttq');
    </script>`;

let updatedCount = 0;

htmlFiles.forEach(file => {
    const filePath = path.join(projectRoot, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('w.TiktokAnalyticsObject') && !content.includes('ttq.load = function')) {
        // Replace broken TikTok block
        content = content.replace(
            /<script>[\s\S]*?w\.TiktokAnalyticsObject[\s\S]*?<\/script>/gi,
            fixedSnippet
        );
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
        console.log(`✅ Fixed TikTok Pixel snippet in ${file}`);
    }
});

console.log(`\n🎉 Successfully fixed TikTok Pixel in ${updatedCount} HTML files!`);
