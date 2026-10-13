export function makeTimeline(analysis) {
  const {clips, beats, durationInFrames, rhythm} = analysis;
  const byName = new Map(clips.map(c => [c.file, c]));
  const plan = [
    [4,'оркестр.mp4'], [4,'дерижор.mp4'], [4,'барабан.mp4'],
    [4,'барабан2.mp4','барабан.mp4'], [4,'гитарист.mp4'],
    [4,'контрабас.mp4','контрабас2.MOV'], [4,'играет.mp4'],
    [4,'музыкант.mp4','играет.mp4'], [4,'саксофон.mp4'],
    [4,'гитарист.mp4','контрабас.mp4','барабан2.mp4'],
    [2,'барабаны3.mp4'], [2,'дерижор.mp4'], [2,'саксофон.mp4'], [2,'контрабас2.MOV'],
    [4,'саксофон.mp4','музыкант.mp4'], [4,'барабан.mp4','гитарист.mp4','контрабас.mp4'],
    [2,'играет.mp4'], [2,'барабан2.mp4'], [2,'гитарист.mp4'], [2,'контрабас.mp4'],
    [4,'дерижор.mp4','оркестр.mp4'], [4,'музыкант.mp4','саксофон.mp4','играет.mp4'],
    [2,'контрабас2.MOV'], [2,'барабаны3.mp4'], [2,'саксофон.mp4'], [2,'дерижор.mp4'],
    [4,'барабан.mp4','барабан2.mp4','барабаны3.mp4'],
    [1,'гитарист.mp4'], [1,'контрабас.mp4'], [1,'музыкант.mp4'], [1,'саксофон.mp4'],
    [4,'гитарист.mp4','контрабас2.MOV'], [4,'играет.mp4','музыкант.mp4'],
    [4,'саксофон.mp4','барабан.mp4','дерижор.mp4'], [8,'оркестр.mp4'],
  ];
  let beatIndex=0, start=0;
  return plan.map(([length,...names],i) => {
    beatIndex+=length;
    const end=i===plan.length-1 ? durationInFrames : Math.min(durationInFrames,beats[beatIndex]??durationInFrames);
    const duration=end-start;
    if(duration<=0) throw new Error('Shot plan exceeds music duration');
    const shots=names.map((name,j) => {
      const clip=byName.get(name); if(!clip) throw new Error(`Missing original: ${name}`);
      // Match the detected motion cycle to one or two musical beats, avoiding extreme rates.
      const candidates=[clip.motionPeriod/rhythm.period,clip.motionPeriod/(2*rhythm.period)];
      const best=candidates.sort((a,b)=>Math.abs(a-1)-Math.abs(b-1))[0];
      const rate=Math.round(Math.max(.8,Math.min(1.3,best))*1000)/1000;
      const sourceNeeded=duration/30*rate;
      const maxStart=clip.duration-sourceNeeded-.15;
      if(maxStart<0)throw new Error(`${name}: shot longer than source`);
      const accents=clip.accents.filter(t=>t>.25 && t<maxStart+.15);
      const selected=accents[(i+j)%Math.max(1,accents.length)]??Math.min(1,maxStart);
      const trim=Math.round(Math.max(0,Math.min(maxStart,selected-.15))*30)/30;
      return {file:name,trim,rate,sourceDuration:clip.duration};
    });
    const scene={name:`${String(i+1).padStart(2,'0')} ${names.length===1?'Solo':names.length===2?'Duet':'Trio'}`,from:start,duration,shots};
    start=end; return scene;
  });
}
export function validateTimeline(manifest) {
  if(!manifest.music || manifest.clips.length!==11)throw new Error('11 original videos and the MP3 are required');
  let cursor=0;const used=new Set();
  for(const s of manifest.scenes){
    if(s.from!==cursor || !Number.isInteger(s.duration)||s.duration<=0)throw new Error('Gap, overlap or empty scene');
    for(const shot of s.shots){
      if(shot.rate<.8||shot.rate>1.3||shot.trim<0||shot.trim+s.duration/30*shot.rate>shot.sourceDuration+.001)throw new Error(`Invalid source range: ${shot.file}`);
      used.add(shot.file);
    }
    cursor+=s.duration;
  }
  if(cursor!==manifest.durationInFrames)throw new Error('Timeline does not cover full music');
  if(used.size!==11)throw new Error('Not all original videos are included');
}
