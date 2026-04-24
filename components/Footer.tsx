"use client";

import { BREW_ADDRESS, STAKING_ADDRESS } from "@/lib/contracts";
import { polygonScanAddress } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-black/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brew to-amber-500 text-lg font-bold text-white">
                B
              </div>
              <span className="font-[family-name:var(--font-syne)] text-xl font-bold">
                Chain<span className="text-brew">Brew</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Premium DeFi staking protocol on Polygon. Brew your crypto with up to 80% APY.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-full border border-success/20 bg-success/5 px-3 py-1 text-xs text-success">
                <div className="h-1.5 w-1.5 rounded-full bg-success" />
                Built on Polygon
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-[family-name:var(--font-syne)] font-bold text-sm mb-4 text-gray-300">
              Protocol
            </h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href="/stake" className="hover:text-white transition-colors">
                  Stake BREW
                </a>
              </li>
              <li>
                <a href="/#tiers" className="hover:text-white transition-colors">
                  Staking Tiers
                </a>
              </li>
              <li>
                <a href="/#tokenomics" className="hover:text-white transition-colors">
                  Tokenomics
                </a>
              </li>
              <li>
                <a href="/#roadmap" className="hover:text-white transition-colors">
                  Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Contracts */}
          <div>
            <h4 className="font-[family-name:var(--font-syne)] font-bold text-sm mb-4 text-gray-300">
              Contracts
            </h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a
                  href={polygonScanAddress(BREW_ADDRESS)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  BREW Token <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href={polygonScanAddress(STAKING_ADDRESS)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  Staking Contract <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-[family-name:var(--font-syne)] font-bold text-sm mb-4 text-gray-300">
              Community
            </h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <span className="text-gray-600">Twitter — Coming Soon</span>
              </li>
              <li>
                <span className="text-gray-600">Telegram — Coming Soon</span>
              </li>
              <li>
                <span className="text-gray-600">Discord — Coming Soon</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <span>&copy; {new Date().getFullYear()} ChainBrew. All rights reserved.</span>
          <span className="font-[family-name:var(--font-jetbrains)]">
            Polygon Chain ID: 137
          </span>
        </div>
      </div>
    </footer>
  );
}
