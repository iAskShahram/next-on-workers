"use client";

import Image from "next/image";
import React, { use } from "react";
import { motion } from "motion/react";
import { DashboardData } from "./types";

function getLanguageColor(): string {
  // All languages use the same monochrome styling
  return "bg-[#1f1f1f] text-white";
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: {
    type: "spring",
    stiffness: 80,
    damping: 25,
    mass: 0.8,
  },
};

const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: {
    type: "spring",
    stiffness: 80,
    damping: 25,
    mass: 0.8,
  },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const PageComponent = ({ dataPromise }: { dataPromise: Promise<DashboardData> }) => {
  const data = use(dataPromise);
  const { user, repos, totalStars, topLanguages } = data;

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Header */}
        <div className="mb-10">
          <motion.h1
            className="text-4xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            GitHub Dashboard
          </motion.h1>
          <motion.p
            className="text-white text-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Statistics for @{user.login}
          </motion.p>
        </div>

        {/* Profile Card */}
        <motion.div
          className="bg-[#1f1f1f] border border-white p-8 mb-10 hover:bg-[#212121] hover:border-2 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.8,
            delay: 0.2,
          }}
          whileHover={{
            scale: 1.01,
            transition: { type: "spring", stiffness: 400, damping: 25 },
          }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <motion.div
              className="relative cursor-pointer"
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
            >
              <Image
                src={user.avatar_url}
                alt={`${user.name || user.login}'s avatar`}
                width={150}
                height={150}
                className="border-4 border-white"
              />
              <motion.div
                className="absolute -left-2 top-0 w-2 h-full bg-white"
                whileHover={{
                  scaleY: 1.1,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
              ></motion.div>
            </motion.div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">
                {user.name || user.login}
              </h2>
              <p className="text-white text-lg mb-4">@{user.login}</p>
              {user.bio && (
                <p className="text-white mb-4 leading-relaxed">{user.bio}</p>
              )}
              {user.location && (
                <p className="text-white mb-6 text-lg">📍 {user.location}</p>
              )}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
                variants={{
                  animate: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                initial="initial"
                animate="animate"
              >
                {[
                  { value: user.public_repos, label: "Repositories" },
                  { value: user.followers, label: "Followers" },
                  { value: user.following, label: "Following" },
                  { value: totalStars, label: "Total Stars" },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-4 border border-white hover:bg-white hover:text-black cursor-pointer"
                    variants={{
                      initial: { opacity: 0, y: 20 },
                      animate: { opacity: 1, y: 0 },
                    }}
                    whileHover={{
                      y: -8,
                      scale: 1.05,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="text-3xl font-bold mb-1"
                      whileHover={{
                        scale: 1.1,
                        transition: {
                          type: "spring",
                          stiffness: 500,
                          damping: 20,
                        },
                      }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Top Languages */}
          <motion.div
            className="bg-[#1f1f1f] border border-white p-8 hover:bg-[#212121] hover:border-2 transition-all duration-300"
            variants={slideInLeft}
            whileHover={{
              scale: 1.01,
              transition: { type: "spring", stiffness: 400, damping: 25 },
            }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-white pb-2">
              Top Languages
            </h3>
            <motion.div
              className="space-y-4"
              variants={{
                animate: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
              initial="initial"
              animate="animate"
            >
              {Object.entries(topLanguages).map(([language, count]) => (
                <motion.div
                  key={language}
                  className="group flex items-center justify-between p-3 border border-white hover:bg-white hover:text-black hover:scale-[1.05] hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                  variants={{
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className={`w-4 h-4 border border-white ${getLanguageColor()}`}
                      whileHover={{
                        rotate: 45,
                        scale: 1.2,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        },
                      }}
                    ></motion.div>
                    <span className="text-white group-hover:text-black font-semibold text-lg">
                      {language}
                    </span>
                  </div>
                  <span className="text-white group-hover:text-black font-bold text-lg">
                    {count} repo{count !== 1 ? "s" : ""}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Account Info */}
          <motion.div
            className="bg-[#1f1f1f] border border-white p-8 hover:bg-[#212121] hover:border-2 transition-all duration-300"
            variants={slideInRight}
            whileHover={{
              scale: 1.01,
              transition: { type: "spring", stiffness: 400, damping: 25 },
            }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-white pb-2">
              Account Information
            </h3>
            <motion.div
              className="space-y-4"
              variants={{
                animate: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
              initial="initial"
              animate="animate"
            >
              <motion.div
                className="flex justify-between items-center p-3 border border-white hover:bg-white hover:text-black hover:scale-[1.03] hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                variants={{
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                }}
              >
                <span className="font-semibold">Member since</span>
                <span className="font-bold">{formatDate(user.created_at)}</span>
              </motion.div>
              <motion.div
                className="flex justify-between items-center p-3 border border-white hover:bg-white hover:text-black hover:scale-[1.03] hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                variants={{
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                }}
              >
                <span className="font-semibold">Last updated</span>
                <span className="font-bold">{formatDate(user.updated_at)}</span>
              </motion.div>
              <motion.div
                className="flex justify-between items-center p-3 border border-white hover:bg-white hover:text-black hover:scale-[1.03] hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                variants={{
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                }}
              >
                <span className="font-semibold">User ID</span>
                <span className="font-mono font-bold">{user.id}</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Top Repositories */}
        <motion.div
          className="bg-[#1f1f1f] border border-white p-8 hover:border-2 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.8,
            delay: 0.6,
          }}
          whileHover={{
            scale: 1.005,
            transition: { type: "spring", stiffness: 300, damping: 30 },
          }}
        >
          <motion.h3
            className="text-2xl font-bold text-white mb-8 border-b border-white pb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Top Repositories
          </motion.h3>
          <motion.div
            className="space-y-0"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
            initial="initial"
            animate="animate"
          >
            {repos.slice(0, 5).map((repo, index) => (
              <motion.div
                key={repo.id}
                className={`group border border-white p-6 hover:bg-white hover:text-black cursor-pointer ${
                  index % 2 === 0 ? "bg-[#1f1f1f]" : "bg-[#212121]"
                }`}
                variants={{
                  initial: { opacity: 0, y: 40, rotateX: 10 },
                  animate: { opacity: 1, y: 0, rotateX: 0 },
                }}
                whileHover={{
                  scale: 1.02,
                  y: -8,
                  rotateX: -2,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: index * 0.1,
                  },
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h4 className="text-xl font-bold text-white group-hover:text-black">
                        {repo.name}
                      </h4>
                      {repo.language && (
                        <span
                          className={`px-3 py-1 text-sm font-semibold text-white border border-white ${getLanguageColor()}`}
                        >
                          {repo.language}
                        </span>
                      )}
                    </div>
                    {repo.description && (
                      <p className="text-white group-hover:text-black mb-4 leading-relaxed text-lg">
                        {repo.description}
                      </p>
                    )}
                    <div className="flex items-center space-x-6 text-lg text-white group-hover:text-black">
                      <span className="font-bold">
                        ⭐ {repo.stargazers_count}
                      </span>
                      <span className="font-bold">🍴 {repo.forks_count}</span>
                      <span className="font-semibold">
                        Updated {formatDate(repo.updated_at)}
                      </span>
                    </div>
                  </div>
                  <motion.a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-6 px-6 py-3 bg-white text-black group-hover:bg-black group-hover:text-white font-bold text-lg border border-white hover:border-2"
                    whileHover={{
                      scale: 1.1,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      },
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(255, 255, 255, 0)",
                        "0 0 0 8px rgba(255, 255, 255, 0.1)",
                        "0 0 0 0 rgba(255, 255, 255, 0)",
                      ],
                    }}
                    transition={{
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    View
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
