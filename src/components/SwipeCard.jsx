import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const SwipeCard = ({ employee, onVote }) => {
  const [exitX, setExitX] = useState(0);
  const x = useMotionValue(0);
  
  // Transform x position to rotation and opacity
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  // Custom shadow for swiping
  const shadow = useTransform(
    x,
    [-100, 0, 100],
    [
      "0 20px 40px rgba(255, 0, 85, 0.3)",
      "0 10px 40px rgba(0, 0, 0, 0.5)",
      "0 20px 40px rgba(0, 255, 136, 0.3)"
    ]
  );

  // Stamp opacity transforms
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-150, -50], [1, 0]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      setExitX(400); // More dramatic exit
      onVote(employee.id, 'right');
    } else if (info.offset.x < -100) {
      setExitX(-400);
      onVote(employee.id, 'left');
    }
  };

  return (
    <motion.div
      className="employee-card glass"
      style={{ x, rotate, opacity, boxShadow: shadow }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileGrab={{ cursor: 'grabbing' }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, x: exitX }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* LIKE / NOPE Stamps */}
      <motion.div className="stamp stamp-like" style={{ opacity: likeOpacity }}>LIKE</motion.div>
      <motion.div className="stamp stamp-nope" style={{ opacity: nopeOpacity }}>NOPE</motion.div>

      <img src={employee.image} alt={employee.name} className="card-image" />
      <div className="card-info">
        <h2 className="card-name">{employee.name}</h2>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
          <span className="card-role">{employee.role}</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
          <span className="card-role" style={{ color: 'var(--primary)' }}>{employee.dept}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard;
