"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FiShield, FiLock, FiEye, FiDatabase, FiUserCheck, FiMail } from "react-icons/fi";

const sections = [
  {
    icon: <FiEye className="h-5 w-5 text-indigo-400" />,
    title: "Information We Collect",
    content: [
      "We collect information you provide directly to us, such as when you upload a contract document, create an account, or contact us for support.",
      "This includes document content (processed transiently and never stored permanently), usage metadata such as analysis timestamps and role selections, and optional account details like email address.",
      "We do not collect sensitive personal identifiers beyond what is necessary for service delivery.",
    ],
  },
  {
    icon: <FiDatabase className="h-5 w-5 text-indigo-400" />,
    title: "How We Use Your Data",
    content: [
      "Document content is processed solely to generate your AI analysis and is not stored on our servers beyond the duration of your active session unless you explicitly save it to your Vault.",
      "Usage metadata helps us improve our AI models, detect abuse, and maintain service reliability.",
      "We never sell, rent, or share your personal data with third-party advertisers.",
    ],
  },
  {
    icon: <FiLock className="h-5 w-5 text-indigo-400" />,
    title: "Data Security",
    content: [
      "All document uploads and API communications are encrypted in transit using TLS 1.3.",
      "Vault-stored documents are encrypted at rest using AES-256 encryption.",
      "We conduct regular third-party security audits and maintain SOC 2 Type II compliance.",
    ],
  },
  {
    icon: <FiUserCheck className="h-5 w-5 text-indigo-400" />,
    title: "Your Rights",
    content: [
      "You have the right to access, correct, or delete any personal data we hold about you at any time.",
      "You may request a full export of your data in machine-readable format.",
      "You may opt out of all non-essential data processing while retaining access to core features.",
    ],
  },
  {
    icon: <FiShield className="h-5 w-5 text-indigo-400" />,
    title: "Cookies & Tracking",
    content: [
      "We use strictly necessary cookies to maintain your session and authentication state.",
      "We do not use third-party tracking cookies or behavioral advertising technologies.",
      "You may clear session cookies at any time through your browser settings without affecting your saved data.",
    ],
  },
  {
    icon: <FiMail className="h-5 w-5 text-indigo-400" />,
    title: "Contact Us",
    content: [
      "If you have questions about this Privacy Policy or wish to exercise your data rights, contact our Data Protection Officer at privacy@lexis.ai.",
      "We respond to all verified requests within 72 hours.",
      "Last updated: May 2026.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-[#070814] text-[#f8fafc] overflow-hidden flex flex-col">
      {/* Background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.07)_0,transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.05)_0,transparent_60%)] pointer-events-none" />

      <Header />

      <main className="flex-1 mx-auto w-full max-w-4xl px-6 md:px-8 py-16 md:py-24">
        {/* Page header */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/15 bg-indigo-950/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-indigo-300 mb-6">
            <FiShield className="h-3.5 w-3.5" />
            <span>Legal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-400 font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            We believe privacy is a fundamental right. Here is exactly how LEXIS.AI
            handles your data — no legalese, no surprises.
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
