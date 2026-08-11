const http = require('http');

http.get('http://localhost:5000/', res => {
    let html = '';
    res.on('data', chunk => html += chunk);
    res.on('end', () => {
        console.log('STATUS:', res.statusCode);
        console.log('HTML LENGTH:', html.length);
        console.log('HAS HERO:', html.includes('id="hero"'));
        console.log('HAS PRODUCT GRID:', html.includes('id="product-grid-section"'));
        console.log('HAS CAR MODAL JS:', html.includes('car-modal.js'));
        console.log('HAS UI EFFECTS JS:', html.includes('ui-effects.js'));
    });
}).on('error', err => console.error(err));
