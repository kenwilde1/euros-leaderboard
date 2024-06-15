
import { EuiAccordion, EuiHorizontalRule, EuiPanel } from "@elastic/eui";
import { useState } from "react";

import dyl_w from "../data/dyl_w";
import stephen from "../data/stephen";
import alan from "../data/alan";
import hugh from "../data/hugh";
import kenny from "../data/kenny";
import philip from "../data/philip";
import david from "../data/david";
import shane from '../data/shane';

import fixtures from "../data/fixtures";
import colours from "../data/colours";

const players = ['Dylan W', 'Stephen', 'Alan', 'Hugh', 'Kenny', 'Philip', 'David', 'Shane'];

const getFixtures = () => {
    const date = new Date().getDate();
    const lastIndex = fixtures[date].length - 1;
    return fixtures[date].map((match, index) => {
        return (
            <>
            <div className="fixture-item">
                <span style={{ color: colours[match.home]}}>{match.home}</span>
                <span>vs</span>
                <span style={{ color: colours[match.away]}}>{match.away}</span>
                <span className="time">{match.time}</span>
            </div>
            {lastIndex !== index && <EuiHorizontalRule />}
            </>
        )
    })
}

const getFixturesForPerson = (person) => {
    const date = new Date().getDate();
    const todaysFixtures = fixtures[date];

    const persons = {
        'Dylan W': dyl_w.matchPredictions,
        'Stephen': stephen.matchPredictions,
        'Alan': alan.matchPredictions,
        'Hugh': hugh.matchPredictions,
        'Kenny': kenny.matchPredictions,
        'Philip': philip.matchPredictions,
        'David': david.matchPredictions,
        'Shane': shane.matchPredictions
    };

    const predictions = persons[person];

    if (!predictions) {
        return []; // or throw an error if preferred
    }

    return predictions.filter(prediction => {
        return todaysFixtures.some(fix => fix.id === prediction.id);
    });
};

const getMetadataForPerson = (player) => {
    const players = {
        'Dylan W': dyl_w,
        'Stephen': stephen,
        'Alan': alan,
        'Hugh': hugh,
        'Kenny': kenny,
        'Philip': philip,
        'David': david,
        'Shane': shane
    };

    const metadata = players[player];

    return { 
        highestScoringTeam: metadata.highestScoringTeam,
        bestDefence: metadata.bestDefence,
        topGoalscorer: metadata.topGoalscorer 
    }
}

const PersonalPredictions = ({player}) => {
    const predictions = getFixturesForPerson(player);
    const metadata = getMetadataForPerson(player);

    const [isContentOpen, setIsOpen] = useState(false);
    return (
        <EuiPanel className={`${isContentOpen ? 'open-content' : ''}`}>
            <EuiAccordion
                id={player}
                buttonContent={player}
                onToggle={(isOpen) => setIsOpen(isOpen)}
            >
            {isContentOpen && 
            <>
            <div className="other-predictions">
                <div>
                    <span>Group Stage Highest Scorers: </span>
                    <span><b>{metadata.highestScoringTeam}</b></span>
                </div>
                <div>
                    <span>Group Stage Best Defence: </span>
                    <span><b>{metadata.bestDefence}</b></span>
                </div>
                <div>
                    <span>Top Goalscorer: </span>
                    <span><b>{metadata.topGoalscorer}</b></span>
                </div>
            </div>
            <table className="prediction-table">
                <thead>
                    <tr>
                    <th>Home</th>
                    <th>Home Goals</th>
                    <th>Away Goals</th>
                    <th>Away</th>
                    </tr>
                </thead>
                <tbody>
                {predictions.map(pred => {
                    return (
                        <tr>
                        <td>{pred.home}</td>
                        <td>{pred.homeGoals}</td>
                        <td>{pred.awayGoals}</td>
                        <td>{pred.away}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            </>
            }
            </EuiAccordion>
            </EuiPanel>
    )
}

const Predictions = () => {
    const x = getFixturesForPerson('dyl_w');

    return (
        <div className="predictions-page">
            <div className="fixture-list">
                <h4>Today's fixtures</h4>
                {getFixtures()}
            </div>
            <div className="predictions-list">
            {players.map(player => <PersonalPredictions player={player} />)}
            </div>
        </div>
    )
};

export default Predictions;