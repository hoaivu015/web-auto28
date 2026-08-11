# Module: Decision Gates — Auto 28 Agent System
# Nguồn: AGENTS.md §11 + §11.1 + §12 + §13
# Load khi: sửa bug, refactor, thêm feature, mọi write-action

---

## Khi Nào Dùng Gate Nào?

```
Task là BUG / LỖI?          → Gate 1: 5 Whys Diagnosis
Task là REFACTOR / FEATURE? → Gate 2: Counterfactual Reasoning
Trước KHI code:             → Gate 3: Simplicity Budget
Trước KHI code:             → Gate 4: Blast Radius
Sau KHI code:               → §18 Reflection Gate (trong AGENTS.md core)
```

---

## Gate 1: PRE-FIX DIAGNOSIS (5 WHYS) ← BẮT BUỘC khi sửa bug

> Áp dụng khi: user báo lỗi, dùng từ "sửa", "bị vỡ", "không hoạt động", "fix", "debug".

### Khai báo bắt buộc trước khi viết bất kỳ dòng code fix nào:

```
━━━ DIAGNOSIS & 5 WHYS DECLARATION ━━━
Symptom   : [triệu chứng user thấy]
5 Whys:
  Why 1 (Bề mặt)    : [Tại sao lỗi xảy ra trên UI/Runtime?]
  Why 2 (Data/Flow) : [Tại sao xuất hiện trạng thái sai đó?]
  Why 3 (Logic)     : [Tại sao hàm/component trả về giá trị đó?]
  Why 4 (Ranh giới) : [Tại sao validator không chặn được?]
  Why 5 (Gốc rễ)   : [Nguyên nhân kiến trúc/logic cốt lõi nhất?]
Root Cause: [1-2 câu]
Evidence  : [link file + dòng code — không được đoán]
Impact    : [fix này có thể break gì khác?]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Nếu chưa xác định được Root Cause:**
- KHÔNG được viết code fix
- Đưa ra 3–5 hypothesis có thứ tự ưu tiên, mỗi cái phải falsifiable:
  > "Nếu X là nguyên nhân, thay đổi Y sẽ làm bug biến mất"
- Chạy tool kiểm chứng → xác định → mới fix

**CẤM tuyệt đối:**
- Fix CSS bằng cách tăng `z-index`, `!important` mà không biết tại sao cần
- Thêm `setTimeout` để "đợi element load" mà không hiểu async flow
- Wrap `try/catch` để ẩn lỗi thay vì xử lý lỗi
- Copy-paste solution từ giả định mà không verify context

---

## Gate 2: COUNTERFACTUAL REASONING ← BẮT BUỘC khi Refactor / Feature

> Áp dụng khi: "refactor", "thêm feature", "thay đổi cấu trúc", "tối ưu module", hoặc sửa ≥ 2 files.

### Khai báo bắt buộc trước khi lập kế hoạch code:

```
━━━ COUNTERFACTUAL REASONING DECLARATION ━━━
❌ Option A (Bị loại): [mô tả] → Lý do: [lỗi kiến trúc / trade-off không chấp nhận]
❌ Option B (Bị loại): [mô tả] → Lý do: [rủi ro vỡ code / vi phạm luật dự án]
✅ Option C (Được chọn): [mô tả chi tiết] → Lý do: [tối ưu nhất cho Auto 28]
Trade-offs & Risks: [rủi ro & phương án giảm thiểu]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Gate 3: SIMPLICITY BUDGET ← BẮT BUỘC trước mọi write-action

> Mục tiêu: Ngăn gold-plating, premature abstraction, over-engineering.

### Khai báo trước khi code:

```
━━━ SIMPLICITY BUDGET ━━━
Task scope   : [mô tả 1 câu — chính xác việc cần làm]
Budget lines : ~N dòng (ước tính tối thiểu)
Files touched: [liệt kê chính xác]
━━━━━━━━━━━━━━━━━━━━━━━━
```

### Aggressive Refinement Test (sau khi viết xong):
1. **Dòng nào không trực tiếp phục vụ yêu cầu?** → Xóa.
2. **Code có thể cắt 40% mà không mất function?** → Nếu có → viết lại.
3. **Một Senior Engineer có nói "overcomplicated"?** → Nếu có → đơn giản hóa.

### Hard Rules:
- KHÔNG tạo function/class mới khi inline code đủ dùng
- KHÔNG thêm parameter "để sau dùng" — YAGNI
- KHÔNG viết error handling cho scenarios không thể xảy ra
- Nếu solution vượt quá **1.5x budget lines** → tìm cách khác

---

## Gate 4: BLAST RADIUS ← BẮT BUỘC trước mọi write-action

> Mục tiêu: Ngăn scope creep, không sửa code ngoài phạm vi yêu cầu.

### Khai báo trước khi code:

```
━━━ BLAST RADIUS CHECK ━━━
Files to WRITE  : [danh sách — tối đa]
Files to READ   : [để hiểu context]
Shared resources: [CSS class / JS function / HTML element dùng ở nhiều nơi]
Risk level      : [LOW / MEDIUM / HIGH]
━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Risk Escalation Rules:

| Files bị thay đổi | Risk | Hành động |
|---|---|---|
| 1 file | LOW | Tiến hành bình thường |
| 2–3 files | MEDIUM | Khai báo blast radius rõ ràng |
| 4+ files | HIGH | **DỪNG — Hỏi user trước** |

### Grep-First Protocol:
```bash
# Trước khi sửa bất kỳ CSS class, JS function, HTML ID:
grep -r "tên-class" /Users/phanvu/Desktop/lading-page/ --include="*.html" --include="*.css" --include="*.js"
```

### Zero Scope Creep:
- KHÔNG "cải thiện" code adjacent dù thấy có thể làm tốt hơn
- KHÔNG format lại code của người khác
- KHÔNG đổi tên variable/function ngoài phạm vi fix
- Thấy bug khác khi đang fix → **ghi chú vào mistakes.md, KHÔNG fix ngay**
