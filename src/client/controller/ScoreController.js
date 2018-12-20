import { Score } from '../entity/Score';

const ScoreController = ({
	accept,
}) => {
	const score = new Score();
	accept('updateScore', (s) => {
		score.nextScore = s;
	});
	return score;
};

export default ScoreController;