# KPI Definitions

These definitions are the initial product contract for both the operational
dashboard and the Power BI semantic model. A change requires updating this file,
the relevant queries, tests, and report measures together.

## Customer KPIs

### Total Customers

Count of non-archived Customers visible to the current User's scope at query time.

### New Customers

Count of Customers created during the selected date range, excluding archived
records.

### Active Customers

Count of non-archived Customers with at least one Interaction in the selected
rolling period. The initial rolling period is 90 days.

## Interaction KPIs

### Interactions

Count of recorded Interactions whose `occurredAt` falls within the selected date
range, filtered by the current User's access scope.

### Interaction Trend

Daily or weekly count of Interactions in the selected date range. The frontend
chooses the bucket based on range length; the count itself is unchanged.

## Follow-up KPIs

### Follow-ups Due

A non-archived Customer is due for Follow-up when the Customer has no Interaction
or the latest Interaction is older than the configured follow-up interval. The
initial interval is 7 calendar days and is configurable in application settings.

### Follow-up Rate

`Customers with a completed Interaction after becoming due / Customers that became due`
for the selected date range. The API returns this ratio from `0.0` to `1.0`; the
frontend formats it as a percentage. If the denominator is zero, the dashboard
displays `Not enough data` rather than zero percent.

## Email KPIs

### Drafts Generated

Count of Email Drafts created in the selected date range.

### Approval Rate

`Email Drafts approved / Email Drafts reviewed` for the selected date range. Drafts
that have never been reviewed are excluded from the denominator.

## Filtering and privacy

- All KPIs apply the same User scope and date timezone rules.
- KPI endpoints return aggregates unless the use case explicitly requires a
  Customer list.
- Power BI measures must match these definitions exactly.
