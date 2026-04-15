// api/yandexgpt.js — прокси для YandexGPT API

export default async function handler(req, res) {
  // Разрешаем запросы
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { message, history = [] } = req.body;
    
    // Получаем API ключ и Folder ID из переменных окружения
    const apiKey = process.env.YANDEX_API_KEY;
    const folderId = process.env.YANDEX_FOLDER_ID;
    
    if (!apiKey || !folderId) {
      console.error('Missing YANDEX_API_KEY or YANDEX_FOLDER_ID');
      return res.status(500).json({ error: 'API not configured on server' });
    }
    
    // Формируем историю сообщений для контекста
    const messages = [
      {
        role: 'system',
        text: 'Ты — профессиональный карьерный консультант. Твоя задача — помогать людям с выбором профессии, образованием, карьерным ростом. Отвечай на русском языке, дружелюбно, конкретно, давай практические советы.'
      },
      ...history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        text: msg.content
      })),
      { role: 'user', text: message }
    ];
    
    // Запрос к YandexGPT API
    const response = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Api-Key ${apiKey}`
      },
      body: JSON.stringify({
        modelUri: `gpt://${folderId}/yandexgpt/latest`,
        completionOptions: {
          stream: false,
          temperature: 0.7,
          maxTokens: 500
        },
        messages: messages
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('YandexGPT API error:', data);
      return res.status(response.status).json({ 
        error: data.message || 'YandexGPT API error' 
      });
    }
    
    const reply = data.result.alternatives[0].message.text;
    console.log('Reply sent successfully');
    
    res.status(200).json({ reply });
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
}
