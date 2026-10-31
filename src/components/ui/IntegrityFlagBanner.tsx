import React from 'react';
import { AlertOctagon, AlertTriangle, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { IntegrityFlagType } from '../../types';
import { formatIntegrityFlag } from '../../utils/formatters';

interface IntegrityFlagBannerProps {
  flagType: IntegrityFlagType;
  title?: string;
  humanDescription?: string;
  technicalReasonCode?: string;
  originBureau?: string;
  receivingBureau?: string;
  ageDays?: number;
  expectedNextAction?: string;
  isResolved?: boolean;
  onActionClick?: () => void;
  actionButtonLabel?: string;
  compact?: boolean;
}

export const IntegrityFlagBanner: React.FC<IntegrityFlagBannerProps> = ({
  flagType,
  title,
  humanDescription,
  technicalReasonCode,
  originBureau,
  receivingBureau,
  ageDays,
  expectedNextAction,
  isResolved = false,
  onActionClick,
  actionButtonLabel,
  compact = false,
}) => {
  const formatted = formatIntegrityFlag(flagType);
  const displayTitle = title || formatted.title;
  const displayDesc = humanDescription || formatted.explanation;
  const displayAction = expectedNextAction || formatted.actionText;

  if (isResolved) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-card p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <div className="font-semibold text-sm text-emerald-900">{displayTitle} — Resolved</div>
            <div className="text-xs text-emerald-700">Receipt acknowledged; matter progression unblocked.</div>
          </div>
        </div>
        <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded font-mono">RESOLVED</span>
      </div>
    );
  }

  const isCritical = flagType === 'TRANSFER_WITHOUT_ACCEPTANCE';

  if (compact) {
    return (
      <div
        className={`flex items-start gap-3 p-3 rounded-lg border ${
          isCritical ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-amber-50 border-amber-200 text-amber-900'
        }`}
      >
        {isCritical ? (
          <AlertOctagon className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
        ) : (
          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold flex items-center gap-2">
            <span>{displayTitle}</span>
            {ageDays !== undefined && (
              <span className="text-[11px] font-mono px-1.5 py-0.2 bg-white/70 rounded border border-rose-200">
                {ageDays}d old
              </span>
            )}
          </div>
          <p className="text-xs opacity-90 mt-0.5">{displayDesc}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-panel border p-5 transition-all ${
        isCritical
          ? 'bg-rose-50/70 border-rose-300 shadow-subtle'
          : 'bg-amber-50/70 border-amber-300 shadow-subtle'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div
            className={`p-2 rounded-lg mt-0.5 ${
              isCritical ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
            }`}
          >
            {isCritical ? (
              <AlertOctagon className="w-5 h-5" aria-hidden="true" />
            ) : (
              <AlertTriangle className="w-5 h-5" aria-hidden="true" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h4 className="font-semibold text-base text-ledger-textPrimary">
                {displayTitle}
              </h4>
              <span
                className={`text-xs px-2 py-0.5 rounded font-medium ${
                  isCritical ? 'bg-rose-200 text-rose-900' : 'bg-amber-200 text-amber-900'
                }`}
              >
                {formatted.badge}
              </span>
              {ageDays !== undefined && (
                <span className="text-xs font-mono text-ledger-textMuted bg-white/80 px-2 py-0.5 rounded border border-ledger-border">
                  Waiting {ageDays} days (SLA breached)
                </span>
              )}
            </div>

            <p className="text-sm text-ledger-textSecondary mt-1 leading-relaxed max-w-3xl">
              {displayDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Origin, Destination & Action details */}
      <div className="mt-4 pt-4 border-t border-ledger-border/60 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        {originBureau && (
          <div className="bg-white/80 p-2.5 rounded-lg border border-ledger-border">
            <span className="text-ledger-textMuted font-medium uppercase tracking-wider text-[10px] block">
              Originating Bureau
            </span>
            <span className="font-medium text-ledger-textPrimary mt-0.5 block">{originBureau}</span>
          </div>
        )}

        {receivingBureau && (
          <div className="bg-white/80 p-2.5 rounded-lg border border-ledger-border">
            <span className="text-ledger-textMuted font-medium uppercase tracking-wider text-[10px] block">
              Receiving Bureau
            </span>
            <span className="font-medium text-ledger-textPrimary mt-0.5 block">{receivingBureau}</span>
          </div>
        )}

        <div className="bg-white/80 p-2.5 rounded-lg border border-ledger-border md:col-span-1">
          <span className="text-ledger-textMuted font-medium uppercase tracking-wider text-[10px] block">
            Expected Action
          </span>
          <span className="font-medium text-brand-teal mt-0.5 block">{displayAction}</span>
        </div>
      </div>

      {/* Action Footer & Technical Provenance */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-[11px] font-mono text-ledger-textMuted flex items-center gap-2">
          <span>Reason code:</span>
          <code className="bg-white px-1.5 py-0.5 rounded border border-ledger-border">
            {technicalReasonCode || flagType}
          </code>
        </div>

        {onActionClick && (
          <button
            onClick={onActionClick}
            className={`px-4 py-2 text-xs font-medium rounded-control shadow-sm flex items-center gap-1.5 transition-colors ${
              isCritical
                ? 'bg-rose-700 hover:bg-rose-800 text-white'
                : 'bg-brand-teal hover:bg-brand-tealHover text-white'
            }`}
          >
            <span>{actionButtonLabel || 'Acknowledge Receipt & Clear Flag'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

