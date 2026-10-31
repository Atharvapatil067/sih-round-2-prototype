import React, { useState } from 'react';
import { useLedger } from '../../context/LedgerContext';
import { Institution } from '../../types';
import {
  Building2,
  FolderGit2,
  FileText,
  Shield,
  Clock,
  ArrowRight,
  ExternalLink,
  Tag,
  CheckCircle2,
  AlertTriangle,
  History,
  Layers,
  MapPin,
} from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';
import { FreshnessBadge } from '../ui/FreshnessBadge';
import { formatDate } from '../../utils/formatters';

interface InstitutionViewProps {
  institution: Institution;
}

export const InstitutionView: React.FC<InstitutionViewProps> = ({ institution }) => {
  const {
    matterThreads,
    sourceRecords,
    setSelectedMatterId,
    setActiveNav,
  } = useLedger();

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'MATTERS' | 'RECORDS' | 'IDENTIFIERS'>('OVERVIEW');

  const relatedMatters = matterThreads.filter((m) => m.institutionId === institution.id);
  const relatedRecords = sourceRecords.filter((r) => r.institutionId === institution.id);
  const actionsNeeded = relatedMatters.filter((m) => m.hasIntegrityFlag || m.status === 'ATTENTION_REQUIRED').length;

  return (
    <div className="space-y-6">
      {/* 1. Institution Header Card */}
      <div className="bg-white rounded-panel border border-ledger-border p-6 shadow-subtle">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-brand-skyLight text-brand-skyHover font-semibold border border-brand-sky/30">
                Permanent ID: {institution.permanentId}
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-ledger-surfaceSecondary text-ledger-textSecondary">
                App ID: {institution.applicationId}
              </span>
              <StatusBadge status={institution.status} />
              <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200 font-mono">
                Method: {institution.resolutionMethod} (100% Match)
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-ledger-textPrimary flex items-center gap-2.5">
              <Building2 className="w-6 h-6 text-brand-teal flex-shrink-0" />
              <span>{institution.canonicalName}</span>
            </h1>

            <p className="text-xs text-ledger-textSecondary flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-ledger-textMuted" />
              <span>
                {institution.campuses[0]?.location || institution.city}, {institution.district}, {institution.state}
              </span>
              <span className="text-ledger-textMuted">• Trust: {institution.trustName}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (relatedMatters[0]) {
                  setSelectedMatterId(relatedMatters[0].id);
                  setActiveNav('matters');
                }
              }}
              className="px-3.5 py-2 text-xs font-medium rounded-control bg-brand-teal hover:bg-brand-tealHover text-white shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Open Primary Matter Thread</span>
            </button>
          </div>
        </div>

        {/* Visual Summary Metric Row (Section 30 Design) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-ledger-border/60">
          <div className="bg-ledger-surfaceSecondary/70 p-3 rounded-card border border-ledger-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-ledger-textMuted block">
              Active Matters
            </span>
            <div className="text-xl font-bold text-ledger-textPrimary font-mono mt-0.5">
              {relatedMatters.length}
            </div>
            <span className="text-[11px] text-ledger-textSecondary">Derived from confirmed edges</span>
          </div>

          <div className="bg-ledger-surfaceSecondary/70 p-3 rounded-card border border-ledger-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-ledger-textMuted block">
              Source Records
            </span>
            <div className="text-xl font-bold text-ledger-textPrimary font-mono mt-0.5">
              {relatedRecords.length}
            </div>
            <span className="text-[11px] text-ledger-textSecondary">CSS, PGRC, RB, Court Cell</span>
          </div>

          <div className="bg-ledger-surfaceSecondary/70 p-3 rounded-card border border-ledger-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-ledger-textMuted block">
              Verified Aliases
            </span>
            <div className="text-xl font-bold text-ledger-textPrimary font-mono mt.0.5">
              {institution.aliases.length}
            </div>
            <span className="text-[11px] text-ledger-textSecondary">Documented name variants</span>
          </div>

          <div className={`p-3 rounded-card border ${actionsNeeded > 0 ? 'bg-rose-50/70 border-rose-200' : 'bg-emerald-50/70 border-emerald-200'}`}>
            <span className="text-[10px] font-mono uppercase tracking-wider text-ledger-textMuted block">
              Action Needed
            </span>
            <div className={`text-xl font-bold font-mono mt-0.5 ${actionsNeeded > 0 ? 'text-rose-700' : 'text-emerald-700'}`}>
              {actionsNeeded}
            </div>
            <span className="text-[11px] text-ledger-textSecondary">
              {actionsNeeded > 0 ? 'Handoff confirmation pending' : 'All workflows in order'}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 mt-6 border-b border-ledger-border">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'OVERVIEW'
                ? 'border-brand-teal text-brand-teal'
                : 'border-transparent text-ledger-textSecondary hover:text-ledger-textPrimary'
            }`}
          >
            Overview & Summary
          </button>
          <button
            onClick={() => setActiveTab('MATTERS')}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'MATTERS'
                ? 'border-brand-teal text-brand-teal'
                : 'border-transparent text-ledger-textSecondary hover:text-ledger-textPrimary'
            }`}
          >
            Matter Threads ({relatedMatters.length})
          </button>
          <button
            onClick={() => setActiveTab('RECORDS')}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'RECORDS'
                ? 'border-brand-teal text-brand-teal'
                : 'border-transparent text-ledger-textSecondary hover:text-ledger-textPrimary'
            }`}
          >
            Source Records ({relatedRecords.length})
          </button>
          <button
            onClick={() => setActiveTab('IDENTIFIERS')}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'IDENTIFIERS'
                ? 'border-brand-teal text-brand-teal'
                : 'border-transparent text-ledger-textSecondary hover:text-ledger-textPrimary'
            }`}
          >
            Identifier History & Aliases
          </button>
        </div>
      </div>

      {/* 2. Tab Contents */}
      {activeTab === 'OVERVIEW' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Matter Threads */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-sm font-semibold text-ledger-textPrimary">
              Active Matter Threads Concerning This Institution
            </h2>
            {relatedMatters.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-panel border border-ledger-border p-5 shadow-subtle hover:border-brand-teal transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-semibold text-brand-teal">
                        {m.code}
                      </span>
                      <StatusBadge status={m.status} size="sm" />
                      {m.hasIntegrityFlag && (
                        <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-mono">
                          Integrity Flag Open
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm text-ledger-textPrimary">{m.title}</h3>
                    <p className="text-xs text-ledger-textSecondary mt-1 leading-relaxed">
                      {m.summaryText}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedMatterId(m.id);
                      setActiveNav('matters');
                    }}
                    className="p-2 bg-ledger-surfaceSecondary hover:bg-brand-teal hover:text-white rounded-control text-ledger-textSecondary transition-colors flex-shrink-0"
                    title="Open Matter Details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-3 pt-3 border-t border-ledger-border/60 grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-ledger-textMuted uppercase font-mono block">Holder</span>
                    <span className="font-medium text-ledger-textPrimary">{m.currentHolder}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ledger-textMuted uppercase font-mono block">Stage</span>
                    <span className="font-medium text-ledger-textPrimary">{m.currentStageName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ledger-textMuted uppercase font-mono block">Next Action</span>
                    <span className="font-medium text-brand-teal truncate block">{m.nextRequiredAction}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Identity Provenance & Trust */}
          <div className="space-y-4">
            <div className="bg-white rounded-panel border border-ledger-border p-5 shadow-subtle space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ledger-textMuted">
                Identity Resolution Rules (R-ID-01)
              </h3>
              <p className="text-xs text-ledger-textSecondary leading-relaxed">
                Resolved via exact Permanent ID match. Under Rule R-ID-03, this institution is strictly separated from similarly named institutions (such as Apex Institute in Nagpur).
              </p>
              <div className="bg-ledger-surfaceSecondary p-3 rounded-lg text-xs space-y-1.5 font-mono">
                <div>Permanent ID: <span className="font-bold text-ledger-textPrimary">{institution.permanentId}</span></div>
                <div>Application ID: <span className="text-ledger-textPrimary">{institution.applicationId}</span></div>
                <div>Resolution Confidence: <span className="text-emerald-700 font-bold">100.0%</span></div>
              </div>
            </div>

            <div className="bg-white rounded-panel border border-ledger-border p-5 shadow-subtle space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ledger-textMuted">
                Verified Aliases (R-ID-02)
              </h3>
              <div className="space-y-2">
                {institution.aliases.map((al) => (
                  <div key={al.id} className="flex items-center justify-between text-xs p-2 bg-ledger-bg rounded border border-ledger-border">
                    <span className="font-medium text-ledger-textPrimary">{al.alias}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      al.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {al.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Matter Threads */}
      {activeTab === 'MATTERS' && (
        <div className="space-y-4">
          {relatedMatters.map((m) => (
            <div key={m.id} className="bg-white rounded-panel border border-ledger-border p-6 shadow-subtle flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-brand-teal">{m.code}</span>
                  <StatusBadge status={m.status} size="sm" />
                </div>
                <h3 className="text-base font-semibold text-ledger-textPrimary">{m.title}</h3>
                <p className="text-xs text-ledger-textSecondary">{m.summaryText}</p>
                <div className="text-xs text-ledger-textMuted pt-1">
                  Currently with: <span className="font-medium text-ledger-textPrimary">{m.currentHolder}</span> ({m.currentHolderBureau})
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedMatterId(m.id);
                  setActiveNav('matters');
                }}
                className="px-4 py-2 bg-brand-teal hover:bg-brand-tealHover text-white text-xs font-medium rounded-control shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <span>View Coordination Brief</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Source Records */}
      {activeTab === 'RECORDS' && (
        <div className="bg-white rounded-panel border border-ledger-border p-6 shadow-subtle">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-ledger-border text-[11px] font-mono uppercase text-ledger-textMuted bg-ledger-bg/40">
                  <th className="py-2.5 px-3">Reference</th>
                  <th className="py-2.5 px-3">System</th>
                  <th className="py-2.5 px-3">Bureau</th>
                  <th className="py-2.5 px-3">Grievance Summary</th>
                  <th className="py-2.5 px-3">Source Status</th>
                  <th className="py-2.5 px-3">Freshness</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ledger-border/60">
                {relatedRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-ledger-bg/60">
                    <td className="py-3 px-3 font-mono font-semibold text-ledger-textPrimary">
                      {rec.sourceRef}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-1.5 py-0.5 bg-slate-100 text-slate-800 rounded font-mono text-[10px]">
                        {rec.sourceSystemCode}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-ledger-textSecondary">{rec.bureauName}</td>
                    <td className="py-3 px-3 max-w-xs text-ledger-textPrimary">{rec.title}</td>
                    <td className="py-3 px-3">
                      <StatusBadge status={rec.statusNorm} customLabel={rec.statusRaw} size="sm" />
                    </td>
                    <td className="py-3 px-3">
                      <FreshnessBadge lastSeenAt={rec.lastSeenAt} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Identifiers History */}
      {activeTab === 'IDENTIFIERS' && (
        <div className="bg-white rounded-panel border border-ledger-border p-6 shadow-subtle space-y-4">
          <h3 className="text-sm font-semibold text-ledger-textPrimary">
            Identifier History (R-ID-05: Preserve Identifier History)
          </h3>
          <p className="text-xs text-ledger-textSecondary">
            Historical identifiers are retained with valid-from and valid-to timestamps. They are never overwritten destructively.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-ledger-border text-[11px] font-mono uppercase text-ledger-textMuted bg-ledger-bg/40">
                  <th className="py-2 px-3">Identifier Type</th>
                  <th className="py-2 px-3">Value</th>
                  <th className="py-2 px-3">Valid From</th>
                  <th className="py-2 px-3">Valid To</th>
                  <th className="py-2 px-3">Authoritative Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ledger-border/60 font-mono">
                {institution.identifiers.map((ident) => (
                  <tr key={ident.id}>
                    <td className="py-2.5 px-3 font-semibold text-brand-teal">{ident.idType}</td>
                    <td className="py-2.5 px-3 text-ledger-textPrimary font-bold">{ident.value}</td>
                    <td className="py-2.5 px-3 text-ledger-textSecondary">{ident.validFrom}</td>
                    <td className="py-2.5 px-3 text-ledger-textMuted">{ident.validTo || 'Present (Active)'}</td>
                    <td className="py-2.5 px-3 font-sans text-ledger-textSecondary">{ident.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

