import React, { useState } from 'react';
import { useLedger } from '../../context/LedgerContext';
import { UserRole } from '../../types';
import {
  Search,
  Bell,
  Menu,
  ShieldCheck,
  ChevronDown,
  Building,
  User,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';

interface TopBarProps {
  onMobileMenuToggle: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMobileMenuToggle }) => {
  const {
    currentUser,
    currentRole,
    switchRole,
    setIsSearchOpen,
    alerts,
    setActiveNav,
  } = useLedger();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const openAlertsCount = alerts.filter((a) => !a.isResolved).length;

  const rolesList: { role: UserRole; label: string; bureau: string }[] = [
    { role: 'SENIOR_REVIEWER', label: 'Senior Reviewer', bureau: 'Standing Committee Secretariat' },
    { role: 'PGRC_OFFICER', label: 'PGRC Officer', bureau: 'Public Grievance Redressal Cell' },
    { role: 'RB_OFFICER', label: 'Regional Bureau Officer', bureau: 'Western Regional Office (WRO)' },
    { role: 'LEGAL_OFFICER', label: 'Legal Officer', bureau: 'Court Cell' },
    { role: 'VIGILANCE_OFFICER', label: 'Vigilance Officer', bureau: 'Chief Vigilance Office' },
    { role: 'AUDITOR', label: 'Auditor', bureau: 'Statutory Audit Oversight' },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-ledger-border px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Global Search Trigger */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          onClick={onMobileMenuToggle}
          className="p-2 text-ledger-textSecondary hover:text-ledger-textPrimary hover:bg-ledger-surfaceSecondary rounded-control md:hidden"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input Trigger */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-2 text-xs bg-ledger-surfaceSecondary hover:bg-ledger-border/40 border border-ledger-border rounded-input text-ledger-textMuted transition-colors text-left"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-brand-teal" />
            <span className="truncate">Search institutions, Permanent IDs (e.g. 1-4392817), matters...</span>
          </div>
          <kbd className="hidden sm:inline-block font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-ledger-border text-ledger-textSecondary shadow-xs">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right: Workspace Context, Hash Status, Role Switcher, Alerts */}
      <div className="flex items-center gap-3">
        {/* Workspace Pilot Badge */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded bg-ledger-surfaceSecondary text-xs border border-ledger-border">
          <Building className="w-3.5 h-3.5 text-brand-teal" />
          <span className="font-medium text-ledger-textPrimary">AICTE Complaint Intelligence Pilot</span>
          <span className="text-[10px] font-mono text-ledger-textMuted">• Western Region</span>
        </div>

        {/* Cryptographic Hash Chain Verified Status */}
        <div
          onClick={() => setActiveNav('audit')}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-medium cursor-pointer hover:bg-emerald-100 transition-colors"
          title="Append-only SHA-256 hash chaining is valid"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Hash Chain Verified</span>
        </div>

        {/* Alerts Notification Bell */}
        <button
          onClick={() => setActiveNav('alerts')}
          className="relative p-2 text-ledger-textSecondary hover:text-ledger-textPrimary hover:bg-ledger-surfaceSecondary rounded-control transition-colors"
          title={`${openAlertsCount} Open Integrity Alerts`}
          aria-label="View alerts"
        >
          <Bell className="w-4 h-4" />
          {openAlertsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
          )}
        </button>

        {/* Active Role Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-ledger-surfaceSecondary hover:bg-ledger-border/50 border border-ledger-border rounded-control text-xs font-medium text-ledger-textPrimary transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-brand-teal" />
            <span className="truncate max-w-[130px] font-semibold">
              {currentRole.replace('_', ' ')}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-ledger-textMuted" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-panel border border-ledger-border shadow-elevated py-1.5 z-50 text-xs">
              <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-ledger-textMuted border-b border-ledger-border/60">
                Switch Operational Perspective
              </div>
              {rolesList.map((item) => (
                <button
                  key={item.role}
                  onClick={() => {
                    switchRole(item.role);
                    setRoleDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex flex-col hover:bg-ledger-bg transition-colors ${
                    currentRole === item.role ? 'bg-brand-tealLight/40 font-semibold text-brand-tealHover' : 'text-ledger-textPrimary'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {currentRole === item.role && (
                      <span className="text-[10px] font-mono text-brand-teal">ACTIVE</span>
                    )}
                  </div>
                  <span className="text-[10px] text-ledger-textMuted font-normal">
                    {item.bureau}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

