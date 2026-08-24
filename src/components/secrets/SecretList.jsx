import React, { useState } from 'react';
import { 
  LayoutGrid, 
  List, 
  ArrowUpDown, 
  Plus, 
  FileCode, 
  Sparkles, 
  SearchX, 
  BrainCircuit, 
  Zap, 
  Bot, 
  Database,
  Star
} from 'lucide-react';
import { SecretCard } from './SecretCard';
import { PROVIDER_TEMPLATES } from '../../data/providers';

export function SecretList({
  secrets = [],
  projects = [],
  activeProject,
  activeEnvironment,
  activeCategory,
  searchQuery,
  onOpenNewSecret,
  onOpenEnvStudio,
  onEditSecret,
  onDeleteSecret,
  onQuickViewSecret,
  onTestApiSecret,
  onCopySecret,
  onSelectProviderPreset,
  onToggleFavorite,
  onOpenSdk
}) {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('updated');

  const projectMap = projects.reduce((acc, p) => {
    acc[p.id] = p.name;
    return acc;
  }, {});

  // Filter secrets
  const filteredSecrets = secrets.filter(sec => {
    const matchesProject = !activeProject || activeProject.id === 'all' 
      ? true 
      : (sec.projectId === activeProject.id || sec.projectId === 'global-keys');

    const matchesEnv = activeEnvironment === 'all' 
      ? true 
      : sec.environment === activeEnvironment;

    const matchesCat = activeCategory === 'all' 
      ? true 
      : sec.category === activeCategory;

    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q ? true : (
      (sec.title && sec.title.toLowerCase().includes(q)) ||
      (sec.varName && sec.varName.toLowerCase().includes(q)) ||
      (sec.notes && sec.notes.toLowerCase().includes(q)) ||
      (sec.category && sec.category.toLowerCase().includes(q)) ||
      (sec.providerId && sec.providerId.toLowerCase().includes(q))
    );

    return matchesProject && matchesEnv && matchesCat && matchesQuery;
  });

  // Split into favorites and others
  const favoriteSecrets = filteredSecrets.filter(s => Boolean(s.isFavorite));
  const otherSecrets = filteredSecrets.filter(s => !s.isFavorite);

  // Sort helper
  const sortList = (list) => {
    return [...list].sort((a, b) => {
      if (sortBy === 'name') {
        return (a.title || '').localeCompare(b.title || '');
      }
      if (sortBy === 'provider') {
        return (a.providerId || '').localeCompare(b.providerId || '');
      }
      return new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0);
    });
  };

  const sortedFavorites = sortList(favoriteSecrets);
  const sortedOthers = sortList(otherSecrets);
  const totalCount = filteredSecrets.length;

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
      
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span>{activeProject?.name || 'Todos los Secretos'}</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              {totalCount} {totalCount === 1 ? 'clave' : 'claves'}
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {activeProject?.description || 'Gestiona y exporta tus credenciales con cifrado seguro.'}
          </p>
        </div>

        {/* View & Sort Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 bg-vault-900/80 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="updated" className="bg-vault-900">Más recientes</option>
              <option value="name" className="bg-vault-900">Nombre (A-Z)</option>
              <option value="provider" className="bg-vault-900">Proveedor</option>
            </select>
          </div>

          <div className="flex items-center bg-vault-900/80 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Vista en Cuadrícula"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Vista en Lista / Tabla"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {totalCount > 0 ? (
        <div className="space-y-8">
          
          {/* FAVORITES / PINNED SECTION */}
          {sortedFavorites.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 px-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                  Secretos Fijados & Favoritos ({sortedFavorites.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedFavorites.map(secret => (
                  <SecretCard
                    key={secret.id}
                    secret={secret}
                    projectName={projectMap[secret.projectId]}
                    onEdit={onEditSecret}
                    onDelete={onDeleteSecret}
                    onQuickView={onQuickViewSecret}
                    onTestApi={onTestApiSecret}
                    onCopy={onCopySecret}
                    onToggleFavorite={onToggleFavorite}
                    onOpenSdk={onOpenSdk}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ALL / OTHER SECRETS */}
          <div>
            {sortedFavorites.length > 0 && (
              <div className="flex items-center gap-2 mb-3 px-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Todos los Secretos ({sortedOthers.length})
                </h3>
              </div>
            )}

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedOthers.map(secret => (
                  <SecretCard
                    key={secret.id}
                    secret={secret}
                    projectName={projectMap[secret.projectId]}
                    onEdit={onEditSecret}
                    onDelete={onDeleteSecret}
                    onQuickView={onQuickViewSecret}
                    onTestApi={onTestApiSecret}
                    onCopy={onCopySecret}
                    onToggleFavorite={onToggleFavorite}
                    onOpenSdk={onOpenSdk}
                  />
                ))}
              </div>
            ) : (
              /* Table View */
              <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-vault-900 text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="px-4 py-3">Nombre / Servicio</th>
                        <th className="px-4 py-3">Variable (.env)</th>
                        <th className="px-4 py-3">Proyecto</th>
                        <th className="px-4 py-3">Entorno</th>
                        <th className="px-4 py-3">Valor Cifrado</th>
                        <th className="px-4 py-3 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
                      {filteredSecrets.map(secret => (
                        <tr key={secret.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-4 py-3 font-semibold text-slate-100 flex items-center gap-2">
                            <button
                              onClick={() => onToggleFavorite(secret.id)}
                              className="text-slate-600 hover:text-amber-400"
                            >
                              <Star className={`w-3.5 h-3.5 ${secret.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                            </button>
                            <span>{secret.title}</span>
                          </td>
                          <td className="px-4 py-3 font-mono text-cyan-300">
                            {secret.varName}
                          </td>
                          <td className="px-4 py-3 text-slate-400">
                            {projectMap[secret.projectId] || 'Global'}
                          </td>
                          <td className="px-4 py-3">
                            <span className="capitalize">{secret.environment}</span>
                          </td>
                          <td className="px-4 py-3 font-mono text-slate-500 select-none">
                            ••••••••••••
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => onCopySecret(secret.varName, secret.value)}
                                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs"
                              >
                                Copiar
                              </button>
                              <button
                                onClick={() => onEditSecret(secret)}
                                className="p-1 text-slate-400 hover:text-slate-200 rounded-lg"
                              >
                                Editar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

        </div>
      ) : (
        /* Empty State */
        <div className="glass-panel rounded-3xl border border-slate-800/80 p-8 sm:p-12 text-center max-w-2xl mx-auto my-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 mb-4">
            {searchQuery ? <SearchX className="w-8 h-8 text-rose-400" /> : <Sparkles className="w-8 h-8 text-emerald-400" />}
          </div>

          <h3 className="text-lg font-bold text-slate-100">
            {searchQuery ? 'No se encontraron claves coincidentes' : 'No hay secretos en este espacio'}
          </h3>
          <p className="text-sm text-slate-400 mt-1.5 max-w-md mx-auto">
            {searchQuery
              ? `No hay resultados para "${searchQuery}". Intenta con otro término o limpia la búsqueda.`
              : 'Comienza guardando tus API Keys de IA gratuitas, tokens o importa tu archivo .env directamente.'}
          </p>

          {!searchQuery && (
            <div className="mt-8">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                Añadir Clave Rápida de IA
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => onSelectProviderPreset('google-ai-studio')}
                  className="p-3.5 rounded-xl bg-vault-900/90 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/80 text-left transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-xs text-slate-200">Google Gemini</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block">AI Studio Free Tier</span>
                </button>

                <button
                  onClick={() => onSelectProviderPreset('groq')}
                  className="p-3.5 rounded-xl bg-vault-900/90 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-800/80 text-left transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Zap className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-xs text-slate-200">Groq Cloud</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block">Llama 3 / Mixtral</span>
                </button>

                <button
                  onClick={() => onSelectProviderPreset('huggingface')}
                  className="p-3.5 rounded-xl bg-vault-900/90 border border-slate-800 hover:border-yellow-500/40 hover:bg-slate-800/80 text-left transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Bot className="w-4 h-4 text-yellow-400 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-xs text-slate-200">Hugging Face</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block">User Access Tokens</span>
                </button>
              </div>

              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  onClick={onOpenNewSecret}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Crear Clave Personalizada</span>
                </button>

                <button
                  onClick={onOpenEnvStudio}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-2 border border-slate-700 transition-all cursor-pointer"
                >
                  <FileCode className="w-4 h-4 text-cyan-400" />
                  <span>Importar .env</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
