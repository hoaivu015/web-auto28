const fs = require('fs');
const path = require('path');

const SEO_ROUTES_CONFIG = {
  'lux-a': {
    modelName: 'VinFast Lux A2.0',
    pageTitle: 'Xe VinFast Lux A Lướt Giá Tốt TP.HCM (Base/Plus/Pre) | Auto 28',
    metaDesc: 'Mua bán xe VinFast Lux A2.0 lướt chính chủ tại Auto 28 TP.HCM. Đủ phiên bản Base, Plus, Premium đời 2019–2022, odo chuẩn từ 6.000 km, sơn zin, bao test hãng 176 hạng mục. Giá từ 490 triệu.',
    h2Title: 'Kho Xe VinFast Lux A2.0 Lướt Sẵn Giao Ngay (6 Xe)',
    h2Desc: 'Đủ phiên bản Base, Plus, Premium đời 2019–2022 • Odo chuẩn từ 6.000 km, sơn zin • Động cơ 2.0L Turbo & hộp số ZF 8 cấp nguyên bản, kiểm tra khung gầm 176 hạng mục.',
    heroHeadlineHtml: 'Sở Hữu Xe VinFast Lux A2.0 Lướt Tuyển Chọn – <br><span class="text-gradient">Odo Chuẩn, Bao Test Hãng 176 Hạng Mục.</span>',
    heroDirectAnswer: 'Auto 28 chuyên cung cấp xe VinFast Lux A lướt (đủ 3 bản Base, Plus, Premium đời 2019–2022) tại TP.HCM, Bình Dương, Đồng Nai với giá từ 490 – 570 triệu. Odo chuẩn từ 6.000 km, động cơ 2.0L Turbo & hộp số ZF 8 cấp nguyên bản, hỗ trợ trả góp 70%, giao xe tận nhà 24h.',
    ogImage: 'https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781708030/inventory/jqdikmalpmawqnz4l9sy.jpg'
  },
  'lux-sa': {
    modelName: 'VinFast Lux SA2.0',
    pageTitle: 'Xe VinFast Lux SA2.0 Lướt Giá Tốt TP.HCM (Base/Plus/Full) | Auto 28',
    metaDesc: 'Mua bán xe VinFast Lux SA2.0 lướt 7 chỗ tại Auto 28 TP.HCM. Đủ bản Base, Plus, Full đời 2019–2022, máy 2.0L Turbo BMW N20 nguyên bản, bao test hãng 176 hạng mục. Giá từ 560 triệu.',
    h2Title: 'Kho Xe VinFast Lux SA2.0 Lướt Sẵn Giao Ngay (2 Xe)',
    h2Desc: 'SUV 7 chỗ gầm cao máy 2.0L Turbo BMW N20 • Đủ bản Base, Plus, Full đời 2019–2022 • Odo chuẩn, kiểm tra khung gầm và bao test hãng 176 hạng mục.',
    heroHeadlineHtml: 'Sở Hữu SUV 7 Chỗ VinFast Lux SA2.0 Lướt – <br><span class="text-gradient">Khung Gầm Chuẩn Đức, Bao Test Hãng Toàn Quốc.</span>',
    heroDirectAnswer: 'Auto 28 cung cấp xe VinFast Lux SA2.0 lướt 7 chỗ (bản Base, Plus, Full đời 2019–2022) tại TP.HCM, Bình Dương, Đồng Nai với giá từ 560 – 640 triệu. Cam kết odo chuẩn, sơn zin, kiểm tra khung gầm 176 hạng mục chính hãng, sang tên trọn gói trong ngày.',
    ogImage: 'https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781707843/inventory/dozwpz3ecfolh3efouce.jpg'
  },
  'fadil': {
    modelName: 'VinFast Fadil',
    pageTitle: 'Xe VinFast Fadil Lướt Giá Tốt TP.HCM | Auto 28',
    metaDesc: 'Mua bán xe VinFast Fadil lướt đời 2020–2022 tại Auto 28 TP.HCM. Odo chuẩn, sơn zin, máy 1.4L bền bỉ, bao test hãng 176 hạng mục, sang tên trong ngày. Giá từ 240 triệu.',
    h2Title: 'Kho Xe VinFast Fadil Lướt Sẵn Giao Ngay (2 Xe)',
    h2Desc: 'Hatchback đô thị máy 1.4L bền bỉ • Đời 2020–2022 odo chuẩn, sơn zin, bao test hãng 176 hạng mục, sang tên trọn gói trong ngày.',
    heroHeadlineHtml: 'Sở Hữu Xe VinFast Fadil Lướt Nguyên Bản – <br><span class="text-gradient">Máy 1.4L Bền Bỉ, Sang Tên Ngay Trong Ngày.</span>',
    heroDirectAnswer: 'Auto 28 cung cấp xe VinFast Fadil lướt (Base, Nâng Cao, Cao Cấp đời 2020–2022) tại TP.HCM, Bình Dương, Đồng Nai với giá từ 240 – 280 triệu. Cam kết odo chuẩn, không đâm đụng ngập nước, bao test hãng 176 hạng mục và hỗ trợ trả góp 70%.',
    ogImage: 'https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781709008/inventory/nqkaqbyzvfqqitb3hvdo.jpg'
  },
  'vf3': {
    modelName: 'VinFast VF 3',
    pageTitle: 'Xe VinFast VF 3 Lướt Giá Tốt TP.HCM | Auto 28',
    metaDesc: 'Chuyên xe điện VinFast VF 3 lướt xe mua pin chính hãng tại Auto 28 TP.HCM. Odo siêu lướt từ 1.200 km, sẵn xe giao ngay, bao test hãng 176 hạng mục.',
    h2Title: 'Kho Xe Điện VinFast VF 3 Lướt Sẵn Giao Ngay (3 Xe)',
    h2Desc: 'Mini e-SUV đô thị siêu lướt • Xe mua pin chính hãng, odo chuẩn từ 1.200 km, sẵn xe giao ngay trong ngày tại TP.HCM.',
    heroHeadlineHtml: 'Sở Hữu Xe Điện VinFast VF 3 Siêu Lướt – <br><span class="text-gradient">Xe Mua Pin Chính Hãng, Sẵn Xe Giao Ngay.</span>',
    heroDirectAnswer: 'Auto 28 cung cấp xe điện VinFast VF 3 lướt (xe mua pin, đã lên sẵn phụ kiện cao cấp) tại TP.HCM, Bình Dương, Đồng Nai với giá từ 240 – 310 triệu. Odo siêu lướt từ 1.200 km, đo SOH pin thực tế, bao test hãng 176 hạng mục, giao xe tận nhà 24h.',
    ogImage: 'https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781544317/inventory/kdqmkc6i8urcci3foaew.jpg'
  },
  'vf5': {
    modelName: 'VinFast VF 5 Plus',
    pageTitle: 'Xe VinFast VF 5 Plus Lướt Giá Tốt TP.HCM | Auto 28',
    metaDesc: 'Mua bán xe điện VinFast VF 5 Plus lướt tại Auto 28 TP.HCM. Có sẵn xe mua pin & xe thuê pin, đo dung lượng pin SOH > 92%, bao test hãng 176 hạng mục.',
    h2Title: 'Kho Xe Điện VinFast VF 5 Plus Lướt Sẵn Giao Ngay (5 Xe)',
    h2Desc: 'A-SUV điện kinh tế tối ưu • Xe mua pin & xe thuê pin, đo SOH pin thực tế > 92%, bao test hãng 176 hạng mục.',
    heroHeadlineHtml: 'Sở Hữu Xe Điện VinFast VF 5 Plus Lướt – <br><span class="text-gradient">Xe Mua Pin, SOH > 92%, Kinh Tế Tối Ưu.</span>',
    heroDirectAnswer: 'Auto 28 chuyên cung cấp xe điện VinFast VF 5 Plus lướt đời 2024–2025 (xe mua pin & xe thuê pin) tại TP.HCM, Bình Dương, Đồng Nai với giá từ 350 – 460 triệu. Cam kết SOH pin > 92%, bao test hãng 176 hạng mục, hỗ trợ vay 80% và giao xe 24h.',
    ogImage: 'https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781709568/inventory/zd6iu9qtpf0jair1jhyx.jpg'
  },
  'vf6': {
    modelName: 'VinFast VF 6',
    pageTitle: 'Xe VinFast VF 6 Lướt Giá Tốt TP.HCM (Eco/Plus) | Auto 28',
    metaDesc: 'Mua bán xe điện VinFast VF 6 lướt (Eco & Plus) tại Auto 28 TP.HCM. Odo chuẩn, bảo hành chính hãng, bao test 176 hạng mục, hỗ trợ trả góp 80%.',
    h2Title: 'Kho Xe Điện VinFast VF 6 Lướt Sẵn Giao Ngay (7 Xe)',
    h2Desc: 'B-SUV gia đình hiện đại (Eco / Plus) • Odo chuẩn, bảo hành chính hãng dài hạn, hỗ trợ trả góp 80% giá trị xe.',
    heroHeadlineHtml: 'Sở Hữu Xe Điện VinFast VF 6 Lướt (Eco/Plus) – <br><span class="text-gradient">Odo Chuẩn, Bảo Hành Chính Hãng Dài Hạn.</span>',
    heroDirectAnswer: 'Auto 28 cung cấp xe điện VinFast VF 6 lướt (bản Eco & Plus đời 2024–2025) tại TP.HCM, Bình Dương, Đồng Nai với giá từ 565 – 630 triệu. Xe mua pin chính hãng, odo từ 13.000 km, bao test hãng 176 hạng mục, hỗ trợ sang tên trọn gói trong ngày.',
    ogImage: 'https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781709177/inventory/ci5f0omtx7mjovhtvya8.jpg'
  },
  'vf7': {
    modelName: 'VinFast VF 7',
    pageTitle: 'Xe VinFast VF 7 Lướt Giá Tốt TP.HCM (Eco/Plus) | Auto 28',
    metaDesc: 'Mua bán xe điện VinFast VF 7 lướt (Eco, Plus, Hỏa Long) tại Auto 28 TP.HCM. Odo siêu lướt từ 181 km, cam kết nguyên bản 100%, bao test hãng 176 hạng mục.',
    h2Title: 'Kho Xe Điện VinFast VF 7 Lướt Sẵn Giao Ngay (7 Xe)',
    h2Desc: 'C-SUV thể thao mạnh mẽ (Eco / Plus / Hỏa Long) • Odo siêu lướt từ 181 km, cam kết nguyên bản 100%, bao test hãng.',
    heroHeadlineHtml: 'Sở Hữu C-SUV VinFast VF 7 Siêu Lướt – <br><span class="text-gradient">Odo Từ 181 Km, Nguyên Bản 100% Như Mới.</span>',
    heroDirectAnswer: 'Auto 28 cung cấp xe điện VinFast VF 7 lướt (bản Eco, Plus AWD và bản giới hạn Hỏa Long) tại TP.HCM, Bình Dương, Đồng Nai với giá từ 740 – 850 triệu. Odo siêu lướt từ 181 km, cam kết SOH pin thực tế, bao test hãng 176 hạng mục, hỗ trợ vay 80%.',
    ogImage: 'https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781709448/inventory/ewa3yyqts4rhldte2buv.jpg'
  },
  'vf8': {
    modelName: 'VinFast VF 8',
    pageTitle: 'Xe VinFast VF 8 Lướt Giá Tốt TP.HCM (Eco/Plus) | Auto 28',
    metaDesc: 'Mua bán xe điện VinFast VF 8 lướt (Eco & Plus AWD) tại Auto 28 TP.HCM. Đo dung lượng pin SOH thực tế, bao test hãng 176 hạng mục, giao xe tận nhà 24h.',
    h2Title: 'Kho Xe Điện VinFast VF 8 Lướt Sẵn Giao Ngay',
    h2Desc: 'D-SUV 2 cầu AWD cao cấp (Eco / Plus) • Cam kết dung lượng pin SOH thực tế, bao test hãng 176 hạng mục toàn quốc.',
    heroHeadlineHtml: 'Sở Hữu D-SUV Điện VinFast VF 8 Lướt – <br><span class="text-gradient">2 Cầu AWD Mạnh Mẽ, Bảo Hành Chính Hãng 10 Năm.</span>',
    heroDirectAnswer: 'Auto 28 cung cấp xe điện VinFast VF 8 lướt (Eco & Plus AWD) tại TP.HCM, Bình Dương, Đồng Nai với giá từ 590 – 780 triệu. Cam kết SOH pin trên 92%, bao test hãng 176 hạng mục toàn quốc, hỗ trợ vay ngân hàng 80% và đổi trả trong 7 ngày.',
    ogImage: 'https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781705660/inventory/pbrfecxsfpgsfinmzwon.jpg'
  },
  'vf9': {
    modelName: 'VinFast VF 9',
    pageTitle: 'Xe VinFast VF 9 Lướt Giá Tốt TP.HCM | Auto 28',
    metaDesc: 'Mua bán xe điện VinFast VF 9 lướt 6 chỗ / 7 chỗ tại Auto 28 TP.HCM. Odo chuẩn, bảo hành chính hãng 10 năm, bao test 176 hạng mục.',
    h2Title: 'Kho Xe Điện VinFast VF 9 Lướt Sẵn Giao Ngay',
    h2Desc: 'E-SUV Full-size 6 chỗ / 7 chỗ chủ tịch • Odo chuẩn, tiếp nối bảo hành chính hãng 10 năm, bàn giao tận nhà.',
    heroHeadlineHtml: 'Sở Hữu E-SUV Chủ Tịch VinFast VF 9 Lướt – <br><span class="text-gradient">Đẳng Cấp 6 Chỗ Captain, Giao Xe Tận Nhà.</span>',
    heroDirectAnswer: 'Auto 28 cung cấp xe điện VinFast VF 9 lướt (Eco & Plus 6 chỗ / 7 chỗ) tại TP.HCM, Bình Dương, Đồng Nai với giá từ 1.15 – 1.45 tỷ. Cam kết odo chuẩn, bảo hành chính hãng 10 năm, kiểm định 176 hạng mục và bàn giao tận nhà bằng xe chuyên dụng.',
    ogImage: 'https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781709568/inventory/zd6iu9qtpf0jair1jhyx.jpg'
  },
  'vfe34': {
    modelName: 'VinFast VF e34',
    pageTitle: 'Xe VinFast VF e34 Lướt Giá Tốt TP.HCM | Auto 28',
    metaDesc: 'Mua bán xe điện VinFast VF e34 lướt tại Auto 28 TP.HCM. Kiểm định SOH pin thực tế, sang tên hợp đồng pin trọn gói 24h, bao test hãng 176 hạng mục.',
    h2Title: 'Kho Xe Điện VinFast VF e34 Lướt Sẵn Giao Ngay',
    h2Desc: 'C-SUV điện rộng rãi, tiết kiệm • Kiểm định dung lượng pin SOH thực tế, hỗ trợ sang tên hợp đồng pin trong 24h.',
    heroHeadlineHtml: 'Sở Hữu Xe Điện VinFast VF e34 Lướt – <br><span class="text-gradient">Kiểm Định Pin SOH Thực Tế, Sang Tên 24h.</span>',
    heroDirectAnswer: 'Auto 28 cung cấp xe điện VinFast VF e34 lướt tại TP.HCM, Bình Dương, Đồng Nai với giá từ 420 – 480 triệu. Cam kết đo dung lượng pin SOH thực tế từ BMS, bao test hãng 176 hạng mục, hỗ trợ chuyển nhượng hợp đồng pin chính chủ trong 24 giờ.',
    ogImage: 'https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781709568/inventory/zd6iu9qtpf0jair1jhyx.jpg'
  },
  'limo': {
    modelName: 'VinFast LIMO Green',
    pageTitle: 'Xe VinFast LIMO Lướt Giá Tốt TP.HCM (Xe Mua Pin) | Auto 28',
    metaDesc: 'Mua bán xe điện VinFast LIMO Green lướt đời 2025 tại Auto 28 TP.HCM. Xe mua pin chính hãng, odo siêu lướt từ 2.000 km, bao test hãng 176 hạng mục.',
    h2Title: 'Kho Xe Điện VinFast LIMO Lướt Sẵn Giao Ngay (4 Xe)',
    h2Desc: 'Xe mua pin chính hãng, odo siêu lướt từ 2.000 km • Hồ sơ pháp lý sẵn sàng sang tên ngay trong ngày.',
    heroHeadlineHtml: 'Sở Hữu Xe Điện VinFast LIMO Green Siêu Lướt – <br><span class="text-gradient">Xe Mua Pin, Odo Từ 2.000 Km Sẵn Giao Ngay.</span>',
    heroDirectAnswer: 'Auto 28 chuyên cung cấp xe điện VinFast LIMO lướt đời 2025 (xe mua pin chính hãng, odo chỉ từ 2.000 – 6.000 km) tại TP.HCM, Bình Dương, Đồng Nai. Bao test hãng 176 hạng mục, hỗ trợ vay trả góp 80% và sang tên trọn gói trong ngày.',
    ogImage: 'https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781709271/inventory/y0hirczcjktrmkg3hwoq.jpg'
  },
  'mpv': {
    modelName: 'VinFast MPV 7',
    pageTitle: 'Xe VinFast MPV 7 Lướt Giá Tốt TP.HCM | Auto 28',
    metaDesc: 'Mua bán xe điện 7 chỗ VinFast MPV 7 lướt tại Auto 28 TP.HCM. Xe mua pin chính hãng, bao test 176 hạng mục, hỗ trợ vay ngân hàng 80%. Giá từ 670 triệu.',
    h2Title: 'Kho Xe Điện VinFast MPV 7 Lướt Sẵn Giao Ngay',
    h2Desc: 'MPV 7 chỗ đa dụng thế hệ mới • Bao test hãng 176 hạng mục, hỗ trợ vay ngân hàng đến 80%.',
    heroHeadlineHtml: 'Sở Hữu Xe Điện 7 Chỗ VinFast MPV 7 Lướt – <br><span class="text-gradient">Rộng Rãi Đa Dụng, Bao Test Hãng 176 Hạng Mục.</span>',
    heroDirectAnswer: 'Auto 28 cung cấp dòng xe điện 7 chỗ VinFast MPV 7 lướt tại TP.HCM, Bình Dương, Đồng Nai với giá từ 670 triệu. Cam kết xe mua pin chính hãng, kiểm định 176 hạng mục tại xưởng dịch vụ VinFast, hỗ trợ trả góp 80% và giao xe tận nhà 24h.',
    ogImage: 'https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781709568/inventory/zd6iu9qtpf0jair1jhyx.jpg'
  }
};

function buildSsrCarsGridHtml(modelSlug) {
  try {
    const carsDataRaw = fs.readFileSync(path.join(__dirname, 'cars_data.js'), 'utf8');
    const jsonMatch = carsDataRaw.match(/window\.staticCarsData\s*=\s*(\[[\s\S]*\]);?/);
    if (!jsonMatch) return null;
    const vehicles = JSON.parse(jsonMatch[1].replace(/;\s*$/, ''));
    if (!Array.isArray(vehicles) || !vehicles.length) return null;

    const icoOdo = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
    const icoColor = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`;
    const icoBatt = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2"/></svg>`;
    const icoFuel = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M17 22V10l4 4"/><line x1="1" y1="22" x2="23" y2="22"/></svg>`;
    const icoShieldCheck = `<svg class="badge-icon" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`;

    const formatUrl = (url, w = 400) => {
      if (!url || !url.includes('cloudinary.com')) return url || '';
      const clean = url.replace(/\/upload\/(?:[^\/]+\/)?(v\d+\/)/, '/upload/$1');
      return clean.replace('/upload/', `/upload/w_${w},c_limit,f_auto,q_auto/`);
    };

    return vehicles.map(car => {
      const nameLower = (car.name || '').toLowerCase();
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
      const yearVal = car.year || '2024';
      const odoText = car.odo ? car.odo.toLocaleString('vi-VN') + ' km' : 'Siêu lướt';
      const colorText = car.color ? car.color.replace(/^Màu\s+/i, '') : 'Bạc';
      const battIcon = isElectric ? icoBatt : icoFuel;
      const battPillText = isElectric ? ((car.battery_type === 'Xe thuê pin' || car.battery_type === 'Thuê Pin') ? 'Xe thuê pin' : 'Xe mua pin') : 'Xăng';
      const descriptiveAlt = `Xe ${car.name} lướt đời ${yearVal} màu ${colorText} tại Auto 28 TP.HCM`;
      const isVisible = !modelSlug || modelSlug === 'all' || modelType === modelSlug;
      const displayStyle = isVisible ? 'display: flex;' : 'display: none; opacity: 0; transform: scale(0.95);';

      return `            <article class="expressive-car-card reveal visible" data-model="${modelType}" data-price="0" data-car-id="${car.id}" itemscope itemtype="https://schema.org/Car" style="${displayStyle}">
                <div class="card-top">
                    <div class="card-img-container">
                        <img src="${formatUrl(car.image_url, 400)}" width="400" height="225" crossorigin="anonymous" alt="${descriptiveAlt}" itemprop="image" class="card-img" loading="lazy" decoding="async" style="${car.image_position ? `object-position: ${car.image_position};` : ''}">
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
                                <span class="price-label">Liên hệ báo giá</span>
                                <span class="price-value">Liên hệ</span>
                            </div>
                            <button class="btn-card-action" aria-label="Xem chi tiết xe ${car.name}">Xem Chi Tiết Xe</button>
                        </div>
                    </div>
                </div>
            </article>`;
    }).join('\n');
  } catch (e) {
    return null;
  }
}

function generateShowroomHtml(modelSlug) {
  const rootDir = __dirname;
  const compDir = path.join(rootDir, 'src', 'components');
  const routeMeta = (modelSlug && SEO_ROUTES_CONFIG[modelSlug]) ? SEO_ROUTES_CONFIG[modelSlug] : null;
  const pageTitle = routeMeta ? routeMeta.pageTitle : 'Auto 28 - Mua Bán Xe VinFast Lướt Uy Tín Tại TP.HCM & Lân Cận';
  const metaDesc = routeMeta ? routeMeta.metaDesc : 'Auto 28 là hệ thống kinh doanh xe VinFast lướt uy tín hàng đầu tại khu vực TP. Hồ Chí Minh và các tỉnh lân cận (Bình Dương, Đồng Nai, Long An...). Định giá nhanh trực tuyến, check hãng 176 hạng mục, bàn giao tận nhà.';
  const canonicalUrl = routeMeta ? `https://www.auto28.com.vn/${modelSlug}` : 'https://www.auto28.com.vn/';
  const ogImage = routeMeta ? routeMeta.ogImage : 'https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781709568/inventory/zd6iu9qtpf0jair1jhyx.jpg';

  // Read component partials
  const navHtml = fs.readFileSync(path.join(compDir, 'nav.html'), 'utf8');
  let heroHtml = fs.readFileSync(path.join(compDir, 'hero_showroom.html'), 'utf8');
  if (routeMeta) {
    heroHtml = heroHtml
      .replace(/<h1 id="hero-headline-title"[^>]*>[\s\S]*?<\/h1>/, `<h1 id="hero-headline-title" class="hero__headline" style="font-size: clamp(2.25rem, 5vw, 3.25rem); line-height: 1.15; text-align: center; letter-spacing: -0.04em;">\n                    ${routeMeta.heroHeadlineHtml}\n                </h1>`)
      .replace(/<p id="hero-direct-answer"[^>]*>[\s\S]*?<\/p>/, `<p id="hero-direct-answer" class="hero__sub" style="text-align: center; max-width: 48rem; margin-bottom: 1rem; font-size: 16px; line-height: 1.6;">\n                    ${routeMeta.heroDirectAnswer}\n                </p>`)
      .replace(`<option value="${modelSlug}">`, `<option value="${modelSlug}" selected>`);
  }
  const commitmentsHtml = fs.readFileSync(path.join(compDir, 'commitments.html'), 'utf8');
  const comparisonMatrixHtml = fs.existsSync(path.join(compDir, 'comparison_matrix.html')) ? fs.readFileSync(path.join(compDir, 'comparison_matrix.html'), 'utf8') : '';
  const socialProofHtml = fs.readFileSync(path.join(compDir, 'social_proof.html'), 'utf8');
  let productGridHtml = fs.readFileSync(path.join(compDir, 'product_grid.html'), 'utf8');
  const ssrCarsHtml = buildSsrCarsGridHtml(modelSlug);
  if (ssrCarsHtml) {
    productGridHtml = productGridHtml.replace(/<div class="fluid-product-grid reveal-stagger" id="cars-grid">[\s\S]*?<\/section>/, `<div class="fluid-product-grid reveal-stagger" id="cars-grid">\n${ssrCarsHtml}\n        </div>\n    </section>`);
  }
  if (routeMeta) {
    productGridHtml = productGridHtml
      .replace('<h2 id="grid-section-title">Kho Xe VinFast Lướt Sẵn Giao Ngay</h2>', `<h2 id="grid-section-title">${routeMeta.h2Title}</h2>`)
      .replace('<p id="grid-section-desc">Hồ sơ pháp lý đầy đủ, bao test hãng 176 hạng mục, bàn giao và giao xe tận hầm chung cư.</p>', `<p id="grid-section-desc">${routeMeta.h2Desc}</p>`)
      .replace('class="filter-pill active" data-filter="all"', 'class="filter-pill" data-filter="all"')
      .replace(`class="filter-pill" data-filter="${modelSlug}"`, `class="filter-pill active" data-filter="${modelSlug}"`);
  }
  const processHtml = fs.existsSync(path.join(compDir, 'process.html')) ? fs.readFileSync(path.join(compDir, 'process.html'), 'utf8') : '';
  const faqAccordionHtml = fs.readFileSync(path.join(compDir, 'faq_accordion.html'), 'utf8');
  const locationMapHtml = fs.readFileSync(path.join(compDir, 'location_map.html'), 'utf8');
  const footerHtml = fs.readFileSync(path.join(compDir, 'footer.html'), 'utf8');
  const leadModalHtml = fs.readFileSync(path.join(compDir, 'lead_modal.html'), 'utf8');
  const exitModalHtml = fs.existsSync(path.join(compDir, 'exit_modal.html')) ? fs.readFileSync(path.join(compDir, 'exit_modal.html'), 'utf8') : '';

  return `<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle}</title>
    <meta name="description"
        content="${metaDesc}">
    
    <!-- 🌐 CANONICAL & OPEN GRAPH META (SEO 2026) -->
    <link rel="canonical" href="${canonicalUrl}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:title" content="${pageTitle}">
    <meta property="og:description" content="${metaDesc}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:site_name" content="Auto28.com.vn">
    <meta name="application-name" content="Auto28.com.vn">
    <meta name="apple-mobile-web-app-title" content="Auto28.com.vn">
    <meta property="og:locale" content="vi_VN">

    <!-- 📍 LOCAL GEO TAGS (SEO 2026) -->
    <meta name="geo.region" content="VN-SG">
    <meta name="geo.placename" content="TP. Hồ Chí Minh">
    <meta name="geo.position" content="10.8495;106.7785">
    <meta name="ICBM" content="10.8495, 106.7785">
    
    <!-- ⚡ RESOURCE HINTS (CWV 2026) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://res.cloudinary.com" crossorigin>
    <link rel="dns-prefetch" href="https://res.cloudinary.com">
    <link rel="dns-prefetch" href="https://connect.facebook.net">
    <link rel="dns-prefetch" href="https://analytics.tiktok.com">
    <link rel="preload" as="script" href="./cars_data.js?v=2.7.0">
    <link rel="preload" as="script" href="./modules/car-modal.js?v=2.7.0">
    <link rel="modulepreload" href="./main.js?v=2.7.0">
    
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;700;800;900&display=swap">
    <!-- 🎨 CRITICAL CSS DESIGN SYSTEM (NEURAL EXPRESSIVE 2.0) -->
    <link rel="stylesheet" href="./style.css?v=2.7.0">
    <noscript>
        <style>
            .reveal { opacity: 1 !important; transform: none !important; }
        </style>
    </noscript>
    
    <!-- Google Tag Manager (Optimized non-blocking position) -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-PPKRWBPC');</script>
    <!-- End Google Tag Manager -->
    
    <!-- 🌐 FAVICON -->
    <link rel="icon" type="image/jpeg" href="./assets/logos/logo.jpg">
    
    <!-- 📊 STRUCTURED DATA (SEO & AEO 2026) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["AutoDealer", "LocalBusiness"],
          "@id": "https://www.auto28.com.vn/#autodealer",
          "name": "Auto 28 - Hệ Thống Xe VinFast Lướt Uy Tín TP.HCM & Lân Cận",
          "alternateName": "Ô Tô Lướt Sài Gòn Auto 28",
          "description": "Auto 28 là hệ thống chuyên mua bán, ký gửi và định giá xe VinFast lướt uy tín hàng đầu tại TP.HCM và các tỉnh lân cận (Bình Dương, Đồng Nai, Long An...). Định giá nhanh trực tuyến, check hãng 176 hạng mục, bảo hành pin và giao xe tận nhà.",
          "telephone": "0888813838",
          "url": "https://www.auto28.com.vn",
          "logo": "https://www.auto28.com.vn/assets/logos/logo.jpg",
          "image": "https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781709568/inventory/zd6iu9qtpf0jair1jhyx.jpg",
          "priceRange": "$$",
          "currenciesAccepted": "VND",
          "paymentAccepted": "Tiền mặt, Chuyển khoản, Hỗ trợ trả góp ngân hàng",
          "slogan": "Minh Bạch Từng Chi Tiết - Đồng Hành Cùng Xe Điện",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "8F Đường Trịnh Hoài Đức",
            "addressLocality": "Phường Hiệp Phú",
            "addressRegion": "TP. Thủ Đức, TP. Hồ Chí Minh",
            "postalCode": "700000",
            "addressCountry": "VN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "10.8495",
            "longitude": "106.7785"
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "08:00",
              "closes": "19:30"
            }
          ],
          "sameAs": [
            "https://auto28.bonbanh.com/",
            "https://www.facebook.com/otoluotsaigon9/",
            "https://www.tiktok.com/@auto.2828"
          ],
          "areaServed": [
            { "@type": "AdministrativeArea", "name": "Thành phố Hồ Chí Minh" },
            { "@type": "AdministrativeArea", "name": "Bình Dương" },
            { "@type": "AdministrativeArea", "name": "Đồng Nai" },
            { "@type": "AdministrativeArea", "name": "Long An" },
            { "@type": "AdministrativeArea", "name": "Tây Ninh" },
            { "@type": "AdministrativeArea", "name": "Bà Rịa - Vũng Tàu" },
            { "@type": "Country", "name": "Việt Nam" }
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "168",
            "bestRating": "5",
            "worstRating": "1"
          },
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "VN",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 7
          },
          "knowsAbout": [
            "Xe VinFast lướt",
            "VinFast Lux A2.0 lướt",
            "VinFast Lux SA2.0 lướt",
            "VinFast Fadil lướt",
            "VinFast VF 3",
            "VinFast VF 5 Plus",
            "VinFast VF 6",
            "VinFast VF 7",
            "VinFast VF 8",
            "VinFast VF 9",
            "Xe mua pin",
            "Định giá xe điện VinFast",
            "Kiểm định xe cũ 176 hạng mục",
            "Chuyển nhượng hợp đồng pin VinFast",
            "TP. Hồ Chí Minh"
          ],
          "review": [
            {
              "@type": "Review",
              "author": { "@type": "Person", "name": "Anh Hoàng Minh" },
              "datePublished": "2026-01-15",
              "reviewBody": "Tôi bán chiếc Lux A 2021, tưởng thủ tục sẽ rất rườm rà vì xe đang trả góp. Ai ngờ anh em Auto 28 làm xong tất toán ngân hàng chỉ trong một buổi chiều. Giá tốt hơn showroom kế bên 15 triệu!",
              "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
            },
            {
              "@type": "Review",
              "author": { "@type": "Person", "name": "Chị Lan Anh" },
              "datePublished": "2026-01-28",
              "reviewBody": "Tìm xe cũ rất sợ pin chai, nhưng mua VF 8 ở Auto 28 được cam kết dung lượng pin trên 94%, đầy đủ giấy tờ check hãng 176 hạng mục. Xe đi cực kỳ êm ái, như xe mới.",
              "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
            },
            {
              "@type": "Review",
              "author": { "@type": "Person", "name": "Anh Tuấn" },
              "datePublished": "2026-02-05",
              "reviewBody": "Bán xe cũ cho showroom ngoài hay bị ép giá, qua bên Auto 28 có công cụ định giá trực tuyến rất nhanh và chuẩn. Xem xe tại nhà, ký công chứng xong tiền về tài khoản ngay lập tức.",
              "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
            },
            {
              "@type": "Review",
              "author": { "@type": "Person", "name": "Chú Hùng" },
              "datePublished": "2026-02-14",
              "reviewBody": "Dịch vụ thu mua và giao xe tận nhà vô cùng tiện lợi. Nhân viên xuống tận Biên Hòa kiểm tra xe kỹ lưỡng, bàn giao tiền bạc nhanh chóng, hỗ trợ thủ tục từ A-Z rất tin cậy.",
              "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
            }
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://www.auto28.com.vn/#website",
          "url": "https://www.auto28.com.vn/",
          "name": "Auto28.com.vn",
          "alternateName": [
            "Auto28",
            "Auto 28",
            "Auto 28 - Mua Bán Xe VinFast Lướt",
            "https://www.auto28.com.vn"
          ],
          "description": "Nền tảng mua bán, định giá và kiểm định xe VinFast lướt chất lượng cao.",
          "publisher": { "@id": "https://www.auto28.com.vn/#autodealer" },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.auto28.com.vn/?filter={search_term_string}#product-grid-section",
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.auto28.com.vn/#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Auto28.com.vn",
              "item": "https://www.auto28.com.vn/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Kho Xe VinFast Lướt",
              "item": "https://www.auto28.com.vn/#product-grid-section"
            }${routeMeta ? `,
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Xe ${routeMeta.modelName} Lướt",
              "item": "${canonicalUrl}"
            }` : ''}
          ]
        },
        {
          "@type": "HowTo",
          "@id": "https://www.auto28.com.vn/#howto-buy",
          "name": "Quy trình mua xe VinFast lướt 3 bước tại Auto 28",
          "description": "3 bước mua xe VinFast lướt an toàn, bảo đảm test hãng 176 hạng mục và bàn giao tận nhà trong 24h.",
          "totalTime": "P1D",
          "step": [
            {
              "@type": "HowToStep",
              "position": 1,
              "name": "Lựa chọn dòng xe & Nhận tư vấn",
              "text": "Khách hàng chọn mẫu xe VinFast (VF3, VF5, VF6, VF7, VF8, VF9) theo nhu cầu ngân sách và nhận báo giá chi tiết qua Hotline/Zalo 0888.81.38.38."
            },
            {
              "@type": "HowToStep",
              "position": 2,
              "name": "Kiểm tra 176 hạng mục & Lái thử",
              "text": "Nhận biên bản kiểm định 176 hạng mục độc lập và đo dung lượng pin SOH thực tế; bao test tại xưởng dịch vụ chính hãng VinFast."
            },
            {
              "@type": "HowToStep",
              "position": 3,
              "name": "Ký hợp đồng, Sang tên pin & Giao xe",
              "text": "Hoàn tất thủ tục sang tên chính chủ và chuyển đổi hợp đồng pin trong 24h; hỗ trợ trả góp ngân hàng 80% và giao xe tận nhà kèm chính sách đổi trả 7 ngày."
            }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.auto28.com.vn/#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Mua xe VinFast lướt ở đâu uy tín tại TP. Hồ Chí Minh?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Showroom Auto 28 (tại số 8F Đường Trịnh Hoài Đức, Phường Hiệp Phú, TP. Thủ Đức, TP. Hồ Chí Minh) là địa chỉ chuyên kinh doanh xe VinFast lướt uy tín hàng đầu. Toàn bộ xe (VF 3, VF 5, VF 6, VF 7, VF 8, VF 9, Lux A, Lux SA, Fadil) đều có odo chuẩn, sơn zin, cam kết bao test hãng 176 hạng mục tại xưởng dịch vụ chính hãng VinFast, hỗ trợ sang tên trọn gói trong ngày và bảo hành pin chu đáo."
              }
            },
            {
              "@type": "Question",
              "name": "Thủ tục chuyển nhượng hợp đồng pin xe điện có phức tạp không?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Hoàn toàn không phức tạp. Auto 28 phối hợp chặt chẽ trực tiếp với VinFast hỗ trợ trọn gói thủ tục sang tên hợp đồng thuê pin chính chủ trong 24 giờ. Khách hàng chỉ cần ký giấy ủy quyền và nhận bàn giao xe."
              }
            },
            {
              "@type": "Question",
              "name": "Xe đang vay ngân hàng / trả góp có giao dịch được không?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Hoàn toàn được! Auto 28 hỗ trợ nguồn vốn tất toán toàn bộ số tiền vay ngân hàng ngay trong ngày, giải phóng giấy tờ xe bản gốc để tiến hành mua bán đúng luật pháp Việt Nam."
              }
            },
            {
              "@type": "Question",
              "name": "Quy trình kiểm định 176 hạng mục gồm những gì?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Kiểm định toàn diện 4 trụ cột: (1) Thân vỏ & Khung gầm 52 mục không đâm đụng, (2) Pin & Hệ thống điện 44 mục đo SOH thực tế từ BMS, (3) Động cơ điện & Truyền động 42 mục, (4) Quét phần mềm OBD-II & ADAS 38 mục."
              }
            },
            {
              "@type": "Question",
              "name": "Mức giá thu mua xe của Auto 28 được tính toán như thế nào?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Auto 28 liên tục cập nhật dữ liệu giao dịch thực tế trên thị trường để đưa ra mức giá thu mua sát nhất với giá trị xe, tuyệt đối không ép giá và đảm bảo quyền lợi tối đa cho khách hàng."
              }
            },
            {
              "@type": "Question",
              "name": "Xe VinFast lướt mua tại Auto 28 có được bảo hành chính hãng không?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Có. Toàn bộ xe VinFast lướt bán ra đều giữ nguyên chế độ bảo hành chính hãng từ 7 - 10 năm hoặc 160.000 - 200.000 km tại tất cả xưởng dịch vụ VinFast trên toàn quốc."
              }
            },
            {
              "@type": "Question",
              "name": "Auto 28 có giao xe tận nhà tại Bình Dương, Đồng Nai, Long An không?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Có. Auto 28 cung cấp dịch vụ giao xe bằng xe cứu hộ chuyên dụng tận nơi tại TP.HCM, Bình Dương, Đồng Nai, Long An, Vũng Tàu, Tây Ninh và các tỉnh phía Nam trong vòng 24 giờ."
              }
            }
          ]
        },
        {
          "@type": "ItemList",
          "@id": "https://www.auto28.com.vn/#inventory",
          "name": "Danh Mục Xe VinFast Lướt Tuyển Chọn Tại Auto 28",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@type": "Car",
                "name": "VinFast VF MPV 7",
                "brand": { "@type": "Brand", "name": "VinFast" },
                "model": "VF MPV 7",
                "vehicleModelDate": "2026",
                "numberOfDoors": 5,
                "vehicleSeatingCapacity": 7,
                "vehicleEngine": { "@type": "EngineSpecification", "engineType": "Electric" },
                "fuelType": "Electric",
                "itemCondition": "https://schema.org/UsedCondition",
                "image": "https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781709568/inventory/zd6iu9qtpf0jair1jhyx.jpg",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "VND",
                  "price": "670000000",
                  "itemCondition": "https://schema.org/UsedCondition",
                  "availability": "https://schema.org/InStock",
                  "seller": { "@id": "https://www.auto28.com.vn/#autodealer" }
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@type": "Car",
                "name": "VinFast VF 3",
                "brand": { "@type": "Brand", "name": "VinFast" },
                "model": "VF 3",
                "vehicleModelDate": "2024",
                "numberOfDoors": 3,
                "vehicleSeatingCapacity": 4,
                "vehicleEngine": { "@type": "EngineSpecification", "engineType": "Electric" },
                "fuelType": "Electric",
                "itemCondition": "https://schema.org/UsedCondition",
                "image": "https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781709568/inventory/zd6iu9qtpf0jair1jhyx.jpg",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "VND",
                  "price": "240000000",
                  "itemCondition": "https://schema.org/UsedCondition",
                  "availability": "https://schema.org/InStock",
                  "seller": { "@id": "https://www.auto28.com.vn/#autodealer" }
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 3,
              "item": {
                "@type": "Car",
                "name": "VinFast VF 5 Plus",
                "brand": { "@type": "Brand", "name": "VinFast" },
                "model": "VF 5 Plus",
                "vehicleModelDate": "2024",
                "numberOfDoors": 5,
                "vehicleSeatingCapacity": 5,
                "vehicleEngine": { "@type": "EngineSpecification", "engineType": "Electric" },
                "fuelType": "Electric",
                "itemCondition": "https://schema.org/UsedCondition",
                "image": "https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781709568/inventory/zd6iu9qtpf0jair1jhyx.jpg",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "VND",
                  "price": "350000000",
                  "itemCondition": "https://schema.org/UsedCondition",
                  "availability": "https://schema.org/InStock",
                  "seller": { "@id": "https://www.auto28.com.vn/#autodealer" }
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 4,
              "item": {
                "@type": "Car",
                "name": "VinFast VF 6 Plus / Eco",
                "brand": { "@type": "Brand", "name": "VinFast" },
                "model": "VF 6",
                "vehicleModelDate": "2025",
                "numberOfDoors": 5,
                "vehicleSeatingCapacity": 5,
                "vehicleEngine": { "@type": "EngineSpecification", "engineType": "Electric" },
                "fuelType": "Electric",
                "itemCondition": "https://schema.org/UsedCondition",
                "image": "https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781709448/inventory/ewa3yyqts4rhldte2buv.jpg",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "VND",
                  "price": "565000000",
                  "itemCondition": "https://schema.org/UsedCondition",
                  "availability": "https://schema.org/InStock",
                  "seller": { "@id": "https://www.auto28.com.vn/#autodealer" }
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 5,
              "item": {
                "@type": "Car",
                "name": "VinFast VF 7 Plus AWD",
                "brand": { "@type": "Brand", "name": "VinFast" },
                "model": "VF 7 Plus",
                "vehicleModelDate": "2024",
                "numberOfDoors": 5,
                "vehicleSeatingCapacity": 5,
                "vehicleEngine": { "@type": "EngineSpecification", "engineType": "Electric" },
                "fuelType": "Electric",
                "itemCondition": "https://schema.org/UsedCondition",
                "image": "https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781709448/inventory/ewa3yyqts4rhldte2buv.jpg",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "VND",
                  "price": "740000000",
                  "itemCondition": "https://schema.org/UsedCondition",
                  "availability": "https://schema.org/InStock",
                  "seller": { "@id": "https://www.auto28.com.vn/#autodealer" }
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 6,
              "item": {
                "@type": "Car",
                "name": "VinFast VF 8 Plus AWD",
                "brand": { "@type": "Brand", "name": "VinFast" },
                "model": "VF 8",
                "vehicleModelDate": "2022",
                "numberOfDoors": 5,
                "vehicleSeatingCapacity": 5,
                "vehicleEngine": { "@type": "EngineSpecification", "engineType": "Electric" },
                "fuelType": "Electric",
                "itemCondition": "https://schema.org/UsedCondition",
                "image": "https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781709568/inventory/zd6iu9qtpf0jair1jhyx.jpg",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "VND",
                  "price": "590000000",
                  "itemCondition": "https://schema.org/UsedCondition",
                  "availability": "https://schema.org/InStock",
                  "seller": { "@id": "https://www.auto28.com.vn/#autodealer" }
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 7,
              "item": {
                "@type": "Car",
                "name": "VinFast VF 9 Plus",
                "brand": { "@type": "Brand", "name": "VinFast" },
                "model": "VF 9",
                "vehicleModelDate": "2023",
                "numberOfDoors": 5,
                "vehicleSeatingCapacity": 7,
                "vehicleEngine": { "@type": "EngineSpecification", "engineType": "Electric" },
                "fuelType": "Electric",
                "itemCondition": "https://schema.org/UsedCondition",
                "image": "https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781709568/inventory/zd6iu9qtpf0jair1jhyx.jpg",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "VND",
                  "price": "1150000000",
                  "itemCondition": "https://schema.org/UsedCondition",
                  "availability": "https://schema.org/InStock",
                  "seller": { "@id": "https://www.auto28.com.vn/#autodealer" }
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 8,
              "item": {
                "@type": "Car",
                "name": "VinFast Lux A2.0 Lướt (Base / Plus / Premium)",
                "brand": { "@type": "Brand", "name": "VinFast" },
                "model": "Lux A2.0",
                "vehicleModelDate": "2022",
                "bodyType": "Sedan",
                "numberOfDoors": 4,
                "vehicleSeatingCapacity": 5,
                "vehicleEngine": { "@type": "EngineSpecification", "engineType": "2.0L DOHC I4 Turbo (174 - 228 HP)" },
                "fuelType": "Gasoline",
                "itemCondition": "https://schema.org/UsedCondition",
                "image": "https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781708030/inventory/jqdikmalpmawqnz4l9sy.jpg",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "VND",
                  "price": "490000000",
                  "itemCondition": "https://schema.org/UsedCondition",
                  "availability": "https://schema.org/InStock",
                  "seller": { "@id": "https://www.auto28.com.vn/#autodealer" }
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 9,
              "item": {
                "@type": "Car",
                "name": "VinFast Lux SA2.0 Lướt (Base / Plus / Full)",
                "brand": { "@type": "Brand", "name": "VinFast" },
                "model": "Lux SA2.0",
                "vehicleModelDate": "2022",
                "bodyType": "SUV",
                "numberOfDoors": 5,
                "vehicleSeatingCapacity": 7,
                "vehicleEngine": { "@type": "EngineSpecification", "engineType": "2.0L DOHC I4 Turbo (228 HP)" },
                "fuelType": "Gasoline",
                "itemCondition": "https://schema.org/UsedCondition",
                "image": "https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781707843/inventory/dozwpz3ecfolh3efouce.jpg",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "VND",
                  "price": "560000000",
                  "itemCondition": "https://schema.org/UsedCondition",
                  "availability": "https://schema.org/InStock",
                  "seller": { "@id": "https://www.auto28.com.vn/#autodealer" }
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 10,
              "item": {
                "@type": "Car",
                "name": "VinFast Fadil Lướt",
                "brand": { "@type": "Brand", "name": "VinFast" },
                "model": "Fadil",
                "vehicleModelDate": "2021",
                "bodyType": "Hatchback",
                "numberOfDoors": 5,
                "vehicleSeatingCapacity": 5,
                "vehicleEngine": { "@type": "EngineSpecification", "engineType": "1.4L I4" },
                "fuelType": "Gasoline",
                "itemCondition": "https://schema.org/UsedCondition",
                "image": "https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781709008/inventory/nqkaqbyzvfqqitb3hvdo.jpg",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "VND",
                  "price": "240000000",
                  "itemCondition": "https://schema.org/UsedCondition",
                  "availability": "https://schema.org/InStock",
                  "seller": { "@id": "https://www.auto28.com.vn/#autodealer" }
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 11,
              "item": {
                "@type": "Car",
                "name": "VinFast LIMO Green Lướt",
                "brand": { "@type": "Brand", "name": "VinFast" },
                "model": "LIMO Green",
                "vehicleModelDate": "2025",
                "bodyType": "MPV",
                "numberOfDoors": 5,
                "vehicleSeatingCapacity": 7,
                "vehicleEngine": { "@type": "EngineSpecification", "engineType": "Electric" },
                "fuelType": "Electric",
                "itemCondition": "https://schema.org/UsedCondition",
                "image": "https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781709271/inventory/y0hirczcjktrmkg3hwoq.jpg",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "VND",
                  "price": "650000000",
                  "itemCondition": "https://schema.org/UsedCondition",
                  "availability": "https://schema.org/InStock",
                  "seller": { "@id": "https://www.auto28.com.vn/#autodealer" }
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 12,
              "item": {
                "@type": "Car",
                "name": "VinFast VF e34 Lướt",
                "brand": { "@type": "Brand", "name": "VinFast" },
                "model": "VF e34",
                "vehicleModelDate": "2023",
                "bodyType": "SUV",
                "numberOfDoors": 5,
                "vehicleSeatingCapacity": 5,
                "vehicleEngine": { "@type": "EngineSpecification", "engineType": "Electric" },
                "fuelType": "Electric",
                "itemCondition": "https://schema.org/UsedCondition",
                "image": "https://res.cloudinary.com/dvh4hnwsy/image/upload/v1781709568/inventory/zd6iu9qtpf0jair1jhyx.jpg",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "VND",
                  "price": "420000000",
                  "itemCondition": "https://schema.org/UsedCondition",
                  "availability": "https://schema.org/InStock",
                  "seller": { "@id": "https://www.auto28.com.vn/#autodealer" }
                }
              }
            }
          ]
        }
      ]
    }
    </script>
    <!-- ⚡ NON-BLOCKING THIRD-PARTY TRACKING (CWV 2026 TBT OPTIMIZED) -->
    <script>
        function loadThirdPartyPixels() {
            // Facebook Pixel Code
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '537471081061777');
            fbq('track', 'PageView');

            // TikTok Pixel Code
            !function (w, d, t) {
                w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || []; ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"], ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } }; for (var i = 0; i < ttq.methods.length; i++)ttq.setAndDefer(ttq, ttq.methods[i]); ttq.instance = function (t) {
                    for (
                        var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)ttq.setAndDefer(e, ttq.methods[n]); return e;
                };
                ttq.load('D802OM3C77UEKU3Q3HPG');
                ttq.page();
            }(window, document, 'ttq');
        }

        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(loadThirdPartyPixels, { timeout: 2000 });
        } else {
            window.addEventListener('DOMContentLoaded', loadThirdPartyPixels, { passive: true });
        }
    </script>
    <!-- Google tag được quản lý tập trung bởi GTM-PPKRWBPC -->
    <!-- GA4 (G-PM7K9CB73D) và Google Ads (AW-18153153954) cấu hình trong GTM Dashboard -->
</head>

<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PPKRWBPC"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <!-- Facebook Pixel Code (noscript) -->
    <noscript><img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=537471081061777&ev=PageView&noscript=1" /></noscript>

    <!-- 🔮 CANVAS NỀN NGỌC THẠCH SINH HỌC DI CHUYỂN NGẦM (AMBINET CANVAS) -->
    <div class="ambient-canvas-base">
        <div class="ambient-light light-1"></div>
        <div class="ambient-light light-2"></div>
        <div class="ambient-light light-3"></div>
    </div>

    ${navHtml}

    ${heroHtml}

    ${commitmentsHtml}

    ${productGridHtml}

    ${comparisonMatrixHtml}

    ${socialProofHtml}

    ${processHtml}

    ${faqAccordionHtml}

    ${locationMapHtml}

    ${footerHtml}

    ${leadModalHtml}

    ${exitModalHtml}

    <!-- ⚡ SCRIPTS LOAD ORDER -->
    <script src="./cars_data.js?v=2.7.0" defer></script>
    <script src="./modules/tracking-pipeline.js?v=2.7.0" defer></script>
    <script src="./modules/hero-slideshow.js?v=2.7.0" defer></script>
    <script src="./modules/ai-valuation.js?v=2.7.0" defer></script>
    <script src="./modules/car-filter.js?v=2.7.0" defer></script>
    <script src="./modules/ui-effects.js?v=2.7.0" defer></script>
    <script src="./modules/car-modal.js?v=2.7.0" defer></script>
    <script type="module" src="./main.js?v=2.7.0"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const dateBadge = document.getElementById('promo-date-badge');
            if (dateBadge) {
                const now = new Date();
                const dateStr = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
                dateBadge.textContent = 'Hôm nay (' + dateStr + '): Còn 3 suất ưu đãi trả góp 70% + Tặng 1 năm bảo dưỡng';
            }
            const exitModal = document.getElementById('showroom-exit-modal');
            const closeBtn = document.getElementById('close-showroom-exit-modal');
            const exitForm = document.getElementById('showroom-exit-form');
            let hasShownExit = false;
            const showExitModal = () => {
                if (hasShownExit || localStorage.getItem('auto28_showroom_exit_dismissed')) return;
                hasShownExit = true;
                if (exitModal) exitModal.style.display = 'flex';
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({'event': 'cro_showroom_exit_trigger'});
            };
            document.addEventListener('mouseleave', (e) => {
                if (e.clientY <= 0) showExitModal();
            });
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    if (exitModal) exitModal.style.display = 'none';
                    try { localStorage.setItem('auto28_showroom_exit_dismissed', '1'); } catch (e) {}
                });
            }
            if (exitForm) {
                exitForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const phone = document.getElementById('showroom-exit-phone')?.value || '';
                    const cleanPhone = phone.replace(/\\D/g, '');
                    if (!cleanPhone || cleanPhone.length < 10) {
                        alert('Vui lòng nhập chính xác số điện thoại (10 chữ số)!');
                        return;
                    }
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        'event': 'lead_form_submitted',
                        'form_id': 'showroom-exit-form',
                        'form_type': 'showroom_exit_lead',
                        'phone': cleanPhone,
                        'timestamp': new Date().toISOString()
                    });
                    window.dataLayer.push({'event': 'form_lead_success', 'cro_event': 'showroom_exit_lead', 'phone': cleanPhone});
                    alert('🎉 Cảm ơn bạn! Auto28 đã ghi nhận SĐT ' + phone + ' để gửi bảng giá lăn bánh ưu đãi và Voucher +5 Triệu qua Zalo!');
                    if (exitModal) exitModal.style.display = 'none';
                    try { localStorage.setItem('auto28_showroom_exit_dismissed', '1'); } catch (e) {}
                });
            }
        });
    </script>

    <!-- ⚡ SW Registration -->
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js').catch(() => {});
            });
        }
    </script>
</body>
</html>`;
}

function buildLandingPage() {
  console.log("=========================================");
  console.log("Building Auto 28 Landing Page (index.html)...");
  console.log("=========================================");
  const rootDir = __dirname;
  const indexHtmlContent = generateShowroomHtml();
  fs.writeFileSync(path.join(rootDir, 'index.html'), indexHtmlContent, 'utf8');
  console.log("✅ index.html generated successfully with World-Class SEO/GEO Schema!");
  return indexHtmlContent;
}

if (require.main === module) {
  buildLandingPage();
}

module.exports = { generateShowroomHtml, buildLandingPage };
