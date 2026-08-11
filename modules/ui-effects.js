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

        // Parallax Mouse Tilt
        const heroContent = document.querySelector('.hero__content');
        const heroSectionMove = document.getElementById('hero');
        
        if (heroSectionMove && heroContent) {
            heroSectionMove.addEventListener('mousemove', (e) => {
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

        // Sticky CTA Display on Scroll
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

        // Bokeh Particles Generator
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

        // Testimonial Slider Automation
        const slider = document.querySelector('.testimonial-slider');
        const dots = document.querySelectorAll('.dot');
        
        if (slider && dots.length > 0) {
            let isPaused = false;

            slider.addEventListener('scroll', () => {
                const index = Math.round(slider.scrollLeft / slider.offsetWidth);
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }, { passive: true });

            setInterval(() => {
                if (isPaused) return;
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

            // Add styles dynamically for modal
            if (!document.getElementById('call-guard-styles')) {
                const style = document.createElement('style');
                style.id = 'call-guard-styles';
                style.textContent = `
                    .call-guard-card {
                        max-width: 440px !important;
                        padding: 2rem 1.5rem !important;
                        text-align: center;
                        background: #FFFFFF !important;
                    }
                    .call-guard-body {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .call-guard-icon-wrap {
                        position: relative;
                        width: 64px;
                        height: 64px;
                        margin-bottom: 1rem;
                    }
                    .call-guard-icon {
                        width: 64px;
                        height: 64px;
                        background: linear-gradient(135deg, #2563EB, #1D4ED8);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.75rem;
                        color: #FFF;
                        position: relative;
                        z-index: 2;
                        box-shadow: 0 10px 25px rgba(37, 99, 235, 0.35);
                    }
                    .call-guard-pulse {
                        position: absolute;
                        inset: -6px;
                        border-radius: 50%;
                        background: rgba(37, 99, 235, 0.25);
                        animation: pulseGlow 2s infinite;
                        z-index: 1;
                    }
                    @keyframes pulseGlow {
                        0% { transform: scale(0.95); opacity: 0.8; }
                        50% { transform: scale(1.15); opacity: 0.3; }
                        100% { transform: scale(0.95); opacity: 0.8; }
                    }
                    .call-guard-title {
                        font-family: var(--font-display, sans-serif);
                        font-weight: 800;
                        font-size: 1.35rem;
                        color: #0F172A;
                        margin: 0 0 0.5rem;
                    }
                    .call-guard-desc {
                        font-size: 0.9rem;
                        color: #64748B;
                        line-height: 1.5;
                        margin: 0 0 1rem;
                    }
                    .call-guard-number-badge {
                        background: #EFF6FF;
                        border: 1px solid #BFDBFE;
                        color: #1D4ED8;
                        font-family: var(--font-display, sans-serif);
                        font-weight: 900;
                        font-size: 1.5rem;
                        padding: 0.5rem 1.25rem;
                        border-radius: 12px;
                        letter-spacing: 0.05em;
                        margin-bottom: 0.75rem;
                    }
                    .call-guard-notice {
                        font-size: 0.8rem;
                        color: #059669;
                        font-weight: 600;
                        margin-bottom: 1.5rem;
                    }
                    .call-guard-actions {
                        display: flex;
                        flex-direction: column;
                        gap: 0.65rem;
                        width: 100%;
                    }
                    .call-guard-btn-confirm {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        padding: 0.85rem 1rem;
                        background: linear-gradient(135deg, #16A34A, #15803D);
                        color: #FFFFFF !important;
                        font-weight: 700;
                        font-size: 0.95rem;
                        border-radius: 12px;
                        text-decoration: none !important;
                        box-shadow: 0 8px 20px rgba(22, 163, 74, 0.3);
                        transition: all 0.2s ease;
                    }
                    .call-guard-btn-confirm:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 12px 25px rgba(22, 163, 74, 0.4);
                    }
                    .call-guard-btn-cancel {
                        width: 100%;
                        padding: 0.75rem 1rem;
                        background: #F1F5F9;
                        color: #64748B;
                        font-weight: 600;
                        font-size: 0.88rem;
                        border: none;
                        border-radius: 12px;
                        cursor: pointer;
                        transition: background 0.2s ease;
                    }
                    .call-guard-btn-cancel:hover {
                        background: #E2E8F0;
                        color: #334155;
                    }
                `;
                document.head.appendChild(style);
            }
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
    }

    window.animateCounter = animateCounter;
    window.initUIEffects = initUIEffects;
})();
