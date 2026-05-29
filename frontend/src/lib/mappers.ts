import type { AnalysisDetail, AnalysisHistoryItem } from "@/lib/api";
import type { Contract, Role } from "@/types/contract";

function toRole(role: string): Role {
  const r = role?.trim();
  if (r === "Tenant" || r === "Freelancer" || r === "Employee") return r;
  return "Other";
}

function roleRisksText(roleBasedRisks?: string[] | string): string {
  if (!roleBasedRisks) return "";
  if (Array.isArray(roleBasedRisks)) return roleBasedRisks.join(" ");
  return roleBasedRisks;
}

/** Map list item from GET /api/history */
export function historyItemToContract(item: AnalysisHistoryItem): Contract {
  return {
    id: String(item.id),
    name: item.contractTitle,
    role: toRole(item.role),
    uploadedAt:
      typeof item.analyzedAt === "string"
        ? item.analyzedAt
        : new Date(item.analyzedAt as unknown as string).toISOString(),
    fileType: "PDF",
    riskScore: item.riskScore,
    summary: item.summary,
    pinned: item.pinned,
    flaggedClauses: item.flaggedClauses,
  };
}

/** Map full detail from GET /api/analyses/{id} */
export function detailToContract(detail: AnalysisDetail): Contract {
  return {
    ...historyItemToContract(detail),
    dangerousClauses: detail.dangerousClauses ?? [],
    goodParts: detail.goodParts ?? [],
    roleBasedRisks: roleRisksText(detail.roleBasedRisks),
  };
}
