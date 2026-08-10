import React, { useState } from 'react';
import { PaletteOption, ScreenConfig, ThemeMode } from '../types';
import {
  generateMainDartCode,
  generateFlutterThemeCode,
  generatePubspecYaml,
  generateGithubWorkflow,
} from '../data/flutterTemplates';
import {
  Code2,
  Copy,
  Check,
  Download,
  FileCode,
  FolderTree,
  Terminal,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface FlutterCodeViewerProps {
  screenConfig: ScreenConfig;
  themeMode: ThemeMode;
  palette: PaletteOption;
}

export const FlutterCodeViewer: React.FC<FlutterCodeViewerProps> = ({
  screenConfig,
  themeMode,
  palette,
}) => {
  const [selectedFile, setSelectedFile] = useState<'main' | 'theme' | 'pubspec' | 'github' | 'readme'>('main');
  const [copied, setCopied] = useState(false);

  // Generate code dynamically based on current configuration
  const mainDartCode = screenConfig.customCode || generateMainDartCode(screenConfig, themeMode, palette);
  const themeCode = generateFlutterThemeCode(palette);
  const pubspecCode = generatePubspecYaml(screenConfig);
  const githubCode = generateGithubWorkflow();
  const readmeCode = `# ${screenConfig.appBarTitle} (Flutter Cross-Platform)

Este protótipo de aplicativo Flutter foi projetado no Google AI Studio.

## 🚀 Funcionalidades
- **Suporte Multi-plataforma**: Android, iOS e Web.
- **Material 3 Native Design**: ColorScheme.fromSeed com suporte a temas.
- **Paleta de Cores**: Azul (#1E88E5), Verde (#2E7D32) e Cinza (#607D8B).
- **Modo Claro / Escuro**: Suporte dinâmico a ThemeMode.

## 🛠️ Como Executar com o Flutter CLI
1. Certifique-se de ter o Flutter 3.x instalado.
2. Execute \`flutter pub get\`
3. Para rodar na Web: \`flutter run -d chrome\`
4. Para rodar no Android: \`flutter run -d android\`
5. Para rodar no iOS: \`flutter run -d iphone\`
`;

  const getActiveCode = () => {
    switch (selectedFile) {
      case 'main':
        return mainDartCode;
      case 'theme':
        return themeCode;
      case 'pubspec':
        return pubspecCode;
      case 'github':
        return githubCode;
      case 'readme':
        return readmeCode;
      default:
        return mainDartCode;
    }
  };

  const getActiveFileName = () => {
    switch (selectedFile) {
      case 'main':
        return 'lib/main.dart';
      case 'theme':
        return 'lib/theme.dart';
      case 'pubspec':
        return 'pubspec.yaml';
      case 'github':
        return '.github/workflows/build.yml';
      case 'readme':
        return 'README.md';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([getActiveCode()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = getActiveFileName().split('/').pop() || 'main.dart';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[680px] bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      {/* Sidebar: File Explorer */}
      <div className="w-full lg:w-64 bg-slate-950 border-r border-slate-800 p-4 flex flex-col gap-4 shrink-0">
        <div className="flex items-center gap-2 text-slate-200 font-bold text-xs uppercase tracking-wider">
          <FolderTree className="w-4 h-4 text-blue-400" />
          <span>Arquivos do Projeto Flutter</span>
        </div>

        <div className="flex flex-col gap-1 text-xs">
          <button
            onClick={() => setSelectedFile('main')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2 font-mono transition ${
              selectedFile === 'main'
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4 text-blue-400" />
            <span className="truncate">lib/main.dart</span>
          </button>

          <button
            onClick={() => setSelectedFile('theme')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2 font-mono transition ${
              selectedFile === 'theme'
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4 text-emerald-400" />
            <span className="truncate">lib/theme.dart</span>
          </button>

          <button
            onClick={() => setSelectedFile('pubspec')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2 font-mono transition ${
              selectedFile === 'pubspec'
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4 text-amber-400" />
            <span className="truncate">pubspec.yaml</span>
          </button>

          <button
            onClick={() => setSelectedFile('github')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2 font-mono transition ${
              selectedFile === 'github'
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4 text-purple-400" />
            <span className="truncate">.github/workflows/build.yml</span>
          </button>

          <button
            onClick={() => setSelectedFile('readme')}
            className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2 font-mono transition ${
              selectedFile === 'readme'
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4 text-slate-400" />
            <span className="truncate">README.md</span>
          </button>
        </div>

        {/* Quick Instructions box */}
        <div className="mt-auto p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-200">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>Executar no Flutter:</span>
          </div>
          <code className="bg-slate-950 p-2 rounded text-emerald-400 font-mono text-[10px] block">
            flutter create my_app
            <br />
            flutter run -d chrome
          </code>
        </div>
      </div>

      {/* Code Editor Container */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900">
        {/* Editor Toolbar */}
        <div className="h-12 border-b border-slate-800 px-4 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <span className="text-blue-400">flutter</span> /
            <span className="font-bold text-white">{getActiveFileName()}</span>
            {screenConfig.customCode && selectedFile === 'main' && (
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 text-[10px]">
                Gerado via Gemini AI
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copiado!' : 'Copiar Código'}
            </button>

            <button
              onClick={handleDownloadFile}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition"
            >
              <Download className="w-3.5 h-3.5" />
              Baixar Arquivo
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto p-4 font-mono text-xs text-slate-200 leading-relaxed custom-scrollbar selection:bg-blue-500/30 selection:text-white">
          <pre className="whitespace-pre">
            <code>
              {getActiveCode().split('\n').map((line, idx) => (
                <div key={idx} className="table-row">
                  <span className="table-cell select-none pr-4 text-right text-slate-600 text-[11px] w-10">
                    {idx + 1}
                  </span>
                  <span className="table-cell">{line}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
