# Module: Design System — Neural Expressive 2.0
# Nguồn: AGENTS.md §14
# Load khi: bất kỳ thay đổi HTML/CSS/JS UI nào

---

## §14. NEURAL EXPRESSIVE DNA GATE ← BẮT BUỘC cho mọi Write-Action UI

> **Mọi thay đổi ảnh hưởng đến giao diện (HTML/CSS/JS UI) đều PHẢI tuân thủ ngôn ngữ thiết kế Neural Expressive 2.0.**
> Vi phạm bất kỳ điều nào dưới đây = FAIL, không được merge/deploy.

---

## 🧬 4 ADN CỐT LÕI — KHÔNG ĐƯỢC PHÁ VỠ

```
ADN-1: LIQUID TRANSLUCENCY   — Mọi card/modal/panel dùng kính mờ (backdrop-blur + bg/50-/75)
ADN-2: SUPER ELLIPSE RADIUS  — Góc bo cực lớn: card=32px, sub-component=20-24px, button=full
ADN-3: BOLD-FIRST TYPOGRAPHY — Số/tiêu đề: font-weight 900 (Black), tracking-tight, leading-tight
ADN-4: SPRING PHYSICS MOTION — Hover/tap/modal dùng spring (stiffness 280-340, damping 22-26)
```

---

## 📋 Neural Expressive Checklist (bắt buộc trước khi submit UI)

### Layer & Depth (ADN-1)
- [ ] Card: `bg-white/70 backdrop-blur-xl border border-black/5 shadow-sm`
- [ ] Modal backdrop: `bg-black/40 backdrop-blur-md`
- [ ] Modal container: `bg-white/90 backdrop-blur-2xl border border-black/5`
- [ ] Pill/Tag: `bg-gray-100/50` hoặc `bg-white/5` (dark)
- [ ] KHÔNG dùng background solid thuần (`bg-white`, `bg-gray-100`) cho card chính

### Border Radius (ADN-2)
- [ ] Card lớn: `border-radius: 32px` — bắt buộc
- [ ] Sub-component (ảnh trong card, input): `border-radius: 20px` đến `24px`
- [ ] Button/CTA: `border-radius: 9999px` (full)
- [ ] KHÔNG dùng `border-radius: 6px`, `8px`, `12px` cho component chính

### Typography (ADN-3)
- [ ] Số liệu lớn (giá xe, metrics): `font-size: 2.25rem; font-weight: 900; letter-spacing: -0.05em; line-height: 1.1`
- [ ] Tiêu đề card: `font-size: 1.25rem; font-weight: 900; letter-spacing: -0.025em`
- [ ] Nhãn Tag/Pill: `font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase`
- [ ] Văn bản phụ: `font-size: 0.875rem; font-weight: 500; color: #6b7280`
- [ ] KHÔNG dùng `font-weight: 400, 500, 600, 700` cho tiêu đề primary — phải là `900`

### Motion & Interaction (ADN-4)
- [ ] Card hover: `transform: translateY(-6px) scale(1.02)` với `transition: spring(stiffness:340, damping:22)`
- [ ] Button tap: `active:scale-[0.96]`
- [ ] Modal open: slide từ `y:100%` → `y:0` với spring `stiffness:280, damping:26`
- [ ] KHÔNG dùng `transition: all 0.3s ease` cho interaction chính

### Spacing (ADN-1 + ADN-2 bổ sung)
- [ ] Card padding: tối thiểu 24px, lý tưởng 32px
- [ ] Spacing: bội số 8px — KHÔNG dùng giá trị lẻ (3px, 7px, 13px, 5px)
- [ ] Touch target: tối thiểu 44×44px (iOS) / 48×48px (WCAG 2.2 Android)

---

## 🚦 Ambient Glow — Palette Màu Chuẩn

| Trạng thái | Hex | CSS variable |
|---|---|---|
| Tích cực / Dương | `#00F2FE → #4FACFE` | `--color-positive` |
| Cảnh báo / Vượt ngưỡng | `#FF0844 → #FFB199` | `--color-warning` |
| Primary action | `#4F46E5 → #4338CA` | `--color-primary` |
| Neutral | `#9CA3AF` | `--color-neutral` |

---

## CSS Copy-Paste Chuẩn

### Card chuẩn ADN-1+2:
```css
.card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 32px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  padding: 32px;
}
```

### Button/CTA chuẩn ADN-2+3:
```css
.cta-button {
  border-radius: 9999px;
  font-weight: 900;
  letter-spacing: -0.025em;
  min-height: 48px;
  padding: 12px 32px;
}
```

---

## ⛔ CẤM TUYỆT ĐỐI — Anti-patterns

```
❌ background solid:    background: white; background: #f3f4f6
❌ góc bo nhỏ:          border-radius: 6px, 8px, 12px cho component chính
❌ font-weight thấp:    font-weight: 400, 500, 600, 700 cho tiêu đề primary
❌ CSS transition thuần: transition: all 0.3s ease cho UI chính
❌ spacing lẻ:          margin/padding 3px, 5px, 7px, 9px, 13px
```

---

## 🔗 Tham chiếu đầy đủ
- [Design System Skill](file:///Users/phanvu/Desktop/lading-page/.agents/skills/design-system-guide/SKILL.md) — Code anatomy mẫu
- [iPhone Native UI Enforcer](file:///Users/phanvu/Desktop/lading-page/.agents/skills/iphone-native-ui-enforcer/SKILL.md) — Mobile haptic matrix
