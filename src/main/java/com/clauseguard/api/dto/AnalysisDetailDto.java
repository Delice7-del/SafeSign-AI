package com.clauseguard.api.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class AnalysisDetailDto {
    private Long id;
    private String contractTitle;
    private String contractText;
    private String role;
    private String riskLevel;
    private int riskScore;
    private String summary;
    private List<String> goodParts;
    private List<String> dangerousClauses;
    private List<String> roleBasedRisks;
    private LocalDateTime analyzedAt;
    private int flaggedClauses;
    private boolean pinned;
}
