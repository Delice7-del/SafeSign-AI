import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-slate-900/60 bg-[#060711] py-10 mt-auto">
      <div className="mx-auto max-w-7xl px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-0.5">
            <span className="h-4 w-0.5 bg-indigo-500 rounded-sm transform -rotate-12"></span>
            <span className="h-5 w-1 bg-indigo-400 rounded-sm transform -rotate-12"></span>
          </div>
          <span className="ml-2 text-base font-bold tracking-wider text-white">
            LEXIS<span className="text-indigo-400">.AI</span>
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-500 tracking-wide font-light text-center md:text-left">
          &copy; 2024 LEXIS.AI. Digital Sovereignty Guaranteed.
        </p>

        {/* Links */}
        <ul className="flex items-center space-x-6">
          {["Privacy", "Terms", "API", "Security"].map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-xs text-slate-500 hover:text-slate-300 font-light transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
