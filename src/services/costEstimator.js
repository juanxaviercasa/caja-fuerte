/**
 * AI Cost & Token Estimator Service
 */

export const AI_PRICING_TABLE = [
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash (Google AI)',
    provider: 'Google AI',
    inputPer1M: 0.075,
    outputPer1M: 0.30,
    freeTier: 'Gratis hasta 15 RPM / 1M TPM',
    contextWindow: '1,000,000 tokens'
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro (Google AI)',
    provider: 'Google AI',
    inputPer1M: 1.25,
    outputPer1M: 5.00,
    freeTier: 'Gratis hasta 2 RPM',
    contextWindow: '2,000,000 tokens'
  },
  {
    id: 'groq-llama-3.3-70b',
    name: 'Llama 3.3 70B (Groq LPU)',
    provider: 'Groq Cloud',
    inputPer1M: 0.59,
    outputPer1M: 0.79,
    freeTier: 'Gratis con límites generosos de RPM',
    contextWindow: '128,000 tokens'
  },
  {
    id: 'groq-llama-3.1-8b',
    name: 'Llama 3.1 8B (Groq LPU)',
    provider: 'Groq Cloud',
    inputPer1M: 0.05,
    outputPer1M: 0.08,
    freeTier: 'Gratis con alta velocidad',
    contextWindow: '128,000 tokens'
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini (OpenAI)',
    provider: 'OpenAI',
    inputPer1M: 0.15,
    outputPer1M: 0.60,
    freeTier: 'Sin free tier continuo',
    contextWindow: '128,000 tokens'
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o (OpenAI)',
    provider: 'OpenAI',
    inputPer1M: 2.50,
    outputPer1M: 10.00,
    freeTier: 'Pay-as-you-go',
    contextWindow: '128,000 tokens'
  },
  {
    id: 'claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet (Anthropic)',
    provider: 'Anthropic',
    inputPer1M: 3.00,
    outputPer1M: 15.00,
    freeTier: 'Pay-as-you-go',
    contextWindow: '200,000 tokens'
  },
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3 (DeepSeek)',
    provider: 'DeepSeek',
    inputPer1M: 0.14,
    outputPer1M: 0.28,
    freeTier: 'Precios ultra económicos',
    contextWindow: '64,000 tokens'
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1 (Razonamiento)',
    provider: 'DeepSeek',
    inputPer1M: 0.55,
    outputPer1M: 2.19,
    freeTier: 'Razonamiento económico',
    contextWindow: '64,000 tokens'
  }
];

export function calculateCostEstimate({
  modelId,
  avgInputTokens = 1000,
  avgOutputTokens = 500,
  callsPerDay = 100
}) {
  const model = AI_PRICING_TABLE.find(m => m.id === modelId) || AI_PRICING_TABLE[0];

  const totalInputTokensDaily = avgInputTokens * callsPerDay;
  const totalOutputTokensDaily = avgOutputTokens * callsPerDay;

  const dailyInputCost = (totalInputTokensDaily / 1000000) * model.inputPer1M;
  const dailyOutputCost = (totalOutputTokensDaily / 1000000) * model.outputPer1M;
  const dailyTotalCost = dailyInputCost + dailyOutputCost;

  const monthlyTotalCost = dailyTotalCost * 30;
  const monthlyTokens = (totalInputTokensDaily + totalOutputTokensDaily) * 30;

  return {
    model,
    daily: {
      inputTokens: totalInputTokensDaily,
      outputTokens: totalOutputTokensDaily,
      cost: dailyTotalCost
    },
    monthly: {
      tokens: monthlyTokens,
      cost: monthlyTotalCost
    }
  };
}
