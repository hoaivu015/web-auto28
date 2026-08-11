/**
 * Auto 28 - Batch HTML Script Injector
 * Inject 7 modular scripts into all landing page HTML files
 */
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '../../');
const htmlFiles = fs.readdirSync(projectRoot).filter(file => file.endsWith('.html'));

const modulesToInject = [
  'js/modules/utils.js',
  'js/modules/nav.js',
  'js/modules/hero.js',
  'js/modules/catalog.js',
  'js/modules/modal.js',
  'js/modules/form-handler.js',
  'js/modules/ui-observers.js'
];

const scriptTags = modulesToInject.map(m => `  <script src="${m}" defer></script>`).join('\n');

let updatedCount = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(projectRoot, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if main.js is referenced
  if (content.includes('src="main.js"') || content.includes('src="./main.js"')) {
    // Check if utils.js isn't already injected
    if (!content.includes('js/modules/utils.js')) {
      if (content.includes('<script src="main.js"')) {
        content = content.replace('<script src="main.js"', `${scriptTags}\n  <script src="main.js"`);
      } else if (content.includes('<script src="./main.js"')) {
        content = content.replace('<script src="./main.js"', `${scriptTags}\n  <script src="./main.js"`);
      }
      fs.writeFileSync(filePath, content, 'utf8');
      updatedCount++;
      console.log(`✅ Injected 7 modules into ${file}`);
    }
  }
});

console.log(`🎉 Batch Injection complete! Updated ${updatedCount} HTML files.`);
