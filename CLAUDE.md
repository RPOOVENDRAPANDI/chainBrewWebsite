# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

- `npm run dev` — Start Next.js dev server (localhost:3000, uses Turbopack)
- `npm run build` — Production build
- `npm run lint` — Run ESLint (Next.js core web vitals rules)
- No test framework is configured

## Architecture

**Next.js 16 App Router** with TypeScript, deployed on Polygon mainnet.

### Source Layout

- `app/` — Two routes: `/` (landing page) and `/stake` (staking app). Uses App Router with `layout.tsx` as root.
- `components/` — React components. No component library; all UI is Tailwind CSS + Framer Motion.
- `hooks/` — wagmi-based contract interaction hooks (`useBrewContract`, `useStakingContract`, `usePoolInfo`).
- `lib/` — Contract ABIs/addresses (`contracts.ts`), wagmi+RainbowKit config (`wagmi.ts`), formatting helpers (`utils.ts`).

### Web3 Stack

- **wagmi** + **viem** for contract reads/writes (not raw ethers calls in components)
- **RainbowKit** for wallet connection UI
- **React Query** (TanStack) for caching contract reads
- **Chain**: Polygon only (ID 137)
- **Contracts**: BREW token (`0xac88...2917`) and BrewStaking (`0x6Ee1...fF60`) — addresses and ABIs live in `lib/contracts.ts`

### Key Data Flows

1. **Staking**: User approves BREW spend → calls `stake(amount, tier)` — two-step tx flow handled in `StakingForm.tsx`
2. **Claiming/Unstaking**: User selects a position → claim or unstake via `StakeCard.tsx` → status shown in `TxModal.tsx`
3. **Pool stats**: `usePoolInfo` reads `getPoolInfo()` from contract → displayed in `StatsBar.tsx` with animated counters

### Staking Tiers

| Tier | ID | Lock | APY | Early Exit Penalty |
|---|---|---|---|---|
| Flexible | 0 | None | 8% | 0% |
| Silver | 1 | 30d | 20% | 10% |
| Gold | 2 | 90d | 40% | 15% |
| Platinum | 3 | 365d | 80% | 25% |

Tier config is defined in `lib/contracts.ts` — APY stored as basis points (e.g., 8% = 800 bps). All token amounts use 18 decimals.

### Styling

- Tailwind CSS v4 with custom theme defined inline in `app/globals.css`
- Primary color: `--color-brew: #F97316` (orange), accent: `--color-accent: #A855F7` (purple)
- Fonts: Syne (headings), Outfit (body), JetBrains Mono (numbers/code) — loaded via `next/font` in `layout.tsx`
- Dark theme with glassmorphism cards, gradient meshes, and grain overlay

### Provider Setup

`components/Providers.tsx` wraps the app with wagmi, RainbowKit, and React Query providers. This is a `"use client"` component imported in `app/layout.tsx`.

## Environment Variables

Required in `.env.local` (see `.env.example`):
- `NEXT_PUBLIC_WALLETCONNECT_ID` — WalletConnect project ID
- `NEXT_PUBLIC_BREW_ADDRESS` — BREW token contract address
- `NEXT_PUBLIC_STAKING_ADDRESS` — Staking contract address
- `NEXT_PUBLIC_POLYGON_RPC` — Polygon RPC endpoint

## Project Context

See `CHAINBREW_PROJECT_CONTEXT.md` for full contract ABIs, tokenomics breakdown, and deployment status. See `AGENT_BUILD_INSTRUCTIONS.md` for original design specs and UX flow.
