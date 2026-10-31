import React, { useState } from 'react';
import { useLedger } from '../../context/LedgerContext';
import {
  LayoutDashboard,
  Building2,
  FolderGit2,
  Sparkles,
  FileCheck2,
  AlertOctagon,
  Database,
  BarChart3,
  ShieldCheck,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onMobileClose }) => {
  const {
    activeNav,
    setActiveNav,
    relations,
    alerts,
    currentUser,
    logout,
  } = useLedger();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const pendingReviewsCount = relations.filter((r) => r.state === 'PROPOSED').length;
  const openAlertsCount = alerts.filter((a) => !a.isResolved).length;

  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'institutions',
      label: 'Institutions',
      icon: Building2,
      badge: null,
    },
    {
      id: 'matters',
      label: 'Matter Threads',
      icon: FolderGit2,
      badge: null,
    },
    {
      id: 'review',
      label: 'Review Queue',
      icon: Sparkles,
      badge: pendingReviewsCount > 0 ? pendingReviewsCount : null,
      badgeColor: 'bg-amber-100 text-amber-900 border border-amber-300 font-bold',
    },
    {
      id: 'coordination',
      label: 'Coordination Brief',
      icon: FileCheck2,
      badge: null,
    },
    {
      id: 'alerts',
      label: 'Alerts',
      icon: AlertOctagon,
      badge: openAlertsCount > 0 ? openAlertsCount : null,
      badgeColor: 'bg-rose-100 text-rose-800 border border-rose-300 font-bold',
    },
    {
      id: 'sources',
      label: 'Sources',
      icon: Database,
      badge: null,
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart3,
      badge: null,
    },
    {
      id: 'audit',
      label: 'Audit Log',
      icon: ShieldCheck,
      badge: 'SHA-256',
      badgeColor: 'bg-emerald-100 text-emerald-800 text-[9px] font-mono',
    },
    {
      id: 'rules',
      label: 'Rules / Governance',
      icon: BookOpen,
      badge: null,
    },
  ];

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    if (onMobileClose) onMobileClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-bg/60 backdrop-blur-xs md:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen flex flex-col justify-between bg-navy-surface border-r border-navy-border transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="h-16 px-4 flex items-center justify-between border-b border-navy-border/70">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2 rounded-lg bg-brand-teal text-white flex-shrink-0 shadow-dark-subtle">
                <FolderGit2 className="w-5 h-5" />
              </div>
              {!isCollapsed && (
                <div className="min-w-0">
                  <span className="text-[10px] font-mono uppercase text-brand-teal font-semibold tracking-wider block">
                    AICTE COORDINATION
                  </span>
                  <div className="font-bold text-xs text-navy-text truncate">
                    Matter Lineage Ledger
                  </div>
                </div>
              )}
            </div>

            {/* Collapse toggle (desktop only) */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex p-1.5 rounded-control text-navy-textMuted hover:text-navy-text hover:bg-navy-elevated transition-colors"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-card text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-brand-teal text-white shadow-dark-subtle font-semibold'
                      : 'text-navy-textSecondary hover:text-navy-text hover:bg-navy-elevated'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="truncate flex-1 text-left">{item.label}</span>
                  )}
                  {!isCollapsed && item.badge && (
                    <span
                      className={`px-1.5 py-0.2 rounded font-mono text-[10px] ${
                        isActive ? 'bg-white/20 text-white' : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Sign Out Footer */}
        <div className="p-3 border-t border-navy-border/70 bg-navy-bg/50">
          <div className="flex items-center justify-between gap-2">
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-xs text-navy-text truncate">
                  {currentUser?.name || 'Authorized Officer'}
                </div>
                <div className="text-[10px] text-navy-textMuted truncate font-mono">
                  {currentUser?.role?.replace('_', ' ')}
                </div>
              </div>
            )}

            <button
              onClick={logout}
              className="p-2 text-navy-textMuted hover:text-rose-400 hover:bg-navy-elevated rounded-control transition-colors"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

