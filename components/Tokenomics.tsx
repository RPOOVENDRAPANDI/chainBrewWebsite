"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { BREW_ADDRESS, STAKING_ADDRESS } from "@/lib/contracts";
import { polygonScanAddress } from "@/lib/utils";

const allocations = [
  { label: "Public Market", percent: 35, amount: "35,000,000", color: "#F97316" },
  { label: "Staking Rewards", percent: 20, amount: "20,000,000", color: "#A855F7" },
  { label: "Team (3yr vest)", percent: 12, amount: "12,000,000", color: "#3B82F6" },
  { label: "Liquidity Pool", percent: 10, amount: "10,000,000", color: "#10B981" },
  { label: "Community", percent: 10, amount: "10,000,000", color: "#F59E0B" },
  { label: "Development", percent: 8, amount: "8,000,000", color: "#EC4899" },
  { label: "Reserve", percent: 5, amount: "5,000,000", color: "#6B7280" },
];

function CopyAddress({ label, address }: { label: string; address: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
      <div>
        <div className="text-xs text-gray-500 mb-1">{label}</div>
        <div className="font-[family-name:var(--font-jetbrains)] text-sm text-gray-300 break-all">
          {address}
        </div>
      </div>
      <div className="flex items-center gap-2 ml-4 shrink-0">
        <button
          onClick={handleCopy}
          className="rounded-lg p-2 text-gray-500 hover:bg-white/[0.04] hover:text-white transition-colors"
        >
          {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
        </button>
        <a
          href={polygonScanAddress(address)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg p-2 text-gray-500 hover:bg-white/[0.04] hover:text-white transition-colors"
        >
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}

export default function Tokenomics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="tokenomics" className="relative z-10 py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-[family-name:var(--font-syne)] text-4xl sm:text-5xl font-bold mb-4">
          Token<span className="text-brew">omics</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          100,000,000 BREW total supply. Transparent allocation for sustainable growth.
        </p>
      </motion.div>

      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Distribution Chart */}
        <div className="space-y-4">
          {allocations.map((alloc, i) => (
            <motion.div
              key={alloc.label}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: alloc.color }}
                  />
                  <span className="text-sm font-medium">{alloc.label}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-[family-name:var(--font-jetbrains)] text-gray-400">
                    {alloc.amount}
                  </span>
                  <span
                    className="font-[family-name:var(--font-jetbrains)] font-bold"
                    style={{ color: alloc.color }}
                  >
                    {alloc.percent}%
                  </span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${alloc.percent}%` } : {}}
                  transition={{ duration: 1, delay: i * 0.08 + 0.3 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: alloc.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contracts + Info */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold mb-4">
              Verified Contracts
            </h3>
            <div className="space-y-3">
              <CopyAddress label="BREW Token (ERC-20)" address={BREW_ADDRESS} />
              <CopyAddress label="BrewStaking Contract" address={STAKING_ADDRESS} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-6 hover:translate-y-0"
          >
            <h4 className="font-[family-name:var(--font-syne)] font-bold mb-3">Token Details</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-gray-500">Network</div>
              <div className="font-medium">Polygon PoS</div>
              <div className="text-gray-500">Standard</div>
              <div className="font-medium">ERC-20</div>
              <div className="text-gray-500">Decimals</div>
              <div className="font-[family-name:var(--font-jetbrains)] font-medium">18</div>
              <div className="text-gray-500">Total Supply</div>
              <div className="font-[family-name:var(--font-jetbrains)] font-medium">100,000,000</div>
              <div className="text-gray-500">Features</div>
              <div className="font-medium">Mintable (capped), Burnable</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
