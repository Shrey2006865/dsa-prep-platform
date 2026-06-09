const express = require('express');

const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

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

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash'
    });

   let result;

for (let i = 0; i < 3; i++) {
  try {
    result = await model.generateContent(prompt);
    break;
  } catch (err) {
    if (err.status === 503) {
      console.log('Gemini busy, retrying...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    } else {
      throw err;
    }
  }
}
if (!result) {
  return res.status(503).json({
    message: "Gemini is busy. Please try again later."
  });
}
    const response = result.response;

    res.json({
      plan: response.text()
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router;