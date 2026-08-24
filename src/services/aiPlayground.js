/**
 * AI Playground Service
 * Direct client-side inference with Google Gemini, Groq, OpenAI, OpenRouter
 */

export const AI_MODELS = {
  gemini: [
    { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash (Ultrarrápido & Económico)', provider: 'gemini', default: true },
    { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro (Razonamiento Complejo)', provider: 'gemini' },
    { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash (Experimental)', provider: 'gemini' }
  ],
  groq: [
    { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B (Máxima Capacidad)', provider: 'groq', default: true },
    { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B (Inferencia Instantánea)', provider: 'groq' },
    { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B (32k Contexto)', provider: 'groq' }
  ],
  openai: [
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini (Rápido y Ligero)', provider: 'openai', default: true },
    { id: 'gpt-4o', name: 'GPT-4o (Omni Multimodal)', provider: 'openai' }
  ],
  openrouter: [
    { id: 'meta-llama/llama-3.3-70b-instruct:free', name: 'Llama 3.3 70B (Gratis :free)', provider: 'openrouter', default: true },
    { id: 'google/gemini-flash-1.5-exp:free', name: 'Gemini Flash (Gratis :free)', provider: 'openrouter' },
    { id: 'deepseek/deepseek-r1:free', name: 'DeepSeek R1 (Gratis :free)', provider: 'openrouter' }
  ]
};

export async function runPromptInference({
  provider = 'gemini',
  model,
  apiKey,
  systemPrompt = '',
  prompt,
  temperature = 0.7,
  maxTokens = 1024
}) {
  if (!apiKey) {
    throw new Error('No se ha proporcionado una API Key válida.');
  }
  if (!prompt || !prompt.trim()) {
    throw new Error('El prompt no puede estar vacío.');
  }

  const startTime = performance.now();

  try {
    switch (provider) {
      case 'gemini': {
        const modelId = model || 'gemini-1.5-flash';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${encodeURIComponent(apiKey.trim())}`;
        
        const contents = [];
        if (systemPrompt && systemPrompt.trim()) {
          contents.push({
            role: 'user',
            parts: [{ text: `[System Instruction]: ${systemPrompt}` }]
          });
          contents.push({
            role: 'model',
            parts: [{ text: 'Entendido. Procederé siguiendo estas instrucciones.' }]
          });
        }
        contents.push({
          role: 'user',
          parts: [{ text: prompt }]
        });

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature,
              maxOutputTokens: maxTokens
            }
          })
        });

        const latencyMs = Math.round(performance.now() - startTime);

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error?.message || `HTTP ${response.status}: Error de Google Gemini`);
        }

        const data = await response.json();
        const candidate = data.candidates?.[0];
        const text = candidate?.content?.parts?.map(p => p.text).join('') || 'Sin respuesta generada.';
        const usage = data.usageMetadata || {};

        return {
          success: true,
          text,
          latencyMs,
          model: modelId,
          tokens: {
            prompt: usage.promptTokenCount || 0,
            completion: usage.candidatesTokenCount || 0,
            total: usage.totalTokenCount || 0
          }
        };
      }

      case 'groq': {
        const modelId = model || 'llama-3.3-70b-versatile';
        const messages = [];
        if (systemPrompt) messages.push({ role: 'system', content: systemPrompt });
        messages.push({ role: 'user', content: prompt });

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey.trim()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: modelId,
            messages,
            temperature,
            max_tokens: maxTokens
          })
        });

        const latencyMs = Math.round(performance.now() - startTime);

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error?.message || `HTTP ${response.status}: Error de Groq`);
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content || '';
        const usage = data.usage || {};

        return {
          success: true,
          text,
          latencyMs,
          model: modelId,
          tokens: {
            prompt: usage.prompt_tokens || 0,
            completion: usage.completion_tokens || 0,
            total: usage.total_tokens || 0
          }
        };
      }

      case 'openrouter': {
        const modelId = model || 'meta-llama/llama-3.3-70b-instruct:free';
        const messages = [];
        if (systemPrompt) messages.push({ role: 'system', content: systemPrompt });
        messages.push({ role: 'user', content: prompt });

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey.trim()}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://devvault.local',
            'X-Title': 'DevVault Playground'
          },
          body: JSON.stringify({
            model: modelId,
            messages,
            temperature,
            max_tokens: maxTokens
          })
        });

        const latencyMs = Math.round(performance.now() - startTime);

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error?.message || `HTTP ${response.status}: Error de OpenRouter`);
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content || '';
        const usage = data.usage || {};

        return {
          success: true,
          text,
          latencyMs,
          model: modelId,
          tokens: {
            prompt: usage.prompt_tokens || 0,
            completion: usage.completion_tokens || 0,
            total: usage.total_tokens || 0
          }
        };
      }

      case 'openai': {
        const modelId = model || 'gpt-4o-mini';
        const messages = [];
        if (systemPrompt) messages.push({ role: 'system', content: systemPrompt });
        messages.push({ role: 'user', content: prompt });

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey.trim()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: modelId,
            messages,
            temperature,
            max_tokens: maxTokens
          })
        });

        const latencyMs = Math.round(performance.now() - startTime);

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error?.message || `HTTP ${response.status}: Error de OpenAI`);
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content || '';
        const usage = data.usage || {};

        return {
          success: true,
          text,
          latencyMs,
          model: modelId,
          tokens: {
            prompt: usage.prompt_tokens || 0,
            completion: usage.completion_tokens || 0,
            total: usage.total_tokens || 0
          }
        };
      }

      default:
        throw new Error(`Proveedor ${provider} no soportado para inferencia directa.`);
    }
  } catch (err) {
    const latencyMs = Math.round(performance.now() - startTime);
    return {
      success: false,
      error: err.message,
      latencyMs
    };
  }
}
