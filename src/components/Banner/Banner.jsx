import React from 'react';
import { motion } from 'framer-motion';
import Heading from '../Shared/Heading';
import banner1 from '../../assets/banner/1.png';
import banner2 from '../../assets/banner/2.png';
import banner3 from '../../assets/banner/3.png'; 
import banner4 from '../../assets/banner/4.png';

const Banner = () => {
 const cardClasses = "relative overflow-hidden rounded-2xl p-0";
const labelClasses = "absolute top-3 left-4 text-[32px] font-semibold tracking-tight font-secondary font-semibold z-10 text-black  px-3 py-1 rounded";
const imageClasses = "w-full h-full object-cover rounded-2xl";


  return (
    <div className='w-full max-w-[1239px] mx-auto overflow-hidden bg-white'>
      <div className="p-3 sm:p-6 m-4 bg-primary rounded-2xl">
        <Heading title="BROWSE BY DRESS STYLE" />

        <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-2 gap-5 mt-10">
          
          {/* Casual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className={cardClasses}
          >
            
            <img src={banner3} alt="Casual" className={imageClasses} />
            <div className={`${labelClasses}`}>Casual</div>
          </motion.div>

          {/* Formal (spans 2 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className={`${cardClasses} sm:col-span-2 h-[289px]`}
          >
            <img src={banner4} alt="Formal" className={imageClasses} />
             <div className={labelClasses}>Formal</div>
          </motion.div>

          {/* Party */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className={`${cardClasses} sm:col-span-2 h-[289px]`}
          >
            <img src={banner1} alt="Party" className={imageClasses} />
            <div className={labelClasses}>Party</div>
          </motion.div>

          {/* Gym */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className={cardClasses}
          >
            <img src={banner2} alt="Gym" className={imageClasses} />
            <div className={labelClasses}>Gym</div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Banner;