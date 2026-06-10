import React, { useState } from 'react';
import axios from 'axios';

function AIInterviewer() {
  const [topic, setTopic] = useState('Arrays');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const generateQuestion = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        'https://dsa-prep-platform.onrender.com/api/interviewer/generate-question',
        {
          topic
        }
      );

      setQuestion(res.data.question);
      setFeedback('');
      setAnswer('');
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const evaluateAnswer = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        'https://dsa-prep-platform.onrender.com/api/interviewer/evaluate-answer',
        {
          question,
          answer
        }
      );

      setFeedback(res.data.feedback);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1>🤖 AI Interviewer</h1>

      <select
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      >
        <option>Arrays</option>
        <option>Linked List</option>
        <option>Trees</option>
        <option>Graphs</option>
        <option>Dynamic Programming</option>
        <option>Sorting</option>
      </select>

      <br />
      <br />

      <button onClick={generateQuestion}>
        Generate Question
      </button>

      {loading && <p>Loading...</p>}

      {question && (
        <>
          <h2>Question</h2>

          <pre
            style={{
              whiteSpace: 'pre-wrap'
            }}
          >
            {question}
          </pre>

          <textarea
            rows="10"
            cols="80"
            placeholder="Write your answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <br />
          <br />

          <button onClick={evaluateAnswer}>
            Evaluate Answer
          </button>
        </>
      )}

      {feedback && (
        <>
          <h2>Feedback</h2>

          <pre
            style={{
              whiteSpace: 'pre-wrap'
            }}
          >
            {feedback}
          </pre>
        </>
      )}
    </div>
  );
}

export default AIInterviewer;