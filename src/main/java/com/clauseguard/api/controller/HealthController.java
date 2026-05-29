package com.clauseguard.api.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {

    @Value("${groq.api.key:}")
    private String groqApiKey;

    @Value("${python.executable:python}")
    private String pythonExecutable;

    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", "UP");
        body.put("service", "clauseguard-api");

        boolean groqConfigured =
                groqApiKey != null
                        && !groqApiKey.isBlank()
                        && !"your-groq-key-here".equals(groqApiKey.trim());
        body.put("groqConfigured", groqConfigured);

        Path script = Path.of(System.getProperty("user.dir"), "ai_analysis.py");
        body.put("aiScriptFound", Files.exists(script));
        body.put("pythonExecutable", pythonExecutable);
        body.put("workingDirectory", System.getProperty("user.dir"));

        return body;
    }
}
