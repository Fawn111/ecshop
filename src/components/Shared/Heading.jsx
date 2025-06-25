import React from 'react'
import { motion } from 'framer-motion';

const Heading = ({ subtitle , title }) => {
  return (
    <motion.div 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 1 }}
      className='text-center space-y-3'
    >
      <h2 className='text-[40px] uppercase font-extrabold font-secondary tracking-tighter'>{title}</h2>
      <p className='text-l text-gray-500 font-secondary'>{subtitle}</p>
    </motion.div>
  )
}

export default Heading;
