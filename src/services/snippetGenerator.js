/**
 * Multi-Language SDK & DevOps Snippet Generator
 */

export function generateSdkSnippets(secret) {
  const varName = secret?.varName || 'API_KEY';
  const val = secret?.value || '';
  const provider = secret?.providerId || '';

  return {
    pythonGenAi: `# 1. Instalar: pip install google-genai
import os
from google import genai

client = genai.Client(api_key=os.getenv("${varName}"))

response = client.models.generate_content(
    model="gemini-1.5-flash",
    contents="Explica qué es un LLM en 2 oraciones.",
)
print(response.text)`,

    pythonGroq: `# 1. Instalar: pip install groq
import os
from groq import Groq

client = Groq(api_key=os.getenv("${varName}"))

chat_completion = client.chat.completions.create(
    messages=[
        {"role": "system", "content": "Eres un asistente experto."},
        {"role": "user", "content": "Dame una idea de negocio con IA."}
    ],
    model="llama-3.3-70b-versatile",
)
print(chat_completion.choices[0].message.content)`,

    pythonLangChain: `# 1. Instalar: pip install langchain-google-genai langchain-groq langchain-openai
import os
from langchain_google_genai import ChatGoogleGenerativeAI

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    google_api_key=os.getenv("${varName}")
)

response = llm.invoke("¿Cuáles son los principios del código limpio?")
print(response.content)`,

    jsNode: `// 1. Instalar: npm install @google/genai dotenv
import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.${varName} });

async function main() {
  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: 'Hola, ¿cómo estás?'
  });
  console.log(response.text);
}
main();`,

    nextjsServerAction: `// app/actions/ai.ts
'use server';

// Al usar 'use server', la clave nunca se envía al navegador del cliente
export async function queryAI(prompt: string) {
  const apiKey = process.env.${varName};
  if (!apiKey) throw new Error('Falta ${varName} en el servidor');

  const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=\${apiKey}\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    })
  });
  return res.json();
}`,

    powershell: `# Cargar variable en la sesión actual de Windows PowerShell
$env:${varName} = "${val.replace(/"/g, '`"')}"
Write-Host "Variable ${varName} cargada en PowerShell."`,

    bash: `# Cargar variable en la sesión de terminal (Linux/macOS/WSL)
export ${varName}="${val.replace(/"/g, '\\"')}"
echo "Variable ${varName} exportada."`,

    dockerCompose: `# Fragmento para tu archivo docker-compose.yml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - ${varName}=\${${varName}}
    env_file:
      - .env`,

    k8sSecret: `# Manifiesto de Kubernetes Secret
apiVersion: v1
kind: Secret
metadata:
  name: devvault-secrets
  namespace: default
type: Opaque
stringData:
  ${varName}: "${val.replace(/"/g, '\\"')}"`,

    githubActions: `# Fragmento para tu archivo .github/workflows/deploy.yml
name: CI/CD Pipeline
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Tests with AI Key
        env:
          ${varName}: \${{ secrets.${varName} }}
        run: |
          npm test`
  };
}
