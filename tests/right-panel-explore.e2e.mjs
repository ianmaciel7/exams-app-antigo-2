import assert from 'node:assert/strict';
import path from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const root=path.resolve('prototypes/board-exam-app');
const assets=path.join(root,'assets');
await mkdir(assets,{recursive:true});
const report={at:new Date().toISOString(),checks:[],errors:[],limitations:[
  'Headless desktop Chromium only; real screen-reader and touch-device interaction remain to be verified.',
  'Screenshots are uploaded as CI artifacts; full Capacities parity, local graph physics, and panel resize are separate issues.'
]};
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:1366,height:850},reducedMotion:'reduce'});
const page=await context.newPage();
page.on('pageerror',e=>report.errors.push(e.message));
const base='http://127.0.0.1:8765/exam-app-0.1.1/index.html';
const snap=async name=>page.screenshot({path:path.join(assets,name),animations:'disabled'});
try{
  await page.goto(base+'#/espaco',{waitUntil:'domcontentloaded'});
  await page.locator('#rpToggle').waitFor();
  if(await page.locator('#rpanel').isHidden()) await page.locator('#rpToggle').click();
  await page.locator('#rpBody .rp-launch-grid').waitFor({timeout:15000});
  assert.equal(await page.locator('#rpBody .rp-launch-btn').count(),6,'six real tools');
  await snap('issue54_explore_chromium.png');
  report.checks.push('six contextual tools visibly rendered');

  await page.locator('#rpBody [data-rp-focus-search]').click();
  await page.locator('#rpBody [data-ex-q]').waitFor();
  assert.equal(await page.locator('#rpBody [data-ex-q]').evaluate(el=>document.activeElement===el),true,'search receives focus');
  await page.locator('#rpBody [data-ex-q]').fill('dataprev');
  assert.equal(await page.locator('#rpBody [data-rp-find]').evaluate(el=>el.open),true,'search disclosure remains open');
  report.checks.push('search disclosure and focus');

  await page.locator('#rpBody [data-rp-new="internos"]').click();
  assert.ok((await page.locator('#rpTabs [data-rp-tab].on').innerText()).includes('Objetos internos'),'real internal tool activates');
  await snap('issue54_internos_chromium.png');
  report.checks.push('internal objects activates with panel tab');

  await page.goto(base+'#/concurso/dataprev',{waitUntil:'domcontentloaded'});
  await page.locator('#rpBody').waitFor();
  assert.ok((await page.locator('#rpTabs [data-rp-tab].on').innerText()).includes('Objetos internos'),'context navigation keeps tool');
  await page.locator('#rpTabs [data-rp-tab]').filter({hasText:'Explorar'}).click();
  assert.ok((await page.locator('#rpBody .rp-relevant')).count()>0,'relevant content section');
  await snap('issue54_relevant_chromium.png');
  report.checks.push('contextual relevant section after navigating entity');
  assert.deepEqual(report.errors,[],'no uncaught page JavaScript errors');
}finally{
  await browser.close();
  await writeFile(path.join(root,'issue54_explore_e2e.json'),JSON.stringify(report,null,2)+'\n');
}
