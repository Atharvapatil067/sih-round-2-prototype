import React, { useState, useEffect, useRef } from 'react';
import { useLedger } from '../../context/LedgerContext';
import {
  Search,
  X,
  Building2,
  FolderGit2,
  FileText,
  ArrowRight,
  ShieldAlert,
  Hash,
} from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    institutions,
    matterThreads,
    sourceRecords,
    setSelectedMatterId,
    setSelectedInstitutionId,
    setActiveNav,
  } = useLedger();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const query = searchQuery.toLowerCase().trim();

  // Search Institutions (Permanent ID exact, App ID, Aliases, Name)
  const matchedInstitutions = institutions.filter(
    (i) =>
      i.canonicalName.toLowerCase().includes(query) ||
      i.permanentId.toLowerCase().includes(query) ||
      i.applicationId.toLowerCase().includes(query) ||
      i.aliases.some((a) => a.alias.toLowerCase().includes(query)) ||
      i.city.toLowerCase().includes(query)
  );

  // Search Matter Threads
  const matchedMatters = matterThreads.filter(
    (m) =>
      m.code.toLowerCase().includes(query) ||
      m.title.toLowerCase().includes(query) ||
      m.institutionName.toLowerCase().includes(query) ||
      m.currentHolder.toLowerCase().includes(query)
  );

  // Search Source Records
  const matchedRecords = sourceRecords.filter(
    (r) =>
      r.sourceRef.toLowerCase().includes(query) ||
      r.title.toLowerCase().includes(query) ||
      r.summary.toLowerCase().includes(query) ||
      r.bureauName.toLowerCase().includes(query)
  );

  const totalMatches =
    query.length > 0
      ? matchedInstitutions.length + matchedMatters.length + matchedRecords.length
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-navy-bg/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-panel border border-ledger-border shadow-elevated w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-ledger-border flex items-center gap-3 bg-ledger-bg/40">
          <Search className="w-5 h-5 text-brand-teal flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search institutions, Permanent IDs (e.g. 1-4392817), matters, or records..."
            className="w-full text-sm bg-transparent border-none focus:outline-none placeholder:text-ledger-textMuted text-ledger-textPrimary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-ledger-textMuted hover:text-ledger-textPrimary rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[10px] font-mono bg-ledger-surfaceSecondary text-ledger-textMuted px-2 py-0.5 rounded border border-ledger-border">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {query.length === 0 ? (
            <div className="py-8 text-center text-xs text-ledger-textMuted space-y-2">
              <p>Type an institution name, AICTE Permanent ID, matter reference, or notice number.</p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => setSearchQuery('Apex')}
                  className="px-2 py-1 bg-ledger-surfaceSecondary rounded hover:bg-ledger-border/60 text-ledger-textPrimary font-mono"
                >
                  "Apex"
                </button>
                <button
                  onClick={() => setSearchQuery('1-4392817')}
                  className="px-2 py-1 bg-ledger-surfaceSecondary rounded hover:bg-ledger-border/60 text-ledger-textPrimary font-mono"
                >
                  "1-4392817" (Exact PID)
                </button>
                <button
                  onClick={() => setSearchQuery('Kaveri')}
                  className="px-2 py-1 bg-ledger-surfaceSecondary rounded hover:bg-ledger-border/60 text-ledger-textPrimary font-mono"
                >
                  "Kaveri"
                </button>
                <button
                  onClick={() => setSearchQuery('MTL-2026-0814')}
                  className="px-2 py-1 bg-ledger-surfaceSecondary rounded hover:bg-ledger-border/60 text-ledger-textPrimary font-mono"
                >
                  "MTL-2026-0814"
                </button>
              </div>
            </div>
          ) : totalMatches === 0 ? (
            <div className="py-12 text-center text-xs text-ledger-textSecondary">
              No results found for "<span className="font-semibold">{searchQuery}</span>". Check spelling or Permanent ID.
            </div>
          ) : (
            <div className="space-y-5">
              {/* Institutions Group */}
              {matchedInstitutions.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-ledger-textMuted font-semibold">
                    Approved Institutions ({matchedInstitutions.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedInstitutions.map((inst) => {
                      const isExactPID = inst.permanentId.toLowerCase() === query;

                      return (
                        <div
                          key={inst.id}
                          onClick={() => {
                            setSelectedInstitutionId(inst.id);
                            setActiveNav('institutions');
                            setIsSearchOpen(false);
                          }}
                          className="p-3 bg-white hover:bg-ledger-bg border border-ledger-border rounded-lg cursor-pointer flex items-center justify-between gap-3 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Building2 className="w-4 h-4 text-brand-teal flex-shrink-0" />
                            <div>
                              <div className="font-semibold text-xs text-ledger-textPrimary flex items-center gap-2">
                                <span>{inst.canonicalName}</span>
                                {isExactPID && (
                                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 rounded font-mono">
                                    EXACT PERMANENT ID MATCH
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-ledger-textMuted font-mono">
                                PID: {inst.permanentId} • {inst.city}, {inst.state}
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-ledger-textMuted" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Matter Threads Group */}
              {matchedMatters.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-ledger-textMuted font-semibold">
                    Matter Threads ({matchedMatters.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedMatters.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          setSelectedMatterId(m.id);
                          setActiveNav('matters');
                          setIsSearchOpen(false);
                        }}
                        className="p-3 bg-white hover:bg-ledger-bg border border-ledger-border rounded-lg cursor-pointer flex items-center justify-between gap-3 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FolderGit2 className="w-4 h-4 text-brand-sky flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-xs text-ledger-textPrimary flex items-center gap-2">
                              <span className="font-mono text-brand-teal">{m.code}</span>
                              <span className="line-clamp-1">{m.title}</span>
                            </div>
                            <div className="text-[11px] text-ledger-textMuted">
                              {m.institutionName} • Holder: {m.currentHolder}
                            </div>
                          </div>
                        </div>
                        <StatusBadge status={m.status} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Source Records Group */}
              {matchedRecords.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-ledger-textMuted font-semibold">
                    Source Records ({matchedRecords.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchedRecords.map((r) => (
                      <div
                        key={r.id}
                        onClick={() => {
                          const pm = matterThreads.find((m) => m.recordIds.includes(r.id));
                          if (pm) setSelectedMatterId(pm.id);
                          setActiveNav('sources');
                          setIsSearchOpen(false);
                        }}
                        className="p-3 bg-white hover:bg-ledger-bg border border-ledger-border rounded-lg cursor-pointer flex items-center justify-between gap-3 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-ledger-textMuted flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-xs text-ledger-textPrimary flex items-center gap-2">
                              <span className="font-mono font-bold">{r.sourceRef}</span>
                              <span className="px-1.5 py-0.2 bg-slate-100 rounded text-[10px] font-mono">
                                {r.sourceSystemCode}
                              </span>
                              <span className="line-clamp-1">{r.title}</span>
                            </div>
                            <div className="text-[11px] text-ledger-textMuted">
                              Bureau: {r.bureauName} • Institution: {r.institutionName}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-ledger-textMuted" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

