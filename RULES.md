# Rules — Matter Lineage Ledger

## 1. Purpose
These rules define the invariant behaviour of the system. They are intended to be implemented partly in code, partly as versioned configuration, and partly as review policy.

Rule categories:
- **Hard rule:** must never be violated
- **Procedural rule:** evaluated from stage/dependency configuration
- **Governance rule:** access, privacy and audit behaviour
- **Evaluation rule:** benchmark and claim discipline

## 2. Identity rules

### R-ID-01 — Permanent ID first
**Hard rule.**  
If a valid Permanent ID exactly matches an institution identifier, use it as the primary identity signal.

### R-ID-02 — Alias verification
**Procedural rule.**  
An alias may resolve an institution only if its status is `VERIFIED`.

### R-ID-03 — No name-only merge
**Hard rule.**  
Two institution entities must never be merged based only on name similarity.

### R-ID-04 — Ambiguity forces abstention
**Hard rule.**  
If institution resolution returns multiple plausible institutions, relationship proposals must be routed to review or marked `UNKNOWN`.

### R-ID-05 — Preserve identifier history
**Hard rule.**  
Identifier corrections must be recorded with valid-from and valid-to dates. Do not overwrite historical identifiers.

### R-ID-06 — Identity-change flag
**Procedural rule.**  
If an identifier changes and existing links depend on the old identifier, raise `IDENTITY_CHANGED` and re-score affected links.

## 3. Relationship rules

### R-REL-01 — Similarity cannot confirm
**Hard rule.**  
Semantic similarity alone must never create a confirmed relationship.

### R-REL-02 — Evidence required
**Hard rule.**  
Every proposed relationship must contain at least one evidence reference, extracted signal, rule explanation or model-version attribution.

### R-REL-03 — Typed relationships only
**Hard rule.**  
Every relationship must have exactly one active type:

- `DUPLICATE_INTAKE`
- `SAME_MATTER`
- `SAME_PROCEDURAL_CHAIN`
- `RELATED_BUT_INDEPENDENT`
- `INDEPENDENT_COMPLAINT`
- `UNKNOWN`

### R-REL-04 — No record merging
**Hard rule.**  
Two source records must never be collapsed into one database row. Only edges and thread membership change.

### R-REL-05 — Source-declared links need review
**Procedural rule.**  
If a source record cites another case number, create a `SOURCE_DECLARED` evidence signal, but still route the relationship for human confirmation.

### R-REL-06 — Rejected pairs are remembered
**Procedural rule.**  
A rejected pair must not be re-proposed unless new evidence, a new rule version or a new model version is available.

### R-REL-07 — Parallel action is not duplication
**Hard rule.**  
A court matter, vigilance matter and complaint proceeding may be legitimate parallel tracks. They must be labelled as parallel, not automatically flagged as duplicates.

### R-REL-08 — Same institution is not same matter
**Hard rule.**  
Records concerning the same institution must not be linked solely because they share that institution.

## 4. Abstention rules

### R-ABS-01 — Confidence tiers
**Procedural rule.**  
Every candidate must fall into one of:

- `REVIEW_FIRST`
- `REVIEW`
- `NO_SUGGESTION`
- `UNKNOWN`

### R-ABS-02 — Embeddings-only is insufficient
**Hard rule.**  
If the only supporting signal is embedding similarity, the system must not propose a confirmed link.

### R-ABS-03 — Conflicting evidence forces abstention
**Procedural rule.**  
Abstain when:
- Top signals disagree
- Institution identity is ambiguous
- Source dates conflict materially
- Text language is unvalidated
- Statuses conflict across sources

### R-ABS-04 — Thresholds come from false-link budget
**Evaluation rule.**  
Set review thresholds from a target false-link budget on validation data, not from raw accuracy.

### R-ABS-05 — Unknown is valid
**Hard rule.**  
`UNKNOWN` is a valid final outcome and must be visible in the UI.

## 5. Procedural lineage rules

### R-PROC-01 — Stages are configuration
**Hard rule.**  
Stage definitions, transitions and dependencies must be stored as versioned configuration, not hard-coded application logic.

### R-PROC-02 — Rule edition awareness
**Procedural rule.**  
Every stage evaluation must record the applicable APH/regulation edition or rule version.

### R-PROC-03 — Unmapped does not mean error
**Hard rule.**  
An event or transition not present in the configured model must produce `UNMAPPED_STAGE`, not a system failure.

### R-PROC-04 — Dependency enforcement
**Procedural rule.**  
If stage B requires event X and event X is absent, raise `STAGE_WITHOUT_PREREQUISITE`.

### R-PROC-05 — Transfer acceptance
**Procedural rule.**  
If a transfer event exists without a matching acceptance event, raise `TRANSFER_WITHOUT_ACCEPTANCE`.

### R-PROC-06 — Deadline attribution
**Procedural rule.**  
Every deadline must be traceable to a rule ID, affected record/stage and due date.

## 6. Freshness and status rules

### R-FRESH-01 — Source owns status
**Hard rule.**  
The ledger must not overwrite a source system’s status.

### R-FRESH-02 — Show provenance
**Hard rule.**  
Every displayed status must show its source system and last-seen timestamp.

### R-FRESH-03 — Conflict display
**Procedural rule.**  
When two sources conflict, display both values and raise `STATUS_CONFLICT_ACROSS_SOURCES`. Do not silently choose a winner.

### R-FRESH-04 — Stale source
**Procedural rule.**  
If a source has not reported within its configured freshness SLA, raise `STALE_SOURCE` on dependent Briefs.

## 7. Access and privacy rules

### R-SEC-01 — Default deny
**Hard rule.**  
Access is denied unless a role and attribute policy explicitly permits it.

### R-SEC-02 — Complainant masking
**Hard rule.**  
Complainant identity is masked by default and visible only to an authorised handling-Bureau role.

### R-SEC-03 — Restricted existence-only view
**Governance rule.**  
Cross-Bureau users may see that a restricted Legal or Vigilance matter exists, along with permitted stage/holder fields, only if policy allows.

### R-SEC-04 — Restricted detail requires approval
**Hard rule.**  
Detailed access to a restricted matter requires a logged access request approved by the owning Bureau.

### R-SEC-05 — No external complaint text
**Hard rule.**  
Complaint text must not be sent to an external LLM or third-party AI API.

### R-SEC-06 — LLM cannot decide
**Hard rule.**  
An LLM may draft prose from structured facts only. It must not decide relationships, flags, access or case actions.

### R-SEC-07 — Pseudonymous repeat detection
**Governance rule.**  
Duplicate-intake detection must use a keyed pseudonymous complainant key, such as HMAC, with the key held in a managed secret store.

### R-SEC-08 — Data minimisation
**Governance rule.**  
Store identifiers, dates, statuses, categories and evidence references. Retain only the minimum free-text snippets needed to explain a link.

### R-SEC-09 — No outbound communication
**Hard rule.**  
The system must not contact institutions or complainants.

## 8. Audit rules

### R-AUD-01 — Append-only audit
**Hard rule.**  
Audit records must be append-only.

### R-AUD-02 — Hash chain
**Hard rule.**  
Each audit row must include the previous row’s hash and its own hash.

### R-AUD-03 — Mandatory audit events
**Hard rule.**  
Log:
- Relationship proposal
- Relationship confirmation/rejection/deferral/reclassification
- Restricted-item view
- Access request and approval
- Export
- Role change
- Configuration/rule-version change

### R-AUD-04 — Tamper-evident wording
**Governance rule.**  
Describe the audit mechanism as tamper-evident, not tamper-proof.

## 9. Evaluation rules

### R-EVAL-01 — Synthetic labelling
**Hard rule.**  
Every prototype metric must be labelled synthetic.

### R-EVAL-02 — Baselines mandatory
**Evaluation rule.**  
No model result may be presented without at least one baseline.

Minimum baselines:
- Exact ID/case-number matching
- Institution + date-window dashboard filter
- BM25
- Embeddings-only
- Embeddings + simple rules
- Full staged pipeline

### R-EVAL-03 — False links first
**Evaluation rule.**  
Report false-link rate before overall accuracy.

### R-EVAL-04 — Leakage control
**Hard rule.**  
Split data by institution and template family. Never randomly split records from the same generated matter across train and test.

### R-EVAL-05 — Independent adversarial set
**Evaluation rule.**  
At least one adversarial test family must be authored by a team member who did not build the matcher.

### R-EVAL-06 — No invented results
**Hard rule.**  
If a metric has not been computed, display “results pending.” Never pre-fill a number.

### R-EVAL-07 — Reproducibility
**Evaluation rule.**  
Publish generator version, seed, data scale, model versions, rule versions and evaluation script.

## 10. Product claim rules

### R-CLAIM-01 — No first-of-its-kind
Do not claim novelty for linking, merging, similarity search or AI suggestions.

### R-CLAIM-02 — No duplicate prevention claim
Say “makes duplication and handoff gaps visible,” not “prevents duplication.”

### R-CLAIM-03 — No real-time claim
Say “snapshot-based; event-driven ready.”

### R-CLAIM-04 — No compliance claim
Do not claim DPDP compliance, government-grade security or production readiness.

### R-CLAIM-05 — Domain contribution framing
Describe the contribution as:
> A domain-specific coordination layer for AICTE’s complaint chain, with typed relationships, provenance, procedural lineage and abstention.
