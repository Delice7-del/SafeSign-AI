"use client";
import Link from "next/link";
import { HiHome, HiShieldCheck, HiFolder } from "react-icons/hi";

export default function BottomNav({ current = "Vault" }: { current?: string }) {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 md:hidden bg-[rgba(15,23,42,0.8)] border border-[rgba(255,255,255,0.04)] backdrop-blur rounded-full px-4 py-2 flex items-center gap-6 z-40 shadow-xl shadow-indigo-500/10">
      <Link href="/" className={`p-2.5 rounded-full transition-all text-slate-400 hover:text-slate-200 ${current === "Home" ? "text-white bg-white/5 neon-glow-blue" : ""}`} title="Home">
        <HiHome size={20} />
      </Link>
      <Link href="/analyze" className={`p-2.5 rounded-full transition-all text-slate-400 hover:text-slate-200 ${current === "Analyze" ? "text-white bg-white/5 neon-glow-purple" : ""}`} title="Analyze">
        <HiShieldCheck size={20} />
      </Link>
      <Link href="/vault" className={`p-2.5 rounded-full transition-all text-slate-400 hover:text-slate-200 ${current === "Vault" ? "text-white bg-white/5 neon-glow-purple" : ""}`} title="Vault">
        <HiFolder size={20} />
      </Link>
    </nav>
  );
}
