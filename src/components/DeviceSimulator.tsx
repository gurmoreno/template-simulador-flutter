import React, { useState } from 'react';
import { DevicePlatform, PaletteOption, ScreenConfig, ThemeMode } from '../types';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  RefreshCw, 
  WifiOff,
  CheckCircle2,
  PlaySquare,
  FileText,
  Activity,
  MessageSquare,
  User,
  Search,
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Lock,
  Sun,
  Moon,
  AlertTriangle,
  XCircle,
  Info,
  Signal,
  Wifi,
  Battery,
  Globe,
  Menu,
  Sparkles,
  Send,
  Plus,
  Home,
  BarChart3
} from 'lucide-react';

interface DeviceSimulatorProps {
  platform: DevicePlatform;
  themeMode: ThemeMode;
  palette: PaletteOption;
  screenConfig: ScreenConfig;
  onToggleTheme: () => void;
}


const getLuminance = (hex) => {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >>  8) & 0xff;
  const b = (rgb >>  0) & 0xff;
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};
const getContrast = (hex1, hex2) => {
  const l1 = getLuminance(hex1) + 0.05;
  const l2 = getLuminance(hex2) + 0.05;
  return l1 > l2 ? l1 / l2 : l2 / l1;
};

export const DeviceSimulator: React.FC<DeviceSimulatorProps> = ({
  platform,
  themeMode,
  palette,
  screenConfig,
  onToggleTheme,
}) => {
  const [selectedBottomNav, setSelectedBottomNav] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'ai', text: 'Olá! Sou seu assistente de prototipagem Flutter Material 3.' },
    { sender: 'user', text: 'Como ativo o modo escuro no app?' },
    { sender: 'ai', text: 'No Flutter, basta definir darkTheme: ThemeData(...) e alterar ThemeMode!' },
  ]);






  const isDark = themeMode === 'dark';

  // Extract correct primary and outline colors based on theme
  const primary = themeMode === 'dark' ? palette.primaryDark : palette.primary;
  const outline = themeMode === 'dark' ? palette.outlineDark : palette.outlineLight;
  const secondary = palette.secondary;
  const onPrimary = themeMode === 'dark'
    ? (palette.id === 'deep-teal' ? '#FFFFFF' : palette.backgroundDark)
    : '#FFFFFF';
  const headerSupportColor = getContrast(palette.primary, palette.secondary) >= 4.5 ? palette.secondary : 'rgba(255, 255, 255, 0.8)';
  const accent = palette.accentGreen;

  // Surface colors according to palette and light/dark theme
  const surfaceBg = isDark ? palette.surfaceDark : palette.surfaceLight;
  const bodyBg = isDark ? palette.backgroundDark : palette.backgroundLight;
  const textColor = isDark ? 'text-slate-100' : 'text-slate-900';
  const subtextColor = isDark ? 'text-slate-400' : 'text-slate-500';
  const borderColor = isDark ? 'border-slate-800' : 'border-slate-200';
    const inputBg = 'border-b border-transparent focus:border-[var(--theme-primary)] transition';
  const containerBg = isDark ? palette.surfaceDark : palette.surfaceLight;
  const inkColor = isDark ? '#FFFFFF' : palette.backgroundDark;
  const mutedColor = isDark ? palette.secondary : palette.neutralGray;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatHistory([...chatHistory, { sender: 'user', text: chatMessage }]);
    setChatMessage('');
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Resposta em Flutter Material 3 gerada! O componente já foi atualizado.',
        },
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[620px] p-4 bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden transition-colors" style={{ '--theme-primary': primary, '--theme-outline': outline, '--theme-secondary': secondary, '--theme-accent': accent } as React.CSSProperties}>
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.05] pointer-events-none" />

      {/* Frame Container according to Platform */}
      {platform === 'android' && (
        <div className="w-[360px] h-[720px] bg-slate-900 rounded-[44px] p-3 shadow-2xl border-4 border-slate-800 relative flex flex-col transition-all">
          {/* Top Speaker / Camera punch hole */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-30 border border-slate-800 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-blue-900 rounded-full" />
          </div>

          {/* Device Screen Content */}
          <div
            className="w-full h-full rounded-[36px] overflow-hidden flex flex-col relative"
            style={{ backgroundColor: bodyBg }}
          >
            {/* Status Bar */}
            <div
              className={`h-7 px-6 flex items-center justify-between text-xs font-semibold z-20 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              <span>10:42</span>
              <div className="flex items-center gap-1.5">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* App Screen View */}
            <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col">
              {renderAppScreen()}
            </div>

            {/* Android Navigation Bar Indicator */}
            <div className="h-5 flex items-center justify-center bg-transparent z-20">
              <div className="w-28 h-1 bg-slate-400 dark:bg-slate-600 rounded-full" />
            </div>
          </div>
        </div>
      )}

      {platform === 'ios' && (
        <div className="w-[375px] h-[720px] bg-slate-900 rounded-[50px] p-3 shadow-2xl border-4 border-slate-800 relative flex flex-col transition-all">
          {/* iPhone Dynamic Island */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-30 flex items-center justify-between px-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
            <div className="w-2 h-2 rounded-full bg-blue-900" />
          </div>

          {/* Device Screen Content */}
          <div
            className="w-full h-full rounded-[42px] overflow-hidden flex flex-col relative"
            style={{ backgroundColor: bodyBg }}
          >
            {/* iOS Status Bar */}
            <div
              className={`h-10 pt-2 px-7 flex items-center justify-between text-xs font-semibold z-20 ${
                isDark ? 'text-slate-300' : 'text-slate-800'
              }`}
            >
              <span className="font-bold">9:41</span>
              <div className="flex items-center gap-1.5">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* App Screen View */}
            <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col">
              {renderAppScreen()}
            </div>

            {/* iOS Home Indicator */}
            <div className="h-6 flex items-center justify-center bg-transparent z-20">
              <div className="w-36 h-1 bg-slate-800 dark:bg-slate-200 rounded-full" />
            </div>
          </div>
        </div>
      )}

      {platform === 'web' && (
        <div className="w-full max-w-4xl h-[680px] bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col transition-all">
          {/* Browser Address Bar */}
          <div className="h-10 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>

            <div className="flex-1 max-w-md bg-slate-800/90 text-slate-300 text-xs px-3 py-1 rounded-lg flex items-center gap-2 border border-slate-700">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">https://flutter-ui-studio.web.app/#/{screenConfig.id}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono" style={{ color: accent }}>
                Flutter Web M3
              </span>
            </div>
          </div>

          {/* Web Desktop Canvas */}
          <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col" style={{ backgroundColor: bodyBg }}>
            {renderAppScreen()}
          </div>
        </div>
      )}
    </div>
  );

  function renderAppScreen() {
    return (
      <div className="flex-1 flex flex-col min-h-full">
        {/* Material 3 App Bar */}
        {screenConfig.showAppBar && (
          <div
            className={`px-4 py-3 border-b  flex items-center justify-between sticky top-0 z-10`}
            style={{ backgroundColor: surfaceBg, borderColor: outline }}
          >
            <div className="flex items-center gap-2">
              {screenConfig.showDrawer && (
                <button className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Menu className="w-5 h-5" />
                </button>
              )}
              <h2 className={`font-bold text-base ${textColor}`}>{screenConfig.appBarTitle}</h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onToggleTheme}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                title="Alternar Tema Claro/Escuro"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>
            </div>
          </div>
        )}

        {/* Screen Content according to active screenConfig.id */}
        <div className={`flex-1 flex flex-col ${screenConfig.id === 'padroes' ? '' : 'p-4 gap-4'}`}>
          {screenConfig.id === 'padroes' && (
            <div className="flex-1 flex flex-col relative overflow-hidden" style={{ backgroundColor: bodyBg }}>
              {/* a) ESTRUTURA - Faixa de Marca */}
              <div 
                className="w-full flex flex-col items-center justify-center p-6 relative shrink-0"
                style={{ backgroundColor: palette.primary, height: '30%' }}
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">RF</span>
                </div>
                <h1 className="text-white font-bold text-2xl mb-1">Padrões</h1>
                <p className="text-xs text-center" style={{ color: headerSupportColor }}>
                  Componentes do design system
                </p>
              </div>

              {/* Camada sobreposta */}
              <div 
                className="flex-1 flex flex-col -mt-4 rounded-t-[18px] relative z-10 px-4 py-2 min-h-0"
                style={{ backgroundColor: isDark ? palette.backgroundDark : '#FFFFFF' }}
              >
                <div className="w-[34px] h-[4px] rounded-full mx-auto my-3 shrink-0" style={{ backgroundColor: outline, opacity: 0.3 }} />
                
                <div className="flex-1 overflow-y-auto pb-6 scrollbar-hide flex flex-col gap-8 pt-2">
                  
                  {/* b) CAMPOS */}
                  <div className="flex flex-col gap-3">
                    <h2 className="text-[13px] font-bold" style={{ color: textColor }}>Campos de Formulário</h2>
                    
                    <div>
                      <label className="block text-[11px] font-medium mb-1" style={{ color: mutedColor }}>Neutro</label>
                      <input type="text" placeholder="Placeholder" className={`w-full text-sm px-3 py-2 rounded outline-none transition ${inputBg}`} style={{ borderColor: outline, backgroundColor: containerBg, color: inkColor }} />
                    </div>
                    
                    <div>
                      <label className="block text-[11px] font-medium mb-1" style={{ color: primary }}>Foco</label>
                      <input type="text" placeholder="Placeholder" className={`w-full text-sm px-3 py-2 rounded outline-none transition ${inputBg}`} style={{ borderColor: primary, backgroundColor: containerBg, color: inkColor }} />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium mb-1" style={{ color: mutedColor }}>Verificando</label>
                      <div className="relative">
                        <input type="text" placeholder="Placeholder" className={`w-full text-sm px-3 py-2 pr-8 rounded outline-none transition ${inputBg}`} style={{ borderColor: outline, backgroundColor: containerBg, color: inkColor }} />
                        <div className="absolute right-3 top-2.5 w-3.5 h-3.5 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: `${primary} transparent ${primary} ${primary}` }} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium mb-1" style={{ color: mutedColor }}>Disponível</label>
                      <div className="relative">
                        <input type="text" placeholder="Placeholder" className={`w-full text-sm px-3 py-2 pr-8 rounded outline-none transition ${inputBg}`} style={{ borderColor: outline, backgroundColor: containerBg, color: inkColor }} />
                        <span className="absolute right-2.5 top-2.5 text-[11px] font-medium" style={{ color: accent }}>Disponível</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium mb-1 text-rose-500">Erro</label>
                      <input type="text" placeholder="Placeholder" className={`w-full text-sm px-3 py-2 rounded outline-none transition ${inputBg}`} style={{ borderColor: '#f43f5e', backgroundColor: containerBg, color: inkColor }} />
                    </div>

                    <div className="opacity-50">
                      <label className="block text-[11px] font-medium mb-1" style={{ color: mutedColor }}>Desabilitado</label>
                      <input type="text" placeholder="Placeholder" disabled className={`w-full text-sm px-3 py-2 rounded outline-none transition ${inputBg}`} style={{ borderColor: outline, backgroundColor: containerBg, color: inkColor }} />
                    </div>
                  </div>

                  {/* c) BOTÕES */}
                  <div className="flex flex-col gap-3">
                    <h2 className="text-[13px] font-bold" style={{ color: textColor }}>Botões</h2>
                    <div className="flex items-center gap-2">
                      <button className="flex-1 py-2.5 rounded text-[13px] font-medium" style={{ backgroundColor: primary, color: onPrimary }}>Primário</button>
                      <button className="flex-1 py-2.5 rounded text-[13px] font-medium border" style={{ borderColor: primary, color: primary, backgroundColor: 'transparent' }}>Secundário</button>
                      <button className="flex-1 py-2.5 rounded text-[13px] font-medium" style={{ color: primary, backgroundColor: 'transparent' }}>Terciário</button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex-1 py-2.5 rounded text-[13px] font-medium opacity-50 cursor-not-allowed" style={{ backgroundColor: primary, color: onPrimary }}>Primário Inativo</button>
                    </div>
                  </div>

                  {/* d) CORES SEMÂNTICAS */}
                  <div className="flex flex-col gap-3">
                    <h2 className="text-[13px] font-bold" style={{ color: textColor }}>Cores Semânticas</h2>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 p-2 rounded text-[11px] font-medium" style={{ backgroundColor: isDark ? '#6FD79E20' : '#1B7A4B20', color: isDark ? '#6FD79E' : '#1B7A4B' }}>
                         <CheckCircle2 className="w-4 h-4" /> Sucesso
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded text-[11px] font-medium" style={{ backgroundColor: isDark ? '#F0C06020' : '#8A5A0020', color: isDark ? '#F0C060' : '#8A5A00' }}>
                         <AlertTriangle className="w-4 h-4" /> Aviso
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded text-[11px] font-medium" style={{ backgroundColor: isDark ? '#F2B8B520' : '#B3261E20', color: isDark ? '#F2B8B5' : '#B3261E' }}>
                         <XCircle className="w-4 h-4" /> Erro
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded text-[11px] font-medium" style={{ backgroundColor: isDark ? '#A9BECD20' : '#5A6B7A20', color: isDark ? '#A9BECD' : '#5A6B7A' }}>
                         <Info className="w-4 h-4" /> Neutro
                      </div>
                    </div>
                  </div>

                  {/* e) ZONAS DE TREINO */}
                  <div className="flex flex-col gap-3">
                    <h2 className="text-[13px] font-bold" style={{ color: textColor }}>Zonas de Treino</h2>
                    <div className="flex items-center overflow-hidden rounded text-[10px] text-white font-medium text-center">
                      <div className="flex-1 py-2 px-1" style={{ backgroundColor: '#2563EB' }}>Recup.</div>
                      <div className="flex-1 py-2 px-1" style={{ backgroundColor: '#0E7490' }}>Gordura</div>
                      <div className="flex-1 py-2 px-1" style={{ backgroundColor: '#15803D' }}>Aeróbico</div>
                      <div className="flex-1 py-2 px-1" style={{ backgroundColor: '#B45309' }}>Limiar</div>
                      <div className="flex-1 py-2 px-1" style={{ backgroundColor: '#C2410C' }}>Anaerob.</div>
                      <div className="flex-1 py-2 px-1" style={{ backgroundColor: '#E11D48' }}>Potência</div>
                    </div>
                  </div>

                  {/* f) TIPOGRAFIA */}
                  <div className="flex flex-col gap-3">
                    <h2 className="text-[13px] font-bold" style={{ color: textColor }}>Tipografia</h2>
                    <div className="flex flex-col gap-3" style={{ color: textColor }}>
                      <div className="flex items-baseline justify-between"><span className="text-2xl font-bold">Headline</span> <span className="text-[10px]" style={{ color: mutedColor }}>headlineSmall</span></div>
                      <div className="flex items-baseline justify-between"><span className="text-xl font-semibold">Title Large</span> <span className="text-[10px]" style={{ color: mutedColor }}>titleLarge</span></div>
                      <div className="flex items-baseline justify-between"><span className="text-base font-medium">Title Medium</span> <span className="text-[10px]" style={{ color: mutedColor }}>titleMedium</span></div>
                      <div className="flex items-baseline justify-between"><span className="text-sm">Body Large - Texto longo</span> <span className="text-[10px]" style={{ color: mutedColor }}>bodyLarge</span></div>
                      <div className="flex items-baseline justify-between"><span className="text-xs">Body Medium - Texto padrão</span> <span className="text-[10px]" style={{ color: mutedColor }}>bodyMedium</span></div>
                      <div className="flex items-baseline justify-between"><span className="text-[11px]">Body Small - Texto menor</span> <span className="text-[10px]" style={{ color: mutedColor }}>bodySmall</span></div>
                      <div className="flex items-baseline justify-between"><span className="text-[11px] font-bold uppercase tracking-wider">Label Large</span> <span className="text-[10px]" style={{ color: mutedColor }}>labelLarge</span></div>
                    </div>
                  </div>

                  {/* g) ESPAÇAMENTO */}
                  <div className="flex flex-col gap-3">
                    <h2 className="text-[13px] font-bold" style={{ color: textColor }}>Espaçamento</h2>
                    <div className="flex flex-col gap-2" style={{ color: textColor }}>
                      {[4, 8, 16, 24, 32, 48, 64].map((space) => (
                        <div key={space} className="flex items-center gap-3">
                          <span className="text-[10px] w-6 text-right" style={{ color: mutedColor }}>{space}</span>
                          <div className="h-4 rounded-sm" style={{ width: space, backgroundColor: primary }} />
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}
          {screenConfig.id === 'dashboard' && (
            <div className="flex flex-col gap-3.5">
              {/* Header Greeting */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-base font-bold ${textColor}`}>Assessoria Performance 👋</h3>
                  <p className={`text-[11px] ${subtextColor}`}>Painel Geral & Score de Aderência Unificado</p>
                </div>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-xs"
                  style={{ backgroundColor: primary }}
                >
                  AP
                </div>
              </div>

              {/* Score de Aderência Banner */}
              <div
                className="rounded-2xl p-4 text-white shadow-md relative overflow-hidden"
                style={{ backgroundColor: primary }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-white/90 font-medium">Score de Aderência Global</span>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white shadow-xs"
                    style={{ backgroundColor: palette.secondary }}
                  >
                    Meta 80%+
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <h4 className="text-2xl font-extrabold">84.5%</h4>
                  <span className="text-xs text-white/80">de treinos concluídos neste mês</span>
                </div>
                <div className="w-full bg-white/20 h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-white h-full w-[84.5%] rounded-full" />
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div
                  className={`p-3 rounded-xl border  flex flex-col gap-1 shadow-xs`}
                  style={{ backgroundColor: surfaceBg, borderColor: outline }}
                >
                  <User className="w-4 h-4" style={{ color: primary }} />
                  <span className={`text-[10px] font-medium ${subtextColor}`}>Atletas Ativos</span>
                  <span className={`text-xs font-bold ${textColor}`}>42 Atletas em 3 Grupos</span>
                </div>

                <div
                  className={`p-3 rounded-xl border  flex flex-col gap-1 shadow-xs`}
                  style={{ backgroundColor: surfaceBg, borderColor: outline }}
                >
                  <CheckCircle2 className="w-4 h-4" style={{ color: accent }} />
                  <span className={`text-[10px] font-medium ${subtextColor}`}>Faturamento PIX</span>
                  <span className={`text-xs font-bold ${textColor}`}>R$ 18.500 / R$ 2.400 pend</span>
                </div>
              </div>

              {/* Today's Workout Highlight */}
              <div>
                <h4 className={`text-[11px] font-bold uppercase tracking-wider mb-1.5 ${subtextColor}`}>
                  Treino Prescrito Destaque do Dia
                </h4>
                <div
                  className={`p-3 rounded-xl border  flex flex-col gap-1.5 shadow-xs`}
                  style={{ backgroundColor: surfaceBg, borderColor: outline }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold" style={{ color: primary }}>Corrida — Intervalado 6x800m</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md" style={{ backgroundColor: `${primary}15`, color: primary }}>
                      Pace Limiar (Z3)
                    </span>
                  </div>
                  <p className={`text-[11px] ${textColor}`}>
                    Aquecimento 15min + 6x (800m @ 4:15-4:30/km com 2min trote) + Desaquecimento 10min.
                  </p>
                </div>
              </div>
            </div>
          )}

          {screenConfig.id === 'products' && (
            <div className="flex flex-col gap-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nome ou @handle público..."
                  className={`w-full text-xs pl-9 pr-3 py-2 rounded-xl border outline-none ${inputBg}`} style={{ borderColor: outline }}
                />
              </div>

              {/* Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                <span
                  className="px-2.5 py-1 rounded-full font-bold text-white shadow-2xs shrink-0 cursor-pointer text-[10px]"
                  style={{ backgroundColor: primary }}
                >
                  Todos (42)
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full border  ${textColor} shrink-0 cursor-pointer text-[10px]`}
                  style={{ backgroundColor: surfaceBg, borderColor: outline }}
                >
                  Pelotão 5h
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full border  ${textColor} shrink-0 cursor-pointer text-[10px]`}
                  style={{ backgroundColor: surfaceBg, borderColor: outline }}
                >
                  Iniciantes 10k
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full border  ${textColor} shrink-0 cursor-pointer text-[10px]`}
                  style={{ backgroundColor: surfaceBg, borderColor: outline }}
                >
                  Triathlon Iron
                </span>
              </div>

              {/* Athlete List Cards */}
              <div className="flex flex-col gap-2">
                <div
                  className={`p-3 rounded-2xl border  flex items-center gap-3 shadow-xs`}
                  style={{ backgroundColor: surfaceBg, borderColor: outline }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0"
                    style={{ backgroundColor: primary }}
                  >
                    GS
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs font-bold truncate ${textColor}`}>Gustavo Silva</h4>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md" style={{ backgroundColor: `${accent}20`, color: accent }}>
                        92% Aderência
                      </span>
                    </div>
                    <p className={`text-[10px] truncate ${subtextColor}`}>@gustavo.silva • Pelotão 5h • Pace Limiar: 4:20/km</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px]">
                      <span className="text-slate-500">FC Máx: 188 bpm</span>
                      <span>•</span>
                      <span className="font-medium" style={{ color: primary }}>Saúde: Consentido</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-2xl border  flex items-center gap-3 shadow-xs`}
                  style={{ backgroundColor: surfaceBg, borderColor: outline }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0"
                    style={{ backgroundColor: palette.secondary }}
                  >
                    CT
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs font-bold truncate ${textColor}`}>Carla Teixeira</h4>
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-1.5 py-0.5 rounded-md">
                        75% Aderência
                      </span>
                    </div>
                    <p className={`text-[10px] truncate ${subtextColor}`}>@carla.triathlon • Triathlon Iron • FTP: 240W</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px]">
                      <span className="text-slate-500">VO2max: 54</span>
                      <span>•</span>
                      <span className="font-medium" style={{ color: accent }}>PIX em dia</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-2xl border  flex items-center gap-3 shadow-xs opacity-80`}
                  style={{ backgroundColor: surfaceBg, borderColor: outline }}
                >
                  <div className="w-10 h-10 rounded-full bg-slate-500 flex items-center justify-center font-bold text-xs text-white shrink-0">
                    RP
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs font-bold truncate ${textColor}`}>Rodrigo Pereira</h4>
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-100 dark:bg-rose-950 dark:text-rose-300 px-1.5 py-0.5 rounded-md">
                        Risco Churn (&gt;7d sem treino)
                      </span>
                    </div>
                    <p className={`text-[10px] truncate ${subtextColor}`}>@rodrigo.pedal • Iniciantes 10k • Vínculo Pausado</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {screenConfig.id === 'settings' && (
            <div className="flex flex-col gap-3.5">
              {/* Profile Bar */}
              <div
                className={`p-3 rounded-2xl border  flex items-center gap-3 shadow-xs`}
                style={{ backgroundColor: surfaceBg, borderColor: outline }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
                  style={{ backgroundColor: primary }}
                >
                  AP
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${textColor}`}>Assessoria Performance Pro</h4>
                  <p className={`text-[10px] ${subtextColor}`}>CNPJ 12.345.678/0001-90 • Owner: Marcos Treinador</p>
                </div>
              </div>

              {/* Finance & Inadimplência Régua F-06 */}
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 block ${subtextColor}`}>
                  Gestão Financeira & Cobrança PIX
                </span>
                <div
                  className={`rounded-2xl border  divide-y  shadow-xs overflow-hidden`}
                  style={{ backgroundColor: surfaceBg, borderColor: outline }}
                >
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className={`text-xs font-semibold ${textColor}`}>Régua de Inadimplência</p>
                      <p className={`text-[10px] ${subtextColor}`}>Carência de 5 dias pós-vencimento antes do bloqueio</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${primary}15`, color: primary }}>
                      5 Dias Carência
                    </span>
                  </div>

                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className={`text-xs font-semibold ${textColor}`}>Pagamento via QR Code PIX</p>
                      <p className={`text-[10px] ${subtextColor}`}>Baixa automática por Webhook instantâneo</p>
                    </div>
                    <CheckCircle2 className="w-4 h-4" style={{ color: accent }} />
                  </div>
                </div>
              </div>

              {/* LGPD & Consent Logs E7 / F-09 */}
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 block ${subtextColor}`}>
                  Privacidade, Consentimento & LGPD
                </span>
                <div
                  className={`rounded-2xl border  divide-y  shadow-xs overflow-hidden`}
                  style={{ backgroundColor: surfaceBg, borderColor: outline }}
                >
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className={`text-xs font-semibold ${textColor}`}>Consent Log Imutável</p>
                      <p className={`text-[10px] ${subtextColor}`}>Termos v2.1 • Aceito em 01/08/2026 (IP 177.12.90.1)</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>

                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className={`text-xs font-semibold ${textColor}`}>Exportação de Dados</p>
                      <p className={`text-[10px] ${subtextColor}`}>Download ZIP (JSON, CSV, FIT e GPX)</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${accent}20`, color: accent }}>
                      Disponível
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {screenConfig.id === 'form' && (
            <div className="flex flex-col gap-3">
              <h3 className={`text-sm font-bold ${textColor}`}>Prescrição Estruturada & Motor de Zonas</h3>
              <p className={`text-[11px] -mt-2 ${subtextColor}`}>Prescrever etapas com faixas de esforço e testes</p>

              <div>
                <label className={`block text-[11px] font-semibold mb-1 ${subtextColor}`}>Nome do Treino Prescrito</label>
                <input
                  type="text"
                  defaultValue="Intervalado de Tiro Limiar (6x800m)"
                  className={`w-full text-xs px-3 py-2 rounded-xl border outline-none ${inputBg}`} style={{ borderColor: outline }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={`block text-[11px] font-semibold mb-1 ${subtextColor}`}>Modalidade</label>
                  <select className={`w-full text-xs px-2.5 py-2 rounded-xl border outline-none ${inputBg}`} style={{ borderColor: outline }}>
                    <option value="corrida">Corrida de Rua</option>
                    <option value="ciclismo">Ciclismo / Bike</option>
                    <option value="natacao">Natação</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-[11px] font-semibold mb-1 ${subtextColor}`}>Métrica Principal</label>
                  <select className={`w-full text-xs px-2.5 py-2 rounded-xl border outline-none ${inputBg}`} style={{ borderColor: outline }}>
                    <option value="pace">Pace Limiar (min/km)</option>
                    <option value="fc">% Frequência Max</option>
                    <option value="potencia">Potência FTP (Watts)</option>
                  </select>
                </div>
              </div>

              {/* Zonas de Treino F-01 Card */}
              <div className="p-3 rounded-xl border text-xs flex flex-col gap-1.5" style={{ backgroundColor: isDark ? surfaceBg : `${accent}15`, borderColor: outline }}>
                <div className="flex items-center justify-between font-bold" style={{ color: isDark ? '#fff' : accent }}>
                  <span>🎯 Motor de Zonas Ativo</span>
                  <span className="text-[10px] font-normal px-2 py-0.5 rounded-full" style={{ backgroundColor: `${accent}30`, color: isDark ? '#fff' : '#000' }}>
                    Versão 2 (01/06)
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-[10px] text-slate-700 dark:text-slate-300">
                  <div className="bg-white dark:bg-slate-900 p-1.5 rounded-md text-center">Z1 Recup: 5:40+</div>
                  <div className="bg-white dark:bg-slate-900 p-1.5 rounded-md text-center font-bold" style={{ color: accent }}>Z3 Limiar: 4:20-4:35</div>
                  <div className="bg-white dark:bg-slate-900 p-1.5 rounded-md text-center">Z5 Tiro: &lt;3:50</div>
                </div>
              </div>

              <button
                className="w-full py-2.5 rounded-xl text-white text-xs font-bold shadow-md transition-all mt-1"
                style={{ backgroundColor: primary }}
              >
                SALVAR E ATRIBUIR TREINO
              </button>
            </div>
          )}

          {screenConfig.id === 'chat' && (
            <div className="flex flex-col h-full gap-2.5">
              <div
                className="p-2.5 rounded-xl text-[11px] flex items-center justify-between font-medium"
                style={{ backgroundColor: `${primary}15`, color: primary }}
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Chat 1:1 Atleta ↔ Treinador</span>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${accent}20`, color: accent }}>Privado</span>
              </div>

              <div className="flex-1 flex flex-col gap-2 overflow-y-auto max-h-[380px] pr-1">
                <div className="p-2.5 rounded-2xl text-xs max-w-[90%] mr-auto border bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-2xs" style={{ borderColor: outline }}>
                  <p className="font-bold text-[10px]" style={{ color: primary }}>Treinador Marcos:</p>
                  <p className="mt-0.5">Ótimo treino hoje no intervalado! Manter o pace de 4:25 no 4º tiro foi essencial.</p>
                </div>

                <div className="p-2.5 rounded-2xl text-xs max-w-[90%] ml-auto text-white shadow-xs" style={{ backgroundColor: primary }}>
                  <p className="font-bold text-[10px] opacity-80">Gustavo Silva:</p>
                  <p className="mt-0.5">Valeu professor! Senti um pouco de desgaste na última repetição (RPE 8). FC média deu 172 bpm.</p>
                  <div className="mt-2 p-1.5 rounded-lg bg-white/20 text-[9px] flex items-center justify-between">
                    <span>🏃 10.2 km • 45min • RPE 8</span>
                    <span className="font-bold">Anexado</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSendMessage} className="flex items-center gap-2 mt-auto pt-1">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Mensagem ou feedback sobre o treino..."
                  className={`flex-1 text-xs px-3 py-2 rounded-xl border outline-none ${inputBg}`} style={{ borderColor: outline }}
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl text-white shadow-xs"
                  style={{ backgroundColor: primary }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Floating Action Button (FAB) */}
        {screenConfig.showFAB && (
          <div className="absolute bottom-16 right-4 z-20">
            <button
              className="px-4 py-3 rounded-2xl text-white shadow-lg font-bold text-xs flex items-center gap-2 active:scale-95 transition"
              style={{ backgroundColor: palette.secondary }}
            >
              <Plus className="w-4 h-4" />
              Novo Item
            </button>
          </div>
        )}

        {/* Bottom Navigation Bar */}
        {screenConfig.showBottomNav && (
          <div
            className={`px-6 py-2 border-t  flex items-center justify-around sticky bottom-0 z-10`}
            style={{ backgroundColor: surfaceBg, borderColor: outline }}
          >
            <button
              onClick={() => setSelectedBottomNav(0)}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${
                selectedBottomNav === 0 ? '' : subtextColor
              }`}
              style={{ color: selectedBottomNav === 0 ? primary : undefined }}
            >
              <Home className="w-5 h-5" />
              Início
            </button>
            <button
              onClick={() => setSelectedBottomNav(1)}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${
                selectedBottomNav === 1 ? '' : subtextColor
              }`}
              style={{ color: selectedBottomNav === 1 ? primary : undefined }}
            >
              <BarChart3 className="w-5 h-5" />
              Métricas
            </button>
            <button
              onClick={() => setSelectedBottomNav(2)}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${
                selectedBottomNav === 2 ? '' : subtextColor
              }`}
              style={{ color: selectedBottomNav === 2 ? primary : undefined }}
            >
              <User className="w-5 h-5" />
              Perfil
            </button>
          </div>
        )}
      </div>
    );
  }
};
