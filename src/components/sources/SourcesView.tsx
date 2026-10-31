import React, { useState } from 'react';
import { useLedger } from '../../context/LedgerContext';
import { SourceRecord, SourceSystemCode } from '../../types';
import { SYNTHETIC_SOURCE_SYSTEMS } from '../../data/syntheticData';
import {
  Database,
  FileText,
  Clock,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  ArrowRight,
} from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';
import { FreshnessBadge } from '../ui/FreshnessBadge';
import { formatDate } from '../../utils/formatters';

export const SourcesView: React.FC = () => {
  const { sourceRecords, setSelectedMatterId, setActiveNav, matterThreads } = useLedger();
  const [selectedSystem, setSelectedSystem] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const filteredRecords = sourceRecords.filter((rec) => {
    const matchesSystem = selectedSystem === 'ALL' || rec.sourceSystemCode === selectedSystem;
    const matchesSearch =
      searchFilter === '' ||
      rec.sourceRef.toLowerCase().includes(searchFilter.toLowerCase()) ||
      rec.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      rec.institutionName.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesSystem && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-ledger-textPrimary">
          Source Systems & Snapshot Records
        </h1>
        <p className="text-xs sm:text-sm text-ledger-textSecondary mt-0.5">
          Ingested read-only snapshots from AICTE intake systems. Under Rule R-FRESH-01, each source system remains the owner of its records and raw statuses.
        </p>
      </div>

      {/* Source Systems Ingestion Health Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {SYNTHETIC_SOURCE_SYSTEMS.map((sys) => {
          const isStale = sys.isStale;
          const count = sourceRecords.filter((r) => r.sourceSystemCode === sys.code).length;

          return (
            <div
              key={sys.id}
              onClick={() => setSelectedSystem(selectedSystem === sys.code ? 'ALL' : sys.code)}
              className={`p-4 rounded-panel border cursor-pointer transition-all ${
                selectedSystem === sys.code
                  ? 'border-brand-teal ring-2 ring-brand-tealLight/50 bg-white'
                  : 'bg-white border-ledger-border hover:border-brand-teal/50'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-ledger-surfaceSecondary text-ledger-textPrimary">
                  {sys.code}
                </span>
                {isStale ? (
                  <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-mono font-semibold">
                    STALE
                  </span>
                ) : (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-mono">
                    HEALTHY
                  </span>
                )}
              </div>

              <div className="font-semibold text-xs text-ledger-textPrimary line-clamp-1">
                {sys.name}
              </div>

              <div className="mt-2 pt-2 border-t border-ledger-border/60 flex items-center justify-between text-[11px] text-ledger-textMuted">
                <span>{count} Records</span>
                <span className="font-mono">SLA: {sys.freshnessSlaHours}h</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-card border border-ledger-border">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-ledger-textMuted" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter by reference, institution, or keyword..."
            className="w-full text-xs bg-transparent border-none focus:outline-none placeholder:text-ledger-textMuted"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-ledger-textMuted font-mono">Showing {filteredRecords.length} records</span>
          {selectedSystem !== 'ALL' && (
            <button
              onClick={() => setSelectedSystem('ALL')}
              className="text-brand-teal underline font-medium"
            >
              Clear system filter
            </button>
          )}
        </div>
      </div>

      {/* Ingested Records Table */}
      <div className="bg-white rounded-panel border border-ledger-border shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-ledger-border text-[11px] font-mono uppercase text-ledger-textMuted bg-ledger-bg/40">
                <th className="py-3 px-4">Source Reference</th>
                <th className="py-3 px-4">System</th>
                <th className="py-3 px-4">Owning Bureau</th>
                <th className="py-3 px-4">Grievance / Case Summary</th>
                <th className="py-3 px-4">Target Institution</th>
                <th className="py-3 px-4">Source Status</th>
                <th className="py-3 px-4">Freshness</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ledger-border/60">
              {filteredRecords.map((rec) => {
                const parentMatter = matterThreads.find((m) => m.recordIds.includes(rec.id));

                return (
                  <tr key={rec.id} className="hover:bg-ledger-bg/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-ledger-textPrimary">
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-ledger-textMuted" />
                        <span>{rec.sourceRef}</span>
                      </div>
                      <span className="text-[10px] text-ledger-textMuted font-sans font-normal">
                        Opened: {formatDate(rec.openedAt)}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-mono text-[10px] font-semibold">
                        {rec.sourceSystemCode}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-ledger-textSecondary">
                      {rec.bureauName}
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-semibold text-ledger-textPrimary line-clamp-1">{rec.title}</div>
                      <div className="text-[11px] text-ledger-textSecondary line-clamp-1 mt-0.5">{rec.summary}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-ledger-textPrimary line-clamp-1">{rec.institutionName}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={rec.statusNorm} customLabel={rec.statusRaw} size="sm" />
                    </td>

                    <td className="py-3.5 px-4">
                      <FreshnessBadge lastSeenAt={rec.lastSeenAt} />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {parentMatter ? (
                        <button
                          onClick={() => {
                            setSelectedMatterId(parentMatter.id);
                            setActiveNav('coordination');
                          }}
                          className="text-xs font-semibold text-brand-teal hover:underline flex items-center gap-1 justify-end"
                        >
                          <span>{parentMatter.code}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <span className="text-[10px] text-ledger-textMuted font-mono">Unthreaded</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

