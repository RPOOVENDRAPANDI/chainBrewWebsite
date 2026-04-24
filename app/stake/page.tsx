"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import StakingForm from "@/components/StakingForm";
import MyStakes from "@/components/MyStakes";
import Footer from "@/components/Footer";
import { useAccount } from "wagmi";
import { useBrewBalance } from "@/hooks/useBrewContract";
import { formatBrew } from "@/lib/utils";
import { Coins } from "lucide-react";

function StakeContent() {
  const searchParams = useSearchParams();
  const tierParam = searchParams.get("tier");
  const initialTier = tierParam ? parseInt(tierParam, 10) : 0;

  const { address, isConnected } = useAccount();
  const { data: balance } = useBrewBalance(address);

  return (
    <>
      <Header />
      <main className="pt-24 pb-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-syne)] text-3xl sm:text-4xl font-bold mb-2">
            Stake <span className="text-brew">BREW</span>
          </h1>
          <p className="text-gray-400">
            Stake your BREW tokens to earn rewards across premium tiers.
          </p>
          {isConnected && balance && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2 text-sm">
              <Coins size={16} className="text-brew" />
              <span className="text-gray-400">Wallet Balance:</span>
              <span className="font-[family-name:var(--font-jetbrains)] font-bold">
                {formatBrew(balance)} BREW
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Staking Form */}
          <div className="lg:col-span-2">
            <StakingForm initialTier={initialTier} />
          </div>

          {/* My Stakes */}
          <div className="lg:col-span-3">
            <MyStakes />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function StakePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-brew border-t-transparent animate-spin" />
        </div>
      }
    >
      <StakeContent />
    </Suspense>
  );
}
