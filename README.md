# AI Sales & Operations Assistant

Portfolio project for an internal sales and operations assistant: scoped
customer management, CSV/XLSX import, operational KPIs, human-reviewed AI email
drafts, support tickets, audit logs, and a Power BI analytical-report seam.

The delivery is intentionally backend-first. React/TypeScript/Vite with Tailwind
CSS and shadcn/ui, plus Figma UX/UI, are scheduled after the backend contract and
critical workflows are stable.

## Run locally

Requirements: Python 3.12, Docker Desktop (for PostgreSQL), and `uv`.

```powershell
Copy-Item backend\.env.example backend\.env
uv sync --directory backend --extra dev
docker compose --env-file backend\.env up --build
```

API docs: `http://localhost:8000/docs`  
Health: `http://localhost:8000/health`

After migrations, load only synthetic demo data:

```powershell
docker compose exec api python -m alembic upgrade head
docker compose exec api python -m scripts.seed_demo
```

Demo users and password are defined in
`backend/app/core/demo_seed.py`; they must never be reused outside a local demo
database.

## Quality checks

From `backend/`:

```powershell
uv run pytest --cov=app --cov-fail-under=80 -q
uv run ruff format --check .
uv run ruff check .
uv run mypy app
uv run alembic heads
```

See [AGENTS.md](AGENTS.md) for the engineering conventions and
[docs/implementation-plan.md](docs/implementation-plan.md) for phase status.
