"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown, Shield, Hexagon, Coins } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Gradient Blobs */}
      <div className="gradient-blob gradient-blob-1" />
      <div className="gradient-blob gradient-blob-2" />
      <div className="gradient-blob gradient-blob-3" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-brew/20 bg-brew/5 px-4 py-2 text-sm"
        >
          <div className="pulse-dot" />
          <span className="text-brew">Live on Polygon Mainnet</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-[family-name:var(--font-syne)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          Brew Your Crypto.
          <br />
          <span className="bg-gradient-to-r from-brew via-amber-400 to-brew bg-clip-text text-transparent">
            Stake & Earn.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto max-w-2xl text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed"
        >
          Stake BREW tokens across 4 premium tiers with up to{" "}
          <span className="font-[family-name:var(--font-jetbrains)] text-brew font-semibold">80% APY</span>.
          Verified contracts. Real yield. Built on Polygon.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/stake"
            className="btn-glow relative inline-flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-brew to-amber-500 px-8 text-lg font-semibold text-white shadow-lg shadow-brew/25 transition-all hover:shadow-brew/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Staking
          </Link>
          <a
            href="#tiers"
            className="inline-flex h-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-8 text-lg font-medium text-gray-300 backdrop-blur transition-all hover:bg-white/[0.06] hover:text-white hover:scale-[1.02] active:scale-[0.98]"
          >
            View Tiers
          </a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-success" />
            <span>Verified on PolygonScan</span>
          </div>
          <div className="flex items-center gap-2">
            <Hexagon size={16} className="text-accent" />
            <span>Polygon Network</span>
          </div>
          <div className="flex items-center gap-2">
            <Coins size={16} className="text-brew" />
            <span>100M Total Supply</span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown size={20} className="text-gray-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
