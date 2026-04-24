"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount } from "wagmi";
import { formatUnits, parseUnits } from "viem";
import { TIER_CONFIG, STAKING_ADDRESS } from "@/lib/contracts";
import { useBrewBalance, useBrewAllowance, useApprove } from "@/hooks/useBrewContract";
import { useStake } from "@/hooks/useStakingContract";
import { calculateRewards, formatBrewFull } from "@/lib/utils";
import { Loader2, Check, AlertTriangle, ArrowRight, Info } from "lucide-react";
import ConnectButton from "./ConnectButton";
import TxModal from "./TxModal";

interface StakingFormProps {
  initialTier?: number;
  onSuccess?: () => void;
}

export default function StakingForm({ initialTier = 0, onSuccess }: StakingFormProps) {
  const { address, isConnected } = useAccount();
  const [selectedTier, setSelectedTier] = useState(initialTier);
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<"input" | "approve" | "stake">("input");
  const [showTxModal, setShowTxModal] = useState(false);
  const [txState, setTxState] = useState<"pending" | "confirming" | "success" | "error">("pending");
  const [txHash, setTxHash] = useState<string>("");
  const [txError, setTxError] = useState<string>("");

  const { data: balance } = useBrewBalance(address);
  const { data: allowance, refetch: refetchAllowance } = useBrewAllowance(address, STAKING_ADDRESS);
  const {
    approve,
    hash: approveHash,
    isPending: isApproving,
    isConfirming: isApproveConfirming,
    isSuccess: isApproveSuccess,
    error: approveError,
  } = useApprove();
  const {
    stake,
    hash: stakeHash,
    isPending: isStaking,
    isConfirming: isStakeConfirming,
    isSuccess: isStakeSuccess,
    error: stakeError,
    reset: resetStake,
  } = useStake();

  const tier = TIER_CONFIG[selectedTier];
  const balanceFormatted = balance ? formatUnits(balance, 18) : "0";
  const amountNum = Number(amount) || 0;

  const needsApproval =
    amount &&
    amountNum > 0 &&
    allowance !== undefined &&
    allowance < parseUnits(amount || "0", 18);

  // Handle approve success
  useEffect(() => {
    if (isApproveSuccess) {
      refetchAllowance();
      setStep("stake");
    }
  }, [isApproveSuccess, refetchAllowance]);

  // Handle stake success
  useEffect(() => {
    if (isStakeSuccess && stakeHash) {
      setTxHash(stakeHash);
      setTxState("success");
      setShowTxModal(true);
      setAmount("");
      setStep("input");
      onSuccess?.();
    }
  }, [isStakeSuccess, stakeHash, onSuccess]);

  // Handle errors
  useEffect(() => {
    if (approveError) {
      setTxError(approveError.message.split("\n")[0]);
      setTxState("error");
      setShowTxModal(true);
    }
  }, [approveError]);

  useEffect(() => {
    if (stakeError) {
      setTxError(stakeError.message.split("\n")[0]);
      setTxState("error");
      setShowTxModal(true);
    }
  }, [stakeError]);

  // Show confirming state
  useEffect(() => {
    if (approveHash) {
      setTxHash(approveHash);
      setTxState("confirming");
      setShowTxModal(true);
    }
  }, [approveHash]);

  useEffect(() => {
    if (stakeHash && !isStakeSuccess) {
      setTxHash(stakeHash);
      setTxState("confirming");
      setShowTxModal(true);
    }
  }, [stakeHash, isStakeSuccess]);

  const handleStake = useCallback(() => {
    if (!amount || amountNum <= 0) return;

    if (needsApproval) {
      setStep("approve");
      setTxState("pending");
      setShowTxModal(true);
      approve(amount);
    } else {
      setStep("stake");
      setTxState("pending");
      setShowTxModal(true);
      stake(amount, selectedTier);
    }
  }, [amount, amountNum, needsApproval, approve, stake, selectedTier]);

  const handleStakeAfterApproval = useCallback(() => {
    setTxState("pending");
    stake(amount, selectedTier);
  }, [amount, selectedTier, stake]);

  const quickAmounts = [
    { label: "100K", value: "100000" },
    { label: "500K", value: "500000" },
    { label: "1M", value: "1000000" },
    { label: "5M", value: "5000000" },
  ];

  if (!isConnected) {
    return (
      <div className="glass-card p-8 text-center">
        <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold mb-4">
          Connect to Start Staking
        </h3>
        <p className="text-gray-400 mb-6">
          Connect your wallet to stake BREW tokens and earn rewards.
        </p>
        <ConnectButton />
      </div>
    );
  }

  return (
    <>
      <div className="glass-card p-6 sm:p-8">
        <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold mb-6">
          Stake BREW
        </h3>

        {/* Tier Selection */}
        <div className="mb-6">
          <label className="text-sm text-gray-400 mb-3 block">Select Tier</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TIER_CONFIG.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTier(t.id)}
                className={`rounded-xl border p-3 text-center transition-all ${
                  selectedTier === t.id
                    ? "border-brew/50 bg-brew/10 shadow-lg shadow-brew/10"
                    : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"
                }`}
              >
                <span className="text-lg">{t.icon}</span>
                <div className="text-xs font-medium mt-1">{t.name}</div>
                <div
                  className="font-[family-name:var(--font-jetbrains)] text-sm font-bold mt-0.5"
                  style={{ color: t.color }}
                >
                  {t.apy}%
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-gray-400">Amount</label>
            <span className="text-xs text-gray-500">
              Balance:{" "}
              <span className="font-[family-name:var(--font-jetbrains)] text-gray-300">
                {Number(balanceFormatted).toLocaleString()} BREW
              </span>
            </span>
          </div>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-4 pr-20 text-xl font-[family-name:var(--font-jetbrains)] text-white placeholder-gray-600 outline-none transition-colors focus:border-brew/30 focus:bg-white/[0.04]"
            />
            <button
              onClick={() => setAmount(balanceFormatted)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-brew/10 px-3 py-1.5 text-xs font-bold text-brew hover:bg-brew/20 transition-colors"
            >
              MAX
            </button>
          </div>

          {/* Quick amounts */}
          <div className="flex gap-2 mt-3">
            {quickAmounts.map((qa) => (
              <button
                key={qa.label}
                onClick={() => setAmount(qa.value)}
                className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.02] py-2 text-xs font-medium text-gray-400 hover:bg-white/[0.04] hover:text-white transition-colors"
              >
                {qa.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reward Calculator */}
        {amountNum > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
          >
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
              <Info size={14} />
              <span>Estimated Rewards</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-gray-500 mb-1">Daily</div>
                <div className="font-[family-name:var(--font-jetbrains)] text-sm text-success font-semibold">
                  +{calculateRewards(amountNum, tier.apy, 1).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Monthly</div>
                <div className="font-[family-name:var(--font-jetbrains)] text-sm text-success font-semibold">
                  +{calculateRewards(amountNum, tier.apy, 30).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Yearly</div>
                <div className="font-[family-name:var(--font-jetbrains)] text-sm text-success font-semibold">
                  +{calculateRewards(amountNum, tier.apy, 365).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Penalty Warning */}
        {tier.penalty > 0 && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-danger/20 bg-danger/5 p-4 text-sm">
            <AlertTriangle size={18} className="text-danger mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-danger">Early Withdrawal Penalty</p>
              <p className="text-gray-400 mt-1">
                Unstaking before {tier.lockDays} days will incur a {tier.penalty}% penalty on
                your principal and forfeit pending rewards.
              </p>
            </div>
          </div>
        )}

        {/* Stepper */}
        {needsApproval && amountNum > 0 && (
          <div className="mb-6 flex items-center gap-3 text-sm">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                step === "approve" || step === "input"
                  ? "bg-brew text-white"
                  : "bg-success text-white"
              }`}
            >
              {step === "stake" ? <Check size={14} /> : "1"}
            </div>
            <span className={step === "stake" ? "text-gray-500" : "text-white"}>
              Approve BREW
            </span>
            <ArrowRight size={14} className="text-gray-600" />
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                step === "stake" ? "bg-brew text-white" : "bg-white/10 text-gray-500"
              }`}
            >
              2
            </div>
            <span className={step === "stake" ? "text-white" : "text-gray-500"}>
              Stake BREW
            </span>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={step === "stake" && isApproveSuccess ? handleStakeAfterApproval : handleStake}
          disabled={!amount || amountNum <= 0 || isApproving || isStaking || isApproveConfirming || isStakeConfirming}
          className="w-full rounded-xl bg-gradient-to-r from-brew to-amber-500 py-4 text-lg font-bold text-white shadow-lg shadow-brew/25 transition-all hover:shadow-brew/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-brew/25"
        >
          {isApproving || isApproveConfirming ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={20} className="animate-spin" />
              Approving...
            </span>
          ) : isStaking || isStakeConfirming ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={20} className="animate-spin" />
              Staking...
            </span>
          ) : needsApproval ? (
            `Approve & Stake ${amountNum.toLocaleString()} BREW`
          ) : (
            `Stake ${amountNum > 0 ? amountNum.toLocaleString() + " " : ""}BREW in ${tier.name}`
          )}
        </button>
      </div>

      {/* Transaction Modal */}
      <TxModal
        isOpen={showTxModal}
        onClose={() => {
          setShowTxModal(false);
          if (txState === "success") {
            resetStake();
          }
        }}
        state={txState}
        hash={txHash}
        error={txError}
        title={
          step === "approve"
            ? "Approving BREW"
            : `Staking ${amountNum.toLocaleString()} BREW`
        }
      />
    </>
  );
}
