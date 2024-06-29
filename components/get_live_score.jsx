import moment from "moment";

import fixtures from "../data/fixtures";

import { EuiPanel } from "@elastic/eui";

import Flag from "react-flagkit";

export const countryFlagMap = {
  Germany: "DE",
  Denmark: "DK",
  Switzerland: "CH",
  England: "GB-ENG",
  Slovakia: "SK",
  Spain: "ES",
  Georgia: "GE",
  France: "FR",
  Belgium: "BE",
  Slovenia: "SI",
  Portugal: "PT",
  Italy: "IT",
};

const timeString = "20:54";

const getMatch = (games, lastResult) => {
  if (games) {
    const isResultLoggedToday = games.findIndex(
      (game) => lastResult === game.id
    );

    if (isResultLoggedToday !== -1) {
      return games[isResultLoggedToday + 1];
    } else {
      return games[0];
    }
  }
};

const getIsBeforeNextGame = (time) => {
  // const today = moment().format('YYYY-MM-DD');
  // const dateTimeString = `${today} ${timeString}`;
  // const now = moment(dateTimeString, 'YYYY-MM-DD HH:mm');

  const now = moment();
  const nextGameTime = moment(time, "HH:mm");
  return now.isBefore(nextGameTime);
};

const getIsLastMatchOver = (time) => {
  // const today = moment().format('YYYY-MM-DD');
  // const dateTimeString = `${today} ${timeString}`;
  // const now = moment(dateTimeString, 'YYYY-MM-DD HH:mm');

  const now = moment();
  const nextGameTime = moment(time, "HH:mm");
  return now.isAfter(nextGameTime);
};

const Live = ({ home, away }) => {
  return (
    <EuiPanel className="now live-score">
      <div className="live">
        <div className="circle"></div>Live
      </div>
      <div className="teams">
        <div className="teams-home">
          <Flag country={countryFlagMap[home]} />
          {home}
        </div>
        <span> vs </span>
        <div className="teams-away">
          <Flag country={countryFlagMap[away]} />
          {away}
        </div>
      </div>
      <span className="link">
        <a
          target="_blank"
          href={`https://www.google.com/search?q=${home}+vs+${away}+live+result`}
        >
          View Live Score
        </a>
      </span>
    </EuiPanel>
  );
};

const NextGame = ({ home, away, time }) => {
  return (
    <EuiPanel className="now live-score">
      <div className="live">Next up:</div>
      <div className="teams">
        <div className="teams-home">
          <Flag country={countryFlagMap[home]} />
          {home}
        </div>
        <span> vs </span>
        <div className="teams-away">
          <Flag country={countryFlagMap[away]} />
          {away}
        </div>
      </div>
      <b>{time}</b>
      <span className="link">
        <a
          target="_blank"
          href={`https://www.google.com/search?q=${home}+vs+${away}+fixture`}
        >
          View Fixture
        </a>
      </span>
    </EuiPanel>
  );
};

export function getLiveScore(lastResult, isHistorical) {
  // if (isHistorical && lastResult === "group-stage") {
  //   return (
  //     <EuiPanel className="historical-fixtures">
  //       No fixture data available.
  //     </EuiPanel>
  //   );
  // }

  if (lastResult) {
    const todaysDateDate = new Date().getDate();
    const todaysFixtures = fixtures[todaysDateDate];

    const match = getMatch(todaysFixtures, lastResult);

    if (!match) {
      const tomorrowsFirstGame = fixtures[new Date().getDate() + 1];

      if (!tomorrowsFirstGame) {
        return <EuiPanel>Future fixtures in progress...</EuiPanel>;
      }

      return (
        <NextGame
          home={tomorrowsFirstGame[0].home}
          away={tomorrowsFirstGame[0].away}
          time={tomorrowsFirstGame[0].time}
        />
      );
    }

    const isBeforeMatch = match && getIsBeforeNextGame(match.time);
    const isAfterMatch =
      match && getIsLastMatchOver(match.time) && lastResult === match.id;

    if (!isBeforeMatch && !isAfterMatch) {
      return <Live home={match.home} away={match.away} />;
    } else if (isBeforeMatch && !isAfterMatch) {
      return <NextGame home={match.home} away={match.away} time={match.time} />;
    }
  }

  return <span></span>;
}
