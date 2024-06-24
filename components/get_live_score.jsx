import moment from "moment"

import fixtures from '../data/fixtures';

import colours from "../data/colours";
import { EuiPanel } from "@elastic/eui";

const timeString = "20:54"

const getMatch = (games, lastResult) => {
    const isResultLoggedToday = games.findIndex(game => lastResult === game.id);
    
    if (isResultLoggedToday !== -1) {
        return games[isResultLoggedToday + 1];
    } else {
        return games[0];
    }
};

const getIsBeforeNextGame = (time) => {
    // const today = moment().format('YYYY-MM-DD');
    // const dateTimeString = `${today} ${timeString}`;
    // const now = moment(dateTimeString, 'YYYY-MM-DD HH:mm');
    
    const now = moment();
    const nextGameTime = moment(time, 'HH:mm');
    return now.isBefore(nextGameTime);
}

const getIsLastMatchOver = (time) => {
    // const today = moment().format('YYYY-MM-DD');
    // const dateTimeString = `${today} ${timeString}`;
    // const now = moment(dateTimeString, 'YYYY-MM-DD HH:mm');

    const now = moment();
    const nextGameTime = moment(time, 'HH:mm');
    return now.isAfter(nextGameTime);
};

const Live = ({home, away}) => {
    return (
        <EuiPanel className="now">
            <div className="live"><div className="circle"></div>Live</div>
            <div>
                <span style={{ color: colours[home] }}>{home}</span>
                <span>  vs  </span>
                <span style={{ color: colours[away] }}>{away}</span>
            </div>
            <span className="link">
                <a target="_blank" href={`https://www.google.com/search?q=${home}+vs+${away}+live+result`}>View Live Score</a>
            </span>
        </EuiPanel>
    )
}

const NextGame = ({ home, away, time }) => {
    return (
        <EuiPanel className="now">
        <div className="live">Next up:</div>
            <div>
                <span style={{ color: colours[home] }}>{home}</span>
                <span>  vs  </span>
                <span style={{ color: colours[away] }}>{away}</span>
                {' '}
                <span><b>{time}</b></span>
            </div>
            <span className="link">
                <a target="_blank" href={`https://www.google.com/search?q=${home}+vs+${away}+fixture`}>View Fixture</a>
            </span>
        </EuiPanel>
    )
}

export function getLiveScore(lastResult, isHistorical) {

    if (isHistorical) {
        return <EuiPanel className="now">
            You're viewing historical results, no fixtures / live scores will be displayed.
    </EuiPanel>
    }

    if (lastResult) {
        const todaysDateDate = new Date().getDate();
        const todaysFixtures = fixtures[todaysDateDate];
    
        const match = getMatch(todaysFixtures, lastResult);

        if (!match) {
            const tomorrowsFirstGame = fixtures[new Date().getDate() + 1][0];
            return <NextGame home={tomorrowsFirstGame.home} away={tomorrowsFirstGame.away} time={tomorrowsFirstGame.time} />
        }

        const isBeforeMatch = match && getIsBeforeNextGame(match.time);
        const isAfterMatch = match && getIsLastMatchOver(match.time) && lastResult === match.id;

        if (!isBeforeMatch && !isAfterMatch) {
            return <Live home={match.home} away={match.away} />;
        } else if (isBeforeMatch && !isAfterMatch) {

            return <NextGame home={match.home} away={match.away} time={match.time} />
        }
    }

    return <span></span>
}