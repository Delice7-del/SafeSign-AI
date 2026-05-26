"use client";

import { FiSearch, FiFilter } from "react-icons/fi";

interface SearchBarProps {
  query: string;
  setQuery: (q: string) => void;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  selectedRisk: string;
  setSelectedRisk: (risk: string) => void;
}

export default function SearchBar({
  query,
  setQuery,
  selectedRole,
  setSelectedRole,
  selectedRisk,
  setSelectedRisk,
}: SearchBarProps) {
  return (
    <div className="w-full flex flex-col md:flex-row gap-4 items-stretch md:items-center">
      {/* Search Input Container */}
      <div className="flex-1 relative">
        <FiSearch className="absolute left-4 top-3.5 text-slate-400 h-4 w-4" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by contract name, role, keywords..."
          className="w-full pl-11 pr-4 py-3 bg-[#0a0b18]/60 border border-white/5 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 glass-panel glass-panel-hover transition-all"
        />
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Role Dropdown */}
        <div className="relative">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="appearance-none pl-4 pr-10 py-3 bg-[#0a0b18]/60 border border-white/5 rounded-xl text-xs font-medium text-slate-300 hover:text-white focus:outline-none cursor-pointer glass-panel transition-all min-w-[140px]"
          >
            <option value="All Contracts">All Contracts</option>
            <option value="Tenant">Tenant</option>
            <option value="Freelancer">Freelancer</option>
            <option value="Employee">Employee</option>
          </select>
          <div className="absolute right-3.5 top-4 pointer-events-none text-slate-500">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Risk Dropdown */}
        <div className="relative">
          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="appearance-none pl-4 pr-10 py-3 bg-[#0a0b18]/60 border border-white/5 rounded-xl text-xs font-medium text-slate-300 hover:text-white focus:outline-none cursor-pointer glass-panel transition-all min-w-[130px]"
          >
            <option value="All Risk">All Risk</option>
            <option value="Safe">Safe</option>
            <option value="Medium">Medium</option>
            <option value="High Risk">High Risk</option>
          </select>
          <div className="absolute right-3.5 top-4 pointer-events-none text-slate-500">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Status indicator */}
        <div className="px-4 py-3 rounded-xl border border-white/5 bg-[#0a0b18]/30 text-slate-500 text-xs font-medium flex items-center gap-2 glass-panel shrink-0 select-none">
          <FiFilter className="text-slate-400" />
          <span>Filters Active</span>
        </div>
      </div>
    </div>
  );
}
