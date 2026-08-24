import React, { useState } from 'react';
import { 
  HardDriveDownload, 
  Download, 
  Upload, 
  ShieldCheck, 
  AlertTriangle, 
  Check, 
  Lock, 
  FileJson, 
  FileCode,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { exportEncryptedBackup, importEncryptedBackup } from '../../services/storage';
import { generateEnvContent, downloadFile } from '../../services/envParser';

export function BackupModal({
  isOpen,
  onClose,
  vaultData,
  masterPassword,
  onRestoreVaultData
}) {
  const [activeTab, setActiveTab] = useState('export'); // 'export' | 'import'
  const [backupPassword, setBackupPassword] = useState('');
  const [useMasterPassword, setUseMasterPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Import state
  const [importFileContent, setImportFileContent] = useState('');
  const [importPassword, setImportPassword] = useState('');
  const [fileName, setFileName] = useState('');

  const handleExportEncrypted = async () => {
    setError('');
    setSuccess('');
    const pwdToUse = useMasterPassword ? masterPassword : backupPassword;

    if (!pwdToUse) {
      setError('Debes especificar una contraseña para cifrar el respaldo.');
      return;
    }

    setLoading(true);
    try {
      const backupJson = await exportEncryptedBackup(pwdToUse, vaultData);
      const dateStr = new Date().toISOString().slice(0, 10);
      downloadFile(backupJson, `devvault-backup-${dateStr}.devvault`, 'application/json');
      setSuccess('Respaldo cifrado descargado con éxito.');
    } catch (err) {
      setError('Error al generar respaldo cifrado: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPlainJson = () => {
    const jsonStr = JSON.stringify(vaultData, null, 2);
    downloadFile(jsonStr, `devvault-export-plaintext.json`, 'application/json');
    setSuccess('JSON sin cifrar descargado.');
  };

  const handleFileUpload = (e) => {
    setError('');
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setImportFileContent(content);
      }
    };
    reader.readAsText(file);
  };

  const handleRestore = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!importFileContent) {
      setError('Por favor selecciona un archivo de respaldo (.devvault).');
      return;
    }

    if (!importPassword) {
      setError('Ingresa la contraseña del archivo de respaldo.');
      return;
    }

    setLoading(true);
    try {
      const restoredVault = await importEncryptedBackup(importFileContent, importPassword);
      onRestoreVaultData(restoredVault);
      setSuccess('¡Caja fuerte restaurada correctamente!');
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      setError(err.message || 'Contraseña incorrecta o archivo de respaldo no válido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Copias de Seguridad y Respaldos"
      maxWidth="max-w-xl"
      icon={HardDriveDownload}
    >
      <div className="space-y-5">
        
        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => { setActiveTab('export'); setError(''); setSuccess(''); }}
            className={`py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all ${
              activeTab === 'export'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Exportar Respaldo</span>
          </button>

          <button
            onClick={() => { setActiveTab('import'); setError(''); setSuccess(''); }}
            className={`py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all ${
              activeTab === 'import'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Restaurar Respaldo</span>
          </button>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {activeTab === 'export' ? (
          /* EXPORT TAB */
          <div className="space-y-5">
            {/* Encrypted Export Card */}
            <div className="p-4 bg-vault-900/90 rounded-2xl border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-100">
                    Respaldo Seguro Cifrado (.devvault)
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Cifra todos tus proyectos y claves con AES-256 para guardarlos en Google Drive, USB o migrar de equipo.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={useMasterPassword}
                    onChange={(e) => setUseMasterPassword(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>Usar mi Contraseña Maestra actual para cifrar el archivo</span>
                </label>

                {!useMasterPassword && (
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Contraseña personalizada para el respaldo:
                    </label>
                    <input
                      type="password"
                      value={backupPassword}
                      onChange={(e) => setBackupPassword(e.target.value)}
                      placeholder="Ingresa una contraseña..."
                      className="w-full px-3 py-2 bg-vault-950 border border-slate-700 rounded-xl text-xs text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleExportEncrypted}
                  disabled={loading}
                  className="w-full mt-2 py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Respaldo Cifrado</span>
                </button>
              </div>
            </div>

            {/* Plaintext Caution Option */}
            <div className="p-3.5 bg-vault-900/40 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-semibold text-xs text-slate-300">Exportar JSON sin cifrar</span>
                <p className="text-[11px] text-slate-500">Úsalo solo si necesitas migrar manualmente en local.</p>
              </div>
              <button
                type="button"
                onClick={handleExportPlainJson}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                Exportar JSON
              </button>
            </div>
          </div>
        ) : (
          /* IMPORT TAB */
          <form onSubmit={handleRestore} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Seleccionar archivo .devvault
              </label>
              
              <label className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 bg-vault-950/60 cursor-pointer transition-colors text-center">
                <Upload className="w-6 h-6 text-cyan-400" />
                <span className="text-xs font-semibold text-slate-200">
                  {fileName || 'Haz clic para seleccionar tu archivo de respaldo'}
                </span>
                <span className="text-[11px] text-slate-500">
                  Archivos compatibles: .devvault, .json cifrado
                </span>
                <input
                  type="file"
                  accept=".devvault,.json,.enc,text/plain"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {importFileContent && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Contraseña con la que se cifró el archivo
                </label>
                <input
                  type="password"
                  value={importPassword}
                  onChange={(e) => setImportPassword(e.target.value)}
                  placeholder="Contraseña del respaldo..."
                  className="w-full px-3.5 py-2.5 bg-vault-900 border border-slate-700 rounded-xl text-slate-100 font-mono text-xs focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !importFileContent || !importPassword}
              className="w-full py-3 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Descifrando y restaurando datos...
                </span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Restaurar Caja Fuerte</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </Modal>
  );
}
