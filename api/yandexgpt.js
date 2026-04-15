// api/yandexgpt.js — проверенная рабочая версия

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
    
    // Получаем переменные из окружения
    const apiKey = process.env.YANDEX_API_KEY;
    const folderId = process.env.YANDEX_FOLDER_ID;
    
    // Проверяем наличие переменных
    if (!apiKey) {
      console.error('YANDEX_API_KEY не задан');
      return res.status(500).json({ error: 'YANDEX_API_KEY not configured' });
    }
    
    if (!folderId) {
      console.error('YANDEX_FOLDER_ID не задан');
      return res.status(500).json({ error: 'YANDEX_FOLDER_ID not configured' });
    }
    
    console.log(`Folder ID: ${folderId}`);
    console.log(`API Key starts with: ${apiKey.substring(0, 10)}...`);
    
    // Формируем сообщения для YandexGPT
    const messages = [
      {
        role: 'system',
        text: 'Ты — карьерный консультант. Помогай с выбором профессии, образованием. Отвечай на русском, дружелюбно, давай конкретные советы.'
      }
    ];
    
    // Добавляем историю (последние 5 сообщений для контекста)
    const recentHistory = history.slice(-5);
    for (const msg of recentHistory) {
      messages.push({
        role: msg.role === 'user' ? 'user' : 'assistant',
        text: msg.content
      });
    }
    
    // Добавляем текущее сообщение
    messages.push({ role: 'user', text: message });
    
    // Формируем тело запроса
    const requestBody = {
      modelUri: `gpt://${folderId}/yandexgpt/latest`,
      completionOptions: {
        stream: false,
        temperature: 0.7,
        maxTokens: 500
      },
      messages: messages
    };
    
    console.log('Sending request to YandexGPT...');
    
    // Отправляем запрос
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
      console.error('YandexGPT error response:', JSON.stringify(data, null, 2));
      
      let errorMessage = 'Ошибка YandexGPT';
      
      if (data.message) {
        errorMessage = data.message;
      }
      
      if (data.code === 403 || errorMessage.includes('permission')) {
        errorMessage = 'Нет доступа. Проверьте роль сервисного аккаунта: нужна ai.languageModels.user';
      } else if (data.code === 400 || errorMessage.includes('folder')) {
        errorMessage = 'Неверный Folder ID. Проверьте переменную YANDEX_FOLDER_ID';
      } else if (data.code === 401 || errorMessage.includes('unauthorized')) {
        errorMessage = 'Неверный API ключ. Проверьте YANDEX_API_KEY';
      } else if (data.code === 429 || errorMessage.includes('quota')) {
        errorMessage = 'Превышен лимит запросов. Попробуйте через час';
      }
      
      return res.status(response.status).json({ error: errorMessage });
    }
    
    const reply = data.result.alternatives[0].message.text;
    console.log('Reply received, length:', reply.length);
    
    res.status(200).json({ reply });
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
}
