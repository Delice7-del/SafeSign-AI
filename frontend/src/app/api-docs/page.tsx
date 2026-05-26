"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FiCode, FiZap, FiKey, FiTerminal, FiCopy, FiCheck } from "react-icons/fi";

const endpoints = [
  {
    method: "POST",
    path: "/v1/analyze",
    description: "Submit a contract document for AI analysis.",
    color: "text-emerald-400",
    bg: "bg-emerald-950/30",
    border: "border-emerald-500/20",
    body: `{
  "document": "base64_encoded_pdf_or_text",
  "role": "freelancer" | "tenant" | "client",
  "language": "en" // optional, default: "en"
}`,
    response: `{
  "analysis_id": "anl_xK9mP2...",
  "risk_level": "medium",
  "risk_score": 42,
  "summary": "This contract contains 3 flagged clauses...",
  "clauses": [ ... ],
  "created_at": "2026-05-26T14:00:00Z"
}`,
  },
  {
    method: "GET",
    path: "/v1/analysis/{id}",
    description: "Retrieve a previously generated analysis by its ID.",
    color: "text-blue-400",
    bg: "bg-blue-950/30",
    border: "border-blue-500/20",
    body: null,
    response: `{
  "analysis_id": "anl_xK9mP2...",
  "risk_level": "medium",
  "clauses": [ ... ]
}`,
  },
  {
    method: "DELETE",
    path: "/v1/vault/{doc_id}",
    description: "Permanently delete a document from a user's Vault.",
    color: "text-rose-400",
    bg: "bg-rose-950/30",
    border: "border-rose-500/20",
    body: null,
    response: `{
  "success": true,
  "deleted_id": "doc_3Rk9..."
}`,
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
        {/* Page header */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/15 bg-indigo-950/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-indigo-300 mb-6">
            <FiCode className="h-3.5 w-3.5" />
            <span>Developers</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            API Reference
          </h1>
          <p className="text-slate-400 font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Integrate LEXIS.AI's contract intelligence directly into your product.
            RESTful, secure, and built for scale.
          </p>
        </div>

        {/* Auth section */}
        <div className="glass-panel rounded-2xl p-7 md:p-8 mb-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-9 w-9 rounded-lg bg-indigo-950/50 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <FiKey className="h-5 w-5 text-indigo-400" />
            </div>
            <h2 className="text-lg font-bold text-white">Authentication</h2>
          </div>
          <p className="text-slate-400 text-sm font-light leading-relaxed mb-4">
            All API requests require a Bearer token in the Authorization header. You can
            generate an API key from your account dashboard.
          </p>
          <CodeBlock code={`Authorization: Bearer lexis_sk_live_xxxxxxxxxxxxxxxxxxxx`} />
        </div>

        {/* Base URL */}
        <div className="glass-panel rounded-2xl p-7 md:p-8 mb-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-9 w-9 rounded-lg bg-indigo-950/50 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <FiTerminal className="h-5 w-5 text-indigo-400" />
            </div>
            <h2 className="text-lg font-bold text-white">Base URL</h2>
          </div>
          <CodeBlock code={`https://api.lexis.ai`} />
        </div>

        {/* Rate limits */}
        <div className="glass-panel rounded-2xl p-7 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-9 w-9 rounded-lg bg-indigo-950/50 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <FiZap className="h-5 w-5 text-indigo-400" />
            </div>
            <h2 className="text-lg font-bold text-white">Rate Limits</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { tier: "Free", limit: "10 req / day", color: "border-slate-700" },
              { tier: "Pro", limit: "500 req / day", color: "border-indigo-500/30" },
              { tier: "Enterprise", limit: "Unlimited", color: "border-blue-500/30" },
            ].map((t) => (
              <div key={t.tier} className={`rounded-xl border ${t.color} bg-[#070814]/50 p-4 text-center`}>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">{t.tier}</p>
                <p className="text-white font-bold text-sm">{t.limit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Endpoints */}
        <h2 className="text-xl font-bold text-white mb-5">Endpoints</h2>
        <div className="space-y-5">
          {endpoints.map((ep, i) => (
            <div key={i} className="glass-panel glass-panel-hover rounded-2xl p-7 md:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded-md ${ep.bg} ${ep.border} border ${ep.color}`}>
                  {ep.method}
                </span>
                <code className="text-sm font-mono text-white">{ep.path}</code>
              </div>
              <p className="text-slate-400 text-sm font-light mb-5">{ep.description}</p>
              {ep.body && (
                <div className="mb-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Request Body</p>
                  <CodeBlock code={ep.body} />
                </div>
              )}
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Response</p>
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
