import React from 'react'
import brand1 from '../../assets/brand/br-1.png'
import brand2 from '../../assets/brand/br-2.png'
import brand3 from '../../assets/brand/br-3.png'
import brand4 from '../../assets/brand/br-4.png'
import brand5 from '../../assets/brand/br-5.png'
import { motion } from 'framer-motion'

const Partners = () => {
  return (
    <div className='mt-10 bg-gray-200 hidden md:block overflow-hidden'>
        <motion.div className='p-3 sm:p-6 m-4'>
            <div className='gap-3 grid md:grid-cols-5 place-items-center opacity-50'>
                <motion.img src={brand1} alt="" className='w-[80px]'  initial={{ x: 50, opacity: 0 }}
                 whileInView={{ x: 0, opacity: 1 }}
                 transition={{ delay: 0.4, duration: 4 }}
                 viewport={{ once: true }}/>
                <motion.img src={brand2} alt="" className='w-[80px]' initial={{ x: 50, opacity: 0 }}
                 whileInView={{ x: 0, opacity: 1 }}
                 transition={{ delay: 0.6, duration: 4 }}
                 viewport={{ once: true }} />
                <motion.img src={brand3} alt="" className='w-[80px]' 
                 initial={{ x: 50, opacity: 0 }}
                 whileInView={{ x: 0, opacity: 1 }}
                 transition={{ delay: 0.8, duration: 4 }}
                 viewport={{ once: true }}/>
                <motion.img src={brand4} alt="" className='w-[80px]'
                 initial={{ x: 50, opacity: 0 }}
                 whileInView={{ x: 0, opacity: 1 }}
                 transition={{ delay: 1, duration: 4 }}
                 viewport={{ once: true }}/>
                <motion.img src={brand5} alt="" className='w-[80px]'
                 initial={{ x: 50, opacity: 0 }}
                 whileInView={{ x: 0, opacity: 1 }}
                 transition={{ delay: 2, duration: 4 }}
                 viewport={{ once: true }}/>
            </div>
        </motion.div>
    </div>
  )
}

export default Partners