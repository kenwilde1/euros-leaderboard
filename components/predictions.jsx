import {
  EuiAccordion,
  EuiHorizontalRule,
  EuiSpacer,
  EuiPanel,
} from "@elastic/eui";
import { useEffect, useState } from "react";

import fixtures from "../data/fixtures";
import colours from "../data/colours";
import players from "../data/players";

import { Switch, ThemeProvider } from "@mui/material";
import { theme } from "./results";

const getFixtures = () => {
  const date = new Date().getDate();
  const todaysFixtures = fixtures[date];
  if (!todaysFixtures) {
    return <span>Future fixtures in progress...</span>;
  }
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
  if (!todaysFixtures) {
    return [];
  }

  const predictions = players[person]?.matchPredictions;

  if (!predictions) return [];

  return predictions.filter((prediction) =>
    todaysFixtures.some((fix) => fix.id === prediction.id)
  );
};

const getMetadataForPerson = (player) => {
  const metadata = players[player];

  return {
    highestScoringTeam: metadata.highestScoringTeam,
    bestDefence: metadata.bestDefence,
    topGoalscorer: metadata.topGoalscorer,
  };
};

const MetadataDisplay = ({ metadata }) => (
  <div className="other-predictions">
    <div>
      <span>Top Goalscorer: </span>
      <span>
        <b>{metadata.topGoalscorer}</b>
      </span>
    </div>
  </div>
);

const PersonalPredictions = ({ player, open }) => {
  const predictions = getFixturesForPerson(player);
  const metadata = getMetadataForPerson(player);
  const [isContentOpen, setIsOpen] = useState(open);

  useEffect(() => {
    if (isContentOpen !== open) {
      setIsOpen(open);
    }
  }, [open]);

  return (
    <EuiPanel className={isContentOpen ? "open-content" : ""}>
      <EuiAccordion
        id={player}
        buttonContent={player}
        onToggle={setIsOpen}
        forceState={isContentOpen ? "open" : "closed"}
      >
        {isContentOpen && !!predictions.length && (
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
                {predictions.map((pred) => (
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
        )}
      </EuiAccordion>
    </EuiPanel>
  );
};

const LOCAL_STORAGE_KEY = "euros:open-predictions";

const Predictions = () => {
  const people = Object.keys(players);
  const [open, setOpen] = useState();

  const handleSwitchChange = (e) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, e.target.checked);
    setOpen(e.target.checked);
  };

  useEffect(() => {
    const getLocal = () => {
      const local = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        return JSON.parse(local);
      } else {
        return false;
      }
    };
    setOpen(getLocal());
  }, []);

  return <span className="fixture-list">✨ Fill out the Excel ladies ✨</span>;

  return (
    <div className="predictions-page">
      <div className="fixture-list">
        <h4>Today's fixtures</h4>
        {getFixtures()}
      </div>
      <div className="toggle-predictions">
        <ThemeProvider theme={theme}>
          <EuiSpacer />
          <div className="toggle-table">
            <Switch checked={open} onChange={handleSwitchChange} />
            <span className="toggle-desc">Open all predictions</span>
          </div>
        </ThemeProvider>
      </div>
      <div className="predictions-list">
        {people.map((player) => (
          <PersonalPredictions key={player} player={player} open={open} />
        ))}
      </div>
    </div>
  );
};

export default Predictions;
