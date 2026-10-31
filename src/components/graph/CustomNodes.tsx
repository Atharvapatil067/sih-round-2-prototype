import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import {
  FileText,
  Building2,
  FolderGit2,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  ArrowRight,
  Shield,
  Layers,
} from 'lucide-react';

export const MatterNode = memo(({ data }: { data: any }) => {
  return (
    <div className="relative px-5 py-4 rounded-panel bg-navy-surface border-2 border-brand-teal shadow-dark-elevated text-navy-text min-w-[260px] max-w-[320px] transition-all hover:border-brand-sky">
      <Handle type="target" position={Position.Top} className="!bg-brand-teal !w-3 !h-3" />
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-brand-tealMuted text-brand-teal border border-brand-teal/40">
          <FolderGit2 className="w-3 h-3" />
          <span>{data.code}</span>
        </span>
        {data.hasIntegrityFlag && (
          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono">
            <AlertOctagon className="w-3 h-3 text-rose-400" />
            <span>INTEGRITY GAP</span>
          </span>
        )}
      </div>

      <div className="font-semibold text-sm text-navy-text line-clamp-2">
        {data.title}
      </div>

      <div className="mt-2.5 pt-2.5 border-t border-navy-border/60 text-xs text-navy-textSecondary flex items-center justify-between">
        <span className="truncate max-w-[170px]">{data.institutionName}</span>
        <span className="text-[10px] font-mono text-brand-sky">{data.recordCount} Records</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-brand-teal !w-3 !h-3" />
    </div>
  );
});

export const InstitutionNode = memo(({ data }: { data: any }) => {
  return (
    <div className="px-4 py-3 rounded-card bg-navy-elevated border border-navy-border shadow-dark-subtle text-navy-text min-w-[220px] max-w-[280px] hover:border-brand-teal/60 transition-all">
      <Handle type="target" position={Position.Top} className="!bg-brand-sky !w-2.5 !h-2.5" />
      <div className="flex items-center gap-2 mb-1">
        <div className="p-1 rounded bg-navy-surface text-brand-sky">
          <Building2 className="w-3.5 h-3.5" />
        </div>
        <span className="text-[10px] font-mono text-navy-textSecondary uppercase tracking-wider">
          Approved Institution
        </span>
      </div>

      <div className="font-semibold text-xs text-navy-text line-clamp-2">
        {data.canonicalName}
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] text-navy-textMuted font-mono">
        <span>PID: {data.permanentId}</span>
        <span>{data.state}</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-brand-sky !w-2.5 !h-2.5" />
    </div>
  );
});

export const SourceRecordNode = memo(({ data }: { data: any }) => {
  const isCSS = data.sourceSystemCode === 'CSS';
  const isPGRC = data.sourceSystemCode === 'PGRC';
  const isRB = data.sourceSystemCode === 'RB';
  const isLegal = data.sourceSystemCode === 'LEGAL';
  const isVig = data.sourceSystemCode === 'VIGILANCE';

  let badgeColor = 'bg-slate-700 text-slate-200';
  if (isCSS) badgeColor = 'bg-teal-900/50 text-teal-300 border-teal-700/60';
  if (isPGRC) badgeColor = 'bg-sky-900/50 text-sky-300 border-sky-700/60';
  if (isRB) badgeColor = 'bg-amber-900/50 text-amber-300 border-amber-700/60';
  if (isLegal) badgeColor = 'bg-indigo-900/50 text-indigo-300 border-indigo-700/60';
  if (isVig) badgeColor = 'bg-purple-900/50 text-purple-300 border-purple-700/60';

  return (
    <div className="px-3.5 py-3 rounded-card bg-navy-surface border border-navy-border shadow-dark-subtle text-navy-text min-w-[230px] max-w-[280px] hover:border-brand-sky/80 transition-all">
      <Handle type="target" position={Position.Top} className="!bg-slate-400 !w-2.5 !h-2.5" />
      <div className="flex items-center justify-between gap-1 mb-1.5">
        <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold border ${badgeColor}`}>
          {data.sourceSystemCode}
        </span>
        <span className="font-mono text-[10px] text-navy-textSecondary truncate max-w-[130px]">
          {data.sourceRef}
        </span>
      </div>

      <div className="text-xs font-medium text-navy-text line-clamp-2">
        {data.title}
      </div>

      <div className="mt-2 pt-1.5 border-t border-navy-border/40 text-[10px] text-navy-textMuted flex items-center justify-between">
        <span className="truncate max-w-[140px]">{data.bureauName}</span>
        <span className="font-mono">{data.openedAt?.slice(0, 10)}</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-slate-400 !w-2.5 !h-2.5" />
    </div>
  );
});

export const StageNode = memo(({ data }: { data: any }) => {
  const isCompleted = data.status === 'COMPLETED';
  const isCurrent = data.status === 'CURRENT';
  const isBlocked = data.status === 'BLOCKED';

  return (
    <div className={`px-3 py-2.5 rounded-card border shadow-dark-subtle text-navy-text min-w-[200px] ${
      isBlocked
        ? 'bg-rose-950/40 border-rose-500/60'
        : isCurrent
        ? 'bg-brand-tealMuted border-brand-teal'
        : isCompleted
        ? 'bg-navy-elevated border-emerald-600/50'
        : 'bg-navy-surface border-navy-border'
    }`}>
      <Handle type="target" position={Position.Top} className="!bg-brand-teal !w-2.5 !h-2.5" />
      <div className="flex items-center justify-between gap-1 text-[10px] font-mono text-navy-textSecondary mb-1">
        <span>{data.stageCode}</span>
        {isBlocked ? (
          <span className="text-rose-400 font-semibold">BLOCKED</span>
        ) : isCurrent ? (
          <span className="text-brand-teal font-semibold">CURRENT</span>
        ) : isCompleted ? (
          <span className="text-emerald-400 font-semibold">COMPLETED</span>
        ) : (
          <span>UPCOMING</span>
        )}
      </div>
      <div className="text-xs font-semibold text-navy-text truncate">
        {data.stageName}
      </div>
      <div className="text-[10px] text-navy-textMuted truncate mt-0.5">
        {data.decisionBody}
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-brand-teal !w-2.5 !h-2.5" />
    </div>
  );
});

export const AlertNode = memo(({ data }: { data: any }) => {
  return (
    <div className="px-3.5 py-3 rounded-card bg-rose-950/60 border-2 border-rose-500 shadow-dark-elevated text-navy-text min-w-[240px] max-w-[300px]">
      <Handle type="target" position={Position.Top} className="!bg-rose-500 !w-3 !h-3" />
      <div className="flex items-center gap-1.5 text-rose-300 text-xs font-semibold mb-1">
        <AlertOctagon className="w-4 h-4 text-rose-400" />
        <span>{data.title}</span>
      </div>
      <p className="text-[11px] text-rose-200/90 leading-tight">
        {data.humanDescription}
      </p>
      <div className="mt-2 text-[10px] font-mono text-rose-300 bg-rose-900/40 p-1 rounded">
        Origin: {data.originBureau}
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-rose-500 !w-3 !h-3" />
    </div>
  );
});

