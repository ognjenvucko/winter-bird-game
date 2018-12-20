import Framework, { scene } from 'froobit';
import BackgroundController from './src/client/controller/BackgroundController';
import BirdController from './src/client/controller/BirdController';
import PlatformController from './src/client/controller/PlatformController';
import ScoreController from './src/client/controller/ScoreController';
import Layers from './src/client/layers';

// assets
import bg1 from './assets/bg1.jpg';
import bg2 from './assets/bg2.png';
import bg3 from './assets/bg3.png';
import bg4 from './assets/bg4.png';
import bird from './assets/bird.png';
import platform from './assets/platform.png';
import font from './assets/customFont.otf';
import GameOverLabelController from './src/client/controller/GameOverLabelController';

// Entry point

const assets = {
	images: {
		bg1,
		bg2,
		bg3,
		bg4,
		bird,
		platform,
	},
	fonts: {
		font,
	},
};

const controllers = [
	BackgroundController,
	BirdController,
	PlatformController,
	ScoreController,
	GameOverLabelController,
];

const options = {
	assets,
	scene: scene(400, 600),
	physics: true,
	layers: Layers,
};

Framework.with(controllers, options).init();