# Use Cases and Permissions

## Use-case map

Mermaid has no native UML use-case renderer in the diagram workflow, so this map
uses actors and actions while preserving the same intent.

```mermaid
flowchart LR
    staff((Staff))
    admin((Admin))
    aiProvider((AI Provider))

    subgraph customerWork ["Customer Work"]
        manageCustomers([Manage Customers])
        recordInteractions([Record Interactions])
        findFollowUps([Find Follow-ups])
        importData([Import Customer File])
    end

    subgraph communication ["Communication"]
        generateDraft([Generate Email Draft])
        reviewDraft([Review and Edit Draft])
        approveDraft([Approve or Reject Draft])
    end

    subgraph supportWork ["Support"]
        createTicket([Create Support Ticket])
        manageTickets([Manage Support Tickets])
    end

    subgraph administration ["Administration"]
        manageUsers([Manage Users])
        inspectAudit([Inspect Audit Logs])
        viewAllData([View All Operational Data])
    end

    staff --> manageCustomers
    staff --> recordInteractions
    staff --> findFollowUps
    staff --> importData
    staff --> generateDraft
    staff --> reviewDraft
    staff --> approveDraft
    staff --> createTicket
    admin --> manageCustomers
    admin --> importData
    admin --> manageTickets
    admin --> manageUsers
    admin --> inspectAudit
    admin --> viewAllData
    generateDraft -.-> aiProvider
```

## Permission matrix

| Capability | Staff | Admin |
| --- | :---: | :---: |
| View assigned Customers | Yes | Yes |
| View all Customers | No | Yes |
| Create/update assigned Customers | Yes | Yes |
| Import customer files | Yes | Yes |
| View import errors | Own jobs | All jobs |
| View operational dashboard | Assigned scope | All scope |
| Generate Email Draft | Yes | Yes |
| Review/edit Email Draft | Yes | Yes |
| Approve/reject Email Draft | Yes | Yes |
| Create Support Ticket | Yes | Yes |
| Assign or resolve tickets | No | Yes |
| Manage Users | No | Yes |
| View Audit Logs | No | Yes |
| Request Power BI embed config | Scoped | All scope |

## Critical acceptance scenarios

### Import

- Given a valid file, when Staff previews and confirms it, accepted rows are committed once.
- Given invalid rows, when Staff previews the file, each error has a row number, field, and actionable message.
- Given a duplicate email, when Staff confirms the import, the duplicate is rejected according to the import policy and is not silently overwritten.

### Email Draft

- Given a Customer and purpose, when Staff requests generation, an Email Draft is saved as `draft`.
- Given a generated draft, when Staff edits it, the edited content is preserved.
- Given a draft, when Staff approves it, its state becomes `approved` but no sending side effect occurs.

### Access

- Given a Staff User, when they request another Staff member's Customer, the backend denies access.
- Given an Admin, when they inspect the same Customer, access is granted and the read is auditable where policy requires it.

### Support

- Given a Staff User, when they create a ticket, it starts as `open` and belongs to its creator.
- Given an Admin, when they assign and resolve a ticket, each transition is recorded in the Audit Log.
