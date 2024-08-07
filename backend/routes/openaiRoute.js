import express from 'express';
import { generateContent } from './openaiService.js';

const router = express.Router();

router.post('/project/:id', async (req, res) => {
  const prompt = JSON.stringify(req.body);

  try {
    const content = await generateContent(prompt);
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;