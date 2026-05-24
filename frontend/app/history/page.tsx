"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  History,
  FileText,
  Calendar,
  User,
  RefreshCw,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Shield,
} from "lucide-react";
import { useHistory } from "@/hooks/useHistory";
import { AnalysisRecord } from "@/types";
import { getRiskColor, getRiskBgColor, formatDate } from "@/utils/riskUtils";
import RiskGauge from "@/components/RiskGauge";

function HistoryCardSkeleton() {
  return (
    <div className="glass rounded-2xl border border-white/5 p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-white/10 rounded" />
          <div className="h-3 w-24 bg-white/5 rounded" />
        </div>
        <div className="h-8 w-20 bg-white/10 rounded-full" />
      </div>
      <div className="h-3 w-full bg-white/5 rounded mb-2" />
      <div className="h-3 w-3/4 bg-white/5 rounded" />
    </div>
  );
}

function HistoryCard({ record }: { record: AnalysisRecord }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl border border-white/5 hover:border-indigo-500/20 transition-all duration-300 overflow-hidden"
    >
      {/* Card Header */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">
                Contract #{record.id}
              </p>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  {formatDate(record.createdAt)}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <User className="w-3 h-3" />
                  <span className="capitalize">{record.userRole}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Risk Badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold flex-shrink-0 ${getRiskBgColor(record.riskLevel)}`}>
            <Shield className="w-3 h-3" />
            <span className={getRiskColor(record.riskLevel)}>{record.riskLevel}</span>
            <span className="text-gray-500">· {record.riskScore}</span>
          </div>
        </div>

        {/* Summary */}
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
          {record.summary}
        </p>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-3 h-3" /> Hide details
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3" /> View full analysis
            </>
          )}
        </button>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-white/5"
          >
            <div className="p-6 grid md:grid-cols-2 gap-6">
              {/* Risk Gauge */}
              <div className="flex flex-col items-center justify-center">
                <RiskGauge score={record.riskScore} riskLevel={record.riskLevel} />
              </div>

              <div className="space-y-4">
                {/* Good Parts */}
                {record.goodParts?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2">
                      Favorable Clauses
                    </h4>
                    <ul className="space-y-1">
                      {record.goodParts.slice(0, 3).map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                          <span className="w-1 h-1 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Dangerous Clauses */}
                {record.dangerousClauses?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">
                      Dangerous Clauses
                    </h4>
                    <ul className="space-y-1">
                      {record.dangerousClauses.slice(0, 3).map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                          <span className="w-1 h-1 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function HistoryPage() {
  const { records, loading, error, refetch } = useHistory();

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-extrabold gradient-text flex items-center gap-3">
              <History className="w-8 h-8 text-indigo-400" />
              Analysis History
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {records.length} contract{records.length !== 1 ? "s" : ""} analyzed
            </p>
          </div>
          <button
            onClick={refetch}
            className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-white/10 text-gray-400 text-sm hover:text-white hover:border-indigo-500/30 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => <HistoryCardSkeleton key={i} />)}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Failed to load history</h3>
            <p className="text-gray-500 text-sm mb-6">{error}</p>
            <button
              onClick={refetch}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 font-medium hover:bg-indigo-600/30 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && records.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-20 h-20 rounded-2xl glass border border-white/10 flex items-center justify-center mb-6">
              <FileText className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No analyses yet</h3>
            <p className="text-gray-500 text-sm mb-8">
              Upload a contract to begin your first analysis.
            </p>
            <a
              href="/analyze"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold hover:from-indigo-500 hover:to-blue-500 transition-all glow-indigo"
            >
              Analyze a Contract
            </a>
          </motion.div>
        )}

        {/* Records */}
        {!loading && !error && records.length > 0 && (
          <div className="space-y-4">
            {records.map((record) => (
              <HistoryCard key={record.id} record={record} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
