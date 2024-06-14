"use client"

import { useEffect, useState } from "react"
import db from "../utils/firestore"
import { collection, getDocs } from "firebase/firestore"

import { fetchTally } from '../utils/calculate_scores';

import gold from '../../images/gold.svg';
import silver from '../../images/silver.svg';
import bronze from '../../images/bronze.svg';
import normal from '../../images/normal.png';

const Medal = ({ position }) => {
  console.log(position);
  if (position === 0) {
    return <img src={gold.src} />
  } else if (position === 1) {
    return <img src={silver.src} />
  } else if (position === 2) {
    return <img src={bronze.src} />
  } else {
    return <img src={normal.src} />
  }
}


const Scores = (scores) => {
  return (
    <ol>
      {scores.scores
        .sort((a, b) => b.score - a.score)
        .map((player, index) => {
          const score = player.score === 0 ? 'N/A' : player.score
          console.log(player.name, index);
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

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "results"));
      console.log(querySnapshot);
      const items = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setScores(fetchTally(items))
    }
    fetchItems()
  }, [])

  return (
    <div className="border w-96 text-center p-4 leaderboard">
      <Scores scores={scores} />
    </div>
  )
}

export default ListItems
