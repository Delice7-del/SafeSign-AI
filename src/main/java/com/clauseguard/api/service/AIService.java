package com.clauseguard.api.service;

import com.clauseguard.api.dto.AnalysisResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class AIService {

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${python.executable:python}")
    private String pythonExecutable;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public AnalysisResponse analyzeContract(String text, String role) {
        Path scriptPath = resolveScriptPath("ai_analysis.py");
        if (!Files.exists(scriptPath)) {
            System.err.println("AI script not found at: " + scriptPath.toAbsolutePath());
            return getMockAnalysis(role, "ai_analysis.py not found in project root.");
        }

        try {
            ProcessBuilder pb = new ProcessBuilder(
                    pythonExecutable,
                    scriptPath.toAbsolutePath().toString()
            );
            pb.directory(scriptPath.getParent().toFile());
            pb.environment().put("GROQ_API_KEY", apiKey != null ? apiKey : "");
            pb.redirectErrorStream(false);

            Process process = pb.start();

            String inputJson = objectMapper.writeValueAsString(
                    java.util.Map.of("contractText", text, "userRole", role)
            );
            try (OutputStreamWriter writer = new OutputStreamWriter(
                    process.getOutputStream(), StandardCharsets.UTF_8)) {
                writer.write(inputJson);
            }

            StringBuilder output = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line);
                }
            }

            StringBuilder errorOutput = new StringBuilder();
            try (BufferedReader errReader = new BufferedReader(
                    new InputStreamReader(process.getErrorStream(), StandardCharsets.UTF_8))) {
                String line;
                while ((line = errReader.readLine()) != null) {
                    errorOutput.append(line).append("\n");
                }
            }

            boolean finished = process.waitFor(90, TimeUnit.SECONDS);
            if (!finished) {
                process.destroyForcibly();
                return getMockAnalysis(role, "Python AI script timed out after 90 seconds.");
            }

            if (output.length() > 0) {
                AnalysisResponse parsed = parsePythonOutput(output.toString(), role);
                if (parsed != null) {
                    return parsed;
                }
            }

            System.err.println("Python exit code: " + process.exitValue());
            if (errorOutput.length() > 0) {
                System.err.println("Python stderr:\n" + errorOutput);
            }
        } catch (Exception e) {
            System.err.println("Error calling Python AI script: " + e.getMessage());
            e.printStackTrace();
        }

        return getMockAnalysis(role, "AI bridge unavailable. Install Python deps: pip install -r requirements.txt");
    }

    private AnalysisResponse parsePythonOutput(String json, String role) {
        try {
            JsonNode root = objectMapper.readTree(json);
            if (root.hasNonNull("error")) {
                System.err.println("Python AI error: " + root.get("error").asText());
                return getMockAnalysis(role, root.get("error").asText());
            }
            return objectMapper.treeToValue(root, AnalysisResponse.class);
        } catch (Exception e) {
            System.err.println("Failed to parse Python JSON: " + e.getMessage());
            return null;
        }
    }

    private Path resolveScriptPath(String scriptName) {
        Path cwd = Paths.get(System.getProperty("user.dir"));
        Path inCwd = cwd.resolve(scriptName);
        if (Files.exists(inCwd)) {
            return inCwd;
        }

        try {
            Path codeLocation = Paths.get(
                    AIService.class.getProtectionDomain().getCodeSource().getLocation().toURI()
            );
            Path projectRoot = codeLocation.getParent();
            if (projectRoot != null && projectRoot.endsWith("classes")) {
                projectRoot = projectRoot.getParent().getParent();
            } else if (projectRoot != null && projectRoot.toString().contains("target")) {
                projectRoot = projectRoot.getParent();
            }
            if (projectRoot != null) {
                Path candidate = projectRoot.resolve(scriptName);
                if (Files.exists(candidate)) {
                    return candidate;
                }
            }
        } catch (Exception e) {
            System.err.println("Could not resolve script via classpath: " + e.getMessage());
        }

        return inCwd;
    }

    private AnalysisResponse getMockAnalysis(String role, String reason) {
        return AnalysisResponse.builder()
                .summary("Fallback analysis (" + reason + "). Configure GROQ_API_KEY and Python (pip install -r requirements.txt) for live AI.")
                .goodParts(List.of("The contract is structured clearly.", "Basic terms are defined."))
                .dangerousClauses(List.of("Potential liability risks found in sections 4 and 5."))
                .roleBasedRisks(List.of("As a " + role + ", verify termination notice and payment terms."))
                .riskScore(40)
                .riskLevel("Medium Risk")
                .build();
    }
}
