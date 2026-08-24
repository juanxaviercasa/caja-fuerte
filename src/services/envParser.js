/**
 * .env Parser & Generator Service
 * Handles reading, cleaning, parsing and formatting .env files
 */

/**
 * Parses raw .env file string into an array of secret objects
 */
export function parseEnvContent(rawText) {
  if (!rawText || typeof rawText !== 'string') return [];

  const lines = rawText.split(/\r?\n/);
  const parsedItems = [];

  let currentComment = '';

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Skip empty lines
    if (!trimmed) {
      currentComment = '';
      continue;
    }

    // Capture comments
    if (trimmed.startsWith('#')) {
      const commentText = trimmed.replace(/^#+\s*/, '');
      currentComment = currentComment ? `${currentComment}\n${commentText}` : commentText;
      continue;
    }

    // Match KEY=VALUE or export KEY=VALUE
    const match = trimmed.match(/^(?:export\s+)?([A-Za-z0-9_.-]+)\s*=\s*(.*)$/);
    if (match) {
      const key = match[1];
      let value = match[2];

      // Remove surrounding quotes if paired
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      // Unescape newlines if present
      value = value.replace(/\\n/g, '\n');

      // Auto-detect secret type
      let type = 'custom';
      let category = 'custom';

      const upperKey = key.toUpperCase();
      if (upperKey.includes('API_KEY') || upperKey.includes('TOKEN') || upperKey.includes('SECRET')) {
        type = 'api_key';
        if (upperKey.includes('GEMINI') || upperKey.includes('OPENAI') || upperKey.includes('GROQ') || upperKey.includes('HF') || upperKey.includes('CLAUDE') || upperKey.includes('ANTHROPIC')) {
          category = 'ai';
        } else {
          category = 'auth';
        }
      } else if (upperKey.includes('DATABASE') || upperKey.includes('DB_') || upperKey.includes('MONGO') || upperKey.includes('POSTGRES') || upperKey.includes('REDIS')) {
        type = 'connection_string';
        category = 'database';
      } else if (upperKey.includes('URL') || upperKey.includes('ENDPOINT') || upperKey.includes('HOST')) {
        type = 'url';
        category = upperKey.includes('SUPABASE') ? 'database' : 'cloud';
      } else if (upperKey.includes('PASSWORD') || upperKey.includes('PASS')) {
        type = 'password';
        category = 'auth';
      }

      parsedItems.push({
        key,
        value,
        title: key.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase()),
        type,
        category,
        notes: currentComment,
        environment: 'development'
      });

      currentComment = '';
    }
  }

  return parsedItems;
}

/**
 * Generates formatted .env string from a list of secret objects
 */
export function generateEnvContent(secrets, options = {}) {
  const { includeComments = true, includeHeader = true, projectName = 'Proyecto' } = options;

  let output = '';

  if (includeHeader) {
    output += `# ========================================================\n`;
    output += `# DevVault .env Bundle - ${projectName}\n`;
    output += `# Generado el: ${new Date().toLocaleString()}\n`;
    output += `# ADVERTENCIA: No subir este archivo a repositorios públicos\n`;
    output += `# ========================================================\n\n`;
  }

  // Group by category if needed
  const grouped = {};
  secrets.forEach(sec => {
    const cat = sec.category || 'general';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(sec);
  });

  const categoryTitles = {
    ai: '🧠 SERVICIOS DE INTELIGENCIA ARTIFICIAL',
    database: '🗄️ BASES DE DATOS Y CONEXIONES',
    cloud: '☁️ CLOUD, HOSTING Y SERVICIOS EXTERNOS',
    auth: '🔑 AUTENTICACIÓN, TOKENS Y SEGURIDAD',
    custom: '⚙️ CONFIGURACIONES Y VARIABLES GENERALES',
    general: '📌 VARIABLES DEL SISTEMA'
  };

  for (const [category, items] of Object.entries(grouped)) {
    if (includeComments) {
      output += `# --- ${categoryTitles[category] || category.toUpperCase()} ---\n`;
    }

    items.forEach(item => {
      const varName = item.varName || item.key || item.name || 'SECRET_KEY';
      const cleanVarName = varName.replace(/[^A-Za-z0-9_]/g, '_').toUpperCase();
      const val = item.value || '';

      if (includeComments && item.notes) {
        output += `# ${item.notes.replace(/\n/g, '\n# ')}\n`;
      }

      // Check if value requires quotes (has spaces, special characters, or multiline)
      if (val.includes(' ') || val.includes('\n') || val.includes('#') || val.includes('$')) {
        const escaped = val.replace(/"/g, '\\"').replace(/\n/g, '\\n');
        output += `${cleanVarName}="${escaped}"\n`;
      } else {
        output += `${cleanVarName}=${val}\n`;
      }
    });

    output += '\n';
  }

  return output.trimEnd() + '\n';
}

/**
 * Trigger file download directly in browser
 */
export function downloadFile(content, fileName, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
