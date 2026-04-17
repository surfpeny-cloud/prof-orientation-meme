// api/yandexgpt.js — исправленная версия

export default async function handler(req, res) {
  // CORS
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
    
    const apiKey = process.env.YANDEX_API_KEY;
    const folderId = process.env.YANDEX_FOLDER_ID;
    
    if (!apiKey || !folderId) {
      return res.status(500).json({ error: 'Missing API configuration' });
    }
    
    console.log('Folder ID:', folderId);
    
    // Правильный формат запроса для YandexGPT
    const requestBody = {
      modelUri: `gpt://${folderId}/yandexgpt/latest`,
      completionOptions: {
        stream: false,
        temperature: 0.6,
        maxTokens: 500
      },
      messages: [
        {
          role: 'system',
          text: 'Ты — карьерный консультант. Отвечай на русском, дружелюбно, давай конкретные советы.'
        },
        {
          role: 'user',
          text: message
        }
      ]
    };
    
    console.log('Sending request...');
    
    const response = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Api-Key ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('YandexGPT error:', data);
      
      // Детальная ошибка
      let errorMsg = data.message || 'Unknown error';
      if (errorMsg.includes('folder') || errorMsg.includes('catalog')) {
        errorMsg = 'Неверный Folder ID. Проверьте переменную YANDEX_FOLDER_ID в Vercel.';
      } else if (errorMsg.includes('api key') || errorMsg.includes('unauthorized')) {
        errorMsg = 'Неверный API ключ. Проверьте YANDEX_API_KEY в Vercel.';
      }
      
      return res.status(response.status).json({ error: errorMsg });
    }
    
    const reply = data.result.alternatives[0].message.text;
    res.status(200).json({ reply });
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
}
