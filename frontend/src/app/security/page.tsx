"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FiShield, FiLock, FiServer, FiAlertTriangle, FiCheckCircle, FiMail } from "react-icons/fi";

const features = [
  {
    icon: <FiLock className="h-5 w-5 text-indigo-400" />,
    title: "End-to-End Encryption",
    content: [
      "All document uploads are encrypted in transit using TLS 1.3 — the same standard used by major banks.",
      "Documents stored in your Vault are encrypted at rest using AES-256 encryption with unique per-user keys.",
      "Encryption keys are managed via a dedicated Hardware Security Module (HSM) and are never logged.",
    ],
  },
  {
    icon: <FiServer className="h-5 w-5 text-indigo-400" />,
    title: "Infrastructure Security",
    content: [
      "Our infrastructure runs on SOC 2 Type II certified cloud providers with geo-redundant backups.",
      "All services run in isolated network segments with strict firewall rules and zero-trust access control.",
      "We perform automated vulnerability scanning and dependency audits on every deployment.",
    ],
  },
  {
    icon: <FiCheckCircle className="h-5 w-5 text-indigo-400" />,
    title: "Compliance & Certifications",
    content: [
      "LEXIS.AI is GDPR and CCPA compliant. We honor all data subject requests within 72 hours.",
      "We maintain SOC 2 Type II certification, reviewed annually by an independent third party.",
      "Our data processing agreements (DPAs) are available for enterprise customers upon request.",
    ],
  },
  {
    icon: <FiShield className="h-5 w-5 text-indigo-400" />,
    title: "Access Control",
    content: [
      "Vault access is authenticated via JWT tokens with short expiry windows and secure refresh flows.",
      "All administrative access to production systems requires multi-factor authentication and is fully audited.",
      "We enforce the principle of least privilege — no team member has broad access to user data.",
    ],
  },
  {
    icon: <FiAlertTriangle className="h-5 w-5 text-indigo-400" />,
    title: "Incident Response",
    content: [
      "We maintain a 24/7 security operations center with automated anomaly detection and alerting.",
      "In the event of a data breach, affected users will be notified within 72 hours in compliance with GDPR Article 33.",
      "Post-incident reviews are conducted and findings are shared transparently in our security changelog.",
    ],
  },
  {
    icon: <FiMail className="h-5 w-5 text-indigo-400" />,
    title: "Responsible Disclosure",
    content: [
      "We run a responsible disclosure program. If you discover a security vulnerability, please report it to security@lexis.ai.",
      "We commit to acknowledging all valid reports within 24 hours and resolving critical issues within 7 days.",
      "We do not pursue legal action against researchers who follow responsible disclosure guidelines.",
    ],
  },
];

const certBadges = [
  { label: "SOC 2 Type II", sub: "Certified" },
  { label: "GDPR", sub: "Compliant" },
  { label: "CCPA", sub: "Compliant" },
  { label: "TLS 1.3", sub: "In Transit" },
  { label: "AES-256", sub: "At Rest" },
];

export default function SecurityPage() {
  return (
    <div className="relative min-h-screen bg-[#070814] text-[#f8fafc] overflow-hidden flex flex-col">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.07)_0,transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.05)_0,transparent_60%)] pointer-events-none" />

      <Header />

      <main className="flex-1 mx-auto w-full max-w-4xl px-6 md:px-8 py-16 md:py-24">
        {/* Page header */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/15 bg-indigo-950/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-indigo-300 mb-6">
            <FiShield className="h-3.5 w-3.5" />
            <span>Trust & Safety</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Security at LEXIS.AI
          </h1>
          <p className="text-slate-400 font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Your documents contain sensitive information. We treat security as a
            product feature, not an afterthought.
          </p>
        </div>

        {/* Compliance badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {certBadges.map((badge) => (
            <div
              key={badge.label}
              className="glass-panel rounded-xl px-4 py-3 flex flex-col items-center min-w-[90px]"
            >
              <FiCheckCircle className="h-5 w-5 text-emerald-400 mb-1.5" />
              <span className="text-xs font-bold text-white">{badge.label}</span>
              <span className="text-[10px] text-slate-500">{badge.sub}</span>
            </div>
          ))}
        </div>

        {/* Feature sections */}
        <div className="space-y-5">
          {features.map((feature, i) => (
            <div
              key={i}
              className="glass-panel glass-panel-hover rounded-2xl p-7 md:p-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="h-9 w-9 rounded-lg bg-indigo-950/50 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  {feature.icon}
                </div>
                <h2 className="text-lg font-bold text-white">{feature.title}</h2>
              </div>
              <ul className="space-y-3">
                {feature.content.map((para, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-slate-400 font-light text-sm leading-relaxed">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-indigo-500/60 shrink-0" />
                    {para}
                  </li>
                ))}
              </ul>
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
