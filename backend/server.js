import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File path for storage
const filePath = path.join(__dirname, 'tasks.json');

// Helper functions for file-based storage
function readTasks() {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath));
  }
  return [];
}

function writeTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// Define OpenAI API Key and URL
const openaiApiUrl = 'https://api.openai.com/v1/chat/completions';

// Example route using OpenAI
app.post('/generate-email', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(openaiApiUrl, {
      model: "gpt-3.5-turbo",
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    }, {
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    console.log(response.data.choices[0].message.content);

    res.json({ emailContent: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error generating email content:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to generate email content. Please check API key and model.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});