---
status: accepted
---

# Start as a modular monolith

The first release uses one FastAPI application with explicit domain modules and
one PostgreSQL database. This keeps deployment and local development simple while
preserving seams between authentication, customer data, imports, analytics, AI
email, support, and audit; microservices would add operational cost before this
portfolio product has independent scaling or ownership needs.
