"use client"

import Image from "next/image";
import { Inter } from "next/font/google";

import ListItems from "../../components/results";

import banner from '../images/banner.png';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex flex-col items-center gap-12 p-24 ${inter.className}`}
    >
      <img className="banner" src={banner.src} />
      <h1 className="title text-2xl font-bold text-white">Euros 2024 Match Predictor</h1>
      <ListItems />
    </main>
  );
}
