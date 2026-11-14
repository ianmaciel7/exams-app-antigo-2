import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const html=readFileSync(new URL('../prototypes/exam-app-0.1.1/index.html',import.meta.url),'utf8');
const from=html.indexOf('function opEspacoPage(sp,mine){');
const until=html.indexOf('/* ---- Histórico de respostas, tentativas (Simulado) e Desempenho ---- */',from);
assert.ok(from>=0&&until>from,'home implementation exists');
const source=html.slice(from,until);
function run({questions=[],docs=[],history=[]}={}){
  const state=new Map();const calls=[],sims=[];
  const env={
    space:'dataprev',questionBank:{questoes:[]},loadQuestions:()=>Promise.resolve(),showObjs:()=>{},location:{hash:'#/espaco'},view:{addEventListener(){}},
    store:{get:k=>state.get(k),set:(k,v)=>state.set(k,v)},docsOf:()=>docs,
    qObjs:()=>questions,qSel:q=>q.selected||null,histAll:()=>history,
    edicoesOf:()=>[],cargosOf:()=>[],CONCURSOS:[{sp:'dataprev',id:'dataprev',t:'Concurso de TI'}],
    isT:()=>false,examDateISO:()=>null,daysTo:()=>null,
    wOf:q=>q.materia==='Conhecimentos Específicos'?2.5:1,
    UIICON:{book:'<svg></svg>',timer:'<svg></svg>',filePlus:'<svg></svg>'},
    esc:x=>String(x??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;'),
    Date,Math,Set,Map
  };
  const {opEspacoPage}=runInNewContext(source+'\n({opEspacoPage})',env);
  return {markup:opEspacoPage({name:'Espaço de Teste'},[]),state,calls,sims};
}
test('editorial shell contains accessible 4-tab outline and no decorative emoji',()=>{
  const {markup}=run();
  for(const label of ['VISÃO GERAL DO ESPAÇO','HOJE · PRÓXIMA AÇÃO','REVISÃO DE HOJE','SEU RITMO HOJE',
    'Disciplinas & Assuntos','Caderno de Questões','Raio-X da Banca','Caderno de Erros','Objetos recentes'])
    assert.ok(markup.includes(label),label);
  assert.equal((markup.match(/role="tab" id="eh-tab-/g)||[]).length,4);
  assert.equal((markup.match(/role="tabpanel" id="eh-panel-/g)||[]).length,4);
  assert.doesNotMatch(markup,/1\.248|84%|12 dias|🎯|📅|🎉|🔥|📖/);
  assert.match(markup,/Nenhum|nenhum|Sem perguntas|Sem questões/);
});
test('metrics come only from actual question and history records',()=>{
  const questions=[
    {id:'q1',n:1,conc:'dataprev',materia:'Engenharia',assunto:'API',gabarito:'A',selected:'A'},
    {id:'q2',n:2,conc:'dataprev',materia:'Engenharia',assunto:'API',gabarito:'B',selected:'A'}
  ];
  const now=Date.now(),history=[
    {q:'q1',conc:'dataprev',m:'Engenharia',ok:true,t:now,a:'A'},
    {q:'q2',conc:'dataprev',m:'Engenharia',ok:false,t:now,a:'A'}
  ];
  const {markup}=run({questions,history});
  assert.match(markup,/>2<\/strong><span>Questões<\/span>/);
  assert.match(markup,/>1<\/strong><span>Para revisar<\/span>/);
  assert.match(markup,/50% de acerto/);
  assert.match(markup,/Questão 1/);
  assert.match(markup,/Questão 2/);
  assert.match(markup,/Recomendado/);
});
test('zero initial history is represented without false computed exam scores',()=>{
  const {markup}=run({questions:[],history:[]});
  assert.match(markup,/Sem respostas hoje/);
  assert.match(markup,/Sem questões cadastradas/);
  assert.match(markup,/nenhuma questão incorreta pendente/);
});
