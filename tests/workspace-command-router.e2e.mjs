import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const evidenceDir=path.resolve('prototypes/board-exam-app/assets');
await mkdir(evidenceDir,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const report={date:new Date().toISOString(),cases:[],pageErrors:[],limitations:[
  'Chromium desktop automation: OS-reserved shortcuts and physical keyboard IME require manual testing.',
  'Covers global search, sidebar, new-item menu, shortcut help, synthetic question answer routing, graph local key ownership, editor suppression, and non-interception of Ctrl+Tab. Real IME and OS-level key reservation still require manual platform testing.'
]};
const addr=port=>'http://127.0.0.1:'+port+'/exam-app-0.1.1/index.html#/espaco';
async function snap(page,filename){
  await page.screenshot({path:path.join(evidenceDir,'issue139_'+filename+'.png'),animations:'disabled',fullPage:false});
}
async function openAt(port){
  const ctx=await browser.newContext({viewport:{width:1366,height:850},reducedMotion:'reduce'});
  const page=await ctx.newPage();
  page.on('pageerror',err=>report.pageErrors.push(err.message));
  await page.goto(addr(port),{waitUntil:'domcontentloaded'});
  await page.locator('#sideNewBtn').waitFor({timeout:25000});
  return {ctx,page};
}

try{
  const baseline=await openAt(8766);
  try{
    await baseline.page.locator('#btnFootShortcuts').click();
    await baseline.page.locator('#dlg.on').waitFor();
    const text=(await baseline.page.locator('#dlg .keys').innerText()).trim();
    assert.ok(text.includes('Ctrl B')&&text.includes('Ctrl K'));
    await snap(baseline.page,'before_help');
    report.cases.push({phase:'before',interaction:'static-help',containsStaticLabels:true,screenshot:'issue139_before_help.png'});
  }finally{await baseline.ctx.close();}

  const {ctx,page}=await openAt(8765);
  try{
    await page.locator('#btnFootShortcuts').click();
    await page.locator('#dlg.on').waitFor();
    const html=await page.locator('#dlg .keys').innerText();
    assert.ok(html.includes('Buscar documentos'),'dynamic command catalog visible');
    assert.ok(html.includes('Ctrl + K'),'platform-specific modifier visible');
    assert.ok(html.includes('Criar novo objeto'),'registered commands included');
    await snap(page,'after_help');
    let collapsedBefore=await page.locator('#app').evaluate(x=>x.classList.contains('collapsed'));
    await page.keyboard.press('Control+b');
    let collapsedAfter=await page.locator('#app').evaluate(x=>x.classList.contains('collapsed'));
    assert.equal(collapsedAfter,collapsedBefore,'modal must suppress global Ctrl+B');
    await page.locator('#dlg [data-x="1"]').click();

    await page.locator('body').click({position:{x:1200,y:700}});
    await page.keyboard.press('Control+k');
    await page.locator('#pal.on').waitFor();
    await page.locator('#palIn').waitFor();
    assert.equal(await page.locator('#palIn').evaluate(x=>document.activeElement===x),true);
    await snap(page,'after_search');
    collapsedBefore=await page.locator('#app').evaluate(x=>x.classList.contains('collapsed'));
    await page.keyboard.press('Control+b');
    collapsedAfter=await page.locator('#app').evaluate(x=>x.classList.contains('collapsed'));
    assert.equal(collapsedBefore,collapsedAfter,'typing search must not toggle sidebar');
    await page.locator('#palIn').press('Escape');
    await page.locator('#pal:not(.on)').waitFor({state:'hidden'});
    report.cases.push({phase:'after',interaction:'search-and-modal',searchFocus:true,modalSuppression:true,screenshot:'issue139_after_search.png'});

    await page.locator('body').click({position:{x:1200,y:700}});
    collapsedBefore=await page.locator('#app').evaluate(x=>x.classList.contains('collapsed'));
    await page.keyboard.press('Control+b');
    collapsedAfter=await page.locator('#app').evaluate(x=>x.classList.contains('collapsed'));
    assert.notEqual(collapsedAfter,collapsedBefore,'global Ctrl+B toggles once');
    await page.keyboard.press('Control+b');
    assert.equal(await page.locator('#app').evaluate(x=>x.classList.contains('collapsed')),collapsedBefore,'second Ctrl+B restores sidebar');

    await page.keyboard.press('Control+Alt+n');
    await page.locator('#newMenu.open').waitFor();
    await page.locator('#newMenuIn').fill('quest');
    const count=await page.locator('#newMenuList .nm-item').count();
    assert.ok(count>0,'new-object menu remains usable');
    await snap(page,'after_new_item');
    collapsedBefore=await page.locator('#app').evaluate(x=>x.classList.contains('collapsed'));
    await page.keyboard.press('Control+b');
    assert.equal(await page.locator('#app').evaluate(x=>x.classList.contains('collapsed')),collapsedBefore,'new-item input must not dispatch global Ctrl+B');
    await page.locator('#newMenuIn').press('Escape');
    await page.locator('#newMenu:not(.open)').waitFor({state:'hidden'});
    report.cases.push({phase:'after',interaction:'global-chords',sidebarToggledTwice:true,newItemOptions:count,screenshot:'issue139_after_new_item.png'});


    const contextFixture=await page.evaluate(()=>{
      const q=document.createElement('section');
      q.className='s-question';
      q.innerHTML='<button type="button" data-qo-ans="router-fixture|A">A</button><input id="router-editor" aria-label="Resposta em edição">';
      const answer=q.querySelector('button');
      answer.addEventListener('click',()=>answer.dataset.activated='true');
      document.body.append(q);
      const graph=document.createElement('div');
      graph.id='gvc';graph.style.cssText='display:block;position:fixed;left:4px;top:4px;width:120px;height:80px;z-index:2147483647;background:white';
      graph.setAttribute('aria-label','Grafo de teste');
      const graphTarget=document.createElement('button');
      graphTarget.id='issue139-graph';graphTarget.textContent='Graph test';graph.append(graphTarget);
      graph.dataset.localKeys='0';
      graph.addEventListener('keydown',ev=>{if(ev.key==='+')graph.dataset.localKeys=String(Number(graph.dataset.localKeys)+1)});
      document.body.append(graph);
      return true;
    });
    assert.equal(contextFixture,true);
    await page.locator('#router-editor').focus();
    await page.keyboard.press('a');
    assert.equal(await page.locator('[data-qo-ans]').getAttribute('data-activated'),null,
      'editing text must not select the question answer');
    await page.locator('#router-editor').blur();
    await page.keyboard.press('a');
    assert.equal(await page.locator('[data-qo-ans]').getAttribute('data-activated'),'true',
      'available question answer command routes to its contextual target');
    await page.locator('#issue139-graph').focus();
    await page.keyboard.press('Control+b');
    assert.equal(await page.locator('#app').evaluate(x=>x.classList.contains('collapsed')),collapsedBefore,
      'graph retains ownership of key events without dispatching global sidebar command');
    await page.keyboard.press('+');
    assert.equal(await page.locator('#gvc').last().getAttribute('data-local-keys'),'1',
      'graph-local keyboard handler receives its chord');
    const reservedDefaultPrevented=await page.locator('body').evaluate(el=>{
      const ev=new KeyboardEvent('keydown',{key:'Tab',ctrlKey:true,bubbles:true,cancelable:true});
      el.dispatchEvent(ev);return ev.defaultPrevented;
    });
    assert.equal(reservedDefaultPrevented,false,'router leaves browser-reserved Ctrl+Tab untouched');
    await snap(page,'after_contexts');
    report.cases.push({phase:'after',interaction:'question-graph-editor-reserved-chord',
      questionAnswerActivated:true,editorSuppressedQuestionCommand:true,graphLocalKeyOwned:true,
      graphSuppressedGlobalSidebar:true,reservedCtrlTabPrevented:false,screenshot:'issue139_after_contexts.png'});

    assert.deepEqual(report.pageErrors,[],'no uncaught browser JavaScript errors');
    console.log('Workspace commands: dynamic help, Ctrl+K, Ctrl+B, Ctrl+Alt+N, editable/modal exclusion PASS');
  }finally{await ctx.close();}
}finally{
  await browser.close();
  await writeFile('prototypes/board-exam-app/issue139_commands_e2e.json',JSON.stringify(report,null,2)+'\n');
}
