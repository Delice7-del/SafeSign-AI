package com.clauseguard.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class AnalysisRequest {
    @NotBlank
    private String contractText;
    
    @NotBlank
    @Pattern(regexp = "tenant|freelancer|employee", message = "Role must be tenant, freelancer, or employee")
    private String userRole;
}
