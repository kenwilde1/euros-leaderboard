import hughPredictions from '../../data/hugh';
import philipPredictions from '../../data/philip';
import stephenPredictions from '../../data/stephen';
import kennyPredictions from '../../data/kenny';
import dylWPredictions from '../../data/dyl_w';
import shanePredictions from '../../data/shane';
import alanPredictions from '../../data/alan';
import davidPredictions from '../../data/david';

const getWinner = (result) => {
    if (result.homeGoals > result.awayGoals) {
        return result.home;
    } else if (result.homeGoals < result.awayGoals) {
        return result.away;
    } else {
        return 'draw';
    }
}

const calculateScore = (predictions, result, scores, pos, index) => {
    if (result) {
        let runningScore = 0;
        const prediction = predictions.matchPredictions[index];
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

        scores[pos].score += runningScore;
    }
}

const calculateTeams = (predictions, result, scores, pos, index) => {
    const highestScoringTeam = predictions.highestScoringTeam;
    const bestDefence = predictions.bestDefence;

    if (result) {
        const obj = { [result.home]: result.homeGoals, [result.away]: result.awayGoals }
        console.log(obj);
        console.log(highestScoringTeam);
        if (obj[highestScoringTeam]) [
            scores[pos].score += obj[highestScoringTeam]
        ]

        if (obj[bestDefence]) {
            let otherTeam = Object.keys(obj).filter(team => team !== bestDefence)[0];
            scores[pos].score -= obj[otherTeam]
        }
    }
}

const calculateTopGoalScorers = (topGoalscorer, goalScorers, scores, pos) => {
    if (goalScorers[0][topGoalscorer]) {
        scores[pos].score += goalScorers[0][topGoalscorer] * 3
    }
}

export const fetchTally = (results, goalScorers) => {
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
        calculateScore(hughPredictions, result, scores, 0, index);
        calculateScore(philipPredictions, result, scores, 1, index);
        calculateScore(stephenPredictions, result, scores, 2, index);
        calculateScore(shanePredictions, result, scores, 3, index);
        calculateScore(alanPredictions, result, scores, 4, index);
        calculateScore(dylWPredictions, result, scores, 5, index);
        calculateScore(kennyPredictions, result, scores, 6, index);
        calculateScore(davidPredictions, result, scores, 7, index);
   });

   results.forEach((result, index) => {
        calculateTeams(hughPredictions, result, scores, 0, index);
        calculateTeams(philipPredictions, result, scores, 1, index);
        calculateTeams(stephenPredictions, result, scores, 2, index);
        calculateTeams(shanePredictions, result, scores, 3, index);
        calculateTeams(alanPredictions, result, scores, 4, index);
        calculateTeams(dylWPredictions, result, scores, 5, index);
        calculateTeams(kennyPredictions, result, scores, 6, index);
        calculateTeams(davidPredictions, result, scores, 7, index);
    });

    calculateTopGoalScorers(hughPredictions.topGoalscorer, goalScorers, scores, 0);
    calculateTopGoalScorers(philipPredictions.topGoalscorer, goalScorers, scores, 1);
    calculateTopGoalScorers(stephenPredictions.topGoalscorer, goalScorers, scores, 2);
    calculateTopGoalScorers(shanePredictions.topGoalscorer, goalScorers, scores, 3);
    calculateTopGoalScorers(alanPredictions.topGoalscorer, goalScorers, scores, 4);
    calculateTopGoalScorers(dylWPredictions.topGoalscorer, goalScorers, scores, 5);
    calculateTopGoalScorers(kennyPredictions.topGoalscorer, goalScorers, scores, 6);
    calculateTopGoalScorers(davidPredictions.topGoalscorer, goalScorers, scores, 7);

    return scores;
}
