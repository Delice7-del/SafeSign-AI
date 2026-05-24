"use client";
import { motion, Variants } from "framer-motion";
import {
  CheckCircle,
  AlertTriangle,
  User,
  FileText,
  Download,
  RotateCcw,
  Shield,
} from "lucide-react";
import { AnalysisResponse, UserRole } from "@/types";
import RiskGauge from "./RiskGauge";
import { highlightDangerousText } from "@/utils/riskUtils";
import { exportToPDF } from "@/utils/pdfExport";

interface Props {
  result: AnalysisResponse;
  contractText: string;
  role: UserRole;
  onReset: () => void;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function ResultsDashboard({ result, contractText, role, onReset }: Props) {
  const handleExport = () => exportToPDF(result, contractText, role);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold gradient-text">Analysis Complete</h1>
          <p className="text-gray-500 text-sm mt-1">
            Role: <span className="text-indigo-400 capitalize font-medium">{role}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-white/10 text-gray-300 text-sm font-medium hover:border-indigo-500/50 hover:text-white transition-all"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-sm font-medium hover:bg-indigo-600/30 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            New Analysis
          </button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT — Contract Viewer */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="glass rounded-2xl border border-white/5 overflow-hidden"
        >
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h2 className="font-semibold text-white">Contract Viewer</h2>
            <span className="ml-auto text-xs text-gray-500 bg-red-500/10 border border-red-500/20 px-2 py-1 rounded-full">
              Risky terms highlighted
            </span>
          </div>
          <div
            className="p-6 h-[500px] overflow-y-auto text-sm text-gray-300 leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: highlightDangerousText(contractText),
            }}
          />
        </motion.div>

        {/* RIGHT — Analysis Cards */}
        <div className="space-y-4">
          {/* Risk Score */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="glass rounded-2xl border border-white/5 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-indigo-400" />
              <h2 className="font-semibold text-white">Risk Score</h2>
            </div>
            <div className="flex items-center justify-center">
              <RiskGauge score={result.riskScore} riskLevel={result.riskLevel} />
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="glass rounded-2xl border border-white/5 p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-5 h-5 text-blue-400" />
              <h2 className="font-semibold text-white">Summary</h2>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{result.summary}</p>
          </motion.div>

          {/* Good Parts */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="glass rounded-2xl border border-green-500/10 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <h2 className="font-semibold text-white">Favorable Clauses</h2>
              <span className="ml-auto text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full">
                {result.goodParts.length}
              </span>
            </div>
            <ul className="space-y-2">
              {result.goodParts.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="flex items-start gap-2 text-sm text-gray-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Dangerous Clauses */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5}
            className="glass rounded-2xl border border-red-500/10 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h2 className="font-semibold text-white">Dangerous Clauses</h2>
              <span className="ml-auto text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full">
                {result.dangerousClauses.length}
              </span>
            </div>
            <ul className="space-y-2">
              {result.dangerousClauses.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  className="flex items-start gap-2 text-sm text-gray-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Role-Based Risks */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={6}
            className="glass rounded-2xl border border-yellow-500/10 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-yellow-400" />
              <h2 className="font-semibold text-white">
                Risks for{" "}
                <span className="capitalize text-yellow-400">{role}</span>
              </h2>
            </div>
            <ul className="space-y-2">
              {result.roleBasedRisks.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.05 }}
                  className="flex items-start gap-2 text-sm text-gray-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
