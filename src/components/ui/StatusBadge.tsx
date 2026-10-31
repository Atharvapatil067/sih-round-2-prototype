import React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  AlertOctagon,
  ShieldAlert,
  ArrowRightCircle,
  HelpCircle,
  LucideIcon,
} from 'lucide-react';
import { NormalizedStatus, RelationshipType, RelationshipState } from '../../types';

interface StatusBadgeProps {
  status?: NormalizedStatus | RelationshipState | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  customLabel?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  className = '',
  customLabel,
}) => {
  let label = customLabel || status || 'Pending';
  let Icon: LucideIcon = Clock;
  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';

  switch (status) {
    case 'APPROVED':
    case 'CLOSED_RESOLVED':
    case 'CONFIRMED':
    case 'COMPLETED':
      Icon = CheckCircle2;
      colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      if (!customLabel) label = status === 'CONFIRMED' ? 'Confirmed' : 'Completed';
      break;

    case 'TRANSFERRED_PENDING_RECEIPT':
    case 'BLOCKED':
    case 'CRITICAL':
    case 'ATTENTION_REQUIRED':
      Icon = AlertOctagon;
      colorClasses = 'bg-rose-50 text-rose-800 border-rose-200';
      if (!customLabel) label = status === 'TRANSFERRED_PENDING_RECEIPT' ? 'Transfer Pending Receipt' : 'Needs Attention';
      break;

    case 'PENDING_SCRUTINY':
    case 'UNDER_SCRUTINY':
    case 'PROPOSED':
    case 'WARNING':
    case 'UNDER_REVIEW':
      Icon = AlertTriangle;
      colorClasses = 'bg-amber-50 text-amber-800 border-amber-200';
      if (!customLabel) label = status === 'PROPOSED' ? 'Proposed (Needs Review)' : 'Under Scrutiny';
      break;

    case 'RESTRICTED_INQUIRY':
    case 'RESTRICTED':
      Icon = ShieldAlert;
      colorClasses = 'bg-purple-50 text-purple-900 border-purple-200';
      if (!customLabel) label = 'Restricted / In-Camera';
      break;

    case 'HEARING_SCHEDULED':
    case 'INVESTIGATION_ONGOING':
    case 'ACTIVE_SCRUTINY':
    case 'CURRENT':
      Icon = ArrowRightCircle;
      colorClasses = 'bg-sky-50 text-sky-800 border-sky-200';
      if (!customLabel) label = status === 'HEARING_SCHEDULED' ? 'Hearing Scheduled' : 'In Progress';
      break;

    case 'REJECTED':
      Icon = AlertOctagon;
      colorClasses = 'bg-red-50 text-red-700 border-red-200 line-through';
      if (!customLabel) label = 'Rejected';
      break;

    case 'DEFERRED':
      Icon = Clock;
      colorClasses = 'bg-gray-100 text-gray-700 border-gray-200';
      if (!customLabel) label = 'Deferred';
      break;

    case 'CLOSED_FORWARDED':
      Icon = CheckCircle2;
      colorClasses = 'bg-slate-100 text-slate-800 border-slate-200';
      if (!customLabel) label = 'Forwarded';
      break;

    default:
      Icon = HelpCircle;
      break;
  }

  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-xs gap-1'
      : size === 'lg'
      ? 'px-3.5 py-1.5 text-sm gap-2 font-medium'
      : 'px-2.5 py-1 text-xs gap-1.5 font-medium';

  return (
    <span
      className={`inline-flex items-center rounded-full border ${colorClasses} ${sizeClasses} ${className}`}
      title={label}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
};

