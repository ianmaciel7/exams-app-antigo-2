// Renderiza todos os blocos ```mermaid de prototypes/docs/architecture, prototypes/docs/features e prototypes/docs/planning
// num Chromium headless com Mermaid fixado, e salva uma captura por diagrama.
// Uso: node scripts/render-mermaid-check.mjs <pasta-de-capturas>
import { readFileSync, readdirSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(process.argv[2] || join(root, 'mermaid-screenshots'));
mkdirSync(outDir, { recursive: true });
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const MERMAID = 'https://cdn.jsdelivr.net/npm/mermaid@11.4.0/dist/mermaid.min.js';

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.md') ? [p] : [];
  });
}

const blocks = [];
for (const area of ['prototypes/docs/architecture', 'prototypes/docs/features', 'prototypes/docs/planning']) {
  for (const file of walk(join(root, area))) {
    const text = readFileSync(file, 'utf8');
    const re = /```mermaid\n([\s\S]*?)```/g;
    let m, i = 0;
    while ((m = re.exec(text))) blocks.push({ file: relative(root, file), n: ++i, code: m[1] });
  }
}
if (!blocks.length) { console.error('Nenhum bloco Mermaid encontrado.'); process.exit(1); }

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ['--no-sandbox'],
});
const page = await browser.newPage({ deviceScaleFactor: 2, viewport: { width: 1100, height: 800 } });
await page.setContent('<!doctype html><html><body style="background:#fff;font-family:sans-serif"><div id="host"></div></body></html>');
await page.addScriptTag(process.env.MERMAID_FILE ? { path: process.env.MERMAID_FILE } : { url: MERMAID });
await page.evaluate(() => window.mermaid.initialize({ startOnLoad: false, securityLevel: 'strict' }));

const failures = [];
for (const [idx, b] of blocks.entries()) {
  const name = `${b.file.replace(/[\\/]/g, '__').replace(/\.md$/, '')}-${b.n}`;
  try {
    const svg = await page.evaluate(async (code) => {
      const { svg } = await window.mermaid.render('d' + Math.random().toString(36).slice(2), code);
      document.getElementById('host').innerHTML = svg;
      return svg.length;
    }, b.code);
    if (!svg) throw new Error('SVG vazio');
    await page.locator('#host svg').first().screenshot({ path: join(outDir, name + '.png') });
    console.log(`OK  ${b.file} #${b.n}`);
  } catch (e) {
    failures.push(`${b.file} #${b.n}: ${e.message.split('\n')[0]}`);
    console.log(`ERR ${b.file} #${b.n}: ${e.message.split('\n')[0]}`);
  }
}
await browser.close();
writeFileSync(join(outDir, 'resultado.txt'), failures.length ? failures.join('\n') : 'todos os diagramas renderizados');
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`${blocks.length} diagramas renderizados. Capturas em ${outDir}`);
