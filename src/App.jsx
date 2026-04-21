import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SwipeView from './components/SwipeView';
import LeaderboardView from './components/LeaderboardView';
import SplashScreen from './components/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [view, setView] = useState('swipe'); // 'swipe' or 'leaderboard'
  const [employees, setEmployees] = useState([]);
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [seen, setSeen] = useState(() => {
    const saved = localStorage.getItem('employee_seen');
    return saved ? JSON.parse(saved) : [];
  });
  const [hasFinished, setHasFinished] = useState(() => {
    return localStorage.getItem('has_finished_swiping') === 'true';
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/employees');
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        
        const data = await res.json();
        if (Array.isArray(data)) {
          setEmployees(data);
          const scoreObj = data.reduce((acc, emp) => ({ ...acc, [emp.id]: emp.votes || 0 }), {});
          setScores(scoreObj);
          setError(null);
        } else {
          throw new Error("Backend did not return an array of employees");
        }
      } catch (err) {
        console.error("Failed to fetch employees:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('employee_seen', JSON.stringify(seen));
    if (seen.length === employees.length && employees.length > 0) {
      setHasFinished(true);
      localStorage.setItem('has_finished_swiping', 'true');
    }
  }, [seen, employees.length]);

  const handleVote = async (id, direction) => {
    try {
      const res = await fetch(`/api/employees/${id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction })
      });
      const updatedEmp = await res.json();
      
      setScores(prev => ({ ...prev, [id]: updatedEmp.votes }));
      setSeen(prev => [...prev, id]);
    } catch (err) {
      console.error("Vote failed:", err);
    }
  };


  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
      ) : (
        <>
          <div className="mesh-bg"></div>
          <div className="app-container">
            <header className="header">
              <h1 className="title">BPEmployee</h1>
              <p style={{color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', fontWeight: 500}}>
                Anonymous Swipe Feedback
              </p>
            </header>

            <div className="nav-tabs">
              {!hasFinished && (
                <button 
                  className={`nav-btn ${view === 'swipe' ? 'active' : ''}`}
                  onClick={() => setView('swipe')}
                >
                  Swipe
                </button>
              )}
              <button 
                className={`nav-btn ${view === 'leaderboard' ? 'active' : '' || (hasFinished && view === 'swipe')}`}
                onClick={() => setView('leaderboard')}
              >
                Leaderboard
              </button>
            </div>

            <main className="content-area">
              {loading ? (
                <div style={{ textAlign: 'center', marginTop: '5rem', color: 'rgba(255,255,255,0.5)' }}>
                  <div className="title" style={{ fontSize: '1.5rem' }}>Loading Employees...</div>
                </div>
              ) : error ? (
                <div className="glass" style={{ textAlign: 'center', padding: '3rem', marginTop: '2rem' }}>
                  <h2 style={{ color: '#ff0055', marginBottom: '1rem' }}>⚠️ Connection Error</h2>
                  <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>{error}</p>
                  <button className="nav-btn active" onClick={() => window.location.reload()}>
                    Try Again
                  </button>
                </div>
              ) : view === 'swipe' && !hasFinished ? (
                <SwipeView 
                  employees={employees.filter(e => Array.isArray(employees) && !seen.includes(e.id))} 
                  onVote={handleVote}
                  onFinish={() => setView('leaderboard')}
                />
              ) : (
                <LeaderboardView scores={scores} employees={employees} />
              )}
            </main>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default App;
