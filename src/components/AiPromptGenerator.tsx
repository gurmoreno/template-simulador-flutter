import React, { useState } from 'react';
import { PaletteOption, ScreenConfig, ThemeMode } from '../types';
import { Sparkles, Loader2, ArrowRight, X, Code2, AlertCircle } from 'lucide-react';

interface AiPromptGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  themeMode: ThemeMode;
  palette: PaletteOption;
  onGeneratedCode: (prompt: string, dartCode: string) => void;
}

export const AiPromptGenerator: React.FC<AiPromptGeneratorProps> = ({
  isOpen,
  onClose,
  themeMode,
  palette,
  onGeneratedCode,
}) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickPrompts = [
    'Tela de Checkout com resumo do pedido e formas de pagamento (Pix/Cartão)',
    'Perfil do usuário com estatísticas, foto e botão de editar preferências',
    'Dashboard financeiro com lista de transações e saldo em destaque',
    'Lista de notificações com ícones M3 e marcas de lido/não lido',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/generate-flutter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          isDarkMode: themeMode === 'dark',
          primaryColor: palette.primary,
        }),
      });

      const data = await res.json();

      if (data.dartCode) {
        onGeneratedCode(prompt, data.dartCode);
        onClose();
      } else if (data.fallback) {
        setError('Opcional: A chave GEMINI_API_KEY pode ser configurada no menu Secrets. Atualizamos o código com o gerador avançado do Flutter UI Studio.');
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError(data.error || 'Falha ao gerar o código Flutter.');
      }
    } catch (err: any) {
      setError('Erro de conexão ao servidor Express.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl p-6 relative flex flex-col gap-5">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Gerar Tela Flutter com Agente GEMINI
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Descreva em português a interface visual desejada para Android, iOS e Web.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <textarea
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Exemplo: Crie uma tela de agendamento de consultas com seleção de data/hora, foto do especialista e botão para confirmar..."
            className="w-full text-xs p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />

          {/* Quick prompt chips */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              Sugestões Rápidas:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickPrompts.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(q)}
                  className="text-[10px] px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white text-xs font-bold shadow-md flex items-center gap-2 disabled:opacity-50 transition"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Gerando Código Dart...
                </>
              ) : (
                <>
                  <Code2 className="w-4 h-4" />
                  Gerar com Gemini
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
