const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// Generate interview question
router.post('/generate-question', async (req, res) => {
  try {
    const { topic } = req.body;

    const prompt = `
You are a DSA interviewer.

Generate one coding interview question on the topic "${topic}".

Include:

1. Problem statement
2. Example input and output
3. Constraints
4. Expected time complexity

Do NOT provide the solution.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt
    });

    res.json({
      question: response.text
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to generate question'
    });
  }
});

// Evaluate answer
router.post('/evaluate-answer', async (req, res) => {
  try {
    const { question, answer } = req.body;

    const prompt = `
You are a DSA interviewer.

Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer and provide:

1. Score out of 10
2. Strengths
3. Weaknesses
4. Suggestions for improvement
5. Ideal answer summary
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt
    });

    res.json({
      feedback: response.text
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to evaluate answer'
    });
  }
});

module.exports = router;