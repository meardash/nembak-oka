import React, { useState } from "react";
import { motion } from "framer-motion";

export default function MovingButton({ children, className }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const moveButton = () => {
    // Generate random coordinate offsets
    // Using pixels is fine, but to keep it inside the container we can restrict it.
    // Let's generate a random translation between -150px and 150px.
    // This is relative to its initial position, which prevents it from flying off screen.
    const randomX = (Math.random() - 0.5) * 300;
    const randomY = (Math.random() - 0.5) * 300;

    // We can also ensure it doesn't get stuck in the exact same spot by adding a minimum distance
    const minDistance = 50;
    const adjustX = Math.abs(randomX) < minDistance ? (randomX < 0 ? -minDistance : minDistance) : randomX;
    const adjustY = Math.abs(randomY) < minDistance ? (randomY < 0 ? -minDistance : minDistance) : randomY;

    setPosition({ x: adjustX, y: adjustY });
  };

  return (
    <motion.button
      className={`${className} cursor-pointer touch-none select-none`}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12 }}
      onMouseEnter={moveButton}
      onMouseMove={moveButton}
      onTouchStart={(e) => {
        e.preventDefault();
        moveButton();
      }}
      onClick={(e) => {
        e.preventDefault();
        moveButton();
      }}
    >
      {children}
    </motion.button>
  );
}
