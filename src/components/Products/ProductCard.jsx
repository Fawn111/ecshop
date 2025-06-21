import React from 'react';
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { IoIosStar } from "react-icons/io";

const ProductCard = ({ data, handlecart, handlewish, wish, cart }) => {
  return (
    <div className='mt-10 overflow-hidden'>
      <motion.div initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 2 }}
          viewport={{ once: true }} className='grid grid-cols-1 sm:grid-cols-4 place-items-center p-7 gap-4'>
        {data.map((item) => (
          <div key={item.id} className='bg-white rounded-md p-3 w-full h-fit sm:w-[300px] hover:scale-105 transition-all duration-300 ease-in-out'>
            <div className="relative">
              <img src={item.img} alt={item.title} className="h-[298px] w-[295px] object-cover rounded-md" />
            </div>
            <div className="leading-7 mt-4 flex flex-col">
              <div className='flex justify-between'>
                   <h2 className="font-semibold text-xl">{item.title}</h2>
                   <button onClick={() => handlewish(item)}>
              <FaHeart className={`text-2xl mt-2 transition-all duration-300 cursor-pointer hover:scale-125 ${wish.some(w => w.id === item.id) ? 'text-red-600' : 'text-gray-400'}`}/>
        </button>
              </div>
              <div className='flex items-center gap-1 mt-2 text-yellow-400'>
                < IoIosStar className='text-yellow-400'/>
                < IoIosStar />
                < IoIosStar />
                < IoIosStar />
              </div>
              <div>
                <h2 className="text-black text-[18px] font-semibold tracking-tighter">${item.price}</h2>
              </div>
               
               <div className="items-center flex justify-center mt-3">
               <motion.button onClick={() => handlecart(item)} className={`${cart.some((c) => c.id === item.id) ? 'bg-green-600' : 'bg-black'} text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg bottom-2 cursor-pointer`}  whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}>
            {cart.some((c) => c.id === item.id) ? "Remove From Cart" : "Add To Cart"}
        </motion.button>
                
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    <div className='flex justify-center mt-10 mb-2'>
          <motion.button  initial={{ x: -100, opacity: 1 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 5 }}
          viewport={{ once: true }} className='px-15 py-2 border border-gray-200 rounded-full hover:scale-105 cursor-pointer '>View All</motion.button>
        </div>
    </div>
  );
};

export default ProductCard;
