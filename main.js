/**
 * Auto 28 Landing Page - Main Entry Point Orchestrator
 * Safe Refactoring Standard: Tier-1 Enterprise
 */
document.addEventListener('DOMContentLoaded', () => {
    // ⚡ Initialize Hero Background & Mobile Slideshow
    if (typeof window.initHeroSlideshow === 'function') {
        window.initHeroSlideshow();
    }

    // 🧬 Initialize AI Valuation & Wizard Form
    if (typeof window.initAIValuation === 'function') {
        window.initAIValuation();
    }

    // 🚗 Initialize Bento Grid Filters & Search
    if (typeof window.initCarFilter === 'function') {
        window.initCarFilter();
    }

    // ✨ Initialize UI Animation Effects & Accordions
    if (typeof window.initUIEffects === 'function') {
        window.initUIEffects();
    }

    // 💻 Initialize Car Detail Modal & Dynamic Vehicles
    if (typeof window.initCarModal === 'function') {
        window.initCarModal();
    }

    // 🚀 Service Worker Registration (SW 2026 PWA)
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then((reg) => {
                console.log('⚡ Auto 28 Service Worker registered:', reg.scope);
            }).catch((err) => {
                console.warn('SW registration bypassed:', err.message);
            });
        });
    }

    // ⚡ Real User Telemetry (RUM / PerformanceObserver CWV 2026)
    if ('PerformanceObserver' in window) {
        try {
            // Observe Largest Contentful Paint
            new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                if (lastEntry) {
                    window.__auto28_lcp = Math.round(lastEntry.startTime);
                }
            }).observe({ type: 'largest-contentful-paint', buffered: true });

            // Observe Cumulative Layout Shift
            let clsScore = 0;
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsScore += entry.value;
                        window.__auto28_cls = Number(clsScore.toFixed(4));
                    }
                }
            }).observe({ type: 'layout-shift', buffered: true });
        } catch (e) {
            // Graceful fallback for non-supporting browsers
        }
    }
});


