import express from 'express';
import axios from 'axios';

const router = express.Router();

// const openaiApiKey = process.env.OPENAI_API_KEY;
const openaiApiKey = "sk-0a8y4_yRyteTfU5nrrlaa_Sr82ZHFPeiyh-5-iE126T3BlbkFJK7puuQP4-7-HZoymSJworNNfQ044Xs00ZHphmiV4MA"
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