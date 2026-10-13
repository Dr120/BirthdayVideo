// Authored timeline: edit each Sequence / Shot independently in Studio or source.
// npm run prepare:media rebuilds this file from scripts/timeline.mjs.
import {AbsoluteFill,Sequence,staticFile,useVideoConfig,useCurrentFrame,interpolate} from 'remotion';
import {Audio} from '@remotion/media';
import {PanelGrid,Shot} from './components/Shot';
export const BirthdayFunk = () => {
  const {fps,durationInFrames}=useVideoConfig();
  const frame=useCurrentFrame();
  return <AbsoluteFill style={{backgroundColor:'#111',opacity:interpolate(frame,[0,5,durationInFrames-12,durationInFrames-1],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>
    <Audio src={staticFile("media/happy-birthday-funk-spot-16197.mp3")} premountFor={fps} volume={(f)=>interpolate(f,[0,3,durationInFrames-12,durationInFrames-1],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})} />
      <Sequence name="01 Solo" from={0} durationInFrames={52} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="оркестр.mp4" trimSeconds={5.133333333333334} playbackRate={1.167} />
        </PanelGrid>
      </Sequence>
      <Sequence name="02 Solo" from={52} durationInFrames={51} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="дерижор.mp4" trimSeconds={12.466666666666667} playbackRate={0.8} />
        </PanelGrid>
      </Sequence>
      <Sequence name="03 Solo" from={103} durationInFrames={52} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="барабан.mp4" trimSeconds={0.43333333333333335} playbackRate={1.089} />
        </PanelGrid>
      </Sequence>
      <Sequence name="04 Duet" from={155} durationInFrames={51} premountFor={fps}>
        <PanelGrid count={2}>
          <Shot file="барабан2.mp4" trimSeconds={6.166666666666667} playbackRate={0.8} />
          <Shot file="барабан.mp4" trimSeconds={4.066666666666666} playbackRate={1.089} />
        </PanelGrid>
      </Sequence>
      <Sequence name="05 Solo" from={206} durationInFrames={52} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="гитарист.mp4" trimSeconds={21.533333333333335} playbackRate={1.011} />
        </PanelGrid>
      </Sequence>
      <Sequence name="06 Duet" from={258} durationInFrames={51} premountFor={fps}>
        <PanelGrid count={2}>
          <Shot file="контрабас.mp4" trimSeconds={5.866666666666666} playbackRate={0.8} />
          <Shot file="контрабас2.MOV" trimSeconds={2.466666666666667} playbackRate={1.089} />
        </PanelGrid>
      </Sequence>
      <Sequence name="07 Solo" from={309} durationInFrames={52} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="играет.mp4" trimSeconds={0.3333333333333333} playbackRate={0.8} />
        </PanelGrid>
      </Sequence>
      <Sequence name="08 Duet" from={361} durationInFrames={51} premountFor={fps}>
        <PanelGrid count={2}>
          <Shot file="музыкант.mp4" trimSeconds={6.966666666666667} playbackRate={1.089} />
          <Shot file="играет.mp4" trimSeconds={11.866666666666667} playbackRate={0.8} />
        </PanelGrid>
      </Sequence>
      <Sequence name="09 Solo" from={412} durationInFrames={51} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="саксофон.mp4" trimSeconds={5.133333333333334} playbackRate={0.8} />
        </PanelGrid>
      </Sequence>
      <Sequence name="10 Trio" from={463} durationInFrames={52} premountFor={fps}>
        <PanelGrid count={3}>
          <Shot file="гитарист.mp4" trimSeconds={7.733333333333333} playbackRate={1.011} />
          <Shot file="контрабас.mp4" trimSeconds={9.666666666666666} playbackRate={0.8} />
          <Shot file="барабан2.mp4" trimSeconds={9.166666666666666} playbackRate={0.8} />
        </PanelGrid>
      </Sequence>
      <Sequence name="11 Solo" from={515} durationInFrames={26} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="барабаны3.mp4" trimSeconds={0.3333333333333333} playbackRate={0.8} />
        </PanelGrid>
      </Sequence>
      <Sequence name="12 Solo" from={541} durationInFrames={25} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="дерижор.mp4" trimSeconds={1.9666666666666666} playbackRate={0.8} />
        </PanelGrid>
      </Sequence>
      <Sequence name="13 Solo" from={566} durationInFrames={26} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="саксофон.mp4" trimSeconds={2.466666666666667} playbackRate={0.8} />
        </PanelGrid>
      </Sequence>
      <Sequence name="14 Solo" from={592} durationInFrames={26} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="контрабас2.MOV" trimSeconds={10.866666666666667} playbackRate={1.089} />
        </PanelGrid>
      </Sequence>
      <Sequence name="15 Duet" from={618} durationInFrames={51} premountFor={fps}>
        <PanelGrid count={2}>
          <Shot file="саксофон.mp4" trimSeconds={1.2666666666666666} playbackRate={0.8} />
          <Shot file="музыкант.mp4" trimSeconds={7.333333333333333} playbackRate={1.089} />
        </PanelGrid>
      </Sequence>
      <Sequence name="16 Trio" from={669} durationInFrames={51} premountFor={fps}>
        <PanelGrid count={3}>
          <Shot file="барабан.mp4" trimSeconds={7.933333333333334} playbackRate={1.089} />
          <Shot file="гитарист.mp4" trimSeconds={25.666666666666668} playbackRate={1.011} />
          <Shot file="контрабас.mp4" trimSeconds={11.166666666666666} playbackRate={0.8} />
        </PanelGrid>
      </Sequence>
      <Sequence name="17 Solo" from={720} durationInFrames={26} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="играет.mp4" trimSeconds={7.866666666666666} playbackRate={0.8} />
        </PanelGrid>
      </Sequence>
      <Sequence name="18 Solo" from={746} durationInFrames={26} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="барабан2.mp4" trimSeconds={13.566666666666666} playbackRate={0.8} />
        </PanelGrid>
      </Sequence>
      <Sequence name="19 Solo" from={772} durationInFrames={26} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="гитарист.mp4" trimSeconds={27.133333333333333} playbackRate={1.011} />
        </PanelGrid>
      </Sequence>
      <Sequence name="20 Solo" from={798} durationInFrames={25} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="контрабас.mp4" trimSeconds={11.166666666666666} playbackRate={0.8} />
        </PanelGrid>
      </Sequence>
      <Sequence name="21 Duet" from={823} durationInFrames={52} premountFor={fps}>
        <PanelGrid count={2}>
          <Shot file="дерижор.mp4" trimSeconds={12.466666666666667} playbackRate={0.8} />
          <Shot file="оркестр.mp4" trimSeconds={1.1333333333333333} playbackRate={1.167} />
        </PanelGrid>
      </Sequence>
      <Sequence name="22 Trio" from={875} durationInFrames={51} premountFor={fps}>
        <PanelGrid count={3}>
          <Shot file="музыкант.mp4" trimSeconds={0.5666666666666667} playbackRate={1.089} />
          <Shot file="саксофон.mp4" trimSeconds={7.633333333333334} playbackRate={0.8} />
          <Shot file="играет.mp4" trimSeconds={0.3333333333333333} playbackRate={0.8} />
        </PanelGrid>
      </Sequence>
      <Sequence name="23 Solo" from={926} durationInFrames={26} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="контрабас2.MOV" trimSeconds={7.533333333333333} playbackRate={1.089} />
        </PanelGrid>
      </Sequence>
      <Sequence name="24 Solo" from={952} durationInFrames={26} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="барабаны3.mp4" trimSeconds={1.7333333333333334} playbackRate={0.8} />
        </PanelGrid>
      </Sequence>
      <Sequence name="25 Solo" from={978} durationInFrames={25} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="саксофон.mp4" trimSeconds={2.7333333333333334} playbackRate={0.8} />
        </PanelGrid>
      </Sequence>
      <Sequence name="26 Solo" from={1003} durationInFrames={26} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="дерижор.mp4" trimSeconds={0.26666666666666666} playbackRate={0.8} />
        </PanelGrid>
      </Sequence>
      <Sequence name="27 Trio" from={1029} durationInFrames={51} premountFor={fps}>
        <PanelGrid count={3}>
          <Shot file="барабан.mp4" trimSeconds={1.1333333333333333} playbackRate={1.089} />
          <Shot file="барабан2.mp4" trimSeconds={3.066666666666667} playbackRate={0.8} />
          <Shot file="барабаны3.mp4" trimSeconds={2.066666666666667} playbackRate={0.8} />
        </PanelGrid>
      </Sequence>
      <Sequence name="28 Solo" from={1080} durationInFrames={13} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="гитарист.mp4" trimSeconds={14.966666666666667} playbackRate={1.011} />
        </PanelGrid>
      </Sequence>
      <Sequence name="29 Solo" from={1093} durationInFrames={13} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="контрабас.mp4" trimSeconds={13.266666666666667} playbackRate={0.8} />
        </PanelGrid>
      </Sequence>
      <Sequence name="30 Solo" from={1106} durationInFrames={13} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="музыкант.mp4" trimSeconds={6.966666666666667} playbackRate={1.089} />
        </PanelGrid>
      </Sequence>
      <Sequence name="31 Solo" from={1119} durationInFrames={13} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="саксофон.mp4" trimSeconds={3.933333333333333} playbackRate={0.8} />
        </PanelGrid>
      </Sequence>
      <Sequence name="32 Duet" from={1132} durationInFrames={51} premountFor={fps}>
        <PanelGrid count={2}>
          <Shot file="гитарист.mp4" trimSeconds={16.933333333333334} playbackRate={1.011} />
          <Shot file="контрабас2.MOV" trimSeconds={0.43333333333333335} playbackRate={1.089} />
        </PanelGrid>
      </Sequence>
      <Sequence name="33 Duet" from={1183} durationInFrames={52} premountFor={fps}>
        <PanelGrid count={2}>
          <Shot file="играет.mp4" trimSeconds={7.866666666666666} playbackRate={0.8} />
          <Shot file="музыкант.mp4" trimSeconds={13.766666666666667} playbackRate={1.089} />
        </PanelGrid>
      </Sequence>
      <Sequence name="34 Trio" from={1235} durationInFrames={51} premountFor={fps}>
        <PanelGrid count={3}>
          <Shot file="саксофон.mp4" trimSeconds={1.2666666666666666} playbackRate={0.8} />
          <Shot file="барабан.mp4" trimSeconds={3.8666666666666667} playbackRate={1.089} />
          <Shot file="дерижор.mp4" trimSeconds={2.3666666666666667} playbackRate={0.8} />
        </PanelGrid>
      </Sequence>
      <Sequence name="35 Solo" from={1286} durationInFrames={155} premountFor={fps}>
        <PanelGrid count={1}>
          <Shot file="оркестр.mp4" trimSeconds={3.933333333333333} playbackRate={1.167} />
        </PanelGrid>
      </Sequence>
  </AbsoluteFill>;
};
