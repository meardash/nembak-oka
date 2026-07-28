import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingHearts({ count = 15, isBurst = false }) {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Function to create a single heart config
    const createHeart = (id) => ({
      id,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 24 + 12, // 12px to 36px
      duration: Math.random() * 4 + 4, // 4s to 8s
      delay: Math.random() * 2,
      xOffset: Math.random() * 100 - 50, // sway offset
      rotate: Math.random() * 45 - 22.5, // start rotation
    });

    if (isBurst) {
      // Create a batch of hearts for a burst effect
      const burstHearts = Array.from({ length: 40 }).map((_, i) => ({
        ...createHeart(`burst-${Date.now()}-${i}`),
        duration: Math.random() * 2 + 2, // Faster for burst
        delay: Math.random() * 0.5,
      }));
      setHearts(burstHearts);
    } else {
      // Continuous floating hearts
      const initialHearts = Array.from({ length: count }).map((_, i) => createHeart(i));
      setHearts(initialHearts);

      const interval = setInterval(() => {
        setHearts((prev) => [
          ...prev.slice(1),
          createHeart(Date.now()),
        ]);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [count, isBurst]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ 
              y: "110%", 
              x: 0, 
              opacity: 0, 
              scale: 0.5, 
              rotate: heart.rotate 
            }}
            animate={{ 
              y: "-15%", 
              x: heart.xOffset, 
              opacity: [0, 0.8, 0.8, 0], 
              scale: 1,
              rotate: heart.rotate + (Math.random() * 90 - 45)
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: heart.duration, 
              delay: heart.delay,
              ease: "easeOut"
            }}
            className="absolute bottom-0"
            style={{
              left: heart.left,
              width: heart.size,
              height: heart.size,
            }}
          >
            <svg
              className="w-full h-full text-pink-400 opacity-60 filter drop-shadow-md"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
