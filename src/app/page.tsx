"use client";

import { motion } from "motion/react";
import { UsernameForm } from "./components/username-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-6">
        <motion.h1 
          className="text-5xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.8
          }}
        >
          GitHub Dashboard
        </motion.h1>
        <motion.p 
          className="text-2xl text-white mb-10 leading-relaxed"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.8,
            delay: 0.1
          }}
        >
          Explore any GitHub user&apos;s profile and repositories
        </motion.p>
        <UsernameForm />
      </div>
    </div>
  );
}
