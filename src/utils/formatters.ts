// Plain-language formatters conforming to UX Principles in PRD and design_v2.md

import { RelationshipType, IntegrityFlagType, NormalizedStatus, ConfidenceTier } from '../types';

export function formatRelationshipType(type: RelationshipType): { label: string; plainDesc: string } {
  switch (type) {
    case 'SAME_MATTER':
      return {
        label: 'Same factual matter',
        plainDesc: 'Different source records describe the same underlying grievance or violation.',
      };
    case 'DUPLICATE_INTAKE':
      return {
        label: 'Duplicate submission',
        plainDesc: 'Identical complainant or complaint text repeated through another channel.',
      };
    case 'SAME_PROCEDURAL_CHAIN':
      return {
        label: 'Same process chain',
        plainDesc: 'Sequential stages of the same official proceeding (e.g., scrutiny to inquiry).',
      };
    case 'RELATED_BUT_INDEPENDENT':
      return {
        label: 'Related, separate action',
        plainDesc: 'Connects to a similar issue or trust, but must proceed on its own track.',
      };
    case 'INDEPENDENT_COMPLAINT':
      return {
        label: 'Independent matter',
        plainDesc: 'Separate complaint that merely shares the same institution.',
      };
    case 'UNKNOWN':
      return {
        label: 'Unknown / insufficient evidence',
        plainDesc: 'Signals disagree or data is insufficient to infer a connection safely.',
      };
  }
}

export function formatIntegrityFlag(flag: IntegrityFlagType): {
  title: string;
  badge: string;
  explanation: string;
  actionText: string;
} {
  switch (flag) {
    case 'TRANSFER_WITHOUT_ACCEPTANCE':
      return {
        title: 'Transfer not accepted',
        badge: 'Transfer pending',
        explanation: 'A bureau transferred this file, but the receiving bureau has not acknowledged or accepted receipt.',
        actionText: 'Receiving bureau must confirm receipt in the coordination brief',
      };
    case 'STATUS_CONFLICT_ACROSS_SOURCES':
      return {
        title: 'Conflicting information across sources',
        badge: 'Status conflict',
        explanation: 'Two source systems report contradictory statuses for this matter. Neither is silently overwritten.',
        actionText: 'Review source timestamps and verify current authoritative disposition',
      };
    case 'STALE_SOURCE':
      return {
        title: 'Source record needs freshness check',
        badge: 'Stale source',
        explanation: 'This source system has not synchronized or updated this record within its configured SLA.',
        actionText: 'Trigger an ad-hoc sync or verify with the owning bureau custodian',
      };
    case 'STAGE_WITHOUT_PREREQUISITE':
      return {
        title: 'Prerequisite step missing',
        badge: 'Prerequisite gap',
        explanation: 'The matter advanced to a later stage without recording the mandated prior procedural milestone.',
        actionText: 'Inspect SCSC scrutiny records or attach prerequisite verification event',
      };
    case 'IDENTITY_CHANGED':
      return {
        title: 'Institution identifier updated',
        badge: 'Identifier changed',
        explanation: 'An institution identifier changed after links were derived; links must be re-scored.',
        actionText: 'Verify permanent ID validity against AICTE master approved directory',
      };
    case 'UNMAPPED_STAGE':
      return {
        title: 'Unmapped procedural event',
        badge: 'Unmapped workflow',
        explanation: 'An event was recorded outside standard APH committee rules. Treated as unmapped, not fatal.',
        actionText: 'Classify procedural event under current APH edition',
      };
  }
}

export function formatStatusNorm(status: NormalizedStatus): { label: string; color: string; bg: string } {
  switch (status) {
    case 'PENDING_SCRUTINY':
      return { label: 'Under Scrutiny (SCSC)', color: 'text-amber-800', bg: 'bg-amber-100' };
    case 'INVESTIGATION_ONGOING':
      return { label: 'Inquiry Ongoing', color: 'text-blue-800', bg: 'bg-blue-100' };
    case 'TRANSFERRED_PENDING_RECEIPT':
      return { label: 'Transferred (Pending Receipt)', color: 'text-rose-800', bg: 'bg-rose-100' };
    case 'HEARING_SCHEDULED':
      return { label: 'Hearing Scheduled (SHC)', color: 'text-purple-800', bg: 'bg-purple-100' };
    case 'ORDER_RESERVED':
      return { label: 'Order Reserved', color: 'text-indigo-800', bg: 'bg-indigo-100' };
    case 'CLOSED_FORWARDED':
      return { label: 'Forwarded / Disposed in Source', color: 'text-slate-800', bg: 'bg-slate-100' };
    case 'CLOSED_RESOLVED':
      return { label: 'Resolved & Closed', color: 'text-emerald-800', bg: 'bg-emerald-100' };
    case 'RESTRICTED_INQUIRY':
      return { label: 'Restricted In-Camera Proceeding', color: 'text-violet-900', bg: 'bg-violet-100' };
  }
}

export function formatConfidenceTier(tier: ConfidenceTier): { label: string; badgeClass: string } {
  switch (tier) {
    case 'REVIEW_FIRST':
      return { label: 'Priority Review', badgeClass: 'bg-amber-50 text-amber-700 border-amber-300' };
    case 'REVIEW':
      return { label: 'Routine Review', badgeClass: 'bg-blue-50 text-blue-700 border-blue-300' };
    case 'NO_SUGGESTION':
      return { label: 'No Suggestion', badgeClass: 'bg-slate-50 text-slate-600 border-slate-300' };
    case 'UNKNOWN':
      return { label: 'Abstained (Unknown)', badgeClass: 'bg-gray-100 text-gray-700 border-gray-300' };
  }
}

export function formatDate(isoStr: string): string {
  try {
    const d = new Date(isoStr);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return isoStr;
  }
}

export function formatDateTime(isoStr: string): string {
  try {
    const d = new Date(isoStr);
    return `${d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} at ${d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;
  } catch {
    return isoStr;
  }
}

