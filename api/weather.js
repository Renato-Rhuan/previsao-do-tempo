export default async function handler(req, res) {
  const cidade = req.query.city;

  if (!cidade) {
    return res.status(400).json({ error: 'Parâmetro city é obrigatório.' });
  }

  const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

  if (!OPENWEATHER_API_KEY) {
    return res.status(500).json({ error: 'Chave OpenWeather não configurada.' });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt_br`
    );
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao consultar OpenWeather:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar o tempo.' });
  }
}
