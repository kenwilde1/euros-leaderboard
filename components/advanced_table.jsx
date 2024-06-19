"use client";

import 'react-data-grid/lib/styles.css';

import DataGrid from 'react-data-grid';
import { useState, useEffect, useMemo } from 'react';

import dyl_w from "../data/dyl_w";
import stephen from "../data/stephen";
import alan from "../data/alan";
import hugh from "../data/hugh";
import kenny from "../data/kenny";
import philip from "../data/philip";
import david from "../data/david";
import shane from '../data/shane';

import fetchData from './utils/fetch_data';

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
      name: 'Pos',
      width: 10,
      frozen: true,
      headerCellClass: 'my-column'
    },
    {
      key: 'name',
      name: 'Name',
      width: 80,
      frozen: true
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
      name: 'GbTS',
      width: 60
    },
    {
      key: 'CGS',
      name: 'CGS'
    },
    {
      key: 'CR',
      name: 'CR'
    },
    {
      key: 'points',
      name: 'Points',
      width: 70
    },
    {
      key: 'RA',
      name: 'RA',
      columnMinWidth: '80px',
      cellClass: 'special-column',
      headerCellClass: 'special-column-header',
    },
    {
      key: 'PP',
      name: 'PP',
      columnMinWidth: '80px',
      cellClass: 'perfect-column',
      headerCellClass: 'perfect-column-header'
    },
  ];


  const sortingComparator = (a, b) => {
    if (b.points === a.points) {
      return a.name.localeCompare(b.name);
  } else {
      return b.points - a.points;
  }
  }

  function getComparator(sortColumn) {
    switch (sortColumn) {
      case 'name':
      case 'RA':
        return (a, b) => {
          return a[sortColumn].localeCompare(b[sortColumn]);
        };
      case 'GF':
      case 'GA':
      case 'GbTS':
      case 'CGS':
      case 'CR':
      case 'points':
      case 'PP':
      case 'id':
      case 'position':
        return (a, b) => {
          if (a[sortColumn] === b[sortColumn]) {
            return 0
          }

          if (a[sortColumn] > b[sortColumn]) {
            return 1;
          }

          if (a[sortColumn] < b[sortColumn]) {
            return -1;
          }
        };
      default:
        throw new Error(`Contact Kenny and tell him what you did!"`);
    }
  }

const AdvancedTable = ({ results = [] }) => {

  const [sortColumns, setSortColumns] = useState([]);

  const rows = fetchData(players, results)
  .sort(sortingComparator)
  .map((player, index) => {
    return {
      ...player,
      position: index + 1
    }
  })

  const sortedRows = useMemo(() => {
    if (sortColumns.length === 0) return rows;

    return [...rows].sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === 'ASC' ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [rows, sortColumns]);

    return (
      <>
      <div className=''>
        <DataGrid
            columns={columns}
            rows={sortedRows}
            className='rdg-light fill-grid data-grid'
            style={{ height: 'auto'}}
            defaultColumnOptions={{
              sortable: true,
              resizable: true
            }}
            sortColumns={sortColumns}
            onSortColumnsChange={setSortColumns}
            sx={{
              '@media (hover: none)': {
                '&& .MuiDataGrid-menuIcon': {
                  width: 0,
                  visibility: 'hidden',
                }
              },
              '&& .MuiDataGrid-columnHeader--sorted .MuiDataGrid-menuIcon': {
                width: 'auto',
                visibility: 'visible',
              }
            }}
        />
        </div>
        <div className='about'>
          <b>Advanced View</b>
          <ul>
            <span>
            <li><b>GF: </b>Goals For</li>
            <p>The number of goals scored by the team you chose as the best scoring.</p>
            <p><b><i>+1 point per goal scored</i></b></p>
            </span>
            <br />
            <span><li><b>GA: </b>Goals Against</li>
            <p>The number of goals conceded by the team you chose as the best defence.</p>
            <p><b><i>-1 point per goal conceded</i></b></p></span><br />
            <span><li><b>GbTS: </b>Goals by Top Scorer</li>
            <p>The number of goals scored by the player you chose as the top goalscorer.</p>
            <b><i>+3 points per goal scored</i></b></span><br />
            <span><li><b>CGS: </b>Correct Goals Scored</li>
            <p>The number of times you correctly guessed how many goals a team would score in a match.</p>
            <b><i>+1 point per correct no. of goals</i></b></span><br />
            <span><li><b>CR: </b>Correct Result</li>
            <p>The number of times you guessed the correct outcome of a game.</p>
            <b><i>+3 points per correct result</i></b></span><br />
            <span><li><b>RA: </b>Result Accuracy</li>
            <p>The percentage of matches you chose the correct result (win or draw).</p>
            </span><br />
            <span><li><b>PP: </b>Perfect Points</li>
            <p>The number of times you achieved the maximum available points for a game.</p></span><br/>
          </ul>
        </div>
        </>
    )
};

export default AdvancedTable;