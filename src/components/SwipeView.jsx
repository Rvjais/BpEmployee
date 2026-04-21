import React from 'react';
import SwipeCard from './SwipeCard';
import { AnimatePresence, motion } from 'framer-motion';

const SwipeView = ({ employees, onVote, onFinish }) => {
  if (employees.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass" 
        style={{ padding: '2.5rem', textAlign: 'center', marginTop: '5rem' }}
      >
        <h2 style={{ marginBottom: '1rem' }}>🎉 You've swiped everyone!</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>
          Check the leaderboard to see the results.
        </p>
        <button className="nav-btn active" onClick={onFinish}>
          View Results
        </button>
      </motion.div>
    );
  }

  // We only show the top card of the stack
  const currentEmployee = employees[employees.length - 1];

  return (
    <div className="card-stack">
      <AnimatePresence>
        <SwipeCard 
          key={currentEmployee.id}
          employee={currentEmployee} 
          onVote={onVote} 
        />
      </AnimatePresence>
      
      {/* Visual indicator for count */}
      <div style={{ 
        position: 'absolute', 
        bottom: '-40px', 
        color: 'rgba(255,255,255,0.4)',
        fontSize: '0.8rem',
        fontWeight: 600
      }}>
        {employees.length} remaining
      </div>
    </div>
  );
};

export default SwipeView;
