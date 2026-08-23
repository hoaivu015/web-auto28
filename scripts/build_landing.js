const fs = require('fs');
const path = require('path');

function buildLandingPage() {
    console.log("=========================================");
    console.log("Building Auto 28 Landing Page (index.html)...");
    console.log("=========================================");

    const rootDir = path.join(__dirname, '..');
    const compDir = path.join(rootDir, 'src', 'components');

    // Read component partials
    const navHtml = fs.readFileSync(path.join(compDir, 'nav.html'), 'utf8');
    const heroHtml = fs.readFileSync(path.join(compDir, 'hero_showroom.html'), 'utf8');
    const commitmentsHtml = fs.readFileSync(path.join(compDir, 'commitments.html'), 'utf8');
    const socialProofHtml = fs.readFileSync(path.join(compDir, 'social_proof.html'), 'utf8');
    const productGridHtml = fs.readFileSync(path.join(compDir, 'product_grid.html'), 'utf8');
    const processHtml = fs.readFileSync(path.join(compDir, 'process.html'), 'utf8');
    const faqAccordionHtml = fs.readFileSync(path.join(compDir, 'faq_accordion.html'), 'utf8');
    const locationMapHtml = fs.readFileSync(path.join(compDir, 'location_map.html'), 'utf8');
    const leadModalHtml = fs.readFileSync(path.join(compDir, 'lead_modal.html'), 'utf8');
    const footerHtml = fs.readFileSync(path.join(compDir, 'footer.html'), 'utf8');

    // Execute root build_landing.js to keep in sync
    const rootBuilder = path.join(rootDir, 'build_landing.js');
    if (fs.existsSync(rootBuilder)) {
        require(rootBuilder);
    }
}

buildLandingPage();
