import React, { useState, useMemo } from 'react';
import { 
  GitCompare, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Layers, 
  Copy, 
  Check 
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { ENVIRONMENTS } from '../../data/providers';

export function EnvDiffModal({
  isOpen,
  onClose,
  projects = [],
  secrets = []
}) {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || 'all');
  const [envA, setEnvA] = useState('development');
  const [envB, setEnvB] = useState('production');

  // Filter secrets for envA and envB
  const diffResults = useMemo(() => {
    const listA = secrets.filter(s => {
      const matchProj = selectedProjectId === 'all' || s.projectId === selectedProjectId || s.projectId === 'global-keys';
      return matchProj && s.environment === envA;
    });

    const listB = secrets.filter(s => {
      const matchProj = selectedProjectId === 'all' || s.projectId === selectedProjectId || s.projectId === 'global-keys';
      return matchProj && s.environment === envB;
    });

    const mapA = new Map(listA.map(s => [s.varName || s.key, s]));
    const mapB = new Map(listB.map(s => [s.varName || s.key, s]));

    const allKeys = Array.from(new Set([...mapA.keys(), ...mapB.keys()])).sort();

    return allKeys.map(key => {
      const itemA = mapA.get(key);
      const itemB = mapB.get(key);

      let status = 'match';
      if (!itemA && itemB) status = 'missing_in_a';
      else if (itemA && !itemB) status = 'missing_in_b';
      else if (itemA && itemB && itemA.value !== itemB.value) status = 'different_values';

      return {
        key,
        itemA,
        itemB,
        status
      };
    });
  }, [secrets, selectedProjectId, envA, envB]);

  const missingInBCount = diffResults.filter(d => d.status === 'missing_in_b').length;
  const missingInACount = diffResults.filter(d => d.status === 'missing_in_a').length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Comparador Diff de Entornos (.env Diff)"
      maxWidth="max-w-4xl"
      icon={GitCompare}
    >
      <div className="space-y-5">
        
        {/* Project & Environment Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-vault-900/90 rounded-2xl border border-slate-800 text-xs">
          <div>
            <label className="block font-semibold text-slate-400 mb-1">Proyecto:</label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-vault-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="all">Todos los proyectos</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-blue-400 mb-1">Entorno Base (A):</label>
            <select
              value={envA}
              onChange={(e) => setEnvA(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-vault-950 border border-blue-500/40 rounded-lg text-blue-200 focus:outline-none"
            >
              {ENVIRONMENTS.map(env => (
                <option key={env.id} value={env.id}>{env.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-emerald-400 mb-1">Entorno Comparado (B):</label>
            <select
              value={envB}
              onChange={(e) => setEnvB(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-vault-950 border border-emerald-500/40 rounded-lg text-emerald-200 focus:outline-none"
            >
              {ENVIRONMENTS.map(env => (
                <option key={env.id} value={env.id}>{env.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Warning Banner if keys missing in production */}
        {missingInBCount > 0 && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold">¡Atención! Hay {missingInBCount} variables configuradas en "{envA}" que faltan en "{envB}".</span>
              <p className="text-[11px] text-amber-300/80">Revisa la lista antes de hacer el despliegue para evitar errores de ejecución en producción.</p>
            </div>
          </div>
        )}

        {/* Diff Comparison Table */}
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-vault-900 text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Variable</th>
                  <th className="px-4 py-3 text-blue-300">En {envA}</th>
                  <th className="px-4 py-3 text-emerald-300">En {envB}</th>
                  <th className="px-4 py-3 text-right">Diagnóstico</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {diffResults.map(diff => (
                  <tr key={diff.key} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-slate-100">
                      {diff.key}
                    </td>

                    <td className="px-4 py-3">
                      {diff.itemA ? (
                        <span className="text-blue-400">✓ Presente</span>
                      ) : (
                        <span className="text-slate-600">-- Ausente --</span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      {diff.itemB ? (
                        <span className="text-emerald-400">✓ Presente</span>
                      ) : (
                        <span className="text-rose-400 font-bold">⚠️ Faltante</span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-right">
                      {diff.status === 'missing_in_b' && (
                        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-sans font-bold">
                          Falta en {envB}
                        </span>
                      )}
                      {diff.status === 'missing_in_a' && (
                        <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-sans font-bold">
                          Falta en {envA}
                        </span>
                      )}
                      {diff.status === 'different_values' && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-sans font-bold">
                          Valores Diferentes (OK)
                        </span>
                      )}
                      {diff.status === 'match' && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-sans font-bold">
                          Sincronizado
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </Modal>
  );
}
