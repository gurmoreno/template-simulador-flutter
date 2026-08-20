# Regras do Projeto: Simulador de UI Flutter (Gestão Esportiva)

Você é um especialista em Flutter e Material Design 3. Você está operando dentro de um "Simulador de Dispositivos" construído em React, projetado para visualizar e gerar código Flutter para o usuário.

## Como atuar neste repositório:
1. **NÃO destrua o simulador:** Este repositório contém um shell React (em `src/components/DeviceSimulator.tsx` e `src/App.tsx`) que simula a visualização de telas mobile/web. O seu objetivo não é reescrever a plataforma, mas sim adicionar novas telas de protótipos Flutter dentro dela.
2. **Para adicionar uma NOVA tela solicitada pelo usuário:**
   - **Passo A:** Vá em `src/App.tsx` e adicione um novo objeto na constante `INITIAL_SCREENS`. Defina um `id`, `title`, `subtitle`, e quais barras exibir (App bar, Bottom Nav, etc).
   - **Passo B:** Vá em `src/data/flutterTemplates.ts` e localize a função `getFlutterTemplate(screenId: string)`.
   - **Passo C:** Adicione um novo `case` com o mesmo `id` que você criou no Passo A. Retorne todo o código Flutter (Dart) da interface solicitada como uma template string.
   - **Passo D:** Vá em `src/components/DeviceSimulator.tsx` e adicione o bloco
     de preview React da tela nova, seguindo o padrão dos blocos existentes:
     `{screenConfig.id === '<seu_id>' && ( ...JSX... )}`. ATENÇÃO: este preview
     React e o código Dart do Passo C são implementações SEPARADAS da mesma
     tela. Mantenha as duas coerentes — se divergirem, o que o usuário aprova no
     simulador não é o que será construído.
   - **Passo E (CRÍTICO):** Ao gerar código Dart usando Template Strings (\`), você **NUNCA** deve usar a interpolação do Dart com chaves `\${variavel}` sem escapar. O React vai tentar processar a variável e a aplicação vai "crashar". Sempre use a barra invertida antes do cifrão: `\\\${variavel}` ou use a interpolação simples `\$variavel` se não houver ambiguidade.
3. **Padrão de Código Flutter:**
   - Use os padrões do Material 3.
   - **Cor vem sempre de `Theme.of(context).colorScheme.<papel>`.** Nunca use constantes estáticas de cor (`AppTheme.primaryBlue`, `AppColors.x`), nunca `Color(0xFF...)` solto, nunca `Colors.white` / `Colors.black12` / `Colors.grey.shade50`. Texto sobre uma superfície usa sempre o `on<Papel>` correspondente (`onPrimary` sobre `primary`, `onSurface` sobre `surface`).
   - **Tipografia vem de `Theme.of(context).textTheme.<papel>`.** Proibido `fontSize:` e `fontWeight:` manuais dentro de `TextStyle`.
   - **Espaçamento em múltiplos de 8** (8, 16, 24, 32, 48, 64). Nada de número arbitrário em `Padding` / `SizedBox`.
   - Não use paleta Tailwind (`slate-50`, `slate-400`, `slate-800`, `#1E293B`, `#334155`): a paleta do produto é Luna Ocean.
   - Sempre forneça código responsivo e claro. Agrupe por espaço em branco ANTES de agrupar por caixa — não transforme tudo em `Card`. Card usa `elevation: 0` com borda sutil, nunca `BoxShadow` com blur alto.
   - Ação primária é `FilledButton` (não `ElevatedButton`). Alvo de toque mínimo 48x48 em qualquer elemento interativo.
   - Campo de formulário: padrão filled do M3 — preenchimento sutil, cantos superiores arredondados, indicador na base que ganha a cor primária no foco. O indicador do estado inativo NUNCA é `BorderSide.none`: sem ele o limite do campo fica em 1.03:1 e o usuário não enxerga onde tocar.
   - Siga a identidade da Plataforma de Gestão Esportiva.
