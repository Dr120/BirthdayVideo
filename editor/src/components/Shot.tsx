import {Children,createContext,useContext,type CSSProperties,type ReactNode} from 'react';
import {Video} from '@remotion/media';
import {AbsoluteFill,staticFile,useVideoConfig,useCurrentFrame,interpolate} from 'remotion';
const WidePanel=createContext(false);
export const PanelGrid=({count,children}:{count:number;children:ReactNode}) => <AbsoluteFill style={{display:'grid',gridTemplateColumns:count===1?'1fr':'1fr 1fr',gridTemplateRows:count===3?'1fr 1fr':'1fr',gap:count>1?8:0,background:'#111'}}>{Children.map(children,(child,index)=><div style={{position:'relative',overflow:'hidden',gridColumn:count===3&&index===0?'1 / -1':undefined}}><WidePanel.Provider value={count===3&&index===0}>{child}</WidePanel.Provider></div>)}</AbsoluteFill>;
const grades:Record<string,{exposure:number}>={
  'контрабас.mp4':{exposure:.18},
  'музыкант.mp4':{exposure:.12},
  'играет.mp4':{exposure:.12},
  'оркестр.mp4':{exposure:.06},
};
export const Shot=({file,trimSeconds,playbackRate}:{file:string;trimSeconds:number;playbackRate:number})=>{
 const {fps}=useVideoConfig();const frame=useCurrentFrame();
 const style:CSSProperties={position:'absolute',width:'100%',height:'100%'};
 const wide=useContext(WidePanel);
 const grade=grades[file];
 const fit=wide||file==='оркестр.mp4'?'contain':'cover';
 const src=staticFile(`media/${file}`);
 return <div style={{position:'absolute',inset:0,overflow:'hidden',minWidth:0,minHeight:0}}>
   {fit==='contain' && <Video src={src} muted trimBefore={trimSeconds*fps} playbackRate={playbackRate} premountFor={fps} objectFit="cover" style={{...style,filter:'blur(30px) brightness(.5)',scale:1.1}} />}
   <Video name={file} src={src} muted trimBefore={trimSeconds*fps} playbackRate={playbackRate} premountFor={fps} objectFit={fit} style={{...style,filter:`brightness(${grade?Math.pow(2,grade.exposure):1.025}) contrast(1.055) saturate(1.06)`,scale:interpolate(frame,[0,120],[1,1.025],{extrapolateRight:'clamp'})}} />
 </div>;
};
