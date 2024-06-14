import hughPredictions from '../../../data/hugh';
import philipPredictions from '../../../data/philip';
import stephenPredictions from '../../../data/stephen';
import kennyPredictions from '../../../data/kenny';
import dylWPredictions from '../../../data/dyl_w';
import shanePredictions from '../../../data/shane';
import alanPredictions from '../../../data/alan';

const getWinner = (result) => {
    if (result.homeGoals > result.awayGoals) {
        return result.home;
    } else if (result.homeGoals < result.awayGoals) {
        return result.away;
    } else {
        return 'draw';
    }
}

const calculateScore = (prediction, result, scores, index) => {
    if (result) {
        let runningScore = 0;

        const winnerOfResult = getWinner(result);
        const winnerOfPrediction = getWinner(prediction);

        if (winnerOfPrediction === winnerOfResult) {
            runningScore += 3
        }

        if (prediction.homeGoals === result.homeGoals) {
            runningScore += 1
        }

        if (prediction.awayGoals === result.awayGoals) {
            runningScore += 1
        }

        scores[index].score += runningScore;
    }
}

export const fetchTally = (results) => {
    const scores = [
       { name: 'Hugh', score: 0 },
       { name: 'Philip', score: 0 },
       { name: 'Stephen', score: 0 },
       { name: 'Shane', score: 0 },
       { name: 'Alan', score: 0 },
       { name: 'Dylan W', score: 0 },
       { name: 'Kenny', score: 0 },
       { name: 'David', score: 0 },
       { name: 'Dylan C', score: 0 }
    ];

   results.forEach((result, index) => {
        calculateScore(hughPredictions[index], result, scores, 0);
        calculateScore(philipPredictions[index], result, scores, 1);
        calculateScore(stephenPredictions[index], result, scores, 2);
        calculateScore(shanePredictions[index], result, scores, 3);
        calculateScore(alanPredictions[index], result, scores, 4);
        calculateScore(dylWPredictions[index], result, scores, 5);
        calculateScore(kennyPredictions[index], result, scores, 6);
   });

    return scores;
}