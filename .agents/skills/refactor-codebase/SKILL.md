---
name: refactor-codebase
description: >-
  ⚠️ [INCOMPATIBLE WITH THIS PROJECT] Skill này chứa code mẫu React/TypeScript không phù hợp với dự án
  Vanilla HTML/CSS/JS. Không khích hoạt tự động. Sử dụng `safe-file-refactor` hoặc `andrej-karpathy` thay thế.
  Original: Guide and execute codebase refactoring to resolve TypeScript errors, clean lint warnings,
  and strictly align UI/UX with the Neural Expressive 2.0 design language.
compatible_stack: [React, TypeScript, Next.js]
incompatible_stack: [Vanilla HTML, Vanilla CSS, Vanilla JS]
recommended_alternative: safe-file-refactor, andrej-karpathy
---

# Codebase Refactoring & Design Alignment

> [!WARNING]
> **CẢNH BÁO TƯƠNG THÍCH**: Skill này được thiết kế cho dự án **React/TypeScript** (Next.js, Vite + React).
> Dự án Auto 28 Landing Page dùng **Vanilla HTML/CSS/JS** — skill này **KHÔNG TƯƠNG THÍCH**.
>
> **Thay thế đúng cho dự án này:**
> - Refactor JS → dùng [`andrej-karpathy`](./../andrej-karpathy/SKILL.md) + [`safe-file-refactor`](./../safe-file-refactor/SKILL.md)
> - Chuẩn hóa code → dùng [`ai-code-spacing-audit`](./../ai-code-spacing-audit/SKILL.md)
> - Phát hiện bugs → dùng [`scout`](./../scout/SKILL.md)

Kỹ năng này định hướng và cung cấp quy chuẩn giúp bạn hoặc các subagent tiến hành refactor codebase của hệ sinh thái Auto 28, đảm bảo giải quyết triệt để lỗi TypeScript biên dịch đồng thời tuân thủ hoàn hảo ngôn ngữ thiết kế **Neural Expressive 2.0**.

## Quick Start

Trước khi tiến hành sửa đổi, hãy chạy phân tích để định vị chính xác vị trí và nguyên nhân lỗi:

```bash
# ⚠️ KHÔNG CHẠY trong dự án Vanilla JS (không có tsconfig.json)
# 1. Chạy TypeScript Compiler để quét toàn bộ lỗi kiểu dữ liệu
# npx tsc --noEmit   ← SKIP

# 2. Chạy ESLint để quét lỗi định dạng và code smell
# npm run lint       ← SKIP (không có ESLint config trong dự án này)
```

## Refactor Workflows

### 1. Phác họa Kế hoạch Sửa đổi (Plan & Design)
- Tuyệt đối tuân thủ triết lý **Karpathy** (`andrej-karpathy`): Ưu tiên tính đơn giản, bảo thủ và chỉnh sửa tối thiểu (surgical changes).
- Không tự ý viết mã tùy tiện. Hãy đối chiếu các lỗi kiểu dữ liệu với [REFERENCE.md](REFERENCE.md) để áp dụng các giải pháp chuẩn đã được chứng minh thành công.

### 2. Chuẩn hóa Thiết kế Neural Expressive 2.0
- Sử dụng các token chính quy từ [tokens.ts](file:///Users/phanvu/Desktop/auto-28/src/shared/design-system/tokens.ts) (ví dụ: `rounded-[32px]`, `backdrop-blur-md bg-white/40 border-white/60`, v.v.).
- Tránh sử dụng Tailwind ad-hoc hoặc CSS inline. Hãy ưu tiên tái cấu trúc hoặc lồng ghép (compose) các core components từ `src/shared/design-system/`.
- Kiểm tra chi tiết kỹ thuật của các cấu kiện mẫu và nguyên lý trong [EXAMPLES.md](EXAMPLES.md).

### 3. Quy trình Đóng gói & Kiểm chứng (Verify & Ship)
- Sau khi thực hiện sửa đổi cục bộ, hãy biên dịch lại dự án:
  ```bash
  npx tsc --noEmit
  ```
- Chạy các kiểm thử tự động để đảm bảo không xảy ra lỗi hồi quy:
  ```bash
  npm run test
  ```

## Reference Documentation

- **Giải pháp cho lỗi TypeScript cụ thể:** Xem [REFERENCE.md](REFERENCE.md)
- **Ví dụ so sánh Trước/Sau (Before/After):** Xem [EXAMPLES.md](EXAMPLES.md)
- **Single Source of Truth về Thiết kế:** Xem [DESIGN.md](file:///Users/phanvu/Desktop/auto-28/DESIGN.md) và [Design System Code Guide](file:///Users/phanvu/Desktop/auto-28/.agent/skills/design-system-guide/SKILL.md)

## Checklist Hoàn Thành Refactor

- [ ] Dự án biên dịch sạch lỗi (`npx tsc --noEmit` trả về 0 lỗi).
- [ ] Không lạm dụng `any` hoặc `@ts-ignore` ngoại trừ các trường hợp thư viện ngoài bất khả kháng được giải trình kỹ lưỡng.
- [ ] Các thành phần giao diện sử dụng đúng `DESIGN_TOKENS` và hỗ trợ nảy lò xo (`active:scale-[0.96]`).
- [ ] Responsive hoạt động mượt mà ở cả layout Di động (vuốt chạm) và Máy tính (lơ lửng, hover 3D).
