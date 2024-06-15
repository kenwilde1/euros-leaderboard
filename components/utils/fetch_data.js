import { getWinner } from "./calculate_scores";

const sampleResults = [
    {
        "homeGoals": 5,
        "away": "Scotland",
        "home": "Germany",
        "awayGoals": 1,
        "id": "GERSCO"
    },
    {
        "home": "Hungary",
        "away": "Switzerland",
        "homeGoals": 1,
        "awayGoals": 3,
        "id": "HUNSUI"
    },
    {
        "homeGoals": 3,
        "home": "Spain",
        "awayGoals": 0,
        "away": "Croatia",
        "id": "SPACRO"
    },
    {
        "homeGoals": 2,
        "home": "Italy",
        "awayGoals": 1,
        "away": "Albania",
        "id": "ITAALB"
    }
]

const sampleTopGoalscores = [
    {
        "Mbappe": 0,
        "Lukaku": 0,
        "Ronaldo": 0,
        "Havertz": 1,
        "id": "8ZeNhu225W2aGJhYZne1"
    }
]



const getGoalsFor = (predictions, results = []) => {
    const highestScoringTeam = predictions.highestScoringTeam;
    const bestDefence = predictions.bestDefence;

    let x = 0;
    let y = 0

    results && results.length && results.forEach(result => {
        const obj = { [result.home]: result.homeGoals, [result.away]: result.awayGoals }
        if (obj[highestScoringTeam]) {
            x += obj[highestScoringTeam]
        }

        if (obj[bestDefence]) {
            let otherTeam = Object.keys(obj).filter(team => team !== bestDefence)[0];
            y += obj[otherTeam]
        }
    })

    return {
        goalsAgainst: y,
        goalsFor: x
    }
}

const calculateTopGoalScorers = (topGoalscorer) => {
    if (sampleTopGoalscores[0][topGoalscorer] && sampleTopGoalscores[0][topGoalscorer] > 0) {
        return sampleTopGoalscores[0][topGoalscorer]
    }
    return 0;
}

const calculateScore = (predictions, goalsFor, goalsAgainst, topGoalscorer, results = []) => {
    let runningScore = 0;
    let wins = 0;
    let perfectPoints = 0;

    results && results.length && results.forEach((result, index) => {
        const prediction = predictions.matchPredictions[index];
        const winnerOfResult = getWinner(result);
        const winnerOfPrediction = getWinner(prediction);

        if (winnerOfPrediction === winnerOfResult) {
            wins += 1
            runningScore += 3
        }

        if (prediction.homeGoals === result.homeGoals) {
            runningScore += 1
        }

        if (prediction.awayGoals === result.awayGoals) {
            runningScore += 1
        }

        if (runningScore === 5) {
            perfectPoints += 1;
        }
    })

    runningScore += goalsFor;
    runningScore -= goalsAgainst;
    runningScore += topGoalscorer * 3;

    return { score: runningScore, wins, perfectPoints };
}

export default function fetchData(players, results) {
    const names = Object.keys(players);
    
    let finalObj = {};
    names.forEach(name => {
        if (!finalObj[name]) finalObj[name] = {}
        const { goalsAgainst, goalsFor } = getGoalsFor(players[name], results);
        const topGoalscorer = calculateTopGoalScorers(players[name].topGoalscorer);
        const { score, wins, perfectPoints } = calculateScore(players[name], goalsFor, goalsAgainst, topGoalscorer, results)
        finalObj[name] = {
            position: 0,
            name,
            GF: goalsFor,
            GA: goalsAgainst,
            GbTS: topGoalscorer,
            points: score,
            RA: `${(wins / results.length) * 100}%`,
            PP: perfectPoints
        }
    })

    return Object.values(finalObj);
}