package com.clauseguard.api.mapper;

import com.clauseguard.api.dto.AnalysisDetailDto;
import com.clauseguard.api.dto.AnalysisHistoryDto;
import com.clauseguard.api.model.AnalysisRecord;

public final class AnalysisMapper {

    private AnalysisMapper() {}

    public static String deriveTitle(AnalysisRecord saved) {
        if (saved.getContractText() != null && !saved.getContractText().isEmpty()) {
            String title = saved.getContractText().split("\\n")[0].trim();
            if (title.length() > 60) {
                return title.substring(0, 57) + "...";
            }
            return title;
        }
        return "Uploaded Document";
    }

    public static String formatRole(String userRole) {
        if (userRole == null || userRole.isEmpty()) {
            return "Other";
        }
        String lower = userRole.toLowerCase();
        if (lower.equals("tenant")) return "Tenant";
        if (lower.equals("freelancer")) return "Freelancer";
        if (lower.equals("employee")) return "Employee";
        return userRole.substring(0, 1).toUpperCase() + userRole.substring(1).toLowerCase();
    }

    public static AnalysisHistoryDto toHistoryDto(AnalysisRecord saved) {
        AnalysisHistoryDto dto = new AnalysisHistoryDto();
        dto.setId(saved.getId());
        dto.setContractTitle(deriveTitle(saved));
        dto.setRole(formatRole(saved.getUserRole()));
        dto.setRiskLevel(saved.getRiskLevel());
        dto.setRiskScore(saved.getRiskScore());
        dto.setSummary(saved.getSummary());
        dto.setAnalyzedAt(saved.getCreatedAt());
        dto.setFlaggedClauses(
                saved.getDangerousClauses() != null ? saved.getDangerousClauses().size() : 0);
        dto.setPinned(saved.isPinned());
        return dto;
    }

    public static AnalysisDetailDto toDetailDto(AnalysisRecord saved) {
        AnalysisDetailDto dto = new AnalysisDetailDto();
        dto.setId(saved.getId());
        dto.setContractTitle(deriveTitle(saved));
        dto.setContractText(saved.getContractText());
        dto.setRole(formatRole(saved.getUserRole()));
        dto.setRiskLevel(saved.getRiskLevel());
        dto.setRiskScore(saved.getRiskScore());
        dto.setSummary(saved.getSummary());
        dto.setGoodParts(saved.getGoodParts());
        dto.setDangerousClauses(saved.getDangerousClauses());
        dto.setRoleBasedRisks(saved.getRoleBasedRisks());
        dto.setAnalyzedAt(saved.getCreatedAt());
        dto.setFlaggedClauses(
                saved.getDangerousClauses() != null ? saved.getDangerousClauses().size() : 0);
        dto.setPinned(saved.isPinned());
        return dto;
    }
}
