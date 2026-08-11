# Cẩm Nang Sửa Lỗi TypeScript & Thiết Kế Thẩm Mỹ

Tài liệu này tổng hợp các lớp lỗi kiểu dữ liệu (TypeScript compiler errors) phổ biến trong dự án Auto 28, kèm theo cách giải quyết chuẩn xác nhất để làm sạch codebase mà không phá vỡ logic nghiệp vụ hoặc vi phạm hệ thống thiết kế.

---

## ═══ I. MẪU LỖI TYPESCRIPT & PHƯƠNG PHÁP XỬ LÝ ═══

### 1. Lỗi Khai báo không sử dụng (Unused Declarations / TS6133, TS6196)
*   **Triệu chứng:**
    *   `error TS6133: 'UnifiedExpenseDTO' is declared but its value is never read.`
    *   `error TS6196: 'DBVehicle' is declared but never used.`
    *   `error TS6133: 'ArrowUpRight' is declared but its value is never read.`
*   **Giải pháp:**
    - Nếu là import thư viện hoặc Icon (như `ArrowUpRight`), hãy xóa bỏ phần import thừa để làm sạch file.
    - Nếu là biến trong hàm hoặc class có ý nghĩa mở rộng trong tương lai, hãy thêm tiền tố dấu gạch dưới `_` (ví dụ: `_unusedVar`) hoặc chuyển sang export nếu cần chia sẻ với bên ngoài.

### 2. Lỗi Không tương thích Option Thư viện (Unknown Properties / TS2353)
*   **Triệu chứng:**
    *   `error TS2353: Object literal may only specify known properties, and 'titleClassName' does not exist in type 'ToastOptions'.`
*   **Giải pháp:**
    - Thư viện thông báo toast (như `sonner`) không có thuộc tính `titleClassName` trực tiếp trong cấu hình tùy chọn ToastOptions mặc định.
    - Thay thế bằng cách sử dụng các thuộc tính style chuẩn của sonner hoặc dùng `classNames` định nghĩa lớp CSS cho tiêu đề:
      ```tsx
      toast.error("Thông báo lỗi", {
        classNames: {
          title: "text-red-500 font-bold", // Đúng chuẩn classNames của Sonner
        }
      });
      ```

### 3. Lỗi Không tương thích Kiểu Nullable & Undefined (Nullability Mismatch / TS2322)
*   **Triệu chứng:**
    *   `history?: { date: string; status: VehicleStatus; user: string; note: string; }[] | undefined` gặp giá trị `null` từ cơ sở dữ liệu hoặc API.
    *   `Type 'null' is not assignable to type '...[] | undefined'.`
*   **Giải pháp:**
    - Tuyệt đối không ép kiểu cưỡng chế bằng `as any`. Hãy chuẩn hóa dữ liệu đầu vào bằng toán tử nullish coalescing hoặc viết adapter chuyển đổi:
      ```tsx
      // Cách sửa chuẩn xác
      const cleanHistory = rawHistory ? rawHistory.map(item => ({
        date: item.date,
        status: item.status as VehicleStatus,
        user: item.user,
        note: item.note ?? ""
      })) : undefined; // Trả về undefined thay vì null
      ```

### 4. Lỗi Mismatched State Setters / Event Handlers (TS2322)
*   **Triệu chứng:**
    *   `error TS2322: Type 'Dispatch<SetStateAction<{ name: string; phone: string; department: string; }>>' is not assignable to type '(data: { name: string; phone: string; }) => void'.`
*   **Giải pháp:**
    - Không gán trực tiếp hàm Dispatch của state cho prop callback có cấu trúc tham số khác biệt.
    - Tạo một wrapper handler trung gian để định hình và chuyển tiếp tham số:
      ```tsx
      // Lỗi: <ChildComponent onUpdate={setProfile} /> (thiếu thuộc tính department)
      
      // Sửa chuẩn:
      const handleProfileUpdate = (data: { name: string; phone: string }) => {
        setProfile(prev => ({
          ...prev,
          name: data.name,
          phone: data.phone,
          // Giữ lại hoặc điền mặc định cho department
        }));
      };
      ```

### 5. Lỗi Kiểu dữ liệu tham số lỏng lẻo (Type Safety for Unknown / TS2345)
*   **Triệu chứng:**
    *   `error TS2345: Argument of type 'unknown' is not assignable to parameter of type '...'.`
*   **Giải pháp:**
    - Thực hiện Type-Guard bằng Zod schema hoặc kiểm tra kiểu thủ công trước khi truyền tham số:
      ```tsx
      // Dùng Zod để parse an toàn
      const result = ExpenseSchema.safeParse(data);
      if (result.success) {
        presenter.recordExpense(result.data);
      } else {
        console.error(result.error);
      }
      ```

### 6. Lỗi Thiếu thuộc tính Khóa chính (Missing ID in Update Params / TS2345)
*   **Triệu chứng:**
    *   `Property 'id' is missing in type '{ amount: number; ... }' but required in type '{ id: string; amount?: number; ... }'.`
*   **Giải pháp:**
    - Cung cấp `id` rõ ràng từ biến bối cảnh hoặc nạp lại thông tin xe/giao dịch đang thực thi. Không tạo cấu trúc "mù" thiếu định danh.

---

## ═══ II. CHECKLIST CHUYỂN HÓA THẨM MỸ DESIGN SYSTEM ═══

Khi tiến hành refactor các file View (chẳng hạn như `PersonalMobileView` hay `PersonalWebView`), hãy thực thi các quy chuẩn thiết kế sau để nâng tầm thẩm mỹ:

### 1. Layering & Chiều sâu lơ lửng
*   Các thẻ chính (Card) dùng hiệu ứng Liquid Glassmorphism:
    `bg-white/70 dark:bg-[#161a23]/65 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-sm`
*   Bo góc cực đại cho thẻ chính: `rounded-[32px]` (t1).
*   Bo góc thành phần con/ảnh: `rounded-[20px]` đến `rounded-[24px]` (t2).
*   Nút bấm hoặc nhãn trạng thái: `rounded-full` (t3).

### 2. Spring Physics (Chuyển động Lò xo 3D)
*   Mọi nút bấm có tương tác hoặc thẻ card phải phản hồi lực nén vật lý:
    - Khi hover: Dịch chuyển nhẹ Y `-4px` hoặc `-6px`, phóng to `scale-[1.02]`.
    - Khi click/tap: Nén thụt xuống `scale-[0.96]` đến `scale-[0.98]`.
*   Tích hợp Framer Motion với spring settings:
    `transition={{ type: 'spring', stiffness: 300, damping: 25 }}`

### 3. Mobile Safe Area & Haptic Feedback
*   Thiết kế giao diện Mobile phải có đệm an toàn tránh đè lên tai thỏ hoặc thanh home ảo của iOS:
    `pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]`
*   Bắt buộc tích hợp rung phản hồi xúc giác Capacitor khi người dùng tương tác:
    - Click nút / Chọn tab: `Haptics.impact({ style: ImpactStyle.Light })`
    - Lưu dữ liệu thành công: `Haptics.notification({ type: NotificationType.Success })`
