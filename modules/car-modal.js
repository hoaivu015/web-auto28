/**
 * Auto 28 Landing Page - Car Modal 360 UI Module
 * Safe Refactoring Standard: Tier-1 Enterprise (ES2025 Compliant)
 * DNA: Neural Expressive 2.0 + AbortController Lifecycle Management
 */
(function () {
    'use strict';

    const SVG_FALLBACK_CAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='100%25' height='100%25' fill='%23f1f5f9'/%3E%3Cpath d='M250 250l50-60 60 70 80-100 110 140H250z' fill='%23cbd5e1'/%3E%3Ccircle cx='310' cy='180' r='25' fill='%23cbd5e1'/%3E%3Ctext x='50%25' y='80%25' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='sans-serif' font-size='20' font-weight='600'%3EAuto 28 - Hình ảnh xe%3C/text%3E%3C/svg%3E";

    let modalAbortController = null;

    function formatCloudinaryUrl(url, maxDim = 380) {
        if (!url || typeof url !== 'string') return SVG_FALLBACK_CAR;
        if (url.includes('cloudinary.com') && url.includes('/upload/')) {
            const cleanUrl = url.replace(/\/upload\/(?:[^\/]+\/)?(v\d+\/)/, '/upload/$1');
            return cleanUrl.replace('/upload/', `/upload/w_${maxDim},c_limit,f_auto,q_auto/`);
        }
        return url;
    }

    function getCloudinarySrcset(url) {
        if (!url || typeof url !== 'string' || !url.includes('cloudinary.com') || !url.includes('/upload/')) return '';
        const base380 = formatCloudinaryUrl(url, 380);
        const base640 = formatCloudinaryUrl(url, 640);
        const base960 = formatCloudinaryUrl(url, 960);
        return `${base380} 380w, ${base640} 640w, ${base960} 960w`;
    }

    function renderStaticVehicles() {
        const dateEl = document.getElementById('live-inventory-date');
        if (dateEl) {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            dateEl.textContent = `${day}/${month}/${year}`;
        }

        const carsGrid = document.getElementById('cars-grid');
        if (!carsGrid) return;

        const vehicles = window.staticCarsData || [];
        if (!vehicles.length) {
            carsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--color-text-secondary);">
                    <p style="font-size: 1.1rem; font-weight: 500;">Hiện tại toàn bộ xe đã được giao dịch. Vui lòng quay lại sau!</p>
                </div>
            `;
            return;
        }

        carsGrid.innerHTML = '';
        window.carDetailsData = window.carDetailsData || {};
        const fragment = document.createDocumentFragment();

        vehicles.forEach(car => {
            const nameLower = (car.name || '').toLowerCase();
            const notesLower = (car.notes || '').toLowerCase();

            let modelType = 'gas';
            if (nameLower.includes('vf 3') || nameLower.includes('vf3')) modelType = 'vf3';
            else if (nameLower.includes('vf 5') || nameLower.includes('vf5')) modelType = 'vf5';
            else if (nameLower.includes('vf 6') || nameLower.includes('vf6')) modelType = 'vf6';
            else if (nameLower.includes('vf 7') || nameLower.includes('vf7')) modelType = 'vf7';
            else if (nameLower.includes('vf 8') || nameLower.includes('vf8')) modelType = 'vf8';
            else if (nameLower.includes('vf 9') || nameLower.includes('vf9')) modelType = 'vf9';
            else if (nameLower.includes('e34') || nameLower.includes('vfe34')) modelType = 'vfe34';
            else if (nameLower.includes('limo')) modelType = 'limo';
            else if (nameLower.includes('mpv')) modelType = 'mpv';
            else if (nameLower.includes('lux sa') || nameLower.includes('luxsa')) modelType = 'lux-sa';
            else if (nameLower.includes('lux a') || nameLower.includes('luxa')) modelType = 'lux-a';
            else if (nameLower.includes('fadil')) modelType = 'fadil';

            const isElectric = nameLower.includes('vf') || nameLower.includes('e34') || nameLower.includes('điện') || nameLower.includes('limo') || nameLower.includes('mpv');

            let priceInMillions = 0;
            if (car.sale_price && car.sale_price > 0) {
                priceInMillions = Math.round(car.sale_price / 1000000);
            }

            let priceText = '';
            if (priceInMillions >= 1000) {
                priceText = (priceInMillions / 1000).toFixed(2).replace('.00', '').replace(/0+$/, '') + ' Tỷ';
            } else if (priceInMillions > 0) {
                priceText = priceInMillions + ' Triệu';
            } else {
                priceText = 'Liên hệ';
            }


            const yearVal = car.year || '2024';
            const odoText = car.odo ? car.odo.toLocaleString('vi-VN') + ' km' : 'Siêu lướt';
            const colorText = car.color ? car.color.replace(/^Màu\s+/i, '') : 'Bạc';
            const batteryTypeLabel = isElectric
                ? (car.battery_type === 'Mua Pin' ? 'Pin mua' : 'Hợp đồng thuê pin')
                : 'Động cơ xăng';

            const prepayEst = Math.round(priceInMillions * 0.2);
            const monthlyEst = (Math.max(3.5, priceInMillions * 0.01)).toFixed(1).replace('.0', '');

            let detailImages = [];
            const coverImg = car.image_url ? formatCloudinaryUrl(car.image_url) : '';
            if (car.detail_images_list) {
                const list = car.detail_images_list.split(',').map(s => formatCloudinaryUrl(s.trim())).filter(Boolean);
                if (coverImg) {
                    const filteredList = list.filter(img => img !== coverImg);
                    detailImages = [coverImg, ...filteredList];
                } else {
                    detailImages = list;
                }
            } else if (coverImg) {
                detailImages = [coverImg];
            }

            window.carDetailsData[car.id] = {
                id: car.id,
                title: car.name,
                price: priceText,
                isElectric: isElectric,
                class: `${isElectric ? 'DÒNG XE ĐIỆN' : 'ĐỘNG CƠ XĂNG'} · ĐỜI ${yearVal}`,
                year: String(yearVal),
                odo: odoText,
                color: colorText,
                batteryType: batteryTypeLabel,
                warranty: isElectric ? 'Tiếp nối bảo hành hãng' : 'Bao test 176 hạng mục',
                battery: isElectric ? `${car.battery_type || 'Xe mua pin chính hãng'}, bảo hành pin 10 năm` : 'Động cơ xăng vận hành êm ái, full lịch sử hãng',
                prepay: priceInMillions > 0 ? `${prepayEst} Triệu` : 'Liên hệ',
                monthly: priceInMillions > 0 ? `${monthlyEst} Tr/tháng` : 'Liên hệ',
                img: car.image_url || SVG_FALLBACK_CAR,
                detailImages: detailImages,
                notes: car.notes || ''
            };

            const cardEl = document.createElement('article');
            cardEl.className = 'expressive-car-card reveal visible';
            cardEl.setAttribute('data-model', modelType);
            cardEl.setAttribute('data-price', priceInMillions.toString());
            cardEl.setAttribute('data-car-id', car.id);
            cardEl.setAttribute('itemscope', '');
            cardEl.setAttribute('itemtype', 'https://schema.org/Car');


            // Price label conditional
            const priceLabel = priceInMillions > 0 ? 'Báo giá lăn bánh' : 'Liên hệ báo giá';

            // Spec icon SVGs (inline, nhẹ)
            const icoOdo = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
            const icoColor = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`;
            const icoBatt = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2"/></svg>`;
            const icoFuel = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M17 22V10l4 4"/><line x1="1" y1="22" x2="23" y2="22"/></svg>`;
            const icoShieldCheck = `<svg class="badge-icon" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`;

            const battIcon = isElectric ? icoBatt : icoFuel;
            const battPillText = isElectric ? (car.battery_type || 'Mua Pin') : 'Xăng';

            const srcsetAttr = getCloudinarySrcset(car.image_url);
            const srcsetHtml = srcsetAttr ? `srcset="${srcsetAttr}" sizes="(max-width: 640px) 380px, (max-width: 1024px) 640px, 960px"` : '';
            const descriptiveAlt = `Xe ${car.name} lướt đời ${yearVal} màu ${colorText} tại Auto 28 TP.HCM`;

            cardEl.innerHTML = `
                <div class="card-top">
                    <div class="card-img-container">
                        <img src="${formatCloudinaryUrl(car.image_url, 400) || SVG_FALLBACK_CAR}" ${srcsetHtml} width="400" height="225" crossorigin="anonymous" alt="${descriptiveAlt}" itemprop="image" class="card-img" loading="lazy" decoding="async" style="opacity: 0; transition: opacity 0.5s ease; ${car.image_position ? `object-position: ${car.image_position};` : ''}" onload="this.style.opacity='1'" onerror="this.src='${SVG_FALLBACK_CAR}'; this.style.opacity='1'">
                        <div class="card-badge card-badge--right">${icoShieldCheck}<span>Đã Check 176 Hạng Mục</span></div>
                    </div>
                    <div class="card-content-col">
                        <div class="card-body">
                            <div class="card-meta-line">
                                <span class="meta-tag-blue">${isElectric ? '⚡ XE ĐIỆN' : '⛽ XE XĂNG'}</span>
                                <span class="meta-tag-gray">Đời ${yearVal}</span>
                            </div>
                            <h3 class="card-title" itemprop="name">${car.name}</h3>
                            <div class="spec-pills">
                                <span class="spec-pill">${icoOdo} ${odoText}</span>
                                <span class="spec-pill">${icoColor} ${colorText}</span>
                                <span class="spec-pill">${battIcon} ${battPillText}</span>
                            </div>
                        </div>
                        <div class="card-bottom">
                            <div class="price-box">
                                <span class="price-label">${priceLabel}</span>
                                <span class="price-value">${priceText}</span>
                                ${priceInMillions > 0 ? `<p class="card-microcopy">Cọc 5tr · Giữ xe 48h · Hoàn 100% nếu không mua</p>` : ''}
                            </div>
                            <button class="btn-card-action" aria-label="Xem chi tiết xe ${car.name}">Xem Chi Tiết Xe</button>
                        </div>
                    </div>
                </div>
            `;

            fragment.appendChild(cardEl);
        });

        carsGrid.appendChild(fragment);
    }

    function initCarModal() {
        const modal = document.getElementById('car-modal-view');
        const modalCloseBtn = document.getElementById('modal-close-btn');
        const modalOverlay = document.getElementById('modal-overlay');

        if (typeof window.loadDynamicLandingPageConfig === 'function') {
            window.loadDynamicLandingPageConfig();
        }
        if ('requestIdleCallback' in window) {
            requestIdleCallback(renderStaticVehicles, { timeout: 600 });
        } else {
            setTimeout(renderStaticVehicles, 30);
        }
        window.fetchAndRenderVehicles = renderStaticVehicles;
        window.renderStaticVehicles = renderStaticVehicles;

        // Reset previous AbortController signal if exists
        if (modalAbortController) {
            modalAbortController.abort();
        }
        modalAbortController = new AbortController();
        const signal = modalAbortController.signal;

        function closeModal() {
            if (modal) {
                modal.classList.remove('open');
                document.body.style.overflow = '';
            }
        }

        function openCarModalWithData(carInfo, clickedPreviewSrc) {
            if (!modal || !carInfo) return;

            const titleEl = document.getElementById('modal-car-title');
            const classEl = document.getElementById('modal-car-class');
            const priceEl = document.getElementById('modal-car-price');
            const odoEl = document.getElementById('modal-spec-odo');
            const yearEl = document.getElementById('modal-spec-year');
            const batLabelEl = document.getElementById('modal-spec-battery-label');
            const batTypeEl = document.getElementById('modal-spec-battery-type');
            const warrantyEl = document.getElementById('modal-spec-warranty');
            const colorTagEl = document.getElementById('modal-spec-color-tag');
            const batDetailTagEl = document.getElementById('modal-spec-battery-detail');
            const monthlyEstEl = document.getElementById('modal-monthly-est');
            const zaloBtn = document.getElementById('btn-modal-zalo');

            const isEV = carInfo.isElectric !== undefined ? carInfo.isElectric : (carInfo.class && carInfo.class.includes('ĐIỆN'));

            if (titleEl) titleEl.textContent = carInfo.title || 'VinFast VF 8 Plus';
            if (classEl) classEl.textContent = carInfo.class || 'DÒNG XE ĐIỆN · ĐỜI 2023';
            if (priceEl) priceEl.textContent = carInfo.price || 'Liên hệ';
            if (odoEl) odoEl.textContent = carInfo.odo || '15,000 km';
            if (yearEl) yearEl.textContent = carInfo.year || '2023';
            if (batLabelEl) batLabelEl.textContent = isEV ? 'Hình thức Pin' : 'Loại động cơ';
            if (batTypeEl) batTypeEl.textContent = carInfo.batteryType || (isEV ? 'Xe mua pin' : 'Động cơ xăng');
            if (warrantyEl) warrantyEl.textContent = carInfo.warranty || 'Hãng đến 2033';
            if (colorTagEl) colorTagEl.textContent = `🎨 Màu ${carInfo.color || 'Bạc'}`;
            if (batDetailTagEl) batDetailTagEl.textContent = `⚡ ${carInfo.battery || 'Xe mua pin chính hãng'}`;

            if (monthlyEstEl) {
                if (carInfo.price && carInfo.price !== 'Liên hệ' && carInfo.prepay && carInfo.prepay !== 'Liên hệ') {
                    monthlyEstEl.style.display = 'block';
                    monthlyEstEl.innerHTML = `💳 Trả trước từ <strong style="color: var(--color-accent-blue);">${carInfo.prepay}</strong> (${carInfo.monthly || ''})`;
                } else {
                    monthlyEstEl.style.display = 'block';
                    monthlyEstEl.innerHTML = `⚡ <strong>Nhận báo giá lăn bánh trọn gói tốt nhất</strong> • Hỗ trợ sang tên 24h`;
                }
            }

            if (zaloBtn) {
                const activeZaloPhone = (window.activeHotline || '0888813838').replace(/\D/g, '');
                const encodedMsg = encodeURIComponent(`Chào Auto 28, tôi muốn nhận báo giá lăn bánh & tư vấn chi tiết cho xe VinFast ${carInfo.title || 'VF 8'}. Xin cảm ơn!`);
                zaloBtn.href = `https://zalo.me/${activeZaloPhone}?text=${encodedMsg}`;
            }

            let galleryImages = [];
            const coverUrl = carInfo.img || clickedPreviewSrc || '';
            if (carInfo.detailImages && Array.isArray(carInfo.detailImages) && carInfo.detailImages.length > 0) {
                if (coverUrl) {
                    const filtered = carInfo.detailImages.filter(u => u !== coverUrl);
                    galleryImages = [coverUrl, ...filtered];
                } else {
                    galleryImages = carInfo.detailImages;
                }
            } else if (coverUrl) {
                galleryImages = [coverUrl];
            } else {
                galleryImages = [SVG_FALLBACK_CAR];
            }

            let currentGalleryIndex = 0;
            const modalImg = document.getElementById('modal-display-img');
            const counterEl = document.getElementById('modal-gallery-counter');
            const thumbsContainer = document.getElementById('modal-gallery-thumbnails');
            const prevBtn = document.getElementById('modal-gallery-prev');
            const nextBtn = document.getElementById('modal-gallery-next');
            const slideViewport = document.getElementById('modal-slide-viewport');
            const zoomTriggerBtn = document.getElementById('modal-gallery-zoom-trigger');

            // ⚡ INSTANT IMAGE PREVIEW (0ms):
            // Slide #1 luôn là Ảnh bìa mà khách vừa nhấp vào => Giữ nguyên 100% góc chụp, tải tức thì 0ms, không bao giờ nhảy/giật ảnh
            const initialPreview = galleryImages[0] || SVG_FALLBACK_CAR;
            if (modalImg) {
                modalImg.src = initialPreview;
                modalImg.style.opacity = '1';
            }

            // Lightbox Elements
            const lightboxModal = document.getElementById('gallery-lightbox-modal');
            const lightboxBackdrop = document.getElementById('lightbox-backdrop');
            const lightboxImg = document.getElementById('lightbox-active-img');
            const lightboxCounter = document.getElementById('lightbox-counter');
            const lightboxClose = document.getElementById('lightbox-close');
            const lightboxPrev = document.getElementById('lightbox-prev');
            const lightboxNext = document.getElementById('lightbox-next');
            const lightboxZoomIn = document.getElementById('lightbox-zoom-in');
            const lightboxZoomOut = document.getElementById('lightbox-zoom-out');
            const lightboxZoomReset = document.getElementById('lightbox-zoom-reset');
            const lightboxStage = document.getElementById('lightbox-image-stage');

            // Lightbox & Zoom State Variables
            let lightboxActive = false;
            let currentScale = 1;
            let translateX = 0;
            let translateY = 0;
            let isDragging = false;
            let startX = 0;
            let startY = 0;
            let initialPinchDist = 0;
            let initialPinchScale = 1;
            let lastTapTime = 0;

            function updateLightboxTransform() {
                if (!lightboxImg) return;
                lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
                if (currentScale > 1) {
                    lightboxImg.classList.add('zoomed');
                } else {
                    lightboxImg.classList.remove('zoomed');
                    translateX = 0;
                    translateY = 0;
                }
            }

            function resetLightboxZoom() {
                currentScale = 1;
                translateX = 0;
                translateY = 0;
                updateLightboxTransform();
            }

            function setLightboxZoom(newScale) {
                currentScale = Math.min(Math.max(newScale, 1), 4);
                if (currentScale === 1) {
                    translateX = 0;
                    translateY = 0;
                }
                updateLightboxTransform();
            }

            function openLightbox(index) {
                if (!lightboxModal || !lightboxImg) return;
                lightboxActive = true;
                currentGalleryIndex = (index + galleryImages.length) % galleryImages.length;
                lightboxImg.src = galleryImages[currentGalleryIndex] || SVG_FALLBACK_CAR;
                if (lightboxCounter) {
                    lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${galleryImages.length}`;
                }
                lightboxModal.classList.add('active');
                resetLightboxZoom();
            }

            function closeLightbox() {
                if (!lightboxModal) return;
                lightboxActive = false;
                lightboxModal.classList.remove('active');
                resetLightboxZoom();
            }

            window.closeActiveLightbox = closeLightbox;
            window.isLightboxOpen = () => lightboxActive;

            function renderGalleryState(index) {
                currentGalleryIndex = (index + galleryImages.length) % galleryImages.length;
                const activeSrc = galleryImages[currentGalleryIndex] || SVG_FALLBACK_CAR;

                if (modalImg) {
                    if (modalImg.src === activeSrc) {
                        modalImg.style.opacity = '1';
                        if (slideViewport) slideViewport.classList.remove('is-loading');
                    } else {
                        // Progressive Swap: Giữ ảnh đang hiển thị và tải ngầm ảnh mới để tránh nháy đen
                        if (slideViewport) slideViewport.classList.add('is-loading');
                        const preloader = new Image();
                        preloader.onload = function () {
                            if (currentGalleryIndex === (index + galleryImages.length) % galleryImages.length) {
                                modalImg.src = activeSrc;
                                modalImg.style.opacity = '1';
                                if (slideViewport) slideViewport.classList.remove('is-loading');
                            }
                        };
                        preloader.onerror = function () {
                            if (currentGalleryIndex === (index + galleryImages.length) % galleryImages.length) {
                                modalImg.src = SVG_FALLBACK_CAR;
                                modalImg.style.opacity = '1';
                                if (slideViewport) slideViewport.classList.remove('is-loading');
                            }
                        };
                        preloader.src = activeSrc;
                    }
                    modalImg.alt = `${carInfo.title || 'Xe VinFast'} - Ảnh ${currentGalleryIndex + 1}`;
                }
                if (counterEl) {
                    counterEl.textContent = `${currentGalleryIndex + 1} / ${galleryImages.length}`;
                }
                if (lightboxActive && lightboxImg) {
                    lightboxImg.src = activeSrc;
                    if (lightboxCounter) {
                        lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${galleryImages.length}`;
                    }
                    resetLightboxZoom();
                }
                if (thumbsContainer) {
                    const thumbBtns = thumbsContainer.querySelectorAll('.modal-thumb-btn');
                    thumbBtns.forEach((btn, i) => {
                        if (i === currentGalleryIndex) {
                            btn.classList.add('active');
                            // ⚡ Scoped Horizontal Scroll: Chỉ cuộn bên trong dải thumbnail, bảo vệ layout modal không bị lệch
                            const scrollTarget = btn.offsetLeft - (thumbsContainer.clientWidth / 2) + (btn.clientWidth / 2);
                            thumbsContainer.scrollTo({
                                left: Math.max(0, scrollTarget),
                                behavior: 'smooth'
                            });
                        } else {
                            btn.classList.remove('active');
                        }
                    });
                }
            }

            if (thumbsContainer) {
                thumbsContainer.innerHTML = '';
                galleryImages.forEach((imgUrl, idx) => {
                    const thumbBtn = document.createElement('button');
                    thumbBtn.className = `modal-thumb-btn ${idx === 0 ? 'active' : ''}`;
                    thumbBtn.setAttribute('type', 'button');
                    thumbBtn.setAttribute('aria-label', `Xem ảnh ${idx + 1}`);
                    thumbBtn.innerHTML = `<img src="${imgUrl}" alt="Thumbnail ${idx + 1}" loading="eager" decoding="async" onerror="this.src='${SVG_FALLBACK_CAR}'">`;
                    thumbBtn.addEventListener('click', () => {
                        renderGalleryState(idx);
                    });
                    thumbsContainer.appendChild(thumbBtn);
                });

                // ⚡ Swipe Touch & Momentum Drag for Thumbnails Bar (Mobile & Desktop)
                let isThumbDown = false;
                let thumbStartX = 0;
                let thumbScrollLeft = 0;

                thumbsContainer.addEventListener('mousedown', (e) => {
                    isThumbDown = true;
                    thumbStartX = e.pageX - thumbsContainer.offsetLeft;
                    thumbScrollLeft = thumbsContainer.scrollLeft;
                }, { signal });

                window.addEventListener('mouseup', () => {
                    isThumbDown = false;
                }, { signal });

                thumbsContainer.addEventListener('mousemove', (e) => {
                    if (!isThumbDown) return;
                    e.preventDefault();
                    const x = e.pageX - thumbsContainer.offsetLeft;
                    const walk = (x - thumbStartX) * 1.5;
                    thumbsContainer.scrollLeft = thumbScrollLeft - walk;
                }, { signal });
            }

            if (prevBtn) {
                prevBtn.onclick = (e) => {
                    e.stopPropagation();
                    renderGalleryState(currentGalleryIndex - 1);
                };
            }
            if (nextBtn) {
                nextBtn.onclick = (e) => {
                    e.stopPropagation();
                    renderGalleryState(currentGalleryIndex + 1);
                };
            }

            if (zoomTriggerBtn) {
                zoomTriggerBtn.onclick = (e) => {
                    e.stopPropagation();
                    openLightbox(currentGalleryIndex);
                };
            }

            if (modalImg) {
                modalImg.onclick = () => {
                    openLightbox(currentGalleryIndex);
                };
            }

            // Lightbox Action Controls
            if (lightboxClose) lightboxClose.onclick = closeLightbox;
            if (lightboxBackdrop) lightboxBackdrop.onclick = closeLightbox;
            if (lightboxPrev) lightboxPrev.onclick = () => renderGalleryState(currentGalleryIndex - 1);
            if (lightboxNext) lightboxNext.onclick = () => renderGalleryState(currentGalleryIndex + 1);
            if (lightboxZoomIn) lightboxZoomIn.onclick = () => setLightboxZoom(currentScale + 0.5);
            if (lightboxZoomOut) lightboxZoomOut.onclick = () => setLightboxZoom(currentScale - 0.5);
            if (lightboxZoomReset) lightboxZoomReset.onclick = resetLightboxZoom;

            // Touch Swipe & Pinch-to-Zoom Gesture Engine (Mobile Native Standard)
            if (slideViewport) {
                let touchStartX = 0;
                let touchStartY = 0;
                let touchControlsTimer = null;
                slideViewport.ontouchstart = (e) => {
                    slideViewport.classList.add('show-controls');
                    clearTimeout(touchControlsTimer);
                    touchControlsTimer = setTimeout(() => {
                        slideViewport.classList.remove('show-controls');
                    }, 3000);

                    if (e.touches.length === 1) {
                        touchStartX = e.touches[0].clientX;
                        touchStartY = e.touches[0].clientY;
                    }
                };
                slideViewport.ontouchend = (e) => {
                    if (e.changedTouches.length === 1) {
                        const diffX = touchStartX - e.changedTouches[0].clientX;
                        const diffY = touchStartY - e.changedTouches[0].clientY;
                        if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
                            if (diffX > 0) {
                                renderGalleryState(currentGalleryIndex + 1);
                            } else {
                                renderGalleryState(currentGalleryIndex - 1);
                            }
                        }
                    }
                };
            }

            // Lightbox Multi-Touch (Pinch-to-Zoom, Double-Tap & Drag Pan)
            if (lightboxStage && lightboxImg) {
                // Mouse Wheel Zoom
                lightboxStage.onwheel = (e) => {
                    e.preventDefault();
                    const delta = e.deltaY < 0 ? 0.25 : -0.25;
                    setLightboxZoom(currentScale + delta);
                };

                // Mouse Drag Pan
                lightboxStage.onmousedown = (e) => {
                    if (currentScale > 1) {
                        isDragging = true;
                        startX = e.clientX - translateX;
                        startY = e.clientY - translateY;
                    }
                };

                window.onmousemove = (e) => {
                    if (isDragging && currentScale > 1) {
                        translateX = e.clientX - startX;
                        translateY = e.clientY - startY;
                        updateLightboxTransform();
                    }
                };

                window.onmouseup = () => {
                    isDragging = false;
                };

                // Mobile Pinch-to-Zoom & Touch Swipe inside Lightbox
                let lbTouchStartX = 0;
                let lbTouchStartY = 0;

                lightboxStage.ontouchstart = (e) => {
                    // Double Tap Detection
                    const now = Date.now();
                    if (e.touches.length === 1 && now - lastTapTime < 300) {
                        if (currentScale > 1) {
                            resetLightboxZoom();
                        } else {
                            setLightboxZoom(2.5);
                        }
                        lastTapTime = 0;
                        return;
                    }
                    lastTapTime = now;

                    if (e.touches.length === 2) {
                        // Pinch Start
                        initialPinchDist = Math.hypot(
                            e.touches[0].clientX - e.touches[1].clientX,
                            e.touches[0].clientY - e.touches[1].clientY
                        );
                        initialPinchScale = currentScale;
                    } else if (e.touches.length === 1) {
                        lbTouchStartX = e.touches[0].clientX;
                        lbTouchStartY = e.touches[0].clientY;
                        if (currentScale > 1) {
                            isDragging = true;
                            startX = e.touches[0].clientX - translateX;
                            startY = e.touches[0].clientY - translateY;
                        }
                    }
                };

                lightboxStage.ontouchmove = (e) => {
                    if (e.touches.length === 2 && initialPinchDist > 0) {
                        e.preventDefault();
                        const currentDist = Math.hypot(
                            e.touches[0].clientX - e.touches[1].clientX,
                            e.touches[0].clientY - e.touches[1].clientY
                        );
                        const scaleFactor = currentDist / initialPinchDist;
                        setLightboxZoom(initialPinchScale * scaleFactor);
                    } else if (e.touches.length === 1 && isDragging && currentScale > 1) {
                        e.preventDefault();
                        translateX = e.touches[0].clientX - startX;
                        translateY = e.touches[0].clientY - startY;
                        updateLightboxTransform();
                    }
                };

                lightboxStage.ontouchend = (e) => {
                    if (e.touches.length === 0) {
                        isDragging = false;
                        initialPinchDist = 0;
                    }
                    if (currentScale === 1 && e.changedTouches.length === 1) {
                        const diffX = lbTouchStartX - e.changedTouches[0].clientX;
                        const diffY = lbTouchStartY - e.changedTouches[0].clientY;
                        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
                            if (diffX > 0) {
                                renderGalleryState(currentGalleryIndex + 1);
                            } else {
                                renderGalleryState(currentGalleryIndex - 1);
                            }
                        }
                    }
                };
            }

            // Render vertical image list (Mode 2)
            const verticalListContainer = document.getElementById('modal-gallery-vertical-list');
            if (verticalListContainer) {
                verticalListContainer.innerHTML = '';
                galleryImages.forEach((imgUrl, idx) => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'modal-gallery-list-item';
                    itemDiv.style.cursor = 'pointer';
                    itemDiv.innerHTML = `
                        <span class="modal-gallery-list-tag">Ảnh ${idx + 1} / ${galleryImages.length}</span>
                        <img src="${imgUrl}" alt="${carInfo.title || 'Xe VinFast'} - Ảnh ${idx + 1}" loading="lazy" onerror="this.src='${SVG_FALLBACK_CAR}'">
                    `;
                    itemDiv.onclick = () => openLightbox(idx);
                    verticalListContainer.appendChild(itemDiv);
                });
            }

            // Mode toggle button handlers
            const btnModeSlide = document.getElementById('btn-mode-slide');
            const btnModeList = document.getElementById('btn-mode-list');

            function setGalleryMode(mode) {
                if (mode === 'list') {
                    if (btnModeSlide) btnModeSlide.classList.remove('active');
                    if (btnModeList) btnModeList.classList.add('active');
                    if (slideViewport) slideViewport.style.display = 'none';
                    if (thumbsContainer) thumbsContainer.style.display = 'none';
                    if (verticalListContainer) verticalListContainer.style.display = 'flex';
                } else {
                    if (btnModeList) btnModeList.classList.remove('active');
                    if (btnModeSlide) btnModeSlide.classList.add('active');
                    if (verticalListContainer) verticalListContainer.style.display = 'none';
                    if (slideViewport) slideViewport.style.display = 'flex';
                    if (thumbsContainer) thumbsContainer.style.display = 'flex';
                }
            }

            if (btnModeSlide) btnModeSlide.onclick = () => setGalleryMode('slide');
            if (btnModeList) btnModeList.onclick = () => setGalleryMode('list');

            setGalleryMode('slide');
            renderGalleryState(0);

            window.activeModalGalleryNext = () => renderGalleryState(currentGalleryIndex + 1);
            window.activeModalGalleryPrev = () => renderGalleryState(currentGalleryIndex - 1);

            const btnModalSubmit = document.getElementById('btn-modal-action-submit');
            if (btnModalSubmit) btnModalSubmit.setAttribute('data-car-name', carInfo.title || 'VinFast');

            const modalWrapper = modal.querySelector('.modal-wrapper');
            if (modalWrapper) modalWrapper.scrollLeft = 0;

            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        if (modal) {
            // ⚡ Hover / Touch Preload for Instant Click Response
            document.addEventListener('pointerover', (e) => {
                const card = e.target.closest('.expressive-car-card');
                if (!card || card.classList.contains('skeleton-card')) return;
                const carId = card.getAttribute('data-car-id');
                const carInfo = (window.carDetailsData && carId && window.carDetailsData[carId]);
                if (carInfo && carInfo.detailImages && carInfo.detailImages.length > 0) {
                    const firstImg = carInfo.detailImages[0];
                    if (!window._preloadedCarImgs) window._preloadedCarImgs = new Set();
                    if (firstImg && !window._preloadedCarImgs.has(firstImg)) {
                        window._preloadedCarImgs.add(firstImg);
                        const preloadLink = new Image();
                        preloadLink.src = firstImg;
                    }
                }
            }, { capture: true, passive: true, signal });

            document.addEventListener('click', (e) => {
                const card = e.target.closest('.expressive-car-card');
                if (!card || card.classList.contains('skeleton-card')) return;

                const carId = card.getAttribute('data-car-id');
                let carInfo = (window.carDetailsData && carId && window.carDetailsData[carId]) ? window.carDetailsData[carId] : null;

                const imgEl = card.querySelector('.card-img');
                const cardPreviewSrc = imgEl ? (imgEl.currentSrc || imgEl.src) : null;

                if (!carInfo) {
                    const titleText = card.querySelector('.card-title')?.textContent?.trim() || 'VinFast VF 8 Plus';
                    const priceText = card.querySelector('.price-value')?.textContent?.trim() || '745 Triệu';

                    carInfo = {
                        id: carId || 'default',
                        title: titleText,
                        price: priceText,
                        class: 'DÒNG XE ĐIỆN · ĐỜI 2023',
                        year: '2023',
                        odo: '15,000 km',
                        color: 'Bạc',
                        batteryType: 'Xe mua pin',
                        warranty: 'Hãng đến 2033',
                        battery: 'Xe mua pin chính hãng, bảo hành 10 năm',
                        prepay: '149 Triệu',
                        monthly: '7.5 Tr/tháng',
                        img: cardPreviewSrc || SVG_FALLBACK_CAR
                    };
                }

                openCarModalWithData(carInfo, cardPreviewSrc);
            }, { signal });

            window.openCarModal = function (carId, overrideData) {
                let carInfo = overrideData || (window.carDetailsData && carId ? window.carDetailsData[carId] : null);
                if (!carInfo) {
                    carInfo = {
                        id: carId || 'default',
                        title: 'VinFast VF 8 Plus',
                        price: '745 Triệu',
                        class: 'DÒNG XE ĐIỆN · ĐỜI 2023',
                        year: '2023',
                        odo: '15,000 km',
                        color: 'Bạc',
                        batteryType: 'Xe mua pin',
                        warranty: 'Hãng đến 2033',
                        battery: 'Xe mua pin chính hãng',
                        prepay: '149 Triệu',
                        monthly: '7.5 Tr/tháng',
                        img: SVG_FALLBACK_CAR
                    };
                }
                openCarModalWithData(carInfo);
            };
        }

        if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal, { signal });
        if (modalOverlay) modalOverlay.addEventListener('click', closeModal, { signal });

        window.addEventListener('keydown', (e) => {
            if (typeof window.isLightboxOpen === 'function' && window.isLightboxOpen()) {
                if (e.key === 'Escape') {
                    if (typeof window.closeActiveLightbox === 'function') window.closeActiveLightbox();
                } else if (e.key === 'ArrowRight') {
                    if (typeof window.activeModalGalleryNext === 'function') window.activeModalGalleryNext();
                } else if (e.key === 'ArrowLeft') {
                    if (typeof window.activeModalGalleryPrev === 'function') window.activeModalGalleryPrev();
                }
                return;
            }

            if (!modal || !modal.classList.contains('open')) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight' && typeof window.activeModalGalleryNext === 'function') {
                window.activeModalGalleryNext();
            }
            if (e.key === 'ArrowLeft' && typeof window.activeModalGalleryPrev === 'function') {
                window.activeModalGalleryPrev();
            }
        }, { signal });

        // Modal form lead submit handler
        const carLeadForm = document.getElementById('car-lead-form');
        const btnModalSubmit = document.getElementById('btn-modal-action-submit');

        const handleModalSubmit = async (e) => {
            if (e) e.preventDefault();
            if (!btnModalSubmit) return;

            // 🍯 1. HONEYPOT TRAP CHECK
            if (carLeadForm) {
                const hpField = carLeadForm.querySelector('input[name="confirm_website_user_trap"]');
                if (hpField && hpField.value !== '') {
                    // Silent return with fake success message to confuse bot
                    alert('Gửi yêu cầu nhận báo giá thành công! Tư vấn viên sẽ gửi bảng tính qua Zalo.');
                    return;
                }
            }

            // ⏳ 2. TIME-BASED SUBMISSION CHECK (Minimum 1.5 seconds)
            if (carLeadForm) {
                const focusTime = parseInt(carLeadForm.getAttribute('data-focus-time') || '0', 10);
                if (focusTime > 0) {
                    const durationSec = (Date.now() - focusTime) / 1000;
                    if (durationSec < 1.5) {
                        alert('Thao tác quá nhanh! Vui lòng kiểm tra lại thông tin.');
                        return;
                    }
                }
            }

            const carName = btnModalSubmit.getAttribute('data-car-name') || 'VinFast';
            const nameEl = document.getElementById('modal-name');
            const phoneEl = document.getElementById('modal-phone');
            const name = nameEl ? nameEl.value.trim() : '';
            const rawPhone = phoneEl ? phoneEl.value.trim() : '';

            if (!name) {
                alert('Vui lòng nhập Họ và tên của bạn để Auto 28 chuẩn bị hồ sơ tư vấn!');
                if (nameEl) nameEl.focus();
                return;
            }

            // 📱 3. STRICT VN PHONE FORMAT & REPETITION CHECK
            const phoneCheck = typeof window.validateVNPhoneNumber === 'function'
                ? window.validateVNPhoneNumber(rawPhone)
                : { valid: rawPhone.length >= 10, cleanPhone: rawPhone.replace(/\D/g, '') };

            if (!phoneCheck.valid) {
                alert(phoneCheck.reason || 'Vui lòng nhập số điện thoại hợp lệ (10 chữ số) để nhận báo giá qua Zalo!');
                if (phoneEl) phoneEl.focus();
                return;
            }
            const phone = phoneCheck.cleanPhone;

            const originalText = btnModalSubmit.textContent;
            btnModalSubmit.textContent = '⏳ ĐANG GỬI...';
            btnModalSubmit.disabled = true;

            const activeTelegramToken = window.activeTelegramToken || '8354150269:AAF2da1-GZAXNgDVplWot053UDETG7CX5ss';
            const activeTelegramChatId = window.activeTelegramChatId || '2117317097';

            const message = `
<b>🔥 YÊU CẦU BÁO GIÁ LĂN BÁNH & ƯU ĐÃI XE</b>
--------------------------
🚗 <b>Dòng xe quan tâm:</b> ${carName}
👤 <b>Họ tên khách hàng:</b> ${name}
📞 <b>Số điện thoại khách:</b> <a href="tel:${phone}">${phone}</a>
--------------------------
⏰ <b>Gửi lúc:</b> ${new Date().toLocaleString('vi-VN')}
            `;

            const params = new URLSearchParams({
                chat_id: activeTelegramChatId,
                text: message,
                parse_mode: 'HTML',
                disable_web_page_preview: true
            });

            try {
                // 🚀 1. Gửi thông báo về Telegram Bot
                const response = await fetch(`https://api.telegram.org/bot${activeTelegramToken}/sendMessage?${params.toString()}`);

                // 🚀 2. Tự động bắn Webhook Lark/Feishu nếu cấu hình
                const larkUrl = window.larkWebhookUrl || window.activeLarkWebhook;
                if (larkUrl) {
                    fetch(larkUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            msg_type: 'text',
                            content: {
                                text: `🔥 [Auto 28 - Lead Mua Xe]\n🚗 Xe quan tâm: ${carName}\n👤 Khách hàng: ${name}\n📞 SĐT: ${phone}\n⏰ Thời gian: ${new Date().toLocaleString('vi-VN')}`
                            }
                        })
                    }).catch(e => console.warn('Lark webhook dispatch bypassed:', e.message));
                }

                if (response.ok) {
                    // 📊 3. Chuẩn hóa sự kiện DataLayer CRO 2026 & SHA-256 Hashed Event Tracking
                    if (window.Auto28Tracking && typeof window.Auto28Tracking.dispatchLeadTracking === 'function') {
                        window.Auto28Tracking.dispatchLeadTracking({
                            phone: phone,
                            name: name,
                            carName: carName,
                            formId: 'car_lead_modal',
                            formType: 'car_inquiry',
                            leadType: 'Tu_Van_Xe_Modal'
                        });
                    } else {
                        // Fallback tracking
                        window.dataLayer = window.dataLayer || [];
                        const eventId = 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
                        window.dataLayer.push({
                            event: 'generate_lead',
                            event_id: eventId,
                            form_id: 'car_lead_modal',
                            form_type: 'car_inquiry',
                            vehicle_name: carName,
                            phone: phone,
                            name: name,
                            timestamp: new Date().toISOString()
                        });

                        window.dataLayer.push({
                            event: 'lead_form_submitted',
                            event_id: eventId,
                            form_id: 'car_lead_modal',
                            vehicle_name: carName
                        });

                        if (typeof fbq === 'function') fbq('track', 'Lead', { content_name: carName }, { eventID: eventId });
                        if (typeof ttq === 'function') ttq.track('CompleteRegistration', { content_name: carName }, { event_id: eventId });
                        if (typeof gtag === 'function') {
                            gtag('event', 'generate_lead', {
                                'event_id': eventId,
                                'transaction_id': eventId,
                                'event_category': 'Conversion',
                                'event_label': 'Modal Xem Ưu Đãi Mua Xe',
                                'car_model': carName
                            });
                        }
                    }

                    btnModalSubmit.textContent = '✅ ĐÃ GỬI BÁO GIÁ!';
                    btnModalSubmit.style.background = '#16a34a';

                    setTimeout(() => {
                        closeModal();
                        btnModalSubmit.textContent = originalText;
                        btnModalSubmit.disabled = false;
                        btnModalSubmit.style.background = '';
                        if (nameEl) nameEl.value = '';
                        if (phoneEl) phoneEl.value = '';
                    }, 2000);
                } else {
                    throw new Error('API error');
                }
            } catch (err) {
                console.error(err);
                btnModalSubmit.textContent = '❌ LỖI GỬI - THỬ LẠI';
                btnModalSubmit.style.background = '#dc2626';
                setTimeout(() => {
                    btnModalSubmit.textContent = originalText;
                    btnModalSubmit.disabled = false;
                    btnModalSubmit.style.background = '';
                }, 2000);
            }
        };

        if (carLeadForm) {
            carLeadForm.addEventListener('submit', handleModalSubmit, { signal });
        } else if (btnModalSubmit) {
            btnModalSubmit.addEventListener('click', handleModalSubmit, { signal });
        }
    }

    window.initCarModal = initCarModal;
    window.renderStaticVehicles = renderStaticVehicles;
    window.fetchAndRenderVehicles = renderStaticVehicles;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderStaticVehicles);
    } else {
        renderStaticVehicles();
    }
})();
