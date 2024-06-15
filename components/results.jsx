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
  const [currentPage, setCurrentPage] = useState('results');

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "results"));
      const items = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      
      const querySnapshot2 = await getDocs(collection(db, "scorers"));
      const items2 = querySnapshot2.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      
      setScores(fetchTally(items, items2))
    }
    fetchItems()
  }, [])

  return (
    <div>
      <div className="nav text-small">
      <p onClick={() => setCurrentPage('results')}className={`${currentPage === 'results' ? 'active' : ''}`}>Table</p>
      <span> - </span>
      <p onClick={() => setCurrentPage('calc')} className={`${currentPage === 'calc' ? 'active' : ''}`}>Point Calculator</p>
      <span> - </span>
      <p onClick={() => setCurrentPage('pred')} className={`${currentPage === 'pred' ? 'active' : ''}`}>Predictions</p>
      </div>
      {currentPage === 'results' && <div className="border w-96 text-center p-4 leaderboard">
        <Scores scores={scores} />
      </div>}
      {currentPage === 'calc' &&<div className="border w-screen h-24 text-center p-4 calc">
        <Calculator />
      </div>}
      {currentPage === 'pred' &&<div className="border w-screen h-24 text-center p-4 calc">
        <Predictions />
      </div>}
    </div>
  )
}

export default ListItems
