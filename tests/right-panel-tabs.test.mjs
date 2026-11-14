import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const html = readFileSync(new URL('../prototypes/exam-app-0.1.1/index.html', import.meta.url), 'utf8');
const section = (start, end) => {
  const i = html.indexOf(start);
  const j = html.indexOf(end, i + start.length);
  assert.ok(i >= 0 && j > i, 'source anchors: ' + start);
  return html.slice(i, j);
};
const source = [
  section('function vTitle(v)', 'function rpPaintTabs()'),
  section('function rpTabMatches(t,type,ref)', 'function rpStack(type,ref)'),
  section('function rpCloseTab(id)', 'function rpCloseOthers(id)'),
].join('\n');

function harness() {
  let serial = 0;
  const undo = [];
  const RP = { tabs: [{ id: 'default', views: [{ id: 'explore', type: 'explorar', f: 1 }] }], active: 'default' };
  const context = {
    RP,
    space: 'dataprev',
    spaces: [{ id: 'dataprev', name: 'Dataprev' }, { id: 'other', name: 'Outro espaço' }],
    RT: { graf: { n: 'Gráfico' }, explorar: { n: 'Navegar' }, obj: { n: 'Objeto' } },
    uid: () => 'new-' + (++serial),
    rpSelect: id => { RP.active = id; },
    rpVisible: () => true,
    openRP: () => {},
    wsSave: () => {},
    rpPaintAll: () => {},
    toast: (_message, callback) => undo.push(callback),
    curHref: () => '#/concurso/dataprev',
    nodeOf: href => href === '#/concurso/dataprev' ? { title: 'Dataprev' }
      : href === '#/cargo/analista' ? { title: 'Analista de TI' } : null,
  };
  const api = runInNewContext(source + '\n({ rpAddTab, rpCloseTab, rpTabMatches, vTitle })', context);
  return { api, RP, context, undo };
}

test('first tool replaces only a pristine default Explore tab', () => {
  const h = harness();
  h.api.rpAddTab('graf');
  assert.equal(h.RP.tabs.length, 1);
  assert.equal(h.RP.tabs[0].views[0].type, 'graf');
  assert.equal(h.RP.tabs[0].sp, 'dataprev');
  assert.equal(h.RP.active, 'default');
});

test('repeated opening focuses existing graph; pinned contexts remain different tabs', () => {
  const h = harness();
  h.api.rpAddTab('graf');
  const initialId = h.RP.active;
  h.api.rpAddTab('graf');
  assert.equal(h.RP.tabs.length, 1);
  assert.equal(h.RP.active, initialId);
  h.api.rpAddTab('graf', '#/concurso/dataprev');
  h.api.rpAddTab('graf', '#/cargo/analista');
  assert.equal(h.RP.tabs.length, 3);
  h.api.rpAddTab('graf', '#/concurso/dataprev');
  assert.equal(h.RP.tabs.length, 3);
  assert.equal(h.RP.active, h.RP.tabs[1].id);
  assert.equal(h.api.vTitle(h.RP.tabs[1].views[0]), 'Gráfico · Dataprev');
  assert.equal(h.api.vTitle(h.RP.tabs[2].views[0]), 'Gráfico · Analista de TI');
});

test('tab identity includes the space while preserving manually distinct pinned refs', () => {
  const h = harness();
  h.api.rpAddTab('graf', '#/concurso/dataprev');
  const oldId = h.RP.active;
  h.context.space = 'other';
  h.api.rpAddTab('graf', '#/concurso/dataprev');
  assert.equal(h.RP.tabs.length, 2);
  assert.notEqual(h.RP.active, oldId);
});

test('closing last tab restores Explore and undo restores original tab', () => {
  const h = harness();
  h.api.rpAddTab('graf');
  const currentId = h.RP.active;
  h.api.rpCloseTab(currentId);
  assert.equal(h.RP.tabs.length, 1);
  assert.equal(h.RP.tabs[0].views[0].type, 'explorar');
  assert.notEqual(h.RP.active, currentId);
  assert.equal(h.undo.length, 1);
  h.undo[0]();
  assert.equal(h.RP.tabs.length, 1);
  assert.equal(h.RP.tabs[0].views[0].type, 'graf');
  assert.equal(h.RP.active, currentId);
});

test('context-aware headers and pinned graph changes refresh the tab strip', () => {
  assert.match(html, /const on=t.id===RP.active,v=t.views\[0\],ttl=rpTabTitle\(t\),full=t.views.map\(vTitle\).join\(' \+ '\)/);
  assert.match(html, /title="'\+esc\(full\)\+'/);
  assert.match(html, /else if\(v\.type==='graf'\)\{ v\.ref=h; wsSave\(\); rpPaintBody\(\); rpPaintTabs\(\); \}/);
});

test('pinning and unpinning immediately repaint contextual tab titles (#55)',()=>{
  assert.ok(
    html.includes("b=T.closest('[data-unpin]'); if(b){ const v=viewById(b.dataset.unpin); if(v){ delete v.ref; wsSave(); rpPaintAll(); } return; }"),
    'unpin must refresh tab header and body in the same event'
  );
  assert.ok(
    html.includes("b=T.closest('[data-pin-to-ctx]'); if(b){ const sec=b.closest('.rp-view'), v=viewById(sec&&sec.dataset.v); if(v){ v.ref=b.dataset.pinToCtx; wsSave(); rpPaintAll(); } return; }"),
    'pin must refresh tab header and body in the same event'
  );
});

test('contextual tab overflow preserves full tab names and no top-level stack button',()=>{
  assert.match(html,/id="rpOverflow"[^>]*aria-controls="rpTabMenu"/);
  assert.match(html,/id="rpTabSearch" type="search"/);
  assert.match(html,/function rpRenderTabMenu\(query=''\)/);
  assert.match(html,/RP\.tabs\.filter\(t=>norm\(rpTabTitle\(t\)\)\.includes\(q\)\)/);
  assert.match(html,/classList\.toggle\('compact',RP\.tabs\.length>=5\)/);
  assert.doesNotMatch(html,/id="rpStack"/);
  assert.match(html,/t:'Empilhar ferramenta'/);
  assert.match(html,/data-rp-menu-close/);
});
