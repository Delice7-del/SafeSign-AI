export type UserRole = "tenant" | "freelancer" | "employee";

export interface AnalysisRequest {
  contractText: string;
  userRole: UserRole;
}

export interface AnalysisResponse {
  summary: string;
  goodParts: string[];
  dangerousClauses: string[];
  roleBasedRisks: string[];
  riskScore: number;
  riskLevel: string;
}

export interface AnalysisRecord {
  id: number;
  contractText: string;
  userRole: UserRole;
  summary: string;
  goodParts: string[];
  dangerousClauses: string[];
  roleBasedRisks: string[];
  riskScore: number;
  riskLevel: string;
  createdAt: string;
}

export type AppState = "idle" | "processing" | "results" | "error";
