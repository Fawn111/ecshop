import React from 'react';

const ProductCard = ({ data, handleOrderPopup, handlecart }) => {
  return (
    <div className='mb-10 mt-10 overflow-hidden'>
      <div className='grid grid-cols-1 sm:grid-cols-4 place-items-center gap-4'>
        {data.map((item) => (
          <div className="group" data-aos="fade-up" data-aos-delay={item.aosDelay} key={item.id}>
            <div className="relative group">
              <img src={item.img} alt={item.title} className="h-[180px] w-[260px] object-cover rounded-md" />
              <div className="absolute inset-0 transition-all duration-300 backdrop-blur-sm hidden group-hover:flex justify-center items-center">
                <button onClick={()=> handlecart(item)} className="bg-primary text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-600 shadow-md hover:shadow-lg">
                  Add To Cart
                </button>
              </div>
            </div>
            <div className="leading-7 mt-2">
              <h2 className="font-semibold text-xl">{item.title}</h2>
              <h2 className="font-bold">${item.price}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
