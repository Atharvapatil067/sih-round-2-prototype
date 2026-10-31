import React from 'react';
import { ProceduralTrack, StageEventInstance } from '../../types';
import { formatDate } from '../../utils/formatters';
import {
  CheckCircle2,
  Clock,
  AlertOctagon,
  ArrowRight,
  GitBranch,
  Shield,
  Building,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';

interface ProceduralTimelineProps {
  tracks: ProceduralTrack[];
}

export const ProceduralTimeline: React.FC<ProceduralTimelineProps> = ({ tracks }) => {
  if (!tracks || tracks.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-panel border border-ledger-border">
        <HelpCircle className="w-8 h-8 text-ledger-textMuted mx-auto mb-2" />
        <h4 className="text-sm font-semibold text-ledger-textPrimary">No Procedural Lineage Mapped</h4>
        <p className="text-xs text-ledger-textSecondary mt-1">
          This matter is at initial intake or is an unmapped workflow under current APH regulations.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {tracks.map((track) => {
        const isLegal = track.kind === 'LEGAL_PROCEEDING';
        const isVigilance = track.kind === 'VIGILANCE_INQUIRY';
        const isPrimary = track.kind === 'PRIMARY_SCRUTINY';

        return (
          <div
            key={track.id}
            className={`rounded-panel border p-5 transition-all bg-white shadow-subtle ${
              isLegal
                ? 'border-indigo-200'
                : isVigilance
                ? 'border-purple-200'
                : 'border-ledger-border'
            }`}
          >
            {/* Track Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-ledger-border">
              <div className="flex items-center gap-2.5">
                <div
                  className={`p-1.5 rounded-lg ${
                    isLegal
                      ? 'bg-indigo-50 text-indigo-700'
                      : isVigilance
                      ? 'bg-purple-50 text-purple-700'
                      : 'bg-brand-tealLight text-brand-tealHover'
                  }`}
                >
                  <GitBranch className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm text-ledger-textPrimary">
                      {track.trackName}
                    </h4>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                        isLegal
                          ? 'bg-indigo-100 text-indigo-800'
                          : isVigilance
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-teal-100 text-teal-800'
                      }`}
                    >
                      {track.bureau}
                    </span>
                  </div>
                  <p className="text-xs text-ledger-textSecondary mt-0.5">
                    {track.relationshipReason}
                  </p>
                </div>
              </div>

              <div className="text-xs font-mono text-ledger-textMuted bg-ledger-surfaceSecondary px-2.5 py-1 rounded">
                Current: <span className="font-semibold text-ledger-textPrimary">{track.currentStage}</span>
              </div>
            </div>

            {/* Stage Progression Flow */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-ledger-border">
              {track.stages.map((stage) => {
                const isCompleted = stage.status === 'COMPLETED';
                const isCurrent = stage.status === 'CURRENT';
                const isBlocked = stage.status === 'BLOCKED';
                const isUpcoming = stage.status === 'UPCOMING';

                return (
                  <div key={stage.id} className="relative group">
                    {/* Timeline Node Bullet */}
                    <div
                      className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center border-2 bg-white transition-all ${
                        isCompleted
                          ? 'border-emerald-600 text-emerald-600'
                          : isBlocked
                          ? 'border-rose-600 bg-rose-50 text-rose-600 ring-4 ring-rose-100'
                          : isCurrent
                          ? 'border-brand-teal bg-brand-tealLight text-brand-tealHover ring-4 ring-brand-tealLight/50'
                          : 'border-ledger-border text-ledger-textMuted'
                      }`}
                    >
                      {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {isBlocked && <AlertOctagon className="w-3.5 h-3.5" />}
                      {isCurrent && <Clock className="w-3.5 h-3.5" />}
                      {isUpcoming && <div className="w-1.5 h-1.5 rounded-full bg-ledger-border" />}
                    </div>

                    {/* Stage Card */}
                    <div
                      className={`p-3.5 rounded-lg border transition-all ${
                        isBlocked
                          ? 'bg-rose-50/60 border-rose-300'
                          : isCurrent
                          ? 'bg-brand-tealLight/20 border-brand-teal/40 shadow-subtle'
                          : isCompleted
                          ? 'bg-ledger-bg/40 border-ledger-border'
                          : 'bg-white border-ledger-border opacity-70'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-ledger-textPrimary">
                            {stage.stageName}
                          </span>
                          <code className="text-[10px] font-mono text-ledger-textMuted bg-white/80 px-1.5 py-0.2 rounded border border-ledger-border">
                            {stage.stageCode}
                          </code>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-ledger-textMuted">
                          <span>{stage.decisionBody}</span>
                          {stage.enteredAt && (
                            <span className="font-mono">({formatDate(stage.enteredAt)})</span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-ledger-textSecondary mt-1 leading-relaxed">
                        {stage.plainExplanation}
                      </p>

                      {stage.notes && (
                        <div className="mt-2 text-xs flex items-start gap-1.5 text-ledger-textPrimary bg-white/80 p-2 rounded border border-ledger-border">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span>{stage.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

