import React, { useState } from "react";
import { motion as motionFramer, AnimatePresence as AnimatePresenceFramer } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles, X } from "lucide-react";
import FloatingHearts from "./FloatingHearts";
import { romanticPopup } from "../data/storyData";

export default function EndingCard() {
  const [accepted, setAccepted] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  const handleYesClick = () => {
    setAccepted(true);
    setShowBurst(true);

    // Trigger confetti explosions
    // Left side
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#ff69b4", "#ffb6c1", "#ff1493", "#fff"]
    });
    // Right side
    confetti({
      particleCount: 100,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#ff69b4", "#ffb6c1", "#ff1493", "#fff"]
    });

    // Fire continuous random bursts for a few seconds
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff69b4", "#ffb6c1"]
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff69b4", "#ffb6c1"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <div className="relative w-full max-w-xl mx-auto px-4 py-12 text-center z-10">
      {/* Conditionally render burst of floating hearts */}
      {showBurst && <FloatingHearts isBurst={true} />}

      <motionFramer.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="bg-white/80 backdrop-blur-md border border-pink-100 p-8 rounded-3xl shadow-xl relative overflow-hidden"
      >
        {/* Animated Background Pulse */}
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-50/30 to-transparent -z-10" />

        {/* Decorative Top Hearts */}
        <div className="flex justify-center space-x-2 mb-6">
          <motionFramer.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
          </motionFramer.div>
          <motionFramer.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
          >
            <Sparkles className="w-6 h-6 text-pink-400 fill-pink-300" />
          </motionFramer.div>
        </div>

        {/* Question Text */}
        <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
          Will you be my girlfriend, oka? ❤️
        </h2>

        <p className="font-poppins text-gray-500 text-sm md:text-base mb-8 max-w-sm mx-auto leading-relaxed">
          Aku seneng bangettt bisa ngabisin banyak momen indah bareng kamu. Mau ga kamu jadi bagian terindah selamanya buat aku seng sebagai pasangan hidup? ✨
        </p>

        {/* Yes Button */}
        <motionFramer.button
          onClick={handleYesClick}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="font-poppins bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold px-10 py-4 rounded-full shadow-lg shadow-pink-500/30 text-lg transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 mx-auto"
        >
          <Heart className="w-5 h-5 fill-current animate-pulse" />
          <span>Yes, I Will ❤️</span>
        </motionFramer.button>
      </motionFramer.div>

      {/* Romantic Modal Popup */}
      <AnimatePresenceFramer>
        {accepted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motionFramer.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-pink-100 overflow-hidden text-center"
            >
              {/* Modal Confetti & Hearts Deco */}
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-pink-100/40 rounded-full blur-xl" />
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-rose-100/40 rounded-full blur-xl" />
              
              <button
                onClick={() => setAccepted(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-pink-500 transition-colors p-1 rounded-full hover:bg-pink-50"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-pink-100 shadow-inner">
                <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-bounce" />
              </div>

              <h3 className="font-poppins text-2xl font-bold text-gray-800 mb-2">
                {romanticPopup.title}
              </h3>
              
              <div className="text-3xl mb-4 animate-bounce delay-150">
                {romanticPopup.celebrationEmoji}
              </div>

              <p className="font-poppins text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                {romanticPopup.message}
              </p>

              <button
                onClick={() => setAccepted(false)}
                className="font-poppins bg-pink-100 hover:bg-pink-200 text-pink-700 font-semibold px-6 py-2.5 rounded-full text-sm transition-all duration-300 w-full"
              >
                I Love You Too! 💕
              </button>
            </motionFramer.div>
          </div>
        )}
      </AnimatePresenceFramer>
    </div>
  );
}
