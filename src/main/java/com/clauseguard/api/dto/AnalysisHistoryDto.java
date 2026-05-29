package com.clauseguard.api.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class AnalysisHistoryDto {
    private Long id;
    private String contractTitle;
    private String role;
    private String riskLevel;
    private int riskScore;
    private String summary;
    private LocalDateTime analyzedAt;
    private int flaggedClauses;
    private boolean pinned;
}
