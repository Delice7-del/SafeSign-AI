export type Role = "Tenant" | "Freelancer" | "Employee" | "Other";

export interface Contract {
  id: string;
  name: string;
  role: Role;
  uploadedAt: string; // ISO
  fileType: string;
  riskScore: number; // 0-100
  summary: string;
  pinned?: boolean;
  flaggedClauses?: number;
  dangerousClauses?: string[];
  goodParts?: string[];
  roleBasedRisks?: string | string[];
}
