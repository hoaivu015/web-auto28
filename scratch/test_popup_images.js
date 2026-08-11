const https = require('https');

global.window = {};
require('../cars_data.js');

const cars = global.window.staticCarsData || [];

function formatCloudinaryUrl(url, width = 800, height = 450) {
    if (!url || typeof url !== 'string') return url;
    if (url.includes('cloudinary.com') && url.includes('/upload/')) {
        if (url.includes('/w_') || url.includes('/c_pad')) return url;
        return url.replace('/upload/', `/upload/w_${width},h_${height},c_pad,b_auto:predominant,f_auto,q_auto/`);
    }
    return url;
}

function checkUrl(url) {
    return new Promise((resolve) => {
        try {
            const req = https.request(url, {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            }, (res) => {
                resolve({ url, status: res.statusCode });
            });
            req.on('error', (err) => {
                resolve({ url, status: 'ERROR', error: err.message });
            });
            req.setTimeout(5000, () => {
                req.destroy();
                resolve({ url, status: 'TIMEOUT' });
            });
            req.end();
        } catch (e) {
            resolve({ url, status: 'EXCEPTION', error: e.message });
        }
    });
}

async function testSampleUrls() {
    console.log("Testing sample car images...");
    const testCases = [];
    
    for (let i = 0; i < 3; i++) {
        const car = cars[i];
        if (car.image_url) {
            testCases.push({ label: `Car ${i+1} raw main`, url: car.image_url });
            testCases.push({ label: `Car ${i+1} formatted main`, url: formatCloudinaryUrl(car.image_url) });
        }
        if (car.detail_images_list) {
            const firstDetail = car.detail_images_list.split(',')[0].trim();
            testCases.push({ label: `Car ${i+1} raw detail #1`, url: firstDetail });
            testCases.push({ label: `Car ${i+1} formatted detail #1`, url: formatCloudinaryUrl(firstDetail) });
        }
    }
    
    for (const tc of testCases) {
        const result = await checkUrl(tc.url);
        console.log(`[${result.status}] ${tc.label} => ${result.url}`);
    }
}

testSampleUrls();
