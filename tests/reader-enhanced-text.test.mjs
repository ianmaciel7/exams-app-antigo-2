import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../prototypes/exam-app-0.1.1/index.html', import.meta.url), 'utf8');
const marker = 'let readerTextMode=false';
const markerAt = html.indexOf(marker);
assert.notEqual(markerAt, -1, 'reader enhancement code is present');
const scriptStart = html.lastIndexOf('<script', markerAt);
const openEnd = html.indexOf('>', scriptStart);
const scriptEnd = html.indexOf('</script>', markerAt);
const readerScript = html.slice(openEnd + 1, scriptEnd);

test('inline reader script parses as JavaScript', () => {
  assert.doesNotThrow(() => new vm.Script(readerScript));
});

test('reader offers accessible text mode and appearance controls', () => {
  assert.match(readerScript, /role=['"]toolbar['"]/);
  assert.match(readerScript, /data-reader-mode/);
  assert.match(readerScript, /data-reader-font/);
  assert.match(readerScript, /data-reader-size/);
  assert.match(readerScript, /data-reader-leading/);
});

test('reader orders a two-column fixture top-to-bottom by column', () => {
  const start = readerScript.indexOf('function readerOrderItems');
  const end = readerScript.indexOf('function readerControls', start);
  const orderItems = new Function(readerScript.slice(start, end) + ';return readerOrderItems')();
  const fixture = [
    {text:'L1',x:40,y:300},{text:'L2',x:42,y:200},{text:'L3',x:44,y:100},
    {text:'R1',x:340,y:300},{text:'R2',x:342,y:200},{text:'R3',x:344,y:100}
  ];
  assert.deepEqual(orderItems(fixture, 600).map(item => item.text), ['L1','L2','L3','R1','R2','R3']);
});

test('reader derives reflow text from PDF.js coordinates and preserves paragraph actions', () => {
  assert.match(readerScript, /getTextContent\(\)/);
  assert.match(readerScript, /transform\[5\]/);
  assert.match(readerScript, /reader-paragraph/);
  assert.match(readerScript, /readerKey\(c\.d,n,i\)/);
  assert.match(readerScript, /reader-marginalia/);
});

test('undo stores immutable action snapshots', () => {
  assert.equal((readerScript.match(/readerUndo\.push\(\{k,state:structuredClone\(state\)\}\)/g) || []).length, 3);
});

test('reader controls are cleaned up on navigation and global keys respect active editors and dialogs', () => {
  assert.match(readerScript, /function cleanupReader\(\)/);
  assert.match(readerScript, /async function open\(d,seq\)\{\s*cleanupReader\(\)/);
  assert.match(readerScript, /function blank\(title,html,seq\)\{ cleanupReader\(\)/);
  assert.match(readerScript, /e\.isComposing/);
  assert.match(readerScript, /dialog\[open\]/);
  assert.match(readerScript, /contenteditable/);
  assert.match(readerScript, /if\(!readerFocus\)\{const first/);
});
