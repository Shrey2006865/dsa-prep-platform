import React, { useState } from 'react';
import axios from 'axios';

function AIStudyPlan() {
  const [level, setLevel] = useState('');
  const [goal, setGoal] = useState('');
  const [time, setTime] = useState('');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        'http://localhost:5000/api/ai-study-plan',
        {
          level,
          goal,
          time
        }
      );

      setPlan(res.data.plan);
    } catch (err) {
      console.log(err);
      alert('Failed to generate study plan');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>🤖 AI Study Plan Generator</h1>

      <input
        type="text"
        placeholder="Current Level (Beginner/Intermediate)"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          marginTop: '20px'
        }}
      />

      <input
        type="text"
        placeholder="Goal (Placements/FAANG)"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          marginTop: '20px'
        }}
      />

      <input
        type="text"
        placeholder="Available Time (3 months)"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          marginTop: '20px'
        }}
      />

      <button
        onClick={generatePlan}
        style={{
          marginTop: '20px',
          padding: '12px 20px',
          cursor: 'pointer'
        }}
      >
        {loading ? 'Generating...' : 'Generate Plan'}
      </button>

      {plan && (
        <div
          style={{
            marginTop: '30px',
            padding: '20px',
            background: '#1e293b',
            color: '#fff',
            borderRadius: '12px',
            whiteSpace: 'pre-wrap'
          }}
        >
          {plan}
        </div>
      )}
    </div>
  );
}

export default AIStudyPlan;