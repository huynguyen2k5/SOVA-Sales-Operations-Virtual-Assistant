# Engineering Standards for AI Agents

This file is the authoritative working agreement for every human and AI agent in
this repository. Read it before planning, editing, reviewing, or running code.
Rules in a more deeply nested `AGENTS.md` may add stricter module-specific rules,
but must not weaken this file. Explicit user instructions take precedence.

## 1. Product and Architecture Context

The product is an internal AI Sales and Operations Assistant with:

- React and TypeScript frontend.
- FastAPI and Pydantic backend.
- PostgreSQL persistence through SQLAlchemy and Alembic.
- Excel/CSV import and validation.
- Operational charts in React and analytical reports embedded from Power BI.
- AI-assisted Vietnamese and English email drafting with mandatory human review.
- Admin/Staff role-based access control, support tickets, and audit logging.

Start as a modular monolith. Do not introduce microservices, Redis, Celery, a
second database, or a new cloud service without a documented need and approval.

## 2. Sources of Truth

When sources disagree, use this order:

1. The current user request and accepted product requirements.
2. This file and any stricter nested `AGENTS.md`.
3. Approved architecture decisions in `docs/adr/`.
4. OpenAPI, database migrations, and automated tests.
5. Implementation details.

Never invent requirements to complete a design. Record unresolved decisions in
the relevant specification and ask before making a materially different product
or architecture choice.

Runtime and dependency versions must come from repository files, not prose:

- Python: `.python-version` and `pyproject.toml`.
- Node.js: `.nvmrc` or `.node-version`.
- JavaScript packages: `package.json` and its committed lockfile.
- Containers and services: `compose.yaml` and Dockerfiles.

## 3. Required Working Method

Before editing:

1. Read the relevant specification, ADRs, migrations, tests, and nearby code.
2. Inspect `git status` and preserve unrelated user changes.
3. State assumptions when requirements are incomplete.
4. Prefer the smallest coherent change that satisfies the acceptance criteria.
5. Identify security, migration, compatibility, and data-loss risks.

While editing:

- Work in vertical slices where practical: schema, backend, frontend, tests, and
  documentation for one behavior.
- Keep business rules out of route handlers and React presentation components.
- Reuse existing abstractions before adding dependencies or new layers.
- Do not perform opportunistic refactors unrelated to the task.
- Never edit generated files manually; run their generator.
- Never hide failures with broad exception handling, ignored type errors, skipped
  tests, or unsafe casts.

Before declaring completion:

1. Review the diff for accidental or unrelated changes.
2. Run all checks relevant to the changed scope.
3. Verify at least one happy path and meaningful failure path.
4. Update documentation, migrations, fixtures, and generated clients as needed.
5. Report what changed, what was verified, and any remaining risk.

## 4. Git Workflow

### Branches

Use short-lived branches with this form:

```text
codex/<type>/<ticket-or-scope>-<short-kebab-description>
```

Allowed types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `release`, and
`hotfix`.

Examples:

```text
codex/feat/p5-customer-import
codex/fix/auth-refresh-race
codex/docs/p1-api-contract
```

Do not create or switch branches unless the user requests it or the active
workflow explicitly requires it. Never rewrite shared history.

### Commits

Use Conventional Commits in English:

```text
<type>(<scope>): <imperative summary>
```

Allowed types:

- `feat`: user-visible capability.
- `fix`: defect correction.
- `refactor`: behavior-preserving code change.
- `perf`: measurable performance improvement.
- `test`: test-only change.
- `docs`: documentation-only change.
- `build`: build system or dependency change.
- `ci`: continuous integration change.
- `chore`: maintenance not covered above.
- `revert`: explicit revert of an earlier commit.

Use a stable scope such as `auth`, `customers`, `imports`, `analytics`, `email`,
`tickets`, `audit`, `power-bi`, `frontend`, `backend`, `db`, or `ci`.

Commit rules:

- Use imperative present tense and keep the subject at 72 characters or fewer.
- Make one logical change per commit; do not mix formatting with behavior.
- Explain motivation and trade-offs in the body when they are not obvious.
- Add `BREAKING CHANGE:` in the footer for incompatible changes.
- Reference the issue or task in a footer when an identifier exists.
- Never mention an AI author, assistant, or generation tool in commit messages.
- Never commit secrets, local `.env` files, credentials, build output, coverage
  output, IDE settings, or temporary data exports.
- Agents must not commit, push, tag, merge, or open a PR unless asked.

Example:

```text
feat(imports): validate duplicate customer emails

Reject duplicates within the uploaded file before opening the database
transaction so users receive row-level feedback without partial writes.

Refs: P5-17
```

## 5. Versioning and Releases

Use Semantic Versioning (`MAJOR.MINOR.PATCH`) after the first release:

- `MAJOR`: incompatible API, schema, or behavior change.
- `MINOR`: backward-compatible feature.
- `PATCH`: backward-compatible fix.

Before `1.0.0`, breaking changes increment the minor version. Release tags use
`vMAJOR.MINOR.PATCH`, for example `v0.3.0`. Do not create tags without approval.

Use a `CHANGELOG.md` following Keep a Changelog with an `Unreleased` section.
User-visible changes belong in the changelog; internal formatting does not.
Breaking API changes require a migration note and deprecation plan where viable.

Dependency rules:

- Use one committed lockfile per package manager.
- Do not hand-edit lockfiles.
- Pin direct dependencies using the repository's chosen package-manager policy.
- Add a dependency only when the standard library or installed dependencies do
  not solve the problem adequately.
- Document why security-sensitive or architecture-level dependencies are added.
- Keep upgrades separate from feature work unless the feature requires them.

## 6. Naming Conventions

Use English for source code, identifiers, schemas, API fields, logs, commit
messages, and technical documentation. User-facing content may be Vietnamese or
English according to localization requirements.

### General

- Names communicate domain intent; avoid `data`, `item`, `helper`, `manager`,
  `common`, `utils`, and `misc` when a precise domain name exists.
- Boolean names start with `is`, `has`, `can`, or `should`.
- Collections use plural nouns; single values use singular nouns.
- Include units in ambiguous measurements: `timeoutSeconds`, `sizeBytes`.
- Avoid abbreviations except established domain terms such as `id`, `api`, `url`,
  `csv`, `jwt`, and `kpi`.

### Python and FastAPI

- Modules, functions, variables, and package directories: `snake_case`.
- Classes, Pydantic models, and exceptions: `PascalCase`.
- Constants and enum members: `UPPER_SNAKE_CASE`.
- Private implementation details: one leading underscore.
- Test files: `test_<unit>.py`; test names: `test_<behavior>_<condition>`.
- Request models end with `Create`, `Update`, or `Query`.
- Response models end with `Response`; persisted ORM classes use the domain noun.
- Dependency functions describe the guarantee, for example `require_admin`.

### React and TypeScript

- Frontend stack: React + TypeScript + Vite, styled with Tailwind CSS and built
  from shadcn/ui primitives.
- Components, component files, types, and interfaces: `PascalCase`.
- Functions, variables, props, and non-component files: `camelCase`.
- Hooks start with `use`, for example `useCustomerFilters`.
- Constants: `UPPER_SNAKE_CASE` only for true immutable constants.
- Feature directories and route segments: `kebab-case`.
- Tests use `<name>.test.ts` or `<name>.test.tsx` beside the tested unit unless a
  module has an established test directory.
- Event handlers begin with `handle`; callback props begin with `on`.
- Avoid `I` prefixes for interfaces and avoid TypeScript enums; prefer literal
  unions or `as const` objects.

### Tailwind CSS and shadcn/ui

- Keep design tokens in CSS variables and map them through Tailwind; do not
  scatter hard-coded colors, spacing, radii, or shadows across components.
- Prefer shadcn/ui primitives for accessible behavior, then compose them into
  feature components. Generated primitives live under `frontend/src/components/ui`.
- Use the shared `cn` helper for conditional classes. Avoid inline styles and
  arbitrary Tailwind values unless a documented design-token exception exists.
- Keep state, permission, and responsive variants explicit in component APIs;
  visual hiding must never replace backend authorization.

### Database

- Tables and columns: plural `snake_case` table names and singular column names.
- Primary key: `id` as UUID unless an ADR states otherwise.
- Foreign key: `<singular_entity>_id`.
- Timestamps: `created_at`, `updated_at`, and optional `deleted_at`, stored in UTC.
- Index: `ix_<table>_<columns>`.
- Unique constraint: `uq_<table>_<columns>`.
- Foreign key constraint: `fk_<table>_<column>_<target>`.
- Check constraint: `ck_<table>_<rule>`.

### HTTP API

- Prefix public endpoints with `/api/v1`.
- Use plural resource nouns and kebab-case URL segments.
- Use HTTP methods semantically; actions are sub-resources only when CRUD cannot
  express the behavior, for example `/email-drafts/{id}/approval`.
- External JSON fields use `camelCase`; Python and database identifiers remain
  `snake_case`. Implement aliases centrally with Pydantic, not by hand per field.
- Query parameters use `camelCase` for consistency with the external contract.

## 7. Repository Structure and Boundaries

Target structure:

```text
backend/
  app/
    api/
    core/
    models/
    schemas/
    services/
  alembic/
  tests/
frontend/
  src/
    app/
    components/
    features/
    layouts/
    lib/
    types/
docs/
  adr/
  architecture/
  api/
```

Backend dependency direction:

```text
API routes -> application services -> domain/persistence integrations
```

- Routes handle transport, authentication dependencies, and response mapping.
- Services own use cases, transactions, and business rules.
- ORM models describe persistence and must not leak directly into API responses.
- Schemas define explicit external contracts.
- Avoid a generic repository or service base class until repeated behavior proves
  the abstraction useful.

Frontend dependency direction:

```text
app/routes -> feature modules -> shared components/lib
```

- Feature modules must not import another feature's private internals.
- Server state belongs in TanStack Query; do not mirror it into global state.
- Local UI state stays local. Introduce global client state only for a demonstrated
  cross-cutting need.
- Components render UI; hooks and service modules coordinate data and behavior.
- Do not call Axios directly from presentation components.

## 8. Backend Standards

- Use current Python type hints on all public functions and class members.
- Use Pydantic models at trust boundaries.
- Use SQLAlchemy 2-style queries and explicit transaction boundaries.
- Perform blocking Pandas/file work outside the event loop.
- Never use `async` merely for appearance; use it for genuinely awaitable I/O.
- Convert domain failures into stable HTTP problem responses centrally.
- Never expose stack traces, internal SQL, secrets, or provider responses to users.
- Use structured logs with request/correlation IDs.
- Log identifiers and outcomes, not customer content or credentials.
- Make retries bounded and only for idempotent or explicitly safe operations.

## 9. Frontend Standards

- TypeScript strict mode is mandatory. Do not use `any`; use `unknown` and narrow.
- Validate untrusted runtime data even when generated API types exist.
- Every data screen needs loading, empty, error, success, and unauthorized states.
- Forms use React Hook Form and Zod with accessible inline errors.
- Prefer semantic HTML and keyboard-operable controls.
- Do not encode permission enforcement only in the UI; backend authorization is
  authoritative.
- Keep tables usable with pagination, filtering, stable keys, and explicit empty
  states.
- Operational visualizations use accessible labels and non-color indicators.
- Power BI failures must have a clear fallback rather than a blank iframe.

## 10. API and Data Contracts

- OpenAPI generated by FastAPI is the source of truth for frontend API types.
- Regenerate the TypeScript client after contract changes.
- Pagination responses must expose items and stable pagination metadata.
- Filtering and sorting parameters must be allowlisted; never interpolate raw
  client input into SQL.
- Use ISO 8601 timestamps with timezone information at API boundaries.
- Use idempotency protection for operations that may be retried and create side
  effects.
- Do not remove or rename a field in a released API without versioning or an
  approved deprecation path.
- Document example request, success response, validation failure, authorization
  failure, and conflict response for each non-trivial endpoint.

## 11. Database and Migration Safety

- Every schema change requires an Alembic migration and a rollback review.
- Never edit an applied migration; add a new migration.
- Review autogenerated migrations manually before execution.
- Prefer expand-and-contract migrations for destructive or incompatible changes.
- Backfill before applying a non-null constraint to existing data.
- Add indexes based on real access patterns, foreign keys, or measured queries.
- Import jobs must be transactional: invalid rows never cause silent partial data.
- Destructive migrations, bulk deletes, and production data changes require
  explicit user approval and a recovery plan.
- Seed scripts must be idempotent and contain synthetic data only.

## 12. Security and Privacy

- Treat every request, file, spreadsheet cell, AI response, and Power BI value as
  untrusted input.
- Keep credentials only in environment variables or an approved secret manager.
- Commit `.env.example` with names and safe placeholders, never real values.
- Hash passwords with an approved adaptive password hashing algorithm.
- Enforce authorization in backend dependencies and services.
- Apply least privilege to database, Microsoft Entra, Power BI, and AI access.
- Validate file extension, MIME type, size, structure, and row count.
- Guard spreadsheet exports against formula injection.
- Rate-limit login, file upload, AI generation, and token-generation endpoints.
- Redact secrets, tokens, email bodies, and unnecessary personal data from logs.
- Do not use `Publish to web` for confidential or real customer Power BI data.
- Never send an entire customer record or database row to an AI provider.

If a change touches authentication, authorization, secrets, file upload, SQL,
external calls, AI prompts, or customer data, include an explicit security test.

## 13. AI Feature Rules

- AI output is untrusted draft content, never an authoritative decision.
- Email lifecycle is `draft -> reviewed -> approved` or `rejected`.
- Sending email is outside the MVP and must not be implied by an approval action.
- A human must be able to inspect and edit content before approval.
- Minimize and explicitly construct the provider payload.
- Version prompts and record provider/model metadata without storing secrets.
- Set timeouts, bounded retries, and user-friendly provider failure states.
- Provide a deterministic fake provider for local development and tests.
- Tests must not call a paid or network AI API.
- Protect system instructions and contextual data from user-supplied prompt
  injection; never execute instructions returned by the model.

## 14. Power BI Rules

- Use native React charts for operational, low-latency UI and Power BI for deeper
  analytical exploration.
- Keep Microsoft Entra and Power BI credentials in the backend only.
- React receives only the short-lived embed configuration it needs.
- Internal deployment defaults to the user-owns-data model unless an ADR approves
  app-owns-data.
- Enforce row-level security where users must see different data scopes.
- Public portfolio reports use synthetic data only.
- Handle loading, token expiry, authorization failure, and service unavailability.

## 15. Testing Standards

Follow the test pyramid:

- Unit tests for business rules, validators, transformations, and pure functions.
- Integration tests for API, database, authentication, import, and provider
  boundaries.
- End-to-end tests only for critical user journeys.

Every change must test:

- The intended successful behavior.
- At least one relevant validation or failure behavior.
- Authorization when the feature is role-sensitive.
- Regression behavior when fixing a bug.

Additional rules:

- Tests must be deterministic and independent of execution order.
- Freeze or inject time; do not rely on wall-clock sleeps.
- Mock only external boundaries, not the unit's core behavior.
- Use factories/builders instead of shared mutable fixtures.
- Never call production services from automated tests.
- Do not lower coverage thresholds, delete assertions, or skip tests to pass CI.
- Target at least 80% meaningful coverage overall and higher coverage for auth,
  import transactions, permissions, and AI approval workflows.

Expected quality gates once scripts exist:

```text
Backend: format check -> lint -> type check -> tests -> migration check
Frontend: format check -> lint -> type check -> tests -> production build
```

Run targeted checks during development and the complete relevant suite before
handoff. If a check cannot run, report the exact reason; do not claim success.

## 16. Documentation and Decisions

- Keep `README.md` focused on setup, operation, testing, and demo credentials.
- Record significant architectural choices as ADRs in `docs/adr/` using:
  `NNNN-short-kebab-title.md`.
- ADR status is `Proposed`, `Accepted`, `Superseded`, or `Rejected`.
- Update architecture diagrams, ERD, API docs, and data dictionary when their
  underlying contracts change.
- Comments explain why or constraints, not code that is already obvious.
- Public APIs and non-obvious business rules require concise docstrings.

## 17. Review Priorities

Review in this order:

1. Data loss, secret exposure, broken authorization, and privacy violations.
2. Incorrect business behavior and transaction boundaries.
3. API/database compatibility and migration safety.
4. Error handling, observability, concurrency, and performance.
5. Test quality and maintainability.
6. Naming, formatting, and minor style concerns.

Review comments must be actionable, cite the affected location, explain impact,
and distinguish a blocker from a suggestion.

## 18. Prohibited Agent Actions

Unless the user explicitly requests and authorizes them, an agent must not:

- Delete user data, reset the repository, discard changes, or rewrite history.
- Commit, push, merge, tag, publish, deploy, or send external communications.
- Apply production migrations or modify real external accounts.
- Add real customer data, secrets, tokens, or credentials to the repository.
- Disable security controls, tests, linters, type checks, or audit logging.
- Change the agreed architecture or product scope without documenting the trade-off.
- Claim a command, test, migration, or integration succeeded without evidence.

## 19. Definition of Done

A task is complete only when all applicable items are true:

- Acceptance criteria are satisfied without unrelated scope.
- Code follows naming, architecture, security, and contract conventions.
- Database changes include reviewed migrations.
- API changes update OpenAPI-derived clients and documentation.
- Automated tests cover success, failure, and authorization as applicable.
- Relevant lint, format, type, test, and build checks pass.
- Loading, empty, error, and permission UI states are handled.
- Logs and audit events are appropriate and contain no sensitive content.
- Documentation and changelog are updated when required.
- The final handoff lists changed files, verification performed, and remaining
  limitations or follow-up work.
