// api/yandexgpt.js — финальная версия

export default async function handler(req, res) {
  // CORS настройки
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
    
    // Берём ключи из переменных окружения Vercel
    const apiKey = process.env.YANDEX_API_KEY;
    const folderId = process.env.YANDEX_FOLDER_ID;
    
    // Проверяем наличие ключей
    if (!apiKey) {
      console.error('❌ YANDEX_API_KEY не найден');
      return res.status(500).json({ error: 'YANDEX_API_KEY not configured' });
    }
    
    if (!folderId) {
      console.error('❌ YANDEX_FOLDER_ID не найден');
      return res.status(500).json({ error: 'YANDEX_FOLDER_ID not configured' });
    }
    
    console.log(`✅ Folder ID: ${folderId}`);
    console.log(`✅ API Key starts with: ${apiKey.substring(0, 10)}...`);
    
    // Формируем запрос
    const requestBody = {
      modelUri: `gpt://${folderId}/yandexgpt/latest`,
      completionOptions: {
        stream: false,
        temperature: 0.7,
        maxTokens: 500
      },
      messages: [
        {
          role: 'system',
          text: 'Ты — профессиональный карьерный консультант. Отвечай на русском языке, дружелюбно, конкретно, давай практические советы.'
        },
        ...history.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          text: msg.content
        })),
        { role: 'user', text: message }
      ]
    };
    
    // Отправляем запрос в YandexGPT
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
      console.error('❌ Ошибка YandexGPT:', JSON.stringify(data, null, 2));
      
      let errorMessage = data.message || 'YandexGPT API error';
      
      if (errorMessage.includes('folder') || errorMessage.includes('catalog')) {
        errorMessage = 'Неверный Folder ID. Проверьте переменную YANDEX_FOLDER_ID в Vercel.';
      } else if (errorMessage.includes('api key') || errorMessage.includes('unauthorized')) {
        errorMessage = 'Неверный API ключ. Проверьте YANDEX_API_KEY в Vercel.';
      } else if (errorMessage.includes('quota') || errorMessage.includes('limit')) {
        errorMessage = 'Превышен лимит запросов. Проверьте баланс гранта.';
      }
      
      return res.status(response.status).json({ error: errorMessage });
    }
    
    const reply = data.result.alternatives[0].message.text;
    console.log('✅ Ответ получен, длина:', reply.length);
    
    res.status(200).json({ reply });
    
  } catch (error) {
    console.error('❌ Ошибка сервера:', error);
    res.status(500).json({ error: 'Внутренняя ошибка: ' + error.message });
  }
}
