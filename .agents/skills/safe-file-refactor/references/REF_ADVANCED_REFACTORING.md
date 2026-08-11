# 📚 Reference: Advanced Enterprise Refactoring & AST Parser Toolkit

Tài liệu tham chiếu chuyên sâu dành cho Agent khi thực hiện các tác vụ tái cấu trúc mã nguồn phức tạp ở cấp độ Tier-1 Enterprise trong dự án Auto 28.

---

## 🛠️ 1. RECURSIVE DESCENT AST PARSER & SCOPE SYNTHESIZER (NODE.JS)

Script dưới đây là mẫu Parser AST không phụ thuộc thư viện ngoài (Zero-Dependency Tokenizer & AST Scope Synthesizer) giúp trích xuất các Node hàm, lớp, và biến độc lập kèm tự động phát hiện biến toàn cục.

```javascript
/**
 * Auto 28 - Enterprise AST Scope & Node Synthesizer Helper
 * File: .agent/scratch/ast_node_synthesizer.js
 */
const fs = require('fs');
const path = require('path');

class ASTNodeExtractor {
  constructor(sourceCode) {
    this.code = sourceCode;
  }

  // Trích xuất danh sách tất cả các Function Declaration kèm vạch ranh giới ngoặc nhọn
  extractFunctionNodes() {
    const functions = [];
    const fnRegex = /(?:async\s+)?function\s+([a-zA-Z0-9_$]+)\s*\(([^)]*)\)\s*\{/g;
    let match;

    while ((match = fnRegex.exec(this.code)) !== null) {
      const fnName = match[1];
      const params = match[2].split(',').map(p => p.trim()).filter(Boolean);
      const startIndex = match.index;
      
      // Thuật toán đếm ngoặc nhọn (Brace Matcher) để xác định chính xác điểm kết thúc hàm
      let braceCount = 1;
      let currentIndex = startIndex + match[0].length;

      while (braceCount > 0 && currentIndex < this.code.length) {
        const char = this.code[currentIndex];
        if (char === '{') braceCount++;
        else if (char === '}') braceCount--;
        currentIndex++;
      }

      const fullCode = this.code.substring(startIndex, currentIndex);
      functions.push({
        name: fnName,
        params,
        startIndex,
        endIndex: currentIndex,
        code: fullCode
      });
    }

    return functions;
  }

  // Quét các sự kiện DataLayer Push để bảo toàn tracking
  extractDataLayerEvents() {
    const events = [];
    const dlRegex = /window\.dataLayer\.push\(\s*\{([^}]+)\}\s*\)/g;
    let match;
    while ((match = dlRegex.exec(this.code)) !== null) {
      events.push(match[0]);
    }
    return events;
  }
}

module.exports = ASTNodeExtractor;
```

---

## 🛡️ 2. CSS SPECIFICITY SCORE CALCULATOR & CASCADE SHIELD

Script tính điểm trọng số Specificity cho CSS Selector để ngăn ngừa hiện tượng đè style hoặc vỡ hệ thống 8pt Grid Spacing khi tách `style.css`.

```javascript
/**
 * Auto 28 - CSS Specificity Calculator & Cascade Order Shield
 * File: .agent/scratch/css_specificity_shield.js
 */

function calculateSpecificity(selector) {
  let a = 0; // ID selectors
  let b = 0; // Class selectors, attributes, pseudo-classes
  let c = 0; // Type selectors, pseudo-elements

  // Đếm IDs (#example)
  const idMatches = selector.match(/#[a-zA-Z0-9_-]+/g);
  if (idMatches) a += idMatches.length;

  // Đếm Classes (.example), Attributes ([type="text"]), Pseudo-classes (:hover)
  const classMatches = selector.match(/\.[a-zA-Z0-9_-]+|\[[^\]]+\]|:[a-zA-Z0-9_-]+/g);
  if (classMatches) b += classMatches.length;

  // Đếm Elements (div, p, button)
  const cleanSelector = selector
    .replace(/#[a-zA-Z0-9_-]+/g, '')
    .replace(/\.[a-zA-Z0-9_-]+/g, '')
    .replace(/\[[^\]]+\]/g, '')
    .replace(/:[a-zA-Z0-9_-]+/g, '');
  
  const elementMatches = cleanSelector.match(/\b[a-zA-Z1-6]+\b/g);
  if (elementMatches) c += elementMatches.length;

  return { score: a * 100 + b * 10 + c, tuple: [a, b, c] };
}

// Kiểm tra bảo toàn Specificity giữa file gốc và file tách
function validateCSSCascade(originalRules, splitRules) {
  for (let i = 0; i < splitRules.length; i++) {
    const orig = calculateSpecificity(originalRules[i].selector);
    const split = calculateSpecificity(splitRules[i].selector);
    if (orig.score !== split.score) {
      console.warn(`⚠️ Warning: Specificity drift detected on selector "${splitRules[i].selector}"`);
    }
  }
}
```

---

## 🧹 3. STATIC CROSS-FILE TREE-SHAKING MATRIX (PHÂN TÍCH CODE CHẾT)

Script quét tham chiếu chéo giữa tất cả các file HTML và JS để liệt kê các hàm/selectors không được sử dụng.

```javascript
/**
 * Auto 28 - Cross-File Static Dependency Analyzer
 * File: .agent/scratch/tree_shaking_analyzer.js
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../../');
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

let combinedHtmlContent = '';
htmlFiles.forEach(file => {
  combinedHtmlContent += fs.readFileSync(path.join(rootDir, file), 'utf8') + '\n';
});

function isFunctionUsedInHtmlOrJs(functionName, jsFilesContent) {
  // Kiểm tra inline onclick, onchange, ... trong HTML
  const htmlRef = new RegExp(`\\b${functionName}\\b`).test(combinedHtmlContent);
  // Kiểm tra gọi hàm trong các file JS khác
  const jsRef = new RegExp(`\\b${functionName}\\b`).test(jsFilesContent);

  return htmlRef || jsRef;
}
```

---

## 🔒 4. DATALAYER & TRACKING INTEGRITY ASSURANCE PROTOCOL

Dưới đây là ma trận kiểm tra bắt buộc bảo toàn DataLayer Event Payload:

| Tên Sự Kiện Tracking | Cấu Trúc DataLayer Bắt Buộc | Tệp HTML Sử Dụng | Hành Vi Bảo Toàn |
| :--- | :--- | :--- | :--- |
| `form_lead_success` | `{ event: 'form_lead_success', form_id: '...', car_model: '...', phone_number: '...' }` | Tất cả 8+ trang Landing Page | GIỮ NGUYÊN 100%, không bị đổi tên thuộc tính |
| `car_modal_open` | `{ event: 'car_modal_open', car_id: '...' }` | `index.html`, `vf*.html` | Trigger ngay sau khi modal hiển thị |
| `cta_click` | `{ event: 'cta_click', cta_type: '...' }` | Tất cả nút CTA đăng ký | Bảo toàn Event Delegation listener |
