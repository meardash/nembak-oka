import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Music, Volume2, VolumeX } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Audio source: Local file in public/music/shape-of-my-heart.mp3 or backup online stream
  const musicSrc = "/music/shape-of-my-heart.mp3";
  const fallbackSrc = "https://ia800706.us.archive.org/15/items/STING19930516/09_Shape_of_My_Heart.mp3";

  const tryPlayAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    // Immediate autoplay attempt
    tryPlayAudio();

    // Listen for any initial user interaction anywhere on the document to trigger autoplay if blocked by browser policy
    const handleUserInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        tryPlayAudio();
      }
    };

    const events = ["click", "touchstart", "pointerdown", "keydown", "scroll"];
    events.forEach((evt) => window.addEventListener(evt, handleUserInteraction, { passive: true }));

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handleUserInteraction));
    };
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => console.log("Audio toggle error:", err));
    }
  };

  const handleAudioError = () => {
    if (audioRef.current && audioRef.current.src !== fallbackSrc) {
      // Fallback to online stream if local mp3 is not found yet
      audioRef.current.src = fallbackSrc;
      tryPlayAudio();
    }
  };

  // Force loop playback when ended
  const handleEnded = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Replay error:", err));
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={musicSrc}
        autoPlay
        loop
        playsInline
        preload="auto"
        onCanPlay={tryPlayAudio}
        onEnded={handleEnded}
        onError={handleAudioError}
      />

      {/* Floating Music Control Widget */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
        <motion.button
          onClick={togglePlay}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-lg backdrop-blur-md border transition-all duration-300 cursor-pointer ${
            isPlaying
              ? "bg-pink-500/90 text-white border-pink-300 shadow-pink-500/30"
              : "bg-white/80 text-gray-700 border-pink-200 hover:bg-pink-50"
          }`}
          title={isPlaying ? "Jeda Musik" : "Putar Musik"}
        >
          {/* Animated Music Icon */}
          <div className="relative flex items-center justify-center">
            <Music className={`w-4 h-4 ${isPlaying ? "animate-bounce" : ""}`} />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-200 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
            )}
          </div>

          <span className="font-poppins text-xs font-semibold tracking-wide">
            {isPlaying ? "The Shape of My Heart 🎵" : "Putar Musik 🎵"}
          </span>

          {/* Sound wave / state indicator */}
          <div className="ml-1">
            {isPlaying ? (
              <Volume2 className="w-4 h-4 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 opacity-60" />
            )}
          </div>
        </motion.button>
      </div>
    </>
  );
}
