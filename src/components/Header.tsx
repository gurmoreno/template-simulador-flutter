import React from 'react';
import { DevicePlatform, PaletteOption, ScreenConfig, ScreenType, ThemeMode } from '../types';
import { COLOR_PALETTES } from '../data/flutterTemplates';
import {
  Smartphone,
  Tablet,
  Monitor,
  Sun,
  Moon,
  Github,
  Code2,
  Sparkles,
  Layout,
  Layers,
  Palette,
  Download,
  HardDrive
} from 'lucide-react';

interface HeaderProps {
  platform: DevicePlatform;
  setPlatform: (p: DevicePlatform) => void;
  themeMode: ThemeMode;
  setThemeMode: (t: ThemeMode) => void;
  activePalette: PaletteOption;
  setActivePalette: (p: PaletteOption) => void;
  activeScreen: ScreenType;
  setActiveScreen: (s: ScreenType) => void;
  screens: ScreenConfig[];
  activeView: 'prototype' | 'code';
  setActiveView: (v: 'prototype' | 'code') => void;
  onOpenGithubModal: () => void;
  onOpenAiPrompt: () => void;
  onOpenDriveModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  platform,
  setPlatform,
  themeMode,
  setThemeMode,
  activePalette,
  setActivePalette,
  activeScreen,
  setActiveScreen,
  screens,
  activeView,
  setActiveView,
  onOpenGithubModal,
  onOpenAiPrompt,
  onOpenDriveModal,
}) => {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur sticky top-0 z-40 px-4 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo & App Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-teal-600 to-emerald-600 p-0.5 shadow-md flex items-center justify-center text-white">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-900 dark:text-white text-lg tracking-tight">
                  Flutter UI Studio
                </h1>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                  Material 3
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Prototipagem Cross-Platform (Android, iOS, Web) + Código Dart
              </p>
            </div>
          </div>

          {/* Mobile view switch buttons */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={() => setActiveView(activeView === 'prototype' ? 'code' : 'prototype')}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium flex items-center gap-1.5"
            >
              {activeView === 'prototype' ? <Code2 className="w-4 h-4" /> : <Layout className="w-4 h-4" />}
              {activeView === 'prototype' ? 'Ver Código' : 'Ver Protótipo'}
            </button>
          </div>
        </div>

        {/* View Switcher Tabs: Protótipo Visual vs Código Flutter */}
        <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveView('prototype')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'prototype'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layout className="w-4 h-4" />
            Protótipo Visual
          </button>
          <button
            onClick={() => setActiveView('code')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'code'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            Código Flutter (Dart)
          </button>
        </div>

        {/* Platform Selector (Android, iOS, Web) */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 justify-center">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              title="Preview Android (Google Pixel M3)"
              onClick={() => setPlatform('android')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                platform === 'android'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Android
            </button>
            <button
              title="Preview iOS (iPhone M3 Adaptive)"
              onClick={() => setPlatform('ios')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                platform === 'ios'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              iOS
            </button>
            <button
              title="Preview Web Desktop Responsive"
              onClick={() => setPlatform('web')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                platform === 'web'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Web
            </button>
          </div>

          {/* Light / Dark Mode toggle */}
          <button
            onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            title={`Alternar para modo ${themeMode === 'light' ? 'Escuro' : 'Claro'}`}
          >
            {themeMode === 'light' ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* AI Prompt Generator Trigger */}
          <button
            onClick={onOpenAiPrompt}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-medium shadow-xs transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
            Gerar Tela com AI
          </button>

          {/* Google Drive Integration Modal Trigger */}
          <button
            onClick={onOpenDriveModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white text-xs font-medium shadow-xs transition"
          >
            <HardDrive className="w-3.5 h-3.5 text-teal-200" />
            Google Drive
          </button>

          {/* GitHub Integration Modal Trigger */}
          <button
            onClick={onOpenGithubModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-xs font-medium border border-slate-700 transition"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub / Export
          </button>
        </div>
      </div>
    </header>
  );
};
