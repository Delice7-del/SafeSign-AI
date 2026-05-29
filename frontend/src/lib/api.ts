/**
 * Shared API client for LEXIS.AI / SafeSign backend integration.
 * Set NEXT_PUBLIC_API_BASE=http://localhost:8080 in .env.local
 */

/**
 * Empty string = use same-origin /api (Next.js rewrite → backend).
 * Set NEXT_PUBLIC_API_BASE=http://localhost:8080 to call backend directly.
 */
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, "") ?? "";

export type RiskBand = "HIGH" | "MEDIUM" | "LOW";

export interface AnalysisResponse {
  id?: number;
  summary: string;
  goodParts: string[];
  dangerousClauses: string[];
  roleBasedRisks: string[];
  riskScore: number;
  riskLevel: string;
}

export interface AnalysisHistoryItem {
  id: number;
  contractTitle: string;
  role: string;
  riskLevel: string;
  riskScore: number;
  summary: string;
  analyzedAt: string;
  flaggedClauses: number;
  pinned: boolean;
}

export interface AnalysisDetail extends AnalysisHistoryItem {
  contractText: string;
  goodParts: string[];
  dangerousClauses: string[];
  roleBasedRisks: string[];
}

export interface AnalyzeContractPayload {
  contractText: string;
  userRole: string;
}

export interface SaveAnalysisPayload {
  contractText: string;
  userRole: string;
  summary: string;
  goodParts: string[];
  dangerousClauses: string[];
  roleBasedRisks: string[];
  riskScore: number;
  riskLevel: string;
}

export function normalizeRiskBand(riskLevel: string, riskScore?: number): RiskBand {
  const l = (riskLevel || "").toLowerCase();
  if (l.includes("high")) return "HIGH";
  if (l.includes("low") || l.includes("safe")) return "LOW";
  if (l.includes("medium")) return "MEDIUM";
  if (riskScore !== undefined) {
    if (riskScore >= 70) return "HIGH";
    if (riskScore <= 30) return "LOW";
  }
  return "MEDIUM";
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `API ${res.status}: ${path}`);
  }
  if (res.status === 204) {
    return undefined as T;
  }
  return res.json() as Promise<T>;
}

export async function analyzeContract(
  payload: AnalyzeContractPayload
): Promise<AnalysisResponse> {
  return apiFetch<AnalysisResponse>("/api/analyze-contract", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchHistory(): Promise<AnalysisHistoryItem[]> {
  return apiFetch<AnalysisHistoryItem[]>("/api/history");
}

export async function fetchAnalysisDetail(id: number): Promise<AnalysisDetail> {
  return apiFetch<AnalysisDetail>(`/api/analyses/${id}`);
}

export async function saveAnalysis(
  payload: SaveAnalysisPayload
): Promise<AnalysisHistoryItem> {
  return apiFetch<AnalysisHistoryItem>("/api/analyses", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function deleteAnalysis(id: number): Promise<void> {
  await apiFetch<void>(`/api/analyses/${id}`, { method: "DELETE" });
}

export async function updateAnalysisPin(
  id: number,
  pinned: boolean
): Promise<AnalysisHistoryItem> {
  return apiFetch<AnalysisHistoryItem>(`/api/analyses/${id}/pin`, {
    method: "PATCH",
    body: JSON.stringify({ pinned }),
  });
}

/** Client-side text report export (no PDF backend yet) */
export function downloadAnalysisReport(
  title: string,
  detail: Pick<
    AnalysisDetail,
    | "summary"
    | "riskScore"
    | "riskLevel"
    | "dangerousClauses"
    | "goodParts"
    | "roleBasedRisks"
    | "role"
  >
): void {
  const roleRisks = Array.isArray(detail.roleBasedRisks)
    ? detail.roleBasedRisks.join("\n")
    : String(detail.roleBasedRisks ?? "");

  const body = [
    `LEXIS.AI — Contract Analysis Report`,
    `Document: ${title}`,
    `Role: ${detail.role}`,
    `Risk Score: ${detail.riskScore}/100 (${detail.riskLevel})`,
    ``,
    `SUMMARY`,
    detail.summary,
    ``,
    `DANGEROUS CLAUSES`,
    ...(detail.dangerousClauses?.length
      ? detail.dangerousClauses.map((c, i) => `${i + 1}. ${c}`)
      : ["None flagged"]),
    ``,
    `PROTECTIVE CLAUSES`,
    ...(detail.goodParts?.length
      ? detail.goodParts.map((c, i) => `${i + 1}. ${c}`)
      : ["None highlighted"]),
    ``,
    `ROLE-BASED RISKS`,
    roleRisks || "N/A",
  ].join("\n");

  const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.replace(/\s+/g, "_")}_AI_Report.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
