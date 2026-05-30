# Previsão do Tempo

Aplicativo de previsão do tempo com backend para proteger chaves de API.

## O que este projeto faz

- Consulta o OpenWeather para buscar previsão do tempo
- Usa reconhecimento de voz para preencher a cidade
- Usa rota local para enviar dados ao servidor e proteger as chaves de API
- Mantém as chaves no backend, não no frontend

## Estrutura

- `index.html` — página principal
- `styles.css` — estilos visuais
- `script.js` — lógica de frontend
- `server.js` — backend Express para proxy das APIs
- `package.json` — dependências do Node.js
- `.env.example` — exemplo das variáveis de ambiente

## Como configurar

1. Copie `.env.example` para `.env`.
2. Preencha as variáveis:
   - `OPENWEATHER_API_KEY`
   - `GROQ_API_KEY`
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor localmente:
   ```bash
   npm start
   ```
5. Abra no navegador:
   ```
   http://localhost:3000
   ```

## Deploy no Vercel

1. Conecte o repositório no Vercel.
2. Defina as variáveis de ambiente no painel do Vercel:
   - `OPENWEATHER_API_KEY`
   - `GROQ_API_KEY`
3. O Vercel publica automaticamente o site com as funções em `api/`.

## Como funciona

- O frontend chama `/api/weather` para buscar o tempo usando a chave do OpenWeather no servidor.
- O frontend chama `/api/ai` para obter a sugestão de roupa usando a chave Groq no servidor.
- As chaves não ficam expostas no código que roda no navegador.

## Importante

- Não compartilhe o arquivo `.env` no GitHub.
- O `.gitignore` já protege `node_modules/`, `.env` e `.vercel`.


Projeto simples de previsão do tempo com sugestão de roupa usando APIs externas.

## Descrição

Este site permite pesquisar a condição do tempo de uma cidade e receber uma sugestão de roupa com base na temperatura e umidade.

## Funcionalidades

- Pesquisa por cidade usando OpenWeather
- Exibe temperatura, umidade e ícone do clima
- Possui comando de voz para ditar a cidade
- Envia dados para uma API de IA para sugerir roupa

## Como usar

1. Abra o arquivo `index.html` em um navegador.
2. Digite o nome da cidade no campo de texto.
3. Clique no botão de busca para ver a previsão.
4. Clique em "Sugestão de Roupa" para receber a sugestão via IA.
5. Use o botão de microfone para ditar o nome da cidade (se o navegador suportar `webkitSpeechRecognition`).

## Estrutura do projeto

- `index.html` - estrutura da página
- `styles.css` - estilos visuais
- `script.js` - lógica de busca, voz e IA
- `img/` - imagens usadas no site

## Melhorias recomendadas

- Mover as chamadas de API para um servidor seguro
- Proteger chaves com variáveis de ambiente
- Tratar erros de forma mais robusta
- Melhorar acessibilidade e feedback visual

## Licença

Este projeto é livre para uso e estudo.
