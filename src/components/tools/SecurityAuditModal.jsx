import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCircle2, 
  RefreshCw, 
  Sparkles, 
  ArrowRight,
  Lock,
  Zap
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { runSecurityAudit } from '../../services/securityAudit';

export function SecurityAuditModal({
  isOpen,
  onClose,
  vaultData,
  onEditSecret
}) {
  const [filterSeverity, setFilterSeverity] = useState('all');

  const auditResult = useMemo(() => {
    return runSecurityAudit(vaultData);
  }, [vaultData, isOpen]);

  const filteredFindings = useMemo(() => {
    if (filterSeverity === 'all') return auditResult.findings;
    return auditResult.findings.filter(f => f.type === filterSeverity);
  }, [auditResult, filterSeverity]);

  const getSeverityIcon = (type) => {
    switch (type) {
      case 'critical': return <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
      default: return <Info className="w-4 h-4 text-cyan-400 shrink-0" />;
    }
  };

  const getSeverityBadge = (type) => {
    switch (type) {
      case 'critical': return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">Crítico</span>;
      case 'warning': return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">Advertencia</span>;
      default: return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Sugerencia</span>;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Auditoría de Seguridad y Salud de la Bóveda"
      maxWidth="max-w-3xl"
      icon={ShieldCheck}
    >
      <div className="space-y-6">
        
        {/* Score Header Card */}
        <div className="p-5 bg-vault-900/90 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-vault-950 border-2 border-slate-700 shadow-inner">
              <span className={`text-2xl font-extrabold font-mono ${auditResult.color}`}>
                {auditResult.score}%
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-100">Estado de Seguridad:</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${auditResult.badgeColor}`}>
                  {auditResult.label}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Escaneo automático de entropía, duplicados, rotaciones y huérfanos.
              </p>
            </div>
          </div>

          {/* Stats Badges */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              onClick={() => setFilterSeverity('all')}
              className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                filterSeverity === 'all' ? 'bg-slate-800 text-slate-100 border-slate-600' : 'bg-vault-950 text-slate-400 border-slate-800'
              }`}
            >
              Todos ({auditResult.stats.total})
            </button>
            <button
              onClick={() => setFilterSeverity('critical')}
              className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                filterSeverity === 'critical' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-vault-950 text-slate-400 border-slate-800'
              }`}
            >
              Críticos ({auditResult.stats.critical})
            </button>
            <button
              onClick={() => setFilterSeverity('warning')}
              className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                filterSeverity === 'warning' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-vault-950 text-slate-400 border-slate-800'
              }`}
            >
              Alertas ({auditResult.stats.warning})
            </button>
          </div>
        </div>

        {/* Findings List */}
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {filteredFindings.length > 0 ? (
            filteredFindings.map((finding) => (
              <div
                key={finding.id}
                className="p-4 bg-vault-950/80 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors flex flex-col sm:flex-row items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    {getSeverityIcon(finding.type)}
                    <span className="font-bold text-slate-200 text-sm">{finding.title}</span>
                    {getSeverityBadge(finding.type)}
                  </div>
                  
                  <p className="text-slate-400 pl-6">
                    {finding.description}
                  </p>

                  <div className="pl-6 pt-1">
                    <span className="text-emerald-400 font-medium">Recomendación: </span>
                    <span className="text-slate-300">{finding.recommendation}</span>
                  </div>
                </div>

                {finding.affectedSecrets && finding.affectedSecrets[0] && (
                  <button
                    onClick={() => {
                      onEditSecret(finding.affectedSecrets[0]);
                      onClose();
                    }}
                    className="self-end sm:self-center px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Corregir</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="p-8 text-center bg-vault-950 rounded-2xl border border-slate-800">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <span className="font-bold text-slate-200 block">No hay hallazgos en esta categoría</span>
              <span className="text-xs text-slate-400">Tus secretos cumplen con las directivas de seguridad.</span>
            </div>
          )}
        </div>

      </div>
    </Modal>
  );
}
