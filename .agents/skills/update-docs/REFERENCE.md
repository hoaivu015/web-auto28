# Cẩm Nang Chi Tiết Cập Nhật Tài Liệu Kỹ Thuật (Documentation Reference)

## 🗺️ Bản Đồ Tài Liệu & Phân Vùng Mã Nguồn (Document Mapping)

Để đảm bảo đồng bộ hoàn hảo, khi bất kỳ tệp mã nguồn nào ở cột bên phải thay đổi, bạn bắt buộc phải kiểm tra và cập nhật các tệp tài liệu tương ứng ở cột bên trái:

| Tệp Tài Liệu (Document File) | Vùng Mã Nguồn Liên Quan (Codebase Source Files) | Nội Dung Quản Lý (Key Concepts) |
| :--- | :--- | :--- |
| [`guides/STATUS_UPDATE_GUIDE.md`](file:///Users/phanvu/Desktop/auto-28/guides/STATUS_UPDATE_GUIDE.md) | - `src/modules/inventory/domain/VehicleStateMachine.ts`<br>- `src/modules/inventory/infrastructure/SupabaseVehicleRepository.ts`<br>- `src/modules/inventory/presentation/InventoryPresenter.ts`<br>- `src/shared/domain/constants.ts`<br>- `StatusUpdateOverlay.tsx` | Sơ đồ chuyển trạng thái xe (Deposit, In Stock, Sold), các trường dữ liệu bị reset, phân quyền chuyển trạng thái. |
| [`guides/LANDING_PAGE_GUIDE.md`](file:///Users/phanvu/Desktop/auto-28/guides/LANDING_PAGE_GUIDE.md) | - `lading-page/`<br>- `lading-page/main.js`<br>- `lading-page/js/`<br>- `src/modules/landingpage/` | Đặc tả Landing Page thu mua xe VinFast, luồng dữ liệu Leads, tích hợp Supabase cấu hình động và đồng bộ kho xe, các tương tác UX Parallax 3D & 360° View. |
| [`guides/FINANCIAL_LOGIC_GUIDE.md`](file:///Users/phanvu/Desktop/auto-28/guides/FINANCIAL_LOGIC_GUIDE.md) | - `src/shared/utils/vehicle_calculations.ts`<br>- `src/modules/inventory/domain/VehicleEntity.ts`<br>- `src/modules/finance/` | Công thức tính toán lợi nhuận gộp (Gross Profit), lợi nhuận ròng (Net Profit), chi phí spa, hoa hồng mua/bán và đối tác góp vốn. |
| [`guides/INVENTORY_GUIDE.md`](file:///Users/phanvu/Desktop/auto-28/guides/INVENTORY_GUIDE.md) | - `src/modules/inventory/` | Luồng nhập kho xe mới, quản lý thông tin xe, lịch sử xe và tích hợp nhân viên chịu trách nhiệm. |
| [`guides/DESIGN_GUIDE.md`](file:///Users/phanvu/Desktop/auto-28/guides/DESIGN_GUIDE.md)<br>[`NEURAL_EXPRESSIVE_DESIGN.md`](file:///Users/phanvu/Desktop/auto-28/NEURAL_EXPRESSIVE_DESIGN.md)<br>[`Neural_Expressive_Design_System.md`](file:///Users/phanvu/Desktop/auto-28/Neural_Expressive_Design_System.md) | - `src/shared/design-system/`<br>- `src/shared/design-system/tokens.ts`<br>- `src/shared/design-system/components/` | Ngôn ngữ thiết kế Neural Expressive 2.0: Liquid Glassmorphism, Spring Physics, các mã màu HSL, Squircle border, và Mobile Haptic Matrix. |
| [`guides/DEPLOYMENT_GUIDE.md`](file:///Users/phanvu/Desktop/auto-28/guides/DEPLOYMENT_GUIDE.md) | - `vercel.json`<br>- `supabase/migrations/`<br>- `package.json` | Cấu hình build & deploy trên Vercel, đồng bộ schema/migrations Supabase, biến môi trường. |
| [`LOADING_SPEC.md`](file:///Users/phanvu/Desktop/auto-28/LOADING_SPEC.md)<br>[`NEURAL_LOADING_DESIGN_STANDARD.md`](file:///Users/phanvu/Desktop/auto-28/NEURAL_LOADING_DESIGN_STANDARD.md) | - `src/shared/design-system/components/Loading/`<br>- Trạng thái loading trong các Presenters | Quy chuẩn thiết kế Skeleton loaders, spinners, và hiệu ứng chuyển cảnh mượt mà khi tải dữ liệu. |
| [`MODULE_MAP.md`](file:///Users/phanvu/Desktop/auto-28/MODULE_MAP.md) | - Cấu trúc thư mục toàn hệ thống | Phân bổ thư mục theo Clean Architecture / MVP (domain, application, infrastructure, presentation). |
| [`guides/các loại lỗi.md`](file:///Users/phanvu/Desktop/auto-28/guides/các%20loại%20lỗi.md) | - Lịch sử sửa bug, ts errors | Tổng hợp các lỗi TypeScript, lỗi runtime phổ biến và cách khắc phục tương ứng. |
| [`QUALITY_STANDARDS.md`](file:///Users/phanvu/Desktop/auto-28/QUALITY_STANDARDS.md) | - `playwright.config.ts`<br>- `tests/`<br>- `eslint.config.js` | Tiêu chuẩn viết code sạch (Zero Any, Dumb UI, Zod boundary), kiểm thử tự động (e2e, unit test). |

---

## 🎨 Tiêu Chuẩn Trình Bày Tài Liệu Kỹ Thuật (Doc Design Standards)

Tài liệu của Auto 28 phải được thiết kế sang trọng, chuyên nghiệp và có tính tương tác cao. Khi tạo hoặc cập nhật tài liệu, bắt buộc áp dụng các quy chuẩn sau:

### 1. Sử dụng GitHub Alerts đúng ngữ cảnh
- **`[!NOTE]`**: Dùng cho thông tin nền tảng, bối cảnh triển khai hoặc giải thích phụ trợ.
- **`[!IMPORTANT]`**: Dùng cho các yêu cầu bắt buộc, các bước quan trọng không được bỏ qua.
- **`[!WARNING]`**: Dùng cho các thay đổi có thể gây lỗi hệ thống (breaking changes) hoặc xung đột kiểu dữ liệu.

### 2. Thiết kế Sơ đồ Mermaid chuẩn xác
- Luôn đặt tên nhãn chứa ký tự đặc biệt (ví dụ: dấu ngoặc đơn, mũi tên, dấu ngoặc vuông) trong dấu ngoặc kép để tránh lỗi cú pháp Mermaid.
- Ví dụ: `id["Nhãn (Thông tin thêm)"]` thay vì `id[Nhãn (Thông tin thêm)]`.
- Sử dụng màu sắc và phân nhóm (`subgraph`) rõ ràng để trực quan hóa kiến trúc Clean Architecture hoặc luồng chuyển đổi trạng thái.

### 3. Sơ đồ tuần tự (Sequence Diagram) bằng ký tự trực quan
Khi luồng xử lý phức tạp đi qua nhiều lớp (Presentation $\rightarrow$ Presenter $\rightarrow$ Use Case $\rightarrow$ Repository $\rightarrow$ Database), hãy cung cấp một sơ đồ Sequence dạng ký tự text trực quan như dưới đây để người đọc dễ hình dung:
```
UI                  Presenter               UseCase             Repository
│                       │                       │                   │
│── click action ──────>│                       │                   │
│                       │── execute(request) ──>│                   │
│                       │                       │── updateStatus() ─>│
```

### 4. Định dạng liên kết tệp chính quy
- Các liên kết đến tệp mã nguồn phải sử dụng đường dẫn tuyệt đối dạng `file:///Users/phanvu/Desktop/auto-28/path/to/file` hoặc đường dẫn tương đối chính xác.
- Không bọc liên kết tệp trong thẻ code backticks (`` `[`link`](...)` ``) vì sẽ làm hỏng chức năng định dạng liên kết của IDE.
  - **Đúng**: `Xem [VehicleStateMachine.ts](file:///Users/phanvu/Desktop/auto-28/src/modules/inventory/domain/VehicleStateMachine.ts)`
  - **Sai**: `Xem [\`VehicleStateMachine.ts\`](file:///Users/phanvu/Desktop/auto-28/src/modules/inventory/domain/VehicleStateMachine.ts)`

---

## ⚠️ Anti-Patterns Cần Tránh Khi Cập Nhật Tài Liệu

- ❌ **Copy paste code bừa bãi:** Tránh copy các khối code lớn vào tài liệu vì chúng sẽ nhanh chóng bị lỗi thời khi mã nguồn thay đổi. Thay vào đó, hãy trích dẫn các đoạn code cốt lõi (dưới 15 dòng) và cung cấp link liên kết đến tệp gốc.
- ❌ **Bỏ sót tài liệu vệ tinh:** Chỉ cập nhật tài liệu chính mà quên cập nhật các tệp liên đới như `README.md` hoặc `MODULE_MAP.md` khi thay đổi cấu trúc thư mục.
- ❌ **Tài liệu hóa suy đoán:** Viết những tính năng dự kiến hoặc chưa có trong code thực tế mà không gắn nhãn "Đang phát triển/Dự thảo". Mọi tài liệu kỹ thuật phải là phản ánh chân thực của mã nguồn hiện tại.
