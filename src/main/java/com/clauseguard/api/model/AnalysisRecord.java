package com.clauseguard.api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "contract_analyses")
@Data
public class AnalysisRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String contractText;

    @Column(nullable = false)
    private String userRole;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String summary;

    @ElementCollection
    @CollectionTable(name = "analysis_good_parts", joinColumns = @JoinColumn(name = "analysis_id"))
    @Column(name = "clause")
    private List<String> goodParts;

    @ElementCollection
    @CollectionTable(name = "analysis_dangerous_clauses", joinColumns = @JoinColumn(name = "analysis_id"))
    @Column(name = "clause")
    private List<String> dangerousClauses;

    @ElementCollection
    @CollectionTable(name = "analysis_role_risks", joinColumns = @JoinColumn(name = "analysis_id"))
    @Column(name = "risk")
    private List<String> roleBasedRisks;

    private int riskScore;
    private String riskLevel;

    private LocalDateTime createdAt;

    // Vault state: pinned by user
    private boolean pinned = false;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
