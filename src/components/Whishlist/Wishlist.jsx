import React, { use, useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";

const Wishlist = ({ isWishOpen, toggleWish, wish , setWish, size , cart , handlecart}) => {



    // const [total, setTotal] = useState();
    //remove
    const handleRemove = (id) => {
        const arr = wish.filter((item) => item.id !== id);
        setWish(arr);
    }

       useEffect(() => {
      if (isWishOpen) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    
      return () => {
        document.body.classList.remove('overflow-hidden');
      };
    }, [isWishOpen]);


//    useEffect(() => {
//         handleprice();
//     }, [cart]);

  return (
    
    <div
      className={`fixed h-full w-full top-0 right-0 sm:w-[600px] bg-white shadow-lg z-50 transform transition-transform duration-300 overflow-hidden ${
        isWishOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between px-6 py-5  bg-white">
        <h2 className="text-center flex items-center gap-3 text-xl font-semibold text-black font-primary tracking-wide"><FaRegHeart className='text-primary'/> Wishlist ({size})</h2>
        <IoMdClose
          onClick={toggleWish}
          className="text-2xl cursor-pointer text-gray-400 hover:scale-105"
        />
      </div>
        <div className='border-b border-t text-center py-2 bg-primary/20 border-primary'>
        <h2 className='text-primary font-sans font-medium tracking-wide'>Wishlist</h2>
      </div>


    <div className="p-6 space-y-4 flex flex-col overflow-y-auto h-[calc(100vh-80px)]">
      {
            wish?.map((item) => (
            <>
            <div key={item.id} className="border-b pb-2 flex gap-4">
                <img src={item.img} className='h-[100px] w-[160px] object-cover rounded-md'/>
                <div className='ml-10 flex w-full justify-between '>
                    <div>
                    <p className="font-bold text-xl">" {item.title} "</p>
                    <p className="text-lg text-gray-500">${item.price}</p>
                       {/* <button onClick={() => handlecart(item)} className={`${cart.map((c) => c.id === item.id) ? 'bg-primary' : 'bg-green-300'} text-white px-6 py-2 rounded-xl font-semibold text-sm hover:scale-105 shadow-md hover:shadow-lg bottom-2`} >
                      {cart.some((c) => c.id === item.id) ? "Remove From Cart" : "Add To Cart"}
                    </button> */}
                    </div>
                    <div className="">
                         <button className=' text-3xl hover:text-primary cursor-pointer' onClick={() => handleRemove(item.id)}>
                            <MdDelete />
                        </button>
  
          
                    </div>
                
                </div>
            </div>
            
            </>
             ))
      }
      </div>
    </div>
  );
};

export default Wishlist;
