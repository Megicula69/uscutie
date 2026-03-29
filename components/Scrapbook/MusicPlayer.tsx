"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, MusicIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SONGS = [
  { id: "1", title: "Our Love Theme", artist: "Romantic Bears", color: "bg-red-400" },
  { id: "2", title: "Cozy Afternoons", artist: "Mochi & Brownie", color: "bg-blue-400" },
  { id: "3", title: "Starry Night", artist: "Eternal Hugs", color: "bg-purple-400" },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => (prev < 100 ? prev + 0.5 : 0));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextSong = () => { setCurrentSong((prev) => (prev + 1) % SONGS.length); setProgress(0); };
  const prevSong = () => { setCurrentSong((prev) => (prev - 1 + SONGS.length) % SONGS.length); setProgress(0); };

  return (
    <div className="w-full max-w-lg mx-auto py-12 px-6">
      {/* Cassette Tape UI */}
      <motion.div 
        animate={isPlaying ? { rotate: [0, 0.5, -0.5, 0] } : {}}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-full aspect-[1.6/1] bg-soft-brown rounded-xl p-4 shadow-2xl relative overflow-hidden flex flex-col justify-between"
      >
        <div className="absolute inset-x-0 top-0 h-4 bg-black/20" />
        
        {/* Cassette Label */}
        <div className="flex-1 bg-cream/90 rounded-sm p-4 relative flex flex-col justify-center items-center overflow-hidden">
          <div className="absolute top-2 left-4 text-[8px] uppercase tracking-tighter text-soft-brown/40 font-bold">TYPE I · NORMAL BIAS</div>
          
          <div className="w-full flex justify-center items-center gap-8 py-2">
            {/* Reels */}
            <motion.div 
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="w-16 h-16 rounded-full border-4 border-dashed border-soft-brown/20 flex items-center justify-center"
            >
              <div className="w-4 h-4 rounded-full bg-soft-brown/10" />
            </motion.div>
            <motion.div 
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="w-16 h-16 rounded-full border-4 border-dashed border-soft-brown/20 flex items-center justify-center"
            >
              <div className="w-4 h-4 rounded-full bg-soft-brown/10" />
            </motion.div>
          </div>

          <div className="mt-4 text-center">
            <h4 className="text-xl font-handwritten font-bold text-soft-brown truncate">{SONGS[currentSong].title}</h4>
            <p className="text-xs uppercase tracking-widest text-soft-brown/40">{SONGS[currentSong].artist}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-black/10 rounded-full mt-4 overflow-hidden">
           <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-blush"
           />
        </div>
      </motion.div>

      {/* Controls */}
      <div className="mt-12 flex items-center justify-center gap-8">
        <button onClick={prevSong} className="p-3 text-soft-brown/40 hover:text-soft-brown transition-colors">
          <SkipBack size={32} />
        </button>
        <button 
          onClick={togglePlay}
          className="w-20 h-20 rounded-full bg-blush flex items-center justify-center text-soft-brown shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
        </button>
        <button onClick={nextSong} className="p-3 text-soft-brown/40 hover:text-soft-brown transition-colors">
          <SkipForward size={32} />
        </button>
      </div>

      <div className="mt-12 flex items-center justify-center gap-2 text-soft-brown/30 font-bold uppercase tracking-widest text-[10px]">
         <Volume2 size={16} />
         <span>Now Playing... Only Love</span>
      </div>
    </div>
  );
}
