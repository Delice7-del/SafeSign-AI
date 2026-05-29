# SafeSign — Full stack setup & testing guide

Run the **backend (Spring Boot + Python/Groq AI)** and **frontend (Next.js)** together.

---

## Prerequisites

| Tool | Version | Check |
|------|---------|--------|
| **Java** | 17+ | `java -version` |
| **Node.js** | 18+ | `node -version` |
| **Python** | 3.10+ | `python --version` |
| **Groq API key** | Free at [console.groq.com](https://console.groq.com/keys) | Required for real AI |

PostgreSQL is **optional**. Default profile uses **H2 in-memory** (no DB install).

---

## One-time setup (Windows)

```powershell
cd D:\SafeSign
.\scripts\setup.ps1
```

Then edit your Groq key:

**File:** `src\main\resources\application-local.properties`

```properties
groq.api.key=gsk_your_actual_key_here
```

---

## Start the app (two terminals)

**Terminal 1 — Backend**

```powershell
cd D:\SafeSign
.\scripts\start-backend.ps1
```

Wait until you see: `Started ClauseGuardApplication`

**Terminal 2 — Frontend**

```powershell
cd D:\SafeSign
.\scripts\start-frontend.ps1
```

Open: **http://localhost:3000**

---

## Verify integration

### 1. Backend health

Browser or PowerShell:

```
http://localhost:8080/api/health
```

Expected:

```json
{
  "status": "UP",
  "groqConfigured": true,
  "aiScriptFound": true,
  "pythonExecutable": "python"
}
```

If `groqConfigured` is `false`, add your key to `application-local.properties`.

### 2. Test AI (optional)

```powershell
cd D:\SafeSign
$env:GROQ_API_KEY = "gsk_your_key"
python ai_analysis.py
```

Paste JSON on stdin (Ctrl+Z then Enter on Windows), e.g.:

```json
{"contractText":"1. PAYMENT: Net-90. 2. LIABILITY: Unlimited.","userRole":"freelancer"}
```

You should get JSON with `summary`, `riskScore`, etc.

### 3. Frontend flow

1. **Analyze** — http://localhost:3000/analyze  
   - Pick Tenant / Freelancer / Employee  
   - Use default text or upload `.txt`  
   - Click **Analyze Sovereignty**  
   - Score dashboard should show **real AI** results (not only mock fallback)

2. **Vault** — http://localhost:3000/vault  
   - Saved analyses appear after analyze (auto-saved)

3. **History** — http://localhost:3000/history  
   - Same data as Vault

---

## Configuration reference

### Frontend (`frontend/.env.local`)

| Variable | Recommended dev value | Purpose |
|----------|----------------------|---------|
| `NEXT_PUBLIC_API_BASE` | *(empty)* | Use Next proxy → `http://localhost:8080` |
| `BACKEND_URL` | `http://localhost:8080` | Next.js rewrite target |

Direct backend URL (optional):

```env
NEXT_PUBLIC_API_BASE=http://localhost:8080
```

### Backend profiles

| Profile | Database | How to enable |
|---------|----------|----------------|
| **dev** (default) | H2 in-memory | No action needed |
| **prod** | PostgreSQL | `SPRING_PROFILES_ACTIVE=prod` |

**PostgreSQL example:**

```powershell
$env:SPRING_PROFILES_ACTIVE = "prod"
$env:DATABASE_URL = "jdbc:postgresql://localhost:5432/safesign"
$env:DATABASE_USERNAME = "postgres"
$env:DATABASE_PASSWORD = "your_password"
.\scripts\start-backend.ps1
```

Create database first:

```sql
CREATE DATABASE safesign;
```

### Groq API key (any of these)

1. `src\main\resources\application-local.properties` → `groq.api.key=...`
2. Environment variable: `$env:GROQ_API_KEY = "gsk_..."`
3. System environment variable (Windows Settings → Environment)

---

## Architecture (how it connects)

```
Browser (localhost:3000)
    → Next.js /api/* rewrite
    → Spring Boot (localhost:8080)
        → ai_analysis.py (stdin JSON)
            → clauseguard_ai.py → Groq API (Llama 3.3)
        → H2 or PostgreSQL (saved analyses)
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Analyze always shows “Fallback analysis” | Set Groq key; run `pip install -r requirements.txt`; check `/api/health` |
| `aiScriptFound: false` | Start backend from project root `D:\SafeSign` |
| Frontend “Backend offline” on Vault | Start backend; ensure `frontend/.env.local` exists |
| CORS errors | Use empty `NEXT_PUBLIC_API_BASE` (proxy) or keep backend CORS enabled |
| `mvn` not found | Use `.\mvnw.cmd spring-boot:run` from project root |
| Python `ModuleNotFoundError: groq` | `pip install -r requirements.txt` |
| PostgreSQL connection failed | Use default `dev` profile (H2) or fix `DATABASE_*` env vars |

---

## API endpoints (for manual testing)

```http
GET  http://localhost:8080/api/health
POST http://localhost:8080/api/analyze-contract
GET  http://localhost:8080/api/history
GET  http://localhost:8080/api/analyses/{id}
```

Example analyze body:

```json
{
  "contractText": "1. The client may terminate at any time without notice.",
  "userRole": "freelancer"
}
```

---

## Ready to test checklist

- [ ] `.\scripts\setup.ps1` completed  
- [ ] Groq key in `application-local.properties`  
- [ ] Backend running — `/api/health` shows `groqConfigured: true`  
- [ ] Frontend running — http://localhost:3000  
- [ ] Analyze returns score dashboard with saved id  
- [ ] Vault / History show the saved contract  
