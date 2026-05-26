"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  ctaLabel?: string;
  ctaIcon?: React.ReactNode;
  onCtaClick?: () => void;
  showAvatar?: boolean;
}

export default function Header({
  ctaLabel,
  ctaIcon,
  onCtaClick,
  showAvatar = false,
}: HeaderProps = {}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-350 ${scrolled ? "glass-panel border-b border-white/5 bg-[#070814]/85 backdrop-blur-md shadow-lg shadow-indigo-950/30" : "bg-transparent border-transparent"}`}>
      <div className={`mx-auto max-w-7xl px-6 md:px-8 flex items-center justify-between transition-all duration-350 ${scrolled ? "h-16" : "h-20"}`}>
        <Link href="/" className="flex items-center group">
          {/* Double angled logo shape */}
          <div className="flex items-center space-x-0.5">
            <span className="h-5 w-1 bg-indigo-500 rounded-sm transform -rotate-12 group-hover:bg-indigo-400 transition-colors"></span>
            <span className="h-6 w-1.5 bg-indigo-400 rounded-sm transform -rotate-12 group-hover:bg-indigo-300 transition-colors"></span>
          </div>
          <span className="ml-2.5 text-xl font-bold tracking-wider text-white">
            LEXIS<span className="text-indigo-400">.AI</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { name: "Home", href: "/" },
            { name: "Analyze", href: "/analyze" },
            { name: "History", href: "/history" },
            { name: "Vault", href: "/vault" },
          ].map((item) => {
            const isActive =
              pathname === item.href ||
              (item.name === "Analyze" && pathname === "/analyze") ||
              (item.name === "History" && pathname === "/history");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative py-1 text-sm font-medium tracking-wide transition-colors ${
                  isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA + optional profile avatar */}
        <div className="flex items-center gap-3">
          {ctaLabel && onCtaClick ? (
            <button
              onClick={onCtaClick}
              className="inline-flex items-center gap-2 rounded-full bg-brand-lavender hover:bg-white text-[#0a0f29] font-semibold text-sm px-5 py-2.5 shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 transform hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              {ctaIcon}
              {ctaLabel}
            </button>
          ) : (
            <Link href="/analyze">
              <button className="rounded-full bg-[#cbd5e1] hover:bg-white text-[#0a0f29] font-semibold text-sm px-6 py-2.5 shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 transform hover:scale-[1.02] active:scale-[0.98] transition-all">
                Analyze
              </button>
            </Link>
          )}
          {showAvatar && (
            <div
              className="h-9 w-9 rounded-full shrink-0 overflow-hidden border border-white/10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.5) 0%, rgba(167,139,250,0.4) 100%)",
              }}
              aria-hidden
            />
          )}
        </div>
      </div>
    </header>
  );
}
