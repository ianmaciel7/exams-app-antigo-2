import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const html=readFileSync(new URL('../prototypes/exam-app-0.1.1/index.html',import.meta.url),'utf8');
const slice=(a,b)=>{
  const i=html.indexOf(a),j=html.indexOf(b,i+a.length);
  assert.ok(i>=0&&j>i,'script source anchors exist: '+a);
  return html.slice(i,j);
};
const src=slice('function bodyGraf(v){','function bodyObj(v){')+
  '\n'+slice('function rpFromView(v,h)','const toolMenu=')+
  '\n({bodyGraf,rpFromView})';

function harness(size=20){
  const root={href:'#/concurso/root',title:'Raiz',kind:'concurso',out:[],inn:[]};
  const others=Array.from({length:size},(_,i)=>({
    href:'#/questao/q'+i,title:'Questão '+String(99-i).padStart(2,'0'),
    kind:i%2?'questao':'cargo',out:[],inn:[]
  }));
  root.out=others.map(n=>[n.href,'Relacionada']);
  const nodes=new Map([root,...others].map(n=>[n.href,n]));
  const actions=[];
  const env={
    gr:()=>({N:nodes}),vNode:()=>root,ctxBar:()=>'<div>Contexto</div>',
    rpEmpty:(title)=>'<p>'+title+'</p>',
    curHref:()=>root.href,nbrs:()=>others.slice().reverse(),
    KORD:['concurso','cargo','questao'],kn:x=>x,WI:{graph:'G'},esc:x=>String(x).replaceAll('&','&amp;').replaceAll('"','&quot;'),
    rpRow:n=>'<a href="'+n.href+'">'+n.title+'</a>',
    MQT:{matches:false},wsOpenMain:h=>actions.push(['navigate',h]),
    openRP:()=>actions.push(['close']),wsSave:()=>actions.push(['save'])
  };
  return {api:runInNewContext(src,env),root,others,actions};
}
test('empty and one-neighbor states have truthful global CTA',()=>{
  const empty=harness(0).api.bodyGraf({id:'g'});
  assert.match(empty,/Sem ligações diretas/);
  assert.match(empty,/Ver grafo global/);
  const one=harness(1).api.bodyGraf({id:'g'});
  assert.match(one,/rp-graph-single/);
  assert.match(one,/Ver grafo global/);
  assert.doesNotMatch(one,/Abrir gráfico completo/);
});
test('with 20 links, all 6 hidden neighbors remain accessible in details',()=>{
  const {api}=harness(20);
  const graph=api.bodyGraf({id:'g'});
  assert.match(graph,/Ver as 6 ligações adicionais/);
  assert.match(graph,/<details class="rp-more rp-hidden-links">/);
  assert.match(graph,/#\/questao\/q0/);
  assert.match(graph,/#\/questao\/q19/);
  assert.equal((graph.match(/class="g-n /g)||[]).length,15,'14 visible neighbors plus center');
  assert.equal((graph.match(/<a href="#\/questao\/q\d+">/g)||[]).length,6,'all 6 additional links listed');
  assert.match(graph,/Ver grafo global/);
});
test('graph renders same deterministic neighbors regardless of input order',()=>{
  const a=harness(20),g1=a.api.bodyGraf({id:'g'});
  a.others.reverse();
  const g2=a.api.bodyGraf({id:'g'});
  assert.equal(g1,g2,'node selection and geometry stable across insertion order');
});
test('clicking graph neighbor navigates main page without silently pinning',()=>{
  const h=harness(2),v={type:'graf',id:'g'};
  h.api.rpFromView(v,'#/questao/q1');
  assert.equal(v.ref,undefined,'no implicit pin');
  assert.deepEqual(h.actions,[['navigate','#/questao/q1']]);
});
test('collection/global CTAs clearly describe the global scope',()=>{
  const graphSection=slice('function bodyGraf(v){','function bodyObj(v){');
  assert.doesNotMatch(graphSection,/Abrir gráfico completo/);
  assert.equal((graphSection.match(/Ver grafo global/g)||[]).length,4);
});

function collectionGraph(count){
  const nodes=new Map(Array.from({length:count},(_,i)=>{
    const n={href:'#/questao/q'+i,title:'Questão '+i,kind:'questao',out:[],inn:[]};
    return [n.href,n];
  }));
  const env={
    gr:()=>({N:nodes}),vNode:()=>null,curHref:()=>'#/tipo/questao',
    kn:x=>x,esc:x=>String(x),WI:{graph:'G'}
  };
  return runInNewContext(src,env).bodyGraf({id:'collection'});
}

test('contextual collection graph initially fits all nodes, including dense collections (#54)',()=>{
  for(const count of [1,3,50,120]){
    const graph=collectionGraph(count);
    const svg=graph.match(/<svg class="rp-graph rp-graph-viewport"[^>]+>/)?.[0];
    assert.ok(svg,'collection must have viewport SVG');
    const values=svg.match(/viewBox="([^"]+)"/)?.[1].split(/\s+/).map(Number);
    assert.ok(values&&values.length===4&&values.every(Number.isFinite),'numeric viewBox');
    const [x0,y0,width,height]=values;
    assert.ok(width>=300&&height>=240,'initial frame at least baseline dimensions');
    assert.ok(Math.abs(width/height-300/240)<0.00001,'preserve ratio');
    assert.ok(svg.includes('data-fit-w="'+width+'"')&&svg.includes('data-fit-h="'+height+'"'),'persist fitted bounds for Reset');
    const circles=[...graph.matchAll(/<circle cx="(-?[\d.]+)" cy="(-?[\d.]+)" r="8\.5"/g)];
    assert.equal(circles.length,count,'every collection item rendered');
    for(const hit of circles){
      const [cx,cy]=[Number(hit[1]),Number(hit[2])];
      assert.ok(cx-8.5>=x0&&cx+8.5<=x0+width,'node visible horizontally');
      assert.ok(cy-8.5>=y0&&cy+8.5<=y0+height,'node visible vertically');
    }
    if(count>=50)assert.ok(width>300,'dense graph must enlarge initial fit');
  }
});

test('contextual graph Reset and zoom preserve dynamically fitted viewport (#54)',()=>{
  const html=readFileSync(new URL('../prototypes/exam-app-0.1.1/index.html',import.meta.url),'utf8');
  assert.match(html,/fw=\+svg\.dataset\.fitW\|\|300,fh=\+svg\.dataset\.fitH\|\|240/);
  assert.match(html,/Math\.max\(2400,fw\*2\)/,'zoom-out allows the original large extent');
  assert.match(html,/nh=nw\*fh\/fw/,'zoom preserves frame aspect ratio');
});
