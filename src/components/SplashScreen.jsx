import React from 'react';
import { motion } from 'framer-motion';

function SplashScreen({ onComplete }) {
  return (
    <motion.div 
      className="splash-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={() => {
        // We set a timer to dismiss
        setTimeout(onComplete, 3500);
      }}
    >
      <div className="splash-content">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
        >
          <h1 className="splash-logo">BPEmployee</h1>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="made-by"
        >
          Made by <span className="ranveer-name">Ranveer</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="splash-desc"
        >
          A fun, anonymous way to swipe through your colleagues. 
          Your feedback helps build a better, more connected workplace culture. 
          Every swipe counts!
        </motion.p>

        <motion.div 
          className="loading-bar-container"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.5, duration: 2, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}

export default SplashScreen;
