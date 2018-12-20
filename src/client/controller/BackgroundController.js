import { Parallax, Camera } from 'froobit';
import Layers from '../layers';

export default Parallax.from([
	'bg1',
	'bg2',
	'bg3',
	'bg4',
], {
	camera: Camera.PARALLAX({
		velocity: {
			x: 0.7,
			y: 0.5,
		},
		damping: {
			x: 0.8,
			y: 0.8,
		},
	}),
	layer: Layers.Background(),
});