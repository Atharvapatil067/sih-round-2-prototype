import React, { useState } from 'react';
import { useLedger } from '../../context/LedgerContext';
import { SYNTHETIC_USERS } from '../../data/syntheticData';
import { UserRole } from '../../types';
import {
  FolderGit2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileText,
  GitBranch,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  Network,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useLedger();

  const [email, setEmail] = useState('r.sharma@aicte-india.org');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Allow any valid-looking input to sign in
    login();
  };

  const handleRoleQuickDemo = (role: UserRole) => {
    const user = SYNTHETIC_USERS.find((u) => u.role === role) || SYNTHETIC_USERS[0];
    login(user);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-navy-bg">
      {/* ==============================================
          LEFT SIDE: DEEP VISUAL SURFACE & SYSTEM FLOW
          ============================================== */}
      <div className="md:w-7/12 bg-navy-bg border-r border-navy-border p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden text-navy-text">
        {/* Subtle grid and glowing node background */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1EA7A8_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-teal text-white shadow-dark-subtle">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-teal">
                SIH26264 • AICTE Complaint Intelligence
              </span>
              <h2 className="text-xl font-bold tracking-tight text-navy-text">
                MATTER LINEAGE LEDGER
              </h2>
            </div>
          </div>
          <p className="text-xs text-navy-textSecondary pt-1 max-w-md">
            Follow the matter. Understand the story. Know what happens next.
          </p>
        </div>

        {/* CENTERPIECE: Abstract Connected Records & Institutional Flow Visualization */}
        <div className="relative z-10 my-8 py-4">
          <div className="max-w-xl mx-auto space-y-6">
            {/* Visual Flow diagram: Source Records -> Matter Thread -> Institutions -> Procedural Action */}
            <div className="grid grid-cols-3 gap-3 text-center">
              {/* Box 1: Sources */}
              <div className="p-3.5 rounded-card bg-navy-surface/90 border border-navy-border text-left shadow-dark-subtle">
                <div className="flex items-center justify-between text-[10px] font-mono text-navy-textMuted mb-1">
                  <span>SNAPSHOTS</span>
                  <FileText className="w-3.5 h-3.5 text-brand-sky" />
                </div>
                <div className="text-xs font-semibold text-navy-text">Multi-Bureau Intake</div>
                <div className="text-[10px] text-navy-textSecondary mt-0.5">CSS, PGRC, RB, Court</div>
              </div>

              {/* Box 2: Matter Thread Node */}
              <div className="p-3.5 rounded-card bg-navy-elevated border-2 border-brand-teal text-left shadow-dark-elevated">
                <div className="flex items-center justify-between text-[10px] font-mono text-brand-teal mb-1">
                  <span>CURATED THREAD</span>
                  <GitBranch className="w-3.5 h-3.5 text-brand-teal" />
                </div>
                <div className="text-xs font-bold text-white">Matter Thread</div>
                <div className="text-[10px] text-brand-sky mt-0.5">Confirmed Edges Only</div>
              </div>

              {/* Box 3: Procedural Action */}
              <div className="p-3.5 rounded-card bg-navy-surface/90 border border-navy-border text-left shadow-dark-subtle">
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 mb-1">
                  <span>ACTIONABLE</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-xs font-semibold text-navy-text">Coordination Brief</div>
                <div className="text-[10px] text-navy-textSecondary mt-0.5">Stage, Holder & Action</div>
              </div>
            </div>

            {/* Simulated Animated Network Card */}
            <div className="p-5 rounded-panel bg-navy-surface border border-navy-border shadow-dark-elevated space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-navy-border/60">
                <span className="font-semibold text-brand-teal flex items-center gap-2">
                  <Network className="w-4 h-4" />
                  <span>Real-Time Institutional Lineage Demo</span>
                </span>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  SHA-256 HASH CHAIN ACTIVE
                </span>
              </div>

              {/* Simulated Nodes & Lineage Step */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-navy-elevated border border-navy-border/50">
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-brand-sky" />
                    <div>
                      <div className="font-semibold text-white">Apex Institute of Technology, Pune</div>
                      <div className="text-[10px] text-navy-textMuted font-mono">PID: 1-4392817 • Western Region</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-brand-teal px-2 py-0.5 bg-brand-tealMuted rounded">
                    Resolved Identity
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/40">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <div>
                      <div className="font-semibold text-rose-200">Handoff Gap Flagged: Transfer Not Accepted</div>
                      <div className="text-[10px] text-rose-300">PGRC dispatched to Western Regional Office 18 days ago</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-rose-300 font-bold">R-PROC-05</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Principles */}
        <div className="relative z-10 pt-4 border-t border-navy-border/60 flex flex-wrap items-center justify-between gap-4 text-xs text-navy-textSecondary">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-teal" />
            <span>Read-mostly coordination layer • Preserves source ownership</span>
          </div>
          <span className="font-mono text-[11px] text-navy-textMuted">Version 2.0 • Nov 2026</span>
        </div>
      </div>

      {/* ==============================================
          RIGHT SIDE: PROFESSIONAL LOGIN PANEL
          ============================================== */}
      <div className="md:w-5/12 bg-ledger-bg p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-ledger-textPrimary">
        <div className="w-full max-w-md mx-auto space-y-6">
          {/* Form Header */}
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-ledger-textPrimary">
              Sign in to your workspace
            </h1>
            <p className="text-xs sm:text-sm text-ledger-textSecondary">
              Understand what happened, what is connected, and what needs attention.
            </p>
          </div>

          {/* Quick Demo Workspace Button (Prominent) */}
          <div className="p-4 rounded-xl bg-white border border-brand-teal/40 shadow-subtle space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-teal flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Instant Evaluation Workspace</span>
              </span>
              <span className="text-[10px] font-mono bg-brand-tealLight text-brand-tealHover px-1.5 py-0.5 rounded font-bold">
                1-CLICK
              </span>
            </div>
            <p className="text-xs text-ledger-textSecondary">
              Enter the fully pre-seeded prototype with multiple institutions, proposed reviews, handoff alerts, and tamper-evident audit history.
            </p>
            <button
              type="button"
              onClick={() => login()}
              className="w-full py-2.5 px-4 bg-brand-teal hover:bg-brand-tealHover text-white text-xs font-semibold rounded-control shadow-sm flex items-center justify-center gap-2 transition-all transform active:scale-[0.99]"
            >
              <span>Enter Demo Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-ledger-border"></div>
            <span className="flex-shrink mx-3 text-xs text-ledger-textMuted uppercase font-mono">
              Or Sign In With Credentials
            </span>
            <div className="flex-grow border-t border-ledger-border"></div>
          </div>

          {/* Regular Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-ledger-textPrimary mb-1.5">
                Institutional Email or Official ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-ledger-textMuted absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@aicte-india.org"
                  required
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-input border border-ledger-border bg-white text-ledger-textPrimary placeholder:text-ledger-textMuted focus:ring-1 focus:ring-brand-teal focus:border-brand-teal"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-ledger-textPrimary">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('For prototype demonstration, click "Enter Demo Workspace" or enter any password.')}
                  className="text-xs text-brand-teal hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-ledger-textMuted absolute left-3 top-3 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full text-xs pl-9 pr-10 py-2.5 rounded-input border border-ledger-border bg-white text-ledger-textPrimary focus:ring-1 focus:ring-brand-teal focus:border-brand-teal"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-ledger-textMuted hover:text-ledger-textPrimary p-0.5"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-ledger-border text-brand-teal focus:ring-brand-teal"
                />
                <span className="text-ledger-textSecondary">Remember this terminal</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-navy-surface hover:bg-navy-elevated text-white text-xs font-semibold rounded-control shadow-sm flex items-center justify-center gap-2 transition-colors"
            >
              <span>Sign In to Terminal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Role Switcher Presets */}
          <div className="pt-4 border-t border-ledger-border/60 space-y-2">
            <span className="text-[11px] font-mono uppercase text-ledger-textMuted tracking-wider block">
              Quick Role Test Drives:
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => handleRoleQuickDemo('SENIOR_REVIEWER')}
                className="px-2.5 py-1 bg-white hover:bg-ledger-surfaceSecondary border border-ledger-border rounded text-[11px] text-ledger-textPrimary transition-colors"
              >
                Senior Reviewer
              </button>
              <button
                type="button"
                onClick={() => handleRoleQuickDemo('PGRC_OFFICER')}
                className="px-2.5 py-1 bg-white hover:bg-ledger-surfaceSecondary border border-ledger-border rounded text-[11px] text-ledger-textPrimary transition-colors"
              >
                PGRC Officer
              </button>
              <button
                type="button"
                onClick={() => handleRoleQuickDemo('RB_OFFICER')}
                className="px-2.5 py-1 bg-white hover:bg-ledger-surfaceSecondary border border-ledger-border rounded text-[11px] text-ledger-textPrimary transition-colors"
              >
                Regional Officer
              </button>
              <button
                type="button"
                onClick={() => handleRoleQuickDemo('LEGAL_OFFICER')}
                className="px-2.5 py-1 bg-white hover:bg-ledger-surfaceSecondary border border-ledger-border rounded text-[11px] text-ledger-textPrimary transition-colors"
              >
                Legal Officer
              </button>
              <button
                type="button"
                onClick={() => handleRoleQuickDemo('AUDITOR')}
                className="px-2.5 py-1 bg-white hover:bg-ledger-surfaceSecondary border border-ledger-border rounded text-[11px] text-ledger-textPrimary transition-colors"
              >
                Auditor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

