"""Deterministic signal analysis only: no machine learning or generated media."""
import array,json,math,pathlib,subprocess,statistics
ROOT=pathlib.Path(__file__).resolve().parents[1]
MEDIA=ROOT/'public/media'
def decode(path,args):
 return subprocess.check_output(['ffmpeg','-v','error','-i',str(path),*args,'-f','rawvideo' if 'gray' in args else 's16le','pipe:1'])
def probe(path):
 return json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(path)]))
def rhythm(signal,rate,low=85,high=145):
 mean=statistics.mean(signal);x=[max(0,a-mean) for a in signal]
 scores=[]
 for lag in range(round(rate*60/high),round(rate*60/low)+1):
  score=sum(x[i]*x[i-lag] for i in range(lag,len(x)))/max(1,len(x)-lag)
  scores.append((score,lag))
 _,lag=max(scores)
 phase=max(range(lag),key=lambda p:sum(x[p::lag]))
 return {'bpm':round(rate*60/lag,3),'period':lag/rate,'offset':phase/rate}
def analyze():
 music=MEDIA/'happy-birthday-funk-spot-16197.mp3'
 if not music.exists(): raise RuntimeError('Original MP3 missing')
 pcm=array.array('h',decode(music,['-vn','-ac','1','-ar','8000']))
 energy=[math.sqrt(sum(v*v for v in pcm[i:i+80])/80) for i in range(0,len(pcm)-80,80)]
 onset=[max(0,energy[i]-energy[i-1]) for i in range(1,len(energy))]
 beat=rhythm(onset,100)
 # Refine tempo and phase against onset peaks across the complete song.
 best=(-1,0,0)
 for k in range(-150,151):
  period=beat['period']+k*0.0001
  for p in range(0,round(period*100),2):
   times=[p/100+i*period for i in range(int(len(onset)/100/period))]
   score=sum(max(onset[max(0,round(t*100)-1):round(t*100)+2] or [0]) for t in times)
   if score>best[0]: best=(score,period,p/100)
 _,period,offset=best
 beat={'bpm':round(60/period,3),'period':period,'offset':offset}
 duration=float(probe(music)['format']['duration'])
 beats=[round((offset+i*period)*30) for i in range(math.ceil(duration/period)) if offset+i*period<duration]
 clips=[]
 for p in sorted(MEDIA.iterdir()):
  if p.suffix.lower() not in ('.mp4','.mov'):continue
  info=probe(p);video=next(s for s in info['streams'] if s['codec_type']=='video')
  raw=decode(p,['-an','-vf','fps=15,scale=48:84,format=gray','-pix_fmt','gray'])
  size=48*84
  motions=[sum(abs(a-b) for a,b in zip(raw[i:i+size],raw[i-size:i]))/size for i in range(size,len(raw)-size,size)]
  peaks=[i for i in range(1,len(motions)-1) if motions[i]>motions[i-1] and motions[i]>=motions[i+1]]
  # Motion peaks guide action accents; they are not assumed to be instrument attacks.
  strongest=sorted(peaks,key=lambda i:motions[i],reverse=True)[:20]
  motion=rhythm(motions,15,60,180)
  clips.append({'file':p.name,'duration':float(info['format']['duration']),'width':video['width'],'height':video['height'],'motionPeriod':motion['period'],'accents':[round(i/15,3) for i in strongest]})
 if len(clips)!=11:raise RuntimeError(f'Expected 11 originals, got {len(clips)}')
 result={'music':music.name,'durationInFrames':math.floor(duration*30),'musicDuration':duration,'rhythm':beat,'beats':beats,'clips':clips}
 (ROOT/'src/analysis.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps({'duration':duration,'rhythm':beat,'videos':len(clips)},ensure_ascii=False))
if __name__=='__main__':analyze()
