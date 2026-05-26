"use client";

import { motion } from "framer-motion";
import { Contract } from "@/types/contract";
import { FiEye, FiDownload, FiTrash2, FiStar, FiHome, FiBriefcase, FiUser, FiFileText } from "react-icons/fi";

interface ContractCardProps {
  c: Contract;
  onOpen?: (c: Contract) => void;
  onPin?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDownload?: (c: Contract) => void;
}

function RiskBadge({ score }: { score: number }) {
  let color = "bg-emerald-500/10 ring-emerald-500/30 text-emerald-400";
  let label = `${score}% Safe`;
  if (score >= 70) {
    color = "bg-rose-500/10 ring-rose-500/30 text-rose-400";
    label = `${score}% High Risk`;
  } else if (score >= 40) {
    color = "bg-amber-500/10 ring-amber-500/30 text-amber-400";
    label = `${score}% Medium`;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-widest ring-1 ${color}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
      {label}
    </span>
  );
}

export default function ContractCard({
  c,
  onOpen,
  onPin,
  onDelete,
  onDownload,
}: ContractCardProps) {
  // Format Date elegantly
  const formattedDate = new Date(c.uploadedAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Tenant":
        return <FiHome className="h-3.5 w-3.5 text-indigo-400" />;
      case "Freelancer":
        return <FiBriefcase className="h-3.5 w-3.5 text-indigo-400" />;
      case "Employee":
        return <FiUser className="h-3.5 w-3.5 text-indigo-400" />;
      default:
        return <FiFileText className="h-3.5 w-3.5 text-indigo-400" />;
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-2xl glass-panel glass-panel-hover p-5 flex flex-col justify-between min-h-[220px] ${
        c.pinned ? "border-indigo-500/20" : ""
      }`}
    >
      <div>
        {/* Title and Badge row */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-white tracking-wide truncate" title={c.name}>
              {c.name}
            </h4>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-light">
              <span className="text-slate-400 flex items-center gap-1.5">
                {getRoleIcon(c.role)}
                <span className="font-medium">{c.role}</span>
              </span>
              <span>•</span>
              <span>{formattedDate}</span>
              <span>•</span>
              <span className="font-mono text-[10px] text-indigo-400 bg-indigo-500/5 px-1 py-0.5 rounded uppercase">{c.fileType}</span>
            </div>
          </div>
          <div className="shrink-0">
            <RiskBadge score={c.riskScore} />
          </div>
        </div>

        {/* AI summary preview */}
        <p className="text-xs text-slate-400 leading-relaxed font-light line-clamp-3">
          {c.summary}
        </p>
      </div>

      {/* Action panel */}
      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
        {/* Left Side: View Analysis */}
        <button
          onClick={() => onOpen?.(c)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 ring-1 ring-indigo-500/25 hover:ring-indigo-500/50 text-indigo-300 hover:text-indigo-200 text-xs font-semibold px-4 py-2 transition-all duration-200 cursor-pointer"
        >
          <FiEye className="h-3.5 w-3.5" />
          <span>View Analysis</span>
        </button>

        {/* Right Side: Quick toggles */}
        <div className="flex items-center gap-1 text-slate-400">
          {/* Download PDF */}
          <button
            onClick={() => onDownload?.(c)}
            title="Download PDF Report"
            className="p-2 rounded-lg hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
          >
            <FiDownload className="h-4 w-4" />
          </button>

          {/* Pin Toggle */}
          <button
            onClick={() => onPin?.(c.id)}
            title={c.pinned ? "Unpin from top" : "Pin to top"}
            className={`p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer ${
              c.pinned ? "text-amber-400" : "hover:text-amber-300"
            }`}
          >
            <FiStar className="h-4 w-4" fill={c.pinned ? "currentColor" : "none"} />
          </button>

          {/* Delete Action */}
          <button
            onClick={() => onDelete?.(c.id)}
            title="Delete contract from Vault"
            className="p-2 rounded-lg hover:bg-rose-500/10 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <FiTrash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
