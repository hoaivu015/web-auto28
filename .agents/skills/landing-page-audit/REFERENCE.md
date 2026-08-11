# TIÊU CHUẨN KỸ THUẬT & NGHIỆM THU CHI TIẾT LANDING PAGE AUTO 28 (INTERNATIONAL STANDARD 2026)

Tài liệu này chứa các quy tắc nghiệp vụ, giải pháp thiết kế và bộ tiêu chuẩn kiểm thử kỹ thuật cao cấp dành cho Landing Page tuân thủ các chuẩn mực công nghiệp quốc tế mới nhất 2026.

---

## 🏗️ 1. TIÊU CHUẨN HTML FORM, DATALAYER & META CAPI DEDUPLICATION (30%)

### HTML Form Ngữ nghĩa & UX Input (Semantic Form)
*   **Bắt buộc**: Bọc toàn bộ các trường nhập liệu trong thẻ `<form>` ngữ nghĩa có thuộc tính `id` và `name` độc bản.
*   **Nút Submit**: Phải là thẻ `<button type="submit">` thực tế. Tuyệt đối không bắt sự kiện click trên các thẻ `<div>` giả lập nút bấm.
*   **Autofill**: Đảm bảo các thuộc tính `autocomplete="tel"`, `autocomplete="name"`, `autocomplete="email"` hoạt động để tăng tỷ lệ điền form trên di động.
*   **Trạng thái Phản hồi (Input Validation)**: Áp dụng CSS `:user-valid` và `:user-invalid` để hiển thị lỗi sau khi người dùng blur/tương tác, tránh báo lỗi sớm khi khách chưa nhập xong.

### DataLayer & Meta CAPI Event Deduplication
*   **Cơ chế Bắt Sự Kiện**: Tuyệt đối không bắt sự kiện tracking qua Class nút bấm (DOM Scraping). Chỉ phát sự kiện khi nhận phản hồi thành công từ API máy chủ (`200 OK`).
*   **Mã Khử Trùng Lặp (Deduplication Event ID)**:
    ```javascript
    const eventId = 'lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // 1. Browser-side DataLayer Push (GA4 / GTM)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'form_lead_success',
        'form_id': 'form-lead-vf8',
        'form_name': 'Đăng Ký Báo Giá VF8',
        'event_id': eventId
    });

    // 2. Server-side Meta CAPI / Google Conversions API (nếu gửi qua fetch/XHR)
    // Server sẽ nhận event_id này và chuyển tiếp tới Meta CAPI để khử trùng lặp 100% với Browser Pixel.
    ```
*   **Anti-Spam**: Vô hiệu hóa nút gửi (`submitBtn.disabled = true; submitBtn.textContent = 'Đang xử lý...'`) ngay khi click để tránh đệ trình trùng lặp.

---

## ⚡ 2. CORE WEB VITALS 2026 & TỐI ƯU HIỆU NĂNG TẢI TRANG (30%)

### Chỉ số vàng Core Web Vitals (CWV - 75th Percentile Field Data)
*   **LCP (Largest Contentful Paint)**: Tải thành phần hình ảnh / văn bản lớn nhất dưới **2.5 giây**.
    *   Thẻ Hero LCPCandidate phải chứa `fetchpriority="high"`.
    *   Dùng `<link rel="preload" as="image" href="...">` cho ảnh nền/hero chính.
*   **INP (Interaction to Next Paint - Đã thay thế FID từ 2024)**: Phản hồi tương tác trực quan dưới **200 miligiây**.
    *   Tối ưu hóa các script JavaScript của bên thứ 3 (Chat Widget, Tracking Pixels) tránh làm nghẽn Main-Thread.
    *   Tách biệt các tác vụ nặng qua `requestIdleCallback()` hoặc `setTimeout(..., 0)`.
*   **CLS (Cumulative Layout Shift)**: Độ dịch chuyển bố cục xấp xỉ **0** (< 0.1).
    *   Set rõ thuộc tính `width`, `height` hoặc CSS `aspect-ratio` cho tất cả ảnh và thẻ container chứa nội dung động.

### Tối ưu hóa tài nguyên tĩnh (Assets)
*   **Định dạng hình ảnh**: Chuyển toàn bộ sang **WebP** hoặc **AVIF**, nén dung lượng file dưới 250KB.
*   **Lazy Loading**: Thêm thuộc tính `loading="lazy"` cho tất cả ảnh nằm bên dưới nếp gấp màn hình (Below the Fold).
*   **Resource Hints**: Kích hoạt kết nối sớm `<link rel="preconnect" href="...">` và `<link rel="dns-prefetch" href="...">` tới các CDN như Google Fonts, Supabase, Cloudinary.

---

## 🤖 3. GENERATIVE ENGINE OPTIMIZATION - TỐI ƯU HÓA SEO AI (GEO) (20%)

Các mô hình tìm kiếm AI (ChatGPT Search, Gemini, Perplexity, Google AI Overviews) ưu tiên trích xuất nội dung từ các trang web có tính máy đọc cao và thông tin thực tế.

### Tính Khả Đọc Máy (Machine Readability & SSR/Static Content)
*   Nội dung cốt lõi của Landing Page phải hiển thị trực tiếp trên HTML tĩnh (Static HTML / SSR), không phụ thuộc vào JS Client-Side render chậm làm AI Bot bỏ qua.

### Cấu trúc thông tin kim tự tháp ngược (Inverted Pyramid)
*   Trả lời trực diện các câu hỏi cốt lõi (giá bán, khuyến mãi, tình trạng xe, ưu điểm) ở ngay 200 từ đầu tiên của Landing Page.
*   Tránh các đoạn văn giới thiệu sáo rỗng, tập trung vào số liệu thực tế minh bạch.

### Schema JSON-LD Chuẩn Quốc Tế
*   Khai báo đầy đủ dữ liệu cấu trúc thực thể:
    *   `AutoDealer` (Tên showroom, địa chỉ, hotline, giờ mở cửa).
    *   `Car` / `Product` (Thương hiệu, model, năm sản xuất, giá niêm yết, tình trạng xe).
    *   `FAQPage` (Danh sách câu hỏi thường gặp).

### Bảng biểu, Danh sách & Conversational FAQ
*   Trình bày so sánh thông số các phiên bản xe bằng thẻ `<table>`.
*   Liệt kê quy trình thu mua / bảo hành bằng thẻ `<ul>` hoặc `<ol>`.
*   Đặt câu hỏi FAQ đúng theo các câu đàm thoại dài của người dùng trên AI Chat (Ví dụ: *"Pin xe VinFast VF8 chạy được bao nhiêu km thực tế?"*).

---

## 📱 4. MOBILE-FIRST UX/UI, SPACING GRID & ACCESSIBILITY (20%)

### Touch Targets & Mobile Navigation
*   **Kích thước Chạm (Touch Target)**: Toàn bộ nút liên hệ, nút submit, icon hotline phải đạt kích thước tối thiểu **48px x 48px** (`min-height: 48px; min-width: 48px;`) để thao tác dễ dàng trên di động.
*   **Sticky CTA Bar**: Cố định thanh CTA kép (Gọi điện + Chat Zalo) ở đáy màn hình di động khi cuộn trang.

### Spacing System (8pt Grid System)
*   Triệt tiêu hoàn toàn khoảng cách số lẻ (`13px`, `17px`, `21px`).
*   Mọi kích thước `margin`, `padding`, `gap` chỉ sử dụng bội số của **4px / 8px** (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `80px`).
*   Loại bỏ Ghost Spacing (khoảng trống thừa do `margin-bottom` của phần tử cuối cùng).

### Tiêu Chuẩn Truy Cập (WCAG 2.2 Level AA Accessibility)
*   Thẻ `<label for="input-id">` bọc rõ ràng từng ô nhập liệu form.
*   Thuộc tính `aria-label` cho tất cả các nút chỉ có icon (nút đóng modal, nút hotline).
*   Độ tương phản màu sắc văn bản / nền đạt tối thiểu **4.5:1** chuẩn WCAG Level AA.

