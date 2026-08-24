import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Key, 
  FileCode, 
  ExternalLink, 
  ShieldCheck, 
  Layers, 
  Zap, 
  Bot, 
  FolderKanban,
  CheckCircle2,
  AlertTriangle,
  Code,
  Terminal,
  Cpu
} from 'lucide-react';
import { Modal } from '../common/Modal';

export function InteractiveGuideModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('structure');

  const tabs = [
    { id: 'structure', label: '1. ¿Qué guardar y cómo organizarlo?', icon: FolderKanban },
    { id: 'freeAi', label: '2. Catálogo de IA Gratuita (Paso a Paso)', icon: Sparkles },
    { id: 'envWorkflow', label: '3. Uso de .env en Código Real', icon: FileCode },
    { id: 'devops', label: '4. Despliegue, Git y DevOps', icon: Terminal },
    { id: 'security', label: '5. Seguridad y Respaldos', icon: ShieldCheck }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Manual Interactivo: Centro de Comando y Buenas Prácticas"
      maxWidth="max-w-4xl"
      icon={BookOpen}
    >
      <div className="space-y-5">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5 border-b border-slate-800 pb-3">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'bg-vault-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-4 bg-vault-950/80 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-4 leading-relaxed max-h-[65vh] overflow-y-auto">
          
          {/* TAB 1: STRUCTURE */}
          {activeTab === 'structure' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
                <h4 className="font-bold text-sm text-emerald-300 flex items-center gap-2 mb-1">
                  <FolderKanban className="w-4 h-4" />
                  Estrategia de Organización de Claves y Secretos
                </h4>
                <p>
                  A medida que construyes múltiples aplicaciones (chatbots, generadores de contenido, SaaS, scripts), la mejor práctica de ingeniería es separar las <strong>Claves Globales</strong> de las <strong>Claves Específicas de Proyecto</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-vault-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-slate-100 flex items-center gap-1.5 text-cyan-400">
                    <Sparkles className="w-4 h-4" /> 1. Claves Globales / Reutilizables
                  </span>
                  <p className="text-slate-400">
                    Son tus cuentas personales principales de servicios de IA o Cloud (ej. tu API Key de Google AI Studio o tu token de Hugging Face). Guárdalas en el espacio <code>Claves Globales</code> para poder inyectarlas automáticamente en cualquier proyecto.
                  </p>
                </div>

                <div className="p-3.5 bg-vault-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-slate-100 flex items-center gap-1.5 text-emerald-400">
                    <Layers className="w-4 h-4" /> 2. Claves Específicas por Proyecto
                  </span>
                  <p className="text-slate-400">
                    Bases de datos exclusivas (ej. base de datos Supabase del "Generador de Libros"), webhooks de WhatsApp, credenciales de Stripe o tokens de despliegue específicos de ese proyecto.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-200 text-xs uppercase tracking-wider">
                  Clasificación de Entornos (Environments):
                </h5>
                <ul className="space-y-1.5 text-slate-400 list-disc list-inside">
                  <li><strong className="text-blue-300 font-mono">Desarrollo (Dev):</strong> Conexiones a bases de datos locales (localhost), keys de prueba y endpoints de sandbox.</li>
                  <li><strong className="text-amber-300 font-mono">Staging / Test:</strong> Entorno de pruebas previo a producción para verificar que todo funcione.</li>
                  <li><strong className="text-emerald-300 font-mono">Producción (Prod):</strong> Claves y bases de datos finales con límites de gasto y credenciales blindadas.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: FREE AI SERVICES */}
          {activeTab === 'freeAi' && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Guía de Proveedores con Tiers Gratuitos Generosos
              </h4>

              <div className="space-y-3">
                {/* Google Gemini */}
                <div className="p-3.5 bg-vault-900 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-300 text-sm">1. Google AI Studio (Gemini)</span>
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-400 hover:underline font-semibold"
                    >
                      <span>Obtener Key Gratis</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-slate-400">
                    <strong>Límites gratuitos:</strong> Gemini 1.5 Flash ofrece hasta 15 peticiones por minuto (RPM) y 1 millón de tokens por minuto (TPM) completamente gratis para desarrollo.
                  </p>
                  <div className="font-mono text-[11px] bg-vault-950 p-2 rounded border border-slate-800 text-slate-300">
                    Variable sugerida: <span className="text-cyan-400">GEMINI_API_KEY</span>
                  </div>
                </div>

                {/* Groq Cloud */}
                <div className="p-3.5 bg-vault-900 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 text-sm">2. Groq Cloud (Inferencia LPU)</span>
                    <a
                      href="https://console.groq.com/keys"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-400 hover:underline font-semibold"
                    >
                      <span>Obtener Key Gratis</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-slate-400">
                    <strong>Velocidad:</strong> 500+ tokens/segundo en modelos como Llama 3.3 70B y Mixtral 8x7B. Es el motor más rápido para agentes autónomos y chatbots.
                  </p>
                  <div className="font-mono text-[11px] bg-vault-950 p-2 rounded border border-slate-800 text-slate-300">
                    Variable sugerida: <span className="text-amber-400">GROQ_API_KEY</span>
                  </div>
                </div>

                {/* Hugging Face */}
                <div className="p-3.5 bg-vault-900 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-yellow-300 text-sm">3. Hugging Face (Inference API)</span>
                    <a
                      href="https://huggingface.co/settings/tokens"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-400 hover:underline font-semibold"
                    >
                      <span>Crear User Token</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-slate-400">
                    <strong>Uso:</strong> Crea un token con permisos de <em>Read</em> para acceder a miles de modelos de clasificación de texto, visión, embeddings y audio de forma serverless.
                  </p>
                  <div className="font-mono text-[11px] bg-vault-950 p-2 rounded border border-slate-800 text-slate-300">
                    Variable sugerida: <span className="text-yellow-400">HF_TOKEN</span>
                  </div>
                </div>

                {/* OpenRouter */}
                <div className="p-3.5 bg-vault-900 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-300 text-sm">4. OpenRouter (Modelos :free)</span>
                    <a
                      href="https://openrouter.ai/keys"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-400 hover:underline font-semibold"
                    >
                      <span>Obtener Key</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-slate-400">
                    <strong>Ventaja:</strong> Con una sola clave puedes invocar modelos que terminan en <code>:free</code> (como Llama 3 70B, Mistral, etc.) sin pagar nada.
                  </p>
                  <div className="font-mono text-[11px] bg-vault-950 p-2 rounded border border-slate-800 text-slate-300">
                    Variable sugerida: <span className="text-purple-400">OPENROUTER_API_KEY</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ENV WORKFLOW */}
          {activeTab === 'envWorkflow' && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-cyan-400" />
                Cómo Usar Archivos .env en Proyectos Reales
              </h4>

              <p className="text-slate-300">
                Un archivo <code>.env</code> contiene pares clave-valor que tu aplicación carga en tiempo de ejecución para no exponer contraseñas en el código fuente.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-vault-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-cyan-300 text-xs">🐍 En Python:</span>
                  <div className="bg-vault-950 p-2.5 rounded font-mono text-[11px] text-slate-300">
                    <code>pip install python-dotenv</code><br />
                    <span className="text-slate-500"># main.py</span><br />
                    from dotenv import load_dotenv<br />
                    import os<br />
                    load_dotenv()<br />
                    api_key = os.getenv("GEMINI_API_KEY")
                  </div>
                </div>

                <div className="p-3.5 bg-vault-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-300 text-xs">⚡ En Node.js:</span>
                  <div className="bg-vault-950 p-2.5 rounded font-mono text-[11px] text-slate-300">
                    <code>npm install dotenv</code><br />
                    <span className="text-slate-500">// index.js</span><br />
                    import 'dotenv/config';<br />
                    const apiKey = process.env.GEMINI_API_KEY;
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Regla de Oro en Frontend (Vite / React / Next.js):
                </span>
                <p className="text-[11px] text-amber-300/90">
                  Las variables con prefijo <code>VITE_</code> o <code>NEXT_PUBLIC_</code> se empaquetan y son <strong>visibles en el código del navegador del usuario</strong>. ¡Nunca coloques claves de administración o bases de datos con ese prefijo! Úsalas solo en el backend o en Server Actions.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: DEVOPS & GIT */}
          {activeTab === 'devops' && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-400" />
                Buenas Prácticas para Git y Despliegue
              </h4>

              <div className="space-y-3">
                <div className="p-3 bg-vault-900 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="font-bold text-slate-100">1. Añadir siempre al .gitignore:</span>
                  <p className="text-slate-400">
                    Antes de hacer tu primer commit, crea un archivo <code>.gitignore</code> en la raíz de tu proyecto e incluye:
                  </p>
                  <pre className="bg-vault-950 p-2 rounded text-emerald-300 font-mono text-[11px]">
                    .env{'\n'}.env.local{'\n'}.env.production{'\n'}node_modules/
                  </pre>
                </div>

                <div className="p-3 bg-vault-900 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="font-bold text-slate-100">2. Crear siempre un .env.example:</span>
                  <p className="text-slate-400">
                    DevVault incluye un botón en el <strong>Studio .env</strong> para descargar tu archivo <code>.env.example</code> con las variables necesarias pero con valores de ejemplo (ej. <code>GEMINI_API_KEY=tu_clave_aqui</code>) para que otros colaboradores sepan qué variables configurar.
                  </p>
                </div>

                <div className="p-3 bg-vault-900 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="font-bold text-slate-100">3. GitHub Actions & Despliegues en Vercel:</span>
                  <p className="text-slate-400">
                    En GitHub ve a <code>Settings &gt; Secrets and variables &gt; Actions</code> y añade cada secreto. En Vercel ve a <code>Project Settings &gt; Environment Variables</code>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SECURITY & BACKUPS */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-200">
                <h4 className="font-bold text-sm text-cyan-300 flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  Arquitectura Criptográfica de DevVault
                </h4>
                <p>
                  DevVault implementa el estándar <strong>Zero-Knowledge Local</strong>. Tu Contraseña Maestra nunca sale de tu equipo ni se envía por la red.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-200 uppercase tracking-wider text-xs">Recomendaciones de Seguridad:</h5>
                <ul className="space-y-2 text-slate-400 list-disc list-inside">
                  <li>
                    <strong className="text-slate-200">Exporta Respaldos Regulares:</strong> Haz clic en el icono de disco duro arriba a la derecha y descarga un archivo <code>.devvault</code> cifrado con contraseña para guardarlo en tu Google Drive o pendrive.
                  </li>
                  <li>
                    <strong className="text-slate-200">Usa el Auditor de Seguridad:</strong> Revisa periódicamente el <strong>Auditor de Vulnerabilidades</strong> para detectar claves duplicadas o sin rotar.
                  </li>
                  <li>
                    <strong className="text-slate-200">Sanitiza antes de Compartir:</strong> Usa el <strong>Sanitizador de Código</strong> si necesitas mostrar un fragmento en foros, Discord o GitHub para asegurarte de que ninguna API key se filtre.
                  </li>
                </ul>
              </div>
            </div>
          )}

        </div>

      </div>
    </Modal>
  );
}
