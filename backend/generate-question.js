const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // כתובת ה-frontend שלך
}));

app.post('/api/competitions/generate-question', async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid prompt' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', errorText);
      return res.status(500).json({ error: 'OpenRouter API error' });
    }

    const data = await response.json();

    if (!data.choices || data.choices.length === 0) {
      return res.status(500).json({ error: 'No choices returned from API' });
    }

    const answer = data.choices[0].message.content.trim();

    // מחלקים לשורות ומנקים שורות ריקות
    const lines = answer.split('\n').map(line => line.trim()).filter(line => line !== '');

    if (lines.length < 2) {
      return res.status(500).json({ error: 'Invalid response format: not enough lines' });
    }

    // השורה הראשונה היא השאלה
    const question = lines[0];

    // שורות עם אפשרויות - מתאימות לתבנית א), ב), ג), ד)
    const options = lines
      .slice(1)
      .filter(line => /^[א-ד]\)/.test(line))
      .slice(0, 4); // לוקח עד 4 אפשרויות

    if (options.length === 0) {
      return res.status(500).json({ error: 'No valid options found' });
    }

    // מוצאים את התשובה הנכונה (אות בלבד)
    const match = answer.match(/\(תשובה נכונה:\s*([א-ד])\)/);
    const correctAnswer = match ? match[1] : null;

    if (!correctAnswer) {
      return res.status(500).json({ error: 'Correct answer not found' });
    }

    res.json({ question, options, correctAnswer });

  } catch (error) {
    console.error('Error from OpenRouter:', error);
    res.status(500).json({ error: 'Failed to generate question' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
