
import { EuiAccordion, EuiHorizontalRule, EuiPanel } from "@elastic/eui";
import { useState } from "react";

import dyl_w from "../data/dyl_w";
import stephen from "../data/stephen";
import alan from "../data/alan";
import hugh from "../data/hugh";
import kenny from "../data/kenny";
import philip from "../data/philip";
import david from "../data/david";

import fixtures from "../data/fixtures";
import colours from "../data/colours";

const players = ['Dylan W', 'Stephen', 'Alan', 'Hugh', 'Kenny', 'Philip', 'David'];

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

    if (person === 'Dylan W') {
        return dyl_w.matchPredictions.filter(prediction => {
            return todaysFixtures.find(fix => fix.id === prediction.id);
        })
    } else if (person === 'Stephen') {
        return stephen.matchPredictions.filter(prediction => {
            return todaysFixtures.find(fix => fix.id === prediction.id);
        })
    } else if (person === 'Alan') {
        return alan.matchPredictions.filter(prediction => {
            return todaysFixtures.find(fix => fix.id === prediction.id);
        })
    } else if (person === 'Hugh') {
        return hugh.matchPredictions.filter(prediction => {
            return todaysFixtures.find(fix => fix.id === prediction.id);
        })
    } else if (person === 'Kenny') {
        return kenny.matchPredictions.filter(prediction => {
            return todaysFixtures.find(fix => fix.id === prediction.id);
        })
    } else if (person === 'Philip') {
        return philip.matchPredictions.filter(prediction => {
            return todaysFixtures.find(fix => fix.id === prediction.id);
        })
    }else if (person === 'David') {
        return david.matchPredictions.filter(prediction => {
            return todaysFixtures.find(fix => fix.id === prediction.id);
        })
    }
}

const PersonalPredictions = ({player}) => {
    const predictions = getFixturesForPerson(player);
    const [isContentOpen, setIsOpen] = useState(false);
    return (
        <EuiPanel className={`${isContentOpen ? 'open-content' : ''}`}>
            <EuiAccordion
                id={player}
                buttonContent={player}
                onToggle={(isOpen) => setIsOpen(isOpen)}
            >
            {isContentOpen && <table className="prediction-table">
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
            </table>}
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