"use client";

import { ConnectButton as RKConnectButton } from "@rainbow-me/rainbowkit";
import { Wallet } from "lucide-react";

export default function ConnectButton() {
  return (
    <RKConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const connected = mounted && account && chain;

        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none" as const,
                userSelect: "none" as const,
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="btn-glow inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brew to-amber-500 px-8 text-lg font-semibold text-white shadow-lg shadow-brew/25 transition-all hover:shadow-brew/40 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Wallet size={20} />
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-danger/20 px-6 text-sm font-semibold text-danger border border-danger/30 hover:bg-danger/30 transition-colors"
                  >
                    Switch to Polygon
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-3">
                  <button
                    onClick={openChainModal}
                    className="flex h-10 items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 text-sm hover:bg-white/[0.06] transition-colors"
                  >
                    {chain.hasIcon && chain.iconUrl && (
                      <img
                        alt={chain.name ?? "Chain"}
                        src={chain.iconUrl}
                        className="h-5 w-5 rounded-full"
                      />
                    )}
                    <span className="hidden sm:inline text-gray-300">
                      {chain.name}
                    </span>
                  </button>
                  <button
                    onClick={openAccountModal}
                    className="flex h-10 items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 text-sm font-medium hover:bg-white/[0.06] transition-colors"
                  >
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </RKConnectButton.Custom>
  );
}
