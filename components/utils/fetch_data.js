import { getWinner } from "./calculate_scores";

const getGoalsFor = (predictions, results = []) => {
  const highestScoringTeam = predictions.highestScoringTeam;
  const bestDefence = predictions.bestDefence;

  let x = 0;
  let y = 0;

  results &&
    results.length &&
    results.forEach((result, index) => {
      if (index < 36) {
        if (result.id !== "group-stage") {
          const obj = {
            [result.home]: result.homeGoals,
            [result.away]: result.awayGoals,
          };
          if (obj[highestScoringTeam] !== undefined) {
            x += obj[highestScoringTeam];
          }

          if (obj[bestDefence] !== undefined) {
            let otherTeam = Object.keys(obj).filter(
              (team) => team !== bestDefence
            )[0];
            y += obj[otherTeam];
          }
        }
      }
    });

  return {
    goalsAgainst: y,
    goalsFor: x,
  };
};

const calculateTopGoalScorers = (topGoalscorer, results) => {
  let score = 0;
  results &&
    results.length &&
    results.forEach((res) => {
      const goalScorers = res.scorers;
      goalScorers &&
        goalScorers.forEach((scorer) => {
          if (scorer === topGoalscorer) {
            score = 1;
          }
        });
    });
  return score;
};

// const calculateTopGoalScorers = (topGoalscorer, scorers) => {
//     if (scorers && scorers[topGoalscorer] && scorers[topGoalscorer] > 0) {
//         return scorers[topGoalscorer]
//     }
//     return 0;
// }

const calculateScore = (
  predictions,
  goalsFor,
  goalsAgainst,
  topGoalscorer,
  results = [],
  name
) => {
  let runningScore = 0;
  let wins = 0;
  let perfectPoints = 0;
  let correctGoalsScored = 0;

  results &&
    results.length &&
    results.forEach((result) => {
      if (result.id === "group-stage") {
        runningScore += result[name];
      } else {
        const prediction = predictions.matchPredictions.find(
          (pred) => pred.id === result.id
        );
        const winnerOfResult = getWinner(result);
        const winnerOfPrediction = getWinner(prediction);

        let perfectTracker = 0;

        if (winnerOfPrediction === winnerOfResult) {
          wins += 1;
          runningScore += 3;
          perfectTracker += 1;
        }

        if (prediction.homeGoals === result.homeGoals) {
          runningScore += 1;
          perfectTracker += 1;
          correctGoalsScored += 1;
        }

        if (prediction.awayGoals === result.awayGoals) {
          runningScore += 1;
          perfectTracker += 1;
          correctGoalsScored += 1;
        }

        if (perfectTracker === 3) {
          perfectPoints += 1;
        }
      }
    });

  runningScore += goalsFor;
  runningScore -= goalsAgainst;
  runningScore += topGoalscorer * 3;

  return { score: runningScore, wins, perfectPoints, correctGoalsScored };
};

export default function fetchData(players, results, originalResults) {
  const names = Object.keys(players);
  let finalObj = {};

  names.forEach((name) => {
    if (!finalObj[name]) finalObj[name] = {};
    const { goalsAgainst, goalsFor } = getGoalsFor(players[name], results);
    const topGoalscorer = calculateTopGoalScorers(
      players[name].topGoalscorer,
      results
    );
    const { score, wins, perfectPoints, correctGoalsScored } = calculateScore(
      players[name],
      goalsFor,
      goalsAgainst,
      topGoalscorer,
      results,
      name
    );

    finalObj[name] = {
      position: 0,
      name,
      GF: goalsFor,
      GA: goalsAgainst,
      GbTS: topGoalscorer,
      points: score,
      RA: `${Math.round((wins / originalResults.length) * 100)}%`,
      PP: perfectPoints,
      CGS: correctGoalsScored,
      CR: wins,
    };
  });

  return Object.values(finalObj);
}
