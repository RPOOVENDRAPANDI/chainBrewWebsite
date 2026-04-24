"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const milestones = [
  {
    quarter: "Q2 2026",
    title: "Token Launch",
    description: "BREW ERC-20 token deployed on Polygon with 100M supply.",
    status: "completed" as const,
  },
  {
    quarter: "Q2 2026",
    title: "Staking Platform",
    description: "BrewStaking contract deployed with 4-tier system and 20M reward pool.",
    status: "completed" as const,
  },
  {
    quarter: "Q2 2026",
    title: "Contract Verification",
    description: "All smart contracts verified and auditable on PolygonScan.",
    status: "completed" as const,
  },
  {
    quarter: "Q3 2026",
    title: "DEX Liquidity & Listings",
    description: "QuickSwap liquidity pool launch. CoinGecko and CoinMarketCap listings.",
    status: "current" as const,
  },
  {
    quarter: "Q3 2026",
    title: "Partnerships & Dual Farming",
    description: "Strategic DeFi partnerships and dual farming opportunities.",
    status: "upcoming" as const,
  },
  {
    quarter: "Q4 2026",
    title: "Mobile App",
    description: "Native mobile staking app for iOS and Android.",
    status: "upcoming" as const,
  },
  {
    quarter: "2027",
    title: "Governance & DAO",
    description: "On-chain governance, BREW DAO, and community-driven development.",
    status: "upcoming" as const,
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative z-10 py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-[family-name:var(--font-syne)] text-4xl sm:text-5xl font-bold mb-4">
          Road<span className="text-brew">map</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Our journey from launch to a fully governed DeFi ecosystem.
        </p>
      </motion.div>

      <div className="relative mx-auto max-w-2xl">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/[0.06] sm:left-1/2 sm:-translate-x-px" />

        {milestones.map((milestone, i) => (
          <motion.div
            key={milestone.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative flex items-start gap-6 pb-12 ${
              i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
            }`}
          >
            {/* Dot */}
            <div className="relative z-10 shrink-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  milestone.status === "completed"
                    ? "border-success bg-success/10"
                    : milestone.status === "current"
                    ? "border-brew bg-brew/10"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                {milestone.status === "completed" ? (
                  <Check size={16} className="text-success" />
                ) : milestone.status === "current" ? (
                  <div className="h-3 w-3 rounded-full bg-brew animate-pulse" />
                ) : (
                  <div className="h-2 w-2 rounded-full bg-gray-600" />
                )}
              </div>
            </div>

            {/* Content */}
            <div
              className={`glass-card flex-1 p-5 hover:translate-y-0 sm:w-[calc(50%-40px)] ${
                i % 2 === 0 ? "sm:mr-auto sm:pr-8" : "sm:ml-auto sm:pl-8"
              }`}
            >
              <div className="mb-1 font-[family-name:var(--font-jetbrains)] text-xs text-gray-500">
                {milestone.quarter}
              </div>
              <h4 className="font-[family-name:var(--font-syne)] font-bold mb-1">
                {milestone.title}
              </h4>
              <p className="text-sm text-gray-400">{milestone.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
