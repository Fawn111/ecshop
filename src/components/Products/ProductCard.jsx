import React from 'react';
import { FaHeart } from "react-icons/fa";

const ProductCard = ({ data, handleOrderPopup, handlecart, handlewish }) => {
  return (
    <div className='mb-10 mt-10 overflow-hidden'>
      <div data-aos="fade-up" className='grid grid-cols-1 sm:grid-cols-4 place-items-center gap-4'>
        {data.map((item) => (
          <div key={item.id} className='border border-gray-400 rounded-md p-3 shadow-xl'>
            <div className="relative">
              <img src={item.img} alt={item.title} className="h-[180px] w-[260px] object-cover rounded-md" />
            </div>
            <div className="leading-7 mt-4 flex flex-col">
              <div className='flex justify-between'>
                   <h2 className="font-semibold text-xl">{item.title}</h2>
                   <button onClick={() => handlewish(item)}> <FaHeart className='text-2xl mt-2 hover:scale-125 hover:text-primary transition-all duration-300 cursor-pointer' />
              </button>
              </div>
              <div>
                <h2 className="text-gray-500">${item.price}</h2>
              </div>
               
               <div className="items-center flex justify-center mt-3">
                <button onClick={()=> handlecart(item)} className="bg-primary text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-600 shadow-md hover:shadow-lg">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
