import assert from 'node:assert/strict';
import path from 'node:path';
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium} from 'playwright';

const root=path.resolve('prototypes/board-exam-app'),assets=path.join(root,'assets');
await mkdir(assets,{recursive:true});
const report={at:new Date().toISOString(),checks:[],errors:[],limits:[
 '390/1366px Chromium emulation, not full screen-reader or touch hardware validation.',
 'Rich note HTML only supports p/div/br/strong/em/u/mark/ul/ol/li; scripts and arbitrary styles are stripped.'
]};
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const base='http://127.0.0.1:8765/exam-app-0.1.1/index.html';
try {
  for(const width of [390,1366]){
    const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
    const page=await ctx.newPage();page.on('pageerror',e=>report.errors.push(e.message));
    try {
      await page.goto(base+'#/questoes',{waitUntil:'domcontentloaded'});
      const link=page.locator('a[href^="#/questao/"]').first();await link.waitFor({timeout:30000});
      const href=await link.getAttribute('href'),id=decodeURIComponent(href.split('/').pop());
      await page.goto(base+href,{waitUntil:'domcontentloaded'});
      const ped=page.locator('.qo .qped');await ped.waitFor({timeout:20000});
      await ped.locator('[data-qped-tab$="|anotacoes"]').click();
      const rich=ped.locator('[data-qnote-rich]'),toggle=ped.locator('[data-qped-visual-toggle]');
      assert.equal(await rich.isHidden(),true,'existing Markdown mode preserved by default');
      await toggle.click();
      assert.equal(await rich.isVisible(),true,'visual editor is actually editable');
      assert.equal(await toggle.getAttribute('aria-pressed'),'true');
      const note='Prazo de recurso visual '+width;
      await rich.fill(note);
      await rich.evaluate(el=>{
        const t=el.firstChild,range=document.createRange(),sel=window.getSelection();
        range.setStart(t,0);range.setEnd(t,5);sel.removeAllRanges();sel.addRange(range);
      });
      await ped.locator('[data-qped-format="bold"]').click();
      assert.ok(await rich.locator('strong').count()>=1,'real strong markup surrounds selected phrase');
      const sanitized=await page.evaluate(()=>window.qPedSafeHtml(
        '<p><img src="x" onerror="alert(1)"><strong style="color:red" onclick="alert(2)">Legal</strong><script>alert(3)</script></p>'));
      assert.ok(sanitized.includes('<strong>Legal</strong>'));
      assert.ok(!sanitized.includes('<img')&&!sanitized.includes('onclick')&&!sanitized.includes('<script'));
      await ped.locator('[data-qped-save]').click();
      await page.screenshot({path:path.join(assets,'issue72_rich_editor_'+width+'.png'),animations:'disabled'});
      await page.goto(base+'#/nota/'+encodeURIComponent(id),{waitUntil:'domcontentloaded'});
      const notePage=page.locator('#view .op');await notePage.waitFor({timeout:20000});
      assert.match(await notePage.innerText(),new RegExp('Prazo de recurso visual '+width));
      assert.equal(await notePage.locator('strong').count()>0,true,'rich formatting survives in the graph note page');
      assert.ok(await notePage.locator('a[href="'+href+'"]').count()>0,'note links to real parent question');
      await page.screenshot({path:path.join(assets,'issue72_linked_note_'+width+'.png'),animations:'disabled'});
      await page.locator('[data-note-edit]').click();
      const restored=page.locator('.qo .qped');await restored.waitFor();
      await restored.locator('[data-qped-tab$="|anotacoes"]').click();
      await restored.locator('[data-qped-visual-toggle]').click();
      assert.ok(await restored.locator('[data-qnote-rich] strong').count()>0,'rich note restored after navigating from graph node');

      await page.goto(base+'#/grafico',{waitUntil:'domcontentloaded'});
      const graphSearch=page.locator('#gvq');await graphSearch.waitFor({timeout:30000});
      await page.waitForFunction(()=>!document.querySelector('.gv-info')?.textContent?.includes('carregando'),null,{timeout:30000});
      await graphSearch.fill(note);
      assert.match(await page.locator('#gvMatchCount').innerText(),/objeto encontrado/,'global graph indexes persisted note text');
      report.checks.push({width,note:id,steps:'sanitized visual editing, bold, persistence, linked note route and graph search'});
    }finally{await ctx.close();}
  }
  assert.deepEqual(report.errors,[],'no browser runtime errors');
} finally {
  await browser.close();
  await writeFile(path.join(root,'issue72_rich_notes_graph_e2e.json'),JSON.stringify(report,null,2)+'\n');
}
