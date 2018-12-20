import Framework from 'froobit';
import { pixelToWorld } from 'froobit/lib/physics/utils';
import Layers from '../layers';

const DEFAULT_WIDTH = 70; // px

export class Platform extends Framework.Entity {
	constructor(pos, width = DEFAULT_WIDTH) {
		super();
		this.pos = pos;
		this.width = width;
	}
	layer() {
		return Layers.Platforms();
	}
	physics({
		shape,
		body,
		position,
		type,
		oneWayCollisions,
	}) {
		shape((pl) => {
			return pl.Box(pixelToWorld(this.width / 2), pixelToWorld(2));
		});
		type('ground');
		oneWayCollisions();
		position(this.pos);
		this.body = body;
	}
	render(p, { platform }) {
		p.imageMode(p.CENTER);
		p.image(platform, 0, 0);
	}
}