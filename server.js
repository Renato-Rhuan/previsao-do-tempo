const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/api/weather', async (req, res) => {
  const cidade = req.query.city;

  if (!cidade) {
    return res.status(400).json({ error: 'Parâmetro city é obrigatório.' });
  }

  if (!OPENWEATHER_API_KEY) {
    return res.status(500).json({ error: 'Servidor não configurado com a chave OpenWeather.' });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt_br`
    );
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.json(data);
  } catch (error) {
    console.error('Erro ao consultar OpenWeather:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar o tempo.' });
  }
});

app.post('/api/ai', async (req, res) => {
  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'Servidor não configurado com a chave Groq.' });
  }

  const { cidade, temperatura, umidade } = req.body;

  if (!cidade || !temperatura || !umidade) {
    return res.status(400).json({ error: 'cidade, temperatura e umidade são obrigatórios.' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        messages: [
          {
            role: 'user',
            content: `Me de uma sugestão de qual roupa usar hoje. Estou na cidade de: ${cidade}, a temperatura atual é: ${temperatura} e a umidade está em: ${umidade}. Me de sugestões em 2 frases curtas.`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.json(data);
  } catch (error) {
    console.error('Erro ao consultar Groq:', error);
    return res.status(500).json({ error: 'Erro interno ao obter sugestão de roupa.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
