import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Eye, 
  EyeOff, 
  Wand2, 
  Trash2,
  Plus,
  FileText
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { PROVIDER_TEMPLATES, ENVIRONMENTS } from '../../data/providers';
import { generateSecurePassword } from '../../services/crypto';

function newEntry(varName = '', value = '') {
  return { id: `kv_${Date.now()}_${Math.random().toString(36).slice(2,6)}`, varName, value, showValue: false };
}

export function SecretModal({
  isOpen,
  onClose,
  onSave,
  editingSecret = null,
  initialProviderId = null,
  projects = [],
  activeProjectId = 'all',
  activeEnvironment = 'all',
  addToast
}) {
  
  // Modes
  const isProjectMode = activeProjectId !== 'all' && activeProjectId != null;

  // Form State
  const [selectedProviderId, setSelectedProviderId] = useState(initialProviderId || 'google-ai-studio');
  const [title, setTitle] = useState('');
  const [entries, setEntries] = useState([newEntry()]);
  const [projectId, setProjectId] = useState(activeProjectId !== 'all' ? activeProjectId : 'global-keys');
  const [environment, setEnvironment] = useState(activeEnvironment !== 'all' ? activeEnvironment : 'development');
  const [category, setCategory] = useState('ai');
  const [type, setType] = useState('api_key');
  const [quotaInfo, setQuotaInfo] = useState('');
  const [notes, setNotes] = useState('');
  const [bulkEnvText, setBulkEnvText] = useState('');
  const [showBulkPaste, setShowBulkPaste] = useState(false);

  // Apply templates
  const handleSelectProvider = (providerId) => {
    setSelectedProviderId(providerId);
    const tmpl = PROVIDER_TEMPLATES.find(p => p.id === providerId);
    if (tmpl) {
      setTitle(tmpl.name);
      setCategory(tmpl.category);
      setType(tmpl.type);
      setQuotaInfo(tmpl.quotaInfo || '');
      setEntries(prev => {
        const updated = [...prev];
        updated[0] = { ...updated[0], varName: tmpl.defaultVarName };
        return updated;
      });
    }
  };

  useEffect(() => {
    if (editingSecret) {
      setSelectedProviderId(editingSecret.providerId || 'custom-secret');
      setTitle(editingSecret.title || '');
      setEntries([newEntry(editingSecret.varName || editingSecret.key || '', editingSecret.value || '')]);
      setProjectId(editingSecret.projectId || 'global-keys');
      setEnvironment(editingSecret.environment || 'development');
      setCategory(editingSecret.category || 'ai');
      setType(editingSecret.type || 'api_key');
      setQuotaInfo(editingSecret.quotaInfo || '');
      setNotes(editingSecret.notes || '');
      setShowBulkPaste(false);
    } else {
      if (isProjectMode) {
        setSelectedProviderId('custom-secret');
        setTitle('Variables de Entorno');
        setCategory('custom');
        setType('api_key');
        setQuotaInfo('');
        setNotes('');
        setEntries([newEntry()]);
      } else {
        handleSelectProvider(initialProviderId || 'google-ai-studio');
        setEntries([newEntry()]);
        setNotes('');
      }
      
      if (activeProjectId && activeProjectId !== 'all') {
        setProjectId(activeProjectId);
      }
      if (activeEnvironment && activeEnvironment !== 'all') {
        setEnvironment(activeEnvironment);
      }
      setShowBulkPaste(false);
      setBulkEnvText('');
    }
  }, [editingSecret, initialProviderId, isOpen, activeProjectId, activeEnvironment, isProjectMode]);

  const activeTemplate = PROVIDER_TEMPLATES.find(p => p.id === selectedProviderId);

  // Entries
  const updateEntry = (id, field, val) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, [field]: val } : e));
  };
  const addEntry = () => setEntries(prev => [...prev, newEntry()]);
  const removeEntry = (id) => setEntries(prev => prev.filter(e => e.id !== id));
  
  const generateForEntry = (id) => {
    const gen = generateSecurePassword({ length: 32, symbols: true, numbers: true });
    updateEntry(id, 'value', gen);
    updateEntry(id, 'showValue', true);
  };

  // Smart Paste Event
  const handlePasteInVarName = (e, targetEntryId, index) => {
    const pasted = e.clipboardData.getData('Text');
    if (pasted && pasted.includes('=')) {
      e.preventDefault();
      const lines = pasted.split('\n');
      const newKVs = [];
      for (const line of lines) {
        const t = line.trim();
        if (!t || t.startsWith('#')) continue;
        const eq = t.indexOf('=');
        if (eq > 0) {
          const k = t.substring(0, eq).trim();
          let v = t.substring(eq + 1).trim();
          // Remove quotes if present
          if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
            v = v.substring(1, v.length - 1);
          }
          newKVs.push(newEntry(k, v));
        }
      }
      
      if (newKVs.length > 0) {
        setEntries(prev => {
          const copy = [...prev];
          copy.splice(index, 1, ...newKVs);
          return copy;
        });
        addToast(`${newKVs.length} variables auto-detectadas`, 'success');
      }
    }
  };

  const handleBulkPasteSubmit = () => {
    if (!bulkEnvText) return;
    const lines = bulkEnvText.split('\n');
    const newKVs = [];
    for (const line of lines) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const eq = t.indexOf('=');
      if (eq > 0) {
        const k = t.substring(0, eq).trim();
        let v = t.substring(eq + 1).trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
          v = v.substring(1, v.length - 1);
        }
        newKVs.push(newEntry(k, v));
      }
    }
    if (newKVs.length > 0) {
      setEntries(newKVs);
      setShowBulkPaste(false);
      addToast(`${newKVs.length} variables parseadas correctamente`, 'success');
    } else {
      addToast('No se detectaron variables válidas (formato KEY=VALUE)', 'error');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validEntries = entries.filter(en => en.varName.trim() && en.value.trim());
    if (validEntries.length === 0) {
      addToast('Debes proveer al menos una variable y su valor', 'error');
      return;
    }
    if (!isProjectMode && !title) {
      addToast('Falta el título', 'error');
      return;
    }

    const now = new Date().toISOString();

    if (editingSecret) {
      const en = validEntries[0];
      const secretPayload = {
        id: editingSecret.id,
        providerId: selectedProviderId,
        title: isProjectMode ? en.varName.trim().toUpperCase() : title.trim(),
        varName: en.varName.trim().toUpperCase().replace(/[^A-Za-z0-9_]/g, '_'),
        value: en.value.trim(),
        projectId: projectId || 'global-keys',
        environment: environment || 'development',
        category: category || 'custom',
        type: type || 'api_key',
        quotaInfo: quotaInfo.trim(),
        notes: notes.trim(),
        updatedAt: now,
        createdAt: editingSecret?.createdAt || now
      };
      onSave([secretPayload]);
    } else {
      const payloads = validEntries.map((en, idx) => ({
        id: `sec_${Date.now()}_${idx}_${Math.random().toString(36).slice(2, 7)}`,
        providerId: selectedProviderId,
        title: isProjectMode ? en.varName.trim().toUpperCase() : (validEntries.length === 1 ? title.trim() : `${title.trim()} — ${en.varName.trim() || (idx + 1)}`),
        varName: en.varName.trim().toUpperCase().replace(/[^A-Za-z0-9_]/g, '_'),
        value: en.value.trim(),
        projectId: projectId || 'global-keys',
        environment: environment || 'development',
        category: category || 'custom',
        type: type || 'api_key',
        quotaInfo: quotaInfo.trim(),
        notes: notes.trim(),
        updatedAt: now,
        createdAt: now
      }));
      onSave(payloads);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingSecret ? 'Editar Secreto' : (isProjectMode ? 'Añadir Variables al Proyecto' : 'Nuevo Secreto Global')}
      maxWidth="max-w-2xl"
      icon={Key}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Global Key Preset Selector (Hidden in Project Mode) */}
        {!isProjectMode && !editingSecret && (
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Plantilla / Proveedor de Servicio
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-40 overflow-y-auto p-1 bg-vault-950/70 rounded-xl border border-slate-800">
              {PROVIDER_TEMPLATES.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectProvider(p.id)}
                  className={`p-2 rounded-lg text-left text-xs transition-all flex flex-col justify-between cursor-pointer ${
                    selectedProviderId === p.id
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                      : 'bg-vault-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-base">{p.icon}</span>
                    <span className="font-semibold truncate">{p.name}</span>
                  </div>
                  <span className="text-[10px] opacity-60 truncate">{p.defaultVarName}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Global Mode Title Field */}
        {!isProjectMode && (
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Título Descriptivo
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. OpenAI Producción, Base de datos Test"
              className="w-full px-3.5 py-2.5 bg-vault-900 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
              required={!isProjectMode}
            />
          </div>
        )}

        {/* Project & Environment Configuration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800/50">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Proyecto Destino
            </label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-vault-950 border border-slate-700/80 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="global-keys">Sin Proyecto (Global)</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Entorno
            </label>
            <select
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-vault-950 border border-slate-700/80 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-emerald-500"
            >
              {ENVIRONMENTS.map(env => (
                <option key={env.id} value={env.id}>{env.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Dynamic Key-Value Pairs */}
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              {isProjectMode ? 'Variables de Entorno' : 'Claves Secretas'}
            </label>
            <div className="flex gap-2">
              {!editingSecret && !showBulkPaste && (
                <button
                  type="button"
                  onClick={() => setShowBulkPaste(true)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer font-semibold border border-cyan-500/30 px-2 py-1 rounded-lg hover:bg-cyan-500/10 transition-colors"
                >
                  <FileText className="w-3 h-3" />
                  <span>Pegar .env</span>
                </button>
              )}
              {!editingSecret && !showBulkPaste && (
                <button
                  type="button"
                  onClick={addEntry}
                  className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer font-semibold border border-emerald-500/30 px-2 py-1 rounded-lg hover:bg-emerald-500/10 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>Añadir Variable</span>
                </button>
              )}
            </div>
          </div>

          {showBulkPaste ? (
            <div className="rounded-xl border border-cyan-500/30 bg-vault-900/60 p-4 space-y-3">
              <p className="text-xs text-cyan-200 mb-2">Pega el contenido de tu archivo .env aquí:</p>
              <textarea
                value={bulkEnvText}
                onChange={e => setBulkEnvText(e.target.value)}
                rows={6}
                placeholder={"API_KEY=sk_test_123\nDB_URL=postgres://...\nPORT=8080"}
                className="w-full px-3 py-2 bg-vault-950 border border-slate-700/80 rounded-lg text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-500"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowBulkPaste(false)} className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 cursor-pointer">
                  Cancelar
                </button>
                <button type="button" onClick={handleBulkPasteSubmit} className="px-3 py-1.5 text-xs bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg cursor-pointer font-bold">
                  Procesar
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
              {entries.map((en, idx) => (
                <div key={en.id} className="rounded-xl border border-slate-700/60 bg-vault-900/60 p-2 sm:p-3 space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    {/* VarName */}
                    <div className="w-full sm:w-2/5">
                      <input
                        type="text"
                        value={en.varName}
                        onChange={(e) => updateEntry(en.id, 'varName', e.target.value)}
                        onPaste={(e) => handlePasteInVarName(e, en.id, idx)}
                        placeholder="KEY (ej. DB_HOST)"
                        className="w-full px-3 py-2 bg-vault-950 border border-slate-700/80 rounded-lg text-cyan-300 font-mono placeholder-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                        required={idx === 0}
                      />
                    </div>
                    {/* Value */}
                    <div className="w-full sm:w-3/5 flex gap-2 relative">
                      <div className="relative w-full">
                        <input
                          type={en.showValue ? 'text' : 'password'}
                          value={en.value}
                          onChange={(e) => updateEntry(en.id, 'value', e.target.value)}
                          placeholder="VALUE"
                          className="w-full pl-3 pr-16 py-2 bg-vault-950 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-600 font-mono text-xs focus:outline-none focus:border-emerald-500"
                          required={idx === 0}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center gap-0.5 pr-1.5">
                          <button
                            type="button"
                            title="Generar clave segura"
                            onClick={() => generateForEntry(en.id)}
                            className="p-1 text-indigo-400 hover:text-indigo-300 cursor-pointer"
                          >
                            <Wand2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => updateEntry(en.id, 'showValue', !en.showValue)}
                            className="p-1 text-slate-400 hover:text-slate-200 cursor-pointer"
                          >
                            {en.showValue ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                      {entries.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEntry(en.id)}
                          className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer shrink-0 p-2 border border-slate-700/50 bg-slate-800 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!editingSecret && !showBulkPaste && (
            <p className="text-[11px] text-slate-500 mt-1.5 ml-1">
              💡 Tip: Puedes pegar directamente un formato <code>KEY=VALUE</code> en el campo KEY para autocompletar múltiples variables.
            </p>
          )}
        </div>

        {/* Global Metadata (Hidden in Project Mode to keep it clean like Vercel) */}
        {!isProjectMode && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Tier / Límite / Cuota (Opcional)
              </label>
              <input
                type="text"
                value={quotaInfo}
                onChange={(e) => setQuotaInfo(e.target.value)}
                placeholder="Ej. Free Tier, $5 mensual"
                className="w-full px-3.5 py-2 bg-vault-900 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Notas Privadas (Opcional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej. Clave para webhook de pagos"
                className="w-full px-3.5 py-2 bg-vault-900 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
          >
            {editingSecret
              ? 'Guardar Cambios'
              : entries.filter(e => e.varName.trim() && e.value.trim()).length > 1
                ? `Cifrar y Guardar ${entries.filter(e => e.varName.trim() && e.value.trim()).length} Variables`
                : 'Cifrar y Guardar'}
          </button>
        </div>

      </form>
    </Modal>
  );
}
