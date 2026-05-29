# SafeSign / LEXIS.AI — Frontend ↔ Backend Integration

## Quick start

See **[SETUP.md](./SETUP.md)** for full configuration.

1. Run `.\scripts\setup.ps1` once
2. Add Groq key to `src/main/resources/application-local.properties`
3. `.\scripts\start-backend.ps1` (port **8080**)
4. `.\scripts\start-frontend.ps1` (port **3000**)

## API surface (backend)

| Method | Path | Used by |
|--------|------|---------|
| POST | `/api/analyze-contract` | Analyze page |
| GET | `/api/history` | History, Vault |
| GET | `/api/analyses/{id}` | Analyze (reopen), Vault modal |
| POST | `/api/analyses` | Analyze (manual save if needed) |
| PATCH | `/api/analyses/{id}/pin` | Vault |
| DELETE | `/api/analyses/{id}` | History, Vault |

Shared client: `frontend/src/lib/api.ts`

## Page ↔ backend matrix

| Page | Backend | Status |
|------|---------|--------|
| `/` (Home) | — | Marketing only |
| `/analyze` | analyze-contract, analyses/{id}, analyses | Integrated |
| `/history` | history, analyses/{id} DELETE | Integrated |
| `/vault` | history, analyses/{id}, pin, DELETE | Integrated |
| `/privacy`, `/terms`, `/security` | — | Static content |
| `/api-docs` | Documents real `/api/*` routes | Aligned |

## Notes

- **Analyze** auto-saves each run; returned `id` links to Vault/History.
- **PDF**: client-side text report download (`downloadAnalysisReport`) — no server PDF yet.
- **History vs Vault**: same database table; different UIs on the same API.
- **Risk labels**: API may return `"High Risk"`; UI normalizes via `normalizeRiskBand()`.
