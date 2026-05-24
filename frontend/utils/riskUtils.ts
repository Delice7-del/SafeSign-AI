export function getRiskColor(riskLevel: string): string {
  const level = riskLevel?.toLowerCase();
  if (level?.includes("safe")) return "text-green-400";
  if (level?.includes("medium")) return "text-yellow-400";
  if (level?.includes("high")) return "text-red-400";
  return "text-gray-400";
}

export function getRiskBgColor(riskLevel: string): string {
  const level = riskLevel?.toLowerCase();
  if (level?.includes("safe")) return "bg-green-500/20 border-green-500/30";
  if (level?.includes("medium")) return "bg-yellow-500/20 border-yellow-500/30";
  if (level?.includes("high")) return "bg-red-500/20 border-red-500/30";
  return "bg-gray-500/20 border-gray-500/30";
}

export function getRiskGaugeColor(score: number): string {
  if (score <= 33) return "#22c55e";
  if (score <= 66) return "#eab308";
  return "#ef4444";
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const DANGEROUS_KEYWORDS = [
  "liable",
  "liability",
  "indemnify",
  "waive",
  "waiver",
  "non-compete",
  "penalty",
  "forfeit",
  "terminate",
  "termination",
  "without notice",
  "at any time",
  "sole discretion",
  "irrevocable",
  "unlimited",
  "all repairs",
  "all costs",
];

export function highlightDangerousText(text: string): string {
  let result = text;
  DANGEROUS_KEYWORDS.forEach((keyword) => {
    const regex = new RegExp(`(${keyword})`, "gi");
    result = result.replace(
      regex,
      `<mark class="bg-red-500/30 text-red-300 rounded px-0.5 cursor-help" title="Potentially risky clause">$1</mark>`
    );
  });
  return result;
}
