# Tasks — Matter Lineage Ledger

## 1. Immediate deadline tasks
**Deadline: 2 November 2026**

| ID | Task | Owner | Priority | Status |
|---|---|---|---|---|
| T-001 | Copy SIH PS ID, title, theme and category character-for-character into slide 1 | Deck owner | P0 | Todo |
| T-002 | Confirm exact team size and gender-composition requirement with college SPOC/portal | Team lead | P0 | Todo |
| T-003 | Create six-slide deck using the approved slide architecture | Deck owner | P0 | Todo |
| T-004 | Create Coordination Brief mock-up | Frontend/design | P0 | Todo |
| T-005 | Create matching-pipeline diagram | ML/data | P0 | Todo |
| T-006 | Create risk-and-response table | All | P0 | Todo |
| T-007 | Add verified vs assumed reference columns to slide 6 | Research owner | P0 | Todo |
| T-008 | Remove forbidden claims from all slides | Reviewer | P0 | Todo |
| T-009 | Prepare 90-second demo script and backup recording | Demo owner | P1 | Todo |
| T-010 | Run template-compliance check: fonts, file name, slide count, metadata | Deck owner | P0 | Todo |

## 2. Week 1 — Foundation

| ID | Task | Owner | Priority | Dependencies |
|---|---|---|---|---|
| T-011 | Initialise monorepo: `web/`, `api/`, `worker/`, `data/`, `docs/` | Backend | P0 | — |
| T-012 | Set up PostgreSQL schema from architecture document | Backend | P0 | T-011 |
| T-013 | Implement institution, identifier, alias and campus tables | Backend | P0 | T-012 |
| T-014 | Implement source system and source record tables | Backend | P0 | T-012 |
| T-015 | Implement event, transfer and evidence-reference tables | Backend | P0 | T-012 |
| T-016 | Implement relationship, thread and thread-member tables | Backend | P0 | T-012 |
| T-017 | Implement proceeding, stage, deadline and dependency tables | Backend | P0 | T-012 |
| T-018 | Implement audit-log table with hash chaining | Security | P0 | T-012 |
| T-019 | Create synthetic institution generator | Data/ML | P0 | T-012 |
| T-020 | Create synthetic source-record generator | Data/ML | P0 | T-019 |
| T-021 | Create hidden ground-truth matter graph generator | Data/ML | P0 | T-019 |
| T-022 | Implement CSV/JSON snapshot adapter interface | Backend | P0 | T-012 |
| T-023 | Implement schema validation for adapters | Backend | P0 | T-022 |
| T-024 | Implement snapshot diff to append-only event log | Backend | P0 | T-022 |
| T-025 | Implement exact Permanent ID resolution | Data/ML | P0 | T-013 |
| T-026 | Implement verified-alias resolution | Data/ML | P0 | T-013 |
| T-027 | Implement blocked fuzzy institution matching | Data/ML | P1 | T-025 |
| T-028 | Implement resolved / ambiguous / unresolved outcomes | Data/ML | P0 | T-025 |
| T-029 | Implement baseline B0: exact ID and case-number matching | Data/ML | P1 | T-020 |
| T-030 | Implement baseline B1: institution + date-window filter | Data/ML | P1 | T-020 |
| T-031 | Implement baseline B2: BM25 within institution | Data/ML | P1 | T-020 |

## 3. Week 2 — Matching and review

| ID | Task | Owner | Priority | Dependencies |
|---|---|---|---|---|
| T-032 | Implement candidate-pair blocking | Data/ML | P0 | T-025 |
| T-033 | Extract case references, notice numbers and dates from text | Data/ML | P0 | T-020 |
| T-034 | Implement BM25 scoring | Data/ML | P0 | T-032 |
| T-035 | Run embedding-model bake-off | Data/ML | P1 | T-032 |
| T-036 | Select and pin one embedding model | Data/ML | P1 | T-035 |
| T-037 | Implement temporal-order features | Data/ML | P1 | T-033 |
| T-038 | Implement procedural-plausibility features | Data/ML | P1 | T-017 |
| T-039 | Implement rule-based relationship typing | Data/ML | P0 | T-033 |
| T-040 | Implement small calibrated classifier | Data/ML | P1 | T-034 |
| T-041 | Implement confidence calibration | Data/ML | P1 | T-040 |
| T-042 | Implement review-first / review / no-suggestion / unknown tiers | Data/ML | P0 | T-041 |
| T-043 | Implement relationship proposal API | Backend | P0 | T-039 |
| T-044 | Build review queue UI | Frontend | P0 | T-043 |
| T-045 | Implement confirm / reject / defer / reclassify actions | Backend | P0 | T-044 |
| T-046 | Store reviewer, decision, reason and timestamps | Backend | P0 | T-045 |
| T-047 | Implement rejected-pair memory | Backend | P1 | T-045 |
| T-048 | Implement Matter Thread recomputation from confirmed edges | Backend | P0 | T-045 |
| T-049 | Build Matter Thread view | Frontend | P0 | T-048 |
| T-050 | Implement baseline B3: embeddings-only | Data/ML | P1 | T-036 |
| T-051 | Implement baseline B4: embeddings + simple rules | Data/ML | P1 | T-036 |

## 4. Week 3 — Lineage and Brief

| ID | Task | Owner | Priority | Dependencies |
|---|---|---|---|---|
| T-052 | Create versioned stage-rule configuration file | Backend/rules | P0 | T-017 |
| T-053 | Implement complaint-to-appeal stage model | Backend/rules | P0 | T-052 |
| T-054 | Implement current-stage derivation | Backend/rules | P0 | T-053 |
| T-055 | Implement next-stage and waiting-on derivation | Backend/rules | P0 | T-053 |
| T-056 | Implement `UNMAPPED_STAGE` handling | Backend/rules | P0 | T-053 |
| T-057 | Implement `TRANSFER_WITHOUT_ACCEPTANCE` flag | Backend/rules | P0 | T-015 |
| T-058 | Implement `STAGE_WITHOUT_PREREQUISITE` flag | Backend/rules | P0 | T-053 |
| T-059 | Implement `STATUS_CONFLICT_ACROSS_SOURCES` flag | Backend/rules | P0 | T-024 |
| T-060 | Implement `STALE_SOURCE` flag | Backend/rules | P0 | T-024 |
| T-061 | Implement `IDENTITY_CHANGED` flag | Backend/rules | P1 | T-025 |
| T-062 | Implement deadline generation from rules | Backend/rules | P1 | T-053 |
| T-063 | Build Coordination Brief UI | Frontend | P0 | T-049 |
| T-064 | Display source, status and freshness per record | Frontend | P0 | T-063 |
| T-065 | Display current holder and next required action | Frontend | P0 | T-063 |
| T-066 | Display parallel tracks with reasons | Frontend | P0 | T-063 |
| T-067 | Display integrity flags with reason codes | Frontend | P0 | T-063 |
| T-068 | Display relationship evidence and review state | Frontend | P0 | T-063 |
| T-069 | Implement deadline alert list | Frontend/backend | P1 | T-062 |
| T-070 | Implement reports by Bureau, status, stage and flag | Backend/frontend | P1 | T-063 |

## 5. Week 4 — Governance, benchmark and demo

| ID | Task | Owner | Priority | Dependencies |
|---|---|---|---|---|
| T-071 | Implement roles: PGRC, RB, Legal, Vigilance, e-Gov admin, senior reviewer, auditor | Security | P0 | T-012 |
| T-072 | Implement attribute-based access policy | Security | P0 | T-071 |
| T-073 | Implement default-deny authorisation middleware | Security | P0 | T-072 |
| T-074 | Implement complainant masking | Security | P0 | T-072 |
| T-075 | Implement restricted existence-only placeholders | Security/frontend | P0 | T-072 |
| T-076 | Implement logged restricted-access request flow | Backend/frontend | P1 | T-075 |
| T-077 | Implement hash-chained audit writes | Security | P0 | T-018 |
| T-078 | Implement audit viewer for auditors | Frontend | P1 | T-077 |
| T-079 | Create adversarial test families 1–12 | Benchmark/QA | P0 | T-021 |
| T-080 | Create independent adversarial test set | Benchmark/QA | P0 | T-079 |
| T-081 | Implement pairwise false-link-rate metric | Benchmark/QA | P0 | T-079 |
| T-082 | Implement per-type precision/recall and confusion matrix | Benchmark/QA | P0 | T-081 |
| T-083 | Implement abstention rate and selective accuracy | Benchmark/QA | P0 | T-042 |
| T-084 | Implement risk-coverage curve | Benchmark/QA | P1 | T-083 |
| T-085 | Implement handoff-flag precision/recall | Benchmark/QA | P0 | T-079 |
| T-086 | Implement institution-resolution accuracy under ID corruption | Benchmark/QA | P1 | T-079 |
| T-087 | Implement ablations: no embeddings, no procedural rules, no reference matching | Benchmark/QA | P1 | T-081 |
| T-088 | Add bootstrap confidence intervals | Benchmark/QA | P1 | T-081 |
| T-089 | Generate final benchmark report | Benchmark/QA | P0 | T-081 |
| T-090 | Record demo video and prepare offline fallback | Demo owner | P0 | T-063 |
| T-091 | Write handover documentation: schema, rules, APIs, runbook | Backend | P1 | T-063 |
| T-092 | Add open-source licence and dependency licence review | Team lead | P1 | T-011 |

## 6. Benchmark task detail

### Required adversarial families
1. Different descriptions of the same matter  
2. Same institution, unrelated complaints  
3. Same trust, different institutions  
4. PGRC-to-RB procedural handoff  
5. Similar institution names  
6. Appeals and follow-on cases  
7. Transferred cases  
8. Conflicting status timestamps  
9. Repeated evidence requests  
10. Missing, mistyped and changed Permanent IDs  
11. Multilingual and code-mixed complaints  
12. Legitimate parallel tracks  

### Required outputs
- `benchmark/generator.py`
- `benchmark/evaluate.py`
- `benchmark/results/metrics.json`
- `benchmark/results/risk_coverage.png`
- `benchmark/results/confusion_matrix.png`
- `benchmark/README.md`

### Required metric format
```json
{
  "benchmark_version": "v1",
  "seed": 42,
  "records": 1500,
  "matters": 400,
  "institutions": 40,
  "false_link_rate_review_first": null,
  "confidence_interval": null,
  "abstention_rate": null,
  "handoff_flag_recall": null,
  "status": "results_pending"
}
```

## 7. Definition of done

A task is done when:

1. Code is merged to the main branch.
2. It has a test or a documented manual verification step.
3. It does not violate a hard rule.
4. It records required audit events.
5. It displays source provenance where relevant.
6. It uses synthetic data only.
7. It does not introduce a forbidden product claim.
8. It is reproducible from documented commands.

## 8. Sprint ceremony checklist

Before every stand-up:
- What moved from Todo to In Progress?
- What is blocked by AICTE unknowns?
- Which hard rules were touched?
- Which benchmark metric changed?
- What is the next demo-visible increment?

Before submission:
- [ ] Six slides complete
- [ ] Portal metadata exact
- [ ] No forbidden claims
- [ ] All metrics synthetic-labelled or marked pending
- [ ] References working
- [ ] Demo script rehearsed
- [ ] Backup recording available
- [ ] Team members can explain their module and one neighbouring module
