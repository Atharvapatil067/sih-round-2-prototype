import React from 'react';
import { Activity, Clock, AlertTriangle } from 'lucide-react';

interface FreshnessBadgeProps {
  lastSeenAt: string;
  slaHours?: number;
  className?: string;
}

export const FreshnessBadge: React.FC<FreshnessBadgeProps> = ({
  lastSeenAt,
  slaHours = 48,
  className = '',
}) => {
  const lastSeenDate = new Date(lastSeenAt);
  const now = new Date('2026-11-01T10:30:00Z');
  const diffHours = Math.max(0, Math.floor((now.getTime() - lastSeenDate.getTime()) / (1000 * 60 * 60)));

  let status: 'fresh' | 'aging' | 'stale' = 'fresh';
  let label = 'Fresh';
  let color = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  let Icon = Activity;

  if (diffHours > slaHours * 3 || diffHours > 240) {
    status = 'stale';
    label = 'Stale Source';
    color = 'bg-rose-50 text-rose-700 border-rose-300';
    Icon = AlertTriangle;
  } else if (diffHours > slaHours) {
    status = 'aging';
    label = 'Aging';
    color = 'bg-amber-50 text-amber-700 border-amber-300';
    Icon = Clock;
  }

  const timeAgo =
    diffHours < 24
      ? `${diffHours}h ago`
      : `${Math.floor(diffHours / 24)}d ago`;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs border font-mono ${color} ${className}`}
      title={`Last reported snapshot: ${lastSeenDate.toLocaleDateString()} (${diffHours} hours ago; SLA: ${slaHours}h)`}
    >
      <Icon className="w-3 h-3" aria-hidden="true" />
      <span>{label}</span>
      <span className="text-[10px] opacity-75 font-sans">({timeAgo})</span>
    </span>
  );
};

