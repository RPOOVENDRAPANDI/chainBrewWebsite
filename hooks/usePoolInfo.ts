"use client";

import { useReadContract } from "wagmi";
import { STAKING_ADDRESS, STAKING_ABI } from "@/lib/contracts";

export function usePoolInfo() {
  const { data, isLoading, error, refetch } = useReadContract({
    address: STAKING_ADDRESS,
    abi: STAKING_ABI,
    functionName: "getPoolInfo",
  });

  return {
    totalStaked: data?.[0],
    rewardPool: data?.[1],
    totalRewardsPaid: data?.[2],
    isLoading,
    error,
    refetch,
  };
}
