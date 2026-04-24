"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Stake", href: "/stake" },
  { label: "Tiers", href: "/#tiers" },
  { label: "Tokenomics", href: "/#tokenomics" },
  { label: "Roadmap", href: "/#roadmap" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brew to-amber-500 text-lg font-bold text-white shadow-lg shadow-brew/20 transition-shadow group-hover:shadow-brew/40">
            B
          </div>
          <span className="font-[family-name:var(--font-syne)] text-xl font-bold tracking-tight">
            Chain<span className="text-brew">Brew</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-white/[0.04] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Wallet + Live */}
        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs">
            <div className="pulse-dot" />
            <span className="text-gray-400">Live on Polygon</span>
          </div>
          <ConnectButton
            chainStatus="icon"
            showBalance={false}
            accountStatus="address"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-gray-400 hover:bg-white/[0.04] md:hidden"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/[0.06] bg-black/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-gray-400 transition-colors hover:bg-white/[0.04] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-4">
                <div className="flex items-center gap-2 text-xs">
                  <div className="pulse-dot" />
                  <span className="text-gray-400">Live on Polygon</span>
                </div>
                <ConnectButton
                  chainStatus="icon"
                  showBalance={false}
                  accountStatus="avatar"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
