import React from 'react';
import { motion } from 'framer-motion';
import { pageTransitionVariant } from '../../utils/animations';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransitionVariant}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
