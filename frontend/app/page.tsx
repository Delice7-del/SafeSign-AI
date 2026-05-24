"use client";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  Shield,
  Zap,
  AlertTriangle,
  User,
  ArrowRight,
  Upload,
  Brain,
  FileCheck,
  GitFork,
  Mail,
  Info,
  ChevronRight,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const features = [
  {
    icon: Brain,
    title: "Simple Explanations",
    desc: "AI translates complex legal language into plain English anyone can understand.",
    color: "from-indigo-500 to-blue-500",
    glow: "glow-indigo",
  },
  {
    icon: AlertTriangle,
    title: "Risk Detection",
    desc: "Instantly flags dangerous clauses, hidden liabilities, and unfair terms.",
    color: "from-red-500 to-orange-500",
    glow: "glow-red",
  },
  {
    icon: User,
    title: "Role-Based Analysis",
    desc: "Personalized insights for tenants, freelancers, and employees.",
    color: "from-green-500 to-emerald-500",
    glow: "glow-green",
  },
];

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload Contract",
    desc: "Paste your contract text or upload a PDF file.",
  },
  {
    step: "02",
    icon: User,
    title: "Choose Your Role",
    desc: "Select whether you're a tenant, freelancer, or employee.",
  },
  {
    step: "03",
    icon: FileCheck,
    title: "Receive AI Analysis",
    desc: "Get a full risk report with highlighted clauses in seconds.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen animated-bg">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pulse-glow" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-8"
          >
            <Zap className="w-4 h-4" />
            AI-Powered Contract Intelligence
            <ChevronRight className="w-4 h-4" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
          >
            Understand Any Contract{" "}
            <span className="gradient-text">Before You Sign</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            AI-powered contract simplification and risk detection for ordinary
            people. Know exactly what you&apos;re agreeing to.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/analyze"
              className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-lg hover:from-indigo-500 hover:to-blue-500 transition-all duration-300 glow-indigo hover:scale-105"
            >
              <Zap className="w-5 h-5" />
              Analyze Contract
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/history"
              className="flex items-center gap-2 px-8 py-4 rounded-xl glass border border-white/10 text-gray-300 font-semibold text-lg hover:border-indigo-500/50 hover:text-white transition-all duration-300"
            >
              View History
            </Link>
          </motion.div>

          {/* Floating stat cards */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto"
          >
            {[
              { label: "Contracts Analyzed", value: "10K+" },
              { label: "Risk Detected", value: "98%" },
              { label: "Time Saved", value: "2hrs" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-4 text-center border border-white/5">
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything you need to{" "}
              <span className="gradient-text">stay protected</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              SafeSign AI gives you the power to understand any contract like a lawyer.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`glass rounded-2xl p-8 border border-white/5 hover:border-indigo-500/30 transition-all duration-300 ${f.glow}`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-6`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-[#111827]/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How it <span className="gradient-text">works</span>
            </h2>
            <p className="text-gray-400 text-lg">Three simple steps to full contract clarity.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-indigo-500/50 to-blue-500/50" />

            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl glass border border-indigo-500/30 flex items-center justify-center glow-indigo">
                    <s.icon className="w-8 h-8 text-indigo-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-xs font-bold">
                    {s.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-lg hover:from-indigo-500 hover:to-blue-500 transition-all duration-300 glow-indigo hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold gradient-text">SafeSign AI</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 SafeSign AI. Not legal advice.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <GitFork className="w-5 h-5" />
            </a>
            <a href="mailto:hello@safesign.ai" className="text-gray-500 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <Info className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
