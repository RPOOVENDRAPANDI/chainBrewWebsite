"use client";

import { useReadContract, useReadContracts, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { STAKING_ADDRESS, STAKING_ABI } from "@/lib/contracts";
import { parseUnits } from "viem";

export function useUserStakeCount(address: `0x${string}` | undefined) {
  return useReadContract({
    address: STAKING_ADDRESS,
    abi: STAKING_ABI,
    functionName: "getUserStakeCount",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });
}

export function useUserStakes(address: `0x${string}` | undefined, count: number) {
  const contracts = Array.from({ length: count }, (_, i) => ({
    address: STAKING_ADDRESS,
    abi: STAKING_ABI,
    functionName: "getUserStake" as const,
    args: [address!, BigInt(i)] as const,
  }));

  return useReadContracts({
    contracts: contracts.length > 0 ? contracts : undefined,
    query: { enabled: !!address && count > 0 },
  });
}

export function useStake() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const stake = (amount: string, tier: number) => {
    writeContract({
      address: STAKING_ADDRESS,
      abi: STAKING_ABI,
      functionName: "stake",
      args: [parseUnits(amount, 18), tier],
    });
  };

  return { stake, hash, isPending, isConfirming, isSuccess, error, reset };
}

export function useClaimRewards() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const claim = (stakeIndex: number) => {
    writeContract({
      address: STAKING_ADDRESS,
      abi: STAKING_ABI,
      functionName: "claimRewards",
      args: [BigInt(stakeIndex)],
    });
  };

  return { claim, hash, isPending, isConfirming, isSuccess, error, reset };
}

export function useUnstake() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const unstake = (stakeIndex: number) => {
    writeContract({
      address: STAKING_ADDRESS,
      abi: STAKING_ABI,
      functionName: "unstake",
      args: [BigInt(stakeIndex)],
    });
  };

  return { unstake, hash, isPending, isConfirming, isSuccess, error, reset };
}
