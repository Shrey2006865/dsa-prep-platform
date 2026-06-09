const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

router.post('/', async (req, res) => {
  try {
    const { level, goal, time } = req.body;

    const prompt = `
Generate a personalized DSA study plan.

Current level: ${level}
Goal: ${goal}
Available time: ${time}

Give a week-by-week roadmap with topics and revision suggestions.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    res.json({
      plan: response.text
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
      error: err
    });
  }
});

module.exports = router;