"use client";

import 'react-data-grid/lib/styles.css';

import DataGrid from 'react-data-grid';

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


const AdvancedTable = ({ rows }) => {
    return (
      <>
      <div className=''>
        <DataGrid
            columns={columns}
            rows={rows}
            className='rdg-light fill-grid data-grid'
            style={{ height: 'auto'}}

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