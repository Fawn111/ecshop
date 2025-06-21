import React from "react";
import { motion } from "framer-motion";
import brand1 from "../../assets/brands/1.png";
import brand2 from "../../assets/brands/2.png";
import brand3 from "../../assets/brands/3.png";
import brand4 from "../../assets/brands/4.png";
import brand5 from "../../assets/brands/5.png";

function Category() {

  return (
    <div className=' bg-black overflow-hidden'>
        <motion.div className='p-3 sm:p-6'>
            <div className='gap-3 grid grid-cols-3 md:grid-cols-5 place-items-center items-center'>
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
                <motion.img src={brand4} alt="" className='w-[80px] col-span-auto md:col-span-1'
                 initial={{ x: 50, opacity: 0 }}
                 whileInView={{ x: 0, opacity: 1 }}
                 transition={{ delay: 1, duration: 4 }}
                 viewport={{ once: true }}/>
                <motion.img src={brand5} alt="" className='w-[80px] col-span-auto md:col-span-1'
                 initial={{ x: 50, opacity: 0 }}
                 whileInView={{ x: 0, opacity: 1 }}
                 transition={{ delay: 2, duration: 4 }}
                 viewport={{ once: true }}/>
            </div>
        </motion.div>
    </div>
  )
}


export default Category;
