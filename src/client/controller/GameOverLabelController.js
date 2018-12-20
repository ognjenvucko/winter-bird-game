import { GameOverLabel } from '../entity/GameOverLabel';

const GameOverLabelController = ({
	accept,
	render,
}) => {
	accept('gameOver', (score) => {
		render(new GameOverLabel(score));
	});
};

export default GameOverLabelController;