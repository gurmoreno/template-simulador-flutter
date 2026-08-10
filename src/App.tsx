import React, { useState } from 'react';
import { DevicePlatform, PaletteOption, ScreenConfig, ScreenType, ThemeMode } from './types';
import { COLOR_PALETTES } from './data/flutterTemplates';
import { Header } from './components/Header';
import { DeviceSimulator } from './components/DeviceSimulator';
import { FlutterCodeViewer } from './components/FlutterCodeViewer';
import { ThemeCustomizer } from './components/ThemeCustomizer';
import { AiPromptGenerator } from './components/AiPromptGenerator';
import { GithubExportModal } from './components/GithubExportModal';
import { GoogleDriveModal } from './components/GoogleDriveModal';
import { generateMainDartCode } from './data/flutterTemplates';
import {
  Smartphone,
  Tablet,
  Monitor,
  Code2,
  Sparkles,
  Github,
  CheckCircle2,
  HelpCircle,
  Cpu,
  Layers,
  Palette
} from 'lucide-react';

const INITIAL_SCREENS: ScreenConfig[] = [
  {
    id: 'login',
    title: 'Cadastro Autônomo & Vínculo (Épico 1)',
    subtitle: 'Cadastro Autônomo E1-01, Handle @ & Token F-02',
    iconName: 'Lock',
    showAppBar: true,
    showBottomNav: false,
    showFAB: false,
    showDrawer: false,
    appBarTitle: 'Acesso & Convites',
  },
  {
    id: 'dashboard',
    title: 'Painel da Assessoria (Score & Aderência)',
    subtitle: 'Score F-03, Métricas, Treinos & Finanças',
    iconName: 'LayoutDashboard',
    showAppBar: true,
    showBottomNav: true,
    showFAB: true,
    showDrawer: true,
    appBarTitle: 'Painel da Assessoria',
  },
  {
    id: 'products',
    title: 'Gestão de Atletas & Grupos (Épico 2)',
    subtitle: 'Busca por Handle, Zonas & Grupos N:N',
    iconName: 'Users',
    showAppBar: true,
    showBottomNav: true,
    showFAB: true,
    showDrawer: false,
    appBarTitle: 'Atletas & Pelotões',
  },
  {
    id: 'form',
    title: 'Prescrição Estruturada & Zonas (Épico 3)',
    subtitle: 'Etapas de Esforço, Teste 3k/FTP & Zonas F-01',
    iconName: 'Activity',
    showAppBar: true,
    showBottomNav: false,
    showFAB: false,
    showDrawer: false,
    appBarTitle: 'Prescrever Treino',
  },
  {
    id: 'chat',
    title: 'Chat 1:1 & Feedbacks RPE (Épico 5)',
    subtitle: 'Contexto de Treino, RPE 1-10 & Notificações',
    iconName: 'MessageSquare',
    showAppBar: true,
    showBottomNav: false,
    showFAB: false,
    showDrawer: false,
    appBarTitle: 'Chat & Feedback',
  },
  {
    id: 'settings',
    title: 'Cobrança PIX, LGPD & Drive (Épico 6 & 7)',
    subtitle: 'Régua F-06, Consent Log E7 & Export F-09',
    iconName: 'Settings',
    showAppBar: true,
    showBottomNav: true,
    showFAB: false,
    showDrawer: false,
    appBarTitle: 'Gestão & Privacidade',
  },
];

export default function App() {
  const [platform, setPlatform] = useState<DevicePlatform>('android');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [activePalette, setActivePalette] = useState<PaletteOption>(COLOR_PALETTES[0]);
  const [activeView, setActiveView] = useState<'prototype' | 'code'>('prototype');
  const [activeScreenId, setActiveScreenId] = useState<ScreenType>('dashboard');
  const [screens, setScreens] = useState<ScreenConfig[]>(INITIAL_SCREENS);

  const [isAiPromptOpen, setIsAiPromptOpen] = useState(false);
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);

  const currentScreenConfig = screens.find((s) => s.id === activeScreenId) || screens[0];
  const currentDartCode = generateMainDartCode(currentScreenConfig, themeMode, activePalette);

  const handleUpdateScreenConfig = (updated: Partial<ScreenConfig>) => {
    setScreens((prev) =>
      prev.map((s) => (s.id === activeScreenId ? { ...s, ...updated } : s))
    );
  };

  const handleGeneratedCodeFromAi = (prompt: string, dartCode: string) => {
    handleUpdateScreenConfig({
      customPrompt: prompt,
      customCode: dartCode,
    });
    setActiveView('code');
  };

  return (
    <div className={`min-h-screen ${themeMode === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors font-sans antialiased`}>
      {/* App Header Bar */}
      <Header
        platform={platform}
        setPlatform={setPlatform}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        activePalette={activePalette}
        setActivePalette={setActivePalette}
        activeScreen={activeScreenId}
        setActiveScreen={setActiveScreenId}
        screens={screens}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenGithubModal={() => setIsGithubModalOpen(true)}
        onOpenAiPrompt={() => setIsAiPromptOpen(true)}
        onOpenDriveModal={() => setIsDriveModalOpen(true)}
      />

      {/* Main Workspace Body */}
      <main className="max-w-7xl mx-auto p-4 md:p-6 flex flex-col gap-6">
        {/* Banner Informando a Resposta do Ambiente AI Studio */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/90 via-slate-900 to-teal-900 text-white shadow-md border border-blue-800/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="font-bold text-sm md:text-base tracking-tight text-white flex items-center gap-2">
                Sim! Este é o ambiente ideal para criar seus protótipos Flutter & Gemini
              </h2>
              <p className="text-xs text-blue-100/80 mt-1 leading-relaxed max-w-3xl">
                Você pode projetar a interface visual responsiva (Android, iOS e Web), testar o suporte a Modo Claro/Escuro com a paleta Material 3 Luna Ocean (#54ACBF, #26658C, #011C40), gerar o código Dart correspondente e exportar tudo diretamente para o seu repositório no GitHub ou Google Antigravity IDE.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <button
              onClick={() => setIsAiPromptOpen(true)}
              className="w-full md:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Prompt AI com Gemini
            </button>
            <button
              onClick={() => setIsGithubModalOpen(true)}
              className="w-full md:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition flex items-center justify-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              Guia GitHub
            </button>
          </div>
        </div>

        {/* Main Grid View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Theme & Screen Customizer */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <ThemeCustomizer
              activePalette={activePalette}
              setActivePalette={setActivePalette}
              activeScreen={activeScreenId}
              setActiveScreen={setActiveScreenId}
              screens={screens}
              currentScreenConfig={currentScreenConfig}
              onUpdateScreenConfig={handleUpdateScreenConfig}
            />

            {/* Flutter Feature Highlights */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs shadow-xs flex flex-col gap-3">
              <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-blue-500" />
                Especificações Técinicas do Protótipo
              </span>

              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>
                    <strong>Material 3 ThemeData</strong> com <code className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">ColorScheme.fromSeed</code>
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>
                    <strong>Código Dart Único</strong> para Android, iOS & Web
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  <span>
                    <strong>Paleta M3:</strong> Luna Ocean (#54ACBF, #26658C, #011C40)
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>
                    <strong>Exportação CI/CD</strong> com GitHub Actions e Flutter CLI
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Device Simulator OR Flutter Code Viewer */}
          <div className="lg:col-span-8">
            {activeView === 'prototype' ? (
              <DeviceSimulator
                platform={platform}
                themeMode={themeMode}
                palette={activePalette}
                screenConfig={currentScreenConfig}
                onToggleTheme={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
              />
            ) : (
              <FlutterCodeViewer
                screenConfig={currentScreenConfig}
                themeMode={themeMode}
                palette={activePalette}
              />
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <AiPromptGenerator
        isOpen={isAiPromptOpen}
        onClose={() => setIsAiPromptOpen(false)}
        themeMode={themeMode}
        palette={activePalette}
        onGeneratedCode={handleGeneratedCodeFromAi}
      />

      <GithubExportModal
        isOpen={isGithubModalOpen}
        onClose={() => setIsGithubModalOpen(false)}
      />

      <GoogleDriveModal
        isOpen={isDriveModalOpen}
        onClose={() => setIsDriveModalOpen(false)}
        currentDartCode={currentDartCode}
        activePalette={activePalette}
        screens={screens}
      />
    </div>
  );
}
