"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TIER_CONFIG } from "@/lib/contracts";
import { Lock, Unlock, AlertTriangle } from "lucide-react";
import Link from "next/link";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function TierCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="tiers" className="relative z-10 py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-[family-name:var(--font-syne)] text-4xl sm:text-5xl font-bold mb-4">
          Staking <span className="text-brew">Tiers</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Choose your commitment level. Higher tiers earn greater rewards with longer lock periods.
        </p>
      </motion.div>

      {/* Tier Cards */}
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {TIER_CONFIG.map((tier) => (
          <motion.div key={tier.id} variants={item}>
            <Link href={`/stake?tier=${tier.id}`} className="block">
              <div
                className={`tier-shimmer glass-card group relative cursor-pointer overflow-hidden p-6 transition-all duration-300 hover:border-[${tier.color}]/30 hover:shadow-lg`}
                style={{
                  borderColor: `${tier.color}15`,
                }}
              >
                {/* Tier glow background */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at center, ${tier.color}08 0%, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Icon + Name */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{tier.icon}</span>
                      <div>
                        <h3 className="font-[family-name:var(--font-syne)] text-lg font-bold">
                          {tier.name}
                        </h3>
                        <span className="text-xs text-gray-500">Tier {tier.id}</span>
                      </div>
                    </div>
                  </div>

                  {/* APY */}
                  <div className="mb-6">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">APY</span>
                    <div
                      className="font-[family-name:var(--font-jetbrains)] text-5xl font-bold mt-1"
                      style={{ color: tier.color }}
                    >
                      {tier.apy}%
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 border-t border-white/[0.06] pt-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        {tier.lockDays > 0 ? (
                          <Lock size={14} />
                        ) : (
                          <Unlock size={14} />
                        )}
                        <span>Lock Period</span>
                      </div>
                      <span className="text-white font-medium">
                        {tier.lockDays === 0 ? "None" : `${tier.lockDays} days`}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <AlertTriangle size={14} />
                        <span>Early Exit Fee</span>
                      </div>
                      <span
                        className={
                          tier.penalty > 0 ? "text-danger font-medium" : "text-success font-medium"
                        }
                      >
                        {tier.penalty}%
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div
                    className="mt-6 flex items-center justify-center rounded-xl py-3 text-sm font-semibold transition-all group-hover:shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${tier.color}20, ${tier.color}10)`,
                      color: tier.color,
                    }}
                  >
                    Stake in {tier.name}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
