"use client"

import { useEffect, useState } from "react"
import db from "../firebase/firestore"
import { collection, getDocs } from "@firebase/firestore"

import { fetchTally } from './utils/calculate_scores';

import gold from '../src/images/gold.svg';
import silver from '../src/images/silver.svg';
import bronze from '../src/images/bronze.svg';

import Calculator from "./calculator";
import Predictions from "./predictions";

import AdvancedTable from '../components/advanced_table';

import { EuiTab, EuiTabs, EuiIcon, EuiSpacer } from "@elastic/eui";

import { Switch, createTheme, ThemeProvider } from '@mui/material';

import fetchData from "./utils/fetch_data";

import players from "../data/players";

import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getLiveScore } from "./get_live_score";

const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          // Controls default (unchecked) color for the thumb
          color: "#ccc"
        },
        colorPrimary: {
          "&.Mui-checked": {
            // Controls checked color for the thumb
            color: "#A9A9A9"
          }
        },
        track: {
          // Controls default (unchecked) color for the track
          opacity: 0.2,
          backgroundColor: "#A9A9A9",
          ".Mui-checked.Mui-checked + &": {
            // Controls checked color for the track
            opacity: 0.7,
            backgroundColor: "#A9A9A9"
          }
        }
      }
    }
  }
});

const tabs = [
  {
    id: 'table',
    name: (
      <span>
        <EuiIcon type="visTable" />
        &nbsp;Table
      </span>
    ),
    disabled: false,
  },
  {
    id: 'pred',
    name: (
      <span>
        <EuiIcon type="eye" />
        &nbsp;Predictions
      </span>
    ),
    disabled: false,
  },
  {
    id: 'calc',
    name: (
      <span>
        <EuiIcon type="plus" />
        &nbsp;Calculator
      </span>
    ),
    disabled: false,
  },
];

const Medal = ({ position }) => {
  if (position === 0) {
    return <img src={gold.src} />
  } else if (position === 1) {
    return <img src={silver.src} />
  } else if (position === 2) {
    return <img src={bronze.src} />
  } else {
    return `${position + 1}.`;
  }
}

const sortingComparator = (a, b) => {
  if (b.score === a.score) {
    return a.name.localeCompare(b.name);
} else {
    return b.score - a.score;
}
}

export const getPositionUpdateLabel = (points) => {
  if (points > 0) {
      return <span className="pos-update pos-update-up">
        <FontAwesomeIcon icon={faAngleUp} color="green"/>
        {points}
        </span>
    } else if (points < 0) {
      return <span className="pos-update pos-update-down">
        <FontAwesomeIcon icon={faAngleDown} color="red"/>
        {Math.abs(points)}
        </span>
    }
  }

const Scores = ({ scores, positionUpdates }) => {
  return (
    <ol className="scores">
      {scores
        .sort(sortingComparator)
        .map((player, index) => {
          const score = player.score === 0 ? 'N/A' : player.score + 'pts'  
          return (
          <li className="leaderboard-position">
            <div className="leaderboard-name">
              <span className="medal"><Medal position={index} /></span>
              <span className="leaderboard-name">{player.name}</span>
              {getPositionUpdateLabel(positionUpdates[player.name])}
            </div>
            <span className="leaderboard-score font-bold">{score}</span>
            </li>
          );
        })}
    </ol>
  )
}
const sortingComparatorRows = (a, b) => {
  if (b.points === a.points) {
    return a.name.localeCompare(b.name);
} else {
    return b.points - a.points;
}
}
const LOCAL_STORAGE_KEY = 'euros:advanced';

const ListItems = () => {
  const [scores, setScores] = useState([])
  const [selectedTabId, setSelectedTabId] = useState('table');
  const [results, setResults] = useState({})
  const [showAdvancedTable, setShowAdvancedTable] = useState();
  const [scorers, setScorers] = useState({});
  const [positionUpdates, setPositionUpdates] =  useState({});

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "results"));
      const items = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => a.match - b.match);

      const querySnapshot2 = await getDocs(collection(db, "scorers"));
      const items2 = querySnapshot2.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const { scores, updatesToPositions } = fetchTally(items, items2);
      setPositionUpdates(updatesToPositions)
      setResults(items);
      setScorers(items2[0]);
      setScores(scores)
    }
    fetchItems();

    const getLocal = () => {
      const local = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        return JSON.parse(local);
      } else {
        return false;
      }
    }

    setShowAdvancedTable(getLocal())
  }, [])

  const onSelectedTabChanged = (id) => {
    setSelectedTabId(id);
  };

  const handleSwitchChange = (e) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, e.target.checked);
    setShowAdvancedTable(e.target.checked);
  }

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <EuiTab
        {...(tab.href && { href: tab.href, target: '_blank' })}
        onClick={() => onSelectedTabChanged(tab.id)}
        isSelected={tab.id === selectedTabId}
        disabled={tab.disabled}
        key={index}>
        {tab.name}
      </EuiTab>
    ));
  };

  const lastResult = results && results[results.length - 1];
  const resultsToConsider = results && results.length ? results.slice(17) : results;
  const rows = fetchData(players, resultsToConsider, results, scorers)
    .sort(sortingComparatorRows)
    .map((player, index) => {
      return {
        ...player,
        position: index + 1
      }
    })

    return (
    <div className="container">
      <EuiTabs>{renderTabs()}</EuiTabs>
      {selectedTabId === 'table' && <ThemeProvider theme={theme}>
      <div className='toggle-table'>
        <Switch
          checked={showAdvancedTable}
          onChange={handleSwitchChange}
        />
        <span className='toggle-desc'>Advanced View</span>
      </div>
      <EuiSpacer />
      </ThemeProvider>}
      {selectedTabId === 'table' && showAdvancedTable && Object.keys(positionUpdates).length &&
      <>
      {getLiveScore(lastResult && lastResult.id)}
      <EuiSpacer />
      <p className="lastUpdated">Last Updated by: {lastResult && lastResult.home} vs {lastResult && lastResult.away}</p>
        <AdvancedTable rows={rows} positionUpdates={positionUpdates} /></>
      }
      {selectedTabId === 'table' && !showAdvancedTable &&
      <>
      {getLiveScore(lastResult && lastResult.id)}
      <EuiSpacer />
      <p className="lastUpdated">Last Updated by: {lastResult && lastResult.home} vs {lastResult && lastResult.away}</p>
        <div className="border w-96 text-center p-4 leaderboard">
          <Scores scores={scores} positionUpdates={positionUpdates} />
        </div>
        </>
      }

      {selectedTabId === 'calc' &&<div className="border w-screen h-24 text-center p-4 calc">
        <Calculator />
      </div>}
      {selectedTabId === 'pred' &&<div className="border w-screen h-24 text-center p-4 calc">
        <Predictions />
      </div>}
    </div>
  )
}

export default ListItems
