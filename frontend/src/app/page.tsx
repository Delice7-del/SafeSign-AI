"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

const CheckIcon = () => (
  <svg
    className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0"
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

const TranslateIcon = () => (
  <svg
    className="h-6 w-6 text-indigo-300"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138A14.25 14.25 0 0 0 10.5 9.75M16.5 21H3v-3.75h13.5V21Z"
    />
  </svg>
);

const UserSearchIcon = () => (
  <svg
    className="h-6 w-6 text-indigo-300"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
    />
  </svg>
);

const UploadIcon = () => (
  <svg
    className="h-6 w-6 text-indigo-400"
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

const ChooseRoleIcon = () => (
  <svg
    className="h-6 w-6 text-indigo-400"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm-1.2 6.468A3.375 3.375 0 0 0 6 12.637v.333c0 .46.37.83.83.83h5.67a.83.83 0 0 0 .83-.83v-.333a3.375 3.375 0 0 0-2.83-3.294Z"
    />
  </svg>
);

const AnalysisIcon = () => (
  <svg
    className="h-6 w-6 text-indigo-400"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
    />
  </svg>
);

export default function LexisLandingPage() {
  const [selectedRole, setSelectedRole] = useState("Freelancer");

  const roleAnalyses: Record<string, { desc: string; threat: string; level: number }> = {
    Freelancer: {
      desc: "Tailored to look for unlimited revisions, payment delay penalties, IP transfer terms upon full payment, and excessive indemnification clauses.",
      threat: "Medium Risk",
      level: 45,
    },
    Tenant: {
      desc: "Focused on sudden entry clauses, tenant-funded structural repair liabilities, automatic renewal lock-ins, and deposit deduction policies.",
      threat: "High Risk",
      level: 85,
    },
    Client: {
      desc: "Monitors vendor service level agreements (SLAs), termination for convenience timelines, liability caps, and dynamic scope-creep protection.",
      threat: "Safe / Low Risk",
      level: 20,
    },
  };

  return (
    <div className="relative min-h-screen bg-[#070814] text-[#f8fafc] overflow-hidden flex flex-col">
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0,transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.06)_0,transparent_60%)] pointer-events-none" />

      {/* Shared Header Navigation */}
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative mx-auto max-w-7xl px-6 md:px-8 pt-16 md:pt-24 pb-20 flex flex-col items-center">
        {/* Upper Pill Badge */}
        <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-500/10 bg-indigo-950/20 px-4.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-indigo-300 neon-glow-blue mb-8">
          <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
          <span>AI-Powered Legal Intelligence</span>
        </div>

        {/* H1 Main Title */}
        <h1 className="max-w-5xl text-center text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] md:leading-[1.08] mb-6">
          Understand Any Contract <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#dcdfff] to-indigo-300">
            Before You Sign
          </span>
        </h1>

        {/* H2/Subtitle */}
        <p className="max-w-3xl text-center text-slate-400 text-base md:text-lg font-light leading-relaxed mb-10">
          AI-powered contract simplification and risk detection for ordinary people. Don't
          let legalese hide the risks you can't afford.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4.5 mb-16">
          <Link href="/analyze" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto rounded-lg bg-[#c7d2fe] hover:bg-[#b0c0f8] text-[#0f1123] font-semibold text-sm px-8 py-4 shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all">
              Analyze Contract
            </button>
          </Link>
          <button className="w-full sm:w-auto rounded-lg border border-slate-800 bg-[#070814]/40 hover:bg-slate-900/50 hover:border-slate-700 text-white font-medium text-sm px-8 py-4 hover:scale-[1.01] transition-all">
            Watch Demo
          </button>
        </div>

        {/* 3D Visual Asset & Floating Overlap Cards */}
        <div className="relative w-full max-w-4xl rounded-2xl border border-white/5 bg-[#0a0b18]/40 p-4 md:p-8 backdrop-blur-sm neon-glow-purple">
          {/* Main Hero Illustration */}
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl border border-white/5">
            <Image
              src="/contract_hero.png"
              alt="Lexis AI Contract Visualizer"
              fill
              className="object-cover"
              priority
            />
            {/* Visual shade overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070814] via-transparent to-transparent opacity-80" />
          </div>

          {/* Floating Card 1: High Risk Detected */}
          <div className="absolute top-[20%] left-[-4%] md:left-[-6%] max-w-[280px] md:max-w-[320px] rounded-xl glass-panel p-5.5 text-xs border border-rose-500/25 shadow-xl hover:scale-[1.02] transition-all">
            <div className="flex items-center space-x-2 text-rose-500 font-bold uppercase tracking-wider mb-2">
              <WarningIcon />
              <span>High Risk Detected</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-light">
              Section 4.2 contains a non-compete clause that lasts 5 years. This is 3
              years longer than industry standard.
            </p>
          </div>

          {/* Floating Card 2: Simple Explanation */}
          <div className="absolute bottom-[15%] right-[-4%] md:right-[-6%] max-w-[280px] md:max-w-[340px] rounded-xl glass-panel p-5.5 text-xs border border-indigo-500/20 shadow-xl hover:scale-[1.02] transition-all">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold uppercase tracking-wider mb-2">
              <SparklesIcon />
              <span>Simple Explanation</span>
            </div>
            <p className="text-indigo-100 italic leading-relaxed font-light">
              "In layman's terms: You are giving the company permission to use your
              personal data for advertising without further notice."
            </p>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID SECTION --- */}
      <section className="relative mx-auto max-w-7xl px-6 md:px-8 py-24 border-t border-slate-900/60 bg-[#090a18]/20">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Powerful Detection. Simple Results.
          </h2>
          <p className="max-w-2xl text-slate-400 font-light text-sm md:text-base leading-relaxed">
            Our neural engine processes thousands of legal precedents to find what matters
            most to you.
          </p>
        </div>

        {/* Feature Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6.5">
          {/* Card A: Simple Explanations (Wide Card spanning 2 columns) */}
          <div className="lg:col-span-2 rounded-2xl glass-panel glass-panel-hover p-8 md:p-10 flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6">
                <div className="h-12 w-12 rounded-lg bg-indigo-950/40 border border-indigo-500/20 flex items-center justify-center mb-6">
                  <TranslateIcon />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Simple Explanations
                </h3>
                <p className="text-slate-400 font-light text-sm leading-relaxed mb-6">
                  Tired of jargon? SafeSign translates complex legal sentences into plain
                  English that anyone can understand in seconds.
                </p>
                <ul className="space-y-3.5">
                  <li className="flex items-center text-slate-300 text-xs font-light">
                    <CheckIcon />
                    <span>No law degree required</span>
                  </li>
                  <li className="flex items-center text-slate-300 text-xs font-light">
                    <CheckIcon />
                    <span>Summary of key responsibilities</span>
                  </li>
                </ul>
              </div>

              <div className="md:col-span-6 relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-white/5 bg-[#0b0c1e]/80">
                <Image
                  src="/contract_compare.png"
                  alt="Dynamic Text Simplification UI"
                  fill
                  className="object-cover scale-[1.02]"
                />
              </div>
            </div>
          </div>

          {/* Card B: Risk Detection (Narrow Card spanning 1 column) */}
          <div className="rounded-2xl glass-panel glass-panel-hover p-8 md:p-10 flex flex-col justify-between border-rose-500/5 hover:border-rose-500/15">
            <div>
              <div className="h-12 w-12 rounded-lg bg-rose-950/30 border border-rose-500/15 flex items-center justify-center mb-6">
                <WarningIcon className="h-6 w-6 text-rose-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Risk Detection
              </h3>
              <p className="text-slate-400 font-light text-sm leading-relaxed mb-8">
                Automatically flag hidden fees, predatory clauses, and unfavorable
                termination terms before they become your problem.
              </p>
            </div>

            {/* Coral Danger Progress Indicator */}
            <div className="bg-[#0b0c1b] rounded-xl border border-rose-500/10 p-5.5 mt-4">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider mb-2.5">
                <span className="text-slate-400">Threat Level</span>
                <span className="text-rose-400">Critical</span>
              </div>
              <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-rose-500 to-rose-400 w-[88%] rounded-full shadow-[0_0_10px_rgba(244,63,94,0.3)]" />
              </div>
            </div>
          </div>

          {/* Card C: Role-Based Analysis */}
          <div className="lg:col-span-1 rounded-2xl glass-panel glass-panel-hover p-8 md:p-10 flex flex-col justify-between border-indigo-500/5 hover:border-indigo-500/15">
            <div>
              <div className="h-12 w-12 rounded-lg bg-indigo-950/40 border border-indigo-500/20 flex items-center justify-center mb-6">
                <UserSearchIcon />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Role-Based Analysis
              </h3>
              <p className="text-slate-400 font-light text-sm leading-relaxed mb-6">
                Tell the AI who you are—a tenant, freelancer, or employee—and get an
                analysis tailored specifically to your perspective and rights.
              </p>
            </div>

            {/* Interactive Section */}
            <div className="mt-4">
              <div className="bg-[#0b0c1c]/70 rounded-xl p-4.5 mb-6 border border-white/5 min-h-[90px] transition-all">
                <p className="text-[11px] text-indigo-300 font-semibold uppercase tracking-wider mb-1.5 flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mr-1.5"></span>
                  {selectedRole} Focus
                </p>
                <p className="text-slate-300 text-xs font-light leading-relaxed">
                  {roleAnalyses[selectedRole].desc}
                </p>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-2">
                {["Freelancer", "Tenant", "Client"].map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`rounded-lg text-xs font-medium px-4 py-2.5 transition-all cursor-pointer ${
                      selectedRole === role
                        ? "bg-[#c7d2fe] text-[#0f1123] font-semibold"
                        : "bg-[#0b0c1b] border border-white/5 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section className="relative mx-auto max-w-7xl px-6 md:px-8 py-24 border-t border-slate-900/60 bg-[#070814]">
        {/* Title */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            From Chaos to Clarity in 3 Steps
          </h2>
        </div>

        {/* Steps Stepper */}
        <div className="relative">
          {/* Stepper horizontal line overlay (only visible on medium screens and up) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full border border-indigo-500/10 bg-indigo-950/20 backdrop-blur-md flex items-center justify-center mb-6 shadow-xl shadow-indigo-500/5">
                <UploadIcon />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">1. Upload</h3>
              <p className="max-w-xs text-slate-400 font-light text-xs leading-relaxed">
                Drop your PDF, Word, or text file into our secure portal. We use
                end-to-end encryption for every document.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full border border-indigo-500/10 bg-indigo-950/20 backdrop-blur-md flex items-center justify-center mb-6 shadow-xl shadow-indigo-500/5">
                <ChooseRoleIcon />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">2. Choose Role</h3>
              <p className="max-w-xs text-slate-400 font-light text-xs leading-relaxed">
                Select your position in the contract. Our AI adjusts its focus to look for
                risks specific to your situation.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full border border-indigo-500/10 bg-indigo-950/20 backdrop-blur-md flex items-center justify-center mb-6 shadow-xl shadow-indigo-500/5">
                <AnalysisIcon />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">3. Get Analysis</h3>
              <p className="max-w-xs text-slate-400 font-light text-xs leading-relaxed">
                Receive a detailed breakdown of risks, obligations, and simplified
                summaries within seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION CARD BANNER --- */}
      <section className="relative mx-auto max-w-7xl px-6 md:px-8 py-16">
        <div className="relative rounded-3xl border border-indigo-500/15 bg-gradient-to-b from-[#131633]/80 to-[#0b0c1b]/95 p-12 md:p-16 text-center neon-glow-purple overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.06)_0,transparent_75%)] pointer-events-none" />

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-5">
            Secure Your Future Today
          </h2>
          <p className="mx-auto max-w-xl text-slate-400 font-light text-xs md:text-sm leading-relaxed mb-10">
            Join 50,000+ individuals who sign with confidence. No more legal surprises,
            just pure clarity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4.5">
            <Link href="/analyze" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto rounded-lg bg-[#c7d2fe] hover:bg-[#b0c0f8] text-[#0f1123] font-semibold text-sm px-8 py-4 shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all">
                Start Your First Analysis
              </button>
            </Link>
            <button className="w-full sm:w-auto rounded-lg border border-slate-800 bg-[#070814]/40 hover:bg-slate-900/50 hover:border-slate-700 text-white font-medium text-sm px-8 py-4 hover:scale-[1.01] transition-all">
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Shared Footer Navigation */}
      <Footer />
    </div>
  );
}
