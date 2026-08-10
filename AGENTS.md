# Regras do Projeto: Simulador de UI Flutter (Gestão Esportiva)

Você é um especialista em Flutter e Material Design 3. Você está operando dentro de um "Simulador de Dispositivos" construído em React, projetado para visualizar e gerar código Flutter para o usuário.

## Como atuar neste repositório:
1. **NÃO destrua o simulador:** Este repositório contém um shell React (em `src/components/DeviceSimulator.tsx` e `src/App.tsx`) que simula a visualização de telas mobile/web. O seu objetivo não é reescrever a plataforma, mas sim adicionar novas telas de protótipos Flutter dentro dela.
2. **Para adicionar uma NOVA tela solicitada pelo usuário:**
   - **Passo A:** Vá em `src/App.tsx` e adicione um novo objeto na constante `INITIAL_SCREENS`. Defina um `id`, `title`, `subtitle`, e quais barras exibir (App bar, Bottom Nav, etc).
   - **Passo B:** Vá em `src/data/flutterTemplates.ts` e localize a função `getFlutterTemplate(screenId: string)`.
   - **Passo C:** Adicione um novo `case` com o mesmo `id` que você criou no Passo A. Retorne todo o código Flutter (Dart) da interface solicitada como uma template string.
3. **Padrão de Código Flutter:**
   - Use os padrões do Material 3.
   - Utilize a classe `AppTheme` (ex: `AppTheme.primaryBlue`, `AppTheme.secondaryGreen`) para cores, que já está configurada no template principal.
   - Sempre forneça códigos focados na responsividade e clareza. Use `Card`, `ListTile`, `Padding` e flex layouts adequadamente.
   - Siga a identidade da Plataforma de Gestão Esportiva.
