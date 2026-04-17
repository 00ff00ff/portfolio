"use client";

import { RigidBody } from "@react-three/rapier";

export default function Track() {
  return (
    <group>
      {/* Ground Plane */}
      <RigidBody type="fixed" friction={3} restitution={0}>
        <mesh receiveShadow position={[0, -0.5, 0]}>
          <boxGeometry args={[400, 1, 400]} />
          <meshStandardMaterial color="#4ade80" />
        </mesh>
      </RigidBody>

      {/* Main Track boundaries simulating a circle/oval */}
      {Array.from({ length: 40 }).map((_, i) => {
        const angle = (i / 40) * Math.PI * 2;
        const radius = 60; // Outer barrier
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <RigidBody key={`outer-${i}`} type="fixed" colliders="cuboid">
            <mesh castShadow receiveShadow position={[x, 1, z]} rotation={[0, -angle, 0]}>
              <boxGeometry args={[10, 3, 1]} />
              <meshStandardMaterial color={i % 2 === 0 ? "#ef4444" : "#ffffff"} />
            </mesh>
          </RigidBody>
        );
      })}

      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 30; // Inner barrier
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <RigidBody key={`inner-${i}`} type="fixed" colliders="cuboid">
            <mesh castShadow receiveShadow position={[x, 1, z]} rotation={[0, -angle, 0]}>
              <boxGeometry args={[10, 3, 1]} />
              <meshStandardMaterial color={i % 2 === 0 ? "#3b82f6" : "#ffffff"} />
            </mesh>
          </RigidBody>
        );
      })}

      {/* A ramp for floating physics fun */}
      <RigidBody type="fixed" colliders="hull" position={[0, 0, 45]}>
         <mesh receiveShadow castShadow rotation={[-Math.PI / 12, 0, 0]}>
            <boxGeometry args={[20, 2, 20]} />
            <meshStandardMaterial color="#f59e0b" />
         </mesh>
      </RigidBody>
    </group>
  );
}
