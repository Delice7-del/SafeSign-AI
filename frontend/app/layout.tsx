import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SafeSign AI — Understand Any Contract Before You Sign",
  description:
    "AI-powered contract simplification and risk detection for ordinary people. Analyze contracts instantly.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SafeSign AI",
  },
  openGraph: {
    title: "SafeSign AI",
    description: "AI-powered contract analysis and risk detection",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#6366F1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sora.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${sora.className} bg-[#0B1120] text-white min-h-screen`}>
        <Navbar />
        <main className="pb-20 md:pb-0">{children}</main>
      </body>
    </html>
  );
}
