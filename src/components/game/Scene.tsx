"use client";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { KeyboardControls, Sky, Environment } from "@react-three/drei";
import Kart from "./Kart";
import Track from "./Track";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "w", "W"] },
  { name: "backward", keys: ["ArrowDown", "s", "S"] },
  { name: "left", keys: ["ArrowLeft", "a", "A"] },
  { name: "right", keys: ["ArrowRight", "d", "D"] },
  { name: "brake", keys: ["Space"] },
];

export default function Scene() {
  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        {/* Environment & Lighting */}
        <color attach="background" args={["#87ceeb"]} />
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[50, 50, 50]} 
          intensity={1.5} 
        />
        
        {/* Physics engine running the game */}
        <Physics gravity={[0, -20.81, 0]}>
          <Track />
          <Kart position={[0, 2, 0]} />
        </Physics>
      </Canvas>
    </KeyboardControls>
  );
}
