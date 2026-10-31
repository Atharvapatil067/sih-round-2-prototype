// Synthetic AICTE Complaint Intelligence Dataset
// Strictly synthetic; conforms to PRD, RULES, MEMORY, and ARCHITECTURE

import {
  Institution,
  SourceSystem,
  SourceRecord,
  RecordRelation,
  MatterThread,
  IntegrityAlert,
  AuditLogEntry,
  GovernanceRule,
  BaselineMetric,
  UserSession,
} from '../types';

export const CURRENT_SYNTHETIC_TIMESTAMP = '2026-11-01T10:30:00Z';

export const SYNTHETIC_USERS: UserSession[] = [
  {
    id: 'user-01',
    name: 'Dr. Ramesh Sharma',
    email: 'r.sharma@aicte-india.org',
    role: 'SENIOR_REVIEWER',
    bureau: 'Standing Committee / Appellate Secretariat',
    region: 'HQ New Delhi',
  },
  {
    id: 'user-02',
    name: 'Sunita Meena',
    email: 's.meena@aicte-india.org',
    role: 'PGRC_OFFICER',
    bureau: 'Public Grievance Redressal Cell (PGRC)',
    region: 'HQ New Delhi',
  },
  {
    id: 'user-03',
    name: 'Vikram Joshi',
    email: 'v.joshi@aicte-india.org',
    role: 'RB_OFFICER',
    bureau: 'Regional Bureau - Western Regional Office (WRO)',
    region: 'Western Region (Mumbai/Pune)',
  },
  {
    id: 'user-04',
    name: 'Adv. Priya Deshmukh',
    email: 'p.deshmukh@aicte-india.org',
    role: 'LEGAL_OFFICER',
    bureau: 'Legal Cell',
    region: 'HQ New Delhi',
  },
  {
    id: 'user-05',
    name: 'A. K. Bansal',
    email: 'ak.bansal@aicte-india.org',
    role: 'VIGILANCE_OFFICER',
    bureau: 'Chief Vigilance Office',
    region: 'HQ New Delhi',
  },
  {
    id: 'user-06',
    name: 'K. S. Narayanan',
    email: 'audit.lead@aicte-india.org',
    role: 'AUDITOR',
    bureau: 'Internal Audit & Governance Custodian',
    region: 'Statutory Body Oversight',
  },
];

export const SYNTHETIC_SOURCE_SYSTEMS: SourceSystem[] = [
  {
    id: 'sys-01',
    name: 'Centralized Support System (CSS)',
    code: 'CSS',
    ownerBureau: 'e-Governance / Public Grievance Helpdesk',
    freshnessSlaHours: 24,
    lastSnapshotSync: '2026-11-01T08:00:00Z',
    isStale: false,
  },
  {
    id: 'sys-02',
    name: 'Public Grievance Redressal Portal (PGRC)',
    code: 'PGRC',
    ownerBureau: 'PGRC Bureau',
    freshnessSlaHours: 48,
    lastSnapshotSync: '2026-11-01T06:30:00Z',
    isStale: false,
  },
  {
    id: 'sys-03',
    name: 'Regional Bureau Approval Intake (RB-West)',
    code: 'RB',
    ownerBureau: 'Approval Bureau & Regional Offices',
    freshnessSlaHours: 72,
    lastSnapshotSync: '2026-10-31T18:00:00Z',
    isStale: false,
  },
  {
    id: 'sys-04',
    name: 'Legal Soft (Court Matter Tracker)',
    code: 'LEGAL',
    ownerBureau: 'AICTE Legal Cell',
    freshnessSlaHours: 168, // 7 days SLA
    lastSnapshotSync: '2026-09-17T11:00:00Z', // 45 days ago -> Stale flag triggered!
    isStale: true,
  },
  {
    id: 'sys-05',
    name: 'Vigilance Cell In-Camera Register',
    code: 'VIGILANCE',
    ownerBureau: 'Chief Vigilance Office',
    freshnessSlaHours: 336, // 14 days
    lastSnapshotSync: '2026-10-25T14:00:00Z',
    isStale: false,
  },
];

export const SYNTHETIC_INSTITUTIONS: Institution[] = [
  {
    id: 'inst-01',
    canonicalName: 'Apex Institute of Technology, Pune',
    permanentId: '1-4392817',
    applicationId: '1-10928471928',
    state: 'Maharashtra',
    city: 'Pune',
    district: 'Pune',
    status: 'SHOW_CAUSE_ISSUED',
    trustName: 'Apex Vidya Prasarak Mandal, Pune',
    campuses: [
      { id: 'camp-01', institutionId: 'inst-01', name: 'Main Campus', location: 'Hinjawadi Phase 2, Pune' }
    ],
    identifiers: [
      {
        id: 'ident-01',
        institutionId: 'inst-01',
        idType: 'PERMANENT_ID',
        value: '1-4392817',
        validFrom: '2014-06-01',
        validTo: null,
        source: 'AICTE Approval Master DB'
      },
      {
        id: 'ident-02',
        institutionId: 'inst-01',
        idType: 'APPLICATION_ID',
        value: '1-10928471928',
        validFrom: '2026-01-15',
        validTo: null,
        source: 'Approval Process Portal 2026-27'
      }
    ],
    aliases: [
      { id: 'al-01', institutionId: 'inst-01', alias: 'Apex Tech Pune', status: 'VERIFIED', verifiedByRole: 'PGRC_OFFICER', verifiedAt: '2025-08-10' },
      { id: 'al-02', institutionId: 'inst-01', alias: 'AIT Pune', status: 'VERIFIED', verifiedByRole: 'RB_OFFICER', verifiedAt: '2025-09-12' },
      { id: 'al-03', institutionId: 'inst-01', alias: 'Apex Engineering Hinjawadi', status: 'UNVERIFIED' }
    ],
    activeMatterCount: 2,
    totalRecordsCount: 5,
    resolutionConfidence: 1.0,
    resolutionMethod: 'EXACT_PERMANENT_ID',
  },
  {
    id: 'inst-02',
    canonicalName: 'Apex Institute of Technology & Research, Nagpur',
    permanentId: '1-7891234',
    applicationId: '1-10928499011',
    state: 'Maharashtra',
    city: 'Nagpur',
    district: 'Nagpur',
    status: 'APPROVED',
    trustName: 'Vidarbha Technical Education Trust',
    campuses: [
      { id: 'camp-02', institutionId: 'inst-02', name: 'Nagpur City Campus', location: 'MIDC Hingna Road, Nagpur' }
    ],
    identifiers: [
      {
        id: 'ident-03',
        institutionId: 'inst-02',
        idType: 'PERMANENT_ID',
        value: '1-7891234',
        validFrom: '2016-07-01',
        validTo: null,
        source: 'AICTE Approval Master DB'
      }
    ],
    aliases: [
      { id: 'al-04', institutionId: 'inst-02', alias: 'AITR Nagpur', status: 'VERIFIED', verifiedByRole: 'RB_OFFICER', verifiedAt: '2025-05-18' }
    ],
    activeMatterCount: 0,
    totalRecordsCount: 1,
    resolutionConfidence: 1.0,
    resolutionMethod: 'EXACT_PERMANENT_ID',
  },
  {
    id: 'inst-03',
    canonicalName: 'Kaveri College of Engineering & Technology, Bengaluru',
    permanentId: '1-3298411',
    applicationId: '1-10928501234',
    state: 'Karnataka',
    city: 'Bengaluru',
    district: 'Bengaluru Urban',
    status: 'UNDER_SCRUTINY',
    trustName: 'Kaveri Educational & Charitable Trust',
    campuses: [
      { id: 'camp-03', institutionId: 'inst-03', name: 'Electronic City Campus', location: 'Hosur Road, Bengaluru' }
    ],
    identifiers: [
      {
        id: 'ident-04',
        institutionId: 'inst-03',
        idType: 'PERMANENT_ID',
        value: '1-3298411',
        validFrom: '2011-04-12',
        validTo: null,
        source: 'AICTE Approval Master DB'
      }
    ],
    aliases: [
      { id: 'al-05', institutionId: 'inst-03', alias: 'KCET Bengaluru', status: 'VERIFIED', verifiedByRole: 'PGRC_OFFICER', verifiedAt: '2024-02-14' }
    ],
    activeMatterCount: 1,
    totalRecordsCount: 3,
    resolutionConfidence: 0.98,
    resolutionMethod: 'VERIFIED_ALIAS',
  },
  {
    id: 'inst-04',
    canonicalName: 'Vindhya Polytechnic Institute, Bhopal',
    permanentId: '1-5120938',
    applicationId: '1-10928514920',
    state: 'Madhya Pradesh',
    city: 'Bhopal',
    district: 'Bhopal',
    status: 'SHOW_CAUSE_ISSUED',
    trustName: 'Central India Educational Foundation',
    campuses: [
      { id: 'camp-04', institutionId: 'inst-04', name: 'Ayodhya Bypass Campus', location: 'Bhopal' }
    ],
    identifiers: [
      {
        id: 'ident-05',
        institutionId: 'inst-04',
        idType: 'PERMANENT_ID',
        value: '1-5120938',
        validFrom: '2015-08-01',
        validTo: null,
        source: 'AICTE Approval Master DB'
      }
    ],
    aliases: [
      { id: 'al-06', institutionId: 'inst-04', alias: 'VPI Bhopal', status: 'VERIFIED', verifiedByRole: 'RB_OFFICER', verifiedAt: '2025-01-20' }
    ],
    activeMatterCount: 1,
    totalRecordsCount: 2,
    resolutionConfidence: 1.0,
    resolutionMethod: 'EXACT_PERMANENT_ID',
  },
  {
    id: 'inst-05',
    canonicalName: 'North Valley Regional Institute of Management, Gandhinagar',
    permanentId: '1-6789012',
    applicationId: '1-10928529011',
    state: 'Gujarat',
    city: 'Gandhinagar',
    district: 'Gandhinagar',
    status: 'APPROVED',
    trustName: 'North Valley Academic Foundation',
    campuses: [
      { id: 'camp-05', institutionId: 'inst-05', name: 'Infocity Campus', location: 'Gandhinagar' }
    ],
    identifiers: [
      {
        id: 'ident-06',
        institutionId: 'inst-05',
        idType: 'PERMANENT_ID',
        value: '1-6789012',
        validFrom: '2017-03-10',
        validTo: null,
        source: 'AICTE Approval Master DB'
      }
    ],
    aliases: [
      { id: 'al-07', institutionId: 'inst-05', alias: 'NVRIM Gandhinagar', status: 'VERIFIED', verifiedByRole: 'RB_OFFICER', verifiedAt: '2024-11-05' }
    ],
    activeMatterCount: 1,
    totalRecordsCount: 2,
    resolutionConfidence: 1.0,
    resolutionMethod: 'EXACT_PERMANENT_ID',
  }
];

export const SYNTHETIC_SOURCE_RECORDS: SourceRecord[] = [
  // Records for Apex Institute of Technology (Pune)
  {
    id: 'rec-css-01',
    sourceSystemId: 'sys-01',
    sourceSystemCode: 'CSS',
    sourceRef: 'CSS-2026-9041',
    kind: 'COMPLAINT',
    bureauId: 'BUR-EGOV',
    bureauName: 'e-Governance / Helpdesk',
    title: 'Grievance regarding 6th Pay commission dues and arbitrary lab fee deduction',
    summary: 'Faculty members submit non-payment of arrears and forced deduction of academic maintenance fees for batch 2025-26.',
    complainantMasked: 'FAC-PUN-*** [Faculty Association]',
    statusRaw: 'Forwarded to Bureau & Closed in CSS',
    statusNorm: 'CLOSED_FORWARDED',
    openedAt: '2026-08-14T09:15:00Z',
    lastSeenAt: '2026-11-01T08:00:00Z',
    sensitivityLabel: 'UNRESTRICTED',
    institutionId: 'inst-01',
    institutionName: 'Apex Institute of Technology, Pune',
    academicYear: '2026-27',
    evidenceRefs: [
      {
        id: 'ev-01',
        docType: 'SALARY_SLIP_SAMPLE',
        sourceDocId: 'DOC-CSS-9041-A',
        docDate: '2026-07-31',
        title: 'Redacted Bank Statement & Salary Voucher Extracts',
        contentHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
      }
    ]
  },
  {
    id: 'rec-pgrc-01',
    sourceSystemId: 'sys-02',
    sourceSystemCode: 'PGRC',
    sourceRef: 'PGRC-2026-1182',
    kind: 'COMPLAINT',
    bureauId: 'BUR-PGRC',
    bureauName: 'Public Grievance Redressal Cell (PGRC)',
    title: 'Allegation of Faculty Cadre Ratio norm violation and unapproved student fee surcharge',
    summary: 'Formal grievance under APH Chapter VII alleging faculty deficit of 42% in Computer Engineering and unauthorized infrastructure surcharge of Rs 25,000 per student.',
    complainantMasked: 'STU-PUN-*** [Student Council Representative]',
    statusRaw: 'SCSC Recommendation Forwarded to Regional Bureau',
    statusNorm: 'TRANSFERRED_PENDING_RECEIPT',
    openedAt: '2026-08-20T11:30:00Z',
    lastSeenAt: '2026-11-01T06:30:00Z',
    sensitivityLabel: 'UNRESTRICTED',
    institutionId: 'inst-01',
    institutionName: 'Apex Institute of Technology, Pune',
    academicYear: '2026-27',
    evidenceRefs: [
      {
        id: 'ev-02',
        docType: 'COMMITTEE_MINUTES',
        sourceDocId: 'SCSC-MIN-2026-08-19',
        docDate: '2026-09-04',
        title: 'Standing Complaint Scrutiny Committee (SCSC) Recommendation',
        contentHash: '8f434346648f6b96df89dda901c5176b10f607624f376599c92b9305fed057ad'
      },
      {
        id: 'ev-03',
        docType: 'FEE_RECEIPT',
        sourceDocId: 'DOC-FEE-2026-081',
        docDate: '2026-08-10',
        title: 'Sample Institutional Challan with Surcharge Stamp',
        contentHash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
      }
    ]
  },
  {
    id: 'rec-rb-01',
    sourceSystemId: 'sys-03',
    sourceSystemCode: 'RB',
    sourceRef: 'RB-WRO-2026-4410',
    kind: 'ADMIN_CASE',
    bureauId: 'BUR-RB-WRO',
    bureauName: 'Western Regional Office (WRO Approval Bureau)',
    title: 'Pending Handoff Intake: Expert Visit Committee (EVC) Physical Verification File',
    summary: 'File transmission log from PGRC HQ regarding Apex Institute of Technology, Pune. Waiting for Regional Officer formal receipt acknowledgment.',
    complainantMasked: 'TRANSFERRED_CASE_FILE [Internal AICTE Dispatch]',
    statusRaw: 'Pending Receipt Acknowledgment by RO',
    statusNorm: 'TRANSFERRED_PENDING_RECEIPT',
    openedAt: '2026-09-12T14:20:00Z',
    lastSeenAt: '2026-10-31T18:00:00Z',
    sensitivityLabel: 'UNRESTRICTED',
    institutionId: 'inst-01',
    institutionName: 'Apex Institute of Technology, Pune',
    academicYear: '2026-27',
    evidenceRefs: [
      {
        id: 'ev-04',
        docType: 'DISPATCH_NOTE',
        sourceDocId: 'DISP-PGRC-WRO-0912',
        docDate: '2026-09-12',
        title: 'Inter-Bureau File Transfer Dispatch Note',
        contentHash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a'
      }
    ]
  },
  {
    id: 'rec-legal-01',
    sourceSystemId: 'sys-04',
    sourceSystemCode: 'LEGAL',
    sourceRef: 'HC-BOM-WP-4120-2026',
    kind: 'COURT_CASE',
    bureauId: 'BUR-LEGAL',
    bureauName: 'Legal Cell',
    title: 'Writ Petition (Civil) 4120/2026: Apex Vidya Prasarak Mandal vs Union of India & AICTE',
    summary: 'Institution trust challenged AICTE Show Cause Notice issued under APH clause 7.2. High Court passed interim direction to maintain status quo on intake.',
    complainantMasked: 'Apex Vidya Prasarak Mandal [Trust Management]',
    statusRaw: 'Interim Order Passed; Reply Affidavit Filed',
    statusNorm: 'ORDER_RESERVED',
    openedAt: '2026-09-25T10:00:00Z',
    lastSeenAt: '2026-10-28T12:00:00Z',
    sensitivityLabel: 'UNRESTRICTED',
    institutionId: 'inst-01',
    institutionName: 'Apex Institute of Technology, Pune',
    academicYear: '2026-27',
    evidenceRefs: [
      {
        id: 'ev-05',
        docType: 'COURT_ORDER',
        sourceDocId: 'HC-BOM-ORD-4120',
        docDate: '2026-10-03',
        title: 'Bombay High Court Interim Order in WP 4120/2026',
        contentHash: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d'
      }
    ]
  },
  {
    id: 'rec-vig-01',
    sourceSystemId: 'sys-05',
    sourceSystemCode: 'VIGILANCE',
    sourceRef: 'VIG-CONF-2026-042',
    kind: 'PROCEEDING',
    bureauId: 'BUR-VIG',
    bureauName: 'Chief Vigilance Office',
    title: 'Restricted In-Camera Verification (Apex Institute of Technology)',
    summary: 'Restricted existence-level entry. Detailed allegations and inquiry records are strictly confidential under CVO protocol.',
    complainantMasked: 'RESTRICTED_CONFIDENTIAL [CVO Protection]',
    statusRaw: 'Under In-Camera Preliminary Scrutiny',
    statusNorm: 'RESTRICTED_INQUIRY',
    openedAt: '2026-09-08T15:00:00Z',
    lastSeenAt: '2026-10-25T14:00:00Z',
    sensitivityLabel: 'RESTRICTED',
    institutionId: 'inst-01',
    institutionName: 'Apex Institute of Technology, Pune',
    academicYear: '2026-27',
    evidenceRefs: []
  },

  // Records for Kaveri College of Engineering & Technology (Bengaluru)
  {
    id: 'rec-css-02',
    sourceSystemId: 'sys-01',
    sourceSystemCode: 'CSS',
    sourceRef: 'CSS-2026-8812',
    kind: 'COMPLAINT',
    bureauId: 'BUR-EGOV',
    bureauName: 'e-Governance / Helpdesk',
    title: 'Shortage of electrical machines laboratory equipment and non-functioning simulation software',
    summary: 'Final year B.Tech Electrical students lodge complaint regarding deficiency in Power Systems lab apparatus, citing South-Western Regional Office circular SWRO/LAB/2026/09.',
    complainantMasked: 'STU-BLR-*** [Student Batch Rep]',
    statusRaw: 'Under Active Scrutiny',
    statusNorm: 'PENDING_SCRUTINY',
    openedAt: '2026-10-02T10:15:00Z',
    lastSeenAt: '2026-11-01T08:00:00Z',
    sensitivityLabel: 'UNRESTRICTED',
    institutionId: 'inst-03',
    institutionName: 'Kaveri College of Engineering & Technology, Bengaluru',
    academicYear: '2026-27',
    evidenceRefs: [
      {
        id: 'ev-06',
        docType: 'STUDENT_PETITION',
        sourceDocId: 'PET-BLR-2026-01',
        docDate: '2026-09-28',
        title: 'Joint Student Representation on Lab Shortage',
        contentHash: '2c624232cdd221771294dfbb310aca000a0df6ec9b5feb9ebb95ab443f14aa63'
      }
    ]
  },
  {
    id: 'rec-pgrc-02',
    sourceSystemId: 'sys-02',
    sourceSystemCode: 'PGRC',
    sourceRef: 'PGRC-2026-3390',
    kind: 'COMPLAINT',
    bureauId: 'BUR-PGRC',
    bureauName: 'Public Grievance Redressal Cell (PGRC)',
    title: 'Infrastructure deficiency in Dept of Electrical & Electronics Engineering under APH Norms',
    summary: 'Petition received citing deficiency of essential apparatus in Power Electronics & Machines Lab, referring to circular SWRO/LAB/2026/09.',
    complainantMasked: 'PAR-BLR-*** [Parent-Teacher Association Member]',
    statusRaw: 'Scheduled for SCSC Review on 05 Nov 2026',
    statusNorm: 'PENDING_SCRUTINY',
    openedAt: '2026-10-10T12:00:00Z',
    lastSeenAt: '2026-11-01T06:30:00Z',
    sensitivityLabel: 'UNRESTRICTED',
    institutionId: 'inst-03',
    institutionName: 'Kaveri College of Engineering & Technology, Bengaluru',
    academicYear: '2026-27',
    evidenceRefs: [
      {
        id: 'ev-07',
        docType: 'SYLLABUS_AUDIT',
        sourceDocId: 'AUD-BLR-LAB-2026',
        docDate: '2026-10-05',
        title: 'Curriculum Equipment Compliance Checklist',
        contentHash: '49960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d9763'
      }
    ]
  },

  // Record for North Valley Regional Institute (Gandhinagar) - Stale Record Seed
  {
    id: 'rec-legal-02',
    sourceSystemId: 'sys-04',
    sourceSystemCode: 'LEGAL',
    sourceRef: 'HC-GUJ-SCA-1104-2025',
    kind: 'COURT_CASE',
    bureauId: 'BUR-LEGAL',
    bureauName: 'Legal Cell',
    title: 'Special Civil Application 1104/2025: Land Conversion & AICTE Approval Validity',
    summary: 'Old pending petition regarding agricultural zone non-agricultural conversion permission. No fresh affidavit uploaded by Legal Cell since September.',
    complainantMasked: 'North Valley Academic Foundation',
    statusRaw: 'Awaiting Next Date of Hearing',
    statusNorm: 'ORDER_RESERVED',
    openedAt: '2025-04-12T10:00:00Z',
    lastSeenAt: '2026-09-17T11:00:00Z', // STALE!
    sensitivityLabel: 'UNRESTRICTED',
    institutionId: 'inst-05',
    institutionName: 'North Valley Regional Institute of Management, Gandhinagar',
    academicYear: '2025-26',
    evidenceRefs: []
  }
];

export const SYNTHETIC_RELATIONS: RecordRelation[] = [
  // 1. Proposed Relationship in Review Queue (Showcase Review Journey)
  {
    id: 'rel-01',
    fromRecordId: 'rec-css-02',
    toRecordId: 'rec-pgrc-02',
    relType: 'SAME_MATTER',
    proposedType: 'SAME_MATTER',
    state: 'PROPOSED',
    confidence: 0.91,
    tier: 'REVIEW_FIRST',
    signals: {
      bm25Score: 8.74,
      embeddingSimilarity: 0.88,
      referenceOverlap: ['SWRO/LAB/2026/09', 'Dept of Electrical & Electronics'],
      sharedEntities: ['Power Electronics & Machines Lab', 'Kaveri College'],
      temporalDistanceDays: 8,
      proceduralPlausibility: 'HIGH',
      sourceDeclaredLink: 'Cites South-Western Regional Office Notice SWRO/LAB/2026/09'
    },
    explanation: 'Both records involve the exact same equipment deficiency at Kaveri College Dept of Electrical Engineering, citing identical circular SWRO/LAB/2026/09 within an 8-day intake window.',
    ruleVersion: 'APH-RULE-2026-V1.4',
    modelVersion: 'pipeline-calibrated-v2.1',
    proposedAt: '2026-10-10T14:00:00Z',
    targetMatterId: 'matter-02'
  },

  // 2. Confirmed Relationship: CSS and PGRC at Apex Institute of Technology
  {
    id: 'rel-02',
    fromRecordId: 'rec-css-01',
    toRecordId: 'rec-pgrc-01',
    relType: 'SAME_MATTER',
    proposedType: 'SAME_MATTER',
    state: 'CONFIRMED',
    confidence: 0.94,
    tier: 'REVIEW_FIRST',
    signals: {
      bm25Score: 9.12,
      embeddingSimilarity: 0.91,
      referenceOverlap: ['Apex Institute', 'Pune', '6th Pay Faculty Arrears', 'Lab Surcharge'],
      sharedEntities: ['Computer Engineering Dept', 'Apex Vidya Prasarak Mandal'],
      temporalDistanceDays: 6,
      proceduralPlausibility: 'HIGH'
    },
    explanation: 'Confirmed by Senior Reviewer on 2026-08-25: Grievances originate from the same faculty dispute and student surcharge incidents at Apex Institute.',
    ruleVersion: 'APH-RULE-2026-V1.4',
    modelVersion: 'pipeline-calibrated-v2.1',
    proposedAt: '2026-08-21T10:00:00Z',
    reviewerRole: 'SENIOR_REVIEWER',
    decision: 'CONFIRMED',
    decidedAt: '2026-08-25T11:20:00Z',
    reviewerNotes: 'Verified against SCSC meeting intake list. Confirmed same underlying faculty and fee grievance.',
    targetMatterId: 'matter-01'
  },

  // 3. Confirmed Procedural Handoff: PGRC to RB-West
  {
    id: 'rel-03',
    fromRecordId: 'rec-pgrc-01',
    toRecordId: 'rec-rb-01',
    relType: 'SAME_PROCEDURAL_CHAIN',
    proposedType: 'SAME_PROCEDURAL_CHAIN',
    state: 'CONFIRMED',
    confidence: 0.99,
    tier: 'REVIEW_FIRST',
    signals: {
      bm25Score: 11.45,
      embeddingSimilarity: 0.96,
      referenceOverlap: ['SCSC-MIN-2026-08-19', 'DISP-PGRC-WRO-0912', 'PGRC-2026-1182'],
      sharedEntities: ['Apex Institute of Technology, Pune'],
      temporalDistanceDays: 8,
      proceduralPlausibility: 'HIGH',
      sourceDeclaredLink: 'PGRC Scrutiny minutes cite direct dispatch to Western Regional Office for EVC'
    },
    explanation: 'Procedural handoff edge: Standing Complaint Scrutiny Committee recommended on-site inspection (EVC) and dispatched file to Regional Bureau.',
    ruleVersion: 'APH-RULE-2026-V1.4',
    modelVersion: 'pipeline-calibrated-v2.1',
    proposedAt: '2026-09-13T09:00:00Z',
    reviewerRole: 'PGRC_OFFICER',
    decision: 'CONFIRMED',
    decidedAt: '2026-09-14T10:15:00Z',
    reviewerNotes: 'Official committee transfer to WRO confirmed.',
    targetMatterId: 'matter-01'
  },

  // 4. Confirmed Parallel Track: Court Case vs Complaint Proceeding
  {
    id: 'rel-04',
    fromRecordId: 'rec-pgrc-01',
    toRecordId: 'rec-legal-01',
    relType: 'RELATED_BUT_INDEPENDENT',
    proposedType: 'RELATED_BUT_INDEPENDENT',
    state: 'CONFIRMED',
    confidence: 0.86,
    tier: 'REVIEW',
    signals: {
      bm25Score: 6.42,
      embeddingSimilarity: 0.79,
      referenceOverlap: ['Apex Vidya Prasarak Mandal', 'Show Cause Notice Clause 7.2'],
      sharedEntities: ['Bombay High Court', 'AICTE Western Region'],
      temporalDistanceDays: 13,
      proceduralPlausibility: 'HIGH'
    },
    explanation: 'Conforms to R-REL-07 (Parallel action is not duplication): Management challenged AICTE notice in High Court while internal scrutiny is progressing. Properly linked as a parallel legal track, not merged.',
    ruleVersion: 'APH-RULE-2026-V1.4',
    modelVersion: 'pipeline-calibrated-v2.1',
    proposedAt: '2026-09-28T16:00:00Z',
    reviewerRole: 'LEGAL_OFFICER',
    decision: 'CONFIRMED',
    decidedAt: '2026-09-29T14:30:00Z',
    reviewerNotes: 'Court writ petition is directly related to the SCSC notice. Must coordinate dates before issuing final hearing.',
    targetMatterId: 'matter-01'
  },

  // 5. Remembered Rejected Pair (Demonstrates R-REL-06 & R-REL-08)
  {
    id: 'rel-05',
    fromRecordId: 'rec-css-01',
    toRecordId: 'rec-pgrc-02',
    relType: 'INDEPENDENT_COMPLAINT',
    proposedType: 'SAME_MATTER',
    state: 'REJECTED',
    confidence: 0.42,
    tier: 'NO_SUGGESTION',
    signals: {
      bm25Score: 2.1,
      embeddingSimilarity: 0.48,
      referenceOverlap: [],
      sharedEntities: [],
      temporalDistanceDays: 48,
      proceduralPlausibility: 'LOW'
    },
    explanation: 'Evaluated under R-REL-06: Candidate pair between Apex Tech Pune (fee issue) and Kaveri College Bengaluru (lab issue) rejected due to different institutions, despite overlapping keyword "fees/equipment". Remembered in rejected cache.',
    ruleVersion: 'APH-RULE-2026-V1.4',
    modelVersion: 'pipeline-calibrated-v2.1',
    proposedAt: '2026-10-12T09:00:00Z',
    reviewerRole: 'SENIOR_REVIEWER',
    decision: 'REJECTED',
    decidedAt: '2026-10-12T11:45:00Z',
    rejectedReason: 'Unrelated institutions in different regions; semantic similarity was coincidental.',
    reviewerNotes: 'Abstained per R-REL-08 (Same institution is not same matter, and here different institutions).'
  }
];

export const SYNTHETIC_INTEGRITY_ALERTS: IntegrityAlert[] = [
  {
    id: 'alt-01',
    threadId: 'matter-01',
    matterCode: 'MTL-2026-0814',
    flagType: 'TRANSFER_WITHOUT_ACCEPTANCE',
    title: 'Transfer not accepted by receiving bureau',
    humanDescription: 'PGRC transferred this case file to Western Regional Office (RB-West) on 12 Sep 2026 (18 days ago), but RB-West has not accepted or acknowledged receipt. Standard SLA is 7 days.',
    technicalReasonCode: 'RULE_APH_SCSC_TRANSFER_UNACKNOWLEDGED_GT_7D',
    severity: 'CRITICAL',
    originBureau: 'Public Grievance Redressal Cell (PGRC)',
    receivingBureau: 'Regional Bureau - Western Regional Office (RB-West)',
    ageDays: 18,
    affectedRecordIds: ['rec-pgrc-01', 'rec-rb-01'],
    ruleId: 'R-PROC-05',
    expectedNextAction: 'Regional Officer (West) should confirm receipt in the coordination brief to clear dispatch queue.',
    isResolved: false,
    createdAt: '2026-09-19T00:00:00Z',
  },
  {
    id: 'alt-02',
    threadId: 'matter-01',
    matterCode: 'MTL-2026-0814',
    flagType: 'STATUS_CONFLICT_ACROSS_SOURCES',
    title: 'Conflicting status across source systems',
    humanDescription: 'CSS reports status as "CLOSED_FORWARDED" while PGRC reports "INVESTIGATION_ONGOING / TRANSFERRED". The ledger preserves both provenance records honestly without overwriting.',
    technicalReasonCode: 'STATUS_DISCORDANCE_CSS_VS_PGRC',
    severity: 'WARNING',
    originBureau: 'Centralized Support System (CSS)',
    receivingBureau: 'PGRC Bureau',
    ageDays: 24,
    affectedRecordIds: ['rec-css-01', 'rec-pgrc-01'],
    ruleId: 'R-FRESH-03',
    expectedNextAction: 'Reference PGRC intake ID PGRC-2026-1182 as active coordination lead.',
    isResolved: false,
    createdAt: '2026-09-01T12:00:00Z',
  },
  {
    id: 'alt-03',
    threadId: 'matter-04',
    matterCode: 'MTL-2026-1045',
    flagType: 'STALE_SOURCE',
    title: 'Source record freshness threshold exceeded',
    humanDescription: 'Legal Soft snapshot has not refreshed court case record HC-GUJ-SCA-1104-2025 for 45 days. Legal Cell SLA is 7 days.',
    technicalReasonCode: 'SOURCE_FRESHNESS_SLA_BREACH_LEGAL_SOFT',
    severity: 'WARNING',
    originBureau: 'Legal Cell',
    ageDays: 45,
    affectedRecordIds: ['rec-legal-02'],
    ruleId: 'R-FRESH-04',
    expectedNextAction: 'Request manual court roster verification from Legal Cell custodian.',
    isResolved: false,
    createdAt: '2026-09-24T00:00:00Z',
  }
];

export const SYNTHETIC_MATTER_THREADS: MatterThread[] = [
  // Matter 1: Showcase Matter (Apex Institute of Technology, Pune)
  {
    id: 'matter-01',
    code: 'MTL-2026-0814',
    title: 'Faculty Cadre Ratio Deficiency and Lab Fee Surcharge',
    institutionId: 'inst-01',
    institutionName: 'Apex Institute of Technology, Pune',
    institutionPermanentId: '1-4392817',
    primaryRecordId: 'rec-pgrc-01',
    recordIds: ['rec-css-01', 'rec-pgrc-01', 'rec-rb-01', 'rec-legal-01', 'rec-vig-01'],
    status: 'ATTENTION_REQUIRED',
    currentHolder: 'Regional Officer (Western Regional Office)',
    currentHolderBureau: 'Regional Bureau (RB-West)',
    currentStageCode: 'STAGE-03-EVC-PENDING',
    currentStageName: 'Expert Visit Committee (EVC) Physical Verification',
    plainStageDescription: 'Standing Committee recommended physical inspection of faculty registers and financial records. File awaiting Regional Office confirmation.',
    nextRequiredAction: 'Regional Officer (West) should acknowledge transfer and notify institution of EVC dates.',
    waitingOn: 'Acceptance of transfer file by Western Regional Office',
    deadline: '2026-11-12T17:00:00Z',
    daysRemaining: 11,
    hasIntegrityFlag: true,
    activeFlags: ['TRANSFER_WITHOUT_ACCEPTANCE', 'STATUS_CONFLICT_ACROSS_SOURCES'],
    isRestricted: true,
    restrictedBureau: 'Chief Vigilance Office',
    summaryText: 'Multi-channel grievance alleging 42% faculty deficit and arbitrary student surcharges. Parallel High Court writ petition WP 4120/2026 is active with status quo order on intake.',
    createdAt: '2026-08-14T09:15:00Z',
    updatedAt: '2026-11-01T08:00:00Z',
    parallelTracks: [
      {
        id: 'track-01',
        trackName: 'Track A: Primary SCSC & Regional Bureau Inspection',
        bureau: 'PGRC & Regional Bureau (RB-West)',
        kind: 'PRIMARY_SCRUTINY',
        status: 'ACTIVE',
        currentStage: 'EVC Pending Regional Receipt',
        relationshipReason: 'Main regulatory complaint redressal track governed by APH Chapter VII.',
        stages: [
          {
            id: 'st-01',
            threadId: 'matter-01',
            stageCode: 'STAGE-01-INTAKE',
            stageName: 'Grievance Intake & Filtering',
            plainExplanation: 'Initial complaints ingested from CSS and PGRC portal.',
            enteredAt: '2026-08-14T09:15:00Z',
            exitedAt: '2026-08-20T11:00:00Z',
            status: 'COMPLETED',
            responsibleBureau: 'e-Gov / Helpdesk',
            decisionBody: 'AICTE Intake Cell'
          },
          {
            id: 'st-02',
            threadId: 'matter-01',
            stageCode: 'STAGE-02-SCSC',
            stageName: 'Standing Complaint Scrutiny Committee (SCSC)',
            plainExplanation: 'Committee examined prima facie documentary evidence on faculty payroll.',
            enteredAt: '2026-08-20T11:00:00Z',
            exitedAt: '2026-09-04T16:00:00Z',
            status: 'COMPLETED',
            responsibleBureau: 'PGRC Bureau',
            decisionBody: 'Standing Scrutiny Committee',
            notes: 'Recommended on-site Expert Visit Committee (EVC).'
          },
          {
            id: 'st-03',
            threadId: 'matter-01',
            stageCode: 'STAGE-03-EVC-PENDING',
            stageName: 'Expert Visit Committee (EVC) Preparation',
            plainExplanation: 'Transferred to Western Regional Office. Handoff acceptance pending.',
            enteredAt: '2026-09-12T14:20:00Z',
            status: 'BLOCKED',
            responsibleBureau: 'Regional Bureau (RB-West)',
            decisionBody: 'Regional Committee',
            notes: 'Blocked by unacknowledged transfer from PGRC.'
          },
          {
            id: 'st-04',
            threadId: 'matter-01',
            stageCode: 'STAGE-04-SHC',
            stageName: 'Standing Hearing Committee (SHC)',
            plainExplanation: 'Formal hearing where management presents defense.',
            enteredAt: '2026-11-20T10:00:00Z',
            status: 'UPCOMING',
            responsibleBureau: 'HQ Standing Hearing Cell',
            decisionBody: 'Standing Hearing Committee'
          },
          {
            id: 'st-05',
            threadId: 'matter-01',
            stageCode: 'STAGE-05-SAC',
            stageName: 'Standing Appellate Committee (SAC)',
            plainExplanation: 'Appellate stage if institution challenges SHC recommendations.',
            enteredAt: '2026-12-15T10:00:00Z',
            status: 'UPCOMING',
            responsibleBureau: 'Appellate Bureau',
            decisionBody: 'Standing Appellate Committee'
          }
        ]
      },
      {
        id: 'track-02',
        trackName: 'Track B: High Court Writ Petition WP(C) 4120/2026',
        bureau: 'AICTE Legal Cell',
        kind: 'LEGAL_PROCEEDING',
        status: 'ACTIVE',
        currentStage: 'Interim Order; Reply Affidavit Filed',
        relationshipReason: 'Institution trust challenged Show Cause Notice in High Court; legitimate parallel legal proceeding.',
        stages: [
          {
            id: 'st-06',
            threadId: 'matter-01',
            stageCode: 'STAGE-LEG-PETITION',
            stageName: 'Writ Petition Filed by Trust',
            plainExplanation: 'Petition served on AICTE Western Region counsel.',
            enteredAt: '2026-09-25T10:00:00Z',
            exitedAt: '2026-10-03T14:00:00Z',
            status: 'COMPLETED',
            responsibleBureau: 'Legal Cell',
            decisionBody: 'High Court of Bombay'
          },
          {
            id: 'st-07',
            threadId: 'matter-01',
            stageCode: 'STAGE-LEG-INTERIM',
            stageName: 'Interim Order / Reply In Progress',
            plainExplanation: 'Court directed maintain status quo on intake; AICTE filed counter-affidavit.',
            enteredAt: '2026-10-03T14:00:00Z',
            status: 'CURRENT',
            responsibleBureau: 'Legal Cell',
            decisionBody: 'High Court of Bombay'
          }
        ]
      },
      {
        id: 'track-03',
        trackName: 'Track C: Restricted Vigilance In-Camera Inquiry',
        bureau: 'Chief Vigilance Office (CVO)',
        kind: 'VIGILANCE_INQUIRY',
        status: 'ACTIVE',
        currentStage: 'Preliminary In-Camera Scrutiny',
        relationshipReason: 'Confidential inquiry under Vigilance protocol. Details masked by default per R-SEC-03.',
        stages: [
          {
            id: 'st-08',
            threadId: 'matter-01',
            stageCode: 'STAGE-VIG-RESTRICTED',
            stageName: 'Confidential Fact Finding',
            plainExplanation: 'Existence-only placeholder for cross-Bureau coordination. Access to details restricted.',
            enteredAt: '2026-09-08T15:00:00Z',
            status: 'CURRENT',
            responsibleBureau: 'Chief Vigilance Office',
            decisionBody: 'Chief Vigilance Officer'
          }
        ]
      }
    ]
  },

  // Matter 2: Kaveri College Review Target
  {
    id: 'matter-02',
    code: 'MTL-2026-0922',
    title: 'Shortage of Power Systems Laboratory Apparatus',
    institutionId: 'inst-03',
    institutionName: 'Kaveri College of Engineering & Technology, Bengaluru',
    institutionPermanentId: '1-3298411',
    primaryRecordId: 'rec-pgrc-02',
    recordIds: ['rec-css-02', 'rec-pgrc-02'],
    status: 'UNDER_REVIEW',
    currentHolder: 'Senior Scrutiny Officer',
    currentHolderBureau: 'Public Grievance Redressal Cell (PGRC)',
    currentStageCode: 'STAGE-02-SCSC',
    currentStageName: 'Standing Complaint Scrutiny Committee (SCSC) Scrutiny',
    plainStageDescription: 'Grievance scheduled for SCSC agenda. Proposed connection with CSS grievance pending confirmation.',
    nextRequiredAction: 'Review proposed link with CSS-2026-8812 in Review Queue before committee hearing on 05 Nov 2026.',
    waitingOn: 'Human reviewer confirmation of proposed SAME_MATTER relationship',
    deadline: '2026-11-05T10:00:00Z',
    daysRemaining: 4,
    hasIntegrityFlag: false,
    activeFlags: [],
    isRestricted: false,
    summaryText: 'Two intake grievances report electrical machines laboratory deficiencies citing identical regional circular SWRO/LAB/2026/09.',
    createdAt: '2026-10-02T10:15:00Z',
    updatedAt: '2026-11-01T06:30:00Z',
    parallelTracks: [
      {
        id: 'track-04',
        trackName: 'Track A: SCSC Intake & Scrutiny',
        bureau: 'PGRC Bureau',
        kind: 'PRIMARY_SCRUTINY',
        status: 'ACTIVE',
        currentStage: 'SCSC Scrutiny Scheduled',
        relationshipReason: 'Routine grievance verification under APH norms.',
        stages: [
          {
            id: 'st-09',
            threadId: 'matter-02',
            stageCode: 'STAGE-01-INTAKE',
            stageName: 'Intake Registration',
            plainExplanation: 'Complaints received via CSS and direct PGRC portal.',
            enteredAt: '2026-10-02T10:15:00Z',
            exitedAt: '2026-10-15T10:00:00Z',
            status: 'COMPLETED',
            responsibleBureau: 'PGRC Bureau',
            decisionBody: 'Intake Officer'
          },
          {
            id: 'st-10',
            threadId: 'matter-02',
            stageCode: 'STAGE-02-SCSC',
            stageName: 'SCSC Scheduled Scrutiny',
            plainExplanation: 'Meeting convened for 05 Nov 2026.',
            enteredAt: '2026-10-15T10:00:00Z',
            status: 'CURRENT',
            responsibleBureau: 'PGRC Bureau',
            decisionBody: 'Standing Committee'
          }
        ]
      }
    ]
  },

  // Matter 3: Clean Appeal Progression
  {
    id: 'matter-03',
    code: 'MTL-2026-0701',
    title: 'Appeal Against Intake Reduction for 2026-27',
    institutionId: 'inst-04',
    institutionName: 'Vindhya Polytechnic Institute, Bhopal',
    institutionPermanentId: '1-5120938',
    primaryRecordId: 'rec-pgrc-01', // placeholder
    recordIds: ['rec-pgrc-01'],
    status: 'ACTIVE_SCRUTINY',
    currentHolder: 'Standing Appellate Committee Secretary',
    currentHolderBureau: 'Appellate Bureau',
    currentStageCode: 'STAGE-05-SAC',
    currentStageName: 'Standing Appellate Committee (SAC)',
    plainStageDescription: 'Institution presented compliance affidavit against earlier SHC reduction order. Order reserved.',
    nextRequiredAction: 'Appellate Committee to finalize and publish decision memorandum.',
    waitingOn: 'Final signature of SAC members',
    deadline: '2026-11-18T17:00:00Z',
    daysRemaining: 17,
    hasIntegrityFlag: false,
    activeFlags: [],
    isRestricted: false,
    summaryText: 'Formal appeal against 25% intake curtailment in Diploma Mechanical Engineering.',
    createdAt: '2026-07-01T10:00:00Z',
    updatedAt: '2026-10-29T16:00:00Z',
    parallelTracks: []
  },

  // Matter 4: Stale Source Matter
  {
    id: 'matter-04',
    code: 'MTL-2026-1045',
    title: 'Land Conversion Compliance & Affiliation Validity',
    institutionId: 'inst-05',
    institutionName: 'North Valley Regional Institute of Management, Gandhinagar',
    institutionPermanentId: '1-6789012',
    primaryRecordId: 'rec-legal-02',
    recordIds: ['rec-legal-02'],
    status: 'ATTENTION_REQUIRED',
    currentHolder: 'Legal Cell Desk Officer',
    currentHolderBureau: 'Legal Cell',
    currentStageCode: 'STAGE-LEG-COURT',
    currentStageName: 'Pending High Court Return Date',
    plainStageDescription: 'Matter pending in Gujarat High Court. Last source snapshot is 45 days old.',
    nextRequiredAction: 'Request status refresh from Legal Cell.',
    waitingOn: 'Legal Soft snapshot import',
    deadline: '2026-11-25T17:00:00Z',
    daysRemaining: 24,
    hasIntegrityFlag: true,
    activeFlags: ['STALE_SOURCE'],
    isRestricted: false,
    summaryText: 'Court proceeding pending clarification on non-agricultural land conversion.',
    createdAt: '2025-04-12T10:00:00Z',
    updatedAt: '2026-09-17T11:00:00Z',
    parallelTracks: []
  }
];

export const SYNTHETIC_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud-01',
    ts: '2026-08-25T11:20:00Z',
    actorRole: 'SENIOR_REVIEWER',
    actorName: 'Dr. Ramesh Sharma',
    action: 'RELATIONSHIP_CONFIRMATION',
    objectRef: 'REL-02 (CSS-2026-9041 ↔ PGRC-2026-1182)',
    decision: 'CONFIRMED',
    reason: 'Verified against SCSC meeting intake list. Confirmed same underlying faculty and fee grievance.',
    ruleVersion: 'APH-RULE-2026-V1.4',
    prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
    hash: 'a3f890c2e847c1b529944d18ecf30b912a76f5b9918c5e62d4b9f2b84e031a99',
    payload: { fromRecord: 'rec-css-01', toRecord: 'rec-pgrc-01', edgeType: 'SAME_MATTER' }
  },
  {
    id: 'aud-02',
    ts: '2026-09-14T10:15:00Z',
    actorRole: 'PGRC_OFFICER',
    actorName: 'Sunita Meena',
    action: 'RELATIONSHIP_CONFIRMATION',
    objectRef: 'REL-03 (PGRC-2026-1182 ↔ RB-WRO-2026-4410)',
    decision: 'CONFIRMED',
    reason: 'Official committee transfer to WRO confirmed under SCSC recommendation.',
    ruleVersion: 'APH-RULE-2026-V1.4',
    prevHash: 'a3f890c2e847c1b529944d18ecf30b912a76f5b9918c5e62d4b9f2b84e031a99',
    hash: 'b71239aa8df8831ef78901ba3244c01289feee789012345bcdef0123456789ab',
    payload: { fromRecord: 'rec-pgrc-01', toRecord: 'rec-rb-01', edgeType: 'SAME_PROCEDURAL_CHAIN' }
  },
  {
    id: 'aud-03',
    ts: '2026-09-29T14:30:00Z',
    actorRole: 'LEGAL_OFFICER',
    actorName: 'Adv. Priya Deshmukh',
    action: 'PARALLEL_TRACK_LINK',
    objectRef: 'REL-04 (PGRC-2026-1182 ↔ HC-BOM-WP-4120-2026)',
    decision: 'CONFIRMED',
    reason: 'Court writ petition is directly related to SCSC notice; linked as parallel track under R-REL-07.',
    ruleVersion: 'APH-RULE-2026-V1.4',
    prevHash: 'b71239aa8df8831ef78901ba3244c01289feee789012345bcdef0123456789ab',
    hash: 'c89140fe77651a2490bbcf8290334df581023a9b441298810234123547890def',
    payload: { edgeType: 'RELATED_BUT_INDEPENDENT', courtCase: 'WP 4120/2026' }
  },
  {
    id: 'aud-04',
    ts: '2026-10-12T11:45:00Z',
    actorRole: 'SENIOR_REVIEWER',
    actorName: 'Dr. Ramesh Sharma',
    action: 'RELATIONSHIP_REJECTION',
    objectRef: 'REL-05 (CSS-2026-9041 ↔ PGRC-2026-3390)',
    decision: 'REJECTED',
    reason: 'Unrelated institutions in different regions; semantic similarity was coincidental. Pair cached in rejected memory.',
    ruleVersion: 'APH-RULE-2026-V1.4',
    prevHash: 'c89140fe77651a2490bbcf8290334df581023a9b441298810234123547890def',
    hash: 'd45678901234567890abcdef1234567890abcdef1234567890abcdef12345678',
    payload: { rejectedPair: ['rec-css-01', 'rec-pgrc-02'] }
  }
];

export const SYNTHETIC_GOVERNANCE_RULES: GovernanceRule[] = [
  {
    id: 'R-ID-01',
    category: 'HARD',
    title: 'Permanent ID First',
    edition: 'Edition 2026-27 (APH Cl. 2.1)',
    effectiveDate: '2026-04-01',
    description: 'If a valid Permanent ID exactly matches an institution identifier, use it as primary identity signal.',
    enforcementMethod: 'Deterministic Exact SQL / Adapter Key Lookup',
    isActive: true,
  },
  {
    id: 'R-ID-03',
    category: 'HARD',
    title: 'No Name-Only Merge',
    edition: 'Edition 2026-27',
    effectiveDate: '2026-04-01',
    description: 'Two institution entities must never be merged based only on name similarity.',
    enforcementMethod: 'Enforced at Connector and Entity Graph Layer',
    isActive: true,
  },
  {
    id: 'R-REL-01',
    category: 'HARD',
    title: 'Similarity Cannot Confirm',
    edition: 'Edition 2026-27',
    effectiveDate: '2026-04-01',
    description: 'Semantic similarity alone must never create a confirmed relationship without human sign-off.',
    enforcementMethod: 'Review Queue Routing & Abstention Gate',
    isActive: true,
  },
  {
    id: 'R-REL-07',
    category: 'HARD',
    title: 'Parallel Action is Not Duplication',
    edition: 'Edition 2026-27',
    effectiveDate: '2026-04-01',
    description: 'Court matter, vigilance matter, and complaint proceedings are legitimate parallel tracks; label as parallel, not duplicate.',
    enforcementMethod: 'Coordination Brief Multi-Track Model',
    isActive: true,
  },
  {
    id: 'R-PROC-05',
    category: 'PROCEDURAL',
    title: 'Transfer Acceptance Enforcement',
    edition: 'APH Chapter VII (Clause 7.4)',
    effectiveDate: '2026-04-01',
    description: 'If a transfer event exists without a matching acceptance event, raise TRANSFER_WITHOUT_ACCEPTANCE after 7 days.',
    enforcementMethod: 'Automated Snapshot Diff & Rule Evaluator',
    isActive: true,
  },
  {
    id: 'R-SEC-03',
    category: 'GOVERNANCE',
    title: 'Restricted Existence-Only View',
    edition: 'Vigilance & Legal Protocol 2026',
    effectiveDate: '2026-01-01',
    description: 'Cross-Bureau users may see that a restricted matter exists, along with permitted stage/holder, with detailed fields masked.',
    enforcementMethod: 'Attribute-Based Field Masking Policy',
    isActive: true,
  },
  {
    id: 'R-AUD-02',
    category: 'GOVERNANCE',
    title: 'Cryptographic Hash Chaining',
    edition: 'Audit Standard 2026',
    effectiveDate: '2026-01-01',
    description: 'Each audit entry must cryptographically incorporate previous hash and payload using SHA-256.',
    enforcementMethod: 'Append-Only Hash Chained Log',
    isActive: true,
  }
];

export const SYNTHETIC_BENCHMARK_BASELINES: BaselineMetric[] = [
  {
    name: 'B0: Exact ID & Notice Reference',
    code: 'B0-EXACT-ID',
    description: 'Matches only exact Permanent ID and identical notice reference strings.',
    falseLinkRate: '0.2%',
    precision: '99.4%',
    recall: '31.2%',
    abstentionRate: '68.6%',
    selectiveAccuracy: '99.1%',
  },
  {
    name: 'B1: Institution + 30-Day Date Window',
    code: 'B1-INST-WINDOW',
    description: 'Links records concerning the same institution filed within 30 days of each other.',
    falseLinkRate: '28.4%',
    precision: '62.1%',
    recall: '79.5%',
    abstentionRate: '0.0%',
    selectiveAccuracy: '62.1%',
  },
  {
    name: 'B2: BM25 Lexical Similarity',
    code: 'B2-BM25-LEXICAL',
    description: 'Ranks candidates via BM25 scores on normalized complaint text and notices.',
    falseLinkRate: '16.8%',
    precision: '74.3%',
    recall: '72.0%',
    abstentionRate: '12.4%',
    selectiveAccuracy: '76.8%',
  },
  {
    name: 'B3: Embeddings-Only (Vector Cosine)',
    code: 'B3-EMBEDDINGS-ONLY',
    description: 'Dense embedding similarity with fixed cosine threshold (>0.82).',
    falseLinkRate: '14.2%',
    precision: '78.5%',
    recall: '84.1%',
    abstentionRate: '9.5%',
    selectiveAccuracy: '81.2%',
  },
  {
    name: 'B4: Embeddings + Simple Rules',
    code: 'B4-EMBED-RULES',
    description: 'Combines embeddings with basic threshold rules and institution blocking.',
    falseLinkRate: '8.1%',
    precision: '88.6%',
    recall: '86.4%',
    abstentionRate: '16.0%',
    selectiveAccuracy: '89.4%',
  },
  {
    name: 'Proposed Staged Pipeline + Abstention Gate',
    code: 'PROPOSED-PIPELINE',
    description: 'Exact ID -> Named Entity & Ref Extraction -> Calibrated Scoring -> Confidence Tiers -> Human Review Gate.',
    falseLinkRate: '1.4%',
    precision: '96.2%',
    recall: '91.8%',
    abstentionRate: '21.5%',
    selectiveAccuracy: '97.6%',
    isProposedPipeline: true,
  }
];

