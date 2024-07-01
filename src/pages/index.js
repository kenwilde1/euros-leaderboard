"use client";

import ListItems from "../../components/results";

import localFont from "next/font/local";

import { useState } from "react";

import { EuiButton, EuiButtonGroup, EuiSpacer } from "@elastic/eui";

import logo from "../images/logo.jpeg";
import { LiveFixtures } from "../../components/live_score";

const toggleButtons = [
  {
    id: `table`,
    label: "Table",
  },
  {
    id: `pred`,
    label: "Predictions",
  },
];

const euroFont = localFont({
  src: [
    {
      path: "../../fonts/book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/light.woff2",
      weight: "400",
      style: "italic",
    },
    // {
    //   path: "../../fonts/book.woff2",
    //   weight: "500",
    //   style: "italic",
    // },
    {
      path: "../../fonts/bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
});

export default function Home() {
  const [toggleIdSelected, setToggleIdSelected] = useState("table");

  return (
    <main className={`flex flex-col items-center pt-8 ${euroFont.className}`}>
      <div className="header">
        <img src={logo.src} style={{ height: "125px" }} />
        <div className="header-title">
          <h1>MATCH</h1>
          <h1>PREDICTOR</h1>
        </div>
      </div>
      <div className="navbar">
        <EuiButton
          className={`table-button ${
            toggleIdSelected === "table" ? "isSelected" : ""
          }`}
          onClick={() => setToggleIdSelected("table")}
          fill
        >
          Table
        </EuiButton>
        <EuiButton
          className={`table-button ${
            toggleIdSelected === "pred" ? "isSelected" : ""
          }`}
          onClick={() => setToggleIdSelected("pred")}
          fill
        >
          Predictions
        </EuiButton>
      </div>
      <LiveFixtures />
      <ListItems selectedTabId={toggleIdSelected} />
    </main>
  );
}
