import React, { useState } from 'react';
import { FolderKanban, Plus, Edit2, Trash2, Check, Sparkles, Globe, Shield } from 'lucide-react';
import { Modal } from '../common/Modal';

const PROJECT_COLORS = [
  '#10b981', // emerald
  '#06b6d4', // cyan
  '#6366f1', // indigo
  '#f59e0b', // amber
  '#ec4899', // pink
  '#8b5cf6', // purple
  '#3b82f6', // blue
  '#ef4444'  // red
];

export function ProjectManagerModal({
  isOpen,
  onClose,
  projects = [],
  secrets = [],
  onSaveProject,
  onDeleteProject
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#10b981');

  const startCreate = () => {
    setName('');
    setDescription('');
    setColor(PROJECT_COLORS[Math.floor(Math.random() * PROJECT_COLORS.length)]);
    setEditingId(null);
    setIsCreating(true);
  };

  const startEdit = (proj) => {
    setEditingId(proj.id);
    setName(proj.name);
    setDescription(proj.description || '');
    setColor(proj.color || '#10b981');
    setIsCreating(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const projectData = {
      id: editingId || `proj_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      name: name.trim(),
      description: description.trim(),
      color,
      createdAt: editingId ? undefined : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSaveProject(projectData);
    setIsCreating(false);
    setEditingId(null);
  };

  const getSecretCount = (projId) => {
    return secrets.filter(s => s.projectId === projId).length;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Administrador de Proyectos"
      maxWidth="max-w-xl"
      icon={FolderKanban}
    >
      <div className="space-y-6">
        
        {/* Top Header / Action */}
        {!isCreating && (
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Organiza tus API keys y variables de entorno separadas por proyecto.
            </p>
            <button
              onClick={startCreate}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Proyecto</span>
            </button>
          </div>
        )}

        {/* Create / Edit Form */}
        {isCreating ? (
          <form onSubmit={handleSave} className="p-4 bg-vault-900/90 rounded-2xl border border-slate-700/80 space-y-4">
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-emerald-400" />
              <span>{editingId ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}</span>
            </h4>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Nombre del Proyecto
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Generador de Libros IA, SaaS WhatsApp..."
                className="w-full px-3.5 py-2 bg-vault-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Descripción (Opcional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej. Proyecto de backend con Gemini Flash y Supabase..."
                className="w-full px-3.5 py-2 bg-vault-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Color Distintivo
              </label>
              <div className="flex items-center gap-2">
                {PROJECT_COLORS.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                      color === c ? 'scale-125 ring-2 ring-white' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => { setIsCreating(false); setEditingId(null); }}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl shadow cursor-pointer"
              >
                {editingId ? 'Actualizar Proyecto' : 'Guardar Proyecto'}
              </button>
            </div>
          </form>
        ) : (
          /* Project List */
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {projects.map(proj => {
              const count = getSecretCount(proj.id);
              const isDefaultGlobal = proj.id === 'global-keys';

              return (
                <div
                  key={proj.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-vault-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3.5 h-3.5 rounded-full shrink-0"
                      style={{ backgroundColor: proj.color || '#10b981' }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-slate-200">{proj.name}</span>
                        {isDefaultGlobal && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                            Principal
                          </span>
                        )}
                      </div>
                      {proj.description && (
                        <p className="text-[11px] text-slate-400">{proj.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300">
                      {count} {count === 1 ? 'secreto' : 'secretos'}
                    </span>
                    
                    {!isDefaultGlobal && (
                      <>
                        <button
                          onClick={() => startEdit(proj)}
                          className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                          title="Editar nombre/color"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteProject(proj.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                          title="Eliminar proyecto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </Modal>
  );
}
