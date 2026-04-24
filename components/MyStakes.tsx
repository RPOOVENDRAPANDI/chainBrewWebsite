"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
import { useUserStakeCount, useUserStakes, useClaimRewards, useUnstake } from "@/hooks/useStakingContract";
import StakeCard from "./StakeCard";
import TxModal from "./TxModal";
import { Layers, Gift, TrendingUp, Inbox } from "lucide-react";
import { motion } from "framer-motion";

export default function MyStakes() {
  const { address, isConnected } = useAccount();
  const { data: stakeCount } = useUserStakeCount(address);
  const count = stakeCount ? Number(stakeCount) : 0;
  const { data: stakesData, refetch: refetchStakes } = useUserStakes(address, count);

  const [showTxModal, setShowTxModal] = useState(false);
  const [txState, setTxState] = useState<"pending" | "confirming" | "success" | "error">("pending");
  const [txHash, setTxHash] = useState("");
  const [txError, setTxError] = useState("");
  const [txTitle, setTxTitle] = useState("");
  const [claimingIndex, setClaimingIndex] = useState<number | null>(null);
  const [unstakingIndex, setUnstakingIndex] = useState<number | null>(null);

  const {
    claim,
    hash: claimHash,
    isPending: isClaimPending,
    isConfirming: isClaimConfirming,
    isSuccess: isClaimSuccess,
    error: claimError,
    reset: resetClaim,
  } = useClaimRewards();

  const {
    unstake,
    hash: unstakeHash,
    isPending: isUnstakePending,
    isConfirming: isUnstakeConfirming,
    isSuccess: isUnstakeSuccess,
    error: unstakeError,
    reset: resetUnstake,
  } = useUnstake();

  // Handle claim
  useEffect(() => {
    if (claimHash && !isClaimSuccess) {
      setTxHash(claimHash);
      setTxState("confirming");
      setShowTxModal(true);
    }
  }, [claimHash, isClaimSuccess]);

  useEffect(() => {
    if (isClaimSuccess) {
      setTxState("success");
      refetchStakes();
      setClaimingIndex(null);
    }
  }, [isClaimSuccess, refetchStakes]);

  useEffect(() => {
    if (claimError) {
      setTxError(claimError.message.split("\n")[0]);
      setTxState("error");
      setShowTxModal(true);
      setClaimingIndex(null);
    }
  }, [claimError]);

  // Handle unstake
  useEffect(() => {
    if (unstakeHash && !isUnstakeSuccess) {
      setTxHash(unstakeHash);
      setTxState("confirming");
      setShowTxModal(true);
    }
  }, [unstakeHash, isUnstakeSuccess]);

  useEffect(() => {
    if (isUnstakeSuccess) {
      setTxState("success");
      refetchStakes();
      setUnstakingIndex(null);
    }
  }, [isUnstakeSuccess, refetchStakes]);

  useEffect(() => {
    if (unstakeError) {
      setTxError(unstakeError.message.split("\n")[0]);
      setTxState("error");
      setShowTxModal(true);
      setUnstakingIndex(null);
    }
  }, [unstakeError]);

  const handleClaim = (index: number) => {
    setClaimingIndex(index);
    setTxTitle("Claiming Rewards");
    setTxState("pending");
    setShowTxModal(true);
    claim(index);
  };

  const handleUnstake = (index: number) => {
    setUnstakingIndex(index);
    setTxTitle("Unstaking BREW");
    setTxState("pending");
    setShowTxModal(true);
    unstake(index);
  };

  if (!isConnected) return null;

  // Parse stakes
  const stakes = stakesData?.map((s, i) => {
    if (s.status === "success" && s.result) {
      const [amount, startTime, , tier, active, pending] = s.result as [bigint, bigint, bigint, number, boolean, bigint];
      return { index: i, amount, startTime, tier, active, pending };
    }
    return null;
  }).filter(Boolean) || [];

  const activeStakes = stakes.filter((s) => s && s.active);
  const totalStakedAmount = activeStakes.reduce(
    (sum, s) => sum + Number(formatUnits(s!.amount, 18)),
    0
  );
  const totalPendingRewards = activeStakes.reduce(
    (sum, s) => sum + Number(formatUnits(s!.pending, 18)),
    0
  );

  return (
    <>
      <div className="space-y-6">
        <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold">
          My Stakes
        </h3>

        {/* Summary Cards */}
        {activeStakes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-4 hover:translate-y-0">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                <Layers size={14} />
                <span>Active Positions</span>
              </div>
              <div className="font-[family-name:var(--font-jetbrains)] text-xl font-bold">
                {activeStakes.length}
              </div>
            </div>
            <div className="glass-card p-4 hover:translate-y-0">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                <TrendingUp size={14} />
                <span>Total Staked</span>
              </div>
              <div className="font-[family-name:var(--font-jetbrains)] text-xl font-bold">
                {totalStakedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} BREW
              </div>
            </div>
            <div className="glass-card p-4 hover:translate-y-0">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                <Gift size={14} />
                <span>Total Pending</span>
              </div>
              <div className="font-[family-name:var(--font-jetbrains)] text-xl font-bold text-success">
                +{totalPendingRewards.toLocaleString(undefined, { maximumFractionDigits: 2 })} BREW
              </div>
            </div>
          </div>
        )}

        {/* Stake List */}
        {activeStakes.length > 0 ? (
          <div className="space-y-4">
            {activeStakes.map((s) => (
              <StakeCard
                key={s!.index}
                index={s!.index}
                amount={s!.amount}
                startTime={s!.startTime}
                tier={s!.tier}
                active={s!.active}
                pending={s!.pending}
                onClaim={handleClaim}
                onUnstake={handleUnstake}
                isClaiming={claimingIndex === s!.index && (isClaimPending || isClaimConfirming)}
                isUnstaking={unstakingIndex === s!.index && (isUnstakePending || isUnstakeConfirming)}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card flex flex-col items-center justify-center p-12 text-center hover:translate-y-0"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.04]">
              <Inbox size={28} className="text-gray-500" />
            </div>
            <h4 className="font-[family-name:var(--font-syne)] text-lg font-bold mb-2">
              No Active Stakes
            </h4>
            <p className="text-sm text-gray-500 max-w-xs">
              Start staking BREW tokens to earn rewards. Choose a tier above and enter an amount.
            </p>
          </motion.div>
        )}
      </div>

      <TxModal
        isOpen={showTxModal}
        onClose={() => {
          setShowTxModal(false);
          resetClaim();
          resetUnstake();
        }}
        state={txState}
        hash={txHash}
        error={txError}
        title={txTitle}
      />
    </>
  );
}
