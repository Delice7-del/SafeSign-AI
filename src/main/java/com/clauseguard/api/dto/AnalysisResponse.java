package com.clauseguard.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnalysisResponse {
    private String summary;
    private List<String> goodParts;
    private List<String> dangerousClauses;
    private List<String> roleBasedRisks;
    private int riskScore;
    private String riskLevel;
}
