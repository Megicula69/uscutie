"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const NOTES = [
  "You are the best thing that ever happened to me. 💖",
  "I love the way you smile when you're sleepy. 🐻",
  "Every moment with you is a gift I'll cherish forever.",
  "I'm so lucky to have you as my partner and best friend. 💕",
  "You make my heart skip a beat every time I see you. ✨",
  "Can't wait for our next adventure together! 🧸",
];

export default function LoveNotes() {
  const [currentNote, setCurrentNote] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    setDisplayText("");
    setIsTyping(true);
    
    const interval = setInterval(() => {
      setDisplayText(prev => NOTES[currentNote].slice(0, i + 1));
      i++;
      if (i >= NOTES[currentNote].length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentNote]);

  const nextNote = () => {
    if (!isTyping) {
      setCurrentNote((prev) => (prev + 1) % NOTES.length);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-6">
      <motion.div 
        key={currentNote}
        initial={{ rotate: -2, scale: 0.9, opacity: 0 }}
        animate={{ rotate: 1, scale: 1, opacity: 1 }}
        whileHover={{ rotate: 0, scale: 1.02 }}
        onClick={nextNote}
        className="sticky-note w-full max-w-md min-h-[250px] flex flex-col items-center justify-center text-center cursor-pointer relative group"
      >
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-white/20 rounded-full blur-sm opacity-50" />
        
        <p className="text-3xl sm:text-4xl text-soft-brown leading-snug">
          {displayText}
          {isTyping && <span className="animate-pulse">|</span>}
        </p>

        <div className="mt-8 opacity-40 group-hover:opacity-100 transition-opacity">
          <Heart className="text-red-400 fill-current animate-bounce" size={32} />
        </div>

        <div className="absolute bottom-4 right-4 text-xs font-sans text-soft-brown/20 uppercase tracking-widest font-bold">
          Click for next note
        </div>
      </motion.div>

      {/* Decorative Bear sticker */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="mt-12 text-7xl select-none"
      >
        🧸💬
      </motion.div>
    </div>
  );
}
