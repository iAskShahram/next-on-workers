"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";

export const UsernameForm = () => {
  const [username, setUsername] = useState("iAskShahram");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    setIsLoading(true);
    router.push(`/${username.trim()}`);
  };

  return (
    <motion.div
      className="max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.8,
        delay: 0.3
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.8,
            delay: 0.5
          }}
        >
          <label 
            htmlFor="username" 
            className="block text-white text-lg font-semibold mb-3"
          >
            Enter GitHub Username
          </label>
          <motion.input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="w-full px-6 py-4 bg-[#1f1f1f] border-2 border-white text-white text-lg font-semibold placeholder-white/50 focus:outline-none focus:border-white focus:bg-[#212121] transition-all duration-300"
            whileFocus={{ 
              scale: 1.02,
              transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
            disabled={isLoading}
          />
        </motion.div>
        
        <motion.button
          type="submit"
          disabled={isLoading || !username.trim()}
          className="w-full px-8 py-4 bg-white text-black font-bold text-lg border-2 border-white hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          whileHover={{ 
            scale: isLoading ? 1 : 1.05,
            transition: { type: "spring", stiffness: 400, damping: 25 }
          }}
          whileTap={{ scale: 0.95 }}
          animate={isLoading ? {
            opacity: [1, 0.7, 1],
          } : {}}
          transition={isLoading ? {
            opacity: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          } : {}}
        >
          {isLoading ? "Loading..." : "View Dashboard"}
        </motion.button>
      </form>
      
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-white/70 text-sm">
          Or try these popular developers:
        </p>
        <div className="flex flex-wrap gap-2 mt-3 justify-center">
          {["iAskShahram", "vercel", "facebook", "microsoft"].map((suggestedUsername) => (
            <motion.div
              key={suggestedUsername}
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href={`/${suggestedUsername}`}
                className="block px-3 py-1 text-sm border border-white text-white hover:bg-white hover:text-black transition-all duration-200"
              >
                @{suggestedUsername}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
