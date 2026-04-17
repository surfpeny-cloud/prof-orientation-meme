// api/gemini.js — РАБОЧАЯ ВЕРСИЯ

export default async function handler(req, res) {
  // Разрешаем запросы с любого источника
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
    const { message } = req.body;
    
    // Получаем API ключ из переменных окружения Vercel
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('❌ GEMINI_API_KEY не найден в Vercel');
      return res.status(500).json({ 
        error: 'API ключ не настроен. Добавьте GEMINI_API_KEY в Environment Variables Vercel.' 
      });
    }
    
    console.log('📤 Отправка запроса в Gemini API...');
    
    // ПРАВИЛЬНЫЙ URL и ПРАВИЛЬНАЯ модель
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `Ты — профессиональный карьерный консультант. 
                  Твоя задача — помогать людям с выбором профессии, образованием и карьерным ростом.
                  Отвечай на русском языке, дружелюбно, конкретно, давай практические советы.
                  
                  Вопрос пользователя: ${message}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
            topP: 0.95,
            topK: 40
          }
        })
      }
    );
    
    const data = await response.json();
    
    // Проверяем ответ
    if (!response.ok) {
      console.error('❌ Ошибка Gemini API:', JSON.stringify(data, null, 2));
      
      let errorMessage = 'Ошибка Gemini API';
      
      if (data.error) {
        errorMessage = data.error.message;
        
        if (errorMessage.includes('API key not valid')) {
          errorMessage = '❌ Неверный API ключ. Проверьте GEMINI_API_KEY в Vercel.';
        } else if (errorMessage.includes('quota')) {
          errorMessage = '❌ Превышен лимит запросов. Бесплатный тариф Gemini: 60 запросов в минуту.';
        } else if (errorMessage.includes('model')) {
          errorMessage = '❌ Модель недоступна. Попробуйте позже.';
        }
      }
      
      return res.status(response.status).json({ error: errorMessage });
    }
    
    // Получаем ответ
    const reply = data.candidates[0].content.parts[0].text;
    console.log('✅ Ответ получен, длина:', reply.length);
    
    res.status(200).json({ reply });
    
  } catch (error) {
    console.error('❌ Ошибка сервера:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера: ' + error.message });
  }
}
