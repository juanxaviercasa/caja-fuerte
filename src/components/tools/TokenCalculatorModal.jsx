import React, { useState } from 'react';
import { Calculator, DollarSign, Cpu, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { AI_PRICING_TABLE, calculateCostEstimate } from '../../services/costEstimator';

export function TokenCalculatorModal({ isOpen, onClose }) {
  const [modelId, setModelId] = useState('gemini-1.5-flash');
  const [avgInputTokens, setAvgInputTokens] = useState(1000);
  const [avgOutputTokens, setAvgOutputTokens] = useState(500);
  const [callsPerDay, setCallsPerDay] = useState(250);

  const estimate = calculateCostEstimate({
    modelId,
    avgInputTokens,
    avgOutputTokens,
    callsPerDay
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Calculadora de Tokens y Estimador de Costos de IA"
      maxWidth="max-w-3xl"
      icon={Calculator}
    >
      <div className="space-y-6">
        
        {/* Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-vault-900/90 rounded-2xl border border-slate-800 text-xs">
          
          <div>
            <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Modelo de IA a Proyectar:
            </label>
            <select
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              className="w-full px-3 py-2 bg-vault-950 border border-slate-700 rounded-xl text-slate-100 font-semibold focus:outline-none focus:border-cyan-500"
            >
              {AI_PRICING_TABLE.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} (${m.inputPer1M}/1M in - ${m.outputPer1M}/1M out)
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-slate-300 uppercase tracking-wider">Peticiones Diarias:</span>
              <span className="font-mono text-cyan-400 font-bold">{callsPerDay} llamadas/día</span>
            </div>
            <input
              type="range"
              min="10"
              max="10000"
              step="10"
              value={callsPerDay}
              onChange={(e) => setCallsPerDay(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-slate-300">Tokens de Entrada (Prompt):</span>
              <span className="font-mono text-emerald-400 font-bold">{avgInputTokens} tokens</span>
            </div>
            <input
              type="range"
              min="100"
              max="50000"
              step="100"
              value={avgInputTokens}
              onChange={(e) => setAvgInputTokens(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-slate-300">Tokens de Salida (Respuesta):</span>
              <span className="font-mono text-amber-400 font-bold">{avgOutputTokens} tokens</span>
            </div>
            <input
              type="range"
              min="50"
              max="10000"
              step="50"
              value={avgOutputTokens}
              onChange={(e) => setAvgOutputTokens(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

        </div>

        {/* Results Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Monthly Estimate */}
          <div className="p-5 bg-gradient-to-br from-vault-900 to-vault-850 rounded-2xl border border-emerald-500/30 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Costo Mensual Estimado (30 días)</span>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-2">
                ${estimate.monthly.cost < 0.01 ? '< $0.01' : estimate.monthly.cost.toFixed(2)} USD
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {(callsPerDay * 30).toLocaleString()} llamadas totales al mes
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
              <span className="text-slate-400">Tokens mensuales: </span>
              <span className="font-mono font-semibold text-cyan-300">{(estimate.monthly.tokens).toLocaleString()} tokens</span>
            </div>
          </div>

          {/* Model Specs & Free Tier */}
          <div className="p-5 bg-vault-900/90 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <h4 className="font-bold text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{estimate.model.name}</span>
            </h4>

            <div className="space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Ventana de Contexto:</span>
                <span className="font-mono text-slate-200">{estimate.model.contextWindow}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Condición Gratuita:</span>
                <span className="text-emerald-400 font-semibold">{estimate.model.freeTier}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              💡 Para prototipos y desarrollo inicial, servicios como **Google AI Studio (Gemini Flash)** y **Groq Cloud** ofrecen límites gratuitos suficientes para correr la mayoría de aplicaciones sin costo.
            </p>
          </div>

        </div>

      </div>
    </Modal>
  );
}
