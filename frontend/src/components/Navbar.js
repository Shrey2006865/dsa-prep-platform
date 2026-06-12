import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div
      style={{
        background: '#1e293b',
        padding: '16px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <h2 style={{ color: '#38bdf8' }}>
        🚀 DSA Prep Platform
      </h2>

      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/dashboard" style={styles.link}>
          Dashboard
        </Link>

        <Link to="/ai-hint" style={styles.link}>
          AI Hint
        </Link>

        <Link to="/ai-study-plan" style={styles.link}>
          Study Plan
        </Link>

        <Link to="/interviewer" style={styles.link}>
          AI Interview
        </Link>
      </div>
    </div>
  );
}

const styles = {
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px'
  }
};

export default Navbar;