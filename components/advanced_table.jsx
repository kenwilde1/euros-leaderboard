"use client";

import "react-data-grid/lib/styles.css";

import DataGrid from "react-data-grid";

import About from "./about";

import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Label = ({ points }) => {
  if (points > 0) {
    return (
      <>
        <FontAwesomeIcon icon={faAngleUp} color="green" />
        <span className="pos-update-up">{points}</span>
      </>
    );
  } else if (points < 0) {
    return (
      <>
        <FontAwesomeIcon icon={faAngleDown} color="red" />
        <span className="pos-update-down">{Math.abs(points)}</span>
      </>
    );
  }
};

function renderName({ row, positionUpdates }) {
  const name = row.row.name;

  return (
    <div>
      {name} <Label points={positionUpdates[name]} />
    </div>
  );
}

const columns = [
  {
    key: "position",
    name: "Pos",
    width: 10,
    frozen: true,
    headerCellClass: "my-column",
  },
  {
    key: "name",
    name: "Name",
    width: 95,
    frozen: true,
  },
  {
    key: "GF",
    name: "GF",
    columnMinWidth: "80px",
  },
  {
    key: "GA",
    name: "GA",
    columnMinWidth: "80px",
  },
  {
    key: "GbTS",
    name: "GbTS",
    width: 60,
  },
  {
    key: "CGS",
    name: "CGS",
  },
  {
    key: "CR",
    name: "CR",
  },
  {
    key: "points",
    name: "Points",
    width: 70,
  },
  {
    key: "RA",
    name: "RA",
    columnMinWidth: "80px",
    cellClass: "special-column",
    headerCellClass: "special-column-header",
  },
  {
    key: "PP",
    name: "PP",
    columnMinWidth: "80px",
    cellClass: "perfect-column",
    headerCellClass: "perfect-column-header",
  },
];

const AdvancedTable = ({ rows, positionUpdates }) => {
  columns[1].renderCell = (row) => renderName({ row, positionUpdates });

  return (
    <>
      <div className="">
        <DataGrid
          columns={columns}
          rows={rows}
          className="rdg-light fill-grid data-grid"
          style={{ height: "auto" }}
        />
      </div>
      <About />
    </>
  );
};

export default AdvancedTable;
