/*
 * Собирает index.html из исходников.
 *
 * script.js  ->  <script role="script">   внутри tw-storydata
 * style.css  ->  <style role="stylesheet"> внутри tw-storydata
 *
 * Запуск:  node build.js
 *
 * Это ровно те же блоки, которые Twine кладёт в «Историю → JavaScript»
 * и «Историю → Таблица стилей», поэтому после правки script.js или style.css
 * достаточно прогнать сборку — index.html обновится сам.
 */
const fs = require('fs');
const path = require('path');

const root = __dirname;
const htmlPath = path.join(root, 'index.html');

let html = fs.readFileSync(htmlPath, 'utf8');
const js = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');

// Закрывающий тег внутри строки оборвал бы блок раньше времени.
for (const [name, src, tag] of [['script.js', js, '</script'], ['style.css', css, '</style']]) {
  if (src.toLowerCase().includes(tag)) {
    console.error(`ОШИБКА: ${name} содержит "${tag}>" — index.html собрать нельзя.`);
    process.exit(1);
  }
}

function replaceBlock(source, re, label, body) {
  let hits = 0;
  const out = source.replace(re, (_m, open, _old, close) => { hits++; return open + body + close; });
  if (hits !== 1) {
    console.error(`ОШИБКА: блок ${label} найден ${hits} раз(а), ожидался ровно один.`);
    process.exit(1);
  }
  return out;
}

html = replaceBlock(html, /(<script role="script"[^>]*>)([\s\S]*?)(<\/script>)/, 'role="script"', js);
html = replaceBlock(html, /(<style role="stylesheet"[^>]*>)([\s\S]*?)(<\/style>)/, 'role="stylesheet"', css);

fs.writeFileSync(htmlPath, html);
console.log(`index.html собран: script.js ${js.length} симв., style.css ${css.length} симв.`);
