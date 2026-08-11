const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../guide-ev.html');
let content = fs.readFileSync(filePath, 'utf8');

// Regex xóa nguyên khối SECTION 3: INLINE HIGH-CONVERSION LEAD CAPTURE FORM
const sectionRegex = /<!-- 📝 SECTION 3: INLINE HIGH-CONVERSION LEAD CAPTURE FORM -->[\s\S]*?<\/section>/;

if (sectionRegex.test(content)) {
    content = content.replace(sectionRegex, '');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Successfully deleted Section 3 Lead Form from guide-ev.html!');
} else {
    console.log('⚠️ Section 3 not found in guide-ev.html');
}
