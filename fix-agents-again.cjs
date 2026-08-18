const fs = require('fs');
const file = 'AGENTS.md';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /   - \*\*Passo C:\*\* Adicione um novo `case` com o mesmo `id` que você criou no Passo A. Retorne todo o código Flutter \(Dart\) da interface solicitada como uma template string.\n/g,
  "   - **Passo C:** Adicione um novo `case` com o mesmo `id` que você criou no Passo A. Retorne todo o código Flutter (Dart) da interface solicitada como uma template string.\n   - **Passo D:** Vá em `src/components/DeviceSimulator.tsx` e registre o novo arquivo/tela no dicionário virtual do simulador para que ele não quebre o Flutter Web na hora de injetar o arquivo. Procure por `virtualFiles['/lib/theme/app_theme.dart']` e adicione seu novo arquivo abaixo, no formato `virtualFiles['/lib/screens/seu_arquivo.dart'] = getFlutterTemplate('seu_id_aqui');`\n"
);

fs.writeFileSync(file, content);
