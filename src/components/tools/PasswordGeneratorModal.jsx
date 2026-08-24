import React, { useState, useEffect } from 'react';
import { 
  Wand2, 
  Copy, 
  Check, 
  RefreshCw, 
  ShieldCheck, 
  Sliders, 
  Key, 
  Fingerprint 
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { generateSecurePassword, generateApiToken, evaluatePasswordStrength } from '../../services/crypto';

export function PasswordGeneratorModal({ isOpen, onClose, onUseGeneratedSecret }) {
  const [mode, setMode] = useState('password'); // 'password' | 'token'
  const [length, setLength] = useState(24);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);

  // Token format
  const [tokenFormat, setTokenFormat] = useState('hex-32');

  const [generatedValue, setGeneratedValue] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (mode === 'password') {
      const pwd = generateSecurePassword({
        length,
        uppercase,
        lowercase,
        numbers,
        symbols,
        excludeSimilar
      });
      setGeneratedValue(pwd);
    } else {
      const tok = generateApiToken(tokenFormat);
      setGeneratedValue(tok);
    }
  };

  useEffect(() => {
    if (isOpen) {
      generate();
    }
  }, [isOpen, mode, length, uppercase, lowercase, numbers, symbols, excludeSimilar, tokenFormat]);

  const strength = evaluatePasswordStrength(generatedValue);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Generador de Contraseñas y Tokens Criptográficos"
      maxWidth="max-w-lg"
      icon={Wand2}
    >
      <div className="space-y-6">
        
        {/* Mode Switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-vault-900 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setMode('password')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'password' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Contraseña Segura
          </button>
          <button
            type="button"
            onClick={() => setMode('token')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'token' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Token de API / Secreto
          </button>
        </div>

        {/* Output Display */}
        <div>
          <div className="relative bg-vault-950 border border-slate-700/80 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-inner">
            <span className="font-mono text-sm sm:text-base text-slate-100 break-all select-all font-semibold">
              {generatedValue}
            </span>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={generate}
                className="p-2 rounded-xl text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Regenerar"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  copied 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                }`}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>

          {/* Strength bar for password mode */}
          {mode === 'password' && (
            <div className="mt-2 flex items-center justify-between text-xs px-1">
              <span className="text-slate-400">Nivel de Fortaleza:</span>
              <span className={`font-semibold ${strength.color}`}>{strength.label}</span>
            </div>
          )}
        </div>

        {/* Controls */}
        {mode === 'password' ? (
          <div className="space-y-4 p-4 bg-vault-900/60 rounded-2xl border border-slate-800 text-xs">
            {/* Length slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-300">Longitud: {length} caracteres</span>
                <span className="font-mono text-slate-400 text-[11px]">{length * 6} bits entropía</span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Mayúsculas (A-Z)</span>
              </label>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={lowercase}
                  onChange={(e) => setLowercase(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Minúsculas (a-z)</span>
              </label>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={numbers}
                  onChange={(e) => setNumbers(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Números (0-9)</span>
              </label>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={symbols}
                  onChange={(e) => setSymbols(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Símbolos (!@#$%)</span>
              </label>
            </div>
          </div>
        ) : (
          /* Token formats */
          <div className="space-y-2 p-4 bg-vault-900/60 rounded-2xl border border-slate-800 text-xs">
            <span className="font-semibold text-slate-300 block mb-2">Formato de Token:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTokenFormat('hex-32')}
                className={`p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                  tokenFormat === 'hex-32' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/50' : 'bg-vault-950 text-slate-400 border border-slate-800'
                }`}
              >
                <div className="font-semibold">Hex 32 chars</div>
                <div className="text-[10px] text-slate-500 font-mono">128-bit secret</div>
              </button>

              <button
                type="button"
                onClick={() => setTokenFormat('sk-bearer')}
                className={`p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                  tokenFormat === 'sk-bearer' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/50' : 'bg-vault-950 text-slate-400 border border-slate-800'
                }`}
              >
                <div className="font-semibold">Bearer Key (sk-...)</div>
                <div className="text-[10px] text-slate-500 font-mono">API Secret standard</div>
              </button>

              <button
                type="button"
                onClick={() => setTokenFormat('uuid')}
                className={`p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                  tokenFormat === 'uuid' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/50' : 'bg-vault-950 text-slate-400 border border-slate-800'
                }`}
              >
                <div className="font-semibold">UUID v4</div>
                <div className="text-[10px] text-slate-500 font-mono">Identificador único</div>
              </button>
            </div>
          </div>
        )}

      </div>
    </Modal>
  );
}
