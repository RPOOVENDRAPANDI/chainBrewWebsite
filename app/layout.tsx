import type { Metadata } from "next";
import { Syne, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ChainBrew | Stake BREW & Earn Rewards on Polygon",
  description:
    "ChainBrew is a DeFi staking protocol on Polygon. Stake BREW tokens across 4 tiers with up to 80% APY. Verified smart contracts, real yield.",
  keywords: ["ChainBrew", "BREW", "DeFi", "staking", "Polygon", "crypto", "yield"],
  openGraph: {
    title: "ChainBrew | Stake BREW & Earn Rewards",
    description: "Stake BREW tokens on Polygon with up to 80% APY across 4 tiers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-screen bg-black text-white">
        <div className="noise-overlay" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
