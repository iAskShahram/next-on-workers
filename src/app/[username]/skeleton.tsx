"use client";

import React from "react";
import { motion } from "motion/react";

const SkeletonCard = ({ className = "", children }: { className?: string; children?: React.ReactNode }) => (
  <motion.div
    className={`bg-[#1f1f1f] border border-white p-8 ${className}`}
    animate={{
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {children || (
      <div className="space-y-4">
        <div className="h-6 bg-white/20 rounded w-3/4"></div>
        <div className="h-4 bg-white/20 rounded w-1/2"></div>
        <div className="h-4 bg-white/20 rounded w-2/3"></div>
      </div>
    )}
  </motion.div>
);

const SkeletonStat = () => (
  <motion.div
    className="text-center p-4 border border-white bg-[#1f1f1f]"
    animate={{
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <div className="h-8 bg-white/20 rounded mb-2"></div>
    <div className="h-4 bg-white/20 rounded w-3/4 mx-auto"></div>
  </motion.div>
);

export const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Header Skeleton */}
        <div className="mb-10">
          <motion.div
            className="h-10 bg-white/20 rounded w-1/3 mb-2"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          ></motion.div>
          <motion.div
            className="h-6 bg-white/20 rounded w-1/4"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          ></motion.div>
        </div>

        {/* Profile Card Skeleton */}
        <motion.div
          className="bg-[#1f1f1f] border border-white p-8 mb-10"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar Skeleton */}
            <div className="relative">
              <div className="w-[150px] h-[150px] bg-white/20 rounded border-4 border-white"></div>
              <div className="absolute -left-2 top-0 w-2 h-full bg-white"></div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              {/* Name Skeleton */}
              <div className="h-8 bg-white/20 rounded w-1/3 mx-auto md:mx-0 mb-2"></div>
              <div className="h-6 bg-white/20 rounded w-1/4 mx-auto md:mx-0 mb-4"></div>
              
              {/* Bio Skeleton */}
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-white/20 rounded w-full"></div>
                <div className="h-4 bg-white/20 rounded w-3/4"></div>
              </div>
              
              {/* Location Skeleton */}
              <div className="h-6 bg-white/20 rounded w-1/3 mx-auto md:mx-0 mb-6"></div>
              
              {/* Stats Grid Skeleton */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonStat key={index} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <SkeletonCard />
          <SkeletonCard />
        </div>

        {/* Repositories Skeleton */}
        <SkeletonCard>
          <div className="space-y-0">
            {Array.from({ length: 5 }).map((_, index) => (
              <motion.div
                key={index}
                className={`border border-white p-6 ${
                  index % 2 === 0 ? "bg-[#1f1f1f]" : "bg-[#212121]"
                }`}
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1,
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="h-6 bg-white/20 rounded w-1/3"></div>
                      <div className="h-6 bg-white/20 rounded w-16"></div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-white/20 rounded w-full"></div>
                      <div className="h-4 bg-white/20 rounded w-2/3"></div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="h-4 bg-white/20 rounded w-16"></div>
                      <div className="h-4 bg-white/20 rounded w-12"></div>
                      <div className="h-4 bg-white/20 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="ml-6 px-6 py-3 bg-white/20 rounded w-16"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </SkeletonCard>
      </div>
    </div>
  );
};
