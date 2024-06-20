import { getWinner } from "./calculate_scores";

import cachedRows from '../../data/cached_data';

const getGoalsFor = (predictions, results = []) => {
    const highestScoringTeam = predictions.highestScoringTeam;
    const bestDefence = predictions.bestDefence;

    let x = 0;
    let y = 0

    results && results.length && results.forEach(result => {
        const obj = { [result.home]: result.homeGoals, [result.away]: result.awayGoals }
        if (obj[highestScoringTeam] !== undefined) {
            x += obj[highestScoringTeam]
        }

        if (obj[bestDefence] !== undefined) {
            let otherTeam = Object.keys(obj).filter(team => team !== bestDefence)[0];
            y += obj[otherTeam]
        }
    })

    return {
        goalsAgainst: y,
        goalsFor: x
    }
}

const calculateTopGoalScorers = (topGoalscorer, scorers) => {
    if (scorers[topGoalscorer] && scorers[topGoalscorer] > 0) {
        return scorers[topGoalscorer]
    }
    return 0;
}

const calculateScore = (predictions, goalsFor, goalsAgainst, topGoalscorer, results = []) => {
    let runningScore = 0;
    let wins = 0;
    let perfectPoints = 0;
    let correctGoalsScored = 0;

    results && results.length && results.forEach((result) => {
        const prediction = predictions.matchPredictions.find(pred => pred.id === result.id);
        const winnerOfResult = getWinner(result);
        const winnerOfPrediction = getWinner(prediction);

        let perfectTracker = 0;

        if (winnerOfPrediction === winnerOfResult) {
            wins += 1
            runningScore += 3
            perfectTracker += 1
        }

        if (prediction.homeGoals === result.homeGoals) {
            runningScore += 1
            perfectTracker += 1
            correctGoalsScored += 1;
        }

        if (prediction.awayGoals === result.awayGoals) {
            runningScore += 1
            perfectTracker += 1
            correctGoalsScored += 1
        }

        if (perfectTracker === 3) {
            perfectPoints += 1;
        }
    })

    runningScore += goalsFor;
    runningScore -= goalsAgainst;
    runningScore += topGoalscorer * 3;

    return { score: runningScore, wins, perfectPoints, correctGoalsScored };
}

export default function fetchData(players, results, originalResults, scorers) {
    const names = Object.keys(players);
    let finalObj = {};
    names.forEach(name => {
        if (!finalObj[name]) finalObj[name] = {}
        const { goalsAgainst, goalsFor } = getGoalsFor(players[name], results);
        const topGoalscorer = calculateTopGoalScorers(players[name].topGoalscorer, scorers);
        const { score, wins, perfectPoints, correctGoalsScored } = calculateScore(players[name], goalsFor, goalsAgainst, topGoalscorer, results)
        finalObj[name] = {
            position: 0,
            name,
            GF: goalsFor,
            GA: goalsAgainst,
            GbTS: topGoalscorer,
            points: score,
            RA: `${Math.round((wins / results.length) * 100)}%`,
            PP: perfectPoints ,
            CGS: correctGoalsScored,
            CR: wins
        }
    });

    cachedRows.forEach(cachedRow => {
        const playerObj = finalObj[cachedRow.name];
        const wins = playerObj.CR + cachedRow.CR;
        finalObj[cachedRow.name] = {
            CGS: playerObj.CGS + cachedRow.CGS,
            CR: playerObj.CR + cachedRow.CR,
            GA: playerObj.GA + cachedRow.GA,
            GF: playerObj.GF + cachedRow.GF,
            RA: `${Math.round((wins / originalResults.length) * 100)}%`,
            name: cachedRow.name,
            PP: playerObj.PP + cachedRow.PP,
            points: playerObj.points + cachedRow.points,
            position: 0,
            GbTS: playerObj.GbTS + cachedRow.GbTS
        }
    });


    return Object.values(finalObj);
}