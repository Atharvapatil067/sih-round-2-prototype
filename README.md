# Matter Lineage Ledger — High-Fidelity Prototype

> **Institutional Coordination & Information-Management Platform for AICTE Cross-Bureau Complaint Intelligence (SIH26264)**  
> *"Complex system underneath. Simple experience on top."*

---

## 1. Quick Start

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Launch
```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

Open your browser at `http://localhost:3000` (or the port Vite provides).

---

## 2. Interactive Demo Journey (Step-by-Step)

Follow this 2-minute walkthrough to experience the entire system:

1. **Split-Screen Login Experience**:
   - Notice the deep navy visual canvas on the left displaying abstract connected records, institutional nodes, and timeline flows.
   - On the right, click **"Enter Demo Workspace"** (or use any valid credentials / 1-click role switcher presets like Senior Reviewer, PGRC Officer, Regional Officer, Legal Officer, Auditor).

2. **Overview Dashboard**:
   - See **"What Needs Your Attention"**: highlights the urgent `TRANSFER_WITHOUT_ACCEPTANCE` issue, pending candidate reviews, and upcoming procedural deadlines.
   - Observe the **Procedural Funnel**: CSS Intake → SCSC Scrutiny → EVC Inspection (Blocked Gap) → SHC Hearing → SAC Appeal.

3. **Global Search (`Ctrl+K`)**:
   - Press `Ctrl+K` or click the top search bar.
   - Type `"Apex"` or `"1-4392817"` (Permanent ID).
   - Notice **R-ID-03 compliance**: *Apex Institute of Technology, Pune* and *Apex Institute of Technology & Research, Nagpur* are strictly separated by Permanent ID and never merged based on name similarity.

4. **Institution View**:
   - Open *Apex Institute of Technology, Pune*.
   - View the institution header, Permanent ID history, verified aliases (`R-ID-02`), member source records across CSS, PGRC, RB, Court, and active matter threads.

5. **Matter Thread & Interactive Relationship Network**:
   - Open **Matter MTL-2026-0814**.
   - Interact with the **React Flow graph**: zoom, pan, select nodes (Matter, Institution, Source Records, Stages, Alert).
   - Click on any relationship edge to open the **Evidence Drawer**: inspect BM25 score, cosine similarity, reference overlap, and rule attribution.

6. **Human Adjudication in Review Queue**:
   - Navigate to **Review Queue**.
   - Review proposed candidate pair: *CSS-2026-8812 ↔ PGRC-2026-3390* at Kaveri College.
   - Click **"Confirm as Same factual matter"** or **"Reclassify Type"**.
   - Complete the confirmation dialog with your reviewer reasoning.
   - Notice how the local state updates instantly, the thread is recomputed, and a new **SHA-256 hash-chained entry** is appended to the audit log.

7. **The Showcase Coordination Brief**:
   - Open **Coordination Brief** for **MTL-2026-0814**.
   - Answers the 4 core questions immediately:
     - **1. Currently With:** Regional Officer (Western Regional Office)
     - **2. Where it is in Process:** EVC Inspection Preparation
     - **3. Waiting For:** Acceptance of transfer file by Western Regional Office
     - **4. Next Required Action:** Regional Officer should acknowledge transfer and notify institution of inspection dates (Due 12 Nov 2026).
   - **Parallel Tracks (`R-REL-07`)**: See Track A (SCSC & EVC), Track B (Bombay High Court Writ Petition WP 4120/2026), and Track C (Restricted Vigilance In-Camera Inquiry).
   - **Restricted Matter (`R-SEC-03/04`)**: Test the "Request Full Record Access" dialog with logged statutory justification.

8. **Resolve the Handoff Bottleneck**:
   - On the `TRANSFER_WITHOUT_ACCEPTANCE` banner, click **"Acknowledge Receipt & Clear Handoff Flag"**.
   - The transfer is acknowledged, the matter stage unblocks, and the action is cryptographically recorded.

9. **Immutable Audit Trail (`R-AUD-01/02/04`)**:
   - Navigate to **Audit Log**.
   - Click **"Verify Hash Chain"** to recalculate SHA-256 proofs across all entries.
   - Expand any row to inspect predecessor hash (`prev_hash`), current hash (`hash`), actor role, and JSON payloads.

10. **Regulatory Rules & Reports**:
    - Check **Rules / Governance** to inspect active enforcement of Hard Rules, Procedural Rules, and Governance Editions.
    - Check **Reports** to review the synthetic benchmark comparison table (B0 to B5) with false-link rate discipline.

---

## 3. Technology Stack & Design System

- **Frontend Core**: React 19, TypeScript, Vite
- **Styling & Tokens**: Tailwind CSS conforming to `Matter_Lineage_Ledger_design_v2.md`
  - Light workspace background: `#F4F6F8`
  - Deep visual surfaces: `#0B1724`, `#112335`, `#172D42`
  - Brand accents: Teal `#1EA7A8`, Sky Blue `#4AA3DF`
  - Status tokens: Success `#2F9E71`, Warning `#D89B32`, Critical `#D95C5C`, Info `#4A91C7`
- **Graph Visualization**: `@xyflow/react` (React Flow) with custom semantic node architectures
- **Iconography**: Lucide React
- **Cryptography**: Web Crypto API SHA-256 hash chaining implementation

---

## 4. Key Governance & Rule Alignment

| Document Rule | Implementation in Prototype |
|---|---|
| **R-ID-01 & R-ID-03** | Exact Permanent ID matching; strictly prevents name-only merging of institutions |
| **R-REL-01 & R-REL-02** | Semantic similarity alone never confirms links; Review Queue enforces human sign-off with explicit evidence signals |
| **R-REL-03** | Strict 6-type relationship taxonomy (`SAME_MATTER`, `DUPLICATE_INTAKE`, `SAME_PROCEDURAL_CHAIN`, `RELATED_BUT_INDEPENDENT`, `INDEPENDENT_COMPLAINT`, `UNKNOWN`) |
| **R-REL-07** | Parallel tracks (e.g. High Court Writ Petitions and Vigilance inquiries) are explicitly represented as parallel, not duplicates |
| **R-PROC-05** | `TRANSFER_WITHOUT_ACCEPTANCE` raised when transfers exceed SLA threshold (18 days old) |
| **R-FRESH-01/02/03** | Source systems own their status; conflicting statuses across sources are shown honestly side-by-side |
| **R-SEC-03/04** | Restricted Vigilance matters appear as existence-only placeholders; detailed access requires logged statutory requests |
| **R-AUD-01/02/04** | Tamper-evident append-only audit log with real cryptographic SHA-256 hash chaining |
| **R-EVAL-01/02/03** | All benchmark metrics labelled synthetic; baselines mandatory (B0–B5); false-link rate reported first |

