export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;

  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'Chave Groq não configurada.' });
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

    return res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao consultar Groq:', error);
    return res.status(500).json({ error: 'Erro interno ao obter sugestão de roupa.' });
  }
}
