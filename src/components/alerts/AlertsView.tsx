import React, { useState } from 'react';
import { useLedger } from '../../context/LedgerContext';
import { IntegrityAlert } from '../../types';
import {
  AlertOctagon,
  AlertTriangle,
  Info,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Clock,
  Filter,
} from 'lucide-react';
import { formatIntegrityFlag, formatDate } from '../../utils/formatters';

export const AlertsView: React.FC = () => {
  const { alerts, acknowledgeTransfer, setSelectedMatterId, setActiveNav } = useLedger();
  const [filterSeverity, setFilterSeverity] = useState<'ALL' | 'CRITICAL' | 'WARNING' | 'INFO'>('ALL');

  const openAlerts = alerts.filter((a) => !a.isResolved);
  const resolvedAlerts = alerts.filter((a) => a.isResolved);

  const filteredAlerts = openAlerts.filter(
    (a) => filterSeverity === 'ALL' || a.severity === filterSeverity
  );

  const needsActionCount = openAlerts.filter((a) => a.severity === 'CRITICAL').length;
  const warningCount = openAlerts.filter((a) => a.severity === 'WARNING').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-ledger-textPrimary">
            Integrity Alerts & Handoff Flags
          </h1>
          <p className="text-xs sm:text-sm text-ledger-textSecondary mt-0.5">
            The ledger surfaces institutional coordination gaps, unacknowledged transfers, and conflicting source statuses. Nothing is silently resolved.
          </p>
        </div>

        {/* Severity Filters */}
        <div className="flex items-center gap-1 bg-ledger-surfaceSecondary p-1 rounded-lg border border-ledger-border text-xs font-medium">
          <button
            onClick={() => setFilterSeverity('ALL')}
            className={`px-3 py-1.5 rounded-control transition-colors ${
              filterSeverity === 'ALL'
                ? 'bg-white text-ledger-textPrimary shadow-xs font-semibold'
                : 'text-ledger-textSecondary hover:text-ledger-textPrimary'
            }`}
          >
            All Open ({openAlerts.length})
          </button>
          <button
            onClick={() => setFilterSeverity('CRITICAL')}
            className={`px-3 py-1.5 rounded-control transition-colors ${
              filterSeverity === 'CRITICAL'
                ? 'bg-white text-rose-700 shadow-xs font-semibold'
                : 'text-ledger-textSecondary hover:text-rose-700'
            }`}
          >
            Needs Action ({needsActionCount})
          </button>
          <button
            onClick={() => setFilterSeverity('WARNING')}
            className={`px-3 py-1.5 rounded-control transition-colors ${
              filterSeverity === 'WARNING'
                ? 'bg-white text-amber-700 shadow-xs font-semibold'
                : 'text-ledger-textSecondary hover:text-amber-700'
            }`}
          >
            Warnings ({warningCount})
          </button>
        </div>
      </div>

      {/* Alert Items Grouped */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-panel border border-ledger-border shadow-subtle">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-ledger-textPrimary">All Clear</h3>
            <p className="text-xs text-ledger-textSecondary mt-1">
              No active integrity flags matching the selected severity filter.
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isCritical = alert.severity === 'CRITICAL';
            const flagInfo = formatIntegrityFlag(alert.flagType);

            return (
              <div
                key={alert.id}
                className={`bg-white rounded-panel border transition-all p-6 shadow-subtle ${
                  isCritical ? 'border-rose-300' : 'border-amber-300'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`p-2 rounded-lg mt-0.5 ${
                        isCritical ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {isCritical ? (
                        <AlertOctagon className="w-5 h-5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
                            isCritical ? 'bg-rose-100 text-rose-900' : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {isCritical ? 'NEEDS ACTION' : 'WARNING'}
                        </span>
                        <h3 className="font-semibold text-base text-ledger-textPrimary">
                          {alert.title}
                        </h3>
                        <span className="text-xs font-mono text-ledger-textMuted bg-ledger-surfaceSecondary px-2 py-0.5 rounded">
                          Matter: {alert.matterCode}
                        </span>
                        <span className="text-xs font-mono text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          Waiting {alert.ageDays} days
                        </span>
                      </div>

                      {/* 1. What Happened? */}
                      <p className="text-xs text-ledger-textSecondary leading-relaxed pt-1">
                        <strong className="text-ledger-textPrimary">What happened:</strong>{' '}
                        {alert.humanDescription}
                      </p>

                      {/* 2. Why Does it Matter? */}
                      <p className="text-xs text-ledger-textSecondary leading-relaxed">
                        <strong className="text-ledger-textPrimary">Why it matters:</strong>{' '}
                        {flagInfo.explanation}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedMatterId(alert.threadId);
                        setActiveNav('coordination');
                      }}
                      className="px-3.5 py-2 text-xs font-medium rounded-control bg-ledger-surfaceSecondary hover:bg-ledger-border/60 text-ledger-textPrimary border border-ledger-border transition-colors flex items-center gap-1.5"
                    >
                      <span>Open Brief</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {alert.flagType === 'TRANSFER_WITHOUT_ACCEPTANCE' && (
                      <button
                        onClick={() => acknowledgeTransfer(alert.threadId, alert.id)}
                        className="px-3.5 py-2 text-xs font-medium rounded-control bg-rose-700 hover:bg-rose-800 text-white shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Acknowledge Receipt</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 3. What Can I Do? (Actionable Grid) */}
                <div className="mt-4 pt-4 border-t border-ledger-border/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-ledger-bg p-2.5 rounded-lg border border-ledger-border">
                    <span className="text-[10px] font-mono uppercase text-ledger-textMuted block">
                      Originating Bureau
                    </span>
                    <span className="font-medium text-ledger-textPrimary mt-0.5 block">
                      {alert.originBureau}
                    </span>
                  </div>

                  <div className="bg-ledger-bg p-2.5 rounded-lg border border-ledger-border">
                    <span className="text-[10px] font-mono uppercase text-ledger-textMuted block">
                      Receiving / Affected Bureau
                    </span>
                    <span className="font-medium text-ledger-textPrimary mt-0.5 block">
                      {alert.receivingBureau || 'Legal Cell Custodian'}
                    </span>
                  </div>

                  <div className="bg-ledger-bg p-2.5 rounded-lg border border-ledger-border">
                    <span className="text-[10px] font-mono uppercase text-brand-teal block">
                      Action Required
                    </span>
                    <span className="font-medium text-ledger-textPrimary mt-0.5 block">
                      {alert.expectedNextAction}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Resolved History */}
        {resolvedAlerts.length > 0 && (
          <div className="pt-6 border-t border-ledger-border">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ledger-textMuted mb-3">
              Resolved in Current Session
            </h3>
            {resolvedAlerts.map((rAlert) => (
              <div
                key={rAlert.id}
                className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold">{rAlert.title}</span>
                  <span className="text-emerald-700">({rAlert.matterCode})</span>
                </div>
                <span className="font-mono text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  RECEIPT ACKNOWLEDGED
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

