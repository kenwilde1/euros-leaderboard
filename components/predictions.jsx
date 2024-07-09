import {
  EuiAccordion,
  EuiPanel,
} from "@elastic/eui";
import { useEffect, useState } from "react";

import fixtures from "../data/fixtures";
import players from "../data/players";

import { Switch, ThemeProvider } from "@mui/material";
import { theme } from "./results";

const getFixturesForPerson = (person) => {
  const date = new Date().getDate();
  let todaysFixtures = fixtures[date];
  if (date === 9) {
    todaysFixtures = [...fixtures[date], ...fixtures[date+1]]
  } else if (date === 10) {
    todaysFixtures = [...fixtures[date-1], ...fixtures[date]]
  }

  if (!todaysFixtures) {
    return [];
  }

  const predictions = players[person]?.matchPredictions;

  if (!predictions) return [];
  const x = predictions.filter((prediction) =>
    todaysFixtures.some((fix) => fix.id === prediction.id)
  );
  return x;
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
    <div className="metadata-predictions">
      <div>
        🏆 <b>{metadata.winner}</b>
      </div>
      <div>
        2️⃣ <b>{metadata.finalists}</b>
      </div>
      <div>
        4️⃣ <b>{metadata.semiFinalist}</b>
      </div>
      <div>
        8️⃣ <b>{metadata.quarterFinalists}</b>
      </div>
      <div>
        ⚽ <b>{metadata.topGoalscorer}</b>
      </div>
      <div>
        🟨 <b>{metadata.totalYellowCards}</b>
      </div>
      <div>
        🟥 <b>{metadata.totalRedCards}</b>
      </div>
      <div>
        🥅 <b>{metadata.totalPenalties}</b>
      </div>
    </div>
  </div>
);

const PersonalPredictions = ({ player, open, checked }) => {
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
            {checked && <MetadataDisplay metadata={metadata} />}
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
const LOCAL_STORAGE_KEY_2 = "euros:show-overall";

const Predictions = () => {
  const people = Object.keys(players);
  const [open, setOpen] = useState(true);
  const [checked, setChecked] = useState(true);

  const handleSwitchChange = (e) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, e.target.checked);
    setOpen(e.target.checked);
  };

  const handleCheckboxChange = (e) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY_2, e.target.checked);
    setChecked(e.target.checked);
  };

  useEffect(() => {
    const getLocal = () => {
      let isOpen;
      let isChecked;

      const localSwitch = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      const localCheckbox = window.localStorage.getItem(LOCAL_STORAGE_KEY_2);
      if (localSwitch) {
        isOpen = JSON.parse(localSwitch);
      } else {
        isOpen = false;
      }

      if (localCheckbox) {
        isChecked = JSON.parse(localCheckbox);
      } else {
        isChecked = false;
      }

      return { isChecked, isOpen };
    };
    const { isOpen, isChecked } = getLocal();

    setOpen(isOpen);
    setChecked(isChecked);
  }, []);

  return (
    <div className="predictions-page">
      <ThemeProvider theme={theme}>
        <div className="toggle-predictions">
          <div className="toggle-table">
            <Switch
              checked={open}
              onChange={handleSwitchChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <span className="toggle-desc">Expand all</span>
          </div>
        </div>
        <div className="toggle-predictions">
          <div className="toggle-table">
            <Switch
              checked={checked}
              onChange={handleCheckboxChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <span className="toggle-desc">Show overall predictions</span>
          </div>
        </div>
      </ThemeProvider>
      <div className="predictions-list">
        {people.map((player) => (
          <PersonalPredictions
            key={player}
            player={player}
            open={open}
            checked={checked}
          />
        ))}
      </div>
    </div>
  );
};

export default Predictions;
