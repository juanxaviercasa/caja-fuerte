import React, { useState } from 'react';
import { 
  Code, 
  Copy, 
  Check, 
  Terminal, 
  FileCode, 
  Globe, 
  ExternalLink,
  ShieldCheck,
  Calendar,
  Layers
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';

export function SecretQuickView({
  isOpen,
  onClose,
  secret,
  projectName = ''
}) {
  const [activeSnippetTab, setActiveSnippetTab] = useState('python');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  if (!secret) return null;

  const varName = secret.varName || 'API_KEY';
  const val = secret.value || '';

  const snippets = {
    python: `# Python (dotenv)
import os
from dotenv import load_dotenv

load_dotenv()

${varName} = os.getenv('${varName}')
print(f"Clave cargada: {${varName}[:5]}...")`,

    nodejs: `// Node.js (CommonJS / ES Modules)
import 'dotenv/config'; // o require('dotenv').config();

const ${varName.toLowerCase()} = process.env.${varName};

if (!${varName.toLowerCase()}) {
  throw new Error('Falta la variable de entorno ${varName}');
}`,

    vite: `// Frontend con Vite / React
// NOTA: Recuerda renombrar tu variable con prefijo VITE_ si la usas en el cliente
const apiKey = import.meta.env.VITE_${varName};
console.log('API Key frontend:', apiKey);`,

    curl: `# Petición cURL con la cabecera Bearer
curl https://api.ejemplo.com/v1/models \\
  -H "Authorization: Bearer \${${varName}}" \\
  -H "Content-Type: application/json"`,

    env: `# Línea exacta para tu archivo .env
${varName}=${val.includes(' ') ? `"${val}"` : val}`
  };

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(snippets[activeSnippetTab]);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Detalles e Integración: ${secret.title}`}
      maxWidth="max-w-2xl"
      icon={Code}
    >
      <div className="space-y-6">
        
        {/* Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-vault-900/80 rounded-2xl border border-slate-800 text-xs">
          <div>
            <span className="text-slate-500 block mb-1">Variable de Entorno</span>
            <span className="font-mono font-semibold text-cyan-300">{varName}</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-1">Proyecto</span>
            <span className="font-semibold text-slate-200">{projectName || 'Global'}</span>
          </div>
          <div>
            <span className="text-slate-500 block mb-1">Entorno</span>
            <span className="capitalize font-semibold text-emerald-400">{secret.environment}</span>
          </div>
          {secret.quotaInfo && (
            <div className="col-span-2 sm:col-span-3 pt-2 border-t border-slate-800/80">
              <span className="text-slate-500 block mb-1">Límites / Quota</span>
              <span className="text-slate-300">{secret.quotaInfo}</span>
            </div>
          )}
          {secret.notes && (
            <div className="col-span-2 sm:col-span-3 pt-2 border-t border-slate-800/80">
              <span className="text-slate-500 block mb-1">Notas</span>
              <span className="text-slate-300">{secret.notes}</span>
            </div>
          )}
        </div>

        {/* Code Snippets Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Cómo Usar en tu Código
            </span>
            <button
              onClick={handleCopySnippet}
              className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
            >
              {copiedSnippet ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSnippet ? '¡Código Copiado!' : 'Copiar Código'}</span>
            </button>
          </div>

          {/* Snippet Tabs */}
          <div className="flex items-center gap-1.5 border-b border-slate-800 mb-2">
            {[
              { id: 'python', label: 'Python (.py)' },
              { id: 'nodejs', label: 'Node.js / JS' },
              { id: 'vite', label: 'Vite / React' },
              { id: 'curl', label: 'cURL / Shell' },
              { id: 'env', label: 'Línea .env' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSnippetTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-mono font-medium border-b-2 transition-all cursor-pointer ${
                  activeSnippetTab === tab.id
                    ? 'border-emerald-500 text-emerald-300 bg-emerald-500/10 rounded-t-lg'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Code Block */}
          <div className="relative bg-vault-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner">
            <pre>{snippets[activeSnippetTab]}</pre>
          </div>
        </div>

      </div>
    </Modal>
  );
}
