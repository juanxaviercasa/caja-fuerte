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
  Globe
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { PROVIDER_TEMPLATES, ENVIRONMENTS, SECRET_TYPES } from '../../data/providers';
import { generateSecurePassword } from '../../services/crypto';

export function SecretModal({
  isOpen,
  onClose,
  onSave,
  editingSecret = null,
  initialProviderId = null,
  projects = [],
  activeProjectId = 'all'
}) {
  const [selectedProviderId, setSelectedProviderId] = useState(initialProviderId || 'google-ai-studio');
  const [title, setTitle] = useState('');
  const [varName, setVarName] = useState('');
  const [value, setValue] = useState('');
  const [showValue, setShowValue] = useState(false);
  const [projectId, setProjectId] = useState(activeProjectId !== 'all' ? activeProjectId : 'global-keys');
  const [environment, setEnvironment] = useState('development');
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
      setVarName(tmpl.defaultVarName);
      setCategory(tmpl.category);
      setType(tmpl.type);
      setQuotaInfo(tmpl.quotaInfo || '');
    }
  };

  // Populate when editing
  useEffect(() => {
    if (editingSecret) {
      setSelectedProviderId(editingSecret.providerId || 'custom-secret');
      setTitle(editingSecret.title || '');
      setVarName(editingSecret.varName || editingSecret.key || '');
      setValue(editingSecret.value || '');
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
    } else {
      // Default to Google AI Studio template
      handleSelectProvider('google-ai-studio');
      setValue('');
      setNotes('');
      if (activeProjectId && activeProjectId !== 'all') {
        setProjectId(activeProjectId);
      }
    }
  }, [editingSecret, initialProviderId, isOpen, activeProjectId]);

  const activeTemplate = PROVIDER_TEMPLATES.find(p => p.id === selectedProviderId);

  const handleGeneratePassword = () => {
    const gen = generateSecurePassword({ length: 32, symbols: true, numbers: true });
    setValue(gen);
    setShowValue(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !varName || !value) return;

    const secretPayload = {
      id: editingSecret ? editingSecret.id : `sec_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      providerId: selectedProviderId,
      title: title.trim(),
      varName: varName.trim().toUpperCase().replace(/[^A-Za-z0-9_]/g, '_'),
      value: value.trim(),
      projectId: projectId || 'global-keys',
      environment: environment || 'development',
      category: category || 'custom',
      type: type || 'api_key',
      quotaInfo: quotaInfo.trim(),
      notes: notes.trim(),
      updatedAt: new Date().toISOString(),
      createdAt: editingSecret?.createdAt || new Date().toISOString()
    };

    onSave(secretPayload);
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

        {/* Name & Environment Variable */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Título / Nombre
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Gemini API Key Personal"
              className="w-full px-3.5 py-2.5 bg-vault-900 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Nombre de Variable (.env)
            </label>
            <input
              type="text"
              value={varName}
              onChange={(e) => setVarName(e.target.value)}
              placeholder="Ej. GEMINI_API_KEY"
              className="w-full px-3.5 py-2.5 bg-vault-900 border border-slate-700/80 rounded-xl text-cyan-300 font-mono placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500"
              required
            />
          </div>
        </div>

        {/* Secret Value */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Valor del Secreto / Clave
            </label>
            <button
              type="button"
              onClick={handleGeneratePassword}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer font-medium"
            >
              <Wand2 className="w-3 h-3" />
              <span>Generar Seguro</span>
            </button>
          </div>
          
          <div className="relative">
            <input
              type={showValue ? 'text' : 'password'}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={activeTemplate?.placeholder || 'Pega tu clave, token o contraseña aquí...'}
              className="w-full pl-4 pr-12 py-3 bg-vault-900 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 font-mono text-sm focus:outline-none focus:border-emerald-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowValue(!showValue)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              {showValue ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
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
            {editingSecret ? 'Guardar Cambios' : 'Cifrar y Guardar Secreto'}
          </button>
        </div>

      </form>
    </Modal>
  );
}
