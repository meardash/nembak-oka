import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import FloatingHearts from "../components/FloatingHearts";

export default function Landing() {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [noClicks, setNoClicks] = useState(0);

  const handleYes = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate("/story");
    }, 1200); // Wait for heart transition to finish
  };

  const handleNoClick = (e) => {
    e.preventDefault();
    if (noClicks < 3) {
      setNoClicks((prev) => prev + 1);
    }
  };

  // Calculate dynamic scales for both buttons
  const yesScale = 1 + noClicks * 0.35;
  const noScale = Math.max(0, 1 - noClicks * 0.33);

  // Return corresponding cute sticker gif based on rejection count
  const getGifUrl = () => {
    if (noClicks === 0) {
      return "https://media.tenor.com/y2hGhq544wAAAAPo/cute-cat-love.gif"; // default cute cat love
    }
    if (noClicks === 1) {
      return "https://media.tenor.com/u19c4d9F1EUAAAAM/peach-goma-sad.gif"; // sad peach/goma bear
    }
    if (noClicks === 2) {
      return "https://media.tenor.com/07s-n97D47YAAAAM/crying-sad.gif"; // crying peach/goma bear
    }
    return "https://media.tenor.com/83pZ3d4F7vMAAAAM/peach-goma.gif"; // begging/hugging peach/goma bear
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-pink-100 via-rose-50 to-white overflow-hidden px-4">
      {/* Persistent floating hearts in background */}
      <FloatingHearts count={12} />

      <AnimatePresence>
        {!isTransitioning ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-full max-w-lg bg-white/70 backdrop-blur-md border border-pink-100/50 p-8 md:p-12 rounded-3xl shadow-xl text-center relative z-10"
          >
            {/* Adorable character gif/sticker */}
            <div className="relative w-44 h-44 mx-auto mb-6 flex items-center justify-center overflow-hidden">
              <motion.img
                key={noClicks} // Triggers animation on GIF source update
                initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 12 }}
                src={getGifUrl()}
                alt="Cute Character Sticker"
                className="w-full h-full object-contain"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute top-2 right-2 text-pink-400"
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
            </div>

            {/* Title */}
            <h1 className="font-poppins text-2xl md:text-3xl font-extrabold text-gray-800 mb-10 leading-relaxed">
              aloo okaaa ❤️, aku ada sesuatu buat kamu nihhh, kamu gaakan bisa klik tombol nolak coba aja kalo bisa...
            </h1>

            {/* Buttons Row with dynamic scaling and transition */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[140px] px-4">
              {/* YES Button */}
              <motion.button
                animate={{ scale: yesScale }}
                whileHover={{ scale: yesScale * 1.08 }}
                whileTap={{ scale: yesScale * 0.95 }}
                onClick={handleYes}
                className="font-poppins bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold px-8 py-3.5 rounded-full shadow-md shadow-pink-500/20 text-base transition-colors duration-300 w-full sm:w-36 cursor-pointer z-20"
              >
                Yes ❤️
              </motion.button>

              {/* NO Button (shrinks and disappears after 3 clicks) */}
              {noClicks < 3 && (
                <motion.button
                  animate={{ scale: noScale }}
                  whileHover={{ scale: noScale * 0.95 }}
                  onClick={handleNoClick}
                  className="font-poppins border-2 border-pink-200 text-pink-600 hover:bg-pink-50/50 font-semibold px-8 py-3.5 rounded-full text-base bg-white/40 w-full sm:w-36 cursor-pointer z-10 transition-colors duration-300"
                >
                  No 🙈
                </motion.button>
              )}
            </div>
          </motion.div>
        ) : (
          /* Heart zoom transition */
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 50, 
              opacity: 1,
              transition: { duration: 1.2, ease: "easeInOut" }
            }}
            className="fixed z-50 pointer-events-none"
          >
            <svg
              className="text-pink-500 fill-current w-12 h-12"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

