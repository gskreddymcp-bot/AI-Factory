# 02 Architecture

```mermaid
flowchart LR
  UI[Web UI] --> API[API/BFF]
  API --> SB[(Supabase Postgres)]
  API --> GEN[Template Generators]
  GEN --> SB
  ADMIN[Admin UI] --> SB
  WORKER[Background Worker] --> SB
```

See additional diagrams in `docs/diagrams`.
