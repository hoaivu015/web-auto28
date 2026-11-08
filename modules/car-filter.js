/**
 * Auto 28 Landing Page - Car Filter & Search Module
 * Safe Refactoring Standard: Tier-1 Enterprise
 */
(function () {
    'use strict';

    const MODEL_SEO_META = {
        'all': {
            title: 'Kho Xe VinFast Lướt Sẵn Giao Ngay',
            desc: 'Hồ sơ pháp lý đầy đủ, bao test hãng 176 hạng mục, bàn giao và giao xe tận hầm chung cư.',
            pageTitle: 'Auto 28 - Mua Bán Xe VinFast Lướt Uy Tín Tại TP.HCM & Lân Cận',
            heroHeadlineHtml: 'Sở Hữu Xe VinFast Lướt Như Mới – <br><span class="text-gradient">Cam Kết 5 Tiêu Chuẩn Vàng Khi Bàn Giao.</span>',
            heroDirectAnswer: 'Auto 28 cung cấp xe VinFast lướt chính hãng (VF3, VF5, VF6, VF7, VF8, VF9, Lux A, Lux SA, Fadil) tại TP.HCM, Bình Dương, Đồng Nai với giá từ 240 triệu. Bao test hãng 176 hạng mục, cam kết xe nguyên bản 100%, hỗ trợ vay trả góp 80%, giao xe tận nhà 24h.'
        },
        'lux-a': {
            title: 'Kho Xe VinFast Lux A2.0 Lướt Sẵn Giao Ngay',
            desc: 'Đủ phiên bản Base, Plus, Premium đời 2019–2022 • Odo chuẩn từ 6.000 km, sơn zin • Động cơ 2.0L Turbo & hộp số ZF 8 cấp nguyên bản, kiểm tra khung gầm 176 hạng mục.',
            pageTitle: 'Xe VinFast Lux A Lướt Giá Tốt TP.HCM (Base/Plus/Pre) | Auto 28',
            heroHeadlineHtml: 'Sở Hữu Xe VinFast Lux A2.0 Lướt Tuyển Chọn – <br><span class="text-gradient">Odo Chuẩn, Bao Test Hãng 176 Hạng Mục.</span>',
            heroDirectAnswer: 'Auto 28 chuyên cung cấp xe VinFast Lux A lướt (đủ 3 bản Base, Plus, Premium đời 2019–2022) tại TP.HCM, Bình Dương, Đồng Nai với giá từ 490 – 570 triệu. Odo chuẩn từ 6.000 km, động cơ 2.0L Turbo & hộp số ZF 8 cấp nguyên bản, hỗ trợ trả góp 70%, giao xe tận nhà 24h.'
        },
        'lux-sa': {
            title: 'Kho Xe VinFast Lux SA2.0 Lướt Sẵn Giao Ngay',
            desc: 'SUV 7 chỗ gầm cao máy 2.0L Turbo BMW N20 • Đủ bản Base, Plus, Full đời 2019–2022 • Odo chuẩn, kiểm tra khung gầm và bao test hãng 176 hạng mục.',
            pageTitle: 'Xe VinFast Lux SA2.0 Lướt Giá Tốt TP.HCM | Auto 28',
            heroHeadlineHtml: 'Sở Hữu SUV 7 Chỗ VinFast Lux SA2.0 Lướt – <br><span class="text-gradient">Khung Gầm Chuẩn Đức, Bao Test Hãng Toàn Quốc.</span>',
            heroDirectAnswer: 'Auto 28 cung cấp xe VinFast Lux SA2.0 lướt 7 chỗ (bản Base, Plus, Full đời 2019–2022) tại TP.HCM, Bình Dương, Đồng Nai với giá từ 560 – 640 triệu. Cam kết odo chuẩn, sơn zin, kiểm tra khung gầm 176 hạng mục chính hãng, sang tên trọn gói trong ngày.'
        },
        'fadil': {
            title: 'Kho Xe VinFast Fadil Lướt Sẵn Giao Ngay',
            desc: 'Hatchback đô thị máy 1.4L bền bỉ • Đời 2020–2022 odo chuẩn, sơn zin, bao test hãng 176 hạng mục, sang tên trọn gói trong ngày.',
            pageTitle: 'Xe VinFast Fadil Lướt Giá Tốt TP.HCM | Auto 28',
            heroHeadlineHtml: 'Sở Hữu Xe VinFast Fadil Lướt Nguyên Bản – <br><span class="text-gradient">Máy 1.4L Bền Bỉ, Sang Tên Ngay Trong Ngày.</span>',
            heroDirectAnswer: 'Auto 28 cung cấp xe VinFast Fadil lướt (Base, Nâng Cao, Cao Cấp đời 2020–2022) tại TP.HCM, Bình Dương, Đồng Nai với giá từ 240 – 280 triệu. Cam kết odo chuẩn, không đâm đụng ngập nước, bao test hãng 176 hạng mục và hỗ trợ trả góp 70%.'
        },
        'vf3': {
            title: 'Kho Xe Điện VinFast VF 3 Lướt Sẵn Giao Ngay',
            desc: 'Mini e-SUV đô thị siêu lướt • Xe mua pin chính hãng, odo chuẩn từ 1.200 km, sẵn xe giao ngay trong ngày tại TP.HCM.',
            pageTitle: 'Xe VinFast VF 3 Lướt Giá Tốt TP.HCM | Auto 28',
            heroHeadlineHtml: 'Sở Hữu Xe Điện VinFast VF 3 Siêu Lướt – <br><span class="text-gradient">Xe Mua Pin Chính Hãng, Sẵn Xe Giao Ngay.</span>',
            heroDirectAnswer: 'Auto 28 cung cấp xe điện VinFast VF 3 lướt (xe mua pin, đã lên sẵn phụ kiện cao cấp) tại TP.HCM, Bình Dương, Đồng Nai với giá từ 240 – 310 triệu. Odo siêu lướt từ 1.200 km, đo SOH pin thực tế, bao test hãng 176 hạng mục, giao xe tận nhà 24h.'
        },
        'vf5': {
            title: 'Kho Xe Điện VinFast VF 5 Plus Lướt Sẵn Giao Ngay',
            desc: 'A-SUV điện kinh tế tối ưu • Xe mua pin & xe thuê pin, đo SOH pin thực tế > 92%, bao test hãng 176 hạng mục.',
            pageTitle: 'Xe VinFast VF 5 Plus Lướt Giá Tốt TP.HCM | Auto 28',
            heroHeadlineHtml: 'Sở Hữu Xe Điện VinFast VF 5 Plus Lướt – <br><span class="text-gradient">Xe Mua Pin, SOH > 92%, Kinh Tế Tối Ưu.</span>',
            heroDirectAnswer: 'Auto 28 chuyên cung cấp xe điện VinFast VF 5 Plus lướt đời 2024–2025 (xe mua pin & xe thuê pin) tại TP.HCM, Bình Dương, Đồng Nai với giá từ 350 – 460 triệu. Cam kết SOH pin > 92%, bao test hãng 176 hạng mục, hỗ trợ vay 80% và giao xe 24h.'
        },
        'vf6': {
            title: 'Kho Xe Điện VinFast VF 6 Lướt Sẵn Giao Ngay',
            desc: 'B-SUV gia đình hiện đại (Eco / Plus) • Odo chuẩn, bảo hành chính hãng dài hạn, hỗ trợ trả góp 80% giá trị xe.',
            pageTitle: 'Xe VinFast VF 6 Lướt Giá Tốt TP.HCM (Eco/Plus) | Auto 28',
            heroHeadlineHtml: 'Sở Hữu Xe Điện VinFast VF 6 Lướt (Eco/Plus) – <br><span class="text-gradient">Odo Chuẩn, Bảo Hành Chính Hãng Dài Hạn.</span>',
            heroDirectAnswer: 'Auto 28 cung cấp xe điện VinFast VF 6 lướt (bản Eco & Plus đời 2024–2025) tại TP.HCM, Bình Dương, Đồng Nai với giá từ 565 – 630 triệu. Xe mua pin chính hãng, odo từ 13.000 km, bao test hãng 176 hạng mục, hỗ trợ sang tên trọn gói trong ngày.'
        },
        'vf7': {
            title: 'Kho Xe Điện VinFast VF 7 Lướt Sẵn Giao Ngay',
            desc: 'C-SUV thể thao mạnh mẽ (Eco / Plus / Hỏa Long) • Odo siêu lướt từ 181 km, cam kết nguyên bản 100%, bao test hãng.',
            pageTitle: 'Xe VinFast VF 7 Lướt Giá Tốt TP.HCM (Eco/Plus) | Auto 28',
            heroHeadlineHtml: 'Sở Hữu C-SUV VinFast VF 7 Siêu Lướt – <br><span class="text-gradient">Odo Từ 181 Km, Nguyên Bản 100% Như Mới.</span>',
            heroDirectAnswer: 'Auto 28 cung cấp xe điện VinFast VF 7 lướt (bản Eco, Plus AWD và bản giới hạn Hỏa Long) tại TP.HCM, Bình Dương, Đồng Nai với giá từ 740 – 850 triệu. Odo siêu lướt từ 181 km, cam kết SOH pin thực tế, bao test hãng 176 hạng mục, hỗ trợ vay 80%.'
        },
        'vfe34': {
            title: 'Kho Xe Điện VinFast VF e34 Lướt Sẵn Giao Ngay',
            desc: 'C-SUV điện rộng rãi, tiết kiệm • Kiểm định dung lượng pin SOH thực tế, hỗ trợ sang tên hợp đồng pin trong 24h.',
            pageTitle: 'Xe VinFast VF e34 Lướt Giá Tốt TP.HCM | Auto 28',
            heroHeadlineHtml: 'Sở Hữu Xe Điện VinFast VF e34 Lướt – <br><span class="text-gradient">Kiểm Định Pin SOH Thực Tế, Sang Tên 24h.</span>',
            heroDirectAnswer: 'Auto 28 cung cấp xe điện VinFast VF e34 lướt tại TP.HCM, Bình Dương, Đồng Nai với giá từ 420 – 480 triệu. Cam kết đo dung lượng pin SOH thực tế từ BMS, bao test hãng 176 hạng mục, hỗ trợ chuyển nhượng hợp đồng pin chính chủ trong 24 giờ.'
        },
        'vf8': {
            title: 'Kho Xe Điện VinFast VF 8 Lướt Sẵn Giao Ngay',
            desc: 'D-SUV 2 cầu AWD cao cấp (Eco / Plus) • Cam kết dung lượng pin SOH thực tế, bao test hãng 176 hạng mục toàn quốc.',
            pageTitle: 'Xe VinFast VF 8 Lướt Giá Tốt TP.HCM (Eco/Plus) | Auto 28',
            heroHeadlineHtml: 'Sở Hữu D-SUV Điện VinFast VF 8 Lướt – <br><span class="text-gradient">2 Cầu AWD Mạnh Mẽ, Bảo Hành Chính Hãng 10 Năm.</span>',
            heroDirectAnswer: 'Auto 28 cung cấp xe điện VinFast VF 8 lướt (Eco & Plus AWD) tại TP.HCM, Bình Dương, Đồng Nai với giá từ 590 – 780 triệu. Cam kết SOH pin trên 92%, bao test hãng 176 hạng mục toàn quốc, hỗ trợ vay ngân hàng 80% và đổi trả trong 7 ngày.'
        },
        'vf9': {
            title: 'Kho Xe Điện VinFast VF 9 Lướt Sẵn Giao Ngay',
            desc: 'E-SUV Full-size 6 chỗ / 7 chỗ chủ tịch • Odo chuẩn, tiếp nối bảo hành chính hãng 10 năm, bàn giao tận nhà.',
            pageTitle: 'Xe VinFast VF 9 Lướt Giá Tốt TP.HCM | Auto 28',
            heroHeadlineHtml: 'Sở Hữu E-SUV Chủ Tịch VinFast VF 9 Lướt – <br><span class="text-gradient">Đẳng Cấp 6 Chỗ Captain, Giao Xe Tận Nhà.</span>',
            heroDirectAnswer: 'Auto 28 cung cấp xe điện VinFast VF 9 lướt (Eco & Plus 6 chỗ / 7 chỗ) tại TP.HCM, Bình Dương, Đồng Nai với giá từ 1.15 – 1.45 tỷ. Cam kết odo chuẩn, bảo hành chính hãng 10 năm, kiểm định 176 hạng mục và bàn giao tận nhà bằng xe chuyên dụng.'
        },
        'limo': {
            title: 'Kho Xe Điện VinFast LIMO Lướt Sẵn Giao Ngay',
            desc: 'Xe mua pin chính hãng, odo siêu lướt từ 2.000 km • Hồ sơ pháp lý sẵn sàng sang tên ngay trong ngày.',
            pageTitle: 'Xe VinFast LIMO Lướt Giá Tốt TP.HCM | Auto 28',
            heroHeadlineHtml: 'Sở Hữu Xe Điện VinFast LIMO Green Siêu Lướt – <br><span class="text-gradient">Xe Mua Pin, Odo Từ 2.000 Km Sẵn Giao Ngay.</span>',
            heroDirectAnswer: 'Auto 28 chuyên cung cấp xe điện VinFast LIMO lướt đời 2025 (xe mua pin chính hãng, odo chỉ từ 2.000 – 6.000 km) tại TP.HCM, Bình Dương, Đồng Nai. Bao test hãng 176 hạng mục, hỗ trợ vay trả góp 80% và sang tên trọn gói trong ngày.'
        },
        'mpv': {
            title: 'Kho Xe Điện VinFast MPV 7 Lướt Sẵn Giao Ngay',
            desc: 'MPV 7 chỗ đa dụng thế hệ mới • Bao test hãng 176 hạng mục, hỗ trợ vay ngân hàng đến 80%.',
            pageTitle: 'Xe VinFast MPV 7 Lướt Giá Tốt TP.HCM | Auto 28',
            heroHeadlineHtml: 'Sở Hữu Xe Điện 7 Chỗ VinFast MPV 7 Lướt – <br><span class="text-gradient">Rộng Rãi Đa Dụng, Bao Test Hãng 176 Hạng Mục.</span>',
            heroDirectAnswer: 'Auto 28 cung cấp dòng xe điện 7 chỗ VinFast MPV 7 lướt tại TP.HCM, Bình Dương, Đồng Nai với giá từ 670 triệu. Cam kết xe mua pin chính hãng, kiểm định 176 hạng mục tại xưởng dịch vụ VinFast, hỗ trợ trả góp 80% và giao xe tận nhà 24h.'
        },
        'gas': {
            title: 'Kho Xe Xăng VinFast Lướt (Lux A, Lux SA, Fadil)',
            desc: 'Tuyển chọn dòng xe xăng VinFast lướt (Lux A2.0, Lux SA2.0, Fadil) • Odo chuẩn, máy móc & hộp số nguyên bản, bao test hãng 176 hạng mục.',
            pageTitle: 'Xe Xăng VinFast Lướt (Lux A, Lux SA, Fadil) TP.HCM | Auto 28',
            heroHeadlineHtml: 'Sở Hữu Xe Xăng VinFast Lướt Tuyển Chọn – <br><span class="text-gradient">Lux A, Lux SA & Fadil Nguyên Bản 100%.</span>',
            heroDirectAnswer: 'Auto 28 cung cấp các dòng xe xăng VinFast lướt (Lux A2.0, Lux SA2.0, Fadil) tại TP.HCM, Bình Dương, Đồng Nai với giá từ 240 – 640 triệu. Cam kết odo chuẩn, động cơ & hộp số nguyên bản, kiểm tra khung gầm 176 hạng mục chính hãng.'
        }
    };

    function matchesModelFilter(cardModel, filterVal) {
        if (!filterVal || filterVal === 'all') return true;
        if (cardModel === filterVal) return true;
        const gasModels = ['gas', 'lux-a', 'lux-sa', 'fadil'];
        if (filterVal === 'gas' && gasModels.includes(cardModel)) return true;
        if ((filterVal === 'vf67' || filterVal === 'vf6,vf7') && (cardModel === 'vf6' || cardModel === 'vf7')) return true;
        if ((filterVal === 'vf89' || filterVal === 'vf8,vf9') && (cardModel === 'vf8' || cardModel === 'vf9')) return true;
        if (filterVal.includes(',')) {
            const parts = filterVal.split(',').map(s => s.trim());
            if (parts.includes(cardModel)) return true;
        }
        return false;
    }

    function filterCarCards(filterVal) {
        const carCards = document.querySelectorAll('#cars-grid .expressive-car-card');
        let matchCount = 0;
        carCards.forEach(card => {
            const modelType = card.getAttribute('data-model');
            if (matchesModelFilter(modelType, filterVal)) {
                matchCount++;
                card.style.display = 'flex';
                setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => { card.style.display = 'none'; }, 300);
            }
        });
        return matchCount;
    }

    function updateSectionHeaderMeta(filterVal, matchCount) {
        const key = (filterVal && MODEL_SEO_META[filterVal]) ? filterVal : 'all';
        const meta = MODEL_SEO_META[key];
        const titleEl = document.getElementById('grid-section-title');
        const descEl = document.getElementById('grid-section-desc');
        const heroTitleEl = document.getElementById('hero-headline-title');
        const heroAnswerEl = document.getElementById('hero-direct-answer');
        if (titleEl && meta) {
            const countSuffix = (key !== 'all' && matchCount > 0) ? ` (${matchCount} Xe)` : '';
            titleEl.textContent = meta.title + countSuffix;
        }
        if (descEl && meta) {
            descEl.textContent = meta.desc;
        }
        if (heroTitleEl && meta && meta.heroHeadlineHtml) {
            heroTitleEl.innerHTML = meta.heroHeadlineHtml;
        }
        if (heroAnswerEl && meta && meta.heroDirectAnswer) {
            heroAnswerEl.textContent = meta.heroDirectAnswer;
        }
        if (meta && meta.pageTitle && (key !== 'all' || document.title.includes(' | Auto 28'))) {
            document.title = meta.pageTitle;
        }
    }

    function updateUrlFilterParam(filterVal) {
        if (!window.history || !window.history.replaceState) return;
        try {
            const url = new URL(window.location.href);
            if (!filterVal || filterVal === 'all') {
                url.searchParams.delete('filter');
                url.searchParams.delete('model');
            } else {
                url.searchParams.set('filter', filterVal);
                url.searchParams.delete('model');
            }
            window.history.replaceState(null, '', url.pathname + (url.search ? url.search : '') + url.hash);
        } catch (e) { }
    }

    function applyFilter(filterVal, shouldScroll, skipUrlUpdate) {
        const filterPills = document.querySelectorAll('.filter-pill');
        if (filterPills.length > 0) {
            const targets = (filterVal || 'all').split(',').map(s => s.trim());
            let hasMatch = false;
            filterPills.forEach(p => {
                const pVal = p.getAttribute('data-filter');
                if (targets.includes(pVal) || pVal === filterVal) {
                    p.classList.add('active');
                    hasMatch = true;
                } else {
                    p.classList.remove('active');
                }
            });
            if (!hasMatch && filterPills[0]) {
                filterPills[0].classList.add('active');
            }
        }

        const matchCount = filterCarCards(filterVal);
        updateSectionHeaderMeta(filterVal, matchCount);

        const searchModelEl = document.getElementById('search-model');
        if (searchModelEl && filterVal && searchModelEl.querySelector(`option[value="${filterVal}"]`)) {
            searchModelEl.value = filterVal;
        }

        if (!skipUrlUpdate) {
            updateUrlFilterParam(filterVal);
        }

        if (shouldScroll) {
            const gridSection = document.getElementById('product-grid-section');
            if (gridSection) {
                gridSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    function initCarFilter() {
        const filterPills = document.querySelectorAll('.filter-pill');
        const carsGrid = document.getElementById('cars-grid');

        if (carsGrid) {
            filterPills.forEach(pill => {
                pill.addEventListener('click', (e) => {
                    e.preventDefault();
                    const filterVal = pill.getAttribute('data-filter');
                    applyFilter(filterVal, false);
                });
            });
        }

        // Attach listener to footer car filter links for smooth same-page transition
        const footerLinks = document.querySelectorAll('a[data-filter-link], a[href*="filter="], a[href*="model="]');
        footerLinks.forEach(link => {
            if (link.classList.contains('filter-pill')) return;
            link.addEventListener('click', (e) => {
                let filterVal = link.getAttribute('data-filter-link');
                if (!filterVal) {
                    try {
                        const urlObj = new URL(link.href, window.location.origin);
                        filterVal = urlObj.searchParams.get('filter') || urlObj.searchParams.get('model');
                    } catch (err) { }
                }
                if (filterVal) {
                    const currentPath = window.location.pathname.replace(/\/$/, '') || '/index.html';
                    let targetPath = '/index.html';
                    try {
                        targetPath = (new URL(link.href, window.location.origin)).pathname.replace(/\/$/, '') || '/index.html';
                    } catch (err) { }

                    const isSamePage = (currentPath === targetPath || (currentPath.endsWith('index.html') && targetPath.endsWith('index.html')) || (currentPath === '' && targetPath.endsWith('index.html')));

                    if (isSamePage && carsGrid) {
                        e.preventDefault();
                        applyFilter(filterVal, true);
                    }
                }
            });
        });

        // Check URL query parameters (?filter=... or ?model=...) or direct slug path (/lux-a) on initial page load
        const urlParams = new URLSearchParams(window.location.search);
        const pathSlug = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
        const filterParam = urlParams.get('filter') || urlParams.get('model') || (MODEL_SEO_META[pathSlug] && pathSlug !== 'all' ? pathSlug : null);
        if (filterParam) {
            const hasRenderedCards = document.querySelectorAll('#cars-grid .expressive-car-card:not(.skeleton-card)').length > 0;
            if (hasRenderedCards) {
                applyFilter(filterParam, true, true);
            } else {
                setTimeout(() => {
                    applyFilter(filterParam, true, true);
                }, 100);
            }
        }

        const btnSearchTrigger = document.getElementById('btn-search-trigger');
        if (btnSearchTrigger) {
            btnSearchTrigger.addEventListener('click', () => {
                const searchModelEl = document.getElementById('search-model');
                const searchPriceEl = document.getElementById('search-price');
                const selectModel = searchModelEl ? searchModelEl.value : 'all';
                const selectPrice = searchPriceEl ? searchPriceEl.value : 'all';
                applyFilter(selectModel, false);
                const carCards = document.querySelectorAll('#cars-grid .expressive-car-card');

                carCards.forEach(card => {
                    const cardModel = card.getAttribute('data-model');
                    const cardPrice = parseFloat(card.getAttribute('data-price'));

                    let matchesModel = matchesModelFilter(cardModel, selectModel);

                    let matchesPrice = true;
                    if (selectPrice === 'under-400') matchesPrice = cardPrice < 400;
                    else if (selectPrice === '400-600') matchesPrice = cardPrice >= 400 && cardPrice <= 600;
                    else if (selectPrice === '600-800') matchesPrice = cardPrice >= 600 && cardPrice <= 800;
                    else if (selectPrice === 'over-800') matchesPrice = cardPrice > 800;

                    if (matchesModel && matchesPrice) {
                        card.style.display = 'flex';
                        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => { card.style.display = 'none'; }, 300);
                    }
                });

                const gridSection = document.getElementById('product-grid-section');
                if (gridSection) {
                    gridSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    }

    window.filterCarCards = filterCarCards;
    window.applyFilter = applyFilter;
    window.initCarFilter = initCarFilter;
})();
