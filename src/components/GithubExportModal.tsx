import React, { useState } from 'react';
import {
  Github,
  X,
  Check,
  Copy,
  Download,
  Terminal,
  ExternalLink,
  Code2,
  GitBranch,
  Layers,
  Sparkles
} from 'lucide-react';

interface GithubExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GithubExportModal: React.FC<GithubExportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const steps = [
    {
      title: '1. Exportar e Baixar o Projeto Flutter',
      description: 'Baixe os arquivos .dart (lib/main.dart, lib/theme.dart, pubspec.yaml) através do botão de download no visualizador de código.',
      command: 'flutter create --org com.exemplo meu_app_flutter',
    },
    {
      title: '2. Inicializar o Repositório Git Local',
      description: 'No terminal ou dentro da Antigravity IDE / VS Code, inicialize o Git e conecte ao seu repositório no GitHub:',
      command: `git init
git add .
git commit -m "feat: protótipo inicial Flutter Material 3 do Google AI Studio"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/meu_app_flutter.git
git push -u origin main`,
    },
    {
      title: '3. Executar o Código no Android, iOS e Web',
      description: 'O mesmo código Flutter Dart atenderá nativamente Android, iOS e a versão Web:',
      command: `# Para rodar na Web Desktop:
flutter run -d chrome

# Para rodar no Android:
flutter run -d android

# Para rodar no iOS (requer macOS/Xcode):
flutter run -d iphone`,
    },
  ];

  const handleCopyCommand = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl p-6 relative flex flex-col gap-5 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
            <Github className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Exportação e Integração com GitHub & Antigravity IDE
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Passo a passo para sincronizar o front-end em Flutter no seu repositório.
            </p>
          </div>
        </div>

        {/* Integration Callout */}
        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-xs text-blue-900 dark:text-blue-200 flex flex-col gap-2">
          <div className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-100">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Compartilhando o mesmo Agente GEMINI com a Google Antigravity IDE:</span>
          </div>
          <p className="leading-relaxed">
            Como este projeto utiliza o mesmo ecossistema do Google AI Studio e Gemini, você pode clonar este repositório no seu ambiente de desenvolvimento e usar as extensões do Gemini na IDE (Antigravity ou VS Code) para continuar incrementando a lógica das telas com os mesmos prompts!
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-col gap-2"
            >
              <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">
                  {idx + 1}
                </span>
                {step.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {step.description}
              </p>

              <div className="relative group mt-1">
                <pre className="p-3 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
                  <code>{step.command}</code>
                </pre>
                <button
                  onClick={() => handleCopyCommand(step.command, idx)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-medium border border-slate-700 flex items-center gap-1 transition opacity-90"
                >
                  {copiedIndex === idx ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  {copiedIndex === idx ? 'Copiado' : 'Copiar'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
          <a
            href="https://github.com/new"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1.5 hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Criar Repositório no GitHub
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
          >
            Concluído
          </button>
        </div>
      </div>
    </div>
  );
};
