# Continuous Integration

SOVA uses two GitHub Actions workflows. Both run with read-only repository
permissions by default, cancel superseded runs, and pin every third-party action
to a full commit SHA.

## Quality workflow

`.github/workflows/ci.yml` runs on every push and pull request:

- **Backend quality and migrations:** locked `uv` install, Ruff format/lint,
  strict mypy, pytest with an 80% coverage floor, and Alembic upgrade/check/
  rollback/replay against PostgreSQL 16.
- **Frontend quality and build:** frozen pnpm install, Prettier, Oxlint, strict
  TypeScript, Vitest, and a production Vite build on Node.js 22.
- **OpenAPI contract drift:** regenerates the FastAPI schema and TypeScript API
  types, then fails if generated files differ from Git.
- **Docker Compose smoke test:** builds and starts the complete stack, migrates
  and seeds synthetic data, verifies both HTTP services, signs in through the
  frontend proxy, and checks that Staff receives `403` on an Admin endpoint.

## Security workflow

`.github/workflows/security.yml` runs on pushes, pull requests, manual dispatch,
and every Monday:

- CodeQL extended queries for Python and JavaScript/TypeScript.
- Pull-request dependency review, blocking newly introduced High or Critical
  advisories.
- `pip-audit` for locked production Python dependencies and `pnpm audit` for
  production frontend dependencies.
- Bandit for insecure Python patterns.
- Gitleaks across complete Git history.
- zizmor and actionlint for GitHub Actions security and syntax.
- Trivy scans of the backend and frontend container images, blocking fixable
  High or Critical vulnerabilities.

`.github/dependabot.yml` opens weekly grouped updates for Python, frontend,
GitHub Actions, Compose, and both Dockerfiles.

## Recommended branch protection

Protect the release branch and require these checks before merging:

- `Backend quality and migrations`
- `Frontend quality and build`
- `OpenAPI contract drift`
- `Docker Compose smoke test`
- both `CodeQL` matrix jobs
- `Dependency and Python security audit`
- `Secret scan`
- `GitHub Actions security audit`
- both `Container audit` matrix jobs
- `Dependency review` for pull requests

Keep **Require branches to be up to date before merging** enabled. Do not allow
security jobs to continue on error. CodeQL and Dependency Review also require
GitHub code security and the dependency graph to be enabled for the repository.

## Local equivalents

Run the backend and frontend commands documented in the root `README.md`. For
security checks:

```powershell
uvx --from pip-audit==2.10.1 pip-audit --local
uvx bandit==1.9.4 -r backend/app -q -ll
corepack pnpm@10.34.3 --dir frontend audit --prod --audit-level=high
uvx zizmor==1.30.0 --pedantic --min-severity medium .github
```
