package com.clauseguard.api.controller;

import com.clauseguard.api.dto.*;
import com.clauseguard.api.mapper.AnalysisMapper;
import com.clauseguard.api.model.AnalysisRecord;
import com.clauseguard.api.service.AnalysisService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ContractController {

    private final AnalysisService analysisService;

    @PostMapping("/analyze-contract")
    public ResponseEntity<AnalysisResponse> analyzeContract(@Valid @RequestBody AnalysisRequest request) {
        return ResponseEntity.ok(analysisService.processContract(request));
    }

    @GetMapping("/history")
    public ResponseEntity<List<AnalysisHistoryDto>> getHistory() {
        List<AnalysisHistoryDto> dtos = analysisService.getHistory().stream()
                .map(AnalysisMapper::toHistoryDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/analyses")
    public ResponseEntity<AnalysisHistoryDto> saveAnalysis(@RequestBody AnalysisSaveRequest req) {
        AnalysisRecord rec = new AnalysisRecord();
        rec.setContractText(req.getContractText());
        rec.setUserRole(req.getUserRole());
        rec.setSummary(req.getSummary());
        rec.setGoodParts(req.getGoodParts());
        rec.setDangerousClauses(req.getDangerousClauses());
        rec.setRoleBasedRisks(req.getRoleBasedRisks());
        rec.setRiskScore(req.getRiskScore());
        rec.setRiskLevel(req.getRiskLevel());

        AnalysisRecord saved = analysisService.saveRecord(rec);
        return ResponseEntity.ok(AnalysisMapper.toHistoryDto(saved));
    }

    @GetMapping("/analyses/{id}")
    public ResponseEntity<AnalysisDetailDto> getAnalysis(@PathVariable Long id) {
        AnalysisRecord saved = analysisService.getRecord(id);
        if (saved == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(AnalysisMapper.toDetailDto(saved));
    }

    @PatchMapping("/analyses/{id}/pin")
    public ResponseEntity<AnalysisHistoryDto> updatePin(
            @PathVariable Long id,
            @RequestBody PinUpdateRequest request) {
        AnalysisRecord saved = analysisService.updatePinned(id, request.isPinned());
        if (saved == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(AnalysisMapper.toHistoryDto(saved));
    }

    @DeleteMapping("/analyses/{id}")
    public ResponseEntity<Void> deleteAnalysis(@PathVariable Long id) {
        analysisService.deleteRecord(id);
        return ResponseEntity.noContent().build();
    }
}
