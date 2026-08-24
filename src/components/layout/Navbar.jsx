import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Plus, 
  Search, 
  Clock, 
  HardDriveDownload,
  Settings,
  BrainCircuit,
  BookOpen,
  Sparkles,
  Bot,
  Menu,
  X,
  Compass,
  FolderLock,
  Mic
} from 'lucide-react';
import { UserButton } from '@clerk/clerk-react';

export function Navbar({
  vaultData,
  activeProject,
  searchQuery,
  setSearchQuery,
  mainViewMode = 'vault',
  setMainViewMode,
  onOpenNewSecret,
  onOpenBackup,
  onOpenSettings,
  onOpenAiPlayground,
  onOpenGuide,
  onStartTour,
  onOpenAutoOrganizer,
  onOpenCopilotChat,
  onLockVault,
  autoLockMinutes = 15,
  lastActivityTime,
  isMobileMenuOpen,
  onToggleMobileMenu,
  isSidebarCollapsed,
  onToggleSidebar
}) {
  const [remainingTimeStr, setRemainingTimeStr] = useState('');

  useEffect(() => {
    if (!autoLockMinutes || autoLockMinutes === 0) {
      setRemainingTimeStr('Infinito');
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedMs = now - (lastActivityTime || now);
      const totalMs = autoLockMinutes * 60 * 1000;
      const remainingMs = Math.max(0, totalMs - elapsedMs);

      const mins = Math.floor(remainingMs / 60000);
      const secs = Math.floor((remainingMs % 60000) / 1000);

      setRemainingTimeStr(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [autoLockMinutes, lastActivityTime]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-vault-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Tu navegador no soporta búsqueda por voz. Usa Chrome o Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const totalSecrets = vaultData?.secrets?.length || 0;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/90 bg-vault-950/90 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-3 sm:px-6 gap-2 sm:gap-4">
        
        {/* Left: Mobile Menu Toggle + Brand */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Menu Toggle (Mobile & Desktop) */}
          <button
            type="button"
            onClick={() => {
              if (window.innerWidth < 1024) {
                onToggleMobileMenu();
              } else {
                onToggleSidebar();
              }
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Menú de Navegación"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : (isSidebarCollapsed ? <Menu className="w-5 h-5" /> : <Menu className="w-5 h-5 text-emerald-400" />)}
          </button>

          <div 
            id="tour-navbar-logo"
            onClick={() => setMainViewMode('vault')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-emerald-500/30 shadow-md shadow-emerald-950/40 shrink-0 group-hover:scale-105 transition-transform bg-slate-900">
              <img src="/devvault-logo.jpg" alt="DevVault" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="hidden sm:inline font-extrabold text-base sm:text-lg text-slate-100 tracking-tight">
                  Dev<span className="text-emerald-400">Vault</span>
                </span>
                <span className="px-1.5 py-0.2 text-[9px] sm:text-[10px] font-mono font-semibold uppercase tracking-wider rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  PRO AI
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Main View Switcher Pills */}
        <div id="tour-view-pills" className="flex items-center gap-1 bg-vault-900 p-1 rounded-2xl border border-slate-800 shrink-0">
          <button
            type="button"
            onClick={() => setMainViewMode('vault')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              mainViewMode === 'vault'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderLock className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Mi Bóveda</span>
            <span className={`text-[10px] font-mono font-extrabold px-1.5 py-0.2 rounded-full ${
              mainViewMode === 'vault' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
            }`}>
              {totalSecrets}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMainViewMode('encyclopedia')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              mainViewMode === 'encyclopedia'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/50'
                : 'text-slate-400 hover:text-cyan-300'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden xl:inline">Enciclopedia APIs</span>
            <span className="hidden md:inline-block text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
              30+ IA
            </span>
          </button>
        </div>

        {/* Global Search Bar (with Voice Search) */}
        <div className="hidden lg:flex flex-1 max-w-sm ml-2 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            id="global-vault-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar en la bóveda o APIs... (Ctrl+K)"
            className="block w-full pl-10 pr-10 py-1.5 border border-slate-700 rounded-xl leading-5 bg-vault-900 text-slate-200 placeholder-slate-400 focus:outline-none focus:bg-vault-850 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 sm:text-sm transition-colors"
          />
          <button
            type="button"
            onClick={handleVoiceSearch}
            title="Búsqueda por voz"
            className={`absolute inset-y-0 right-0 pr-2.5 flex items-center cursor-pointer transition-colors ${
              isListening ? 'text-rose-400 animate-pulse' : 'text-slate-400 hover:text-cyan-400'
            }`}
          >
            <Mic className="h-4 w-4" />
          </button>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          
          {/* AI Auto Organizer CTA */}
          <button
            onClick={onOpenAutoOrganizer}
            className="hidden lg:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 hover:from-emerald-500/30 hover:to-cyan-500/30 border border-emerald-500/40 text-emerald-300 font-semibold text-xs transition-all cursor-pointer shadow-sm"
            title="Auto-organizar con IA"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Organizar con IA</span>
          </button>

          {/* AI Copilot Chat */}
          <button
            onClick={onOpenCopilotChat}
            className="hidden md:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/40 text-purple-300 font-semibold text-xs transition-all cursor-pointer"
            title="Copilot Chat"
          >
            <Bot className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden xl:inline">Copilot</span>
          </button>

          {/* New Secret CTA */}
          <button
            id="tour-new-secret"
            onClick={onOpenNewSecret}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-emerald-950/50 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            <span className="hidden lg:inline">Nuevo</span>
          </button>

          {/* Tour Toggle */}
          <button
            onClick={onStartTour}
            title="Iniciar Tour Interactivo"
            className="p-1.5 sm:p-2 rounded-xl text-indigo-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors cursor-pointer hidden md:block"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              const isLight = document.documentElement.classList.toggle('light');
              localStorage.setItem('devvault-theme', isLight ? 'light' : 'dark');
            }}
            title="Cambiar Tema (Claro/Oscuro)"
            className="p-1.5 sm:p-2 rounded-xl text-amber-400 hover:text-amber-300 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            title="Ajustes"
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Lock Button */}
          <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-slate-800">
            <button
              onClick={onLockVault}
              title="Bloquear Memoria Local"
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-all cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Bloquear</span>
            </button>
            <div className="ml-1 flex items-center justify-center">
              <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8 rounded-xl border border-slate-700 shadow-md" } }} />
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}

