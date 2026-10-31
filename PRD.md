# Product Requirements Document (PRD)  
## Matter Lineage Ledger — SIH26264

### 1. Product summary
**Matter Lineage Ledger** is a read-mostly coordination layer for AICTE’s cross-Bureau complaint intelligence. It helps authorised officers see, for any institution and matter, which Bureau holds what, where the matter sits in the complaint-to-appeal chain, what it is waiting for, and why any two records were linked.

It does **not** replace CSS, eOffice, PGRC, RB, Legal or Vigilance systems. It ingests read-only snapshots, derives coordination state, and presents an explainable, human-reviewable view.

### 2. Problem statement
AICTE’s PS identifies that multiple Bureaus and Cells—such as RB, PGRC and others—may process complaints concerning the same institution. This can create overlap, duplicated action, delay and difficulty identifying the responsible unit.

The core difficulty is not merely displaying complaints. It is determining whether records with different wording, references, dates and source systems relate to the same underlying matter, while preserving legitimate parallel action.

### 3. Goals
| Goal | Measure |
|---|---|
| Make cross-Bureau relationships explicit | Every proposed relationship has a type, evidence, confidence and review state |
| Show procedural position | Each matter displays its current stage in the complaint-to-appeal chain |
| Surface handoff gaps | Transfer-without-acceptance, missing prerequisites and stale sources are flagged |
| Avoid harmful over-linking | Semantic similarity alone never confirms a link; humans approve consequential links |
| Support restricted coordination | Legal/Vigilance matters can appear as existence-only placeholders without exposing detail |
| Remain honest about data limits | All prototype metrics are labelled synthetic; no real AICTE data is claimed |

### 4. Non-goals
- Replacing AICTE source systems
- Automatically closing, transferring or escalating cases
- Automatically merging complaint records
- Claiming real-time integration
- Making compliance claims such as “DPDP-compliant” or “production-ready”
- Deciding whether parallel Bureau action is unlawful
- Sending messages to institutions or complainants

### 5. Target users
| User | Primary need |
|---|---|
| PGRC officer | See related complaints, evidence and pending procedural actions |
| RB officer | See cross-Bureau links and handoff status without losing ownership |
| Legal officer | See that a related restricted matter exists, with controlled access |
| Vigilance officer | Maintain confidentiality while enabling existence-level coordination |
| Senior reviewer | Confirm, reject, defer or reclassify proposed links |
| e-Governance administrator | Manage sources, roles, freshness and audit configuration |
| Auditor | Inspect immutable coordination and access history |

### 6. Core user journeys

#### Journey 1: Resolve an institution
1. Officer searches by name, Permanent ID or application ID.
2. System returns resolved, ambiguous or unresolved identity results.
3. Officer views all source records associated with the institution.
4. System displays identity method and confidence.

#### Journey 2: Review a proposed relationship
1. Matching worker proposes a typed relationship between two records.
2. Reviewer opens the relationship with evidence snippets and score explanation.
3. Reviewer confirms, rejects, changes relationship type or defers.
4. System records reviewer role, decision, timestamp and reason.
5. Matter Thread is recomputed from confirmed edges.

#### Journey 3: Open a Coordination Brief
1. Officer opens a Matter Thread.
2. Brief shows source records, Bureau holders, statuses, freshness and procedural stage.
3. Brief shows the next required action, pending dependencies and deadlines.
4. Brief distinguishes legitimate parallel tracks from handoff-integrity flags.
5. Officer can request access to a restricted matter where policy permits.

#### Journey 4: Detect a handoff failure
1. A transfer event exists from Bureau A to Bureau B.
2. No matching acceptance event is found.
3. System raises a `TRANSFER_WITHOUT_ACCEPTANCE` flag.
4. Brief identifies the expected receiving Bureau and the age of the gap.

### 7. Functional requirements

#### FR-1: Source ingestion
- The system shall ingest CSV/JSON snapshot files through source-specific adapters.
- Each adapter shall validate a documented source schema.
- Each imported record shall retain source system, source reference, Bureau, status, timestamps and sensitivity label.
- The system shall support scheduled batch imports.
- The system shall not write back to source systems in the pilot.

#### FR-2: Institution identity resolution
- The system shall resolve institutions using, in order: exact Permanent ID, verified alias, then blocked fuzzy matching.
- The system shall support resolved, ambiguous and unresolved outcomes.
- The system shall never merge two institution entities based only on name similarity.
- The system shall retain identifier history with valid-from and valid-to dates.

#### FR-3: Relationship proposal
- The system shall generate candidate record pairs within resolved or shortlisted institutions and a configurable time window.
- The system shall score candidates using reference overlap, evidence references, named entities, BM25, embeddings, temporal ordering and procedural plausibility.
- The system shall propose one of: `DUPLICATE_INTAKE`, `SAME_MATTER`, `SAME_PROCEDURAL_CHAIN`, `RELATED_BUT_INDEPENDENT`, `INDEPENDENT_COMPLAINT`, or `UNKNOWN`.
- The system shall assign each proposal to review-first, review, no-suggestion or unknown.

#### FR-4: Human adjudication
- The system shall allow authorised reviewers to confirm, reject, defer or change a proposed relationship.
- The system shall store reviewer role, decision, timestamp, evidence and rejection reason.
- The system shall remember rejected pairs and avoid re-proposing them without new evidence.
- The system shall never merge two source records into one row.

#### FR-5: Matter Thread
- The system shall derive a Matter Thread from confirmed relationship edges.
- A record may belong to at most one current thread but shall retain historical memberships.
- De-linking or splitting a thread shall not rewrite historical events.
- A thread may contain records from multiple Bureaus and source systems.

#### FR-6: Procedural lineage
- The system shall model complaint-to-appeal stages as versioned configuration.
- The system shall attach stage events to proceedings.
- The system shall identify the current stage, next expected stage and waiting dependency.
- Unmapped workflow patterns shall be flagged as `UNMAPPED_STAGE`, not treated as errors.

#### FR-7: Coordination Brief
For each Matter Thread, the system shall display:
- Institution identity and resolution confidence
- Member records with Bureau, source, status and freshness
- Current procedural stage
- Current holder and next required action
- Pending dependencies and deadlines
- Parallel tracks with reasons
- Integrity flags with reason codes
- Relationship evidence and review state
- Restricted matters as access-controlled placeholders

#### FR-8: Integrity flags
The system shall support at least:
- `TRANSFER_WITHOUT_ACCEPTANCE`
- `STAGE_WITHOUT_PREREQUISITE`
- `STATUS_CONFLICT_ACROSS_SOURCES`
- `STALE_SOURCE`
- `IDENTITY_CHANGED`
- `UNMAPPED_STAGE`

#### FR-9: Alerts and deadlines
- The system shall generate deadline alerts from configurable procedural rules.
- Alerts shall identify the affected record, stage, rule and due date.
- Alerts shall be visible in the Brief and a role-scoped alert list.

#### FR-10: Reports
- The system shall provide counts by Bureau, status, stage, thread, flag type and freshness.
- Reports shall distinguish source-owned status from ledger-derived coordination state.

### 8. Non-functional requirements

| Area | Requirement |
|---|---|
| Access control | Role-based access with attribute-based restrictions; default deny |
| Confidentiality | Restricted records show existence-only placeholders unless access is granted |
| Auditability | Append-only, hash-chained audit log for link decisions, restricted access, exports and role changes |
| Data minimisation | Store identifiers, dates, statuses, categories and evidence references; minimise free text |
| Freshness | Every derived status displays source and last-seen timestamp |
| Performance | Prototype must handle the fixed synthetic benchmark scale without external vector database dependency |
| Portability | Standard PostgreSQL, Node/TypeScript and Python stack; no vendor lock-in |
| Explainability | Every link and flag must expose its evidence and rule/model version |
| Security | No external LLM receives complaint text; credentials are never stored in code |

### 9. Data requirements
The prototype uses synthetic data only.

Required synthetic entities:
- Institutions, identifier history, aliases, campuses
- Trusts/societies and institution links
- Source systems and source records
- Complaints, administrative cases, proceedings and court cases
- Events, transfers, evidence references
- Deadlines, dependencies, stages and proceedings
- Reviewer decisions and audit events

The benchmark must include adversarial cases:
- Same matter, different wording
- Same institution, unrelated matters
- Same trust, different institutions
- PGRC-to-RB handoffs
- Similar institution names
- Appeals and follow-ups
- Transfers
- Conflicting statuses
- Repeated evidence requests
- Missing, mistyped or changed IDs
- Multilingual and code-mixed text
- Legitimate parallel tracks

### 10. Success metrics
All metrics are measured on the published synthetic benchmark unless a real pilot is authorised.

| Metric | Definition |
|---|---|
| False-link rate | Incorrect links shown to reviewers at a fixed workload |
| Precision / recall | Per relationship type |
| Abstention rate | Percentage of candidate pairs explicitly marked unknown or not suggested |
| Selective accuracy | Accuracy among non-abstained suggestions |
| Risk-coverage curve | Accuracy as reviewer-facing coverage increases |
| Handoff flag precision/recall | Correct integrity flags against seeded anomalies |
| Institution resolution accuracy | Correct institution resolution under ID corruption |
| Reviewer workload | Queue length per 1,000 records |
| Task completion time | Time to answer “who holds this matter?” and “what is it waiting for?” |

### 11. Pilot boundary
The smallest deployable pilot is:

- PGRC and RB only
- One region
- Read-only snapshot import
- One reviewer role
- Coordination Brief and review queue
- No write-back
- No automatic external communication

### 12. Acceptance criteria
The prototype is accepted when:

1. It ingests at least four synthetic source-system snapshots.
2. It resolves institutions with exact ID, alias and fuzzy paths.
3. It proposes typed relationships with evidence and confidence tiers.
4. It prevents similarity-only automatic confirmation.
5. It supports reviewer confirmation, rejection, deferral and reclassification.
6. It derives Matter Threads from confirmed edges.
7. It renders a Coordination Brief with stage, holder, dependencies, deadlines, flags and freshness.
8. It raises at least the six integrity flags listed above.
9. It records hash-chained audit events.
10. It reports benchmark metrics with baselines and confidence intervals, or clearly states “results pending.”
