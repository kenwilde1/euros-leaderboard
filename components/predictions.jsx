import {
  EuiAccordion,
  EuiHorizontalRule,
  EuiSpacer,
  EuiPanel,
} from "@elastic/eui";
import { useEffect, useState } from "react";

import fixtures from "../data/fixtures";
import players from "../data/players";

import { Switch, ThemeProvider } from "@mui/material";
import { theme } from "./results";

import { countryFlagMap } from "./get_live_score";

import Flag from "react-flagkit";

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
        <div className="fixture-item-home">
          <Flag country={countryFlagMap[match.home]} />
        </div>
        <span>vs</span>
        <div className="fixture-item-away">
          <Flag country={countryFlagMap[match.away]} />
        </div>
      </div>
      <span className="time">{match.time}</span>
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
    quarterFinalists: metadata.quarterFinalists,
    semiFinalist: metadata.semiFinalist,
    finalists: metadata.finalists,
    totalYellowCards: metadata.totalYellowCards,
    totalRedCards: metadata.totalRedCards,
    totalPenalties: metadata.totalPenalties,
    winner: metadata.winner,
  };
};

const MetadataDisplay = ({ metadata }) => (
  <div className="other-predictions">
    <div>
      <div>
        🏆: <b>{metadata.winner}</b>
      </div>
      <div>
        2️⃣: <b>{metadata.finalists}</b>
      </div>
      <div>
        4️⃣: <b>{metadata.semiFinalist}</b>
      </div>
      <div>
        8️⃣: <b>{metadata.quarterFinalists}</b>
      </div>
      <div>
        ⚽: <b>{metadata.topGoalscorer}</b>
      </div>
      <div>
        🟨: <b>{metadata.totalYellowCards}</b>
      </div>
      <div>
        🟥: <b>{metadata.totalRedCards}</b>
      </div>
      <div>
        🥅: <b>{metadata.totalPenalties}</b>
      </div>
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
        {isContentOpen && (
          <>
            <MetadataDisplay metadata={metadata} />
            {!!predictions.length && (
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
            )}
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

  return (
    <div className="predictions-page">
      <div className="toggle-predictions">
        <ThemeProvider theme={theme}>
          <div className="toggle-table">
            <Switch checked={open} onChange={handleSwitchChange} />
            <span className="toggle-desc">Expand all</span>
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
