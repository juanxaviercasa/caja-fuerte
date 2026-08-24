import React, { useState } from 'react';
import { 
  Code2, 
  Terminal, 
  Layers, 
  Copy, 
  Check, 
  Boxes, 
  GitBranch, 
  Server,
  Sparkles
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { generateSdkSnippets } from '../../services/snippetGenerator';

export function SdkGeneratorModal({
  isOpen,
  onClose,
  secrets = [],
  initialSecret = null
}) {
  const [selectedSecretId, setSelectedSecretId] = useState(
    initialSecret?.id || secrets[0]?.id || ''
  );
  const [activeTab, setActiveTab] = useState('pythonGenAi');
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (initialSecret?.id) setSelectedSecretId(initialSecret.id);
    else if (secrets[0]?.id && !selectedSecretId) setSelectedSecretId(secrets[0].id);
  }, [initialSecret, secrets]);

  const currentSecret = secrets.find(s => s.id === selectedSecretId) || initialSecret || secrets[0];
  const snippets = generateSdkSnippets(currentSecret);

  const tabs = [
    { id: 'pythonGenAi', label: 'Python (Google GenAI)', category: 'Python' },
    { id: 'pythonGroq', label: 'Python (Groq SDK)', category: 'Python' },
    { id: 'pythonLangChain', label: 'Python (LangChain)', category: 'Python' },
    { id: 'jsNode', label: 'Node.js (@google/genai)', category: 'JavaScript' },
    { id: 'nextjsServerAction', label: 'Next.js Server Action', category: 'JavaScript' },
    { id: 'powershell', label: 'Windows PowerShell ($env:)', category: 'Shell' },
    { id: 'bash', label: 'Linux / macOS Bash (export)', category: 'Shell' },
    { id: 'dockerCompose', label: 'Docker Compose', category: 'DevOps' },
    { id: 'k8sSecret', label: 'Kubernetes Secret YAML', category: 'DevOps' },
    { id: 'githubActions', label: 'GitHub Actions Workflow', category: 'CI/CD' }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab] || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="SDK Studio & Generador DevOps / Cloud"
      maxWidth="max-w-4xl"
      icon={Code2}
    >
      <div className="space-y-5">
        
        {/* Secret Selector */}
        <div className="p-3.5 bg-vault-900/90 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <label className="font-semibold text-slate-300 block mb-1">
              Selecciona el secreto a integrar:
            </label>
            <select
              value={selectedSecretId}
              onChange={(e) => setSelectedSecretId(e.target.value)}
              className="px-3 py-1.5 bg-vault-950 border border-slate-700 rounded-xl text-slate-100 font-semibold focus:outline-none focus:border-cyan-500"
            >
              {secrets.map(s => (
                <option key={s.id} value={s.id}>
                  {s.title || s.varName} ({s.varName})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400 bg-vault-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <span>Variable:</span>
            <span className="text-cyan-400 font-bold">{currentSecret?.varName || 'API_KEY'}</span>
          </div>
        </div>

        {/* Categories & Snippet Tabs */}
        <div className="flex flex-wrap gap-1.5 border-b border-slate-800 pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'bg-vault-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code Snippet Box */}
        <div className="relative">
          <div className="flex items-center justify-between px-4 py-2 bg-vault-900 border-t border-x border-slate-800 rounded-t-2xl text-xs font-mono text-slate-400">
            <span>Código listo para copiar y pegar:</span>
            
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado!' : 'Copiar Código'}</span>
            </button>
          </div>

          <div className="bg-vault-950 border border-slate-800 rounded-b-2xl p-4 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner max-h-80">
            <pre className="text-emerald-300/90 whitespace-pre-wrap">{snippets[activeTab]}</pre>
          </div>
        </div>

      </div>
    </Modal>
  );
}
