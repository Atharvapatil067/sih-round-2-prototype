# Matter Lineage Ledger — UI/UX Design System

**Version:** 2.0  
**Design Direction:** Calm Visual Intelligence  
**Product Type:** Institutional Coordination / Information Management / Workflow Intelligence  
**Platform:** Responsive Web Application  
**Primary Goal:** Make complex matter relationships understandable to everyone.

---

## 1. Design Philosophy

Matter Lineage Ledger should feel:

- Clear
- Trustworthy
- Modern
- Human
- Visual
- Calm
- Easy to understand
- Operationally useful

It should **not** feel like:

- A legacy government portal
- A generic admin dashboard
- An AI-generated SaaS template
- A cybersecurity control panel
- An overly futuristic interface
- An overly technical application
- An entirely white website
- An entirely dark website

### Core Principle

> **Complex system underneath. Simple experience on top.**

The interface should visually answer:

1. What is this?
2. What happened?
3. Where is it now?
4. Is anything wrong?
5. What should happen next?

---

## 2. Design-System Method

Use a systematic design approach rather than styling each page independently.

```text
Primitive Tokens
      ↓
Semantic Tokens
      ↓
Component Tokens
      ↓
Reusable Components
      ↓
Page Composition
```

Every page must use the same visual language.

Do not introduce arbitrary colors, spacing, shadows, radii, or typography on individual screens.

---

## 3. Visual Direction

### Style: Calm Visual Intelligence

Combine:

- Editorial product design
- Modern SaaS
- Information visualization
- Swiss-inspired hierarchy
- Soft institutional aesthetics
- Data storytelling

Prioritize **information clarity over decoration**.

The product should feel premium without becoming visually complicated.

---

## 4. Color Strategy

Do **not** make the entire application white.

Do **not** make the entire application black.

Use three visual layers:

### A. Light Workspace

Use for:

- Tables
- Search
- Institution information
- Reports
- Detailed content

### B. Deep Visual Surface

Use for:

- Hero sections
- Matter Thread visualization
- Major graphs
- Login visual panel
- Product demonstrations

### C. Accent Surface

Use sparingly for:

- Important actions
- Selected states
- Highlights
- Visual explanations
- Key status indicators

---

## 5. Light Theme Tokens

| Token | Value | Usage |
|---|---|---|
| `background` | `#F4F6F8` | Main page background |
| `surface` | `#FFFFFF` | Primary content |
| `surface-secondary` | `#EAF0F4` | Secondary areas |
| `border` | `#D8E0E7` | Dividers and borders |
| `text-primary` | `#152231` | Main text |
| `text-secondary` | `#526273` | Supporting text |
| `text-muted` | `#7C8A99` | Metadata |

---

## 6. Dark Surface Tokens

Use dark surfaces selectively, not as the entire application.

| Token | Value | Usage |
|---|---|---|
| `dark-background` | `#0B1724` | Hero/visual areas |
| `dark-surface` | `#112335` | Dark panels |
| `dark-elevated` | `#172D42` | Elevated dark components |
| `dark-border` | `#284157` | Dark borders |
| `dark-text` | `#F3F7FA` | Primary dark text |
| `dark-text-secondary` | `#A7B8C8` | Supporting dark text |

---

## 7. Brand Colors

### Primary — Teal

`#1EA7A8`

Represents:

- Connection
- Movement
- Clarity
- Technology
- Trust

### Secondary — Sky

`#4AA3DF`

Use for:

- Information
- Links
- Secondary visualization
- Supporting highlights

Avoid aggressive neon colors.

---

## 8. Status Colors

| Status | Color | Meaning |
|---|---|---|
| Success | `#2F9E71` | Verified / completed / healthy |
| Warning | `#D89B32` | Waiting / review required |
| Critical | `#D95C5C` | Integrity issue / blocked |
| Info | `#4A91C7` | Neutral information |

Never communicate a state using color alone.

Always combine color with:

- Icon
- Label
- Text
- Shape
- Position

---

## 9. Typography

### Primary Font

Use **Inter** or **Geist** if already available.

### Typography Principles

- Large, clean headings
- Comfortable body text
- Compact but readable metadata
- Strong numeric hierarchy
- Avoid excessive font weights

### Type Scale

```text
Display XL     48–56px
Display        40–48px
H1             32–40px
H2             24–32px
H3             20–24px
H4             16–18px
Body Large     16px
Body           14–15px
Body Small     13px
Caption        12px
```

Use large display typography mainly for login, hero areas, and major product messages.

---

## 10. Spacing

Use a 4px base system:

```text
4px
8px
12px
16px
20px
24px
32px
40px
48px
64px
80px
96px
```

Avoid arbitrary spacing values.

---

## 11. Border Radius

```text
Small controls:      6px
Inputs:              8px
Cards/panels:        12px
Large visual panels: 16px
```

Avoid excessive pill-shaped interfaces.

Use pills mainly for:

- Status
- Tags
- Filters
- Compact metadata

---

## 12. Elevation

Prefer borders and surface contrast over large shadows.

### Small

`0 2px 8px rgba(15, 30, 45, 0.06)`

### Medium

`0 8px 24px rgba(15, 30, 45, 0.10)`

Do not make every component appear to float.

---

## 13. Application Shell

Desktop structure:

```text
┌──────────────────────────────────────────────────────┐
│ Logo                         Search      User        │
├──────────────┬───────────────────────────────────────┤
│              │                                       │
│ Navigation   │             Main Workspace            │
│              │                                       │
│              │                                       │
└──────────────┴───────────────────────────────────────┘
```

The sidebar should be compact and calm.

Do not overload navigation.

---

## 14. Navigation

Use plain-language labels:

- Overview
- Institutions
- Matters
- Review
- Coordination
- Alerts
- Sources
- Reports
- Activity

Governance/admin functionality may be grouped under **More / Governance** where appropriate.

---

## 15. Global Search

Primary search placeholder:

> Search institutions, matters, or records

Group results:

```text
Institutions

Matter Threads

Source Records
```

Each result should show:

- Name
- Type
- Short contextual description
- Status where relevant

Do not make technical IDs the primary information.

---

## 16. Login Page

The login page is the front door of the product.

Use a two-part composition.

### Visual Side

Use a dark visual surface.

Show:

**Matter Lineage Ledger**

> Follow the matter. Understand the story. Know what happens next.

Include a custom visual:

```text
SOURCE
   ↓
MATTER
 ↙     ↘
ORG     ORG
   ↓
ACTION
```

Use subtle animated connection lines.

### Login Side

Use a light surface.

Show:

**Welcome back**

> Sign in to continue to your workspace.

Fields:

- Email / Institutional ID
- Password

Actions:

- Sign in
- Enter Demo Workspace

Secondary:

- Forgot password
- Institutional login, if supported

Keep authentication simple.

---

## 17. Dashboard Philosophy

The dashboard is not an analytics wall.

It is an **orientation screen**.

The first question should be:

> **What needs my attention right now?**

---

## 18. Dashboard Hero

Example:

# Good morning

**Here's what needs your attention.**

Summary:

```text
12 Active matters
3 Need review
2 Need attention
1 Waiting for confirmation
```

Avoid overly technical KPI terminology.

---

## 19. Dashboard Visualization

The main visual should communicate the movement of matters.

Example:

```text
Received → Review → Transfer → Waiting → Action → Complete
```

Use the actual stages from project requirements.

Show matter counts at each stage.

Make the visualization interactive where appropriate.

---

## 20. Matter Thread

The Matter Thread is the main visual concept of the product.

Do not represent it only as a list.

Use a visual graph:

```text
             Source Record
                  │
                  ▼
          ┌──────────────┐
          │    MATTER    │
          └──────────────┘
             │        │
             ▼        ▼
      Institution A  Institution B
             │
             ▼
         Next Action
```

Use graph nodes with clear visual hierarchy.

---

## 21. Graph Node Design

### Matter

Largest node with strong accent treatment.

### Institution

Medium node with institution icon.

### Source

Document icon and source metadata.

### Procedural Stage

Compact stage node.

### Alert

Warning/critical treatment.

Nodes must be distinguishable without relying only on color.

---

## 22. Graph Interaction

Users should be able to:

- Hover
- Select
- Zoom
- Pan
- Inspect
- Open related information

When selecting a node, show a contextual side panel.

Example:

**Institution Alpha**

> 4 matters are connected to this institution.

Action:

`View institution`

---

## 23. Matter Page

Start with a plain-language summary.

Example:

# Matter MTL-2048

**What is happening?**

> This matter is currently waiting for confirmation after being transferred.

Then:

### Current location

Institution B

### Current stage

Waiting for confirmation

### Next action

Confirm receipt

Technical metadata appears below the primary explanation.

---

## 24. Coordination Brief

This is the primary action-oriented page.

Start with:

# What is happening with this matter?

Then:

### Current situation

A short explanation.

### Where is it?

Current holder.

### What is it waiting for?

Dependency.

### What should happen next?

Primary action.

### Is anything wrong?

Integrity/alert status.

### Deadline

If applicable.

---

## 25. Procedural Timeline

Use a visual timeline:

```text
✓ Received
   │
✓ Reviewed
   │
● Transferred
   │
⚠ Waiting for confirmation
   │
○ Next action
```

Each stage should include:

- Title
- Short explanation
- Timestamp where available

Avoid unexplained technical labels.

---

## 26. Evidence Panel

When users inspect a relationship:

# Why are these connected?

Provide:

- Evidence
- Source
- Supporting records
- Relationship state
- Relevant rule/version

Use progressive disclosure.

Technical details should not overwhelm the user.

---

## 27. Review Experience

Use a human-readable review structure.

# Review this relationship

**Institution A ↔ Institution B**

> These records may refer to the same matter.

### Why?

- Supporting record
- Identifier
- Source evidence

Then:

**What do you want to do?**

`Confirm`

`Reject`

`View evidence`

Only show actions supported by project rules.

---

## 28. Alert Design

Instead of exposing only:

`TRANSFER_WITHOUT_ACCEPTANCE`

show:

# Transfer needs confirmation

> The matter was transferred, but the receiving side has not confirmed it yet.

Then:

**From**

Institution A

**To**

Institution B

**Next step**

Confirm receipt

Technical rule identifiers appear as secondary metadata.

---

## 29. Source Record Design

A source record should look like a meaningful record rather than an accounting row.

Show:

- Source
- Record name/ID
- Type
- Last updated
- Freshness
- Connection to matter

Use document-like visual treatment.

---

## 30. Institution Page

Start with:

# Institution Alpha

> Here's what is currently connected to this institution.

Visual summary:

```text
4 Matters
7 Source Records
2 Related Institutions
1 Action Needed
```

Then show relationships.

---

## 31. Reports

Reports should tell a story.

Prefer:

- Trends
- Distributions
- Stage progression
- Bottlenecks
- Freshness
- Review outcomes

Every chart must answer a real question.

Do not add charts purely for decoration.

---

## 32. Empty States

Every empty state should explain:

1. What is empty?
2. Why is it empty?
3. What can the user do?

Example:

# No matters need review

> Everything is currently up to date.

Use a small relevant illustration.

---

## 33. Illustration Style

Use one consistent illustration language:

- Geometric
- Editorial
- Minimal
- Abstract
- Line-based
- Connected-node motifs

Visuals may contain:

- Documents
- Nodes
- Arrows
- Institutions
- Timelines

Avoid:

- Random stock photos
- Generic business people
- Unrelated 3D illustrations
- Excessive gradients
- Cartoon mascots
- Decorative blobs

---

## 34. Visual Backgrounds

Use subtle visual backgrounds in selected areas:

- Faint grids
- Connection lines
- Dots
- Document outlines
- Network patterns

Keep opacity low.

Background visuals must never interfere with readability.

---

## 35. Component Principles

Create reusable components such as:

```text
AppShell
Topbar
Sidebar
GlobalSearch
StatusBadge
FreshnessIndicator
InstitutionCard
MatterSummary
MatterGraph
SourceRecord
EvidencePanel
ReviewPanel
CoordinationBrief
StageTimeline
AlertCard
ActivityFeed
DataTable
EmptyState
LoadingState
```

Components should use semantic design tokens.

---

## 36. Buttons

### Primary

Solid brand accent.

### Secondary

Outlined or subtle surface.

### Tertiary

Text button.

### Danger

Reserved for destructive/rejection actions.

Use action-oriented labels:

- Review
- Confirm
- View evidence
- Continue
- Open matter
- View institution

---

## 37. Forms

Forms must have:

- Visible labels
- Helper text where needed
- Validation
- Clear error messages
- Appropriate input types

Do not rely on placeholder text as labels.

---

## 38. Tables

Use tables when users need:

- Comparison
- Scanning
- Sorting
- Filtering

Provide:

- Clear headers
- Row hover
- Sensible density
- Responsive behavior
- Empty state
- Pagination where needed

Tables should not dominate the entire product.

---

## 39. Accessibility

Requirements:

- Keyboard navigation
- Visible focus
- Semantic HTML
- Accessible dialogs
- Accessible tables
- Form labels
- Sufficient contrast
- No color-only meaning
- Reduced-motion support
- Minimum touch target around 44px

---

## 40. Responsive Design

### Desktop

Full sidebar and multi-column workspace.

### Tablet

Reduced navigation and flexible layouts.

### Mobile

Prioritize:

1. Current status
2. Attention required
3. Next action
4. Details

Graphs may become horizontally scrollable or stacked.

Tables should become cards or controlled horizontal scrolling.

---

## 41. Motion

Motion should explain relationships.

Use:

- 150–250ms UI transitions
- Subtle graph highlighting
- Drawer transitions
- Page transitions
- Timeline state transitions

Avoid:

- Bouncing UI
- Constant floating animations
- Excessive parallax
- Decorative motion

Respect `prefers-reduced-motion`.

---

## 42. Iconography

Use Lucide or the existing icon system.

Recommended semantic icons:

- Search
- Building
- File
- GitBranch
- Clock
- Check
- AlertTriangle
- ArrowRight
- Eye
- Shield
- Activity
- User

Do not use emoji as UI icons.

---

## 43. Information Hierarchy

Every screen follows:

```text
LEVEL 1
What is happening?

LEVEL 2
Why is it happening?

LEVEL 3
What should I do?

LEVEL 4
Technical details
```

Never reverse this hierarchy.

---

## 44. UX Language

Prefer:

**Needs review**

over:

**Pending relationship validation**

Prefer:

**Waiting for confirmation**

over:

**Acceptance state unresolved**

Prefer:

**Source hasn't been updated recently**

over:

**Source freshness threshold exceeded**

Prefer:

**Why are these connected?**

over:

**Relationship provenance**

Technical terminology can remain available in secondary details.

---

## 45. Anti-Patterns

Never introduce:

- All-white layouts
- All-black layouts
- Excessive glassmorphism
- Excessive gradients
- Purple AI gradients
- Giant hero text
- Excessive rounded cards
- Card grids for everything
- Random stock images
- Decorative 3D objects
- Emoji icons
- Unexplained technical jargon
- Excessive shadows
- Tiny low-contrast text
- Color-only status indicators
- Giant tables as the primary experience
- Unnecessary charts
- Excessive animation
- Huge empty areas
- Unnecessary popups
- Complicated navigation

---

## 46. Design Quality Checklist

Before completing a page, verify:

### Visual

- Clear hierarchy
- Balanced composition
- Sufficient contrast
- Not overly white
- Not overly dark
- Useful visuals

### UX

- New users can understand the page
- Next action is obvious
- Technical terms are explained
- Information is logically grouped

### Accessibility

- Sufficient contrast
- Keyboard accessible
- States understandable without color

### Responsive

- 1440px
- 1024px
- 768px
- 375px

---

## 47. Product Experience Goal

### First 5 seconds

The user understands:

> This system helps me understand where a matter is and what needs to happen next.

### First 30 seconds

The user understands:

> Records and institutions are connected into a matter, and I can trace that relationship.

### First 2 minutes

The user understands:

> I can inspect evidence, review relationships, identify problems, and coordinate the next action.

---

## 48. Final Design Statement

Matter Lineage Ledger is not primarily a dashboard.

It is a **visual story of a matter**.

The interface should make the story visible:

```text
WHERE IT STARTED
       ↓
WHAT IT CONNECTED TO
       ↓
WHAT HAPPENED
       ↓
WHERE IT IS NOW
       ↓
WHAT IS BLOCKING IT
       ↓
WHAT SHOULD HAPPEN NEXT
```

The underlying system may be complex.

The interface must not be.

> **Make complexity understandable.**  
> **Make relationships visible.**  
> **Make the next action obvious.**  
> **Use visual design to explain, not decorate.**
