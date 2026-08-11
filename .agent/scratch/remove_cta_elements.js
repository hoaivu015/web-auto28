/**
 * scripts/remove_cta_elements.js
 * Auto 28 Landing Page - Automated Batch Removal of:
 * 1. .mobile-sticky-cta-bar block
 * 2. .hero-quick-lead-card block
 * across all HTML landing page files.
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '../');
const htmlFiles = fs.readdirSync(projectRoot).filter(file => file.endsWith('.html'));

let updatedCount = 0;

htmlFiles.forEach(file => {
    const filePath = path.join(projectRoot, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Remove .mobile-sticky-cta-bar block (and preceding comment)
    const mobileStickyRegex = /(\s*<!--[\s\S]*?Mobile Sticky[\s\S]*?-->)?\s*<div class="mobile-sticky-cta-bar">[\s\S]*?<\/div>/gi;
    if (mobileStickyRegex.test(content)) {
        content = content.replace(mobileStickyRegex, '');
        modified = true;
    }

    // 2. Remove .hero-quick-lead-card block (and preceding comment)
    const heroLeadRegex = /(\s*<!--[\s\S]*?Above-The-Fold Quick Lead[\s\S]*?-->)?\s*<div class="hero-quick-lead-card">[\s\S]*?<\/div>\s*<\/div>/gi;
    const heroLeadRegexSimple = /(\s*<!--[\s\S]*?Quick Lead[\s\S]*?-->)?\s*<div class="hero-quick-lead-card">[\s\S]*?<button type="submit" class="btn-cta-primary">[\s\S]*?<\/div>\s*<\/form>\s*<\/div>/gi;

    if (content.includes('hero-quick-lead-card')) {
        // Match from <div class="hero-quick-lead-card"> to the closing </div> of hero-quick-lead-card
        content = content.replace(/(\s*<!--[\s\S]*?Above-The-Fold Quick Lead[\s\S]*?-->)?\s*<div class="hero-quick-lead-card">[\s\S]*?<\/form>\s*<\/div>/gi, '');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
        console.log(`✅ Removed CTA elements from ${file}`);
    }
});

console.log(`\n🎉 Successfully removed requested CTA elements across ${updatedCount} HTML files!`);
