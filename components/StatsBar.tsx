"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Vault, Gift, Users } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import { usePoolInfo } from "@/hooks/usePoolInfo";
import { formatUnits } from "viem";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { totalStaked, rewardPool, totalRewardsPaid } = usePoolInfo();

  const totalStakedNum = totalStaked ? Number(formatUnits(totalStaked, 18)) : 0;
  const rewardPoolNum = rewardPool ? Number(formatUnits(rewardPool, 18)) : 0;
  const rewardsPaidNum = totalRewardsPaid ? Number(formatUnits(totalRewardsPaid, 18)) : 0;

  const stats = [
    {
      label: "Total Value Locked",
      value: totalStakedNum,
      suffix: " BREW",
      icon: TrendingUp,
      color: "text-brew",
    },
    {
      label: "Reward Pool",
      value: rewardPoolNum,
      suffix: " BREW",
      icon: Vault,
      color: "text-accent",
    },
    {
      label: "Rewards Distributed",
      value: rewardsPaidNum,
      suffix: " BREW",
      icon: Gift,
      color: "text-success",
    },
    {
      label: "Max APY",
      value: 80,
      suffix: "%",
      icon: Users,
      color: "text-brew",
      raw: true,
    },
  ];

  return (
    <section className="relative z-10 -mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={item}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`rounded-lg bg-white/[0.04] p-2 ${stat.color}`}>
                <stat.icon size={18} />
              </div>
              <span className="text-sm text-gray-500">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.raw ? 0 : 2}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
