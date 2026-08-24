import { Video, ShieldAlert, TrendingUp, ShoppingCart, Briefcase, FlaskConical, Cpu, Dna, Globe } from 'lucide-react';

export const BUSINESS_TEMPLATES = [
  {
    id: 'flow-1',
    name: 'Fábrica de Shorts Virales',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: AdSense + Afiliados',
    nodes: [
          {
                id: 1,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "ElevenLabs",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Shotstack",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "YouTube API",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-2',
    name: 'Canal UGC Faceless Automático',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: Monetización YT',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Tavily (noticias)",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "ElevenLabs",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Kling Video",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-3',
    name: 'Podcast IA Multi-idioma',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: Sponsorships',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Tavily",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Cartesia (voz)",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Spotify RSS",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-4',
    name: 'Motor de Newsletters Pagadas',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: Suscriptores',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Exa AI",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Resend",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Stripe (paywall)",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-5',
    name: 'Avatar Influencer Virtual',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: Brand deals',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Hailuo/Kling",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "HeyGen/Tavus",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Instagram API",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-6',
    name: 'Fábrica de Libros Kindle KDP',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: Royalties Amazon',
    nodes: [
          {
                id: 1,
                type: "ai",
                name: "Claude 3.5",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "DALL·E (portada)",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "KDP API",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-7',
    name: 'Generador de Cursos Online',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: Ventas de cursos',
    nodes: [
          {
                id: 1,
                type: "ai",
                name: "Hermes",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "ElevenLabs",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Shotstack",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Teachable/Hotmart",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-8',
    name: 'Studio de Publicidad en Video',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: Comisiones agencia',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Kling",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "JSON2Video",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Meta Ads API",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-9',
    name: 'Agencia de Memes & Viral',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: Tráfico afiliado',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "GDELT (tendencias)",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "FLUX Img",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Auto-post Reddit/X",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-10',
    name: 'Ghost-Writer para Celebrities',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: Retainer mensual',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Apify (scrape perfil)",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Twitter API",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-11',
    name: 'Canal de Noticias IA 24/7',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: Ads streaming',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "GDELT",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "GPT",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "ElevenLabs",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Shotstack",
                desc: "Procesamiento IA"
          },
          {
                id: 5,
                type: "source",
                name: "YouTube Live",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-12',
    name: 'Fábrica de Música IA (Suno)',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: Regalías streaming',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Suno API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Udio",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "DistroKid API",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-13',
    name: 'Generador de Webs de Nicho',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: Ads + Afiliados',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Tavily",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "GPT",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Webflow CMS",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Stripe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-14',
    name: 'Resúmenes de Libros Automatizados',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: Suscripción',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Jina AI (PDF)",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "ElevenLabs",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Patreon",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-15',
    name: 'Doblaje & Traducción de Video',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: Servicio B2B',
    nodes: [
          {
                id: 1,
                type: "ai",
                name: "Whisper",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "ElevenLabs",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Shotstack",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-16',
    name: 'Clonación de Canal Exitoso',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: Réplica escalable',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Apify (scrape YT top)",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Kling",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "YT API",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-17',
    name: 'Generador de Stock Photos IA',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: Regalías stock',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "FLUX/Ideogram/Recraft",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Shutterstock API",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-18',
    name: 'Studio de Audiolibros IA',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: Royalties Audible',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "LibriVox texts",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "ElevenLabs (voz)",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "ACX API",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-19',
    name: 'Caza Bug Bounties Automatizado',
    category: 'BLOQUE 2',
    icon: ShieldAlert,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    description: 'Modelo de Ingreso: \$500–\$50,000/bug',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Censys",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Shodan",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "HackerOne API",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-20',
    name: 'Scanner de Fugas de Datos Corporativas',
    category: 'BLOQUE 2',
    icon: ShieldAlert,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    description: 'Modelo de Ingreso: Servicio de auditoría',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Aleph OCCRP",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Have I Been Pwned",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Stripe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-21',
    name: 'Monitor de Dark Web para Empresas',
    category: 'BLOQUE 2',
    icon: ShieldAlert,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    description: 'Modelo de Ingreso: Retainer mensual',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Tor onion scrapers",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Hume",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Resend alertas",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-22',
    name: 'Rastreador de Desinformación',
    category: 'BLOQUE 2',
    icon: ShieldAlert,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    description: 'Modelo de Ingreso: Reportes pagados',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "GDELT",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Tavily",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Informe PDF",
                desc: "Procesamiento IA"
          },
          {
                id: 5,
                type: "source",
                name: "Stripe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-23',
    name: 'Inteligencia Geopolítica OSINT',
    category: 'BLOQUE 2',
    icon: ShieldAlert,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    description: 'Modelo de Ingreso: Consultoría',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "WiGLE",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "ADS-B Exchange",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Sentinel Hub",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Informe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-24',
    name: 'Auditor Automatizado de Código',
    category: 'BLOQUE 2',
    icon: ShieldAlert,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    description: 'Modelo de Ingreso: Bug bounties',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "GitHub API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Informe",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "HackerOne",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-25',
    name: 'Sistema de Vigilancia de Patentes',
    category: 'BLOQUE 2',
    icon: ShieldAlert,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    description: 'Modelo de Ingreso: Servicio legal',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "EPO API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "USPTO",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Alerta email",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-26',
    name: 'Monitor de Redes Sociales OSINT',
    category: 'BLOQUE 2',
    icon: ShieldAlert,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    description: 'Modelo de Ingreso: Retainer empresas',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Broadcastify",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Apify",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Dashboard",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-27',
    name: 'Detector de Fraudes Financieros',
    category: 'BLOQUE 2',
    icon: ShieldAlert,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    description: 'Modelo de Ingreso: SaaS',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "DeFiLlama",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Alchemy",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Alerta Telegram",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-28',
    name: 'Escáner de Vulnerabilidades CVE',
    category: 'BLOQUE 2',
    icon: ShieldAlert,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    description: 'Modelo de Ingreso: Servicio seguridad',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "NVD CVE API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Shodan",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Reporte",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-29',
    name: 'Investigador de Personas (Due Diligence)',
    category: 'BLOQUE 2',
    icon: ShieldAlert,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    description: 'Modelo de Ingreso: Servicio abogados',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Apify + OCCRP + Exa AI",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Informe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-30',
    name: 'Bot de Monitoreo de Cambios Legales',
    category: 'BLOQUE 2',
    icon: ShieldAlert,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    description: 'Modelo de Ingreso: Retainer bufetes',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "GreyNoise + Censys",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Resend",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-31',
    name: 'Bot MEV Crypto Arbitraje',
    category: 'BLOQUE 3',
    icon: TrendingUp,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    description: 'Modelo de Ingreso: Spread de arbitraje',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Alchemy Mempool",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "DeFiLlama",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Smart Contract",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-32',
    name: 'Agente de Trading Cuantitativo',
    category: 'BLOQUE 3',
    icon: TrendingUp,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    description: 'Modelo de Ingreso: Ganancias trading',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Alpaca API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "backtesting",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Alpaca exec",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-33',
    name: 'Scanner de Oportunidades DeFi',
    category: 'BLOQUE 3',
    icon: TrendingUp,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    description: 'Modelo de Ingreso: Yield farming',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "DeFiLlama",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Alchemy",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "Hermes Agent",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Auto-swap",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-34',
    name: 'Monitor de NFTs Subvalorados',
    category: 'BLOQUE 3',
    icon: TrendingUp,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    description: 'Modelo de Ingreso: Flip de NFTs',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "OpenSea API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "compra automática",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-35',
    name: 'Predictor de Eventos & Precios',
    category: 'BLOQUE 3',
    icon: TrendingUp,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    description: 'Modelo de Ingreso: Opciones financieras',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "PredictHQ",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "ATTOM",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Alpaca trade",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-36',
    name: 'Arbitraje de Divisas Fiat',
    category: 'BLOQUE 3',
    icon: TrendingUp,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    description: 'Modelo de Ingreso: Spread FX',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Open Exchange Rates",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Stripe payout",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-37',
    name: 'Bot de Señales de Inversión Inmobiliaria',
    category: 'BLOQUE 3',
    icon: TrendingUp,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    description: 'Modelo de Ingreso: Newsletter pagada',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "ATTOM Data",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Zillow API",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Mailchimp",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-38',
    name: 'Agente de Crowdfunding Automático',
    category: 'BLOQUE 3',
    icon: TrendingUp,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    description: 'Modelo de Ingreso: Comisiones',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Tavily",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Indiegogo/Kickstarter API",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-39',
    name: 'Rastreador de Subvenciones Gubernamentales',
    category: 'BLOQUE 3',
    icon: TrendingUp,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    description: 'Modelo de Ingreso: Servicio B2B',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "USASpending API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Alerta Stripe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-40',
    name: 'Fondo de Inversión IA (Robo-Advisor)',
    category: 'BLOQUE 3',
    icon: TrendingUp,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    description: 'Modelo de Ingreso: Comisión de gestión',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Alpaca",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Stripe (gestión de activos)",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-41',
    name: 'Monitor de Ballenas Crypto (Whale)',
    category: 'BLOQUE 3',
    icon: TrendingUp,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    description: 'Modelo de Ingreso: Subscripción señales',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Alchemy on-chain",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Telegram Bot",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Stripe sub",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-42',
    name: 'Bot de Liquidaciones DeFi',
    category: 'BLOQUE 3',
    icon: TrendingUp,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    description: 'Modelo de Ingreso: Bonus liquidación',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Alchemy Mempool",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "DeFiLlama",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Auto-liquidate",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-43',
    name: 'Agente de Finanzas Personales IA',
    category: 'BLOQUE 3',
    icon: TrendingUp,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    description: 'Modelo de Ingreso: SaaS mensual',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Plaid API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Reporte personalizado",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-44',
    name: 'Detector de Insider Trading en NFTs',
    category: 'BLOQUE 3',
    icon: TrendingUp,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    description: 'Modelo de Ingreso: Donaciones/Patreon',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Alchemy",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "GDELT",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Informe público",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-45',
    name: 'Tienda Print-on-Demand Automática',
    category: 'BLOQUE 4',
    icon: ShoppingCart,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    description: 'Modelo de Ingreso: Margen producto',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Printify API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Shopify",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Kling (ads video)",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-46',
    name: 'Agente de Dropshipping con IA',
    category: 'BLOQUE 4',
    icon: ShoppingCart,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    description: 'Modelo de Ingreso: Margen venta',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Apify (AliExpress)",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "GPT-4o (copy)",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Shopify",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-47',
    name: 'Motor de Reseñas & Comparativas',
    category: 'BLOQUE 4',
    icon: ShoppingCart,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    description: 'Modelo de Ingreso: Comisiones Amazon',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Amazon PA-API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Web + Afiliados",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-48',
    name: 'Fábrica de Listings de Amazon',
    category: 'BLOQUE 4',
    icon: ShoppingCart,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    description: 'Modelo de Ingreso: Ventas Amazon FBA',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Helium10 API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Amazon SP-API",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-49',
    name: 'Buscador de Productos Virales',
    category: 'BLOQUE 4',
    icon: ShoppingCart,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    description: 'Modelo de Ingreso: Dropshipping',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "TikTok API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Apify",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Shopify",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-50',
    name: 'Agente de Arbitraje Amazon ↔ eBay',
    category: 'BLOQUE 4',
    icon: ShoppingCart,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    description: 'Modelo de Ingreso: Spread precio',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Amazon PA-API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "eBay API",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Auto-listing",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-51',
    name: 'Generador de Fichas de Producto SEO',
    category: 'BLOQUE 4',
    icon: ShoppingCart,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    description: 'Modelo de Ingreso: SEO + Ventas',
    nodes: [
          {
                id: 1,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Shopify REST API",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Google Analytics",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-52',
    name: 'Bot de Precios Dinámicos',
    category: 'BLOQUE 4',
    icon: ShoppingCart,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    description: 'Modelo de Ingreso: Margen optimizado',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Apify (competidores)",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Shopify pricing",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-53',
    name: 'Agente de Compras Mayoristas',
    category: 'BLOQUE 4',
    icon: ShoppingCart,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    description: 'Modelo de Ingreso: OEM escalable',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Alibaba API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Printify/Printful",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-54',
    name: 'Motor de Opiniones Automatizadas',
    category: 'BLOQUE 4',
    icon: ShoppingCart,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    description: 'Modelo de Ingreso: Servicio B2B',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Amazon API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Apify",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Stripe (SaaS)",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-55',
    name: 'Agencia SEO Automática',
    category: 'BLOQUE 5',
    icon: Briefcase,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    description: 'Modelo de Ingreso: Retainer mensual',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Apollo.io",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "10Web",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Stripe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-56',
    name: 'Motor de Cold Email Masivo',
    category: 'BLOQUE 5',
    icon: Briefcase,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    description: 'Modelo de Ingreso: Agencia outreach',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Apollo.io",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Resend",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Stripe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-57',
    name: 'Constructor de Webs IA para PYMEs',
    category: 'BLOQUE 5',
    icon: Briefcase,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    description: 'Modelo de Ingreso: Servicio \$500–\$5k',
    nodes: [
          {
                id: 1,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Webflow CMS",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Stripe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-58',
    name: 'Agente de Generación de Leads',
    category: 'BLOQUE 5',
    icon: Briefcase,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    description: 'Modelo de Ingreso: Servicio B2B',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "LinkedIn API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Apollo.io",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "CRM",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-59',
    name: 'Asistente Legal IA Automatizado',
    category: 'BLOQUE 5',
    icon: Briefcase,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    description: 'Modelo de Ingreso: Servicio legal',
    nodes: [
          {
                id: 1,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Wolfram",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Stripe (consulta)",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-60',
    name: 'Redactor de Contratos Automático',
    category: 'BLOQUE 5',
    icon: Briefcase,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    description: 'Modelo de Ingreso: Servicio legal',
    nodes: [
          {
                id: 1,
                type: "ai",
                name: "Claude 3.5",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "DocuSign API",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Stripe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-61',
    name: 'Agente de RRHH y Reclutamiento',
    category: 'BLOQUE 5',
    icon: Briefcase,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    description: 'Modelo de Ingreso: Headhunting fee',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "LinkedIn",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Workable API",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Stripe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-62',
    name: 'Generador de Pitchs para Startups',
    category: 'BLOQUE 5',
    icon: Briefcase,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    description: 'Modelo de Ingreso: Servicio \$2k–\$10k',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Crunchbase API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Canva/DALL·E",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Stripe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-63',
    name: 'Motor de Propuestas Comerciales',
    category: 'BLOQUE 5',
    icon: Briefcase,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    description: 'Modelo de Ingreso: Agencia',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Apollo.io",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "PDF",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "DocuSign",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-64',
    name: 'Agencia de Reputación Online',
    category: 'BLOQUE 5',
    icon: Briefcase,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    description: 'Modelo de Ingreso: Retainer',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Apify (reviews)",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "respuestas",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Stripe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-65',
    name: 'Bot de Atención al Cliente 24/7',
    category: 'BLOQUE 5',
    icon: Briefcase,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    description: 'Modelo de Ingreso: SaaS por asiento',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Hume AI",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Stripe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-66',
    name: 'Traductor & Localizador IA',
    category: 'BLOQUE 5',
    icon: Briefcase,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    description: 'Modelo de Ingreso: Pago por volumen',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "DeepL API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Stripe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-67',
    name: 'Agencia de Análisis de Datos',
    category: 'BLOQUE 5',
    icon: Briefcase,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    description: 'Modelo de Ingreso: Consultoría',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Wolfram",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Looker/Tableau",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Stripe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-68',
    name: 'Motor de Auditorías UX Automáticas',
    category: 'BLOQUE 5',
    icon: Briefcase,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    description: 'Modelo de Ingreso: Servicio digital',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Puppeteer",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Informe PDF",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Stripe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-69',
    name: 'Laboratorio de Conjeturas Matemáticas',
    category: 'BLOQUE 6',
    icon: FlaskConical,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    description: 'Modelo de Ingreso: Premio Clay (\$1M)',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "ArXiv",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Hermes 3",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Lean 4",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Wolfram",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-70',
    name: 'Minero de Patentes Tecnológicas',
    category: 'BLOQUE 6',
    icon: FlaskConical,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    description: 'Modelo de Ingreso: Consultoría IP',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "USPTO",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "EPO",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Informe PDF",
                desc: "Procesamiento IA"
          },
          {
                id: 5,
                type: "source",
                name: "Stripe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-71',
    name: 'Agente de Investigación Científica',
    category: 'BLOQUE 6',
    icon: FlaskConical,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    description: 'Modelo de Ingreso: Grants + publicaciones',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "PubMed API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "ArXiv",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Wolfram",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-72',
    name: 'Descubridor de Moléculas Nuevas',
    category: 'BLOQUE 6',
    icon: FlaskConical,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    description: 'Modelo de Ingreso: Royalties farmacia',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "PubChem",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "AlphaFold API",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "MuJoCo",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Paper",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-73',
    name: 'Validador de Fórmulas Matemáticas',
    category: 'BLOQUE 6',
    icon: FlaskConical,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    description: 'Modelo de Ingreso: SaaS académico',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Mathpix",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Wolfram",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "OpenAI o1",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Lean 4",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-74',
    name: 'Monitor de Innovaciones en Energía',
    category: 'BLOQUE 6',
    icon: FlaskConical,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    description: 'Modelo de Ingreso: Subscripción',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "USPTO",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "EPO",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Tavily",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 5,
                type: "source",
                name: "Newsletter",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-75',
    name: 'Agente de Revisión de Literatura',
    category: 'BLOQUE 6',
    icon: FlaskConical,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    description: 'Modelo de Ingreso: SaaS investigadores',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "ArXiv",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "PubMed",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Resend",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-76',
    name: 'Detector de Plagio Científico',
    category: 'BLOQUE 6',
    icon: FlaskConical,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    description: 'Modelo de Ingreso: Servicio editoriales',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "ArXiv",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Jina AI",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Informe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-77',
    name: 'Motor de Hipótesis Científicas IA',
    category: 'BLOQUE 6',
    icon: FlaskConical,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    description: 'Modelo de Ingreso: Consultoría',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "GDELT + ArXiv",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "o1 Preview",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Wolfram",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Paper",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-78',
    name: 'Auditor de Patentes de Competidores',
    category: 'BLOQUE 6',
    icon: FlaskConical,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    description: 'Modelo de Ingreso: Servicio legal corp.',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "EPO",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "USPTO",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Informe estratégico",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-79',
    name: 'Cerebro de Asistente Robótico',
    category: 'BLOQUE 7',
    icon: Cpu,
    color: 'text-zinc-400',
    bg: 'bg-zinc-500/10',
    description: 'Modelo de Ingreso: Licencia software',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "ROS 2",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Hume AI (emociones)",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-80',
    name: 'Simulador de Exoesqueleto',
    category: 'BLOQUE 7',
    icon: Cpu,
    color: 'text-zinc-400',
    bg: 'bg-zinc-500/10',
    description: 'Modelo de Ingreso: Venta de diseño',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "NVIDIA Isaac",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "MuJoCo",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "ROS 2",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Wolfram",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-81',
    name: 'Granja Agrícola Autónoma',
    category: 'BLOQUE 7',
    icon: Cpu,
    color: 'text-zinc-400',
    bg: 'bg-zinc-500/10',
    description: 'Modelo de Ingreso: Producto agrícola',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "FarmBot API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "OpenWeather",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Wolfram",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "ROS 2",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-82',
    name: 'Monitor de Salud Wearable',
    category: 'BLOQUE 7',
    icon: Cpu,
    color: 'text-zinc-400',
    bg: 'bg-zinc-500/10',
    description: 'Modelo de Ingreso: SaaS médico',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "HealthKit API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Stripe (subscripción)",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-83',
    name: 'Dashboard IoT Industrial',
    category: 'BLOQUE 7',
    icon: Cpu,
    color: 'text-zinc-400',
    bg: 'bg-zinc-500/10',
    description: 'Modelo de Ingreso: SaaS B2B industrial',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "MQTT broker",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Resend alertas",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Stripe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-84',
    name: 'Simulador de Vehículo Aéreo (eVTOL)',
    category: 'BLOQUE 7',
    icon: Cpu,
    color: 'text-zinc-400',
    bg: 'bg-zinc-500/10',
    description: 'Modelo de Ingreso: Venta de patente',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "NVIDIA Isaac",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "MuJoCo",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "NASA API",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-85',
    name: 'Robot Chef (Algoritmo de Agarre)',
    category: 'BLOQUE 7',
    icon: Cpu,
    color: 'text-zinc-400',
    bg: 'bg-zinc-500/10',
    description: 'Modelo de Ingreso: Licencia hardware',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "MuJoCo",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "ROS 2",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "GPT-4o instrucciones",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-86',
    name: 'Sistema de Navegación Autónoma',
    category: 'BLOQUE 7',
    icon: Cpu,
    color: 'text-zinc-400',
    bg: 'bg-zinc-500/10',
    description: 'Modelo de Ingreso: OEM automotriz',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "ROS 2 SLAM",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "NVIDIA Isaac",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Alchemy (GPS)",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-87',
    name: 'Descubridor de Fármacos IA',
    category: 'BLOQUE 8',
    icon: Dna,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    description: 'Modelo de Ingreso: Licensing farmacéutico',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "PubChem",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "AlphaFold",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "PubMed",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-88',
    name: 'Agente de Diagnóstico por Imagen',
    category: 'BLOQUE 8',
    icon: Dna,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    description: 'Modelo de Ingreso: SaaS clínicas',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Mathpix (DICOM)",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "GPT-4o Vision",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Informe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-89',
    name: 'Monitor de Ensayos Clínicos',
    category: 'BLOQUE 8',
    icon: Dna,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    description: 'Modelo de Ingreso: Subscripción médicos',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "ClinicalTrials.gov API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Newsletter",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-90',
    name: 'Analizador de ADN / Genómica',
    category: 'BLOQUE 8',
    icon: Dna,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    description: 'Modelo de Ingreso: Consultoría biotech',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "NCBI API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "AlphaFold",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Wolfram",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-91',
    name: 'Bot de Nutrición y Bienestar',
    category: 'BLOQUE 8',
    icon: Dna,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    description: 'Modelo de Ingreso: App subscripción',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Nutritionix API",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Stripe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-92',
    name: 'Sistema de Triaje Médico IA',
    category: 'BLOQUE 8',
    icon: Dna,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    description: 'Modelo de Ingreso: B2B hospitales',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Hume AI (voz)",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Resend alertas",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-93',
    name: 'Agente de Investigación de Pandemias',
    category: 'BLOQUE 8',
    icon: Dna,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    description: 'Modelo de Ingreso: Grants OMS/OPS',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "GDELT",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "PubMed",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Dashboard público",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-94',
    name: 'Tutor Personalizado IA (Matemáticas)',
    category: 'BLOQUE 9',
    icon: Globe,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    description: 'Modelo de Ingreso: Subscripción alumno',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Wolfram",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "ElevenLabs",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Stripe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-95',
    name: 'Plataforma de Idiomas Adaptativa',
    category: 'BLOQUE 9',
    icon: Globe,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    description: 'Modelo de Ingreso: App subscripción',
    nodes: [
          {
                id: 1,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "ElevenLabs",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Mem0 (memoria)",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Stripe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-96',
    name: 'Asistente para Adultos Mayores',
    category: 'BLOQUE 9',
    icon: Globe,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    description: 'Modelo de Ingreso: B2B asilos / familias',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Hume AI",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "ROS 2",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Resend familia",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-97',
    name: 'Detector de Bullying Online',
    category: 'BLOQUE 9',
    icon: Globe,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    description: 'Modelo de Ingreso: B2B colegios',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "Apify",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Resend alertas",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-98',
    name: 'Motor de Becas & Subvenciones',
    category: 'BLOQUE 9',
    icon: Globe,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    description: 'Modelo de Ingreso: Servicio estudiantes',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "USASpending",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Resend + Stripe",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-99',
    name: 'Biblioteca de Conjeturas Abiertas',
    category: 'BLOQUE 9',
    icon: Globe,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    description: 'Modelo de Ingreso: Donaciones / grants',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "ArXiv",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Wolfram",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Procesamiento IA"
          },
          {
                id: 4,
                type: "source",
                name: "Web pública",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-100',
    name: 'Democratizador de Conocimiento Legal',
    category: 'BLOQUE 9',
    icon: Globe,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    description: 'Modelo de Ingreso: SaaS legal',
    nodes: [
          {
                id: 1,
                type: "ai",
                name: "Motor de Razonamiento IA",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Wolfram",
                desc: "Procesamiento IA"
          },
          {
                id: 3,
                type: "source",
                name: "Stripe (freemium)",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-101',
    name: 'Oráculo de Tendencias de Mercado',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: Subscripción \$99/mes',
    nodes: [
          {
                id: 1,
                type: "ai",
                name: "GDELT + PredictHQ + Exa + Agente IA",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "Newsletter premium",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-102',
    name: 'Motor de Franquicias Digitales',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: Licencia por franquicia',
    nodes: [
          {
                id: 1,
                type: "ai",
                name: "Webflow + Stripe + Apollo + Agente IA",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "SaaS white-label",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-103',
    name: 'Agencia de Publicidad Programática',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: % del presupuesto',
    nodes: [
          {
                id: 1,
                type: "ai",
                name: "Meta Ads API + Google Ads API + Agente IA (copy)",
                desc: "Extracción / Input"
          }
    ]
  },
  {
    id: 'flow-104',
    name: 'Plataforma de Arbitraje de Datos',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: Venta de datos B2B',
    nodes: [
          {
                id: 1,
                type: "source",
                name: "ATTOM + GDELT + Sentinel Hub",
                desc: "Extracción / Input"
          },
          {
                id: 2,
                type: "source",
                name: "informe institucional",
                desc: "Ejecución final"
          }
    ]
  },
  {
    id: 'flow-105',
    name: 'Sistema de Alerta Geopolítica Premium',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: Subscripción hedge funds',
    nodes: [
          {
                id: 1,
                type: "ai",
                name: "WiGLE + ADS-B + Broadcastify + Agente IA",
                desc: "Extracción / Input"
          }
    ]
  },
  {
    id: 'flow-106',
    name: 'Agente Cuantitativo Multi-Mercado',
    category: 'BLOQUE 1',
    icon: Video,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    description: 'Modelo de Ingreso: Performance fee',
    nodes: [
          {
                id: 1,
                type: "ai",
                name: "Alpaca + DeFiLlama + Wolfram + Hermes 3",
                desc: "Extracción / Input"
          }
    ]
  }
];
