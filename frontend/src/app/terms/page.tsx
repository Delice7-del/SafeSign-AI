"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FiFileText, FiAlertTriangle, FiSlash, FiRefreshCw, FiGlobe, FiMail } from "react-icons/fi";

const sections = [
  {
    icon: <FiFileText className="h-5 w-5 text-indigo-400" />,
    title: "Acceptance of Terms",
    content: [
      "By accessing or using LEXIS.AI, you agree to be bound by these Terms of Service and our Privacy Policy.",
      "If you do not agree with any part of these terms, you must not use our platform.",
      "We reserve the right to update these terms at any time. Continued use of the service constitutes acceptance of updated terms.",
    ],
  },
  {
    icon: <FiGlobe className="h-5 w-5 text-indigo-400" />,
    title: "Use of the Service",
    content: [
      "LEXIS.AI is an AI-powered legal document analysis tool. It is not a substitute for professional legal advice from a qualified attorney.",
      "You may use LEXIS.AI for personal, non-commercial purposes. Commercial use requires a separate enterprise license.",
      "You agree not to upload documents containing malicious code, or use the service to violate any applicable laws.",
    ],
  },
  {
    icon: <FiAlertTriangle className="h-5 w-5 text-indigo-400" />,
    title: "Disclaimer of Warranties",
    content: [
      "The AI analysis provided is for informational purposes only and does not constitute legal advice.",
      "LEXIS.AI is provided 'as is' without warranty of any kind, express or implied.",
      "We do not guarantee the accuracy, completeness, or fitness of any analysis for a particular legal purpose.",
    ],
  },
  {
    icon: <FiSlash className="h-5 w-5 text-indigo-400" />,
    title: "Limitation of Liability",
    content: [
      "To the maximum extent permitted by law, LEXIS.AI shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.",
      "Our total liability to you for any claims shall not exceed the amount you paid us in the 12 months preceding the claim.",
      "Some jurisdictions do not allow the exclusion of certain warranties or liability limitations, so the above may not apply to you.",
    ],
  },
  {
    icon: <FiRefreshCw className="h-5 w-5 text-indigo-400" />,
    title: "Termination",
    content: [
      "We may suspend or terminate your access to LEXIS.AI at any time for violation of these terms, with or without notice.",
      "You may terminate your account at any time by contacting us. Upon termination, your Vault data will be securely deleted within 30 days.",
      "All provisions of these terms that by their nature should survive termination shall remain in effect.",
    ],
  },
  {
    icon: <FiMail className="h-5 w-5 text-indigo-400" />,
    title: "Contact",
    content: [
      "For questions regarding these Terms of Service, please contact us at legal@lexis.ai.",
      "For disputes, please first contact us directly before initiating any formal legal proceedings.",
      "Last updated: May 2026.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-[#070814] text-[#f8fafc] overflow-hidden flex flex-col">
      {/* Background glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.07)_0,transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.05)_0,transparent_60%)] pointer-events-none" />

      <Header />

      <main className="flex-1 mx-auto w-full max-w-4xl px-6 md:px-8 py-16 md:py-24">
        {/* Page header */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/15 bg-indigo-950/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-indigo-300 mb-6">
            <FiFileText className="h-3.5 w-3.5" />
            <span>Legal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-400 font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Clear, transparent terms governing your use of LEXIS.AI. We write
            these the way we wish every contract was written — plainly.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-5">
          {sections.map((section, i) => (
            <div
              key={i}
              className="glass-panel glass-panel-hover rounded-2xl p-7 md:p-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="h-9 w-9 rounded-lg bg-indigo-950/50 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  {section.icon}
                </div>
                <h2 className="text-lg font-bold text-white">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((para, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-slate-400 font-light text-sm leading-relaxed">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-indigo-500/60 shrink-0" />
                    {para}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Back link */}
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
