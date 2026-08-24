import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { 
  Play, Settings, Database, Cloud, BrainCircuit, Server, ArrowRight, Zap, 
  Activity, CheckCircle2, RefreshCw, Search, Filter, ChevronRight, ChevronLeft, Info, X, Code2,
  ZoomIn, ZoomOut, Maximize, Minimize, Map, BookOpen, GitMerge, ArrowDown,
  MessageSquare, Trash2, Send, Bot, Sparkles, User, Download
} from 'lucide-react';
import { BUSINESS_TEMPLATES } from '../../data/workflowTemplates';

export function WorkflowsView({ vaultData }) {
  const [nodes, setNodes] = useState([]);
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeBlock, setActiveBlock] = useState('BLOQUE 1');
  const [viewMode, setViewMode] = useState('canvas'); // 'canvas' | 'strategy'
  
  // Explanation state
  const [selectedNode, setSelectedNode] = useState(null);

  // Fullscreen state
  const canvasRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Copilot State
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [copilotModel, setCopilotModel] = useState('gemini'); // gemini | groq | claude
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [chatHistories, setChatHistories] = useState(() => {
    const saved = localStorage.getItem('devvault_copilot_chats');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('devvault_copilot_chats', JSON.stringify(chatHistories));
  }, [chatHistories]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeTemplate) return;

    const currentHistory = chatHistories[activeTemplate.id] || [];
    const newUserMsg = { id: Date.now(), role: 'user', text: chatInput };
    
    setChatHistories(prev => ({
        ...prev,
        [activeTemplate.id]: [...currentHistory, newUserMsg]
    }));
    
    const userQuestion = chatInput;
    setChatInput('');
    setIsAiTyping(true);

    try {
      // 1. Buscar la llave en la bóveda
      const secrets = vaultData?.secrets || [];
      let apiKey = "";
      
      if (copilotModel === 'groq') {
        const groqSecret = secrets.find(s => s.providerId === 'groq' || s.varName.includes('GROQ'));
        apiKey = groqSecret ? groqSecret.value : null;
      } else if (copilotModel === 'gemini') {
        const geminiSecret = secrets.find(s => s.providerId === 'google-ai-studio' || s.varName.includes('GEMINI'));
        apiKey = geminiSecret ? geminiSecret.value : null;
      } else {
        // Claude u otros
        throw new Error(`El modelo ${copilotModel} aún no está implementado o falta su API Key.`);
      }

      if (!apiKey) {
        throw new Error(`No tienes guardada una API Key para ${copilotModel} en tu bóveda.`);
      }

      const systemPrompt = `Eres el DevVault Copilot. Estás ayudando al usuario a configurar la arquitectura "${activeTemplate.name}". Responde de forma concisa y técnica. Aquí tienes los nodos que componen esta arquitectura: ${activeTemplate.nodes.map(n => n.name).join(', ')}.`;
      
      let aiResponseText = "";

      // 2. Llamada a la API real
      if (copilotModel === 'groq') {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'llama3-70b-8192',
            messages: [
              { role: 'system', content: systemPrompt },
              ...currentHistory.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.text })),
              { role: 'user', content: userQuestion }
            ]
          })
        });
        if (!res.ok) throw new Error("Error en Groq API");
        const data = await res.json();
        aiResponseText = data.choices[0].message.content;
      } 
      else if (copilotModel === 'gemini') {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: { text: systemPrompt } },
            contents: [
              ...currentHistory.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.text }] })),
              { role: 'user', parts: [{ text: userQuestion }] }
            ]
          })
        });
        if (!res.ok) throw new Error("Error en Gemini API");
        const data = await res.json();
        aiResponseText = data.candidates[0].content.parts[0].text;
      }

      // 3. Mostrar respuesta
      const aiResponse = { id: Date.now() + 1, role: 'assistant', text: aiResponseText };
      setChatHistories(prev => ({
          ...prev,
          [activeTemplate.id]: [...(prev[activeTemplate.id] || []), aiResponse]
      }));

    } catch (error) {
      const errorResponse = { id: Date.now() + 1, role: 'assistant', text: `⚠️ **Error del Copilot:** ${error.message} 

Recuerda ir a tu Bóveda y crear un Nuevo Secreto con la API Key correspondiente.` };
      setChatHistories(prev => ({
          ...prev,
          [activeTemplate.id]: [...(prev[activeTemplate.id] || []), errorResponse]
      }));
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleClearChat = () => {
    if (!activeTemplate) return;
    if(window.confirm('¿Borrar historial de chat para este proyecto?')) {
      setChatHistories(prev => ({ ...prev, [activeTemplate.id]: [] }));
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (canvasRef.current?.requestFullscreen) {
        canvasRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const blocks = [
    { id: 'BLOQUE 1', name: 'Contenido & Medios' },
    { id: 'BLOQUE 2', name: 'OSINT & Bounties' },
    { id: 'BLOQUE 3', name: 'Finanzas & Crypto' },
    { id: 'BLOQUE 4', name: 'E-Commerce' },
    { id: 'BLOQUE 5', name: 'Agencias B2B' },
    { id: 'BLOQUE 6', name: 'Ciencia & Patentes' },
    { id: 'BLOQUE 7', name: 'Robótica & IoT' },
    { id: 'BLOQUE 8', name: 'Salud & Biotech' },
    { id: 'BLOQUE 9', name: 'Impacto Social' },
    { id: 'BLOQUE 10', name: 'Flujos Élite' }
  ];

  const addNode = (type) => {
    setNodes([...nodes, { 
      id: Date.now(), 
      type, 
      name: type === 'source' ? 'Nueva API' : 'Agente IA',
      desc: 'Bloque personalizado'
    }]);
  };

  const loadTemplate = (tpl) => {
    setActiveTemplate(tpl);
    setNodes(tpl.nodes.map(n => ({...n, id: n.id + '-' + Date.now()})));
  };

  const getNodeInstruction = (node, index, isFirst, isLast, isAi) => {
    const n = (node.name || '').toLowerCase();
    
    if (isAi) {
      return `Añade el módulo de ${node.name} (ej. OpenAI o HTTP Request). 
      En el campo 'System Prompt', escribe: "Eres un asistente experto. Recibirás estos datos: {{Paso${index}.resultado}}. Analízalos y devuelve ÚNICAMENTE un JSON estructurado con los campos requeridos". 
      Asegúrate de ajustar la 'Temperatura' (0.7 para textos creativos, 0.2 para análisis exactos).`;
    }

    if (n.includes('youtube') || n.includes('tiktok') || n.includes('instagram')) {
      return `Añade el módulo de ${node.name}. Si es el inicio, ponlo en modo 'Watch' para detectar nuevos videos. Si es el final, ponlo en 'Upload/Publish' y mapea el archivo de video generado y la descripción de la IA.`;
    } else if (n.includes('sheet') || n.includes('airtable') || n.includes('database')) {
      return `Usa el módulo de ${node.name}. Si es el disparador, usa 'Watch New Rows'. Si es al medio/final, usa 'Add a Row' y mapea las variables extraídas por la IA en cada columna correspondiente.`;
    } else if (n.includes('mail') || n.includes('gmail')) {
      return `Conecta tu cuenta de ${node.name}. Configura una regla que filtre correos (ej. 'Asunto contiene: Factura'). Mapea el cuerpo del correo o el texto del archivo adjunto para enviarlo al siguiente módulo.`;
    } else if (n.includes('wordpress') || n.includes('webflow') || n.includes('blog')) {
      return `Usa el módulo de ${node.name} con la acción 'Create Post'. En el campo de Título, pon la variable generada por la IA. En el contenido, pon el texto. Marca el estado como 'Published'.`;
    } else if (n.includes('eleven') || n.includes('voz') || n.includes('audio') || n.includes('tts')) {
      return `Envía el texto generado por la IA al módulo de ${node.name} ('Text to Speech'). Selecciona una voz pre-entrenada o clonada. El resultado será un archivo de audio (URL o Buffer) que pasarás al siguiente módulo.`;
    } else if (n.includes('video') || n.includes('capcut') || n.includes('runway') || n.includes('heygen')) {
      return `Conecta la API de ${node.name}. Envía el audio/guion del paso anterior. Nota: Generar video toma tiempo, podrías necesitar un módulo de 'Sleep' (pausa) o esperar un Webhook de respuesta antes de publicarlo.`;
    } else if (n.includes('stripe') || n.includes('pago')) {
      return `Genera un enlace de pago (Checkout Session) mediante la API de ${node.name}, o configura un Webhook que escuche 'checkout.session.completed' para confirmar que el cliente pagó antes de entregar el valor.`;
    } else {
      if (isFirst) return `Configura un 'Webhook Custom' o usa el módulo de ${node.name} para que escuche eventos en tiempo real. Este será el disparador (Trigger) que encienda toda la máquina.`;
      if (isLast) return `Añade el módulo de ${node.name} como acción final ('Create' o 'Publish'). Mapea las variables generadas por la IA en los campos correspondientes para entregar el trabajo al cliente.`;
      return `Utiliza el módulo de ${node.name} pasándole como entrada los datos del paso anterior. Extrae la URL, texto o dato procesado para que la cadena continúe correctamente.`;
    }
  };

  const renderStrategyPlaybook = () => {
    if (!activeTemplate || nodes.length === 0) return null;

    return (
      <div className="absolute inset-0 z-20 bg-vault-950 overflow-y-auto p-4 md:p-8 custom-scrollbar rounded-2xl">
        <div className="max-w-4xl mx-auto pb-12 pt-16 md:pt-12">
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-slate-100 flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-indigo-400" /> Tutorial de Ensamblaje (SOP)
            </h2>
            <p className="text-slate-400">Guía operativa paso a paso para construir la máquina: <strong className="text-slate-200">{activeTemplate.name}</strong></p>
          </div>
          
          <div className="bg-indigo-500/10 border border-indigo-500/20 p-5 rounded-xl mb-8 flex flex-col md:flex-row gap-4 items-start">
            <div className="p-3 bg-indigo-500/20 rounded-lg">
               <Server className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
               <h3 className="text-lg font-bold text-slate-200 mb-1">El Motor de Ensamblaje (Obligatorio)</h3>
               <p className="text-sm text-slate-300 leading-relaxed">
                 Las flechas del diagrama visual representan un <strong>Orquestador</strong>. No intentes programar esto desde cero. Ve a <strong>Make.com</strong> o <strong>n8n</strong>, crea una cuenta gratuita y abre un lienzo en blanco ("Nuevo Escenario"). Allí es donde conectarás las herramientas siguiendo exactamente los pasos de abajo.
               </p>
            </div>
          </div>

          <div className="relative border-l-2 border-slate-800 ml-4 space-y-10">
            
            {/* Step 0: El Negocio */}
            <div className="relative pl-8">
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-slate-800 text-slate-300 rounded-full flex items-center justify-center font-bold text-sm ring-4 ring-vault-950 border border-slate-600">0</div>
              <h3 className="text-lg font-bold text-slate-300 mb-2">Visión del Modelo de Negocio</h3>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  <strong>¿Qué vas a construir?</strong><br/> 
                  Una máquina automatizada que toma entradas (tráfico, datos) y genera salidas de alto valor procesadas con Inteligencia Artificial.
                </p>
                <div className="bg-vault-950 p-4 rounded-lg border border-emerald-500/30 text-xs text-emerald-400/90 font-medium flex gap-3">
                  <span className="text-xl">💰</span>
                  <p><strong>Estrategia de Monetización:</strong> {activeTemplate.description} <br/>Asegúrate de configurar tus métodos de cobro antes de escalar el tráfico.</p>
                </div>
              </div>
            </div>

            {/* Step 1: Tutorial de Construccion */}
            <div className="relative pl-8">
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center font-bold text-sm ring-4 ring-vault-950 border border-cyan-500/30">1</div>
              <h3 className="text-lg font-bold text-cyan-400 mb-2">Paso a Paso en Make.com / n8n</h3>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
                <p className="text-sm text-slate-400 mb-6">Dentro de tu orquestador, añade los módulos exactamente en este orden y configúralos con estas instrucciones:</p>
                
                <div className="space-y-6">
                  {nodes.map((n, idx) => {
                    const isFirst = idx === 0;
                    const isLast = idx === nodes.length - 1;
                    const isAi = n.type === 'ai';
                    
                    return (
                      <div key={n.id} className="relative">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="min-w-[28px] h-7 bg-slate-800 rounded-lg flex items-center justify-center text-xs font-bold text-slate-300 shadow-lg border border-slate-700">{idx + 1}</span>
                          <span className="font-bold text-base text-slate-200">{n.name}</span>
                          {isAi && <span className="bg-purple-500/20 text-purple-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Cerebro IA</span>}
                          {isFirst && <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Trigger</span>}
                        </div>
                        
                        <div className="ml-10 bg-vault-950 p-4 rounded-xl border border-slate-800 shadow-inner">
                          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                            {getNodeInstruction(n, idx, isFirst, isLast, isAi)}
                          </p>
                        </div>
                        
                        {idx < nodes.length - 1 && (
                          <div className="absolute -bottom-5 left-3.5 flex justify-center text-slate-600">
                            <ArrowDown className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 2: Pruebas y Lanzamiento */}
            <div className="relative pl-8">
              <div className="absolute -left-[17px] top-0 w-8 h-8 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center font-bold text-sm ring-4 ring-vault-950 border border-amber-500/30">2</div>
              <h3 className="text-lg font-bold text-amber-400 mb-2">Pruebas y Lanzamiento</h3>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl border-l-4 border-l-amber-500">
                <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
                  <li>Haz clic en el botón <strong>"Run once"</strong> (Ejecutar una vez) en tu orquestador.</li>
                  <li>Simula el evento del Paso 1 (ej. sube un video, manda un mail de prueba).</li>
                  <li>Verifica que las variables se mapeen correctamente (que la IA reciba el texto y que el Output reciba la respuesta).</li>
                  <li>Si todo está verde, enciende el interruptor general (Scheduling) para que corra 24/7 de forma autónoma.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-8 h-full flex flex-col gap-6"
    >
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-3">
            <Activity className="w-7 h-7 text-purple-400" />
            La Melodía del Dinero (Flujos Automáticos)
          </h1>
          <p className="text-slate-400 mt-2 text-sm max-w-2xl">
            Orquesta diferentes APIs y Modelos de IA. Elige una plantilla prearmada para desplegar modelos de negocio que generan ingresos en piloto automático.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button onClick={() => addNode('source')} className="px-3 md:px-4 py-2 bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-2 transition-colors">
            <Database className="w-4 h-4" />
            Nodo API
          </button>
          <button onClick={() => addNode('ai')} className="px-3 md:px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-2 transition-colors">
            <BrainCircuit className="w-4 h-4" />
            Nodo IA
          </button>
        </div>
      </div>

      {/* Filtro de Bloques */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {blocks.map(b => (
          <button
            key={b.id}
            onClick={() => { setActiveBlock(b.id); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              activeBlock === b.id 
                ? 'bg-indigo-500 text-white' 
                : 'bg-vault-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>

      {/* Plantillas Grid Paginado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {(() => {
          const filtered = BUSINESS_TEMPLATES.filter(tpl => tpl.category === activeBlock);
          const ITEMS_PER_PAGE = 8;
          const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
          const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

          return (
            <>
              {paginated.map(tpl => {
                const Icon = tpl.icon;
                const isActive = activeTemplate?.id === tpl.id;
                return (
                  <div 
                    key={tpl.id}
                    onClick={() => loadTemplate(tpl)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] ${
                      isActive 
                        ? 'bg-slate-800/80 border-slate-600 shadow-xl' 
                        : 'bg-vault-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${tpl.bg} ${tpl.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-slate-200 text-sm">{tpl.name}</h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">{tpl.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md flex items-center gap-1">
                        <Zap className="w-3 h-3" /> {tpl.nodes?.length || 0} Nodos
                      </span>
                      <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 rounded-md flex items-center gap-1">
                        <Cloud className="w-3 h-3" /> Auto-Ejecutable
                      </span>
                    </div>
                  </div>
                );
              })}
              
              {totalPages > 1 && (
                <div className="col-span-full flex items-center justify-center gap-2 mt-4 pt-4 border-t border-slate-800/50">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-xl bg-vault-900 border border-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    Anterior
                  </button>
                  <span className="text-xs text-slate-400 font-mono font-semibold">
                    Página <strong className="text-indigo-400">{currentPage}</strong> de {totalPages}
                  </span>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-xl bg-vault-900 border border-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          );
        })()}
      </div>

      {/* Lienzo del Flujo interactivo con Zoom/Pan */}
      <div ref={canvasRef} className={`flex-1 bg-vault-950/50 border border-slate-800 rounded-2xl overflow-hidden flex flex-col relative group/canvas ${isFullscreen ? 'h-screen w-screen fixed inset-0 z-50 bg-vault-950 rounded-none border-none' : 'min-h-[500px]'}`}>
        
        {/* Toggle Switch Arquitectura vs Estrategia */}
        {activeTemplate && nodes.length > 0 && (
          <div className={`absolute top-4 z-30 flex items-center gap-2 transition-all duration-300 ${selectedNode && viewMode === 'canvas' ? 'right-[340px]' : 'right-4 md:right-8'}`}>
            
            <button 
              onClick={handleExportJSON}
              className="px-3 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-colors shadow-lg"
              title="Exportar JSON para Make.com o n8n"
            >
              <Download className="w-4 h-4" /> <span className="hidden sm:inline">Exportar JSON</span>
            </button>
            
            <div className="bg-vault-900 border border-slate-700 p-1 rounded-xl flex items-center shadow-2xl">
            <button 
              onClick={() => setViewMode('canvas')}
              className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors ${viewMode === 'canvas' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
            >
              <GitMerge className="w-4 h-4" /> Arquitectura API
            </button>
            <button 
              onClick={() => setViewMode('strategy')}
              className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors ${viewMode === 'strategy' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
            >
              <Map className="w-4 h-4" /> Estrategia de Negocio
              </button>
            </div>
          </div>
        )}

        {viewMode === 'strategy' ? (
          renderStrategyPlaybook()
        ) : (
          <TransformWrapper
            initialScale={1}
            minScale={0.3}
            maxScale={2}
            centerOnInit={true}
            wheel={{ step: 0.1 }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
              {/* Controles de Zoom Flotantes */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 opacity-0 group-hover/canvas:opacity-100 transition-opacity">
                <button onClick={() => zoomIn()} className="p-2 bg-slate-900 border border-slate-700 shadow-xl rounded-lg text-slate-300 hover:text-indigo-400 hover:bg-slate-800 transition-all cursor-pointer" title="Acercar">
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button onClick={() => zoomOut()} className="p-2 bg-slate-900 border border-slate-700 shadow-xl rounded-lg text-slate-300 hover:text-indigo-400 hover:bg-slate-800 transition-all cursor-pointer" title="Alejar">
                  <ZoomOut className="w-5 h-5" />
                </button>
                <button onClick={() => { resetTransform(); toggleFullscreen(); }} className="p-2 bg-slate-900 border border-slate-700 shadow-xl rounded-lg text-slate-300 hover:text-indigo-400 hover:bg-slate-800 transition-all cursor-pointer" title={isFullscreen ? "Salir de Pantalla Completa" : "Pantalla Completa"}>
                  {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </button>
              </div>

              <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center p-8">
                {nodes.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-500 h-full">
                    <Zap className="w-16 h-16 mb-4 opacity-20" />
                    <p className="font-semibold text-lg text-slate-400">El lienzo está vacío</p>
                    <p className="text-sm mt-2 max-w-sm text-center">Selecciona una plantilla o construye tu flujo agregando nodos.</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-6 flex-wrap max-w-6xl mx-auto pb-8 pt-4">
                    <AnimatePresence>
                      {nodes.map((node, index) => (
                        <React.Fragment key={node.id}>
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -20 }}
                            onClick={() => setSelectedNode(node)}
                            className="w-72 p-5 bg-vault-900 border border-slate-700 hover:border-slate-500 cursor-pointer rounded-2xl shadow-xl flex flex-col gap-3 relative group transition-all shrink-0"
                          >
                            <div className="flex items-center justify-between">
                              <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded ${node.type === 'source' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-purple-500/20 text-purple-400'}`}>
                                {node.type === 'source' ? 'API / Herramienta' : 'Agente IA'}
                              </span>
                              <div className="flex items-center gap-2">
                                <button className="text-slate-500 hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" title="Ver Explicación" onClick={(e) => { e.stopPropagation(); setSelectedNode(node); }}>
                                  <Info className="w-4 h-4" />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); setNodes(nodes.filter(n => n.id !== node.id)); }} className="text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                  &times;
                                </button>
                              </div>
                            </div>
                            <div>
                              <h3 className="text-slate-200 font-bold text-sm mb-1">{node.name}</h3>
                              <p className="text-xs text-slate-400 leading-tight line-clamp-3">{node.desc}</p>
                            </div>
                            <div className="text-[10px] text-slate-500 mt-1 italic flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              Click para ver detalles
                            </div>
                          </motion.div>
                          
                          {index < nodes.length - 1 && (
                            <motion.div 
                              initial={{ opacity: 0 }} 
                              animate={{ opacity: 1 }} 
                              className="flex items-center justify-center w-8 md:w-12 shrink-0 relative hidden sm:flex"
                            >
                              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-slate-600" />
                            </motion.div>
                          )}
                        </React.Fragment>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
        )}
        
        {/* Panel lateral de Explicación */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="absolute top-0 right-0 w-80 h-full bg-vault-950/95 border-l border-slate-800 backdrop-blur-md p-6 flex flex-col z-20 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Settings className="w-5 h-5" />
                  <h3 className="font-bold text-sm">Detalles de Nodo</h3>
                </div>
                <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-slate-100 bg-slate-800 p-1.5 rounded-lg">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <h2 className="text-xl font-extrabold text-slate-100 mb-2">{selectedNode.name}</h2>
                <span className={`inline-block px-2 py-1 text-[10px] uppercase font-bold rounded mb-4 ${selectedNode.type === 'source' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-purple-500/20 text-purple-400'}`}>
                  {selectedNode.type === 'source' ? 'Integración API' : 'Procesamiento IA'}
                </span>
                
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  {selectedNode.desc}
                </p>
                
                <div className="space-y-4">
                  {selectedNode.type === 'ai' ? (
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5" /> Proveedores Soportados
                      </h4>
                      
                      <div className="space-y-3">
                        {/* Opcion 1 */}
                        <div className="p-3 rounded-lg bg-vault-950 border border-emerald-500/30 flex flex-col gap-2 relative overflow-hidden">
                          <div className="absolute top-0 right-0 bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-bl-lg">Recomendado</div>
                          <h5 className="text-sm font-bold text-slate-200">1. Google Gemini</h5>
                          <p className="text-[10px] text-slate-400 leading-tight">Capa gratuita inmensa (1.5 Flash). Ideal para iniciar.</p>
                          <div className="flex gap-2 mt-1">
                            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-[10px] font-bold text-slate-300 text-center transition-colors">🌐 Obtener API</a>
                            <button className="flex-1 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded text-[10px] font-bold text-center transition-colors">🔑 Usar Bóveda</button>
                          </div>
                        </div>

                        {/* Opcion 2 */}
                        <div className="p-3 rounded-lg bg-vault-950 border border-slate-700 flex flex-col gap-2">
                          <h5 className="text-sm font-bold text-slate-200">2. Groq (Llama 3)</h5>
                          <p className="text-[10px] text-slate-400 leading-tight">Hardware LPU. Latencia ultrabaja y gratis para devs.</p>
                          <div className="flex gap-2 mt-1">
                            <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-[10px] font-bold text-slate-300 text-center transition-colors">🌐 Obtener API</a>
                            <button className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] font-bold text-center transition-colors">🔑 Usar Bóveda</button>
                          </div>
                        </div>

                        {/* Opcion 3 */}
                        <div className="p-3 rounded-lg bg-vault-950 border border-slate-700 flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                             <h5 className="text-sm font-bold text-slate-200">3. Anthropic Claude</h5>
                             <span className="text-[9px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded font-bold">Pro</span>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-tight">Razonamiento superior. Requiere pago por uso.</p>
                          <div className="flex gap-2 mt-1">
                            <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noreferrer" className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-[10px] font-bold text-slate-300 text-center transition-colors">🌐 Obtener API</a>
                            <button className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] font-bold text-center transition-colors">🔑 Usar Bóveda</button>
                          </div>
                        </div>
                        
                        {/* Opcion 4 */}
                        <div className="p-3 rounded-lg bg-vault-950 border border-slate-700 flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                             <h5 className="text-sm font-bold text-slate-200">4. OpenAI ChatGPT</h5>
                             <span className="text-[9px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded font-bold">Pro</span>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-tight">Estándar de la industria. Modelos GPT-4o.</p>
                          <div className="flex gap-2 mt-1">
                            <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer" className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-[10px] font-bold text-slate-300 text-center transition-colors">🌐 Obtener API</a>
                            <button className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] font-bold text-center transition-colors">🔑 Usar Bóveda</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5" /> Opciones de Implementación
                      </h4>
                      <p className="text-[10px] text-slate-400 mb-3">Ordenadas por mayor rentabilidad (Costo Cero primero):</p>
                      
                      <div className="space-y-3">
                        {(() => {
                          const n = selectedNode.name.toLowerCase();
                          let alternatives = [];
                          
                          if (n.includes('eleven') || n.includes('voz') || n.includes('tts') || n.includes('hume')) {
                            alternatives = [
                              { name: "PlayHT / Coqui", badge: "Gratis", desc: "Voces realistas y open-source a coste cero.", url: "https://play.ht/" },
                              { name: "HuggingFace TTS", badge: "Gratis", desc: "Modelos libres (ej. Bark) alojados gratis.", url: "https://huggingface.co/models?pipeline_tag=text-to-speech" },
                              { name: selectedNode.name, badge: "Pro", desc: "Mayor calidad, requiere suscripción.", url: `https://www.google.com/search?q=${encodeURIComponent(selectedNode.name + ' API')}` }
                            ];
                          } else if (n.includes('midjourney') || n.includes('dalle') || n.includes('imagen')) {
                            alternatives = [
                              { name: "Leonardo AI", badge: "Gratis", desc: "Capa gratuita diaria generosa.", url: "https://leonardo.ai/" },
                              { name: "Stable Diffusion", badge: "Gratis", desc: "Open Source, coste cero si se corre local.", url: "https://stability.ai/" },
                              { name: selectedNode.name, badge: "Pro", desc: "Imágenes premium, pago por uso.", url: `https://www.google.com/search?q=${encodeURIComponent(selectedNode.name + ' API')}` }
                            ];
                          } else if (n.includes('apify') || n.includes('scrape') || n.includes('data')) {
                            alternatives = [
                              { name: "Puppeteer / Playwright", badge: "Gratis", desc: "Librerías libres. 100% gratis en tu server.", url: "https://pptr.dev/" },
                              { name: "ScrapingBot", badge: "Gratis", desc: "Capa gratuita mensual sin meter tarjeta.", url: "https://www.scraping-bot.io/" },
                              { name: selectedNode.name, badge: "Pro", desc: "Ecosistema robusto B2B.", url: `https://www.google.com/search?q=${encodeURIComponent(selectedNode.name + ' API')}` }
                            ];
                          } else if (n.includes('video') || n.includes('runway') || n.includes('kling')) {
                            alternatives = [
                              { name: "Luma Dream Machine", badge: "Gratis", desc: "Generación con cuota free diaria.", url: "https://lumalabs.ai/dream-machine" },
                              { name: "Kling AI", badge: "Gratis", desc: "Créditos gratuitos muy generosos.", url: "https://klingai.com/" },
                              { name: selectedNode.name, badge: "Pro", desc: "Estándar de la industria audiovisual.", url: `https://www.google.com/search?q=${encodeURIComponent(selectedNode.name + ' API')}` }
                            ];
                          } else {
                            alternatives = [
                              { name: "Alternativa Open Source", badge: "Gratis", desc: "Evita pagos buscando librerías libres en GitHub.", url: `https://github.com/search?q=${encodeURIComponent(selectedNode.name + ' alternative open source')}` },
                              { name: selectedNode.name + " (Oficial)", badge: "Sugerido", desc: "La herramienta originalmente planteada.", url: `https://www.google.com/search?q=${encodeURIComponent(selectedNode.name + ' API developer')}` },
                              { name: "Alternativas Indie", badge: "Explorar", desc: "Busca clones más baratos hechos por otros devs.", url: `https://www.producthunt.com/search?q=${encodeURIComponent(selectedNode.name)}` }
                            ];
                          }

                          return alternatives.map((alt, i) => (
                            <div key={i} className={`p-3 rounded-lg border flex flex-col gap-2 relative overflow-hidden ${i === 0 ? 'bg-vault-950 border-emerald-500/30' : 'bg-vault-950 border-slate-700'}`}>
                              {i === 0 && <div className="absolute top-0 right-0 bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-bl-lg">Costo Cero</div>}
                              <div className="flex justify-between items-center pr-12">
                                <h5 className="text-sm font-bold text-slate-200">{i + 1}. {alt.name}</h5>
                                {i !== 0 && <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${alt.badge === 'Pro' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-800 text-slate-400'}`}>{alt.badge}</span>}
                              </div>
                              <p className="text-[10px] text-slate-400 leading-tight">{alt.desc}</p>
                              <div className="flex gap-2 mt-1">
                                <a href={alt.url} target="_blank" rel="noreferrer" className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-[10px] font-bold text-slate-300 text-center transition-colors">🌐 Enlace</a>
                                <button className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] font-bold text-center transition-colors">🔑 Vincular</button>
                              </div>
                            </div>
                          ));
                        })()}
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5" /> Enrutamiento Inteligente
                    </h4>
                    <div className="text-xs text-slate-400 space-y-3">
                      <p>
                        <strong className="text-indigo-400">Rotación (Fallback):</strong> Activada por defecto para este nodo.
                      </p>
                      <p className="leading-relaxed">
                        Si registras múltiples llaves en tu Bóveda y la principal agota sus créditos, saltaremos automáticamente a la siguiente para evitar interrupciones.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Copilot FAB */}
        {!isCopilotOpen && activeTemplate && (
          <button 
            onClick={() => setIsCopilotOpen(true)}
            className="absolute bottom-6 right-6 z-30 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-3 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center gap-2 transition-all group"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-bold text-sm max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[200px] transition-all duration-300">
              Copilot del Proyecto
            </span>
          </button>
        )}

        {/* Copilot Drawer */}
        <AnimatePresence>
          {isCopilotOpen && activeTemplate && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              className="absolute top-0 right-0 w-full md:w-96 h-full bg-vault-950/95 border-l border-slate-800 backdrop-blur-md flex flex-col z-40 shadow-2xl"
            >
              <div className="p-4 border-b border-slate-800 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <Sparkles className="w-5 h-5" />
                    <h3 className="font-bold text-sm">Copilot de Proyecto</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={handleClearChat} className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors" title="Borrar Memoria">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => setIsCopilotOpen(false)} className="p-1.5 text-slate-500 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-bold uppercase">Motor:</span>
                  <select 
                    value={copilotModel}
                    onChange={(e) => setCopilotModel(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-lg px-2 py-1 outline-none focus:border-indigo-500"
                  >
                    <option value="gemini">Gemini 1.5 Flash (Gratis / 2M Tokens)</option>
                    <option value="groq">Llama 3 70B (Groq / Rápido)</option>
                    <option value="claude">Claude 3.5 Sonnet (Pro / Experto)</option>
                  </select>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar flex flex-col gap-4">
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl flex gap-3">
                  <Bot className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-emerald-400 block mb-1">✅ Contexto del Sistema Inyectado:</strong>
                    He cargado la arquitectura de <strong>{activeTemplate.name}</strong> y sus {activeTemplate.nodes?.length || 0} módulos. ¿En qué paso del manual te ayudo?
                  </div>
                </div>

                {(chatHistories[activeTemplate.id] || []).map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-300'}`}>
                      {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>
                    <div className={`text-xs p-3 rounded-xl whitespace-pre-line leading-relaxed ${msg.role === 'user' ? 'bg-indigo-500/20 border border-indigo-500/30 text-slate-200 rounded-tr-none' : 'bg-slate-900 border border-slate-800 text-slate-300 rounded-tl-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isAiTyping && (
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded bg-slate-800 text-slate-300 flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-xs p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 rounded-tl-none flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-75"></span>
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-150"></span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-slate-800 bg-vault-950">
                <form onSubmit={handleSendMessage} className="relative">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Pregunta sobre esta arquitectura..." 
                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-xl pl-4 pr-10 py-3 outline-none focus:border-indigo-500 transition-colors"
                  />
                  <button 
                    type="submit"
                    disabled={!chatInput.trim() || isAiTyping}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <div className="text-[9px] text-center text-slate-500 mt-2">
                  La IA puede cometer errores. Verifica la configuración.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
