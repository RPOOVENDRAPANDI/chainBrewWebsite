"use client";

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { BREW_ADDRESS, BREW_ABI, STAKING_ADDRESS } from "@/lib/contracts";
import { parseUnits } from "viem";

export function useBrewBalance(address: `0x${string}` | undefined) {
  return useReadContract({
    address: BREW_ADDRESS,
    abi: BREW_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });
}

export function useBrewAllowance(
  owner: `0x${string}` | undefined,
  spender: `0x${string}` = STAKING_ADDRESS
) {
  return useReadContract({
    address: BREW_ADDRESS,
    abi: BREW_ABI,
    functionName: "allowance",
    args: owner ? [owner, spender] : undefined,
    query: { enabled: !!owner },
  });
}

export function useApprove() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const approve = (amount: string) => {
    writeContract({
      address: BREW_ADDRESS,
      abi: BREW_ABI,
      functionName: "approve",
      args: [STAKING_ADDRESS, parseUnits(amount, 18)],
    });
  };

  return { approve, hash, isPending, isConfirming, isSuccess, error };
}
