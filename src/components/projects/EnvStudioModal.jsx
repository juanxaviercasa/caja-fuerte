import React, { useState, useMemo } from 'react';
import { 
  FileCode, 
  Copy, 
  Check, 
  Download, 
  Upload, 
  Sparkles, 
  FolderKanban, 
  AlertCircle,
  FileText,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { generateEnvContent, parseEnvContent, downloadFile } from '../../services/envParser';
import { ENVIRONMENTS } from '../../data/providers';

export function EnvStudioModal({
  isOpen,
  onClose,
  projects = [],
  secrets = [],
  activeProjectId = 'all',
  onImportSecrets
}) {
  const [activeTab, setActiveTab] = useState('export'); // 'export' | 'import'
  const [selectedProjectId, setSelectedProjectId] = useState(
    activeProjectId !== 'all' ? activeProjectId : (projects[0]?.id || 'global-keys')
  );
  const [selectedEnv, setSelectedEnv] = useState('development');
  const [includeComments, setIncludeComments] = useState(true);
  const [copied, setCopied] = useState(false);

  // Import state
  const [importText, setImportText] = useState('');
  const [importProjectId, setImportProjectId] = useState(
    activeProjectId !== 'all' ? activeProjectId : (projects[0]?.id || 'global-keys')
  );
  const [importEnv, setImportEnv] = useState('development');

  // Filter secrets for the export view
  const targetProject = projects.find(p => p.id === selectedProjectId);
  const projectSecrets = useMemo(() => {
    return secrets.filter(sec => {
      const matchProj = sec.projectId === selectedProjectId || sec.projectId === 'global-keys';
      const matchEnv = selectedEnv === 'all' || sec.environment === selectedEnv;
      return matchProj && matchEnv;
    });
  }, [secrets, selectedProjectId, selectedEnv]);

  // Generate .env content string
  const envContent = useMemo(() => {
    return generateEnvContent(projectSecrets, {
      includeComments,
      includeHeader: true,
      projectName: targetProject?.name || 'DevVault'
    });
  }, [projectSecrets, includeComments, targetProject]);

  // Handle parse of import text
  const parsedImportItems = useMemo(() => {
    return parseEnvContent(importText);
  }, [importText]);

  const handleCopyEnv = () => {
    navigator.clipboard.writeText(envContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadEnv = (isExample = false) => {
    let contentToDownload = envContent;
    let fileName = `.env`;

    if (selectedEnv === 'production') fileName = `.env.production`;
    else if (selectedEnv === 'staging') fileName = `.env.staging`;

    if (isExample) {
      // Replace values with placeholders
      fileName = `.env.example`;
      const exampleSecrets = projectSecrets.map(s => ({
        ...s,
        value: `your_${(s.varName || 'secret').toLowerCase()}_here`
      }));
      contentToDownload = generateEnvContent(exampleSecrets, {
        includeComments,
        includeHeader: true,
        projectName: `${targetProject?.name || 'DevVault'} (Example Template)`
      });
    }

    downloadFile(contentToDownload, fileName);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setImportText(content);
      }
    };
    reader.readAsText(file);
  };

  const handleExecuteImport = () => {
    if (parsedImportItems.length === 0) return;

    const formattedSecrets = parsedImportItems.map(item => ({
      id: `sec_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      title: item.title,
      varName: item.key,
      value: item.value,
      projectId: importProjectId,
      environment: importEnv,
      category: item.category,
      type: item.type,
      notes: item.notes || '',
      quotaInfo: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    onImportSecrets(formattedSecrets);
    setImportText('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Studio .env (Generador & Importador)"
      maxWidth="max-w-3xl"
      icon={FileCode}
    >
      <div className="space-y-5">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('export')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'export'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Generar y Exportar .env</span>
          </button>

          <button
            onClick={() => setActiveTab('import')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'import'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Importar archivo .env</span>
          </button>
        </div>

        {activeTab === 'export' ? (
          /* EXPORT TAB */
          <div className="space-y-4">
            {/* Filters bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-vault-900/90 rounded-2xl border border-slate-800 text-xs">
              <div>
                <label className="block font-semibold text-slate-400 mb-1">Proyecto:</label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-vault-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-400 mb-1">Entorno:</label>
                <select
                  value={selectedEnv}
                  onChange={(e) => setSelectedEnv(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-vault-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="all">Todos los entornos</option>
                  {ENVIRONMENTS.map(env => (
                    <option key={env.id} value={env.id}>{env.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <input
                  id="inc-comm"
                  type="checkbox"
                  checked={includeComments}
                  onChange={(e) => setIncludeComments(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor="inc-comm" className="text-slate-300 cursor-pointer select-none">
                  Incluir comentarios y grupos
                </label>
              </div>
            </div>

            {/* .env Preview Area */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300 font-mono flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  Vista Previa del .env ({projectSecrets.length} variables)
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyEnv}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? '¡Copiado!' : 'Copiar .env'}</span>
                  </button>

                  <button
                    onClick={() => handleDownloadEnv(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg text-xs font-bold transition-all shadow cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar .env</span>
                  </button>

                  <button
                    onClick={() => handleDownloadEnv(true)}
                    className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg text-xs transition-colors cursor-pointer"
                    title="Descargar plantilla con claves de ejemplo enmascaradas"
                  >
                    <span>.env.example</span>
                  </button>
                </div>
              </div>

              <div className="relative bg-vault-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-200 max-h-80 overflow-y-auto shadow-inner">
                {projectSecrets.length > 0 ? (
                  <pre className="text-cyan-200/90 whitespace-pre-wrap">{envContent}</pre>
                ) : (
                  <p className="text-slate-500 text-center py-6">
                    No hay claves asignadas a este proyecto/entorno todavía.
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* IMPORT TAB */
          <div className="space-y-4">
            {/* Project & Environment target */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-vault-900/90 rounded-2xl border border-slate-800 text-xs">
              <div>
                <label className="block font-semibold text-slate-400 mb-1">Importar al Proyecto:</label>
                <select
                  value={importProjectId}
                  onChange={(e) => setImportProjectId(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-vault-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-400 mb-1">Entorno destino:</label>
                <select
                  value={importEnv}
                  onChange={(e) => setImportEnv(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-vault-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  {ENVIRONMENTS.map(env => (
                    <option key={env.id} value={env.id}>{env.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Input / File Upload Area */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Pega el contenido de tu .env o sube un archivo:
                </label>
                <label className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Subir archivo .env</span>
                  <input
                    type="file"
                    accept=".env,.txt,text/plain"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder={`GEMINI_API_KEY=AIzaSy...\nGROQ_API_KEY=gsk_...\nDATABASE_URL=postgresql://...\nPORT=3000`}
                className="w-full h-40 p-3 bg-vault-950 border border-slate-700 rounded-xl font-mono text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 shadow-inner"
              />
            </div>

            {/* Parsed Preview */}
            {parsedImportItems.length > 0 && (
              <div className="p-3 bg-vault-900/90 rounded-xl border border-cyan-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-cyan-300">
                    ✓ Se detectaron {parsedImportItems.length} variables válidas:
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    Listo para cifrar y guardar
                  </span>
                </div>

                <div className="max-h-32 overflow-y-auto space-y-1">
                  {parsedImportItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px] font-mono bg-vault-950 px-2.5 py-1 rounded-lg border border-slate-800">
                      <span className="text-cyan-300 font-semibold">{item.key}</span>
                      <span className="text-slate-500 truncate max-w-xs">{item.value.slice(0, 8)}••••••••</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleExecuteImport}
                  className="w-full mt-2 py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-vault-950 font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Cifrar e Importar {parsedImportItems.length} Secretos</span>
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </Modal>
  );
}
