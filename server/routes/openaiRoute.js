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