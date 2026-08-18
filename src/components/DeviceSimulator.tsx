import React, { useState } from 'react';
import { DevicePlatform, PaletteOption, ScreenConfig, ThemeMode } from '../types';
import {
  Wifi,
  Battery,
  Signal,
  Search,
  Plus,
  Home,
  BarChart3,
  User,
  Settings,
  Mail,
  Lock,
  Menu,
  ChevronRight,
  Star,
  CheckCircle2,
  Send,
  Sun,
  Moon,
  ArrowRight,
  Sparkles,
  Smartphone,
  Tablet,
  Globe,
  Monitor
} from 'lucide-react';

interface DeviceSimulatorProps {
  platform: DevicePlatform;
  themeMode: ThemeMode;
  palette: PaletteOption;
  screenConfig: ScreenConfig;
  onToggleTheme: () => void;
}

export const DeviceSimulator: React.FC<DeviceSimulatorProps> = ({
  platform,
  themeMode,
  palette,
  screenConfig,
  onToggleTheme,
}) => {
  const [selectedBottomNav, setSelectedBottomNav] = useState(0);
  const [rememberMe, setRememberMe] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'ai', text: 'Olá! Sou seu assistente de prototipagem Flutter Material 3.' },
    { sender: 'user', text: 'Como ativo o modo escuro no app?' },
    { sender: 'ai', text: 'No Flutter, basta definir darkTheme: ThemeData(...) e alterar ThemeMode!' },
  ]);

  // E1-01 Cadastro Autônomo States
  const [e1Mode, setE1Mode] = useState<'register' | 'login'>('register');
  const [fullName, setFullName] = useState('Gustavo Silva');
  const [handle, setHandle] = useState('@gustavo.silva');
  const [email, setEmail] = useState('gustavo.silva@exemplo.com');
  const [birthDate, setBirthDate] = useState('1998-05-14');
  const [password, setPassword] = useState('Senha1234');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [registrationStatus, setRegistrationStatus] = useState<'idle' | 'success' | 'email_exists' | 'underage'>('idle');

  const handleNameChange = (val: string) => {
    setFullName(val);
    const slug = val
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '.');
    if (slug) {
      setHandle(`@${slug}`);
    } else {
      setHandle('@');
    }
  };

  const calculateAge = (dateStr: string) => {
    if (!dateStr) return 25;
    const birth = new Date(dateStr);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const userAge = calculateAge(birthDate);
  const isUnderage = userAge < 18;
  const isHandleAvailable = handle !== '@existente';

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUnderage) {
      setRegistrationStatus('underage');
      return;
    }
    if (email.toLowerCase().includes('existente')) {
      setRegistrationStatus('email_exists');
      return;
    }
    setRegistrationStatus('success');
  };

  const isDark = themeMode === 'dark';

  // Surface colors according to palette and light/dark theme
  const surfaceBg = isDark ? palette.surfaceDark : palette.surfaceLight;
  const bodyBg = isDark ? palette.backgroundDark : palette.backgroundLight;
  const textColor = isDark ? 'text-slate-100' : 'text-slate-900';
  const subtextColor = isDark ? 'text-slate-400' : 'text-slate-500';
  const borderColor = isDark ? 'border-slate-800' : 'border-slate-200';
  const inputBg = isDark 
    ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-b border-transparent focus:border-blue-400 focus:bg-slate-800' 
    : 'bg-slate-50 hover:bg-slate-100 text-slate-900 border-b border-transparent focus:border-blue-500 focus:bg-white';

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
    <div className="flex flex-col items-center justify-center min-h-[620px] p-4 bg-slate-100/70 dark:bg-slate-950/70 rounded-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors">
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
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
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
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
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
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-emerald-400">
                Flutter Web M3
              </span>
            </div>
          </div>

          {/* Web Desktop Canvas */}
          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col" style={{ backgroundColor: bodyBg }}>
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
            className={`px-4 py-3 border-b ${borderColor} flex items-center justify-between sticky top-0 z-10`}
            style={{ backgroundColor: surfaceBg }}
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
        <div className="flex-1 p-4 flex flex-col gap-4">
          {screenConfig.id === 'cadastro' && (
            <div className="flex-1 flex flex-col py-2 px-1 gap-4">
              {/* Clean underline tabs */}
              <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setE1Mode('register')}
                  className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
                    e1Mode === 'register'
                      ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  Primeiro Cadastro
                </button>
                <button
                  type="button"
                  onClick={() => setE1Mode('login')}
                  className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
                    e1Mode === 'login'
                      ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  Acesso via Convite
                </button>
              </div>

              {e1Mode === 'register' ? (
                <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3.5">
                  <div className="mb-1">
                    <h3 className={`text-[17px] font-semibold ${textColor}`}>Criar conta de atleta</h3>
                  </div>

                  {/* Nome Completo */}
                  <div>
                    <label className={`block text-[11px] font-medium mb-1 ${subtextColor}`}>
                      Nome Completo <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-2.5 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="Ex: Gustavo Silva"
                        required
                        className={`w-full text-sm pl-9 pr-3 py-2 rounded outline-none transition ${inputBg}`}
                      />
                    </div>
                  </div>

                  {/* Handle Único @id_publico */}
                  <div>
                    <label className={`block text-[11px] font-medium mb-1 ${subtextColor}`}>
                      ID de usuário <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-sm font-medium text-slate-400">@</span>
                      <input
                        type="text"
                        value={handle.replace(/^@/, '')}
                        onChange={(e) => setHandle(`@${e.target.value.toLowerCase().replace(/[^a-z0-9.]/g, '')}`)}
                        placeholder="gustavo.silva"
                        required
                        className={`w-full text-sm pl-8 pr-24 py-2 rounded outline-none transition font-mono ${inputBg} ${!isHandleAvailable ? '!border-rose-400 focus:!border-rose-500' : ''}`}
                      />
                      {isHandleAvailable ? (
                        <span className="absolute right-2.5 top-2.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-500">
                          Disponível
                        </span>
                      ) : (
                        <span className="absolute right-2.5 top-2.5 text-[11px] font-medium text-rose-600 dark:text-rose-500">
                          Indisponível
                        </span>
                      )}
                    </div>
                  </div>

                  {/* E-mail de Acesso */}
                  <div>
                    <label className={`block text-[11px] font-medium mb-1 ${subtextColor}`}>
                      E-mail de Acesso <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-2.5 top-2.5 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="gustavo.silva@exemplo.com"
                        required
                        className={`w-full text-sm pl-9 pr-3 py-2 rounded outline-none transition ${inputBg}`}
                      />
                    </div>
                  </div>

                  {/* Grid: Data de Nascimento + Senha */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className={`block text-[11px] font-medium ${subtextColor}`}>
                          Nascimento <span className="text-rose-500">*</span>
                        </label>
                        <span className={`text-[10px] font-medium ${isUnderage ? 'text-rose-500' : 'text-slate-400'}`}>
                          {userAge} anos
                        </span>
                      </div>
                      <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                        className={`w-full text-sm px-2.5 py-2 rounded outline-none transition ${inputBg}`}
                      />
                    </div>

                    <div>
                      <label className={`block text-[11px] font-medium mb-1 ${subtextColor}`}>
                        Senha (min 8) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className={`w-full text-sm px-2.5 py-2 rounded outline-none transition ${inputBg}`}
                      />
                    </div>
                  </div>

                  {/* RN-02 Age Alert */}
                  {isUnderage && (
                    <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border-l-2 border-rose-500 text-[11px] text-rose-700 dark:text-rose-300">
                      O cadastro autônomo é restrito a maiores de 18 anos.
                    </div>
                  )}

                  {/* Terms Checkbox */}
                  <div className="flex items-start gap-2 mt-1">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 rounded-sm text-blue-600 focus:ring-0"
                    />
                    <label htmlFor="terms" className={`text-[11px] leading-snug cursor-pointer ${textColor}`}>
                      Li e concordo com os Termos de Uso e Política de Privacidade.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!termsAccepted || isUnderage || !isHandleAvailable}
                    className={`w-full py-2.5 rounded text-white text-[13px] font-medium transition-opacity mt-2 ${
                      !termsAccepted || isUnderage || !isHandleAvailable ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                    }`}
                    style={{ backgroundColor: palette.primary }}
                  >
                    Concluir cadastro
                  </button>

                  {/* Registration Status Feedback */}
                  {registrationStatus === 'success' && (
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border-l-2 border-emerald-500 text-[11px] text-emerald-800 dark:text-emerald-200 flex flex-col gap-1 animate-fadeIn mt-2">
                      <div className="font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Conta criada com sucesso
                      </div>
                      <p className="opacity-90">
                        Handle <strong className="font-mono">{handle}</strong> reservado. Instruções enviadas para {email}.
                      </p>
                    </div>
                  )}

                  {registrationStatus === 'email_exists' && (
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border-l-2 border-amber-500 text-[11px] text-amber-800 dark:text-amber-200 flex flex-col gap-1 mt-2">
                      <div className="font-medium">E-mail já possui cadastro</div>
                      <p className="opacity-90">
                        Enviamos instruções de acesso para seu e-mail, preservando seu histórico esportivo existente.
                      </p>
                    </div>
                  )}
                </form>
              ) : (
                <div className="flex flex-col gap-4 py-2">
                  <div className="mb-2">
                    <h3 className={`text-[17px] font-semibold ${textColor}`}>Acesso & Ativação</h3>
                    <p className={`text-[12px] ${subtextColor}`}>Acesse sua conta ou ative o convite da assessoria</p>
                  </div>

                  <div>
                    <label className={`block text-[11px] font-medium mb-1 ${subtextColor}`}>E-mail</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-2.5 top-2.5 text-slate-400" />
                      <input
                        type="email"
                        placeholder="atleta@exemplo.com"
                        className={`w-full text-sm pl-9 pr-3 py-2 rounded outline-none transition ${inputBg}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-[11px] font-medium mb-1 ${subtextColor}`}>Senha</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-2.5 top-2.5 text-slate-400" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        className={`w-full text-sm pl-9 pr-3 py-2 rounded outline-none transition ${inputBg}`}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] mt-1">
                    <label className={`flex items-center gap-1.5 cursor-pointer ${textColor}`}>
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded-sm text-blue-600 focus:ring-0"
                      />
                      Lembrar meu acesso
                    </label>
                    <span className="font-medium text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                      Esqueceu a senha?
                    </span>
                  </div>

                  <button
                    className="w-full py-2.5 rounded text-white text-[13px] font-medium transition-opacity hover:opacity-90 mt-3"
                    style={{ backgroundColor: palette.primary }}
                  >
                    Entrar
                  </button>

                  <div className="p-3 bg-slate-50 dark:bg-slate-900 border-l-2 border-slate-300 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400 mt-2">
                    <span className="font-medium">Ativação por convite:</span> Se você foi cadastrado pela assessoria, use o e-mail recebido para definir sua senha e acessar.
                  </div>
                </div>
              )}
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
                  style={{ backgroundColor: palette.primary }}
                >
                  AP
                </div>
              </div>

              {/* Score de Aderência Banner */}
              <div
                className="rounded-2xl p-4 text-white shadow-md relative overflow-hidden"
                style={{ backgroundColor: palette.primary }}
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
                  className={`p-3 rounded-xl border ${borderColor} flex flex-col gap-1 shadow-xs`}
                  style={{ backgroundColor: surfaceBg }}
                >
                  <User className="w-4 h-4 text-blue-500" />
                  <span className={`text-[10px] font-medium ${subtextColor}`}>Atletas Ativos</span>
                  <span className={`text-xs font-bold ${textColor}`}>42 Atletas em 3 Grupos</span>
                </div>

                <div
                  className={`p-3 rounded-xl border ${borderColor} flex flex-col gap-1 shadow-xs`}
                  style={{ backgroundColor: surfaceBg }}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
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
                  className={`p-3 rounded-xl border ${borderColor} flex flex-col gap-1.5 shadow-xs`}
                  style={{ backgroundColor: surfaceBg }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Corrida — Intervalado 6x800m</span>
                    <span className="text-[10px] font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md">
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
                  className={`w-full text-xs pl-9 pr-3 py-2 rounded-xl border outline-none ${inputBg}`}
                />
              </div>

              {/* Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                <span
                  className="px-2.5 py-1 rounded-full font-bold text-white shadow-2xs shrink-0 cursor-pointer text-[10px]"
                  style={{ backgroundColor: palette.primary }}
                >
                  Todos (42)
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full border ${borderColor} ${textColor} shrink-0 cursor-pointer text-[10px]`}
                  style={{ backgroundColor: surfaceBg }}
                >
                  Pelotão 5h
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full border ${borderColor} ${textColor} shrink-0 cursor-pointer text-[10px]`}
                  style={{ backgroundColor: surfaceBg }}
                >
                  Iniciantes 10k
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full border ${borderColor} ${textColor} shrink-0 cursor-pointer text-[10px]`}
                  style={{ backgroundColor: surfaceBg }}
                >
                  Triathlon Iron
                </span>
              </div>

              {/* Athlete List Cards */}
              <div className="flex flex-col gap-2">
                <div
                  className={`p-3 rounded-2xl border ${borderColor} flex items-center gap-3 shadow-xs`}
                  style={{ backgroundColor: surfaceBg }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0"
                    style={{ backgroundColor: palette.primary }}
                  >
                    GS
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs font-bold truncate ${textColor}`}>Gustavo Silva</h4>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.5 rounded-md">
                        92% Aderência
                      </span>
                    </div>
                    <p className={`text-[10px] truncate ${subtextColor}`}>@gustavo.silva • Pelotão 5h • Pace Limiar: 4:20/km</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px]">
                      <span className="text-slate-500">FC Máx: 188 bpm</span>
                      <span>•</span>
                      <span className="text-blue-600 font-medium">Saúde: Consentido</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-2xl border ${borderColor} flex items-center gap-3 shadow-xs`}
                  style={{ backgroundColor: surfaceBg }}
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
                      <span className="text-emerald-600 font-medium">PIX em dia</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-2xl border ${borderColor} flex items-center gap-3 shadow-xs opacity-80`}
                  style={{ backgroundColor: surfaceBg }}
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
                className={`p-3 rounded-2xl border ${borderColor} flex items-center gap-3 shadow-xs`}
                style={{ backgroundColor: surfaceBg }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
                  style={{ backgroundColor: palette.primary }}
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
                  className={`rounded-2xl border ${borderColor} divide-y ${borderColor} shadow-xs overflow-hidden`}
                  style={{ backgroundColor: surfaceBg }}
                >
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className={`text-xs font-semibold ${textColor}`}>Régua de Inadimplência</p>
                      <p className={`text-[10px] ${subtextColor}`}>Carência de 5 dias pós-vencimento antes do bloqueio</p>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-100 dark:bg-blue-950 px-2 py-0.5 rounded-full">
                      5 Dias Carência
                    </span>
                  </div>

                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className={`text-xs font-semibold ${textColor}`}>Pagamento via QR Code PIX</p>
                      <p className={`text-[10px] ${subtextColor}`}>Baixa automática por Webhook instantâneo</p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                </div>
              </div>

              {/* LGPD & Consent Logs E7 / F-09 */}
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 block ${subtextColor}`}>
                  Privacidade, Consentimento & LGPD
                </span>
                <div
                  className={`rounded-2xl border ${borderColor} divide-y ${borderColor} shadow-xs overflow-hidden`}
                  style={{ backgroundColor: surfaceBg }}
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
                    <span className="text-[10px] font-bold text-teal-600 bg-teal-100 dark:bg-teal-950 px-2 py-0.5 rounded-full">
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
                  className={`w-full text-xs px-3 py-2 rounded-xl border outline-none ${inputBg}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={`block text-[11px] font-semibold mb-1 ${subtextColor}`}>Modalidade</label>
                  <select className={`w-full text-xs px-2.5 py-2 rounded-xl border outline-none ${inputBg}`}>
                    <option value="corrida">Corrida de Rua</option>
                    <option value="ciclismo">Ciclismo / Bike</option>
                    <option value="natacao">Natação</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-[11px] font-semibold mb-1 ${subtextColor}`}>Métrica Principal</label>
                  <select className={`w-full text-xs px-2.5 py-2 rounded-xl border outline-none ${inputBg}`}>
                    <option value="pace">Pace Limiar (min/km)</option>
                    <option value="fc">% Frequência Max</option>
                    <option value="potencia">Potência FTP (Watts)</option>
                  </select>
                </div>
              </div>

              {/* Zonas de Treino F-01 Card */}
              <div className="p-3 rounded-xl bg-teal-50 dark:bg-slate-800 border border-teal-200 dark:border-slate-700 text-xs flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-bold text-teal-800 dark:text-teal-300">
                  <span>🎯 Motor de Zonas Ativo</span>
                  <span className="text-[10px] font-normal bg-teal-200 dark:bg-teal-900 px-2 py-0.5 rounded-full">
                    Versão 2 (01/06)
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-[10px] text-slate-700 dark:text-slate-300">
                  <div className="bg-white dark:bg-slate-900 p-1.5 rounded-md text-center">Z1 Recup: 5:40+</div>
                  <div className="bg-white dark:bg-slate-900 p-1.5 rounded-md text-center font-bold text-teal-600">Z3 Limiar: 4:20-4:35</div>
                  <div className="bg-white dark:bg-slate-900 p-1.5 rounded-md text-center">Z5 Tiro: &lt;3:50</div>
                </div>
              </div>

              <button
                className="w-full py-2.5 rounded-xl text-white text-xs font-bold shadow-md transition-all mt-1"
                style={{ backgroundColor: palette.primary }}
              >
                SALVAR E ATRIBUIR TREINO
              </button>
            </div>
          )}

          {screenConfig.id === 'chat' && (
            <div className="flex flex-col h-full gap-2.5">
              <div
                className="p-2.5 rounded-xl text-[11px] flex items-center justify-between font-medium"
                style={{ backgroundColor: `${palette.primary}15`, color: palette.primary }}
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Chat 1:1 Atleta ↔ Treinador</span>
                </div>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Privado</span>
              </div>

              <div className="flex-1 flex flex-col gap-2 overflow-y-auto max-h-[380px] pr-1">
                <div className="p-2.5 rounded-2xl text-xs max-w-[90%] mr-auto border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-2xs">
                  <p className="font-bold text-[10px] text-blue-600">Treinador Marcos:</p>
                  <p className="mt-0.5">Ótimo treino hoje no intervalado! Manter o pace de 4:25 no 4º tiro foi essencial.</p>
                </div>

                <div className="p-2.5 rounded-2xl text-xs max-w-[90%] ml-auto text-white shadow-xs" style={{ backgroundColor: palette.primary }}>
                  <p className="font-bold text-[10px] text-blue-100">Gustavo Silva:</p>
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
                  className={`flex-1 text-xs px-3 py-2 rounded-xl border outline-none ${inputBg}`}
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl text-white shadow-xs"
                  style={{ backgroundColor: palette.primary }}
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
            className={`px-6 py-2 border-t ${borderColor} flex items-center justify-around sticky bottom-0 z-10`}
            style={{ backgroundColor: surfaceBg }}
          >
            <button
              onClick={() => setSelectedBottomNav(0)}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${
                selectedBottomNav === 0 ? 'text-blue-600 dark:text-blue-400' : subtextColor
              }`}
            >
              <Home className="w-5 h-5" />
              Início
            </button>
            <button
              onClick={() => setSelectedBottomNav(1)}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${
                selectedBottomNav === 1 ? 'text-blue-600 dark:text-blue-400' : subtextColor
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              Métricas
            </button>
            <button
              onClick={() => setSelectedBottomNav(2)}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition ${
                selectedBottomNav === 2 ? 'text-blue-600 dark:text-blue-400' : subtextColor
              }`}
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
