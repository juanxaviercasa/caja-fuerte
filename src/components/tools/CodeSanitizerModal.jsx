import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Sparkles, 
  Copy, 
  Check, 
  FileCode, 
  AlertTriangle, 
  Eye, 
  EyeOff,
  CheckCircle2
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { sanitizeCode } from '../../services/codeSanitizer';

export function CodeSanitizerModal({ isOpen, onClose }) {
  const [inputCode, setInputCode] = useState('');
  const [sanitizeMode, setSanitizeMode] = useState('env'); // 'env' | 'redact'
  const [copied, setCopied] = useState(false);

  const { sanitizedText, detectedLeaks, leakCount } = sanitizeCode(inputCode, sanitizeMode);

  const handleCopy = () => {
    navigator.clipboard.writeText(sanitizedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSample = () => {
    setInputCode(`// Ejemplo de código con fuga accidental de claves
import { GoogleGenAI } from '@google/genai';
import Groq from 'groq-sdk';

// NUNCA dejes tus claves quemadas en el código así:
const geminiKey = "AIzaSyDxyz1234567890abcdefghijklmnopqrstuv";
const groqKey = "gsk_1234567890abcdef1234567890abcdef1234567890abcdef12";

const ai = new GoogleGenAI({ apiKey: geminiKey });
const groq = new Groq({ apiKey: groqKey });`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Sanitizador Anti-Fugas de Código y Logs"
      maxWidth="max-w-4xl"
      icon={ShieldAlert}
    >
      <div className="space-y-5">
        
        {/* Description Banner */}
        <div className="p-3.5 bg-vault-900/90 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <p className="text-slate-400">
            Pega cualquier archivo de código o log antes de subirlo a GitHub. Detectará automáticamente claves de Google Gemini, Groq, OpenAI, Hugging Face o AWS y las sanitizará.
          </p>

          <button
            type="button"
            onClick={handleSample}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold rounded-xl shrink-0 transition-colors cursor-pointer"
          >
            Cargar Ejemplo
          </button>
        </div>

        {/* Input & Output Split View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Input Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Código Original (Pega aquí):</span>
              {leakCount > 0 && (
                <span className="text-rose-400 font-mono flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {leakCount} {leakCount === 1 ? 'clave detectada' : 'claves detectadas'}
                </span>
              )}
            </div>

            <textarea
              rows={12}
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Pega tu script de Python, Node.js, JSON o log de terminal aquí..."
              className="w-full p-3 bg-vault-950 border border-slate-700 rounded-2xl text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 shadow-inner"
            />
          </div>

          {/* Sanitized Output Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="text-emerald-400">Código Limpio y Protegido:</span>

              <div className="flex items-center gap-2">
                <select
                  value={sanitizeMode}
                  onChange={(e) => setSanitizeMode(e.target.value)}
                  className="px-2 py-0.5 bg-vault-900 border border-slate-700 rounded text-[11px] text-slate-300"
                >
                  <option value="env">Reemplazar por process.env</option>
                  <option value="redact">Ocultar [REDACTED]</option>
                </select>

                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!sanitizedText}
                  className="flex items-center gap-1 px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '¡Copiado!' : 'Copiar Limpio'}</span>
                </button>
              </div>
            </div>

            <div className="w-full h-64 p-3 bg-vault-950 border border-slate-700 rounded-2xl text-xs font-mono text-slate-200 overflow-y-auto shadow-inner whitespace-pre-wrap">
              {sanitizedText || (
                <span className="text-slate-600">El código sanitizado aparecerá aquí...</span>
              )}
            </div>
          </div>

        </div>

      </div>
    </Modal>
  );
}
