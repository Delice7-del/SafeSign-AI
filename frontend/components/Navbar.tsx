"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, FileSearch, History, Zap } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/analyze", label: "Analyze" },
  { href: "/history", label: "History" },
];

const mobileLinks = [
  { href: "/", label: "Home", icon: Zap },
  { href: "/analyze", label: "Analyze", icon: FileSearch },
  { href: "/history", label: "History", icon: History },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden md:flex fixed top-0 left-0 right-0 z-50 items-center justify-between px-8 py-4 backdrop-blur-xl bg-[#0B1120]/80 border-b border-white/5"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center glow-indigo">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg gradient-text">SafeSign AI</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === link.href
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {pathname === link.href && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/10 rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/analyze"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold hover:from-indigo-500 hover:to-blue-500 transition-all duration-200 glow-indigo"
        >
          <Zap className="w-4 h-4" />
          Analyze Contract
        </Link>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#111827]/90 border-t border-white/5 px-4 py-2">
        <div className="flex items-center justify-around">
          {mobileLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                  active ? "text-indigo-400" : "text-gray-500"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-indigo-400" : ""}`} />
                <span className="text-xs font-medium">{label}</span>
                {active && (
                  <motion.div
                    layoutId="mobile-nav-dot"
                    className="w-1 h-1 rounded-full bg-indigo-400"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Spacer for desktop */}
      <div className="hidden md:block h-16" />
    </>
  );
}
