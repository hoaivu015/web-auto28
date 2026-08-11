document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // ⚡ UNIVERSAL SMOOTH SCROLL HANDLER (Nav Links & Anchors)
    // ==========================================================================
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href*="#"]');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href || href === '#') return;

        const hashIndex = href.indexOf('#');
        if (hashIndex === -1) return;
        const targetId = href.substring(hashIndex + 1);
        if (!targetId) return;

        const targetEl = document.getElementById(targetId);
        if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (window.history && window.history.pushState) {
                window.history.pushState(null, null, '#' + targetId);
            }
        }
    });

    // Auto-scroll on page load if URL has hash (e.g. index.html#inventory)
    if (window.location.hash) {
        const hashId = window.location.hash.substring(1);
        const targetEl = document.getElementById(hashId);
        if (targetEl) {
            setTimeout(() => {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    }

    // ==========================================================================
    // ⚡ PHASE 1: DUAL-LAYER CROSS-FADE BACKGROUND SWAP (Zero-Flash)
    // ==========================================================================
    const carModelSelect = document.getElementById('car-model');
    const searchModelSelect = document.getElementById('search-model');
    const heroBg = document.getElementById('hero-bg');
    const heroSlideshow = document.getElementById('hero-slideshow');

    // Create 2 static image elements for zero-flash cross-fading
    const bgLayers = [
        document.createElement('img'),
        document.createElement('img')
    ];

    if (heroBg) {
        bgLayers.forEach((img, idx) => {
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.position = 'absolute';
            img.style.inset = '0';
            img.style.opacity = '0';
            img.style.transition = 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
            img.style.zIndex = idx === 0 ? '-1' : '-2'; // layering
            heroBg.appendChild(img);
        });
    }

    let activeLayerIdx = 0;
    let slideshowFaded = false;

    if (heroSlideshow) {
        heroSlideshow.style.transition = 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
    }

    // Function to perform cross-fade background swap
    function triggerBackgroundSwap(imgUrl) {
        if (!imgUrl || !heroBg) return;

        const inactiveLayerIdx = 1 - activeLayerIdx;
        const activeLayer = bgLayers[activeLayerIdx];
        const inactiveLayer = bgLayers[inactiveLayerIdx];

        // Preload image
        const tempImg = new Image();
        tempImg.src = imgUrl;
        tempImg.onload = () => {
            inactiveLayer.src = imgUrl;
            
            // Swap layers Z-Index so the incoming image is on top
            inactiveLayer.style.zIndex = '-1';
            activeLayer.style.zIndex = '-2';
            
            // Transition opacity
            inactiveLayer.style.opacity = '1';
            activeLayer.style.opacity = '0';

            // Fade out slideshow on first change
            if (!slideshowFaded && heroSlideshow) {
                heroSlideshow.style.opacity = '0';
                slideshowFaded = true;
            }

            activeLayerIdx = inactiveLayerIdx;
        };
    }

    // Bind event for sell.html car select
    if (carModelSelect) {
        carModelSelect.addEventListener('change', function () {
            const selectedVal = this.value;
            const imgUrl = modelImages[selectedVal];
            if (imgUrl) {
                triggerBackgroundSwap(imgUrl);
            }
        });
    }

    // Map models to background images for search-model in index.html
    const modelImages = {
        'vf3': new URL('./assets/cars/vf3.jpg', import.meta.url).href,
        'vf5': new URL('./assets/cars/vf5.jpg', import.meta.url).href,
        'vf6': new URL('./assets/cars/vf6.jpg', import.meta.url).href,
        'vf7': new URL('./assets/cars/vf7.jpg', import.meta.url).href,
        'vf8': new URL('./assets/cars/vf8.jpg', import.meta.url).href,
        'vf9': new URL('./assets/cars/vf9.jpg', import.meta.url).href,
        'vfe34': new URL('./assets/cars/vfe34.jpg', import.meta.url).href,
        'lux-a': new URL('./assets/cars/lux-a.jpg', import.meta.url).href,
        'fadil': new URL('./assets/cars/fadil.jpg', import.meta.url).href
    };

    if (searchModelSelect) {
        searchModelSelect.addEventListener('change', function () {
            const selectedVal = this.value;
            const imgUrl = modelImages[selectedVal];
            if (imgUrl) {
                triggerBackgroundSwap(imgUrl);
            }
        });
    }

    // ==========================================================================
    // 🧬 TWO-STEP MORPHING CAPSULE FORM LOGIC (sell.html specific)
    // ==========================================================================
    const btnNextStep = document.getElementById('btn-next-step');
    const btnPrevStep = document.getElementById('btn-prev-step');
    const sellStep1 = document.getElementById('sell-step-1');
    const sellStep2 = document.getElementById('sell-step-2');
    const pricingForm = document.getElementById('pricing-form');

    if (btnNextStep && btnPrevStep && sellStep1 && sellStep2) {
        
        // STEP 1 -> STEP 2
        btnNextStep.addEventListener('click', () => {
            // Smoothly morph form height & transition steps
            sellStep1.classList.add('fade-out');
            
            setTimeout(() => {
                sellStep1.style.display = 'none';
                sellStep1.classList.remove('fade-out');
                
                // Show Step 2
                sellStep2.style.display = 'flex';
                sellStep2.classList.remove('hidden-setup');
                sellStep2.classList.add('fade-in');
            }, 350);
        });

        // STEP 2 -> STEP 1
        btnPrevStep.addEventListener('click', () => {
            sellStep2.classList.add('fade-out');
            
            setTimeout(() => {
                sellStep2.style.display = 'none';
                sellStep2.classList.remove('fade-out');
                sellStep2.classList.add('hidden-setup');
                
                // Show Step 1
                sellStep1.style.display = 'flex';
                sellStep1.classList.add('fade-in');
            }, 300);
        });
    }


    // ==========================================================================
    // 🚗 GRID FILTERS & PROMPT SEARCH (index.html specific)
    // ==========================================================================
    const filterPills = document.querySelectorAll('.filter-pill');
    const carsGrid = document.getElementById('cars-grid');

    if (carsGrid) {
        // Filter by pills
        filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                filterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');

                const filterVal = pill.getAttribute('data-filter');
                filterCarCards(filterVal);
            });
        });
    }

    function filterCarCards(filterVal) {
        const carCards = document.querySelectorAll('#cars-grid .expressive-car-card');
        carCards.forEach(card => {
            const modelType = card.getAttribute('data-model');
            let isMatch = false;
            if (filterVal === 'all') {
                isMatch = true;
            } else if (filterVal === 'gas') {
                isMatch = (modelType === 'gas' || modelType === 'fadil' || modelType === 'lux-a' || modelType === 'lux-sa');
            } else if (filterVal === 'vf5') {
                isMatch = (modelType === 'vf5');
            } else if (filterVal === 'limo') {
                isMatch = (modelType === 'limo');
            } else if (filterVal === 'mpv7') {
                isMatch = (modelType === 'mpv7' || modelType === 'vf9');
            } else {
                isMatch = (modelType === filterVal);
            }

            if (isMatch) {
                card.style.display = 'flex';
                setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => { card.style.display = 'none'; }, 300);
            }
        });
    }

    // Filter from Unified Prompt Pill Search Button
    const btnSearchTrigger = document.getElementById('btn-search-trigger');
    if (btnSearchTrigger) {
        btnSearchTrigger.addEventListener('click', (e) => {
            if (e) e.preventDefault();
            const selectModelSelect = document.getElementById('search-model');
            const selectPriceSelect = document.getElementById('search-price');
            const selectModel = selectModelSelect ? selectModelSelect.value : 'all';
            const selectPrice = selectPriceSelect ? selectPriceSelect.value : 'all';
            const carCards = document.querySelectorAll('#cars-grid .expressive-car-card');

            carCards.forEach(card => {
                const cardModel = card.getAttribute('data-model');
                const rawPrice = parseFloat(card.getAttribute('data-price'));
                const cardPrice = isNaN(rawPrice) ? 0 : rawPrice;
                
                let matchesModel = (
                    selectModel === 'all' || 
                    cardModel === selectModel || 
                    (selectModel === 'vf5' && (cardModel === 'vf5' || cardModel === 'limo')) ||
                    (selectModel === 'limo' && (cardModel === 'limo' || cardModel === 'vf5')) ||
                    (selectModel === 'gas' && (cardModel === 'gas' || cardModel === 'fadil' || cardModel === 'lux-a' || cardModel === 'lux-sa'))
                );
                
                let matchesPrice = true;
                if (selectPrice === 'under-400') matchesPrice = (cardPrice > 0 && cardPrice < 400);
                else if (selectPrice === '400-600') matchesPrice = (cardPrice >= 400 && cardPrice <= 600);
                else if (selectPrice === '600-800') matchesPrice = (cardPrice >= 600 && cardPrice <= 800);
                else if (selectPrice === 'over-800') matchesPrice = (cardPrice > 800);

                if (matchesModel && matchesPrice) {
                    card.style.display = 'flex';
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });

            // Auto scroll to products section
            const gridSection = document.getElementById('inventory') || document.getElementById('product-grid-section');
            if (gridSection) {
                gridSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // ==========================================================================
    // 🔢 STATS COUNTER ANIMATION
    // ==========================================================================
    function animateCounter(el, target, suffix = '', duration = 2200) {
        if (!el) return;
        let startTime = null;
        const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = easeOutQuart(progress);
            el.textContent = Math.floor(eased * target).toLocaleString('vi-VN') + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            const carsCounter = document.getElementById('counter-cars');
            const billCounter = document.getElementById('counter-billion');
            if (carsCounter) animateCounter(carsCounter, 1245);
            if (billCounter) animateCounter(billCounter, 50, ' Tỷ');
            counterObserver.disconnect();
        }
    }, { threshold: 0.2 });

    const socialProof = document.getElementById('social-proof');
    if (socialProof) counterObserver.observe(socialProof);

    // ==========================================================================
    // 📜 SCROLL REVEAL SYSTEM
    // ==========================================================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // ==========================================================================
    // 🔗 PROCESS DRAW CONNECTING LINE
    // ==========================================================================
    const processSection = document.getElementById('process-steps');
    if (processSection) {
        const lineObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                processSection.classList.add('line-drawn');
                lineObserver.disconnect();
            }
        }, { threshold: 0.4 });
        lineObserver.observe(processSection);
    }

    // ==========================================================================
    // ❓ FAQ ACCORDION (Max-Height cubic-bezier transition)
    // ==========================================================================
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');

                // Close all other items
                document.querySelectorAll('.faq-item.open').forEach(openItem => {
                    openItem.classList.remove('open');
                    openItem.querySelector('.faq-answer').style.maxHeight = null;
                });

                // Toggle current item
                if (!isOpen) {
                    item.classList.add('open');
                    const answer = item.querySelector('.faq-answer');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });

    // ==========================================================================
    // 💻 INTERACTIVE 360° DETAIL MODAL & TELEGRAM INTEGRATION
    // ==========================================================================
    const modal = document.getElementById('car-modal-view');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalOverlay = document.getElementById('modal-overlay');

    // Cloudinary Optimization Helper with High-DPI Retina Support (Enterprise 2026)
    function optimizeCloudinaryUrl(url, options = {}) {
        if (!url) return "./assets/cars/vf8.jpg"; // Default fallback
        if (!url.includes('cloudinary.com')) return url;

        // Auto-scale width for Retina High-DPI displays (Device Pixel Ratio up to 3x)
        const dpr = typeof window !== 'undefined' ? Math.min(Math.round(window.devicePixelRatio || 1), 3) : 1;
        const baseWidth = options.width || 800;
        const targetWidth = options.disableDpr ? baseWidth : Math.round(baseWidth * (dpr > 1 ? dpr * 0.85 : 1));
        const quality = options.quality || 'auto';
        const format = options.format || 'auto';
        const crop = options.crop || 'fill';

        const params = [
            `w_${targetWidth}`,
            `q_${quality}`,
            `f_${format}`,
            `c_${crop}`
        ];

        if (options.height) {
            params.push(`h_${options.height}`);
        }

        const transformation = params.join(',');

        if (url.includes('/upload/')) {
            return url.replace('/upload/', `/upload/${transformation}/`);
        }

        return url;
    }

    // Enterprise Modal Image RAM Cache & Preloader Engine (2026 Standard)
    const modalImageRamCache = new Map();

    function preloadModalImage(url) {
        if (!url) return Promise.resolve(null);
        if (modalImageRamCache.has(url)) {
            return Promise.resolve(modalImageRamCache.get(url));
        }
        return new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            const onComplete = () => {
                modalImageRamCache.set(url, img);
                resolve(img);
            };
            if ('decode' in img) {
                img.decode().then(onComplete).catch(onComplete);
            } else {
                img.onload = onComplete;
                img.onerror = onComplete;
            }
        });
    }

    function preloadAdjacentModalImages(images, activeIndex) {
        if (!images || images.length <= 1) return;
        const nextIdx = (activeIndex + 1) % images.length;
        const prevIdx = (activeIndex - 1 + images.length) % images.length;

        [nextIdx, prevIdx].forEach(idx => {
            const url = optimizeCloudinaryUrl(images[idx], { width: 800 });
            preloadModalImage(url);
        });
    }


    // Default static configurations for Telegram Bot
    const activeTelegramToken = '8354150269:AAF2da1-GZAXNgDVplWot053UDETG7CX5ss';
    const activeTelegramChatId = '2117317097';

    // Global Store for Loaded Vehicles and Details Map
    let loadedVehicles = [];
    let carDetailsData = {};

    function formatPriceText(priceInVND) {
        if (!priceInVND || priceInVND <= 0) return 'Liên hệ';
        if (priceInVND >= 1000000000) {
            return (priceInVND / 1000000000).toFixed(2).replace('.00', '').replace(/0+$/, '').replace(/\.$/, '') + ' Tỷ';
        }
        return Math.round(priceInVND / 1000000) + ' Triệu';
    }

    // Fetch and render vehicle list dynamically
    async function fetchAndRenderVehicles() {
        if (!carsGrid) return;

        // Use local static cars list
        if (window.staticCarsData) {
            console.log('Using local static cars list:', window.staticCarsData.length, 'vehicles');
            loadedVehicles = window.staticCarsData;
            renderLoadedVehicles();
        } else {
            console.warn('No static cars data available.');
            carsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--color-text-secondary);">
                    <p style="font-size: 1.1rem; font-weight: 500;">Kho xe hiện tại không khả dụng. Vui lòng quay lại sau!</p>
                </div>
            `;
        }
    }

    // Render vehicles in the UI cards grid
    function renderLoadedVehicles() {
        carDetailsData = {};

        if (loadedVehicles.length === 0) {
            carsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--color-text-secondary);">
                    <p style="font-size: 1.1rem; font-weight: 500;">Hiện tại toàn bộ xe đã được giao dịch. Vui lòng quay lại sau!</p>
                </div>
            `;
            return;
        }

        // Page-level model filter check (from HTML attribute data-filter-model="vf3", "vf5", etc.)
        const pageFilterModel = carsGrid.getAttribute('data-filter-model');

        // Clear skeletons
        carsGrid.innerHTML = '';

        loadedVehicles.forEach(car => {
            const nameLower = car.name.toLowerCase();
            const notesLower = (car.notes || '').toLowerCase();
            
            // Determine model filter value
            let modelType = 'gas';
            if (nameLower.includes('vf 3') || nameLower.includes('vf3')) modelType = 'vf3';
            else if (nameLower.includes('limo')) modelType = 'limo';
            else if (nameLower.includes('vf 5') || nameLower.includes('vf5')) modelType = 'vf5';
            else if (nameLower.includes('vf 6') || nameLower.includes('vf6')) modelType = 'vf6';
            else if (nameLower.includes('vf 7') || nameLower.includes('vf7')) modelType = 'vf7';
            else if (nameLower.includes('vf 8') || nameLower.includes('vf8')) modelType = 'vf8';
            else if (nameLower.includes('vf 9') || nameLower.includes('vf9')) modelType = 'vf9';
            else if (nameLower.includes('vfe34') || nameLower.includes('vf e34') || nameLower.includes('e34')) modelType = 'vfe34';
            else if (nameLower.includes('fadil')) modelType = 'fadil';
            else if (nameLower.includes('lux sa') || nameLower.includes('lux-sa')) modelType = 'lux-sa';
            else if (nameLower.includes('lux a') || nameLower.includes('lux-a')) modelType = 'lux-a';

            // Filter for single-model detail pages (e.g. vf3.html, vf5.html, lux-a.html)
            if (pageFilterModel && pageFilterModel !== 'all') {
                if (pageFilterModel === 'vf5' && (modelType === 'vf5' || modelType === 'limo')) {
                    // Allowed
                } else if (pageFilterModel === 'lux-a' && modelType === 'lux-a') {
                    // Allowed
                } else if (pageFilterModel === 'lux-sa' && modelType === 'lux-sa') {
                    // Allowed
                } else if (modelType !== pageFilterModel) {
                    return; // Skip cars that don't match the current page's target model
                }
            }

            const isElectric = modelType !== 'fadil' && modelType !== 'lux-a' && modelType !== 'lux-sa' && modelType !== 'gas';

            // Determine battery type status
            let resolvedBatteryType = car.battery_type || 'None';
            if (isElectric) {
                if (resolvedBatteryType === 'Mua Pin' || resolvedBatteryType === 'Mua Pin' || notesLower.includes('mua đứt') || notesLower.includes('pin mua') || notesLower.includes('mua pin')) {
                    resolvedBatteryType = 'Mua Pin';
                } else {
                    resolvedBatteryType = 'Pin Thuê';
                }
            }

            // Determine badge details
            let badgeText = 'Đã Check Hãng';
            let badgeClass = '';
            if (isElectric) {
                if (resolvedBatteryType === 'Mua Pin') {
                    badgeText = 'Mua Pin • Đã Check Hãng';
                    badgeClass = 'bg-emerald';
                } else {
                    badgeText = 'Pin Thuê • Đã Check Hãng';
                    badgeClass = '';
                }
            } else {
                if (nameLower.includes('premium') || nameLower.includes('cao cấp') || nameLower.includes('full') || nameLower.includes('pre')) {
                    badgeText = 'Xe Xăng • Bản Cao Cấp';
                    badgeClass = 'bg-orange';
                } else {
                    badgeText = 'Xe Xăng • Đã Check Hãng';
                    badgeClass = 'bg-orange';
                }
            }

            // Determine battery/engine description for modal
            let batteryText = 'Bảo hành pin chính hãng VinFast';
            if (isElectric) {
                if (resolvedBatteryType === 'Mua Pin') {
                    batteryText = 'Mua Pin';
                } else {
                    batteryText = 'Hợp đồng thuê pin cực lợi thế, sức khỏe pin > 85%';
                }
            } else {
                batteryText = 'Động cơ xăng bốc khỏe, vận hành êm ái, full lịch sử hãng';
            }

            const priceText = formatPriceText(car.sale_price);

            // Extract all vehicle images list (main image + detail images list)
            let carImages = [];
            if (car.image_url) carImages.push(car.image_url);
            if (car.detail_images_list) {
                const detailList = car.detail_images_list.split(',').map(u => u.trim()).filter(u => u.length > 0);
                detailList.forEach(u => {
                    if (!carImages.includes(u)) carImages.push(u);
                });
            }
            if (carImages.length === 0) carImages.push('./assets/cars/vf8.jpg');

            // Populate dynamic carDetailsData mapping for viewer modal gallery
            carDetailsData[car.id] = {
                title: car.name,
                price: priceText,
                class: `${isElectric ? 'DÒNG XE ĐIỆN' : 'ĐỘNG CƠ XĂNG'} · ĐỜI ${car.year || '2023'}`,
                odo: car.odo ? car.odo.toLocaleString('vi-VN') + ' km' : 'Siêu lướt',
                color: car.color || 'Bạc',
                batteryType: isElectric ? resolvedBatteryType : 'Không có (Xe xăng)',
                battery: batteryText,
                images: carImages,
                img: optimizeCloudinaryUrl(carImages[0], { width: 800 })
            };

            // Create Card Element
            const cardEl = document.createElement('div');
            cardEl.className = 'expressive-car-card reveal visible'; // immediate fade-in setup
            cardEl.setAttribute('data-model', modelType);
            cardEl.setAttribute('data-price', (car.sale_price / 1000000).toString());
            cardEl.setAttribute('data-car-id', car.id);

            cardEl.innerHTML = `
                <div class="card-top">
                    <!-- Image container aspect-[16/10] -->
                    <div class="card-img-container" style="cursor: pointer;">
                        <img src="${optimizeCloudinaryUrl(car.image_url, { width: 600 })}" alt="${car.name}" class="card-img" style="opacity: 1; width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='./assets/cars/vf8.jpg';">
                        <div class="card-badge ${badgeClass}">
                            <span>${badgeText}</span>
                        </div>
                    </div>
                    
                    <div class="card-body">
                        <div class="card-meta-line">
                            <span class="meta-tag-blue">${isElectric ? 'DÒNG XE ĐIỆN' : 'XE XĂNG LƯỚT'}</span>
                            <span class="meta-tag-gray">ĐỜI ${car.year || '2023'}</span>
                        </div>
                        <h3 class="card-title">${car.name}</h3>
                        
                        <!-- Pills specifications -->
                        <div class="spec-pills">
                            <span class="spec-pill">⏱️ ${car.odo ? car.odo.toLocaleString('vi-VN') + ' km' : 'Siêu lướt'}</span>
                            <span class="spec-pill">🎨 ${car.color || 'Nhiều màu'}</span>
                            ${isElectric ? `<span class="spec-pill">🔋 ${resolvedBatteryType}</span>` : ''}
                        </div>
                    </div>
                </div>
                
                <div class="card-bottom">
                    <div class="price-box">
                        <span class="price-label">Giá chào bán</span>
                        <span class="price-value">${priceText}</span>
                    </div>
                    <button class="btn-card-action btn-detail-trigger" type="button">
                        Xem Ưu Đãi
                    </button>
                </div>
            `;

            carsGrid.appendChild(cardEl);
        });
    }

    // Render Option 1: Thumbnail Filmstrip Gallery in Modal (Enterprise 2026 Engine)
    function renderModalGallery(visualPanel, images, title) {
        if (!visualPanel || !images || images.length === 0) return;

        let activeIndex = 0;
        let isTransitioning = false;

        const initialHeroUrl = optimizeCloudinaryUrl(images[0], { width: 800 });
        const initialBackdropUrl = optimizeCloudinaryUrl(images[0], { width: 60, quality: 30, disableDpr: true });

        visualPanel.innerHTML = `
            <div class="modal-gallery-container">
                <!-- Main Hero Display with Double-Buffer Stack & Gesture Support -->
                <div class="modal-hero-view" id="modal-hero-view">
                    <div id="modal-hero-backdrop" class="modal-hero-backdrop" style="background-image: url('${initialBackdropUrl}');"></div>
                    
                    <!-- Double-Buffer Hero Image Stack -->
                    <div class="modal-hero-stack" id="modal-hero-stack">
                        <div class="modal-skeleton-shimmer" id="modal-skeleton-shimmer"></div>
                        <img id="modal-display-img-bg" src="${initialHeroUrl}" alt="${title} - Ảnh 1/${images.length}" class="modal-active-img modal-active-img--bg">
                        <img id="modal-display-img" src="${initialHeroUrl}" alt="${title} - Ảnh 1/${images.length}" class="modal-active-img modal-active-img--fg is-active">
                    </div>

                    <!-- Gallery Counter Badge (WCAG 2.2 ARIA Live Region) -->
                    <div class="gallery-counter-badge" id="gallery-counter-badge" aria-live="polite" aria-atomic="true">
                        1 / ${images.length}
                    </div>

                    <!-- Lightbox Zoom Badge -->
                    <button type="button" class="gallery-zoom-badge" id="gallery-zoom-btn" title="Phóng to ảnh (Lightbox HD)" aria-label="Phóng to ảnh">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                    </button>

                    <!-- Nav Arrows -->
                    ${images.length > 1 ? `
                        <button type="button" class="gallery-nav-btn prev-btn" id="gallery-prev-btn" aria-label="Ảnh trước">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </button>
                        <button type="button" class="gallery-nav-btn next-btn" id="gallery-next-btn" aria-label="Ảnh tiếp">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    ` : ''}
                </div>

                <!-- Thumbnail Filmstrip Strip -->
                ${images.length > 1 ? `
                    <div class="modal-thumbnails-strip" id="modal-thumbnails-strip">
                        ${images.map((imgUrl, idx) => `
                            <button type="button" class="thumbnail-item ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                                <img src="${optimizeCloudinaryUrl(imgUrl, { width: 120, quality: 60, disableDpr: true })}" alt="${title} - Ảnh nhỏ ${idx + 1}/${images.length}" loading="lazy">
                            </button>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            <div class="modal-privileges-banner">
                <div class="privilege-header"><span class="privilege-icon">🏆</span><strong>ĐẶC QUYỀN MUA XE TẠI AUTO28</strong></div>
                <ul class="privilege-list">
                    <li><span class="priv-icon">🔍</span> Check/test hãng VinFast toàn quốc.</li>
                    <li><span class="priv-icon">📜</span> Cam kết đảm bảo pháp lý, không đâm đụng, thủy kích.</li>
                </ul>
            </div>
        `;


        const heroView = visualPanel.querySelector('#modal-hero-view');
        const heroStack = visualPanel.querySelector('#modal-hero-stack');
        const mainImgFg = visualPanel.querySelector('#modal-display-img');
        const mainImgBg = visualPanel.querySelector('#modal-display-img-bg');
        const shimmer = visualPanel.querySelector('#modal-skeleton-shimmer');
        const heroBackdrop = visualPanel.querySelector('#modal-hero-backdrop');
        const counterBadge = visualPanel.querySelector('#gallery-counter-badge');
        const zoomBtn = visualPanel.querySelector('#gallery-zoom-btn');
        const thumbs = visualPanel.querySelectorAll('.thumbnail-item');
        const dots = visualPanel.querySelectorAll('.gallery-dot');
        const prevBtn = visualPanel.querySelector('#gallery-prev-btn');
        const nextBtn = visualPanel.querySelector('#gallery-next-btn');

        // Initial preloading of adjacent images
        preloadAdjacentModalImages(images, 0);

        function updateActiveImage(index) {
            if (index < 0) index = images.length - 1;
            if (index >= images.length) index = 0;
            if (index === activeIndex && mainImgFg.src.length > 0 && !shimmer.classList.contains('is-loading')) return;

            activeIndex = index;
            isTransitioning = true;

            const nextImgUrl = optimizeCloudinaryUrl(images[activeIndex], { width: 800 });
            const thumbImgUrl = optimizeCloudinaryUrl(images[activeIndex], { width: 60, quality: 30, disableDpr: true });

            // Update counter badge & alt text for accessibility
            if (counterBadge) {
                counterBadge.textContent = `${activeIndex + 1} / ${images.length}`;
            }
            if (mainImgFg) {
                mainImgFg.setAttribute('alt', `${title} - Ảnh ${activeIndex + 1}/${images.length}`);
            }

            // Sync backdrop
            if (heroBackdrop) {
                heroBackdrop.style.backgroundImage = `url('${thumbImgUrl}')`;
            }

            // Sync thumbnails and dots active UI immediately
            thumbs.forEach((thumb, i) => {
                if (i === activeIndex) {
                    thumb.classList.add('active');
                    thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                } else {
                    thumb.classList.remove('active');
                }
            });

            dots.forEach((dot, i) => {
                if (i === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });

            // Double-Buffer Cross-Fade Swap Logic
            if (mainImgFg && mainImgBg) {
                // Set current active image as background buffer layer
                mainImgBg.src = mainImgFg.src;
                mainImgFg.classList.remove('is-active');

                // Check RAM cache or load async
                if (modalImageRamCache.has(nextImgUrl)) {
                    mainImgFg.src = nextImgUrl;
                    requestAnimationFrame(() => {
                        mainImgFg.classList.add('is-active');
                        isTransitioning = false;
                    });
                } else {
                    // Show shimmer indicator if network load required
                    if (shimmer) shimmer.classList.add('is-loading');

                    preloadModalImage(nextImgUrl).then(() => {
                        mainImgFg.src = nextImgUrl;
                        if (shimmer) shimmer.classList.remove('is-loading');
                        requestAnimationFrame(() => {
                            mainImgFg.classList.add('is-active');
                            isTransitioning = false;
                        });
                    });
                }
            }

            // Trigger background preloading for adjacent images (N+1, N-1)
            preloadAdjacentModalImages(images, activeIndex);
        }

        // Thumbnail Clicks
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(thumb.getAttribute('data-index'), 10);
                updateActiveImage(idx);
            });
        });

        // Navigation Buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                updateActiveImage(activeIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                updateActiveImage(activeIndex + 1);
            });
        }

        // Enterprise Mobile Touch & Pointer Swipe Engine
        if (heroView) {
            let startX = 0;
            let currentX = 0;
            let isDragging = false;
            let startTime = 0;

            heroView.addEventListener('pointerdown', (e) => {
                if (e.target.closest('.gallery-nav-btn') || e.target.closest('.gallery-zoom-badge')) return;
                isDragging = true;
                startX = e.clientX;
                currentX = startX;
                startTime = Date.now();
                heroView.style.cursor = 'grabbing';
            });

            heroView.addEventListener('pointermove', (e) => {
                if (!isDragging) return;
                currentX = e.clientX;
                const deltaX = currentX - startX;
                if (heroStack && Math.abs(deltaX) < 100) {
                    heroStack.style.transform = `translateX(${deltaX * 0.3}px)`;
                }
            });

            const handlePointerEnd = (e) => {
                if (!isDragging) return;
                isDragging = false;
                heroView.style.cursor = 'grab';

                if (heroStack) {
                    heroStack.style.transform = '';
                }

                const deltaX = currentX - startX;
                const duration = Date.now() - startTime;

                if (Math.abs(deltaX) > 40 && duration < 500) {
                    if (deltaX < 0) {
                        updateActiveImage(activeIndex + 1); // Swipe Left -> Next
                    } else {
                        updateActiveImage(activeIndex - 1); // Swipe Right -> Prev
                    }
                }
            };

            heroView.addEventListener('pointerup', handlePointerEnd);
            heroView.addEventListener('pointercancel', handlePointerEnd);
        }

        // Fullscreen Lightbox Zoom Modal Implementation with Instant Dual-Layer Speed Engine
        function openFullscreenLightbox() {
            const previewUrl = optimizeCloudinaryUrl(images[activeIndex], { width: 800, disableDpr: true });
            const hdUrl = optimizeCloudinaryUrl(images[activeIndex], { width: 1400, quality: 'auto:good', disableDpr: true });

            let lightboxOverlay = document.getElementById('modal-lightbox-overlay');

            if (!lightboxOverlay) {
                lightboxOverlay = document.createElement('div');
                lightboxOverlay.id = 'modal-lightbox-overlay';
                lightboxOverlay.className = 'modal-lightbox-overlay';
                document.body.appendChild(lightboxOverlay);
            }

            lightboxOverlay.innerHTML = `
                <div class="lightbox-backdrop"></div>
                <button class="lightbox-close-btn" id="lightbox-close-btn" aria-label="Đóng Lightbox">&times;</button>
                <div class="lightbox-counter">${activeIndex + 1} / ${images.length}</div>
                <div class="lightbox-image-wrapper">
                    <img src="${previewUrl}" alt="${title}" class="lightbox-hd-img" id="lightbox-hd-img" style="transition: opacity 0.25s ease;">
                </div>
                ${images.length > 1 ? `
                    <button class="lightbox-nav-btn prev" id="lightbox-prev-btn" aria-label="Ảnh trước">‹</button>
                    <button class="lightbox-nav-btn next" id="lightbox-next-btn" aria-label="Ảnh tiếp">›</button>
                ` : ''}
            `;

            lightboxOverlay.classList.add('is-open');

            const imgEl = lightboxOverlay.querySelector('#lightbox-hd-img');
            if (imgEl && hdUrl !== previewUrl) {
                preloadModalImage(hdUrl).then(() => {
                    if (imgEl && lightboxOverlay.classList.contains('is-open')) {
                        imgEl.src = hdUrl;
                    }
                });
            }

            // Preload adjacent HD images for zero-latency navigation
            const nextIdx = (activeIndex + 1) % images.length;
            const prevIdx = (activeIndex - 1 + images.length) % images.length;
            preloadModalImage(optimizeCloudinaryUrl(images[nextIdx], { width: 1400, quality: 'auto:good', disableDpr: true }));
            preloadModalImage(optimizeCloudinaryUrl(images[prevIdx], { width: 1400, quality: 'auto:good', disableDpr: true }));

            const closeBtn = lightboxOverlay.querySelector('#lightbox-close-btn');
            const backdrop = lightboxOverlay.querySelector('.lightbox-backdrop');
            const lbPrev = lightboxOverlay.querySelector('#lightbox-prev-btn');
            const lbNext = lightboxOverlay.querySelector('#lightbox-next-btn');

            const closeLightbox = () => {
                lightboxOverlay.classList.remove('is-open');
                document.removeEventListener('keydown', handleLbKeydown);
            };

            const updateLbImage = (newIdx) => {
                if (newIdx < 0) newIdx = images.length - 1;
                if (newIdx >= images.length) newIdx = 0;
                updateActiveImage(newIdx);

                const newPreviewUrl = optimizeCloudinaryUrl(images[newIdx], { width: 800, disableDpr: true });
                const newHdUrl = optimizeCloudinaryUrl(images[newIdx], { width: 1400, quality: 'auto:good', disableDpr: true });
                const targetImg = lightboxOverlay.querySelector('#lightbox-hd-img');
                const counterEl = lightboxOverlay.querySelector('.lightbox-counter');

                if (targetImg) {
                    targetImg.src = newPreviewUrl; // Instant preview load
                    preloadModalImage(newHdUrl).then(() => {
                        if (targetImg && targetImg.src.includes('800')) {
                            targetImg.src = newHdUrl;
                        }
                    });
                }
                if (counterEl) counterEl.textContent = `${newIdx + 1} / ${images.length}`;

                // Background preload next/prev HD images
                const nextN = (newIdx + 1) % images.length;
                const prevP = (newIdx - 1 + images.length) % images.length;
                preloadModalImage(optimizeCloudinaryUrl(images[nextN], { width: 1400, quality: 'auto:good', disableDpr: true }));
                preloadModalImage(optimizeCloudinaryUrl(images[prevP], { width: 1400, quality: 'auto:good', disableDpr: true }));
            };

            const handleLbKeydown = (e) => {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') updateLbImage(activeIndex - 1);
                if (e.key === 'ArrowRight') updateLbImage(activeIndex + 1);
            };

            if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
            if (backdrop) backdrop.addEventListener('click', closeLightbox);
            if (lbPrev) lbPrev.addEventListener('click', () => updateLbImage(activeIndex - 1));
            if (lbNext) lbNext.addEventListener('click', () => updateLbImage(activeIndex + 1));
            document.addEventListener('keydown', handleLbKeydown);
        }


        if (zoomBtn) {
            zoomBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openFullscreenLightbox();
            });
        }
    }

    // Call dynamic load on init
    fetchAndRenderVehicles();

    // Smart RAM Preload Engine on Card Hover / Pointerover (CRO & UX Instant Modal)
    const preloadedCardIds = new Set();
    document.addEventListener('pointerover', (e) => {
        const card = e.target.closest('.expressive-car-card');
        if (!card) return;
        const carId = card.getAttribute('data-car-id');
        if (!carId || preloadedCardIds.has(carId)) return;
        preloadedCardIds.add(carId);

        const carInfo = carDetailsData[carId] || carDetailsData[String(carId)];
        if (carInfo && carInfo.images && carInfo.images.length > 0) {
            // Preload hero images 1 & 2
            const heroUrl1 = optimizeCloudinaryUrl(carInfo.images[0], { width: 800 });
            preloadModalImage(heroUrl1);
            if (carInfo.images[1]) {
                const heroUrl2 = optimizeCloudinaryUrl(carInfo.images[1], { width: 800 });
                preloadModalImage(heroUrl2);
            }
            // Preload lightweight thumbnails into browser cache
            carInfo.images.forEach(imgUrl => {
                const thumbUrl = optimizeCloudinaryUrl(imgUrl, { width: 120, quality: 60, disableDpr: true });
                preloadModalImage(thumbUrl);
            });
        }
    }, { passive: true });

    // Event Delegation to handle dynamic modal clicks (Click whole card or action button)
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.expressive-car-card');
        if (!card) return;

        // Ignore clicks if user clicked a direct phone or link inside card
        if (e.target.closest('a') && !e.target.closest('.btn-detail-trigger')) return;

        e.preventDefault();
        e.stopPropagation();

        const carId = card.getAttribute('data-car-id');
        const carInfo = carDetailsData[carId] || carDetailsData[String(carId)];

        if (carInfo) {
            // Safely populate text info
            const titleEl = document.getElementById('modal-car-title');
            if (titleEl) titleEl.textContent = carInfo.title;

            const classEl = document.getElementById('modal-car-class');
            if (classEl) classEl.textContent = carInfo.class;

            const priceEl = document.getElementById('modal-car-price');
            if (priceEl) priceEl.textContent = carInfo.price;

            const odoEl = document.getElementById('modal-spec-odo');
            if (odoEl) odoEl.textContent = carInfo.odo;

            const colorEl = document.getElementById('modal-spec-color');
            if (colorEl) colorEl.textContent = carInfo.color;

            const qualityEl = document.getElementById('modal-spec-quality');
            if (qualityEl) qualityEl.textContent = '142 bước kiểm định';



            const batteryEl = document.getElementById('modal-spec-battery');
            if (batteryEl) batteryEl.textContent = carInfo.battery;

            // Render Filmstrip Gallery Option 1
            const targetModal = document.getElementById('car-modal-view') || modal;
            if (targetModal) {
                const visualPanel = targetModal.querySelector('.modal-visual-panel');
                if (visualPanel) {
                    renderModalGallery(visualPanel, carInfo.images, carInfo.title);
                }
            }

            // Add data reference for the submit action in modal
            const submitBtn = document.getElementById('btn-modal-action-submit');
            if (submitBtn) submitBtn.setAttribute('data-car-name', carInfo.title);

            // WCAG 2.2 AA Focus Trap & Keyboard Navigation Setup
            let previousActiveElement = document.activeElement;

            const handleModalKeydown = (e) => {
                if (!targetModal.classList.contains('open')) return;

                // Keyboard Arrow Left/Right Navigation
                if (e.key === 'ArrowLeft') {
                    if (prevBtn) prevBtn.click();
                } else if (e.key === 'ArrowRight') {
                    if (nextBtn) nextBtn.click();
                }

                // WCAG 2.2 Focus Trap Engine
                if (e.key === 'Tab') {
                    const focusableEls = targetModal.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    if (focusableEls.length === 0) return;

                    const firstEl = focusableEls[0];
                    const lastEl = focusableEls[focusableEls.length - 1];

                    if (e.shiftKey) { // Shift + Tab
                        if (document.activeElement === firstEl) {
                            lastEl.focus();
                            e.preventDefault();
                        }
                    } else { // Tab
                        if (document.activeElement === lastEl) {
                            firstEl.focus();
                            e.preventDefault();
                        }
                    }
                }
            };

            // Show modal
            if (targetModal) {
                targetModal.classList.add('open');
                targetModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden'; // Lock body scroll

                // Attach Focus Trap & Keydown listener
                window.addEventListener('keydown', handleModalKeydown);
                targetModal._handleKeydown = handleModalKeydown;

                // Auto-focus the fullname input (#modal-name) for high CRO conversion UX
                const nameInput = targetModal.querySelector('#modal-name') || targetModal.querySelector('input');
                if (nameInput) {
                    setTimeout(() => nameInput.focus(), 60);
                }

            }
        }
    });

    // Close modal functions
    function closeModal() {
        const targetModal = document.getElementById('car-modal-view') || modal;
        if (targetModal) {
            if (targetModal._handleKeydown) {
                window.removeEventListener('keydown', targetModal._handleKeydown);
                targetModal._handleKeydown = null;
            }
            targetModal.classList.remove('open');
            targetModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Anti-Accidental Touch Confirmation Engine for Quick Actions
    document.addEventListener('click', (e) => {
        const callBtn = e.target.closest('#btn-quick-call');
        if (callBtn) {
            if (!confirm('📞 Bạn có muốn gọi trực tiếp đến Hotline Auto28 (0888.81.38.38) để nhận tư vấn ngay?')) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    });

    // ⚡ LIVE PHONE FORMATTING & REAL-TIME VALIDATION
    document.addEventListener('input', (e) => {
        if (e.target && e.target.id === 'modal-phone') {
            const input = e.target;
            const feedback = document.getElementById('modal-phone-feedback');
            
            // Format phone number into clean spaces: 0888 813 838
            let raw = input.value.replace(/\D/g, '');
            if (raw.length > 10) raw = raw.slice(0, 10);
            
            let formatted = raw;
            if (raw.length > 7) {
                formatted = `${raw.slice(0, 4)} ${raw.slice(4, 7)} ${raw.slice(7)}`;
            } else if (raw.length > 4) {
                formatted = `${raw.slice(0, 4)} ${raw.slice(4)}`;
            }
            input.value = formatted;

            // Live Regex check for VN mobile phones
            const phoneRegex = /^(0)(3|5|7|8|9)\d{8}$/;
            if (feedback) {
                if (raw.length === 0) {
                    feedback.textContent = '';
                    feedback.className = 'modal-input-feedback';
                } else if (phoneRegex.test(raw)) {
                    feedback.textContent = '✓ Số di động Việt Nam hợp lệ';
                    feedback.className = 'modal-input-feedback valid';
                } else if (raw.length < 10) {
                    feedback.textContent = `Nhập đủ 10 số di động (Còn ${10 - raw.length} số)`;
                    feedback.className = 'modal-input-feedback';
                } else {
                    feedback.textContent = '❌ Số điện thoại không đúng đầu số di động VN (03,05,07,08,09)';
                    feedback.className = 'modal-input-feedback invalid';
                }
            }
        }
    });

    // 📱 MOBILE TOUCH SWIPE-TO-DISMISS GESTURE ENGINE
    const dragHandle = document.getElementById('modal-drag-indicator');
    const modalWrapper = document.querySelector('#car-modal-view .modal-wrapper');
    if (modalWrapper && dragHandle) {
        let startY = 0;
        let currentY = 0;
        let isDragging = false;

        dragHandle.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            isDragging = true;
            modalWrapper.style.transition = 'none';
        }, { passive: true });

        dragHandle.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentY = e.touches[0].clientY;
            const deltaY = currentY - startY;
            if (deltaY > 0) {
                modalWrapper.style.transform = `translateY(${deltaY}px)`;
            }
        }, { passive: true });

        dragHandle.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            const deltaY = currentY - startY;
            modalWrapper.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            if (deltaY > 75) {
                modalWrapper.style.transform = 'translateY(100%)';
                setTimeout(() => {
                    closeModal();
                    modalWrapper.style.transform = '';
                }, 300);
            } else {
                modalWrapper.style.transform = 'translateY(0)';
            }
        });
    }

    // ESC key closes modal
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Modal submit handler
    const leadForm = document.getElementById('lead-form');
if (leadForm && leadForm.dataset.listenerAttached) return;
if (leadForm) leadForm.dataset.listenerAttached = 'true';
    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btnModalSubmit = document.getElementById('btn-modal-action-submit');
            const carName = btnModalSubmit ? btnModalSubmit.getAttribute('data-car-name') : 'Xe VinFast';
            const name = document.getElementById('modal-name') ? document.getElementById('modal-name').value.trim() : '';
            let phone = document.getElementById('modal-phone') ? document.getElementById('modal-phone').value.trim() : '';
            phone = phone.replace(/[\s.-]/g, '');
            const confirmCheckbox = document.getElementById('confirm-intent');

            // 🛡️ 1. ANTI-BOT HONEYPOT TRAP CHECK
            const hpField = document.getElementById('modal-hp-field');
            if (hpField && hpField.value && hpField.value.trim().length > 0) {
                console.warn('⚠️ Anti-Bot Honeypot Triggered: Automated bot submission rejected.');
                alert('🎉 Cảm ơn bạn! Thông tin đã được ghi nhận.');
                closeModal();
                return;
            }

            if (!name) {
                alert('Vui lòng nhập Họ tên của bạn!');
                return;
            }
            
            // Regex validation for Vietnam mobile phone number
            const phoneRegex = /^(0|84)?(3|5|7|8|9)\d{8}$/;
            if (!phoneRegex.test(phone)) {
                alert('Số điện thoại không đúng định dạng di động Việt Nam. Vui lòng kiểm tra lại!');
                return;
            }

            const originalText = btnModalSubmit.textContent;
            btnModalSubmit.textContent = '⏳ ĐANG GỬI...';
            btnModalSubmit.disabled = true;

            // CONFIG TELEGRAM BOT
            const TELEGRAM_TOKEN = activeTelegramToken; 
            const TELEGRAM_CHAT_ID = activeTelegramChatId; 

            const message = `
<b>🔥 YÊU CẦU MUA XE / NHẬN ƯU ĐÃI</b>
--------------------------
🚗 <b>Dòng xe quan tâm:</b> ${carName}
👤 <b>Họ tên khách hàng:</b> ${name}
📞 <b>Số điện thoại khách:</b> <a href="tel:${phone}">${phone}</a>
--------------------------
⏰ <b>Gửi lúc:</b> ${new Date().toLocaleString('vi-VN')}
            `;

            const params = new URLSearchParams({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML',
                disable_web_page_preview: true
            });

            try {
                const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?${params.toString()}`);
                if (response.ok) {
                    // Analytics & GTM DataLayer trigger
                    if (typeof gtag === 'function') {
                        gtag('event', 'generate_lead', {
                            'event_category': 'Conversion',
                            'event_label': 'Modal Xem Ưu Đãi Mua Xe',
                            'car_model': carName
                        });
                    }

                    // GTM DataLayer Push
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        'event': 'form_lead_success',
                        'form_id': 'car_modal_lead_form',
                        'form_name': 'Form Nhận Ưu Đãi Chi Tiết Xe',
                        'car_model': carName,
                        'event_id': 'lead_modal_' + new Date().getTime()
                    });

                    // Meta Pixel / FB Lead Event
                    if (typeof fbq === 'function') {
                        fbq('track', 'Lead', { content_name: carName });
                    }

                    btnModalSubmit.textContent = '✅ ĐÃ GỬI!';
                    btnModalSubmit.style.background = '#16a34a';

                    // Render Neural Expressive Liquid Glass Success Toast Card
                    const actionBox = document.getElementById('modal-action-box');
                    if (actionBox) {
                        actionBox.innerHTML = `
                            <div class="lead-success-card">
                                <div style="font-size: 2.8rem; margin-bottom: 6px;">🎉</div>
                                <h3 style="font-size: 1.15rem; font-weight: 800; color: #047857; margin-bottom: 6px;">Đăng Ký Thành Công!</h3>
                                <p style="font-size: 0.85rem; color: #334155; line-height: 1.5; margin-bottom: 14px;">Auto28 đã nhận thông tin tư vấn xe <strong>${carName}</strong>. Chuyên viên sẽ liên hệ gửi bảng giá &amp; ưu đãi qua Zalo trong 5 phút!</p>
                                <button type="button" class="btn-modal-submit" onclick="document.getElementById('car-modal-view').classList.remove('open'); document.body.style.overflow='';" style="padding: 10px 24px; font-size: 0.85rem; background: #059669; border: none; width: auto; display: inline-block;">✓ CẢM ƠN</button>
                            </div>
                        `;
                    }
                } else {
                    throw new Error('API error');
                }
            } catch (err) {
                console.error(err);
                btnModalSubmit.textContent = '❌ LỖI GỬI!';
                btnModalSubmit.style.background = '#dc2626';
                setTimeout(() => {
                    btnModalSubmit.textContent = originalText;
                    btnModalSubmit.disabled = false;
                    btnModalSubmit.style.background = '';
                }, 2000);
            }
        });
    }

    // ==========================================================================
    // 🏠 PARALLAX MOUSE TILT (Collision-Free)
    // ==========================================================================
    const heroContent = document.querySelector('.hero__content');
    const heroSection_move = document.getElementById('hero');
    
    if (heroSection_move && heroContent) {
        heroSection_move.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const moveX = (clientX - centerX) / 60;
            const moveY = (clientY - centerY) / 60;
            
            heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
            
            const form = document.getElementById('pricing-form');
            if (form) {
                const rotateX = (clientY - centerY) / 80;
                const rotateY = (clientX - centerX) / 80;
                form.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
    }

    // ==========================================================================
    // 📱 STICKY FOOTER NAVIGATION DISPLAY
    // ==========================================================================
    const stickyFooter = document.getElementById('sticky-cta');
    const heroSection = document.getElementById('hero');

    if (stickyFooter && heroSection) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > heroSection.offsetHeight * 0.5) {
                stickyFooter.classList.add('visible');
            } else {
                stickyFooter.classList.remove('visible');
            }
        }, { passive: true });
    }

    // ==========================================================================
    // 🔋 BOKEH PARTICLES GENERATOR
    // ==========================================================================
    const bokehContainer = document.getElementById('hero-bokeh');
    if (bokehContainer) {
        for (let i = 0; i < 12; i++) {
            const bokeh = document.createElement('div');
            bokeh.className = 'bokeh-item';
            const size = Math.random() * 15 + 10;
            bokeh.style.width = `${size}px`;
            bokeh.style.height = `${size}px`;
            bokeh.style.left = `${Math.random() * 100}%`;
            bokeh.style.animationDelay = `${Math.random() * 10}s`;
            bokeh.style.animationDuration = `${Math.random() * 8 + 8}s`;
            bokehContainer.appendChild(bokeh);
        }
    }

    // ==========================================================================
    // 🎯 HERO PRIMARY CTA: SEND LEADS TO TELEGRAM (sell.html specific)
    // ==========================================================================
    const pricingFormLoadTime = Date.now();
    const pricingFormElement = document.getElementById('pricing-form');
    if (pricingFormElement) {
        pricingFormElement.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const ctaBtn = document.getElementById('cta-primary');
            const originalText = ctaBtn ? ctaBtn.textContent : 'NHẬN BÁO GIÁ MIỄN PHÍ NGAY';
            
            // 🛡️ 1. CHỐNG BOT SPAM TỰ ĐỘNG ĐIỀN (HONEYPOT BẪY)
            const honeypot = document.getElementById('txt-honeypot');
            if (honeypot && honeypot.value.trim() !== '') {
                console.warn('Spam Bot detected via Honeypot field!');
                if (ctaBtn) {
                    ctaBtn.textContent = '✅ ĐÃ GỬI THÀNH CÔNG!';
                    ctaBtn.style.background = '#16a34a';
                    ctaBtn.disabled = true;
                    setTimeout(() => {
                        ctaBtn.textContent = originalText;
                        ctaBtn.disabled = false;
                        ctaBtn.style.background = '';
                        document.getElementById('customer-phone').value = '';
                    }, 2500);
                }
                return;
            }

            // 🛡️ 2. CHỐNG BOT SPAM TỰ ĐỘNG ĐIỀN (TIME-LOCK)
            const timeElapsed = (Date.now() - pricingFormLoadTime) / 1000;
            if (timeElapsed < 3.0) {
                console.warn('Spam Bot detected via fast submission speed:', timeElapsed, 'seconds.');
                if (ctaBtn) {
                    ctaBtn.textContent = '✅ ĐÃ GỬI THÀNH CÔNG!';
                    ctaBtn.style.background = '#16a34a';
                    ctaBtn.disabled = true;
                    setTimeout(() => {
                        ctaBtn.textContent = originalText;
                        ctaBtn.disabled = false;
                        ctaBtn.style.background = '';
                        document.getElementById('customer-phone').value = '';
                    }, 2500);
                }
                return;
            }

            const modelSelect = document.getElementById('car-model');
            const modelName = modelSelect ? modelSelect.options[modelSelect.selectedIndex].text : 'Xe VinFast';
            const year = document.getElementById('year') ? document.getElementById('year').value : '';
            const km = document.getElementById('km') ? document.getElementById('km').value : '';
            let phone = document.getElementById('customer-phone') ? document.getElementById('customer-phone').value.trim() : '';
            phone = phone.replace(/[\s.-]/g, '');
            const confirmCheckbox = document.getElementById('confirm-intent-sell');

            if (!phone) {
                alert('Vui lòng điền Số điện thoại để nhận định giá sơ bộ!');
                return;
            }

            const phoneRegex = /^(0|84)?(3|5|7|8|9)\d{8}$/;
            if (!phoneRegex.test(phone)) {
                alert('Số điện thoại không đúng định dạng di động Việt Nam. Vui lòng kiểm tra lại!');
                return;
            }

            if (!confirmCheckbox || !confirmCheckbox.checked) {
                alert('Vui lòng tích xác nhận đồng ý nhận thông tin hồ sơ!');
                return;
            }

            ctaBtn.textContent = '⏳ ĐANG ĐỊNH GIÁ AI...';
            ctaBtn.disabled = true;

            const TELEGRAM_TOKEN = activeTelegramToken; 
            const TELEGRAM_CHAT_ID = activeTelegramChatId; 

            const message = `
<b>🚀 YÊU CẦU BÁO GIÁ THU MUA MỚI (AI)</b>
--------------------------
🚗 <b>Dòng xe cũ:</b> ${modelName}
📅 <b>Năm sản xuất:</b> ${year}
🛣️ <b>Số Odo:</b> ${km}
📞 <b>Số điện thoại:</b> <a href="tel:${phone}">${phone}</a>
--------------------------
⏰ <b>Gửi lúc:</b> ${new Date().toLocaleString('vi-VN')}
            `;

            const params = new URLSearchParams({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML',
                disable_web_page_preview: true
            });

            try {
                const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?${params.toString()}`);
                if (response.ok) {
                    if (typeof gtag === 'function') {
                        gtag('event', 'generate_lead', {
                            'event_category': 'Conversion',
                            'event_label': 'Form Định Giá Thu Mua Hero',
                            'car_model': modelName,
                            'car_year': year,
                            'car_km': km
                        });
                        
                        gtag('event', 'conversion', {
                            'send_to': 'AW-18153153954',
                            'value': 1.0,
                            'currency': 'VND'
                        });
                    }

                    // GTM Datalayer Push
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        'event': 'form_lead_success',
                        'form_id': 'hero_pricing_form_sell',
                        'form_name': 'Form Định Giá Thu Mua Xe',
                        'car_model': modelName,
                        'car_year': year,
                        'car_km': km,
                        'event_id': 'lead_sell_' + new Date().getTime()
                    });

                    if (typeof fbq === 'function') fbq('track', 'Lead', { content_name: modelName });
                    if (typeof ttq === 'function') ttq.track('CompleteRegistration', { content_name: modelName });

                    ctaBtn.textContent = '✅ ĐÃ GỬI THÀNH CÔNG!';
                    ctaBtn.style.background = '#16a34a';

                    setTimeout(() => {
                        ctaBtn.textContent = originalText;
                        ctaBtn.disabled = false;
                        ctaBtn.style.background = '';
                        document.getElementById('customer-phone').value = '';
                        if (document.getElementById('confirm-intent-sell')) document.getElementById('confirm-intent-sell').checked = false;
                        
                        // Reset the form step back to step 1 smoothly
                        if (sellStep1 && sellStep2) {
                            sellStep2.style.display = 'none';
                            sellStep2.classList.remove('fade-out');
                            sellStep2.classList.add('hidden-setup');
                            
                            sellStep1.style.display = 'flex';
                            sellStep1.classList.add('fade-in');
                        }
                    }, 2500);
                } else {
                    throw new Error('Telegram API error');
                }
            } catch (err) {
                console.error(err);
                ctaBtn.textContent = '❌ LỖI GỬI. HÃY GỌI HOTLINE!';
                ctaBtn.style.background = '#dc2626';
                setTimeout(() => {
                    ctaBtn.textContent = originalText;
                    ctaBtn.disabled = false;
                    ctaBtn.style.background = '';
                }, 2500);
            }
        });
    }

    // ==========================================================================
    // 🎠 TESTIMONIAL SLIDER AUTOMATION
    // ==========================================================================
    const slider = document.querySelector('.testimonial-slider');
    const dots = document.querySelectorAll('.dot');
    
    if (slider && dots.length > 0) {
        let isPaused = false;
        let scrollInterval;

        slider.addEventListener('scroll', () => {
            const index = Math.round(slider.scrollLeft / slider.offsetWidth);
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }, { passive: true });

        const startAutoScroll = () => {
            scrollInterval = setInterval(() => {
                if (isPaused) return;
                const maxScroll = slider.scrollWidth - slider.offsetWidth;
                if (slider.scrollLeft >= maxScroll - 10) {
                    slider.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    slider.scrollBy({ left: slider.offsetWidth, behavior: 'smooth' });
                }
            }, 5000);
        };

        slider.addEventListener('mouseenter', () => isPaused = true);
        slider.addEventListener('mouseleave', () => isPaused = false);
        slider.addEventListener('touchstart', () => isPaused = true, { passive: true });
        slider.addEventListener('touchend', () => {
            setTimeout(() => isPaused = false, 2000);
        }, { passive: true });

        startAutoScroll();
    }

    // ==========================================================================
    // 🚀 MOBILE SLIDESHOW AUTOMATION
    // ==========================================================================
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

    // ==========================================================================
    // 🔌 EV GUIDE FORM SUBMISSION LOGIC (guide-ev.html specific)
    // ==========================================================================
    const leadFormEv = document.getElementById('lead-form-ev');
    if (leadFormEv) {
        leadFormEv.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btnSubmit = document.getElementById('btn-ev-submit-action');
            const name = document.getElementById('modal-name-ev').value.trim();
            const phone = document.getElementById('modal-phone-ev').value.trim();
            const confirmCheckbox = document.getElementById('confirm-intent-ev');

            // 1. Validation check
            if (!name) {
                alert('Vui lòng nhập Họ tên của bạn!');
                return;
            }
            
            const phoneRegex = /^(0|84)?(3|5|7|8|9)\d{8}$/;
            if (!phoneRegex.test(phone)) {
                alert('Số điện thoại không đúng định dạng di động Việt Nam. Vui lòng kiểm tra lại!');
                return;
            }

            if (!confirmCheckbox || !confirmCheckbox.checked) {
                alert('Vui lòng tích xác nhận đồng ý nhận tài liệu!');
                return;
            }

            const originalText = btnSubmit.textContent;
            btnSubmit.textContent = '⏳ ĐANG GỬI YÊU CẦU...';
            btnSubmit.disabled = true;

            const TELEGRAM_TOKEN = activeTelegramToken;
            const TELEGRAM_CHAT_ID = activeTelegramChatId;

            const message = `
<b>⚡ ĐĂNG KÝ NHẬN CẨM NANG MUA XE ĐIỆN LƯỚT</b>
--------------------------
👤 <b>Họ tên:</b> ${name}
📞 <b>Số điện thoại:</b> <a href="tel:${phone}">${phone}</a>
📚 <b>Tài liệu yêu cầu:</b> Cẩm Nang Mua Xe Điện Lướt PDF
--------------------------
⏰ <b>Gửi lúc:</b> ${new Date().toLocaleString('vi-VN')}
            `;

            const params = new URLSearchParams({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML',
                disable_web_page_preview: true
            });

            try {
                const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?${params.toString()}`);
                if (response.ok) {
                    // Analytics trigger (GA4, GTM, FB, TT)
                    if (typeof gtag === 'function') {
                        gtag('event', 'generate_lead', {
                            'event_category': 'Conversion',
                            'event_label': 'Download Cẩm Nang Xe Điện',
                            'car_model': 'EV Guide'
                        });
                        
                        gtag('event', 'conversion', {
                            'send_to': 'AW-18153153954',
                            'value': 1.0,
                            'currency': 'VND'
                        });
                    }

                    // GTM DataLayer Push
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        'event': 'form_submit_success',
                        'form_id': 'lead_form_ev',
                        'car_model': 'EV Guide'
                    });

                    if (typeof fbq === 'function') fbq('track', 'Lead', { content_name: 'EV Guide' });
                    if (typeof ttq === 'function') ttq.track('CompleteRegistration', { content_name: 'EV Guide' });

                    btnSubmit.textContent = '✅ ĐÃ GỬI THÀNH CÔNG!';
                    btnSubmit.style.background = '#16a34a';

                    // Redirect to PDF file download after 1.5 seconds
                    setTimeout(() => {
                        window.open('./Ca%CC%82m_nang_Mua_xe_đie%CC%A3%CC%82n_lu%CC%9B%C3%B3%CC%81t.pdf', '_blank');
                        btnSubmit.textContent = originalText;
                        btnSubmit.disabled = false;
                        btnSubmit.style.background = '';
                        document.getElementById('modal-name-ev').value = '';
                        document.getElementById('modal-phone-ev').value = '';
                        confirmCheckbox.checked = false;
                    }, 1500);
                } else {
                    throw new Error('Telegram API error');
                }
            } catch (err) {
                console.error(err);
                btnSubmit.textContent = '❌ LỖI GỬI. HÃY GỌI HOTLINE!';
                btnSubmit.style.background = '#dc2626';
                setTimeout(() => {
                    btnSubmit.textContent = originalText;
                    btnSubmit.disabled = false;
                    btnSubmit.style.background = '';
                }, 2500);
            }
        });
    }

    // ==========================================================================
    // 📝 CHECKLIST PERSISTENCE IN LOCALSTORAGE (GUIDE & GUIDE-EV)
    // ==========================================================================
    const checklistForms = document.querySelectorAll('.clipboard');
    checklistForms.forEach(form => {
        const formId = form.id || 'generic-checklist';
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        
        // Restore checked state
        checkboxes.forEach((cb, index) => {
            const savedState = localStorage.getItem(`auto28_${formId}_cb_${index}`);
            if (savedState === 'true') {
                cb.checked = true;
            }
            
            cb.addEventListener('change', () => {
                localStorage.setItem(`auto28_${formId}_cb_${index}`, cb.checked);
            });
        });
    });
});

