import React from 'react';
import { RecordRelation, SourceRecord } from '../../types';
import { formatRelationshipType, formatConfidenceTier, formatDate } from '../../utils/formatters';
import { StatusBadge } from '../ui/StatusBadge';
import { Shield, Sparkles, FileText, CheckCircle2, AlertTriangle, ArrowRight, Hash, Database } from 'lucide-react';

interface EvidenceDrawerProps {
  relation: RecordRelation;
  fromRecord?: SourceRecord;
  toRecord?: SourceRecord;
  onOpenReview?: () => void;
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({
  relation,
  fromRecord,
  toRecord,
  onOpenReview,
}) => {
  const relInfo = formatRelationshipType(relation.relType);
  const tierInfo = formatConfidenceTier(relation.tier);

  return (
    <div className="space-y-6 text-sm">
      {/* Primary Meaning Summary */}
      <div className="p-4 rounded-xl bg-ledger-surfaceSecondary border border-ledger-border">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs uppercase font-mono tracking-wider text-ledger-textMuted font-semibold">
            Relationship State
          </span>
          <StatusBadge status={relation.state} />
        </div>

        <div className="text-base font-semibold text-ledger-textPrimary">
          {relInfo.label}
        </div>
        <p className="text-xs text-ledger-textSecondary mt-1 leading-relaxed">
          {relInfo.plainDesc}
        </p>
      </div>

      {/* Why are these connected? (Section 26 of Design) */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-ledger-textPrimary flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-teal" />
          <span>Why are these records connected?</span>
        </h3>
        <p className="text-xs text-ledger-textSecondary bg-brand-tealLight/30 p-3 rounded-lg border border-brand-teal/20 leading-relaxed">
          {relation.explanation}
        </p>
      </div>

      {/* Extracted Signals & Evidence */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-ledger-textMuted">
          Corroborating Evidence Signals
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-white border border-ledger-border rounded-lg">
            <span className="text-[11px] text-ledger-textMuted block">Calibrated Confidence</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-lg font-bold text-ledger-textPrimary font-mono">
                {(relation.confidence * 100).toFixed(0)}%
              </span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded border ${tierInfo.badgeClass}`}>
                {tierInfo.label}
              </span>
            </div>
          </div>

          <div className="p-3 bg-white border border-ledger-border rounded-lg">
            <span className="text-[11px] text-ledger-textMuted block">Procedural Plausibility</span>
            <span className="text-sm font-bold text-emerald-700 mt-1 block">
              {relation.signals.proceduralPlausibility}
            </span>
          </div>

          <div className="p-3 bg-white border border-ledger-border rounded-lg">
            <span className="text-[11px] text-ledger-textMuted block">BM25 Lexical Score</span>
            <span className="text-sm font-mono font-semibold text-ledger-textPrimary mt-0.5 block">
              {relation.signals.bm25Score.toFixed(2)}
            </span>
          </div>

          <div className="p-3 bg-white border border-ledger-border rounded-lg">
            <span className="text-[11px] text-ledger-textMuted block">Vector Cosine Similarity</span>
            <span className="text-sm font-mono font-semibold text-ledger-textPrimary mt-0.5 block">
              {relation.signals.embeddingSimilarity.toFixed(2)}
            </span>
          </div>
        </div>

        {relation.signals.referenceOverlap.length > 0 && (
          <div className="p-3 bg-white border border-ledger-border rounded-lg">
            <span className="text-[11px] text-ledger-textMuted block mb-1">
              Shared Notice / Identifier Overlap
            </span>
            <div className="flex flex-wrap gap-1.5">
              {relation.signals.referenceOverlap.map((ref, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-brand-skyLight text-brand-skyHover border border-brand-sky/20 rounded font-mono text-xs"
                >
                  {ref}
                </span>
              ))}
            </div>
          </div>
        )}

        {relation.signals.sourceDeclaredLink && (
          <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-semibold block">Source-Declared Reference (R-REL-05)</span>
              <span>{relation.signals.sourceDeclaredLink}</span>
            </div>
          </div>
        )}
      </div>

      {/* Connected Records Details */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-ledger-textMuted">
          Connected Records
        </h3>

        {/* Record A */}
        {fromRecord && (
          <div className="p-3 bg-white border border-ledger-border rounded-lg space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono font-semibold text-ledger-textPrimary">
                {fromRecord.sourceRef}
              </span>
              <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded font-mono text-[10px]">
                {fromRecord.sourceSystemCode}
              </span>
            </div>
            <div className="text-xs font-medium text-ledger-textPrimary">{fromRecord.title}</div>
            <div className="text-[11px] text-ledger-textMuted">
              Bureau: {fromRecord.bureauName} • Opened: {formatDate(fromRecord.openedAt)}
            </div>
          </div>
        )}

        {/* Connection Arrow */}
        <div className="flex justify-center text-ledger-textMuted">
          <ArrowRight className="w-4 h-4 rotate-90" />
        </div>

        {/* Record B */}
        {toRecord && (
          <div className="p-3 bg-white border border-ledger-border rounded-lg space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono font-semibold text-ledger-textPrimary">
                {toRecord.sourceRef}
              </span>
              <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded font-mono text-[10px]">
                {toRecord.sourceSystemCode}
              </span>
            </div>
            <div className="text-xs font-medium text-ledger-textPrimary">{toRecord.title}</div>
            <div className="text-[11px] text-ledger-textMuted">
              Bureau: {toRecord.bureauName} • Opened: {formatDate(toRecord.openedAt)}
            </div>
          </div>
        )}
      </div>

      {/* Review Adjudication Status & Rule Edition */}
      <div className="p-4 bg-ledger-bg border border-ledger-border rounded-lg space-y-2 text-xs">
        <div className="font-semibold text-ledger-textPrimary flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-ledger-textSecondary" />
          <span>Governance & Rule Attribution</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div>
            <span className="text-ledger-textMuted block">Rule Version:</span>
            <code className="font-mono text-ledger-textPrimary">{relation.ruleVersion}</code>
          </div>
          <div>
            <span className="text-ledger-textMuted block">Model Version:</span>
            <code className="font-mono text-ledger-textPrimary">{relation.modelVersion}</code>
          </div>
          {relation.reviewerRole && (
            <div className="col-span-2 pt-1 border-t border-ledger-border">
              <span className="text-ledger-textMuted block">Reviewed by:</span>
              <span className="font-medium text-ledger-textPrimary">
                {relation.reviewerRole} on {formatDate(relation.decidedAt || '')}
              </span>
              {relation.reviewerNotes && (
                <p className="mt-1 text-ledger-textSecondary italic">"{relation.reviewerNotes}"</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action CTA if Proposed */}
      {relation.state === 'PROPOSED' && onOpenReview && (
        <button
          onClick={onOpenReview}
          className="w-full py-2.5 px-4 bg-brand-teal hover:bg-brand-tealHover text-white text-xs font-medium rounded-control shadow-sm flex items-center justify-center gap-2 transition-colors"
        >
          <span>Open Human Adjudication Dialog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

