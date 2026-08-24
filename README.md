# 🛡️ DevVault Pro Suite - Centro de Comando de Claves, IA & Entornos

**DevVault Pro Suite** es una plataforma integral, ultrarrápida y de **Conocimiento Cero (Zero-Knowledge)** diseñada con estándares de Ingeniería de Software Senior para blindar, organizar y acelerar el desarrollo de aplicaciones que consumen Inteligencia Artificial, APIs, bases de datos y entornos `.env`.

---

## 🚀 Acceso Rápido

El servidor de desarrollo ya está activo localmente:
👉 **[http://localhost:5173/](http://localhost:5173/)**

---

## 🛠️ Suite Completa de Herramientas Incluidas

### 1. 📖 Manual Interactivo & Guías Pro Integradas (In-App)
- Guía interactiva con pestañas paso a paso para aprender qué guardar, cómo obtener API keys gratis (Google AI Studio, Groq, HF, etc.), cómo estructurar archivos `.env` y buenas prácticas para Git/DevOps.

### 2. 🤖 AI Prompt & Inferencia Playground
- Prueba tus prompts y modelos de IA en vivo directamente desde tu navegador usando tus propias claves guardadas de **Google Gemini 1.5 Flash/Pro**, **Groq Cloud (LPU)**, **OpenAI (GPT-4o)** y **OpenRouter**.
- Visualiza latencia en milisegundos, conteo de tokens y respuestas en tiempo real.

### 3. 🛡️ Auditor de Seguridad & Vulnerabilidades
- Escaneo proactivo con puntuación de salud de la bóveda (0-100%).
- Detección automática de claves duplicadas, tokens débiles, contraseñas de baja entropía y credenciales no rotadas en más de 90 días con recomendaciones de remediación en 1 click.

### 4. ⚖️ Comparador Diff de Entornos (.env Diff)
- Compara en paralelo tus variables de **Desarrollo (Dev)** vs **Producción (Prod)** o **Staging** para evitar caídas del sistema por variables faltantes antes de desplegar.

### 5. 🚀 SDK & DevOps Studio
- Generador de código listo para producción en:
  - **Python**: Google GenAI, Groq SDK, LangChain.
  - **JavaScript / TypeScript**: `@google/genai`, Next.js Server Actions.
  - **Terminal**: Comandos `$env:` (PowerShell) y `export` (Bash/Zsh).
  - **DevOps**: `docker-compose.yml`, Kubernetes `Secret` YAML y GitHub Actions CI/CD.

### 6. 🧹 Sanitizador Anti-Fugas de Código & Logs
- Pega cualquier script o log antes de compartirlo en foros o GitHub para detectar y reemplazar automáticamente claves de Google, Groq, OpenAI, AWS o GitHub PATs por variables de entorno o marcadores redactados.

### 7. 💰 Calculadora de Tokens & Estimador de Costos
- Proyecta costos mensuales y consumo de tokens para todos los modelos populares según tu volumen de usuarios diarios y tamaño promedio de prompt.

### 8. 🗄️ Studio .env (Generador e Importador)
- **Generador 1-click**: Genera y descarga `.env` o plantillas `.env.example`.
- **Importador inteligente**: Pega o sube un `.env` existente y detecta automáticamente nombres, valores y categorías para cifrarlos en tu caja fuerte.

### 9. ⭐ Favoritos & 🗑️ Papelera de Reciclaje
- Fija con estrella tus claves más usadas en la cabecera.
- Eliminación suave con opción de restaurar o vaciar definitivamente.

### 10. 🔒 Criptografía Militar Zero-Knowledge
- Cifrado autenticado **AES-GCM (256 bits)**.
- Derivación mediante **PBKDF2-SHA256 con 100,000 iteraciones** y salt aleatorio.
- Auto-bloqueo configurable por inactividad y respaldos cifrados `.devvault`.

---

## 💻 Comandos de Terminal

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```
