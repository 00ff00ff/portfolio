"use client";

import dynamic from "next/dynamic";
import { Loader } from "@react-three/drei";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Dynamically import Scene to avoid SSR issues with Canvas/WebGL
const Scene = dynamic(() => import("@/components/game/Scene"), { ssr: false });

export default function GamePage() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-black relative">
      <div className="absolute top-4 left-4 z-10 flex gap-4">
        <Link href="/" className="px-4 py-2 bg-white/10 glass hover:bg-white/20 text-white rounded-full flex items-center gap-2 backdrop-blur-md transition-colors">
          <ArrowLeft className="w-4 h-4" /> Wróć
        </Link>
        <div className="px-4 py-2 bg-black/40 text-white rounded-full text-sm flex items-center backdrop-blur-md border border-white/10">
          Sterowanie: W A S D / Strzałki, Spacja = Hamulec
        </div>
      </div>
      
      <Scene />
      <Loader />
    </div>
  );
}
