import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";
import Gallery from "../components/Gallery";
import EndingCard from "../components/EndingCard";
import { galleryVideos, storyTexts } from "../data/storyData";

export default function Story() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-pink-50 via-white to-rose-100 overflow-x-hidden">
      {/* Decorative Hearts Background Elements */}
      <div className="absolute top-1/4 left-10 w-24 h-24 bg-pink-200/20 rounded-full blur-xl pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-32 h-32 bg-rose-200/20 rounded-full blur-xl pointer-events-none" />

      {/* Header section */}
      <header className="pt-16 pb-8 text-center px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 bg-pink-100/60 backdrop-blur-sm border border-pink-200/30 px-4 py-1.5 rounded-full text-pink-600 text-sm font-semibold tracking-wide mb-4"
        >
          <Heart className="w-4 h-4 fill-current animate-pulse" />
          <span>Our Journey</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-poppins text-3xl md:text-5xl font-extrabold text-gray-800 tracking-tight"
        >
          Cerita Kita
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-poppins text-gray-500 mt-3 text-sm md:text-base max-w-md mx-auto"
        >
          setiap video punya kesan manisnya tersendiri dan selalu mengingatkan kita kepada masa itu
        </motion.p>
      </header>

      {/* Polaroid Gallery Component */}
      <div className="relative z-10">
        <Gallery videos={galleryVideos} />
      </div>

      {/* Scroll Down Nudge Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="flex flex-col items-center justify-center text-pink-400 mt-6 mb-20 cursor-pointer"
      >
        <span className="font-poppins text-xs font-semibold uppercase tracking-widest text-pink-500 mb-1">
          Scroll Down
        </span>
        <ChevronDown className="w-5 h-5 text-pink-500" />
      </motion.div>

      {/* Storytelling Timeline Section */}
      <section className="relative max-w-3xl mx-auto px-4 py-12">
        {/* Central Vertical Timeline Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-pink-200/50" />

        <div className="space-y-24 relative">
          {storyTexts.map((story, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={story.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col md:flex-row items-center w-full relative ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline center circle badge */}
                <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-white border-2 border-pink-300 rounded-full flex items-center justify-center shadow-md z-20">
                  <span className="text-lg">{story.emoji}</span>
                </div>

                {/* Left/Right Text Card */}
                <div className={`w-full md:w-1/2 px-2 md:px-8 mt-8 md:mt-0 ${
                  isEven ? "md:text-right" : "md:text-left"
                }`}>
                  <div className="bg-white/90 backdrop-blur-sm border border-pink-100 p-6 md:p-8 rounded-2xl shadow-md inline-block text-left w-full hover:shadow-lg transition-shadow duration-300">
                    <p className="font-poppins text-gray-700 text-sm md:text-base leading-relaxed">
                      {story.text}
                    </p>
                  </div>
                </div>

                {/* Empty element for column layout offset on md+ screens */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Final Proposal Ending Card Component */}
      <section className="py-20 relative">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-t from-rose-100 to-transparent pointer-events-none" />
        <EndingCard />
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-pink-100 bg-white/20 backdrop-blur-sm">
        <p className="font-poppins text-xs text-pink-400 font-medium">
          Dibuat dengan ❤️ untukmu
        </p>
      </footer>
    </div>
  );
}
