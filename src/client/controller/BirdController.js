import Framework, { Camera, compose, KeyboardEvents, withController, TouchEvents, MouseEvents } from 'froobit';
import { Bird } from '../entity/Bird';

const BirdController = ({
	p5,
	onEvent,
	scene,
	trigger,
	stage,
}) => {
	const bird = new Bird();
	let heightLevel = 0;
	let score = 0;
	onEvent(KeyboardEvents.keyPressed, ({ code }) => {
		if (code === 'ArrowRight') {
			bird.goRight();
		}
		if (code === 'ArrowLeft') {
			bird.goLeft();
		}
	});
	onEvent(TouchEvents.touchStarted, () => {
		const touch = p5.touches[0];
		if (touch) {
			const { x } = touch;
			if (x > scene.width / 2) {
				bird.goRight();
			} else {
				bird.goLeft();
			}
		}
	});
	onEvent(TouchEvents.touchEnded, () => {
		bird.stopMovingLeftRight();
	});
	onEvent(KeyboardEvents.keyReleased, () => {
		bird.stopMovingLeftRight();
	});
	bird.onJump = (height) => {
		score = height;
		trigger('updateScore', score);
	};
	bird.onGameOver = () => {
		trigger('gameOver', score);
		onEvent(MouseEvents.mouseClicked, () => {
			stage.reload();
		});
	};
	Camera.setOffset({
		x: scene.width / 2,
		y: 0.7 * scene.height,
	});
	Camera.track(bird);
	const ctrl = new class extends Framework.Controller {
		afterRender() {
			const { y } = Camera.getTargetPosition();
			const currentLevel = Math.ceil(Math.abs(y) / 800);
			if (currentLevel > heightLevel) {
				heightLevel = currentLevel;
				trigger('makeNewPlatforms');
			}
		}
	}();
	return withController(bird, ctrl);
};

export default compose([
	Camera.OBJECT,
])(BirdController);