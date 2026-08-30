import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  ExternalLink, 
  Zap, 
  Edit, 
  Trash2, 
  Code, 
  Sparkles, 
  BrainCircuit, 
  Database, 
  Cloud, 
  KeyRound, 
  Star,
  Terminal,
  Code2
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { PROVIDER_TEMPLATES } from '../../data/providers';

export function SecretCard({
  secret,
  projectName = '',
  onEdit,
  onDelete,
  onQuickView,
  onTestApi,
  onCopy,
  onToggleFavorite,
  onOpenSdk
}) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const template = PROVIDER_TEMPLATES.find(p => p.id === secret.providerId) || {};
  const isAiKey = secret.category === 'ai' || template.category === 'ai';
  const isTestable = template.testable || secret.testable;
  const isFavorite = Boolean(secret.isFavorite);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(secret.value);
    setCopied(true);
    if (onCopy) onCopy(secret.title || secret.varName);
    setTimeout(() => setCopied(false), 2000);
  };

  const getEnvBadge = (env) => {
    switch (env) {
      case 'development': return <Badge variant="cyan">Dev</Badge>;
      case 'staging': return <Badge variant="amber">Staging</Badge>;
      case 'production': return <Badge variant="emerald">Prod</Badge>;
      case 'personal': return <Badge variant="purple">Global</Badge>;
      default: return <Badge>General</Badge>;
    }
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'ai': return <BrainCircuit className="w-4 h-4 text-cyan-400" />;
      case 'database': return <Database className="w-4 h-4 text-emerald-400" />;
      case 'cloud': return <Cloud className="w-4 h-4 text-indigo-400" />;
      case 'auth': return <KeyRound className="w-4 h-4 text-amber-400" />;
      default: return <Sparkles className="w-4 h-4 text-rose-400" />;
    }
  };

  const maskedValue = secret.value 
    ? '•'.repeat(Math.min(secret.value.length, 26)) 
    : '••••••••••••••••';

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800/80 flex flex-col justify-between group relative overflow-hidden">
      
      {/* Top Accent line */}
      <div 
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${template.color || 'from-emerald-500 to-cyan-500'} opacity-70`} 
      />

      {/* Card Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 rounded-xl bg-vault-900 border border-slate-700/60 shadow-inner shrink-0">
              {getCategoryIcon(secret.category)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-slate-100 text-sm group-hover:text-emerald-300 transition-colors truncate">
                  {secret.title || secret.name || 'Secreto'}
                </h4>
                {isFavorite && (
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                )}
              </div>
              <div className="flex flex-col gap-0.5 mt-0.5">
                <div className="flex items-center">
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-800 truncate max-w-full inline-block">
                    {secret.varName || secret.key || 'VAR_NAME'}
                  </span>
                </div>
                {projectName && (
                  <span className="text-[10px] text-slate-500 font-medium truncate">
                    {projectName}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Favorite button */}
            <button
              type="button"
              onClick={() => onToggleFavorite(secret.id)}
              className={`p-1 rounded-lg transition-colors cursor-pointer ${
                isFavorite ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'
              }`}
              title={isFavorite ? 'Quitar de favoritos' : 'Fijar en favoritos'}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
            </button>
            {getEnvBadge(secret.environment)}
          </div>
        </div>

        {/* Quota / Tier / Description */}
        {(secret.quotaInfo || template.quotaInfo || secret.notes) && (
          <p className="text-xs text-slate-400 mb-4 line-clamp-2">
            {secret.quotaInfo || template.quotaInfo || secret.notes}
          </p>
        )}

        {/* Value Box */}
        <div className="bg-vault-950/90 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between gap-2 mb-4 font-mono text-xs shadow-inner">
          <div className="truncate text-slate-300 select-all overflow-hidden">
            {revealed ? secret.value : maskedValue}
          </div>
          
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setRevealed(!revealed)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors cursor-pointer"
              title={revealed ? 'Ocultar valor' : 'Mostrar valor'}
            >
              {revealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                copied 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
              title="Copiar secreto al portapapeles"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Card Footer / Quick Actions */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
        
        {/* Left Links */}
        <div className="flex items-center gap-2">
          {template.consoleUrl && (
            <a
              href={template.consoleUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-400 transition-colors"
              title="Abrir consola para gestionar tus claves"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Consola</span>
            </a>
          )}

          {isTestable && (
            <button
              type="button"
              onClick={() => onTestApi(secret)}
              className="inline-flex items-center gap-1 text-[11px] text-amber-400/90 hover:text-amber-300 hover:bg-amber-500/10 px-1.5 py-0.5 rounded transition-colors cursor-pointer"
              title="Probar si la API Key está activa"
            >
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Test IA</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onOpenSdk(secret)}
            className="inline-flex items-center gap-1 text-[11px] text-emerald-400/90 hover:text-emerald-300 hover:bg-emerald-500/10 px-1.5 py-0.5 rounded transition-colors cursor-pointer"
            title="Abrir SDK Studio y snippets DevOps"
          >
            <Code2 className="w-3 h-3" />
            <span>SDK Studio</span>
          </button>
        </div>

        {/* Right Actions: Edit & Delete */}
        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={() => onEdit(secret)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Editar secreto"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(secret)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            title="Mover a la papelera"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
