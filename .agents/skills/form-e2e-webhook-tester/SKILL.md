---
name: form-e2e-webhook-tester
description: >
  Quy trình kiểm thử liên hoàn End-to-End (E2E) cho Form Lead Đăng Ký Tư Vấn,
  xác minh dữ liệu bắn về Webhook CRM / Google Sheets API và chống Spam.
  Kích hoạt khi: sửa form đăng ký, cập nhật endpoint webhook API, 
  kiểm thử luồng gửi dữ liệu hoặc chuẩn bị deploy phiên bản mới.
---

# ⚡ Form Lead E2E & Webhook Tester Skill

## Khi Nào Kích Hoạt

Bắt buộc chạy skill này khi:
- Chỉnh sửa cấu trúc thẻ `<form>` hoặc ô nhập liệu (`input`, `select`).
- Thay đổi địa chỉ Endpoint API nhận Lead (Webhook Google Sheets, CRM, Telegram Bot).
- Nhận phản ánh lỗi khách hàng điền form không gửi được hoặc dữ liệu bị thiếu.
- Trước khi deploy sản xuất (Production Release Gate).

---

## Quy Trình Kiểm Thử 5 Bước Bắt Buộc

### Bước 1 — Kiểm tra Semantic Structure & Attributes HTML

Xác minh thẻ Form đạt chuẩn:

```html
<form id="leadForm" action="POST" novalidate autocomplete="on">
  <input type="text" name="fullName" required autocomplete="name" placeholder="Họ và tên *">
  <input type="tel" name="phone" required autocomplete="tel" pattern="[0-9]{10}" placeholder="Số điện thoại *">
  <select name="carModel" required>
    <option value="">-- Chọn dòng xe tư vấn --</option>
    <option value="VF3">VinFast VF 3</option>
    <option value="VF5">VinFast VF 5 Plus</option>
  </select>
  <button type="submit" id="submitBtn" class="btn-submit">
    <span>GỬI YÊU CẦU BÁO GIÁ</span>
  </button>
</form>
```

### Bước 2 — Anti-Spam & Double Click Lock Check

Kiểm tra script xử lý Form có khóa nút Submit ngay lập tức khi bấm không:

```javascript
form.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn.disabled) return; // Chống double submit
  
  // Disable nút và hiện hiệu ứng loading
  submitBtn.disabled = true;
  const originalText = submitBtn.innerText;
  submitBtn.innerText = 'Đang xử lý...';

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      // Push DataLayer Lead Success
      window.dataLayer.push({ event: 'form_lead_success', car_model: formData.carModel });
      showSuccessModal();
      form.reset();
    } else {
      throw new Error('Server response not ok');
    }
  } catch (err) {
    showErrorNotification('Có lỗi xảy ra, vui lòng liên hệ Hotline!');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = originalText;
  }
});
```

### Bước 3 — Positive & Negative Test Cases

Thiết lập các Test Case giả lập tự động:

1. **Negative Test 1 (Bỏ trống SĐT)**: Điền Họ tên, không điền SĐT -> Phải báo lỗi validation tại chỗ, không được gửi fetch.
2. **Negative Test 2 (SĐT sai định dạng)**: Điền SĐT `09123` (5 số) -> Phải báo lỗi "Số điện thoại không hợp lệ".
3. **Positive Test (Thành công)**: Điền Họ tên "Nguyễn Văn A", SĐT "0912345678", Chọn xe "VF3" -> Fetch phải trả về `status: 200`, hiển thị Modal cảm ơn và bắn DataLayer event `form_lead_success`.

---

## Verification Criteria (Tiêu Chí Nghiệm Thu)

- **UI State**: Modal cảm ơn xuất hiện chính giữa màn hình với nút Đóng hoạt động tốt trên di động.
- **Payload Inspection**: Dữ liệu gửi đi dạng JSON phải có đủ `fullName`, `phone`, `carModel`, `source_url`, `timestamp`.
- **DataLayer Event**: Chạy `window.dataLayer` trên Console trình duyệt thấy event `form_lead_success` có thông số chính xác.
