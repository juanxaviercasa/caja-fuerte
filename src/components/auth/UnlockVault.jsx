import React, { useState } from 'react';
import { Lock, Unlock, Eye, EyeOff, ShieldAlert, ArrowRight, RefreshCw, Upload } from 'lucide-react';

export function UnlockVault({ onUnlock, onResetRequest, onImportBackupRequest }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) return;

    setError('');
    setLoading(true);

    try {
      await onUnlock(password);
    } catch (err) {
      setError(err.message || 'Contraseña incorrecta.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-vault-950 relative overflow-hidden">
      {/* Background Cyber Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d08_1px,transparent_1px),linear-gradient(to_bottom,#1f293d08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className={`w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative z-10 ${shake ? 'animate-bounce' : ''}`}>
        
        {/* Vault Dial / Icon */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl overflow-hidden border-2 border-emerald-500/30 mb-4 shadow-xl glow-emerald bg-slate-900">
            <img src="/devvault-logo.jpg" alt="DevVault" className="w-full h-full object-cover" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Dev<span className="text-emerald-400">Vault</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-mono">
            Caja Fuerte Bloqueada
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu Contraseña Maestra..."
                className="w-full pl-4 pr-12 py-3.5 bg-vault-900/90 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-mono text-sm shadow-inner"
                autoFocus
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-vault-950 font-bold text-sm shadow-lg shadow-emerald-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-vault-950 border-t-transparent rounded-full animate-spin" />
                Descifrando bóveda...
              </span>
            ) : (
              <>
                <Unlock className="w-4 h-4" />
                Desbloquear Caja Fuerte
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </form>

        {/* Emergency options */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col gap-2 text-center text-xs text-slate-400">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={onImportBackupRequest}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              Restaurar Respaldo
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={onResetRequest}
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reiniciar Bóveda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
