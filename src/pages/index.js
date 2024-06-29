"use client";

import ListItems from "../../components/results";

import banner from "../images/banner.png";

import localFont from "next/font/local";

const euroFont = localFont({
  src: [
    {
      path: "../../fonts/light.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/light.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../fonts/bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
});

export default function Home() {
  return (
    <main
      className={`flex flex-col items-center gap-12 p-24 ${euroFont.className}`}
    >
      <img className="banner" src={banner.src} />
      <h1 className="title text-2xl font-bold text-white">
        Euros 2024 Match Predictor
      </h1>
      <ListItems />
    </main>
  );
}
