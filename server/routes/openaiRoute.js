import express from 'express';
import axios from 'axios';

const router = express.Router();

// const openaiApiKey = process.env.OPENAI_API_KEY;
const openaiApiKey = "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"
const openaiApiUrl = 'https://api.openai.com/v1/chat/completions';

router.post('/generate', async (req, res) => {
  const prompt = JSON.stringify(req.body);

  try {
    const response = await axios.post(openaiApiUrl, {
      model: "gpt-3.5-turbo",
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 250,
    }, {
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error generating content:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to generate content. Please check API key and model.' });
  }
});

export default router;