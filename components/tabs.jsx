import { EuiIcon } from "@elastic/eui";
import React from "react";

export const tabs = [
  {
    id: "table",
    name: (
      <span>
        <EuiIcon type="visTable" />
        &nbsp;Table
      </span>
    ),
    disabled: false,
  },
  {
    id: "pred",
    name: (
      <span>
        <EuiIcon type="eye" />
        &nbsp;Predictions
      </span>
    ),
    disabled: false,
  },
  {
    id: "calc",
    name: (
      <span>
        <EuiIcon type="plus" />
        &nbsp;Calculator
      </span>
    ),
    disabled: false,
  },
];
