import React from 'react'
import { motion } from 'framer-motion';

const Banner = ({ data, handleOrderPopup }) => {
  return (
  <>
    <div className='min-h-[550px] flex justify-center items-center overflow-hidden '>
        <div className="p-3 sm:p-6 m-4">
            <div className="grid grid-cols-1 pl-10 sm:pl-0 gap-5 sm:grid-cols-3 items-center text-white rounded-2xl" style={{backgroundColor: data.bgColor}}>
                <div className="p-6 sm:p-8">
                    <p className='text-sm' data-aos="fade-up">{data.discount}</p>
                    <motion.h2 initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          viewport={{ once: true }} className="text-7xl font-bold uppercase" data-aos="zoom-out">{data.title}</motion.h2>
                    <p className='text-sm' data-aos="fade-up">{data.date}</p>
               </div>
               <motion.div initial={{ x: 50, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4, duration: 4 }}
                          viewport={{ once: true }} >
                <img src={data.image} data-aos="fade-up" className="scale-125 drop-shadow-xl drop-shadow-black/40 w-[250px] sm:w-[340px] object-cover" />
               </motion.div>
               <div className='flex flex-col justify-center p-3 gap-4'>
                <p className='font-bold text-xl' data-aos="zoom-out">{data.title2}</p>
                <p className='text-3xl sm:text-5xl font-bold' data-aos="fade-up">{data.title3}</p>
                <p className='leading-5 tracking-wide text-sm' data-aos="fade-up">{data.title4}</p>
                <div>
                    <button style={{color: data.bgColor}} className='border-0 border-solid p-3  transition-all duration-300 ease-in-out  hover:scale-105 
                  shadow-md hover:shadow-lg bg-white text-primary rounded-4xl' data-aos="fade-up" onClick={handleOrderPopup}>Shop Now</button>
                </div>
               </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Banner;