---
name: Judge — Code Review & AI Hallucination Detection
description: Review code tự động theo 9 Luật Auto 28, phát hiện AI hallucination trong code được generate, kiểm tra architectural compliance trước khi commit. Kích hoạt khi user muốn review code, trước PR, hoặc sau khi AI generate code lớn.
---

# ⚖️ JUDGE — CODE REVIEW

> Inspired by simota/agent-skills Judge agent.
> Review tiêu chuẩn dựa trên 9 Luật Clean Surgical NextJS v5.

## Khi nào dùng
- Trước khi commit code mới
- Sau khi AI (kể cả tôi) generate code lớn
- Review PR của team
- Trigger: "judge review", "review code này", "kiểm tra code"

## Judge Checklist — 4 Dimensions

### Dimension 1: Architectural Laws (L1-L9)
```
L1 Zero Any:
  → grep "as any\|: any\|@ts-ignore" trong files được review
  → Mỗi vi phạm = 🔴 Critical

L2 Dumb UI:
  → Có logic nghiệp vụ / Supabase call trong *.tsx không?
  → Có calculation ngoài Presenter không?

L3 SSoT:
  → Có interface thủ công song song với Zod schema không?
  → Type có được derive từ z.infer<> không?

L4 Domain Purity:
  → domain/ có import React/Supabase/UI không?

L5 State Machine:
  → Có chỗ nào gán status trực tiếp không qua VehicleStateMachine không?

L6 Zod Boundary:
  → Mọi entry point (form/API/URL) đều có Zod parse không?

L7 Dependency Direction:
  → Presentation → Application → Domain (không ngược)

L8 Unified Action:
  → Mutations dùng executeAction không? Hay tự viết try/catch?

L9 Declare Before Act:
  → N/A cho code review (đây là rule cho AI behavior)
```

### Dimension 2: AI Hallucination Detection
Các dấu hiệu code AI generate có lỗi:

```typescript
// 🚨 HALLUCINATION PATTERN 1: Import không tồn tại
import { useVehicleStore } from '@/stores/vehicle'; // store này có tồn tại không?

// 🚨 HALLUCINATION PATTERN 2: Function signature sai
const data = await vehicleRepo.findByStatus('Available', { limit: 10 });
// → findByStatus có nhận object option không? Check interface!

// 🚨 HALLUCINATION PATTERN 3: API không đúng
const { data } = supabase.from('vehicles').select('*').filter('status', 'eq', 'Available');
// → Supabase filter syntax sai, đúng là .eq('status', 'Available')

// 🚨 HALLUCINATION PATTERN 4: Type assertion che giấu lỗi
const vehicle = data as Vehicle; // Không safe parse → hallucination về type
```

Kiểm tra:
- [ ] Mọi import có thực sự tồn tại không? (dùng `grep_search`)
- [ ] Function signatures match interface definition không?
- [ ] API calls đúng syntax Supabase không?
- [ ] Types được assert hay được parse an toàn?

### Dimension 3: Code Quality
- [ ] Naming rõ ràng (không viết tắt khó hiểu)?
- [ ] Không có dead code (unused imports, commented-out code dài)?
- [ ] Không có `console.log` sót lại trong production code?
- [ ] Error handling đầy đủ (không silent fail)?

### Dimension 4: Performance
- [ ] Không có N+1 query trong loop?
- [ ] Không re-render không cần thiết (dependency array đúng không)?
- [ ] Large data có được paginate không?

## Output Format

```
[JUDGE VERDICT]
Files reviewed: [danh sách]
Tổng vi phạm: [N]

🔴 CRITICAL — Phải fix trước commit:
  C1: [mô tả] tại [file:dòng] — Vi phạm L[N]
  C2: [mô tả] tại [file:dòng]

🟡 WARNING — Nên fix:
  W1: [mô tả] tại [file:dòng]

🟢 PASSED:
  - L1 Zero Any: ✅ Không có vi phạm
  - L6 Zod Boundary: ✅
  - ...

🤖 AI HALLUCINATION CHECK:
  - Import check: [PASS / FAIL: chi tiết]
  - Type safety: [PASS / FAIL: chi tiết]

VERDICT: ✅ APPROVED / ⚠️ CONDITIONAL / ❌ REJECTED
```

## Kết hợp với Scout
- **Judge** → phát hiện vị trí vi phạm
- **Scout** → điều tra nguyên nhân gốc rễ
- **Builder/Declaration Block L9** → fix có kiểm soát
