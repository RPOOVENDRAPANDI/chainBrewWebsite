import { formatUnits } from "viem";

export function formatBrew(value: bigint, decimals = 18): string {
  const num = Number(formatUnits(value, decimals));
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(2) + "K";
  }
  return num.toFixed(2);
}

export function formatBrewFull(value: bigint, decimals = 18): string {
  const num = Number(formatUnits(value, decimals));
  return num.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(2) + "K";
  }
  return num.toFixed(2);
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function daysRemaining(startTime: bigint, lockDays: number): number {
  if (lockDays === 0) return 0;
  const start = Number(startTime) * 1000;
  const end = start + lockDays * 24 * 60 * 60 * 1000;
  const now = Date.now();
  const remaining = Math.max(0, Math.ceil((end - now) / (24 * 60 * 60 * 1000)));
  return remaining;
}

export function lockProgress(startTime: bigint, lockDays: number): number {
  if (lockDays === 0) return 100;
  const start = Number(startTime) * 1000;
  const elapsed = Date.now() - start;
  const total = lockDays * 24 * 60 * 60 * 1000;
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

export function calculateRewards(
  amount: number,
  apyPercent: number,
  days: number
): number {
  return (amount * apyPercent * days) / (365 * 100);
}

export function polygonScanTx(hash: string): string {
  return `https://polygonscan.com/tx/${hash}`;
}

export function polygonScanAddress(address: string): string {
  return `https://polygonscan.com/address/${address}`;
}
