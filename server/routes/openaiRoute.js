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