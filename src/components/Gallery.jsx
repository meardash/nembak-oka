import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

export default function Gallery({ videos }) {
  const [activeVideo, setActiveVideo] = useState(null);
  
  // We can define a few random rotations for the Polaroid effect
  const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-3", "rotate-3"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 py-8"
      >
        {videos.map((video, index) => {
          // Pick a rotation based on index to create a natural scattered polaroid look
          const rotClass = rotations[index % rotations.length];
          
          return (
            <motion.div
              key={video.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                rotate: 0,
                zIndex: 10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              onClick={() => setActiveVideo(video)}
              className={`bg-white p-4 pb-8 rounded-lg shadow-md border border-pink-100/50 transform ${rotClass} transition-shadow duration-300 cursor-pointer`}
            >
              {/* Polaroid Tape Accent */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-pink-100/60 backdrop-blur-sm -rotate-1 rounded border-b border-pink-200/20" />
              
              {/* Video Thumbnail Container */}
              <div className="w-full aspect-square overflow-hidden rounded bg-pink-50 relative group">
                <video
                  src={`${video.url}#t=0.1`}
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover blur-sm group-hover:blur-none transition-all duration-500 transform group-hover:scale-105"
                />
                
                {/* Play Icon Overlay */}
                <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px] group-hover:bg-black/15 transition-all duration-300 flex flex-col items-center justify-center gap-2">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors duration-300"
                  >
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </motion.div>
                  <span className="text-white text-xs font-poppins font-medium bg-black/40 px-2.5 py-0.5 rounded-full backdrop-blur-sm shadow-sm">
                    Klik untuk putar 🎥
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="mt-4 text-center">
                <p className="font-poppins text-sm text-pink-600 font-medium tracking-wide">
                  {video.caption}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Cinematic Fullscreen Video Modal Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative w-full max-w-4xl bg-zinc-950 rounded-2xl p-2 shadow-2xl border border-zinc-800/50 flex flex-col items-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 right-0 text-white/70 hover:text-pink-400 hover:bg-white/10 p-2 rounded-full transition-colors flex items-center gap-1 text-sm font-medium font-poppins"
              >
                <X className="w-5 h-5" />
                <span>Tutup</span>
              </button>

              {/* Active HTML5 Video Player with controls & autoPlay */}
              <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-inner">
                <video
                  src={activeVideo.url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Caption Text */}
              <div className="py-4 text-center px-4 w-full">
                <p className="font-poppins text-base md:text-lg text-pink-200 font-medium tracking-wide">
                  {activeVideo.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

