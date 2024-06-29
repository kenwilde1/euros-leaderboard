"use client";

import ListItems from "../../components/results";

import banner from "../images/banner.png";

import localFont from "next/font/local";

import { useState } from "react";

import { EuiButtonGroup } from "@elastic/eui";

import logo from "../images/logo.jpeg";

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
      {/* <img className="banner" src={banner.src} /> */}
      <div className="header">
        <img src={logo.src} style={{ height: "125px" }} />
        <div className="header-title">
          <h1>Match</h1>
          <h1>Predictor</h1>
        </div>
      </div>
      {/* <h1 className="title text-2xl font-bold text-white">
        Euros 2024 Match Predictor
      </h1> */}
      <EuiButtonGroup
        className="navbar"
        legend="options to select table or prediction tabs"
        options={toggleButtons}
        idSelected={toggleIdSelected}
        onChange={(id) => setToggleIdSelected(id)}
        isFullWidth
      />
      <ListItems selectedTabId={toggleIdSelected} />
    </main>
  );
}
