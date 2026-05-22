package com.clauseguard.api.service;

import com.clauseguard.api.dto.AnalysisResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.*;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
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
        try {
            // Resolve the script path relative to the JAR/project root robustly
            String scriptPath = resolveScriptPath("ai_analysis.py");

            // Pass contract text and role via stdin as JSON to avoid CLI arg issues
            ProcessBuilder pb = new ProcessBuilder(pythonExecutable, scriptPath);
            pb.environment().put("GROQ_API_KEY", apiKey);
            pb.redirectErrorStream(false); // keep stdout and stderr separate

            Process process = pb.start();

            // Write input as JSON to stdin
            String inputJson = objectMapper.writeValueAsString(
                    java.util.Map.of("contractText", text, "userRole", role)
            );
            try (OutputStreamWriter writer = new OutputStreamWriter(
                    process.getOutputStream(), StandardCharsets.UTF_8)) {
                writer.write(inputJson);
            }

            // Read stdout (JSON result)
            StringBuilder output = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line);
                }
            }

            // Read stderr for proper error visibility
            StringBuilder errorOutput = new StringBuilder();
            try (BufferedReader errReader = new BufferedReader(
                    new InputStreamReader(process.getErrorStream(), StandardCharsets.UTF_8))) {
                String line;
                while ((line = errReader.readLine()) != null) {
                    errorOutput.append(line).append("\n");
                }
            }

            // Wait with a 60-second timeout to prevent hanging threads
            boolean finished = process.waitFor(60, TimeUnit.SECONDS);
            if (!finished) {
                process.destroyForcibly();
                System.err.println("Python script timed out after 60 seconds.");
                return getMockAnalysis(role);
            }

            int exitCode = process.exitValue();
            if (exitCode == 0 && output.length() > 0) {
                return objectMapper.readValue(output.toString(), AnalysisResponse.class);
            } else {
                System.err.println("Python script exited with code: " + exitCode);
                if (errorOutput.length() > 0) {
                    System.err.println("Python stderr:\n" + errorOutput);
                }
            }
        } catch (Exception e) {
            System.err.println("Error calling Python AI script: " + e.getMessage());
            e.printStackTrace();
        }

        return getMockAnalysis(role);
    }

    /**
     * Resolves the Python script path relative to the running JAR or project root.
     * Falls back to the current working directory if resolution fails.
     */
    private String resolveScriptPath(String scriptName) {
        try {
            // Get the location of the running JAR/class
            Path jarPath = Paths.get(
                    AIService.class.getProtectionDomain().getCodeSource().getLocation().toURI()
            );
            // Go up from target/classes or the JAR to the project root
            Path projectRoot = jarPath.getParent();
            if (projectRoot.endsWith("classes")) {
                projectRoot = projectRoot.getParent().getParent(); // target/classes -> project root
            } else if (projectRoot.toString().contains("target")) {
                projectRoot = projectRoot.getParent(); // target -> project root
            }
            Path scriptPath = projectRoot.resolve(scriptName);
            if (scriptPath.toFile().exists()) {
                return scriptPath.toAbsolutePath().toString();
            }
        } catch (URISyntaxException e) {
            System.err.println("Could not resolve script path via JAR location: " + e.getMessage());
        }
        // Fallback: use current working directory
        return Paths.get(System.getProperty("user.dir"), scriptName).toAbsolutePath().toString();
    }

    private AnalysisResponse getMockAnalysis(String role) {
        return AnalysisResponse.builder()
                .summary("Mock analysis: AI service is unavailable. Please check your Gemini API key and Python setup.")
                .goodParts(List.of("The contract is structured clearly.", "Basic terms are defined."))
                .dangerousClauses(List.of("Potential liability risks found in sections 4 and 5."))
                .roleBasedRisks(List.of("As a " + role + ", you should verify the termination notice period."))
                .riskScore(40)
                .riskLevel("Medium Risk")
                .build();
    }
}
