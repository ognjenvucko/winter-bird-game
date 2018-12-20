import Framework from 'froobit';
import Layers from '../layers';

export class Score extends Framework.Entity {
	constructor() {
		super();
		this.score = 0;
	}
	layer() {
		return Layers.Score();
	}
	render(p, { font }) {
		if (this.nextScore) {
			this.score = p.lerp(this.score, this.nextScore, 0.2);
		}
		p.textAlign(p.LEFT);
		p.textFont(font);
		p.textSize(32);
		p.fill(220);
		p.stroke(30);
		p.strokeWeight(3);
		p.text(`${Math.ceil(this.score)} pt`, 10, 37);
	}
}