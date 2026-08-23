# Mistakes Log — Auto 28 Agent Memory

> File này được agent đọc tự động khi bắt đầu mỗi session (§19 Memory Protocol).
> Ghi lại lỗi đã phạm để tránh tái phạm.

## Format chuẩn:
```
## [DATE] — [Tên lỗi]
- Symptom: user thấy gì
- Root Cause: nguyên nhân gốc
- Wrong fix tried: cái đã làm sai
- Correct fix: cái đúng
- Rule added: rule nào được thêm vào AGENTS.md
```

---

## [2026-08-23] — Bỏ sót lỗi tương phản màu và bất đồng bộ Theme (Dark Box trong Light Mode)
- Symptom: Khối .eeat-authority-box có nền xám đen (#0F172A) giữa trang Light Mode (#F3F6FC), text dùng var(--color-text-secondary) (#1E293B) bị tối mờ, không đọc được (WCAG < 2:1).
- Root Cause:
  1. Static Code Analysis Blindspot: Đọc code thấy có `var(--color-text-secondary)` nhưng không tính toán màu thực tế với nền `background: rgba(15,23,42,0.85)` đè phía sau.
  2. Healthcheck False Sense of Security: `npm run healthcheck` chỉ kiểm tra 10 mục file/MIME/syntax cơ bản, không có bước test WCAG Computed Color Contrast.
  3. Inline Style Override: Dùng `style="..."` trực tiếp trong HTML khiến linter CSS không rà soát được.
- Wrong fix tried: Tin tưởng kết quả healthcheck 10/10 PASS và cho rằng giao diện đã đồng bộ mà không kiểm tra thực tế trên rendered layout.
- Correct fix: Đồng bộ khối về Light Bento Card (`rgba(255,255,255,0.88)`, `backdrop-blur: 24px`, `border: 1px solid #E1E9F6`, `border-radius: 32px`, text `#020B14` và `#1E293B`).
- Rule added: Luôn kiểm tra giao thoa giữa Background inline/class với CSS variable Text color để tránh nghịch đảo tương phản (Inverted Contrast Fail).
