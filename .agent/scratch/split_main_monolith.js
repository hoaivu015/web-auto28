/**
 * Auto 28 - Refactoring Engine Script
 * Enterprise Tier-1 AST-like Splitter for main.js (1509 lines)
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.join(__dirname, '../../');
const sourcePath = path.join(rootDir, 'main.js');
const modulesDir = path.join(rootDir, 'js/modules');
const backupDir = path.join(__dirname, 'backups');

if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
if (!fs.existsSync(modulesDir)) fs.mkdirSync(modulesDir, { recursive: true });

const timestamp = Date.now();
const backupPath = path.join(backupDir, `main.${timestamp}.bak`);
fs.copyFileSync(sourcePath, backupPath);
console.log(`📦 Snapshot Backup created: ${backupPath}`);

// ============================================================================
// MODULE 1: UTILS
// ============================================================================
const utilsContent = `/**
 * Auto 28 Landing Page - Utility & Helper Module
 */
(function() {
  'use strict';

  function optimizeCloudinaryUrl(url, options = {}) {
    if (!url || typeof url !== 'string') return url;
    if (!url.includes('cloudinary.com')) return url;
    const { width = 'auto', quality = 'auto', format = 'auto' } = options;
    const uploadIndex = url.indexOf('/upload/');
    if (uploadIndex === -1) return url;
    const prefix = url.substring(0, uploadIndex + 8);
    const suffix = url.substring(uploadIndex + 8);
    if (suffix.startsWith('f_') || suffix.startsWith('q_') || suffix.startsWith('w_')) {
      return url;
    }
    const params = [\`f_\${format}\`, \`q_\${quality}\`].filter(Boolean).join(',');
    return \`\${prefix}\${params}/\${suffix}\`;
  }

  function preloadModalImage(url) {
    if (!url) return;
    const img = new Image();
    img.src = optimizeCloudinaryUrl(url, { width: 1200, quality: 'auto' });
  }

  function preloadAdjacentModalImages(images, activeIndex) {
    if (!images || !images.length) return;
    const nextIdx = (activeIndex + 1) % images.length;
    const prevIdx = (activeIndex - 1 + images.length) % images.length;
    if (images[nextIdx]) preloadModalImage(images[nextIdx]);
    if (images[prevIdx]) preloadModalImage(images[prevIdx]);
  }

  function formatPriceText(priceInVND) {
    if (!priceInVND || isNaN(priceInVND)) return 'Liên hệ';
    const num = Number(priceInVND);
    if (num >= 1000000000) {
      const tỷ = (num / 1000000000).toFixed(3).replace(/\\.?0+$/, '');
      return \`\${tỷ} Tỷ VNĐ\`;
    }
    const triệu = Math.round(num / 1000000);
    return \`\${triệu} Triệu VNĐ\`;
  }

  window.Auto28Utils = {
    optimizeCloudinaryUrl,
    preloadModalImage,
    preloadAdjacentModalImages,
    formatPriceText
  };
  window.optimizeCloudinaryUrl = optimizeCloudinaryUrl;
  window.formatPriceText = formatPriceText;
})();
`;

// ============================================================================
// MODULE 2: NAV
// ============================================================================
const navContent = `/**
 * Auto 28 Landing Page - Navigation & Header Module
 */
(function() {
  'use strict';

  function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
    const closeNavBtn = document.getElementById('close-nav-btn');
    const siteHeader = document.querySelector('.site-header');

    if (mobileMenuBtn && mobileNavDrawer) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileNavDrawer.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeNavBtn && mobileNavDrawer) {
      closeNavBtn.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    if (siteHeader) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          siteHeader.classList.add('scrolled');
        } else {
          siteHeader.classList.remove('scrolled');
        }
      }, { passive: true });
    }

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
  }

  document.addEventListener('DOMContentLoaded', initNavigation);
  window.initNavigation = initNavigation;
})();
`;

// ============================================================================
// MODULE 3: HERO
// ============================================================================
const heroContent = `/**
 * Auto 28 Landing Page - Hero & Parallax Module
 */
(function() {
  'use strict';

  function triggerBackgroundSwap(imgUrl) {
    if (!imgUrl) return;
    const heroBgWrapper = document.querySelector('.hero-bg-wrapper');
    if (!heroBgWrapper) return;
    
    let activeBg = heroBgWrapper.querySelector('.hero-bg.active');
    let inactiveBg = heroBgWrapper.querySelector('.hero-bg:not(.active)');

    if (!inactiveBg) {
      inactiveBg = document.createElement('div');
      inactiveBg.className = 'hero-bg';
      heroBgWrapper.appendChild(inactiveBg);
    }

    inactiveBg.style.backgroundImage = \`url('\${imgUrl}')\`;
    inactiveBg.classList.add('active');
    if (activeBg) {
      activeBg.classList.remove('active');
    }
  }

  function initHeroEffects() {
    const heroContent = document.querySelector('.hero__content');
    const heroSection_move = document.getElementById('hero');
    
    if (heroSection_move && heroContent) {
      heroSection_move.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (clientX - centerX) / 60;
        const moveY = (clientY - centerY) / 60;
        
        heroContent.style.transform = \`translate(\${moveX}px, \${moveY}px)\`;
        
        const form = document.getElementById('pricing-form');
        if (form) {
          const rotateX = (clientY - centerY) / 80;
          const rotateY = (clientX - centerX) / 80;
          form.style.transform = \`perspective(1000px) rotateX(\${-rotateX}deg) rotateY(\${rotateY}deg)\`;
        }
      });
    }

    const bokehContainer = document.getElementById('hero-bokeh');
    if (bokehContainer) {
      for (let i = 0; i < 12; i++) {
        const bokeh = document.createElement('div');
        bokeh.className = 'bokeh-item';
        const size = Math.random() * 15 + 10;
        bokeh.style.width = \`\${size}px\`;
        bokeh.style.height = \`\${size}px\`;
        bokeh.style.left = \`\${Math.random() * 100}%\`;
        bokeh.style.animationDelay = \`\${Math.random() * 10}s\`;
        bokeh.style.animationDuration = \`\${Math.random() * 8 + 8}s\`;
        bokehContainer.appendChild(bokeh);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', initHeroEffects);
  window.triggerBackgroundSwap = triggerBackgroundSwap;
})();
`;

// ============================================================================
// MODULE 4: CATALOG
// ============================================================================
const catalogContent = `/**
 * Auto 28 Landing Page - Vehicle Catalog & Filter Module
 */
(function() {
  'use strict';

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

  function initCatalogFilters() {
    const filterPills = document.querySelectorAll('.filter-pill');
    const carsGrid = document.getElementById('cars-grid');

    if (carsGrid) {
      filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
          filterPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          const filterVal = pill.getAttribute('data-filter');
          filterCarCards(filterVal);
        });
      });
    }

    const btnSearchTrigger = document.getElementById('btn-search-trigger');
    if (btnSearchTrigger) {
      btnSearchTrigger.addEventListener('click', () => {
        const selectModel = document.getElementById('search-model').value;
        const selectPrice = document.getElementById('search-price').value;
        const carCards = document.querySelectorAll('#cars-grid .expressive-car-card');

        carCards.forEach(card => {
          const cardModel = card.getAttribute('data-model');
          const cardPrice = parseFloat(card.getAttribute('data-price'));
          
          let matchesModel = (
            selectModel === 'all' || 
            cardModel === selectModel || 
            (selectModel === 'vf5' && cardModel === 'limo') ||
            (selectModel === 'limo' && (cardModel === 'limo' || cardModel === 'vf5')) ||
            (selectModel === 'gas' && (cardModel === 'gas' || cardModel === 'fadil' || cardModel === 'lux-a' || cardModel === 'lux-sa'))
          );
          
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

  document.addEventListener('DOMContentLoaded', initCatalogFilters);
  window.filterCarCards = filterCarCards;
})();
`;

// ============================================================================
// MODULE 5: MODAL
// ============================================================================
const modalContent = `/**
 * Auto 28 Landing Page - Detail Modal & Lightbox Module
 */
(function() {
  'use strict';

  function closeModal() {
    const modal = document.getElementById('car-detail-modal') || document.getElementById('car-modal-view');
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  function initModalListeners() {
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalOverlay = document.getElementById('modal-overlay');

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-detail-trigger');
      if (!btn) return;

      e.preventDefault();
      e.stopPropagation();
      const card = btn.closest('.expressive-car-card');
      if (!card) return;

      const carId = card.getAttribute('data-car-id');
      const carInfo = (typeof carDetailsData !== 'undefined') ? (carDetailsData[carId] || carDetailsData[String(carId)]) : null;

      if (carInfo) {
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

        const batteryEl = document.getElementById('modal-spec-battery');
        if (batteryEl) batteryEl.textContent = carInfo.battery;

        const submitBtn = document.getElementById('btn-modal-action-submit');
        if (submitBtn) submitBtn.setAttribute('data-car-name', carInfo.title);

        const targetModal = document.getElementById('car-modal-view') || document.getElementById('car-detail-modal');
        if (targetModal) {
          targetModal.classList.add('open');
          targetModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', initModalListeners);
  window.closeModal = closeModal;
})();
`;

// ============================================================================
// MODULE 6: FORM HANDLER
// ============================================================================
const formHandlerContent = `/**
 * Auto 28 Landing Page - Form Lead Submission & Tracking Module
 */
(function() {
  'use strict';

  const activeTelegramToken = "7953282276:AAFEj6uPldXGfUaH2m3_YwR4Nq6qB2mX-Ew";
  const activeTelegramChatId = "-4672922718";

  function initFormHandlers() {
    // 1. Car Detail Modal Lead Form
    const leadForm = document.getElementById('lead-form');
    if (leadForm && !leadForm.dataset.listenerAttached) {
      leadForm.dataset.listenerAttached = 'true';
      leadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btnModalSubmit = document.getElementById('btn-modal-action-submit');
        const carName = btnModalSubmit ? btnModalSubmit.getAttribute('data-car-name') : 'Xe VinFast';
        const name = document.getElementById('modal-name') ? document.getElementById('modal-name').value.trim() : '';
        let phone = document.getElementById('modal-phone') ? document.getElementById('modal-phone').value.trim() : '';
        phone = phone.replace(/[\\s.-]/g, '');
        const confirmCheckbox = document.getElementById('confirm-intent');

        if (!name) {
          alert('Vui lòng nhập Họ tên của bạn!');
          return;
        }
        
        const phoneRegex = /^(0|84)?(3|5|7|8|9)\\d{8}$/;
        if (!phoneRegex.test(phone)) {
          alert('Số điện thoại không đúng định dạng di động Việt Nam. Vui lòng kiểm tra lại!');
          return;
        }

        if (!confirmCheckbox || !confirmCheckbox.checked) {
          alert('Vui lòng tích xác nhận đồng ý nhận tư vấn!');
          return;
        }

        const originalText = btnModalSubmit.textContent;
        btnModalSubmit.textContent = '⏳ ĐANG GỬI...';
        btnModalSubmit.disabled = true;

        const message = \`
<b>🔥 YÊU CẦU MUA XE / NHẬN ƯU ĐÃI</b>
--------------------------
🚗 <b>Dòng xe quan tâm:</b> \${carName}
👤 <b>Họ tên khách hàng:</b> \${name}
📞 <b>Số điện thoại khách:</b> <a href="tel:\${phone}">\${phone}</a>
--------------------------
⏰ <b>Gửi lúc:</b> \${new Date().toLocaleString('vi-VN')}
        \`;

        const params = new URLSearchParams({
          chat_id: activeTelegramChatId,
          text: message,
          parse_mode: 'HTML',
          disable_web_page_preview: true
        });

        try {
          const response = await fetch(\`https://api.telegram.org/bot\${activeTelegramToken}/sendMessage?\${params.toString()}\`);
          if (response.ok) {
            if (typeof gtag === 'function') {
              gtag('event', 'generate_lead', {
                'event_category': 'Conversion',
                'event_label': 'Modal Xem Ưu Đãi Mua Xe',
                'car_model': carName
              });
            }

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              'event': 'form_lead_success',
              'form_id': 'car_modal_lead_form',
              'form_name': 'Form Nhận Ưu Đãi Chi Tiết Xe',
              'car_model': carName,
              'event_id': 'lead_modal_' + new Date().getTime()
            });

            if (typeof fbq === 'function') fbq('track', 'Lead', { content_name: carName });

            btnModalSubmit.textContent = '✅ ĐÃ GỬI!';
            btnModalSubmit.style.background = '#16a34a';

            setTimeout(() => {
              if (window.closeModal) window.closeModal();
              btnModalSubmit.textContent = originalText;
              btnModalSubmit.disabled = false;
              btnModalSubmit.style.background = '';
              if (document.getElementById('modal-name')) document.getElementById('modal-name').value = '';
              if (document.getElementById('modal-phone')) document.getElementById('modal-phone').value = '';
              if (document.getElementById('confirm-intent')) document.getElementById('confirm-intent').checked = false;
            }, 2000);
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
  }

  document.addEventListener('DOMContentLoaded', initFormHandlers);
})();
`;

// ============================================================================
// MODULE 7: UI OBSERVERS
// ============================================================================
const uiObserversContent = `/**
 * Auto 28 Landing Page - UI Observers & Scroll Reveal Module
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

  function initUIObservers() {
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

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }

  document.addEventListener('DOMContentLoaded', initUIObservers);
  window.animateCounter = animateCounter;
})();
`;

// Write modules
fs.writeFileSync(path.join(modulesDir, 'utils.js'), utilsContent, 'utf8');
fs.writeFileSync(path.join(modulesDir, 'nav.js'), navContent, 'utf8');
fs.writeFileSync(path.join(modulesDir, 'hero.js'), heroContent, 'utf8');
fs.writeFileSync(path.join(modulesDir, 'catalog.js'), catalogContent, 'utf8');
fs.writeFileSync(path.join(modulesDir, 'modal.js'), modalContent, 'utf8');
fs.writeFileSync(path.join(modulesDir, 'form-handler.js'), formHandlerContent, 'utf8');
fs.writeFileSync(path.join(modulesDir, 'ui-observers.js'), uiObserversContent, 'utf8');

console.log('✅ Successfully created 7 modular files in js/modules/!');
