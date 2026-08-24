import React, { useState } from 'react';
import { Zap, CheckCircle2, AlertCircle, RefreshCw, Sparkles, Clock, Globe, ArrowRight } from 'lucide-react';
import { Modal } from '../common/Modal';
import { testApiKey } from '../../services/apiTester';

const TEST_SERVICES = [
  { id: 'gemini', name: 'Google Gemini (AI Studio)', icon: 'Sparkles', placeholder: 'AIzaSy...' },
  { id: 'groq', name: 'Groq Cloud', icon: 'Zap', placeholder: 'gsk_...' },
  { id: 'huggingface', name: 'Hugging Face Token', icon: 'Bot', placeholder: 'hf_...' },
  { id: 'openrouter', name: 'OpenRouter API Key', icon: 'Globe', placeholder: 'sk-or-v1-...' },
  { id: 'openai', name: 'OpenAI API Key', icon: 'Boxes', placeholder: 'sk-proj-...' }
];

export function ApiTesterModal({
  isOpen,
  onClose,
  initialProvider = 'gemini',
  initialApiKey = '',
  secrets = []
}) {
  const [selectedProvider, setSelectedProvider] = useState(initialProvider || 'gemini');
  const [apiKey, setApiKey] = useState(initialApiKey || '');
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState(null);

  // Populate if opened with a specific secret
  React.useEffect(() => {
    if (initialProvider) setSelectedProvider(initialProvider);
    if (initialApiKey) setApiKey(initialApiKey);
  }, [initialProvider, initialApiKey, isOpen]);

  const handleTest = async (e) => {
    if (e) e.preventDefault();
    if (!apiKey.trim()) return;

    setTesting(true);
    setResult(null);

    const testRes = await testApiKey(selectedProvider, apiKey);
    setResult(testRes);
    setTesting(false);
  };

  const handlePickFromVault = (sec) => {
    setApiKey(sec.value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Probador en Vivo de APIs de IA"
      maxWidth="max-w-xl"
      icon={Zap}
    >
      <div className="space-y-5">
        
        {/* Service Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Selecciona el Servicio a Probar
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {TEST_SERVICES.map(service => (
              <button
                key={service.id}
                type="button"
                onClick={() => {
                  setSelectedProvider(service.id);
                  setResult(null);
                }}
                className={`p-2.5 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                  selectedProvider === service.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                    : 'bg-vault-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {service.name}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Pick from stored secrets */}
        {secrets.filter(s => s.category === 'ai' || s.providerId === selectedProvider).length > 0 && (
          <div>
            <span className="text-[11px] text-slate-400 font-mono block mb-1.5">
              O seleccionar una clave guardada en tu caja fuerte:
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {secrets
                .filter(s => s.category === 'ai' || s.providerId === selectedProvider)
                .map(sec => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => handlePickFromVault(sec)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-amber-300 text-xs font-mono transition-colors cursor-pointer"
                  >
                    {sec.title || sec.varName}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* API Key Input */}
        <form onSubmit={handleTest} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              API Key o Token a Verificar
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Pega la API Key aquí para probarla..."
              className="w-full px-3.5 py-2.5 bg-vault-900 border border-slate-700 rounded-xl font-mono text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={testing || !apiKey}
            className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {testing ? (
              <span className="inline-flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Conectando con el servidor del proveedor...
              </span>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Ejecutar Test de Conectividad</span>
              </>
            )}
          </button>
        </form>

        {/* Test Result Display */}
        {result && (
          <div className={`p-4 rounded-2xl border text-xs space-y-2 animate-fadeIn ${
            result.success
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm">
                {result.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-400" />
                )}
                <span>{result.success ? '¡API Key Activa y Verificada!' : 'Fallo en la Validación'}</span>
              </div>

              {result.latencyMs > 0 && (
                <span className="flex items-center gap-1 font-mono text-[11px] px-2 py-0.5 rounded bg-black/30">
                  <Clock className="w-3 h-3" />
                  {result.latencyMs} ms
                </span>
              )}
            </div>

            <p className="text-slate-300 leading-relaxed pl-7">
              {result.message}
            </p>
          </div>
        )}

      </div>
    </Modal>
  );
}
