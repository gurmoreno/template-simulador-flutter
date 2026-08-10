import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check API
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "Flutter UI Studio" });
  });

  // Gemini API route to generate custom Flutter screens
  app.post("/api/generate-flutter", async (req, res) => {
    try {
      const { prompt, screenType, isDarkMode, primaryColor } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(200).json({
          success: true,
          fallback: true,
          message: "GEMINI_API_KEY não configurada. Usando gerador estático do Flutter Studio.",
          dartCode: null
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemPrompt = `Você é um especialista sênior em desenvolvimento Flutter e Material Design 3.
Sua tarefa é gerar o código completo e executável em Dart para uma tela do aplicativo mobile/web conforme a solicitação do usuário.

REQUISITOS IMPORTANTES:
1. Use Flutter 3.x e componentes nativos do Material 3 (e.g., Scaffold, NavigationBar, Card, ElevatedButton, TextField, Switch, SegmentedButton, FloatingActionButton).
2. O código deve ser responsivo para Android, iOS e Web (use LayoutBuilder, Adaptive layouts ou SingleChildScrollView quando apropriado).
3. O código deve suportar modo Claro e Escuro com 'ThemeData(useMaterial3: true, colorScheme: ColorScheme.fromSeed(...))'.
4. Paleta de cores padrão: azul (primary), verde (secondary/accent) e cinza/slate (neutral).
5. O código Dart DEVE estar completo, sem reticências ou comentários tipo '// adicione aqui'.
6. Inclua todos os imports necessários (e.g., 'package:flutter/material.dart').
7. Retorne APENAS o código Dart limpo envolvido em bloco markdown \`\`\`dart ... \`\`\` e opcionalmente uma breve explicação em português de 2 frases antes do código.`;

      const userPrompt = `Crie a tela Flutter em Material 3 para o seguinte requisito:
"${prompt}"
Modo atual: ${isDarkMode ? "Escuro (Dark Mode)" : "Claro (Light Mode)"}
Cor Primária: ${primaryColor || "#1E88E5"} (Azul/Verde/Cinza Material 3)`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${systemPrompt}\n\n${userPrompt}`,
      });

      const generatedText = response.text || "";

      // Extract dart code block if present
      const dartMatch = generatedText.match(/```dart([\s\S]*?)```/);
      const dartCode = dartMatch ? dartMatch[1].trim() : generatedText;

      return res.json({
        success: true,
        generatedText,
        dartCode,
      });
    } catch (error: any) {
      console.error("Erro ao chamar a API do Gemini:", error);
      return res.status(500).json({
        error: "Falha ao gerar código Flutter com Gemini",
        details: error.message || String(error),
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Flutter UI Studio running at http://localhost:${PORT}`);
  });
}

startServer();
