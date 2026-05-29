# Start Spring Boot API (port 8080)
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

Write-Host "Starting SafeSign backend on http://localhost:8080 ..." -ForegroundColor Cyan
Write-Host "Profile: dev (H2 in-memory DB) — use SPRING_PROFILES_ACTIVE=prod for PostgreSQL" -ForegroundColor DarkGray

if (Test-Path ".\mvnw.cmd") {
    & .\mvnw.cmd spring-boot:run
} else {
    mvn spring-boot:run
}
