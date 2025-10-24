"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  const getErrorMessage = () => {
    if (error.message.includes("404") || error.message.includes("Not Found")) {
      return "User not found";
    }
    if (error.message.includes("403") || error.message.includes("rate limit")) {
      return "Rate limit exceeded";
    }
    if (error.message.includes("Failed to fetch")) {
      return "Network error";
    }
    return "Something went wrong";
  };

  const getErrorDescription = () => {
    if (error.message.includes("404") || error.message.includes("Not Found")) {
      return "The GitHub username you entered doesn't exist or is private.";
    }
    if (error.message.includes("403") || error.message.includes("rate limit")) {
      return "GitHub API rate limit exceeded. Please try again later.";
    }
    if (error.message.includes("Failed to fetch")) {
      return "Unable to connect to GitHub. Please check your connection.";
    }
    return "An unexpected error occurred while loading the dashboard.";
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.8
          }}
        >
          {/* Error Icon */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2
            }}
          >
            <div className="w-24 h-24 mx-auto border-4 border-white bg-[#1f1f1f] flex items-center justify-center">
              <motion.div
                className="text-4xl"
                animate={{ 
                  rotate: [0, -10, 10, -10, 10, 0],
                }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.5,
                  ease: "easeInOut"
                }}
              >
                ⚠️
              </motion.div>
            </div>
          </motion.div>

          {/* Error Title */}
          <motion.h1 
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 0.8,
              delay: 0.3
            }}
          >
            {getErrorMessage()}
          </motion.h1>

          {/* Error Description */}
          <motion.p 
            className="text-xl text-white mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 0.8,
              delay: 0.4
            }}
          >
            {getErrorDescription()}
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 0.8,
              delay: 0.5
            }}
          >
            <motion.button
              onClick={reset}
              className="px-8 py-4 bg-white text-black font-bold text-lg border-2 border-white hover:bg-black hover:text-white hover:scale-105 transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
            
            <motion.div
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/"
                className="block px-8 py-4 bg-[#1f1f1f] text-white font-bold text-lg border-2 border-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300"
              >
                Back to Home
              </Link>
            </motion.div>
          </motion.div>

          {/* Debug Info (only in development) */}
          {process.env.NODE_ENV === "development" && (
            <motion.details 
              className="mt-8 text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <summary className="text-white cursor-pointer mb-2">
                Debug Info
              </summary>
              <div className="bg-[#1f1f1f] border border-white p-4 text-sm text-white font-mono">
                <div>Error: {error.message}</div>
                {error.digest && <div>Digest: {error.digest}</div>}
                <div>Stack: {error.stack}</div>
              </div>
            </motion.details>
          )}
        </motion.div>
      </div>
    </div>
  );
}
