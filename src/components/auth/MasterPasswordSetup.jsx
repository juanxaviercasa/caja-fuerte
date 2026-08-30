import React, { useState } from 'react';
import { ShieldCheck, Lock, Eye, EyeOff, KeyRound, Sparkles, AlertCircle, Clock } from 'lucide-react';
import { evaluatePasswordStrength } from '../../services/crypto';

export function MasterPasswordSetup({ onComplete }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [autoLockMinutes, setAutoLockMinutes] = useState(15);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const strength = evaluatePasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('La contraseña maestra debe tener al menos 8 caracteres (se recomiendan 12+).');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden. Verifícalas cuidadosamente.');
      return;
    }

    if (!acceptedTerms) {
      setError('Debes confirmar que comprendes que no hay recuperación sin esta contraseña.');
      return;
    }

    setLoading(true);
    
    // Slight delay to allow browser to register the form submission
    // and trigger "Save Password" prompt before React unmounts this component
    setTimeout(async () => {
      try {
        await onComplete(password, { autoLockMinutes, rememberMe });
      } catch (err) {
        setError(err.message || 'Error al inicializar la caja fuerte.');
        setLoading(false);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-radial-vault">
      <div className="w-full max-w-xl glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-500/20 shadow-2xl shadow-emerald-950/40 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl overflow-hidden border border-emerald-500/30 mb-4 shadow-lg shadow-emerald-950/50 bg-slate-900">
            <img src="/devvault-logo.jpg" alt="DevVault" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Configurar tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">DevVault</span>
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
            Crea tu Contraseña Maestra para cifrar militarmente (AES-GCM-256) todas tus API Keys de IA, credenciales y archivos .env en tu equipo.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Master Password Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Contraseña Maestra
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="text"
                name="username"
                value="DevVaultUser"
                autoComplete="username"
                style={{ position: 'absolute', width: '1px', height: '1px', top: '-9999px', opacity: 0 }}
                readOnly
              />
              <input
                id="new-password"
                name="new-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Ingresa una contraseña segura..."
                className="w-full pl-10 pr-12 py-3 bg-vault-900/90 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono text-sm"
                autoFocus
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Strength Bar */}
            {password && (
              <div className="mt-2.5 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Seguridad:</span>
                  <span className={`font-semibold ${strength.color}`}>{strength.label}</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strength.barColor || 'bg-emerald-500'}`}
                    style={{ width: `${strength.score}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Confirmar Contraseña Maestra
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                id="confirm-password"
                name="confirm-password"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Repite tu contraseña maestra..."
                className="w-full pl-10 pr-4 py-3 bg-vault-900/90 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono text-sm"
                required
              />
            </div>
          </div>

          {/* Auto Lock Setting */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Auto-Bloqueo por Inactividad
            </label>
            <select
              value={autoLockMinutes}
              onChange={(e) => setAutoLockMinutes(Number(e.target.value))}
              className="w-full px-4 py-2.5 bg-vault-900/90 border border-slate-700/80 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-emerald-500/70"
            >
              <option value={5}>5 minutos de inactividad</option>
              <option value={15}>15 minutos de inactividad (Recomendado)</option>
              <option value={30}>30 minutos de inactividad</option>
              <option value={60}>1 hora de inactividad</option>
              <option value={0}>Nunca bloquear automáticamente</option>
            </select>
          </div>

          {/* Zero Knowledge Warning / Agreement */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500/50 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-slate-300 leading-relaxed cursor-pointer select-none">
                Entiendo que <strong className="text-emerald-400">DevVault utiliza cifrado local de Conocimiento Cero</strong>. No existe ningún servidor central que guarde mi contraseña. Si la olvido, nadie podrá recuperarla salvo mediante una copia de seguridad exportada.
              </label>
            </div>
            
            <div className="flex items-center gap-3">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500/50 cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-xs text-slate-300 cursor-pointer select-none">
                Mantener mi sesión abierta en este navegador (Sobreescribe el Autobloqueo al salir)
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                Cifrando y configurando caja fuerte...
              </span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Crear Mi Caja Fuerte Segura
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
