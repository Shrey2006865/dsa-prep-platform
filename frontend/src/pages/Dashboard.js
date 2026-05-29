/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [form, setForm] = useState({ title: '', topic: 'Arrays', difficulty: 'Easy', platform: 'LeetCode', notes: '' });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');

  const fetchQuestions = async () => {
    try {
      const res = await axios.get('https://dsa-prep-platform.onrender.com/api/questions/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuestions(res.data);
    } catch (err) {
      console.log('Error fetching questions');
    }
  };

  useEffect(() => { fetchQuestions(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://dsa-prep-platform.onrender.com/api/questions/add', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowForm(false);
      setForm({ title: '', topic: 'Arrays', difficulty: 'Easy', platform: 'LeetCode', notes: '' });
      fetchQuestions();
    } catch (err) {
      console.log('Error adding question');
    }
  };
  const handleDelete = async (id) => {
  try {
    await axios.delete(
      `https://dsa-prep-platform.onrender.com/api/questions/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchQuestions();
  } catch (err) {
    console.log('Delete failed');
  }
};


  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const topics = ['Arrays', 'Linked List', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Searching', 'Stacks', 'Queues', 'Strings', 'Math', 'Other'];
  const topicCounts = topics.map(t => ({ topic: t, count: questions.filter(q => q.topic === t).length }));
  const calculateStreak = () => {
  if (questions.length === 0) return 0;

  const dates = [
    ...new Set(
      questions.map(q => new Date(q.solvedAt).toDateString())
    )
  ];

  dates.sort((a, b) => new Date(b) - new Date(a));

  let streak = 0;
  let currentDate = new Date();

  while (true) {
    const dateString = currentDate.toDateString();

    if (dates.includes(dateString)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

const streak = calculateStreak();
const filteredQuestions = questions.filter(q => {
  const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesTopic =
    selectedTopic === 'All' || q.topic === selectedTopic;

  const matchesDifficulty =
    selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;

  return matchesSearch && matchesTopic && matchesDifficulty;
});

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h1 style={styles.logo}>DSA Prep 🚀</h1>
        <div>
          <span style={styles.welcome}>Hi, {user.username}!</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <h2 style={styles.statNum}>{questions.length}</h2>
            <p style={styles.statLabel}>Total Solved</p>
          </div>
          <div style={styles.statCard}>
            <h2 style={styles.statNum}>{questions.filter(q => q.difficulty === 'Easy').length}</h2>
            <p style={styles.statLabel}>Easy</p>
          </div>
          <div style={styles.statCard}>
            <h2 style={styles.statNum}>{questions.filter(q => q.difficulty === 'Medium').length}</h2>
            <p style={styles.statLabel}>Medium</p>
          </div>
          <div style={styles.statCard}>
            <h2 style={styles.statNum}>{questions.filter(q => q.difficulty === 'Hard').length}</h2>
            <p style={styles.statLabel}>Hard</p>
          </div>
          <div style={styles.statCard}>
            <h2 style={styles.statNum}>🔥 {streak}</h2>
            <p style={styles.statLabel}>Day Streak</p>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Topic Progress</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topicCounts}>
              <XAxis dataKey="topic" tick={{ fill: '#94a3b8', fontSize: 11 }} angle={-45} textAnchor="end" height={70} />
              <YAxis tick={{ fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ background: '#1e293b', border: 'none', color: '#fff' }} />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          {topicCounts.map(({ topic, count }) => (
            <div key={topic} style={styles.topicRow}>
              <span style={styles.topicName}>{topic}</span>
              <div style={styles.barBg}>
                <div style={{ ...styles.barFill, width: `${Math.min(count * 10, 100)}%` }} />
              </div>
              <span style={styles.topicCount}>{count}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <button style={{...styles.addBtn, marginBottom: 0}} onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ Add Question'}
          </button>
          <button style={{...styles.addBtn, marginBottom: 0, background: '#7c3aed'}} onClick={() => navigate('/ai-hint')}>
            🤖 AI Hint
          </button>
        </div>

        {showForm && (
          <div style={styles.form}>
            <h3 style={{ color: '#fff', marginBottom: '16px' }}>Log a Solved Question</h3>
            <form onSubmit={handleAdd}>
              <input style={styles.input} placeholder="Question title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              <select style={styles.input} value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })}>
                {topics.map(t => <option key={t}>{t}</option>)}
              </select>
              <select style={styles.input} value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })}>
                <option>Easy</option><option>Medium</option><option>Hard</option>
              </select>
              <select style={styles.input} value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })}>
                <option>LeetCode</option><option>HackerRank</option><option>CodeForces</option><option>GeeksForGeeks</option><option>Other</option>
              </select>
              <textarea style={styles.input} placeholder="Notes (optional)" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
              <button style={styles.addBtn} type="submit">Save Question</button>
            </form>
          </div>
        )}

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Recent Questions</h2>
          <input
          style={styles.input}
          type="text"
  placeholder="🔍 Search questions..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  
/>
<div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>

  <select
    style={styles.input}
    value={selectedTopic}
    onChange={(e) => setSelectedTopic(e.target.value)}
  >
    <option>All</option>
    {topics.map(topic => (
      <option key={topic}>{topic}</option>
    ))}
  </select>

  <select
    style={styles.input}
    value={selectedDifficulty}
    onChange={(e) => setSelectedDifficulty(e.target.value)}
  >
    <option>All</option>
    <option>Easy</option>
    <option>Medium</option>
    <option>Hard</option>
  </select>

</div>
          {filteredQuestions.length === 0 && <p style={{ color: '#94a3b8' }}>No questions found.</p>}
          {filteredQuestions.slice(0, 10).map(q => (
            <div key={q._id} style={styles.questionCard}>
              <div>
                <p style={styles.questionTitle}>{q.title}</p>
                <p style={styles.questionMeta}>{q.topic} • {q.platform}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
  <span
    style={{
      ...styles.diffBadge,
      background:
        q.difficulty === 'Easy'
          ? '#22c55e'
          : q.difficulty === 'Medium'
          ? '#f59e0b'
          : '#ef4444'
    }}
  >
    {q.difficulty}
  </span>

  <button
    onClick={() => handleDelete(q._id)}
    style={{
      background: '#ef4444',
      color: '#fff',
      border: 'none',
      padding: '6px 10px',
      borderRadius: '6px',
      cursor: 'pointer'
    }}
  >
    🗑 Delete
  </button>
</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#0f172a' },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', background: '#1e293b', borderBottom: '1px solid #334155' },
  logo: { color: '#6366f1', margin: 0 },
  welcome: { color: '#94a3b8', marginRight: '16px' },
  logoutBtn: { padding: '8px 16px', background: 'transparent', border: '1px solid #334155', color: '#94a3b8', borderRadius: '8px', cursor: 'pointer' },
  content: { padding: '32px', maxWidth: '900px', margin: '0 auto' },
  statsRow: { display: 'grid',gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '32px' },
  statCard: { background: '#1e293b', padding: '24px', borderRadius: '12px', textAlign: 'center' },
  statNum: { color: '#6366f1', fontSize: '36px', margin: 0 },
  statLabel: { color: '#94a3b8', margin: '4px 0 0' },
  section: { background: '#1e293b', padding: '24px', borderRadius: '12px', marginBottom: '24px' },
  sectionTitle: { color: '#fff', marginTop: 0, marginBottom: '16px' },
  topicRow: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' },
  topicName: { color: '#94a3b8', width: '160px', fontSize: '14px' },
  barBg: { flex: 1, height: '8px', background: '#0f172a', borderRadius: '4px' },
  barFill: { height: '100%', background: '#6366f1', borderRadius: '4px', transition: 'width 0.3s' },
  topicCount: { color: '#6366f1', width: '24px', textAlign: 'right', fontSize: '14px' },
  addBtn: { padding: '12px 24px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', marginBottom: '24px' },
  form: { background: '#1e293b', padding: '24px', borderRadius: '12px', marginBottom: '24px' },
  input: { width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: '#fff', fontSize: '14px', boxSizing: 'border-box' },
  questionCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#0f172a', borderRadius: '8px', marginBottom: '8px' },
  questionTitle: { color: '#fff', margin: 0, fontSize: '14px' },
  questionMeta: { color: '#94a3b8', margin: '4px 0 0', fontSize: '12px' },
  diffBadge: { padding: '4px 10px', borderRadius: '12px', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
};

export default Dashboard;