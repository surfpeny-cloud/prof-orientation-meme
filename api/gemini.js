// api/gemini.js — исправленная версия с рабочей моделью

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
    const { message } = req.body;
    
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('GEMINI_API_KEY not set');
      return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
    }
    
    console.log('Sending request to Gemini with model: gemini-1.0-pro');
    
    // Используем рабочую модель gemini-1.0-pro
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `Ты — профессиональный карьерный консультант. Отвечай на русском языке, дружелюбно, конкретно, давай практические советы. Вопрос пользователя: ${message}` }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
          topP: 0.95
        }
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Gemini API error:', JSON.stringify(data, null, 2));
      
      let errorMessage = data.error?.message || 'Gemini API error';
      
      if (errorMessage.includes('not found') || errorMessage.includes('model')) {
        errorMessage = 'Модель временно недоступна. Попробуйте позже или обратитесь к разработчику.';
      }
      
      return res.status(response.status).json({ error: errorMessage });
    }
    
    const reply = data.candidates[0].content.parts[0].text;
    console.log('Reply received, length:', reply.length);
    
    res.status(200).json({ reply });
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
}
