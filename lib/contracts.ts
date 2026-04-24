export const BREW_ADDRESS = process.env.NEXT_PUBLIC_BREW_ADDRESS as `0x${string}` || "0xac88b89311F39c456d051b39E570ae51b7a32917";
export const STAKING_ADDRESS = process.env.NEXT_PUBLIC_STAKING_ADDRESS as `0x${string}` || "0x6Ee1E29fd66330539230D5FA7F430a89F275fF60";
export const POLYGON_CHAIN_ID = 137;

export const BREW_ABI = [
  {
    inputs: [],
    name: "name",
    outputs: [{ type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const STAKING_ABI = [
  {
    inputs: [
      { name: "amount", type: "uint256" },
      { name: "tier", type: "uint8" },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "stakeIndex", type: "uint256" }],
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "stakeIndex", type: "uint256" }],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "user", type: "address" },
      { name: "stakeIndex", type: "uint256" },
    ],
    name: "pendingRewards",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "user", type: "address" }],
    name: "getUserStakeCount",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "user", type: "address" },
      { name: "index", type: "uint256" },
    ],
    name: "getUserStake",
    outputs: [
      { name: "amount", type: "uint256" },
      { name: "startTime", type: "uint256" },
      { name: "lastClaimTime", type: "uint256" },
      { name: "tier", type: "uint8" },
      { name: "active", type: "bool" },
      { name: "pending", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPoolInfo",
    outputs: [
      { name: "totalStaked", type: "uint256" },
      { name: "rewardPool", type: "uint256" },
      { name: "totalRewardsPaid", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalStaked",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardPool",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const TIER_CONFIG = [
  {
    id: 0,
    name: "Flexible",
    lockDays: 0,
    apy: 8,
    penalty: 0,
    gradient: "from-gray-500/20 to-gray-600/10",
    border: "border-gray-500/30",
    glow: "shadow-gray-500/20",
    color: "#9CA3AF",
    icon: "☕",
  },
  {
    id: 1,
    name: "Silver",
    lockDays: 30,
    apy: 20,
    penalty: 10,
    gradient: "from-slate-300/20 to-blue-400/10",
    border: "border-slate-400/30",
    glow: "shadow-slate-400/20",
    color: "#94A3B8",
    icon: "🥈",
  },
  {
    id: 2,
    name: "Gold",
    lockDays: 90,
    apy: 40,
    penalty: 15,
    gradient: "from-amber-500/20 to-yellow-500/10",
    border: "border-amber-500/30",
    glow: "shadow-amber-500/20",
    color: "#F59E0B",
    icon: "🥇",
  },
  {
    id: 3,
    name: "Platinum",
    lockDays: 365,
    apy: 80,
    penalty: 25,
    gradient: "from-purple-500/20 to-violet-500/10",
    border: "border-purple-500/30",
    glow: "shadow-purple-500/20",
    color: "#A855F7",
    icon: "💎",
  },
] as const;
