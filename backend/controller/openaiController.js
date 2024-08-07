import axios from 'axios';

const openaiApiKey = 'sk-None-DwuKfUCWS71MZtbrVrq6T3BlbkFJMhywSld1SSZ8CiSByDs7';
const openaiApiUrl = 'https://api.openai.com/v1/chat/completions';

const generateContent = async (prompt) => {
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

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating content:', error.response ? error.response.data : error.message);
    throw new Error('Failed to generate content. Please check API key and model.');
  }
};

export { generateContent };