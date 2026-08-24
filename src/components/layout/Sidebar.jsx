import React from 'react';
import { 
  Layers, 
  BrainCircuit, 
  Database, 
  Cloud, 
  KeyRound, 
  Sparkles, 
  FolderKanban, 
  Plus, 
  Globe, 
  FileCode, 
  Zap, 
  Wand2, 
  HardDriveDownload,
  FolderOpen,
  BookOpen,
  GitCompare,
  ShieldAlert,
  ShieldCheck,
  Calculator,
  Trash2,
  Code2
} from 'lucide-react';
import { CATEGORIES, ENVIRONMENTS } from '../../data/providers';

export function Sidebar({
  projects = [],
  activeProjectId,
  setActiveProjectId,
  activeEnvironment,
  setActiveEnvironment,
  activeCategory,
  setActiveCategory,
  secrets = [],
  trashSecrets = [],
  onOpenProjectManager,
  onOpenEnvStudio,
  onOpenApiTester,
  onOpenPasswordGenerator,
  onOpenAiPlayground,
  onOpenSecurityAudit,
  onOpenEnvDiff,
  onOpenSdk,
  onOpenSanitizer,
  onOpenCalculator,
  onOpenTrashBin,
  onOpenGuide
}) {
  const getCategoryIcon = (id) => {
    switch (id) {
      case 'ai': return BrainCircuit;
      case 'database': return Database;
      case 'cloud': return Cloud;
      case 'auth': return KeyRound;
      case 'custom': return Sparkles;
      default: return Layers;
    }
  };

  const getCategoryCount = (catId) => {
    return secrets.filter(sec => {
      const matchProj = activeProjectId === 'all' || sec.projectId === activeProjectId || sec.projectId === 'global-keys';
      const matchEnv = activeEnvironment === 'all' || sec.environment === activeEnvironment;
      const matchCat = catId === 'all' || sec.category === catId;
      return matchProj && matchEnv && matchCat;
    }).length;
  };

  const getProjectSecretCount = (projId) => {
    if (projId === 'all') return secrets.length;
    return secrets.filter(sec => sec.projectId === projId).length;
  };

  return (
    <aside className="w-64 lg:w-72 shrink-0 border-r border-slate-800/90 bg-vault-950/60 p-4 flex flex-col gap-5 overflow-y-auto min-h-[calc(100vh-4rem)]">
      
      {/* 0. Guide Banner */}
      <button
        onClick={onOpenGuide}
        className="w-full flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-cyan-500/15 via-emerald-500/10 to-transparent border border-cyan-500/30 text-cyan-200 text-xs font-semibold hover:border-cyan-500/50 transition-all cursor-pointer shadow-sm text-left group"
      >
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform shrink-0" />
          <div>
            <span className="block text-slate-100 font-bold">Manual & Guías Pro</span>
            <span className="text-[10px] text-slate-400">Aprende qué y cómo guardar</span>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/40">
          LEER
        </span>
      </button>

      {/* 1. Projects Section */}
      <div>
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
            <FolderOpen className="w-3.5 h-3.5 text-cyan-400" />
            Proyectos ({projects.length})
          </span>
          <button
            onClick={onOpenProjectManager}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-emerald-500/10 transition-colors"
            title="Administrar Proyectos"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Gestionar</span>
          </button>
        </div>

        <div className="space-y-1">
          {/* All projects option */}
          <button
            onClick={() => setActiveProjectId('all')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              activeProjectId === 'all'
                ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 shadow-sm'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-100 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2.5 truncate">
              <FolderKanban className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">Todos los Proyectos</span>
            </div>
            <span className="text-[11px] font-mono px-1.5 py-0.2 bg-slate-800/80 text-slate-400 rounded-md">
              {secrets.length}
            </span>
          </button>

          {/* Individual Projects */}
          {projects.map(proj => (
            <button
              key={proj.id}
              onClick={() => setActiveProjectId(proj.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                activeProjectId === proj.id
                  ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-100 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: proj.color || '#10b981' }}
                />
                <span className="truncate">{proj.name}</span>
              </div>
              <span className="text-[11px] font-mono px-1.5 py-0.2 bg-slate-800/80 text-slate-400 rounded-md shrink-0">
                {getProjectSecretCount(proj.id)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Environments Filter */}
      <div>
        <div className="px-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Entorno
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1 bg-vault-900/60 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveEnvironment('all')}
            className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeEnvironment === 'all' ? 'bg-slate-800 text-slate-100 shadow-inner' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveEnvironment('development')}
            className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeEnvironment === 'development' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Dev
          </button>
          <button
            onClick={() => setActiveEnvironment('staging')}
            className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeEnvironment === 'staging' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Staging
          </button>
          <button
            onClick={() => setActiveEnvironment('production')}
            className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeEnvironment === 'production' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Prod
          </button>
        </div>
      </div>

      {/* 3. Categories Section */}
      <div>
        <div className="px-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Categorías
          </span>
        </div>
        <div className="space-y-1">
          {CATEGORIES.map(cat => {
            const Icon = getCategoryIcon(cat.id);
            const count = getCategoryCount(cat.id);
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 text-slate-100 border border-slate-700'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${cat.color || 'text-slate-400'}`} />
                  <span>{cat.name}</span>
                </div>
                <span className="text-[11px] font-mono px-1.5 py-0.2 bg-slate-800/80 text-slate-400 rounded-md">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Pro Developer Tools Suite */}
      <div className="pt-3 border-t border-slate-800/80 space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono px-2 block mb-1">
          Herramientas Pro
        </span>

        <button
          onClick={onOpenAiPlayground}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-purple-300 hover:bg-purple-500/10 transition-colors text-left"
        >
          <BrainCircuit className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span>AI Prompt Playground</span>
        </button>

        <button
          onClick={onOpenSecurityAudit}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-300 hover:bg-emerald-500/10 transition-colors text-left"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Auditor de Vulnerabilidades</span>
        </button>

        <button
          onClick={onOpenEnvDiff}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-blue-300 hover:bg-blue-500/10 transition-colors text-left"
        >
          <GitCompare className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>Comparador Diff .env</span>
        </button>

        <button
          onClick={onOpenSdk}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-300 hover:bg-emerald-500/10 transition-colors text-left"
        >
          <Code2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>SDK & DevOps Studio</span>
        </button>

        <button
          onClick={onOpenSanitizer}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-300 hover:bg-rose-500/10 transition-colors text-left"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span>Sanitizador Anti-Fugas</span>
        </button>

        <button
          onClick={onOpenCalculator}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-amber-300 hover:bg-amber-500/10 transition-colors text-left"
        >
          <Calculator className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Calculadora de Tokens</span>
        </button>

        <button
          onClick={onOpenEnvStudio}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-cyan-300 hover:bg-cyan-500/10 transition-colors text-left"
        >
          <FileCode className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Generar / Importar .env</span>
        </button>

        <button
          onClick={onOpenPasswordGenerator}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-indigo-300 hover:bg-indigo-500/10 transition-colors text-left"
        >
          <Wand2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>Generar Token / Password</span>
        </button>

        {/* Trash Bin */}
        <button
          onClick={onOpenTrashBin}
          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors text-left"
        >
          <div className="flex items-center gap-2">
            <Trash2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>Papelera de Reciclaje</span>
          </div>
          {trashSecrets.length > 0 && (
            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-md">
              {trashSecrets.length}
            </span>
          )}
        </button>
      </div>

    </aside>
  );
}
