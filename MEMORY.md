# Project Memory — Matter Lineage Ledger

## 1. Project identity
- **Project:** Matter Lineage Ledger
- **Problem statement:** SIH26264 — AICTE cross-Bureau institution complaint intelligence
- **Theme:** Smart Automation
- **Category:** Software
- **Deadline:** 2 November 2026
- **Current phase:** Idea-round deck and prototype planning
- **Data status:** Synthetic data only; no authorised AICTE internal data available

## 2. Core product idea
A read-mostly coordination layer that gives authorised officers, per institution and per matter, a verified, explainable account of:

- Which Bureau holds what
- Where the matter sits in AICTE’s complaint-to-appeal chain
- What the matter is waiting for
- Why any two records were linked
- Whether a handoff failed or a source is stale

The central artefact is the **Coordination Brief**.

## 3. Key terminology

| Term | Meaning |
|---|---|
| Source record | One row from a source system: complaint, administrative case, proceeding or court case |
| Matter Thread | A human-curated set of records joined by confirmed typed edges |
| Relationship edge | A typed, versioned, evidence-bearing connection between two records |
| Coordination Brief | One-page operational view of a Matter Thread |
| Procedural lineage | Position of a matter in the complaint-to-appeal chain |
| Handoff integrity | Whether a transfer, stage transition or dependency completed correctly |
| Abstention | Explicit refusal to suggest a link when evidence is insufficient |
| False link | An incorrect relationship shown to a reviewer |
| Freshness | Time since a source last reported a record |

## 4. Confirmed domain facts
- Complaints about approved institutions are handled through AICTE’s Grievance/Public Grievance Redressal machinery and placed before the Standing Complaint Scrutiny Committee (SCSC).
- On SCSC recommendation, AICTE may issue a warning/show-cause notice or conduct an Expert Visit Committee (EVC).
- EVC reports or show-cause replies may proceed to the Standing Hearing Committee (SHC), then the Executive Committee.
- Institutions may appeal under the applicable Approval Process Handbook clause to the Standing Appellate Committee.
- AICTE’s Centralized Support System (CSS) was launched in December 2021 for grievances, queries and suggestions.
- PGRC handles norm-violation complaints, court-related matters, Parliament questions and RTI matters.
- Vigilance covers matters relating to AICTE officers/staff and approved institutions.
- Public documents show at least two identifier families: a 7-digit-style AICTE ID and an 11-digit application ID.
- Committee appointment rules changed for 2026-27, so procedural rules must be version-aware.

## 5. Important unknowns
Do **not** treat these as facts:

- Whether AICTE already has a common matter identifier across CSS, PGRC, RB and Legal
- Whether CSS links internally to PGRC files
- How RB actually handles complaints
- What “Legal Soft” contains
- Whether source systems expose case-level exports
- Whether transfer and acceptance events are recorded with timestamps
- Whether Legal and Vigilance can share even existence-level information
- The exact current APH clause number for complaint hearings
- Real-world frequency of cross-Bureau overlap

## 6. Design decisions

| Decision | Choice | Reason |
|---|---|---|
| Identity model | Institution + identifier history + verified aliases | Permanent ID may be missing, changed or mistyped |
| Matter model | Derived Matter Thread, not a stored master ID | Avoids creating a new source of truth |
| Relationship model | Typed edges with evidence and review state | Makes links auditable and reversible |
| Graph storage | PostgreSQL edge tables | Sufficient scale; simpler security model |
| Matching | Rules + BM25 + embeddings + calibrated classifier | Explainable and testable |
| AI boundary | Embeddings rank; humans decide | Prevents harmful automated linking |
| Integration | Batch snapshots first | Realistic without internal API access |
| LLM use | Optional drafting only, never link decision | Governance and confidentiality |
| Access model | RBAC + ABAC, default deny | Supports Bureau confidentiality |
| Audit | Hash-chained append-only log | Tamper-evident coordination history |

## 7. Relationship taxonomy
- `DUPLICATE_INTAKE`
- `SAME_MATTER`
- `SAME_PROCEDURAL_CHAIN`
- `RELATED_BUT_INDEPENDENT`
- `INDEPENDENT_COMPLAINT`
- `UNKNOWN`

## 8. Integrity flags
- `TRANSFER_WITHOUT_ACCEPTANCE`
- `STAGE_WITHOUT_PREREQUISITE`
- `STATUS_CONFLICT_ACROSS_SOURCES`
- `STALE_SOURCE`
- `IDENTITY_CHANGED`
- `UNMAPPED_STAGE`

## 9. Claims policy

### Allowed claims
- “We make cross-Bureau relationships explicit, explainable and reviewable.”
- “We measure false links on a published synthetic benchmark.”
- “We are a domain-specific coordination layer for AICTE’s complaint chain.”
- “Snapshot-based; event-driven ready.”
- “We make handoff gaps visible to the officer who can act.”

### Forbidden claims
- “First-of-its-kind”
- “AI-powered duplicate detection”
- “Real-time AICTE integration”
- “Prevents all duplicated actions”
- “Reduces processing time by 80%”
- “99% accuracy”
- “Single source of truth”
- “DPDP-compliant”
- “Government-grade secure”
- “Production-ready”

## 10. Benchmark rules
- Use synthetic institutions only; never publish fabricated complaints against real named colleges.
- Generate a hidden matter graph first, then render records from it.
- Split train/validation/test by institution and template family, not randomly by record.
- Maintain an adversarial test set authored by someone who did not build the matcher.
- Always show baselines: exact ID, dashboard filter, BM25, embeddings-only, embeddings + rules, full pipeline.
- Report false-link rate first, then precision/recall, abstention, selective accuracy and confidence intervals.
- Label every number as synthetic.
- If a result does not exist, write “results pending.”

## 11. Team ownership
| Area | Responsibility |
|---|---|
| Data and ML | Synthetic generator, matching, calibration, evaluation |
| Backend and rules | API, schema, procedural rules, event log |
| Frontend | Institution view, thread view, Brief, review queue |
| Benchmark and QA | Adversarial cases, metrics, reproducibility |
| Security and governance | RBAC/ABAC, masking, audit, data minimisation |
| Domain research and deck | AICTE research, references, slide narrative |

## 12. Demo narrative
1. Open one synthetic institution with records in PGRC, RB and Legal.
2. Show a proposed same-matter link with evidence.
3. Reject a related-but-independent pair.
4. Confirm a valid link.
5. Open the Coordination Brief.
6. Show a transfer-without-acceptance flag.
7. Close: “We do not replace AICTE systems; we make cross-Bureau coordination explicit, explainable and reviewable.”

## 13. Open questions for AICTE
1. Is there already a common matter/case identifier?
2. Can PGRC and RB provide periodic case-level exports?
3. Are transfer and acceptance events timestamped?
4. Does RB follow the SCSC-based complaint chain?
5. Can Legal/Vigilance expose existence-only coordination data?
6. What are the current APH clause numbers?
7. What hosting, CERT-In and data-localisation requirements apply?
8. Are there labelled historical examples of related complaints, transfers or appeals?
