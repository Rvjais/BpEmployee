import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';

const LeaderboardView = ({ scores, employees, onReset }) => {
  // Sort employees by score (descending)
  const sortedEmployees = [...employees].sort((a, b) => scores[b.id] - scores[a.id]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1 }
  };

  return (
    <div className="leaderboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <Trophy color="#FFD700" size={28} /> Employee Rankings
        </h2>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
      >
        {sortedEmployees.map((emp, index) => {
          const rank = index + 1;
          const rankClass = rank <= 3 ? `rank-${rank}` : '';
          
          return (
            <motion.div 
              key={emp.id} 
              layout
              variants={item}
              className={`score-item glass ${rankClass}`}
            >
              <div className="rank-text">
                {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
              </div>
              <img src={emp.image} alt={emp.name} className="avatar-mini" />
              <div className="user-details">
                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{emp.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500, display: 'flex', gap: '0.5rem' }}>
                  <span>{emp.role}</span>
                  <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
                  <span style={{ color: 'var(--primary)' }}>{emp.dept}</span>
                </div>
              </div>
              <div className="likes-count" style={{ 
                color: scores[emp.id] > 0 ? '#00ff88' : scores[emp.id] < 0 ? '#ff0055' : 'rgba(255,255,255,0.2)',
                background: scores[emp.id] !== 0 ? 'rgba(255,255,255,0.05)' : 'transparent',
                padding: '0.5rem 0.8rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '1rem'
              }}>
                {scores[emp.id] > 0 ? <TrendingUp size={18} /> : scores[emp.id] < 0 ? <TrendingDown size={18} /> : null}
                {scores[emp.id] > 0 ? '+' : ''}{scores[emp.id]}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default LeaderboardView;
