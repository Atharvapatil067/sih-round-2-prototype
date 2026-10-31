// Matter Lineage Ledger Core Types
// Conforming to PRD.md, RULES.md, and ARCHITECTURE.md

export type UserRole =
  | 'SENIOR_REVIEWER'
  | 'PGRC_OFFICER'
  | 'RB_OFFICER'
  | 'LEGAL_OFFICER'
  | 'VIGILANCE_OFFICER'
  | 'EGOV_ADMIN'
  | 'AUDITOR';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  bureau: string;
  region: string;
  avatarUrl?: string;
}

export type IdentifierType = 'PERMANENT_ID' | 'APPLICATION_ID' | 'SOCIETY_REG_ID';

export interface InstitutionIdentifier {
  id: string;
  institutionId: string;
  idType: IdentifierType;
  value: string;
  validFrom: string;
  validTo?: string | null;
  source: string;
}

export interface InstitutionAlias {
  id: string;
  institutionId: string;
  alias: string;
  status: 'VERIFIED' | 'UNVERIFIED' | 'REJECTED';
  verifiedByRole?: string;
  verifiedAt?: string;
}

export interface Campus {
  id: string;
  institutionId: string;
  name: string;
  location: string;
}

export interface OrganisationTrust {
  id: string;
  name: string;
  orgType: 'TRUST' | 'SOCIETY' | 'FOUNDATION';
  registrationNo: string;
}

export interface Institution {
  id: string;
  canonicalName: string;
  permanentId: string;
  applicationId: string;
  state: string;
  city: string;
  district: string;
  status: 'APPROVED' | 'SHOW_CAUSE_ISSUED' | 'UNDER_SCRUTINY' | 'RESTRICTED_REVIEW';
  trustName: string;
  identifiers: InstitutionIdentifier[];
  aliases: InstitutionAlias[];
  campuses: Campus[];
  activeMatterCount: number;
  totalRecordsCount: number;
  resolutionConfidence: number; // e.g. 1.0 for exact Permanent ID
  resolutionMethod: 'EXACT_PERMANENT_ID' | 'VERIFIED_ALIAS' | 'BLOCKED_FUZZY';
}

export type SourceSystemCode = 'CSS' | 'PGRC' | 'RB' | 'LEGAL' | 'VIGILANCE';

export interface SourceSystem {
  id: string;
  name: string;
  code: SourceSystemCode;
  ownerBureau: string;
  freshnessSlaHours: number;
  lastSnapshotSync: string;
  isStale: boolean;
}

export type RecordKind = 'COMPLAINT' | 'ADMIN_CASE' | 'PROCEEDING' | 'COURT_CASE';

export type SensitivityLabel = 'UNRESTRICTED' | 'CONFIDENTIAL' | 'RESTRICTED';

export type NormalizedStatus =
  | 'PENDING_SCRUTINY'
  | 'INVESTIGATION_ONGOING'
  | 'TRANSFERRED_PENDING_RECEIPT'
  | 'HEARING_SCHEDULED'
  | 'ORDER_RESERVED'
  | 'CLOSED_FORWARDED'
  | 'CLOSED_RESOLVED'
  | 'RESTRICTED_INQUIRY';

export interface EvidenceRef {
  id: string;
  docType: string;
  sourceDocId: string;
  docDate: string;
  title: string;
  contentHash: string;
}

export interface SourceRecord {
  id: string;
  sourceSystemId: string;
  sourceSystemCode: SourceSystemCode;
  sourceRef: string;
  kind: RecordKind;
  bureauId: string;
  bureauName: string;
  title: string;
  summary: string;
  complainantMasked: string; // e.g., "FAC*** [Faculty Member, Dept of CSE]"
  statusRaw: string;
  statusNorm: NormalizedStatus;
  openedAt: string;
  lastSeenAt: string;
  sensitivityLabel: SensitivityLabel;
  institutionId: string;
  institutionName: string;
  academicYear: string;
  evidenceRefs: EvidenceRef[];
}

// R-REL-03: Exactly these 6 typed relationships
export type RelationshipType =
  | 'DUPLICATE_INTAKE'
  | 'SAME_MATTER'
  | 'SAME_PROCEDURAL_CHAIN'
  | 'RELATED_BUT_INDEPENDENT'
  | 'INDEPENDENT_COMPLAINT'
  | 'UNKNOWN';

export type RelationshipState =
  | 'PROPOSED'
  | 'CONFIRMED'
  | 'REJECTED'
  | 'DEFERRED'
  | 'SUPERSEDED';

// R-ABS-01: Confidence tiers
export type ConfidenceTier = 'REVIEW_FIRST' | 'REVIEW' | 'NO_SUGGESTION' | 'UNKNOWN';

export interface MatchSignals {
  bm25Score: number;
  embeddingSimilarity: number;
  referenceOverlap: string[];
  sharedEntities: string[];
  temporalDistanceDays: number;
  proceduralPlausibility: 'HIGH' | 'MEDIUM' | 'LOW' | 'IMPLAUSIBLE';
  sourceDeclaredLink?: string;
}

export interface RecordRelation {
  id: string;
  fromRecordId: string;
  toRecordId: string;
  relType: RelationshipType;
  proposedType: RelationshipType;
  state: RelationshipState;
  confidence: number; // 0.00 - 1.00
  tier: ConfidenceTier;
  signals: MatchSignals;
  explanation: string;
  ruleVersion: string;
  modelVersion: string;
  proposedAt: string;
  reviewerRole?: string;
  decision?: 'CONFIRMED' | 'REJECTED' | 'DEFERRED' | 'RECLASSIFIED';
  decidedAt?: string;
  rejectedReason?: string;
  reviewerNotes?: string;
  targetMatterId?: string;
}

export type IntegrityFlagType =
  | 'TRANSFER_WITHOUT_ACCEPTANCE'
  | 'STAGE_WITHOUT_PREREQUISITE'
  | 'STATUS_CONFLICT_ACROSS_SOURCES'
  | 'STALE_SOURCE'
  | 'IDENTITY_CHANGED'
  | 'UNMAPPED_STAGE';

export interface IntegrityAlert {
  id: string;
  threadId: string;
  matterCode: string;
  flagType: IntegrityFlagType;
  title: string;
  humanDescription: string;
  technicalReasonCode: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  originBureau: string;
  receivingBureau?: string;
  ageDays: number;
  affectedRecordIds: string[];
  ruleId: string;
  expectedNextAction: string;
  isResolved: boolean;
  createdAt: string;
}

export interface ProceduralStageConfig {
  code: string;
  name: string;
  plainName: string;
  authorityBody: string;
  order: number;
  standardDurationDays: number;
  requiredPrerequisiteStage?: string;
}

export interface StageEventInstance {
  id: string;
  threadId: string;
  stageCode: string;
  stageName: string;
  plainExplanation: string;
  enteredAt: string;
  exitedAt?: string;
  status: 'COMPLETED' | 'CURRENT' | 'UPCOMING' | 'BLOCKED' | 'UNMAPPED';
  responsibleBureau: string;
  decisionBody: string;
  notes?: string;
}

export interface ProceduralTrack {
  id: string;
  trackName: string;
  bureau: string;
  kind: 'PRIMARY_SCRUTINY' | 'APPEAL' | 'LEGAL_PROCEEDING' | 'VIGILANCE_INQUIRY';
  status: 'ACTIVE' | 'HELD' | 'CONCLUDED';
  currentStage: string;
  relationshipReason: string; // Explains why this is a legitimate parallel track
  stages: StageEventInstance[];
}

export interface MatterThread {
  id: string;
  code: string; // e.g. "MTL-2026-0814"
  title: string;
  institutionId: string;
  institutionName: string;
  institutionPermanentId: string;
  primaryRecordId: string;
  recordIds: string[];
  status: 'ATTENTION_REQUIRED' | 'UNDER_REVIEW' | 'ACTIVE_SCRUTINY' | 'RESOLVED';
  currentHolder: string;
  currentHolderBureau: string;
  currentStageCode: string;
  currentStageName: string;
  plainStageDescription: string;
  nextRequiredAction: string;
  waitingOn: string;
  deadline?: string;
  daysRemaining?: number;
  hasIntegrityFlag: boolean;
  activeFlags: IntegrityFlagType[];
  parallelTracks: ProceduralTrack[];
  isRestricted: boolean;
  restrictedBureau?: string;
  summaryText: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLogEntry {
  id: string;
  ts: string;
  actorRole: UserRole;
  actorName: string;
  action: string;
  objectRef: string;
  decision?: string;
  reason?: string;
  ruleVersion: string;
  prevHash: string;
  hash: string;
  payload?: Record<string, any>;
}

export interface BaselineMetric {
  name: string;
  code: string;
  description: string;
  falseLinkRate: string;
  precision: string;
  recall: string;
  abstentionRate: string;
  selectiveAccuracy: string;
  isProposedPipeline?: boolean;
}

export interface GovernanceRule {
  id: string;
  category: 'HARD' | 'PROCEDURAL' | 'GOVERNANCE' | 'EVALUATION';
  title: string;
  edition: string;
  effectiveDate: string;
  description: string;
  enforcementMethod: string;
  isActive: boolean;
}

