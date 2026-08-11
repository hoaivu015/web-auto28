/**
 * Auto 28 Landing Page - Car Filter & Search Module
 * Safe Refactoring Standard: Tier-1 Enterprise
 */
(function() {
    'use strict';

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
        carCards.forEach(card => {
            const modelType = card.getAttribute('data-model');
            if (matchesModelFilter(modelType, filterVal)) {
                card.style.display = 'flex';
                setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => { card.style.display = 'none'; }, 300);
            }
        });
    }

    function applyFilter(filterVal, shouldScroll) {
        const filterPills = document.querySelectorAll('.filter-pill');
        if (filterPills.length > 0) {
            const targets = filterVal.split(',').map(s => s.trim());
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

        filterCarCards(filterVal);

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
                pill.addEventListener('click', () => {
                    const filterVal = pill.getAttribute('data-filter');
                    applyFilter(filterVal, false);
                });
            });
        }

        // Attach listener to footer car filter links for smooth same-page transition
        const footerLinks = document.querySelectorAll('a[data-filter-link], a[href*="filter="]');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                let filterVal = link.getAttribute('data-filter-link');
                if (!filterVal) {
                    try {
                        const urlObj = new URL(link.href, window.location.origin);
                        filterVal = urlObj.searchParams.get('filter');
                    } catch(err) {}
                }
                if (filterVal) {
                    const currentPath = window.location.pathname.replace(/\/$/, '') || '/index.html';
                    let targetPath = '/index.html';
                    try {
                        targetPath = (new URL(link.href, window.location.origin)).pathname.replace(/\/$/, '') || '/index.html';
                    } catch(err) {}
                    
                    const isSamePage = (currentPath === targetPath || (currentPath.endsWith('index.html') && targetPath.endsWith('index.html')) || (currentPath === '' && targetPath.endsWith('index.html')));

                    if (isSamePage && carsGrid) {
                        e.preventDefault();
                        applyFilter(filterVal, true);
                        if (window.history && window.history.pushState) {
                            window.history.pushState(null, '', link.href);
                        }
                    }
                }
            });
        });

        // Check URL query parameters on initial page load
        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get('filter');
        if (filterParam) {
            setTimeout(() => {
                applyFilter(filterParam, true);
            }, 150);
        }

        const btnSearchTrigger = document.getElementById('btn-search-trigger');
        if (btnSearchTrigger) {
            btnSearchTrigger.addEventListener('click', () => {
                const searchModelEl = document.getElementById('search-model');
                const searchPriceEl = document.getElementById('search-price');
                const selectModel = searchModelEl ? searchModelEl.value : 'all';
                const selectPrice = searchPriceEl ? searchPriceEl.value : 'all';
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
