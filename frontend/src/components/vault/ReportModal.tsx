"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Contract } from "@/types/contract";
import { FiX, FiAlertTriangle, FiCheckCircle, FiInfo, FiLock } from "react-icons/fi";

interface ReportModalProps {
  open: boolean;
  contract?: Contract | null;
  onClose: () => void;
}

export default function ReportModal({ open, contract, onClose }: ReportModalProps) {
  if (!contract) return null;

  const score = contract.riskScore;
  const isHighRisk = score >= 70;
  const isMediumRisk = score >= 40 && score < 70;
  
  const gaugeColor = isHighRisk ? "#ef4444" : isMediumRisk ? "#f59e0b" : "#10b981";
  const riskLabel = isHighRisk ? "HIGH RISK" : isMediumRisk ? "MEDIUM RISK" : "LOW RISK";

  // SVG Gauge calculations
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const progressDash = (score / 100) * circumference;

  // Fallbacks for empty clauses
  const mockDangerous = contract.dangerousClauses || [
    "Unusual or short termination notice clauses.",
    "Liability limits that favor only one side.",
    "Unclear payment terms with high late fee percentages."
  ];

  const mockGood = contract.goodParts || [
    "Balanced mutual indemnification clauses.",
    "Reasonable revision limits with clear invoicing terms.",
    "Standard data security and GDPR compliance."
  ];

  const mockRoleRisks = contract.roleBasedRisks || 
    `As a ${contract.role}, your rights are governed by local statutes. Carefully review the liability and IP transfer schedules.`;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-4xl bg-[#0a0b18]/95 border border-white/10 rounded-3xl p-6 sm:p-8 overflow-hidden glass-panel shadow-2xl z-10"
          >
            {/* Ambient inner glows */}
            <div className="absolute inset-0 pointer-events-none -z-10">
              <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[rgba(99,102,241,0.08)] blur-3xl" />
              <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-[rgba(167,139,250,0.06)] blur-3xl" />
            </div>

            {/* Header */}
            <header className="flex items-start justify-between gap-4 pb-5 border-b border-white/5">
              <div>
                <div className="flex items-center gap-2.5">
                  <FiLock className="text-indigo-400 h-6 w-6 shrink-0" />
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                    {contract.name}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1.5 font-light">
                  Role Focus: <span className="text-slate-300 font-semibold">{contract.role}</span> • Analyzed on {new Date(contract.uploadedAt).toLocaleDateString()} • Format: {contract.fileType}
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <FiX className="h-5 w-5" />
              </button>
            </header>

            {/* Modal Body */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Gauge, Summary, and Role Risks */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 border-b lg:border-b-0 lg:border-r border-white/5 pb-6 lg:pb-0 lg:pr-8">
                
                {/* SVG Gauge */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-3">
                    SafeSign Risk Index
                  </span>
                  <div className="relative flex justify-center py-2">
                    <svg viewBox="0 0 130 130" className="w-[140px] h-[140px]">
                      <circle cx="65" cy="65" r={radius} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="9" />
                      <circle
                        cx="65"
                        cy="65"
                        r={radius}
                        fill="none"
                        stroke={gaugeColor}
                        strokeWidth="9"
                        strokeLinecap="round"
                        strokeDasharray={`${progressDash} ${circumference}`}
                        transform="rotate(-90 65 65)"
                        style={{ filter: `drop-shadow(0 0 8px ${gaugeColor}44)` }}
                      />
                      <text
                        x="65"
                        y="60"
                        textAnchor="middle"
                        fill="white"
                        fontSize="22"
                        fontWeight="700"
                      >
                        {score}%
                      </text>
                      <text
                        x="65"
                        y="76"
                        textAnchor="middle"
                        fill={gaugeColor}
                        fontSize="8"
                        fontWeight="700"
                        letterSpacing="1"
                      >
                        {riskLabel}
                      </text>
                    </svg>
                  </div>
                </div>

                {/* AI Summary */}
                <div className="w-full">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center lg:justify-start gap-1.5 mb-2">
                    <FiInfo className="text-indigo-400 h-3.5 w-3.5" />
                    <span>AI Analysis Summary</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light bg-[#0b0c1c]/50 border border-white/5 rounded-2xl p-4 text-justify">
                    {contract.summary}
                  </p>
                </div>

                {/* Role Specific Advice */}
                <div className="w-full mt-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center lg:justify-start gap-1.5 mb-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                    <span>Role-Based Risk Advice</span>
                  </h4>
                  <p className="text-xs text-indigo-200/90 leading-relaxed font-light bg-indigo-950/20 border border-indigo-500/10 rounded-2xl p-4 text-justify">
                    {mockRoleRisks}
                  </p>
                </div>
              </div>

              {/* Right Column: Clauses Breakdown */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Dangerous Clauses */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-widest flex items-center gap-2">
                    <FiAlertTriangle className="h-4 w-4" />
                    <span>Critical / Dangerous Clauses ({mockDangerous.length})</span>
                  </h4>
                  {mockDangerous.length === 0 ? (
                    <p className="text-xs text-emerald-400 font-light italic pl-2">No critical risks flagged in this contract.</p>
                  ) : (
                    <ul className="space-y-2.5">
                      {mockDangerous.map((clause, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-xs text-slate-300 font-light bg-rose-950/10 border border-rose-500/10 p-3.5 rounded-2xl"
                        >
                          <span className="h-5 w-5 shrink-0 rounded-full bg-rose-500/10 flex items-center justify-center text-[10px] text-rose-400 font-bold font-mono">
                            {i + 1}
                          </span>
                          <span className="leading-relaxed">{clause}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Good / Protective Parts */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                    <FiCheckCircle className="h-4 w-4" />
                    <span>Compliant / Protective Clauses ({mockGood.length})</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {mockGood.map((clause, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-xs text-slate-300 font-light bg-emerald-950/10 border border-emerald-500/10 p-3.5 rounded-2xl"
                      >
                        <span className="h-5 w-5 shrink-0 rounded-full bg-emerald-500/10 flex items-center justify-center text-[10px] text-emerald-400 font-bold font-mono">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{clause}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <footer className="mt-8 pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-end gap-3.5">
              <button
                onClick={onClose}
                className="w-full sm:w-auto rounded-xl border border-slate-800 bg-[#070814]/40 hover:bg-slate-900/50 hover:border-slate-700 text-slate-300 hover:text-white font-medium text-xs px-6 py-3 transition-all cursor-pointer"
              >
                Close Report
              </button>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
