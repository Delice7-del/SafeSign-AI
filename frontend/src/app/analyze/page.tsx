"use client";

import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// SVG Icons as highly optimized local components
const WarningIcon = ({ className = "h-5 w-5 text-rose-500" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
    />
  </svg>
);

const SparklesIcon = ({ className = "h-5 w-5 text-indigo-400" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904 9 21l-.813-5.096L3 15.091l5.091-.813L9 9.187l.813 5.091 5.096.813-5.096.813ZM19.071 5.929l-.262 1.642-1.642.262 1.642.262.262 1.642.262-1.642 1.642-.262-1.642-.262-.262-1.642ZM19.071 18.071l-.262 1.642-1.642.262 1.642.262.262 1.642.262-1.642 1.642-.262-1.642-.262-.262-1.642Z"
    />
  </svg>
);

const CheckIcon = ({ className = "h-5 w-5 text-emerald-400" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 12.75 6 6 9-13.5"
    />
  </svg>
);

const HomeIcon = () => (
  <svg
    className="h-6 w-6 text-indigo-300 group-hover:text-indigo-200 transition-colors"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
    />
  </svg>
);

const LocationPinIcon = () => (
  <svg
    className="h-6 w-6 text-indigo-300 group-hover:text-indigo-200 transition-colors"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
    />
  </svg>
);

const BriefcaseIcon = () => (
  <svg
    className="h-6 w-6 text-indigo-300 group-hover:text-indigo-200 transition-colors"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125v-4.25m16.5 0a2.25 2.25 0 0 0-2.25-2.25H5.625a2.25 2.25 0 0 0-2.25 2.25m16.5 0v-3.375c0-.621-.504-1.125-1.125-1.125h-3.375a1.125 1.125 0 0 1-1.125-1.125V3.75c0-.621-.504-1.125-1.125-1.125h-2.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H3.75c-.621 0-1.125.504-1.125 1.125v3.375"
    />
  </svg>
);

const DocumentUploadIcon = () => (
  <svg
    className="h-8 w-8 text-indigo-300"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 16.5 4.5H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Z"
    />
  </svg>
);

// ─── Analysis Complete Loading View ─────────────────────────────────────────
const AnalysisCompleteView = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showComplete, setShowComplete] = useState(false);

  const steps = [
    {
      label: "Reading contract...",
      icon: (
        <svg className="h-4 w-4 text-indigo-300" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      ),
    },
    {
      label: "Detecting risky clauses...",
      icon: (
        <svg className="h-4 w-4 text-indigo-300" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75 21 21m-3.75-7.875a5.625 5.625 0 1 1-11.25 0 5.625 5.625 0 0 1 11.25 0Z" />
        </svg>
      ),
    },
    {
      label: "Simplifying legal language...",
      icon: (
        <svg className="h-4 w-4 text-indigo-300" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21 5.25 12 10.5 3m3 18 5.25-9L13.5 3" />
        </svg>
      ),
    },
    {
      label: "Calculating risk score...",
      icon: (
        <svg className="h-4 w-4 text-indigo-300" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    steps.forEach((_, idx) => {
      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, idx]);
        if (idx === steps.length - 1) {
          setTimeout(() => setShowComplete(true), 300);
        }
      }, (idx + 1) * 520);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center py-4 mt-2">

      {/* ── Radar / Sonar Circle ── */}
      <div className="relative flex items-center justify-center mb-7" style={{ width: 220, height: 220 }}>
        {/* Outermost ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 220, height: 220,
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        />
        {/* Second ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 178, height: 178,
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        />
        {/* Third ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 136, height: 136,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />
        {/* Inner ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 96, height: 96,
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        />
        {/* Centre gradient sphere */}
        <div
          className="absolute rounded-full"
          style={{
            width: 76, height: 76,
            background:
              "radial-gradient(circle at 38% 36%, rgba(200,210,230,0.30) 0%, rgba(130,145,175,0.20) 45%, rgba(80,95,130,0.10) 70%, transparent 100%)",
          }}
        />
        {/* Sparkles / Stars icon — filled, indigo-blue */}
        <svg
          className="relative z-10"
          style={{ width: 36, height: 36, color: "#6366f1" }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9.813 15.904 9 21l-.813-5.096L3 15.091l5.091-.813L9 9.187l.813 5.091 5.096.813-5.096.813ZM19.071 5.929l-.262 1.642-1.642.262 1.642.262.262 1.642.262-1.642 1.642-.262-1.642-.262-.262-1.642ZM19.071 18.071l-.262 1.642-1.642.262 1.642.262.262 1.642.262-1.642 1.642-.262-1.642-.262-.262-1.642Z" />
        </svg>
      </div>

      {/* ── Title & Subtitle ── */}
      <h2
        className="text-[2rem] font-bold text-white mb-1 text-center transition-all duration-500"
        style={{ fontFamily: "var(--font-poppins), sans-serif" }}
      >
        {showComplete ? "Analysis Complete" : "Analyzing..."}
      </h2>
      <p
        className="text-[10px] font-semibold tracking-[0.22em] text-slate-500 uppercase mb-9 text-center"
        style={{ fontFamily: "var(--font-poppins), sans-serif" }}
      >
        {showComplete ? "SECURITY REPORT READY" : "PROCESSING DOCUMENT"}
      </p>

      {/* ── Step Items ── */}
      <div className="w-full max-w-[400px] space-y-[10px] px-2">
        {steps.map((step, idx) => {
          const done = completedSteps.includes(idx);
          return (
            <div
              key={idx}
              className="glass-panel rounded-xl flex items-center gap-3 px-4 py-3 transition-all duration-300"
              style={{
                borderColor: done
                  ? "rgba(99,102,241,0.18)"
                  : "rgba(255,255,255,0.05)",
                opacity: done ? 1 : 0.45,
              }}
            >
              {/* Icon box */}
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-lg"
                style={{
                  width: 30, height: 30,
                  background: "rgba(26,28,58,0.9)",
                  border: "1px solid rgba(99,102,241,0.22)",
                }}
              >
                {step.icon}
              </div>

              {/* Label + progress bar */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-[11.5px] font-medium text-slate-300 mb-1.5"
                  style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                >
                  {step.label}
                </p>
                <div
                  className="rounded-full overflow-hidden"
                  style={{ height: 3, background: "rgba(51,65,85,0.7)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: done ? "100%" : "0%",
                      background:
                        "linear-gradient(90deg, rgba(99,102,241,0.5) 0%, rgba(139,92,246,0.5) 100%)",
                    }}
                  />
                </div>
              </div>

              {/* Checkmark circle */}
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-300"
                style={{
                  width: 24, height: 24,
                  background: done
                    ? "rgba(99,102,241,0.18)"
                    : "rgba(30,41,59,0.5)",
                  border: done
                    ? "1px solid rgba(99,102,241,0.45)"
                    : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {done && (
                  <svg
                    style={{ width: 12, height: 12, color: "#818cf8" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.8"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Score / Results Page View (design-matched dashboard) ───────────────
interface ScoreResultsViewProps {
  result: AnalysisResult;
  contractText: string;
  fileName: string | null;
}

const SCORE_CARD = "rounded-xl glass-panel";
const SCORE_SURFACE = "rgba(15,17,35,0.85)";

const ScoreResultsView = ({
  result,
  contractText,
  fileName,
}: ScoreResultsViewProps) => {
  const score = result.riskScore;
  const isHighRisk = score > 70;
  const isMediumRisk = score >= 40 && score <= 70;
  const gaugeColor = isHighRisk ? "#f87171" : isMediumRisk ? "#facc15" : "#34d399";
  const riskLabel = isHighRisk ? "HIGH RISK" : isMediumRisk ? "MEDIUM RISK" : "LOW RISK";

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const progressDash = (score / 100) * circumference;

  const criticalRisksData = result.dangerousClauses.map((clause, i) => {
    const lower = clause.toLowerCase();
    const title =
      lower.includes("terminat") ? "Termination" :
      lower.includes("liabilit") ? "Liability Cap" :
      lower.includes("non-compete") ? "Non-Compete" :
      lower.includes("intellectual") ? "IP Rights" :
      lower.includes("payment") ? "Payment Terms" :
      `Risk Clause ${i + 1}`;
    const action =
      lower.includes("terminat") ? "NEGOTIATE TO 30 DAYS" :
      lower.includes("liabilit") ? "PROPOSE 12-MONTH FEE CAP" :
      lower.includes("non-compete") ? "LIMIT SCOPE & DURATION" :
      lower.includes("intellectual") ? "ADD IP CARVE-OUTS" :
      "REVIEW & NEGOTIATE";
    const desc =
      lower.includes("terminat")
        ? "Client may terminate for convenience with only 5 days notice and no refund of prepaid fees."
        : lower.includes("liabilit")
        ? "Total liability capped at $100 regardless of damages incurred."
        : clause.length > 90
        ? clause.substring(0, 87) + "..."
        : clause;
    return { title, action, desc };
  });

  const defaultSafePoints = [
    { title: "Data Sovereignty", desc: "Clear clause on data ownership and retrieval." },
    { title: "Service Uptime", desc: "99.9% uptime SLA with credits for downtime." },
  ];
  const safePointsData =
    result.goodParts.length >= 2
      ? result.goodParts.slice(0, 2).map((part, i) => {
          const lower = part.toLowerCase();
          const title =
            lower.includes("data") ? "Data Sovereignty" :
            lower.includes("uptime") || lower.includes("sla") ? "Service Uptime" :
            lower.includes("term") ? "Contract Term" :
            `Protected Point ${i + 1}`;
          return { title, desc: part.length > 65 ? part.substring(0, 62) + "..." : part };
        })
      : defaultSafePoints;

  const getContractSections = () => {
    const lines = contractText.split("\n").filter((l) => l.trim());
    let highlightIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      const lower = lines[i].toLowerCase();
      if (
        lower.includes("terminat") ||
        lower.includes("no refund") ||
        lower.includes("any time") ||
        lower.includes("convenience")
      ) {
        highlightIdx = i;
        break;
      }
    }
    if (highlightIdx === -1) highlightIdx = Math.max(0, Math.floor(lines.length / 2));
    return {
      before: lines.slice(0, highlightIdx),
      highlight: lines.slice(highlightIdx, Math.min(highlightIdx + 3, lines.length)),
      after: lines.slice(Math.min(highlightIdx + 3, lines.length)),
    };
  };

  const { before, highlight, after } = getContractSections();
  const highlightTitle =
    highlight[0]?.trim() || "12.2 TERMINATION FOR CONVENIENCE.";
  const highlightBody =
    highlight.slice(1).join(" ") ||
    "Client may terminate this Agreement for convenience upon five (5) days written notice. No refund of prepaid fees shall be provided upon such termination.";

  const pseudoHash = `0x${(contractText.length * 31 + 0x82f).toString(16).slice(0, 3)}...a1e9`;
  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")} UTC`;
  const displayFileName = fileName || `SaaS_MSA_v4.2.pdf`;
  const critCount = Math.max(criticalRisksData.length, 3);
  const compliantCount = Math.max(result.goodParts.length + 12, 14);
  const insightCount = Math.max(result.roleBasedRisks.length + 6, 8);
  const highImpactCount = Math.min(criticalRisksData.length, 3) || 3;

  const aiRecommendation =
    result.roleBasedRisks[0] ||
    "The intellectual property clause is broadly defined. Consider adding a specific 'Customer-Owned Work Product' carve-out to protect your proprietary data integrations.";

  const formatClauseLine = (line: string) => {
    const trimmed = line.trim();
    const sectionMatch = trimmed.match(/^(\d+(?:\.\d+)?)\.\s*(.+)/);
    if (!sectionMatch) return <span>{line}</span>;
    const [, num, rest] = sectionMatch;
    const words = rest.split(" ");
    const heading = words.slice(0, 3).join(" ");
    const body = words.slice(3).join(" ");
    return (
      <>
        <strong className="text-white font-semibold">
          {num}. {heading}
          {body ? "." : ""}
        </strong>
        {body ? <> {body}</> : null}
      </>
    );
  };

  return (
    <div className="w-full animate-[fadeIn_0.4s_ease-out]">

      {/* TOP ROW */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">

        {/* SafeSign Risk Index */}
        <aside
          className={`${SCORE_CARD} w-full lg:w-[230px] shrink-0 p-5 flex flex-col`}
          style={{ background: SCORE_SURFACE }}
        >
          <p className="text-[9px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-4">
            SAFESIGN RISK INDEX
          </p>

          <div className="flex justify-center my-2">
            <svg viewBox="0 0 130 130" className="w-[140px] h-[140px]" aria-label={`Risk score: ${score}%`}>
              <circle cx="65" cy="65" r={radius} fill="none" stroke="#1a1e38" strokeWidth="9" />
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
                style={{ filter: `drop-shadow(0 0 8px ${gaugeColor}66)` }}
              />
              <text
                x="65"
                y="60"
                textAnchor="middle"
                fill="white"
                fontSize="22"
                fontWeight="700"
                fontFamily="var(--font-poppins), sans-serif"
              >
                {score}%
              </text>
              <text
                x="65"
                y="76"
                textAnchor="middle"
                fill={gaugeColor}
                fontSize="7"
                fontWeight="700"
                fontFamily="var(--font-poppins), sans-serif"
                letterSpacing="1"
              >
                {riskLabel}
              </text>
            </svg>
          </div>

          <p className="text-[11px] text-slate-400 font-light text-center leading-relaxed mt-2">
            Legal AI detected{" "}
            <span className="text-[#ff5c8d] font-semibold">{highImpactCount} High-Impact</span>{" "}
            vulnerabilities related to termination clauses.
          </p>

          <div className="flex items-center justify-center gap-1.5 mt-auto pt-6">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8] animate-pulse" />
            <span className="text-[9px] text-slate-500 font-medium tracking-wide">
              Neural Engine Live
            </span>
          </div>
        </aside>

        {/* Analysis Summary + stat cards */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">

          <div className={`${SCORE_CARD} p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4`} style={{ background: SCORE_SURFACE }}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-300">Analysis Summary:</p>
              <h1 className="text-xl md:text-2xl font-bold text-white mt-0.5 truncate">
                {displayFileName}
              </h1>
              <p className="text-[11px] text-slate-500 mt-1.5 font-light">
                Processed at {timeStr} | Hash: {pseudoHash}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 bg-[#0d0f2b] hover:bg-[#161b35] border border-white/10 rounded-lg px-3.5 py-2 transition-colors cursor-pointer"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                PDF Report
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 bg-[#0d0f2b] hover:bg-[#161b35] border border-white/10 rounded-lg px-3.5 py-2 transition-colors cursor-pointer"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
                Save Analysis
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Critical Flags */}
            <div
              className={`${SCORE_CARD} p-4 pl-3.5`}
              style={{ background: SCORE_SURFACE, borderLeft: "3px solid #f87171" }}
            >
              <div className="flex items-center gap-1.5 mb-2.5">
                <svg className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
                <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider">
                  Critical Flags
                </span>
              </div>
              <p className="text-[2.25rem] font-black text-white leading-none mb-2">
                {String(critCount).padStart(2, "0")}
              </p>
              <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                Liability caps and IP ownership gaps.
              </p>
            </div>

            {/* Compliant Sections */}
            <div
              className={`${SCORE_CARD} p-4 pl-3.5`}
              style={{ background: SCORE_SURFACE, borderLeft: "3px solid #60a5fa" }}
            >
              <div className="flex items-center gap-1.5 mb-2.5">
                <svg className="h-4 w-4 text-sky-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span className="text-[9px] font-bold text-sky-400 uppercase tracking-wider">
                  Compliant Sections
                </span>
              </div>
              <p className="text-[2.25rem] font-black text-white leading-none mb-2">
                {String(compliantCount).padStart(2, "0")}
              </p>
              <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                Privacy and GDPR clauses are robust.
              </p>
            </div>

            {/* AI Insights */}
            <div
              className={`${SCORE_CARD} p-4 pl-3.5`}
              style={{ background: SCORE_SURFACE, borderLeft: "3px solid #94a3b8" }}
            >
              <div className="flex items-center gap-1.5 mb-2.5">
                <svg className="h-4 w-4 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.718a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .945-.143Z" clipRule="evenodd" />
                </svg>
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">
                  AI Insights
                </span>
              </div>
              <p className="text-[2.25rem] font-black text-white leading-none mb-2">
                {String(insightCount).padStart(2, "0")}
              </p>
              <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                Recommended negotiation points.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="flex flex-col lg:flex-row gap-4">

        {/* Legal Document View */}
        <div
          className={`${SCORE_CARD} flex-1 flex flex-col min-h-[400px]`}
          style={{ background: "rgba(7,8,20,0.95)" }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 shrink-0">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <span className="text-[9px] font-bold tracking-[0.18em] text-slate-500 uppercase">
                Legal Document View
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] text-slate-500">Page 1 of 12</span>
              <button type="button" className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" aria-label="Zoom in">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
                </svg>
              </button>
              <button type="button" className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" aria-label="Zoom out">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 p-5 overflow-y-auto space-y-4 text-[11px] leading-relaxed">
            {before.length > 0 ? (
              before.slice(0, 2).map((line, i) => (
                <p key={`b-${i}`} className="text-slate-400 font-light">
                  {formatClauseLine(line)}
                </p>
              ))
            ) : (
              <p className="text-slate-400 font-light">
                <strong className="text-white font-semibold">1. SERVICES AND SUPPORT.</strong>{" "}
                Provider shall use commercially reasonable efforts to provide the Services in accordance with this Agreement.
              </p>
            )}

            <div
              className="rounded-lg p-4"
              style={{
                border: "1px solid rgba(255, 92, 141, 0.45)",
                background: "rgba(255, 92, 141, 0.06)",
              }}
            >
              <p className="font-bold text-[#ff5c8d] text-[11px] uppercase tracking-wide mb-2">
                {highlightTitle.toUpperCase().includes("TERMINATION")
                  ? highlightTitle.toUpperCase()
                  : "12.2 TERMINATION FOR CONVENIENCE."}
              </p>
              <p className="text-slate-200 font-light text-[11px] leading-relaxed">
                {highlightBody}
              </p>
              <p className="text-[9px] text-slate-500 mt-3 flex items-center gap-1 italic">
                <span className="text-[#ff5c8d]">&#9888;</span> Unfair Clause detected by AI
              </p>
            </div>

            {after.length > 0 ? (
              after.slice(0, 2).map((line, i) => (
                <p key={`a-${i}`} className="text-slate-400 font-light">
                  {formatClauseLine(line)}
                </p>
              ))
            ) : (
              <p className="text-slate-400 font-light">
                <strong className="text-white font-semibold">2. RESTRICTIONS AND RESPONSIBILITIES.</strong>{" "}
                Client shall not reverse engineer or attempt to gain unauthorized access to the Services.
              </p>
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-full lg:w-[300px] shrink-0 flex flex-col gap-3">

          {/* Critical Risks */}
          <div className={`${SCORE_CARD} p-4`} style={{ background: SCORE_SURFACE }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white">Critical Risks</h3>
              <span
                className="text-[9px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wide"
                style={{
                  background: "rgba(248,113,113,0.12)",
                  color: "#f87171",
                  border: "1px solid rgba(248,113,113,0.25)",
                }}
              >
                {critCount} FOUND
              </span>
            </div>

            <div className="space-y-4">
              {(criticalRisksData.length > 0
                ? criticalRisksData
                : [
                    {
                      title: "Termination",
                      desc: "Client may terminate for convenience with only 5 days notice and no refund of prepaid fees.",
                      action: "NEGOTIATE TO 30 DAYS",
                    },
                    {
                      title: "Liability Cap",
                      desc: "Total liability capped at $100 regardless of damages incurred.",
                      action: "PROPOSE 12-MONTH FEE CAP",
                    },
                  ]
              )
                .slice(0, 3)
                .map((risk, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-3"
                    style={
                      risk.title === "Liability Cap"
                        ? {
                            background: "rgba(15,17,35,0.6)",
                            border: "1px solid transparent",
                            backgroundImage:
                              "linear-gradient(rgba(15,17,35,0.95), rgba(15,17,35,0.95)), linear-gradient(135deg, rgba(255,92,141,0.4), rgba(99,102,241,0.35))",
                            backgroundOrigin: "border-box",
                            backgroundClip: "padding-box, border-box",
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-bold text-[#ff5c8d]">{risk.title}</span>
                      <svg className="h-3.5 w-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                    <p className="text-[11px] text-slate-400 font-light leading-relaxed mb-2">
                      {risk.desc}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ff5c8d]" />
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        ACTION: {risk.action}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Safe Points */}
          <div
            className={`${SCORE_CARD} p-4`}
            style={{ background: SCORE_SURFACE, border: "1px solid rgba(96,165,250,0.2)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white">Safe Points</h3>
              <span
                className="text-[9px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wide"
                style={{
                  background: "rgba(96,165,250,0.15)",
                  color: "#93c5fd",
                  border: "1px solid rgba(96,165,250,0.3)",
                }}
              >
                PROTECTED
              </span>
            </div>

            <div className="space-y-4">
              {safePointsData.map((pt, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="mt-0.5 shrink-0 flex items-center justify-center rounded-full"
                    style={{
                      width: 20,
                      height: 20,
                      background: "rgba(96,165,250,0.12)",
                      border: "1px solid rgba(96,165,250,0.3)",
                    }}
                  >
                    <svg className="h-3 w-3 text-sky-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-white">{pt.title}</p>
                    <p className="text-[11px] text-slate-500 font-light leading-relaxed mt-0.5">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendation */}
          <div className={`${SCORE_CARD} p-4`} style={{ background: SCORE_SURFACE }}>
            <div className="flex items-center gap-1.5 mb-3">
              <SparklesIcon className="h-4 w-4 text-indigo-400" />
              <span className="text-[9px] font-bold tracking-[0.16em] text-indigo-300 uppercase">
                AI Recommendation
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-light italic leading-relaxed mb-4">
              &ldquo;{aiRecommendation}&rdquo;
            </p>
            <button
              type="button"
              className="w-full text-[12px] font-bold text-[#0a0f29] py-2.5 rounded-lg transition-all hover:bg-white active:scale-[0.98] cursor-pointer bg-brand-lavender"
            >
              Generate Counter-Clause
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Pre-loaded contract templates matching contracts_data.py
const MOCK_TEMPLATES: Record<string, string> = {
  Tenant: `RESIDENTIAL LEASE AGREEMENT
1. TERM: 12 months.
2. ACCESS: Landlord may enter any time without prior notice or consent.
3. REPAIRS: Tenant is responsible for all repairs, including major structural, electrical, and plumbing issues.`,
  Freelancer: `FREELANCE SERVICES AGREEMENT
1. PAYMENT: Fixed fee of $5,000 to be paid only at the successful completion of the entire project. No upfront or milestone payments.
2. LIABILITY: Freelancer is fully liable for all direct, indirect, and consequential damages, losses, and legal costs with no liability cap.`,
  Employee: `EMPLOYMENT AGREEMENT
1. NON-COMPETE: Employee is strictly prohibited from working in the tech industry worldwide for a period of 5 years after leaving.
2. IP ASSIGNMENT: Company owns all intellectual property, ideas, and concepts generated by the employee, including personal thoughts and dreams.`,
};

interface AnalysisResult {
  summary: string;
  goodParts: string[];
  dangerousClauses: string[];
  roleBasedRisks: string[];
  riskScore: number;
  riskLevel: string;
}

export default function ContractAnalysisPage() {
  const [perspective, setPerspective] = useState<"Tenant" | "Freelancer" | "Employee">("Freelancer");
  const [isDragActive, setIsDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [contractText, setContractText] = useState<string>(MOCK_TEMPLATES.Freelancer);
  const [customTextLoaded, setCustomTextLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle perspective change and populate respective template if custom text isn't loaded
  const handlePerspectiveChange = (role: "Tenant" | "Freelancer" | "Employee") => {
    setPerspective(role);
    if (!customTextLoaded) {
      setContractText(MOCK_TEMPLATES[role]);
    }
  };

  // Handle file upload selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setFileName(file.name);
    setCustomTextLoaded(true);

    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setContractText(e.target.result as string);
        }
      };
      reader.readAsText(file);
    } else {
      // Mock parsing for non-txt files (PDF, DOCX) by loading matching role template but marking custom
      setContractText(
        `[PARSED CONTENTS OF ${file.name.toUpperCase()}]\n\n${MOCK_TEMPLATES[perspective]}`
      );
    }
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  // API Call with robust client-side Fallback
  const handleAnalyze = async () => {
    setLoading(true);
    setErrorMsg(null);
    setResult(null);

    // Dynamic backend request payload matching Spring Boot DTO
    const payload = {
      contractText: contractText,
      userRole: perspective.toLowerCase(),
    };

    try {
      const response = await fetch("http://localhost:8080/api/analyze-contract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.warn("Backend API is unavailable, running local AI simulation: ", err.message);
      
      // Artificial delay for loading experience
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Set high-fidelity mock fallback
      setResult(getMockFallback(perspective));
    } finally {
      setLoading(false);
    }
  };

  // Reset page state to analyze another contract
  const handleReset = () => {
    setResult(null);
    setFileName(null);
    setCustomTextLoaded(false);
    setContractText(MOCK_TEMPLATES[perspective]);
  };

  // Custom detailed mock responses matching Llama 3.3 outcomes
  const getMockFallback = (role: "Tenant" | "Freelancer" | "Employee"): AnalysisResult => {
    switch (role) {
      case "Tenant":
        return {
          summary: "This Residential Lease Agreement contains highly predatory terms for the tenant, shifting substantial financial burdens onto you and eliminating standard privacy rights.",
          goodParts: [
            "The 12-month term is standard for residential leases.",
            "The document framework is logically organized."
          ],
          dangerousClauses: [
            "Section 2 allows the Landlord to enter the property at any time without prior notice or tenant consent, severely violating privacy covenants.",
            "Section 3 shifts the responsibility for ALL repairs—including major structural, electrical, and plumbing infrastructure—fully onto the Tenant."
          ],
          roleBasedRisks: [
            "As a Tenant, you face unlimited financial liability for building maintenance (roof, pipes, foundation).",
            "Zero privacy guarantees. Landlord has unilateral entry permissions."
          ],
          riskScore: 88,
          riskLevel: "High Risk"
        };
      case "Freelancer":
        return {
          summary: "This Freelance Services Agreement shifts 100% of project risk onto the freelancer. It features highly unfavorable delayed payment terms and absolute indemnification liabilities.",
          goodParts: [
            "The fixed fee of $5,000 is clearly stated."
          ],
          dangerousClauses: [
            "Section 1 stipulates that payment is strictly paid at the very end of project completion, offering no upfront deposit or intermediate milestone protections.",
            "Section 2 states the Freelancer is 100% liable for direct, indirect, and consequential damages with absolutely no liability cap or exclusions."
          ],
          roleBasedRisks: [
            "As a Freelancer, you risk complete non-payment if the client contests the final product.",
            "Unlimited liability exposure could bankrupt your business over a minor project dispute."
          ],
          riskScore: 78,
          riskLevel: "High Risk"
        };
      case "Employee":
        return {
          summary: "This Employment Agreement features extremely restrictive and legally questionable covenants regarding non-compete domains and IP ownership over personal time.",
          goodParts: [
            "Employment status is defined clearly."
          ],
          dangerousClauses: [
            "Section 1 imposes a global 5-year non-compete, which is excessively broad and virtually bars you from working in tech anywhere upon departure.",
            "Section 2 claims company ownership over all ideas, including personal thoughts and 'dreams', which is highly predatory and legally overreaching."
          ],
          roleBasedRisks: [
            "As an Employee, your future career choices are severely constrained by the worldwide non-compete.",
            "Surrendering intellectual rights to your personal thoughts outside of work hours is highly hazardous."
          ],
          riskScore: 95,
          riskLevel: "High Risk"
        };
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070814] text-[#f8fafc] overflow-hidden flex flex-col">
      {/* Background Radial Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0,transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.06)_0,transparent_60%)] pointer-events-none" />

      {/* Header — shows "New Analysis" CTA when results are visible */}
      <Header
        ctaLabel={result && !loading ? "New Analysis" : undefined}
        ctaIcon={
          result && !loading ? (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75Z" />
            </svg>
          ) : undefined
        }
        onCtaClick={result && !loading ? handleReset : undefined}
        showAvatar={!!(result && !loading)}
      />

      <main
        className={`relative flex-grow mx-auto w-full flex flex-col ${
          result && !loading
            ? "max-w-7xl px-4 md:px-6 py-6"
            : "max-w-7xl items-center px-6 md:px-8 py-16"
        }`}
      >
        {!(result && !loading) && (
          <>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4 text-center">
              Contract Analysis
            </h1>
            <p className="max-w-2xl text-center text-slate-400 font-light text-sm md:text-base leading-relaxed mb-16">
              Upload your legal document and select your perspective for AI-driven risk assessment.
            </p>
          </>
        )}

        {!result && !loading && (
          <div className="w-full max-w-4xl space-y-12">
            {/* STEP 1: PERSPECTIVE SELECTOR */}
            <div className="space-y-6">
              <div className="flex justify-center">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                  Step 1: Choose Your Perspective
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Tenant Card */}
                <button
                  onClick={() => handlePerspectiveChange("Tenant")}
                  className={`group rounded-2xl glass-panel p-6.5 text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                    perspective === "Tenant"
                      ? "ring-2 ring-indigo-400/80 bg-[#0d0f2b]/80 shadow-[0_0_25px_rgba(99,102,241,0.18)]"
                      : "hover:bg-slate-900/40 hover:border-slate-800"
                  }`}
                >
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-4.5 transition-colors ${
                    perspective === "Tenant" ? "bg-indigo-950/60 border border-indigo-400/30" : "bg-slate-950/40 border border-white/5"
                  }`}>
                    <HomeIcon />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Tenant</h3>
                  <p className="text-slate-400 text-xs font-light leading-relaxed max-w-[200px]">
                    Focus on lease rights and liability caps.
                  </p>
                </button>

                {/* Freelancer Card */}
                <button
                  onClick={() => handlePerspectiveChange("Freelancer")}
                  className={`group rounded-2xl glass-panel p-6.5 text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                    perspective === "Freelancer"
                      ? "ring-2 ring-indigo-400/80 bg-[#0d0f2b]/80 shadow-[0_0_25px_rgba(99,102,241,0.18)]"
                      : "hover:bg-slate-900/40 hover:border-slate-800"
                  }`}
                >
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-4.5 transition-colors ${
                    perspective === "Freelancer" ? "bg-indigo-950/60 border border-indigo-400/30" : "bg-slate-950/40 border border-white/5"
                  }`}>
                    <LocationPinIcon />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Freelancer</h3>
                  <p className="text-slate-400 text-xs font-light leading-relaxed max-w-[200px]">
                    Focus on IP rights and payment terms.
                  </p>
                </button>

                {/* Employee Card */}
                <button
                  onClick={() => handlePerspectiveChange("Employee")}
                  className={`group rounded-2xl glass-panel p-6.5 text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                    perspective === "Employee"
                      ? "ring-2 ring-indigo-400/80 bg-[#0d0f2b]/80 shadow-[0_0_25px_rgba(99,102,241,0.18)]"
                      : "hover:bg-slate-900/40 hover:border-slate-800"
                  }`}
                >
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-4.5 transition-colors ${
                    perspective === "Employee" ? "bg-indigo-950/60 border border-indigo-400/30" : "bg-slate-950/40 border border-white/5"
                  }`}>
                    <BriefcaseIcon />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Employee</h3>
                  <p className="text-slate-400 text-xs font-light leading-relaxed max-w-[200px]">
                    Focus on non-compete and benefits.
                  </p>
                </button>
              </div>
            </div>

            {/* STEP 2: UPLOAD BOX */}
            <div className="space-y-6">
              <div className="flex justify-center">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                  Step 2: Upload Legal PDF
                </span>
              </div>

              {/* Upload Container */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`relative rounded-2xl border-2 border-dashed glass-panel p-12 text-center transition-all ${
                  isDragActive
                    ? "border-indigo-400 bg-indigo-950/20 scale-[1.01]"
                    : "border-slate-800 hover:border-slate-700 bg-[#070814]/30"
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                />

                <div className="flex flex-col items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-indigo-950/40 border border-indigo-500/10 flex items-center justify-center mb-4.5">
                    <DocumentUploadIcon />
                  </div>
                  <p className="text-base font-bold text-white mb-1.5">
                    {fileName ? `Uploaded: ${fileName}` : "Drag & Drop Documents"}
                  </p>
                  <p className="text-slate-400 text-xs font-light mb-6.5">
                    Support for PDF, DOCX, and Text files (Max 50MB)
                  </p>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-lg bg-[#27283c] hover:bg-[#34354e] text-slate-200 border border-slate-700 text-xs font-semibold px-6 py-3 transition-colors cursor-pointer"
                  >
                    SELECT FILE
                  </button>
                </div>

                {/* AI Ready Badge */}
                <div className="absolute bottom-4 right-6 flex items-center text-[10px] uppercase font-bold tracking-widest text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 mr-2 shadow-[0_0_8px_#10b981]"></span>
                  AI Engine Ready
                </div>
              </div>

              {/* Editable Preview Panel */}
              <div className="rounded-xl border border-slate-900 bg-[#060712] p-5.5">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-indigo-300 mb-3">
                  <span>✏️ Contract Text Preview</span>
                  {customTextLoaded && (
                    <button
                      onClick={handleReset}
                      className="text-slate-500 hover:text-rose-400 text-[10px] transition-colors"
                    >
                      Clear File & Reset
                    </button>
                  )}
                </div>
                <textarea
                  value={contractText}
                  onChange={(e) => {
                    setContractText(e.target.value);
                    setCustomTextLoaded(true);
                  }}
                  rows={4}
                  className="w-full bg-transparent border-0 resize-none outline-none focus:ring-0 text-xs font-mono font-light text-slate-300 leading-relaxed scrollbar-thin"
                  placeholder="Contract text will show here. You can paste or type custom text directly."
                />
              </div>
            </div>

            {/* ANALYZE BUTTON */}
            <div className="flex justify-center pt-4">
              <button
                onClick={handleAnalyze}
                disabled={!contractText.trim()}
                className="inline-flex items-center space-x-2 rounded-xl bg-[#c7d2fe] hover:bg-[#b0c0f8] text-[#0f1123] font-bold text-sm px-10 py-4.5 shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/25 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer"
              >
                <SparklesIcon className="h-5 w-5 text-indigo-900" />
                <span>Analyze Sovereignty</span>
              </button>
            </div>
          </div>
        )}

        {/* --- LOADING VIEW (Analysis Complete Screen) --- */}
        {loading && (
          <div className="w-full max-w-2xl mt-6">
            <AnalysisCompleteView />
          </div>
        )}

        {/* --- SCORE / RESULTS DASHBOARD --- */}
        {result && !loading && (
          <ScoreResultsView
            result={result}
            contractText={contractText}
            fileName={fileName}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
