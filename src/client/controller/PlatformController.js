import Framework, { Camera, compose, withController } from 'froobit';
import range from 'lodash.range';
import { Platform } from '../entity/Platform';
import GameOverPlatform from '../entity/GameOverPlatform';

const PlatformController = ({
	scene,
	accept,
	render,
}) => {
	const START_Y = 100;
	let currentY = START_Y;
	const G_OVER_DELTA = 200;

	const gameOverPlatform = new GameOverPlatform({
		x: 0,
		y: START_Y + G_OVER_DELTA,
	}, 2 * scene.width);

	class Ctrl extends Framework.Controller {
		beforeRender(item) {
			const { y: ty } = Camera.getTargetPosition();
			const { x: ix, y: iy } = item.getPosition();
			if (iy - ty > scene.height - Camera.getOffset().y + 100) {
				gameOverPlatform.setPos({
					x: ix,
					y: iy + G_OVER_DELTA,
				});
				item.destroy();
			}
		}
	}

	const makeNewPlatforms = (num) => {
		const X_OFFSET = 150;
		const Y_OFFSET = 130;
		return range(num).map(() => {
			const x = currentY === START_Y ? 0 : -X_OFFSET + (Math.random() * 2 * X_OFFSET);
			const platform = new Platform({
				x,
				y: currentY,
			});
			// eslint-disable-next-line
			currentY -= 0.2 * Y_OFFSET + Math.random() * 0.8 * Y_OFFSET;
			return withController(platform, new Ctrl());
		});
	};

	accept('makeNewPlatforms', () => {
		let platforms = makeNewPlatforms(10);
		platforms.forEach((platform) => {
			render(platform);
		});
	});

	return [
		gameOverPlatform,
		...makeNewPlatforms(20),
	];
};

export default compose([
	Camera.OBJECT,
])(PlatformController);