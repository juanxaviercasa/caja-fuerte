import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Eye, 
  EyeOff, 
  Wand2, 
  ExternalLink, 
  Sparkles, 
  FolderKanban, 
  Layers, 
  FileText,
  Zap,
  Bot,
  BrainCircuit,
  Database,
  Cloud,
  Lock,
  Globe,
  Plus,
  Trash2
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { PROVIDER_TEMPLATES, ENVIRONMENTS, SECRET_TYPES } from '../../data/providers';
import { generateSecurePassword } from '../../services/crypto';

// Helper to create a blank key-value entry
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
    activeEnvironment = 'all'
}) {
  const [selectedProviderId, setSelectedProviderId] = useState(initialProviderId || 'google-ai-studio');
  const [title, setTitle] = useState('');
  // Multi-key entries: each has { id, varName, value, showValue }
  const [entries, setEntries] = useState([newEntry()]);
  const [projectId, setProjectId] = useState(activeProjectId !== 'all' ? activeProjectId : 'global-keys');
  const [environment, setEnvironment] = useState(activeEnvironment !== 'all' ? activeEnvironment : 'development');
  const [category, setCategory] = useState('ai');
  const [type, setType] = useState('api_key');
  const [quotaInfo, setQuotaInfo] = useState('');
  const [notes, setNotes] = useState('');

  // Handle preset provider selection
  const handleSelectProvider = (providerId) => {
    setSelectedProviderId(providerId);
    const tmpl = PROVIDER_TEMPLATES.find(p => p.id === providerId);
    if (tmpl) {
      setTitle(tmpl.name);
      setCategory(tmpl.category);
      setType(tmpl.type);
      setQuotaInfo(tmpl.quotaInfo || '');
      // Set first entry's varName from template
      setEntries(prev => {
        const updated = [...prev];
        updated[0] = { ...updated[0], varName: tmpl.defaultVarName };
        return updated;
      });
    }
  };

  // Populate when editing (editing mode = single entry)
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
    } else if (initialProviderId) {
      handleSelectProvider(initialProviderId);
      if (activeProjectId && activeProjectId !== 'all') {
          setProjectId(activeProjectId);
        }
        if (activeEnvironment && activeEnvironment !== 'all') {
          setEnvironment(activeEnvironment);
        }
    } else {
      // Reset for new
      handleSelectProvider('google-ai-studio');
      setEntries([newEntry()]);
      setNotes('');
      if (activeProjectId && activeProjectId !== 'all') {
          setProjectId(activeProjectId);
        }
        if (activeEnvironment && activeEnvironment !== 'all') {
          setEnvironment(activeEnvironment);
        }
    }
  }, [editingSecret, initialProviderId, isOpen, activeProjectId]);

  const activeTemplate = PROVIDER_TEMPLATES.find(p => p.id === selectedProviderId);

  // Entry management
  const updateEntry = (id, field, val) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, [field]: val } : e));
  };

  const addEntry = () => {
    setEntries(prev => [...prev, newEntry()]);
  };

  const removeEntry = (id) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const generateForEntry = (id) => {
    const gen = generateSecurePassword({ length: 32, symbols: true, numbers: true });
    updateEntry(id, 'value', gen);
    updateEntry(id, 'showValue', true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validEntries = entries.filter(en => en.varName.trim() && en.value.trim());
    if (!title || validEntries.length === 0) return;

    const now = new Date().toISOString();

    if (editingSecret) {
      // Editing = update single secret
      const en = validEntries[0];
      const secretPayload = {
        id: editingSecret.id,
        providerId: selectedProviderId,
        title: title.trim(),
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
      // Pass as array for consistency
      onSave([secretPayload]);
    } else {
      // Creating: build array of payloads
      const payloads = validEntries.map((en, idx) => ({
        id: `sec_${Date.now()}_${idx}_${Math.random().toString(36).slice(2, 7)}`,
        providerId: selectedProviderId,
        title: validEntries.length === 1 ? title.trim() : `${title.trim()} — ${en.varName.trim() || (idx + 1)}`,
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
      title={editingSecret ? 'Editar Secreto' : 'Nuevo Secreto / Clave'}
      maxWidth="max-w-2xl"
      icon={Key}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Provider Quick Presets (Only when creating new) */}
        {!editingSecret && (
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
                  <span className="font-semibold truncate">{p.name}</span>
                  <span className="text-[10px] opacity-70 truncate font-mono">{p.defaultVarName}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Provider Info Banner & Direct Link */}
        {activeTemplate && activeTemplate.consoleUrl && (
          <div className="p-3 rounded-xl bg-vault-900/80 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <div>
              <span className="font-semibold text-emerald-400">{activeTemplate.name}: </span>
              <span className="text-slate-400">{activeTemplate.description}</span>
            </div>
            <a
              href={activeTemplate.consoleUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold shrink-0 ml-3 underline underline-offset-2"
            >
              <span>Obtener Clave</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* Group Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Título del Grupo / Servicio
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej. Notion, Gemini Pro, Supabase..."
            className="w-full px-3.5 py-2.5 bg-vault-900 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
            required
          />
        </div>

        {/* ── Multi-Key Entries ── */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Variables / Claves Secretas
            </label>
            {!editingSecret && (
              <button
                type="button"
                onClick={addEntry}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer font-semibold border border-emerald-500/30 px-2 py-1 rounded-lg hover:bg-emerald-500/10 transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Agregar otra clave</span>
              </button>
            )}
          </div>

          <div className="space-y-3">
            {entries.map((en, idx) => (
              <div key={en.id} className="rounded-xl border border-slate-700/60 bg-vault-900/60 p-3 space-y-2">
                {entries.length > 1 && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Clave #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeEntry(en.id)}
                      className="text-slate-600 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <div className="grid grid-cols-5 gap-2">
                  {/* VarName */}
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={en.varName}
                      onChange={(e) => updateEntry(en.id, 'varName', e.target.value)}
                      placeholder="NOMBRE_VARIABLE"
                      className="w-full px-3 py-2.5 bg-vault-950 border border-slate-700/80 rounded-lg text-cyan-300 font-mono placeholder-slate-600 text-xs focus:outline-none focus:border-cyan-500"
                      required={idx === 0}
                    />
                  </div>
                  {/* Value */}
                  <div className="col-span-3 relative">
                    <input
                      type={en.showValue ? 'text' : 'password'}
                      value={en.value}
                      onChange={(e) => updateEntry(en.id, 'value', e.target.value)}
                      placeholder={activeTemplate?.placeholder || 'Pega tu clave aquí...'}
                      className="w-full pl-3 pr-16 py-2.5 bg-vault-950 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-600 font-mono text-xs focus:outline-none focus:border-emerald-500"
                      required={idx === 0}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center gap-0.5 pr-1.5">
                      <button
                        type="button"
                        title="Generar clave segura"
                        onClick={() => generateForEntry(en.id)}
                        className="p-1 text-indigo-400 hover:text-indigo-300 cursor-pointer"
                      >
                        <Wand2 className="w-3 h-3" />
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
                </div>
              </div>
            ))}
          </div>

          {!editingSecret && entries.length === 1 && (
            <p className="text-[11px] text-slate-500 mt-1.5">
              💡 ¿Tienes varias claves del mismo servicio? Usa <strong className="text-slate-400">Agregar otra clave</strong> para guardarlas todas juntas.
            </p>
          )}
        </div>

        {/* Project & Environment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Proyecto Asignado
            </label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-vault-900 border border-slate-700/80 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-emerald-500"
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
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
              className="w-full px-3.5 py-2.5 bg-vault-900 border border-slate-700/80 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-emerald-500"
            >
              {ENVIRONMENTS.map(env => (
                <option key={env.id} value={env.id}>
                  {env.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quota / Rate Limit & Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Tier / Límites / Cuota
            </label>
            <input
              type="text"
              value={quotaInfo}
              onChange={(e) => setQuotaInfo(e.target.value)}
              placeholder="Ej. Free Tier (15 RPM), $5 crédito mensual"
              className="w-full px-3.5 py-2.5 bg-vault-900 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Notas Privadas / Recordatorio
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej. Clave creada para el bot de WhatsApp"
              className="w-full px-3.5 py-2.5 bg-vault-900 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
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
                ? `Cifrar y Guardar ${entries.filter(e => e.varName.trim() && e.value.trim()).length} Claves`
                : 'Cifrar y Guardar Secreto'}
          </button>
        </div>

      </form>
    </Modal>
  );
}
