import {Composition} from 'remotion';
import {BirthdayFunk} from './BirthdayFunk';
import manifest from './manifest.json';
export const RemotionRoot = () => <Composition id="BirthdayFunk" component={BirthdayFunk} width={1080} height={1920} fps={30} durationInFrames={manifest.durationInFrames} />;
