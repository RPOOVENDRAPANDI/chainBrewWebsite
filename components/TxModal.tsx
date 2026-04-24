"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check, X, ExternalLink } from "lucide-react";
import { polygonScanTx } from "@/lib/utils";
import confetti from "canvas-confetti";

interface TxModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: "pending" | "confirming" | "success" | "error";
  hash?: string;
  error?: string;
  title: string;
}

export default function TxModal({ isOpen, onClose, state, hash, error, title }: TxModalProps) {
  useEffect(() => {
    if (state === "success") {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#F97316", "#A855F7", "#10B981", "#F59E0B"],
      });
    }
  }, [state]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={state === "success" || state === "error" ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm rounded-2xl border border-white/[0.06] bg-[#111] p-8 text-center shadow-2xl"
          >
            {/* Close button for success/error */}
            {(state === "success" || state === "error") && (
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-lg p-1 text-gray-500 hover:bg-white/[0.04] hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            )}

            {/* Icon */}
            <div className="mb-6 flex justify-center">
              {state === "pending" && (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brew/10">
                  <Loader2 size={32} className="animate-spin text-brew" />
                </div>
              )}
              {state === "confirming" && (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <Loader2 size={32} className="animate-spin text-accent" />
                </div>
              )}
              {state === "success" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10, stiffness: 200 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10"
                >
                  <Check size={32} className="text-success" />
                </motion.div>
              )}
              {state === "error" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-danger/10"
                >
                  <X size={32} className="text-danger" />
                </motion.div>
              )}
            </div>

            {/* Title */}
            <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold mb-2">
              {state === "pending" && "Confirm in Wallet"}
              {state === "confirming" && "Processing..."}
              {state === "success" && "Transaction Confirmed!"}
              {state === "error" && "Transaction Failed"}
            </h3>

            {/* Subtitle */}
            <p className="text-sm text-gray-400 mb-6">
              {state === "pending" && `Please confirm "${title}" in your wallet.`}
              {state === "confirming" && "Transaction submitted. Waiting for confirmation..."}
              {state === "success" && `${title} completed successfully.`}
              {state === "error" && (error || "Something went wrong. Please try again.")}
            </p>

            {/* Tx Hash Link */}
            {hash && (state === "confirming" || state === "success") && (
              <a
                href={polygonScanTx(hash)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-sm text-gray-400 hover:bg-white/[0.04] hover:text-white transition-colors"
              >
                View on PolygonScan
                <ExternalLink size={14} />
              </a>
            )}

            {/* Close button for success */}
            {state === "success" && (
              <button
                onClick={onClose}
                className="mt-4 w-full rounded-xl bg-success/10 py-3 text-sm font-semibold text-success hover:bg-success/20 transition-colors"
              >
                Done
              </button>
            )}

            {/* Retry for error */}
            {state === "error" && (
              <button
                onClick={onClose}
                className="mt-4 w-full rounded-xl bg-white/[0.04] py-3 text-sm font-semibold text-white hover:bg-white/[0.06] transition-colors"
              >
                Close & Retry
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
