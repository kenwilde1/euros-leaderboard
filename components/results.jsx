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

import { EuiTab, EuiTabs, EuiIcon } from "@elastic/eui";

import { Switch, createTheme, ThemeProvider } from '@mui/material';

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
}

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

const Scores = (scores) => {
  return (
    <ol className="scores">
      {scores.scores
        .sort(sortingComparator)
        .map((player, index) => {
          const score = player.score === 0 ? 'N/A' : player.score + 'pts'
          return (
          <li className="leaderboard-position">
            <div className="leaderboard-name">
              <span className="medal"><Medal position={index} /></span>
              <span className="leaderboard-name">{player.name}</span>
            </div>
            <span className="leaderboard-score font-bold">{score}</span>
            </li>
          );
        })}
    </ol>
  )
}

const LOCAL_STORAGE_KEY = 'euros:advanced';

const ListItems = () => {
  const [scores, setScores] = useState([])
  const [selectedTabId, setSelectedTabId] = useState('table');
  const [results, setResults] = useState({})
  const [showAdvancedTable, setShowAdvancedTable] = useState()

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "results"));
      const items = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => a.match - b.match);

      const querySnapshot2 = await getDocs(collection(db, "scorers"));
      const items2 = querySnapshot2.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const lastResult = items[items.length -1];
      setResults(items);
      setScores(fetchTally(items, items2))
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

  console.log(lastResult);

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
      </ThemeProvider>}
      {selectedTabId === 'table' && showAdvancedTable &&
      <>
      <p className="lastUpdated">Last Updated by: {lastResult && lastResult.home} vs {lastResult && lastResult.away}</p>
        <AdvancedTable results={results}/></>
      }
      {selectedTabId === 'table' && !showAdvancedTable &&
      <>
      <p className="lastUpdated">Last Updated by: {lastResult && lastResult.home} vs {lastResult && lastResult.away}</p>
        <div className="border w-96 text-center p-4 leaderboard">
          <Scores scores={scores} />
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
