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
    id: 'cadastro',
    title: 'Primeiro Cadastro',
    subtitle: 'Cadastro Autônomo do Atleta',
    iconName: 'UserPlus',
    showAppBar: true,
    showBottomNav: false,
    showFAB: false,
    showDrawer: false,
    appBarTitle: 'Acesso & Convites',
  },
  {
    id: 'custom',
    title: 'Nova Tela',
    subtitle: 'Protótipo Vazio',
    iconName: 'Layout',
    showAppBar: true,
    showBottomNav: true,
    showFAB: true,
    showDrawer: false,
    appBarTitle: 'Nova Tela',
  },
];

export default function App() {
  const [platform, setPlatform] = useState<DevicePlatform>('android');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [activePalette, setActivePalette] = useState<PaletteOption>(COLOR_PALETTES[0]);
  const [activeView, setActiveView] = useState<'prototype' | 'code'>('prototype');
  const [activeScreenId, setActiveScreenId] = useState<ScreenType>('cadastro');
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
