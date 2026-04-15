// api/deepseek.js — прокси для DeepSeek API (работает на Vercel)

export default async function handler(req, res) {
  // Разрешаем запросы с любых источников (для тестирования)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Обрабатываем preflight запрос
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { message, history = [] } = req.body;
    
    // Проверяем наличие API ключа
    if (!process.env.DEEPSEEK_API_KEY) {
      console.error('DEEPSEEK_API_KEY not set');
      return res.status(500).json({ error: 'API key not configured' });
    }
    
    // Отправляем запрос в DeepSeek
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `Ты — профессиональный карьерный консультант и эксперт по профориентации. 
            Твоя задача — помогать людям с выбором профессии, образованием, карьерным ростом.
            Отвечай дружелюбно, конкретно, давай практические советы.
            Если спрашивают о профессиях — расскажи о навыках, зарплатах, курсах.
            Если не знаешь ответа — честно скажи и предложи поискать информацию.
            Отвечай на русском языке.`
          },
          ...history,
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('DeepSeek API error:', data);
      throw new Error(data.error?.message || 'API error');
    }
    
    const reply = data.choices[0].message.content;
    
    res.status(200).json({ reply });
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
}
