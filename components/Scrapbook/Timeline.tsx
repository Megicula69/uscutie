"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Star, Cloud, Send } from "lucide-react";

const MILESTONES = [
  { date: "2024.12.22", title: "First Message", icon: Send, description: "The start of something beautiful...", color: "bg-blue-100" },
  { date: "2025.01.12", title: "Found Love", icon: Heart, description: "When I realized you were the one.", color: "bg-red-100" },
  { date: "2025.02.14", title: "First Valentine's", icon: Star, description: "Most special day of my life!", color: "bg-yellow-100" },
  { date: "Present", title: "Happily Ever After", icon: Cloud, description: "Building our dream together, one day at a time.", color: "bg-purple-100" },
];

export default function Timeline() {
  return (
    <div className="w-full py-12 px-6">
      <div className="relative border-l-2 border-dashed border-soft-brown/20 ml-4 sm:ml-8 space-y-16">
        {MILESTONES.map((milestone, idx) => {
          const Icon = milestone.icon;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-12"
            >
              {/* Timeline Marker */}
              <div className={`absolute -left-6 top-0 w-12 h-12 rounded-full ${milestone.color} flex items-center justify-center border-4 border-white shadow-sm z-10`}>
                <Icon className="text-soft-brown/60" size={24} />
              </div>

              {/* Content Card */}
              <div className="bg-white/40 p-6 rounded-2xl border border-soft-brown/5 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-xs uppercase tracking-widest font-bold text-soft-brown/40 block mb-2">{milestone.date}</span>
                <h3 className="text-2xl font-sans font-bold text-soft-brown mb-2">{milestone.title}</h3>
                <p className="text-lg font-handwritten text-soft-brown/60 leading-relaxed italic">
                  "{milestone.description}"
                </p>
              </div>

              {/* Decorative Bear Reaction */}
              {idx % 2 === 0 && (
                <div className="absolute top-0 -right-4 sm:-right-12 text-5xl opacity-20 pointer-events-none">
                   🐻
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
