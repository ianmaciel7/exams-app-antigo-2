import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const html=readFileSync(new URL('../prototypes/exam-app-0.1.1/index.html',import.meta.url),'utf8');
const section=(from,to)=>{const i=html.indexOf(from),j=html.indexOf(to,i+from.length);assert.ok(i>=0&&j>i);return html.slice(i,j);};
const page=section('function questaoPage(q){','function ');
const handlers=section("view.addEventListener('keydown',e=>{","const rr0=");
test('single-question route renders a disabled Respond button before selection',()=>{
  assert.match(page,/data-qo-submit/);
  assert.match(page,/!selected\?' disabled':''/);
  assert.match(page,/aria-pressed/);
  assert.match(page,/class="sc-alt'/);
});
test('choice click only sets a pending answer and changes visual selection',()=>{
  assert.match(html,/qPend\[id\]=l; const card=qa\.closest\('\.qo'\)/);
  assert.match(html,/b\.classList\.toggle\('picked',picked\)/);
  assert.match(html,/submit\.disabled=false/);
  assert.match(html,/data-qo-submit/);
  assert.match(html,/qCorrect\(q\.id,qPend\[q\.id\],'single'\)/);
  assert.doesNotMatch(html, /const qa=e\.target\.closest\('\[data-qo-ans\]'\); if\(qa\)\{[\s\S]{0,180}saveAnswers\(/);
});
test('Enter can confirm and practice defaults to explicit confirmation',()=>{
  assert.match(html,/qAuto=store\.get\('qAuto'\)===true/);
  assert.match(html,/if\(e\.key==='Enter'&&e\.target\.matches\('\.qo-alts \[data-qo-ans\]'\)\)/);
  assert.match(html,/question\.confirm/);
  assert.match(html,/data-qo-submit\]:not\(:disabled\)/);
});
test('reset clears pending state and correct answer only appears after grading',()=>{
  assert.match(html,/if\(qr\)\{ const q=qObjs\(\)\.find\(x=>x\.id===qr\.dataset\.qoReset\); if\(q\)\{ delete qPend\[q\.id\];/);
  assert.match(page,/r\?'<p class="s-note">/);
});
