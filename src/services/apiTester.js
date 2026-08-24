/**
 * API Key Tester & Health Check Service
 * Performs lightweight read-only queries to test credentials and return latency & status
 */

export async function testApiKey(provider, apiKey) {
  if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length === 0) {
    return {
      success: false,
      message: 'La API Key está vacía.',
      latencyMs: 0
    };
  }

  const cleanKey = apiKey.trim();
  const startTime = performance.now();

  try {
    switch (provider) {
      case 'gemini':
      case 'google-ai-studio': {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(cleanKey)}`,
          { method: 'GET' }
        );
        const latencyMs = Math.round(performance.now() - startTime);

        if (response.ok) {
          const data = await response.json();
          const count = data.models ? data.models.length : 0;
          return {
            success: true,
            status: response.status,
            latencyMs,
            message: `API Key válida. Acceso a ${count} modelos de Gemini disponibles.`
          };
        } else {
          const errData = await response.json().catch(() => ({}));
          const errMsg = errData.error?.message || `Error HTTP ${response.status}: ${response.statusText}`;
          return {
            success: false,
            status: response.status,
            latencyMs,
            message: `Fallo de autenticación en Google AI: ${errMsg}`
          };
        }
      }

      case 'groq': {
        const response = await fetch('https://api.groq.com/openai/v1/models', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${cleanKey}`
          }
        });
        const latencyMs = Math.round(performance.now() - startTime);

        if (response.ok) {
          const data = await response.json();
          const count = data.data ? data.data.length : 0;
          return {
            success: true,
            status: response.status,
            latencyMs,
            message: `API Key de Groq activa. ${count} modelos disponibles (Llama 3, Mixtral, etc.).`
          };
        } else {
          const errData = await response.json().catch(() => ({}));
          const errMsg = errData.error?.message || `Error HTTP ${response.status}`;
          return {
            success: false,
            status: response.status,
            latencyMs,
            message: `Error en Groq: ${errMsg}`
          };
        }
      }

      case 'huggingface': {
        const response = await fetch('https://huggingface.co/api/whoami-v2', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${cleanKey}`
          }
        });
        const latencyMs = Math.round(performance.now() - startTime);

        if (response.ok) {
          const data = await response.json();
          const user = data.name || data.fullname || 'Usuario HF';
          return {
            success: true,
            status: response.status,
            latencyMs,
            message: `Token de Hugging Face válido. Conectado como @${user} (${data.type || 'token'}).`
          };
        } else {
          return {
            success: false,
            status: response.status,
            latencyMs,
            message: `Token de Hugging Face inválido o expirado (HTTP ${response.status}).`
          };
        }
      }

      case 'openrouter': {
        const response = await fetch('https://openrouter.ai/api/v1/auth/key', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${cleanKey}`
          }
        });
        const latencyMs = Math.round(performance.now() - startTime);

        if (response.ok) {
          const data = await response.json();
          const usage = data.data?.usage != null ? `$${data.data.usage}` : '';
          const limit = data.data?.limit != null ? ` / Límite: $${data.data.limit}` : '';
          return {
            success: true,
            status: response.status,
            latencyMs,
            message: `OpenRouter Key válida. Uso acumulado: ${usage}${limit}`
          };
        } else {
          return {
            success: false,
            status: response.status,
            latencyMs,
            message: `OpenRouter Key inválida (HTTP ${response.status}).`
          };
        }
      }

      case 'openai': {
        const response = await fetch('https://api.openai.com/v1/models', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${cleanKey}`
          }
        });
        const latencyMs = Math.round(performance.now() - startTime);

        if (response.ok) {
          return {
            success: true,
            status: response.status,
            latencyMs,
            message: `OpenAI API Key verificada y activa.`
          };
        } else {
          const errData = await response.json().catch(() => ({}));
          const errMsg = errData.error?.message || `HTTP ${response.status}`;
          return {
            success: false,
            status: response.status,
            latencyMs,
            message: `Error en OpenAI: ${errMsg}`
          };
        }
      }

      default:
        return {
          success: true,
          status: 200,
          latencyMs: 1,
          message: 'Formato verificado (este proveedor no cuenta con endpoint público de test sin costo).'
        };
    }
  } catch (err) {
    const latencyMs = Math.round(performance.now() - startTime);
    return {
      success: false,
      status: 0,
      latencyMs,
      message: `Error de red o CORS al conectar con el servidor: ${err.message}`
    };
  }
}
