"use client";

import { useEffect, useState } from "react";
import db from "../firebase/firestore";
import { collection, getDocs } from "@firebase/firestore";

import { fetchTally } from "./utils/calculate_scores";

import gold from "../src/images/gold.svg";
import silver from "../src/images/silver.svg";
import bronze from "../src/images/bronze.svg";

import Predictions from "./predictions";

import AdvancedTable from "../components/advanced_table";

import { EuiSpacer } from "@elastic/eui";

import { Switch, createTheme, ThemeProvider } from "@mui/material";

import fetchData from "./utils/fetch_data";

import players from "../data/players";

import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ViewOtherResults } from "./view_other_results";

import david from "../data/david.png";
import dylan from "../data/dylan.jpg";
import hugh from "../data/hugh.png";
import alan from "../data/alan.jpg";
import shane from "../data/shane.jpg";
import phil from "../data/phil.jpg";
import stephen from "../data/stephen.jpg";
import kenny from "../data/kenny.jpg";

import france from "../data/france.png";
import england from "../data/england.png";
import portugal from "../data/portugal.png";

const winners = {
  David: france,
  Philip: france,
  Shane: portugal,
  Stephen: portugal,
  Alan: france,
  Dylan: england,
  Hugh: france,
  Kenny: france,
};

const avatars = {
  Alan: alan,
  David: david,
  Dylan: dylan,
  Stephen: stephen,
  Hugh: hugh,
  Philip: phil,
  Shane: shane,
  Kenny: kenny,
};

const groupStageUpdates = [
  {
    id: "group-stage",
    text: "Group Winners and Runners Up",
    Stephen: 12,
    Hugh: 12,
    Philip: 14,
    Dylan: 16,
    Kenny: 10,
    Alan: 12,
    Shane: 10,
    David: 16,
  },
  {
    id: "group-stage",
    text: "Best 3rd Place Teams",
    Stephen: 0,
    Hugh: 5,
    Philip: 0,
    Dylan: 0,
    Kenny: 0,
    Alan: 5,
    Shane: 0,
    David: 0,
  },
];

const getLastUpdated = (lastResult) => {
  if (lastResult.id === "group-stage") {
    return <span>{lastResult.text}</span>;
  } else {
    return (
      <>
        {lastResult && lastResult.home} vs {lastResult && lastResult.away}
      </>
    );
  }
};

export const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          // Controls default (unchecked) color for the thumb
          color: "#ccc",
        },
        colorPrimary: {
          "&.Mui-checked": {
            // Controls checked color for the thumb
            color: "#A9A9A9",
          },
        },
        track: {
          // Controls default (unchecked) color for the track
          opacity: 0.2,
          backgroundColor: "#A9A9A9",
          ".Mui-checked.Mui-checked + &": {
            // Controls checked color for the track
            opacity: 0.7,
            backgroundColor: "#A9A9A9",
          },
        },
      },
    },
  },
});

const Medal = ({ position }) => {
  if (position === 0) {
    return <img src={gold.src} />;
  } else if (position === 1) {
    return <img src={silver.src} />;
  } else if (position === 2) {
    return <img src={bronze.src} />;
  } else {
    return (
      <span>
        <b>{`${position + 1}.`}</b>
      </span>
    );
  }
};

const sortingComparator = (a, b) => {
  if (b.score === a.score) {
    return a.name.localeCompare(b.name);
  } else {
    return b.score - a.score;
  }
};

const getAvatar = (name) => {
  if (avatars[name] && avatars[name].src) {
    return (
      <div>
        <img className="avatar" src={avatars[name].src} />
        <div className="flag">
          <img src={winners[name].src} height="30" width="30" />
        </div>
      </div>
    );
  }

  return <span></span>;
};

export const getPositionUpdateLabel = (points) => {
  if (points > 0) {
    return (
      <span className="pos-update pos-update-up">
        <FontAwesomeIcon icon={faAngleUp} color="green" />
        {points}
      </span>
    );
  } else if (points < 0) {
    return (
      <span className="pos-update pos-update-down">
        <FontAwesomeIcon icon={faAngleDown} color="red" />
        {Math.abs(points)}
      </span>
    );
  }
};

const Scores = ({ scores, positionUpdates, pointDiff }) => {
  return (
    <ol className="scores">
      {scores.sort(sortingComparator).map((player, index) => {
        const score = player.score === 0 ? "N/A" : player.score + "pts";

        const pointDifference = pointDiff[player.name];
        let x = "";
        let pointDiffClass = "";
        if (pointDifference > 0) {
          x = `+${pointDifference}`;
          pointDiffClass = "points-up";
        } else if (pointDifference < 0) {
          x = `${pointDifference}`;
          pointDiffClass = "points-down";
        } else {
          x = `+${pointDifference}`;
          pointDiffClass = "points-same";
        }

        const name = player.name === "Stephen" ? "Ste" : player.name;

        return (
          <li className="leaderboard-position">
            <div className="leaderboard-name">
              <span className="medal">
                <Medal position={index} />
              </span>
              <span className="leaderboard-name">
                {getAvatar(player.name)}
                {name}
              </span>
              {getPositionUpdateLabel(positionUpdates[player.name])}
            </div>
            <div className="leaderboard-score">
              <span>{score}</span>
              <div className={`pointDiff ${pointDiffClass}`}>
                <b> {x}</b>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
};
const sortingComparatorRows = (a, b) => {
  if (b.points === a.points) {
    return a.name.localeCompare(b.name);
  } else {
    return b.points - a.points;
  }
};
const LOCAL_STORAGE_KEY = "euros:advanced";

const ListItems = ({ selectedTabId }) => {
  const [scores, setScores] = useState([]);
  const [results, setResults] = useState({});
  const [showAdvancedTable, setShowAdvancedTable] = useState();
  const [positionUpdates, setPositionUpdates] = useState({});
  const [pointDiff, setPointDiff] = useState({});
  const [lastResult, setLastResult] = useState();
  const [isHistorical, setIsHistorical] = useState(false);
  const [lengthOfAllResults, setLengthOfAllResults] = useState();

  const fetchItems = async (indexToSlice) => {
    try {
      // Fetch results
      const resultsSnapshot = await getDocs(collection(db, "results"));
      let items = resultsSnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => a.match - b.match);

      // Insert groupStageUpdates at index 36
      items.splice(36, 0, ...groupStageUpdates);

      // Process tally
      const { scores, updatesToPositions, pointDiff } = fetchTally(
        items,
        indexToSlice
      );

      // Set state for tally results
      setPointDiff(pointDiff);
      setPositionUpdates(updatesToPositions);
      setScores(scores);

      // Update results based on indexToSlice
      if (indexToSlice !== undefined) {
        const newItems = items.slice(0, indexToSlice);
        setResults(newItems);
        setLastResult(newItems[newItems.length - 1]);
      } else {
        setResults(items);
        setLastResult(items[items.length - 1]);
        setLengthOfAllResults(items.length);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();

    const getLocal = () => {
      const local = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        return JSON.parse(local);
      } else {
        return false;
      }
    };

    setShowAdvancedTable(getLocal());
  }, []);

  const handleSwitchChange = (e) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, e.target.checked);
    setShowAdvancedTable(e.target.checked);
  };

  const filterResults = (pos) => {
    const currentLength = results.length;

    // Exit conditions
    if (
      (pos === -1 && currentLength === 1) ||
      (pos === 1 && currentLength === lengthOfAllResults)
    ) {
      return;
    }

    // Fetch all items if pos is undefined
    if (pos === undefined) {
      fetchItems();
      setIsHistorical(false);
      return;
    }

    const indexToSlice = currentLength + pos;

    // Check if the index to slice reaches the total length of results
    if (lengthOfAllResults === indexToSlice) {
      setIsHistorical(false);
    } else {
      setIsHistorical(true);
    }

    // Fetch or slice items based on the calculated index
    if (indexToSlice > 0) {
      fetchItems(indexToSlice);
    } else {
      const newItems = results.slice(0, indexToSlice);
      const { scores, updatesToPositions, pointDiff } = fetchTally(
        results,
        indexToSlice
      );

      // Update state with new values
      setPointDiff(pointDiff);
      setPositionUpdates(updatesToPositions);
      setResults(newItems);
      setLastResult(newItems[newItems.length - 1]);
      setScores(scores);
    }
  };

  const rows = fetchData(players, results, results)
    .sort(sortingComparatorRows)
    .map((player, index) => {
      return {
        ...player,
        position: index + 1,
      };
    });

  const renderLastUpdated = () => (
    <div className="lastUpdated">
      <ThemeProvider theme={theme}>
        <div>
          <Switch
            checked={showAdvancedTable}
            onChange={handleSwitchChange}
            size="small"
          />
          <span className="toggle-desc">Advanced</span>
        </div>
      </ThemeProvider>
      <div className="last-updated-text">
        Latest update: {lastResult && getLastUpdated(lastResult)}
      </div>
    </div>
  );

  const renderScores = () => (
    <div className="border w-96 text-center p-4 leaderboard">
      <Scores
        scores={scores}
        positionUpdates={positionUpdates}
        pointDiff={pointDiff}
      />
    </div>
  );

  const renderAdvancedTable = () => (
    <>
      {renderLastUpdated()}
      <AdvancedTable rows={rows} positionUpdates={positionUpdates} />
    </>
  );

  const renderTableContent = () => (
    <>
      <ViewOtherResults filterResults={filterResults} />
      <EuiSpacer />
      {showAdvancedTable && Object.keys(positionUpdates).length ? (
        <>{renderAdvancedTable()}</>
      ) : (
        <>
          {renderLastUpdated()}
          {renderScores()}
        </>
      )}
    </>
  );

  const renderContent = () => {
    switch (selectedTabId) {
      case "table":
        return <>{renderTableContent()}</>;
      case "pred":
        return (
          <div className="border w-screen h-24 text-center p-4 calc">
            <Predictions />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <EuiSpacer />
      {renderContent()}
    </div>
  );
};

export default ListItems;
