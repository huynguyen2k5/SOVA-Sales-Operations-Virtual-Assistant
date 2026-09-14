---
status: accepted
---

# Split operational charts from analytical reports

React charts are the operational surface for fast, task-oriented KPIs, while
Power BI is the analytical surface for drill-down and multi-dimensional reporting.
This avoids making every interaction depend on Power BI and demonstrates the
practical distinction between application UX and enterprise BI; both consume the
same governed PostgreSQL-backed data model.
