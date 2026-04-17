"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function InteractiveWhale() {
  const mouseX = useMotionValue(500);
  const mouseY = useMotionValue(500);

  // Very soft springs to make the whale feel heavy and slow (like swimming)
  const springX = useSpring(mouseX, { stiffness: 5, damping: 10, mass: 2.5 });
  const springY = useSpring(mouseY, { stiffness: 5, damping: 10, mass: 2.5 });

  const [direction, setDirection] = useState(-1); // -1 means facing left (default for 🐋)

  useEffect(() => {
    // Set initial position to center of screen avoiding 0,0 flicker
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by roughly half the size of the whale to center it on cursor
      mouseX.set(e.clientX - 60);
      mouseY.set(e.clientY - 60);
      
      if (e.movementX > 1) setDirection(1); // Moving right -> flip horizontally
      else if (e.movementX < -1) setDirection(-1); // Moving left -> natural orientation
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-0 pointer-events-none select-none"
      style={{
        x: springX,
        y: springY,
      }}
    >
      <motion.div
        animate={{ 
          scaleX: direction === 1 ? -1 : 1, // Flip the whale based on direction
          y: [0, -20, 0], // Gentle bobbing motion
          rotate: [0, direction === 1 ? -5 : 5, 0] // Slight rotation while bobbing
        }}
        transition={{
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          },
          rotate: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          },
          scaleX: {
            duration: 0.8,
            ease: "easeInOut" // Smooth turning around
          }
        }}
        className="text-[120px] opacity-10 filter blur-[1px] hover:opacity-20 transition-opacity duration-1000"
      >
        🐋
      </motion.div>
    </motion.div>
  );
}
