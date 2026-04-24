"use client";

import { motion } from "framer-motion";
import { TIER_CONFIG } from "@/lib/contracts";
import { formatBrewFull, daysRemaining, lockProgress } from "@/lib/utils";
import { Clock, Gift, AlertTriangle, Loader2 } from "lucide-react";

interface StakeCardProps {
  index: number;
  amount: bigint;
  startTime: bigint;
  tier: number;
  active: boolean;
  pending: bigint;
  onClaim: (index: number) => void;
  onUnstake: (index: number) => void;
  isClaiming: boolean;
  isUnstaking: boolean;
}

export default function StakeCard({
  index,
  amount,
  startTime,
  tier,
  active,
  pending,
  onClaim,
  onUnstake,
  isClaiming,
  isUnstaking,
}: StakeCardProps) {
  const tierInfo = TIER_CONFIG[tier] || TIER_CONFIG[0];
  const days = daysRemaining(startTime, tierInfo.lockDays);
  const progress = lockProgress(startTime, tierInfo.lockDays);
  const isLocked = days > 0;

  if (!active) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 hover:translate-y-0"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{tierInfo.icon}</span>
          <div>
            <h4 className="font-[family-name:var(--font-syne)] font-bold">{tierInfo.name} Tier</h4>
            <span
              className="font-[family-name:var(--font-jetbrains)] text-xs font-semibold"
              style={{ color: tierInfo.color }}
            >
              {tierInfo.apy}% APY
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="font-[family-name:var(--font-jetbrains)] text-lg font-bold">
            {formatBrewFull(amount)}
          </div>
          <span className="text-xs text-gray-500">BREW staked</span>
        </div>
      </div>

      {/* Pending Rewards */}
      <div className="mb-4 flex items-center justify-between rounded-xl bg-success/5 border border-success/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <Gift size={16} className="text-success" />
          <span className="text-sm text-gray-400">Pending Rewards</span>
        </div>
        <div className="font-[family-name:var(--font-jetbrains)] text-sm font-bold text-success">
          +{formatBrewFull(pending)} BREW
        </div>
      </div>

      {/* Lock Progress */}
      {tierInfo.lockDays > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-1 text-gray-400">
              <Clock size={12} />
              <span>
                {isLocked ? `${days} days remaining` : "Unlocked"}
              </span>
            </div>
            <span className="text-gray-500">{progress.toFixed(0)}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${tierInfo.color}, ${tierInfo.color}88)`,
              }}
            />
          </div>
        </div>
      )}

      {/* Early exit warning */}
      {isLocked && tierInfo.penalty > 0 && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-danger/5 border border-danger/10 px-3 py-2 text-xs text-danger">
          <AlertTriangle size={12} />
          <span>{tierInfo.penalty}% early exit penalty applies</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => onClaim(index)}
          disabled={isClaiming || pending === 0n}
          className="flex-1 rounded-xl bg-success/10 py-3 text-sm font-semibold text-success hover:bg-success/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isClaiming ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={14} className="animate-spin" />
              Claiming...
            </span>
          ) : (
            "Claim Rewards"
          )}
        </button>
        <button
          onClick={() => onUnstake(index)}
          disabled={isUnstaking}
          className={`flex-1 rounded-xl py-3 text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
            isLocked
              ? "bg-danger/10 text-danger hover:bg-danger/20"
              : "bg-white/[0.04] text-white hover:bg-white/[0.08]"
          }`}
        >
          {isUnstaking ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={14} className="animate-spin" />
              Unstaking...
            </span>
          ) : (
            "Unstake"
          )}
        </button>
      </div>
    </motion.div>
  );
}
