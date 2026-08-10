import React from 'react';
import { PaletteOption, ScreenConfig, ScreenType } from '../types';
import { COLOR_PALETTES } from '../data/flutterTemplates';
import {
  Palette,
  Layers,
  Check,
  Smartphone,
  Sliders,
  Type,
  ToggleLeft,
  Layout
} from 'lucide-react';

interface ThemeCustomizerProps {
  activePalette: PaletteOption;
  setActivePalette: (p: PaletteOption) => void;
  activeScreen: ScreenType;
  setActiveScreen: (s: ScreenType) => void;
  screens: ScreenConfig[];
  currentScreenConfig: ScreenConfig;
  onUpdateScreenConfig: (updated: Partial<ScreenConfig>) => void;
}

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  activePalette,
  setActivePalette,
  activeScreen,
  setActiveScreen,
  screens,
  currentScreenConfig,
  onUpdateScreenConfig,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col gap-5">
      {/* 1. Selecionar Tela Protótipo */}
      <div>
        <div className="flex items-center gap-2 mb-3 text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider">
          <Layers className="w-4 h-4 text-blue-500" />
          <span>Telas do Protótipo (Flutter UI)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {screens.map((screen) => {
            const isSelected = activeScreen === screen.id;
            return (
              <button
                key={screen.id}
                onClick={() => setActiveScreen(screen.id)}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between h-20 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 shadow-2xs'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{screen.title}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  {screen.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Seleção de Paleta Material 3 */}
      <div>
        <div className="flex items-center gap-2 mb-3 text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider">
          <Palette className="w-4 h-4 text-emerald-500" />
          <span>Paleta Material 3 (Azul, Verde & Cinza)</span>
        </div>

        <div className="flex flex-col gap-2">
          {COLOR_PALETTES.map((palette) => {
            const isSelected = activePalette.id === palette.id;
            return (
              <button
                key={palette.id}
                onClick={() => setActivePalette(palette)}
                className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 shadow-2xs'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center -space-x-1">
                    <div
                      className="w-5 h-5 rounded-full border-2 border-white dark:border-slate-900 shadow-xs"
                      style={{ backgroundColor: palette.primary }}
                    />
                    <div
                      className="w-5 h-5 rounded-full border-2 border-white dark:border-slate-900 shadow-xs"
                      style={{ backgroundColor: palette.secondary }}
                    />
                    <div
                      className="w-5 h-5 rounded-full border-2 border-white dark:border-slate-900 shadow-xs"
                      style={{ backgroundColor: palette.neutralGray }}
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                      {palette.name}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono">
                      fromSeed: {palette.primary}
                    </span>
                  </div>
                </div>

                {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Personalização de Componentes e Estrutura */}
      <div>
        <div className="flex items-center gap-2 mb-3 text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider">
          <Sliders className="w-4 h-4 text-purple-500" />
          <span>Componentes Nativos Material 3</span>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-slate-500" />
              Título da AppBar:
            </label>
            <input
              type="text"
              value={currentScreenConfig.appBarTitle}
              onChange={(e) => onUpdateScreenConfig({ appBarTitle: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <label className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 cursor-pointer">
              <input
                type="checkbox"
                checked={currentScreenConfig.showAppBar}
                onChange={(e) => onUpdateScreenConfig({ showAppBar: e.target.checked })}
                className="rounded text-blue-600"
              />
              <span className="text-slate-700 dark:text-slate-300 font-medium text-[11px]">AppBar M3</span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 cursor-pointer">
              <input
                type="checkbox"
                checked={currentScreenConfig.showBottomNav}
                onChange={(e) => onUpdateScreenConfig({ showBottomNav: e.target.checked })}
                className="rounded text-blue-600"
              />
              <span className="text-slate-700 dark:text-slate-300 font-medium text-[11px]">NavigationBar</span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 cursor-pointer">
              <input
                type="checkbox"
                checked={currentScreenConfig.showFAB}
                onChange={(e) => onUpdateScreenConfig({ showFAB: e.target.checked })}
                className="rounded text-blue-600"
              />
              <span className="text-slate-700 dark:text-slate-300 font-medium text-[11px]">Floating Action (FAB)</span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 cursor-pointer">
              <input
                type="checkbox"
                checked={currentScreenConfig.showDrawer}
                onChange={(e) => onUpdateScreenConfig({ showDrawer: e.target.checked })}
                className="rounded text-blue-600"
              />
              <span className="text-slate-700 dark:text-slate-300 font-medium text-[11px]">Drawer Navigation</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
