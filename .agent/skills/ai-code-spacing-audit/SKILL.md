---
name: AI Code & Spacing Audit Skill
description: Quy trình rà soát, phát hiện và chuẩn hóa các lỗi phổ biến do AI sinh ra (đặc biệt là Spacing, Token Drift, Ghost Spacing và lỗi logic ngầm) trong dự án.
---

# AI Code & Spacing Audit Skill

Skill này cung cấp quy trình và bộ công cụ giúp phát hiện các lỗi phổ biến do AI sinh ra (AI-generated code errors) trong dự án, đặc biệt tập trung vào các vấn đề về khoảng trống giao diện (Spacing), sự không nhất quán (Token Drift), và các lỗi logic/bảo mật ngầm.

---

## 1. Triết Lý Kiểm Soát (Audit Philosophy)
Khi AI sinh mã nguồn, nó thiếu "nhãn quan thẩm mỹ" và "ý đồ thiết kế". Nó thường tối ưu để tính năng "chạy được" trước mắt mà bỏ qua sự chặt chẽ của hệ thống spacing, cấu trúc HTML tối giản và bảo mật.

**Mục tiêu của Spacing Audit:** Biến giao diện từ "AI-generated slop" thành giao diện chuyên nghiệp chuẩn **Neural Expressive 2.0** và **iPhone Native UI**.

---

## 2. Danh Mục Lỗi Cần Rà Soát (Audit Checklist)

### A. Spacing & Token Drift (Lệch Spacing & Thiết Kế Bất Nhất Quán)
*   [ ] **Lỗi số lẻ / số tự do:** Phát hiện các giá trị padding, margin, gap có giá trị lẻ hoặc không chia hết cho `4` hoặc `8` (ví dụ: `13px`, `18px`, `29px`, `43px`).
*   [ ] **Lỗi Hardcode Pixel:** Các giá trị khoảng cách được hardcode bằng `px` thay vì sử dụng các biến CSS Token chuẩn của dự án (ví dụ: dùng `var(--spacing-md)` hoặc `var(--spacing-lg)`).
*   [ ] **Lỗi Spacing bất nhất quán:** Hai phần tử có vai trò tương đương nhau nhưng lại có khoảng cách lề khác nhau.
*   [ ] **Lỗi vi phạm Visual Hierarchy:** Khoảng cách giữa các phần tử liên quan (như tiêu đề và nội dung) bị đẩy quá xa, vi phạm luật Gestalt (Law of Proximity - Luật Cận Thị).

### B. Ghost Spacing, Div-itis & Over-Engineering (Khoảng Trống Ma & Thừa Cấu Trúc)
*   [ ] **Lỗi cộng dồn Margin:** Cả component cha lẫn component con đều có `margin/padding` lớn dẫn đến khoảng trắng khổng lồ không mong muốn ở giữa các khối.
*   [ ] **Lỗi Div-itis (Lồng thẻ quá nhiều):** AI sinh ra nhiều tầng thẻ `div` lồng nhau vô lý chỉ để bao bọc một phần tử văn bản hoặc icon, làm phình to DOM size và tạo khoảng trống chết (Dead Space).
*   [ ] **Lỗi Flex/Grid thiếu Gap:** AI dùng `margin-right` hoặc `margin-bottom` thủ công cho các phần tử con thay vì sử dụng thuộc tính `gap` của Flexbox/Grid ở thẻ cha.
*   [ ] **Lỗi Abstraction Sớm (Early Abstraction):** AI tạo ra quá nhiều class, file config hoặc lớp kế thừa phức tạp cho một tác vụ đơn lẻ, gây tăng nợ kỹ thuật (Technical Debt).
*   [ ] **Lỗi mock data của AI còn sót lại:** Giao diện vẫn hiển thị các đoạn text nhãn thử nghiệm như `(AI DATA)`, `Mockup`, `Lorem Ipsum`... chưa được tối giản hóa.

### C. Logic Kín & Edge Cases (Lỗi Logic Ngầm)
*   [ ] **Lỗi Logic Kín (Subtle Logic Errors):** Code chạy không báo đỏ (syntax OK) nhưng kết quả xử lý sai lệch ở các biên (edge cases), sai lệch múi giờ (timezone drift) hoặc định dạng tiền tệ/số.
*   [ ] **Lỗi Happy-path Bias (Thiếu kiểm soát ngoại lệ):** Code xử lý API hoặc Form chỉ chạy tốt khi người dùng nhập đúng. Thiếu validation cho dữ liệu trống, dữ liệu sai định dạng (ví dụ: số điện thoại, email) hoặc khi mất kết nối mạng.
*   [ ] **Lỗi Hardcoded States:** Các trạng thái loading, error của giao diện được viết tĩnh hoặc bị bỏ qua hoàn toàn.

### D. Security Risks (Lỗ Hổng Bảo Mật Ngầm)
*   [ ] **Lỗi Lộ API Keys / Secrets:** Phát hiện các biến bí mật, JWT Secret, Token được gán trực tiếp (hardcode) trong code frontend thay vì sử dụng `.env`.
*   [ ] **Lỗi Unsafe Input / Raw HTML:** Sử dụng `innerHTML` hoặc `dangerouslySetInnerHTML` mà không qua bộ lọc sát trùng (sanitize) dữ liệu đầu vào, dẫn đến nguy cơ tấn công **XSS**.
*   [ ] **Lỗi SQL Injection Tiềm Ẩn:** Các câu lệnh truy vấn database (nếu có ở backend/edge) do AI sinh ra không sử dụng tham số hóa (Parameterized Queries).

---

## 3. Bộ Công Cụ Rà Soát Nhanh (Automated Audit Tools)

Bạn có thể chạy các câu lệnh tìm kiếm (Grep/Regex) sau trong Terminal của workspace để phát hiện nhanh các dấu hiệu lỗi Spacing:

### Quét các Spacing lẻ (Không chia hết cho 4 hoặc 8)
Quét toàn bộ tệp tin CSS/HTML để tìm các giá trị pixel tự do không chuẩn:
```bash
# Tìm các giá trị px lẻ kết thúc bằng các số 1, 2, 3, 5, 6, 7, 9
grep -rnI --include="*.css" --include="*.html" --include="*.js" -E "(margin|padding|gap|top|bottom|left|right):\s*[0-9]*(1|2|3|5|6|7|9)px" .
```

### Quét lồng ghép thẻ div quá mức (Dấu hiệu Div-itis của AI)
```bash
# Tìm các đoạn mã có 3 tầng thẻ div lồng nhau liên tiếp không có nội dung ý nghĩa
grep -rnI --include="*.html" --include="*.js" -E "<div[^>]*>\s*<div[^>]*>\s*<div[^>]*>" .
```

### Quét các Hardcoded API Keys / Secrets
```bash
# Tìm các đoạn gán key nhạy cảm trực tiếp
grep -rnI --exclude-dir=node_modules -E "(api_key|apikey|secret|password|token)\s*=\s*['\"][a-zA-Z0-9_-]{10,}['\"]" .
```

---

## 4. Hướng Dẫn Sửa Lỗi & Chuẩn Hóa (Refactoring Guide)

### Bước 1: Áp dụng Spacing Grid Token
Thay thế toàn bộ các giá trị pixel tự do bằng hệ thống Spacing Token đã được định nghĩa trong dự án (ví dụ trong `index.css` hoặc `variables.css`):
```css
/* SAI (AI thường viết) */
.card-item {
  padding: 18px 23px;
  margin-bottom: 29px;
}

/* ĐÚNG (Chuẩn hóa) */
.card-item {
  padding: var(--spacing-md) var(--spacing-lg); /* Tương đương 16px và 24px */
  margin-bottom: var(--spacing-xl); /* Tương đương 32px */
}
```

### Bước 2: Tối ưu cấu trúc Layout với Flexbox/Grid
Thay thế việc đẩy margin thủ công bằng `gap`:
```css
/* SAI (AI thường viết) */
.menu-item {
  margin-right: 15px;
}
.menu-item:last-child {
  margin-right: 0;
}

/* ĐÚNG (Chuẩn hóa) */
.menu-container {
  display: flex;
  gap: 16px; /* Tự động phân bổ khoảng cách đồng đều */
}
```

### Bước 3: Dọn dẹp khoảng trống ma (Ghost Spacing)
Khi có khoảng trống quá lớn giữa 2 phần tử, hãy thực hiện kiểm tra qua DevTools:
1. Xác định phần tử nào đang chiếm dụng lề thừa (thường do `margin-top` hoặc `margin-bottom` mặc định của các thẻ `h1-h6`, `p` do AI sinh ra).
2. Reset margin mặc định và quản lý khoảng cách bằng thẻ cha:
```css
h1, h2, h3, p {
  margin: 0; /* Reset lề mặc định của trình duyệt */
}
```
