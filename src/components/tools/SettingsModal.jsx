import React, { useState } from 'react';
import { 
  Settings, 
  Clock, 
  KeyRound, 
  ShieldCheck, 
  AlertTriangle, 
  Check, 
  Trash2, 
  Eye, 
  EyeOff,
  Cpu
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { changeMasterPassword } from '../../services/storage';

export function SettingsModal({
  isOpen,
  onClose,
  vaultData,
  masterPassword,
  onUpdateSettings,
  onPasswordChanged,
  onRequestResetVault
}) {
  const [autoLockMinutes, setAutoLockMinutes] = useState(vaultData?.settings?.autoLockMinutes || 15);
  
  // Password change state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [pwdError, setPwdError] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);

  const handleSaveAutoLock = (val) => {
    const mins = Number(val);
    setAutoLockMinutes(mins);
    onUpdateSettings({ autoLockMinutes: mins });
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setPwdError('');
    setPwdSuccess('');

    if (newPassword.length < 8) {
      setPwdError('La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPwdError('Las nuevas contraseñas no coinciden.');
      return;
    }

    setPwdLoading(true);
    try {
      await changeMasterPassword(oldPassword, newPassword, vaultData);
      onPasswordChanged(newPassword);
      setPwdSuccess('¡Contraseña maestra actualizada con éxito!');
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      setPwdError(err.message || 'Error al cambiar la contraseña.');
    } finally {
      setPwdLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ajustes de Seguridad y Preferencias"
      maxWidth="max-w-xl"
      icon={Settings}
    >
      <div className="space-y-6">
        
        {/* Auto Lock Configuration */}
        <div className="p-4 bg-vault-900/90 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-cyan-400" />
            <div>
              <h4 className="font-bold text-xs text-slate-100">Auto-Bloqueo por Inactividad</h4>
              <p className="text-[11px] text-slate-400">
                La caja fuerte se bloqueará automáticamente si dejas de interactuar con ella.
              </p>
            </div>
          </div>

          <select
            value={autoLockMinutes}
            onChange={(e) => handleSaveAutoLock(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-vault-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value={5}>5 minutos de inactividad</option>
            <option value={15}>15 minutos de inactividad (Recomendado)</option>
            <option value={30}>30 minutos de inactividad</option>
            <option value={60}>1 hora de inactividad</option>
            <option value={0}>Desactivar auto-bloqueo</option>
          </select>
        </div>

        {/* Change Master Password */}
        <div className="p-4 bg-vault-900/90 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5">
            <KeyRound className="w-5 h-5 text-amber-400" />
            <div>
              <h4 className="font-bold text-xs text-slate-100">Cambiar Contraseña Maestra</h4>
              <p className="text-[11px] text-slate-400">
                Re-cifrará toda tu bóveda con la nueva clave inmediatamente.
              </p>
            </div>
          </div>

          {pwdError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              {pwdError}
            </div>
          )}

          {pwdSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
              {pwdSuccess}
            </div>
          )}

          <form onSubmit={handleChangePasswordSubmit} className="space-y-3 pt-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Contraseña Actual:</label>
              <input
                type={showPwd ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-3 py-2 bg-vault-950 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Nueva Contraseña:</label>
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-vault-950 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Confirmar Nueva:</label>
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-vault-950 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
              >
                {showPwd ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showPwd ? 'Ocultar' : 'Mostrar'} contraseñas</span>
              </button>

              <button
                type="submit"
                disabled={pwdLoading || !oldPassword || !newPassword}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50"
              >
                {pwdLoading ? 'Re-cifrando...' : 'Actualizar Contraseña'}
              </button>
            </div>
          </form>
        </div>

        {/* Security Specs */}
        <div className="p-3.5 bg-vault-900/40 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-1.5 font-mono text-[11px]">
          <div className="flex items-center justify-between">
            <span>Algoritmo de Cifrado:</span>
            <span className="text-emerald-400 font-semibold">AES-GCM (256-bit)</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Derivación de Clave:</span>
            <span className="text-cyan-400 font-semibold">PBKDF2-SHA256 (100k iters)</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Arquitectura:</span>
            <span className="text-slate-200 font-semibold">Zero-Knowledge Local</span>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="p-4 bg-rose-500/5 rounded-2xl border border-rose-500/20 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-xs text-rose-300">Zona de Peligro</h4>
            <p className="text-[11px] text-slate-500">Elimina todos los datos y resetea la caja fuerte.</p>
          </div>
          <button
            type="button"
            onClick={onRequestResetVault}
            className="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Reiniciar Bóveda
          </button>
        </div>

      </div>
    </Modal>
  );
}
