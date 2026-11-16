import assert from 'node:assert/strict';
import path from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const root = path.resolve('prototypes/board-exam-app');
const assets = path.join(root, 'assets');
await mkdir(assets, { recursive: true });
const report = { at: new Date().toISOString(), issue: 57, cases: [], errors: [], limitations: [
  'Headless Chromium responsive emulation; full Capacities comparison and assistive-technology audit remain pending.'
] };
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const url = 'http://127.0.0.1:8765/exam-app-0.1.1/index.html';
try {
  for (const width of [390, 1366]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    page.on('pageerror', error => report.errors.push(error.message));
    try {
      for (const route of ['#/concurso/dataprev', '#/edicao/dataprev-2026', '#/cargo/dataprev-2026-ti-dev']) {
        await page.goto(url + route, { waitUntil: 'domcontentloaded' });
        const side = page.locator('#view .op-side');
        await side.waitFor({ timeout: 15000 });
        const list = side.locator('dl.op-props-inline');
        assert.equal(await list.count(), 1, 'object properties are inline: ' + route);
        assert.equal(await side.locator('.props-card').count(), 0, 'no boxed collapsible card: ' + route);
        assert.equal(await side.getAttribute('aria-label'), 'Propriedades do objeto');
        const rows = await list.locator('.op-prop').count();
        assert.ok(rows >= 2, 'existing metadata rows still visible: ' + route);
        const css = await list.evaluate(el => {
          const s = getComputedStyle(el);
          return { border: s.borderTopWidth, background: s.backgroundColor };
        });
        assert.equal(css.border, '0px', 'no top border on inline properties');
        assert.match(css.background, /rgba?\(0, 0, 0, 0\)|transparent/);
        report.cases.push({ width, route, rows, css });
      }
      await page.goto(url + '#/concurso/dataprev', { waitUntil: 'domcontentloaded' });
      const side = page.locator('#view .op-side');
      const edit = side.locator('[data-edit-prop]').first();
      await edit.waitFor({ timeout: 15000 });
      await edit.click();
      const field = side.locator('input.op-in').first();
      await field.waitFor({ timeout: 8000 });
      const newValue = 'Situação validada ' + width;
      await field.fill(newValue);
      await field.press('Enter');
      await page.waitForFunction(value => document.querySelector('#view .op-side')?.textContent?.includes(value), newValue);
      await page.screenshot({ path: path.join(assets, 'issue57_inline_properties_' + width + '.png'), animations: 'disabled' });
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.locator('#view .op-side').waitFor({ timeout: 15000 });
      assert.ok((await page.locator('#view .op-side').innerText()).includes(newValue),
        'existing inline editor persists changes after reload');
      report.cases.push({ width, interaction: 'editable property persisted after reload' });
    } finally { await ctx.close(); }
  }
  assert.deepEqual(report.errors, [], 'no page JavaScript exceptions');
} finally {
  await browser.close();
  await writeFile(path.join(root, 'issue57_inline_properties_e2e.json'), JSON.stringify(report, null, 2) + '\n');
}
