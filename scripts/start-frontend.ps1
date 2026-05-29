# Start Next.js frontend (port 3000)
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location "$Root\frontend"

if (-not (Test-Path ".env.local")) {
    Copy-Item ".env.local.example" ".env.local"
    Write-Host "Created .env.local from example" -ForegroundColor Yellow
}

Write-Host "Starting LEXIS.AI frontend on http://localhost:3000 ..." -ForegroundColor Cyan
npm run dev
