import React from 'react';
import { SYNTHETIC_BENCHMARK_BASELINES } from '../../data/syntheticData';
import {
  BarChart3,
  TrendingDown,
  ShieldCheck,
  AlertOctagon,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header with Synthetic Disclaimer Banner (R-EVAL-01 & R-CLAIM-01) */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-card p-4 flex items-start gap-3 text-xs text-amber-900">
        <Info className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
        <div>
          <span className="font-bold">Synthetic Evaluation Data Only (R-EVAL-01):</span>{' '}
          All benchmark metrics presented here are calculated on the published synthetic benchmark generator. No internal or confidential AICTE live complainant records are claimed or included in prototype metrics.
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-ledger-textPrimary">
            Operational Intelligence & Benchmark Metrics
          </h1>
          <p className="text-xs sm:text-sm text-ledger-textSecondary mt-0.5">
            Evaluates matching pipeline safety, handoff integrity detection, and false-link budget across candidate models.
          </p>
        </div>

        <span className="text-xs font-mono text-ledger-textMuted bg-ledger-surfaceSecondary px-2.5 py-1 rounded border border-ledger-border">
          Benchmark Seed: 42 • Version: v1-calibrated
        </span>
      </div>

      {/* 1. Primary Evaluation: False-Link Rate First (R-EVAL-03 & R-EVAL-02) */}
      <div className="bg-white rounded-panel border border-ledger-border p-6 shadow-subtle space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-ledger-textPrimary flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-teal" />
              <span>Comparative Benchmark: Pipeline vs Baselines (R-EVAL-02)</span>
            </h2>
            <p className="text-xs text-ledger-textSecondary mt-0.5">
              Per Rule R-EVAL-03, false-link rate is reported before raw accuracy to prevent harmful cross-institution over-linking.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-ledger-border text-[11px] font-mono uppercase text-ledger-textMuted bg-ledger-bg/40">
                <th className="py-3 px-4">Method / Baseline Model</th>
                <th className="py-3 px-4 text-rose-700 font-bold">False-Link Rate (Lower is Better)</th>
                <th className="py-3 px-4">Precision</th>
                <th className="py-3 px-4">Recall</th>
                <th className="py-3 px-4">Abstention Rate (Unknowns)</th>
                <th className="py-3 px-4">Selective Accuracy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ledger-border/60 font-mono">
              {SYNTHETIC_BENCHMARK_BASELINES.map((bm) => (
                <tr
                  key={bm.code}
                  className={bm.isProposedPipeline ? 'bg-brand-tealLight/30 font-semibold' : 'hover:bg-ledger-bg/40'}
                >
                  <td className="py-3.5 px-4 font-sans font-medium text-ledger-textPrimary">
                    <div className="flex items-center gap-2">
                      {bm.isProposedPipeline && <Sparkles className="w-3.5 h-3.5 text-brand-teal flex-shrink-0" />}
                      <span>{bm.name}</span>
                    </div>
                    <div className="text-[11px] text-ledger-textMuted font-sans font-normal mt-0.5">
                      {bm.description}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-rose-700">
                    {bm.falseLinkRate}
                  </td>

                  <td className="py-3.5 px-4 text-ledger-textPrimary">
                    {bm.precision}
                  </td>

                  <td className="py-3.5 px-4 text-ledger-textPrimary">
                    {bm.recall}
                  </td>

                  <td className="py-3.5 px-4 text-slate-700">
                    {bm.abstentionRate}
                  </td>

                  <td className="py-3.5 px-4 text-emerald-800 font-bold">
                    {bm.selectiveAccuracy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Visual Distributions: Handoff Gaps, Relationship Types, Freshness */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Distribution */}
        <div className="bg-white rounded-panel border border-ledger-border p-5 shadow-subtle space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ledger-textMuted">
            Matter Disposition Breakdown
          </h3>
          <div className="space-y-2 text-xs">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-ledger-textPrimary">Under Active Scrutiny (SCSC)</span>
                <span className="font-mono text-ledger-textSecondary">40%</span>
              </div>
              <div className="h-2 w-full bg-ledger-surfaceSecondary rounded-full overflow-hidden">
                <div className="h-full bg-brand-teal rounded-full" style={{ width: '40%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-ledger-textPrimary">Pending Review Adjudication</span>
                <span className="font-mono text-ledger-textSecondary">30%</span>
              </div>
              <div className="h-2 w-full bg-ledger-surfaceSecondary rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '30%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-rose-700">Blocked by Handoff Gap</span>
                <span className="font-mono text-rose-700">20%</span>
              </div>
              <div className="h-2 w-full bg-ledger-surfaceSecondary rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: '20%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-purple-900">Restricted Coordination</span>
                <span className="font-mono text-purple-900">10%</span>
              </div>
              <div className="h-2 w-full bg-ledger-surfaceSecondary rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: '10%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Relationship Typing Outcomes */}
        <div className="bg-white rounded-panel border border-ledger-border p-5 shadow-subtle space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ledger-textMuted">
            Adjudicated Edge Taxonomy (R-REL-03)
          </h3>
          <div className="space-y-2.5 text-xs">
            <div className="p-2.5 bg-ledger-bg rounded-lg border border-ledger-border flex justify-between">
              <span className="font-medium text-ledger-textPrimary">SAME_MATTER (Factual Coincidence)</span>
              <span className="font-mono font-bold text-brand-teal">2 Edges</span>
            </div>
            <div className="p-2.5 bg-ledger-bg rounded-lg border border-ledger-border flex justify-between">
              <span className="font-medium text-ledger-textPrimary">SAME_PROCEDURAL_CHAIN (Handoff)</span>
              <span className="font-mono font-bold text-brand-sky">1 Edge</span>
            </div>
            <div className="p-2.5 bg-ledger-bg rounded-lg border border-ledger-border flex justify-between">
              <span className="font-medium text-ledger-textPrimary">RELATED_BUT_INDEPENDENT (Parallel)</span>
              <span className="font-mono font-bold text-indigo-700">1 Edge</span>
            </div>
            <div className="p-2.5 bg-ledger-bg rounded-lg border border-ledger-border flex justify-between">
              <span className="font-medium text-ledger-textPrimary">REJECTED_MEMORY (Cached Out)</span>
              <span className="font-mono font-bold text-rose-700">1 Edge</span>
            </div>
          </div>
        </div>

        {/* Source Freshness SLA Compliance */}
        <div className="bg-white rounded-panel border border-ledger-border p-5 shadow-subtle space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ledger-textMuted">
            Snapshot Freshness Compliance
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex justify-between font-bold text-emerald-950">
                <span>Healthy Snapshots</span>
                <span className="font-mono">80%</span>
              </div>
              <p className="text-[11px] text-emerald-800 mt-0.5">CSS, PGRC, RB-West within SLA window.</p>
            </div>

            <div className="p-3 bg-rose-50 rounded-lg border border-rose-200">
              <div className="flex justify-between font-bold text-rose-950">
                <span>SLA Breaches</span>
                <span className="font-mono">20%</span>
              </div>
              <p className="text-[11px] text-rose-800 mt-0.5">Legal Soft exceeds 7-day synchronization window.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

