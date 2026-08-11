/**
 * Auto 28 Landing Page - AI Valuation & Wizard Form Module
 * Safe Refactoring Standard: Tier-1 Enterprise
 */
(function() {
    'use strict';

    const baseValuationMatrix = {
        'vf3': { min: 240, max: 285 },
        'vf5': { min: 410, max: 470 },
        'vf6': { min: 590, max: 690 },
        'vf7': { min: 740, max: 880 },
        'vf8': { min: 710, max: 910 },
        'vf9': { min: 1150, max: 1450 },
        'vfe34': { min: 420, max: 490 },
        'lux-a': { min: 480, max: 580 },
        'lux-sa': { min: 610, max: 740 },
        'fadil': { min: 300, max: 360 },
        'limo': { min: 550, max: 680 },
        'mpv': { min: 600, max: 750 },
        'president': { min: 1800, max: 2200 }
    };

    function updateAIPriceEstimate() {
        const carModelSelect = document.getElementById('car-model');
        const yearSelect = document.getElementById('year');
        const kmSelect = document.getElementById('km');
        const aiPriceRangeVal = document.getElementById('ai-price-range-val');

        if (!aiPriceRangeVal || !carModelSelect || !yearSelect || !kmSelect) return;

        const modelKey = carModelSelect.value || 'vf8';
        const yearVal = parseInt(yearSelect.value, 10) || 2024;
        const kmText = kmSelect.value || '';

        const base = baseValuationMatrix[modelKey] || { min: 500, max: 700 };
        
        let yearMult = 1.0;
        if (yearVal === 2026) yearMult = 1.08;
        else if (yearVal === 2025) yearMult = 1.04;
        else if (yearVal === 2023) yearMult = 0.94;
        else if (yearVal === 2022) yearMult = 0.88;

        let kmMult = 1.0;
        if (kmText.includes('Dưới 10.000')) kmMult = 1.05;
        else if (kmText.includes('30.000 – 60.000')) kmMult = 0.95;
        else if (kmText.includes('Trên 60.000')) kmMult = 0.90;

        const minEst = Math.round(base.min * yearMult * kmMult);
        const maxEst = Math.round(base.max * yearMult * kmMult);

        let formattedStr = '';
        if (minEst >= 1000) {
            formattedStr = `${(minEst / 1000).toFixed(2).replace('.', ',')} – ${(maxEst / 1000).toFixed(2).replace('.', ',')} Tỷ VNĐ`;
        } else {
            formattedStr = `${minEst} – ${maxEst} Triệu VNĐ`;
        }

        aiPriceRangeVal.style.opacity = '0.4';
        aiPriceRangeVal.style.transform = 'scale(0.96)';
        setTimeout(() => {
            aiPriceRangeVal.textContent = formattedStr;
            aiPriceRangeVal.style.opacity = '1';
            aiPriceRangeVal.style.transform = 'scale(1)';
        }, 150);
    }

    function initAIValuation() {
        const btnNextStep = document.getElementById('btn-next-step');
        const btnPrevStep = document.getElementById('btn-prev-step');
        const sellStep1 = document.getElementById('sell-step-1');
        const sellStep2 = document.getElementById('sell-step-2');
        const carModelSelect = document.getElementById('car-model');
        const yearSelect = document.getElementById('year');
        const kmSelect = document.getElementById('km');
        const sellPricingForm = document.getElementById('sell-pricing-form');
        const ctaBtn = document.getElementById('cta-primary');

        if (carModelSelect && yearSelect && kmSelect) {
            carModelSelect.addEventListener('change', updateAIPriceEstimate);
            yearSelect.addEventListener('change', updateAIPriceEstimate);
            kmSelect.addEventListener('change', updateAIPriceEstimate);
            updateAIPriceEstimate();
        }

        if (btnNextStep && btnPrevStep && sellStep1 && sellStep2) {
            btnNextStep.addEventListener('click', () => {
                sellStep1.classList.add('fade-out');
                setTimeout(() => {
                    sellStep1.style.display = 'none';
                    sellStep1.classList.remove('fade-out');
                    sellStep2.style.display = 'flex';
                    sellStep2.classList.remove('hidden-setup');
                    sellStep2.classList.add('fade-in');
                }, 350);
            });

            btnPrevStep.addEventListener('click', () => {
                sellStep2.classList.add('fade-out');
                setTimeout(() => {
                    sellStep2.style.display = 'none';
                    sellStep2.classList.remove('fade-out');
                    sellStep2.classList.add('hidden-setup');
                    sellStep1.style.display = 'flex';
                    sellStep1.classList.add('fade-in');
                }, 300);
            });
        }

        // Valuation submit handler with DataLayer tracking
        const handleValuationSubmit = async (e) => {
            if (e) e.preventDefault();
            
            const formEl = document.getElementById('sell-pricing-form');
            
            // 🍯 1. HONEYPOT TRAP CHECK
            if (formEl) {
                const hpField = formEl.querySelector('input[name="confirm_website_user_trap"]');
                if (hpField && hpField.value !== '') {
                    // Bot trapped! Silent return with fake success message to fool the bot
                    alert('Gửi yêu cầu thành công! Tư vấn viên Auto 28 sẽ liên hệ quý khách ngay.');
                    return;
                }
            }

            // ⏳ 2. TIME-BASED SUBMISSION CHECK (Minimum 1.5 seconds)
            if (formEl) {
                const focusTime = parseInt(formEl.getAttribute('data-focus-time') || '0', 10);
                if (focusTime > 0) {
                    const durationSec = (Date.now() - focusTime) / 1000;
                    if (durationSec < 1.5) {
                        alert('Thao tác quá nhanh! Vui lòng kiểm tra lại thông tin.');
                        return;
                    }
                }
            }

            // 📱 3. STRICT VN PHONE FORMAT & REPETITION CHECK
            const phoneInput = document.getElementById('customer-phone');
            const rawPhone = phoneInput ? phoneInput.value.trim() : '';
            const phoneCheck = typeof window.validateVNPhoneNumber === 'function' 
                ? window.validateVNPhoneNumber(rawPhone) 
                : { valid: rawPhone.length >= 10, cleanPhone: rawPhone.replace(/\D/g, '') };

            if (!phoneCheck.valid) {
                alert(phoneCheck.reason || 'Vui lòng nhập chính xác số điện thoại (10 chữ số) để nhận định giá!');
                if (phoneInput) phoneInput.focus();
                return;
            }
            const phone = phoneCheck.cleanPhone;

            const modelSelect = document.getElementById('car-model');
            const modelName = modelSelect ? modelSelect.options[modelSelect.selectedIndex].text : 'VinFast';
            const year = document.getElementById('year') ? document.getElementById('year').value : '';
            const km = document.getElementById('km') ? document.getElementById('km').value : '';
            const aiPriceRangeVal = document.getElementById('ai-price-range-val');
            const estimatedPrice = aiPriceRangeVal ? aiPriceRangeVal.textContent : '';

            const originalText = ctaBtn ? ctaBtn.textContent : 'NHẬN BÁO GIÁ MIỄN PHÍ NGAY';
            if (ctaBtn) {
                ctaBtn.textContent = '⏳ ĐANG TÍNH GIÁ AI...';
                ctaBtn.disabled = true;
            }

            const activeTelegramToken = window.activeTelegramToken || '8354150269:AAF2da1-GZAXNgDVplWot053UDETG7CX5ss'; 
            const activeTelegramChatId = window.activeTelegramChatId || '2117317097'; 

            const message = `
<b>🚀 YÊU CẦU BÁO GIÁ THU MUA MỚI (AI)</b>
--------------------------
🚗 <b>Dòng xe cũ:</b> ${modelName}
📅 <b>Năm sản xuất:</b> ${year}
🛣️ <b>Số Odo:</b> ${km}
💰 <b>Giá AI dự kiến:</b> ${estimatedPrice}
📞 <b>Số điện thoại:</b> <a href="tel:${phone}">${phone}</a>
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
                const response = await fetch(`https://api.telegram.org/bot${activeTelegramToken}/sendMessage?${params.toString()}`);
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

                    // GTM Datalayer Push (Preserved 100%)
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        'event': 'form_lead_success',
                        'event_category': 'Lead',
                        'form_id': 'sell-pricing-form',
                        'car_model': modelName,
                        'car_year': year,
                        'car_km': km,
                        'phone': cleanPhone
                    });

                    window.dataLayer.push({
                        'event': 'form_submit_success',
                        'form_id': 'hero_pricing_form_sell',
                        'car_model': modelName,
                        'car_year': year,
                        'car_km': km
                    });

                    if (typeof fbq === 'function') fbq('track', 'Lead', { content_name: modelName });
                    if (typeof ttq === 'function') ttq.track('CompleteRegistration', { content_name: modelName });

                    if (ctaBtn) {
                        ctaBtn.textContent = '✅ ĐÃ GỬI BÁO GIÁ THÀNH CÔNG!';
                        ctaBtn.style.background = '#16a34a';
                    }

                    setTimeout(() => {
                        if (ctaBtn) {
                            ctaBtn.textContent = originalText;
                            ctaBtn.disabled = false;
                            ctaBtn.style.background = '';
                        }
                        if (phoneInput) phoneInput.value = '';
                        
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
                if (ctaBtn) {
                    ctaBtn.textContent = '❌ LỖI GỬI. HÃY GỌI HOTLINE!';
                    ctaBtn.style.background = '#dc2626';
                    setTimeout(() => {
                        ctaBtn.textContent = originalText;
                        ctaBtn.disabled = false;
                        ctaBtn.style.background = '';
                    }, 2500);
                }
            }
        };

        if (sellPricingForm) {
            sellPricingForm.addEventListener('submit', handleValuationSubmit);
        } else if (ctaBtn) {
            ctaBtn.addEventListener('click', handleValuationSubmit);
        }
    }

    window.updateAIPriceEstimate = updateAIPriceEstimate;
    // 🛡️ ANTI-BOT FORM SECURITY HELPER
    function validateVNPhoneNumber(phoneStr) {
        if (!phoneStr) return { valid: false, reason: 'Chưa nhập số điện thoại' };
        const clean = phoneStr.replace(/\D/g, '');
        // Must be 10 digits starting with VN mobile prefixes
        const vnPhoneRegex = /^(03|05|07|08|09)\d{8}$/;
        if (!vnPhoneRegex.test(clean)) {
            return { valid: false, reason: 'Số điện thoại không đúng định dạng Việt Nam (VD: 0901234567)' };
        }
        // Block obvious repetitive bot sequences (e.g. 0909090909, 0123456789, 0999999999)
        const isRepeated = /^(\d)\1{9}$/.test(clean) || clean === '0123456789' || clean === '0987654321';
        if (isRepeated) {
            return { valid: false, reason: 'Số điện thoại không hợp lệ, vui lòng kiểm tra lại' };
        }
        return { valid: true, cleanPhone: clean };
    }

    function initFormHoneypotAndTimer() {
        document.querySelectorAll('form').forEach(form => {
            if (form.getAttribute('data-bot-protected')) return;
            form.setAttribute('data-bot-protected', 'true');
            form.setAttribute('data-focus-time', '0');

            // 1. Honeypot Field (Hidden from real users)
            const hpField = document.createElement('input');
            hpField.type = 'text';
            hpField.name = 'confirm_website_user_trap';
            hpField.className = 'hp-trap-field';
            hpField.tabIndex = -1;
            hpField.autocomplete = 'off';
            hpField.style.cssText = 'opacity: 0; position: absolute; top: 0; left: 0; height: 0; width: 0; z-index: -1; pointer-events: none; margin: 0; padding: 0; border: none;';
            form.appendChild(hpField);

            // 2. Track form interaction start time
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    if (!form.getAttribute('data-focus-time') || form.getAttribute('data-focus-time') === '0') {
                        form.setAttribute('data-focus-time', Date.now().toString());
                    }
                }, { once: true });
            });
        });
    }

    // Initialize Honeypot on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFormHoneypotAndTimer);
    } else {
        initFormHoneypotAndTimer();
    }

    window.validateVNPhoneNumber = validateVNPhoneNumber;
    window.initFormHoneypotAndTimer = initFormHoneypotAndTimer;

    window.initAIValuation = initAIValuation;
})();
