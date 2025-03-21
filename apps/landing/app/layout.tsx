import PreloadController from "@/components/PreloadController";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Nexus Politics - Enabling Digital Democracy",
  description:
    "Nexus Politics is a platform that connects citizens with their representatives to solve local problems together.",
  keywords:
    "politics, democracy, digital democracy, civic tech, citizen engagement",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <PreloadController />
        {children}
      </body>
    </html>
  );
}
