import { AnalysisResponse } from "@/types";

export async function exportToPDF(
  result: AnalysisResponse,
  contractText: string,
  role: string
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const pageW = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentW = pageW - margin * 2;
  let y = 20;

  const addText = (
    text: string,
    size: number,
    bold = false,
    color: [number, number, number] = [255, 255, 255]
  ) => {
    doc.setFontSize(size);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, contentW);
    lines.forEach((line: string) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, margin, y);
      y += size * 0.5;
    });
    y += 4;
  };

  // Dark background
  doc.setFillColor(11, 17, 32);
  doc.rect(0, 0, pageW, doc.internal.pageSize.getHeight(), "F");

  // Header
  doc.setFillColor(99, 102, 241);
  doc.rect(0, 0, pageW, 18, "F");
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("SafeSign AI — Contract Analysis Report", margin, 12);
  y = 28;

  addText(`Role: ${role.toUpperCase()}`, 10, false, [156, 163, 175]);
  addText(`Generated: ${new Date().toLocaleString()}`, 10, false, [156, 163, 175]);
  y += 4;

  // Risk Score
  addText("RISK ASSESSMENT", 13, true, [99, 102, 241]);
  addText(`Risk Score: ${result.riskScore}/100`, 11, true, [255, 255, 255]);
  addText(`Risk Level: ${result.riskLevel}`, 11, false, [255, 255, 255]);
  y += 4;

  // Summary
  addText("SUMMARY", 13, true, [99, 102, 241]);
  addText(result.summary, 10, false, [209, 213, 219]);
  y += 4;

  // Good Parts
  addText("FAVORABLE CLAUSES", 13, true, [34, 197, 94]);
  result.goodParts.forEach((p) => addText(`• ${p}`, 10, false, [209, 213, 219]));
  y += 4;

  // Dangerous Clauses
  addText("DANGEROUS CLAUSES", 13, true, [239, 68, 68]);
  result.dangerousClauses.forEach((c) => addText(`• ${c}`, 10, false, [209, 213, 219]));
  y += 4;

  // Role Risks
  addText("ROLE-BASED RISKS", 13, true, [234, 179, 8]);
  result.roleBasedRisks.forEach((r) => addText(`• ${r}`, 10, false, [209, 213, 219]));
  y += 4;

  // Contract excerpt
  addText("CONTRACT TEXT (EXCERPT)", 13, true, [99, 102, 241]);
  addText(contractText.slice(0, 800) + (contractText.length > 800 ? "..." : ""), 9, false, [156, 163, 175]);

  doc.save("safesign-analysis-report.pdf");
}
