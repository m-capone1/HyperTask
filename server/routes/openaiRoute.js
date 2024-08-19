import express from 'express';
import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const openaiApiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: openaiApiKey,
});

router.post('/generate', async (req, res) => {
  const prompt = JSON.stringify(req.body);

  try {
    const completion = await openai.chat.completions.create({
      messages: [{
        role: "user",
        content: prompt,
      }],
      model: "gpt-4",
    });

    res.json(completion.choices[0].message.content);
  } catch (error) {
    console.error('Error generating content:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to generate content. Please check API key and model.' });
  }
});

export default router;