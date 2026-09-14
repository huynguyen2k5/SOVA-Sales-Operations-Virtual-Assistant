# Figma UX/UI Design Prompt

> Copy the prompt below and send it to Figma AI/design agent.

~~~text
You are a principal product designer and design-system architect. Design the UX/UI for an internal B2B web application called “AI Sales & Operations Assistant” for Việt D.E.L.T.A., a Vietnamese manufacturing/operations company.

Use the UI/UX Pro Max methodology where available: analyze the product, industry, users, and information architecture first; generate the design system before composing screens; use evidence-based UX guidelines; and finish with an accessibility, responsive, and anti-pattern review. The implementation target is React + TypeScript + Vite + Tailwind CSS + shadcn/ui. Design components so they map cleanly to shadcn/ui primitives and Tailwind CSS variables/utilities, without inventing a separate styling system. The backend contract is FastAPI with REST APIs, camelCase JSON at the HTTP boundary, UUID resources, UTC timestamps, and role-based access. Do not design features that are not listed below.

## Product goal

Help Sales/Operations staff import customer data, manage scoped customers and interactions, identify follow-up opportunities, generate human-reviewed email drafts, track internal IT support tickets, inspect operational KPIs, and access a Power BI analytical report. This is an internal productivity tool, not a marketing website and not a chatbot.

## Users and permissions

- Staff: view and manage assigned customers, import files, record interactions, view assigned-scope KPIs and follow-ups, generate/edit/review/approve/reject email drafts, create and comment on support tickets.
- Admin: everything Staff can do, plus view all operational data, manage users, assign/resolve/close support tickets, inspect audit logs, and manage Power BI access.
- AI provider: generates a draft only. It must never send an email or make an autonomous business decision.

The UI must visibly communicate scope and permissions without exposing data a user is not authorized to see. Include role-aware navigation and permission-denied states.

## Required information architecture and screens

Create a complete desktop-first product experience, not isolated mockups. Include these screens and connected flows:

1. **Authentication**
   - Login screen with email/password, validation, password visibility, loading, invalid-credentials, inactive-account, and server-error states.
   - App shell after login with role-aware sidebar, top bar, breadcrumbs/page title, current user menu, notification/toast area, and responsive collapse behavior.

2. **Operational Dashboard**
   - KPI cards: total customers, new customers, active customers, interactions, follow-ups due, and follow-up rate.
   - Customer/product/interaction/follow-up summaries.
   - Interaction trend chart and customers-by-product chart.
   - Date-range filter, loading skeletons, empty data state, error/retry state, and “not enough data” state for a zero follow-up-rate denominator.
   - Use charts that support comparison and trends; avoid decorative 3D charts and misleading visual encodings.

3. **Customers**
   - Paginated table with search, status filter, owner filter for Admin, allowlisted sorting, row selection, and stable empty/loading/error states.
   - Customer detail page with contact summary, status, owner, product interests, interaction timeline, follow-up indicator, and actions.
   - Create/edit customer form with validation, ownership rules, archive confirmation, and success/error feedback.
   - Add-interaction form with type, summary, and timezone-aware occurred-at field.
   - Staff must only see assigned customers; Admin may see all customers.

4. **Customer Import Wizard**
   - Three clear stages: upload → preview/validate → commit result.
   - Support CSV/XLSX. Show accepted row count, invalid row count, duplicate warnings, row number, field, and actionable error message.
   - Provide downloadable error CSV, corrected-file re-upload path, disabled commit while errors exist, commit confirmation, atomic-success result, conflict/error result, and already-committed state.
   - Clearly explain file limits and supported columns without overwhelming the user.

5. **AI Email Drafts**
   - Draft-generation form: customer, purpose, Vietnamese/English language, and tone.
   - Draft editor with subject/body, regenerate action, save/edit state, metadata, and selected customer context summary.
   - Mandatory human-review state machine: Draft → Reviewed → Approved or Rejected.
   - Make it impossible to mistake approval for sending: no send button, prominent “Draft only — no email is sent” message, and clear audit/history treatment.
   - Include generating, provider failure, validation, unsaved changes, approved read-only, rejected-with-reason, and empty history states.

6. **Support Tickets**
   - Ticket list with status, priority, category, assignee, updated time, search/filter, and sort.
   - Ticket detail with description, metadata, status timeline, comments, assignment for Admin, and status transitions.
   - Staff can create/comment and update non-terminal operational status; only Admin can resolve/close or assign.
   - Include closed-ticket read-only state, comment validation, permission denied, loading, empty, conflict, and error/retry states.

7. **Audit Logs (Admin only)**
   - Filterable/paginated table by action, entity type, entity ID, and time.
   - Readable event detail drawer with actor, resource, timestamp, and redacted metadata.
   - Include no-access state for Staff, no-results state, loading, and error/retry states.

8. **Power BI Analytics**
   - Analytics page with a Power BI embed region and clear loading, token-expired/refresh, authorization failure, unavailable, and fallback states.
   - The UI must not display client secrets. Make the distinction between operational React charts and the analytical Power BI report obvious.
   - Use synthetic demo data only in all mockups.

9. **User Management (Admin only)**
   - Paginated user list, create user, edit role/active status/password, validation, duplicate-email conflict, and permission-denied states.

## Visual direction

Create a premium, trustworthy enterprise interface for a manufacturing/operations environment: precise, calm, data-dense but highly scannable, with strong hierarchy and excellent readability. The visual language should feel operational and credible rather than playful or consumer-oriented.

- Use a light theme as the MVP default, with a deep navy/charcoal foundation, warm neutral surfaces, a restrained Việt D.E.L.T.A.-inspired red accent, and semantic green/amber/red statuses.
- Do not use neon gradients, excessive glassmorphism, ornamental 3D effects, oversized hero text, random blobs, excessive rounded pills, or a generic “AI purple” visual identity.
- Use one high-quality Vietnamese-compatible sans-serif family (Inter, Geist, or an equivalent with full Vietnamese glyph support). Define a compact type scale with clear display, heading, body, label, caption, and tabular-number styles.
- Use an 8-point spacing system with a 4px base where needed. Prefer 12-column desktop grids, consistent gutters, and deliberate whitespace around dense tables/charts.
- Use restrained corner radii, subtle borders, and a small elevation system. Prioritize grouping, alignment, and contrast over shadows.
- Use a consistent icon set such as Lucide/Phosphor-style line icons. Icons must support labels and never be the only way to convey meaning.
- Use real-looking synthetic Vietnamese names, companies, dates, and statuses in examples; never use real personal/customer data.

## Design-system requirements

Before composing the screens, create a documented Figma design system:

- Foundations: color variables, semantic color roles, typography, spacing, sizing, grid, corner radius, border, elevation, focus ring, and motion tokens.
- Naming: use predictable names such as color/bg/canvas, color/text/primary, color/action/primary, color/status/success, type/heading/md, space/4, radius/md, and shadow/sm.
- Components: buttons, icon buttons, inputs, selects, combobox/search, date-range picker, tabs, badges, status indicators, KPI cards, chart containers, data table, pagination, breadcrumb, sidebar, top bar, modal, drawer, toast, tooltip, empty state, skeleton, error state, and timeline.
- Every reusable component must use Auto Layout, have sensible constraints, and include variants/properties for size, hierarchy, state, disabled, loading, focus, error, and permission/visibility where relevant.
- Map reusable components to shadcn/ui anatomy where appropriate (`Button`, `Input`, `Select`, `Dialog`, `Sheet`, `Tabs`, `Table`, `Pagination`, `Toast`, `Badge`, `Skeleton`, and `Form`). Document the intended primitive and Tailwind token mapping in handoff notes.
- Prefer CSS-variable-backed semantic tokens that can be consumed by Tailwind and shadcn/ui. Do not introduce one-off visual values that cannot become a token.
- Define table behavior for long text, numeric alignment, sticky headers, sorting, filters, row hover/selected states, pagination, and responsive fallback.
- Define chart rules for axis labels, legends, tooltips, empty data, no-data explanation, and color-blind-safe series.
- Define content rules: concise Vietnamese-first UI copy, English-ready labels, sentence case, actionable validation messages, consistent date/time formatting, and explicit confirmation copy for destructive actions.

## UX and interaction rules

- Design task-first flows with one primary action per view and a clear secondary action hierarchy.
- Preserve user input on validation or server errors. Never silently discard a file, form, draft, or filter.
- Use inline validation for fields, contextual help for import rules, and toast only for short-lived confirmation—not critical information.
- Use skeletons for predictable loading layouts, empty states that explain what to do next, and actionable error states with retry or recovery.
- Confirm archive, reject, resolve, close, and other irreversible actions. Explain consequences in the confirmation dialog.
- Use progressive disclosure for advanced filters and audit metadata; keep the first view calm.
- Show UTC-aware timestamps in a human-readable local presentation and expose exact time in a tooltip/detail view.
- Provide visible focus, keyboard navigation, Escape-to-close for dialogs/drawers, logical tab order, and no keyboard traps.
- Meet WCAG 2.2 AA: minimum 4.5:1 normal-text contrast, 3:1 large-text/UI contrast where applicable, 44px minimum touch targets, semantic labels, accessible names, and status communicated without color alone.
- Respect reduced-motion preferences. Motion should be brief, purposeful, and never required to understand data.
- Design for realistic content: long company names, missing email/phone, empty interactions, many rows, slow network, expired tokens, conflict responses, and permission boundaries.

## Responsive behavior

Design and annotate at least these frames: 1440px desktop, 1280px laptop, 1024px tablet, 768px compact tablet, and 390px mobile.

- Desktop: persistent sidebar, multi-column dashboard, full data table.
- Tablet: collapsible sidebar, reduced chart columns, preserved primary actions.
- Mobile: single-column cards, horizontally scrollable or transformed tables, bottom/action overflow handling, readable forms, and no clipped content.
- Define breakpoint behavior for navigation, filters, tables, charts, modals, drawers, and Power BI fallback. Do not merely scale the desktop screenshot down.

## Figma file structure and handoff

Organize the file as:

- 00 Cover & Product Context
- 01 Foundations
- 02 Components
- 03 User Flows
- 04 MVP Screens
- 05 Responsive & Edge States
- 06 Prototype & Handoff

Use page-level descriptions and component documentation. Connect the core journeys in a clickable prototype:

1. Login → role-aware Dashboard → Customers → Customer detail → Add interaction.
2. Dashboard → Import wizard → Preview errors → Download errors/re-upload → Commit success.
3. Customer detail → Generate email draft → Edit → Review → Approve/Reject.
4. Support list → Ticket detail → Comment → Admin assignment/status transition.
5. Dashboard → Power BI page → loading/expired/unavailable fallback.

Annotate each screen with implementation-ready notes: component name, variant, responsive behavior, validation/error behavior, permission rule, API resource/action, and any assumptions. Keep the API-facing labels aligned with the existing contract; do not invent backend fields or workflows.

## Quality gate before delivery

Before considering the design complete, verify:

- The design system exists and is applied consistently across every screen.
- All required screens, flows, roles, states, and responsive frames are covered.
- Loading, empty, error, validation, permission, conflict, success, and destructive-action states are designed—not left to implication.
- No sensitive data, client secret, or automatic email-sending flow appears.
- Typography supports Vietnamese diacritics and all text remains legible at realistic density.
- WCAG 2.2 AA, keyboard/focus, color-blind, reduced-motion, and responsive checks pass.
- Components are reusable, named, Auto Layout based, and ready for React + TypeScript + Tailwind CSS + shadcn/ui implementation.
- Finish with a short design rationale, key trade-offs, anti-patterns avoided, open assumptions, and a developer handoff checklist.

Do not start by making a decorative dashboard screenshot. Start with the information architecture and foundations, then build the reusable system and connected flows, and only then compose the high-fidelity screens.
~~~
