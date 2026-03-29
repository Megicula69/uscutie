"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Music, Calendar, Notebook, Ghost } from "lucide-react";
import Image from "next/image";

// Components for each section
import Polaroid from "@/components/Scrapbook/Polaroid";
import MusicPlayer from "@/components/Scrapbook/MusicPlayer";
import Timeline from "@/components/Scrapbook/Timeline";
import LoveNotes from "@/components/Scrapbook/LoveNotes";

const SECTIONS = [
  { id: "home", label: "Home", icon: Heart },
  { id: "memories", label: "Memories", icon: Ghost },
  { id: "timeline", label: "Our Story", icon: Calendar },
  { id: "notes", label: "Love Notes", icon: Notebook },
  { id: "music", label: "Our Songs", icon: Music },
];

export default function Scrapbook() {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <div className="min-h-screen w-full bg-cream/30 scrapbook-bg relative overflow-hidden flex flex-col items-center">
      {/* Navigation Tabs (Top) */}
      <nav className="fixed top-6 z-40 bg-white/40 backdrop-blur-sm border border-soft-brown/10 rounded-full px-4 py-2 flex gap-4 shadow-sm">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
                isActive 
                  ? "bg-blush text-soft-brown shadow-inner scale-105" 
                  : "text-soft-brown/60 hover:text-soft-brown hover:bg-white/50"
              }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium sr-only sm:not-sr-only md:block">
                {section.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <main className="w-full max-w-4xl pt-24 pb-12 px-4 flex flex-col items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full"
          >
            {activeSection === "home" && <HomeSection />}
            {activeSection === "memories" && <MemoriesSection />}
            {activeSection === "timeline" && <TimelineSection />}
            {activeSection === "notes" && <NotesSection />}
            {activeSection === "music" && <MusicSection />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Bear Stickers */}
      <div className="fixed bottom-4 right-4 pointer-events-none opacity-40 hover:opacity-100 transition-opacity z-50 w-24 h-24 sm:w-32 sm:h-32">
        <Image 
          src="/bear-heart.png" 
          alt="Bear Sticker" 
          fill 
          className="object-contain animate-float" 
        />
      </div>
      <div className="fixed top-24 left-4 pointer-events-none opacity-20 hover:opacity-100 transition-opacity z-50 w-16 h-16 sm:w-20 sm:h-20 -rotate-12">
        <Image 
          src="/bear-hug.png" 
          alt="Bear Sticker" 
          fill 
          className="object-contain" 
        />
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-sans font-bold text-soft-brown text-center mb-2">{title}</h2>
      <div className="w-24 h-1.5 bg-blush/40 rounded-full" />
    </div>
  );
}

function HomeSection() {
  return (
    <div className="flex flex-col items-center text-center space-y-8 py-12">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 ">
           <div className="absolute inset-0 bg-blush/20 rounded-full animate-pulse " />
           <Image
             src="/bear-hug.png"
             alt="Bears Hugging"
             fill
             className="object-contain animate-bounce-slow"
           />
      </div>
      <div className="space-y-4">
        <h2 className="text-4xl sm:text-5xl font-sans font-bold text-soft-brown tracking-tight">
          Welcome to our Happy Place!
        </h2>
        <p className="text-xl sm:text-2xl font-handwritten text-soft-brown/70 max-w-lg mx-auto leading-relaxed">
          "I love you more every single day... Just like these bears, we're better together! 💖"
        </p>
      </div>
      
      <div className="bg-white/60 border border-soft-brown/10 p-6 rounded-2xl shadow-sm inline-flex items-center gap-4">
        <span className="text-3xl">❤️</span>
        <div className="text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-soft-brown/40">Together for</p>
            <p className="text-2xl font-sans font-bold text-soft-brown">365 Days & counting</p>
        </div>
      </div>
    </div>
  );
}

// Low-level section components (Internal for now)
function MemoriesSection() { 
  return (
    <div className="w-full">
      <SectionHeader title="Our Precious Memories" />
      <Polaroid />
    </div>
  ); 
}
function TimelineSection() { 
  return (
    <div className="w-full">
      <SectionHeader title="Our Love Story" />
      <Timeline />
    </div>
  ); 
}
function NotesSection() { 
  return (
    <div className="w-full">
      <SectionHeader title="Little Love Notes" />
      <LoveNotes />
    </div>
  ); 
}
function MusicSection() { 
  return (
    <div className="w-full">
      <SectionHeader title="Our Playlist" />
      <MusicPlayer />
    </div>
  ); 
}
