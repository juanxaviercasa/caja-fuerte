import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  Send, 
  Sparkles, 
  Clock, 
  Cpu, 
  Sliders, 
  Copy, 
  Check, 
  AlertCircle, 
  RefreshCw,
  Zap,
  Bot
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { AI_MODELS, runPromptInference } from '../../services/aiPlayground';

export function AiPlaygroundModal({
  isOpen,
  onClose,
  secrets = [],
  initialProvider = 'gemini'
}) {
  const [provider, setProvider] = useState(initialProvider || 'gemini');
  const [selectedModel, setSelectedModel] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('Eres un asistente de programación conciso y de alto nivel.');
  const [prompt, setPrompt] = useState('Escribe una función en Python para verificar si un string es un palíndromo.');
  const [temperature, setTemperature] = useState(0.7);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Auto-find API Key from vault secrets
  useEffect(() => {
    const matchingSecret = secrets.find(s => {
      if (provider === 'gemini') return s.providerId === 'google-ai-studio' || s.varName?.includes('GEMINI');
      if (provider === 'groq') return s.providerId === 'groq' || s.varName?.includes('GROQ');
      if (provider === 'openai') return s.providerId === 'openai' || s.varName?.includes('OPENAI');
      if (provider === 'openrouter') return s.providerId === 'openrouter' || s.varName?.includes('OPENROUTER');
      return false;
    });

    if (matchingSecret) {
      setApiKey(matchingSecret.value);
    } else {
      setApiKey('');
    }

    const availableModels = AI_MODELS[provider] || [];
    const defaultMod = availableModels.find(m => m.default) || availableModels[0];
    if (defaultMod) {
      setSelectedModel(defaultMod.id);
    }
  }, [provider, secrets, isOpen]);

  const handleRunInference = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || !apiKey.trim()) return;

    setLoading(true);
    setResult(null);

    const res = await runPromptInference({
      provider,
      model: selectedModel,
      apiKey,
      systemPrompt,
      prompt,
      temperature
    });

    setResult(res);
    setLoading(false);
  };

  const handleCopyResult = () => {
    if (!result?.text) return;
    navigator.clipboard.writeText(result.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="AI Prompt & Execution Playground"
      maxWidth="max-w-4xl"
      icon={BrainCircuit}
    >
      <div className="space-y-5">
        
        {/* Top Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-vault-900/90 rounded-2xl border border-slate-800 text-xs">
          {/* Provider */}
          <div>
            <label className="block font-semibold text-slate-400 mb-1">Proveedor de IA:</label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full px-2.5 py-2 bg-vault-950 border border-slate-700 rounded-xl text-slate-100 font-semibold focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="gemini">Google Gemini (AI Studio)</option>
              <option value="groq">Groq Cloud (LPU)</option>
              <option value="openai">OpenAI (GPT-4o)</option>
              <option value="openrouter">OpenRouter (Modelos Gratis)</option>
            </select>
          </div>

          {/* Model */}
          <div>
            <label className="block font-semibold text-slate-400 mb-1">Modelo de Inferencia:</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-2.5 py-2 bg-vault-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500 cursor-pointer font-mono"
            >
              {(AI_MODELS[provider] || []).map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>

          {/* Temperature */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-slate-400">Creatividad (Temp):</span>
              <span className="font-mono text-cyan-400 font-bold">{temperature}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1.5"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 mt-2"
            />
          </div>
        </div>

        {/* API Key Source Indicator */}
        <div className="flex items-center justify-between px-3 py-2 bg-vault-950 rounded-xl border border-slate-800/80 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">API Key Activa:</span>
            <span className="font-mono text-emerald-400 font-medium">
              {apiKey ? `${apiKey.slice(0, 8)}••••••••` : '⚠️ No se encontró clave guardada para este proveedor'}
            </span>
          </div>
          {!apiKey && (
            <input
              type="password"
              placeholder="Ingresa clave temporal..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="px-2 py-1 bg-vault-900 border border-slate-700 rounded text-xs text-slate-100 font-mono"
            />
          )}
        </div>

        {/* Prompt Forms */}
        <form onSubmit={handleRunInference} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              System Prompt (Instrucción de Sistema):
            </label>
            <input
              type="text"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Ej. Eres un experto en Python y buenas prácticas..."
              className="w-full px-3 py-2 bg-vault-900 border border-slate-700/80 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Tu Prompt / Pregunta:
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Escribe lo que deseas probar con el modelo de IA..."
              className="w-full p-3 bg-vault-950 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono shadow-inner"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              💡 La inferencia se realiza directamente desde tu navegador contra la API oficial.
            </span>

            <button
              type="submit"
              disabled={loading || !apiKey || !prompt.trim()}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Procesando inferencia...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Ejecutar Inferencia</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Inference Response Box */}
        {result && (
          <div className={`p-4 rounded-2xl border text-xs space-y-3 animate-fadeIn ${
            result.success 
              ? 'bg-vault-950 border-emerald-500/30' 
              : 'bg-rose-500/10 border-rose-500/30'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {result.model || selectedModel}
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  {result.latencyMs} ms
                </span>
                {result.tokens && (
                  <span className="text-slate-400 flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-amber-400" />
                    {result.tokens.total} tokens ({result.tokens.completion} generados)
                  </span>
                )}
              </div>

              {result.success && (
                <button
                  type="button"
                  onClick={handleCopyResult}
                  className="flex items-center gap-1 text-slate-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '¡Copiado!' : 'Copiar respuesta'}</span>
                </button>
              )}
            </div>

            {result.success ? (
              <div className="font-mono text-slate-200 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                {result.text}
              </div>
            ) : (
              <div className="text-rose-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{result.error}</span>
              </div>
            )}
          </div>
        )}

      </div>
    </Modal>
  );
}
