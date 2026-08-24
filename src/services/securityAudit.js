/**
 * DevVault Security Audit & Health Scanner Engine
 */

import { evaluatePasswordStrength } from './crypto';

export function runSecurityAudit(vaultData) {
  const secrets = vaultData?.secrets || [];
  const projects = vaultData?.projects || [];

  const findings = [];
  let scoreDeductions = 0;

  if (secrets.length === 0) {
    return {
      score: 100,
      label: 'Sin Secretos',
      color: 'text-slate-400',
      findings: [{
        id: 'no-secrets',
        type: 'info',
        title: 'Tu caja fuerte está vacía',
        description: 'Empieza agregando tus API Keys de IA o importando un archivo .env.',
        recommendation: 'Haz clic en "+ Nuevo Secreto" para guardar tu primera clave.'
      }],
      stats: { total: 0, critical: 0, warning: 0, info: 1 }
    };
  }

  // 1. Check for duplicate values
  const valueMap = {};
  secrets.forEach(sec => {
    const val = (sec.value || '').trim();
    if (!val) return;
    if (!valueMap[val]) valueMap[val] = [];
    valueMap[val].push(sec);
  });

  Object.entries(valueMap).forEach(([val, list]) => {
    if (list.length > 1) {
      scoreDeductions += 15 * (list.length - 1);
      const names = list.map(s => s.title || s.varName).join(', ');
      findings.push({
        id: `dup-${list[0].id}`,
        type: 'warning',
        title: `Clave duplicada encontrada en ${list.length} secretos`,
        description: `El mismo valor secreto está asignado a: ${names}.`,
        recommendation: 'Si es una clave global, asígnala al proyecto "Claves Globales" en lugar de duplicarla.',
        affectedSecrets: list
      });
    }
  });

  // 2. Check weak secrets and short passwords
  secrets.forEach(sec => {
    const val = (sec.value || '').trim();
    const isToken = sec.type === 'api_key' || sec.category === 'ai';

    if (val.length < 8) {
      scoreDeductions += 20;
      findings.push({
        id: `weak-short-${sec.id}`,
        type: 'critical',
        title: `Secreto muy corto: "${sec.title || sec.varName}"`,
        description: `El valor solo tiene ${val.length} caracteres, lo cual es vulnerable a fuerza bruta.`,
        recommendation: 'Reemplázalo por una clave o token seguro de al menos 16 a 32 caracteres.',
        affectedSecrets: [sec]
      });
    } else if (sec.type === 'password') {
      const strength = evaluatePasswordStrength(val);
      if (strength.score < 50) {
        scoreDeductions += 10;
        findings.push({
          id: `weak-pass-${sec.id}`,
          type: 'warning',
          title: `Contraseña débil: "${sec.title || sec.varName}"`,
          description: `La contraseña tiene baja entropía (${strength.label}).`,
          recommendation: 'Utiliza el Generador de Contraseñas integrado para crear una clave blindada.',
          affectedSecrets: [sec]
        });
      }
    }
  });

  // 3. Check for stale / unrotated secrets (> 90 days)
  const now = Date.now();
  const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;

  secrets.forEach(sec => {
    const dateToCheck = new Date(sec.updatedAt || sec.createdAt || 0).getTime();
    if (now - dateToCheck > NINETY_DAYS_MS) {
      scoreDeductions += 5;
      findings.push({
        id: `stale-${sec.id}`,
        type: 'info',
        title: `Clave sin rotar: "${sec.title || sec.varName}"`,
        description: `Esta clave no se ha modificado ni rotado en más de 90 días.`,
        recommendation: 'Verifica en la consola del proveedor si deseas renovar o rotar este token.',
        affectedSecrets: [sec]
      });
    }
  });

  // 4. Check for unassigned projects or notes
  secrets.forEach(sec => {
    if (!sec.projectId || !projects.some(p => p.id === sec.projectId)) {
      scoreDeductions += 5;
      findings.push({
        id: `orphan-${sec.id}`,
        type: 'info',
        title: `Secreto sin proyecto asignado: "${sec.title || sec.varName}"`,
        description: 'No está vinculado a ningún proyecto activo.',
        recommendation: 'Asígnalo a un proyecto o al espacio "Claves Globales".',
        affectedSecrets: [sec]
      });
    }
  });

  // Calculate final score
  const finalScore = Math.max(0, Math.min(100, 100 - scoreDeductions));

  let label = 'Excelente (Blindada)';
  let color = 'text-emerald-400';
  let badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';

  if (finalScore < 60) {
    label = 'Riesgo Crítico';
    color = 'text-rose-400';
    badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/30';
  } else if (finalScore < 85) {
    label = 'Atención Requerida';
    color = 'text-amber-400';
    badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
  }

  const criticalCount = findings.filter(f => f.type === 'critical').length;
  const warningCount = findings.filter(f => f.type === 'warning').length;
  const infoCount = findings.filter(f => f.type === 'info').length;

  return {
    score: finalScore,
    label,
    color,
    badgeColor,
    findings,
    stats: {
      total: findings.length,
      critical: criticalCount,
      warning: warningCount,
      info: infoCount
    }
  };
}
