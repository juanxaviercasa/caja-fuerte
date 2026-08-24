import React, { useState, useEffect } from 'react';
import { Check, ExternalLink, Filter, Plus, Search, Sparkles, Tag, Copy, Activity, BrainCircuit, Calculator, Cloud, Cpu, CreditCard, Database, History, ImageIcon, Layers, Mail, MapPin, Rocket, ShieldAlert, ShieldCheck, UserCheck, Video, Volume2 } from 'lucide-react';
import { API_DICTIONARY, DICTIONARY_CATEGORIES, QUICK_TAGS } from '../../data/apiDictionary';

export function ApiEncyclopediaView({ onConnectApiToVault }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Reiniciar a la página 1 cuando los filtros cambien
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedTag]);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredApis = API_DICTIONARY.filter(item => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchTag = selectedTag === 'all' || (item.tags && item.tags.includes(selectedTag));
    
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchCat && matchTag;

    const matchSearch = 
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.useCase.toLowerCase().includes(query) ||
      item.defaultVarName.toLowerCase().includes(query) ||
      (item.badge && item.badge.toLowerCase().includes(query));

    return matchCat && matchTag && matchSearch;
  });

  const getCategoryIcon = (catId) => {
    switch (catId) {
      case 'ai-video-motion': return Video;
      case 'ai-image-art': return ImageIcon;
      case 'digital-humans-avatars': return UserCheck;
      case 'ai-voice-music': return Volume2;
      case 'cybersecurity-ethical': return ShieldAlert;
      case 'time-machine-science': return History;
      case 'ai-advanced-hidden': return Sparkles;
      case 'ai-llm': return BrainCircuit;
      case 'ai-search-scraping': return Search;
      case 'database-vector-graph': return Database;
      case 'ai-agents-memory': return Activity;
      case 'auth-security': return ShieldCheck;
      case 'email-messaging': return Mail;
      case 'payments-fintech': return CreditCard;
      case 'cloud-devops': return Cloud;
      case 'maps-geo-weather': return MapPin;
      case 'productivity-social': return Layers;
      case 'math-science-research': return Calculator;
      case 'robotics-hardware': return Cpu;
      case 'patents-aerospace': return Rocket;
      default: return Sparkles;
    }
  };

  const getCategoryName = (catId) => {
    const cat = DICTIONARY_CATEGORIES.find(c => c.id === catId);
    return cat ? cat.name : catId;
  };

  const getCategoryItemCount = (catId) => {
    if (catId === 'all') return API_DICTIONARY.length;
    return API_DICTIONARY.filter(item => item.category === catId).length;
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto animate-fadeIn">
      
      {/* 1. Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-vault-900 via-vault-900/90 to-purple-950/40 border border-purple-500/30 relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-purple-500/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 space-y-3 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="whitespace-normal text-center sm:text-left">ENCICLOPEDIA TOTAL: 357+ APIS Y MODELOS CLOUD</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-100 tracking-tight">
            Directorio Universal: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">IA, Finanzas, Cloud, Robótica & OSINT</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Catálogo completo con <strong>357 APIs de grado élite</strong> listas para integrarse: Inteligencia Artificial (Claude 3.5, FLUX, OpenAI), Finanzas y Web3 (Stripe, Etherscan, Alpaca), E-commerce y Marketing (Shopify, HubSpot), Infraestructura Cloud (AWS, Docker, Cloudflare), Ciberseguridad (Shodan, VirusTotal) y Robótica Avanzada. Todo organizado y curado para construir imperios de software automatizados.
          </p>
        </div>
      </div>

      {/* 2. Search & Controls */}
      <div className="space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Buscar por nombre (ej. Kling, FLUX, Shodan, Gemini, ElevenLabs, HeyGen), variable o caso de uso..."
            className="w-full pl-12 pr-10 py-3.5 bg-vault-900 border border-slate-700/90 rounded-2xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono shadow-inner transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-sm text-slate-400 hover:text-slate-100"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Filter Tags */}
        <div className="mb-4">
          {/* Mobile Dropdown */}
          <div className="md:hidden flex flex-col gap-1.5">
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase font-mono px-1">
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              <span>Etiqueta:</span>
            </div>
            <select
              value={selectedTag}
              onChange={(e) => {
                setSelectedTag(e.target.value);
                if (e.target.value !== 'all') setSelectedCategory('all');
              }}
              className="w-full bg-vault-900 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 appearance-none"
            >
              {QUICK_TAGS.map(tag => (
                <option key={tag.id} value={tag.id}>{tag.label}</option>
              ))}
            </select>
          </div>

          {/* Desktop Pills */}
          <div className="hidden md:flex flex-wrap items-center gap-2 pb-1">
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase font-mono px-2 shrink-0">
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              <span>Etiquetas:</span>
            </div>
            {QUICK_TAGS.map(tag => (
              <button
                key={tag.id}
                type="button"
                onClick={() => {
                  setSelectedTag(tag.id);
                  if (tag.id !== 'all') setSelectedCategory('all');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  selectedTag === tag.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-950/50'
                    : 'bg-vault-900 border border-slate-800 text-slate-300 hover:text-slate-100 hover:bg-slate-800'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Multi-row Grid */}
        <div className="p-4 bg-vault-900/90 rounded-3xl border border-slate-800 space-y-3">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
                Categorías Especializadas:
              </span>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Mostrando <strong className="text-cyan-300">{filteredApis.length}</strong> de <strong className="text-slate-200">{API_DICTIONARY.length}</strong> APIs
            </div>
          </div>

          {/* Clean Multi-Row Category Pills Grid */}
          <div className="flex flex-wrap gap-2 pt-1">
            {DICTIONARY_CATEGORIES.map(cat => {
              const Icon = getCategoryIcon(cat.id);
              const isSelected = selectedCategory === cat.id && selectedTag === 'all';
              const count = getCategoryItemCount(cat.id);

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedTag('all');
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/50 scale-[1.02] ring-2 ring-cyan-400/50'
                      : 'bg-vault-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950 stroke-[2.5]' : cat.color || 'text-slate-400'}`} />
                  <span>{cat.name}</span>
                  <span className={`text-[10px] font-mono font-extrabold px-2 py-0.2 rounded-full ${
                    isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-850 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

      </div>

      {/* 3. APIs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {(() => {
          const ITEMS_PER_PAGE = 12;
          const totalPages = Math.ceil(filteredApis.length / ITEMS_PER_PAGE) || 1;
          const paginated = filteredApis.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
          
          return (
            <>
              {paginated.map(api => (
            <div
              key={api.id}
              className="p-5 bg-vault-900/90 rounded-3xl border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-4 shadow-lg hover:shadow-cyan-950/30 group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-black text-sm">
                      {api.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 text-base">{api.name}</h4>
                      <span className="text-xs text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                        {getCategoryIcon(api.category) && React.createElement(getCategoryIcon(api.category), { className: 'w-3 h-3' })}
                        {getCategoryName(api.category)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(api.id, api.defaultVarName)}
                    className="p-2 rounded-xl bg-vault-950 text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-slate-800 shrink-0 transition-colors cursor-pointer"
                    title="Copiar nombre de variable .env"
                  >
                    {copiedId === api.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Recommended Variable Name */}
              <div className="p-2 rounded-xl bg-vault-950 border border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono uppercase font-bold">Variable .env:</span>
                <span className="font-mono text-xs font-bold text-cyan-400">
                  {api.defaultVarName}
                </span>
              </div>

              {/* ¿De qué trata? */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  ¿De qué trata?
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {api.description}
                </p>
              </div>

              {/* ¿Para qué sirve en tus proyectos? */}
              <div className="p-3 rounded-2xl bg-vault-950/80 border border-slate-800/90 space-y-1">
                <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5 font-mono">
                  <span>💡</span>
                  <span>¿Para qué te sirve?</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {api.useCase}
                </p>
              </div>

              {/* Free Tier Info Badge */}
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2">
                <span className="text-base shrink-0">🎁</span>
                <div className="leading-snug">
                  <span className="font-bold block text-[11px] uppercase tracking-wider font-mono">Cuota Gratuita:</span>
                  <span className="text-[11px]">{api.freeTier}</span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mt-auto">
                {api.consoleUrl && (
                  <a
                    href={api.consoleUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-cyan-300 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-slate-700/60"
                  >
                    <span>Obtener Clave</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => onConnectApiToVault(api)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-emerald-950/50 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Guardar en Bóveda</span>
                </button>
              </div>
            </div>
          ))}

              {/* Controles de Paginación */}
              {totalPages > 1 && (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center justify-center gap-4 mt-8 pt-4 border-t border-slate-800/50">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-xl bg-vault-900 border border-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    Anterior
                  </button>
                  <span className="text-xs text-slate-400 font-mono font-semibold">
                    Página <strong className="text-cyan-400">{currentPage}</strong> de {totalPages}
                  </span>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-xl bg-vault-900 border border-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          );
        })()}
      </div>

      {filteredApis.length === 0 && (
        <div className="text-center py-16 space-y-3 bg-vault-900/50 rounded-3xl border border-slate-800">
          <p className="text-slate-400 text-sm">No se encontraron APIs que coincidan con "{searchQuery}".</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedTag('all'); }}
            className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-xl font-bold text-xs hover:bg-cyan-500/30"
          >
            Ver todas las 220+ APIs
          </button>
        </div>
      )}

    </div>
  );
}







