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

import { EuiTab, EuiTabs, EuiIcon } from "@elastic/eui";

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

const Scores = (scores) => {
  return (
    <ol>
      {scores.scores
        .sort((a, b) => b.score - a.score)
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

const ListItems = () => {
  const [scores, setScores] = useState([])
  const [selectedTabId, setSelectedTabId] = useState('table');
  const [lastResult, setLastResult] = useState({})

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "results"));
      const items = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => a.match - b.match);

      const querySnapshot2 = await getDocs(collection(db, "scorers"));
      const items2 = querySnapshot2.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const lastResult = items[items.length -1];
      setLastResult(lastResult);
      setScores(fetchTally(items, items2))
    }
    fetchItems()
  }, [])

  const onSelectedTabChanged = (id) => {
    setSelectedTabId(id);
  };

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

  return (
    <div className="container">
      <EuiTabs>{renderTabs()}</EuiTabs>
      {selectedTabId === 'table' && 
      <>
      <p className="lastUpdated">Last Updated by: {lastResult.home} vs {lastResult.away}</p>
      <div className="border w-96 text-center p-4 leaderboard">
        <Scores scores={scores} />
      </div></>}
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
