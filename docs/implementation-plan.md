# Implementation Plan

Status values: `done`, `in progress`, `blocked`, and `pending`.

## Current delivery order

The project is temporarily **backend-first**. Frontend implementation and Figma
work are intentionally deferred until the FastAPI contract, database migrations,
business rules, and test fixtures are stable. This does not remove the frontend
scope; it changes sequencing so the later React work consumes a proven contract.

```text
Phase 0 -> Phase 1 -> Phase 3 backend foundation -> Phase 4–8 backend vertical slices
         -> Phase 9 Power BI backend integration -> Phase 10 backend hardening
         -> Phase 2 Figma/FE -> release
```

## Phase 0 — Scope and vocabulary

**Status:** done

- [x] Product scope and non-goals.
- [x] Actors, roles, and business language in `CONTEXT.md`.
- [x] MVP versus portfolio scope.
- [x] Synthetic import template and demo-data direction.
- [x] Human-review requirement for Email Drafts.

## Phase 1 — System analysis and contracts

**Status:** done

- [x] System architecture and request flows.
- [x] Database entities, keys, cardinality, and invariants.
- [x] Actor/use-case map and permission matrix.
- [x] API conventions, endpoint inventory, and error contract.
- [x] ADRs for modular monolith, visualization split, and human-reviewed AI.

## Phase 2 — UX/UI in Figma

**Status:** deferred by decision

The design and frontend scope remains accepted, but execution is deferred until
the backend contract, data rules, and release hardening are complete. UX/UI is
the final implementation phase by decision. The copy-paste design brief is in
`docs/product/figma-ux-ui-prompt.md`.

- [ ] Information architecture and navigation.
- [ ] User flows for import, customer management, analytics, email review, and tickets.
- [ ] Wireframes for all MVP screens.
- [ ] Design tokens and reusable component variants.
- [ ] High-fidelity desktop dashboard and responsive states.
- [ ] Clickable prototype and developer handoff.

## Phase 3 — Technical foundation

**Status:** done (backend scope; FE deferred)

- [x] Monorepo structure, environment templates, and Docker Compose.
- [x] FastAPI app factory, settings, health check, logging, and error middleware.
- [x] SQLAlchemy session, Alembic scaffold, and backend test foundations.
- [ ] React/Vite strict TypeScript setup with Tailwind CSS and shadcn/ui, routing, query client, and API client (deferred with Phase 2).
- [x] Backend formatter, linter, type check, test, and migration-check scripts.

## Phase 4 — Authentication and access

**Status:** done (backend scope; UI deferred)

- [x] User model and migrations.
- [x] Scrypt password hashing, access/refresh tokens, logout, and session expiry.
- [x] Admin/Staff authorization dependencies and permission tests.
- [ ] Login, protected routes, role-based navigation, and User management UI.

## Phase 5 — Customer data and import

**Status:** done (backend scope; UI deferred)

- [x] Customer, Product, Interest, and Interaction models.
- [x] Customer CRUD, search, filters, sorting, pagination, and ownership.
- [x] CSV/XLSX preview, normalization, validation, duplicate detection, and transaction.
- [x] Import errors, correction flow, download-errors action, and tests.

## Phase 6 — Operational analytics

**Status:** done (backend scope; UI deferred)

- [x] KPI definitions and query implementations.
- [x] Customer, product, interaction, and Follow-up summaries.
- [ ] React KPI cards, charts, filters, table, loading, empty, and error states.
- [x] Query indexes and correctness tests.

## Phase 7 — AI Email Drafts

**Status:** done (backend scope; UI deferred)

- [x] AI Provider interface and deterministic fake adapter.
- [x] Vietnamese/English prompt templates and structured output.
- [x] Minimized context builder and human-review state machine.
- [x] Email Draft state machine and audit events.
- [ ] Composer, regenerate, edit, review, approve, reject, and history UI.

## Phase 8 — Support and audit

**Status:** done (backend scope; UI deferred)

- [x] Support Ticket and comment models.
- [x] Status, priority, category, assignment, and permission rules.
- [ ] Ticket list/detail/timeline UI.
- [x] Audit capture, redaction, filtering, and Admin viewer API.

## Phase 9 — Power BI

**Status:** done (backend adapter; React embed deferred)

- [x] Semantic model and report measures documented.
- [x] Power BI configuration seam and short-lived embed-config endpoint.
- [ ] React `powerbi-client-react` integration and token refresh.
- [ ] Loading, authorization failure, expiry, and fallback states.
- [x] Synthetic-data-only public demo path.

## Phase 10 — Hardening and portfolio delivery

**Status:** done (backend scope; release packaging deferred until UX/UI)

- [x] Backend unit/integration tests and critical API journeys.
- [x] Security checks for auth, uploads, SQL scope, AI context, and Power BI secrets.
- [x] Dockerfile, migration checks, CI quality gates, and reproducible lockfile.
- [x] Backend README, API docs, diagrams, and changelog.
- [ ] Production deployment, screenshots, and demo recording after UX/UI.

## Quality gates

Each phase closes only when its acceptance criteria, tests, documentation, and
security implications are reviewed. A phase may be demonstrated before every
future phase is complete, but a later phase must not silently change an accepted
contract; contract changes require an ADR or an update to the relevant spec.
