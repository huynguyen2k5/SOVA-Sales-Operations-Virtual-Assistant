# AI Sales and Operations Assistant

This context defines the business language for an internal assistant that helps
staff manage customer information, understand operational activity, draft
personalized email, and request IT support.

## People and access

**User**:
An authenticated person who uses the assistant.
_Avoid_: Account, member, operator

**Staff**:
A User who manages assigned customer information, records interactions, reviews
email drafts, and creates support requests.
_Avoid_: Employee account, agent

**Admin**:
A User who manages access, oversees all operational data, assigns support work,
and reviews audit history.
_Avoid_: Superuser, root user

## Customer work

**Customer**:
A person or organization represented in the company's relationship records.
_Avoid_: Client, lead, account

**Product**:
An offering that a Customer may be interested in or that Staff may discuss.
_Avoid_: Item, service (unless it is genuinely a service offering)

**Interaction**:
A recorded contact or activity involving a Customer, such as a call, meeting, or
email.
_Avoid_: Event, touchpoint, activity log

**Follow-up**:
A Customer contact that Staff should perform because a previous Interaction is
old, incomplete, or requires a response.
_Avoid_: Reminder, task (unless it is an IT task)

## Data intake and communication

**Import Job**:
A single attempt to bring a structured customer file into the assistant.
_Avoid_: Upload, batch, sync

**Import Error**:
A row or field in an Import Job that cannot be accepted under the data rules.
_Avoid_: Warning, exception row

**Email Draft**:
A proposed message generated or edited for a Customer that has not been sent.
_Avoid_: Email, campaign, notification

**Review**:
The human check in which Staff inspects and may edit an Email Draft before it can
be approved.
_Avoid_: QA, verification

**Approval**:
The explicit human action that marks an Email Draft as ready for a future sending
workflow. Approval does not send the message.
_Avoid_: Send, publish

## Support and insight

**Support Ticket**:
A request for IT assistance with a defined status, priority, category, and
conversation history.
_Avoid_: Issue, incident (unless an incident process is later introduced)

**Audit Log**:
An immutable record of a security- or data-relevant action performed by a User or
system process.
_Avoid_: Activity feed, history (those can be user-editable)

**KPI**:
A defined operational measure shown to help a User understand customer or
follow-up activity.
_Avoid_: Metric (when referring to a named product measure)

**Analytical Report**:
A multi-dimensional view used to explore trends and relationships beyond the
operational dashboard.
_Avoid_: Chart, dashboard (a dashboard is a specific surface)
