import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {makeTimeline,validateTimeline} from './timeline.mjs';
const analysis=JSON.parse(readFileSync(new URL('../src/analysis.json',import.meta.url)));
const create=()=>({...analysis,scenes:makeTimeline(analysis)});
test('real footage covers the entire song without source overflow',()=>{
 const m=create();validateTimeline(m);
 assert.equal(m.scenes.length,35);
 assert.ok(m.scenes.some(s=>s.shots.length===2));assert.ok(m.scenes.some(s=>s.shots.length===3));
 for(const s of m.scenes.slice(1))assert.ok(m.beats.includes(s.from));
 assert.ok(m.scenes.some(s=>s.shots.some(c=>c.rate!==1)));
});
test('reject missing original, timeline gap and source overrun',()=>{
 assert.throws(()=>makeTimeline({...analysis,clips:analysis.clips.slice(1)}),/Missing original/);
 const gap=create();gap.scenes[1].from++;assert.throws(()=>validateTimeline(gap),/Gap/);
 const over=create();over.scenes[0].shots[0].trim=999;assert.throws(()=>validateTimeline(over),/source range/);
});
