"use client";

import 'react-data-grid/lib/styles.css';

import DataGrid from 'react-data-grid';
import { useState, useEffect } from 'react';

import dyl_w from "../data/dyl_w";
import stephen from "../data/stephen";
import alan from "../data/alan";
import hugh from "../data/hugh";
import kenny from "../data/kenny";
import philip from "../data/philip";
import david from "../data/david";
import shane from '../data/shane';

import fetchData from './utils/fetch_data';
import { Switch, createTheme, ThemeProvider } from '@mui/material';

const players = {
    'Dylan W': dyl_w,
    'Stephen': stephen,
    'Alan': alan,
    'Hugh': hugh,
    'Kenny': kenny,
    'Philip': philip,
    'David': david,
    'Shane': shane
};

const columns = [
    {
      key: 'position',
      name: 'Position',
    },
    {
      key: 'name',
      name: 'Name',
      columnMinWidth: '80px'
    },
    {
      key: 'GF',
      name: 'GF',
      columnMinWidth: '80px'
    },
    {
        key: 'GA',
        name: 'GA',
        columnMinWidth: '80px'
    },
    {
      key: 'GbTS',
      name: 'GbTS'
    },
    {
      key: 'RA',
      name: 'RA',
      columnMinWidth: '80px'
    },
    {
      key: 'PP',
      name: 'PP',
      columnMinWidth: '80px'
    },
    {
      key: 'points',
      name: 'Points',
    }
  ];


  const sortingComparator = (a, b) => {
    if (b.points === a.points) {
      return a.name.localeCompare(b.name);
  } else {
      return b.points - a.points;
  }
  }

const AdvancedTable = ({ results = [] }) => {

  const rows = fetchData(players, results)
  .sort(sortingComparator)
  .map((player, index) => {
    return {
      ...player,
      position: index + 1
    }
  })

  console.log(rows);

    return (
      <>
      <div className='data-grid'>
        <DataGrid
            columns={columns}
            rows={rows}
            className='rdg-light'
            style={{ height: 'auto'}}
        />
        </div>
        <div className='about'>
          <b>Advanced View</b>
          <ul>
            <span>
            <li><b>GF: </b>Goals For</li>
            <p>The number of goals scored by the team you chose as the best scoring.</p></span>
            <span><li><b>GA: </b>Goals Against</li>
            <p>The number of goals conceded by the team you chose as the best defence.</p></span>
            <span><li><b>GbTS: </b>Goals by Top Scorer</li>
            <p>The number of goals scored by the player you chose as the top goalscorer.</p></span>
            <span><li><b>RA: </b>Result Accuracy</li>
            <p>The percentage of matches you chose the correct result (win or draw).</p></span>
            <span><li><b>PP: </b>Perfect Points</li>
            <p>The number of times you achieved the maximum available points for a game.</p></span>
          </ul>
        </div>
        </>
    )
};

export default AdvancedTable;