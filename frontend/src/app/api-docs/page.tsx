"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FiCode, FiZap, FiTerminal, FiCopy, FiCheck } from "react-icons/fi";
import { API_BASE } from "@/lib/api";

const endpoints = [
  {
    method: "POST",
    path: "/api/analyze-contract",
    description:
      "Run AI analysis on contract text. Persists the result and returns analysis fields plus database id.",
    color: "text-emerald-400",
    bg: "bg-emerald-950/30",
    border: "border-emerald-500/20",
    body: `{
  "contractText": "Full contract text…",
  "userRole": "tenant" | "freelancer" | "employee"
}`,
    response: `{
  "id": 42,
  "summary": "…",
  "goodParts": ["…"],
  "dangerousClauses": ["…"],
  "roleBasedRisks": ["…"],
  "riskScore": 72,
  "riskLevel": "Medium Risk"
}`,
  },
  {
    method: "GET",
    path: "/api/history",
    description: "List all saved analyses (Vault / History).",
    color: "text-blue-400",
    bg: "bg-blue-950/30",
    border: "border-blue-500/20",
    body: null,
    response: `[{
  "id": 42,
  "contractTitle": "SaaS_MSA_v4.2.pdf",
  "role": "Freelancer",
  "riskLevel": "Medium Risk",
  "riskScore": 58,
  "summary": "…",
  "analyzedAt": "2026-05-26T14:02:00",
  "flaggedClauses": 3,
  "pinned": false
}]`,
  },
  {
    method: "GET",
    path: "/api/analyses/{id}",
    description: "Full analysis detail for Vault modal and reopening reports.",
    color: "text-blue-400",
    bg: "bg-blue-950/30",
    border: "border-blue-500/20",
    body: null,
    response: `{ "id": 42, "contractText": "…", "goodParts": [], … }`,
  },
  {
    method: "POST",
    path: "/api/analyses",
    description: "Manually save an analysis (used when analyze ran offline).",
    color: "text-emerald-400",
    bg: "bg-emerald-950/30",
    border: "border-emerald-500/20",
    body: `{
  "contractText": "…",
  "userRole": "freelancer",
  "summary": "…",
  "goodParts": [],
  "dangerousClauses": [],
  "roleBasedRisks": [],
  "riskScore": 58,
  "riskLevel": "Medium Risk"
}`,
    response: `AnalysisHistoryDto (same shape as history list item)`,
  },
  {
    method: "PATCH",
    path: "/api/analyses/{id}/pin",
    description: "Pin or unpin a contract in the Vault.",
    color: "text-amber-400",
    bg: "bg-amber-950/30",
    border: "border-amber-500/20",
    body: `{ "pinned": true }`,
    response: `Updated AnalysisHistoryDto`,
  },
  {
    method: "DELETE",
    path: "/api/analyses/{id}",
    description: "Delete a saved analysis from Vault / History.",
    color: "text-rose-400",
    bg: "bg-rose-950/30",
    border: "border-rose-500/20",
    body: null,
    response: `204 No Content`,
  },
];

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative group">
      <pre className="bg-[#070814] border border-white/5 rounded-xl p-4 text-xs text-slate-300 font-mono overflow-x-auto leading-relaxed">
        {code}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-3 right-3 h-7 w-7 rounded-md bg-slate-800 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer hover:bg-slate-700"
      >
        {copied ? (
          <FiCheck className="h-3.5 w-3.5 text-emerald-400" />
        ) : (
          <FiCopy className="h-3.5 w-3.5 text-slate-400" />
        )}
      </button>
    </div>
  );
}

export default function ApiPage() {
  return (
    <div className="relative min-h-screen bg-[#070814] text-[#f8fafc] overflow-hidden flex flex-col">
      <div className="absolute top-[-10%] left-[-5%] w-[45%] h-[45%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.07)_0,transparent_60%)] pointer-events-none" />

      <Header />

      <main className="flex-1 mx-auto w-full max-w-4xl px-6 md:px-8 py-16 md:py-24">
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/15 bg-indigo-950/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-indigo-300 mb-6">
            <FiCode className="h-3.5 w-3.5" />
            <span>Developers</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            API Reference
          </h1>
          <p className="text-slate-400 font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            REST API used by Analyze, History, and Vault. Set{" "}
            <code className="text-indigo-300">NEXT_PUBLIC_API_BASE</code> in the frontend to
            match your Spring Boot server.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-7 md:p-8 mb-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-9 w-9 rounded-lg bg-indigo-950/50 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <FiTerminal className="h-5 w-5 text-indigo-400" />
            </div>
            <h2 className="text-lg font-bold text-white">Base URL</h2>
          </div>
          <CodeBlock code={API_BASE} />
        </div>

        <div className="glass-panel rounded-2xl p-7 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-9 w-9 rounded-lg bg-indigo-950/50 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <FiZap className="h-5 w-5 text-indigo-400" />
            </div>
            <h2 className="text-lg font-bold text-white">Frontend pages</h2>
          </div>
          <ul className="text-sm text-slate-400 space-y-2 font-light">
            <li>
              <strong className="text-slate-200">/analyze</strong> → POST analyze-contract, GET
              analyses/{"{id}"} (reopen), POST analyses (save)
            </li>
            <li>
              <strong className="text-slate-200">/history</strong> → GET history, DELETE
              analyses/{"{id}"}
            </li>
            <li>
              <strong className="text-slate-200">/vault</strong> → GET history, GET analyses/
              {"{id}"}, PATCH pin, DELETE
            </li>
          </ul>
        </div>

        <h2 className="text-xl font-bold text-white mb-5">Endpoints</h2>
        <div className="space-y-5">
          {endpoints.map((ep, i) => (
            <div key={i} className="glass-panel glass-panel-hover rounded-2xl p-7 md:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className={`text-xs font-bold font-mono px-2.5 py-1 rounded-md ${ep.bg} ${ep.border} border ${ep.color}`}
                >
                  {ep.method}
                </span>
                <code className="text-sm font-mono text-white">{ep.path}</code>
              </div>
              <p className="text-slate-400 text-sm font-light mb-5">{ep.description}</p>
              {ep.body && (
                <div className="mb-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">
                    Request Body
                  </p>
                  <CodeBlock code={ep.body} />
                </div>
              )}
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">
                  Response
                </p>
                <CodeBlock code={ep.response} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-400 transition-colors cursor-pointer"
          >
            ← Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
