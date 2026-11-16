import assert from 'node:assert/strict';
import path from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const assets=path.resolve('prototypes/board-exam-app/assets');
await mkdir(assets,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const report={date:new Date().toISOString(),cases:[],errors:[],limitations:[
  'Chromium desktop/mobile emulation; screen reader, actual touch devices and reduced-motion animation transitions not independently certified.',
  'This covers search auto-fit only, not all of issue #68.'
]};
try{
  for(const width of [390,1366]){
    const context=await browser.newContext({viewport:{width,height:820},reducedMotion:'reduce'});
    const page=await context.newPage();
    page.on('pageerror',e=>report.errors.push(e.message));
    try{
      await page.goto('http://127.0.0.1:8765/exam-app-0.1.1/index.html#/grafico',{waitUntil:'domcontentloaded'});
      await page.waitForFunction(()=>typeof GV!=='undefined'&&GV&&GV.nodes.length>1&&
        !document.querySelector('.gv-info')?.textContent?.includes('carregando'),{timeout:30000});
      const candidate=await page.evaluate(()=>{
        const titles=GV.nodes.filter(n=>n.on&&n.n.title.length>=8).map(n=>n.n.title);
        return titles.find(t=>titles.filter(a=>a.includes(t)).length===1)||titles[0];
      });
      assert.ok(candidate,'a searchable visible object exists');
      await page.locator('#gvq').fill(candidate);
      await page.waitForFunction(()=>!!document.getElementById('gvMatchCount')?.textContent);
      let found=await page.evaluate(()=>({
        count:GV.match?.size||0,
        label:document.getElementById('gvMatchCount')?.textContent||'',
        matches:[...(GV.match||[])].map(i=>({x:GV.nodes[i].x*GV.k+GV.tx,y:GV.nodes[i].y*GV.k+GV.ty})),
        viewport:{width:GV.W,height:GV.H}
      }));
      assert.ok(found.count>=1,'search matched at least one node');
      assert.match(found.label,/objeto(s)? encontrado(s)?/);
      for(const p of found.matches){
        assert.ok(p.x>=0&&p.x<=found.viewport.width,'matched node is visible horizontally');
        assert.ok(p.y>=0&&p.y<=found.viewport.height,'matched node is visible vertically');
      }
      await page.screenshot({path:path.join(assets,'issue68_search_autofit_'+width+'.png'),animations:'disabled'});
      await page.locator('#gvq').fill('unfindable-graph-object-unique-2026');
      assert.equal(await page.locator('#gvMatchCount').textContent(),'Nenhum objeto encontrado');
      await page.locator('#gvq').press('Escape');
      assert.equal(await page.locator('#gvq').inputValue(),'');
      assert.equal(await page.locator('#gvMatchCount').textContent(),'');
      assert.equal(await page.evaluate(()=>GV.match),null);
      const kind=page.locator('.gv-leg [data-gk]').first();
      assert.ok(await kind.count(),'type filter exists');
      const on=await kind.getAttribute('aria-pressed');
      await kind.click();
      assert.notEqual(await kind.getAttribute('aria-pressed'),on);
      report.cases.push({viewportWidth:width,query:candidate,count:found.count,assertions:[
        'matching nodes fitted into viewport','accessible match count','zero state','Escape reset','type filter'
      ],screenshot:'issue68_search_autofit_'+width+'.png'});
    }finally{await context.close();}
  }
  assert.deepEqual(report.errors,[],'No uncaught browser errors');
}finally{
  await browser.close();
  await writeFile('prototypes/board-exam-app/issue68_search_autofit_e2e.json',JSON.stringify(report,null,2)+'\n');
}
