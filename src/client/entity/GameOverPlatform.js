import Framework from 'froobit';
import { Types } from '../types';

class GameOverPlatform extends Framework.Entity {
	constructor(pos, width) {
		super();
		this.pos = pos;
		this.width = width;
	}
	physics({
		shape,
		position,
		type,
	}) {
		const {
			pos,
			width,
		} = this;
		shape((pl) => {
			return pl.Box(width / 2, 2);
		});
		position(pos);
		this.setPos = (p) => {
			position(p);
		};
		type(Types.GAME_OVER_TYPE);
	}
	render() {
		// nothing to render
	}
}

export default GameOverPlatform;