package com.clauseguard.api.service;

import com.clauseguard.api.dto.AnalysisRequest;
import com.clauseguard.api.dto.AnalysisResponse;
import com.clauseguard.api.model.AnalysisRecord;
import com.clauseguard.api.repository.AnalysisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalysisService {

    private final AIService aiService;
    private final AnalysisRepository repository;

    @Transactional
    public AnalysisResponse processContract(AnalysisRequest request) {
        // 1. Get analysis from AI
        AnalysisResponse response = aiService.analyzeContract(request.getContractText(), request.getUserRole());

        // 2. Map and Save to Database
        AnalysisRecord record = new AnalysisRecord();
        record.setContractText(request.getContractText());
        record.setUserRole(request.getUserRole());
        record.setSummary(response.getSummary());
        record.setGoodParts(response.getGoodParts());
        record.setDangerousClauses(response.getDangerousClauses());
        record.setRoleBasedRisks(response.getRoleBasedRisks());
        record.setRiskScore(response.getRiskScore());
        record.setRiskLevel(response.getRiskLevel());

        repository.save(record);

        return response;
    }

    public List<AnalysisRecord> getHistory() {
        return repository.findAllByOrderByCreatedAtDesc();
    }
}
