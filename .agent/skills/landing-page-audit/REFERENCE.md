# TIÊU CHUẨN KỸ THUẬT & NGHIỆM THU CHI TIẾT LANDING PAGE AUTO 28

Tài liệu này chứa các quy tắc nghiệp vụ, giải pháp thiết kế và bộ tiêu chuẩn kiểm thử kỹ thuật cao cấp dành cho Landing Page.

---

## 🏗️ 1. TIÊU CHUẨN HTML FORM & ĐO LƯỜNG CHUYỂN ĐỔI (30%)

### HTML Form Ngữ nghĩa (Semantic Form)
*   **Bắt buộc**: Bọc toàn bộ các trường nhập liệu trong thẻ `<form>` có thuộc tính `id` và `name` duy nhất.
*   **Nút Submit**: Phải là thẻ `<button type="submit">` thực tế. Tuyệt đối không bắt sự kiện click trên các thẻ `<div>` giả lập nút bấm.
*   **Autofill**: Đảm bảo các thuộc tính `autocomplete="tel"`, `autocomplete="name"` hoạt động để tăng tỷ lệ điền form trên di động.

### DataLayer Push
*   **Cơ chế**: Không bắt sự kiện tracking qua Class nút bấm (DOM Scraping). Chỉ bắn sự kiện khi nhận phản hồi thành công từ API máy chủ.
*   **Định dạng mã**:
    ```javascript
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'form_lead_success',
        'form_id': 'form-id-unique',
        'form_name': 'Form Name',
        'event_id': 'lead_' + new Date().getTime() // Khử trùng lặp CAPI
    });
    ```
*   **Anti-Spam**: Vô hiệu hóa nút gửi (`submitBtn.disabled = true`) ngay khi click để tránh khách hàng click nhiều lần.

---

## ⚡ 2. CORE WEB VITALS & TỐI ƯU HIỆU NĂNG TẢI TRANG (30%)

### Chỉ số vàng Core Web Vitals (CWV)
*   **LCP (Largest Contentful Paint)**: Tải ảnh hero chính dưới **2.5 giây**.
*   **INP (Interaction to Next Paint)**: Trực quan phản hồi click dưới **200 miligiây**.
*   **CLS (Cumulative Layout Shift)**: Độ dịch chuyển bố cục xấp xỉ **0**.

### Tối ưu hóa tài nguyên tĩnh (Assets)
*   **Định dạng hình ảnh**: Chuyển toàn bộ sang **WebP** hoặc **AVIF**, dung lượng file dưới 250KB.
*   **Lazy Loading**: Thêm thuộc tính `loading="lazy"` cho tất cả các ảnh nằm bên dưới nếp gấp màn hình (Below the Fold).
*   **Resource Hints**: Sử dụng `<link rel="preconnect" href="...">` cho các máy chủ Supabase, Cloudinary hoặc Google Fonts.

---

## 🤖 3. GENERATIVE ENGINE OPTIMIZATION - TỐI ƯU HÓA SEO AI (GEO) (20%)

Các công cụ tìm kiếm AI (ChatGPT Search, Gemini, Perplexity) ưu tiên trích xuất nội dung từ các trang web có cấu trúc rõ ràng.

### Cấu trúc thông tin kim tự tháp ngược (Inverted Pyramid)
*   Trả lời trực diện các câu hỏi cốt lõi ở ngay 3 dòng đầu tiên của Landing Page.
*   Tránh các đoạn văn giới thiệu sáo rỗng, tập trung vào số liệu thực tế.

### Bảng biểu & Danh sách liệt kê
*   Trình bày so sánh thông số các phiên bản xe bằng thẻ `<table>`.
*   Liệt kê quy trình thu mua hoặc cam kết bằng thẻ `<ul>` hoặc `<ol>`.

### FAQ hội thoại (Conversational FAQ)
*   Đặt câu hỏi FAQ đúng theo các câu đàm thoại dài của người dùng trên AI Chat.
*   Trả lời súc tích, trung thực, có bằng chứng xác thực đi kèm.

---

## 📱 4. MOBILE-FIRST UI/UX & ZERO-NOISE DESIGN (20%)

*   **Responsive**: Không bị tràn viền gây cuộn ngang ở chiều rộng màn hình từ 320px đến 1920px.
*   **Kích thước chạm**: Toàn bộ nút liên hệ, nút submit phải cao tối thiểu **48px** để ngón tay dễ bấm trên di động.
*   **Sticky CTA**: Mobile bám dính 2 nút Gọi điện và Chat Zalo dưới cùng màn hình khi cuộn chuột.
*   **Zero-Noise**: Khoảng trống padding rộng rãi tối thiểu 80px (Desktop) và 48px (Mobile) để trang thông thoáng, cao cấp.
