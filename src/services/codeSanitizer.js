/**
 * Code Sanitizer & Secret Redactor Engine
 * Detects sensitive API keys in code snippets or logs and redacts them.
 */

const SECRET_PATTERNS = [
  {
    id: 'google-ai',
    name: 'Google AI Studio / Gemini Key',
    regex: /AIzaSy[A-Za-z0-9_-]{33}/g,
    suggestedVar: 'process.env.GEMINI_API_KEY',
    replacement: 'process.env.GEMINI_API_KEY'
  },
  {
    id: 'groq',
    name: 'Groq Cloud API Key',
    regex: /gsk_[A-Za-z0-9]{48,64}/g,
    suggestedVar: 'process.env.GROQ_API_KEY',
    replacement: 'process.env.GROQ_API_KEY'
  },
  {
    id: 'openai',
    name: 'OpenAI API Key',
    regex: /sk-(?:proj-)?[A-Za-z0-9_-]{32,80}/g,
    suggestedVar: 'process.env.OPENAI_API_KEY',
    replacement: 'process.env.OPENAI_API_KEY'
  },
  {
    id: 'huggingface',
    name: 'Hugging Face Token',
    regex: /hf_[A-Za-z0-9]{34,40}/g,
    suggestedVar: 'process.env.HF_TOKEN',
    replacement: 'process.env.HF_TOKEN'
  },
  {
    id: 'github-pat',
    name: 'GitHub Personal Access Token',
    regex: /gh[pousr]_[A-Za-z0-9]{36,40}/g,
    suggestedVar: 'process.env.GITHUB_TOKEN',
    replacement: 'process.env.GITHUB_TOKEN'
  },
  {
    id: 'aws-access-key',
    name: 'AWS Access Key ID',
    regex: /(?:AKIA|ABIA|ACCA|ASIA)[0-9A-Z]{16}/g,
    suggestedVar: 'process.env.AWS_ACCESS_KEY_ID',
    replacement: 'process.env.AWS_ACCESS_KEY_ID'
  }
];

export function sanitizeCode(rawCode, mode = 'env') {
  if (!rawCode || typeof rawCode !== 'string') {
    return { sanitizedText: '', detectedLeaks: [] };
  }

  let sanitizedText = rawCode;
  const detectedLeaks = [];

  SECRET_PATTERNS.forEach(pattern => {
    const matches = rawCode.match(pattern.regex);
    if (matches && matches.length > 0) {
      matches.forEach(match => {
        detectedLeaks.push({
          type: pattern.name,
          patternId: pattern.id,
          matchedValue: match.slice(0, 6) + '...' + match.slice(-4),
          suggestedVar: pattern.suggestedVar
        });

        const replaceWith = mode === 'env' 
          ? pattern.suggestedVar 
          : `"[REDACTED_${pattern.suggestedVar.split('.').pop()}]"`;

        sanitizedText = sanitizedText.replaceAll(match, replaceWith);
      });
    }
  });

  return {
    sanitizedText,
    detectedLeaks,
    leakCount: detectedLeaks.length
  };
}
