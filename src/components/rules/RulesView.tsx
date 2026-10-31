import React from 'react';
import { SYNTHETIC_GOVERNANCE_RULES } from '../../data/syntheticData';
import { Shield, BookOpen, CheckCircle2, Lock, Scale, AlertTriangle } from 'lucide-react';

export const RulesView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-ledger-textPrimary">
          Regulatory Rules & Governance Editions
        </h1>
        <p className="text-xs sm:text-sm text-ledger-textSecondary mt-0.5">
          Versioned governance rules from AICTE Approval Process Handbook (APH) and Standing Committee regulations. Every algorithmic decision, flag, and abstention is strictly governed by these rules.
        </p>
      </div>

      {/* Rules Grid */}
      <div className="space-y-4">
        {SYNTHETIC_GOVERNANCE_RULES.map((rule) => {
          const isHard = rule.category === 'HARD';
          const isProcedural = rule.category === 'PROCEDURAL';
          const isGovernance = rule.category === 'GOVERNANCE';

          return (
            <div
              key={rule.id}
              className={`bg-white rounded-panel border p-6 shadow-subtle transition-all ${
                isHard ? 'border-l-4 border-l-rose-600' : isProcedural ? 'border-l-4 border-l-brand-teal' : 'border-l-4 border-l-purple-600'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-ledger-surfaceSecondary text-ledger-textPrimary">
                      {rule.id}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isHard
                          ? 'bg-rose-100 text-rose-900'
                          : isProcedural
                          ? 'bg-teal-100 text-teal-900'
                          : 'bg-purple-100 text-purple-900'
                      }`}
                    >
                      {rule.category} RULE
                    </span>
                    <h3 className="font-semibold text-base text-ledger-textPrimary">
                      {rule.title}
                    </h3>
                  </div>

                  <p className="text-xs text-ledger-textSecondary leading-relaxed pt-1 max-w-3xl">
                    {rule.description}
                  </p>
                </div>

                <div className="text-right text-xs">
                  <span className="font-mono text-ledger-textMuted block">{rule.edition}</span>
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 justify-end mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active Enforcement</span>
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-ledger-border/60 flex flex-wrap items-center justify-between text-[11px] text-ledger-textMuted">
                <div>
                  Enforcement: <span className="font-mono text-ledger-textPrimary">{rule.enforcementMethod}</span>
                </div>
                <div>
                  Effective Date: <span className="font-mono text-ledger-textPrimary">{rule.effectiveDate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

