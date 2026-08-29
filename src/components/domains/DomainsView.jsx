import React, { useState } from 'react';
import { Plus, Copy, Trash2, Check, ExternalLink, Edit2, Globe, GitBranch, Server, MessageSquareText, User, KeyRound, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DomainsView = ({ vaultData, onSaveSecret, onDeleteSecret }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  // Form State
  const [projectName, setProjectName] = useState('');
  const [domainUrl, setDomainUrl] = useState('');
  const [githubRepo, setGitBranchRepo] = useState('');
  const [vercelPanel, setVercelPanel] = useState('');
  const [loginUser, setLoginUser] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [notes, setNotes] = useState('');

  // Filter secrets safely
  const domainSecrets = (vaultData?.secrets || []).filter(s => s.varName && s.varName.startsWith('SERVERLESS_DOMAIN_'));

  const parsedDomains = domainSecrets.map(s => {
    let data;
    try {
      data = JSON.parse(s.value);
    } catch (e) {
      data = { domainUrl: s.value, githubRepo: '', vercelPanel: '', loginUser: '', loginPassword: '', notes: '' };
    }
    return {
      id: s.id,
      title: s.title || s.varName.replace('SERVERLESS_DOMAIN_', ''),
      varName: s.varName,
      ...data
    };
  });

  const handleOpenModal = (domain = null) => {
    if (domain) {
      setEditingId(domain.id);
      setProjectName(domain.title);
      setDomainUrl(domain.domainUrl || '');
      setGitBranchRepo(domain.githubRepo || '');
      setVercelPanel(domain.vercelPanel || '');
      setLoginUser(domain.loginUser || '');
      setLoginPassword(domain.loginPassword || '');
      setNotes(domain.notes || '');
    } else {
      setEditingId(null);
      setProjectName('');
      setDomainUrl('');
      setGitBranchRepo('');
      setVercelPanel('');
      setLoginUser('');
      setLoginPassword('');
      setNotes('');
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!projectName.trim()) return;

    const safeVarName = `SERVERLESS_DOMAIN_${projectName.trim().toUpperCase().replace(/[^A-Z0-9]/g, '_')}`;
    const valueObj = {
      domainUrl: domainUrl.trim(),
      githubRepo: githubRepo.trim(),
      vercelPanel: vercelPanel.trim(),
      loginUser: loginUser.trim(),
      loginPassword: loginPassword,
      notes: notes.trim(),
    };

    const payload = {
      id: editingId ? editingId : `sec_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      providerId: 'custom',
      title: projectName.trim(),
      varName: safeVarName,
      value: JSON.stringify(valueObj),
      projectId: 'global-keys',
      environment: 'production',
      category: 'serverless',
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
    if (window.confirm("¿Seguro que deseas eliminar este dominio de tu infraestructura?")) {
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

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full h-full pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
            Centro Serverless
          </h1>
          <p className="text-slate-400 mt-2">
            Control maestro de tus dominios, repositorios y proyectos desplegados en la nube.
          </p>
        </div>
        
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-blue-950 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)] whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          <span>Añadir Proyecto</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {parsedDomains.length === 0 ? (
          <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-800 rounded-3xl bg-vault-900/30">
            <Globe className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-300 mb-1">Sin proyectos Serverless</h3>
            <p className="text-sm text-slate-500">Añade tu primer dominio o repositorio usando el botón de arriba.</p>
          </div>
        ) : (
          parsedDomains.map((dom) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={dom.id} 
              className="bg-vault-900 border border-slate-700 p-6 rounded-3xl flex flex-col gap-5 relative group hover:border-blue-500/50 transition-colors shadow-lg"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0 pr-4">
                  <h3 className="font-black text-xl text-slate-100 truncate" title={dom.title}>{dom.title}</h3>
                  {dom.domainUrl && (
                    <a href={dom.domainUrl.startsWith('http') ? dom.domainUrl : `https://${dom.domainUrl}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 mt-1 font-semibold transition-colors truncate w-full">
                      <Globe className="w-4 h-4 shrink-0" /> <span className="truncate">{dom.domainUrl}</span>
                    </a>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleOpenModal(dom)} className="p-2 text-slate-400 hover:text-blue-400 bg-vault-950 rounded-lg transition-colors" title="Editar">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(dom.id)} className="p-2 text-slate-400 hover:text-red-400 bg-vault-950 rounded-lg transition-colors" title="Eliminar">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Infra Links */}
              <div className="flex gap-2">
                {dom.githubRepo ? (
                   <a href={dom.githubRepo} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 rounded-xl text-xs font-semibold transition-colors border border-slate-700">
                     <GitBranch className="w-4 h-4" /> GitHub
                   </a>
                ) : (
                   <div className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-slate-600 py-2.5 rounded-xl text-xs font-semibold border border-slate-800 cursor-not-allowed">
                     <GitBranch className="w-4 h-4" /> No Repo
                   </div>
                )}
                
                {dom.vercelPanel ? (
                   <a href={dom.vercelPanel} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 rounded-xl text-xs font-semibold transition-colors border border-slate-700">
                     <Server className="w-4 h-4" /> Vercel Logs
                   </a>
                ) : (
                   <div className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-slate-600 py-2.5 rounded-xl text-xs font-semibold border border-slate-800 cursor-not-allowed">
                     <Server className="w-4 h-4" /> No Server
                   </div>
                )}
              </div>

              {/* Admin Login */}
              {(dom.loginUser || dom.loginPassword) && (
                <div className="bg-vault-950 rounded-xl border border-slate-800/80 p-3 space-y-2">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Login App / Admin</h4>
                  
                  {dom.loginUser && (
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 overflow-hidden text-slate-300">
                        <User className="w-4 h-4 text-slate-500 shrink-0" />
                        <span className="text-sm truncate font-medium">{dom.loginUser}</span>
                      </div>
                      <button 
                        onClick={() => handleCopy(dom.loginUser, `user-${dom.id}`)}
                        className="p-1.5 text-slate-500 hover:text-blue-400 transition-colors shrink-0"
                        title="Copiar Usuario"
                      >
                        {copiedId === `user-${dom.id}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  )}

                  {dom.loginPassword && (
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 overflow-hidden text-slate-300">
                        <KeyRound className="w-4 h-4 text-slate-500 shrink-0" />
                        <span className="text-sm font-mono tracking-widest truncate">
                          {visiblePasswords[dom.id] ? dom.loginPassword : '••••••••••••'}
                        </span>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button 
                          onClick={() => togglePasswordVisibility(dom.id)}
                          className="p-1.5 text-slate-500 hover:text-blue-400 transition-colors"
                          title="Mostrar/Ocultar"
                        >
                          {visiblePasswords[dom.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={() => handleCopy(dom.loginPassword, `pass-${dom.id}`)}
                          className="p-1.5 text-slate-500 hover:text-blue-400 transition-colors"
                          title="Copiar Contraseña"
                        >
                          {copiedId === `pass-${dom.id}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Notes */}
              {dom.notes && (
                <div className="flex items-start gap-2 bg-slate-800/30 p-3 rounded-xl border border-slate-800/50 mt-auto">
                  <MessageSquareText className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{dom.notes}</p>
                </div>
              )}
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
                  <Globe className="text-blue-500" />
                  {editingId ? 'Editar Proyecto Serverless' : 'Nuevo Proyecto Serverless'}
                </h2>
              </div>
              
              <div className="p-6 overflow-y-auto space-y-6">
                
                {/* Datos Principales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      Nombre del Proyecto *
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Landing Page Odontólogo..."
                      className="w-full bg-vault-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      Dominio / Subdominio
                    </label>
                    <input
                      type="text"
                      placeholder="https://odontologo.miapp.com"
                      className="w-full bg-vault-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                      value={domainUrl}
                      onChange={(e) => setDomainUrl(e.target.value)}
                    />
                  </div>
                </div>

                {/* Infraestructura */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-1.5">
                      <GitBranch className="w-3.5 h-3.5" /> URL del Repositorio
                    </label>
                    <input
                      type="text"
                      placeholder="https://github.com/..."
                      className="w-full bg-vault-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                      value={githubRepo}
                      onChange={(e) => setGitBranchRepo(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5" /> Panel de Vercel/Host
                    </label>
                    <input
                      type="text"
                      placeholder="https://vercel.com/..."
                      className="w-full bg-vault-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                      value={vercelPanel}
                      onChange={(e) => setVercelPanel(e.target.value)}
                    />
                  </div>
                </div>

                {/* Credenciales */}
                <div className="bg-vault-950/50 p-4 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-500" />
                    Credenciales de Acceso a la App (Encriptadas)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Usuario o Email Admin"
                        className="w-full bg-vault-900 border border-slate-700 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        value={loginUser}
                        onChange={(e) => setLoginUser(e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        placeholder="Contraseña Admin"
                        className="w-full bg-vault-900 border border-slate-700 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                    Notas Técnicas o Variables de Entorno
                  </label>
                  <textarea
                    placeholder="Ej: Base de datos en Supabase, usa Clerk para Auth..."
                    rows={3}
                    className="w-full bg-vault-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
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
                  disabled={!projectName.trim()}
                  className="flex-1 py-3 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-blue-950 font-bold rounded-xl transition-colors"
                >
                  Guardar Proyecto
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DomainsView;
