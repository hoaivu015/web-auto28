/**
 * 📡 AUTO 28 - ENTERPRISE SERVER-SIDE TRACKING & ATTRIBUTION PIPELINE (2026 TIER-1)
 * Standard: Event ID Deduplication, SHA-256 PII Hashing & sGTM Hybrid Support
 * Version: 2.2.0
 */

(function (window) {
    'use strict';

    // 1. Bit-Perfect Pure JS SHA-256 implementation (FIPS 180-4 Standard)
    function sha256Sync(ascii) {
        function rightRotate(value, amount) {
            return (value >>> amount) | (value << (32 - amount));
        }

        var i, j;
        var result = '';
        var words = [];

        var hash = [
            0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
            0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
        ];

        var k = [
            0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
            0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
            0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
            0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
            0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
            0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
            0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
            0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
        ];

        var utf8 = unescape(encodeURIComponent(String(ascii || '')));
        var utf8BitLength = utf8.length * 8;

        for (i = 0; i < utf8.length; i++) {
            words[i >> 2] |= (utf8.charCodeAt(i) & 0xff) << ((3 - (i % 4)) * 8);
        }

        words[utf8.length >> 2] |= 0x80 << ((3 - (utf8.length % 4)) * 8);
        words[(((utf8.length + 8) >> 6) + 1) * 16 - 1] = utf8BitLength;

        for (j = 0; j < words.length; j += 16) {
            var w = [];
            for (i = 0; i < 16; i++) {
                w[i] = words[j + i] | 0;
            }
            for (i = 16; i < 64; i++) {
                var s0 = rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3);
                var s1 = rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10);
                w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
            }

            var a = hash[0], b = hash[1], c = hash[2], d = hash[3];
            var e = hash[4], f = hash[5], g = hash[6], h = hash[7];

            for (i = 0; i < 64; i++) {
                var S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
                var ch = (e & f) ^ ((~e) & g);
                var temp1 = (h + S1 + ch + k[i] + w[i]) | 0;
                var S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
                var maj = (a & b) ^ (a & c) ^ (b & c);
                var temp2 = (S0 + maj) | 0;

                h = g;
                g = f;
                f = e;
                e = (d + temp1) | 0;
                d = c;
                c = b;
                b = a;
                a = (temp1 + temp2) | 0;
            }

            hash[0] = (hash[0] + a) | 0;
            hash[1] = (hash[1] + b) | 0;
            hash[2] = (hash[2] + c) | 0;
            hash[3] = (hash[3] + d) | 0;
            hash[4] = (hash[4] + e) | 0;
            hash[5] = (hash[5] + f) | 0;
            hash[6] = (hash[6] + g) | 0;
            hash[7] = (hash[7] + h) | 0;
        }

        for (i = 0; i < 8; i++) {
            for (j = 3; j >= 0; j--) {
                var byteVal = (hash[i] >>> (j * 8)) & 255;
                result += (byteVal < 16 ? '0' : '') + byteVal.toString(16);
            }
        }
        return result;
    }

    // 2. Normalization functions (Meta CAPI & GA4 Standards)
    function normalizePhone(phone) {
        if (!phone) return '';
        var cleaned = String(phone).replace(/\D/g, '');
        if (cleaned.startsWith('0')) {
            cleaned = '84' + cleaned.substring(1);
        } else if (cleaned.startsWith('84')) {
            // Already standard 84
        } else if (cleaned.length === 9 || cleaned.length === 10) {
            cleaned = '84' + cleaned;
        }
        return cleaned;
    }

    function normalizeEmail(email) {
        if (!email) return '';
        return String(email).trim().toLowerCase();
    }

    function normalizeName(name) {
        if (!name) return '';
        return String(name).trim().toLowerCase();
    }

    // 3. Unique Event ID Generator for Deduplication
    function generateEventId(prefix) {
        prefix = prefix || 'evt';
        var rand = Math.random().toString(36).substring(2, 11);
        return prefix + '_' + Date.now() + '_' + rand;
    }

    // 4. SHA-256 Hasher
    function hashSHA256(text) {
        if (!text) return '';
        return sha256Sync(String(text).trim());
    }

    // 5. Unified Enterprise Lead Dispatcher
    function dispatchLeadTracking(options) {
        options = options || {};
        var rawPhone = options.phone || '';
        var rawName = options.name || '';
        var rawEmail = options.email || '';
        var carName = options.carName || options.vehicleName || 'VinFast Lướt';
        var formId = options.formId || 'lead_form';
        var formType = options.formType || 'car_inquiry';
        var leadType = options.leadType || 'tu_van_xe';
        var value = options.value || 0;

        // 1. Generate single event ID for multi-platform deduplication
        var eventId = options.eventId || generateEventId('lead');

        // 2. Normalize and hash PII
        var normPhone = normalizePhone(rawPhone);
        var normEmail = normalizeEmail(rawEmail);
        var normName = normalizeName(rawName);

        var phoneHash = normPhone ? hashSHA256(normPhone) : '';
        var emailHash = normEmail ? hashSHA256(normEmail) : '';
        var nameHash = normName ? hashSHA256(normName) : '';

        // 3. Push to DataLayer with Structured User Data & Event ID
        window.dataLayer = window.dataLayer || [];
        var dataLayerPayload = {
            event: 'generate_lead',
            event_id: eventId,
            form_id: formId,
            form_type: formType,
            lead_type: leadType,
            vehicle_name: carName,
            value: value,
            currency: 'VND',
            user_data: {
                phone_sha256: phoneHash,
                name_sha256: nameHash,
                email_sha256: emailHash,
                city: 'Ho Chi Minh'
            },
            timestamp: new Date().toISOString()
        };

        window.dataLayer.push(dataLayerPayload);

        // Backward compatibility events for existing GTM triggers
        window.dataLayer.push({
            event: 'lead_form_submitted',
            event_id: eventId,
            form_id: formId,
            form_type: formType,
            vehicle_name: carName
        });

        window.dataLayer.push({
            event: 'form_lead_success',
            event_id: eventId,
            vehicle_name: carName
        });

        // 4. Fire Meta Pixel with Advanced Matching & Deduplication EventID
        if (typeof window.fbq === 'function') {
            try {
                var metaUserData = {};
                if (phoneHash) metaUserData.ph = phoneHash;
                if (emailHash) metaUserData.em = emailHash;
                if (nameHash) metaUserData.fn = nameHash;

                if (Object.keys(metaUserData).length > 0) {
                    window.fbq('setUserProperties', '537471081061777', metaUserData);
                }

                window.fbq('track', 'Lead', {
                    content_name: carName,
                    content_category: 'VinFast Xe Lướt',
                    value: value,
                    currency: 'VND'
                }, {
                    eventID: eventId
                });
            } catch (e) {
                console.warn('[TrackingPipeline] Meta Pixel tracking error:', e.message);
            }
        }

        // 5. Fire TikTok Pixel with Event ID
        if (typeof window.ttq === 'function') {
            try {
                if (normPhone && typeof window.ttq.identify === 'function') {
                    window.ttq.identify({
                        phone_number: phoneHash
                    });
                }
                window.ttq.track('CompleteRegistration', {
                    content_name: carName,
                    value: value,
                    currency: 'VND'
                }, {
                    event_id: eventId
                });
            } catch (e) {
                console.warn('[TrackingPipeline] TikTok Pixel tracking error:', e.message);
            }
        }

        // 6. Fire Google Analytics 4 / Google Ads
        if (typeof window.gtag === 'function') {
            try {
                window.gtag('event', 'generate_lead', {
                    event_id: eventId,
                    transaction_id: eventId,
                    event_category: 'Conversion',
                    event_label: carName + ' - ' + formId,
                    value: value,
                    currency: 'VND'
                });
            } catch (e) {
                console.warn('[TrackingPipeline] GA4 tracking error:', e.message);
            }
        }

        return {
            eventId: eventId,
            phoneHash: phoneHash,
            emailHash: emailHash,
            nameHash: nameHash,
            normPhone: normPhone
        };
    }

    // Export Global API
    window.Auto28Tracking = {
        generateEventId: generateEventId,
        hashSHA256: hashSHA256,
        normalizePhone: normalizePhone,
        normalizeEmail: normalizeEmail,
        normalizeName: normalizeName,
        dispatchLeadTracking: dispatchLeadTracking
    };

    // Global helper shortcuts
    window.generateEventId = generateEventId;
    window.hashSHA256 = hashSHA256;
    window.dispatchLeadTracking = dispatchLeadTracking;

})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
