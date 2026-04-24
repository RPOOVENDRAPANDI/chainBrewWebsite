"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { polygon } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "ChainBrew Staking",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID || "chainbrew-staking-app",
  chains: [polygon],
  ssr: true,
});
