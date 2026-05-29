"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { FiHome, FiBriefcase, FiUser, FiFileText, FiAward } from "react-icons/fi";
import {
  deleteAnalysis,
  fetchHistory,
  normalizeRiskBand,
  type RiskBand,
} from "@/lib/api";

// ─── Types ───────────────────────────────────────────────────────────────────
interface AnalysisRecord {
  id: number;
  contractTitle: string;
  role: string;
  riskLevel: string;
  riskScore: number;
  summary: string;
  analyzedAt: string;
  flaggedClauses: number;
  pinned?: boolean;
  riskBand: RiskBand;
}

// ─── Mock Data (offline fallback) ─────────────────────────────────────────────
const MOCK_RECORDS: Omit<AnalysisRecord, "riskBand">[] = [
  {
    id: 1,
    contractTitle: "Residential Lease Agreement",
    role: "Tenant",
    riskLevel: "HIGH",
    riskScore: 82,
    summary:
      "Landlord retains unrestricted entry rights and includes a one-sided early-termination penalty clause. Several provisions heavily favour the landlord.",
    analyzedAt: "2024-05-24T14:32:00Z",
    flaggedClauses: 7,
  },
  {
    id: 2,
    contractTitle: "Freelance Services Agreement",
    role: "Freelancer",
    riskLevel: "MEDIUM",
    riskScore: 54,
    summary:
      "IP assignment clause is overly broad. Payment terms lack late-fee protections. Non-compete is geographically reasonable but time-bound at 18 months.",
    analyzedAt: "2024-05-22T09:15:00Z",
    flaggedClauses: 3,
  },
  {
    id: 3,
    contractTitle: "Full-Time Employment Contract",
    role: "Employee",
    riskLevel: "HIGH",
    riskScore: 76,
    summary:
      "5-year global non-compete clause detected. Mandatory arbitration waives class-action rights. At-will termination with no severance provisions.",
    analyzedAt: "2024-05-20T17:00:00Z",
    flaggedClauses: 5,
  },
  {
    id: 4,
    contractTitle: "SaaS Subscription Agreement",
    role: "Business Owner",
    riskLevel: "LOW",
    riskScore: 21,
    summary:
      "Standard SaaS terms. Liability is capped at 12 months of fees paid. Data processing addendum is GDPR-compliant. Auto-renewal notice period is 30 days.",
    analyzedAt: "2024-05-18T11:45:00Z",
    flaggedClauses: 1,
  },
  {
    id: 5,
    contractTitle: "Independent Contractor NDA",
    role: "Freelancer",
    riskLevel: "LOW",
    riskScore: 18,
    summary:
      "Mutual NDA with balanced confidentiality terms. 2-year term is standard. Carve-outs for public domain and independent development are present.",
    analyzedAt: "2024-05-15T08:20:00Z",
    flaggedClauses: 0,
  },
  {
    id: 6,
    contractTitle: "Commercial Office Lease",
    role: "Business Owner",
    riskLevel: "MEDIUM",
    riskScore: 49,
    summary:
      "Personal guarantee clause adds significant liability. Operating expenses (OPEX) pass-through is uncapped. Renewal terms favour landlord discretion.",
    analyzedAt: "2024-05-12T16:10:00Z",
    flaggedClauses: 4,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function RiskBadge({ level, score }: { level: string; score: number }) {
  const config: Record<string, { label: string; bg: string; text: string; ring: string; dot: string }> = {
    HIGH: {
      label: "HIGH RISK",
      bg: "bg-rose-500/10",
      text: "text-rose-400",
      ring: "ring-rose-500/30",
      dot: "bg-rose-400",
    },
    MEDIUM: {
      label: "MEDIUM RISK",
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      ring: "ring-amber-500/30",
      dot: "bg-amber-400",
    },
    LOW: {
      label: "LOW RISK",
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      ring: "ring-emerald-500/30",
      dot: "bg-emerald-400",
    },
  };
  const c = config[level] ?? config.LOW;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-widest ring-1 ${c.bg} ${c.text} ${c.ring}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot} animate-pulse`} />
      {c.label}
    </span>
  );
}

function ScoreRing({ score, level }: { score: number; level: string }) {
  const colour =
    level === "HIGH"
      ? "#f43f5e"
      : level === "MEDIUM"
      ? "#f59e0b"
      : "#10b981";
  const r = 26;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  return (
    <div className="relative flex items-center justify-center h-16 w-16 shrink-0">
      <svg className="-rotate-90" width="64" height="64" viewBox="0 0 64 64">
        <circle
          cx="32" cy="32" r={r}
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5"
        />
        <circle
          cx="32" cy="32" r={r}
          fill="none"
          stroke={colour}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <span
        className="absolute text-xs font-bold tabular-nums"
        style={{ color: colour }}
      >
        {score}
      </span>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function ContractCard({
  record,
  onDelete,
  onReopen,
}: {
  record: AnalysisRecord;
  onDelete: (id: number) => void;
  onReopen: (id: number) => void;
}) {
  const [deleting, setDeleting] = useState(false);

  function handleDelete() {
    setDeleting(true);
    setTimeout(() => onDelete(record.id), 350);
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Tenant":
        return <FiHome className="h-3.5 w-3.5 text-indigo-400" />;
      case "Freelancer":
        return <FiBriefcase className="h-3.5 w-3.5 text-indigo-400" />;
      case "Employee":
        return <FiUser className="h-3.5 w-3.5 text-indigo-400" />;
      case "Business Owner":
        return <FiAward className="h-3.5 w-3.5 text-indigo-400" />;
      default:
        return <FiFileText className="h-3.5 w-3.5 text-indigo-400" />;
    }
  };

  return (
    <div
      className={`group glass-panel glass-panel-hover rounded-2xl p-5 transition-all duration-350 ${
        deleting ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Score Ring */}
        <ScoreRing score={record.riskScore} level={record.riskLevel} />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="text-sm font-semibold text-white truncate">
              {record.contractTitle}
            </h3>
            <RiskBadge level={record.riskLevel} score={record.riskScore} />
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
              {getRoleIcon(record.role)}
              <span className="font-medium text-slate-300">{record.role}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(record.analyzedAt)} · {formatTime(record.analyzedAt)}
            </span>
            {record.flaggedClauses > 0 && (
              <span className="inline-flex items-center gap-1 text-xs text-rose-400/80">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {record.flaggedClauses} flagged clause{record.flaggedClauses !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Summary */}
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
            {record.summary}
          </p>
        </div>

        {/* Actions */}
        <div className="flex sm:flex-col items-center gap-2 shrink-0">
          <button
            id={`reopen-${record.id}`}
            onClick={() => onReopen(record.id)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 ring-1 ring-indigo-500/25 hover:ring-indigo-500/50 text-indigo-300 hover:text-indigo-200 text-xs font-semibold px-4 py-2 transition-all duration-200"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Reopen
          </button>
          <button
            id={`delete-${record.id}`}
            onClick={handleDelete}
            title="Remove from history"
            className="inline-flex items-center gap-1.5 rounded-xl bg-rose-500/0 hover:bg-rose-500/10 ring-1 ring-white/5 hover:ring-rose-500/30 text-slate-500 hover:text-rose-400 text-xs font-semibold px-4 py-2 transition-all duration-200"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
type Tab = "all" | "flagged" | "secure";

export default function HistoryPage() {
  const router = useRouter();
  const [records, setRecords] = useState<AnalysisRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [apiError, setApiError] = useState(false);

  // ── Fetch from backend ──
  useEffect(() => {
    async function loadHistory() {
      setLoading(true);
      try {
        const data = await fetchHistory();
        setRecords(
          data.map((r) => ({
            ...r,
            analyzedAt:
              typeof r.analyzedAt === "string"
                ? r.analyzedAt
                : String(r.analyzedAt),
            riskBand: normalizeRiskBand(r.riskLevel, r.riskScore),
          }))
        );
        setApiError(false);
      } catch {
        setApiError(true);
        setRecords(
          MOCK_RECORDS.map((r) => ({
            ...r,
            riskBand: normalizeRiskBand(r.riskLevel, r.riskScore),
          }))
        );
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, []);

  // ── Filter ──
  const filtered = records.filter((r) => {
    if (activeTab === "flagged") return r.riskBand === "HIGH";
    if (activeTab === "secure") return r.riskBand === "LOW";
    return true;
  });

  // ── Delete handler ──
  function handleDelete(id: number) {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    (async () => {
      try {
        await deleteAnalysis(id);
      } catch {
        /* already removed locally */
      }
    })();
  }

  // ── Reopen handler ──
  function handleReopen(id: number) {
    router.push(`/analyze?recordId=${id}`);
  }

  // ── Tab config ──
  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "all", label: "All Contracts", count: records.length },
    {
      id: "flagged",
      label: "Flagged",
      count: records.filter((r) => r.riskBand === "HIGH").length,
    },
    {
      id: "secure",
      label: "Secure",
      count: records.filter((r) => r.riskBand === "LOW").length,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#070814]">
      <Header />

      {/* Ambient glow blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-indigo-600/8 blur-[120px]" />
        <div className="absolute top-1/2 right-0 h-[500px] w-[500px] rounded-full bg-violet-600/6 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-[90px]" />
      </div>

      <main className="relative flex-1 mx-auto w-full max-w-5xl px-6 md:px-8 py-12">
        {/* ── Page Header ── */}
        <div className="mb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 ring-1 ring-indigo-500/25 px-4 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.2em] text-indigo-300 uppercase">
              Analysis Archive
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            Contract{" "}
            <span
              className="text-gradient"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #a3b8ff 0%, #a78bfa 50%, #818cf8 100%)",
              }}
            >
              History
            </span>
          </h1>
          <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
            Review, re-open, or delete your previously analysed legal documents.
            All records are stored locally in your browser session.
          </p>

          {/* API notice */}
          {apiError && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500/8 ring-1 ring-amber-500/20 px-4 py-2">
              <svg className="h-3.5 w-3.5 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-xs text-amber-300/80">
                Backend offline — showing demo records. Start your Spring Boot server to load live data.
              </span>
            </div>
          )}
        </div>

        {/* ── Stats Row ── */}
        {!loading && records.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              {
                label: "Total Analysed",
                value: records.length,
                colour: "text-indigo-300",
                bg: "bg-indigo-500/8",
                ring: "ring-indigo-500/20",
              },
              {
                label: "High Risk",
                value: records.filter((r) => r.riskLevel === "HIGH").length,
                colour: "text-rose-400",
                bg: "bg-rose-500/8",
                ring: "ring-rose-500/20",
              },
              {
                label: "Secure",
                value: records.filter((r) => r.riskLevel === "LOW").length,
                colour: "text-emerald-400",
                bg: "bg-emerald-500/8",
                ring: "ring-emerald-500/20",
              },
            ].map((s) => (
              <div
                key={s.label}
                className={`rounded-2xl ${s.bg} ring-1 ${s.ring} px-5 py-4 text-center`}
              >
                <div className={`text-2xl font-bold ${s.colour} mb-0.5`}>
                  {s.value}
                </div>
                <div className="text-xs text-slate-500 tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── Tab Filters ── */}
        <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-indigo-500/15 ring-1 ring-indigo-500/40 text-indigo-200"
                  : "text-slate-500 hover:text-slate-300 hover:bg-white/4"
              }`}
            >
              {tab.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  activeTab === tab.id
                    ? "bg-indigo-400/20 text-indigo-300"
                    : "bg-white/5 text-slate-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        {loading ? (
          /* Loading skeleton */
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="glass-panel rounded-2xl p-5 animate-pulse"
              >
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full bg-white/5 shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="h-3 w-1/3 rounded bg-white/5" />
                    <div className="h-2.5 w-1/2 rounded bg-white/4" />
                    <div className="h-2 w-3/4 rounded bg-white/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 ring-1 ring-indigo-500/20">
              <svg className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-white mb-2">
              No contracts found
            </h3>
            <p className="text-sm text-slate-500 mb-6 max-w-xs">
              {activeTab === "all"
                ? "You haven't analysed any contracts yet."
                : `No ${activeTab === "flagged" ? "high-risk" : "secure"} contracts in your history.`}
            </p>
            <button
              onClick={() => router.push("/analyze")}
              className="rounded-full bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold px-6 py-2.5 transition-all hover:shadow-indigo-500/30 hover:shadow-lg"
            >
              Analyse a Contract
            </button>
          </div>
        ) : (
          /* Cards list */
          <div className="space-y-4">
            {filtered.map((record) => (
              <ContractCard
                key={record.id}
                record={record}
                onDelete={handleDelete}
                onReopen={handleReopen}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
