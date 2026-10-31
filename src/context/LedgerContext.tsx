// Global Interactive State Context for Matter Lineage Ledger
// Handles local mock state, reactive reviews, audit hash chaining, and role switching

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserSession,
  UserRole,
  Institution,
  SourceRecord,
  RecordRelation,
  MatterThread,
  IntegrityAlert,
  AuditLogEntry,
  RelationshipType,
} from '../types';
import {
  SYNTHETIC_USERS,
  SYNTHETIC_INSTITUTIONS,
  SYNTHETIC_SOURCE_RECORDS,
  SYNTHETIC_RELATIONS,
  SYNTHETIC_MATTER_THREADS,
  SYNTHETIC_INTEGRITY_ALERTS,
  SYNTHETIC_AUDIT_LOGS,
} from '../data/syntheticData';
import { generateAuditHash } from '../utils/cryptoHash';

interface LedgerContextType {
  currentUser: UserSession | null;
  currentRole: UserRole;
  isAuthenticated: boolean;
  login: (user?: UserSession) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;

  institutions: Institution[];
  sourceRecords: SourceRecord[];
  relations: RecordRelation[];
  matterThreads: MatterThread[];
  alerts: IntegrityAlert[];
  auditLogs: AuditLogEntry[];

  selectedMatterId: string;
  setSelectedMatterId: (id: string) => void;
  selectedMatter: MatterThread | undefined;

  selectedInstitutionId: string;
  setSelectedInstitutionId: (id: string) => void;
  selectedInstitution: Institution | undefined;

  inspectingRelation: RecordRelation | null;
  setInspectingRelation: (rel: RecordRelation | null) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  activeNav: string;
  setActiveNav: (nav: string) => void;

  // Key operations
  confirmReviewAction: (
    relationId: string,
    decision: 'CONFIRMED' | 'REJECTED' | 'DEFERRED' | 'RECLASSIFIED',
    reclassifiedType?: RelationshipType,
    reason?: string,
    notes?: string
  ) => Promise<void>;

  acknowledgeTransfer: (threadId: string, alertId: string) => Promise<void>;
  requestRestrictedAccess: (matterId: string, justification: string) => Promise<void>;
}

const LedgerContext = createContext<LedgerContextType | undefined>(undefined);

export const LedgerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>('SENIOR_REVIEWER');
  const [institutions, setInstitutions] = useState<Institution[]>(SYNTHETIC_INSTITUTIONS);
  const [sourceRecords, setSourceRecords] = useState<SourceRecord[]>(SYNTHETIC_SOURCE_RECORDS);
  const [relations, setRelations] = useState<RecordRelation[]>(SYNTHETIC_RELATIONS);
  const [matterThreads, setMatterThreads] = useState<MatterThread[]>(SYNTHETIC_MATTER_THREADS);
  const [alerts, setAlerts] = useState<IntegrityAlert[]>(SYNTHETIC_INTEGRITY_ALERTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(SYNTHETIC_AUDIT_LOGS);

  const [selectedMatterId, setSelectedMatterId] = useState<string>('matter-01');
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<string>('inst-01');
  const [inspectingRelation, setInspectingRelation] = useState<RecordRelation | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNav, setActiveNav] = useState<string>('overview');

  // Login & Session handling
  const login = (user?: UserSession) => {
    const active = user || SYNTHETIC_USERS[0]; // Default Senior Reviewer
    setCurrentUser(active);
    setCurrentRole(active.role);
    setActiveNav('overview');
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = async (newRole: UserRole) => {
    setCurrentRole(newRole);
    const matched = SYNTHETIC_USERS.find((u) => u.role === newRole);
    if (matched && currentUser) {
      setCurrentUser(matched);
    }

    // Append tamper-evident audit log for role change per R-AUD-03
    const ts = new Date().toISOString();
    const prevEntry = auditLogs[auditLogs.length - 1];
    const prevHash = prevEntry ? prevEntry.hash : '00000000000000000000000000000000';
    const action = 'USER_ROLE_SWITCH';
    const objectRef = `UserSession:${currentUser?.email || 'officer'}`;
    const payloadStr = JSON.stringify({ oldRole: currentRole, newRole });
    const newHash = await generateAuditHash(prevHash, ts, newRole, action, objectRef, payloadStr);

    const newAuditEntry: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      ts,
      actorRole: newRole,
      actorName: matched?.name || 'Officer',
      action,
      objectRef,
      decision: `Switched perspective to ${newRole}`,
      reason: 'Role switch in demonstration workspace',
      ruleVersion: 'APH-RULE-2026-V1.4',
      prevHash,
      hash: newHash,
      payload: { oldRole: currentRole, newRole },
    };

    setAuditLogs((prev) => [...prev, newAuditEntry]);
  };

  // Review workflow: Confirm / Reject / Defer / Reclassify
  const confirmReviewAction = async (
    relationId: string,
    decision: 'CONFIRMED' | 'REJECTED' | 'DEFERRED' | 'RECLASSIFIED',
    reclassifiedType?: RelationshipType,
    reason?: string,
    notes?: string
  ) => {
    const targetRel = relations.find((r) => r.id === relationId);
    if (!targetRel) return;

    const ts = new Date().toISOString();
    const newRelType =
      decision === 'RECLASSIFIED' && reclassifiedType
        ? reclassifiedType
        : targetRel.proposedType;
    const newState =
      decision === 'CONFIRMED'
        ? 'CONFIRMED'
        : decision === 'REJECTED'
        ? 'REJECTED'
        : decision === 'DEFERRED'
        ? 'DEFERRED'
        : 'CONFIRMED';

    // 1. Update Relations state
    setRelations((prev) =>
      prev.map((r) =>
        r.id === relationId
          ? {
              ...r,
              state: newState,
              relType: newRelType,
              decision,
              reviewerRole: currentRole,
              decidedAt: ts,
              rejectedReason: decision === 'REJECTED' ? reason : undefined,
              reviewerNotes: notes || reason,
            }
          : r
      )
    );

    // 2. If confirmed as SAME_MATTER or SAME_PROCEDURAL_CHAIN, recompute thread per R-REL-04 / FR-5
    if (newState === 'CONFIRMED' && targetRel.targetMatterId) {
      setMatterThreads((prev) =>
        prev.map((th) => {
          if (th.id === targetRel.targetMatterId) {
            const updatedRecordIds = Array.from(
              new Set([...th.recordIds, targetRel.fromRecordId, targetRel.toRecordId])
            );
            return {
              ...th,
              recordIds: updatedRecordIds,
              status: 'ACTIVE_SCRUTINY',
              waitingOn: 'Standing Committee agenda review',
              updatedAt: ts,
            };
          }
          return th;
        })
      );
    }

    // 3. Compute new cryptographic hash for append-only audit trail
    const prevEntry = auditLogs[auditLogs.length - 1];
    const prevHash = prevEntry ? prevEntry.hash : '00000000000000000000000000000000';
    const action = `RELATIONSHIP_${decision}`;
    const objectRef = `RELATION:${relationId} (${targetRel.fromRecordId} ↔ ${targetRel.toRecordId})`;
    const payloadStr = JSON.stringify({
      decision,
      relType: newRelType,
      reason,
      notes,
      ruleVersion: targetRel.ruleVersion,
    });
    const newHash = await generateAuditHash(prevHash, ts, currentRole, action, objectRef, payloadStr);

    const newAuditEntry: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      ts,
      actorRole: currentRole,
      actorName: currentUser?.name || 'Authorized Reviewer',
      action,
      objectRef,
      decision,
      reason: reason || 'Reviewer adjudication in queue',
      ruleVersion: targetRel.ruleVersion,
      prevHash,
      hash: newHash,
      payload: {
        relationId,
        fromRecord: targetRel.fromRecordId,
        toRecord: targetRel.toRecordId,
        finalType: newRelType,
        notes,
      },
    };

    setAuditLogs((prev) => [...prev, newAuditEntry]);
  };

  // Acknowledge Transfer: Directly resolves the TRANSFER_WITHOUT_ACCEPTANCE alert
  const acknowledgeTransfer = async (threadId: string, alertId: string) => {
    const ts = new Date().toISOString();

    // 1. Mark alert as resolved
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, isResolved: true } : a))
    );

    // 2. Update Matter Thread state
    setMatterThreads((prev) =>
      prev.map((th) => {
        if (th.id === threadId) {
          const remainingFlags = th.activeFlags.filter(
            (f) => f !== 'TRANSFER_WITHOUT_ACCEPTANCE'
          );
          // Also advance the stage instance to unblocked!
          const updatedTracks = th.parallelTracks.map((tr) => ({
            ...tr,
            stages: tr.stages.map((st) =>
              st.stageCode === 'STAGE-03-EVC-PENDING'
                ? {
                    ...st,
                    status: 'CURRENT' as const,
                    plainExplanation:
                      'Transfer accepted by Western Regional Office. Expert Visit Committee dates being scheduled.',
                    notes: `Receipt formally acknowledged by ${currentUser?.name || 'Regional Officer'} on ${ts.slice(0, 10)}.`,
                  }
                : st
            ),
          }));

          return {
            ...th,
            activeFlags: remainingFlags,
            hasIntegrityFlag: remainingFlags.length > 0,
            waitingOn: 'Scheduling of Expert Visit Committee (EVC) dates',
            nextRequiredAction: 'Issue notice to institution with inspection team roster',
            updatedAt: ts,
            parallelTracks: updatedTracks,
          };
        }
        return th;
      })
    );

    // 3. Append to Audit log
    const prevEntry = auditLogs[auditLogs.length - 1];
    const prevHash = prevEntry ? prevEntry.hash : '00000000000000000000000000000000';
    const action = 'TRANSFER_ACCEPTANCE_CONFIRMED';
    const objectRef = `MATTER:${threadId} / ALERT:${alertId}`;
    const payloadStr = JSON.stringify({
      bureau: 'Western Regional Office (RB-West)',
      acceptedAt: ts,
      clearedFlag: 'TRANSFER_WITHOUT_ACCEPTANCE',
    });
    const newHash = await generateAuditHash(prevHash, ts, currentRole, action, objectRef, payloadStr);

    const newAuditEntry: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      ts,
      actorRole: currentRole,
      actorName: currentUser?.name || 'Regional Officer',
      action,
      objectRef,
      decision: 'TRANSFER_ACCEPTED',
      reason: 'Regional Office acknowledged intake of physical inspection file',
      ruleVersion: 'APH-RULE-2026-V1.4',
      prevHash,
      hash: newHash,
      payload: { threadId, alertId },
    };

    setAuditLogs((prev) => [...prev, newAuditEntry]);
  };

  // Restricted Access Request (R-SEC-04)
  const requestRestrictedAccess = async (matterId: string, justification: string) => {
    const ts = new Date().toISOString();
    const prevEntry = auditLogs[auditLogs.length - 1];
    const prevHash = prevEntry ? prevEntry.hash : '00000000000000000000000000000000';
    const action = 'RESTRICTED_ACCESS_REQUEST';
    const objectRef = `MATTER:${matterId} (Vigilance In-Camera Item)`;
    const payloadStr = JSON.stringify({ justification, requestedRole: currentRole });
    const newHash = await generateAuditHash(prevHash, ts, currentRole, action, objectRef, payloadStr);

    const newAuditEntry: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      ts,
      actorRole: currentRole,
      actorName: currentUser?.name || 'Officer',
      action,
      objectRef,
      decision: 'ACCESS_REQUEST_LOGGED',
      reason: justification,
      ruleVersion: 'Vigilance & Legal Protocol 2026',
      prevHash,
      hash: newHash,
      payload: { justification, status: 'PENDING_CVO_APPROVAL' },
    };

    setAuditLogs((prev) => [...prev, newAuditEntry]);
  };

  const selectedMatter = matterThreads.find((m) => m.id === selectedMatterId);
  const selectedInstitution = institutions.find((i) => i.id === selectedInstitutionId);

  return (
    <LedgerContext.Provider
      value={{
        currentUser,
        currentRole,
        isAuthenticated: !!currentUser,
        login,
        logout,
        switchRole,
        institutions,
        sourceRecords,
        relations,
        matterThreads,
        alerts,
        auditLogs,
        selectedMatterId,
        setSelectedMatterId,
        selectedMatter,
        selectedInstitutionId,
        setSelectedInstitutionId,
        selectedInstitution,
        inspectingRelation,
        setInspectingRelation,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        activeNav,
        setActiveNav,
        confirmReviewAction,
        acknowledgeTransfer,
        requestRestrictedAccess,
      }}
    >
      {children}
    </LedgerContext.Provider>
  );
};

export const useLedger = () => {
  const context = useContext(LedgerContext);
  if (!context) {
    throw new Error('useLedger must be used within a LedgerProvider');
  }
  return context;
};

