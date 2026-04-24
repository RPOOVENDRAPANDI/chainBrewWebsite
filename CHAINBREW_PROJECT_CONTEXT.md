# ChainBrew (BREW) — Project Context & Summary

## Overview
ChainBrew (BREW) is a DeFi staking protocol on Polygon. Users stake BREW tokens across 4 tiers with different lock periods and earn rewards.

---

## Live Contract Addresses (Polygon Mainnet - Chain ID: 137)

| Contract | Address | Verified |
|----------|---------|----------|
| **ChainBrew Token (BREW)** | `0xac88b89311F39c456d051b39E570ae51b7a32917` | ✅ Yes |
| **BrewStaking** | `0x6Ee1E29fd66330539230D5FA7F430a89F275fF60` | ✅ Yes |

PolygonScan links:
- Token: https://polygonscan.com/address/0xac88b89311F39c456d051b39E570ae51b7a32917#code
- Staking: https://polygonscan.com/address/0x6Ee1E29fd66330539230D5FA7F430a89F275fF60#code

---

## Token Details

- **Name:** ChainBrew
- **Symbol:** BREW
- **Decimals:** 18
- **Total Supply:** 100,000,000 BREW
- **Standard:** ERC-20
- **Network:** Polygon PoS (Chain ID: 137)
- **Features:** Mintable (capped at 100M), Burnable

---

## Tokenomics Distribution

| Allocation | % | Amount | Status |
|---|---|---|---|
| Public Market | 35% | 35,000,000 | In creator wallet |
| Staking Rewards Pool | 20% | 20,000,000 | ✅ Funded in staking contract |
| Team (3yr vesting) | 12% | 12,000,000 | In creator wallet |
| Liquidity Pool | 10% | 10,000,000 | Pending (QuickSwap) |
| Community/Airdrops | 10% | 10,000,000 | In creator wallet |
| Development Fund | 8% | 8,000,000 | In creator wallet |
| Reserve | 5% | 5,000,000 | In creator wallet |

---

## Staking Tiers

| Tier | ID | Lock Period | APY | Early Exit Penalty |
|---|---|---|---|---|
| Flexible | 0 | None | 8% | 0% |
| Silver | 1 | 30 days | 20% | 10% |
| Gold | 2 | 90 days | 40% | 15% |
| Platinum | 3 | 365 days | 80% | 25% |

---

## Smart Contract ABIs (Key Functions)

### ChainBrew.sol (ERC-20 Token)
```
- name() → string
- symbol() → string
- decimals() → uint8 (18)
- totalSupply() → uint256
- balanceOf(address) → uint256
- transfer(address to, uint256 amount) → bool
- approve(address spender, uint256 amount) → bool
- allowance(address owner, address spender) → uint256
- transferFrom(address from, address to, uint256 amount) → bool
- mint(address to, uint256 amount) [onlyOwner]
- burn(uint256 amount)
- MAX_SUPPLY() → uint256
```

### BrewStaking.sol (Staking Contract)
```
Read Functions:
- brewToken() → address
- tierConfigs(uint8 tier) → (lockDuration, apyBps, earlyExitFeeBps)
- userStakes(address, uint256) → (amount, startTime, lastClaimTime, tier, active)
- totalStaked() → uint256
- totalRewardsPaid() → uint256
- rewardPool() → uint256
- pendingRewards(address user, uint256 stakeIndex) → uint256
- getUserStakeCount(address user) → uint256
- getUserStake(address user, uint256 index) → (amount, startTime, lastClaimTime, tier, active, pending)
- getPoolInfo() → (totalStaked, rewardPool, totalRewardsPaid)

Write Functions:
- stake(uint256 amount, uint8 tier) — Stake BREW tokens
- claimRewards(uint256 stakeIndex) — Claim pending rewards
- unstake(uint256 stakeIndex) — Unstake tokens + claim rewards
- fundRewardPool(uint256 amount) [onlyOwner] — Add rewards to pool

Tier Enum: Flexible=0, Silver=1, Gold=2, Platinum=3
```

---

## What Has Been Completed

1. ✅ ERC-20 Token contract (ChainBrew.sol) — deployed & verified
2. ✅ Staking contract (BrewStaking.sol) — deployed & verified
3. ✅ Reward pool funded with 20M BREW
4. ✅ Contracts verified on PolygonScan
5. ⏳ Liquidity on QuickSwap — pending
6. ⏳ Staking website — needs to be built
7. ⏳ Whitepaper — needs to be written
8. ⏳ Marketing — needs planning

---

## Technical Stack Used

- **Blockchain:** Polygon PoS
- **Language:** Solidity 0.8.20
- **Framework:** Hardhat
- **Libraries:** OpenZeppelin Contracts v5
- **RPC Provider:** Alchemy
- **Wallet:** MetaMask

---

## Creator Wallet

- Address: 0x678F31C7D8E51cbA10C5730DaE9346A8A42EBfc7
- Holds: ~80M BREW + remaining POL for gas

---

## Important Notes

- All amounts in contracts use 18 decimals (1 BREW = 1e18 wei)
- APY is stored in basis points (e.g., 8% = 800 bps, 80% = 8000 bps)
- Reward calculation: `reward = (staked * apyBps * elapsed) / (365 days * 10000)`
- Early withdrawal forfeits all pending rewards + incurs penalty on principal
- Contract ownership is with the creator wallet (consider multi-sig later)
