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

import { ViewOtherResults } from "./view_other_results";

import david from '../data/david.png'
import dylan from '../data/dylan.jpg';
import defaultOne from '../data/defaultOne.jpg';

import fixtures from "../data/fixtures";

const avatars = {
    Alan: defaultOne,
    David: david,
    Dylan: dylan,
    Stephen: defaultOne,
    Hugh: defaultOne,
    Philip: defaultOne,
    Shane: defaultOne,
    Kenny: defaultOne
}

const groupStageUpdates = [
  {
    id: 'group-stage',
    text: 'Group Winners and Runners Up',
    Stephen: 12,
    Hugh: 12,
    Philip: 14,
    Dylan: 16,
    Kenny: 10,
    Alan: 12,
    Shane: 10,
    David: 16
  },
  {
    id: 'group-stage',
    text: 'Best 3rd Place Teams',
    Stephen: 0,
    Hugh: 5,
    Philip: 0,
    Dylan: 0,
    Kenny: 0,
    Alan: 5,
    Shane: 0,
    David: 0
  },
]

const getLastUpdated = (lastResult) => {
  if (lastResult.id === 'group-stage') {
    return <span>{lastResult.text}</span>
  } else {
    return <>{lastResult && lastResult.home} vs {lastResult && lastResult.away}</>
  }
}

export const theme = createTheme({
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
    return <span>{`${position + 1}.`}</span>;
  }
}

const sortingComparator = (a, b) => {
  if (b.score === a.score) {
    return a.name.localeCompare(b.name);
} else {
    return b.score - a.score;
}
}

const getAvatar = (name) => {
  if (avatars[name] && avatars[name].src) {
    return <img className='avatar' src={avatars[name].src} />
  }

  return <span className="avatar"></span>
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

const Scores = ({ scores, positionUpdates, pointDiff }) => {
  return (
    <ol className="scores">
      {scores
        .sort(sortingComparator)
        .map((player, index) => {
          const score = player.score === 0 ? 'N/A' : player.score + 'pts'

          const pointDifference = pointDiff[player.name];
          let x = '';
          let pointDiffClass = '';

          if (pointDifference > 0) {
            x = `(+${pointDifference})`
            pointDiffClass = 'points-up'
          } else if (pointDifference < 0) {
            x = `(${pointDifference})`
            pointDiffClass = 'points-down'
          } else {
            x = `(+${pointDifference})`
            pointDiffClass = 'points-same'
          }

          return (
          <li className="leaderboard-position">
            <div className="leaderboard-name">
              <span className="medal"><Medal position={index} /></span>
              <span className="leaderboard-name">
                {getAvatar(player.name)}
                <b>{player.name}</b>
              </span>
              {getPositionUpdateLabel(positionUpdates[player.name])}
            </div>
            <span className="leaderboard-score font-bold">{score}<span className={`pointDiff ${pointDiffClass}`}>{' '}{x}</span></span>
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
  const [scorers, setScorers] = useState([]);
  const [positionUpdates, setPositionUpdates] =  useState({});
  const [pointDiff, setPointDiff] = useState({});
  const [lastResult, setLastResult] = useState();
  const [isHistorical, setIsHistorical] = useState(false);
  const [lengthOfAllResults, setLengthOfAllResults] = useState();

  const fetchItems = async (indexToSlice) => {
    const querySnapshot = await getDocs(collection(db, "results"));
    let items = querySnapshot.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .sort((a, b) => a.match - b.match);
    items.splice(36, 0, ...groupStageUpdates);
    const querySnapshot2 = await getDocs(collection(db, "scorers"));
    const items2 = querySnapshot2.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const { scores, updatesToPositions, pointDiff } = fetchTally(items, items2, indexToSlice);

    if (!indexToSlice) {
      setLengthOfAllResults(items.length);
    }

    setPointDiff(pointDiff);
    setPositionUpdates(updatesToPositions)
    if (indexToSlice !== undefined) {
      const newItems = items.slice(0, indexToSlice)
      setResults(newItems);
      setLastResult(newItems[newItems.length - 1])
    } else {
      setResults(items);
      setLastResult(items[items.length - 1])
    }

    setScorers(items2);
    setScores(scores)
  }

  useEffect(() => {
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

  const filterResults = (pos) => {
    if (pos === -1 && results.length === 1) {
      return;
    }

    if (pos === 1 && results.length === lengthOfAllResults) {
      return;
    }

    if (pos === undefined) {
      fetchItems();
      setIsHistorical(false);
    } else {
      const indexToSlice = results.length + pos;
      if (lengthOfAllResults === indexToSlice) {
        setIsHistorical(false);
      }
      if (indexToSlice !== undefined && indexToSlice > 0) {
        fetchItems(indexToSlice);
      } else if (indexToSlice !== undefined) {
        const newItems = results.slice(0, indexToSlice)
        const { scores, updatesToPositions, pointDiff } = fetchTally(results, scorers, indexToSlice);
        setPointDiff(pointDiff);
        setPositionUpdates(updatesToPositions)
        setResults(newItems);
        setLastResult(newItems[newItems.length - 1])
        setScores(scores);
      }
      if (lengthOfAllResults === indexToSlice) {
        setIsHistorical(false);
      } else {
        setIsHistorical(true)
      }
    }
  }

  const rows = fetchData(players, results, results, scorers[0])
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
      <EuiSpacer />
      {selectedTabId === 'table' && getLiveScore(lastResult && lastResult.id, isHistorical)}
      <EuiSpacer />
      {selectedTabId === 'table' && <ViewOtherResults filterResults={filterResults} />}
      <EuiSpacer />
      {selectedTabId === 'table' && <ThemeProvider theme={theme}>
      <div className='toggle-table'>
        <Switch
          checked={showAdvancedTable}
          onChange={handleSwitchChange}
        />
        <span className='toggle-desc'>Advanced View</span>
      </div>
      </ThemeProvider>}
      {selectedTabId === 'table' && showAdvancedTable && Object.keys(positionUpdates).length &&
      <>
      <p className="lastUpdated">Last Updated by: {lastResult && lastResult.home} vs {lastResult && lastResult.away}</p>
        <AdvancedTable rows={rows} positionUpdates={positionUpdates} /></>
      }
      {selectedTabId === 'table' && !showAdvancedTable &&
      <>
      <p className="lastUpdated">Last Updated by: {lastResult && getLastUpdated(lastResult)}</p>
        <div className="border w-96 text-center p-4 leaderboard">
          <Scores scores={scores} positionUpdates={positionUpdates} pointDiff={pointDiff} />
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
