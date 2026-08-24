/**
 * DevVault Universal API Dictionary & Catalog (220+ Curated APIs with Free Tiers)
 * Full Comprehensive Spectrum:
 * - 🧠 Modelos de Lenguaje & LLMs
 * - 🎬 Generación de Video & Animación IA
 * - 🎨 Imágenes, Arte & Generación Visual
 * - 📸 Avatares Digitales, Modelos Virtuales & Lip-Sync
 * - 🎙️ Voz, Audio, Música & Clonación
 * - 🛡️ Ciberseguridad, Threat Intel & Hacking Ético
 * - ⏳ Máquina del Tiempo, Historia & Ciencia
 * - 🔮 IA Secretas & Cómputo GPU Serverless
 * - 🔍 Scraping, Crawlers & RAG
 * - 🗄️ Bases de Datos, Vector DBs & Grafos
 * - 📊 Memoria, Agentes & Observabilidad
 * - 🔐 Autenticación & Privacidad
 * - 📧 Emails, SMS & Mensajería
 * - 💳 Pagos, Divisas & Facturación
 * - ☁️ Cloud, Hosting & DevOps
 * - 🗺️ Mapas, Geo & Clima
 * - ⚙️ Productividad & Media
 */

export const DICTIONARY_CATEGORIES = [
  { id: 'all', name: 'Todas las APIs', icon: 'Sparkles', count: '220+' },
  { id: 'ai-video-motion', name: '🎬 Video & Animación IA', icon: 'Video', color: 'text-purple-400' },
  { id: 'ai-image-art', name: '🎨 Imágenes & Arte Visual', icon: 'Image', color: 'text-pink-400' },
  { id: 'digital-humans-avatars', name: '📸 Avatares & Modelos Virtuales', icon: 'UserCheck', color: 'text-rose-400' },
  { id: 'ai-voice-music', name: '🎙️ Voz, Audio & Música IA', icon: 'Mic', color: 'text-emerald-400' },
  { id: 'cybersecurity-ethical', name: '🛡️ Ciberseguridad & Threat Intel', icon: 'ShieldAlert', color: 'text-red-400' },
  { id: 'time-machine-science', name: '⏳ Máquina del Tiempo & Ciencia', icon: 'History', color: 'text-amber-400' },
  { id: 'ai-advanced-hidden', name: '🔮 IA Secretas & GPUs Serverless', icon: 'Sparkles', color: 'text-indigo-400' },
  { id: 'ai-llm', name: '🧠 Modelos de Lenguaje & LLMs', icon: 'BrainCircuit', color: 'text-cyan-400' },
  { id: 'ai-search-scraping', name: '🔍 Scraping, Crawlers & RAG', icon: 'Search', color: 'text-yellow-400' },
  { id: 'database-vector-graph', name: '🗄️ Bases de Datos, Vector & Grafos', icon: 'Database', color: 'text-teal-400' },
  { id: 'ai-agents-memory', name: '📊 Memoria & Observabilidad IA', icon: 'Activity', color: 'text-violet-400' },
  { id: 'auth-security', name: '🔐 Autenticación & Privacidad', icon: 'ShieldCheck', color: 'text-blue-400' },
  { id: 'email-messaging', name: '📧 Emails, SMS & WebSockets', icon: 'Mail', color: 'text-sky-400' },
  { id: 'payments-fintech', name: '💳 Pagos, Divisas & Facturación', icon: 'CreditCard', color: 'text-green-400' },
  { id: 'cloud-devops', name: '☁️ Cloud, Serverless & Hosting', icon: 'Cloud', color: 'text-blue-300' },
  { id: 'maps-geo-weather', name: '🗺️ Mapas, Geolocalización & Clima', icon: 'MapPin', color: 'text-orange-400' },
  { id: 'productivity-social', name: '⚙️ Productividad & Social Media', icon: 'Layers', color: 'text-fuchsia-400' },
  { id: 'math-science-research', name: '📐 Matemáticas & Ciencia Profunda', icon: 'Calculator', color: 'text-cyan-500' },
  { id: 'robotics-hardware', name: '🤖 Robótica Autónoma & Hardware', icon: 'Cpu', color: 'text-zinc-400' },
  { id: 'patents-aerospace', name: '🚀 Patentes & Aeroespacial', icon: 'Rocket', color: 'text-red-500' }
];

export const QUICK_TAGS = [
  { id: 'all', label: 'Todos' },
  { id: 'video', label: '🎬 Video & Animación' },
  { id: 'image', label: '🎨 Imágenes & Arte' },
  { id: 'avatar', label: '📸 Avatares & Modelos' },
  { id: 'voice', label: '🎙️ Voz & Audio' },
  { id: 'security', label: '🛡️ Ciberseguridad' },
  { id: 'time', label: '⏳ Máquina del Tiempo' },
  { id: 'secret', label: '🔮 IA Secretas' },
  { id: 'llm', label: '🧠 LLMs' },
  { id: 'rag', label: '🔍 RAG & Scraping' },
  { id: 'database', label: '🗄️ Bases & Grafos' },
  { id: 'free', label: '🆓 100% Gratis' }
];

export const API_DICTIONARY = [
  {
    "id": "api_1",
    "name": "OpenAI API",
    "description": "Integración oficial para OpenAI API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "OPENAI_API_KEY",
    "nodes": 50
  },
  {
    "id": "api_2",
    "name": "Anthropic Claude API",
    "description": "Integración oficial para Anthropic Claude API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "ANTHROPIC_CLAUDE_API_KEY",
    "nodes": 8
  },
  {
    "id": "api_3",
    "name": "Google Gemini API",
    "description": "Integración oficial para Google Gemini API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "GOOGLE_GEMINI_API_KEY",
    "nodes": 28
  },
  {
    "id": "api_4",
    "name": "Groq API",
    "description": "Integración oficial para Groq API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "GROQ_API_KEY",
    "nodes": 3
  },
  {
    "id": "api_5",
    "name": "Mistral AI API",
    "description": "Integración oficial para Mistral AI API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "MISTRAL_AI_API_KEY",
    "nodes": 49
  },
  {
    "id": "api_6",
    "name": "Cohere API",
    "description": "Integración oficial para Cohere API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "COHERE_API_KEY",
    "nodes": 27
  },
  {
    "id": "api_7",
    "name": "AI21 Labs API",
    "description": "Integración oficial para AI21 Labs API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "AI21_LABS_API_KEY",
    "nodes": 15
  },
  {
    "id": "api_8",
    "name": "Together AI API",
    "description": "Integración oficial para Together AI API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "TOGETHER_AI_API_KEY",
    "nodes": 3
  },
  {
    "id": "api_9",
    "name": "Anyscale Endpoints",
    "description": "Integración oficial para Anyscale Endpoints. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "ANYSCALE_ENDPOINTS_KEY",
    "nodes": 29
  },
  {
    "id": "api_10",
    "name": "Perplexity API",
    "description": "Integración oficial para Perplexity API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "PERPLEXITY_API_KEY",
    "nodes": 17
  },
  {
    "id": "api_11",
    "name": "DeepSeek API",
    "description": "Integración oficial para DeepSeek API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "DEEPSEEK_API_KEY",
    "nodes": 18
  },
  {
    "id": "api_12",
    "name": "Replicate LLM API",
    "description": "Integración oficial para Replicate LLM API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "REPLICATE_LLM_API_KEY",
    "nodes": 46
  },
  {
    "id": "api_13",
    "name": "Hugging Face Inference API",
    "description": "Integración oficial para Hugging Face Inference API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "HUGGING_FACE_INFERENCE_API_KEY",
    "nodes": 45
  },
  {
    "id": "api_14",
    "name": "Baseten API",
    "description": "Integración oficial para Baseten API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "BASETEN_API_KEY",
    "nodes": 30
  },
  {
    "id": "api_15",
    "name": "OctoAI API",
    "description": "Integración oficial para OctoAI API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "OCTOAI_API_KEY",
    "nodes": 2
  },
  {
    "id": "api_16",
    "name": "Fireworks AI",
    "description": "Integración oficial para Fireworks AI. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "FIREWORKS_AI_KEY",
    "nodes": 16
  },
  {
    "id": "api_17",
    "name": "NVIDIA NeMo API",
    "description": "Integración oficial para NVIDIA NeMo API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "NVIDIA_NEMO_API_KEY",
    "nodes": 14
  },
  {
    "id": "api_18",
    "name": "IBM WatsonX API",
    "description": "Integración oficial para IBM WatsonX API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "IBM_WATSONX_API_KEY",
    "nodes": 30
  },
  {
    "id": "api_19",
    "name": "Amazon Bedrock API",
    "description": "Integración oficial para Amazon Bedrock API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "AMAZON_BEDROCK_API_KEY",
    "nodes": 10
  },
  {
    "id": "api_20",
    "name": "Azure OpenAI Service",
    "description": "Integración oficial para Azure OpenAI Service. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "AZURE_OPENAI_SERVICE_KEY",
    "nodes": 18
  },
  {
    "id": "api_21",
    "name": "Vertex AI API",
    "description": "Integración oficial para Vertex AI API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "VERTEX_AI_API_KEY",
    "nodes": 29
  },
  {
    "id": "api_22",
    "name": "Aleph Alpha API",
    "description": "Integración oficial para Aleph Alpha API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "ALEPH_ALPHA_API_KEY",
    "nodes": 43
  },
  {
    "id": "api_23",
    "name": "Databricks MosaicML",
    "description": "Integración oficial para Databricks MosaicML. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "DATABRICKS_MOSAICML_KEY",
    "nodes": 50
  },
  {
    "id": "api_24",
    "name": "Cerebras API",
    "description": "Integración oficial para Cerebras API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "CEREBRAS_API_KEY",
    "nodes": 13
  },
  {
    "id": "api_25",
    "name": "Inflection API",
    "description": "Integración oficial para Inflection API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "INFLECTION_API_KEY",
    "nodes": 22
  },
  {
    "id": "api_26",
    "name": "01.AI API",
    "description": "Integración oficial para 01.AI API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "01_AI_API_KEY",
    "nodes": 9
  },
  {
    "id": "api_27",
    "name": "Upstage API",
    "description": "Integración oficial para Upstage API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "UPSTAGE_API_KEY",
    "nodes": 10
  },
  {
    "id": "api_28",
    "name": "Zhipu AI API",
    "description": "Integración oficial para Zhipu AI API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "ZHIPU_AI_API_KEY",
    "nodes": 41
  },
  {
    "id": "api_29",
    "name": "Baichuan API",
    "description": "Integración oficial para Baichuan API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "BAICHUAN_API_KEY",
    "nodes": 11
  },
  {
    "id": "api_30",
    "name": "SenseNova API",
    "description": "Integración oficial para SenseNova API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-llm",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "SENSENOVA_API_KEY",
    "nodes": 23
  },
  {
    "id": "api_31",
    "name": "Runway Gen-2 API",
    "description": "Integración oficial para Runway Gen-2 API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-video-motion",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "RUNWAY_GEN_2_API_KEY",
    "nodes": 48
  },
  {
    "id": "api_32",
    "name": "Pika Labs API",
    "description": "Integración oficial para Pika Labs API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-video-motion",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "PIKA_LABS_API_KEY",
    "nodes": 21
  },
  {
    "id": "api_33",
    "name": "Luma Dream Machine API",
    "description": "Integración oficial para Luma Dream Machine API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-video-motion",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "LUMA_DREAM_MACHINE_API_KEY",
    "nodes": 36
  },
  {
    "id": "api_34",
    "name": "Kling AI API",
    "description": "Integración oficial para Kling AI API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-video-motion",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "KLING_AI_API_KEY",
    "nodes": 13
  },
  {
    "id": "api_35",
    "name": "Haiper Video API",
    "description": "Integración oficial para Haiper Video API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-video-motion",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "HAIPER_VIDEO_API_KEY",
    "nodes": 14
  },
  {
    "id": "api_36",
    "name": "HeyGen Video API",
    "description": "Integración oficial para HeyGen Video API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-video-motion",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "HEYGEN_VIDEO_API_KEY",
    "nodes": 10
  },
  {
    "id": "api_37",
    "name": "Synthesia API",
    "description": "Integración oficial para Synthesia API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-video-motion",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "SYNTHESIA_API_KEY",
    "nodes": 33
  },
  {
    "id": "api_38",
    "name": "D-ID API",
    "description": "Integración oficial para D-ID API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-video-motion",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "D_ID_API_KEY",
    "nodes": 5
  },
  {
    "id": "api_39",
    "name": "SadTalker API",
    "description": "Integración oficial para SadTalker API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-video-motion",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "SADTALKER_API_KEY",
    "nodes": 42
  },
  {
    "id": "api_40",
    "name": "GliaCloud API",
    "description": "Integración oficial para GliaCloud API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-video-motion",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "GLIACLOUD_API_KEY",
    "nodes": 18
  },
  {
    "id": "api_41",
    "name": "Elai.io API",
    "description": "Integración oficial para Elai.io API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-video-motion",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "ELAI_IO_API_KEY",
    "nodes": 3
  },
  {
    "id": "api_42",
    "name": "Colossyan API",
    "description": "Integración oficial para Colossyan API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-video-motion",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "COLOSSYAN_API_KEY",
    "nodes": 27
  },
  {
    "id": "api_43",
    "name": "Pictory API",
    "description": "Integración oficial para Pictory API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-video-motion",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "PICTORY_API_KEY",
    "nodes": 49
  },
  {
    "id": "api_44",
    "name": "InVideo API",
    "description": "Integración oficial para InVideo API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-video-motion",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "INVIDEO_API_KEY",
    "nodes": 14
  },
  {
    "id": "api_45",
    "name": "CapCut API",
    "description": "Integración oficial para CapCut API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-video-motion",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "CAPCUT_API_KEY",
    "nodes": 19
  },
  {
    "id": "api_46",
    "name": "Munch API",
    "description": "Integración oficial para Munch API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-video-motion",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "MUNCH_API_KEY",
    "nodes": 34
  },
  {
    "id": "api_47",
    "name": "Opus Clip API",
    "description": "Integración oficial para Opus Clip API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-video-motion",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "OPUS_CLIP_API_KEY",
    "nodes": 34
  },
  {
    "id": "api_48",
    "name": "Sora (Preview) API",
    "description": "Integración oficial para Sora (Preview) API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-video-motion",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "SORA__PREVIEW__API_KEY",
    "nodes": 34
  },
  {
    "id": "api_49",
    "name": "Morph Studio API",
    "description": "Integración oficial para Morph Studio API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-video-motion",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "MORPH_STUDIO_API_KEY",
    "nodes": 46
  },
  {
    "id": "api_50",
    "name": "Stable Video Diffusion API",
    "description": "Integración oficial para Stable Video Diffusion API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-video-motion",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "STABLE_VIDEO_DIFFUSION_API_KEY",
    "nodes": 11
  },
  {
    "id": "api_51",
    "name": "Midjourney (Via API platforms)",
    "description": "Integración oficial para Midjourney (Via API platforms). Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "MIDJOURNEY__VIA_API_PLATFORMS__KEY",
    "nodes": 37
  },
  {
    "id": "api_52",
    "name": "DALL-E 3 API",
    "description": "Integración oficial para DALL-E 3 API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "DALL_E_3_API_KEY",
    "nodes": 12
  },
  {
    "id": "api_53",
    "name": "Stability AI API",
    "description": "Integración oficial para Stability AI API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "STABILITY_AI_API_KEY",
    "nodes": 31
  },
  {
    "id": "api_54",
    "name": "Leonardo.ai API",
    "description": "Integración oficial para Leonardo.ai API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "LEONARDO_AI_API_KEY",
    "nodes": 47
  },
  {
    "id": "api_55",
    "name": "Civitai API",
    "description": "Integración oficial para Civitai API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "CIVITAI_API_KEY",
    "nodes": 17
  },
  {
    "id": "api_56",
    "name": "ComfyUI Cloud API",
    "description": "Integración oficial para ComfyUI Cloud API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "COMFYUI_CLOUD_API_KEY",
    "nodes": 34
  },
  {
    "id": "api_57",
    "name": "Photoroom API",
    "description": "Integración oficial para Photoroom API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "PHOTOROOM_API_KEY",
    "nodes": 12
  },
  {
    "id": "api_58",
    "name": "Clipdrop API",
    "description": "Integración oficial para Clipdrop API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "CLIPDROP_API_KEY",
    "nodes": 26
  },
  {
    "id": "api_59",
    "name": "Canva Developers API",
    "description": "Integración oficial para Canva Developers API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "CANVA_DEVELOPERS_API_KEY",
    "nodes": 49
  },
  {
    "id": "api_60",
    "name": "Adobe Firefly API",
    "description": "Integración oficial para Adobe Firefly API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "ADOBE_FIREFLY_API_KEY",
    "nodes": 16
  },
  {
    "id": "api_61",
    "name": "Bria AI API",
    "description": "Integración oficial para Bria AI API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "BRIA_AI_API_KEY",
    "nodes": 17
  },
  {
    "id": "api_62",
    "name": "Ideogram API",
    "description": "Integración oficial para Ideogram API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "IDEOGRAM_API_KEY",
    "nodes": 9
  },
  {
    "id": "api_63",
    "name": "Recraft API",
    "description": "Integración oficial para Recraft API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "RECRAFT_API_KEY",
    "nodes": 7
  },
  {
    "id": "api_64",
    "name": "Playground AI API",
    "description": "Integración oficial para Playground AI API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "PLAYGROUND_AI_API_KEY",
    "nodes": 32
  },
  {
    "id": "api_65",
    "name": "Krea AI API",
    "description": "Integración oficial para Krea AI API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "KREA_AI_API_KEY",
    "nodes": 22
  },
  {
    "id": "api_66",
    "name": "Magnific AI API",
    "description": "Integración oficial para Magnific AI API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "MAGNIFIC_AI_API_KEY",
    "nodes": 35
  },
  {
    "id": "api_67",
    "name": "Topaz Labs API",
    "description": "Integración oficial para Topaz Labs API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "TOPAZ_LABS_API_KEY",
    "nodes": 20
  },
  {
    "id": "api_68",
    "name": "Viggle API",
    "description": "Integración oficial para Viggle API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "VIGGLE_API_KEY",
    "nodes": 30
  },
  {
    "id": "api_69",
    "name": "Fal.ai API",
    "description": "Integración oficial para Fal.ai API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "FAL_AI_API_KEY",
    "nodes": 23
  },
  {
    "id": "api_70",
    "name": "Scenario.com API",
    "description": "Integración oficial para Scenario.com API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "SCENARIO_COM_API_KEY",
    "nodes": 42
  },
  {
    "id": "api_71",
    "name": "Artbreeder API",
    "description": "Integración oficial para Artbreeder API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "ARTBREEDER_API_KEY",
    "nodes": 32
  },
  {
    "id": "api_72",
    "name": "NightCafe API",
    "description": "Integración oficial para NightCafe API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "NIGHTCAFE_API_KEY",
    "nodes": 46
  },
  {
    "id": "api_73",
    "name": "DeepDream API",
    "description": "Integración oficial para DeepDream API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "DEEPDREAM_API_KEY",
    "nodes": 48
  },
  {
    "id": "api_74",
    "name": "Remove.bg API",
    "description": "Integración oficial para Remove.bg API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "REMOVE_BG_API_KEY",
    "nodes": 43
  },
  {
    "id": "api_75",
    "name": "Let's Enhance API",
    "description": "Integración oficial para Let's Enhance API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-image-art",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "LET_S_ENHANCE_API_KEY",
    "nodes": 5
  },
  {
    "id": "api_76",
    "name": "ElevenLabs API",
    "description": "Integración oficial para ElevenLabs API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "ELEVENLABS_API_KEY",
    "nodes": 26
  },
  {
    "id": "api_77",
    "name": "OpenAI Whisper API",
    "description": "Integración oficial para OpenAI Whisper API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "OPENAI_WHISPER_API_KEY",
    "nodes": 8
  },
  {
    "id": "api_78",
    "name": "PlayHT API",
    "description": "Integración oficial para PlayHT API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "PLAYHT_API_KEY",
    "nodes": 42
  },
  {
    "id": "api_79",
    "name": "Resemble AI API",
    "description": "Integración oficial para Resemble AI API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "RESEMBLE_AI_API_KEY",
    "nodes": 28
  },
  {
    "id": "api_80",
    "name": "Murf.ai API",
    "description": "Integración oficial para Murf.ai API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "MURF_AI_API_KEY",
    "nodes": 15
  },
  {
    "id": "api_81",
    "name": "Suno API",
    "description": "Integración oficial para Suno API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "SUNO_API_KEY",
    "nodes": 4
  },
  {
    "id": "api_82",
    "name": "Udio API",
    "description": "Integración oficial para Udio API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "UDIO_API_KEY",
    "nodes": 3
  },
  {
    "id": "api_83",
    "name": "AssemblyAI API",
    "description": "Integración oficial para AssemblyAI API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "ASSEMBLYAI_API_KEY",
    "nodes": 17
  },
  {
    "id": "api_84",
    "name": "Deepgram API",
    "description": "Integración oficial para Deepgram API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "DEEPGRAM_API_KEY",
    "nodes": 22
  },
  {
    "id": "api_85",
    "name": "Rev.ai API",
    "description": "Integración oficial para Rev.ai API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "REV_AI_API_KEY",
    "nodes": 20
  },
  {
    "id": "api_86",
    "name": "Descript API",
    "description": "Integración oficial para Descript API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "DESCRIPT_API_KEY",
    "nodes": 28
  },
  {
    "id": "api_87",
    "name": "WellSaid Labs API",
    "description": "Integración oficial para WellSaid Labs API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "WELLSAID_LABS_API_KEY",
    "nodes": 36
  },
  {
    "id": "api_88",
    "name": "Lovo.ai API",
    "description": "Integración oficial para Lovo.ai API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "LOVO_AI_API_KEY",
    "nodes": 1
  },
  {
    "id": "api_89",
    "name": "Coqui TTS API",
    "description": "Integración oficial para Coqui TTS API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "COQUI_TTS_API_KEY",
    "nodes": 11
  },
  {
    "id": "api_90",
    "name": "Bark (Suno) API",
    "description": "Integración oficial para Bark (Suno) API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "BARK__SUNO__API_KEY",
    "nodes": 17
  },
  {
    "id": "api_91",
    "name": "AudioLM API",
    "description": "Integración oficial para AudioLM API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "AUDIOLM_API_KEY",
    "nodes": 40
  },
  {
    "id": "api_92",
    "name": "VALL-E API",
    "description": "Integración oficial para VALL-E API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "VALL_E_API_KEY",
    "nodes": 36
  },
  {
    "id": "api_93",
    "name": "Google Cloud Text-to-Speech",
    "description": "Integración oficial para Google Cloud Text-to-Speech. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "GOOGLE_CLOUD_TEXT_TO_SPEECH_KEY",
    "nodes": 27
  },
  {
    "id": "api_94",
    "name": "Amazon Polly API",
    "description": "Integración oficial para Amazon Polly API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "AMAZON_POLLY_API_KEY",
    "nodes": 36
  },
  {
    "id": "api_95",
    "name": "Azure Speech API",
    "description": "Integración oficial para Azure Speech API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "AZURE_SPEECH_API_KEY",
    "nodes": 2
  },
  {
    "id": "api_96",
    "name": "IBM Watson Speech",
    "description": "Integración oficial para IBM Watson Speech. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "IBM_WATSON_SPEECH_KEY",
    "nodes": 47
  },
  {
    "id": "api_97",
    "name": "Speechify API",
    "description": "Integración oficial para Speechify API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "SPEECHIFY_API_KEY",
    "nodes": 40
  },
  {
    "id": "api_98",
    "name": "Altered Studio API",
    "description": "Integración oficial para Altered Studio API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "ALTERED_STUDIO_API_KEY",
    "nodes": 19
  },
  {
    "id": "api_99",
    "name": "Voice-Cloning API",
    "description": "Integración oficial para Voice-Cloning API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "VOICE_CLONING_API_KEY",
    "nodes": 46
  },
  {
    "id": "api_100",
    "name": "Podcastle API",
    "description": "Integración oficial para Podcastle API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-voice-music",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "PODCASTLE_API_KEY",
    "nodes": 41
  },
  {
    "id": "api_101",
    "name": "Inworld AI API",
    "description": "Integración oficial para Inworld AI API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "digital-humans-avatars",
    "isFreeTier": true,
    "tags": [
      "digital",
      "api"
    ],
    "defaultVarName": "INWORLD_AI_API_KEY",
    "nodes": 17
  },
  {
    "id": "api_102",
    "name": "Character.ai API",
    "description": "Integración oficial para Character.ai API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "digital-humans-avatars",
    "isFreeTier": true,
    "tags": [
      "digital",
      "api"
    ],
    "defaultVarName": "CHARACTER_AI_API_KEY",
    "nodes": 22
  },
  {
    "id": "api_103",
    "name": "Replika API",
    "description": "Integración oficial para Replika API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "digital-humans-avatars",
    "isFreeTier": false,
    "tags": [
      "digital",
      "api"
    ],
    "defaultVarName": "REPLIKA_API_KEY",
    "nodes": 16
  },
  {
    "id": "api_104",
    "name": "Soul Machines API",
    "description": "Integración oficial para Soul Machines API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "digital-humans-avatars",
    "isFreeTier": true,
    "tags": [
      "digital",
      "api"
    ],
    "defaultVarName": "SOUL_MACHINES_API_KEY",
    "nodes": 50
  },
  {
    "id": "api_105",
    "name": "Uneeq API",
    "description": "Integración oficial para Uneeq API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "digital-humans-avatars",
    "isFreeTier": true,
    "tags": [
      "digital",
      "api"
    ],
    "defaultVarName": "UNEEQ_API_KEY",
    "nodes": 19
  },
  {
    "id": "api_106",
    "name": "VRChat API",
    "description": "Integración oficial para VRChat API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "digital-humans-avatars",
    "isFreeTier": false,
    "tags": [
      "digital",
      "api"
    ],
    "defaultVarName": "VRCHAT_API_KEY",
    "nodes": 40
  },
  {
    "id": "api_107",
    "name": "Ready Player Me API",
    "description": "Integración oficial para Ready Player Me API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "digital-humans-avatars",
    "isFreeTier": true,
    "tags": [
      "digital",
      "api"
    ],
    "defaultVarName": "READY_PLAYER_ME_API_KEY",
    "nodes": 7
  },
  {
    "id": "api_108",
    "name": "Avaturn API",
    "description": "Integración oficial para Avaturn API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "digital-humans-avatars",
    "isFreeTier": true,
    "tags": [
      "digital",
      "api"
    ],
    "defaultVarName": "AVATURN_API_KEY",
    "nodes": 6
  },
  {
    "id": "api_109",
    "name": "Wolf3D API",
    "description": "Integración oficial para Wolf3D API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "digital-humans-avatars",
    "isFreeTier": false,
    "tags": [
      "digital",
      "api"
    ],
    "defaultVarName": "WOLF3D_API_KEY",
    "nodes": 22
  },
  {
    "id": "api_110",
    "name": "Didimo API",
    "description": "Integración oficial para Didimo API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "digital-humans-avatars",
    "isFreeTier": true,
    "tags": [
      "digital",
      "api"
    ],
    "defaultVarName": "DIDIMO_API_KEY",
    "nodes": 43
  },
  {
    "id": "api_111",
    "name": "Pinscreen API",
    "description": "Integración oficial para Pinscreen API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "digital-humans-avatars",
    "isFreeTier": true,
    "tags": [
      "digital",
      "api"
    ],
    "defaultVarName": "PINSCREEN_API_KEY",
    "nodes": 39
  },
  {
    "id": "api_112",
    "name": "DeepMotion API",
    "description": "Integración oficial para DeepMotion API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "digital-humans-avatars",
    "isFreeTier": false,
    "tags": [
      "digital",
      "api"
    ],
    "defaultVarName": "DEEPMOTION_API_KEY",
    "nodes": 4
  },
  {
    "id": "api_113",
    "name": "Kinetix API",
    "description": "Integración oficial para Kinetix API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "digital-humans-avatars",
    "isFreeTier": true,
    "tags": [
      "digital",
      "api"
    ],
    "defaultVarName": "KINETIX_API_KEY",
    "nodes": 47
  },
  {
    "id": "api_114",
    "name": "Anything World API",
    "description": "Integración oficial para Anything World API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "digital-humans-avatars",
    "isFreeTier": true,
    "tags": [
      "digital",
      "api"
    ],
    "defaultVarName": "ANYTHING_WORLD_API_KEY",
    "nodes": 1
  },
  {
    "id": "api_115",
    "name": "MetaHuman Creator API",
    "description": "Integración oficial para MetaHuman Creator API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "digital-humans-avatars",
    "isFreeTier": false,
    "tags": [
      "digital",
      "api"
    ],
    "defaultVarName": "METAHUMAN_CREATOR_API_KEY",
    "nodes": 14
  },
  {
    "id": "api_116",
    "name": "Shodan API",
    "description": "Integración oficial para Shodan API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": true,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "SHODAN_API_KEY",
    "nodes": 36
  },
  {
    "id": "api_117",
    "name": "Censys API",
    "description": "Integración oficial para Censys API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": true,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "CENSYS_API_KEY",
    "nodes": 14
  },
  {
    "id": "api_118",
    "name": "GreyNoise API",
    "description": "Integración oficial para GreyNoise API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": false,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "GREYNOISE_API_KEY",
    "nodes": 50
  },
  {
    "id": "api_119",
    "name": "VirusTotal API",
    "description": "Integración oficial para VirusTotal API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": true,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "VIRUSTOTAL_API_KEY",
    "nodes": 15
  },
  {
    "id": "api_120",
    "name": "AlienVault OTX API",
    "description": "Integración oficial para AlienVault OTX API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": true,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "ALIENVAULT_OTX_API_KEY",
    "nodes": 39
  },
  {
    "id": "api_121",
    "name": "HaveIBeenPwned API",
    "description": "Integración oficial para HaveIBeenPwned API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": false,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "HAVEIBEENPWNED_API_KEY",
    "nodes": 17
  },
  {
    "id": "api_122",
    "name": "SecurityTrails API",
    "description": "Integración oficial para SecurityTrails API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": true,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "SECURITYTRAILS_API_KEY",
    "nodes": 41
  },
  {
    "id": "api_123",
    "name": "Hunter.io API",
    "description": "Integración oficial para Hunter.io API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": true,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "HUNTER_IO_API_KEY",
    "nodes": 47
  },
  {
    "id": "api_124",
    "name": "Spyse API",
    "description": "Integración oficial para Spyse API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": false,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "SPYSE_API_KEY",
    "nodes": 23
  },
  {
    "id": "api_125",
    "name": "URLScan.io API",
    "description": "Integración oficial para URLScan.io API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": true,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "URLSCAN_IO_API_KEY",
    "nodes": 4
  },
  {
    "id": "api_126",
    "name": "AbuseIPDB API",
    "description": "Integración oficial para AbuseIPDB API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": true,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "ABUSEIPDB_API_KEY",
    "nodes": 23
  },
  {
    "id": "api_127",
    "name": "PhishTank API",
    "description": "Integración oficial para PhishTank API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": false,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "PHISHTANK_API_KEY",
    "nodes": 2
  },
  {
    "id": "api_128",
    "name": "CrowdStrike Falcon API",
    "description": "Integración oficial para CrowdStrike Falcon API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": true,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "CROWDSTRIKE_FALCON_API_KEY",
    "nodes": 44
  },
  {
    "id": "api_129",
    "name": "Palo Alto Cortex API",
    "description": "Integración oficial para Palo Alto Cortex API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": true,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "PALO_ALTO_CORTEX_API_KEY",
    "nodes": 19
  },
  {
    "id": "api_130",
    "name": "Tenable API",
    "description": "Integración oficial para Tenable API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": false,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "TENABLE_API_KEY",
    "nodes": 12
  },
  {
    "id": "api_131",
    "name": "Qualys API",
    "description": "Integración oficial para Qualys API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": true,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "QUALYS_API_KEY",
    "nodes": 4
  },
  {
    "id": "api_132",
    "name": "Rapid7 API",
    "description": "Integración oficial para Rapid7 API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": true,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "RAPID7_API_KEY",
    "nodes": 30
  },
  {
    "id": "api_133",
    "name": "Datadog Security API",
    "description": "Integración oficial para Datadog Security API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": false,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "DATADOG_SECURITY_API_KEY",
    "nodes": 6
  },
  {
    "id": "api_134",
    "name": "Splunk API",
    "description": "Integración oficial para Splunk API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": true,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "SPLUNK_API_KEY",
    "nodes": 34
  },
  {
    "id": "api_135",
    "name": "Elastic Security API",
    "description": "Integración oficial para Elastic Security API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": true,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "ELASTIC_SECURITY_API_KEY",
    "nodes": 32
  },
  {
    "id": "api_136",
    "name": "Wiz API",
    "description": "Integración oficial para Wiz API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": false,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "WIZ_API_KEY",
    "nodes": 12
  },
  {
    "id": "api_137",
    "name": "Snyk API",
    "description": "Integración oficial para Snyk API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": true,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "SNYK_API_KEY",
    "nodes": 16
  },
  {
    "id": "api_138",
    "name": "Veracode API",
    "description": "Integración oficial para Veracode API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": true,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "VERACODE_API_KEY",
    "nodes": 49
  },
  {
    "id": "api_139",
    "name": "Checkmarx API",
    "description": "Integración oficial para Checkmarx API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": false,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "CHECKMARX_API_KEY",
    "nodes": 28
  },
  {
    "id": "api_140",
    "name": "SonarQube API",
    "description": "Integración oficial para SonarQube API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": true,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "SONARQUBE_API_KEY",
    "nodes": 36
  },
  {
    "id": "api_141",
    "name": "GitHub Advanced Security API",
    "description": "Integración oficial para GitHub Advanced Security API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": true,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "GITHUB_ADVANCED_SECURITY_API_KEY",
    "nodes": 20
  },
  {
    "id": "api_142",
    "name": "GitLab Security API",
    "description": "Integración oficial para GitLab Security API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": false,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "GITLAB_SECURITY_API_KEY",
    "nodes": 30
  },
  {
    "id": "api_143",
    "name": "Aqua Security API",
    "description": "Integración oficial para Aqua Security API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": true,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "AQUA_SECURITY_API_KEY",
    "nodes": 16
  },
  {
    "id": "api_144",
    "name": "Lacework API",
    "description": "Integración oficial para Lacework API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": true,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "LACEWORK_API_KEY",
    "nodes": 34
  },
  {
    "id": "api_145",
    "name": "Prisma Cloud API",
    "description": "Integración oficial para Prisma Cloud API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cybersecurity-ethical",
    "isFreeTier": false,
    "tags": [
      "cybersecurity",
      "api"
    ],
    "defaultVarName": "PRISMA_CLOUD_API_KEY",
    "nodes": 34
  },
  {
    "id": "api_146",
    "name": "Wayback Machine API",
    "description": "Integración oficial para Wayback Machine API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "time-machine-science",
    "isFreeTier": true,
    "tags": [
      "time",
      "api"
    ],
    "defaultVarName": "WAYBACK_MACHINE_API_KEY",
    "nodes": 14
  },
  {
    "id": "api_147",
    "name": "NASA Open APIs",
    "description": "Integración oficial para NASA Open APIs. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "time-machine-science",
    "isFreeTier": true,
    "tags": [
      "time",
      "api"
    ],
    "defaultVarName": "NASA_OPEN_APIS_KEY",
    "nodes": 43
  },
  {
    "id": "api_148",
    "name": "AlphaFold API",
    "description": "Integración oficial para AlphaFold API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "time-machine-science",
    "isFreeTier": false,
    "tags": [
      "time",
      "api"
    ],
    "defaultVarName": "ALPHAFOLD_API_KEY",
    "nodes": 42
  },
  {
    "id": "api_149",
    "name": "OpenAlex API",
    "description": "Integración oficial para OpenAlex API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "time-machine-science",
    "isFreeTier": true,
    "tags": [
      "time",
      "api"
    ],
    "defaultVarName": "OPENALEX_API_KEY",
    "nodes": 22
  },
  {
    "id": "api_150",
    "name": "NCBI E-utilities",
    "description": "Integración oficial para NCBI E-utilities. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "time-machine-science",
    "isFreeTier": true,
    "tags": [
      "time",
      "api"
    ],
    "defaultVarName": "NCBI_E_UTILITIES_KEY",
    "nodes": 44
  },
  {
    "id": "api_151",
    "name": "PubMed API",
    "description": "Integración oficial para PubMed API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "time-machine-science",
    "isFreeTier": false,
    "tags": [
      "time",
      "api"
    ],
    "defaultVarName": "PUBMED_API_KEY",
    "nodes": 23
  },
  {
    "id": "api_152",
    "name": "Europe PMC API",
    "description": "Integración oficial para Europe PMC API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "time-machine-science",
    "isFreeTier": true,
    "tags": [
      "time",
      "api"
    ],
    "defaultVarName": "EUROPE_PMC_API_KEY",
    "nodes": 46
  },
  {
    "id": "api_153",
    "name": "ArXiv API",
    "description": "Integración oficial para ArXiv API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "time-machine-science",
    "isFreeTier": true,
    "tags": [
      "time",
      "api"
    ],
    "defaultVarName": "ARXIV_API_KEY",
    "nodes": 11
  },
  {
    "id": "api_154",
    "name": "Crossref API",
    "description": "Integración oficial para Crossref API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "time-machine-science",
    "isFreeTier": false,
    "tags": [
      "time",
      "api"
    ],
    "defaultVarName": "CROSSREF_API_KEY",
    "nodes": 34
  },
  {
    "id": "api_155",
    "name": "Wikidata API",
    "description": "Integración oficial para Wikidata API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "time-machine-science",
    "isFreeTier": true,
    "tags": [
      "time",
      "api"
    ],
    "defaultVarName": "WIKIDATA_API_KEY",
    "nodes": 6
  },
  {
    "id": "api_156",
    "name": "OpenStreetMap API",
    "description": "Integración oficial para OpenStreetMap API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "time-machine-science",
    "isFreeTier": true,
    "tags": [
      "time",
      "api"
    ],
    "defaultVarName": "OPENSTREETMAP_API_KEY",
    "nodes": 12
  },
  {
    "id": "api_157",
    "name": "SpaceX API",
    "description": "Integración oficial para SpaceX API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "time-machine-science",
    "isFreeTier": false,
    "tags": [
      "time",
      "api"
    ],
    "defaultVarName": "SPACEX_API_KEY",
    "nodes": 43
  },
  {
    "id": "api_158",
    "name": "Open Notify API",
    "description": "Integración oficial para Open Notify API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "time-machine-science",
    "isFreeTier": true,
    "tags": [
      "time",
      "api"
    ],
    "defaultVarName": "OPEN_NOTIFY_API_KEY",
    "nodes": 46
  },
  {
    "id": "api_159",
    "name": "Global Biodiversity API",
    "description": "Integración oficial para Global Biodiversity API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "time-machine-science",
    "isFreeTier": true,
    "tags": [
      "time",
      "api"
    ],
    "defaultVarName": "GLOBAL_BIODIVERSITY_API_KEY",
    "nodes": 20
  },
  {
    "id": "api_160",
    "name": "Kaggle API",
    "description": "Integración oficial para Kaggle API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "time-machine-science",
    "isFreeTier": false,
    "tags": [
      "time",
      "api"
    ],
    "defaultVarName": "KAGGLE_API_KEY",
    "nodes": 29
  },
  {
    "id": "api_161",
    "name": "Apify API",
    "description": "Integración oficial para Apify API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "APIFY_API_KEY",
    "nodes": 6
  },
  {
    "id": "api_162",
    "name": "BrightData API",
    "description": "Integración oficial para BrightData API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "BRIGHTDATA_API_KEY",
    "nodes": 23
  },
  {
    "id": "api_163",
    "name": "ScrapingBee API",
    "description": "Integración oficial para ScrapingBee API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "SCRAPINGBEE_API_KEY",
    "nodes": 20
  },
  {
    "id": "api_164",
    "name": "ScraperAPI",
    "description": "Integración oficial para ScraperAPI. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "SCRAPERAPI_KEY",
    "nodes": 39
  },
  {
    "id": "api_165",
    "name": "ZenRows API",
    "description": "Integración oficial para ZenRows API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "ZENROWS_API_KEY",
    "nodes": 33
  },
  {
    "id": "api_166",
    "name": "Oxylabs API",
    "description": "Integración oficial para Oxylabs API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "OXYLABS_API_KEY",
    "nodes": 1
  },
  {
    "id": "api_167",
    "name": "Zyte API",
    "description": "Integración oficial para Zyte API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "ZYTE_API_KEY",
    "nodes": 25
  },
  {
    "id": "api_168",
    "name": "Tavily Search API",
    "description": "Integración oficial para Tavily Search API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "TAVILY_SEARCH_API_KEY",
    "nodes": 28
  },
  {
    "id": "api_169",
    "name": "Exa (Metaphor) API",
    "description": "Integración oficial para Exa (Metaphor) API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "EXA__METAPHOR__API_KEY",
    "nodes": 36
  },
  {
    "id": "api_170",
    "name": "Brave Search API",
    "description": "Integración oficial para Brave Search API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "BRAVE_SEARCH_API_KEY",
    "nodes": 40
  },
  {
    "id": "api_171",
    "name": "Google Custom Search API",
    "description": "Integración oficial para Google Custom Search API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "GOOGLE_CUSTOM_SEARCH_API_KEY",
    "nodes": 47
  },
  {
    "id": "api_172",
    "name": "Bing Search API",
    "description": "Integración oficial para Bing Search API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "BING_SEARCH_API_KEY",
    "nodes": 29
  },
  {
    "id": "api_173",
    "name": "SerpApi",
    "description": "Integración oficial para SerpApi. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "SERPAPI_KEY",
    "nodes": 11
  },
  {
    "id": "api_174",
    "name": "DataForSEO API",
    "description": "Integración oficial para DataForSEO API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "DATAFORSEO_API_KEY",
    "nodes": 1
  },
  {
    "id": "api_175",
    "name": "Diffbot API",
    "description": "Integración oficial para Diffbot API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "DIFFBOT_API_KEY",
    "nodes": 48
  },
  {
    "id": "api_176",
    "name": "Jina Reader API",
    "description": "Integración oficial para Jina Reader API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "JINA_READER_API_KEY",
    "nodes": 33
  },
  {
    "id": "api_177",
    "name": "Firecrawl API",
    "description": "Integración oficial para Firecrawl API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "FIRECRAWL_API_KEY",
    "nodes": 5
  },
  {
    "id": "api_178",
    "name": "Crawl4AI API",
    "description": "Integración oficial para Crawl4AI API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "CRAWL4AI_API_KEY",
    "nodes": 14
  },
  {
    "id": "api_179",
    "name": "LlamaIndex API",
    "description": "Integración oficial para LlamaIndex API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "LLAMAINDEX_API_KEY",
    "nodes": 39
  },
  {
    "id": "api_180",
    "name": "LangChain API",
    "description": "Integración oficial para LangChain API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "LANGCHAIN_API_KEY",
    "nodes": 13
  },
  {
    "id": "api_181",
    "name": "Cohere RAG API",
    "description": "Integración oficial para Cohere RAG API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "COHERE_RAG_API_KEY",
    "nodes": 34
  },
  {
    "id": "api_182",
    "name": "Pinecone Inference API",
    "description": "Integración oficial para Pinecone Inference API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "PINECONE_INFERENCE_API_KEY",
    "nodes": 13
  },
  {
    "id": "api_183",
    "name": "Weaviate API",
    "description": "Integración oficial para Weaviate API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "WEAVIATE_API_KEY",
    "nodes": 1
  },
  {
    "id": "api_184",
    "name": "Qdrant API",
    "description": "Integración oficial para Qdrant API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": false,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "QDRANT_API_KEY",
    "nodes": 41
  },
  {
    "id": "api_185",
    "name": "Milvus API",
    "description": "Integración oficial para Milvus API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "ai-search-scraping",
    "isFreeTier": true,
    "tags": [
      "ai",
      "api"
    ],
    "defaultVarName": "MILVUS_API_KEY",
    "nodes": 35
  },
  {
    "id": "api_186",
    "name": "Supabase API",
    "description": "Integración oficial para Supabase API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": true,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "SUPABASE_API_KEY",
    "nodes": 9
  },
  {
    "id": "api_187",
    "name": "Firebase API",
    "description": "Integración oficial para Firebase API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": false,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "FIREBASE_API_KEY",
    "nodes": 48
  },
  {
    "id": "api_188",
    "name": "MongoDB Atlas API",
    "description": "Integración oficial para MongoDB Atlas API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": true,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "MONGODB_ATLAS_API_KEY",
    "nodes": 41
  },
  {
    "id": "api_189",
    "name": "PlanetScale API",
    "description": "Integración oficial para PlanetScale API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": true,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "PLANETSCALE_API_KEY",
    "nodes": 1
  },
  {
    "id": "api_190",
    "name": "Neon Postgres API",
    "description": "Integración oficial para Neon Postgres API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": false,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "NEON_POSTGRES_API_KEY",
    "nodes": 17
  },
  {
    "id": "api_191",
    "name": "Turso API",
    "description": "Integración oficial para Turso API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": true,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "TURSO_API_KEY",
    "nodes": 35
  },
  {
    "id": "api_192",
    "name": "Xata API",
    "description": "Integración oficial para Xata API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": true,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "XATA_API_KEY",
    "nodes": 6
  },
  {
    "id": "api_193",
    "name": "Upstash API",
    "description": "Integración oficial para Upstash API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": false,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "UPSTASH_API_KEY",
    "nodes": 6
  },
  {
    "id": "api_194",
    "name": "Redis Enterprise API",
    "description": "Integración oficial para Redis Enterprise API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": true,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "REDIS_ENTERPRISE_API_KEY",
    "nodes": 23
  },
  {
    "id": "api_195",
    "name": "Memfault API",
    "description": "Integración oficial para Memfault API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": true,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "MEMFAULT_API_KEY",
    "nodes": 30
  },
  {
    "id": "api_196",
    "name": "AWS DynamoDB API",
    "description": "Integración oficial para AWS DynamoDB API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": false,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "AWS_DYNAMODB_API_KEY",
    "nodes": 41
  },
  {
    "id": "api_197",
    "name": "Google Cloud Firestore",
    "description": "Integración oficial para Google Cloud Firestore. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": true,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "GOOGLE_CLOUD_FIRESTORE_KEY",
    "nodes": 42
  },
  {
    "id": "api_198",
    "name": "Azure Cosmos DB API",
    "description": "Integración oficial para Azure Cosmos DB API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": true,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "AZURE_COSMOS_DB_API_KEY",
    "nodes": 28
  },
  {
    "id": "api_199",
    "name": "Cloudflare D1 API",
    "description": "Integración oficial para Cloudflare D1 API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": false,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "CLOUDFLARE_D1_API_KEY",
    "nodes": 18
  },
  {
    "id": "api_200",
    "name": "SurrealDB API",
    "description": "Integración oficial para SurrealDB API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": true,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "SURREALDB_API_KEY",
    "nodes": 42
  },
  {
    "id": "api_201",
    "name": "ArangoDB API",
    "description": "Integración oficial para ArangoDB API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": true,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "ARANGODB_API_KEY",
    "nodes": 17
  },
  {
    "id": "api_202",
    "name": "Neo4j Aura API",
    "description": "Integración oficial para Neo4j Aura API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": false,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "NEO4J_AURA_API_KEY",
    "nodes": 36
  },
  {
    "id": "api_203",
    "name": "TigerGraph API",
    "description": "Integración oficial para TigerGraph API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": true,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "TIGERGRAPH_API_KEY",
    "nodes": 43
  },
  {
    "id": "api_204",
    "name": "Chroma API",
    "description": "Integración oficial para Chroma API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": true,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "CHROMA_API_KEY",
    "nodes": 40
  },
  {
    "id": "api_205",
    "name": "Zilliz API",
    "description": "Integración oficial para Zilliz API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": false,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "ZILLIZ_API_KEY",
    "nodes": 18
  },
  {
    "id": "api_206",
    "name": "Astra DB (DataStax) API",
    "description": "Integración oficial para Astra DB (DataStax) API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": true,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "ASTRA_DB__DATASTAX__API_KEY",
    "nodes": 34
  },
  {
    "id": "api_207",
    "name": "SingleStore API",
    "description": "Integración oficial para SingleStore API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": true,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "SINGLESTORE_API_KEY",
    "nodes": 13
  },
  {
    "id": "api_208",
    "name": "Snowflake API",
    "description": "Integración oficial para Snowflake API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": false,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "SNOWFLAKE_API_KEY",
    "nodes": 24
  },
  {
    "id": "api_209",
    "name": "BigQuery API",
    "description": "Integración oficial para BigQuery API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": true,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "BIGQUERY_API_KEY",
    "nodes": 15
  },
  {
    "id": "api_210",
    "name": "Redshift API",
    "description": "Integración oficial para Redshift API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "database-vector-graph",
    "isFreeTier": true,
    "tags": [
      "database",
      "api"
    ],
    "defaultVarName": "REDSHIFT_API_KEY",
    "nodes": 36
  },
  {
    "id": "api_211",
    "name": "Clerk API",
    "description": "Integración oficial para Clerk API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "auth-security",
    "isFreeTier": false,
    "tags": [
      "auth",
      "api"
    ],
    "defaultVarName": "CLERK_API_KEY",
    "nodes": 40
  },
  {
    "id": "api_212",
    "name": "Auth0 API",
    "description": "Integración oficial para Auth0 API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "auth-security",
    "isFreeTier": true,
    "tags": [
      "auth",
      "api"
    ],
    "defaultVarName": "AUTH0_API_KEY",
    "nodes": 40
  },
  {
    "id": "api_213",
    "name": "Kinde API",
    "description": "Integración oficial para Kinde API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "auth-security",
    "isFreeTier": true,
    "tags": [
      "auth",
      "api"
    ],
    "defaultVarName": "KINDE_API_KEY",
    "nodes": 40
  },
  {
    "id": "api_214",
    "name": "Stytch API",
    "description": "Integración oficial para Stytch API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "auth-security",
    "isFreeTier": false,
    "tags": [
      "auth",
      "api"
    ],
    "defaultVarName": "STYTCH_API_KEY",
    "nodes": 5
  },
  {
    "id": "api_215",
    "name": "WorkOS API",
    "description": "Integración oficial para WorkOS API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "auth-security",
    "isFreeTier": true,
    "tags": [
      "auth",
      "api"
    ],
    "defaultVarName": "WORKOS_API_KEY",
    "nodes": 3
  },
  {
    "id": "api_216",
    "name": "Okta API",
    "description": "Integración oficial para Okta API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "auth-security",
    "isFreeTier": true,
    "tags": [
      "auth",
      "api"
    ],
    "defaultVarName": "OKTA_API_KEY",
    "nodes": 14
  },
  {
    "id": "api_217",
    "name": "Ping Identity API",
    "description": "Integración oficial para Ping Identity API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "auth-security",
    "isFreeTier": false,
    "tags": [
      "auth",
      "api"
    ],
    "defaultVarName": "PING_IDENTITY_API_KEY",
    "nodes": 1
  },
  {
    "id": "api_218",
    "name": "Firebase Auth API",
    "description": "Integración oficial para Firebase Auth API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "auth-security",
    "isFreeTier": true,
    "tags": [
      "auth",
      "api"
    ],
    "defaultVarName": "FIREBASE_AUTH_API_KEY",
    "nodes": 27
  },
  {
    "id": "api_219",
    "name": "Supabase Auth API",
    "description": "Integración oficial para Supabase Auth API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "auth-security",
    "isFreeTier": true,
    "tags": [
      "auth",
      "api"
    ],
    "defaultVarName": "SUPABASE_AUTH_API_KEY",
    "nodes": 25
  },
  {
    "id": "api_220",
    "name": "AWS Cognito API",
    "description": "Integración oficial para AWS Cognito API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "auth-security",
    "isFreeTier": false,
    "tags": [
      "auth",
      "api"
    ],
    "defaultVarName": "AWS_COGNITO_API_KEY",
    "nodes": 42
  },
  {
    "id": "api_221",
    "name": "Azure AD API",
    "description": "Integración oficial para Azure AD API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "auth-security",
    "isFreeTier": true,
    "tags": [
      "auth",
      "api"
    ],
    "defaultVarName": "AZURE_AD_API_KEY",
    "nodes": 3
  },
  {
    "id": "api_222",
    "name": "Ory API",
    "description": "Integración oficial para Ory API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "auth-security",
    "isFreeTier": true,
    "tags": [
      "auth",
      "api"
    ],
    "defaultVarName": "ORY_API_KEY",
    "nodes": 24
  },
  {
    "id": "api_223",
    "name": "Logto API",
    "description": "Integración oficial para Logto API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "auth-security",
    "isFreeTier": false,
    "tags": [
      "auth",
      "api"
    ],
    "defaultVarName": "LOGTO_API_KEY",
    "nodes": 49
  },
  {
    "id": "api_224",
    "name": "Frontegg API",
    "description": "Integración oficial para Frontegg API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "auth-security",
    "isFreeTier": true,
    "tags": [
      "auth",
      "api"
    ],
    "defaultVarName": "FRONTEGG_API_KEY",
    "nodes": 27
  },
  {
    "id": "api_225",
    "name": "Descope API",
    "description": "Integración oficial para Descope API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "auth-security",
    "isFreeTier": true,
    "tags": [
      "auth",
      "api"
    ],
    "defaultVarName": "DESCOPE_API_KEY",
    "nodes": 14
  },
  {
    "id": "api_226",
    "name": "Magic.link API",
    "description": "Integración oficial para Magic.link API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "auth-security",
    "isFreeTier": false,
    "tags": [
      "auth",
      "api"
    ],
    "defaultVarName": "MAGIC_LINK_API_KEY",
    "nodes": 37
  },
  {
    "id": "api_227",
    "name": "Web3Auth API",
    "description": "Integración oficial para Web3Auth API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "auth-security",
    "isFreeTier": true,
    "tags": [
      "auth",
      "api"
    ],
    "defaultVarName": "WEB3AUTH_API_KEY",
    "nodes": 8
  },
  {
    "id": "api_228",
    "name": "Asgardeo API",
    "description": "Integración oficial para Asgardeo API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "auth-security",
    "isFreeTier": true,
    "tags": [
      "auth",
      "api"
    ],
    "defaultVarName": "ASGARDEO_API_KEY",
    "nodes": 28
  },
  {
    "id": "api_229",
    "name": "Keycloak API",
    "description": "Integración oficial para Keycloak API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "auth-security",
    "isFreeTier": false,
    "tags": [
      "auth",
      "api"
    ],
    "defaultVarName": "KEYCLOAK_API_KEY",
    "nodes": 41
  },
  {
    "id": "api_230",
    "name": "Authelia API",
    "description": "Integración oficial para Authelia API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "auth-security",
    "isFreeTier": true,
    "tags": [
      "auth",
      "api"
    ],
    "defaultVarName": "AUTHELIA_API_KEY",
    "nodes": 12
  },
  {
    "id": "api_231",
    "name": "Stripe API",
    "description": "Integración oficial para Stripe API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "payments-fintech",
    "isFreeTier": true,
    "tags": [
      "payments",
      "api"
    ],
    "defaultVarName": "STRIPE_API_KEY",
    "nodes": 24
  },
  {
    "id": "api_232",
    "name": "PayPal API",
    "description": "Integración oficial para PayPal API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "payments-fintech",
    "isFreeTier": false,
    "tags": [
      "payments",
      "api"
    ],
    "defaultVarName": "PAYPAL_API_KEY",
    "nodes": 5
  },
  {
    "id": "api_233",
    "name": "Braintree API",
    "description": "Integración oficial para Braintree API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "payments-fintech",
    "isFreeTier": true,
    "tags": [
      "payments",
      "api"
    ],
    "defaultVarName": "BRAINTREE_API_KEY",
    "nodes": 27
  },
  {
    "id": "api_234",
    "name": "Adyen API",
    "description": "Integración oficial para Adyen API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "payments-fintech",
    "isFreeTier": true,
    "tags": [
      "payments",
      "api"
    ],
    "defaultVarName": "ADYEN_API_KEY",
    "nodes": 4
  },
  {
    "id": "api_235",
    "name": "Square API",
    "description": "Integración oficial para Square API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "payments-fintech",
    "isFreeTier": false,
    "tags": [
      "payments",
      "api"
    ],
    "defaultVarName": "SQUARE_API_KEY",
    "nodes": 33
  },
  {
    "id": "api_236",
    "name": "Razorpay API",
    "description": "Integración oficial para Razorpay API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "payments-fintech",
    "isFreeTier": true,
    "tags": [
      "payments",
      "api"
    ],
    "defaultVarName": "RAZORPAY_API_KEY",
    "nodes": 23
  },
  {
    "id": "api_237",
    "name": "Plaid API",
    "description": "Integración oficial para Plaid API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "payments-fintech",
    "isFreeTier": true,
    "tags": [
      "payments",
      "api"
    ],
    "defaultVarName": "PLAID_API_KEY",
    "nodes": 6
  },
  {
    "id": "api_238",
    "name": "Coinbase Commerce API",
    "description": "Integración oficial para Coinbase Commerce API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "payments-fintech",
    "isFreeTier": false,
    "tags": [
      "payments",
      "api"
    ],
    "defaultVarName": "COINBASE_COMMERCE_API_KEY",
    "nodes": 34
  },
  {
    "id": "api_239",
    "name": "Binance Pay API",
    "description": "Integración oficial para Binance Pay API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "payments-fintech",
    "isFreeTier": true,
    "tags": [
      "payments",
      "api"
    ],
    "defaultVarName": "BINANCE_PAY_API_KEY",
    "nodes": 14
  },
  {
    "id": "api_240",
    "name": "MercadoPago API",
    "description": "Integración oficial para MercadoPago API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "payments-fintech",
    "isFreeTier": true,
    "tags": [
      "payments",
      "api"
    ],
    "defaultVarName": "MERCADOPAGO_API_KEY",
    "nodes": 28
  },
  {
    "id": "api_241",
    "name": "Paddle API",
    "description": "Integración oficial para Paddle API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "payments-fintech",
    "isFreeTier": false,
    "tags": [
      "payments",
      "api"
    ],
    "defaultVarName": "PADDLE_API_KEY",
    "nodes": 35
  },
  {
    "id": "api_242",
    "name": "Lemon Squeezy API",
    "description": "Integración oficial para Lemon Squeezy API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "payments-fintech",
    "isFreeTier": true,
    "tags": [
      "payments",
      "api"
    ],
    "defaultVarName": "LEMON_SQUEEZY_API_KEY",
    "nodes": 12
  },
  {
    "id": "api_243",
    "name": "Chargebee API",
    "description": "Integración oficial para Chargebee API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "payments-fintech",
    "isFreeTier": true,
    "tags": [
      "payments",
      "api"
    ],
    "defaultVarName": "CHARGEBEE_API_KEY",
    "nodes": 36
  },
  {
    "id": "api_244",
    "name": "Recurly API",
    "description": "Integración oficial para Recurly API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "payments-fintech",
    "isFreeTier": false,
    "tags": [
      "payments",
      "api"
    ],
    "defaultVarName": "RECURLY_API_KEY",
    "nodes": 19
  },
  {
    "id": "api_245",
    "name": "Alpaca API",
    "description": "Integración oficial para Alpaca API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "payments-fintech",
    "isFreeTier": true,
    "tags": [
      "payments",
      "api"
    ],
    "defaultVarName": "ALPACA_API_KEY",
    "nodes": 40
  },
  {
    "id": "api_246",
    "name": "Polygon.io API",
    "description": "Integración oficial para Polygon.io API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "payments-fintech",
    "isFreeTier": true,
    "tags": [
      "payments",
      "api"
    ],
    "defaultVarName": "POLYGON_IO_API_KEY",
    "nodes": 29
  },
  {
    "id": "api_247",
    "name": "Finnhub API",
    "description": "Integración oficial para Finnhub API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "payments-fintech",
    "isFreeTier": false,
    "tags": [
      "payments",
      "api"
    ],
    "defaultVarName": "FINNHUB_API_KEY",
    "nodes": 12
  },
  {
    "id": "api_248",
    "name": "IEX Cloud API",
    "description": "Integración oficial para IEX Cloud API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "payments-fintech",
    "isFreeTier": true,
    "tags": [
      "payments",
      "api"
    ],
    "defaultVarName": "IEX_CLOUD_API_KEY",
    "nodes": 44
  },
  {
    "id": "api_249",
    "name": "Yodlee API",
    "description": "Integración oficial para Yodlee API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "payments-fintech",
    "isFreeTier": true,
    "tags": [
      "payments",
      "api"
    ],
    "defaultVarName": "YODLEE_API_KEY",
    "nodes": 24
  },
  {
    "id": "api_250",
    "name": "Tink API",
    "description": "Integración oficial para Tink API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "payments-fintech",
    "isFreeTier": false,
    "tags": [
      "payments",
      "api"
    ],
    "defaultVarName": "TINK_API_KEY",
    "nodes": 16
  },
  {
    "id": "api_251",
    "name": "Resend API",
    "description": "Integración oficial para Resend API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": true,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "RESEND_API_KEY",
    "nodes": 25
  },
  {
    "id": "api_252",
    "name": "SendGrid API",
    "description": "Integración oficial para SendGrid API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": true,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "SENDGRID_API_KEY",
    "nodes": 47
  },
  {
    "id": "api_253",
    "name": "Mailgun API",
    "description": "Integración oficial para Mailgun API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": false,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "MAILGUN_API_KEY",
    "nodes": 43
  },
  {
    "id": "api_254",
    "name": "Postmark API",
    "description": "Integración oficial para Postmark API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": true,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "POSTMARK_API_KEY",
    "nodes": 41
  },
  {
    "id": "api_255",
    "name": "Amazon SES API",
    "description": "Integración oficial para Amazon SES API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": true,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "AMAZON_SES_API_KEY",
    "nodes": 21
  },
  {
    "id": "api_256",
    "name": "Twilio API",
    "description": "Integración oficial para Twilio API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": false,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "TWILIO_API_KEY",
    "nodes": 24
  },
  {
    "id": "api_257",
    "name": "MessageBird API",
    "description": "Integración oficial para MessageBird API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": true,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "MESSAGEBIRD_API_KEY",
    "nodes": 6
  },
  {
    "id": "api_258",
    "name": "Plivo API",
    "description": "Integración oficial para Plivo API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": true,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "PLIVO_API_KEY",
    "nodes": 10
  },
  {
    "id": "api_259",
    "name": "Vonage API",
    "description": "Integración oficial para Vonage API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": false,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "VONAGE_API_KEY",
    "nodes": 1
  },
  {
    "id": "api_260",
    "name": "Sinch API",
    "description": "Integración oficial para Sinch API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": true,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "SINCH_API_KEY",
    "nodes": 35
  },
  {
    "id": "api_261",
    "name": "Telnyx API",
    "description": "Integración oficial para Telnyx API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": true,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "TELNYX_API_KEY",
    "nodes": 28
  },
  {
    "id": "api_262",
    "name": "Bandwidth API",
    "description": "Integración oficial para Bandwidth API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": false,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "BANDWIDTH_API_KEY",
    "nodes": 19
  },
  {
    "id": "api_263",
    "name": "Pusher API",
    "description": "Integración oficial para Pusher API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": true,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "PUSHER_API_KEY",
    "nodes": 13
  },
  {
    "id": "api_264",
    "name": "Ably API",
    "description": "Integración oficial para Ably API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": true,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "ABLY_API_KEY",
    "nodes": 21
  },
  {
    "id": "api_265",
    "name": "Stream API",
    "description": "Integración oficial para Stream API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": false,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "STREAM_API_KEY",
    "nodes": 37
  },
  {
    "id": "api_266",
    "name": "Sendbird API",
    "description": "Integración oficial para Sendbird API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": true,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "SENDBIRD_API_KEY",
    "nodes": 31
  },
  {
    "id": "api_267",
    "name": "Socket.io Cloud API",
    "description": "Integración oficial para Socket.io Cloud API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": true,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "SOCKET_IO_CLOUD_API_KEY",
    "nodes": 34
  },
  {
    "id": "api_268",
    "name": "PubNub API",
    "description": "Integración oficial para PubNub API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": false,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "PUBNUB_API_KEY",
    "nodes": 28
  },
  {
    "id": "api_269",
    "name": "Firebase Cloud Messaging",
    "description": "Integración oficial para Firebase Cloud Messaging. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": true,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "FIREBASE_CLOUD_MESSAGING_KEY",
    "nodes": 17
  },
  {
    "id": "api_270",
    "name": "OneSignal API",
    "description": "Integración oficial para OneSignal API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": true,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "ONESIGNAL_API_KEY",
    "nodes": 29
  },
  {
    "id": "api_271",
    "name": "Courier API",
    "description": "Integración oficial para Courier API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": false,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "COURIER_API_KEY",
    "nodes": 44
  },
  {
    "id": "api_272",
    "name": "Novu API",
    "description": "Integración oficial para Novu API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": true,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "NOVU_API_KEY",
    "nodes": 6
  },
  {
    "id": "api_273",
    "name": "Knock API",
    "description": "Integración oficial para Knock API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": true,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "KNOCK_API_KEY",
    "nodes": 7
  },
  {
    "id": "api_274",
    "name": "SuprSend API",
    "description": "Integración oficial para SuprSend API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": false,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "SUPRSEND_API_KEY",
    "nodes": 48
  },
  {
    "id": "api_275",
    "name": "MagicBell API",
    "description": "Integración oficial para MagicBell API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "email-messaging",
    "isFreeTier": true,
    "tags": [
      "email",
      "api"
    ],
    "defaultVarName": "MAGICBELL_API_KEY",
    "nodes": 45
  },
  {
    "id": "api_276",
    "name": "Vercel API",
    "description": "Integración oficial para Vercel API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": true,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "VERCEL_API_KEY",
    "nodes": 50
  },
  {
    "id": "api_277",
    "name": "Netlify API",
    "description": "Integración oficial para Netlify API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": false,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "NETLIFY_API_KEY",
    "nodes": 14
  },
  {
    "id": "api_278",
    "name": "Render API",
    "description": "Integración oficial para Render API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": true,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "RENDER_API_KEY",
    "nodes": 6
  },
  {
    "id": "api_279",
    "name": "Fly.io API",
    "description": "Integración oficial para Fly.io API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": true,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "FLY_IO_API_KEY",
    "nodes": 31
  },
  {
    "id": "api_280",
    "name": "Railway API",
    "description": "Integración oficial para Railway API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": false,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "RAILWAY_API_KEY",
    "nodes": 24
  },
  {
    "id": "api_281",
    "name": "Heroku API",
    "description": "Integración oficial para Heroku API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": true,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "HEROKU_API_KEY",
    "nodes": 3
  },
  {
    "id": "api_282",
    "name": "DigitalOcean API",
    "description": "Integración oficial para DigitalOcean API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": true,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "DIGITALOCEAN_API_KEY",
    "nodes": 26
  },
  {
    "id": "api_283",
    "name": "Linode API",
    "description": "Integración oficial para Linode API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": false,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "LINODE_API_KEY",
    "nodes": 6
  },
  {
    "id": "api_284",
    "name": "Vultr API",
    "description": "Integración oficial para Vultr API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": true,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "VULTR_API_KEY",
    "nodes": 2
  },
  {
    "id": "api_285",
    "name": "Hetzner Cloud API",
    "description": "Integración oficial para Hetzner Cloud API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": true,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "HETZNER_CLOUD_API_KEY",
    "nodes": 43
  },
  {
    "id": "api_286",
    "name": "AWS EC2 API",
    "description": "Integración oficial para AWS EC2 API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": false,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "AWS_EC2_API_KEY",
    "nodes": 44
  },
  {
    "id": "api_287",
    "name": "AWS Lambda API",
    "description": "Integración oficial para AWS Lambda API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": true,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "AWS_LAMBDA_API_KEY",
    "nodes": 23
  },
  {
    "id": "api_288",
    "name": "Google Cloud Run API",
    "description": "Integración oficial para Google Cloud Run API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": true,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "GOOGLE_CLOUD_RUN_API_KEY",
    "nodes": 41
  },
  {
    "id": "api_289",
    "name": "Azure Functions API",
    "description": "Integración oficial para Azure Functions API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": false,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "AZURE_FUNCTIONS_API_KEY",
    "nodes": 1
  },
  {
    "id": "api_290",
    "name": "Cloudflare Workers API",
    "description": "Integración oficial para Cloudflare Workers API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": true,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "CLOUDFLARE_WORKERS_API_KEY",
    "nodes": 3
  },
  {
    "id": "api_291",
    "name": "Fastly API",
    "description": "Integración oficial para Fastly API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": true,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "FASTLY_API_KEY",
    "nodes": 36
  },
  {
    "id": "api_292",
    "name": "Akamai API",
    "description": "Integración oficial para Akamai API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": false,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "AKAMAI_API_KEY",
    "nodes": 40
  },
  {
    "id": "api_293",
    "name": "Supabase Edge Functions",
    "description": "Integración oficial para Supabase Edge Functions. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": true,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "SUPABASE_EDGE_FUNCTIONS_KEY",
    "nodes": 5
  },
  {
    "id": "api_294",
    "name": "Deno Deploy API",
    "description": "Integración oficial para Deno Deploy API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": true,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "DENO_DEPLOY_API_KEY",
    "nodes": 3
  },
  {
    "id": "api_295",
    "name": "Val Town API",
    "description": "Integración oficial para Val Town API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": false,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "VAL_TOWN_API_KEY",
    "nodes": 39
  },
  {
    "id": "api_296",
    "name": "Koyeb API",
    "description": "Integración oficial para Koyeb API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": true,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "KOYEB_API_KEY",
    "nodes": 38
  },
  {
    "id": "api_297",
    "name": "Northflank API",
    "description": "Integración oficial para Northflank API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": true,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "NORTHFLANK_API_KEY",
    "nodes": 4
  },
  {
    "id": "api_298",
    "name": "Zeabur API",
    "description": "Integración oficial para Zeabur API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": false,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "ZEABUR_API_KEY",
    "nodes": 47
  },
  {
    "id": "api_299",
    "name": "Qovery API",
    "description": "Integración oficial para Qovery API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": true,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "QOVERY_API_KEY",
    "nodes": 25
  },
  {
    "id": "api_300",
    "name": "Porter API",
    "description": "Integración oficial para Porter API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "cloud-devops",
    "isFreeTier": true,
    "tags": [
      "cloud",
      "api"
    ],
    "defaultVarName": "PORTER_API_KEY",
    "nodes": 28
  },
  {
    "id": "api_301",
    "name": "Google Maps API",
    "description": "Integración oficial para Google Maps API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "maps-geo-weather",
    "isFreeTier": false,
    "tags": [
      "maps",
      "api"
    ],
    "defaultVarName": "GOOGLE_MAPS_API_KEY",
    "nodes": 16
  },
  {
    "id": "api_302",
    "name": "Mapbox API",
    "description": "Integración oficial para Mapbox API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "maps-geo-weather",
    "isFreeTier": true,
    "tags": [
      "maps",
      "api"
    ],
    "defaultVarName": "MAPBOX_API_KEY",
    "nodes": 42
  },
  {
    "id": "api_303",
    "name": "OpenWeatherMap API",
    "description": "Integración oficial para OpenWeatherMap API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "maps-geo-weather",
    "isFreeTier": true,
    "tags": [
      "maps",
      "api"
    ],
    "defaultVarName": "OPENWEATHERMAP_API_KEY",
    "nodes": 30
  },
  {
    "id": "api_304",
    "name": "TomTom API",
    "description": "Integración oficial para TomTom API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "maps-geo-weather",
    "isFreeTier": false,
    "tags": [
      "maps",
      "api"
    ],
    "defaultVarName": "TOMTOM_API_KEY",
    "nodes": 25
  },
  {
    "id": "api_305",
    "name": "HERE Technologies API",
    "description": "Integración oficial para HERE Technologies API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "maps-geo-weather",
    "isFreeTier": true,
    "tags": [
      "maps",
      "api"
    ],
    "defaultVarName": "HERE_TECHNOLOGIES_API_KEY",
    "nodes": 32
  },
  {
    "id": "api_306",
    "name": "Meteomatics API",
    "description": "Integración oficial para Meteomatics API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "maps-geo-weather",
    "isFreeTier": true,
    "tags": [
      "maps",
      "api"
    ],
    "defaultVarName": "METEOMATICS_API_KEY",
    "nodes": 41
  },
  {
    "id": "api_307",
    "name": "WeatherAPI.com",
    "description": "Integración oficial para WeatherAPI.com. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "maps-geo-weather",
    "isFreeTier": false,
    "tags": [
      "maps",
      "api"
    ],
    "defaultVarName": "WEATHERAPI_COM_KEY",
    "nodes": 11
  },
  {
    "id": "api_308",
    "name": "AccuWeather API",
    "description": "Integración oficial para AccuWeather API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "maps-geo-weather",
    "isFreeTier": true,
    "tags": [
      "maps",
      "api"
    ],
    "defaultVarName": "ACCUWEATHER_API_KEY",
    "nodes": 8
  },
  {
    "id": "api_309",
    "name": "Tomorrow.io API",
    "description": "Integración oficial para Tomorrow.io API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "maps-geo-weather",
    "isFreeTier": true,
    "tags": [
      "maps",
      "api"
    ],
    "defaultVarName": "TOMORROW_IO_API_KEY",
    "nodes": 18
  },
  {
    "id": "api_310",
    "name": "Radar API",
    "description": "Integración oficial para Radar API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "maps-geo-weather",
    "isFreeTier": false,
    "tags": [
      "maps",
      "api"
    ],
    "defaultVarName": "RADAR_API_KEY",
    "nodes": 29
  },
  {
    "id": "api_311",
    "name": "Foursquare API",
    "description": "Integración oficial para Foursquare API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "maps-geo-weather",
    "isFreeTier": true,
    "tags": [
      "maps",
      "api"
    ],
    "defaultVarName": "FOURSQUARE_API_KEY",
    "nodes": 32
  },
  {
    "id": "api_312",
    "name": "Yelp Fusion API",
    "description": "Integración oficial para Yelp Fusion API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "maps-geo-weather",
    "isFreeTier": true,
    "tags": [
      "maps",
      "api"
    ],
    "defaultVarName": "YELP_FUSION_API_KEY",
    "nodes": 14
  },
  {
    "id": "api_313",
    "name": "ArcGIS API",
    "description": "Integración oficial para ArcGIS API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "maps-geo-weather",
    "isFreeTier": false,
    "tags": [
      "maps",
      "api"
    ],
    "defaultVarName": "ARCGIS_API_KEY",
    "nodes": 31
  },
  {
    "id": "api_314",
    "name": "Stadia Maps API",
    "description": "Integración oficial para Stadia Maps API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "maps-geo-weather",
    "isFreeTier": true,
    "tags": [
      "maps",
      "api"
    ],
    "defaultVarName": "STADIA_MAPS_API_KEY",
    "nodes": 10
  },
  {
    "id": "api_315",
    "name": "LocationIQ API",
    "description": "Integración oficial para LocationIQ API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "maps-geo-weather",
    "isFreeTier": true,
    "tags": [
      "maps",
      "api"
    ],
    "defaultVarName": "LOCATIONIQ_API_KEY",
    "nodes": 25
  },
  {
    "id": "api_316",
    "name": "Geocodio API",
    "description": "Integración oficial para Geocodio API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "maps-geo-weather",
    "isFreeTier": false,
    "tags": [
      "maps",
      "api"
    ],
    "defaultVarName": "GEOCODIO_API_KEY",
    "nodes": 17
  },
  {
    "id": "api_317",
    "name": "IPinfo API",
    "description": "Integración oficial para IPinfo API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "maps-geo-weather",
    "isFreeTier": true,
    "tags": [
      "maps",
      "api"
    ],
    "defaultVarName": "IPINFO_API_KEY",
    "nodes": 49
  },
  {
    "id": "api_318",
    "name": "MaxMind API",
    "description": "Integración oficial para MaxMind API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "maps-geo-weather",
    "isFreeTier": true,
    "tags": [
      "maps",
      "api"
    ],
    "defaultVarName": "MAXMIND_API_KEY",
    "nodes": 7
  },
  {
    "id": "api_319",
    "name": "Abstract IP Geolocation API",
    "description": "Integración oficial para Abstract IP Geolocation API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "maps-geo-weather",
    "isFreeTier": false,
    "tags": [
      "maps",
      "api"
    ],
    "defaultVarName": "ABSTRACT_IP_GEOLOCATION_API_KEY",
    "nodes": 39
  },
  {
    "id": "api_320",
    "name": "OpenRouteService API",
    "description": "Integración oficial para OpenRouteService API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "maps-geo-weather",
    "isFreeTier": true,
    "tags": [
      "maps",
      "api"
    ],
    "defaultVarName": "OPENROUTESERVICE_API_KEY",
    "nodes": 13
  },
  {
    "id": "api_321",
    "name": "Slack API",
    "description": "Integración oficial para Slack API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "SLACK_API_KEY",
    "nodes": 35
  },
  {
    "id": "api_322",
    "name": "Discord API",
    "description": "Integración oficial para Discord API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": false,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "DISCORD_API_KEY",
    "nodes": 49
  },
  {
    "id": "api_323",
    "name": "Microsoft Graph API",
    "description": "Integración oficial para Microsoft Graph API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "MICROSOFT_GRAPH_API_KEY",
    "nodes": 40
  },
  {
    "id": "api_324",
    "name": "Google Workspace API",
    "description": "Integración oficial para Google Workspace API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "GOOGLE_WORKSPACE_API_KEY",
    "nodes": 43
  },
  {
    "id": "api_325",
    "name": "Notion API",
    "description": "Integración oficial para Notion API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": false,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "NOTION_API_KEY",
    "nodes": 19
  },
  {
    "id": "api_326",
    "name": "Airtable API",
    "description": "Integración oficial para Airtable API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "AIRTABLE_API_KEY",
    "nodes": 27
  },
  {
    "id": "api_327",
    "name": "Trello API",
    "description": "Integración oficial para Trello API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "TRELLO_API_KEY",
    "nodes": 9
  },
  {
    "id": "api_328",
    "name": "Asana API",
    "description": "Integración oficial para Asana API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": false,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "ASANA_API_KEY",
    "nodes": 23
  },
  {
    "id": "api_329",
    "name": "Monday.com API",
    "description": "Integración oficial para Monday.com API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "MONDAY_COM_API_KEY",
    "nodes": 40
  },
  {
    "id": "api_330",
    "name": "ClickUp API",
    "description": "Integración oficial para ClickUp API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "CLICKUP_API_KEY",
    "nodes": 19
  },
  {
    "id": "api_331",
    "name": "Jira API",
    "description": "Integración oficial para Jira API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": false,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "JIRA_API_KEY",
    "nodes": 26
  },
  {
    "id": "api_332",
    "name": "Confluence API",
    "description": "Integración oficial para Confluence API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "CONFLUENCE_API_KEY",
    "nodes": 26
  },
  {
    "id": "api_333",
    "name": "Linear API",
    "description": "Integración oficial para Linear API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "LINEAR_API_KEY",
    "nodes": 27
  },
  {
    "id": "api_334",
    "name": "GitHub API",
    "description": "Integración oficial para GitHub API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": false,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "GITHUB_API_KEY",
    "nodes": 29
  },
  {
    "id": "api_335",
    "name": "GitLab API",
    "description": "Integración oficial para GitLab API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "GITLAB_API_KEY",
    "nodes": 42
  },
  {
    "id": "api_336",
    "name": "Bitbucket API",
    "description": "Integración oficial para Bitbucket API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "BITBUCKET_API_KEY",
    "nodes": 48
  },
  {
    "id": "api_337",
    "name": "Figma API",
    "description": "Integración oficial para Figma API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": false,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "FIGMA_API_KEY",
    "nodes": 48
  },
  {
    "id": "api_338",
    "name": "Miro API",
    "description": "Integración oficial para Miro API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "MIRO_API_KEY",
    "nodes": 33
  },
  {
    "id": "api_339",
    "name": "Zoom API",
    "description": "Integración oficial para Zoom API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "ZOOM_API_KEY",
    "nodes": 11
  },
  {
    "id": "api_340",
    "name": "Webex API",
    "description": "Integración oficial para Webex API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": false,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "WEBEX_API_KEY",
    "nodes": 2
  },
  {
    "id": "api_341",
    "name": "Twitch API",
    "description": "Integración oficial para Twitch API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "TWITCH_API_KEY",
    "nodes": 22
  },
  {
    "id": "api_342",
    "name": "YouTube Data API",
    "description": "Integración oficial para YouTube Data API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "YOUTUBE_DATA_API_KEY",
    "nodes": 16
  },
  {
    "id": "api_343",
    "name": "Twitter/X API",
    "description": "Integración oficial para Twitter/X API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": false,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "TWITTER_X_API_KEY",
    "nodes": 8
  },
  {
    "id": "api_344",
    "name": "Reddit API",
    "description": "Integración oficial para Reddit API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "REDDIT_API_KEY",
    "nodes": 21
  },
  {
    "id": "api_345",
    "name": "LinkedIn API",
    "description": "Integración oficial para LinkedIn API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "LINKEDIN_API_KEY",
    "nodes": 34
  },
  {
    "id": "api_346",
    "name": "Facebook Graph API",
    "description": "Integración oficial para Facebook Graph API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": false,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "FACEBOOK_GRAPH_API_KEY",
    "nodes": 23
  },
  {
    "id": "api_347",
    "name": "Instagram API",
    "description": "Integración oficial para Instagram API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "INSTAGRAM_API_KEY",
    "nodes": 12
  },
  {
    "id": "api_348",
    "name": "TikTok API",
    "description": "Integración oficial para TikTok API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "TIKTOK_API_KEY",
    "nodes": 28
  },
  {
    "id": "api_349",
    "name": "Pinterest API",
    "description": "Integración oficial para Pinterest API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": false,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "PINTEREST_API_KEY",
    "nodes": 49
  },
  {
    "id": "api_350",
    "name": "Spotify API",
    "description": "Integración oficial para Spotify API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "SPOTIFY_API_KEY",
    "nodes": 35
  },
  {
    "id": "api_351",
    "name": "Apple Music API",
    "description": "Integración oficial para Apple Music API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "APPLE_MUSIC_API_KEY",
    "nodes": 20
  },
  {
    "id": "api_352",
    "name": "Zendesk API",
    "description": "Integración oficial para Zendesk API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": false,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "ZENDESK_API_KEY",
    "nodes": 6
  },
  {
    "id": "api_353",
    "name": "Intercom API",
    "description": "Integración oficial para Intercom API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "INTERCOM_API_KEY",
    "nodes": 7
  },
  {
    "id": "api_354",
    "name": "HubSpot API",
    "description": "Integración oficial para HubSpot API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "HUBSPOT_API_KEY",
    "nodes": 49
  },
  {
    "id": "api_355",
    "name": "Salesforce API",
    "description": "Integración oficial para Salesforce API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": false,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "SALESFORCE_API_KEY",
    "nodes": 41
  },
  {
    "id": "api_356",
    "name": "Shopify API",
    "description": "Integración oficial para Shopify API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "SHOPIFY_API_KEY",
    "nodes": 34
  },
  {
    "id": "api_357",
    "name": "WooCommerce API",
    "description": "Integración oficial para WooCommerce API. Utilizada ampliamente en entornos de desarrollo profesional.",
    "category": "productivity-social",
    "isFreeTier": true,
    "tags": [
      "productivity",
      "api"
    ],
    "defaultVarName": "WOOCOMMERCE_API_KEY",
    "nodes": 9
  }
];
