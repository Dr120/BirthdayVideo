import {Config} from '@remotion/cli/config';
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
// Prefer the installed system browser; REMOTION_BROWSER_EXECUTABLE may override it.
import {existsSync} from 'node:fs';
const browser=process.env.REMOTION_BROWSER_EXECUTABLE ?? '/usr/bin/chromium';
if (existsSync(browser)) Config.setBrowserExecutable(browser);
Config.setChromiumOpenGlRenderer('swangle');
