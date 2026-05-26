import React from "react";
import Link from "next/link";

const footerLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "API", href: "/api-docs" },
  { label: "Security", href: "/security" },
];

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-slate-900/60 bg-[#060711] py-10 mt-auto">
      <div className="mx-auto max-w-7xl px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center group cursor-pointer">
          <div className="flex items-center space-x-0.5">
            <span className="h-4 w-0.5 bg-indigo-500 rounded-sm transform -rotate-12 group-hover:bg-indigo-400 transition-colors"></span>
            <span className="h-5 w-1 bg-indigo-400 rounded-sm transform -rotate-12 group-hover:bg-indigo-300 transition-colors"></span>
          </div>
          <span className="ml-2 text-base font-bold tracking-wider text-white group-hover:text-slate-200 transition-colors">
            LEXIS<span className="text-indigo-400 group-hover:text-indigo-300 transition-colors">.AI</span>
          </span>
        </Link>

        {/* Copyright */}
        <p className="text-xs text-slate-500 tracking-wide font-light text-center md:text-left">
          &copy; 2026 LEXIS.AI. Digital Sovereignty Guaranteed.
        </p>

        {/* Links */}
        <ul className="flex items-center space-x-6">
          {footerLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-xs text-slate-500 hover:text-indigo-400 font-light transition-colors cursor-pointer"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
