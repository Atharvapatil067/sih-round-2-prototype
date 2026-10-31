import React, { useState } from 'react';
import { useLedger } from '../../context/LedgerContext';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { GlobalSearchModal } from '../search/GlobalSearchModal';
import { OverviewDashboard } from '../../views/OverviewDashboard';
import { InstitutionView } from '../institution/InstitutionView';
import { CoordinationBrief } from '../brief/CoordinationBrief';
import { MatterGraph } from '../graph/MatterGraph';
import { ReviewQueue } from '../review/ReviewQueue';
import { AlertsView } from '../alerts/AlertsView';
import { SourcesView } from '../sources/SourcesView';
import { ReportsView } from '../reports/ReportsView';
import { AuditLogView } from '../audit/AuditLogView';
import { RulesView } from '../rules/RulesView';
import {
  Building2,
  FolderGit2,
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Layers,
} from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';

export const AppShell: React.FC = () => {
  const {
    activeNav,
    setActiveNav,
    institutions,
    selectedInstitutionId,
    setSelectedInstitutionId,
    selectedInstitution,
    matterThreads,
    selectedMatterId,
    setSelectedMatterId,
    selectedMatter,
  } = useLedger();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ledger-bg flex text-ledger-textPrimary">
      {/* Sidebar Navigation */}
      <Sidebar
        isMobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <TopBar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

        {/* Global Search Palette Modal */}
        <GlobalSearchModal />

        {/* Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fade-in">
          {/* Breadcrumbs / Context Bar */}
          <div className="flex items-center gap-2 text-xs text-ledger-textMuted mb-4">
            <button
              onClick={() => setActiveNav('overview')}
              className="hover:text-ledger-textPrimary transition-colors"
            >
              Workspace
            </button>
            <span>/</span>
            <span className="font-semibold text-ledger-textPrimary capitalize">
              {activeNav.replace('-', ' ')}
            </span>
            {activeNav === 'institutions' && selectedInstitution && (
              <>
                <span>/</span>
                <span className="text-brand-teal font-medium truncate max-w-xs">
                  {selectedInstitution.canonicalName}
                </span>
              </>
            )}
            {activeNav === 'matters' && selectedMatter && (
              <>
                <span>/</span>
                <span className="text-brand-teal font-medium font-mono">
                  {selectedMatter.code}
                </span>
              </>
            )}
          </div>

          {/* VIEW: OVERVIEW */}
          {activeNav === 'overview' && <OverviewDashboard />}

          {/* VIEW: INSTITUTIONS */}
          {activeNav === 'institutions' && (
            <div className="space-y-6">
              {/* Institution Selector Pills */}
              <div className="bg-white p-3 rounded-card border border-ledger-border flex items-center gap-2 overflow-x-auto">
                <span className="text-xs font-mono uppercase text-ledger-textMuted flex-shrink-0">
                  Select Institution:
                </span>
                <div className="flex items-center gap-2">
                  {institutions.map((inst) => (
                    <button
                      key={inst.id}
                      onClick={() => setSelectedInstitutionId(inst.id)}
                      className={`px-3 py-1.5 rounded-control text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                        selectedInstitutionId === inst.id
                          ? 'bg-brand-teal text-white shadow-xs font-semibold'
                          : 'bg-ledger-surfaceSecondary hover:bg-ledger-border text-ledger-textPrimary'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{inst.canonicalName.split(',')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedInstitution ? (
                <InstitutionView institution={selectedInstitution} />
              ) : (
                <div className="p-8 text-center text-xs text-ledger-textMuted">
                  Please select an institution from above.
                </div>
              )}
            </div>
          )}

          {/* VIEW: MATTER THREADS (Interactive React Flow Graph + Directory) */}
          {activeNav === 'matters' && (
            <div className="space-y-6">
              {/* Matter Selector Header */}
              <div className="bg-white p-4 rounded-card border border-ledger-border flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono uppercase text-ledger-textMuted">
                    Select Matter Thread:
                  </span>
                  {matterThreads.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMatterId(m.id)}
                      className={`px-3 py-1.5 rounded-control text-xs font-mono font-medium transition-colors ${
                        selectedMatterId === m.id
                          ? 'bg-brand-teal text-white shadow-xs font-bold'
                          : 'bg-ledger-surfaceSecondary hover:bg-ledger-border text-ledger-textPrimary'
                      }`}
                    >
                      {m.code}
                    </button>
                  ))}
                </div>

                {selectedMatter && (
                  <button
                    onClick={() => setActiveNav('coordination')}
                    className="text-xs font-semibold text-brand-teal hover:underline flex items-center gap-1"
                  >
                    <span>Open Full Coordination Brief</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {selectedMatter && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-ledger-textPrimary">
                        {selectedMatter.title}
                      </h2>
                      <p className="text-xs text-ledger-textSecondary mt-0.5">
                        Concerning: {selectedMatter.institutionName} • Permanent ID: {selectedMatter.institutionPermanentId}
                      </p>
                    </div>
                    <StatusBadge status={selectedMatter.status} />
                  </div>

                  {/* React Flow Relationship Graph */}
                  <MatterGraph
                    matter={selectedMatter}
                    onOpenCoordinationBrief={() => setActiveNav('coordination')}
                  />
                </div>
              )}
            </div>
          )}

          {/* VIEW: REVIEW QUEUE */}
          {activeNav === 'review' && <ReviewQueue />}

          {/* VIEW: COORDINATION BRIEF */}
          {activeNav === 'coordination' && selectedMatter && (
            <div className="space-y-4">
              {/* Quick Matter Switcher Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <span className="text-xs font-mono uppercase text-ledger-textMuted">Brief:</span>
                {matterThreads.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMatterId(m.id)}
                    className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                      selectedMatterId === m.id
                        ? 'bg-navy-surface text-white font-bold'
                        : 'bg-white text-ledger-textSecondary hover:bg-ledger-surfaceSecondary border border-ledger-border'
                    }`}
                  >
                    {m.code}
                  </button>
                ))}
              </div>

              <CoordinationBrief
                matter={selectedMatter}
                onOpenGraphView={() => setActiveNav('matters')}
              />
            </div>
          )}

          {/* VIEW: ALERTS */}
          {activeNav === 'alerts' && <AlertsView />}

          {/* VIEW: SOURCES */}
          {activeNav === 'sources' && <SourcesView />}

          {/* VIEW: REPORTS */}
          {activeNav === 'reports' && <ReportsView />}

          {/* VIEW: AUDIT LOG */}
          {activeNav === 'audit' && <AuditLogView />}

          {/* VIEW: RULES / GOVERNANCE */}
          {activeNav === 'rules' && <RulesView />}
        </main>
      </div>
    </div>
  );
};

