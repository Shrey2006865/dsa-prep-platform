import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AIHint() {
  const [question, setQuestion] = useState('');
  const [topic, setTopic] = useState('Arrays');
  const [difficulty, setDifficulty] = useState('Medium');
  const [hint, setHint] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const topics = ['Arrays', 'Linked List', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Searching', 'Stacks', 'Queues', 'Strings', 'Math', 'Other'];

  const getHint = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setHint('');
    try {
      const res = await axios.post('http://localhost:5000/api/ai/hint', { question, topic, difficulty });
      setHint(res.data.hint);
    } catch (err) {
      setHint('Error getting hint. Make sure the backend is running.');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h1 style={styles.logo}>DSA Prep 🚀</h1>
        <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>← Dashboard</button>
      </div>

      <div style={styles.content}>
        <h2 style={styles.title}>🤖 AI Hint Generator</h2>
        <p style={styles.subtitle}>Describe your problem and get a hint — not the answer!</p>

        <div style={styles.card}>
          <textarea
            style={styles.textarea}
            placeholder="Describe the DSA problem you're stuck on..."
            value={question}
            onChange={e => setQuestion(e.target.value)}
            rows={4}
          />

          <div style={styles.row}>
            <select style={styles.select} value={topic} onChange={e => setTopic(e.target.value)}>
              {topics.map(t => <option key={t}>{t}</option>)}
            </select>
            <select style={styles.select} value={difficulty} onChange={e => setDifficulty(e.target.value)}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <button style={styles.btn} onClick={getHint} disabled={loading}>
            {loading ? 'Getting hint...' : '💡 Get Hint'}
          </button>
        </div>

        {hint && (
          <div style={styles.hintCard}>
            <h3 style={styles.hintTitle}>💡 Your Hint</h3>
            <p style={styles.hintText}>{hint}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#0f172a' },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', background: '#1e293b', borderBottom: '1px solid #334155' },
  logo: { color: '#6366f1', margin: 0 },
  backBtn: { padding: '8px 16px', background: 'transparent', border: '1px solid #334155', color: '#94a3b8', borderRadius: '8px', cursor: 'pointer' },
  content: { padding: '32px', maxWidth: '700px', margin: '0 auto' },
  title: { color: '#fff', fontSize: '28px', marginBottom: '8px' },
  subtitle: { color: '#94a3b8', marginBottom: '32px' },
  card: { background: '#1e293b', padding: '24px', borderRadius: '12px', marginBottom: '24px' },
  textarea: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: '#fff', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' },
  row: { display: 'flex', gap: '12px', margin: '16px 0' },
  select: { flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: '#fff', fontSize: '14px' },
  btn: { width: '100%', padding: '14px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' },
  hintCard: { background: '#1e293b', border: '1px solid #6366f1', padding: '24px', borderRadius: '12px' },
  hintTitle: { color: '#6366f1', marginTop: 0 },
  hintText: { color: '#e2e8f0', lineHeight: '1.7', fontSize: '15px' }
};

export default AIHint;