"use client";

import { motion } from "framer-motion";
import { Wallet, Layers, ArrowUpRight, Coins } from "lucide-react";

const steps = [
  {
    icon: Wallet,
    title: "Connect Wallet",
    description: "Connect MetaMask or any Web3 wallet to the Polygon network.",
    color: "#A855F7",
  },
  {
    icon: Layers,
    title: "Choose a Tier",
    description: "Select from Flexible, Silver, Gold, or Platinum staking tiers.",
    color: "#F97316",
  },
  {
    icon: ArrowUpRight,
    title: "Stake BREW",
    description: "Approve and stake your BREW tokens in your chosen tier.",
    color: "#3B82F6",
  },
  {
    icon: Coins,
    title: "Earn Rewards",
    description: "Accumulate rewards over time and claim anytime. Up to 80% APY.",
    color: "#10B981",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative z-10 py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-[family-name:var(--font-syne)] text-4xl sm:text-5xl font-bold mb-4">
          How It <span className="text-brew">Works</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Start earning in 4 simple steps. No minimum stake required.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="glass-card relative p-6 text-center group"
          >
            {/* Step number */}
            <div className="absolute -top-3 left-6 rounded-full bg-black border border-white/[0.06] px-3 py-1 text-xs font-[family-name:var(--font-jetbrains)] text-gray-500">
              Step {i + 1}
            </div>

            {/* Icon */}
            <div
              className="mx-auto mb-5 mt-2 flex h-14 w-14 items-center justify-center rounded-2xl transition-all group-hover:scale-110"
              style={{ backgroundColor: `${step.color}15` }}
            >
              <step.icon size={24} style={{ color: step.color }} />
            </div>

            <h3 className="font-[family-name:var(--font-syne)] text-lg font-bold mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>

            {/* Connector line (hidden on last) */}
            {i < steps.length - 1 && (
              <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-white/[0.06] lg:block" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
