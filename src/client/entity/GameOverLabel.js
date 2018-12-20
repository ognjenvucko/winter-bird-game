import Framework from 'froobit';
import Layers from '../layers';

export class GameOverLabel extends Framework.Entity {
	constructor(score) {
		super();
		this.score = score;
	}
	layer() {
		return Layers.GameOver();
	}
	render(p, { font }) {
		const x = p.width / 2;
		const y = 0.4 * p.height;
		p.textAlign(p.CENTER);
		p.textFont(font);
		p.textSize(50);
		p.fill(220);
		p.stroke(30);
		p.strokeWeight(7);
		p.translate(x, y);
		p.text('GAME OVER', 0, 0);
		p.translate(0, 50);
		p.textSize(30);
		p.text(`You scored: ${this.score} pt`, 0, 0);
		p.translate(0, 50);
		p.textSize(20);
		p.text('Click to play Again', 0, 0);
	}
}