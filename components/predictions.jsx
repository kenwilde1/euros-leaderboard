
import { EuiAccordion, EuiHorizontalRule, EuiIcon, EuiPanel } from "@elastic/eui";
import { useState } from "react";

import fixtures from "../data/fixtures";
import colours from "../data/colours";
import players from "../data/players";

const getFixtures = () => {
    const date = new Date().getDate();
    const todaysFixtures = fixtures[date];
    const lastIndex = todaysFixtures.length - 1;

    return todaysFixtures.map((match, index) => (
        <>
            <div className="fixture-item">
                <span style={{ color: colours[match.home] }}>{match.home}</span>
                <span>vs</span>
                <span style={{ color: colours[match.away] }}>{match.away}</span>
                <span className="time">{match.time}</span>
            </div>
            {lastIndex !== index && <EuiHorizontalRule />}
        </>
    ));
};

const getFixturesForPerson = (person) => {
    const date = new Date().getDate();
    const todaysFixtures = fixtures[date];
    const predictions = players[person]?.matchPredictions;

    if (!predictions) return [];

    return predictions.filter(prediction =>
        todaysFixtures.some(fix => fix.id === prediction.id)
    );
};

const getMetadataForPerson = (player) => {
    const metadata = players[player];

    return { 
        highestScoringTeam: metadata.highestScoringTeam,
        bestDefence: metadata.bestDefence,
        topGoalscorer: metadata.topGoalscorer 
    };
};

const MetadataDisplay = ({ metadata }) => (
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
);

const PersonalPredictions = ({ player }) => {
    const predictions = getFixturesForPerson(player);
    const metadata = getMetadataForPerson(player);
    const [isContentOpen, setIsOpen] = useState(false);

    return (
        <EuiPanel className={isContentOpen ? 'open-content' : ''}>
            <EuiAccordion
                id={player}
                buttonContent={player}
                onToggle={setIsOpen}
            >
                {isContentOpen && 
                    <>
                        <MetadataDisplay metadata={metadata} />
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
                                {predictions.map(pred => (
                                    <tr key={pred.id}>
                                        <td>{pred.home}</td>
                                        <td>{pred.homeGoals}</td>
                                        <td>{pred.awayGoals}</td>
                                        <td>{pred.away}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                }
            </EuiAccordion>
        </EuiPanel>
    );
};

const Predictions = () => {
    const people = Object.keys(players);

    return (
        <div className="predictions-page">
            <div className="fixture-list">
                <h4>Today's fixtures</h4>
                {getFixtures()}
            </div>
            <div className="predictions-list">
                {people.map(player => <PersonalPredictions key={player} player={player} />)}
            </div>
        </div>
    );
};

export default Predictions;