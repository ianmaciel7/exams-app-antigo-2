import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const html=readFileSync(new URL('../prototypes/exam-app-0.1.1/index.html',import.meta.url),'utf8');
const start=html.indexOf('const histAll=()=>'),end=html.indexOf('function histMeta(',start);
assert.ok(start>=0&&end>start,'real immutable attempt-history ledger is present');
const code=html.slice(start,end)+'\n({errorLedger,errorReviewSummary,errorNotebookMarkup,qResetForRetry})';
const day=86400000,base=Date.UTC(2026,10,9,10,0,0),id='q1';
const record=(at,ok,a=ok?'B':'A',qid=id)=>({q:qid,t:at,ok,a,src:'Prática'});
function harness(log=[]){
 const values=new Map([['hist',log]]),answers={1:{selected:'A',correct:false,deleted:false,version:1}},
   pending={q1:'A'},writes=[];
 const env={store:{get:k=>values.get(k),set:(k,v)=>{values.set(k,v);writes.push([k,v]);}},
   qPend:pending,uqAns:()=>({}),saveUqAns:()=>{},getAnswers:()=>answers,
   saveAnswers:a=>{values.set('answers',a);writes.push(['answers',a]);},
   esc:t=>String(t).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;'),
   qTitle:q=>'Questão '+q.id,Date,Number,Math,Array,Set,Map,String
 };
 return {api:runInNewContext(code,env),values,answers,pending,writes};
}
test('a mistaken answer remains pending until a later confirmed correct attempt',()=>{
 const initial=harness([record(base,false)]).api.errorLedger(id);
 assert.equal(initial.open,true);assert.equal(initial.recovered,false);
 assert.equal(initial.intervalDays,1);assert.equal(initial.dueAt,base+day);
 const wrongAgain=harness([record(base,false),record(base+5000,false)]).api.errorLedger(id);
 assert.equal(wrongAgain.open,true);assert.equal(wrongAgain.errors,2);
 assert.equal(wrongAgain.dueAt,base+5000+day);
 const recovered=harness([record(base,false),record(base+5000,false),record(base+6000,true)]).api.errorLedger(id);
 assert.equal(recovered.open,false);assert.equal(recovered.recovered,true);
 assert.equal(recovered.correctReviews,1);assert.equal(recovered.intervalDays,3);
 assert.equal(recovered.dueAt,base+6000+3*day);
});
test('SRS steps 1/3/7/21 days are deterministic and regress to day 1 on a new error',()=>{
 const attempts=[record(base,false),record(base+day,true),record(base+4*day,true),record(base+11*day,true)];
 const h=harness(attempts),done=h.api.errorLedger(id);
 assert.equal(done.intervalDays,21);assert.equal(done.stage,3);
 assert.equal(done.dueAt,base+32*day);
 const reopened=harness(attempts.concat(record(base+15*day,false))).api.errorLedger(id);
 assert.equal(reopened.recovered,false);assert.equal(reopened.open,true);
 assert.equal(reopened.stage,0);assert.equal(reopened.dueAt,base+16*day);
});
test('unanswered, malformed, unrelated and never-wrong correct logs do not enter error recovery',()=>{
 const h=harness([record(base,true),record(base+1,false,'',id),record(base+2,false,'A','other'),
   {q:id,t:base+3,a:'A',ok:null}]);
 const state=h.api.errorLedger(id);
 assert.equal(state.everWrong,false);assert.equal(state.open,false);
 assert.equal(state.dueAt,0);assert.equal(state.attempts,1);
});
test('viewing solutions or clearing an answer does not mutate history or declare recovery',()=>{
 const h=harness([record(base,false)]);
 const before=JSON.stringify(h.values.get('hist'));
 h.api.errorNotebookMarkup([{id:'q1',n:1,materia:'Direito',assunto:'Princípios'}],base+day);
 assert.equal(h.api.errorLedger(id).open,true);
 h.api.qResetForRetry({id,n:1,user:false});
 assert.equal(JSON.stringify(h.values.get('hist')),before,'clearing a current selection does not write history');
 assert.equal(h.api.errorLedger(id).open,true,'reset does not heal a past error');
 assert.equal(h.values.get('answers')[1].deleted,true);
 assert.equal(h.pending.q1,undefined);
 assert.equal(h.writes.filter(([k])=>k==='hist').length,0);
});
test('pending, recovered, due and scheduled counts are distinct and based on actual timestamps',()=>{
 const data=[record(base,false,'A','q1'),record(base,false,'A','q2'),
   record(base+100,true,'B','q2'),record(base+200,true,'B','q3')];
 const h=harness(data),qs=[{id:'q1'},{id:'q2'},{id:'q3'}];
 const result=h.api.errorReviewSummary(qs,base+day+1);
 assert.equal(result.pending.length,1);
 assert.equal(result.recovered.length,1);
 assert.equal(result.due.length,1);
 assert.equal(result.scheduled.length,1);
 assert.equal(result.total,3);
});
test('error notebook is grouped by actual week and discipline, and escapes arbitrary titles',()=>{
 const h=harness([record(base,false)]),markup=h.api.errorNotebookMarkup([
   {id:'q1',n:1,materia:'Engenharia & Software',assunto:'<img src=x>'}],base+day+1);
 assert.match(markup,/Semana de/);assert.match(markup,/Engenharia &amp; Software/);
 assert.match(markup,/&lt;img src=x&gt;/);
 assert.match(markup,/Revisar agora/);assert.match(markup,/#\/questao\/q1/);
 assert.doesNotMatch(markup,/<img/);
});
test('question filters and practice route preserve unresolved ledger status after reset',()=>{
 assert.match(html,/state=errorLedger\(q\.id\)/);
 assert.match(html,/if\(state\.open&&!a\.includes\('erradas'\)\)a\.push\('erradas'\)/);
 assert.match(html,/data-q-retry/);
 assert.match(html,/errorOnly=path\.split\('\?'\)\[0\]==='\/questoes\/erradas'/);
 assert.match(html,/errorNotebookMarkup\(all\)/);
 assert.match(html,/errorLedger\(q\.id\)\.open/);
});
