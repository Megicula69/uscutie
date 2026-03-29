"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, MessageCircle, Calendar } from "lucide-react";
import Image from "next/image";

interface Memory {
  id: string;
  title: string;
  date: string;
  note: string;
  rotate: number;
  type: "polaroid" | "photobooth" | "vintage" | "note";
}

const MEMORIES: Memory[] = [
  { id: "1", type: "polaroid", title: "First Meet", date: "Jan 1, 2025", note: "The day everything changed! I can still remember what you were wearing. ❤️", rotate: -3 },
  { id: "2", type: "photobooth", title: "Arcade Fun", date: "Jan 10, 2025", note: "We lost at every game, but I felt like a winner with you.", rotate: 2 },
  { id: "3", type: "vintage", title: "Paris in Jan", date: "Jan 20, 2025", note: "The city of lights... though you shine brighter.", rotate: -2 },
  { id: "4", type: "note", title: "Cafe Study", date: "Feb 2, 2025", note: "Trying to work while you made cute faces at me.", rotate: 3 },
  { id: "5", type: "polaroid", title: "First Kiss", date: "Feb 14, 2025", note: "The world stopped for a second. Best Valentine's ever.", rotate: -1 },
  { id: "6", type: "photobooth", title: "Beach Trip", date: "Feb 28, 2025", note: "Collecting shells and chasing the waves.", rotate: -4 },
  { id: "7", type: "vintage", title: "Skyline View", date: "Mar 10, 2025", note: "The city looked small, but our love felt huge.", rotate: 2 },
  { id: "8", type: "note", title: "Cooking Fail", date: "Mar 15, 2025", note: "We burnt the pasta, but the pizza was great! 🍕", rotate: -2 },
  { id: "9", type: "polaroid", title: "Surprise Night", date: "Mar 20, 2025", note: "Singing our hearts out under the stars.", rotate: 3 },
  { id: "10", type: "photobooth", title: "Movie Marathon", date: "Mar 25, 2025", note: "Three movies later and we were both fast asleep.", rotate: -1 },
  { id: "11", type: "vintage", title: "Hiking Trail", date: "Apr 2, 2025", note: "The climb was hard, but the view with you was worth it.", rotate: 1 },
  { id: "12", type: "note", title: "First Anniversary", date: "May 1, 2025", note: "One year down, forever to go. I love you! ❤️", rotate: -3 },
];

export default function MemoriesSection() {
  const renderMemoryGraphics = (memory: Memory) => {
    switch (memory.type) {
      case "polaroid":
        return (
          <div className="polaroid relative w-[280px] md:w-[320px] shadow-2xl" style={{ rotate: `${memory.rotate}deg` }}>
            <div className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2 scale-110" />
            <div className="aspect-square bg-cream/10 rounded-sm mb-6 flex items-center justify-center overflow-hidden">
               <span className="text-8xl opacity-30">📸</span>
            </div>
            <h3 className="polaroid-caption text-2xl">{memory.title}</h3>
          </div>
        );
      case "photobooth":
        return (
          <div className="photobooth-strip shadow-2xl scale-110 md:scale-125 mx-8" style={{ rotate: `${memory.rotate}deg` }}>
             {[...Array(3)].map((_, i) => (
                <div key={i} className="film-frame h-32 md:h-40">
                   <span className="text-5xl opacity-20">🖼️</span>
                </div>
             ))}
             <h3 className="font-handwritten text-center text-soft-brown/80 text-lg mt-2">{memory.title}</h3>
          </div>
        );
      case "vintage":
        return (
          <div className="vintage-frame w-[260px] md:w-[300px] shadow-2xl" style={{ rotate: `${memory.rotate}deg` }}>
             <div className="aspect-[4/5] bg-zinc-900 rounded-sm mb-3 flex items-center justify-center">
                <span className="text-7xl opacity-40">🎞️</span>
             </div>
             <p className="text-xs text-zinc-500 font-mono text-center tracking-widest">{memory.date}</p>
          </div>
        );
      case "note":
        return (
          <div className="flex flex-col items-center" style={{ rotate: `${memory.rotate}deg` }}>
             <div className="note-frame w-[220px] md:w-[260px] z-10 shadow-xl">
                <div className="aspect-video bg-zinc-50 flex items-center justify-center">
                   <span className="text-5xl opacity-20">📷</span>
                </div>
             </div>
             <div className="note-paper w-[280px] md:w-[320px] -mt-8 pt-12 shadow-xl">
                <h4 className="font-handwritten text-2xl text-soft-brown border-b border-soft-brown/10 mb-3">{memory.title}</h4>
                <p className="font-handwritten text-lg text-soft-brown/70 leading-relaxed">
                  Date: {memory.date}
                </p>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-32 md:space-y-48 py-12">
      {MEMORIES.map((memory, index) => {
        const isEven = index % 2 === 0;
        
        return (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-center gap-12 md:gap-24 relative`}
          >
            {/* The Photo Graphic */}
            <div className="flex-1 flex justify-center items-center z-10 hover:scale-105 transition-transform duration-500">
              {renderMemoryGraphics(memory)}
            </div>

            {/* The Story Text */}
            <div className={`flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6 ${!isEven ? 'md:items-end md:text-right' : ''}`}>
              <div className="flex items-center gap-2 text-soft-brown/40 mb-2">
                <Calendar size={18} />
                <span className="font-sans font-medium">{memory.date}</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-sans font-bold text-soft-brown tracking-tight">
                {memory.title}
              </h2>
              
              {/* Decorative Line */}
              <div className="w-24 h-1.5 bg-blush/60 rounded-full" />

              <div className="bg-white/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-soft-brown/5 shadow-sm relative w-full text-left">
                {/* Decorative Pin/Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-blush/30 rounded-sm rotate-2" />
                
                <p className={`font-handwritten text-2xl md:text-3xl text-soft-brown/80 leading-relaxed italic ${!isEven ? 'md:text-right' : ''}`}>
                  "{memory.note}"
                </p>
                
                <div className={`mt-6 flex justify-end ${!isEven ? 'md:justify-start' : ''}`}>
                  <Heart size={24} className="text-soft-brown/20 fill-current" />
                </div>
              </div>
            </div>

            {/* Connecting Dashed Line (Visible mainly on desktop) */}
            {index < MEMORIES.length - 1 && (
              <div className="hidden md:block absolute -bottom-32 left-1/2 -translate-x-1/2 h-48 border-l-2 border-dashed border-soft-brown/10 z-0" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
