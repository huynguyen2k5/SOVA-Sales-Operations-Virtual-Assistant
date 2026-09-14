# Product Scope

## Product

AI Sales and Operations Assistant is an internal web application for importing
customer data, finding follow-up opportunities, generating human-reviewed email
drafts, and tracking IT support requests.

## Actors

| Actor | Primary responsibility |
| --- | --- |
| Staff | Manage assigned customers, import files, inspect KPIs, create/review email drafts, create tickets |
| Admin | Manage Users, view all customer data, assign tickets, view Audit Logs, manage Power BI access |
| AI Provider | Generate an Email Draft from explicitly selected context; never sends email |

## MVP scope

1. Authentication and role-based access for Admin and Staff.
2. Customer, Product, Interaction, and Follow-up data management.
3. CSV/XLSX Import Job with preview, validation, duplicate detection, and row-level errors.
4. Operational dashboard with customer, product, interaction, and follow-up KPIs.
5. Vietnamese and English Email Draft generation with tone and purpose options.
6. Human Review, edit, approve, or reject workflow.
7. Support Ticket lifecycle with comments, priority, category, and assignment.
8. Audit Log for access, imports, customer changes, email actions, and ticket changes.
9. Docker-based local run and a reproducible demo deployment.

## Portfolio scope

1. Power BI Analytical Report embedded in the React application.
2. Synthetic seed dataset and demo accounts.
3. OpenAPI-derived TypeScript client.
4. Row-level access demonstration where the Power BI environment supports it.
5. Optional fake AI provider for deterministic offline demos.

## Explicit non-goals for the first release

- Automatic email sending or mailbox integration.
- Payroll, inventory, manufacturing execution, or accounting workflows.
- A generic chatbot unrelated to customer and operations data.
- Microservices or event-driven infrastructure without a measured need.
- Public Power BI reports containing real or confidential data.
- Replacing the company's source-of-truth ERP or CRM.

## Success criteria

- A Staff user can import a valid file, see a preview, correct invalid rows, and complete an import without silent partial writes.
- A Staff user can find Customers requiring Follow-up using dashboard filters.
- A Staff user can generate and edit a Vietnamese or English Email Draft using only selected Customer context.
- An Admin can manage Users, assign Support Tickets, and inspect Audit Logs.
- A recruiter can run the synthetic-data demo from documented instructions.
- Critical paths have automated tests and all relevant quality checks pass.

## Product constraints

- Backend: FastAPI and Pydantic.
- Frontend: React, TypeScript, Vite, Tailwind CSS, and shadcn/ui.
- Persistence: PostgreSQL with SQLAlchemy and Alembic.
- Operational visualization: React charts.
- Analytical visualization: Power BI embedding.
- All timestamps crossing a system boundary are timezone-aware and represented in UTC.
- Real customer data is never used in a public demo.
