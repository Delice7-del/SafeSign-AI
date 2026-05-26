"use client";

import { motion } from "framer-motion";
import { FiLock } from "react-icons/fi";

export default function VaultHeader() {
  return (
    <header className="relative flex flex-col items-start">
      {/* Ambient background glow effects */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -left-24 -top-20 w-96 h-96 rounded-full bg-gradient-to-tr from-[rgba(99,102,241,0.08)] to-[rgba(59,130,246,0.05)] blur-3xl" />
        <div className="absolute right-8 top-8 w-72 h-72 rounded-full bg-[rgba(75,100,119,0.04)] blur-2xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {/* Upper Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 mb-6 shadow-md shadow-indigo-500/5">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-[0.2em] text-indigo-300 uppercase select-none">
            Secure Digital Vault
          </span>
        </div>

        {/* H1 Title with Icon */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3 flex items-center gap-2.5">
          <FiLock className="text-indigo-400 h-8 w-8" />
          <span
            className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#a3b8ff] via-[#a78bfa] to-[#818cf8]"
          >
            Vault
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
          Securely store and manage your analyzed contracts and AI reports.
          All reports are encrypted and stored in your private storage dashboard.
        </p>
      </motion.div>
    </header>
  );
}
