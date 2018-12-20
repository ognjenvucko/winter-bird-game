import Framework, { pixelToWorld, Vec2 } from 'froobit';
import { coordsToVec2 } from 'froobit/lib/physics/utils';
import Layers from '../layers';
import { Types } from '../types';

const RADIUS = 20;

export class Bird extends Framework.Entity {
	constructor() {
		super();
		this.scale = 1;
	}
	layer() {
		return Layers.Bird();
	}
	physics({
		shape,
		dynamic,
		contact,
	}) {
		shape((pl) => {
			return pl.Circle(pixelToWorld(RADIUS));
		});
		dynamic();
		contact.with('ground').onBegin((b) => {
			const vel = this.body.getLinearVelocity();
			if (Math.abs(vel.y) < 2) {
				this.jump();
				if (typeof this.onJump === 'function') {
					const h = Math.ceil(Math.abs(b.getPosition().y - 10));
					this.onJump(h);
				}
			}
		});
		contact.with(Types.GAME_OVER_TYPE).onBegin(() => {
			this.onGameOver();
		});
	}
	goRight() {
		const vel = this.body.getLinearVelocity();
		this.body.setLinearVelocity(Vec2(6, vel.y));
		this.scale = 1;
	}
	goLeft() {
		const vel = this.body.getLinearVelocity();
		this.body.setLinearVelocity(Vec2(-6, vel.y));
		this.scale = -1;
	}
	stopMovingLeftRight() {
		const vel = this.body.getLinearVelocity();
		this.body.setLinearVelocity(Vec2(0, vel.y));
	}
	jump() {
		this.body.applyForceToCenter(coordsToVec2({
			x: 0,
			y: -12000,
		}), true);
	}
	render(p, { bird }) {
		p.scale(this.scale, 1);
		p.imageMode(p.CENTER);
		p.image(bird, 0, -20);
	}
}