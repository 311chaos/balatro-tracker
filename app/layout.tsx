import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { colors } from "@/config/colors";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const m6x11 = localFont({
  src: "../public/fonts/m6x11.ttf",
  weight: "400",
  variable: "--font-m6x11",
});

export const metadata: Metadata = {
  title: "Balatro Tracker",
  description: "Track your progress",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${m6x11.variable} h-full antialiased`}
      style={{
        "--rarity-common":    colors.rarity.common,
        "--rarity-uncommon":  colors.rarity.uncommon,
        "--rarity-rare":      colors.rarity.rare,
        "--rarity-legendary": colors.rarity.legendary,
        "--stake-white":      colors.stake.white,
        "--stake-red":        colors.stake.red,
        "--stake-green":      colors.stake.green,
        "--stake-black":      colors.stake.black,
        "--stake-blue":       colors.stake.blue,
        "--stake-purple":     colors.stake.purple,
        "--stake-orange":     colors.stake.orange,
        "--stake-gold":       colors.stake.gold,
      } as React.CSSProperties}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
};

export default RootLayout;
