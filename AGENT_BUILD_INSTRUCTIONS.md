# ChainBrew Staking Website — Build Instructions for Agent

## READ FIRST
Read `CHAINBREW_PROJECT_CONTEXT.md` for all contract addresses, ABIs, staking tiers, and tokenomics.

---

## Objective
Build a production-grade, visually stunning DeFi staking website for ChainBrew (BREW) on Polygon. The website should connect to real smart contracts, allow users to stake/unstake BREW tokens, claim rewards, and view pool statistics.

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + Framer Motion for animations
- **Web3:** ethers.js v6 or wagmi + viem + RainbowKit for wallet connection
- **Fonts:** Use distinctive fonts (e.g., Syne, Space Mono, Clash Display, Cabinet Grotesk — NOT Inter, Roboto, or Arial)
- **Hosting:** Vercel (free)
- **Icons:** Lucide React or Heroicons

---

## Design Direction & Inspiration

### Visual Style: "Premium DeFi Lounge"
Think dark, moody, premium — like a high-end whiskey bar meets fintech. The "Brew" theme should be subtle but present.

### Key Design References (study these sites for UI patterns):
1. **Lido.fi** — Clean staking interface, clear APY display, trust indicators
2. **Jito.network** — Beautiful gradient backgrounds, smooth animations, Solana staking UI
3. **Pendle.finance** — Advanced yield UI, dark theme, data-rich dashboards
4. **Aave.com** — Professional DeFi dashboard, clear stats cards
5. **Uniswap** — Clean swap/pool interface, wallet connection flow

### Color Palette
```
Primary:     #F97316 (Amber/Orange — the "brew" color)
Secondary:   #A855F7 (Purple — accent for staking)
Success:     #10B981 (Green — rewards, positive numbers)
Danger:      #EF4444 (Red — penalties, warnings)
Background:  #000000 → #0A0A0A → #111111 (layered dark backgrounds)
Surface:     rgba(255,255,255,0.03) to rgba(255,255,255,0.06)
Text:        #FFFFFF, #D1D5DB, #9CA3AF, #6B7280 (hierarchy)
Borders:     rgba(255,255,255,0.06) to rgba(255,255,255,0.1)
```

### Typography
- Headlines: Bold display font (Syne, Clash Display, or Cabinet Grotesk)
- Body: Clean sans-serif (Outfit, General Sans)
- Numbers/Data: Monospace (JetBrains Mono, Space Mono, or Fira Code)
- APY percentages should be LARGE and prominent

### Must-Have Visual Effects
1. **Gradient mesh background** — subtle animated gradient blobs (orange + purple) behind hero section
2. **Glassmorphism cards** — frosted glass effect on stat cards with backdrop-blur
3. **Scroll-triggered animations** — elements fade/slide in as user scrolls (use Framer Motion `useInView`)
4. **Particle/grain overlay** — subtle noise texture over the background for depth
5. **Hover micro-interactions** — cards lift with shadow on hover, buttons glow
6. **Number animations** — counters that animate up when they come into view (like counting from 0 to 20,000,000)
7. **Staking tier cards** — each tier has its own subtle gradient/glow matching its rank
8. **Live pulsing dot** — next to "Live on Polygon" indicator
9. **Smooth page transitions** — between sections
10. **Responsive** — must work perfectly on mobile

---

## Pages & Sections

### 1. Landing Page (Hero Section)
- Large animated headline: "Brew Your Crypto. Stake & Earn." or similar
- Animated background with gradient mesh blobs
- Key stats: Total Staked, Reward Pool, APY up to 80%
- CTA button: "Start Staking" → scrolls to staking section or opens app
- Trust badges: "Verified on PolygonScan", "Polygon Network", "100M Supply"
- Subtle beer/brew-themed 3D element or illustration (optional)

### 2. Stats Dashboard (above the fold)
- 4 glass-morphism stat cards in a row:
  - Total Value Locked (read from contract: `totalStaked`)
  - Reward Pool Remaining (read from contract: `rewardPool`)
  - Total Rewards Distributed (read from contract: `totalRewardsPaid`)
  - Number of stakers (can be estimated or tracked)
- Numbers should animate when they come into view

### 3. Staking Tiers Section
- 4 beautiful tier cards side by side (Flexible, Silver, Gold, Platinum)
- Each card shows: tier icon, name, APY (BIG), lock period, penalty
- Cards should have unique gradients:
  - Flexible: neutral gray gradient
  - Silver: cool silver/blue gradient
  - Gold: warm gold gradient with subtle shimmer
  - Platinum: purple/diamond gradient with glow effect
- Hover effect: card lifts, border glows in tier color
- Click to select tier → opens staking form

### 4. Staking Interface (Core App)
- **Connect Wallet** button (RainbowKit or custom) — prominent if not connected
- **Staking form:**
  - Token amount input with MAX button
  - Quick amount buttons (1M, 5M, 10M, etc.)
  - Selected tier display with APY
  - Reward calculator: shows daily/monthly/yearly projected rewards
  - Early withdrawal penalty warning (for locked tiers)
  - "Stake BREW" button with loading state
- **Must approve BREW spending** before first stake (2-step: Approve → Stake)

### 5. My Stakes Dashboard
- Summary cards: Total Staked, Total Pending Rewards, Active Positions
- List of active stakes, each showing:
  - Tier name + icon
  - Amount staked
  - Pending rewards (updates in real-time or on refresh)
  - Lock progress bar (% of lock period completed)
  - Days remaining (or "Unlocked")
  - Claim Rewards button
  - Unstake button (with penalty warning if early)
- Empty state: friendly illustration with "Start staking to earn rewards"

### 6. Tokenomics Section
- Animated donut/pie chart or horizontal bar chart showing distribution
- Each segment with color, label, percentage, and amount
- Contract addresses with copy buttons
- Verified badges

### 7. How It Works Section
- 3-4 step visual flow:
  1. Connect Wallet (MetaMask icon)
  2. Choose a Tier (tier icons)
  3. Stake BREW (arrow animation)
  4. Earn Rewards (growing coins animation)
- Each step should animate in on scroll

### 8. Roadmap
- Vertical timeline with animated dots
- Completed items in green, current in orange (pulsing), future in gray
- Milestones:
  - Q2 2026: Token launch ✅
  - Q2 2026: Staking platform ✅
  - Q2 2026: Contract verification ✅
  - Q3 2026: DEX liquidity + CoinGecko listing
  - Q3 2026: Partnerships & dual farming
  - Q4 2026: Mobile app
  - 2027: Governance & DAO

### 9. Footer
- ChainBrew logo + tagline
- Contract addresses
- Social links (Twitter, Telegram, Discord, GitHub)
- "Built on Polygon" badge

---

## Smart Contract Integration

### Required Contract Interactions

```javascript
// 1. READ: Get pool info
const poolInfo = await stakingContract.getPoolInfo();
// Returns: { totalStaked, rewardPool, totalRewardsPaid }

// 2. READ: Get user's BREW balance
const balance = await brewToken.balanceOf(userAddress);

// 3. READ: Get user's stake count
const count = await stakingContract.getUserStakeCount(userAddress);

// 4. READ: Get individual stake details
const stake = await stakingContract.getUserStake(userAddress, index);
// Returns: { amount, startTime, lastClaimTime, tier, active, pending }

// 5. READ: Get pending rewards
const rewards = await stakingContract.pendingRewards(userAddress, index);

// 6. WRITE: Approve BREW spending (before first stake)
await brewToken.approve(STAKING_ADDRESS, amount);

// 7. WRITE: Stake BREW
await stakingContract.stake(amount, tierEnum); // tier: 0-3

// 8. WRITE: Claim rewards
await stakingContract.claimRewards(stakeIndex);

// 9. WRITE: Unstake
await stakingContract.unstake(stakeIndex);
```

### Contract ABIs (Minimal — only what website needs)

```javascript
const BREW_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)"
];

const STAKING_ABI = [
  "function stake(uint256 amount, uint8 tier)",
  "function claimRewards(uint256 stakeIndex)",
  "function unstake(uint256 stakeIndex)",
  "function pendingRewards(address user, uint256 stakeIndex) view returns (uint256)",
  "function getUserStakeCount(address user) view returns (uint256)",
  "function getUserStake(address user, uint256 index) view returns (uint256 amount, uint256 startTime, uint256 lastClaimTime, uint8 tier, bool active, uint256 pending)",
  "function getPoolInfo() view returns (uint256 totalStaked, uint256 rewardPool, uint256 totalRewardsPaid)",
  "function totalStaked() view returns (uint256)",
  "function rewardPool() view returns (uint256)"
];
```

### Constants
```javascript
const BREW_ADDRESS = "0xac88b89311F39c456d051b39E570ae51b7a32917";
const STAKING_ADDRESS = "0x6Ee1E29fd66330539230D5FA7F430a89F275fF60";
const POLYGON_CHAIN_ID = 137;
const POLYGON_RPC = "https://polygon-rpc.com";
```

---

## Wallet Connection Flow

1. User clicks "Connect Wallet"
2. RainbowKit modal opens → user selects MetaMask (or other wallet)
3. Check if on Polygon network → if not, prompt to switch
4. Once connected: show wallet address (truncated), BREW balance
5. Enable all staking/unstaking/claim functions
6. Handle disconnection gracefully

---

## Transaction UX

All write operations should show:
1. **Pending state** — "Confirming transaction..." with spinner
2. **Processing state** — "Transaction submitted. Waiting for confirmation..." with tx hash link to PolygonScan
3. **Success state** — "Transaction confirmed!" with green checkmark + confetti animation
4. **Error state** — Clear error message with retry option

For staking specifically:
1. Check if user has approved enough BREW allowance
2. If not → show Approve step first ("Approve BREW spending")
3. After approval → show Stake step ("Stake X BREW in Gold tier")
4. Both steps should show in a stepper UI

---

## Responsive Design

- **Desktop (1200px+):** Full layout, 4 tier cards in a row
- **Tablet (768px-1199px):** 2 tier cards per row, slightly condensed
- **Mobile (< 768px):** Single column, stacked cards, hamburger menu, bottom-fixed CTA button

---

## Animation Specifications

### Page Load
- Hero headline: fade up + slight blur clear (0.6s delay)
- Stat cards: staggered fade up (0.1s between each)
- Background blobs: slow continuous rotation (60s cycle)

### Scroll Animations (Framer Motion)
- Each section: fade up + slide from bottom (threshold: 0.2)
- Tier cards: staggered reveal left to right
- Numbers: count-up animation when in view
- Roadmap items: sequential reveal top to bottom

### Interactions
- Buttons: scale(1.02) on hover, scale(0.98) on click
- Cards: translateY(-4px) + shadow increase on hover
- Tier selection: border glow pulse animation
- Success: confetti burst (use canvas-confetti library)
- Loading: custom spinner with BREW logo rotation

---

## Performance Requirements

- Lighthouse score > 90 (Performance, Accessibility, SEO)
- Lazy load images and heavy components
- Use Next.js Image optimization
- Minimize Web3 RPC calls (cache contract reads, refresh on user action)
- SSR for landing page, CSR for staking app sections

---

## Deployment

1. Push to GitHub repository
2. Connect to Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_BREW_ADDRESS=0xac88b89311F39c456d051b39E570ae51b7a32917`
   - `NEXT_PUBLIC_STAKING_ADDRESS=0x6Ee1E29fd66330539230D5FA7F430a89F275fF60`
   - `NEXT_PUBLIC_POLYGON_RPC=https://polygon-rpc.com`
4. Deploy → get free .vercel.app URL
5. Later: connect custom domain

---

## File Structure

```
chainbrew-website/
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata
│   ├── page.tsx            # Landing page (hero + all sections)
│   ├── stake/
│   │   └── page.tsx        # Staking app page
│   └── globals.css         # Global styles + Tailwind
├── components/
│   ├── Header.tsx          # Navigation + wallet connect
│   ├── Hero.tsx            # Hero section with animated bg
│   ├── StatsBar.tsx        # TVL, reward pool, etc.
│   ├── TierCards.tsx       # 4 staking tier cards
│   ├── StakingForm.tsx     # Stake input + tier selection
│   ├── MyStakes.tsx        # User's active stakes list
│   ├── StakeCard.tsx       # Individual stake display
│   ├── Tokenomics.tsx      # Distribution chart
│   ├── HowItWorks.tsx      # Step-by-step guide
│   ├── Roadmap.tsx         # Timeline
│   ├── Footer.tsx          # Footer
│   ├── ConnectButton.tsx   # Wallet connect button
│   ├── TxModal.tsx         # Transaction status modal
│   └── AnimatedCounter.tsx # Number count-up component
├── hooks/
│   ├── useBrewContract.ts  # BREW token contract hook
│   ├── useStakingContract.ts # Staking contract hook
│   └── usePoolInfo.ts     # Pool stats hook
├── lib/
│   ├── contracts.ts        # ABIs, addresses, constants
│   ├── wagmi.ts           # Wagmi + RainbowKit config
│   └── utils.ts           # Formatters, helpers
├── public/
│   └── images/            # Logo, OG image, etc.
├── tailwind.config.ts
├── next.config.js
├── package.json
└── .env.local
```

---

## Must-Avoid Mistakes

1. Do NOT use generic fonts (Inter, Roboto, Arial)
2. Do NOT use purple-on-white gradient (overused AI aesthetic)
3. Do NOT make it look like every other DeFi dashboard
4. Do NOT forget mobile responsiveness
5. Do NOT hardcode RPC URLs in frontend code (use env vars)
6. Do NOT skip the approve step before staking
7. Do NOT show raw wei values — always format to human readable
8. Do NOT forget error handling for failed transactions
9. Do NOT auto-refresh contract data every second (use event listeners or manual refresh)
10. Do NOT make the beer/brew theme too literal or cheesy — keep it subtle and premium
