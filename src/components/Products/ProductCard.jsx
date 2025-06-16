import React from 'react';

const ProductCard = ({ data, handleOrderPopup, handlecart }) => {
  return (
    <div className='mb-10 mt-10 overflow-hidden'>
      <div className='grid grid-cols-1 sm:grid-cols-4 place-items-center gap-4'>
        {data.map((item) => (
          <div data-aos="fade-up" data-aos-delay={item.aosDelay} key={item.id}>
            <div className="relative">
              <img src={item.img} alt={item.title} className="h-[180px] w-[260px] object-cover rounded-md" />
            </div>
            <div className="leading-7 mt-2 text-center">
              <h2 className="font-semibold text-xl">{item.title}</h2>
              <h2 className="text-gray-500">${item.price}</h2>
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
