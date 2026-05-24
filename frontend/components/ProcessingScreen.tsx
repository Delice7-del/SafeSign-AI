"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Shield, FileSearch, Sparkles, BarChart3, CheckCircle } from "lucide-react";

const steps = [
  { icon: FileSearch, label: "Reading contract...", color: "text-blue-400" },
  { icon: AlertIcon, label: "Detecting risky clauses...", color: "text-red-400" },
  { icon: Brain, label: "Simplifying legal language...", color: "text-indigo-400" },
  { icon: Sparkles, label: "Generating AI report...", color: "text-purple-400" },
  { icon: BarChart3, label: "Calculating risk score...", color: "text-yellow-400" },
  { icon: Shield, label: "Finalizing analysis...", color: "text-green-400" },
];

function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    </svg>
  );
}

export default function ProcessingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          setCompletedSteps((c) => [...c, prev]);
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Central orb */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-indigo-600/30 blur-2xl"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-full border-2 border-blue-500/30 border-t-blue-400 flex items-center justify-center"
              >
                <Brain className="w-7 h-7 text-indigo-400" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-bold gradient-text mb-2">
            AI is analyzing your contract
          </h2>
          <p className="text-gray-500 text-sm">This may take up to 30 seconds</p>
        </motion.div>

        {/* Steps */}
        <div className="glass rounded-2xl p-6 border border-white/5 space-y-3">
          {steps.map((step, i) => {
            const isCompleted = completedSteps.includes(i);
            const isCurrent = currentStep === i;
            const isPending = i > currentStep;
            const Icon = step.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isPending ? 0.3 : 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                  isCompleted
                    ? "bg-green-500/20 border border-green-500/30"
                    : isCurrent
                    ? "bg-indigo-500/20 border border-indigo-500/50"
                    : "bg-white/5 border border-white/10"
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : isCurrent ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Icon className={`w-4 h-4 ${step.color}`} />
                    </motion.div>
                  ) : (
                    <Icon className="w-4 h-4 text-gray-600" />
                  )}
                </div>

                <span className={`text-sm font-medium transition-colors duration-300 ${
                  isCompleted ? "text-green-400" : isCurrent ? "text-white" : "text-gray-600"
                }`}>
                  {step.label}
                </span>

                {isCurrent && (
                  <motion.div
                    className="ml-auto flex gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {[0, 1, 2].map((dot) => (
                      <motion.div
                        key={dot}
                        className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: dot * 0.2 }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          <span>Processing</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
      </div>
    </div>
  );
}
