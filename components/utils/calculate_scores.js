import hughPredictions from "../../data/hugh";
import philipPredictions from "../../data/philip";
import stephenPredictions from "../../data/stephen";
import kennyPredictions from "../../data/kenny";
import dylWPredictions from "../../data/dyl_w";
import shanePredictions from "../../data/shane";
import alanPredictions from "../../data/alan";
import davidPredictions from "../../data/david";

export const getWinner = (result) => {
  if (result.homeGoals > result.awayGoals) {
    return result.home;
  } else if (result.homeGoals < result.awayGoals) {
    return result.away;
  } else {
    return "draw";
  }
};

const calculateScore = (
  predictions,
  result,
  scores,
  pos,
  index,
  previousScores,
  lengthOfResults,
  name
) => {
  if (result && result.id === "group-stage") {
    scores[pos].score += result[name];
    if (index <= lengthOfResults) {
      previousScores[pos].score += result[name];
    }
  } else if (result) {
    let runningScore = 0;
    const prediction = predictions.matchPredictions[index];
    const winnerOfResult = getWinner(result);
    const winnerOfPrediction = getWinner(prediction);

    if (winnerOfPrediction === winnerOfResult) {
      runningScore += 3;
    }

    if (prediction.homeGoals === result.homeGoals) {
      runningScore += 1;
    }

    if (prediction.awayGoals === result.awayGoals) {
      runningScore += 1;
    }
    console.log(runningScore);
    scores[pos].score += runningScore;
    if (index <= lengthOfResults) {
      previousScores[pos].score += runningScore;
    }
  }
};

const calculateTeams = (
  predictions,
  result,
  scores,
  pos,
  index,
  previousScores,
  lengthOfResults
) => {
  if (result.id === "group-stage") return;

  const highestScoringTeam = predictions.highestScoringTeam;
  const bestDefence = predictions.bestDefence;
  if (result) {
    const obj = {
      [result.home]: result.homeGoals,
      [result.away]: result.awayGoals,
    };

    if (obj[highestScoringTeam] !== undefined) {
      scores[pos].score += obj[highestScoringTeam];
      if (index <= lengthOfResults) {
        previousScores[pos].score += obj[highestScoringTeam];
      }
    }

    if (obj[bestDefence] !== undefined) {
      let otherTeam = Object.keys(obj).filter(
        (team) => team !== bestDefence
      )[0];
      scores[pos].score -= obj[otherTeam];
      if (index <= lengthOfResults) {
        previousScores[pos].score -= obj[otherTeam];
      }
    }
  }
};

const sortingComparator = (a, b) => {
  if (b.score === a.score) {
    return a.name.localeCompare(b.name);
  } else {
    return b.score - a.score;
  }
};

const getMapOfMovedPositions = (latestScores, previousScores) => {
  // Sort both arrays in descending order based on scores
  latestScores.sort(sortingComparator);
  previousScores.sort(sortingComparator);

  // Create maps to store the positions of each name
  const latestPositions = new Map();
  const previousPositions = new Map();

  // Store positions for latestScores
  latestScores.forEach((entry, index) => {
    latestPositions.set(entry.name, index);
  });

  // Store positions for previousScores
  previousScores.forEach((entry, index) => {
    previousPositions.set(entry.name, index);
  });

  // Calculate position changes
  const positionChanges = {};

  latestScores.forEach((entry) => {
    const name = entry.name;
    const latestPosition = latestPositions.get(name);
    const previousPosition = previousPositions.get(name);
    const positionChange = previousPosition - latestPosition;
    positionChanges[name] = positionChange;
  });

  return positionChanges;
};

const calculateTopGoalScorers = (
  topGoalscorer,
  res,
  scores,
  pos,
  previousScores,
  index,
  lengthOfResults
) => {
  const goalScorers = res.scorers;
  goalScorers &&
    goalScorers.forEach((scorer) => {
      if (scorer === topGoalscorer) {
        scores[pos].score += 3;

        if (index <= lengthOfResults) {
          previousScores[pos].score += 3;
        }
      }
    });
};

function calculatePointDifferences(scores, previousScores) {
  // Create a map for previous scores for quick lookup
  let previousScoresMap = {};
  previousScores.forEach((item) => {
    previousScoresMap[item.name] = item.score;
  });

  // Calculate point differences
  let pointDifferences = {};
  scores.forEach((item) => {
    let previousScore = previousScoresMap[item.name] || 0;
    pointDifferences[item.name] = item.score - previousScore;
  });

  return pointDifferences;
}

export const fetchTally = (results, indexToSlice) => {
  if (indexToSlice !== undefined) {
    results = results.slice(0, indexToSlice);
  }

  const scores = [
    { name: "Hugh", score: 0 },
    { name: "Philip", score: 0 },
    { name: "Stephen", score: 0 },
    { name: "Shane", score: 0 },
    { name: "Alan", score: 0 },
    { name: "Dylan", score: 0 },
    { name: "Kenny", score: 0 },
    { name: "David", score: 0 },
  ];

  let previousScores = [
    { name: "Hugh", score: 0 },
    { name: "Philip", score: 0 },
    { name: "Stephen", score: 0 },
    { name: "Shane", score: 0 },
    { name: "Alan", score: 0 },
    { name: "Dylan", score: 0 },
    { name: "Kenny", score: 0 },
    { name: "David", score: 0 },
  ];

  const lengthOfResults = results.length - 2;

  results.forEach((result, index) => {
    calculateScore(
      hughPredictions,
      result,
      scores,
      0,
      index,
      previousScores,
      lengthOfResults,
      "Hugh"
    );
    calculateScore(
      philipPredictions,
      result,
      scores,
      1,
      index,
      previousScores,
      lengthOfResults,
      "Philip"
    );
    calculateScore(
      stephenPredictions,
      result,
      scores,
      2,
      index,
      previousScores,
      lengthOfResults,
      "Stephen"
    );
    calculateScore(
      shanePredictions,
      result,
      scores,
      3,
      index,
      previousScores,
      lengthOfResults,
      "Shane"
    );
    calculateScore(
      alanPredictions,
      result,
      scores,
      4,
      index,
      previousScores,
      lengthOfResults,
      "Alan"
    );
    calculateScore(
      dylWPredictions,
      result,
      scores,
      5,
      index,
      previousScores,
      lengthOfResults,
      "Dylan"
    );
    calculateScore(
      kennyPredictions,
      result,
      scores,
      6,
      index,
      previousScores,
      lengthOfResults,
      "Kenny"
    );
    calculateScore(
      davidPredictions,
      result,
      scores,
      7,
      index,
      previousScores,
      lengthOfResults,
      "David"
    );
  });

  results.forEach((result, index) => {
    if (index < 36) {
      calculateTeams(
        hughPredictions,
        result,
        scores,
        0,
        index,
        previousScores,
        lengthOfResults,
        "Hugh"
      );
      calculateTeams(
        philipPredictions,
        result,
        scores,
        1,
        index,
        previousScores,
        lengthOfResults,
        "Philip"
      );
      calculateTeams(
        stephenPredictions,
        result,
        scores,
        2,
        index,
        previousScores,
        lengthOfResults,
        "Stephen"
      );
      calculateTeams(
        shanePredictions,
        result,
        scores,
        3,
        index,
        previousScores,
        lengthOfResults,
        "Shane"
      );
      calculateTeams(
        alanPredictions,
        result,
        scores,
        4,
        index,
        previousScores,
        lengthOfResults,
        "Alan"
      );
      calculateTeams(
        dylWPredictions,
        result,
        scores,
        5,
        index,
        previousScores,
        lengthOfResults,
        "Dylan"
      );
      calculateTeams(
        kennyPredictions,
        result,
        scores,
        6,
        index,
        previousScores,
        lengthOfResults,
        "Kenny"
      );
      calculateTeams(
        davidPredictions,
        result,
        scores,
        7,
        index,
        previousScores,
        lengthOfResults,
        "David"
      );
    }
  });

  results.forEach((res, index) => {
    calculateTopGoalScorers(
      hughPredictions.topGoalscorer,
      res,
      scores,
      0,
      previousScores,
      index,
      lengthOfResults
    );
    calculateTopGoalScorers(
      philipPredictions.topGoalscorer,
      res,
      scores,
      1,
      previousScores,
      index,
      lengthOfResults
    );
    calculateTopGoalScorers(
      stephenPredictions.topGoalscorer,
      res,
      scores,
      2,
      previousScores,
      index,
      lengthOfResults
    );
    calculateTopGoalScorers(
      shanePredictions.topGoalscorer,
      res,
      scores,
      3,
      previousScores,
      index,
      lengthOfResults
    );
    calculateTopGoalScorers(
      alanPredictions.topGoalscorer,
      res,
      scores,
      4,
      previousScores,
      index,
      lengthOfResults
    );
    calculateTopGoalScorers(
      dylWPredictions.topGoalscorer,
      res,
      scores,
      5,
      previousScores,
      index,
      lengthOfResults
    );
    calculateTopGoalScorers(
      kennyPredictions.topGoalscorer,
      res,
      scores,
      6,
      previousScores,
      index,
      lengthOfResults
    );
    calculateTopGoalScorers(
      davidPredictions.topGoalscorer,
      res,
      scores,
      7,
      previousScores,
      index,
      lengthOfResults
    );
  });

  const updates = getMapOfMovedPositions(scores, previousScores);
  const pointDiff = calculatePointDifferences(scores, previousScores);

  return { scores, updatesToPositions: updates, pointDiff };
};
