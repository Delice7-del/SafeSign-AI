package com.clauseguard.api.dto;

import lombok.Data;
import java.util.List;

@Data
public class AnalysisSaveRequest {
    private String contractText;
    private String userRole;
    private String summary;
    private List<String> goodParts;
    private List<String> dangerousClauses;
    private List<String> roleBasedRisks;
    private int riskScore;
    private String riskLevel;
}
