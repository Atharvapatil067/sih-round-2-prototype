# Architecture — Matter Lineage Ledger

## 1. Architectural principle
Build a **modular monolith** with one separate Python matching worker. Avoid microservices, graph databases and external vector databases for the prototype.

The system is a **read-only coordination layer** above AICTE source systems. Source systems remain the owners of their records and statuses. The ledger owns only coordination state: proposed links, confirmed edges, flags, reviewer decisions and derived views.

## 2. High-level architecture

```text
+------------------+     +------------------+     +------------------+
| CSS-like source  |     | PGRC-like source |     | RB-like source   |
+--------+---------+     +--------+---------+     +--------+---------+
         |                        |                        |
         +-----------+------------+-----------+------------+
                     |  CSV / JSON snapshots    |
                     v
          +------------------------+
          |   Connector Layer      |
          |  schema validation,    |
          |  normalisation         |
          +-----------+------------+
                      |
                      v
          +------------------------+
          |  Event / Snapshot Diff |
          |  append-only events    |
          +-----------+------------+
                      |
        +-------------+--------------+
        |                            |
        v                            v
+------------------+        +----------------------+
| PostgreSQL       |<------>| Python Matching      |
| core data, edges,|        | Worker               |
| events, audit    |        | BM25, embeddings,    |
+--------+---------+        | rules, calibration   |
         |                  +----------+-----------+
         v                             |
+------------------+                   |
| Node/TypeScript  |<------------------+
| API + rule engine|
+--------+---------+
         |
         v
+------------------+
| Next.js UI       |
| Institution view |
| Matter Thread    |
| Coordination     |
| Brief / Review   |
+------------------+
```

## 3. Components

### 3.1 Next.js frontend
Responsible for:
- Institution search and institution view
- Matter Thread graph/list view
- Coordination Brief
- Relationship review queue
- Alerts and reports
- Role-aware navigation and masked data display

Recommended libraries:
- Next.js
- React
- TanStack Query or SWR
- React Flow or Cytoscape.js for relationship visualisation
- Tailwind CSS

### 3.2 Node/TypeScript API and rules service
Responsible for:
- Authentication and session handling
- Role and attribute-based authorisation
- CRUD for review decisions and configuration
- Procedural rule evaluation
- Deadline and alert generation
- Snapshot import orchestration
- Audit logging

Recommended stack:
- Node.js
- TypeScript
- Next.js API routes or NestJS/Express if separated
- Zod for schema validation
- Prisma or Drizzle ORM
- PostgreSQL client

### 3.3 Python matching worker
Responsible for:
- Text normalisation
- Reference and date extraction
- Institution candidate blocking
- BM25 scoring
- Embedding similarity
- Optional cross-encoder reranking
- Rule-based relationship classification
- Calibrated scoring
- Explanation generation
- Benchmark evaluation

Recommended stack:
- Python 3.11+
- FastAPI or a scheduled worker
- pandas
- scikit-learn
- rank-bm25
- sentence-transformers
- Optional: pgvector client
- Optional: pm4py for conformance-check experiments

### 3.4 PostgreSQL
PostgreSQL is the single primary datastore.

Use:
- Relational tables for institutions, records, events, relationships and threads
- `pg_trgm` for fuzzy name search
- Optional `pgvector` for embedding similarity
- JSONB for evidence payloads and flexible source metadata
- Recursive CTEs for thread traversal
- Append-only tables for events and audit records

Do **not** use Neo4j in the prototype. The graph is a derived view over relational edge tables, not a separate datastore.

## 4. Data flow

```text
Source snapshot
   |
   v
Connector adapter
   |
   v
Schema validation + normalisation
   |
   v
Snapshot diff
   |
   v
Append-only event log
   |
   +--> Institution resolution
   |
   +--> Candidate generation
   |
   +--> Signal scoring
   |
   +--> Relationship proposal
   |
   +--> Abstention / review routing
   |
   v
Review queue
   |
   v
Human decision
   |
   v
Confirmed relationship edge
   |
   v
Matter Thread recomputation
   |
   v
Stage / dependency / deadline evaluation
   |
   v
Coordination Brief
```

## 5. Core data model

```sql
institution (
  id UUID PRIMARY KEY,
  canonical_name TEXT NOT NULL,
  state TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

institution_identifier (
  id UUID PRIMARY KEY,
  institution_id UUID REFERENCES institution(id),
  id_type TEXT NOT NULL,             -- PERMANENT_ID, APPLICATION_ID, etc.
  value TEXT NOT NULL,
  valid_from DATE,
  valid_to DATE,
  source TEXT NOT NULL
);

institution_alias (
  id UUID PRIMARY KEY,
  institution_id UUID REFERENCES institution(id),
  alias TEXT NOT NULL,
  status TEXT NOT NULL,              -- VERIFIED, UNVERIFIED, REJECTED
  verified_by_role TEXT,
  verified_at TIMESTAMPTZ
);

organisation (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  org_type TEXT NOT NULL             -- TRUST, SOCIETY, etc.
);

org_institution_link (
  org_id UUID REFERENCES organisation(id),
  institution_id UUID REFERENCES institution(id),
  valid_from DATE,
  valid_to DATE,
  source TEXT
);

campus (
  id UUID PRIMARY KEY,
  institution_id UUID REFERENCES institution(id),
  name TEXT,
  location TEXT
);

source_system (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  owner_bureau TEXT NOT NULL,
  freshness_sla_hours INTEGER
);

source_record (
  id UUID PRIMARY KEY,
  source_system_id UUID REFERENCES source_system(id),
  source_ref TEXT NOT NULL,
  kind TEXT NOT NULL,                -- COMPLAINT, ADMIN_CASE, PROCEEDING, COURT_CASE
  bureau_id TEXT,
  status_raw TEXT,
  status_norm TEXT,
  opened_at TIMESTAMPTZ,
  sensitivity_label TEXT NOT NULL,
  last_seen_at TIMESTAMPTZ
);

record_target (
  record_id UUID REFERENCES source_record(id),
  institution_id UUID REFERENCES institution(id),
  campus_id UUID REFERENCES campus(id),
  resolution_method TEXT NOT NULL,
  resolution_confidence NUMERIC
);

record_relation (
  id UUID PRIMARY KEY,
  from_record UUID REFERENCES source_record(id),
  to_record UUID REFERENCES source_record(id),
  rel_type TEXT NOT NULL,
  state TEXT NOT NULL,               -- PROPOSED, CONFIRMED, REJECTED, DEFERRED, SUPERSEDED
  confidence NUMERIC,
  evidence JSONB,
  rule_version TEXT,
  model_version TEXT,
  proposed_at TIMESTAMPTZ,
  reviewer_role TEXT,
  decision TEXT,
  decided_at TIMESTAMPTZ,
  rejected_reason TEXT,
  superseded_by UUID
);

thread (
  id UUID PRIMARY KEY,
  institution_id UUID REFERENCES institution(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

thread_member (
  thread_id UUID REFERENCES thread(id),
  record_id UUID REFERENCES source_record(id),
  valid_from TIMESTAMPTZ,
  valid_to TIMESTAMPTZ,
  basis_relation_id UUID REFERENCES record_relation(id)
);

proceeding (
  id UUID PRIMARY KEY,
  thread_id UUID REFERENCES thread(id),
  kind TEXT NOT NULL,
  rule_edition TEXT NOT NULL
);

stage_instance (
  id UUID PRIMARY KEY,
  proceeding_id UUID REFERENCES proceeding(id),
  stage_code TEXT NOT NULL,
  entered_at TIMESTAMPTZ,
  exited_at TIMESTAMPTZ
);

event (
  id UUID PRIMARY KEY,
  record_id UUID REFERENCES source_record(id),
  type TEXT NOT NULL,
  ts_source TIMESTAMPTZ,
  ts_ingested TIMESTAMPTZ DEFAULT now(),
  actor_role TEXT,
  bureau_id TEXT,
  payload JSONB
);

transfer (
  event_id UUID REFERENCES event(id),
  from_bureau TEXT,
  to_bureau TEXT,
  accepted_event_id UUID
);

evidence_ref (
  id UUID PRIMARY KEY,
  record_id UUID REFERENCES source_record(id),
  doc_type TEXT,
  source_doc_id TEXT,
  doc_date DATE,
  content_hash TEXT
);

deadline (
  id UUID PRIMARY KEY,
  record_id UUID REFERENCES source_record(id),
  stage_id UUID REFERENCES stage_instance(id),
  rule_id TEXT,
  due_at TIMESTAMPTZ,
  status TEXT
);

dependency (
  id UUID PRIMARY KEY,
  waiting_stage_id UUID REFERENCES stage_instance(id),
  needs_event_type TEXT,
  source_rule_id TEXT
);

audit_log (
  id UUID PRIMARY KEY,
  ts TIMESTAMPTZ DEFAULT now(),
  actor_role TEXT,
  action TEXT,
  object_ref TEXT,
  prev_hash TEXT,
  hash TEXT
);
```

## 6. Relationship model

| Relationship | Meaning | Merge behaviour |
|---|---|---|
| `DUPLICATE_INTAKE` | Same submission repeated through another channel | Group, retain both records |
| `SAME_MATTER` | Different records about the same factual issue | Join into one Matter Thread |
| `SAME_PROCEDURAL_CHAIN` | Records representing stages of one proceeding | Join into one procedural lineage |
| `RELATED_BUT_INDEPENDENT` | Related theme but separate proceedings | Show as related, do not merge |
| `INDEPENDENT_COMPLAINT` | No connection beyond institution | Keep separate |
| `UNKNOWN` | Insufficient or conflicting evidence | Explicit final state; route to review if needed |

## 7. Matching pipeline

```text
Normalisation
   |
   v
Institution resolution
   |
   v
Candidate blocking
   |
   v
Signal extraction
   |
   v
Scoring
   |
   v
Relationship typing
   |
   v
Calibration
   |
   v
Abstention / routing
   |
   v
Human review
   |
   v
Thread recomputation
```

### Signals
- Exact Permanent ID
- Exact case or notice reference
- Shared evidence reference
- Named entities: programme, academic year, faculty identifier
- BM25 lexical similarity
- Embedding similarity
- Optional cross-encoder reranking
- Temporal ordering and proximity
- Procedural plausibility from stage rules

### Hard rules
1. Exact identifiers run first.
2. Embeddings only rank the review queue.
3. Similarity alone never confirms a link.
4. Source-declared links are still shown for confirmation.
5. Records are never merged into one row.
6. Ambiguous identity forces abstention.
7. Conflicting dates or statuses force a flag, not an automatic resolution.

## 8. Security architecture

### Access control
Use role-based access control plus attribute-based rules.

Roles:
- PGRC officer
- RB officer
- Legal officer
- Vigilance officer
- e-Governance administrator
- Senior reviewer
- Auditor

Attributes:
- Bureau
- Region
- Record sensitivity label
- Assignment
- Stated purpose

Default policy: **deny**.

### Field-level visibility
- Complainant identity is masked by default.
- Cross-Bureau users see restricted matters as existence, stage and holder only.
- Detailed access requires a logged request approved by the owning Bureau.
- Evidence is stored as references and hashes, not full document bodies.

### Audit trail
- Append-only audit table.
- Each row contains the previous row’s hash.
- Database role used for application writes has no `UPDATE` or `DELETE` permission on audit records.
- Log every relationship decision, restricted-item view, export and role change.

Claim **tamper-evident**, not **tamper-proof**.

## 9. Deployment architecture

### Prototype
```text
Local machine / single VM
├── Next.js app
├── Node API
├── Python worker
├── PostgreSQL
└── Synthetic snapshot files
```

### Future AICTE pilot
```text
AICTE-controlled environment
├── Read-only source exports
├── Snapshot drop zone / SFTP / object storage
├── Application services
├── PostgreSQL with encrypted volumes
├── Role-based access
├── Audit export to separate custodian
└── Monitoring and backup
```

## 10. Technology decisions

| Decision | Choice | Reason |
|---|---|---|
| Service style | Modular monolith | Easier to build, debug and hand over |
| Matching service | Separate Python worker | Python ML ecosystem |
| Database | PostgreSQL | One access-control model; sufficient for prototype scale |
| Graph storage | PostgreSQL edge tables | Threads are small connected components |
| Vector search | pgvector or none | Avoid unnecessary infrastructure |
| Frontend | Next.js | Fast UI development |
| AI | Rules + small calibrated classifier | Explainability and auditability |
| LLM | Optional, on-premise, drafting only | No external complaint text; no autonomous decisions |
| Integration | Batch snapshots first | Realistic and demonstrable without internal API access |
