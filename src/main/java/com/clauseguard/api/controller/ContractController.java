package com.clauseguard.api.controller;

import com.clauseguard.api.dto.AnalysisRequest;
import com.clauseguard.api.dto.AnalysisResponse;
import com.clauseguard.api.model.AnalysisRecord;
import com.clauseguard.api.service.AnalysisService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
    public ResponseEntity<List<AnalysisRecord>> getHistory() {
        return ResponseEntity.ok(analysisService.getHistory());
    }
}
