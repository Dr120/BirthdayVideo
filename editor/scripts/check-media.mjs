import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {validateTimeline} from './timeline.mjs';
const files=JSON.parse(readFileSync('scripts/drive-files.json','utf8'));
for(const f of files){
 const path=`public/media/${f.name}`;
 if(!existsSync(path))throw new Error(`Missing original ${f.name}. Run npm run download:media.`);
 if(createHash('sha256').update(readFileSync(path)).digest('hex')!==f.sha256)throw new Error(`Changed original: ${f.name}`);
 const info=JSON.parse(execFileSync('ffprobe',['-v','error','-show_format','-show_streams','-of','json',path]));
 if(!info.streams.some(s=>s.codec_type===(f.name.endsWith('.mp3')?'audio':'video')))throw new Error(`Invalid media: ${f.name}`);
}
const manifest=JSON.parse(readFileSync('src/manifest.json','utf8'));
validateTimeline(manifest);
// Validate authored JSX timing as well: users may change it after generating the plan.
const source=readFileSync('src/BirthdayFunk.tsx','utf8');
const rows=[...source.matchAll(/<Sequence name="[^"]+" from=\{(\d+)\} durationInFrames=\{(\d+)\}/g)];
if(rows.length!==manifest.scenes.length)throw new Error('Timeline source changed: rerun prepare:media or update validator for the authored edit');
for(let i=0;i<rows.length;i++)if(+rows[i][1]!==manifest.scenes[i].from||+rows[i][2]!==manifest.scenes[i].duration)throw new Error('Timeline timing differs from manifest');
console.log('Verified 11 original videos + MP3, SHA-256, source bounds and continuous full-song timeline.');
