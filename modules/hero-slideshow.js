/**
 * Auto 28 Landing Page - Hero Background Swap & Mobile Slideshow Module
 * Safe Refactoring Standard: Tier-1 Enterprise
 */
(function() {
    'use strict';

    let activeLayerIdx = 0;
    let slideshowFaded = false;
    let bgLayers = [];
    let heroBg = null;
    let heroSlideshow = null;

    const modelImages = {
        'vf3': './assets/cars/vf3.jpg',
        'vf5': './assets/cars/vf5.jpg',
        'vf6': './assets/cars/vf6.jpg',
        'vf7': './assets/cars/vf7.jpg',
        'vf8': './assets/cars/vf8.jpg',
        'vf9': './assets/cars/vf9.jpg',
        'vfe34': './assets/cars/vfe34.jpg',
        'lux-a': './assets/cars/lux-a.jpg',
        'fadil': './assets/cars/fadil.jpg'
    };

    function triggerBackgroundSwap(imgUrl) {
        if (!imgUrl || !heroBg || bgLayers.length < 2) return;

        const inactiveLayerIdx = 1 - activeLayerIdx;
        const activeLayer = bgLayers[activeLayerIdx];
        const inactiveLayer = bgLayers[inactiveLayerIdx];

        const tempImg = new Image();
        tempImg.src = imgUrl;
        tempImg.onload = () => {
            inactiveLayer.src = imgUrl;
            inactiveLayer.style.zIndex = '-1';
            activeLayer.style.zIndex = '-2';
            inactiveLayer.style.opacity = '1';
            activeLayer.style.opacity = '0';

            if (!slideshowFaded && heroSlideshow) {
                heroSlideshow.style.opacity = '0';
                slideshowFaded = true;
            }

            activeLayerIdx = inactiveLayerIdx;
        };
    }

    function initHeroSlideshow() {
        heroBg = document.getElementById('hero-bg');
        heroSlideshow = document.getElementById('hero-slideshow');
        const carModelSelect = document.getElementById('car-model');
        const searchModelSelect = document.getElementById('search-model');

        if (heroBg) {
            bgLayers = [
                document.createElement('img'),
                document.createElement('img')
            ];
            bgLayers.forEach((img, idx) => {
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.position = 'absolute';
                img.style.inset = '0';
                img.style.opacity = '0';
                img.style.transition = 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
                img.style.zIndex = idx === 0 ? '-1' : '-2';
                heroBg.appendChild(img);
            });
        }

        if (heroSlideshow) {
            heroSlideshow.style.transition = 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        }

        if (carModelSelect) {
            carModelSelect.addEventListener('change', function () {
                const imgUrl = modelImages[this.value];
                if (imgUrl) triggerBackgroundSwap(imgUrl);
            });
        }

        if (searchModelSelect) {
            searchModelSelect.addEventListener('change', function () {
                const imgUrl = modelImages[this.value];
                if (imgUrl) triggerBackgroundSwap(imgUrl);
            });
        }

        // Mobile slideshow automation
        const slides = document.querySelectorAll('.slideshow .slide');
        if (slides.length > 0) {
            let currentSlideIdx = 0;
            slides[currentSlideIdx].classList.add('active');

            setInterval(() => {
                if (slideshowFaded) return;
                slides[currentSlideIdx].classList.remove('active');
                currentSlideIdx = (currentSlideIdx + 1) % slides.length;
                slides[currentSlideIdx].classList.add('active');
            }, 5000);
        }
    }

    window.triggerBackgroundSwap = triggerBackgroundSwap;
    window.initHeroSlideshow = initHeroSlideshow;
})();
