import React from 'react';
import { useLedger } from '../context/LedgerContext';
import {
  AlertOctagon,
  Clock,
  Sparkles,
  ArrowRight,
  FolderGit2,
  Building2,
  CheckCircle2,
  TrendingUp,
  Activity,
  Layers,
  ShieldCheck,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import { StatusBadge } from '../components/ui/StatusBadge';
import { formatDate } from '../utils/formatters';
import { MatterThread, IntegrityAlert, RecordRelation } from '../types';

export const OverviewDashboard: React.FC = () => {
  const {
    currentUser,
    matterThreads,
    alerts,
    relations,
    institutions,
    setSelectedMatterId,
    setSelectedInstitutionId,
    setActiveNav,
  } = useLedger();

  const activeMatters = matterThreads.filter((m: MatterThread) => m.status !== 'RESOLVED');
  const openAlerts = alerts.filter((a: IntegrityAlert) => !a.isResolved);
  const pendingReviews = relations.filter((r: RecordRelation) => r.state === 'PROPOSED');
  const staleMatters = matterThreads.filter((m: MatterThread) => m.activeFlags.includes('STALE_SOURCE'));

  // Critical matters that need urgent attention
  const mattersNeedingAttention = matterThreads.filter(
    (m: MatterThread) => m.hasIntegrityFlag || m.status === 'ATTENTION_REQUIRED'
  );

  return (
    <div className="space-y-6">
      {/* 1. VISUALLY STRONG DASHBOARD HERO (Section 6 & 18) */}
      <div className="rounded-panel bg-navy-bg border border-navy-border p-6 shadow-dark-elevated text-navy-text relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1EA7A8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-teal uppercase tracking-wider font-semibold">
              <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
              <span>AICTE Cross-Bureau Complaint Intelligence • Live Snapshot State</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-navy-text mt-1.5">
              Good morning, {currentUser?.name?.split(' ')[0] || 'Officer'}.
            </h1>

            <p className="text-sm text-navy-textSecondary mt-1 max-w-2xl">
              {mattersNeedingAttention.length} matters currently need attention across regional bureaus. Handoff bottlenecks and proposed relationship edges are highlighted below.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveNav('review')}
              className="px-3.5 py-2 text-xs font-medium rounded-control bg-brand-teal hover:bg-brand-tealHover text-white shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Review Possible Connections ({pendingReviews.length})</span>
            </button>
          </div>
        </div>

        {/* Compact KPI Row (Section 6) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-6 border-t border-navy-border/60">
          <div className="bg-navy-surface/90 p-3 rounded-card border border-navy-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-navy-textMuted block">
              Active Matters
            </span>
            <div className="text-xl font-bold text-navy-text font-mono mt-0.5">
              {activeMatters.length}
            </div>
            <span className="text-[11px] text-brand-sky">Derived Threads</span>
          </div>

          <div className="bg-navy-surface/90 p-3 rounded-card border border-navy-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-navy-textMuted block">
              Pending Review
            </span>
            <div className="text-xl font-bold text-amber-400 font-mono mt-0.5">
              {pendingReviews.length}
            </div>
            <span className="text-[11px] text-navy-textSecondary">Human Adjudication</span>
          </div>

          <div className="bg-navy-surface/90 p-3 rounded-card border border-navy-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-navy-textMuted block">
              Integrity Issues
            </span>
            <div className="text-xl font-bold text-rose-400 font-mono mt-0.5">
              {openAlerts.length}
            </div>
            <span className="text-[11px] text-rose-300">Handoff / Sync Gaps</span>
          </div>

          <div className="bg-navy-surface/90 p-3 rounded-card border border-navy-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-navy-textMuted block">
              Stale Sources
            </span>
            <div className="text-xl font-bold text-amber-300 font-mono mt-0.5">
              {staleMatters.length}
            </div>
            <span className="text-[11px] text-navy-textSecondary">SLA Breaches</span>
          </div>

          <div className="bg-navy-surface/90 p-3 rounded-card border border-navy-border col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-navy-textMuted block">
              Upcoming Deadlines
            </span>
            <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">
              2
            </div>
            <span className="text-[11px] text-navy-textSecondary">Within 14 Days</span>
          </div>
        </div>
      </div>

      {/* 2. MATTERS NEEDING ATTENTION (Section 6-A) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-ledger-textPrimary flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-rose-600" />
            <span>Matters Needing Your Attention</span>
          </h2>
          <span className="text-xs text-ledger-textMuted">Sorted by urgency & SLA breach age</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mattersNeedingAttention.map((matter: MatterThread) => {
            const isTransferFlag = matter.activeFlags.includes('TRANSFER_WITHOUT_ACCEPTANCE');

            return (
              <div
                key={matter.id}
                className="bg-white rounded-panel border border-ledger-border hover:border-brand-teal p-5 shadow-subtle transition-all space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-semibold text-brand-teal">
                      {matter.code}
                    </span>
                    <StatusBadge status={matter.status} size="sm" />
                  </div>

                  <h3 className="font-semibold text-sm text-ledger-textPrimary line-clamp-1">
                    {matter.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-ledger-textSecondary mt-1">
                    <Building2 className="w-3.5 h-3.5 text-ledger-textMuted flex-shrink-0" />
                    <span className="truncate">{matter.institutionName}</span>
                  </div>

                  {/* Visual Issue Box */}
                  <div
                    className={`mt-3 p-3 rounded-lg text-xs border ${
                      isTransferFlag
                        ? 'bg-rose-50/70 border-rose-200 text-rose-900'
                        : 'bg-amber-50/70 border-amber-200 text-amber-900'
                    }`}
                  >
                    <div className="font-semibold flex items-center gap-1.5">
                      {isTransferFlag ? (
                        <AlertOctagon className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      )}
                      <span>
                        {isTransferFlag ? 'Transfer Not Accepted (18 days old)' : 'Source Stale / Review Required'}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] opacity-90 leading-relaxed">
                      Waiting for: <span className="font-medium">{matter.waitingOn}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-ledger-border/60 flex items-center justify-between">
                  <div className="text-[11px] text-ledger-textMuted">
                    With: <span className="font-medium text-ledger-textPrimary">{matter.currentHolder}</span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedMatterId(matter.id);
                      setActiveNav('coordination');
                    }}
                    className="text-xs font-semibold text-brand-teal hover:text-brand-tealHover flex items-center gap-1"
                  >
                    <span>Open Coordination Brief</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. PROCEDURAL PROGRESSION PIPELINE (Section 6-B & 19 of Design) */}
      <div className="bg-white rounded-panel border border-ledger-border p-6 shadow-subtle space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-ledger-textPrimary">
              Active Matters Across Procedural Stages
            </h2>
            <p className="text-xs text-ledger-textSecondary mt-0.5">
              Standard AICTE complaint-to-appeal stages under Approval Process Handbook (APH) regulations.
            </p>
          </div>
          <span className="text-xs font-mono text-ledger-textMuted bg-ledger-surfaceSecondary px-2 py-1 rounded">
            Pipeline Velocity: Normal
          </span>
        </div>

        {/* Multi-step Visual Funnel */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {/* Stage 1: Grievance Intake */}
          <div className="p-3.5 bg-ledger-surfaceSecondary/80 rounded-card border border-ledger-border text-center space-y-1">
            <span className="text-[10px] font-mono uppercase text-ledger-textMuted block">Stage 1</span>
            <div className="text-base font-bold text-ledger-textPrimary">CSS Intake</div>
            <div className="text-xs text-brand-teal font-mono font-bold">2 Records</div>
            <span className="text-[10px] text-ledger-textMuted block">Filtering & Verification</span>
          </div>

          {/* Stage 2: SCSC Scrutiny */}
          <div className="p-3.5 bg-brand-tealLight/30 rounded-card border border-brand-teal/30 text-center space-y-1">
            <span className="text-[10px] font-mono uppercase text-brand-teal block">Stage 2</span>
            <div className="text-base font-bold text-ledger-textPrimary">SCSC Scrutiny</div>
            <div className="text-xs text-brand-teal font-mono font-bold">1 Matter</div>
            <span className="text-[10px] text-ledger-textMuted block">PGRC Committee</span>
          </div>

          {/* Stage 3: EVC Inspection */}
          <div className="p-3.5 bg-rose-50/80 rounded-card border border-rose-300 text-center space-y-1 ring-2 ring-rose-200">
            <span className="text-[10px] font-mono uppercase text-rose-600 font-semibold block">Stage 3 (Gap)</span>
            <div className="text-base font-bold text-rose-950">EVC Inspection</div>
            <div className="text-xs text-rose-700 font-mono font-bold">1 File Blocked</div>
            <span className="text-[10px] text-rose-600 block">Waiting RO Receipt</span>
          </div>

          {/* Stage 4: SHC Hearing */}
          <div className="p-3.5 bg-ledger-surfaceSecondary/80 rounded-card border border-ledger-border text-center space-y-1">
            <span className="text-[10px] font-mono uppercase text-ledger-textMuted block">Stage 4</span>
            <div className="text-base font-bold text-ledger-textPrimary">SHC Hearing</div>
            <div className="text-xs text-slate-600 font-mono font-bold">0 Pending</div>
            <span className="text-[10px] text-ledger-textMuted block">Defense Presentation</span>
          </div>

          {/* Stage 5: SAC Appeal */}
          <div className="p-3.5 bg-emerald-50/70 rounded-card border border-emerald-200 text-center space-y-1 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono uppercase text-emerald-700 block">Stage 5</span>
            <div className="text-base font-bold text-emerald-950">SAC Appeal</div>
            <div className="text-xs text-emerald-700 font-mono font-bold">1 Matter</div>
            <span className="text-[10px] text-emerald-600 block">Standing Appellate</span>
          </div>
        </div>
      </div>

      {/* 4. RECENT ACTIVITY & SNAPSHOT FRESHNESS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Link Adjudications */}
        <div className="bg-white rounded-panel border border-ledger-border p-5 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-ledger-textPrimary flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Recent Coordination & Review Actions</span>
            </h3>
            <button
              onClick={() => setActiveNav('audit')}
              className="text-xs text-brand-teal hover:underline font-medium"
            >
              View Immutable Audit Log
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-ledger-bg/60 rounded-lg border border-ledger-border flex items-start justify-between gap-2">
              <div>
                <span className="font-semibold text-ledger-textPrimary block">
                  Confirmed SAME_MATTER relationship
                </span>
                <span className="text-ledger-textSecondary text-[11px]">
                  CSS-2026-9041 linked to PGRC-2026-1182 by Senior Reviewer
                </span>
              </div>
              <span className="font-mono text-[10px] text-ledger-textMuted">25 Aug</span>
            </div>

            <div className="p-3 bg-ledger-bg/60 rounded-lg border border-ledger-border flex items-start justify-between gap-2">
              <div>
                <span className="font-semibold text-ledger-textPrimary block">
                  Confirmed Procedural Handoff
                </span>
                <span className="text-ledger-textSecondary text-[11px]">
                  PGRC-2026-1182 transferred to RB-WRO-2026-4410 under SCSC minute
                </span>
              </div>
              <span className="font-mono text-[10px] text-ledger-textMuted">14 Sep</span>
            </div>

            <div className="p-3 bg-ledger-bg/60 rounded-lg border border-ledger-border flex items-start justify-between gap-2">
              <div>
                <span className="font-semibold text-ledger-textPrimary block">
                  Linked Legitimate Parallel Track
                </span>
                <span className="text-ledger-textSecondary text-[11px]">
                  Bombay High Court WP 4120/2026 connected under Rule R-REL-07
                </span>
              </div>
              <span className="font-mono text-[10px] text-ledger-textMuted">29 Sep</span>
            </div>
          </div>
        </div>

        {/* Source System Sync Freshness */}
        <div className="bg-white rounded-panel border border-ledger-border p-5 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-ledger-textPrimary flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-teal" />
              <span>Source Systems Freshness & Ingestion SLAs</span>
            </h3>
            <button
              onClick={() => setActiveNav('sources')}
              className="text-xs text-brand-teal hover:underline font-medium"
            >
              All Ingested Records
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-2.5 bg-emerald-50/50 rounded-lg border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="font-semibold text-emerald-950 block">Centralized Support System (CSS)</span>
                <span className="text-emerald-700 text-[11px]">Last sync: 2.5 hours ago (SLA: 24h)</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-mono text-[10px]">HEALTHY</span>
            </div>

            <div className="p-2.5 bg-emerald-50/50 rounded-lg border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="font-semibold text-emerald-950 block">PGRC Portal (Grievance Bureau)</span>
                <span className="text-emerald-700 text-[11px]">Last sync: 4 hours ago (SLA: 48h)</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-mono text-[10px]">HEALTHY</span>
            </div>

            <div className="p-2.5 bg-rose-50/70 rounded-lg border border-rose-200 flex items-center justify-between">
              <div>
                <span className="font-semibold text-rose-950 block">Legal Soft (Court Tracker)</span>
                <span className="text-rose-700 text-[11px]">Last sync: 45 days ago (SLA: 7 days breached)</span>
              </div>
              <span className="px-2 py-0.5 bg-rose-200 text-rose-900 rounded font-mono text-[10px] font-bold">STALE SOURCE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
