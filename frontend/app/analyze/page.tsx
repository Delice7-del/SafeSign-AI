"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Upload,
  FileText,
  Home,
  Briefcase,
  UserCheck,
  Zap,
  X,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { UserRole } from "@/types";
import { useAnalysis } from "@/hooks/useAnalysis";
import ProcessingScreen from "@/components/ProcessingScreen";
import ResultsDashboard from "@/components/ResultsDashboard";

interface FormData {
  contractText: string;
}

const roles: { value: UserRole; label: string; icon: typeof Home; desc: string }[] = [
  { value: "tenant", label: "Tenant", icon: Home, desc: "Rental & lease agreements" },
  { value: "freelancer", label: "Freelancer", icon: Briefcase, desc: "Service & project contracts" },
  { value: "employee", label: "Employee", icon: UserCheck, desc: "Employment agreements" },
];

export default function AnalyzePage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const { state, result, error, analyze, reset } = useAnalysis();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const contractText = watch("contractText");

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type === "text/plain") {
        const reader = new FileReader();
        reader.onload = (ev) => {
          setValue("contractText", ev.target?.result as string);
          setFileName(file.name);
        };
        reader.readAsText(file);
      } else if (file) {
        setFileName(file.name + " (text extracted)");
        setValue("contractText", `[Content from: ${file.name}]\n\nPlease paste the contract text here for analysis.`);
      }
    },
    [setValue]
  );

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setValue("contractText", ev.target?.result as string || "");
    reader.readAsText(file);
  };

  const onSubmit = (data: FormData) => {
    if (!selectedRole) return;
    analyze({ contractText: data.contractText, userRole: selectedRole });
  };

  const handleReset = () => {
    reset();
    setSelectedRole(null);
    setFileName(null);
    setValue("contractText", "");
  };

  if (state === "processing") return <ProcessingScreen />;

  if (state === "results" && result) {
    return (
      <ResultsDashboard
        result={result}
        contractText={contractText}
        role={selectedRole!}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-extrabold gradient-text mb-2">
            Analyze Your Contract
          </h1>
          <p className="text-gray-400">
            Paste your contract text, choose your role, and let AI do the rest.
          </p>
        </motion.div>

        {/* Error State */}
        <AnimatePresence>
          {state === "error" && error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
              <button onClick={handleReset} className="ml-auto flex items-center gap-1 text-xs hover:text-white transition-colors">
                <RotateCcw className="w-3 h-3" /> Retry
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* LEFT — Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              {/* Upload / Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                className={`relative glass rounded-2xl border-2 border-dashed transition-all duration-300 ${
                  isDragging
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-white/10 hover:border-indigo-500/40"
                }`}
              >
                {/* File upload header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-400" />
                    <span className="font-semibold text-sm text-white">Contract Text</span>
                  </div>
                  <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-medium cursor-pointer hover:bg-indigo-600/30 transition-all">
                    <Upload className="w-3 h-3" />
                    Upload File
                    <input
                      type="file"
                      accept=".txt,.pdf"
                      className="hidden"
                      onChange={onFileInput}
                    />
                  </label>
                </div>

                {fileName && (
                  <div className="flex items-center gap-2 px-5 py-2 bg-indigo-500/10 border-b border-indigo-500/20">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs text-indigo-300 truncate">{fileName}</span>
                    <button
                      type="button"
                      onClick={() => { setFileName(null); setValue("contractText", ""); }}
                      className="ml-auto text-gray-500 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}

                <textarea
                  {...register("contractText", {
                    required: "Please enter or upload a contract",
                    minLength: { value: 50, message: "Contract text is too short" },
                  })}
                  placeholder={
                    isDragging
                      ? "Drop your file here..."
                      : "Paste your contract text here, or drag & drop a file above..."
                  }
                  className="w-full h-72 bg-transparent px-5 py-4 text-sm text-gray-300 placeholder-gray-600 resize-none focus:outline-none"
                />

                {errors.contractText && (
                  <p className="px-5 pb-3 text-xs text-red-400">{errors.contractText.message}</p>
                )}

                {contractText && (
                  <div className="px-5 pb-3 text-xs text-gray-600">
                    {contractText.length.toLocaleString()} characters
                  </div>
                )}
              </div>
            </motion.div>

            {/* RIGHT — Role + Submit */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {/* Role Selector */}
              <div className="glass rounded-2xl border border-white/5 p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-indigo-400" />
                  Select Your Role
                </h3>
                <div className="space-y-3">
                  {roles.map((r) => {
                    const isSelected = selectedRole === r.value;
                    return (
                      <motion.button
                        key={r.value}
                        type="button"
                        onClick={() => setSelectedRole(r.value)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ${
                          isSelected
                            ? "bg-indigo-600/20 border-indigo-500/60 glow-indigo"
                            : "bg-white/3 border-white/8 hover:border-white/20"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isSelected ? "bg-indigo-600/40" : "bg-white/5"
                        }`}>
                          <r.icon className={`w-5 h-5 ${isSelected ? "text-indigo-300" : "text-gray-500"}`} />
                        </div>
                        <div>
                          <div className={`font-semibold text-sm ${isSelected ? "text-white" : "text-gray-300"}`}>
                            {r.label}
                          </div>
                          <div className="text-xs text-gray-500">{r.desc}</div>
                        </div>
                        {isSelected && (
                          <motion.div
                            layoutId="role-check"
                            className="ml-auto w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center"
                          >
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
                {!selectedRole && (
                  <p className="mt-3 text-xs text-gray-600">Select a role to personalize your analysis</p>
                )}
              </div>

              {/* Analyze Button */}
              <motion.button
                type="submit"
                disabled={!selectedRole || !contractText}
                whileHover={{ scale: selectedRole && contractText ? 1.02 : 1 }}
                whileTap={{ scale: selectedRole && contractText ? 0.98 : 1 }}
                className={`w-full flex items-center justify-center gap-3 py-5 rounded-xl font-bold text-lg transition-all duration-300 ${
                  selectedRole && contractText
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white glow-indigo hover:from-indigo-500 hover:to-blue-500"
                    : "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"
                }`}
              >
                <Zap className={`w-5 h-5 ${selectedRole && contractText ? "text-white" : "text-gray-600"}`} />
                Analyze with AI
              </motion.button>

              {/* Info card */}
              <div className="glass rounded-xl border border-white/5 p-4 text-xs text-gray-500 leading-relaxed">
                <p className="font-medium text-gray-400 mb-1">What you&apos;ll get:</p>
                <ul className="space-y-1">
                  <li>• Plain-English contract summary</li>
                  <li>• Highlighted dangerous clauses</li>
                  <li>• Role-specific risk warnings</li>
                  <li>• Risk score from 0–100</li>
                  <li>• Downloadable PDF report</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}
