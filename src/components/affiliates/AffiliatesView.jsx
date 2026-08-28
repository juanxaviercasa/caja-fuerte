import React, { useState } from 'react';
import { Plus, Copy, Trash2, Check, ExternalLink, Edit2, Link as LinkIcon, BarChart3, MessageSquareText, User, KeyRound, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AffiliatesView = ({ vaultData, onSaveSecret, onDeleteSecret }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  // Form State
  const [platform, setPlatform] = useState('');
  const [dashboardUrl, setDashboardUrl] = useState('');
  const [loginUser, setLoginUser] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [notes, setNotes] = useState('');
  const [links, setLinks] = useState([{ name: 'Link Principal', url: '' }]);

  // Filter secrets safely
  const affiliateSecrets = (vaultData?.secrets || []).filter(s => s.varName && s.varName.startsWith('AFFILIATE_LINK_'));

  const parsedAffiliates = affiliateSecrets.map(s => {
    let data;
    try {
      data = JSON.parse(s.value);
      if (!data.links) data = { dashboardUrl: '', loginUser: '', loginPassword: '', links: [{ name: 'Default', url: s.value }], notes: '' };
    } catch (e) {
      data = { dashboardUrl: '', loginUser: '', loginPassword: '', links: [{ name: 'Default', url: s.value }], notes: '' };
    }
    return {
      id: s.id,
      title: s.title || s.varName.replace('AFFILIATE_LINK_', ''),
      varName: s.varName,
      ...data
    };
  });

  const handleOpenModal = (affiliate = null) => {
    if (affiliate) {
      setEditingId(affiliate.id);
      setPlatform(affiliate.title);
      setDashboardUrl(affiliate.dashboardUrl || '');
      setLoginUser(affiliate.loginUser || '');
      setLoginPassword(affiliate.loginPassword || '');
      setNotes(affiliate.notes || '');
      setLinks(affiliate.links && affiliate.links.length > 0 ? affiliate.links : [{ name: 'Link Principal', url: '' }]);
    } else {
      setEditingId(null);
      setPlatform('');
      setDashboardUrl('');
      setLoginUser('');
      setLoginPassword('');
      setNotes('');
      setLinks([{ name: 'Link Principal', url: '' }]);
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!platform.trim()) return;

    const safeVarName = `AFFILIATE_LINK_${platform.trim().toUpperCase().replace(/[^A-Z0-9]/g, '_')}`;
    const valueObj = {
      dashboardUrl: dashboardUrl.trim(),
      loginUser: loginUser.trim(),
      loginPassword: loginPassword,
      notes: notes.trim(),
      links: links.filter(l => l.url.trim() !== '')
    };

    if (valueObj.links.length === 0) {
        valueObj.links.push({ name: 'Enlace', url: '' });
    }

    const payload = {
      id: editingId ? editingId : `sec_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      providerId: 'custom',
      title: platform.trim(),
      varName: safeVarName,
      value: JSON.stringify(valueObj),
      projectId: 'global-keys',
      environment: 'production',
      category: 'affiliate',
      type: 'custom',
      quotaInfo: '',
      notes: notes.trim(),
      updatedAt: new Date().toISOString(),
      createdAt: editingId ? undefined : new Date().toISOString()
    };

    onSaveSecret(payload);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta plataforma de afiliados?")) {
      onDeleteSecret(id);
    }
  };

  const handleCopy = (text, copyId) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(copyId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddLinkField = () => {
    setLinks([...links, { name: '', url: '' }]);
  };

  const handleUpdateLink = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const handleRemoveLinkField = (index) => {
    if (links.length === 1) return;
    setLinks(links.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full h-full pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
            Mini-Gestor de Afiliados
          </h1>
          <p className="text-slate-400 mt-2">
            Links, credenciales de acceso y paneles de control centralizados y encriptados.
          </p>
        </div>
        
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          <span>Añadir Plataforma</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {parsedAffiliates.length === 0 ? (
          <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-800 rounded-3xl bg-vault-900/30">
            <LinkIcon className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-300 mb-1">Sin plataformas afiliadas</h3>
            <p className="text-sm text-slate-500">Haz clic en el botón de arriba para registrar tu primera campaña y credenciales.</p>
          </div>
        ) : (
          parsedAffiliates.map((aff) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={aff.id} 
              className="bg-vault-900 border border-slate-700 p-6 rounded-3xl flex flex-col gap-5 relative group hover:border-amber-500/50 transition-colors shadow-lg"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-black text-xl text-slate-100">{aff.title}</h3>
                  {aff.dashboardUrl && (
                    <a href={aff.dashboardUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 mt-1 font-semibold transition-colors">
                      <BarChart3 className="w-3.5 h-3.5" /> Ir al Dashboard
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenModal(aff)} className="p-2 text-slate-400 hover:text-amber-400 bg-vault-950 rounded-lg transition-colors" title="Editar">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(aff.id)} className="p-2 text-slate-400 hover:text-red-400 bg-vault-950 rounded-lg transition-colors" title="Eliminar">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Credenciales de Acceso */}
              {(aff.loginUser || aff.loginPassword) && (
                <div className="bg-vault-950 rounded-xl border border-slate-800/80 p-3 space-y-2">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Acceso</h4>
                  
                  {aff.loginUser && (
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 overflow-hidden text-slate-300">
                        <User className="w-4 h-4 text-slate-500 shrink-0" />
                        <span className="text-sm truncate font-medium">{aff.loginUser}</span>
                      </div>
                      <button 
                        onClick={() => handleCopy(aff.loginUser, `user-${aff.id}`)}
                        className="p-1.5 text-slate-500 hover:text-amber-400 transition-colors shrink-0"
                        title="Copiar Usuario"
                      >
                        {copiedId === `user-${aff.id}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  )}

                  {aff.loginPassword && (
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 overflow-hidden text-slate-300">
                        <KeyRound className="w-4 h-4 text-slate-500 shrink-0" />
                        <span className="text-sm font-mono tracking-widest truncate">
                          {visiblePasswords[aff.id] ? aff.loginPassword : '••••••••••••'}
                        </span>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button 
                          onClick={() => togglePasswordVisibility(aff.id)}
                          className="p-1.5 text-slate-500 hover:text-amber-400 transition-colors"
                          title="Mostrar/Ocultar"
                        >
                          {visiblePasswords[aff.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={() => handleCopy(aff.loginPassword, `pass-${aff.id}`)}
                          className="p-1.5 text-slate-500 hover:text-amber-400 transition-colors"
                          title="Copiar Contraseña"
                        >
                          {copiedId === `pass-${aff.id}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Notes */}
              {aff.notes && (
                <div className="flex items-start gap-2 bg-slate-800/30 p-3 rounded-xl border border-slate-800/50">
                  <MessageSquareText className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{aff.notes}</p>
                </div>
              )}
              
              {/* Links List */}
              <div className="space-y-3 mt-2">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Enlaces de Referido</h4>
                {aff.links.map((link, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-2 bg-vault-950 p-2.5 rounded-xl border border-slate-800">
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <span className="text-xs font-bold text-slate-300 mb-0.5 px-1">{link.name || 'Enlace'}</span>
                      <span className="text-[11px] text-slate-500 truncate font-mono px-1">{link.url || 'Sin URL'}</span>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleCopy(link.url, `${aff.id}-${idx}`)}
                        className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                      >
                        {copiedId === `${aff.id}-${idx}` ? (
                          <><Check className="w-3.5 h-3.5 text-emerald-400" /> <span className="text-emerald-400">Copiado</span></>
                        ) : (
                          <><Copy className="w-3.5 h-3.5" /> Copiar</>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal Añadir / Editar */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-vault-900 border border-slate-700 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-vault-950/50">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <LinkIcon className="text-amber-500" />
                  {editingId ? 'Editar Plataforma Afiliada' : 'Nueva Plataforma Afiliada'}
                </h2>
              </div>
              
              <div className="p-6 overflow-y-auto space-y-6">
                
                {/* Datos Principales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      Plataforma *
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Make, Hostinger..."
                      className="w-full bg-vault-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500 transition-colors"
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      URL del Dashboard
                    </label>
                    <input
                      type="text"
                      placeholder="https://afiliados.com/login"
                      className="w-full bg-vault-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors"
                      value={dashboardUrl}
                      onChange={(e) => setDashboardUrl(e.target.value)}
                    />
                  </div>
                </div>

                {/* Credenciales */}
                <div className="bg-vault-950/50 p-4 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-500" />
                    Credenciales de Acceso (Encriptadas)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Usuario o Email"
                        className="w-full bg-vault-900 border border-slate-700 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-amber-500 transition-colors"
                        value={loginUser}
                        onChange={(e) => setLoginUser(e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        placeholder="Contraseña"
                        className="w-full bg-vault-900 border border-slate-700 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-amber-500 transition-colors"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                    Notas o Detalles (Comisiones, etc)
                  </label>
                  <textarea
                    placeholder="Ej: 20% de comisión recurrente mensual..."
                    rows={2}
                    className="w-full bg-vault-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500 transition-colors resize-none"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div className="h-px bg-slate-800 w-full my-4"></div>

                {/* Enlaces Múltiples */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-xs font-bold text-slate-400 uppercase">
                      Tus Enlaces de Referido
                    </label>
                    <button
                      onClick={handleAddLinkField}
                      className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-md"
                    >
                      <Plus className="w-3 h-3" /> Añadir Otro
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {links.map((link, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                        <input
                          type="text"
                          placeholder="Campaña (Ej. YouTube)"
                          className="w-full sm:w-1/3 bg-vault-950 border border-slate-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-amber-500 transition-colors"
                          value={link.name}
                          onChange={(e) => handleUpdateLink(idx, 'name', e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="https://..."
                          className="w-full flex-1 bg-vault-950 border border-slate-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-amber-500 transition-colors font-mono"
                          value={link.url}
                          onChange={(e) => handleUpdateLink(idx, 'url', e.target.value)}
                        />
                        {links.length > 1 && (
                          <button
                            onClick={() => handleRemoveLinkField(idx)}
                            className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors shrink-0"
                            title="Eliminar este link"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="p-6 border-t border-slate-800 bg-vault-950/50 flex gap-3 mt-auto">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 text-slate-400 font-bold hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={!platform.trim()}
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-amber-950 font-bold rounded-xl transition-colors"
                >
                  Guardar Plataforma
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AffiliatesView;
