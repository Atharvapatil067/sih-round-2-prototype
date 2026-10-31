import React, { useState } from 'react';
import { useLedger } from '../../context/LedgerContext';
import { RecordRelation, RelationshipType } from '../../types';
import { formatRelationshipType, formatConfidenceTier, formatDate } from '../../utils/formatters';
import { StatusBadge } from '../ui/StatusBadge';
import { ConfirmModal } from '../ui/ConfirmModal';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Shuffle,
  Sparkles,
  ArrowRight,
  Shield,
  FileText,
  Building2,
  Filter,
  CheckCircle,
  AlertTriangle,
  History,
} from 'lucide-react';

export const ReviewQueue: React.FC = () => {
  const {
    relations,
    sourceRecords,
    institutions,
    confirmReviewAction,
    setInspectingRelation,
    setActiveNav,
    setSelectedMatterId,
  } = useLedger();

  const [filterState, setFilterState] = useState<'PENDING' | 'DECIDED' | 'ALL'>('PENDING');
  const [selectedRelation, setSelectedRelation] = useState<RecordRelation | null>(null);
  const [activeAction, setActiveAction] = useState<
    'CONFIRMED' | 'REJECTED' | 'DEFERRED' | 'RECLASSIFIED'
  >('CONFIRMED');
  const [modalOpen, setModalOpen] = useState(false);

  const pendingRelations = relations.filter((r) => r.state === 'PROPOSED');
  const decidedRelations = relations.filter((r) => r.state !== 'PROPOSED');

  const displayedRelations =
    filterState === 'PENDING'
      ? pendingRelations
      : filterState === 'DECIDED'
      ? decidedRelations
      : relations;

  const handleOpenAction = (
    rel: RecordRelation,
    action: 'CONFIRMED' | 'REJECTED' | 'DEFERRED' | 'RECLASSIFIED'
  ) => {
    setSelectedRelation(rel);
    setActiveAction(action);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-ledger-textPrimary">
            Possible Connections Review Queue
          </h1>
          <p className="text-xs sm:text-sm text-ledger-textSecondary mt-0.5">
            Under Rule R-REL-01, semantic similarity alone never links records. Authorized human reviewers must adjudicate consequential relationships.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-ledger-surfaceSecondary p-1 rounded-lg border border-ledger-border text-xs font-medium">
          <button
            onClick={() => setFilterState('PENDING')}
            className={`px-3 py-1.5 rounded-control transition-colors ${
              filterState === 'PENDING'
                ? 'bg-white text-ledger-textPrimary shadow-xs font-semibold'
                : 'text-ledger-textSecondary hover:text-ledger-textPrimary'
            }`}
          >
            Pending Review ({pendingRelations.length})
          </button>
          <button
            onClick={() => setFilterState('DECIDED')}
            className={`px-3 py-1.5 rounded-control transition-colors ${
              filterState === 'DECIDED'
                ? 'bg-white text-ledger-textPrimary shadow-xs font-semibold'
                : 'text-ledger-textSecondary hover:text-ledger-textPrimary'
            }`}
          >
            Adjudicated History ({decidedRelations.length})
          </button>
          <button
            onClick={() => setFilterState('ALL')}
            className={`px-3 py-1.5 rounded-control transition-colors ${
              filterState === 'ALL'
                ? 'bg-white text-ledger-textPrimary shadow-xs font-semibold'
                : 'text-ledger-textSecondary hover:text-ledger-textPrimary'
            }`}
          >
            All Candidates ({relations.length})
          </button>
        </div>
      </div>

      {/* Review Queue Items */}
      {displayedRelations.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-panel border border-ledger-border shadow-subtle">
          <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-ledger-textPrimary">No Pending Reviews</h3>
          <p className="text-xs text-ledger-textSecondary mt-1 max-w-sm mx-auto">
            All proposed relationship candidates have been verified or resolved. New proposals appear as snapshots diff.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedRelations.map((rel) => {
            const fromRec = sourceRecords.find((r) => r.id === rel.fromRecordId);
            const toRec = sourceRecords.find((r) => r.id === rel.toRecordId);
            const inst = institutions.find((i) => i.id === fromRec?.institutionId);
            const relInfo = formatRelationshipType(rel.relType);
            const tierInfo = formatConfidenceTier(rel.tier);
            const isPending = rel.state === 'PROPOSED';

            return (
              <div
                key={rel.id}
                className={`bg-white rounded-panel border transition-all p-6 shadow-subtle ${
                  isPending
                    ? 'border-brand-teal/40 hover:border-brand-teal'
                    : 'border-ledger-border opacity-90'
                }`}
              >
                {/* Header row: Confidence, Proposed Type, Status */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-ledger-border/60">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-semibold text-ledger-textPrimary">
                      {rel.id.toUpperCase()}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded border font-medium ${tierInfo.badgeClass}`}>
                      {tierInfo.label}
                    </span>
                    <span className="text-xs font-mono font-bold text-ledger-textPrimary bg-ledger-surfaceSecondary px-2 py-0.5 rounded">
                      {(rel.confidence * 100).toFixed(0)}% Score
                    </span>
                    <span className="text-xs text-ledger-textMuted">
                      Rule: {rel.ruleVersion}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <StatusBadge status={rel.state} />
                    {rel.targetMatterId && (
                      <button
                        onClick={() => {
                          setSelectedMatterId(rel.targetMatterId!);
                          setActiveNav('matters');
                        }}
                        className="text-xs text-brand-teal hover:underline flex items-center gap-1 font-medium"
                      >
                        <span>View Matter Thread</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 1. What is being reviewed? (Side-by-side records comparison) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Record A */}
                  <div className="p-3.5 bg-ledger-bg/60 rounded-card border border-ledger-border space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-semibold text-ledger-textPrimary flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-ledger-textMuted" />
                        <span>{fromRec?.sourceRef}</span>
                      </span>
                      <span className="px-1.5 py-0.5 bg-white border border-ledger-border rounded text-[10px] font-mono">
                        {fromRec?.sourceSystemCode}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-ledger-textPrimary line-clamp-2">
                      {fromRec?.title}
                    </div>
                    <p className="text-[11px] text-ledger-textSecondary line-clamp-2">
                      {fromRec?.summary}
                    </p>
                    <div className="text-[10px] text-ledger-textMuted pt-1 flex items-center justify-between">
                      <span>{fromRec?.bureauName}</span>
                      <span className="font-mono">{formatDate(fromRec?.openedAt || '')}</span>
                    </div>
                  </div>

                  {/* Record B */}
                  <div className="p-3.5 bg-ledger-bg/60 rounded-card border border-ledger-border space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-semibold text-ledger-textPrimary flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-ledger-textMuted" />
                        <span>{toRec?.sourceRef}</span>
                      </span>
                      <span className="px-1.5 py-0.5 bg-white border border-ledger-border rounded text-[10px] font-mono">
                        {toRec?.sourceSystemCode}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-ledger-textPrimary line-clamp-2">
                      {toRec?.title}
                    </div>
                    <p className="text-[11px] text-ledger-textSecondary line-clamp-2">
                      {toRec?.summary}
                    </p>
                    <div className="text-[10px] text-ledger-textMuted pt-1 flex items-center justify-between">
                      <span>{toRec?.bureauName}</span>
                      <span className="font-mono">{formatDate(toRec?.openedAt || '')}</span>
                    </div>
                  </div>
                </div>

                {/* 2 & 3. Why? & What Evidence Exists? */}
                <div className="p-3.5 bg-brand-tealLight/20 border border-brand-teal/20 rounded-card mb-4 text-xs space-y-2">
                  <div className="flex items-center gap-1.5 font-semibold text-ledger-textPrimary">
                    <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
                    <span>Why did the pipeline suggest this connection?</span>
                  </div>
                  <p className="text-ledger-textSecondary leading-relaxed">
                    {rel.explanation}
                  </p>

                  {/* Signal pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="px-2 py-0.5 bg-white border border-ledger-border rounded text-[11px] font-mono">
                      BM25: {rel.signals.bm25Score.toFixed(2)}
                    </span>
                    <span className="px-2 py-0.5 bg-white border border-ledger-border rounded text-[11px] font-mono">
                      Cosine: {rel.signals.embeddingSimilarity.toFixed(2)}
                    </span>
                    <span className="px-2 py-0.5 bg-white border border-ledger-border rounded text-[11px] font-mono">
                      Plausibility: {rel.signals.proceduralPlausibility}
                    </span>
                    {rel.signals.referenceOverlap.map((ref, i) => (
                      <span key={i} className="px-2 py-0.5 bg-brand-skyLight text-brand-skyHover border border-brand-sky/20 rounded font-mono text-[11px]">
                        Ref: {ref}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4. What decision is needed? (Actions) */}
                {isPending ? (
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      onClick={() => setInspectingRelation(rel)}
                      className="text-xs text-ledger-textSecondary hover:text-ledger-textPrimary underline font-medium"
                    >
                      View Deep Evidence & Extracted Tokens
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenAction(rel, 'CONFIRMED')}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-control text-xs font-medium flex items-center gap-1.5 shadow-xs transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Confirm as {relInfo.label}</span>
                      </button>

                      <button
                        onClick={() => handleOpenAction(rel, 'RECLASSIFIED')}
                        className="px-3 py-1.5 bg-white hover:bg-ledger-bg border border-ledger-border text-ledger-textPrimary rounded-control text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <Shuffle className="w-3.5 h-3.5 text-brand-teal" />
                        <span>Reclassify Type</span>
                      </button>

                      <button
                        onClick={() => handleOpenAction(rel, 'DEFERRED')}
                        className="px-3 py-1.5 bg-white hover:bg-ledger-bg border border-ledger-border text-ledger-textSecondary rounded-control text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Defer</span>
                      </button>

                      <button
                        onClick={() => handleOpenAction(rel, 'REJECTED')}
                        className="px-3 py-1.5 bg-white hover:bg-rose-50 border border-rose-200 text-rose-700 rounded-control text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Reject Link</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 text-xs text-ledger-textMuted flex items-center justify-between border-t border-ledger-border/60">
                    <div>
                      Adjudicated by <span className="font-semibold text-ledger-textPrimary">{rel.reviewerRole}</span> on {formatDate(rel.decidedAt || '')}
                      {rel.reviewerNotes && <span className="italic ml-2">"{rel.reviewerNotes}"</span>}
                    </div>
                    <span className="font-mono text-[10px]">RECORDED IN AUDIT LOG</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Confirmation Modal */}
      {selectedRelation && (
        <ConfirmModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={async (data) => {
            await confirmReviewAction(
              selectedRelation.id,
              data.decision,
              data.reclassifiedType,
              data.reason,
              data.notes
            );
            setSelectedRelation(null);
          }}
          action={activeAction}
          proposedType={selectedRelation.proposedType}
          fromRecordRef={
            sourceRecords.find((r) => r.id === selectedRelation.fromRecordId)?.sourceRef || 'Record A'
          }
          toRecordRef={
            sourceRecords.find((r) => r.id === selectedRelation.toRecordId)?.sourceRef || 'Record B'
          }
        />
      )}
    </div>
  );
};

