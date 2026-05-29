# SafeSign one-time setup (Windows PowerShell)
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

Write-Host "=== SafeSign Setup ===" -ForegroundColor Cyan

# 1. Python AI dependencies
Write-Host "`n[1/4] Installing Python packages (groq)..." -ForegroundColor Yellow
python --version
pip install -r requirements.txt

# 2. Groq API key file
$localProps = "src\main\resources\application-local.properties"
$example = "src\main\resources\application-local.properties.example"
if (-not (Test-Path $localProps)) {
    Copy-Item $example $localProps
    Write-Host "`n[2/4] Created $localProps — EDIT and add your Groq API key!" -ForegroundColor Magenta
} else {
    Write-Host "`n[2/4] $localProps already exists." -ForegroundColor Green
}

# 3. Frontend env
$feEnv = "frontend\.env.local"
$feExample = "frontend\.env.local.example"
if (-not (Test-Path $feEnv)) {
    Copy-Item $feExample $feEnv
    Write-Host "[3/4] Created $feEnv" -ForegroundColor Green
} else {
    Write-Host "[3/4] $feEnv already exists." -ForegroundColor Green
}

# 4. Frontend npm
Write-Host "`n[4/4] Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location frontend
npm install
Set-Location $Root

Write-Host "`n=== Setup complete ===" -ForegroundColor Cyan
Write-Host "Next steps:"
Write-Host "  1. Edit src\main\resources\application-local.properties → set groq.api.key"
Write-Host "  2. Run: .\scripts\start-backend.ps1"
Write-Host "  3. Run: .\scripts\start-frontend.ps1"
Write-Host "  4. Open http://localhost:3000/analyze"
