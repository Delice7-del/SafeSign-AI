"use client";
import { useState } from "react";
import { analyzeContract } from "@/services/api";
import { AnalysisRequest, AnalysisResponse, AppState } from "@/types";

export function useAnalysis() {
  const [state, setState] = useState<AppState>("idle");
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = async (payload: AnalysisRequest) => {
    setState("processing");
    setError(null);
    setResult(null);
    try {
      const data = await analyzeContract(payload);
      setResult(data);
      setState("results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
      setState("error");
    }
  };

  const reset = () => {
    setState("idle");
    setResult(null);
    setError(null);
  };

  return { state, result, error, analyze, reset };
}
