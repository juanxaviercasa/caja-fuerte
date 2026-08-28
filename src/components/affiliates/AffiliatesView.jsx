import React, { useState } from 'react';
import { Link, Plus, Copy, Trash2, Check, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const AffiliatesView = ({ vaultData, onSaveSecret, onDeleteSecret }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPlatform, setNewPlatform] = useState('');
  const [newLink, setNewLink] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // Filtrar los secretos que son enlaces de afiliados
  const affiliateLinks = vaultData?.secrets
    ?.filter(s => s.key.startsWith('AFFILIATE_LINK_'))
    .map(s => ({
      id: s.id,
      key: s.key,
      platform: s.key.replace('AFFILIATE_LINK_', '').replace(/_/g, ' '),
      url: s.value
    })) || [];

  const handleSave = () => {
    if (!newPlatform.trim() || !newLink.trim()) return;
    
    // Normalizar la llave
    const safeKey = `AFFILIATE_LINK_${newPlatform.trim().toUpperCase().replace(/[^A-Z0-9]/g, '_')}`;
    
    onSaveSecret({
      key: safeKey,
      value: newLink.trim(),
      service: 'Affiliate',
      metadata: {}
    });
    
    setIsAddModalOpen(false);
    setNewPlatform('');
    setNewLink('');
  };

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
            Enlaces de Afiliados
          </h1>
          <p className="text-slate-400 mt-2">
            Guarda tus enlaces de referidos de forma segura para tenerlos siempre a mano.
          </p>
        </div>
        
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]"
        >
          <Plus className="w-5 h-5" />
          <span>Añadir Enlace</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {affiliateLinks.length === 0 ? (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-800 rounded-3xl bg-vault-900/30">
            <Link className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-300 mb-1">No tienes enlaces guardados</h3>
            <p className="text-sm text-slate-500">Agrega tu primer enlace de afiliado usando el botón de arriba.</p>
          </div>
        ) : (
          affiliateLinks.map((link) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={link.id} 
              className="bg-vault-900 border border-slate-800 p-5 rounded-2xl flex flex-col gap-4 relative group hover:border-amber-500/30 transition-colors"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-slate-200">{link.platform}</h3>
                <button 
                  onClick={() => onDeleteSecret(link.id)}
                  className="text-slate-600 hover:text-red-400 transition-colors"
                  title="Eliminar enlace"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="bg-vault-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-400 truncate" title={link.url}>
                {link.url}
              </div>

              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => handleCopy(link.url, link.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  {copiedId === link.id ? (
                    <><Check className="w-4 h-4 text-emerald-400" /> <span className="text-emerald-400">¡Copiado!</span></>
                  ) : (
                    <><Copy className="w-4 h-4" /> Copiar Link</>
                  )}
                </button>
                <a 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-lg transition-colors"
                  title="Abrir enlace"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-vault-900 border border-slate-700 rounded-3xl w-full max-w-md p-6 overflow-hidden shadow-2xl"
          >
            <h2 className="text-xl font-bold text-white mb-6">Nuevo Enlace de Afiliado</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Nombre de la Plataforma
                </label>
                <input
                  type="text"
                  placeholder="Ej. Hostinger, Make, Vapi..."
                  className="w-full bg-vault-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500 transition-colors"
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Enlace / URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  className="w-full bg-vault-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500 transition-colors"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="flex-1 py-3 text-slate-400 font-bold hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={!newPlatform.trim() || !newLink.trim()}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-amber-950 font-bold rounded-xl transition-colors"
              >
                Guardar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AffiliatesView;
