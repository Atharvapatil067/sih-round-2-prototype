import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle, Clock, Shuffle } from 'lucide-react';
import { RelationshipType } from '../../types';
import { formatRelationshipType } from '../../utils/formatters';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: {
    decision: 'CONFIRMED' | 'REJECTED' | 'DEFERRED' | 'RECLASSIFIED';
    reclassifiedType?: RelationshipType;
    reason: string;
    notes?: string;
  }) => void;
  action: 'CONFIRMED' | 'REJECTED' | 'DEFERRED' | 'RECLASSIFIED';
  proposedType: RelationshipType;
  fromRecordRef: string;
  toRecordRef: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  action,
  proposedType,
  fromRecordRef,
  toRecordRef,
}) => {
  const [reason, setReason] = useState<string>('');
  const [reclassifiedType, setReclassifiedType] = useState<RelationshipType>('RELATED_BUT_INDEPENDENT');
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      decision: action,
      reclassifiedType: action === 'RECLASSIFIED' ? reclassifiedType : undefined,
      reason: reason || (action === 'CONFIRMED' ? 'Verified documentary evidence aligns' : 'Reviewer determination'),
      notes,
    });
    onClose();
  };

  const actionTitle =
    action === 'CONFIRMED'
      ? 'Confirm Relationship'
      : action === 'REJECTED'
      ? 'Reject Candidate Link'
      : action === 'DEFERRED'
      ? 'Defer Review Decision'
      : 'Change Relationship Classification';

  const defaultReasons: Record<string, string[]> = {
    CONFIRMED: [
      'Documented evidence references confirm same factual dispute',
      'Intake documents cite identical AICTE committee decision/notice',
      'Complainant identities and grievance particulars coincide',
    ],
    REJECTED: [
      'Records concern unrelated grievance issues at the same institution',
      'Coincidental keyword overlap; distinct procedural proceedings',
      'Appeals originate from different regulatory provisions',
    ],
    DEFERRED: [
      'Awaiting verified minutes from next Standing Committee meeting',
      'Need regional officer input on latest inspection status',
      'Clarification pending from complainant association',
    ],
    RECLASSIFIED: [
      'Parallel regulatory track, not a duplicate intake (R-REL-07)',
      'Related institution background but independent complaint (R-REL-08)',
      'Subsequent procedural step rather than same intake submission',
    ],
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-bg/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-panel border border-ledger-border shadow-elevated w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-ledger-border flex items-center justify-between bg-ledger-bg/50">
          <div className="flex items-center gap-2.5">
            {action === 'CONFIRMED' && <CheckCircle className="w-5 h-5 text-emerald-600" />}
            {action === 'REJECTED' && <AlertCircle className="w-5 h-5 text-rose-600" />}
            {action === 'DEFERRED' && <Clock className="w-5 h-5 text-amber-600" />}
            {action === 'RECLASSIFIED' && <Shuffle className="w-5 h-5 text-brand-teal" />}
            <h3 className="font-semibold text-base text-ledger-textPrimary">{actionTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-ledger-textMuted hover:text-ledger-textPrimary p-1 rounded-control hover:bg-ledger-surfaceSecondary"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-ledger-surfaceSecondary p-3 rounded-lg text-xs space-y-1">
            <div className="text-ledger-textMuted uppercase font-medium tracking-wider text-[10px]">
              Records Being Adjudicated
            </div>
            <div className="font-mono text-ledger-textPrimary font-semibold">
              {fromRecordRef} <span className="text-brand-teal">↔</span> {toRecordRef}
            </div>
            <div className="text-ledger-textSecondary mt-1">
              Currently Proposed: <span className="font-medium text-ledger-textPrimary">{formatRelationshipType(proposedType).label}</span>
            </div>
          </div>

          {action === 'RECLASSIFIED' && (
            <div>
              <label className="block text-xs font-semibold text-ledger-textPrimary mb-1.5">
                Select Correct Relationship Type (R-REL-03)
              </label>
              <select
                value={reclassifiedType}
                onChange={(e) => setReclassifiedType(e.target.value as RelationshipType)}
                className="w-full text-xs border border-ledger-border rounded-input px-3 py-2 bg-white text-ledger-textPrimary focus:ring-1 focus:ring-brand-teal focus:border-brand-teal"
              >
                <option value="RELATED_BUT_INDEPENDENT">Related, but independent action (e.g. parallel track)</option>
                <option value="SAME_PROCEDURAL_CHAIN">Same procedural chain (sequential stage)</option>
                <option value="DUPLICATE_INTAKE">Duplicate intake submission</option>
                <option value="SAME_MATTER">Same underlying factual matter</option>
                <option value="INDEPENDENT_COMPLAINT">Independent complaint (share institution only)</option>
                <option value="UNKNOWN">Unknown / Insufficient evidence (Abstain)</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-ledger-textPrimary mb-1.5">
              Decision Reason (Recorded into Cryptographic Audit Trail)
            </label>
            <div className="space-y-1.5 mb-2">
              {defaultReasons[action]?.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setReason(preset)}
                  className={`w-full text-left text-xs p-2 rounded border transition-colors ${
                    reason === preset
                      ? 'border-brand-teal bg-brand-tealLight/40 text-brand-tealHover font-medium'
                      : 'border-ledger-border hover:bg-ledger-bg text-ledger-textSecondary'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>

            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Or type a custom adjudication explanation..."
              required
              className="w-full text-xs border border-ledger-border rounded-input px-3 py-2 bg-white text-ledger-textPrimary placeholder:text-ledger-textMuted focus:ring-1 focus:ring-brand-teal focus:border-brand-teal"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ledger-textPrimary mb-1.5">
              Additional Reviewer Notes (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Discussed with WRO desk officer on 01 Nov"
              className="w-full text-xs border border-ledger-border rounded-input px-3 py-2 bg-white text-ledger-textPrimary placeholder:text-ledger-textMuted focus:ring-1 focus:ring-brand-teal focus:border-brand-teal"
            />
          </div>

          <div className="pt-2 text-[11px] text-ledger-textMuted border-t border-ledger-border/60">
            This decision will update the Matter Thread composition and write a SHA-256 hash-chained entry to the permanent audit log.
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-ledger-textSecondary hover:text-ledger-textPrimary bg-ledger-surfaceSecondary hover:bg-ledger-border/50 rounded-control transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-xs font-medium text-white rounded-control shadow-sm transition-colors ${
                action === 'CONFIRMED'
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : action === 'REJECTED'
                  ? 'bg-rose-600 hover:bg-rose-700'
                  : action === 'DEFERRED'
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-brand-teal hover:bg-brand-tealHover'
              }`}
            >
              Confirm Adjudication
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

