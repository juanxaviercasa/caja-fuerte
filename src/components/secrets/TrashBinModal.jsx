import React from 'react';
import { Trash2, RefreshCw, AlertTriangle, ShieldCheck, Check } from 'lucide-react';
import { Modal } from '../common/Modal';

export function TrashBinModal({
  isOpen,
  onClose,
  trashSecrets = [],
  onRestoreSecret,
  onPermanentDeleteSecret,
  onEmptyTrash
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Papelera de Reciclaje de Secretos"
      maxWidth="max-w-2xl"
      icon={Trash2}
    >
      <div className="space-y-5">
        
        {/* Header bar */}
        <div className="flex items-center justify-between p-3.5 bg-vault-900/90 rounded-2xl border border-slate-800 text-xs">
          <div>
            <span className="font-semibold text-slate-200">
              {trashSecrets.length} {trashSecrets.length === 1 ? 'secreto en la papelera' : 'secretos en la papelera'}
            </span>
            <p className="text-[11px] text-slate-400">
              Puedes restaurar cualquier secreto o eliminarlo permanentemente.
            </p>
          </div>

          {trashSecrets.length > 0 && (
            <button
              type="button"
              onClick={onEmptyTrash}
              className="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/30 rounded-xl font-semibold transition-colors cursor-pointer"
            >
              Vaciar Papelera
            </button>
          )}
        </div>

        {/* Trash List */}
        {trashSecrets.length > 0 ? (
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {trashSecrets.map((sec) => (
              <div
                key={sec.id}
                className="p-3 bg-vault-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-200">{sec.title || sec.name}</span>
                    <span className="font-mono text-[11px] text-cyan-400 bg-slate-900 px-1.5 py-0.2 rounded border border-slate-800">
                      {sec.varName || sec.key}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Eliminado el: {new Date(sec.deletedAt || Date.now()).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onRestoreSecret(sec.id)}
                    className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-lg font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Restaurar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onPermanentDeleteSecret(sec.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                    title="Eliminar definitivamente"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-vault-950 rounded-2xl border border-slate-800">
            <Trash2 className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <span className="font-bold text-slate-300 block text-xs">La papelera está vacía</span>
            <span className="text-[11px] text-slate-500">Los secretos que elimines aparecerán aquí para que puedas recuperarlos si fue un error.</span>
          </div>
        )}

      </div>
    </Modal>
  );
}
