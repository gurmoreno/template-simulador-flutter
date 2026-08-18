# Padrão Visual e Design System — Run Forest Run

Este documento define os padrões de User Interface (UI) e a filosofia de design a serem seguidos em **todas** as futuras telas e protótipos da plataforma (tanto no simulador React quanto na geração de código Flutter). 

O objetivo é garantir uma interface "anti-slop" (livre do aspecto genérico gerado por IA), mantendo a estética minimalista, elegante, acessível e focada na usabilidade do atleta e do treinador.

## 1. Filosofia de Design ("Clean & Discreet")

A regra de ouro é **reduzir o ruído visual**. Se um elemento pode existir sem bordas pesadas ou sem fundos coloridos, ele deve ser simplificado.

- **Menos "Caixas":** Evite aninhamentos excessivos (cards dentro de cards). Use o espaço em branco (whitespace) para criar separações hierárquicas.
- **Foco no Conteúdo:** A interface deve desaparecer para dar lugar à informação (números de treino, gráficos, formulários).
- **Abordagem Flat-Subtle:** Fuga de sombras (`box-shadow`) intensas. Use sombras apenas em elementos que "flutuam" permanentemente, como `FloatingActionButton` ou Bottom Sheets. Para cards comuns, use uma elevação `0` com uma borda sutil.

## 2. Padrão de Campos de Formulário (Inputs)

Os campos de texto foram a base da nossa refatoração visual. O estilo predominante é o **Minimalista com Foco (Underline/Fill)**.

### Regras Visuais dos Inputs
- **Borda Geral:** Abolimos o `OutlineInputBorder` com caixa fechada 100% visível por padrão.
- **Fundo (Fill):** 
  - **Tema Claro:** Preenchimento ultra suave (`bg-slate-50` ou `Colors.grey.shade50`), garantindo que o formulário não pareça pesado.
  - **Tema Escuro:** Fundo sutil (`bg-slate-800`).
- **Comportamento Inativo:** Sem borda lateral ou superior. Apenas uma borda inferior (underline) transparente que ajuda a demarcar o limite.
- **Comportamento em Foco:** O fundo muda (ex: vai para branco puro no tema claro) e a borda inferior (`border-b`) ganha a cor de destaque (Azul Primário), guiando os olhos do usuário.
- **Ícones (Prefix):** Ícones nos campos devem ter cor neutra (`slate-400` / `grey`) e nunca devem competir com o texto.
- **Texto e Contraste:** O texto digitado pelo usuário deve ter altíssimo contraste (Preto no claro, Branco no escuro).

*Referência Flutter:*
```dart
InputDecorationTheme(
  filled: true,
  fillColor: isDark ? const Color(0xFF1E293B) : Colors.grey.shade50,
  border: UnderlineInputBorder(
    borderRadius: BorderRadius.circular(12),
    borderSide: BorderSide.none,
  ),
  focusedBorder: UnderlineInputBorder(
    borderRadius: BorderRadius.circular(12),
    borderSide: const BorderSide(color: Color(0xFF26658C), width: 2),
  ),
  // ...
)
```

## 3. Navegação e Abas (Tabs)

Abas são usadas para navegação interna de telas, não para botões de ação principal.

- **Proibido "Pill Tabs" pesadas:** Botões de aba em formato de pílula maciça (completamente preenchidos com cores vibrantes) criam peso visual desnecessário.
- **Obrigatório "Underline Tabs":** Use texto limpo com uma barra inferior demarcando a aba ativa (ex: `<div className="border-b-2 border-blue-600">`).
- **Estados de Aba:**
  - *Ativo:* Cor primária da marca (Azul) + Borda inferior.
  - *Inativo:* Cor de texto neutra (Cinza) + Fundo transparente + Animação leve de hover.

## 4. Cores e Tipografia

A base cromática deve respeitar as variáveis definidas no `AppTheme` original (Luna Ocean).

### Cores Base
- **Ação Primária:** `Azul Médio (#26658C)`
- **Ação Secundária / Destaque (Dark):** `Ciano (#54ACBF)`
- **Superfície Escura:** `Azul Noite (#011C40)` 
- **Sucesso:** `Emerald` / Verde (exclusivo para confirmações e labels positivas).
- **Erro / Alerta:** `Rose` / Vermelho escuro.

### Tipografia
- O tamanho mínimo de clique/toque (`tap target`) é de `48px`.
- Hierarquia baseada em tamanho e peso, não apenas em variação de cor.
- Evite CAIXA ALTA em textos longos. Reserve para pequenos labels ou cabeçalhos de tabela.

## 5. Estrutura de Telas e Responsividade

- Todo formulário (como Login, Cadastro, Configurações) **DEVE** ter um `maxWidth` (ex: `max-w-md` ou `480px`). Formulários não devem esticar de ponta a ponta em monitores Ultrawide.
- Em telas Web/Tablet, o conteúdo deve flutuar no centro da tela ou ser distribuído em sidebars/bento-grids.

## 6. Feedback ao Usuário

- Ações que demandam carregamento devem alterar o estado do botão (ex: opacity-50) e exibir um loader, impedindo duplos cliques.
- Evite modais para validação. Mensagens de erro de formulário devem aparecer *inline*, abaixo ou dentro do respectivo campo de erro.
- O sucesso de ações locais deve usar discretos banners (`Snackbars` ou caixas com cor de fundo super suave) em vez de pop-ups bloqueantes.
