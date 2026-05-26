"use client";

import { motion } from "framer-motion";
import { FiFileText, FiAlertTriangle, FiCheckCircle, FiCalendar } from "react-icons/fi";

interface StatsCardsProps {
  stats: {
    total: number;
    high: number;
    safe: number;
    recent: number;
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const items = [
    {
      key: "Total Contracts",
      value: stats.total,
      label: "saved contracts",
      icon: <FiFileText className="h-4 w-4" />,
      borderGlow: "group-hover:border-indigo-500/30",
      iconBg: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
      valueColor: "text-white",
    },
    {
      key: "High Risk Contracts",
      value: stats.high,
      label: "dangerous clauses",
      icon: <FiAlertTriangle className="h-4 w-4" />,
      borderGlow: "group-hover:border-rose-500/30",
      iconBg: "bg-rose-500/10 border-rose-500/20 text-rose-400",
      valueColor: "text-rose-400",
    },
    {
      key: "Safe Contracts",
      value: stats.safe,
      label: "low-risk analyses",
      icon: <FiCheckCircle className="h-4 w-4" />,
      borderGlow: "group-hover:border-emerald-500/30",
      iconBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      valueColor: "text-emerald-400",
    },
    {
      key: "Recent Uploads",
      value: stats.recent,
      label: "uploaded this week",
      icon: <FiCalendar className="h-4 w-4" />,
      borderGlow: "group-hover:border-sky-500/30",
      iconBg: "bg-sky-500/10 border-sky-500/20 text-sky-400",
      valueColor: "text-sky-300",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {items.map((it, i) => (
        <motion.div
          key={it.key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          className={`group relative glass-panel p-5 rounded-2xl glass-panel-hover flex flex-col justify-between min-h-[120px] overflow-hidden ${it.borderGlow}`}
        >
          {/* Subtle inside glow element */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0,transparent_100%)] pointer-events-none" />

          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                {it.key}
              </p>
              <p className="text-[9px] text-slate-500 font-light mt-1 uppercase tracking-wider leading-none">
                {it.label}
              </p>
            </div>
            
            <div className={`h-8 w-8 rounded-lg border flex items-center justify-center text-sm ${it.iconBg}`}>
              {it.icon}
            </div>
          </div>

          <div className="mt-4">
            <h4 className={`text-3xl font-extrabold tracking-tight ${it.valueColor}`}>
              {String(it.value).padStart(2, "0")}
            </h4>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
