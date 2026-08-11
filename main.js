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
});
