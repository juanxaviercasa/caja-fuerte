import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Plus, 
  Search, 
  Clock, 
  FileCode, 
  Wand2, 
  Zap, 
  HardDriveDownload,
  Settings,
  BrainCircuit,
  BookOpen,
  GitCompare,
  ShieldAlert,
  Calculator,
  Code2
} from 'lucide-react';

export function Navbar({
  vaultData,
  activeProject,
  searchQuery,
  setSearchQuery,
  onOpenNewSecret,
  onOpenEnvStudio,
  onOpenApiTester,
  onOpenPasswordGenerator,
  onOpenBackup,
  onOpenSettings,
  onOpenAiPlayground,
  onOpenSecurityAudit,
  onOpenEnvDiff,
  onOpenSanitizer,
  onOpenCalculator,
  onOpenGuide,
  onLockVault,
  autoLockMinutes = 15,
  lastActivityTime
}) {
  const [remainingTimeStr, setRemainingTimeStr] = useState('');

  useEffect(() => {
    if (!autoLockMinutes || autoLockMinutes === 0) {
      setRemainingTimeStr('Infinito');
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedMs = now - (lastActivityTime || now);
      const totalMs = autoLockMinutes * 60 * 1000;
      const remainingMs = Math.max(0, totalMs - elapsedMs);

      const mins = Math.floor(remainingMs / 60000);
      const secs = Math.floor((remainingMs % 60000) / 1000);

      setRemainingTimeStr(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [autoLockMinutes, lastActivityTime]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-vault-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const totalSecrets = vaultData?.secrets?.length || 0;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/90 bg-vault-950/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-3 sm:px-6 gap-3">
        
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-400 shadow-md shadow-emerald-950/40">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-slate-100 tracking-tight">
                Dev<span className="text-emerald-400">Vault</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {totalSecrets} {totalSecrets === 1 ? 'secreto' : 'secretos'} protegidos
            </p>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-md mx-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="global-vault-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, clave, IA o proyecto... (Ctrl+K)"
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-vault-900/90 border border-slate-700/70 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/70 font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          
          {/* Guide CTA */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 font-semibold text-xs transition-all cursor-pointer shadow-sm"
            title="Manual interactivo y buenas prácticas"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Guía & Manual</span>
          </button>

          {/* AI Playground CTA */}
          <button
            onClick={onOpenAiPlayground}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/40 text-purple-300 font-semibold text-xs transition-all cursor-pointer"
            title="AI Playground para probar prompts con tus keys"
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>AI Playground</span>
          </button>

          {/* Security Audit */}
          <button
            onClick={onOpenSecurityAudit}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all cursor-pointer"
            title="Auditoría de Vulnerabilidades y Salud"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Auditoría</span>
          </button>

          {/* New Secret CTA */}
          <button
            onClick={onOpenNewSecret}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-emerald-950/50 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Nuevo Secreto</span>
          </button>

          {/* Backup */}
          <button
            onClick={onOpenBackup}
            title="Respaldos y Copias de Seguridad"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <HardDriveDownload className="w-4 h-4" />
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            title="Ajustes de Seguridad"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Auto Lock Timer & Lock Button */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800">
            {autoLockMinutes > 0 && (
              <span className="hidden xl:inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded-md border border-slate-800" title="Tiempo hasta bloqueo">
                <Clock className="w-3 h-3 text-cyan-400" />
                {remainingTimeStr}
              </span>
            )}
            <button
              onClick={onLockVault}
              title="Bloquear Caja Fuerte"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-all cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bloquear</span>
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}
