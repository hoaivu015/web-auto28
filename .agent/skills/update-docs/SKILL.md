---
name: update-docs
description: Hướng dẫn và thực thi việc cập nhật tài liệu kỹ thuật, kiến trúc, sơ đồ luồng và cẩm nang vận hành cho dự án Auto 28. Đảm bảo tính đồng bộ hoàn hảo giữa mã nguồn thực tế và tài liệu hướng dẫn. Use when updating application documentation, guides, architecture diagrams, or when the user requests documentation updates.
---

# Kỹ năng Cập nhật Tài liệu & Sơ đồ Luồng Kỹ thuật

Kỹ năng này định hướng quy chuẩn cập nhật tài liệu kỹ thuật cho hệ sinh thái Auto 28, đảm bảo mọi tài liệu hướng dẫn (guides) và cấu trúc thư mục logic luôn phản ánh chính xác 100% mã nguồn thực tế khi có sự thay đổi.

## Quick Start

Trước khi tiến hành cập nhật tài liệu, hãy xác định các tệp tài liệu chịu ảnh hưởng bằng công cụ tìm kiếm:

```bash
# Tìm kiếm các file markdown trong thư mục guides và thư mục gốc chứa các từ khóa liên quan đến code thay đổi
grep -rn "từ_khóa_hoặc_file_code" guides/
```

## Workflow Cập Nhật Tài Liệu

### 1. Định vị Phạm vi ảnh hưởng (Scope Detection)
- Xác định tệp mã nguồn hoặc module vừa thay đổi (ví dụ: `VehicleStateMachine.ts` thay đổi logic trạng thái).
- Đối chiếu với **Bản đồ Tài liệu** trong [REFERENCE.md](REFERENCE.md) để tìm tài liệu tương ứng cần cập nhật (ví dụ: `guides/STATUS_UPDATE_GUIDE.md`).

### 2. Thu thập Thông tin Thực tế (Content Harvesting)
- Đọc kỹ mã nguồn mới để lấy thông tin chính xác về: kiểu dữ liệu (Types/Enums), đường dẫn tệp (file paths), hàm xử lý (methods), và các quy tắc phân quyền hoặc tính toán tài chính.
- Tuyệt đối không tự suy đoán thông tin. Mọi chi tiết kỹ thuật trong tài liệu phải được lấy trực tiếp từ mã nguồn thực tế.

### 3. Thực thi Cập nhật Chính xác (Surgical Sync)
- Sử dụng phương thức thay đổi nội soi (surgical changes) để cập nhật nội dung tài liệu.
- Định dạng tài liệu bằng markdown chuẩn và trực quan:
  - Cập nhật các bảng trạng thái, bảng phân quyền.
  - Vẽ hoặc hiệu chỉnh các sơ đồ luồng Mermaid / Sequence Diagrams nếu có thay đổi về luồng dữ liệu (xem chi tiết thiết kế tại [REFERENCE.md](REFERENCE.md)).
  - Sử dụng GitHub Alerts (`[!NOTE]`, `[!IMPORTANT]`, `[!WARNING]`) để làm nổi bật lưu ý kỹ thuật quan trọng.

### 4. Hậu Kiểm tra & Xác minh (Verify & Ship)
- Đảm bảo tất cả liên kết tệp (`file:///...` hoặc relative path) trong tài liệu hoạt động đúng.
- Xác thực cú pháp sơ đồ Mermaid để tránh lỗi kết xuất (render error).

## Reference Documentation

- **Bản đồ Tài liệu & Quy chuẩn Thiết kế Tài liệu:** Xem [REFERENCE.md](REFERENCE.md)
- **Kiến trúc & Định chuẩn Giao diện Dự án:** Xem [Design System Guide](../design-system-guide/SKILL.md) và [iPhone Native UI Enforcer](../iphone-native-ui-enforcer/SKILL.md)

## Checklist Hoàn Thành Cập Nhật Tài Liệu

- [ ] Tài liệu được cập nhật phản ánh đúng 100% logic mã nguồn thực tế hiện tại.
- [ ] Các liên kết tệp sử dụng đường dẫn tuyệt đối `file:///...` trong workspace hoặc tương đối từ thư mục tài liệu được kiểm tra hoạt động tốt.
- [ ] Sơ đồ Mermaid không có lỗi cú pháp, nhãn văn bản có ký tự đặc biệt được đặt trong dấu ngoặc kép.
- [ ] Không có thông tin placeholder hoặc thông tin lỗi thời bị bỏ sót trong tài liệu.
