"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LockScreen from "@/components/LockScreen";
import Scrapbook from "@/components/Scrapbook/Scrapbook";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Passcode resets every time the page is refreshed.
    setIsUnlocked(false);
    setLoading(false);
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  if (loading) return null;

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="lock"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <LockScreen onUnlock={handleUnlock} />
          </motion.div>
        ) : (
          <motion.div
            key="site"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Scrapbook />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
