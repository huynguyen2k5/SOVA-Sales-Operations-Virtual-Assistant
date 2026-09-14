# Database Schema

## ER diagram

```mermaid
erDiagram
    USER ||--o{ CUSTOMER : owns
    USER ||--o{ REFRESH_SESSION : authenticates
    CUSTOMER ||--o{ CUSTOMER_INTEREST : has
    PRODUCT ||--o{ CUSTOMER_INTEREST : appears_in
    CUSTOMER ||--o{ CUSTOMER_INTERACTION : has
    USER ||--o{ CUSTOMER_INTERACTION : records
    USER ||--o{ IMPORT_JOB : creates
    IMPORT_JOB ||--o{ IMPORT_ERROR : contains
    CUSTOMER ||--o{ EMAIL_DRAFT : receives
    USER ||--o{ EMAIL_DRAFT : creates
    USER ||--o{ SUPPORT_TICKET : creates_or_assigns
    SUPPORT_TICKET ||--o{ TICKET_COMMENT : contains
    USER ||--o{ TICKET_COMMENT : writes
    USER ||--o{ AUDIT_LOG : produces

    USER {
        uuid id PK
        string email UK
        string fullName
        string role
        bool isActive
        datetime createdAt
        datetime updatedAt
    }
    REFRESH_SESSION {
        uuid id PK
        uuid userId FK
        string tokenHash UK
        datetime expiresAt
        datetime revokedAt
        datetime createdAt
    }
    CUSTOMER {
        uuid id PK
        string companyName
        string contactName
        string email
        string phone
        string status
        uuid ownerId FK
        datetime createdAt
        datetime updatedAt
    }
    PRODUCT {
        uuid id PK
        string sku UK
        string name
        bool isActive
        datetime createdAt
    }
    CUSTOMER_INTEREST {
        uuid id PK
        uuid customerId FK
        uuid productId FK
        string interestLevel
        datetime createdAt
    }
    CUSTOMER_INTERACTION {
        uuid id PK
        uuid customerId FK
        uuid userId FK
        string type
        text summary
        datetime occurredAt
        datetime createdAt
    }
    IMPORT_JOB {
        uuid id PK
        uuid createdById FK
        string fileName
        string status
        int totalRows
        int validRows
        int invalidRows
        json rowsJson
        datetime createdAt
        datetime completedAt
    }
    IMPORT_ERROR {
        uuid id PK
        uuid importJobId FK
        int rowNumber
        string fieldName
        string message
    }
    EMAIL_DRAFT {
        uuid id PK
        uuid customerId FK
        uuid createdById FK
        string purpose
        string language
        string tone
        string subject
        text body
        string status
        string provider
        string model
        string promptVersion
        datetime createdAt
        datetime updatedAt
    }
    SUPPORT_TICKET {
        uuid id PK
        uuid createdById FK
        uuid assigneeId FK
        string title
        text description
        string category
        string priority
        string status
        datetime createdAt
        datetime updatedAt
    }
    TICKET_COMMENT {
        uuid id PK
        uuid ticketId FK
        uuid authorId FK
        text body
        datetime createdAt
    }
    AUDIT_LOG {
        uuid id PK
        uuid actorId FK
        string action
        string entityType
        uuid entityId
        json metadata
        datetime createdAt
    }
```

## Invariants

- `USER.email` and `PRODUCT.sku` are unique after normalization.
- `CUSTOMER.ownerId`, `EMAIL_DRAFT.createdById`, and ticket user references must point to active or historically valid Users.
- `CUSTOMER_INTEREST` is unique on `(customer_id, product_id)`.
- `IMPORT_ERROR` belongs to exactly one Import Job and is immutable after the job is finalized.
- `EMAIL_DRAFT.status` is one of `draft`, `reviewed`, `approved`, or `rejected`.
- Only a human Staff/Admin action can transition an Email Draft to `reviewed` or `approved`.
- `SUPPORT_TICKET.status` is one of `open`, `in_progress`, `waiting`, `resolved`, or `closed`.
- `AUDIT_LOG` is append-only and never stores passwords, tokens, full AI prompts, or full email bodies.
- All timestamps are stored in UTC.

## Index plan

- `customers(owner_id, status)` for Staff lists and follow-up views.
- `customers(email)` for duplicate detection.
- `customer_interactions(customer_id, occurred_at DESC)` for timelines.
- `import_errors(import_job_id, row_number)` for error review.
- `email_drafts(customer_id, created_at DESC)` for history.
- `support_tickets(status, priority, assignee_id)` for work queues.
- `audit_logs(entity_type, entity_id, created_at DESC)` for investigation.

## Migration policy

Every schema change is an Alembic migration. Applied migrations are immutable.
Destructive changes use an expand-and-contract sequence and require a recovery
plan before execution.
