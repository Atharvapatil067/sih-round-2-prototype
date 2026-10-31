import React, { useState } from 'react';
import { useLedger } from '../../context/LedgerContext';
import { MatterThread } from '../../types';
import {
  Building2,
  Calendar,
  Clock,
  ArrowRight,
  Shield,
  AlertOctagon,
  FileText,
  UserCheck,
  CheckCircle2,
  ChevronRight,
  Lock,
  ExternalLink,
  Info,
  Sparkles,
  GitBranch,
} from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';
import { FreshnessBadge } from '../ui/FreshnessBadge';
import { IntegrityFlagBanner } from '../ui/IntegrityFlagBanner';
import { ProceduralTimeline } from '../timeline/ProceduralTimeline';
import { formatDate } from '../../utils/formatters';

interface CoordinationBriefProps {
  matter: MatterThread;
  onSelectRecord?: (recordId: string) => void;
  onOpenGraphView?: () => void;
}

export const CoordinationBrief: React.FC<CoordinationBriefProps> = ({
  matter,
  onSelectRecord,
  onOpenGraphView,
}) => {
  const {
    institutions,
    sourceRecords,
    alerts,
    acknowledgeTransfer,
    requestRestrictedAccess,
    currentRole,
    setSelectedInstitutionId,
    setActiveNav,
  } = useLedger();

  const [accessRequested, setAccessRequested] = useState(false);
  const [justification, setJustification] = useState('');
  const [showRequestDialog, setShowRequestDialog] = useState(false);

  const institution = institutions.find((i) => i.id === matter.institutionId);
  const memberRecords = sourceRecords.filter((r) => matter.recordIds.includes(r.id));
  const matterAlerts = alerts.filter((a) => a.threadId === matter.id && !a.isResolved);

  const mainAlert = matterAlerts.find(
    (a) => a.flagType === 'TRANSFER_WITHOUT_ACCEPTANCE'
  ) || matterAlerts[0];

  const handleAcknowledge = async () => {
    if (mainAlert) {
      await acknowledgeTransfer(matter.id, mainAlert.id);
    }
  };

  const handleAccessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await requestRestrictedAccess(matter.id, justification || 'Statutory coordination review');
    setAccessRequested(true);
    setShowRequestDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. HERO OPERATIONAL BANNER (Answers: What is happening right now?) */}
      <div className="rounded-panel bg-navy-bg border border-navy-border p-6 shadow-dark-elevated text-navy-text relative overflow-hidden">
        {/* Subtle background circuit/grid motif */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1EA7A8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-brand-tealMuted text-brand-teal border border-brand-teal/40 font-semibold">
                {matter.code}
              </span>
              <StatusBadge status={matter.status} />
              {matter.isRestricted && (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-purple-900/60 text-purple-200 border border-purple-700/60">
                  <Lock className="w-3 h-3 text-purple-300" />
                  <span>Restricted Coordination</span>
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-navy-text">
              {matter.title}
            </h1>

            {/* Institution clickable link */}
            <div className="flex items-center gap-2 text-xs text-navy-textSecondary pt-1">
              <Building2 className="w-4 h-4 text-brand-sky" />
              <button
                onClick={() => {
                  setSelectedInstitutionId(matter.institutionId);
                  setActiveNav('institutions');
                }}
                className="hover:text-brand-sky hover:underline text-left font-medium transition-colors"
              >
                {matter.institutionName}
              </button>
              <span className="font-mono text-navy-textMuted">• PID: {matter.institutionPermanentId}</span>
              <span className="text-[10px] bg-emerald-900/40 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-700/50">
                100% Identity Match
              </span>
            </div>
          </div>

          {onOpenGraphView && (
            <button
              onClick={onOpenGraphView}
              className="px-3.5 py-2 text-xs font-medium rounded-control bg-navy-surface hover:bg-navy-elevated text-navy-text border border-navy-border shadow-dark-subtle flex items-center gap-2 transition-colors"
            >
              <GitBranch className="w-4 h-4 text-brand-teal" />
              <span>Explore Visual Thread Graph</span>
            </button>
          )}
        </div>

        {/* 4 Core Operational Answers (Section 12 Layout) */}
        <div className="mt-6 pt-6 border-t border-navy-border/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Box 1: Currently With */}
          <div className="bg-navy-surface/80 p-3.5 rounded-card border border-navy-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-navy-textMuted block">
              1. Currently With
            </span>
            <div className="text-sm font-semibold text-navy-text mt-1">
              {matter.currentHolder}
            </div>
            <span className="text-xs text-brand-sky mt-0.5 block">
              {matter.currentHolderBureau}
            </span>
          </div>

          {/* Box 2: Where in the Process */}
          <div className="bg-navy-surface/80 p-3.5 rounded-card border border-navy-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-navy-textMuted block">
              2. Where it is in Process
            </span>
            <div className="text-sm font-semibold text-navy-text mt-1">
              {matter.currentStageName}
            </div>
            <span className="text-xs text-navy-textSecondary mt-0.5 line-clamp-1">
              {matter.plainStageDescription}
            </span>
          </div>

          {/* Box 3: What is it Waiting For */}
          <div className="bg-navy-surface/80 p-3.5 rounded-card border border-navy-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-navy-textMuted block">
              3. Waiting For
            </span>
            <div className={`text-sm font-semibold mt-1 ${matter.hasIntegrityFlag ? 'text-rose-300' : 'text-amber-300'}`}>
              {matter.waitingOn}
            </div>
            <span className="text-xs text-navy-textSecondary mt-0.5 block">
              {matter.hasIntegrityFlag ? 'Handoff confirmation pending' : 'Next procedural milestone'}
            </span>
          </div>

          {/* Box 4: Next Required Action & Deadline */}
          <div className="bg-navy-surface/80 p-3.5 rounded-card border border-navy-border">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-navy-textMuted block">
                4. Next Required Action
              </span>
              {matter.deadline && (
                <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-800">
                  Due {formatDate(matter.deadline)}
                </span>
              )}
            </div>
            <div className="text-xs font-semibold text-brand-teal mt-1 leading-snug">
              {matter.nextRequiredAction}
            </div>
          </div>
        </div>
      </div>

      {/* 2. CRITICAL INTEGRITY GAP (If open) */}
      {mainAlert && !mainAlert.isResolved && (
        <IntegrityFlagBanner
          flagType={mainAlert.flagType}
          title={mainAlert.title}
          humanDescription={mainAlert.humanDescription}
          technicalReasonCode={mainAlert.technicalReasonCode}
          originBureau={mainAlert.originBureau}
          receivingBureau={mainAlert.receivingBureau}
          ageDays={mainAlert.ageDays}
          expectedNextAction={mainAlert.expectedNextAction}
          onActionClick={handleAcknowledge}
          actionButtonLabel="Acknowledge Receipt & Clear Handoff Flag"
        />
      )}

      {/* 3. MULTI-BUREAU MEMBER RECORDS & PROVENANCE (PRD FR-1 & FR-7) */}
      <div className="bg-white rounded-panel border border-ledger-border p-6 shadow-subtle">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base font-semibold text-ledger-textPrimary">
              Member Source Records Across AICTE Bureaus
            </h2>
            <p className="text-xs text-ledger-textSecondary mt-0.5">
              Source systems remain authoritative. This ledger tracks coordination state without collapsing records (R-REL-04).
            </p>
          </div>
          <span className="text-xs font-mono text-ledger-textMuted bg-ledger-surfaceSecondary px-2.5 py-1 rounded border border-ledger-border">
            {memberRecords.length} Active Records Ingested
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-ledger-border text-[11px] font-mono uppercase text-ledger-textMuted bg-ledger-bg/40">
                <th className="py-2.5 px-3">Source & Reference</th>
                <th className="py-2.5 px-3">Bureau Holder</th>
                <th className="py-2.5 px-3">Title / Core Grievance</th>
                <th className="py-2.5 px-3">Source Status</th>
                <th className="py-2.5 px-3">Complainant Identity</th>
                <th className="py-2.5 px-3">Freshness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ledger-border/60">
              {memberRecords.map((rec) => {
                const isRestricted = rec.sensitivityLabel === 'RESTRICTED';

                return (
                  <tr key={rec.id} className="hover:bg-ledger-bg/60 transition-colors">
                    <td className="py-3 px-3 font-mono">
                      <div className="font-semibold text-ledger-textPrimary flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-ledger-textMuted" />
                        <span>{rec.sourceRef}</span>
                      </div>
                      <span className="text-[10px] text-ledger-textMuted">{rec.sourceSystemCode} System</span>
                    </td>

                    <td className="py-3 px-3">
                      <span className="font-medium text-ledger-textPrimary">{rec.bureauName}</span>
                    </td>

                    <td className="py-3 px-3 max-w-xs">
                      {isRestricted ? (
                        <div className="flex items-center gap-1.5 text-purple-900 font-medium italic">
                          <Lock className="w-3.5 h-3.5 text-purple-600" />
                          <span>Confidential Fact Finding (Restricted)</span>
                        </div>
                      ) : (
                        <div>
                          <div className="font-medium text-ledger-textPrimary line-clamp-1">{rec.title}</div>
                          <div className="text-[11px] text-ledger-textSecondary line-clamp-1">{rec.summary}</div>
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-3">
                      <StatusBadge status={rec.statusNorm} customLabel={rec.statusRaw} size="sm" />
                    </td>

                    <td className="py-3 px-3 font-mono text-[11px]">
                      <span className="text-ledger-textSecondary" title="Masked by default per R-SEC-02">
                        {rec.complainantMasked}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <FreshnessBadge lastSeenAt={rec.lastSeenAt} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. PROCEDURAL LINEAGE & PARALLEL TRACKS */}
      <div className="bg-white rounded-panel border border-ledger-border p-6 shadow-subtle space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-ledger-textPrimary">
              Where This Matter is in the Process (Procedural Lineage)
            </h2>
            <p className="text-xs text-ledger-textSecondary mt-0.5">
              Tracks formal stages from complaint intake to Standing Appellate Committee (SAC) decisions, including parallel tracks (R-REL-07).
            </p>
          </div>
          <span className="text-xs font-mono text-ledger-textMuted bg-ledger-surfaceSecondary px-2.5 py-1 rounded">
            APH Edition 2026-27
          </span>
        </div>

        <ProceduralTimeline tracks={matter.parallelTracks} />
      </div>

      {/* 5. RESTRICTED MATTER PLACEHOLDER & ACCESS REQUEST (PRD FR-7 & R-SEC-03/04) */}
      {matter.isRestricted && (
        <div className="bg-purple-50/70 border border-purple-200 rounded-panel p-6 shadow-subtle">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-purple-100 text-purple-700 rounded-lg mt-0.5">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-purple-950">
                    Restricted Vigilance Proceeding Linked (Existence-Only View)
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-200 text-purple-900 font-semibold">
                    R-SEC-03 COMPLIANT
                  </span>
                </div>
                <p className="text-xs text-purple-900 mt-1 max-w-2xl leading-relaxed">
                  A confidential in-camera inquiry is registered with the Chief Vigilance Office regarding Apex Institute of Technology. Cross-Bureau officers can see the existence and stage of this matter to prevent conflicting proceedings, but substantive records remain masked.
                </p>

                <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div className="bg-white/80 p-2 rounded border border-purple-200">
                    <span className="text-purple-700 block text-[10px] font-mono uppercase">Reference</span>
                    <span className="font-semibold text-purple-950">VIG-CONF-2026-042</span>
                  </div>
                  <div className="bg-white/80 p-2 rounded border border-purple-200">
                    <span className="text-purple-700 block text-[10px] font-mono uppercase">Custodian</span>
                    <span className="font-semibold text-purple-950">Chief Vigilance Officer</span>
                  </div>
                  <div className="bg-white/80 p-2 rounded border border-purple-200">
                    <span className="text-purple-700 block text-[10px] font-mono uppercase">Current Stage</span>
                    <span className="font-semibold text-purple-950">Preliminary Scrutiny</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {accessRequested ? (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-purple-200 text-purple-900 text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4 text-purple-700" />
                  <span>Access Request Pending CVO Review</span>
                </div>
              ) : (
                <button
                  onClick={() => setShowRequestDialog(true)}
                  className="px-3.5 py-2 bg-purple-900 hover:bg-purple-950 text-white rounded-control text-xs font-medium flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Request Full Record Access</span>
                </button>
              )}
            </div>
          </div>

          {/* Access Request Modal */}
          {showRequestDialog && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-bg/60 backdrop-blur-sm animate-fade-in">
              <div className="bg-white rounded-panel p-6 max-w-md w-full shadow-elevated border border-ledger-border space-y-4">
                <div className="flex items-center gap-2 text-purple-950 font-semibold text-base">
                  <Shield className="w-5 h-5 text-purple-700" />
                  <span>Request Access to Restricted Matter</span>
                </div>
                <p className="text-xs text-ledger-textSecondary leading-relaxed">
                  Under Rule R-SEC-04, accessing unmasked Vigilance proceedings requires a stated statutory justification. Your request will be appended to the immutable audit log.
                </p>
                <form onSubmit={handleAccessSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-ledger-textPrimary mb-1">
                      Statutory Stated Purpose / Reason
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={justification}
                      onChange={(e) => setJustification(e.target.value)}
                      placeholder="e.g. Preparing Expert Visit Committee briefing packet for Regional Bureau..."
                      className="w-full text-xs p-2.5 rounded-input border border-ledger-border text-ledger-textPrimary focus:ring-1 focus:ring-purple-700"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowRequestDialog(false)}
                      className="px-3 py-1.5 text-xs text-ledger-textSecondary hover:bg-ledger-surfaceSecondary rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-medium text-white bg-purple-900 hover:bg-purple-950 rounded-control"
                    >
                      Submit Logged Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

