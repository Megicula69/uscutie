"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, Delete } from "lucide-react";
import Image from "next/image";

interface LockScreenProps {
  onUnlock: () => void;
}

const PASSCODE = "122222";

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState(false);

  const handleNumberClick = (num: string) => {
    if (input.length < 6) {
      const newInput = input + num;
      setInput(newInput);
      
      if (newInput.length === 6) {
        if (newInput === PASSCODE) {
          setTimeout(onUnlock, 100);
        } else {
          setError(true);
          setTimeout(() => {
            setInput("");
            setError(false);
          }, 600);
        }
      }
    }
  };

  const handleDelete = () => {
    setInput(prev => prev.slice(0, -1));
  };

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"];

  return (
    <div className="fixed inset-0 z-50 flex flex-col md:flex-row bg-cream/90 backdrop-blur-xl transition-all duration-700">
      {/* Left Panel: Quote & Branding */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex-1 hidden md:flex flex-col items-center justify-center p-12 bg-white/40 border-r border-soft-brown/5 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none scrapbook-bg" />
        
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="w-64 h-64 relative mb-12"
        >
          <Image
            src="/bear-hug.png"
            alt="Bear Welcome"
            fill
            className="object-contain drop-shadow-2xl"
          />
        </motion.div>

        <div className="max-w-md text-center space-y-6 relative z-10">
          <h2 className="text-4xl font-sans font-bold text-soft-brown leading-tight">
            Our Love is a Story that Never Ends...
          </h2>
          <div className="w-20 h-1 bg-blush mx-auto rounded-full" />
          <p className="text-2xl font-handwritten text-soft-brown/70 italic leading-relaxed">
            "Every moment with you is a page I never want to stop reading. Thank you for being my person. 💖"
          </p>
        </div>

        {/* Floating Hearts Decoration */}
        <div className="absolute top-20 right-20 text-4xl opacity-20 rotate-12">💖</div>
        <div className="absolute bottom-20 left-20 text-4xl opacity-20 -rotate-12">✨</div>
      </motion.div>

      {/* Right Panel: Numpad */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-cream/40">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-sm flex flex-col items-center"
        >
          {/* Mobile-only Branding */}
          <div className="md:hidden text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <Image src="/bear-hug.png" alt="Bears" fill className="object-contain" />
            </div>
            <h1 className="text-2xl font-sans font-bold text-soft-brown">Hello Mochi! 🐻💕</h1>
          </div>

          <p className="text-xl font-sans font-semibold text-soft-brown/60 mb-8 tracking-wide uppercase text-xs">
            Enter our love code
          </p>

          {/* Dots Indicator */}
          <motion.div 
            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
            className="flex gap-4 mb-12"
          >
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className={`w-3.5 h-3.5 rounded-full border border-soft-brown/30 transition-all duration-300 ${
                  i < input.length ? "bg-soft-brown scale-125 shadow-sm" : "bg-transparent"
                } ${error ? "bg-red-400 border-red-400" : ""}`}
              />
            ))}
          </motion.div>

          {/* Numpad Grid */}
          <div className="grid grid-cols-3 gap-6 sm:gap-8">
            {numbers.map((num, i) => {
              if (num === "") return <div key={i} />;
              
              if (num === "del") {
                return (
                  <button
                    key={i}
                    onClick={handleDelete}
                    className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-soft-brown/40 hover:text-soft-brown transition-colors"
                    aria-label="Delete"
                  >
                    <Delete size={28} />
                  </button>
                );
              }

              return (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleNumberClick(num)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/60 border border-soft-brown/5 flex items-center justify-center text-2xl font-sans text-soft-brown shadow-sm hover:bg-white hover:shadow-md transition-all active:bg-blush/20"
                >
                  {num}
                </motion.button>
              );
            })}
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-red-500 font-handwritten text-xl"
            >
              Try again 🥺
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
