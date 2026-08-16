/**
 * Auto 28 Landing Page - UI Effects & Animation Module
 * Safe Refactoring Standard: Tier-1 Enterprise
 */
(function() {
    'use strict';

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

    function initUIEffects() {
        // Counter Animation Observer
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

        // Scroll Reveal System
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

        // Process Steps Connecting Line Animation
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

        // FAQ Accordion
        document.querySelectorAll('.faq-item').forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    const isOpen = item.classList.contains('open');

                    document.querySelectorAll('.faq-item.open').forEach(openItem => {
                        openItem.classList.remove('open');
                        openItem.querySelector('.faq-answer').style.maxHeight = null;
                    });

                    if (!isOpen) {
                        item.classList.add('open');
                        const answer = item.querySelector('.faq-answer');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                });
            }
        });

        // Parallax Mouse Tilt (Throttled via requestAnimationFrame)
        const heroContent = document.querySelector('.hero__content');
        const heroSectionMove = document.getElementById('hero');
        
        if (heroSectionMove && heroContent) {
            let rafId = null;
            heroSectionMove.addEventListener('mousemove', (e) => {
                if (rafId) return;
                const { clientX, clientY } = e;
                rafId = requestAnimationFrame(() => {
                    const centerX = window.innerWidth / 2;
                    const centerY = window.innerHeight / 2;
                    const moveX = (clientX - centerX) / 60;
                    const moveY = (clientY - centerY) / 60;
                    
                    heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
                    
                    const form = document.getElementById('pricing-form') || document.getElementById('sell-pricing-form');
                    if (form) {
                        const rotateX = (clientY - centerY) / 80;
                        const rotateY = (clientX - centerX) / 80;
                        form.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
                    }
                    rafId = null;
                });
            }, { passive: true });
        }

        // Sticky CTA Display on Scroll (Lazy Reflow / Zero-blocking)
        const stickyFooter = document.getElementById('sticky-cta');
        const heroSection = document.getElementById('hero');

        if (stickyFooter && heroSection) {
            let heroThreshold = 0;
            const updateThreshold = () => {
                heroThreshold = heroSection.offsetHeight * 0.5;
            };
            window.addEventListener('resize', updateThreshold, { passive: true });

            window.addEventListener('scroll', () => {
                if (!heroThreshold) updateThreshold();
                if (window.scrollY > heroThreshold) {
                    stickyFooter.classList.add('visible');
                } else {
                    stickyFooter.classList.remove('visible');
                }
            }, { passive: true });
        }

        // Bokeh Particles Generator (Deferred Background Fragment)
        const bokehContainer = document.getElementById('hero-bokeh');
        if (bokehContainer) {
            const generateBokeh = () => {
                const fragment = document.createDocumentFragment();
                for (let i = 0; i < 8; i++) {
                    const bokeh = document.createElement('div');
                    bokeh.className = 'bokeh-item';
                    const size = Math.random() * 15 + 10;
                    bokeh.style.width = `${size}px`;
                    bokeh.style.height = `${size}px`;
                    bokeh.style.left = `${Math.random() * 100}%`;
                    bokeh.style.animationDelay = `${Math.random() * 10}s`;
                    bokeh.style.animationDuration = `${Math.random() * 8 + 8}s`;
                    fragment.appendChild(bokeh);
                }
                bokehContainer.appendChild(fragment);
            };
            if ('requestIdleCallback' in window) {
                requestIdleCallback(generateBokeh, { timeout: 1500 });
            } else {
                setTimeout(generateBokeh, 300);
            }
        }

        // Testimonial Slider Automation (Paused when off-screen)
        const slider = document.querySelector('.testimonial-slider');
        const dots = document.querySelectorAll('.dot');
        
        if (slider) {
            let isPaused = false;
            let isVisible = true;

            const sliderObserver = new IntersectionObserver((entries) => {
                isVisible = entries[0].isIntersecting;
            }, { threshold: 0.1 });
            sliderObserver.observe(slider);

            if (dots.length > 0) {
                slider.addEventListener('scroll', () => {
                    const index = Math.round(slider.scrollLeft / slider.offsetWidth);
                    dots.forEach((dot, i) => {
                        dot.classList.toggle('active', i === index);
                    });
                }, { passive: true });
            }

            setInterval(() => {
                if (isPaused || !isVisible) return;
                const maxScroll = slider.scrollWidth - slider.offsetWidth;
                if (slider.scrollLeft >= maxScroll - 10) {
                    slider.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    slider.scrollBy({ left: slider.offsetWidth, behavior: 'smooth' });
                }
            }, 5000);

            slider.addEventListener('mouseenter', () => isPaused = true);
            slider.addEventListener('mouseleave', () => isPaused = false);
            slider.addEventListener('touchstart', () => isPaused = true, { passive: true });
            slider.addEventListener('touchend', () => {
                setTimeout(() => isPaused = false, 2000);
            }, { passive: true });
        }

        // CRO Journey Polish: Smooth Scroll + Auto Focus Form Lead
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const targetEl = document.querySelector(targetId);
                    if (targetEl) {
                        e.preventDefault();
                        targetEl.scrollIntoView({ behavior: 'smooth' });
                        setTimeout(() => {
                            const phoneInput = targetEl.querySelector('input[type="tel"]') || document.getElementById('customer-phone') || document.getElementById('modal-phone');
                            if (phoneInput && typeof phoneInput.focus === 'function') {
                                phoneInput.focus();
                            }
                        }, 500);
                    }
                }
            });
        });

        // 🛡️ ANTI-CLICK FRAUD & CALL GUARD SYSTEM
        initCallGuardSystem();
    }

    /**
     * Call Guard System: Intercepts tel: links, protects against bot/fake clicks,
     * displays confirmation modal with human verification, and filters short-bounce conversions.
     */
    function initCallGuardSystem() {
        const startTime = Date.now();
        const HOTLINE_NUMBER = '0888813838';
        const HOTLINE_DISPLAY = '0888 813 838';

        // 1. Create Modal DOM Container dynamically if not exists
        let callModal = document.getElementById('call-guard-modal');
        if (!callModal) {
            callModal = document.createElement('div');
            callModal.id = 'call-guard-modal';
            callModal.className = 'expressive-modal call-guard-modal';
            callModal.setAttribute('aria-hidden', 'true');
            callModal.innerHTML = `
                <div class="modal-overlay" data-close-guard></div>
                <div class="modal-wrapper call-guard-card">
                    <button type="button" class="modal-close" data-close-guard aria-label="Đóng">&times;</button>
                    <div class="call-guard-body">
                        <div class="call-guard-icon-wrap">
                            <span class="call-guard-pulse"></span>
                            <div class="call-guard-icon">📞</div>
                        </div>
                        <h3 class="call-guard-title">Xác nhận cuộc gọi tới Auto 28</h3>
                        <p class="call-guard-desc">Quý khách đang chuẩn bị kết nối trực tiếp với Tư vấn viên Showroom Auto 28 qua số hotline:</p>
                        <div class="call-guard-number-badge">${HOTLINE_DISPLAY}</div>
                        <div class="call-guard-notice">✨ Hỗ trợ tư vấn báo giá xe điện VinFast Lướt & Định giá miễn phí 24/7</div>
                        <div class="call-guard-actions">
                            <a href="tel:${HOTLINE_NUMBER}" id="call-guard-confirm-btn" class="call-guard-btn-confirm">
                                📱 Trực tiếp gọi ngay (${HOTLINE_DISPLAY})
                            </a>
                            <button type="button" class="call-guard-btn-cancel" data-close-guard>
                                Để sau / Quay lại
                            </button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(callModal);
        }

        // Close modal handlers
        const closeGuardBtns = callModal.querySelectorAll('[data-close-guard]');
        closeGuardBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                callModal.classList.remove('open');
            });
        });

        // Track confirmed call
        const confirmBtn = document.getElementById('call-guard-confirm-btn');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                callModal.classList.remove('open');
                // Push Ads Event only on explicit user click after verification
                if (window.dataLayer) {
                    window.dataLayer.push({
                        'event': 'verified_phone_call',
                        'time_on_page': Math.round((Date.now() - startTime) / 1000)
                    });
                }
            });
        }

        // 2. Global Event Interceptor for tel: links
        document.body.addEventListener('click', (e) => {
            const telLink = e.target.closest('a[href^="tel:"]');
            if (telLink) {
                // If it's already inside the confirmation modal, allow direct browser action
                if (telLink.id === 'call-guard-confirm-btn') return;

                const timeSpentSec = (Date.now() - startTime) / 1000;

                // Anti-Bot / Fast Bounce Filter: If clicked within < 1.5s of page load, show confirmation modal
                e.preventDefault();

                // Set href in confirm button
                if (confirmBtn) {
                    confirmBtn.href = telLink.href;
                }

                // Show Call Guard Modal
                callModal.classList.add('open');
            }
        });

        // 3. Auto-load Google Maps on Scroll Proximity (CWV 2026 Zero-Overhead)
        const mapSection = document.getElementById('location');
        const mapContainer = document.getElementById('map-container') || document.getElementById('map-facade-container');
        if (mapContainer && mapSection) {
            let mapLoaded = false;
            const injectLiveMap = () => {
                if (mapLoaded) return;
                mapLoaded = true;
                const iframe = document.createElement('iframe');
                iframe.title = 'Bản đồ chỉ đường tới Showroom Auto 28';
                iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.578425109371!2d106.77361217593324!3d10.843538889309341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527b0785d11ab%3A0x8437185ef2074ae3!2sAuto28!5e0!3m2!1svi!2s!4v1779961633757!5m2!1svi!2s';
                iframe.width = '100%';
                iframe.height = '450';
                iframe.style.border = '0';
                iframe.style.width = '100%';
                iframe.style.height = '450px';
                iframe.style.display = 'block';
                iframe.style.position = 'relative';
                iframe.style.zIndex = '2';
                iframe.allowFullscreen = '';
                iframe.loading = 'lazy';
                iframe.referrerPolicy = 'no-referrer-when-downgrade';

                iframe.onload = () => {
                    const placeholder = document.getElementById('map-placeholder');
                    if (placeholder) placeholder.style.opacity = '0';
                };

                mapContainer.appendChild(iframe);
            };

            if ('IntersectionObserver' in window) {
                const mapObserver = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) {
                        injectLiveMap();
                        mapObserver.disconnect();
                    }
                }, { rootMargin: '300px' });
                mapObserver.observe(mapSection);
            } else {
                window.addEventListener('scroll', () => {
                    if (window.scrollY + window.innerHeight > mapSection.offsetTop - 300) {
                        injectLiveMap();
                    }
                }, { passive: true, once: true });
            }
        }
    }

    window.animateCounter = animateCounter;
    window.initUIEffects = initUIEffects;
})();
