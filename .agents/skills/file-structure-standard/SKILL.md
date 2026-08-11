---
name: file-structure-standard
description: >
  Tiêu chuẩn quốc tế về đặt tên file và cấu trúc thư mục cho dự án Auto 28 Landing Page (Static Vanilla HTML/CSS/JS).
  Kích hoạt khi: thêm file mới, tạo module mới, tái cấu trúc thư mục, review naming, hoặc khi agent/user hỏi về
  cách đặt tên hoặc tổ chức thư mục trong dự án. Bao gồm bộ quy tắc cứng (hard rules), bảng đối chiếu
  đúng/sai, checklist pre-commit, và cấu trúc chuẩn của dự án Auto 28.
---

# 📁 FILE STRUCTURE STANDARD — Auto 28 Landing Page
# Version: 1.0 | Chuẩn: ISO 9660 + W3C URL Spec + Google File Naming + Feature-Sliced Design Lite
# Áp dụng: Mọi tác vụ tạo/đổi tên file hoặc thư mục trong `/Users/phanvu/Desktop/lading-page/`

---

## 1. NGUỒN GỐC TIÊU CHUẨN (Standards Provenance)

| Tiêu chuẩn | Nguồn | Áp dụng cho |
|---|---|---|
| **ISO 9660** | International Organization for Standardization | Ký tự hợp lệ trong tên file |
| **W3C URL Specification** | World Wide Web Consortium | URL-safe characters, no spaces |
| **Google Web Fundamentals** | Google Developer Docs | Lowercase, hyphens for web files |
| **RFC 3986** | IETF (Internet Engineering Task Force) | URI character encoding |
| **ISO 8601** | ISO Date/Time Standard | Date format trong tên file |
| **Feature-Sliced Design (FSD)** | feature-sliced.design | Cấu trúc thư mục theo feature/module |
| **POSIX Standard** | IEEE Std 1003.1 | Tên file portable cross-platform |

---

## 2. QUY TẮC ĐẶT TÊN FILE (File Naming Hard Rules)

### 2.1 — BẮT BUỘC (MUST)

```
✅ Luôn dùng chữ THƯỜNG (lowercase)       →  car-modal.js   NOT  Car-Modal.js
✅ Dùng dấu GẠCH NGANG (-) thay dấu cách →  hero-banner.css NOT  hero banner.css
✅ Ký tự hợp lệ: [a-z0-9-_.]              →  cars_data.js    OK
✅ Phần mở rộng luôn viết thường          →  style.css       NOT  style.CSS
✅ Tên mô tả chức năng, không mô tả trạng thái → car-modal.js NOT car-modal-final-v2.js
✅ Ngày tháng dùng ISO 8601               →  2026-08-09-report.md
```

### 2.2 — CẤM TUYỆT ĐỐI (MUST NOT)

```
❌ Dấu cách trong tên file                →  car modal.js    ← FAIL (URL encode thành %20)
❌ Ký tự đặc biệt: ! @ # $ % ^ & * ( )  →  car!modal.js    ← FAIL
❌ Dấu chấm (.) ngoài phần mở rộng       →  car.modal.js    ← FAIL (gây nhầm extension)
❌ Chữ HOA trong tên file/thư mục web    →  CarModal.js     ← FAIL (case-sensitive Linux server)
❌ Tiền tố vô nghĩa: final, new, copy    →  style-final.css ← FAIL
❌ Chữ Việt có dấu trong tên file        →  danh-gia.html   ← FAIL (encoding issues)
❌ Tên quá dài (>64 chars)              →  super-long...js  ← FAIL (POSIX limit)
❌ Bắt đầu bằng số                      →  1-main.js       ← TRÁNH (gây lỗi import)
❌ Dấu gạch dưới (_) cho file HTML/CSS  →  hero_banner.css  ← TRÁNH (Google SEO penalize)
```

### 2.3 — QUY ƯỚC THEO LOẠI FILE

| Loại file | Convention | Ví dụ đúng |
|---|---|---|
| HTML pages | `kebab-case.html` | `sell.html`, `guide.html`, `dinh-gia.html` |
| CSS modules | `kebab-case.css` | `car-grid.css`, `hero-banner.css` |
| JS modules | `kebab-case.js` | `car-modal.js`, `form-handler.js` |
| JS data files | `snake_case.js` | `cars_data.js` *(ngoại lệ — đã tồn tại)* |
| Config files | Giữ nguyên theo tool | `package.json`, `server.js`, `.env.local` |
| Image assets | `kebab-case.webp` | `vf8-blue-front.webp`, `hero-bg.webp` |
| Docs/Markdown | `kebab-case.md` hoặc `UPPER_CASE.md` | `AGENTS.md`, `architecture-guide.md` |
| Skill files | `SKILL.md` (uppercase) | Convention của Antigravity framework |

---

## 3. TIÊU CHUẨN CẤU TRÚC THƯ MỤC (Directory Structure Standard)

### 3.1 — CẤU TRÚC CHUẨN DỰ ÁN AUTO 28

```
lading-page/                          ← project root
│
├── index.html                        ← Entry page (homepage)
├── sell.html                         ← Page: Thu mua xe
├── guide.html                        ← Page: Hướng dẫn mua xe
├── server.js                         ← Express server (KHÔNG SỬA khi không được phép)
├── package.json                      ← Node dependencies
├── cars_data.js                      ← NGUỒN DỮ LIỆU DUY NHẤT (đừng bao giờ duplicate)
│
├── assets/                           ← Static assets (images, fonts, icons)
│   ├── images/                       ← Ảnh xe, ảnh UI
│   │   ├── cars/                     ← Ảnh từng dòng xe (kebab-case)
│   │   │   └── vf8-blue-front.webp
│   │   └── ui/                       ← Icons, backgrounds, illustrations
│   └── fonts/                        ← Custom fonts (nếu có)
│
├── modules/                          ← JavaScript modules (ES Modules)
│   ├── car-modal.js                  ← Modal hiển thị xe
│   ├── car-grid.js                   ← Lưới xe
│   ├── form-handler.js               ← Xử lý form đăng ký
│   ├── filters.js                    ← Bộ lọc xe
│   └── tracking.js                   ← Analytics/DataLayer events
│
├── styles/                           ← CSS modules (nếu tách riêng)
│   ├── base.css                      ← Reset, typography, CSS variables
│   ├── components/                   ← CSS cho từng component
│   │   ├── car-card.css
│   │   ├── hero-banner.css
│   │   └── modal.css
│   └── pages/                        ← CSS đặc thù cho từng page
│       ├── sell-page.css
│       └── guide-page.css
│
├── public/                           ← Files được serve trực tiếp (robots.txt, sitemap, favicon)
│   ├── robots.txt
│   ├── sitemap.xml
│   └── favicon.ico
│
├── docs/                             ← Tài liệu kỹ thuật
│   └── architecture-guide.md
│
├── .agents/                          ← Agent system (Antigravity framework)
│   ├── AGENTS.md                     ← Rules cho mọi agent
│   ├── agent_weights.json            ← Trọng số agent
│   ├── agents/                       ← Agent definitions (.md files)
│   └── skills/                       ← Skill definitions (thư mục)
│
└── scratch/                          ← Temporary files (KHÔNG commit)
    └── .gitignore                    ← Nên gitignore thư mục này
```

### 3.2 — QUY TẮC THƯ MỤC (Directory Rules)

```
✅ Luôn dùng lowercase cho tên thư mục
✅ Dùng kebab-case nếu tên gồm nhiều từ: car-cards/, hero-section/
✅ Mỗi thư mục có 1 trách nhiệm rõ ràng (Single Responsibility Principle)
✅ Tên thư mục mô tả LOẠI NỘI DUNG, không mô tả trạng thái

❌ Không tạo thư mục: temp/, new-stuff/, old/, backup/
❌ Không lồng quá 4 cấp (deep nesting = anti-pattern)
❌ Không đặt file HTML ở thư mục con (chỉ để root level, trừ khi có route handling)
```

---

## 4. QUY TẮC CỤ THỂ CHO AUTO 28 (Project-Specific Rules)

### 4.1 — Đặt tên file HTML (Pages)
```
Pattern: {chuc-nang-ngan}.html   (kebab-case, ngắn gọn)

✅ index.html         ← Trang chủ
✅ sell.html          ← Thu mua xe (ngắn hơn "thu-mua-xe.html")
✅ guide.html         ← Hướng dẫn
✅ dinh-gia.html      ← Định giá (URL thân thiện SEO)
❌ trang-chu.html     ← KHÔNG (dùng index.html)
❌ SellPage.html      ← KHÔNG (uppercase)
❌ sell_page.html     ← KHÔNG (underscore trong URL SEO penalty)
```

### 4.2 — Đặt tên file JS (Modules)
```
Pattern: {feature}-{role}.js   (kebab-case, mô tả rõ chức năng)

✅ car-modal.js       ← Modal cho xe
✅ form-handler.js    ← Xử lý form
✅ filter-engine.js   ← Engine lọc xe
✅ tracking.js        ← Đủ ngắn, rõ nghĩa
❌ modal.js           ← Quá chung chung
❌ carModal.js        ← CamelCase (không phải convention web file)
❌ Car_Modal.js       ← FAIL cả uppercase lẫn underscore
```

### 4.3 — Đặt tên Assets (Images)
```
Pattern: {model-name}-{variant}-{angle}.{ext}

✅ vf8-eco-plus-blue-front.webp
✅ vf3-white-side.webp
✅ hero-background.webp
❌ IMG_1234.jpg        ← Camera output, không mô tả
❌ VF8_xanh.png        ← Uppercase + underscore
❌ xe_vinfast_moi.jpg  ← Tiếng Việt không dấu tạo confusion
```

---

## 5. CHECKLIST PRE-COMMIT (Bắt buộc trước mọi file creation)

```
━━━ FILE NAMING CHECKLIST ━━━
[ ] Tên file hoàn toàn lowercase?
[ ] Không có dấu cách hay ký tự đặc biệt?
[ ] Dùng kebab-case (không phải camelCase hay underscore)?
[ ] Tên mô tả chức năng (không phải "final", "new", "copy")?
[ ] Phần mở rộng đúng và lowercase (.js, .css, .html, .webp)?
[ ] Thư mục đặt đúng theo cấu trúc chuẩn?
[ ] Không tạo duplicate của file đã tồn tại?
[ ] Nếu là data file → chỉ dùng cars_data.js làm nguồn?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 6. AUDIT COMMANDS (Kiểm tra naming violations)

```bash
# Tìm file có chữ hoa trong tên (trừ exceptions)
find /Users/phanvu/Desktop/lading-page -name "*[A-Z]*" \
  -not -name "AGENTS.md" -not -name "SKILL.md" -not -name "SKILLS_MANUAL.md" \
  -not -name "*.pptx" -not -name "*.pdf" \
  -not -path "*/node_modules/*" -not -path "*/.git/*"

# Tìm file có dấu cách trong tên
find /Users/phanvu/Desktop/lading-page -name "* *" \
  -not -path "*/node_modules/*" -not -path "*/.git/*"

# Tìm file có underscore (ngoại trừ known exceptions)
find /Users/phanvu/Desktop/lading-page -name "*_*" \
  -not -name "cars_data.js" -not -name ".env.local" \
  -not -name "*.resolved" \
  -not -path "*/node_modules/*" -not -path "*/.git/*" \
  -not -path "*/.agents/*" -not -path "*/.agent/*"
```

---

## 7. KNOWN EXCEPTIONS (Ngoại lệ được phép)

| File | Lý do ngoại lệ |
|---|---|
| `cars_data.js` | Snake_case — đã tồn tại, nguồn dữ liệu duy nhất, KHÔNG đổi tên |
| `AGENTS.md` | Uppercase — convention của Antigravity agent framework |
| `SKILL.md` | Uppercase — convention của Antigravity skill system |
| `SKILLS_MANUAL.md` | Uppercase — convention của framework |
| `Car_Sale_Essentials_(6).pptx` | File upload từ bên ngoài, KHÔNG thuộc codebase |
| `*.resolved` | Generated files từ tool, KHÔNG thay đổi |
| `package.json` | Convention chuẩn npm, KHÔNG đổi tên |
| `.env.local` | Convention chuẩn environment files |
| `server.js` | Convention Express.js, KHÔNG đổi tên |

---

## 8. REFERENCES

- [W3C URL Living Standard](https://url.spec.whatwg.org/)
- [Google Search Central: URL Structure](https://developers.google.com/search/docs/crawling-indexing/url-structure)
- [Feature-Sliced Design Official](https://feature-sliced.design/)
- [RFC 3986 — URI Generic Syntax](https://datatracker.ietf.org/doc/html/rfc3986)
- [ISO 8601 Date Format](https://www.iso.org/iso-8601-date-and-time-format.html)
- [POSIX IEEE Std 1003.1](https://pubs.opengroup.org/onlinepubs/9699919799/)
- [Google File Naming Best Practices](https://developers.google.com/style/filenames)
