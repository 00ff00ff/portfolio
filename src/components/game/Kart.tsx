"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

export default function Kart({ position = [0, 2, 0] }: { position?: [number, number, number] }) {
  const bodyRef = useRef<RapierRigidBody>(null);
  
  // Custom manual mouse tracking ref using CAPTURE phase because R3F swallows bubbling events on Canvas
  const mousePos = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
       mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
       mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1; // Top is +1, bottom is -1
    };
    
    // Using {capture: true} guarantees the window intercepts the raw stream before any Canvas overlay blocks it!
    window.addEventListener('pointermove', onPointerMove as EventListener, { capture: true });
    return () => window.removeEventListener('pointermove', onPointerMove as EventListener, { capture: true });
  }, []);

  // Arcade Kart Settings
  // Acceleration was too weak to overcome standard physics Engine Friction (box dragging on floor)
  const acceleration = 6000;
  const turnSpeed = 2.5;

  // Smoothing camera and preventing GC pressure by reusing vectors
  const currentCameraPos = useRef(new THREE.Vector3(0, 10, 20));
  const currentLookAt = useRef(new THREE.Vector3(0, 2, 0));
  
  // Reusable objects for physics mathematically calculated per frame to avoid memory leaks
  const objects = useMemo(() => ({
    euler: new THREE.Euler(),
    quat: new THREE.Quaternion(),
    direction: new THREE.Vector3(),
    offset: new THREE.Vector3(),
    idealLookAt: new THREE.Vector3(),
    idealCameraPos: new THREE.Vector3()
  }), []);

  // Track first frame to snap camera gracefully
  const isFirstFrame = useRef(true);

  useFrame((state, delta) => {
    // If physics aren't ready, skip
    if (!bodyRef.current) return;
    
    // Safety clamp for extreme lag spikes which causes physics impulse to explode WebGL contexts
    const safeDelta = Math.min(delta, 0.1); 

    const currentVel = bodyRef.current.linvel();
    const currentRot = bodyRef.current.rotation(); 

    if (!currentVel || !currentRot) return;
    
    objects.quat.set(currentRot.x, currentRot.y, currentRot.z, currentRot.w);
    // Critical: avoid dividing by zero if Rapier outputs an invalid quaternion
    if (objects.quat.lengthSq() === 0) {
        objects.quat.identity();
    } else {
        objects.quat.normalize();
    }
    
    objects.euler.setFromQuaternion(objects.quat);
    
    const speed = Math.sqrt(currentVel.x ** 2 + currentVel.z ** 2);

    // --- MOUSE CONTROLS --- 
    // Normalized device coordinates tracked by window listener:
    const px = mousePos.current.x;
    const py = mousePos.current.y;
    
    let isAccelerating = false;
    let thrust = 0;
    
    // Y-axis gives acceleration: Top half moves forward, bottom half reverses/stops
    if (py > 0.1) {
       thrust = acceleration * py; 
       isAccelerating = true;
    } else if (py < -0.1) {
       thrust = acceleration * py; // negative = backward
       isAccelerating = true;
    }

    // Turn logic using Torque based on mouse X position
    if (speed > 1 && Math.abs(px) > 0.05) { 
      const drivingReverse = currentVel.x * Math.sin(objects.euler.y) + currentVel.z * Math.cos(objects.euler.y) > 0;
      let turnDir = px > 0 ? -1 : 1; // pointer > 0 (right side of screen) means turn right (negative torque)
      
      let torque = 8000 * Math.abs(px) * turnDir;
      if (drivingReverse) torque *= -1; // Reverse steering when driving backward
      
      bodyRef.current.applyTorqueImpulse({ x: 0, y: torque * safeDelta, z: 0 }, true);
    }

    objects.direction.set(0, 0, -1).applyEuler(objects.euler);

    // Determine damping and apply engine impulse
    if (!isAccelerating && speed > 2) {
       // Stop accelerating -> natural brake
       bodyRef.current.setLinearDamping(3); 
    } else {
       bodyRef.current.setLinearDamping(1.0); 
       if (thrust !== 0) {
         const mass = bodyRef.current.mass();
         const impulseVal = thrust * mass * safeDelta;
         bodyRef.current.applyImpulse({ 
           x: objects.direction.x * impulseVal, 
           y: 0, 
           z: objects.direction.z * impulseVal 
         }, true);
       }
    }

    // CHASE CAMERA 
    const kartPos = bodyRef.current.translation();
    
    // Sanity check to avoid Infinity/NaN feeding
    if (isNaN(kartPos.x) || isNaN(kartPos.y) || isNaN(kartPos.z)) {
       return; 
    }

    objects.offset.set(0, 4, 12).applyEuler(objects.euler);
    
    objects.idealCameraPos.set(kartPos.x, kartPos.y, kartPos.z).add(objects.offset);
    objects.idealLookAt.set(kartPos.x, kartPos.y, kartPos.z).add(objects.direction.multiplyScalar(10));
    
    // Bulletproof NaN safety check before copying ANY values to the global camera
    if (
      isNaN(objects.idealCameraPos.x) || isNaN(objects.idealCameraPos.y) || isNaN(objects.idealCameraPos.z) ||
      isNaN(objects.idealLookAt.x) || isNaN(objects.idealLookAt.y) || isNaN(objects.idealLookAt.z)
    ) {
      return;
    }

    if (isFirstFrame.current) {
       currentCameraPos.current.copy(objects.idealCameraPos);
       currentLookAt.current.copy(objects.idealLookAt);
       isFirstFrame.current = false;
    } else {
       currentCameraPos.current.lerp(objects.idealCameraPos, 5 * safeDelta);
       currentLookAt.current.lerp(objects.idealLookAt, 10 * safeDelta);
    }

    state.camera.position.copy(currentCameraPos.current);
    state.camera.lookAt(currentLookAt.current);
  });

  return (
    <RigidBody
      ref={bodyRef}
      position={position}
      colliders="cuboid"
      mass={500}
      restitution={0.2}
      friction={0}
      angularDamping={10}
      enabledRotations={[false, true, false]}
    >
      <group>
        {/* Chassis */}
        <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
          <boxGeometry args={[2.5, 0.8, 4]} />
          <meshStandardMaterial color="#8b5cf6" />
        </mesh>
        
        {/* Cockpit */}
        <mesh castShadow receiveShadow position={[0, 1.2, -0.5]}>
          <boxGeometry args={[1.8, 0.8, 1.5]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        
        {/* Wheels */}
        <mesh castShadow position={[-1.4, 0.4, -1.2]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.5, 0.5, 0.4, 16]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh castShadow position={[1.4, 0.4, -1.2]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.5, 0.5, 0.4, 16]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh castShadow position={[-1.4, 0.4, 1.2]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.5, 0.5, 0.4, 16]} /><meshStandardMaterial color="#111" /></mesh>
        <mesh castShadow position={[1.4, 0.4, 1.2]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.5, 0.5, 0.4, 16]} /><meshStandardMaterial color="#111" /></mesh>
      </group>
    </RigidBody>
  );
}
