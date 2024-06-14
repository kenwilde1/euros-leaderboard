"use client"

import Image from "next/image";
import { Inter } from "next/font/google";

import ListItems from "./components/results";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex flex-col items-center gap-12 p-24 ${inter.className}`}
    >
      <h1 className="font-bold text-white">Euros 2024 Match Predicter</h1>
      <ListItems />
    </main>
  );
}
