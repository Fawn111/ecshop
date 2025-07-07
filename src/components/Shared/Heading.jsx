import React from 'react';
import { motion } from 'framer-motion';

const Heading = ({ subtitle, title }) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className='text-center my-8 px-4'
    >
      <h2 className='text-4xl sm:text-5xl font-extrabold font-secondary tracking-tight bg-gradient-to-r from-black via-gray-800 to-black text-transparent bg-clip-text relative inline-block'>
        {title}
        <span className="block h-[4px] w-20 bg-black mx-auto mt-2 rounded-full"></span>
      </h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className='mt-4 text-gray-500 text-lg font-light tracking-wide'
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default Heading;
